import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import emailjs from "@emailjs/browser";

// ─── EmailJS config ───────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_tyheci5";
const EMAILJS_TEMPLATE_ID = "template_0n9539s";
const EMAILJS_PUBLIC_KEY  = "C7fH5rnk5-9g05t9A";

// ─── Fade-in on scroll ────────────────────────────────────────────────────────
function useFadeIn(threshold = 0.12) {
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

// ─── Premium input ────────────────────────────────────────────────────────────
function Field({
  label, id, name, type = "text", placeholder, required, value, onChange,
}: {
  label: string; id: string; name: string; type?: string;
  placeholder: string; required?: boolean; value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  return (
    <div style={{ position: "relative", paddingTop: "1.2rem" }}>
      <label htmlFor={id} style={{
        position: "absolute",
        top: focused || filled ? "0" : "1.95rem",
        left: 0,
        fontFamily: "Space Mono, monospace",
        fontSize: focused || filled ? "0.5rem" : "0.82rem",
        letterSpacing: focused || filled ? "0.18em" : "0.02em",
        textTransform: focused || filled ? "uppercase" : "none",
        color: focused ? "#5DD6B3" : "rgba(245,245,240,0.35)",
        transition: "all .22s cubic-bezier(.22,1,.36,1)",
        pointerEvents: "none",
      }}>
        {label}{required && <span style={{ color: "#E8C547", marginLeft: "3px" }}>*</span>}
      </label>
      <input
        id={id} name={name} type={type}
        required={required} placeholder=""
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", boxSizing: "border-box",
          background: "transparent",
          border: "none",
          borderBottom: `1px solid ${focused ? "#5DD6B3" : "rgba(255,255,255,0.12)"}`,
          padding: "0.6rem 0",
          fontFamily: "Space Grotesk, sans-serif", fontSize: "0.92rem",
          color: "#f5f5f0", outline: "none",
          transition: "border-color .22s",
        }}
      />
    </div>
  );
}

function TextareaField({
  label, id, name, placeholder, required, value, onChange,
}: {
  label: string; id: string; name: string; placeholder: string;
  required?: boolean; value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;
  return (
    <div style={{ position: "relative", paddingTop: "1.2rem" }}>
      <label htmlFor={id} style={{
        position: "absolute",
        top: focused || filled ? "0" : "1.95rem",
        left: 0,
        fontFamily: "Space Mono, monospace",
        fontSize: focused || filled ? "0.5rem" : "0.82rem",
        letterSpacing: focused || filled ? "0.18em" : "0.02em",
        textTransform: focused || filled ? "uppercase" : "none",
        color: focused ? "#5DD6B3" : "rgba(245,245,240,0.35)",
        transition: "all .22s cubic-bezier(.22,1,.36,1)",
        pointerEvents: "none",
      }}>
        {label}{required && <span style={{ color: "#E8C547", marginLeft: "3px" }}>*</span>}
      </label>
      <textarea
        id={id} name={name}
        required={required}
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%", boxSizing: "border-box", resize: "none",
          background: "transparent", border: "none",
          borderBottom: `1px solid ${focused ? "#5DD6B3" : "rgba(255,255,255,0.12)"}`,
          padding: "0.6rem 0",
          fontFamily: "Space Grotesk, sans-serif", fontSize: "0.92rem",
          color: "#f5f5f0", outline: "none", lineHeight: 1.7,
          transition: "border-color .22s",
        }}
      />
    </div>
  );
}

