import { Link } from "react-router-dom";
import LOGO from "../assets/LOGO.png";
import { ArrowRight } from "lucide-react";

const FOOTER_LINKS = [
  { to: "/packages",   label: "Packages"   },
  { to: "/approach",   label: "Approach"   },
  { to: "/industries", label: "Industries" },
  { to: "/contact",    label: "Contact"    },
] as const;

const SYSTEMS = [
  { label: "Branding",           color: "#5DD6B3" },
  { label: "Marketing Systems",  color: "#C8A8E9" },
  { label: "Content Production", color: "#E87D7D" },
  { label: "Reputation Mgmt",    color: "#7DB8E8" },
  { label: "AI Automation",      color: "#E8C547" },
] as const;

export function SiteFooter() {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg,#0d0f1a 0%,#080b14 100%)",
        borderTop: "1px solid rgba(93,214,179,0.1)",
        padding: "5rem 1.5rem 2.5rem",
        color: "#f5f5f0",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>

        {/* Top row */}
        <div style={{
          display: "grid",
          gap: "3rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          paddingBottom: "3.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          marginBottom: "2.5rem",
        }}>

          {/* Brand col */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
              <img src={LOGO} alt="TODO Growth" style={{ height: "36px", width: "36px", objectFit: "contain" }} />
            </div>
            <p style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.9rem",
              lineHeight: 1.75,
              color: "rgba(245,245,240,0.45)",
              maxWidth: "18rem",
              marginBottom: "1.5rem",
            }}>
              Growth infrastructure for ambitious brands across East Africa and beyond.
            </p>
            <a
              href="mailto:Richie@todo.rw"
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#5DD6B3",
                textDecoration: "none",
                borderBottom: "1px solid rgba(93,214,179,0.3)",
                paddingBottom: "2px",
                transition: "border-color .2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#5DD6B3"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(93,214,179,0.3)"; }}
            >
              Richie@todo.rw
            </a>
          </div>

          {/* Systems col */}
          <div>
            <div style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(245,245,240,0.3)",
              marginBottom: "1.25rem",
            }}>
              Core Systems
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {SYSTEMS.map((s) => (
                <li key={s.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{
                    width: "5px", height: "5px", borderRadius: "50%",
                    background: s.color, flexShrink: 0,
                    boxShadow: `0 0 6px ${s.color}`,
                  }} />
                  <span style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.82rem",
                    color: "rgba(245,245,240,0.5)",
                  }}>
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav col */}
          <div>
            <div style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(245,245,240,0.3)",
              marginBottom: "1.25rem",
            }}>
              Navigate
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              {FOOTER_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "0.82rem",
                      color: "rgba(245,245,240,0.5)",
                      textDecoration: "none",
                      transition: "color .2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#E8C547"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(245,245,240,0.5)"; }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA col */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px",
            padding: "1.75rem",
          }}>
            <div style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#E8C547",
              marginBottom: "0.75rem",
            }}>
              Free discovery session
            </div>
            <p style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "0.85rem",
              lineHeight: 1.65,
              color: "rgba(245,245,240,0.5)",
              marginBottom: "1.25rem",
            }}>
              Map your brand gaps and find your fastest path to visible growth.
            </p>
            <Link
              to="/discovery"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#0d0f1a",
                background: "#E8C547",
                padding: "0.65rem 1.25rem",
                borderRadius: "8px",
                boxShadow: "0 0 18px rgba(232,197,71,0.25)",
                transition: "transform .2s, box-shadow .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 0 32px rgba(232,197,71,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "0 0 18px rgba(232,197,71,0.25)";
              }}
            >
              Book now <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}>
          <span style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(245,245,240,0.22)",
          }}>
            © 2026 TODO Ltd · Kigali, Rwanda
          </span>
          <span style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(245,245,240,0.22)",
          }}>
            Growth Infrastructure Company
          </span>
        </div>

      </div>
    </footer>
  );
}
