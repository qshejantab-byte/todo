import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PageShell } from "@/components/PageShell";
import { ArrowRight, Sparkles, Megaphone, Camera, Star, Bot } from "lucide-react";

interface GraphNode {
  id: string;
  x: number;
  y: number;
  label: string;
  color: string;
  size: number;
  ring: boolean;
}

interface GraphEdge {
  from: number;
  to: number;
}

const NODES: GraphNode[] = [
  { id: "core",      x: 50, y: 50, label: "TODO",       color: "#E8C547", size: 13, ring: true  },
  { id: "brand",     x: 22, y: 22, label: "Branding",   color: "#5DD6B3", size:  8, ring: false },
  { id: "marketing", x: 78, y: 20, label: "Marketing",  color: "#C8A8E9", size:  8, ring: false },
  { id: "content",   x: 82, y: 68, label: "Content",    color: "#E87D7D", size:  8, ring: false },
  { id: "rep",       x: 20, y: 72, label: "Reputation", color: "#7DB8E8", size:  8, ring: false },
  { id: "ai",        x: 50, y: 88, label: "AI Ops",     color: "#E8C547", size:  8, ring: false },
  { id: "s1",        x: 38, y: 10, label: "Identity",   color: "#5DD6B3", size:  5, ring: false },
  { id: "s2",        x: 65, y:  8, label: "Campaigns",  color: "#C8A8E9", size:  5, ring: false },
  { id: "s3",        x: 92, y: 44, label: "Reels",      color: "#E87D7D", size:  5, ring: false },
  { id: "s4",        x:  8, y: 44, label: "Reviews",    color: "#7DB8E8", size:  5, ring: false },
  { id: "s5",        x: 64, y: 96, label: "Automation", color: "#E8C547", size:  5, ring: false },
  { id: "s6",        x: 36, y: 96, label: "CRM",        color: "#E8C547", size:  5, ring: false },
];

