import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { ArrowRight, Hotel, UtensilsCrossed, Building2, Plane, ShoppingBag, HeartPulse } from "lucide-react";

// ─── Industry definitions ─────────────────────────────────────────────────────
interface Industry {
  id: string;
  index: string;
  name: string;
  tagline: string;
  insight: string;
  painPoint: string;
  systems: string[];
  accent: string;
  glow: string;
  icon: React.ElementType;
  visualPattern: "hospitality" | "restaurant" | "realestate" | "tourism" | "retail" | "clinic";
  flip?: boolean;
}

const INDUSTRIES: Industry[] = [
  {
    id: "hospitality",
    index: "01",
    name: "Hospitality",
    tagline: "Luxury presence for premium destinations.",
    insight: "Hotels and lodges lose guests to competitors with stronger visual presence — not better rooms.",
    painPoint: "Invisible online. Underbooked despite being exceptional.",
    systems: ["Cinematic property reels", "Review & reputation workflow", "Content calendar system", "Direct booking content strategy"],
    accent: "#E8C547",
    glow: "rgba(232,197,71,0.15)",
    icon: Hotel,
    visualPattern: "hospitality",
  },
  {
    id: "restaurants",
    index: "02",
    name: "Restaurants & Cafés",
    tagline: "Content that makes people hungry before they arrive.",
    insight: "Food businesses that invest in visual storytelling fill tables 3× faster than those who don't.",
    painPoint: "Inconsistent social presence. No system behind the content.",
    systems: ["Dish & atmosphere reels", "Menu launch campaigns", "Reservation automation", "Review response templates"],
    accent: "#E87D7D",
    glow: "rgba(232,125,125,0.15)",
    icon: UtensilsCrossed,
    visualPattern: "restaurant",
    flip: true,
  },
  {
    id: "realestate",
    index: "03",
    name: "Real Estate",
    tagline: "Architectural storytelling that sells before the viewing.",
    insight: "Properties with cinematic content sell 40% faster and attract higher-quality leads.",
    painPoint: "Listings that look average. Leads that don't convert.",
    systems: ["Cinematic walkthroughs", "Listing photography system", "Lead CRM & tracking", "Campaign creative"],
    accent: "#5DD6B3",
    glow: "rgba(93,214,179,0.15)",
    icon: Building2,
    visualPattern: "realestate",
  },
  {
    id: "tourism",
    index: "04",
    name: "Tourism & Experiences",
    tagline: "Turn experiences into unforgettable visual journeys.",
    insight: "Travelers choose destinations based on digital emotion — what they feel before they book.",
    painPoint: "Amazing experiences that look ordinary online.",
    systems: ["Experience documentation", "Destination marketing content", "TripAdvisor reputation system", "Tour campaign creative"],
    accent: "#7DB8E8",
    glow: "rgba(125,184,232,0.15)",
    icon: Plane,
    visualPattern: "tourism",
    flip: true,
  },
  {
    id: "retail",
    index: "05",
    name: "Retail & E-commerce",
    tagline: "Product content systems that drive consistent revenue.",
    insight: "Brands with structured product content generate 2× more repeat purchases online.",
    painPoint: "No posting system. Inconsistent product visibility.",
    systems: ["Product content system", "Campaign creative library", "Structured posting calendar", "E-commerce content strategy"],
    accent: "#C8A8E9",
    glow: "rgba(200,168,233,0.15)",
    icon: ShoppingBag,
    visualPattern: "retail",
  },
  {
    id: "clinics",
    index: "06",
    name: "Clinics & Services",
    tagline: "Trust-first presence for care-focused businesses.",
    insight: "Patients choose clinics based on trust signals — reviews, tone, and digital credibility.",
    painPoint: "Low online visibility. Reputation not actively managed.",
    systems: ["Trust-first brand system", "Review reminder automation", "Calendar coordination", "Educational content strategy"],
    accent: "#5DD6B3",
    glow: "rgba(93,214,179,0.15)",
    icon: HeartPulse,
    visualPattern: "clinic",
    flip: true,
  },
];

