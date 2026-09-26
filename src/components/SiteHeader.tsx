import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { X, ArrowRight } from "lucide-react";
import LOGO from "../assets/logo-192.webp";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/packages", label: "Packages" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const MONO = "Space Mono, monospace";
const DISPLAY = "Space Grotesk, sans-serif";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Mobile menu: lock scroll, focus the first link, trap Tab, close on Escape.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const menu = menuRef.current;
    const focusables = () =>
      Array.from(menu?.querySelectorAll<HTMLElement>("a, button") ?? []).filter(
        (el) => !el.hasAttribute("disabled"),
      );
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = [toggleRef.current!, ...focusables()];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const isActive = (to: string) => location.pathname === to;

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-3 z-[120] -translate-y-24 rounded-full bg-[#E8C547] px-5 py-3 text-sm font-bold text-[#0b0d17] transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between gap-4 px-4 transition-[height,background-color,border-color] duration-300 sm:px-6 lg:px-8"
        style={{
          height: scrolled ? 64 : 76,
          background: scrolled || open ? "rgba(9,11,20,0.9)" : "rgba(9,11,20,0)",
          backdropFilter: scrolled ? "blur(14px) saturate(150%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px) saturate(150%)" : "none",
          borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.07)" : "transparent"}`,
        }}
      >
        {/* Logo + wordmark (logo artwork unchanged) */}
        <Link
          to="/"
          aria-label="TODO Growth, home"
          className="relative z-[101] flex min-h-[44px] shrink-0 items-center gap-3"
        >
          <img
            src={LOGO}
            alt=""
            width={40}
            height={40}
            className="transition-[width,height] duration-300"
            style={{ width: scrolled ? 34 : 40, height: scrolled ? 34 : 40 }}
          />
          <span
            className="text-[17px] font-bold tracking-[-0.02em] text-[#f5f5f0]"
            style={{ fontFamily: DISPLAY }}
          >
            TODO <span className="font-medium text-white/60">Growth</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden min-[1180px]:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.to);
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex min-h-[44px] items-center rounded-full px-4 text-[12px] uppercase tracking-[0.12em] transition-colors ${
                      active
                        ? "text-[#E8C547]"
                        : "text-white/70 hover:bg-white/[0.05] hover:text-white"
                    }`}
                    style={{ fontFamily: MONO }}
                  >
                    {link.label}
                    {active && (
                      <span
                        className="absolute inset-x-4 bottom-2 h-px bg-[#E8C547]"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="relative z-[101] flex items-center gap-3">
          {/* Primary action stays visible from tablet up */}
          <Link
            to="/discovery"
            className="hidden min-h-[44px] items-center gap-2 rounded-full bg-[#E8C547] px-5 text-[12px] font-bold uppercase tracking-[0.08em] text-[#0b0d17] transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#F0CF5A] sm:inline-flex"
            style={{ fontFamily: DISPLAY }}
          >
            Book a Discovery Call <ArrowRight size={14} />
          </Link>

          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => (open ? close() : setOpen(true))}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] min-[1180px]:hidden"
          >
            {open ? (
              <X size={18} color="#f5f5f0" />
            ) : (
              <span className="flex flex-col gap-[5px]" aria-hidden="true">
                <span className="h-[1.5px] w-[18px] rounded-full bg-[#f5f5f0]" />
                <span className="h-[1.5px] w-[12px] rounded-full bg-white/60" />
                <span className="h-[1.5px] w-[18px] rounded-full bg-[#f5f5f0]" />
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile / tablet menu */}
      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="mobile-menu fixed inset-0 z-[99] overflow-y-auto"
          style={{ background: "linear-gradient(165deg, #0b0d17 0%, #10131f 100%)" }}
        >
          <div className="mx-auto flex min-h-full max-w-3xl flex-col justify-center px-5 pb-10 pt-28 sm:px-8">
            <nav aria-label="Mobile">
              <ul>
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(link.to);
                  return (
                    <li
                      key={link.to}
                      className="border-b border-white/[0.07]"
                      style={{
                        animation: `link-stagger .4s cubic-bezier(.22,1,.36,1) ${i * 0.04 + 0.05}s both`,
                      }}
                    >
                      <Link
                        to={link.to}
                        aria-current={active ? "page" : undefined}
                        className="flex min-h-[60px] items-center justify-between py-3 text-[clamp(1.5rem,6.5vw,2.1rem)] font-bold tracking-[-0.03em]"
                        style={{
                          fontFamily: DISPLAY,
                          color: active ? "#E8C547" : "rgba(245,245,240,0.9)",
                        }}
                      >
                        {link.label}
                        {active && (
                          <span
                            className="text-xs font-normal uppercase tracking-[0.14em] text-white/60"
                            style={{ fontFamily: MONO }}
                          >
                            Current
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-8 flex flex-col items-start gap-2">
              <Link
                to="/discovery"
                className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-[#E8C547] px-7 text-[13px] font-bold uppercase tracking-[0.08em] text-[#0b0d17]"
                style={{ fontFamily: DISPLAY }}
              >
                Book a Discovery Call <ArrowRight size={15} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex min-h-[44px] items-center text-sm font-semibold text-white/75 underline decoration-white/30 underline-offset-[6px]"
                style={{ fontFamily: DISPLAY }}
              >
                Or request a quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