const EDGES: GraphEdge[] = [
  { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 },
  { from: 0, to: 4 }, { from: 0, to: 5 }, { from: 1, to: 6 },
  { from: 2, to: 7 }, { from: 3, to: 8 }, { from: 4, to: 9 },
  { from: 5, to: 10 }, { from: 5, to: 11 }, { from: 1, to: 2 },
  { from: 3, to: 4 },
];

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function EcosystemCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let pulseEdge = 0;
    let pulseT = 0;
    let lastSwitch = performance.now();
    const PULSE_MS = 900;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (now: number) => {
      const dpr = window.devicePixelRatio || 1;
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      const sc = Math.min(W, H) / 100;
      const t = now / 1000;

      const sinceSwitch = now - lastSwitch;
      pulseT = sinceSwitch / PULSE_MS;
      if (pulseT >= 1) {
        pulseT = 0;
        pulseEdge = (pulseEdge + 1) % EDGES.length;
        lastSwitch = now;
      }

      const pos = NODES.map((n, i) => ({
        x: n.x * sc,
        y: n.y * sc + (i === 0
          ? Math.sin(t * 0.8) * 1.2 * sc
          : Math.sin(t * 0.6 + n.x * 0.1) * 0.7 * sc),
      }));

      ctx.clearRect(0, 0, W, H);

      // Edges
      EDGES.forEach((e, i) => {
        const a = pos[e.from];
        const b = pos[e.to];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = i === pulseEdge ? "rgba(93,214,179,0.7)" : "rgba(255,255,255,0.07)";
        ctx.lineWidth = i === pulseEdge ? 0.8 : 0.35;
        ctx.stroke();
      });

      // Pulse dot
      const pe = EDGES[pulseEdge];
      const pa = pos[pe.from];
      const pb = pos[pe.to];
      const dotX = pa.x + (pb.x - pa.x) * pulseT;
      const dotY = pa.y + (pb.y - pa.y) * pulseT;
      ctx.beginPath();
      ctx.arc(dotX, dotY, sc * 0.9, 0, Math.PI * 2);
      ctx.fillStyle = "#5DD6B3";
      ctx.shadowColor = "#5DD6B3";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Nodes
      NODES.forEach((n, i) => {
        const { x, y } = pos[i];
        const r = n.size * sc * 0.42;
        const [nr, ng, nb] = hexToRgb(n.color);
        const rgba = (a: number) => `rgba(${nr},${ng},${nb},${a})`;

        // Halo
        const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 2.4);
        grad.addColorStop(0, rgba(0.35));
        grad.addColorStop(1, rgba(0));
        ctx.beginPath();
        ctx.arc(x, y, r * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Spinning ring (core only)
        if (n.ring) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(t * 0.3);
          ctx.beginPath();
          ctx.arc(0, 0, r * 1.65, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(0.45);
          ctx.lineWidth = 0.8;
          ctx.setLineDash([4, 3.5]);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();
        }

        // Circle fill
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        if (n.id === "core") {
          ctx.fillStyle = n.color;
          ctx.fill();
        } else {
          ctx.fillStyle = rgba(0.12);
          ctx.fill();
          ctx.strokeStyle = rgba(0.8);
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }

        // Label
        ctx.fillStyle = n.id === "core" ? "#0d0f1a" : rgba(0.9);
        ctx.font = `${n.id === "core" ? "bold " : ""}${(n.id === "core" ? 3.8 : 2.6) * sc}px 'Space Mono', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(n.label, x, y + r + 2.8 * sc);
      });

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let cur = 0;
      const step = () => {
        cur = Math.min(cur + Math.ceil(to / 35), to);
        setVal(cur);
        if (cur < to) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [to]);

  return <span ref={elRef}>{val}{suffix}</span>;
}

const CORES = [
  { icon: Sparkles,  label: "Branding",          desc: "Identity systems that command attention.",      color: "#5DD6B3" },
  { icon: Megaphone, label: "Marketing Systems",  desc: "Strategy structures built to scale.",           color: "#C8A8E9" },
  { icon: Camera,    label: "Content Production", desc: "Visuals that stop scrolls and start sales.",    color: "#E87D7D" },
  { icon: Star,      label: "Reputation Mgmt",    desc: "Trust systems that convert visitors.",          color: "#7DB8E8" },
  { icon: Bot,       label: "AI Automation",      desc: "Infrastructure that operates while you sleep.", color: "#E8C547" },
] as const;

const PILLARS = [
  { label: "Brand-first thinking",  color: "#5DD6B3" },
  { label: "Systems over tactics",  color: "#C8A8E9" },
  { label: "AI-enhanced execution", color: "#E8C547" },
  { label: "East Africa expertise", color: "#E87D7D" },
] as const;

const STATS = [
  { to: 5,  suffix: "+", label: "Core Systems"   },
  { to: 40, suffix: "+", label: "Assets / Month" },
  { to: 3,  suffix: "x", label: "Avg. Growth"    },
] as const;

const DISCOVERY_ITEMS = [
  "Brand clarity review",
  "Marketing gap identification",
  "Growth opportunity mapping",
] as const;

const HEADLINE = [
  { word: "Growth",         color: "#E8C547", italic: false, weight: 800 },
  { word: "infrastructure", color: "#f5f5f0", italic: true,  weight: 400 },
  { word: "for",            color: "#f5f5f0", italic: false, weight: 400 },
  { word: "ambitious",      color: "#f5f5f0", italic: true,  weight: 400 },
  { word: "brands.",        color: "#5DD6B3", italic: false, weight: 800 },
] as const;

export default function HomePage() {
  return (
    <PageShell>
      <Helmet>
        <title>TODO Growth — Growth Infrastructure for Ambitious Brands</title>
        <meta name="description" content="TODO builds brand systems, content engines, and AI infrastructure that power businesses impossible to ignore across East Africa." />
        <style>{`
          @keyframes h-up {
            from { opacity:0; transform:translateY(22px); }
            to   { opacity:1; transform:translateY(0); }
          }
          @keyframes h-in { from { opacity:0; } to { opacity:1; } }
          .anim-up { animation: h-up 0.65s cubic-bezier(.22,1,.36,1) both; }
          .anim-in { animation: h-in 0.8s ease both; }
        `}</style>
      </Helmet>

      {/* HERO */}
      <section
        className="relative grid min-h-[calc(100vh-78px)] grid-cols-1 overflow-hidden lg:grid-cols-2"
        style={{ background: "linear-gradient(135deg,#0d0f1a 0%,#111827 55%,#0a0f1e 100%)" }}
      >
        {/* Ambient bg */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div style={{ position:"absolute", top:"-10%", left:"-5%", width:"55%", height:"55%",
            borderRadius:"50%", background:"radial-gradient(circle,rgba(93,214,179,0.07) 0%,transparent 65%)" }} />
          <div style={{ position:"absolute", bottom:0, right:"5%", width:"50%", height:"50%",
            borderRadius:"50%", background:"radial-gradient(circle,rgba(200,168,233,0.06) 0%,transparent 65%)" }} />
          <div style={{ position:"absolute", inset:0,
            backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.035) 1px,transparent 1px)",
            backgroundSize:"32px 32px" }} />
        </div>

        {/* Left — copy */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-20 md:px-14">
          <div className="anim-up mb-7 flex items-center gap-3" style={{ animationDelay:"0.1s" }}>
            <span style={{ display:"block", width:"24px", height:"2px", borderRadius:"2px",
              background:"linear-gradient(90deg,#5DD6B3,transparent)" }} />
            <span style={{ fontFamily:"Space Mono,monospace", fontSize:"0.6rem",
              letterSpacing:"0.2em", textTransform:"uppercase", color:"#5DD6B3" }}>
              Kigali, Rwanda — Growth Infrastructure
            </span>
          </div>

          <h1 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:800,
            fontSize:"clamp(2.6rem,5.5vw,5.2rem)", lineHeight:0.97,
            letterSpacing:"-0.04em", marginBottom:"1.5rem", color:"#f5f5f0" }}>
            {HEADLINE.map((item, i) => (
              <span
                key={item.word}
                className="anim-up"
                style={{
                  display:"inline-block", marginRight:"0.28em",
                  animationDelay:`${0.2 + i * 0.07}s`,
                  color: item.color,
                  fontStyle: item.italic ? "italic" : "normal",
                  fontWeight: item.weight,
                }}
              >
                {item.word}
              </span>
            ))}
          </h1>

          <p className="anim-up" style={{ animationDelay:"0.65s", maxWidth:"26rem",
            fontSize:"0.95rem", lineHeight:1.85, color:"rgba(245,245,240,0.5)", marginBottom:"2.5rem" }}>
            TODO engineers the brand systems, content engines, and AI infrastructure
            that power businesses impossible to ignore — across East Africa and beyond.
          </p>

          <div className="anim-up flex flex-wrap items-center gap-5" style={{ animationDelay:"0.75s" }}>
            <Link
              to="/packages"
              className="inline-flex items-center gap-2"
              style={{
                background:"#E8C547", color:"#0d0f1a",
                fontFamily:"Space Grotesk,sans-serif", fontWeight:700,
                fontSize:"0.75rem", letterSpacing:"0.07em", textTransform:"uppercase",
                padding:"0.9rem 1.8rem", borderRadius:"10px", textDecoration:"none",
                boxShadow:"0 0 24px rgba(232,197,71,0.35)",
                transition:"transform .2s, box-shadow .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 0 40px rgba(232,197,71,0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "0 0 24px rgba(232,197,71,0.35)";
              }}
            >
              View Packages <ArrowRight size={15} />
            </Link>

            <Link
              to="/discovery"
              className="inline-flex items-center gap-2"
              style={{
                color:"rgba(245,245,240,0.55)", fontFamily:"Space Mono,monospace",
                fontSize:"0.62rem", letterSpacing:"0.1em", textTransform:"uppercase",
                textDecoration:"none", borderBottom:"1px solid rgba(245,245,240,0.18)",
                paddingBottom:"2px", transition:"color .2s, border-color .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#5DD6B3";
                e.currentTarget.style.borderColor = "#5DD6B3";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(245,245,240,0.55)";
                e.currentTarget.style.borderColor = "rgba(245,245,240,0.18)";
              }}
            >
              Book Discovery Session →
            </Link>
          </div>

          {/* Stats */}
          <div className="anim-up mt-14 flex flex-wrap gap-10" style={{ animationDelay:"0.88s" }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:800,
                  fontSize:"clamp(1.6rem,3vw,2.4rem)", lineHeight:1,
                  color:"#E8C547", letterSpacing:"-0.03em" }}>
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div style={{ fontFamily:"Space Mono,monospace", fontSize:"0.58rem",
                  letterSpacing:"0.16em", textTransform:"uppercase",
                  color:"rgba(245,245,240,0.32)", marginTop:"4px" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — canvas ecosystem */}
        <div
          className="anim-in relative flex items-center justify-center p-8 lg:p-12"
          style={{ animationDelay:"0.35s", minHeight:"360px" }}
        >
          <div style={{ position:"absolute", inset:"10%", borderRadius:"50%",
            background:"radial-gradient(circle,rgba(93,214,179,0.05) 0%,transparent 70%)" }} />
          <div style={{ width:"min(460px,90vw)", height:"min(460px,90vw)", position:"relative", zIndex:1 }}>
            <EcosystemCanvas />
          </div>
        </div>
      </section>

      {/* CORE AREAS */}
      <section style={{ background:"#0d0f1a", borderTop:"1px solid rgba(93,214,179,0.08)", padding:"7rem 1.5rem" }}>
        <div style={{ maxWidth:"72rem", margin:"0 auto" }}>
          <div style={{ fontFamily:"Space Mono,monospace", fontSize:"0.62rem",
            letterSpacing:"0.2em", textTransform:"uppercase", color:"#5DD6B3", marginBottom:"1rem" }}>
            01 — Core Systems
          </div>
          <h2 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:800,
            fontSize:"clamp(2rem,3.8vw,3.4rem)", lineHeight:1.02,
            letterSpacing:"-0.04em", color:"#f5f5f0", marginBottom:"3.5rem" }}>
            Five systems.<br />
            <em style={{ fontStyle:"italic", fontWeight:400, color:"#5DD6B3" }}>One growth engine.</em>
          </h2>

          <div style={{ display:"grid", gap:"1.25rem",
            gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))" }}>
            {CORES.map((c) => (
              <div
                key={c.label}
                style={{ border:`1.5px solid ${c.color}33`, borderRadius:"16px",
                  background:`${c.color}09`, padding:"1.75rem 1.5rem",
                  transition:"transform .25s, border-color .25s, box-shadow .25s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.borderColor = `${c.color}66`;
                  e.currentTarget.style.boxShadow = `0 12px 32px ${c.color}18`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.borderColor = `${c.color}22`;
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div style={{ width:"44px", height:"44px", borderRadius:"12px",
                  background:`${c.color}18`, border:`1.5px solid ${c.color}44`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  marginBottom:"1.25rem" }}>
                  <c.icon size={20} color={c.color} />
                </div>
                <div style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:700,
                  fontSize:"1rem", color:"#f5f5f0", marginBottom:"0.5rem" }}>{c.label}</div>
                <div style={{ fontFamily:"Space Grotesk,sans-serif", fontSize:"0.82rem",
                  color:"rgba(245,245,240,0.45)", lineHeight:1.6 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section style={{ background:"linear-gradient(135deg,#0d0f1a 0%,#0f1628 100%)",
        padding:"6rem 1.5rem", borderTop:"1px solid rgba(93,214,179,0.1)",
        borderBottom:"1px solid rgba(93,214,179,0.1)" }}>
        <div style={{ maxWidth:"72rem", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"4rem" }}>
            <div style={{ fontFamily:"Space Mono,monospace", fontSize:"0.6rem",
              letterSpacing:"0.2em", textTransform:"uppercase", color:"#5DD6B3", marginBottom:"1.5rem" }}>
              The TODO Difference
            </div>
            <h2 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:800,
              fontSize:"clamp(1.8rem,3.5vw,3.2rem)", lineHeight:1.08,
              letterSpacing:"-0.04em", color:"#f5f5f0", marginBottom:"1.25rem" }}>
              We don&apos;t do campaigns.<br />
              <em style={{ fontStyle:"italic", fontWeight:400, color:"#E8C547" }}>
                We build growth infrastructure.
              </em>
            </h2>
            <p style={{ maxWidth:"38rem", margin:"0 auto", fontSize:"0.93rem",
              lineHeight:1.85, color:"rgba(245,245,240,0.48)" }}>
              Most agencies deliver deliverables. TODO delivers systems — interconnected brand,
              content, and automation engines that compound over time and make your business
              structurally harder to ignore.
            </p>
          </div>

          <div style={{ display:"grid", gap:"1px",
            gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",
            borderRadius:"16px", overflow:"hidden", border:"1px solid rgba(255,255,255,0.06)" }}>
            {PILLARS.map((p, i) => (
              <div
                key={p.label}
                style={{ padding:"2rem 1.5rem", background:"rgba(255,255,255,0.02)",
                  borderRight: i < PILLARS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  transition:"background .2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
              >
                <div style={{ width:"8px", height:"8px", borderRadius:"50%",
                  background:p.color, marginBottom:"1rem", boxShadow:`0 0 10px ${p.color}` }} />
                <div style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:600,
                  fontSize:"0.9rem", color:"rgba(245,245,240,0.8)", lineHeight:1.4 }}>
                  {p.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCOVERY CTA */}
      <section style={{ background:"#0d0f1a", padding:"7rem 1.5rem" }}>
        <div style={{ maxWidth:"72rem", margin:"0 auto", display:"grid", gap:"3rem",
          alignItems:"center", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))" }}>
          <div>
            <div style={{ fontFamily:"Space Mono,monospace", fontSize:"0.62rem",
              letterSpacing:"0.2em", textTransform:"uppercase", color:"#5DD6B3", marginBottom:"1rem" }}>
              Where every engagement starts
            </div>
            <h2 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:800,
              fontSize:"clamp(2rem,3.6vw,3.2rem)", lineHeight:1.02,
              letterSpacing:"-0.04em", color:"#f5f5f0", marginBottom:"1.25rem" }}>
              Where every<br />
              <em style={{ fontStyle:"italic", fontWeight:400, color:"#5DD6B3" }}>engagement starts.</em>
            </h2>
            <p style={{ maxWidth:"28rem", fontSize:"0.92rem", lineHeight:1.85, color:"rgba(245,245,240,0.45)" }}>
              A focused, free first session designed to map your brand gaps,
              marketing blind spots, workflow bottlenecks, and the fastest
              path to visible growth.
            </p>
          </div>

          <div style={{ background:"linear-gradient(135deg,#0d0f1a 0%,#111827 100%)",
            borderRadius:"20px", padding:"2.5rem",
            border:"1px solid rgba(93,214,179,0.15)",
            boxShadow:"0 24px 64px rgba(0,0,0,0.18)" }}>
            <div style={{ fontFamily:"Space Mono,monospace", fontSize:"0.58rem",
              letterSpacing:"0.2em", textTransform:"uppercase", color:"#E8C547", marginBottom:"0.75rem" }}>
              Free · 45 minutes · No commitment
            </div>
            <h3 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:800,
              fontSize:"1.8rem", lineHeight:1.1, letterSpacing:"-0.03em", color:"#f5f5f0", margin:0 }}>
              Start the
            </h3>
            <h3 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:400, fontStyle:"italic",
              fontSize:"1.8rem", lineHeight:1.1, letterSpacing:"-0.02em",
              color:"#5DD6B3", marginBottom:"1.75rem" }}>
              conversation.
            </h3>

            {DISCOVERY_ITEMS.map((item) => (
              <div key={item} style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"0.75rem" }}>
                <span style={{ width:"6px", height:"6px", borderRadius:"50%", flexShrink:0,
                  background:"#5DD6B3", boxShadow:"0 0 8px #5DD6B3" }} />
                <span style={{ fontFamily:"Space Grotesk,sans-serif", fontSize:"0.85rem",
                  color:"rgba(245,245,240,0.62)" }}>{item}</span>
              </div>
            ))}

            <Link
              to="/discovery"
              className="mt-7 inline-flex items-center gap-2"
              style={{ background:"#E8C547", color:"#0d0f1a",
                fontFamily:"Space Grotesk,sans-serif", fontWeight:700,
                fontSize:"0.75rem", letterSpacing:"0.07em", textTransform:"uppercase",
                padding:"0.85rem 1.6rem", borderRadius:"10px", textDecoration:"none",
                boxShadow:"0 0 24px rgba(232,197,71,0.28)",
                transition:"transform .2s, box-shadow .2s" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 0 40px rgba(232,197,71,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "0 0 24px rgba(232,197,71,0.28)";
              }}
            >
              Book now <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