// ─── Visual environments per industry ────────────────────────────────────────
function IndustryVisual({ pattern, accent, glow }: { pattern: Industry["visualPattern"]; accent: string; glow: string }) {
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
    const col = (a: number) => `rgba(${ar},${ag},${ab},${a})`;

    const draw = (now: number) => {
      const dpr2 = window.devicePixelRatio || 1;
      const W = canvas.width / dpr2;
      const H = canvas.height / dpr2;
      const t = (now - startRef.current) / 1000;
      ctx.clearRect(0, 0, W, H);

      if (pattern === "hospitality") {
        // Elegant slow-breathing concentric rings
        for (let i = 0; i < 5; i++) {
          const r = (80 + i * 55) + Math.sin(t * 0.4 + i * 0.6) * 10;
          ctx.beginPath();
          ctx.arc(W * 0.5, H * 0.5, r, 0, Math.PI * 2);
          ctx.strokeStyle = col(0.06 - i * 0.01);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        // Slow orbiting particles
        for (let i = 0; i < 8; i++) {
          const angle = t * 0.2 + (i * Math.PI * 2) / 8;
          const r = 130 + Math.sin(t * 0.3 + i) * 20;
          const x = W * 0.5 + Math.cos(angle) * r;
          const y = H * 0.5 + Math.sin(angle) * r * 0.55;
          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = col(0.5 + Math.sin(t + i) * 0.3);
          ctx.shadowColor = accent;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        // Centre glow
        const g = ctx.createRadialGradient(W*.5,H*.5,0,W*.5,H*.5,160);
        g.addColorStop(0, col(0.12)); g.addColorStop(1, col(0));
        ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
      }

      else if (pattern === "restaurant") {
        // Dynamic energetic grid
        const cols = 8, rows = 6;
        for (let x = 0; x < cols; x++) {
          for (let y = 0; y < rows; y++) {
            const cx = (x / cols + 0.5 / cols) * W;
            const cy = (y / rows + 0.5 / rows) * H;
            const wave = Math.sin(t * 1.2 + x * 0.8 + y * 0.6) * 0.5 + 0.5;
            if (wave > 0.55) {
              ctx.beginPath();
              ctx.arc(cx, cy, 3 + wave * 5, 0, Math.PI * 2);
              ctx.fillStyle = col(wave * 0.4);
              ctx.fill();
            }
          }
        }
        // Fast diagonal lines
        for (let i = 0; i < 5; i++) {
          const progress = ((t * 0.5 + i * 0.2) % 1);
          ctx.beginPath();
          ctx.moveTo(progress * W * 1.5 - W * 0.25, 0);
          ctx.lineTo(progress * W * 1.5 - W * 0.25 - H * 0.6, H);
          ctx.strokeStyle = col(0.06);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      else if (pattern === "realestate") {
        // Structural grid lines
        const step = 40;
        for (let x = 0; x < W; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0); ctx.lineTo(x, H);
          ctx.strokeStyle = col(0.05);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
        for (let y = 0; y < H; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y); ctx.lineTo(W, y);
          ctx.strokeStyle = col(0.05);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
        // Architectural rectangle outlines
        for (let i = 0; i < 3; i++) {
          const phase = t * 0.15 + i * 0.3;
          const s = 0.55 + Math.sin(phase) * 0.05;
          const rw = W * s; const rh = H * s * 0.7;
          ctx.beginPath();
          ctx.rect((W - rw) / 2, (H - rh) / 2, rw, rh);
          ctx.strokeStyle = col(0.1 - i * 0.03);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        // Corner dots
        const corners = [[W*.2,H*.2],[W*.8,H*.2],[W*.8,H*.8],[W*.2,H*.8]];
        corners.forEach(([cx,cy],i) => {
          ctx.beginPath();
          ctx.arc(cx,cy, 3 + Math.sin(t*0.6+i)*1.5,0,Math.PI*2);
          ctx.fillStyle = col(0.6);
          ctx.shadowColor = accent; ctx.shadowBlur = 10;
          ctx.fill(); ctx.shadowBlur = 0;
        });
      }

      else if (pattern === "tourism") {
        // Flowing wave lines
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          for (let x = 0; x <= W; x += 4) {
            const y = H * 0.5 + Math.sin(x / W * Math.PI * 2 + t * 0.7 + i * 0.5) * (30 + i * 15);
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = col(0.07 - i * 0.01);
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        // Floating star particles
        for (let i = 0; i < 20; i++) {
          const bx = ((i * 137.5) % 1) * W;
          const by = ((i * 97.3)  % 1) * H;
          const py = by + Math.sin(t * 0.4 + i) * 12;
          const alpha = 0.3 + Math.sin(t * 0.5 + i * 0.7) * 0.25;
          ctx.beginPath();
          ctx.arc(bx, py, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = col(alpha);
          ctx.fill();
        }
      }

      else if (pattern === "retail") {
        // Bouncing product grid
        for (let i = 0; i < 12; i++) {
          const bx = ((i * 83.1) % 1) * W;
          const by = ((i * 61.7) % 1) * H;
          const py = by + Math.sin(t * 0.8 + i * 0.4) * 8;
          const s  = 12 + Math.sin(t * 0.6 + i) * 4;
          ctx.strokeRect(bx - s/2, py - s/2, s, s);
          ctx.strokeStyle = col(0.15 + Math.sin(t + i) * 0.08);
          ctx.lineWidth = 0.8;
          ctx.strokeRect(bx - s/2, py - s/2, s, s);
        }
        // Diagonal shimmer band
        const shimmerX = ((t * 0.3) % 1.5) * W - W * 0.25;
        const sg = ctx.createLinearGradient(shimmerX, 0, shimmerX + 80, H);
        sg.addColorStop(0, col(0)); sg.addColorStop(0.5, col(0.06)); sg.addColorStop(1, col(0));
        ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);
      }

      else if (pattern === "clinic") {
        // Calm precise crosshairs
        ctx.beginPath();
        ctx.moveTo(W*.5, 0); ctx.lineTo(W*.5, H);
        ctx.strokeStyle = col(0.05); ctx.lineWidth = 0.5; ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, H*.5); ctx.lineTo(W, H*.5);
        ctx.strokeStyle = col(0.05); ctx.lineWidth = 0.5; ctx.stroke();
        // Expanding soft rings (slow)
        for (let i = 0; i < 4; i++) {
          const phase = (t * 0.25 + i * 0.25) % 1;
          ctx.beginPath();
          ctx.arc(W*.5, H*.5, phase * 180, 0, Math.PI * 2);
          ctx.strokeStyle = col(0.12 * (1 - phase));
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        // Gentle centre dot
        const cg = ctx.createRadialGradient(W*.5,H*.5,0,W*.5,H*.5,60);
        cg.addColorStop(0,col(0.2)); cg.addColorStop(1,col(0));
        ctx.fillStyle = cg; ctx.beginPath();
        ctx.arc(W*.5,H*.5,60,0,Math.PI*2); ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, [pattern, accent]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width:"100%", height:"100%", display:"block", opacity:0.85 }}
    />
  );
}

// ─── Fade-in on scroll hook ───────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ─── Industry Section ─────────────────────────────────────────────────────────
function IndustrySection({ ind }: { ind: Industry }) {
  const { ref, visible } = useFadeIn();
  const Icon = ind.icon;

  const copy = (
    <div style={{
      display:"flex", flexDirection:"column", justifyContent:"center",
      padding:"4rem 3rem",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : `translateX(${ind.flip ? "30px" : "-30px"})`,
      transition: "opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1)",
    }}>
      {/* Index + icon */}
      <div style={{ display:"flex", alignItems:"center", gap:"1rem", marginBottom:"2rem" }}>
        <div style={{ width:"44px", height:"44px", borderRadius:"12px",
          background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)",
          display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <Icon size={20} color={ind.accent} />
        </div>
        <span style={{ fontFamily:"Space Mono,monospace", fontSize:"0.55rem",
          letterSpacing:"0.22em", textTransform:"uppercase",
          color:"rgba(245,245,240,0.28)" }}>
          {ind.index} — Industry
        </span>
      </div>

      {/* Name */}
      <h2 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:800,
        fontSize:"clamp(2.2rem,4vw,3.8rem)", lineHeight:0.95,
        letterSpacing:"-0.045em", color:"#f5f5f0", marginBottom:"0.75rem" }}>
        {ind.name}
      </h2>

      {/* Tagline */}
      <p style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:400,
        fontStyle:"italic", fontSize:"1.05rem", lineHeight:1.5,
        color: ind.accent, marginBottom:"1.75rem" }}>
        {ind.tagline}
      </p>

      {/* Insight */}
      <p style={{ fontFamily:"Space Grotesk,sans-serif", fontSize:"0.9rem",
        lineHeight:1.8, color:"rgba(245,245,240,0.55)", marginBottom:"1rem",
        maxWidth:"28rem" }}>
        {ind.insight}
      </p>

      {/* Pain point */}
      <div style={{ display:"flex", alignItems:"flex-start", gap:"10px",
        padding:"0.9rem 1.1rem", borderRadius:"10px",
        background:"rgba(255,255,255,0.03)",
        border:"1px solid rgba(255,255,255,0.07)",
        marginBottom:"2rem", maxWidth:"28rem" }}>
        <span style={{ width:"6px", height:"6px", borderRadius:"50%", flexShrink:0,
          marginTop:"6px", background:ind.accent }} />
        <span style={{ fontFamily:"Space Grotesk,sans-serif", fontSize:"0.82rem",
          fontStyle:"italic", color:"rgba(245,245,240,0.45)", lineHeight:1.6 }}>
          {ind.painPoint}
        </span>
      </div>

      {/* Systems */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem", marginBottom:"2.5rem" }}>
        {ind.systems.map((s) => (
          <span key={s} style={{
            fontFamily:"Space Mono,monospace", fontSize:"0.55rem",
            letterSpacing:"0.1em", textTransform:"uppercase",
            color:"rgba(245,245,240,0.55)", background:"rgba(255,255,255,0.04)",
            border:"1px solid rgba(255,255,255,0.08)",
            padding:"0.3rem 0.75rem", borderRadius:"4px",
          }}>
            {s}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Link
        to="/discovery"
        style={{
          display:"inline-flex", alignItems:"center", gap:"8px",
          fontFamily:"Space Grotesk,sans-serif", fontWeight:700,
          fontSize:"0.72rem", letterSpacing:"0.08em", textTransform:"uppercase",
          textDecoration:"none", color:"#5DD6B3",
          border:"none", borderBottom:"1px solid rgba(93,214,179,0.35)",
          paddingBottom:"3px", width:"fit-content",
          transition:"all .25s cubic-bezier(.22,1,.36,1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#f5f5f0";
          e.currentTarget.style.borderColor = "#5DD6B3";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#5DD6B3";
          e.currentTarget.style.borderColor = "rgba(93,214,179,0.35)";
        }}
      >
        Start a conversation <ArrowRight size={13} />
      </Link>
    </div>
  );

  const visual = (
    <div style={{
      position:"relative", minHeight:"420px",
      background:`radial-gradient(circle at 50% 50%, ${ind.glow} 0%, rgba(13,15,26,0.5) 70%)`,
      overflow:"hidden",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : `translateX(${ind.flip ? "-30px" : "30px"})`,
      transition: "opacity .9s .1s cubic-bezier(.22,1,.36,1), transform .9s .1s cubic-bezier(.22,1,.36,1)",
    }}>
      <IndustryVisual pattern={ind.visualPattern} accent={ind.accent} glow={ind.glow} />
      {/* Index watermark */}
      <div style={{ position:"absolute", bottom:"1.5rem", right:"1.5rem",
        fontFamily:"Space Mono,monospace", fontSize:"4rem", fontWeight:700,
        color:`${ind.accent}10`, lineHeight:1, userSelect:"none" }}>
        {ind.index}
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
        borderTop:"1px solid rgba(255,255,255,0.05)",
      }}
    >
      {ind.flip ? <>{visual}{copy}</> : <>{copy}{visual}</>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function IndustriesPage() {
  return (
    <PageShell>
      <Helmet>
        <title>Industries — TODO Growth</title>
        <meta name="description" content="Brand, content, and AI workflows for hospitality, restaurants, real estate, tourism, retail, and clinics across East Africa." />

      </Helmet>

      {/* ── INDUSTRY SECTIONS ──────────────────────────────────── */}
      <div style={{ background:"#0d0f1a" }}>
        {INDUSTRIES.map((ind) => (
          <div key={ind.id} id={ind.id}>
            <IndustrySection ind={ind} />
          </div>
        ))}
      </div>

      {/* ── FINAL CTA ──────────────────────────────────────────── */}
      <section style={{
        position:"relative", overflow:"hidden",
        background:"linear-gradient(135deg,#0d0f1a 0%,#0f1525 50%,#0a0f1e 100%)",
        padding:"7rem 1.5rem",
        borderTop:"1px solid rgba(93,214,179,0.08)",
      }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          <div style={{ position:"absolute", top:"20%", left:"10%", width:"40%", height:"60%",
            borderRadius:"50%", background:"radial-gradient(circle,rgba(93,214,179,0.06) 0%,transparent 70%)" }} />
          <div style={{ position:"absolute", bottom:"10%", right:"5%", width:"45%", height:"55%",
            borderRadius:"50%", background:"radial-gradient(circle,rgba(232,197,71,0.05) 0%,transparent 70%)" }} />
        </div>

        <div style={{ maxWidth:"72rem", margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
          <div style={{ fontFamily:"Space Mono,monospace", fontSize:"0.6rem",
            letterSpacing:"0.2em", textTransform:"uppercase", color:"#5DD6B3", marginBottom:"1.5rem" }}>
            Don't see your industry?
          </div>
          <h2 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:800,
            fontSize:"clamp(2rem,5vw,4rem)", lineHeight:0.97,
            letterSpacing:"-0.045em", color:"#f5f5f0", marginBottom:"1.25rem" }}>
            We work with any business<br />
            <em style={{ fontStyle:"italic", fontWeight:400, color:"#E8C547" }}>serious about growth.</em>
          </h2>
          <p style={{ maxWidth:"28rem", margin:"0 auto 3rem", fontSize:"0.93rem",
            lineHeight:1.85, color:"rgba(245,245,240,0.45)" }}>
            Every engagement starts with a free discovery session.
            We'll map your industry's specific growth gaps and design the right system.
          </p>
          <Link
            to="/discovery"
            style={{
              display:"inline-flex", alignItems:"center", gap:"10px",
              fontFamily:"Space Grotesk,sans-serif", fontWeight:700,
              fontSize:"0.78rem", letterSpacing:"0.08em", textTransform:"uppercase",
              textDecoration:"none", color:"#0d0f1a",
              background:"linear-gradient(135deg,#F0CF5A 0%,#E8C547 60%,#D4A830 100%)",
              padding:"1rem 2rem", borderRadius:"100px",
              boxShadow:"0 0 32px rgba(232,197,71,0.35)",
              transition:"transform .25s, box-shadow .25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow = "0 0 48px rgba(232,197,71,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "0 0 32px rgba(232,197,71,0.35)";
            }}
          >
            Book free discovery <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
