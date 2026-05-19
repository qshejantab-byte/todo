import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import LOGO from "../assets/LOGO.png";

const NAV_LINKS = [
  { to: "/",           label: "Home"        },
  { to: "/packages",   label: "Packages"    },
  { to: "/industries", label: "Industries"  },
  { to: "/approach",   label: "Our Approach"},
  { to: "/discovery",  label: "Discovery"   },
  { to: "/contact",    label: "Contact"     },
] as const;

// Magnetic button hook
function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
    };

    const onLeave = () => {
      el.style.transform = "translate(0,0) scale(1)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return ref;
}

export function SiteHeader() {
  const [open, setOpen]         = useState(false);
  const [scrollY, setScrollY]   = useState(0);
  const [activeHover, setActiveHover] = useState<string | null>(null);
  const location                = useLocation();
  const ctaRef                  = useMagnetic(0.28);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const scrolled   = scrollY > 40;
  const navBgAlpha = Math.min(scrollY / 120, 0.92);
  const blurPx     = Math.min(8 + scrollY / 20, 24);
  const height     = scrolled ? 66 : 78;

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 18px rgba(232,197,71,0.35), 0 0 40px rgba(232,197,71,0.1); }
          50%       { box-shadow: 0 0 28px rgba(232,197,71,0.55), 0 0 60px rgba(232,197,71,0.18); }
        }
        @keyframes mobile-in {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes link-stagger {
          from { opacity: 0; transform: translateX(-18px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .nav-link-line {
          position: absolute;
          bottom: -3px; left: 50%; right: 50%;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, #E8C547, transparent);
          border-radius: 2px;
          transition: left .35s cubic-bezier(.22,1,.36,1), right .35s cubic-bezier(.22,1,.36,1), opacity .25s;
          opacity: 0;
        }
        .nav-link-line.active, .nav-link-wrap:hover .nav-link-line {
          left: 0; right: 0; opacity: 1;
        }
        .nav-link-line.active {
          background: linear-gradient(90deg, transparent, #E8C547 40%, #5DD6B3, transparent);
          box-shadow: 0 0 8px rgba(232,197,71,0.6);
        }
        .cta-btn {
          transition: transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s;
          animation: glow-pulse 3s ease-in-out infinite;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(105deg,
            transparent 30%,
            rgba(255,255,255,0.35) 50%,
            transparent 70%
          );
          background-size: 200% 100%;
          animation: shimmer 2.8s linear infinite;
          pointer-events: none;
        }
        .logo-wrap {
          transition: transform .3s cubic-bezier(.22,1,.36,1), filter .3s;
        }
        .logo-wrap:hover {
          transform: scale(1.06);
          filter: drop-shadow(0 0 12px rgba(232,197,71,0.5));
        }
      `}</style>

      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          inset: "0 0 auto 0",
          zIndex: 50,
          height: `${height}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 3.5rem",
          transition: "height .4s cubic-bezier(.22,1,.36,1), background .4s, border-color .4s",
          background: scrolled
            ? `rgba(10,12,22,${navBgAlpha})`
            : "transparent",
          backdropFilter: scrolled ? `blur(${blurPx}px) saturate(160%)` : "none",
          WebkitBackdropFilter: scrolled ? `blur(${blurPx}px) saturate(160%)` : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
          boxShadow: scrolled
            ? "0 1px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)"
            : "none",
        }}
      >
        {/* Logo */}
        <Link to="/" className="logo-wrap" style={{ display: "flex", alignItems: "center", textDecoration: "none", position: "relative" }}>
          <img src={LOGO} alt="TODO Growth" style={{ height: `${scrolled ? 34 : 40}px`, width: "auto", objectFit: "contain", transition: "height .4s cubic-bezier(.22,1,.36,1)" }} />
          {/* ambient glow behind logo */}
          <span style={{ position: "absolute", inset: "-50%", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(232,197,71,0.12) 0%, transparent 70%)",
            pointerEvents: "none" }} />
        </Link>

        {/* Desktop nav — center */}
        <ul
          style={{
            display: "flex", alignItems: "center", gap: "0.25rem",
            listStyle: "none", margin: 0, padding: "0.4rem 1rem",
            background: scrolled ? "rgba(255,255,255,0.03)" : "transparent",
            borderRadius: "100px",
            border: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
            backdropFilter: scrolled ? "blur(8px)" : "none",
            transition: "background .4s, border-color .4s",
          }}
          className="hidden lg:flex"
        >
          {NAV_LINKS.slice(0, -1).map((l) => {
            const active  = location.pathname === l.to;
            const hovered = activeHover === l.to;
            return (
              <li key={l.to} className="nav-link-wrap" style={{ position: "relative" }}>
                <Link
                  to={l.to}
                  onMouseEnter={() => setActiveHover(l.to)}
                  onMouseLeave={() => setActiveHover(null)}
                  style={{
                    display: "block",
                    fontFamily: "Space Mono, monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    padding: "0.45rem 0.85rem",
                    borderRadius: "100px",
                    color: active
                      ? "#E8C547"
                      : hovered
                        ? "rgba(245,245,240,0.9)"
                        : "rgba(245,245,240,0.45)",
                    background: hovered && !active
                      ? "rgba(255,255,255,0.05)"
                      : "transparent",
                    transition: "color .22s, background .22s",
                    position: "relative",
                  }}
                >
                  {l.label}
                  <span className={`nav-link-line${active ? " active" : ""}`} />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA button */}
        <Link
          ref={ctaRef}
          to="/discovery"
          className="cta-btn hidden lg:inline-flex"
          style={{
            position: "relative",
            overflow: "hidden",
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 700,
            fontSize: "0.68rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            color: "#0a0c16",
            background: "linear-gradient(135deg, #F0CF5A 0%, #E8C547 45%, #D4A830 100%)",
            padding: `${scrolled ? "0.5rem" : "0.6rem"} 1.35rem`,
            borderRadius: "100px",
            transition: "padding .4s",
          }}
        >
          <span style={{ position: "relative", zIndex: 1 }}>Book Now</span>
          <span style={{ position: "relative", zIndex: 1, fontSize: "0.9em", letterSpacing: 0 }}>→</span>
        </Link>

        {/* Mobile burger */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((s) => !s)}
          className="lg:hidden"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "10px",
            padding: "9px 11px",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
            justifyContent: "center",
            transition: "border-color .2s, background .2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#E8C547"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
        >
          {open
            ? <X size={18} color="#f5f5f0" />
            : <>
                <span style={{ display: "block", width: "18px", height: "1.5px", background: "#f5f5f0", borderRadius: "2px", transition: ".2s" }} />
                <span style={{ display: "block", width: "12px", height: "1.5px", background: "rgba(245,245,240,0.5)", borderRadius: "2px", transition: ".2s" }} />
                <span style={{ display: "block", width: "18px", height: "1.5px", background: "#f5f5f0", borderRadius: "2px", transition: ".2s" }} />
              </>
          }
        </button>
      </nav>

      {/* ── FULLSCREEN MOBILE MENU ──────────────────────────────── */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 49,
            background: "linear-gradient(160deg, rgba(10,12,22,0.98) 0%, rgba(15,18,35,0.99) 100%)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "6rem 2.5rem 3rem",
            animation: "mobile-in .35s cubic-bezier(.22,1,.36,1) both",
          }}
        >
          {/* Ambient orbs */}
          <div style={{ position: "absolute", top: "10%", left: "-10%", width: "50%", height: "50%",
            borderRadius: "50%", background: "radial-gradient(circle, rgba(93,214,179,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "5%", right: "-5%", width: "45%", height: "45%",
            borderRadius: "50%", background: "radial-gradient(circle, rgba(232,197,71,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {NAV_LINKS.map((l, i) => {
              const active = location.pathname === l.to;
              return (
                <li
                  key={l.to}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    animation: `link-stagger .45s cubic-bezier(.22,1,.36,1) ${i * 0.06 + 0.1}s both`,
                  }}
                >
                  <Link
                    to={l.to}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1.35rem 0",
                      fontFamily: "Space Grotesk, sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(1.4rem, 5vw, 2rem)",
                      letterSpacing: "-0.02em",
                      textDecoration: "none",
                      color: active ? "#E8C547" : "rgba(245,245,240,0.75)",
                      transition: "color .2s",
                    }}
                  >
                    <span>{l.label}</span>
                    {active && (
                      <span style={{ fontFamily: "Space Mono, monospace", fontSize: "0.6rem",
                        letterSpacing: "0.15em", textTransform: "uppercase",
                        color: "#5DD6B3", fontWeight: 400 }}>
                        current
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile CTA */}
          <div style={{ marginTop: "2.5rem", animation: `link-stagger .45s cubic-bezier(.22,1,.36,1) ${NAV_LINKS.length * 0.06 + 0.15}s both` }}>
            <Link
              to="/discovery"
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                fontFamily: "Space Grotesk, sans-serif", fontWeight: 700,
                fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase",
                textDecoration: "none", color: "#0a0c16",
                background: "linear-gradient(135deg, #F0CF5A 0%, #E8C547 60%, #D4A830 100%)",
                padding: "1rem 2rem", borderRadius: "100px",
                boxShadow: "0 0 32px rgba(232,197,71,0.3)",
              }}
            >
              Book Discovery Session →
            </Link>
            <p style={{ marginTop: "1rem", fontFamily: "Space Mono, monospace",
              fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase",
              color: "rgba(245,245,240,0.25)" }}>
              Free · 45 minutes · No commitment
            </p>
          </div>
        </div>
      )}
    </>
  );
}
