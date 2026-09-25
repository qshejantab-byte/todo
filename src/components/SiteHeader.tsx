import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import LOGO from "../assets/LOGO.png";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/industries", label: "Industries" },
  { to: "/packages", label: "Packages" },
  { to: "/approach", label: "Our Approach" },
  { to: "/discovery", label: "Discovery" },
  { to: "/contact", label: "Contact" },
] as const;

function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;

    // disable on touch/mobile
    if (!el || window.innerWidth < 1024) return;

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
  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeHover, setActiveHover] = useState<string | null>(null);

  const location = useLocation();
  const ctaRef = useMagnetic(0.28);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrolled = scrollY > 40;

  const navBgAlpha = Math.min(scrollY / 120, 0.92);
  const blurPx = Math.min(8 + scrollY / 20, 24);

  const height = scrolled ? 68 : 82;

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes glow-pulse {
          0%,100% {
            box-shadow:
              0 0 18px rgba(232,197,71,0.35),
              0 0 40px rgba(232,197,71,0.08);
          }

          50% {
            box-shadow:
              0 0 28px rgba(232,197,71,0.55),
              0 0 60px rgba(232,197,71,0.14);
          }
        }

        @keyframes mobile-in {
          from {
            opacity: 0;
            transform: translateY(-14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes link-stagger {
          from {
            opacity: 0;
            transform: translateX(-18px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .site-header {
          transition:
            height .35s cubic-bezier(.22,1,.36,1),
            background .35s,
            border-color .35s;
        }

        .nav-link-line {
          position: absolute;
          left: 50%;
          right: 50%;
          bottom: -4px;
          height: 1.5px;
          opacity: 0;
          border-radius: 999px;

          background:
            linear-gradient(
              90deg,
              transparent,
              #E8C547,
              transparent
            );

          transition:
            left .35s cubic-bezier(.22,1,.36,1),
            right .35s cubic-bezier(.22,1,.36,1),
            opacity .25s;
        }

        .nav-link-wrap:hover .nav-link-line,
        .nav-link-line.active {
          left: 0;
          right: 0;
          opacity: 1;
        }

        .nav-link-line.active {
          background:
            linear-gradient(
              90deg,
              transparent,
              #E8C547 40%,
              #5DD6B3,
              transparent
            );

          box-shadow: 0 0 10px rgba(232,197,71,0.5);
        }

        .logo-wrap {
          transition:
            transform .28s cubic-bezier(.22,1,.36,1),
            filter .28s;
        }

        .logo-wrap:hover {
          transform: scale(1.04);
          filter: drop-shadow(0 0 12px rgba(232,197,71,0.35));
        }

        .cta-btn {
          position: relative;
          overflow: hidden;

          transition:
            transform .25s cubic-bezier(.22,1,.36,1),
            box-shadow .25s;

          animation: glow-pulse 3s ease-in-out infinite;
        }

        .cta-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;

          background:
            linear-gradient(
              105deg,
              transparent 30%,
              rgba(255,255,255,0.35) 50%,
              transparent 70%
            );

          background-size: 200% 100%;
          animation: shimmer 2.8s linear infinite;

          pointer-events: none;
        }

        .mobile-menu {
          animation:
            mobile-in .35s cubic-bezier(.22,1,.36,1) both;
        }

        @media (max-width: 1200px) {
          .desktop-nav {
            gap: 0.1rem !important;
          }

          .desktop-link {
            padding: 0.42rem 0.7rem !important;
            font-size: 0.54rem !important;
          }
        }

        @media (max-width: 1024px) {
          .desktop-only {
            display: none !important;
          }
        }

        @media (min-width: 1025px) {
          .mobile-only {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          .site-header {
            padding-inline: 1rem !important;
          }

          .mobile-menu-inner {
            padding:
              6.5rem 1.25rem 2rem !important;
          }

          .mobile-link {
            font-size:
              clamp(1.15rem, 7vw, 1.7rem) !important;

            padding: 1.1rem 0 !important;
          }
        }

        @media (max-width: 480px) {
          .site-header {
            padding-inline: 0.8rem !important;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <nav
        className="site-header"
        style={{
          position: "fixed",
          inset: "0 0 auto 0",
          zIndex: 100,
          height: `${height}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",

          background: scrolled
            ? `rgba(10,12,22,${navBgAlpha})`
            : "transparent",

          backdropFilter: scrolled
            ? `blur(${blurPx}px) saturate(160%)`
            : "none",

          WebkitBackdropFilter: scrolled
            ? `blur(${blurPx}px) saturate(160%)`
            : "none",

          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",

          boxShadow: scrolled
            ? "0 1px 40px rgba(0,0,0,0.35)"
            : "none",
        }}
      >
        {/* LOGO */}
        <Link
          to="/"
          className="logo-wrap"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            textDecoration: "none",
            zIndex: 2,
          }}
        >
          <img
            src={LOGO}
            alt="TODO Growth"
            style={{
              width: "auto",
              height: scrolled ? "50px" : "40px",
              objectFit: "contain",
              transition: "height .35s cubic-bezier(.22,1,.36,1)",
            }}
          />

          <span
            style={{
              position: "absolute",
              inset: "-50%",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(232,197,71,0.1) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
        </Link>

        {/* DESKTOP NAV */}
        <ul
          className="desktop-only desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",

            listStyle: "none",
            margin: 0,
            padding: "0.45rem 0.9rem",

            background: scrolled
              ? "rgba(255,255,255,0.03)"
              : "transparent",

            borderRadius: "999px",

            border: scrolled
              ? "1px solid rgba(255,255,255,0.07)"
              : "1px solid transparent",

            backdropFilter: scrolled
              ? "blur(8px)"
              : "none",
          }}
        >
          {NAV_LINKS.slice(0, -1).map((link) => {
            const active = location.pathname === link.to;
            const hovered = activeHover === link.to;

            return (
              <li
                key={link.to}
                className="nav-link-wrap"
                style={{
                  position: "relative",
                }}
              >
                <Link
                  to={link.to}
                  className="desktop-link"
                  onMouseEnter={() => setActiveHover(link.to)}
                  onMouseLeave={() => setActiveHover(null)}
                  style={{
                    position: "relative",
                    display: "block",

                    padding: "0.45rem 0.85rem",
                    borderRadius: "999px",

                    fontFamily: "Space Mono, monospace",
                    fontSize: "0.58rem",
                    letterSpacing: "0.13em",
                    textTransform: "uppercase",
                    textDecoration: "none",

                    color: active
                      ? "#E8C547"
                      : hovered
                      ? "rgba(245,245,240,0.92)"
                      : "rgba(245,245,240,0.45)",

                    background:
                      hovered && !active
                        ? "rgba(255,255,255,0.05)"
                        : "transparent",

                    transition:
                      "color .2s, background .2s",
                  }}
                >
                  {link.label}

                  <span
                    className={`nav-link-line${
                      active ? " active" : ""
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <Link
          ref={ctaRef}
          to="/discovery"
          className="desktop-only cta-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",

            padding: scrolled
              ? "0.55rem 1.3rem"
              : "0.65rem 1.4rem",

            borderRadius: "999px",

            textDecoration: "none",

            background:
              "linear-gradient(135deg,#F0CF5A 0%,#E8C547 45%,#D4A830 100%)",

            color: "#0a0c16",

            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 700,
            fontSize: "0.68rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ position: "relative", zIndex: 1 }}>
            Book Now
          </span>

          <span
            style={{
              position: "relative",
              zIndex: 1,
            }}
          >
            →
          </span>
        </Link>

        {/* MOBILE BUTTON */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((s) => !s)}
          className="mobile-only"
          style={{
            zIndex: 101,

            width: "46px",
            height: "46px",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            borderRadius: "12px",

            border: "1px solid rgba(255,255,255,0.1)",

            background: "rgba(255,255,255,0.05)",

            backdropFilter: "blur(10px)",

            cursor: "pointer",
          }}
        >
          {open ? (
            <X size={18} color="#f5f5f0" />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span
                style={{
                  width: "18px",
                  height: "1.5px",
                  borderRadius: "999px",
                  background: "#f5f5f0",
                }}
              />

              <span
                style={{
                  width: "12px",
                  height: "1.5px",
                  borderRadius: "999px",
                  background: "rgba(245,245,240,0.6)",
                }}
              />

              <span
                style={{
                  width: "18px",
                  height: "1.5px",
                  borderRadius: "999px",
                  background: "#f5f5f0",
                }}
              />
            </div>
          )}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div
          className="mobile-menu"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,

            background:
              "linear-gradient(160deg, rgba(10,12,22,0.98) 0%, rgba(15,18,35,0.99) 100%)",

            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
          }}
        >
          <div
            className="mobile-menu-inner"
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",

              padding: "7rem 2rem 2rem",
            }}
          >
            {/* ambient */}
            <div
              style={{
                position: "absolute",
                top: "10%",
                left: "-10%",
                width: "50%",
                height: "50%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(93,214,179,0.06) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "absolute",
                right: "-10%",
                bottom: "5%",
                width: "45%",
                height: "45%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(232,197,71,0.05) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {NAV_LINKS.map((link, i) => {
                const active =
                  location.pathname === link.to;

                return (
                  <li
                    key={link.to}
                    style={{
                      borderBottom:
                        "1px solid rgba(255,255,255,0.05)",

                      animation:
                        `link-stagger .45s cubic-bezier(.22,1,.36,1) ${i * 0.06 + 0.1}s both`,
                    }}
                  >
                    <Link
                      to={link.to}
                      className="mobile-link"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",

                        padding: "1.2rem 0",

                        textDecoration: "none",

                        fontFamily:
                          "Space Grotesk, sans-serif",

                        fontWeight: 700,

                        fontSize:
                          "clamp(1.3rem, 6vw, 2rem)",

                        letterSpacing: "-0.03em",

                        color: active
                          ? "#E8C547"
                          : "rgba(245,245,240,0.82)",
                      }}
                    >
                      <span>{link.label}</span>

                      {active && (
                        <span
                          style={{
                            fontFamily:
                              "Space Mono, monospace",

                            fontSize: "0.58rem",

                            letterSpacing: "0.15em",

                            textTransform: "uppercase",

                            color: "#5DD6B3",

                            fontWeight: 400,
                          }}
                        >
                          current
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* MOBILE CTA */}
            <div
              style={{
                marginTop: "2rem",
                animation:
                  `link-stagger .45s cubic-bezier(.22,1,.36,1) ${NAV_LINKS.length * 0.06 + 0.15}s both`,
              }}
            >
              <Link
                to="/discovery"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",

                  padding: "1rem 1.8rem",

                  borderRadius: "999px",

                  textDecoration: "none",

                  background:
                    "linear-gradient(135deg,#F0CF5A 0%,#E8C547 60%,#D4A830 100%)",

                  boxShadow:
                    "0 0 32px rgba(232,197,71,0.28)",

                  color: "#0a0c16",

                  fontFamily:
                    "Space Grotesk, sans-serif",

                  fontWeight: 700,

                  fontSize: "0.78rem",

                  letterSpacing: "0.1em",

                  textTransform: "uppercase",
                }}
              >
                Book Discovery Session →
              </Link>

              <p
                style={{
                  marginTop: "1rem",

                  fontFamily:
                    "Space Mono, monospace",

                  fontSize: "0.56rem",

                  letterSpacing: "0.14em",

                  textTransform: "uppercase",

                  color: "rgba(245,245,240,0.25)",
                }}
              >
                Free · 45 minutes · No commitment
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}