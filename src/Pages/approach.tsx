import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { ArrowRight } from "lucide-react";

// ─── Step data ────────────────────────────────────────────────────────────────
interface Step {
  num: string;
  phase: string;
  name: string;
  philosophy: string;
  detail: string;
  signals: string[];
  accent: string;
  dim: string;
  pattern: "audit" | "strategy" | "build" | "launch" | "support";
}

const STEPS: Step[] = [
  {
    num: "01",
    phase: "Discovery",
    name: "Audit",
    philosophy: "You cannot engineer growth without first mapping the terrain.",
    detail: "We conduct a structured diagnostic of your brand presence, content gaps, workflow friction, reputation signals, and digital positioning before recommending a single deliverable.",
    signals: ["Brand gap analysis", "Visibility audit", "Workflow friction map", "Competitor benchmark"],
    accent: "#E8C547",
    dim: "rgba(232,197,71,0.08)",
    pattern: "audit",
  },
  {
    num: "02",
    phase: "Architecture",
    name: "Strategy",
    philosophy: "Every system is designed before it is built.",
    detail: "We translate audit findings into a structured growth plan — which systems to activate, in what sequence, and what each one is engineered to achieve for your specific stage of growth.",
    signals: ["System sequencing", "Priority matrix", "Resource allocation", "Timeline architecture"],
    accent: "#5DD6B3",
    dim: "rgba(93,214,179,0.08)",
    pattern: "strategy",
  },
  {
    num: "03",
    phase: "Execution",
    name: "Build",
    philosophy: "Precision in execution is what separates infrastructure from activity.",
    detail: "We deploy the agreed systems — content production, brand identity, automation workflows, campaign creative — with coordinated production teams operating to exact specifications.",
    signals: ["Content production", "Brand system build", "Automation setup", "Campaign creative"],
    accent: "#E87D7D",
    dim: "rgba(232,125,125,0.08)",
    pattern: "build",
  },
  {
    num: "04",
    phase: "Activation",
    name: "Launch",
    philosophy: "A coordinated launch is the difference between noise and momentum.",
    detail: "Everything activates in sequence — content goes live, campaigns deploy, distribution is coordinated, and brand presence expands across channels with unified messaging and timing.",
    signals: ["Coordinated deployment", "Campaign activation", "Channel distribution", "Timing orchestration"],
    accent: "#C8A8E9",
    dim: "rgba(200,168,233,0.08)",
    pattern: "launch",
  },
  {
    num: "05",
    phase: "Operations",
    name: "Support",
    philosophy: "Growth compounds when systems are maintained with discipline.",
    detail: "Ongoing monthly production, system refinement, performance monitoring, and strategic iteration — the continuous operations layer that keeps your infrastructure compounding over time.",
    signals: ["Monthly production", "System refinement", "Performance review", "Strategic iteration"],
    accent: "#7DB8E8",
    dim: "rgba(125,184,232,0.08)",
    pattern: "support",
  },
];

