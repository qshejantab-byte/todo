import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { PageShell } from "@/components/PageShell";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

// ─── Form steps ───────────────────────────────────────────────────────────────
interface FormData {
  name: string;
  email: string;
  business: string;
  focus: string;
  message: string;
}

const FOCUS_OPTIONS = [
  { value: "brand",     label: "Brand clarity & positioning",  desc: "How we're perceived in the market" },
  { value: "marketing", label: "Marketing & content gaps",     desc: "Visibility and content consistency" },
  { value: "workflow",  label: "Workflow & operations",        desc: "Friction slowing our team down" },
  { value: "growth",    label: "Growth strategy & roadmap",    desc: "Where to focus for fastest results" },
  { value: "unsure",    label: "Not sure yet",                 desc: "We'll figure it out together" },
];

const JOURNEY_STEPS = [
  { num: "01", label: "Discovery Session",    desc: "45-minute strategic conversation", color: "#E8C547" },
  { num: "02", label: "Strategic Analysis",   desc: "We map your gaps and opportunities", color: "#5DD6B3" },
  { num: "03", label: "Growth Blueprint",     desc: "A clear system designed for your stage", color: "#C8A8E9" },
  { num: "04", label: "Implementation",       desc: "Coordinated execution across all systems", color: "#E87D7D" },
];

const INSIGHTS = [
  { headline: "We uncover where visibility is leaking.", body: "Most brands lose attention at predictable points. We find exactly where — and why." },
  { headline: "We identify operational drag.", body: "The workflows slowing your team, the tasks that can be automated, the bottlenecks compounding costs." },
  { headline: "We map your clearest growth opportunities.", body: "Not a generic recommendation. A prioritised, stage-specific roadmap built for where you are now." },
  { headline: "We tell you the truth.", body: "No inflated promises. A honest assessment of what's working, what isn't, and what to do next." },
];

// ─── Fade-in on scroll ────────────────────────────────────────────────────────
function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
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