// ─── Contact form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (k: keyof typeof form) => (v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name:     form.name,
          reply_to: form.email,
          company:  form.company.trim() !== "" ? form.company : "Not provided",
          message:  form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Something went wrong. Please email us directly at Richie@todo.rw");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div style={{ padding: "3rem 0" }}>
        <div style={{
          width: "2px", height: "32px",
          background: "#5DD6B3",
          marginBottom: "1.5rem",
        }} />
        <h3 style={{
          fontFamily: "Space Grotesk, sans-serif", fontWeight: 800,
          fontSize: "1.5rem", letterSpacing: "-0.03em",
          color: "#f5f5f0", marginBottom: "0.75rem",
        }}>
          Message received.
        </h3>
        <p style={{
          fontFamily: "Space Grotesk, sans-serif", fontSize: "0.88rem",
          lineHeight: 1.8, color: "rgba(245,245,240,0.45)", maxWidth: "22rem",
        }}>
          Every inquiry is reviewed thoughtfully. We'll be in touch within one working day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginBottom: "2.5rem" }}>
        <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "1fr 1fr" }}>
          <Field id="name" name="name" label="Your name" placeholder=""
            required value={form.name} onChange={set("name")} />
          <Field id="email" name="email" type="email" label="Email address" placeholder=""
            required value={form.email} onChange={set("email")} />
        </div>
        <Field id="company" name="company" label="Company or brand (optional)" placeholder=""
          value={form.company} onChange={set("company")} />
        <TextareaField id="message" name="message" label="What would you like to discuss?" placeholder=""
          required value={form.message} onChange={set("message")} />
      </div>

      {error && (
        <p style={{
          fontFamily: "Space Grotesk, sans-serif", fontSize: "0.8rem",
          color: "#E8C547", marginBottom: "1.25rem", lineHeight: 1.6,
        }}>
          {error}
        </p>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontFamily: "Space Grotesk, sans-serif", fontWeight: 700,
            fontSize: "0.72rem", letterSpacing: "0.07em", textTransform: "uppercase",
            color: "#0d0f1a", background: "#E8C547",
            padding: "0.85rem 1.6rem", borderRadius: "8px",
            border: "none", cursor: loading ? "wait" : "pointer",
            opacity: loading ? 0.7 : 1,
            transition: "opacity .2s",
          }}
          onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = "0.85"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = loading ? "0.7" : "1"; }}
        >
          {loading ? "Sending…" : <><span>Send message</span> <ArrowRight size={13} /></>}
        </button>
        <span style={{
          fontFamily: "Space Mono, monospace", fontSize: "0.5rem",
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: "rgba(245,245,240,0.22)",
        }}>
          We respond within one business day
        </span>
      </div>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const channelsReveal = useFadeIn();
  const formReveal     = useFadeIn();
  const closingReveal  = useFadeIn();

  return (
    <PageShell>
      <Helmet>
        <title>Contact — TODO Growth</title>
        <meta name="description" content="Reach the TODO Growth studio in Kigali, Rwanda. Richie@todo.rw" />
        <style>{`
          @keyframes ct-up {
            from { opacity:0; transform:translateY(18px); }
            to   { opacity:1; transform:translateY(0); }
          }
          .ct-fade { animation: ct-up .75s cubic-bezier(.22,1,.36,1) both; }
          input::placeholder, textarea::placeholder { color: transparent; }
        `}</style>
      </Helmet>

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section style={{
        background: "#0d0f1a",
        padding: "9rem 1.5rem 7rem",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div className="ct-fade" style={{ animationDelay: "0.05s",
            display: "flex", alignItems: "center", gap: "12px", marginBottom: "2.5rem" }}>
            <span style={{ width: "24px", height: "1px",
              background: "rgba(245,245,240,0.2)", display: "block" }} />
            <span style={{ fontFamily: "Space Mono, monospace", fontSize: "0.58rem",
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "rgba(245,245,240,0.3)" }}>
              06 — Contact
            </span>
          </div>

          <h1 className="ct-fade" style={{ animationDelay: "0.1s",
            fontFamily: "Space Grotesk, sans-serif", fontWeight: 800,
            fontSize: "clamp(3.5rem,8vw,7.5rem)", lineHeight: 0.9,
            letterSpacing: "-0.055em", color: "#f5f5f0",
            marginBottom: "2.5rem", maxWidth: "18ch" }}>
            Let's build something<br />
            <em style={{ fontStyle: "italic", fontWeight: 400,
              color: "rgba(245,245,240,0.3)" }}>
              impossible to ignore.
            </em>
          </h1>

          <div className="ct-fade" style={{ animationDelay: "0.18s",
            display: "grid", gap: "4rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            alignItems: "start" }}>
            <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem",
              lineHeight: 1.85, color: "rgba(245,245,240,0.45)", maxWidth: "28rem" }}>
              Tell us about your brand, your challenge, or the opportunity you're
              ready to pursue. We review every message strategically and respond
              with genuine intent — not automation.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              <a href="mailto:Richie@todo.rw"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "1.25rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  textDecoration: "none",
                  transition: "padding-left .25s cubic-bezier(.22,1,.36,1)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "0.5rem"; }}
                onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0"; }}
              >
                <div>
                  <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.5rem",
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "rgba(245,245,240,0.25)", marginBottom: "4px" }}>
                    Strategic email
                  </div>
                  <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600,
                    fontSize: "1rem", color: "#f5f5f0" }}>
                    Richie@todo.rw
                  </div>
                </div>
                <ArrowUpRight size={16} color="rgba(245,245,240,0.25)" />
              </a>

              <a href="https://wa.me/250794003368"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "1.25rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  textDecoration: "none",
                  transition: "padding-left .25s cubic-bezier(.22,1,.36,1)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "0.5rem"; }}
                onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0"; }}
              >
                <div>
                  <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.5rem",
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "rgba(245,245,240,0.25)", marginBottom: "4px" }}>
                    Direct WhatsApp
                  </div>
                  <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600,
                    fontSize: "1rem", color: "#f5f5f0" }}>
                    +250 794003368
                  </div>
                </div>
                <ArrowUpRight size={16} color="rgba(245,245,240,0.25)" />
              </a>

              <div style={{ padding: "1.25rem 0" }}>
                <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.5rem",
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "rgba(245,245,240,0.25)", marginBottom: "4px" }}>
                  Studio location
                </div>
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600,
                  fontSize: "1rem", color: "#f5f5f0" }}>
                  Kigali, Rwanda
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORM ──────────────────────────────────────────────────── */}
      <section style={{ background: "#0d0f1a", padding: "6rem 1.5rem" }}>
        <div ref={formReveal.ref} style={{ maxWidth: "72rem", margin: "0 auto",
          display: "grid", gap: "5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          opacity: formReveal.visible ? 1 : 0,
          transform: formReveal.visible ? "none" : "translateY(20px)",
          transition: "opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1)" }}>

          <div style={{ paddingTop: "0.5rem" }}>
            <div style={{ width: "2px", height: "48px",
              background: "linear-gradient(180deg, #E8C547, transparent)",
              marginBottom: "2rem" }} />
            <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800,
              fontSize: "clamp(1.8rem,3vw,2.8rem)", lineHeight: 1.0,
              letterSpacing: "-0.04em", color: "#f5f5f0", marginBottom: "1.25rem" }}>
              Send us a message.
            </h2>
            <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.88rem",
              lineHeight: 1.85, color: "rgba(245,245,240,0.42)", marginBottom: "2.5rem",
              maxWidth: "20rem" }}>
              Whether you have a specific project in mind or simply want to explore
              what's possible — we'd love to hear from you.
            </p>

            <div style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: "1.25rem" }}>
              {[
                "Every inquiry is reviewed with care.",
                "We respond thoughtfully, not automatically.",
                "We prioritise aligned partnerships.",
              ].map((line) => (
                <p key={line} style={{
                  fontFamily: "Space Grotesk, sans-serif", fontSize: "0.8rem",
                  color: "rgba(245,245,240,0.3)", lineHeight: 1.7, marginBottom: "0.4rem",
                }}>
                  — {line}
                </p>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* ── THREE CHANNELS ────────────────────────────────────────── */}
      <section ref={channelsReveal.ref} style={{
        background: "#09090f",
        padding: "6rem 1.5rem",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        opacity: channelsReveal.visible ? 1 : 0,
        transform: channelsReveal.visible ? "none" : "translateY(20px)",
        transition: "opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1)",
      }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.55rem",
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(245,245,240,0.22)", marginBottom: "4rem" }}>
            How to reach us
          </div>

          <div style={{ display: "grid", gap: "0",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>

            <a href="mailto:Richie@todo.rw" style={{
              display: "block", padding: "2.5rem 2rem",
              borderRight: "1px solid rgba(255,255,255,0.05)",
              textDecoration: "none",
              transition: "background .25s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.5rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "#E8C547", marginBottom: "1.5rem" }}>
                01 — Strategic Email
              </div>
              <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800,
                fontSize: "1.5rem", letterSpacing: "-0.03em", color: "#f5f5f0",
                marginBottom: "0.5rem" }}>
                Richie@todo.rw
              </div>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.8rem",
                lineHeight: 1.7, color: "rgba(245,245,240,0.35)", marginBottom: "1.5rem" }}>
                For detailed briefs, partnership inquiries, and strategic conversations.
                The preferred channel for first contact.
              </p>
              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "0.5rem",
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(245,245,240,0.25)", display: "flex", alignItems: "center", gap: "6px" }}>
                Write to us <ArrowUpRight size={11} />
              </span>
            </a>

            <a href="https://wa.me/250794003368" target="_blank" rel="noopener noreferrer"
              style={{
                display: "block", padding: "2.5rem 2rem",
                borderRight: "1px solid rgba(255,255,255,0.05)",
                textDecoration: "none",
                transition: "background .25s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.5rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "#5DD6B3", marginBottom: "1.5rem" }}>
                02 — Direct Message
              </div>
              <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800,
                fontSize: "1.5rem", letterSpacing: "-0.03em", color: "#f5f5f0",
                marginBottom: "0.5rem" }}>
                WhatsApp
              </div>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.8rem",
                lineHeight: 1.7, color: "rgba(245,245,240,0.35)", marginBottom: "1.5rem" }}>
                For fast questions, urgent timelines, and real-time conversations
                with our team in Kigali.
              </p>
              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "0.5rem",
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(245,245,240,0.25)", display: "flex", alignItems: "center", gap: "6px" }}>
                Message us <ArrowUpRight size={11} />
              </span>
            </a>

            <div style={{ padding: "2.5rem 2rem" }}>
              <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.5rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: "rgba(245,245,240,0.3)", marginBottom: "1.5rem" }}>
                03 — Studio
              </div>
              <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800,
                fontSize: "1.5rem", letterSpacing: "-0.03em", color: "#f5f5f0",
                marginBottom: "0.5rem" }}>
                Kigali, Rwanda
              </div>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.8rem",
                lineHeight: 1.7, color: "rgba(245,245,240,0.35)", marginBottom: "1.5rem" }}>
                Our production studio serves clients across East Africa.
                On-site visits available for content and brand engagements.
              </p>
              <span style={{ fontFamily: "Space Mono, monospace", fontSize: "0.5rem",
                letterSpacing: "0.14em", textTransform: "uppercase",
                color: "rgba(245,245,240,0.22)" }}>
                East Africa — based in Kigali
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING ───────────────────────────────────────────────── */}
      <section ref={closingReveal.ref} style={{
        background: "#0d0f1a",
        padding: "8rem 1.5rem",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        opacity: closingReveal.visible ? 1 : 0,
        transform: closingReveal.visible ? "none" : "translateY(20px)",
        transition: "opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1)",
      }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div style={{ display: "grid", gap: "4rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            alignItems: "end" }}>
            <div>
              <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800,
                fontSize: "clamp(2rem,4.5vw,4rem)", lineHeight: 0.95,
                letterSpacing: "-0.05em", color: "#f5f5f0", marginBottom: "1.25rem" }}>
                Some partnerships<br />
                <em style={{ fontStyle: "italic", fontWeight: 400,
                  color: "rgba(245,245,240,0.3)" }}>
                  change the trajectory<br />of a brand.
                </em>
              </h2>
            </div>

            <div>
              <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.9rem",
                lineHeight: 1.85, color: "rgba(245,245,240,0.4)", marginBottom: "2rem" }}>
                Not sure where to start? The Discovery Session is the right first step —
                a free, focused conversation designed to map exactly where your brand
                stands and where it should go.
              </p>
              <Link
                to="/discovery"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  fontFamily: "Space Grotesk, sans-serif", fontWeight: 700,
                  fontSize: "0.72rem", letterSpacing: "0.07em", textTransform: "uppercase",
                  textDecoration: "none", color: "#0d0f1a",
                  background: "#E8C547",
                  padding: "0.85rem 1.6rem", borderRadius: "8px",
                  transition: "opacity .2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                Book a discovery session <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}