// ─── Blueprint canvas per step ────────────────────────────────────────────────
function BlueprintCanvas({ pattern, accent }: { pattern: Step["pattern"]; accent: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const startRef  = useRef<number>(performance.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width  = r.width  * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const [ar, ag, ab] = [
      parseInt(accent.slice(1,3),16),
      parseInt(accent.slice(3,5),16),
      parseInt(accent.slice(5,7),16),
    ];
    const c = (a: number) => `rgba(${ar},${ag},${ab},${a})`;

    const draw = (now: number) => {
      const d = window.devicePixelRatio || 1;
      const W = canvas.width / d;
      const H = canvas.height / d;
      const t = (now - startRef.current) / 1000;
      ctx.clearRect(0, 0, W, H);

      if (pattern === "audit") {
        // Scanning diagnostic lines
        const scanY = (t * 60) % H;
        const sg = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
        sg.addColorStop(0, c(0));
        sg.addColorStop(0.5, c(0.12));
        sg.addColorStop(1, c(0));
        ctx.fillStyle = sg;
        ctx.fillRect(0, scanY - 40, W, 80);

        // Grid dots
        const spacing = 28;
        for (let x = spacing; x < W; x += spacing) {
          for (let y = spacing; y < H; y += spacing) {
            const dist = Math.abs(y - scanY);
            const alpha = dist < 60 ? 0.25 - (dist / 60) * 0.2 : 0.04;
            ctx.beginPath();
            ctx.arc(x, y, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = c(alpha);
            ctx.fill();
          }
        }

        // Diagnostic brackets top-left
        const bx = W * 0.15, by = H * 0.2, bw = W * 0.3, bh = H * 0.6;
        const blen = 18;
        ctx.strokeStyle = c(0.25); ctx.lineWidth = 1.2;
        [[bx,by],[bx+bw,by],[bx,by+bh],[bx+bw,by+bh]].forEach(([cx,cy],i) => {
          ctx.beginPath();
          ctx.moveTo(cx + (i%2===0?0:-(blen)), cy);
          ctx.lineTo(cx + (i%2===0?blen:0), cy);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx, cy + (i<2?blen:-blen));
          ctx.lineTo(cx, cy);
          ctx.stroke();
        });
      }

      else if (pattern === "strategy") {
        // Blueprint grid
        const g = 32;
        for (let x = 0; x < W; x += g) {
          ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H);
          ctx.strokeStyle = c(0.05); ctx.lineWidth = 0.5; ctx.stroke();
        }
        for (let y = 0; y < H; y += g) {
          ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y);
          ctx.strokeStyle = c(0.05); ctx.lineWidth = 0.5; ctx.stroke();
        }
        // Architectural nodes and connecting lines
        const nodes = [
          [W*.2, H*.3], [W*.5, H*.2], [W*.8, H*.35],
          [W*.3, H*.65], [W*.65, H*.7],
        ] as [number,number][];
        const conns = [[0,1],[1,2],[0,3],[1,4],[2,4],[3,4]] as [number,number][];
        conns.forEach(([a,b]) => {
          const progress = (Math.sin(t * 0.5 + a * 0.3) * 0.5 + 0.5);
          ctx.beginPath();
          ctx.moveTo(nodes[a][0], nodes[a][1]);
          ctx.lineTo(
            nodes[a][0] + (nodes[b][0] - nodes[a][0]) * progress,
            nodes[a][1] + (nodes[b][1] - nodes[a][1]) * progress
          );
          ctx.strokeStyle = c(0.2); ctx.lineWidth = 0.8; ctx.stroke();
        });
        nodes.forEach(([x,y], i) => {
          const pulse = Math.sin(t * 0.8 + i * 0.5) * 0.5 + 0.5;
          ctx.beginPath(); ctx.arc(x, y, 4 + pulse * 2, 0, Math.PI * 2);
          ctx.fillStyle = c(0.15 + pulse * 0.15); ctx.fill();
          ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = c(0.7); ctx.fill();
        });
      }

      else if (pattern === "build") {
        // Assembly blocks appearing
        const blocks = [
          [W*.1,H*.15,W*.25,H*.2], [W*.4,H*.1,W*.22,H*.18],
          [W*.68,H*.2,W*.2,H*.22], [W*.15,H*.5,W*.28,H*.18],
          [W*.5,H*.45,W*.3,H*.2], [W*.2,H*.72,W*.55,H*.16],
        ] as [number,number,number,number][];
        blocks.forEach(([x,y,w,h],i) => {
          const appear = Math.min((t * 0.4 - i * 0.08), 1);
          if (appear <= 0) return;
          ctx.strokeStyle = c(0.15 * appear); ctx.lineWidth = 0.8;
          ctx.strokeRect(x, y, w * appear, h);
          // Corner marks
          ctx.strokeStyle = c(0.5 * appear); ctx.lineWidth = 1;
          const m = 6;
          ctx.beginPath(); ctx.moveTo(x,y+m); ctx.lineTo(x,y); ctx.lineTo(x+m,y); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(x+w*appear-m,y); ctx.lineTo(x+w*appear,y); ctx.lineTo(x+w*appear,y+m); ctx.stroke();
        });
        // Progress bar
        const prog = (t * 0.12) % 1;
        ctx.fillStyle = c(0.08); ctx.fillRect(W*.1, H*.88, W*.8, 3);
        ctx.fillStyle = c(0.6); ctx.fillRect(W*.1, H*.88, W*.8*prog, 3);
      }

      else if (pattern === "launch") {
        // Radial activation burst
        const cx2 = W * 0.5, cy2 = H * 0.5;
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2 + t * 0.2;
          const len = 60 + Math.sin(t * 1.2 + i) * 20;
          const x1 = cx2 + Math.cos(angle) * 30;
          const y1 = cy2 + Math.sin(angle) * 30;
          const x2 = cx2 + Math.cos(angle) * (30 + len);
          const y2 = cy2 + Math.sin(angle) * (30 + len);
          const linGrad = ctx.createLinearGradient(x1, y1, x2, y2);
          linGrad.addColorStop(0, c(0.5));
          linGrad.addColorStop(1, c(0));
          ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
          ctx.strokeStyle = linGrad; ctx.lineWidth = 1; ctx.stroke();
        }
        // Expanding ring
        const ring = (t * 0.5) % 1;
        ctx.beginPath(); ctx.arc(cx2, cy2, ring * 140, 0, Math.PI * 2);
        ctx.strokeStyle = c(0.3 * (1 - ring)); ctx.lineWidth = 1; ctx.stroke();
        // Centre dot
        ctx.beginPath(); ctx.arc(cx2, cy2, 6, 0, Math.PI * 2);
        ctx.fillStyle = c(0.9); ctx.fill();
      }

      else if (pattern === "support") {
        // Calm continuous sine monitoring
        for (let line = 0; line < 3; line++) {
          ctx.beginPath();
          for (let x = 0; x <= W; x += 3) {
            const y = H * (0.3 + line * 0.22) +
              Math.sin(x / W * Math.PI * 4 + t * (0.6 - line * 0.15)) * (14 - line * 3);
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = c(0.18 - line * 0.04); ctx.lineWidth = 1; ctx.stroke();
        }
        // Stable node on first line
        const nodeX = W * 0.65;
        const nodeY = H * 0.3 + Math.sin(nodeX / W * Math.PI * 4 + t * 0.6) * 14;
        ctx.beginPath(); ctx.arc(nodeX, nodeY, 5, 0, Math.PI * 2);
        ctx.fillStyle = c(0.8); ctx.fill();
        ctx.beginPath(); ctx.arc(nodeX, nodeY, 10 + Math.sin(t * 1.5) * 3, 0, Math.PI * 2);
        ctx.strokeStyle = c(0.25); ctx.lineWidth = 0.8; ctx.stroke();

        // Horizontal rule lines (calm)
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.moveTo(W * 0.1, H * (0.18 + i * 0.22));
          ctx.lineTo(W * 0.9, H * (0.18 + i * 0.22));
          ctx.strokeStyle = c(0.04); ctx.lineWidth = 0.5; ctx.stroke();
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, [pattern, accent]);

  return <canvas ref={canvasRef} style={{ width:"100%", height:"100%", display:"block" }} />;
}

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal(threshold = 0.18) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Process step section ─────────────────────────────────────────────────────
function StepSection({ step, flip }: { step: Step; flip: boolean }) {
  const { ref, visible } = useReveal();

  const copy = (
    <div style={{
      display:"flex", flexDirection:"column", justifyContent:"center",
      padding:"5rem 3.5rem",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : `translateY(24px)`,
      transition: `opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1)`,
    }}>
      {/* Phase label */}
      <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"2.5rem" }}>
        <span style={{ fontFamily:"Space Mono,monospace", fontSize:"0.55rem",
          letterSpacing:"0.22em", textTransform:"uppercase",
          color:"rgba(245,245,240,0.25)" }}>
          Phase {step.num}
        </span>
        <span style={{ flex:1, height:"1px",
          background:`linear-gradient(90deg, ${step.accent}44, transparent)` }} />
        <span style={{ fontFamily:"Space Mono,monospace", fontSize:"0.55rem",
          letterSpacing:"0.18em", textTransform:"uppercase", color: step.accent }}>
          {step.phase}
        </span>
      </div>

      {/* Giant number */}
      <div style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:800,
        fontSize:"clamp(5rem,10vw,9rem)", lineHeight:0.85,
        letterSpacing:"-0.06em", color:`${step.accent}18`,
        marginBottom:"0.25rem", userSelect:"none" }}>
        {step.num}
      </div>

      {/* Name */}
      <h2 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:800,
        fontSize:"clamp(2.2rem,4vw,3.5rem)", lineHeight:0.97,
        letterSpacing:"-0.045em", color:"#f5f5f0", marginBottom:"1.25rem",
        marginTop:"-0.5rem" }}>
        {step.name}
      </h2>

      {/* Philosophy */}
      <p style={{ fontFamily:"Space Grotesk,sans-serif", fontStyle:"italic",
        fontSize:"1rem", lineHeight:1.6, color: step.accent,
        marginBottom:"1.25rem", maxWidth:"26rem" }}>
        "{step.philosophy}"
      </p>

      {/* Divider */}
      <div style={{ width:"40px", height:"1.5px", borderRadius:"2px",
        background: step.accent, marginBottom:"1.25rem", opacity:0.5 }} />

      {/* Detail */}
      <p style={{ fontFamily:"Space Grotesk,sans-serif", fontSize:"0.88rem",
        lineHeight:1.85, color:"rgba(245,245,240,0.5)",
        maxWidth:"26rem", marginBottom:"2rem" }}>
        {step.detail}
      </p>

      {/* Signals */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem" }}>
        {step.signals.map((s) => (
          <div key={s} style={{ display:"flex", alignItems:"center", gap:"8px",
            padding:"0.5rem 0.75rem", borderRadius:"8px",
            background:"rgba(255,255,255,0.03)",
            border:"1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ width:"4px", height:"4px", borderRadius:"50%", flexShrink:0,
              background: step.accent, boxShadow:`0 0 5px ${step.accent}` }} />
            <span style={{ fontFamily:"Space Mono,monospace", fontSize:"0.52rem",
              letterSpacing:"0.1em", textTransform:"uppercase",
              color:"rgba(245,245,240,0.45)" }}>
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const visual = (
    <div style={{
      position:"relative", minHeight:"400px",
      background:`radial-gradient(ellipse at 50% 50%, ${step.dim} 0%, transparent 70%)`,
      borderLeft: flip ? "none" : `1px solid rgba(255,255,255,0.05)`,
      borderRight: flip ? `1px solid rgba(255,255,255,0.05)` : "none",
      overflow:"hidden",
      opacity: visible ? 1 : 0,
      transition:`opacity 1s .15s cubic-bezier(.22,1,.36,1)`,
    }}>
      <BlueprintCanvas pattern={step.pattern} accent={step.accent} />
      {/* Phase watermark */}
      <div style={{ position:"absolute", top:"1.5rem", left: flip ? "auto" : "1.5rem",
        right: flip ? "1.5rem" : "auto",
        fontFamily:"Space Mono,monospace", fontSize:"0.52rem",
        letterSpacing:"0.2em", textTransform:"uppercase",
        color:`${step.accent}50` }}>
        {step.phase} /{step.num}
      </div>
    </div>
  );

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
        borderTop:"1px solid rgba(255,255,255,0.05)",
        background:"#0d0f1a",
      }}
    >
      {flip ? <>{visual}{copy}</> : <>{copy}{visual}</>}
    </section>
  );
}