// ─── Ambient canvas background ────────────────────────────────────────────────
function AmbientCanvas() {
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

    const draw = (now: number) => {
      const d = window.devicePixelRatio || 1;
      const W = canvas.width / d;
      const H = canvas.height / d;
      const t = (now - startRef.current) / 1000;
      ctx.clearRect(0, 0, W, H);

      // Slow breathing light pools
      const pools = [
        { x: W * 0.15, y: H * 0.3,  r: 280, color: "232,197,71",  speed: 0.18 },
        { x: W * 0.85, y: H * 0.6,  r: 260, color: "93,214,179",  speed: 0.22 },
        { x: W * 0.5,  y: H * 0.15, r: 200, color: "200,168,233", speed: 0.14 },
      ];
      pools.forEach((p) => {
        const alpha = 0.04 + Math.sin(t * p.speed) * 0.02;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, `rgba(${p.color},${alpha})`);
        g.addColorStop(1, `rgba(${p.color},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      // Very subtle floating particles
      for (let i = 0; i < 18; i++) {
        const bx = ((i * 137.5) % 1) * W;
        const by = ((i * 97.3 + t * 0.025 * ((i % 3) + 0.5)) % 1) * H;
        const alpha = 0.08 + Math.sin(t * 0.3 + i) * 0.04;
        ctx.beginPath();
        ctx.arc(bx, by, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,245,240,${alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return (
    <canvas ref={canvasRef}
      style={{ position:"absolute", inset:0, width:"100%", height:"100%", display:"block", pointerEvents:"none" }} />
  );
}

// ─── Premium input component ──────────────────────────────────────────────────
function PremiumInput({
  id, name, type = "text", label, placeholder, required, value, onChange,
}: {
  id: string; name: string; type?: string; label: string;
  placeholder: string; required?: boolean; value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom:"1.75rem" }}>
      <label htmlFor={id} style={{
        display:"block", fontFamily:"Space Mono,monospace",
        fontSize:"0.55rem", letterSpacing:"0.22em", textTransform:"uppercase",
        color: focused ? "#5DD6B3" : "rgba(245,245,240,0.35)",
        marginBottom:"0.6rem", transition:"color .2s",
      }}>
        {label}{required && <span style={{ color:"#E8C547", marginLeft:"4px" }}>*</span>}
      </label>
      <input
        id={id} name={name} type={type}
        required={required} placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width:"100%", boxSizing:"border-box",
          background:"rgba(255,255,255,0.03)",
          border:`1px solid ${focused ? "#5DD6B3" : "rgba(255,255,255,0.1)"}`,
          borderRadius:"12px", padding:"0.9rem 1.1rem",
          fontFamily:"Space Grotesk,sans-serif", fontSize:"0.92rem",
          color:"#f5f5f0", outline:"none",
          boxShadow: focused ? "0 0 0 4px rgba(93,214,179,0.08)" : "none",
          transition:"border-color .25s, box-shadow .25s",
        }}
      />
    </div>
  );
}

// ─── Conversational multi-step form ──────────────────────────────────────────
function DiscoveryForm() {
  const [step, setStep]         = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [form, setForm]         = useState<FormData>({
    name: "", email: "", business: "", focus: "", message: "",
  });

  const set = (key: keyof FormData) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const steps = [
    {
      question: "Let's start with you.",
      sub: "Who are we speaking with?",
      valid: form.name.length > 1 && form.email.includes("@"),
      content: (
        <>
          <PremiumInput id="name" name="name" label="Your name" placeholder="Jane Doe"
            required value={form.name} onChange={set("name")} />
          <PremiumInput id="email" name="email" type="email" label="Email address"
            placeholder="jane@yourcompany.com" required value={form.email} onChange={set("email")} />
          <PremiumInput id="business" name="business" label="Your business (optional)"
            placeholder="Company or project name" value={form.business} onChange={set("business")} />
        </>
      ),
    },
    {
      question: "What's the biggest challenge right now?",
      sub: "This helps us prepare the right questions.",
      valid: form.focus !== "",
      content: (
        <div style={{ display:"flex", flexDirection:"column", gap:"0.65rem", marginBottom:"1.5rem" }}>
          {FOCUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => set("focus")(opt.value)}
              style={{
                display:"flex", alignItems:"center", gap:"1rem",
                padding:"1rem 1.25rem", borderRadius:"12px",
                border:`1px solid ${form.focus === opt.value ? "#E8C547" : "rgba(255,255,255,0.08)"}`,
                background: form.focus === opt.value ? "rgba(232,197,71,0.08)" : "rgba(255,255,255,0.02)",
                cursor:"pointer", textAlign:"left",
                transition:"all .2s cubic-bezier(.22,1,.36,1)",
                boxShadow: form.focus === opt.value ? "0 0 0 1px rgba(232,197,71,0.2)" : "none",
              }}
            >
              <div style={{
                width:"18px", height:"18px", borderRadius:"50%", flexShrink:0,
                border:`1.5px solid ${form.focus === opt.value ? "#E8C547" : "rgba(255,255,255,0.2)"}`,
                background: form.focus === opt.value ? "#E8C547" : "transparent",
                display:"flex", alignItems:"center", justifyContent:"center",
                transition:"all .2s",
              }}>
                {form.focus === opt.value && <Check size={10} color="#0d0f1a" strokeWidth={3} />}
              </div>
              <div>
                <div style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:600,
                  fontSize:"0.88rem", color: form.focus === opt.value ? "#E8C547" : "#f5f5f0",
                  marginBottom:"2px", transition:"color .2s" }}>
                  {opt.label}
                </div>
                <div style={{ fontFamily:"Space Grotesk,sans-serif", fontSize:"0.75rem",
                  color:"rgba(245,245,240,0.38)" }}>
                  {opt.desc}
                </div>
              </div>
            </button>
          ))}
        </div>
      ),
    },
    {
      question: "Anything you'd like us to know?",
      sub: "Context helps us make the most of our time together.",
      valid: true,
      content: (
        <div style={{ marginBottom:"1.75rem" }}>
          <label htmlFor="message" style={{
            display:"block", fontFamily:"Space Mono,monospace",
            fontSize:"0.55rem", letterSpacing:"0.22em", textTransform:"uppercase",
            color:"rgba(245,245,240,0.35)", marginBottom:"0.6rem",
          }}>
            Additional context <span style={{ color:"rgba(245,245,240,0.2)" }}>(optional)</span>
          </label>
          <textarea
            id="message" name="message" rows={5}
            placeholder="Share anything that would help us understand your situation…"
            value={form.message}
            onChange={(e) => set("message")(e.target.value)}
            style={{
              width:"100%", boxSizing:"border-box", resize:"none",
              background:"rgba(255,255,255,0.03)",
              border:"1px solid rgba(255,255,255,0.1)",
              borderRadius:"12px", padding:"0.9rem 1.1rem",
              fontFamily:"Space Grotesk,sans-serif", fontSize:"0.92rem",
              color:"#f5f5f0", outline:"none",
              lineHeight:1.7,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#5DD6B3";
              e.currentTarget.style.boxShadow = "0 0 0 4px rgba(93,214,179,0.08)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>
      ),
    },
  ];

  async function handleSubmit() {
    setLoading(true);
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    try {
      await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST", body: data,
        headers: { Accept: "application/json" },
      });
      setSubmitted(true);
    } catch {
      const { name, email, message, focus, business } = form;
      window.location.href = `mailto:Richie@todo.rw?subject=Discovery Session — ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nBusiness: ${business}\nFocus: ${focus}\n\n${message}`)}`;
    } finally {
      setLoading(false);
    }
  }

  const current = steps[step];
  const progress = ((step) / steps.length) * 100;

  if (submitted) {
    return (
      <div style={{ textAlign:"center", padding:"2rem 0" }}>
        <div style={{ width:"56px", height:"56px", borderRadius:"50%", margin:"0 auto 1.5rem",
          background:"rgba(93,214,179,0.15)", border:"1.5px solid #5DD6B3",
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:"0 0 24px rgba(93,214,179,0.25)" }}>
          <Check size={24} color="#5DD6B3" />
        </div>
        <h3 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:800,
          fontSize:"1.6rem", letterSpacing:"-0.03em", color:"#f5f5f0", marginBottom:"0.75rem" }}>
          You're in.
        </h3>
        <p style={{ fontFamily:"Space Grotesk,sans-serif", fontSize:"0.88rem",
          lineHeight:1.75, color:"rgba(245,245,240,0.5)", maxWidth:"20rem", margin:"0 auto" }}>
          We'll be in touch within one business day to confirm your session time.
        </p>
        <div style={{ marginTop:"2rem", display:"flex", flexDirection:"column", gap:"1rem" }}>
          {JOURNEY_STEPS.map((js, i) => (
            <div key={js.num} style={{ display:"flex", alignItems:"center", gap:"1rem",
              opacity: i === 0 ? 1 : 0.4, padding:"0.75rem 1rem",
              borderRadius:"10px", background: i === 0 ? "rgba(93,214,179,0.06)" : "transparent",
              border: i === 0 ? "1px solid rgba(93,214,179,0.2)" : "1px solid transparent" }}>
              <span style={{ fontFamily:"Space Mono,monospace", fontSize:"0.55rem",
                letterSpacing:"0.15em", color: i === 0 ? js.color : "rgba(245,245,240,0.3)" }}>
                {js.num}
              </span>
              <div>
                <div style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:600,
                  fontSize:"0.82rem", color: i === 0 ? "#f5f5f0" : "rgba(245,245,240,0.4)" }}>
                  {js.label}
                </div>
                <div style={{ fontFamily:"Space Grotesk,sans-serif", fontSize:"0.72rem",
                  color:"rgba(245,245,240,0.3)" }}>{js.desc}</div>
              </div>
              {i === 0 && (
                <div style={{ marginLeft:"auto", fontFamily:"Space Mono,monospace",
                  fontSize:"0.5rem", letterSpacing:"0.15em", textTransform:"uppercase",
                  color:"#5DD6B3" }}>
                  Next →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div style={{ marginBottom:"2rem" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"0.5rem" }}>
          <span style={{ fontFamily:"Space Mono,monospace", fontSize:"0.5rem",
            letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(245,245,240,0.3)" }}>
            Step {step + 1} of {steps.length}
          </span>
          <span style={{ fontFamily:"Space Mono,monospace", fontSize:"0.5rem",
            letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(245,245,240,0.3)" }}>
            {Math.round(progress)}% complete
          </span>
        </div>
        <div style={{ height:"2px", background:"rgba(255,255,255,0.07)", borderRadius:"2px" }}>
          <div style={{
            height:"100%", borderRadius:"2px",
            background:"linear-gradient(90deg,#E8C547,#5DD6B3)",
            width:`${progress}%`,
            transition:"width .5s cubic-bezier(.22,1,.36,1)",
            boxShadow:"0 0 8px rgba(232,197,71,0.4)",
          }} />
        </div>
      </div>

      {/* Question */}
      <div style={{ marginBottom:"2rem" }}>
        <h3 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:800,
          fontSize:"1.35rem", letterSpacing:"-0.03em", color:"#f5f5f0",
          marginBottom:"0.4rem" }}>
          {current.question}
        </h3>
        <p style={{ fontFamily:"Space Grotesk,sans-serif", fontSize:"0.82rem",
          color:"rgba(245,245,240,0.4)", lineHeight:1.6 }}>
          {current.sub}
        </p>
      </div>

      {/* Fields */}
      {current.content}

      {/* Navigation */}
      <div style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            style={{
              display:"inline-flex", alignItems:"center", gap:"6px",
              fontFamily:"Space Mono,monospace", fontSize:"0.58rem",
              letterSpacing:"0.12em", textTransform:"uppercase",
              color:"rgba(245,245,240,0.4)", background:"transparent",
              border:"1px solid rgba(255,255,255,0.1)", padding:"0.7rem 1.1rem",
              borderRadius:"100px", cursor:"pointer",
              transition:"color .2s, border-color .2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color="#f5f5f0"; e.currentTarget.style.borderColor="rgba(255,255,255,0.25)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color="rgba(245,245,240,0.4)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; }}
          >
            <ArrowLeft size={12} /> Back
          </button>
        )}

        {step < steps.length - 1 ? (
          <button
            type="button"
            disabled={!current.valid}
            onClick={() => setStep((s) => s + 1)}
            style={{
              flex:1, display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"8px",
              fontFamily:"Space Grotesk,sans-serif", fontWeight:700,
              fontSize:"0.75rem", letterSpacing:"0.08em", textTransform:"uppercase",
              color:"#0d0f1a",
              background: current.valid
                ? "linear-gradient(135deg,#F0CF5A 0%,#E8C547 60%,#D4A830 100%)"
                : "rgba(255,255,255,0.08)",
              padding:"0.85rem 1.5rem", borderRadius:"100px", border:"none",
              cursor: current.valid ? "pointer" : "not-allowed",
              boxShadow: current.valid ? "0 0 24px rgba(232,197,71,0.3)" : "none",
              transition:"all .25s cubic-bezier(.22,1,.36,1)",
            }}
            onMouseEnter={(e) => {
              if (!current.valid) return;
              e.currentTarget.style.boxShadow = "0 0 40px rgba(232,197,71,0.5)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = current.valid ? "0 0 24px rgba(232,197,71,0.3)" : "none";
              e.currentTarget.style.transform = "";
            }}
          >
            Continue <ArrowRight size={14} />
          </button>
        ) : (
          <button
            type="button"
            disabled={loading}
            onClick={handleSubmit}
            style={{
              flex:1, display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"8px",
              fontFamily:"Space Grotesk,sans-serif", fontWeight:700,
              fontSize:"0.75rem", letterSpacing:"0.08em", textTransform:"uppercase",
              color:"#0d0f1a",
              background:"linear-gradient(135deg,#F0CF5A 0%,#E8C547 60%,#D4A830 100%)",
              padding:"0.85rem 1.5rem", borderRadius:"100px", border:"none",
              cursor: loading ? "wait" : "pointer",
              boxShadow:"0 0 24px rgba(232,197,71,0.3)",
              transition:"all .25s",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Sending…" : <><span>Book Discovery Session</span> <ArrowRight size={14} /></>}
          </button>
        )}
      </div>

      <p style={{ marginTop:"1rem", textAlign:"center", fontFamily:"Space Mono,monospace",
        fontSize:"0.5rem", letterSpacing:"0.15em", textTransform:"uppercase",
        color:"rgba(245,245,240,0.22)" }}>
        Free · 45 minutes · No commitment
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DiscoveryPage() {
  const insightReveal = useFadeIn(0.12);
  const journeyReveal = useFadeIn(0.12);

  return (
    <PageShell>
      <Helmet>
        <title>Discovery Session — TODO Growth</title>
        <meta name="description" content="A focused, free strategic session to map brand gaps, marketing blind spots, workflow bottlenecks, and your clearest path to growth." />
        <style>{`
          @keyframes disc-up {
            from { opacity:0; transform:translateY(20px); }
            to   { opacity:1; transform:translateY(0); }
          }
          .disc-fade { animation: disc-up .75s cubic-bezier(.22,1,.36,1) both; }
          ::placeholder { color: rgba(245,245,240,0.22) !important; }
        `}</style>
      </Helmet>

      {/* ── CINEMATIC HERO ────────────────────────────────────────── */}
      <section style={{
        position:"relative", overflow:"hidden",
        background:"linear-gradient(180deg,#09090f 0%,#0d0f1a 60%,#0a0d18 100%)",
        minHeight:"92vh",
        display:"flex", flexDirection:"column", justifyContent:"center",
        padding:"10rem 1.5rem 6rem",
        borderBottom:"1px solid rgba(255,255,255,0.05)",
      }}>
        <AmbientCanvas />

        <div style={{ maxWidth:"72rem", margin:"0 auto", position:"relative", zIndex:1,
          display:"grid", gap:"5rem",
          gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", alignItems:"center" }}>

          {/* Left — emotional copy */}
          <div>
            <div className="disc-fade" style={{ animationDelay:"0.05s",
              display:"flex", alignItems:"center", gap:"12px", marginBottom:"2rem" }}>
              <span style={{ width:"24px", height:"1px",
                background:"linear-gradient(90deg,#E8C547,transparent)", display:"block" }} />
              <span style={{ fontFamily:"Space Mono,monospace", fontSize:"0.58rem",
                letterSpacing:"0.22em", textTransform:"uppercase", color:"#E8C547" }}>
                05 — Discovery Session
              </span>
            </div>

            <h1 className="disc-fade" style={{ animationDelay:"0.1s",
              fontFamily:"Space Grotesk,sans-serif", fontWeight:800,
              fontSize:"clamp(3rem,6.5vw,6rem)", lineHeight:0.92,
              letterSpacing:"-0.055em", color:"#f5f5f0", marginBottom:"1.75rem" }}>
              The first<br />
              conversation<br />
              <em style={{ fontStyle:"italic", fontWeight:400,
                color:"rgba(245,245,240,0.35)" }}>
                changes everything.
              </em>
            </h1>

            <p className="disc-fade" style={{ animationDelay:"0.18s",
              maxWidth:"26rem", fontSize:"0.93rem", lineHeight:1.95,
              color:"rgba(245,245,240,0.45)", marginBottom:"2.5rem" }}>
              Not a sales call. A genuine strategic analysis of where your brand is,
              where it could be, and what's standing in the way.
            </p>

            <div className="disc-fade" style={{ animationDelay:"0.26s",
              display:"flex", alignItems:"center", gap:"2rem",
              padding:"1.25rem 1.5rem", borderRadius:"14px",
              background:"rgba(255,255,255,0.03)",
              border:"1px solid rgba(255,255,255,0.07)",
              width:"fit-content" }}>
              {[
                { value:"Free",          label:"No charge" },
                { value:"45 min",        label:"Focused" },
                { value:"No commitment", label:"Zero pressure" },
              ].map((item, i) => (
                <div key={item.value} style={{ display:"flex", flexDirection:"column",
                  borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  paddingLeft: i > 0 ? "2rem" : "0" }}>
                  <span style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:700,
                    fontSize:"0.95rem", color:"#E8C547" }}>
                    {item.value}
                  </span>
                  <span style={{ fontFamily:"Space Mono,monospace", fontSize:"0.52rem",
                    letterSpacing:"0.14em", textTransform:"uppercase",
                    color:"rgba(245,245,240,0.3)", marginTop:"2px" }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="disc-fade" style={{ animationDelay:"0.22s",
            background:"rgba(255,255,255,0.025)",
            border:"1px solid rgba(255,255,255,0.08)",
            borderRadius:"24px", padding:"2.5rem",
            backdropFilter:"blur(20px)",
            boxShadow:"0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
            <div style={{ fontFamily:"Space Mono,monospace", fontSize:"0.55rem",
              letterSpacing:"0.2em", textTransform:"uppercase",
              color:"rgba(245,245,240,0.3)", marginBottom:"0.5rem" }}>
              Book your session
            </div>
            <h2 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:800,
              fontSize:"1.4rem", letterSpacing:"-0.03em",
              color:"#f5f5f0", marginBottom:"1.75rem" }}>
              Start the conversation.
            </h2>
            <DiscoveryForm />
          </div>
        </div>
      </section>

      {/* ── WHAT HAPPENS IN THE SESSION ───────────────────────────── */}
      <section style={{ background:"#0d0f1a", padding:"7rem 1.5rem" }}>
        <div ref={insightReveal.ref} style={{ maxWidth:"72rem", margin:"0 auto" }}>
          <div style={{
            opacity: insightReveal.visible ? 1 : 0,
            transform: insightReveal.visible ? "none" : "translateY(20px)",
            transition:"opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1)",
          }}>
            <div style={{ fontFamily:"Space Mono,monospace", fontSize:"0.6rem",
              letterSpacing:"0.2em", textTransform:"uppercase",
              color:"rgba(245,245,240,0.28)", marginBottom:"1rem" }}>
              What we uncover
            </div>
            <h2 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:800,
              fontSize:"clamp(2rem,4vw,3.2rem)", lineHeight:1.0,
              letterSpacing:"-0.045em", color:"#f5f5f0", marginBottom:"4rem" }}>
              45 minutes of<br />
              <em style={{ fontStyle:"italic", fontWeight:400, color:"rgba(245,245,240,0.35)" }}>
                genuine strategic clarity.
              </em>
            </h2>
          </div>

          <div style={{ display:"grid", gap:"1px",
            gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
            background:"rgba(255,255,255,0.05)",
            borderRadius:"20px", overflow:"hidden",
            border:"1px solid rgba(255,255,255,0.05)" }}>
            {INSIGHTS.map((ins, i) => (
              <div
                key={ins.headline}
                style={{
                  padding:"2.5rem 2rem",
                  background:"#0d0f1a",
                  borderRight: i < INSIGHTS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  transition:"background .25s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.025)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#0d0f1a"; }}
              >
                <div style={{ fontFamily:"Space Mono,monospace", fontSize:"0.5rem",
                  letterSpacing:"0.18em", color:"rgba(245,245,240,0.2)", marginBottom:"1rem" }}>
                  0{i + 1}
                </div>
                <h3 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:700,
                  fontSize:"0.95rem", lineHeight:1.4, color:"#f5f5f0", marginBottom:"0.75rem" }}>
                  {ins.headline}
                </h3>
                <p style={{ fontFamily:"Space Grotesk,sans-serif", fontSize:"0.82rem",
                  lineHeight:1.7, color:"rgba(245,245,240,0.38)" }}>
                  {ins.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT HAPPENS NEXT ─────────────────────────────────────── */}
      <section style={{
        background:"linear-gradient(180deg,#0a0c18 0%,#0d0f1a 100%)",
        padding:"6rem 1.5rem",
        borderTop:"1px solid rgba(255,255,255,0.05)",
      }}>
        <div ref={journeyReveal.ref} style={{ maxWidth:"72rem", margin:"0 auto" }}>
          <div style={{
            opacity: journeyReveal.visible ? 1 : 0,
            transform: journeyReveal.visible ? "none" : "translateY(20px)",
            transition:"opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1)",
          }}>
            <div style={{ fontFamily:"Space Mono,monospace", fontSize:"0.6rem",
              letterSpacing:"0.2em", textTransform:"uppercase",
              color:"rgba(245,245,240,0.28)", marginBottom:"1rem" }}>
              What happens next
            </div>
            <h2 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:800,
              fontSize:"clamp(2rem,4vw,3.2rem)", lineHeight:1.0,
              letterSpacing:"-0.045em", color:"#f5f5f0", marginBottom:"4rem" }}>
              The journey begins<br />
              <em style={{ fontStyle:"italic", fontWeight:400, color:"rgba(245,245,240,0.35)" }}>
                with one conversation.
              </em>
            </h2>

            <div style={{ display:"flex", flexDirection:"column", gap:"0" }}>
              {JOURNEY_STEPS.map((js, i) => (
                <div key={js.num} style={{
                  display:"grid", gridTemplateColumns:"80px 1fr",
                  gap:"2rem", alignItems:"start",
                }}>
                  {/* Left — number + connector */}
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                    <div style={{
                      width:"48px", height:"48px", borderRadius:"50%",
                      background:`${js.color}15`, border:`1.5px solid ${js.color}55`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      flexShrink:0, boxShadow:`0 0 16px ${js.color}20`,
                    }}>
                      <span style={{ fontFamily:"Space Mono,monospace", fontSize:"0.6rem",
                        letterSpacing:"0.1em", color: js.color }}>
                        {js.num}
                      </span>
                    </div>
                    {i < JOURNEY_STEPS.length - 1 && (
                      <div style={{ width:"1px", flex:1, minHeight:"48px",
                        background:`linear-gradient(180deg,${js.color}44,${JOURNEY_STEPS[i+1].color}22)`,
                        margin:"6px 0" }} />
                    )}
                  </div>

                  {/* Right — content */}
                  <div style={{ paddingBottom: i < JOURNEY_STEPS.length - 1 ? "2.5rem" : "0",
                    paddingTop:"10px" }}>
                    <div style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:700,
                      fontSize:"1.05rem", color: i === 0 ? js.color : "#f5f5f0",
                      marginBottom:"4px" }}>
                      {js.label}
                    </div>
                    <div style={{ fontFamily:"Space Grotesk,sans-serif", fontSize:"0.82rem",
                      color:"rgba(245,245,240,0.38)", lineHeight:1.6 }}>
                      {js.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING ───────────────────────────────────────────────── */}
      <section style={{
        position:"relative", overflow:"hidden",
        background:"#09090f", padding:"8rem 1.5rem",
        borderTop:"1px solid rgba(255,255,255,0.05)",
      }}>
        <AmbientCanvas />
        <div style={{ maxWidth:"40rem", margin:"0 auto", textAlign:"center",
          position:"relative", zIndex:1 }}>
          <h2 style={{ fontFamily:"Space Grotesk,sans-serif", fontWeight:800,
            fontSize:"clamp(2.2rem,5vw,4rem)", lineHeight:0.95,
            letterSpacing:"-0.05em", color:"#f5f5f0", marginBottom:"1.5rem" }}>
            Your next stage of growth<br />
            <em style={{ fontStyle:"italic", fontWeight:400, color:"rgba(245,245,240,0.35)" }}>
              starts with clarity.
            </em>
          </h2>
          <p style={{ fontSize:"0.9rem", lineHeight:1.9,
            color:"rgba(245,245,240,0.4)", marginBottom:"3rem" }}>
            No pressure. No obligation. Just an honest conversation about where your brand is
            and what's possible from here.
          </p>
          <a
            href="#top"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top:0, behavior:"smooth" }); }}
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
            Book your session <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </PageShell>
  );
}