// ─── Connecting progress bar ──────────────────────────────────────────────────
function ProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop) / (el.scrollHeight - el.clientHeight);
      setProgress(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position:"fixed", top:"78px", left:0, right:0, zIndex:45, height:"2px",
      background:"rgba(255,255,255,0.06)" }}>
      <div style={{ height:"100%", background:"linear-gradient(90deg,#E8C547,#5DD6B3)",
        width:`${progress * 100}%`, transition:"width .1s linear",
        boxShadow:"0 0 8px rgba(232,197,71,0.4)" }} />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ApproachPage() {
  return (
    <PageShell>
      <Helmet>
        <title>Our Approach — TODO Growth</title>
        <meta name="description" content="The five-phase operational methodology behind every TODO Growth engagement — Audit, Strategy, Build, Launch, Support." />
        <style>{`
          @keyframes ap-up {
            from { opacity:0; transform:translateY(20px); }
            to   { opacity:1; transform:translateY(0); }
          }
          .ap-fade { animation: ap-up .7s cubic-bezier(.22,1,.36,1) both; }
        `}</style>
      </Helmet>

      <ProgressBar />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section style={{
        position:"relative", overflow:"hidden",
        background:"linear-gradient(160deg,#0d0f1a 0%,#0c1020 60%,#080b14 100%)",
        padding:"5rem 1.5rem 4rem",
        borderBottom:"1px solid rgba(255,255,255,0.05)",
      }}>
        {/* Blueprint grid */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          <div style={{ position:"absolute", inset:0,
            backgroundImage:`
              linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
            `,
            backgroundSize:"48px 48px" }} />
          {/* Glow accents */}
          <div style={{ position:"absolute", top:"10%", right:"10%", width:"35%", height:"50%",
            borderRadius:"50%", background:"radial-gradient(circle,rgba(232,197,71,0.05) 0%,transparent 65%)" }} />
          <div style={{ position:"absolute", bottom:"5%", left:"5%", width:"30%", height:"40%",
            borderRadius:"50%", background:"radial-gradient(circle,rgba(93,214,179,0.04) 0%,transparent 65%)" }} />
        </div>

        <div style={{ maxWidth:"72rem", margin:"0 auto", position:"relative", zIndex:1 }}>
          {/* Eyebrow */}
          <div className="ap-fade" style={{ animationDelay:"0.05s",
            display:"flex", alignItems:"center", gap:"12px", marginBottom:"2rem" }}>
            <span style={{ width:"24px", height:"1px", background:"rgba(245,245,240,0.25)", display:"block" }} />
            <span style={{ fontFamily:"Space Mono,monospace", fontSize:"0.58rem",
              letterSpacing:"0.22em", textTransform:"uppercase",
              color:"rgba(245,245,240,0.35)" }}>
              04 — Operational Methodology
            </span>
          </div>

          {/* Headline */}
          <h1 className="ap-fade" style={{ animationDelay:"0.1s",
            fontFamily:"Space Grotesk,sans-serif", fontWeight:800,
            fontSize:"clamp(3rem,7vw,6.5rem)", lineHeight:0.92,
            letterSpacing:"-0.055em", color:"#f5f5f0", marginBottom:"2rem" }}>
            Growth is<br />
            <em style={{ fontStyle:"italic", fontWeight:400,
              color:"rgba(245,245,240,0.35)" }}>engineered.</em>
          </h1>

          {/* Sub */}
          <p className="ap-fade" style={{ animationDelay:"0.18s",
            maxWidth:"28rem", fontSize:"0.93rem", lineHeight:1.9,
            color:"rgba(245,245,240,0.45)", marginBottom:"3rem" }}>
            A five-phase operational methodology applied to every engagement —
            from first diagnostic to ongoing infrastructure management.
          </p>

          {/* Phase pills */}
          <div className="ap-fade" style={{ animationDelay:"0.26s",
            display:"flex", alignItems:"center", flexWrap:"wrap", gap:"0" }}>
            {STEPS.map((s, i) => (
              <div key={s.num} style={{ display:"flex", alignItems:"center" }}>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"4px" }}>
                  <div style={{ width:"8px", height:"8px", borderRadius:"50%",
                    background: s.accent, boxShadow:`0 0 8px ${s.accent}` }} />
                  <span style={{ fontFamily:"Space Mono,monospace", fontSize:"0.5rem",
                    letterSpacing:"0.12em", textTransform:"uppercase", color: s.accent }}>
                    {s.name}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ width:"48px", height:"1px", marginBottom:"14px",
                    background:`linear-gradient(90deg,${s.accent}66,${STEPS[i+1].accent}66)` }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS STEPS ─────────────────────────────────────────── */}
      <div>
        {STEPS.map((step, i) => (
          <StepSection key={step.num} step={step} flip={i % 2 === 1} />
        ))}
      </div>

      {/* ── PHILOSOPHY CLOSER ─────────────────────────────────────── */}
      <section style={{
        background:"linear-gradient(180deg,#0d0f1a 0%,#080b14 100%)",
        padding:"5rem 1.5rem",
        borderTop:"1px solid rgba(255,255,255,0.05)",
        borderBottom:"1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ maxWidth:"72rem", margin:"0 auto",
          display:"grid", gap:"4rem",
          gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))" }}>
          {[
            { label:"01", title:"No guesswork", desc:"Every recommendation follows structured analysis. We don't suggest before we understand." },
            { label:"02", title:"Systems first", desc:"We build infrastructure, not campaigns. The difference is compounding return versus one-time effort." },
            { label:"03", title:"Coordinated execution", desc:"Every team member operates from the same plan. No silos, no miscommunication, no waste." },
            { label:"04", title:"Continuous iteration", desc:"Launch is not the end. Systems are refined based on performance data in every review cycle." },
          ].map((p) => (
            <div key={p.label} style={{ borderTop:`1px solid rgba(255,255,255,0.07)`, paddingTop:"1.5rem" }}>
              <div style={{ fontFamily:"Space Mono,monospace", fontSize:"0.52rem",
                letterSpacing:"0.2em", color:"rgba(245,245,240,0.22)",
                marginBottom:"0.75rem" }}>
                {p.label}
              </div>
              <div style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:700,
                fontSize:"1rem", color:"#f5f5f0", marginBottom:"0.6rem" }}>
                {p.title}
              </div>
              <div style={{ fontFamily:"Space Grotesk,sans-serif", fontSize:"0.82rem",
                lineHeight:1.7, color:"rgba(245,245,240,0.4)" }}>
                {p.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section style={{
        position:"relative", overflow:"hidden",
        background:"#0d0f1a",
        padding:"8rem 1.5rem",
      }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:`
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize:"48px 48px" }} />
        <div style={{ position:"absolute", top:"20%", left:"30%", width:"40%", height:"60%",
          borderRadius:"50%", pointerEvents:"none",
          background:"radial-gradient(circle,rgba(232,197,71,0.05) 0%,transparent 70%)" }} />

        <div style={{ maxWidth:"72rem", margin:"0 auto", position:"relative", zIndex:1 }}>
          <div style={{ maxWidth:"42rem" }}>
            <div style={{ fontFamily:"Space Mono,monospace", fontSize:"0.58rem",
              letterSpacing:"0.22em", textTransform:"uppercase",
              color:"rgba(245,245,240,0.28)", marginBottom:"1.5rem" }}>
              Begin the process
            </div>
            <h2 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:800,
              fontSize:"clamp(2.4rem,5vw,4.5rem)", lineHeight:0.95,
              letterSpacing:"-0.05em", color:"#f5f5f0", marginBottom:"1.5rem" }}>
              Scalable growth begins<br />
              <em style={{ fontStyle:"italic", fontWeight:400,
                color:"rgba(245,245,240,0.4)" }}>
                with structured execution.
              </em>
            </h2>
            <p style={{ fontSize:"0.9rem", lineHeight:1.85,
              color:"rgba(245,245,240,0.4)", marginBottom:"3rem", maxWidth:"28rem" }}>
              Every engagement starts with a free 45-minute audit session.
              We map your current state and design the precise system your brand needs next.
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:"1rem", alignItems:"center" }}>
              <Link
                to="/discovery"
                style={{
                  display:"inline-flex", alignItems:"center", gap:"10px",
                  fontFamily:"Space Grotesk,sans-serif", fontWeight:700,
                  fontSize:"0.75rem", letterSpacing:"0.08em", textTransform:"uppercase",
                  textDecoration:"none", color:"#0d0f1a",
                  background:"linear-gradient(135deg,#F0CF5A 0%,#E8C547 60%,#D4A830 100%)",
                  padding:"1rem 2rem", borderRadius:"100px",
                  boxShadow:"0 0 28px rgba(232,197,71,0.3)",
                  transition:"transform .25s, box-shadow .25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 0 44px rgba(232,197,71,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = "0 0 28px rgba(232,197,71,0.3)";
                }}
              >
                Start the audit <ArrowRight size={14} />
              </Link>
              <Link
                to="/packages"
                style={{
                  display:"inline-flex", alignItems:"center", gap:"8px",
                  fontFamily:"Space Mono,monospace", fontSize:"0.6rem",
                  letterSpacing:"0.1em", textTransform:"uppercase",
                  textDecoration:"none", color:"rgba(245,245,240,0.4)",
                  borderBottom:"1px solid rgba(245,245,240,0.15)", paddingBottom:"2px",
                  transition:"color .2s, border-color .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#5DD6B3";
                  e.currentTarget.style.borderColor = "#5DD6B3";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(245,245,240,0.4)";
                  e.currentTarget.style.borderColor = "rgba(245,245,240,0.15)";
                }}
              >
                View packages →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
