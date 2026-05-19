import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { ArrowRight, Camera, Megaphone, Layers, Bot, Star } from "lucide-react";

interface Package {
  tag: string;
  name: string;
  outcome: string;
  sub: string;
  features: string[];
  featured?: boolean;
  color: string;
  system?: string; // subtle microcopy
}

interface Category {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
  packages: Package[];
}

const CATEGORIES: Category[] = [
  {
    id: "content",
    label: "Content Infrastructure",
    icon: Camera,
    color: "#E87D7D",
    packages: [
      {
        tag: "Entry",
        name: "Essential Presence",
        outcome: "Establish a consistent visual identity that builds recognition.",
        sub: "1 visit / month",
        color: "#E87D7D",
        system: "Visibility foundation",
        features: ["4 reels", "12 edited images", "On-site production visit"],
      },
      {
        tag: "Most Popular",
        name: "Growth Visibility",
        outcome: "Accelerate audience growth with high-frequency premium content.",
        sub: "2 visits / month",
        color: "#5DD6B3",
        featured: true,
        system: "Content infrastructure",
        features: ["8 reels", "25 edited images", "2 on-site production visits", "Content calendar"],
      },
      {
        tag: "Signature",
        name: "Signature Destination",
        outcome: "Become the most visually compelling brand in your category.",
        sub: "3 visits / month",
        color: "#C8A8E9",
        system: "Brand authority system",
        features: ["12 reels", "40 edited images", "Experience documentation", "Full brand content system"],
      },
    ],
  },
  {
    id: "campaign",
    label: "Campaign Systems",
    icon: Megaphone,
    color: "#C8A8E9",
    packages: [
      {
        tag: "Starter",
        name: "Starter Campaign",
        outcome: "Launch with precision. One powerful campaign to open the market.",
        sub: "Launch-ready",
        color: "#7DB8E8",
        system: "Market entry layer",
        features: ["1 advertisement", "2 reels", "2 posters"],
      },
      {
        tag: "Most Popular",
        name: "Growth Campaign",
        outcome: "Scale reach with a multi-format campaign built to convert.",
        sub: "Scale-ready",
        color: "#E8C547",
        featured: true,
        system: "Designed for scale",
        features: ["1 advertisement", "4 reels", "4 posters"],
      },
      {
        tag: "Signature",
        name: "Signature Campaign",
        outcome: "Full-production campaign presence across every touchpoint.",
        sub: "Full production",
        color: "#E87D7D",
        system: "Operational growth layer",
        features: ["1 cinematic advertisement", "6 reels + 6 posters", "WhatsApp posters", "Website banners"],
      },
    ],
  },
  {
    id: "systems",
    label: "Growth Operations",
    icon: Layers,
    color: "#5DD6B3",
    packages: [
      {
        tag: "Foundation",
        name: "Brand Foundation",
        outcome: "Build the visual and strategic foundation every system runs on.",
        sub: "One-time build",
        color: "#E8C547",
        system: "Built for visibility",
        features: ["Brand positioning", "Typography & color system", "Logo refinement", "Presentation templates"],
      },
      {
        tag: "Systems",
        name: "Marketing Systems",
        outcome: "Install the strategic infrastructure that makes every campaign smarter.",
        sub: "Strategy + structure",
        color: "#5DD6B3",
        featured: true,
        system: "Strategic infrastructure",
        features: ["Offer clarity", "Campaign messaging", "Posting structure", "Landing page direction"],
      },
      {
        tag: "Reputation",
        name: "Reputation System",
        outcome: "Engineer trust at scale. Turn satisfied clients into growth assets.",
        sub: "Trust workflow",
        color: "#E87D7D",
        system: "Trust architecture",
        features: ["Google review workflow", "TripAdvisor workflow", "Response templates", "Reminder timing structure"],
      },
      {
        tag: "Automation",
        name: "AI Operations",
        outcome: "Deploy intelligent automation that compounds your growth 24/7.",
        sub: "Automation build",
        color: "#C8A8E9",
        system: "Intelligent operations",
        features: ["CRM setup", "Lead tracking", "Task automation", "Calendar + dashboard setup"],
      },
    ],
  },
];

const JOURNEY = [
  { label: "Foundation", desc: "Brand identity & positioning",     color: "#E8C547" },
  { label: "Visibility", desc: "Content & campaign infrastructure", color: "#5DD6B3" },
  { label: "Authority",  desc: "Reputation & trust systems",        color: "#E87D7D" },
  { label: "Automation", desc: "AI workflows & CRM systems",        color: "#C8A8E9" },
  { label: "Scale",      desc: "Full growth infrastructure",         color: "#7DB8E8" },
];

const PILLARS = [
  { icon: Layers, label: "Systems Thinking",   desc: "Every engagement builds toward a compound growth architecture.", color: "#5DD6B3" },
  { icon: Bot,    label: "AI-Enhanced",         desc: "Automation and intelligence woven into every workflow.",         color: "#C8A8E9" },
  { icon: Star,   label: "East Africa Focus",   desc: "Built for the nuances, pace, and opportunity of our region.",   color: "#E8C547" },
  { icon: Camera, label: "Premium Production",  desc: "Cinematic quality content that stops scrolls and starts sales.", color: "#E87D7D" },
] as const;

// ─── Package Card — editorial, asymmetric, no box feel ────────────────────────
function PkgCard({ pkg, position }: { pkg: Package; position: number }) {
  const [hov, setHov] = useState(false);

  // Each position gets a slightly different character
  const isTall     = pkg.featured;
  const isMinimal  = !pkg.featured && position === 0;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        padding: isTall ? "2.5rem 2.25rem 2rem" : "2rem 1.75rem 1.75rem",
        // Tonal separation — no hard borders on non-featured
        background: isTall
          ? "rgba(255,255,255,0.035)"
          : "transparent",
        borderTop: `1px solid ${isTall && hov ? pkg.color + "55" : "rgba(255,255,255,0.09)"}`,
        borderLeft: isTall ? `1px solid rgba(255,255,255,0.06)` : "none",
        borderRight: isTall ? `1px solid rgba(255,255,255,0.06)` : "none",
        borderBottom: isTall ? `1px solid rgba(255,255,255,0.06)` : "none",
        borderRadius: isTall ? "2px" : "0",
        // Featured: color accent on top border only
        ...(isTall ? {
          borderTop: `2px solid ${pkg.color}`,
        } : {}),
        transform: hov ? "translateY(-3px)" : "none",
        transition: "transform .35s cubic-bezier(.22,1,.36,1), border-color .25s",
        boxShadow: hov && isTall ? "0 12px 32px rgba(0,0,0,0.25)" : "none",
      }}
    >
      {/* Top row — tag + system microcopy */}
      <div style={{
        display: "flex", alignItems: "baseline",
        justifyContent: "space-between", marginBottom: isTall ? "2rem" : "1.5rem",
      }}>
        <span style={{
          fontFamily: "Space Mono, monospace", fontSize: "0.5rem",
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: pkg.color, opacity: 0.85,
        }}>
          {pkg.tag}
        </span>
        {pkg.system && !isMinimal && (
          <span style={{
            fontFamily: "Space Grotesk, sans-serif", fontStyle: "italic",
            fontSize: "0.72rem", color: "rgba(245,245,240,0.2)",
          }}>
            {pkg.system}
          </span>
        )}
      </div>

      {/* Name — editorial scale */}
      <h3 style={{
        fontFamily: "Space Grotesk, sans-serif", fontWeight: 800,
        fontSize: isTall ? "clamp(1.5rem,2.5vw,2rem)" : "clamp(1.2rem,2vw,1.55rem)",
        lineHeight: 0.97, letterSpacing: "-0.04em",
        color: "#f5f5f0", marginBottom: "0.35rem",
      }}>
        {pkg.name}
      </h3>

      {/* Sub — very quiet */}
      <div style={{
        fontFamily: "Space Mono, monospace", fontSize: "0.5rem",
        letterSpacing: "0.16em", textTransform: "uppercase",
        color: "rgba(245,245,240,0.22)", marginBottom: isTall ? "1.75rem" : "1.5rem",
      }}>
        {pkg.sub}
      </div>

      {/* Outcome — italic, editorial body */}
      <p style={{
        fontFamily: "Space Grotesk, sans-serif", fontSize: "0.88rem",
        lineHeight: 1.7, fontStyle: "italic",
        color: "rgba(245,245,240,0.48)",
        marginBottom: isTall ? "1.75rem" : "1.5rem",
        maxWidth: "26rem",
      }}>
        {pkg.outcome}
      </p>

      {/* Feature list — clean rule-separated, no icons */}
      <div style={{ marginBottom: isTall ? "2rem" : "1.75rem" }}>
        {pkg.features.map((f, i) => (
          <div key={f} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0.6rem 0",
            borderTop: i === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}>
            <span style={{
              fontFamily: "Space Grotesk, sans-serif", fontSize: "0.85rem",
              color: hov ? "rgba(245,245,240,0.75)" : "rgba(245,245,240,0.55)",
              transition: "color .25s",
            }}>
              {f}
            </span>
            {/* Subtle tick — just a colored dash, right-aligned */}
            <span style={{
              width: "16px", height: "1px",
              background: pkg.color, opacity: 0.45,
              display: "block", flexShrink: 0,
            }} />
          </div>
        ))}
      </div>

      {/* CTA */}
      <Link
        to="/discovery"
        style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontFamily: "Space Grotesk, sans-serif", fontWeight: 600,
          fontSize: "0.7rem", letterSpacing: "0.05em",
          textDecoration: "none",
          color: isTall ? "#0d0f1a" : "rgba(245,245,240,0.55)",
          background: isTall ? pkg.color : "transparent",
          padding: isTall ? "0.7rem 1.4rem" : "0",
          borderRadius: isTall ? "4px" : "0",
          borderBottom: isTall ? "none" : "1px solid rgba(245,245,240,0.18)",
          paddingBottom: isTall ? undefined : "2px",
          transition: "opacity .2s, color .2s, border-color .2s",
        }}
        onMouseEnter={(e) => {
          if (isTall) e.currentTarget.style.opacity = "0.85";
          else {
            e.currentTarget.style.color = "#f5f5f0";
            e.currentTarget.style.borderColor = "rgba(245,245,240,0.45)";
          }
        }}
        onMouseLeave={(e) => {
          if (isTall) e.currentTarget.style.opacity = "1";
          else {
            e.currentTarget.style.color = "rgba(245,245,240,0.55)";
            e.currentTarget.style.borderColor = "rgba(245,245,240,0.18)";
          }
        }}
      >
        Get started <ArrowRight size={12} />
      </Link>
    </div>
  );
}

// ─── Category Section ─────────────────────────────────────────────────────────
function CategorySection({ cat, index }: { cat: Category; index: number }) {
  const Icon = cat.icon;

  // Find featured index to vary grid layout
  const featuredIdx = cat.packages.findIndex(p => p.featured);

  return (
    <div style={{ marginBottom: "5.5rem" }}>

      {/* Section header — cleaner, more editorial */}
      <div style={{
        display: "flex", alignItems: "center", gap: "1.25rem",
        marginBottom: "3rem",
        paddingBottom: "1.25rem",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <Icon size={15} color="rgba(245,245,240,0.35)" />
        <div style={{
          fontFamily: "Space Mono, monospace", fontSize: "0.5rem",
          letterSpacing: "0.22em", textTransform: "uppercase",
          color: "rgba(245,245,240,0.22)",
        }}>
          0{index + 1}
        </div>
        <h2 style={{
          fontFamily: "Space Grotesk, sans-serif", fontWeight: 700,
          fontSize: "0.95rem", color: "rgba(245,245,240,0.7)",
          letterSpacing: "-0.01em", margin: 0,
        }}>
          {cat.label}
        </h2>
      </div>

      {/* Cards — asymmetric: featured is wider/taller via grid */}
      <div style={{
        display: "grid",
        gap: "0",
        // 3-col: featured gets slightly more space
        gridTemplateColumns: featuredIdx === 1
          ? "1fr 1.15fr 1fr"
          : cat.packages.length === 4
            ? "repeat(2, 1fr)"
            : "repeat(auto-fit, minmax(260px, 1fr))",
      }}>
        {cat.packages.map((pkg, i) => (
          <div
            key={pkg.name}
            style={{
              // Vertical separator between cards
              borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
              padding: "0 0 0 0",
            }}
          >
            <PkgCard pkg={pkg} position={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PackagesPage() {
  const [activeCategory, setActiveCategory] = useState("content");

  return (
    <PageShell>
      <Helmet>
        <title>Packages — TODO Growth</title>
        <meta name="description" content="Growth infrastructure packages for ambitious brands — content, campaigns, reputation, brand foundation, and AI operations." />
      </Helmet>

      {/* ── CATEGORY NAV ──────────────────────────────────────────────── */}
      <nav style={{
        background: "#0d0f1a",
        padding: "0 1.5rem",
        position: "sticky", top: "66px", zIndex: 40,
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", overflowX: "auto", scrollbarWidth: "none" }}>
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px",
                    padding: "1rem 1.5rem",
                    background: "transparent", border: "none",
                    borderBottom: active ? `2px solid ${cat.color}` : "2px solid transparent",
                    cursor: "pointer", whiteSpace: "nowrap",
                    fontFamily: "Space Mono, monospace", fontSize: "0.6rem",
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: active ? "#f5f5f0" : "rgba(245,245,240,0.45)",
                    transition: "color .2s, border-color .2s",
                    marginBottom: "-1px",
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "rgba(245,245,240,0.75)"; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "rgba(245,245,240,0.45)"; }}
                >
                  <Icon size={12} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ── PACKAGES ──────────────────────────────────────────────────── */}
      <section style={{ background: "#0d0f1a", padding: "4.5rem 1.5rem 3rem" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          {CATEGORIES.map((cat, i) => (
            <div key={cat.id} style={{ display: activeCategory === cat.id ? "block" : "none" }}>
              <CategorySection cat={cat} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ── GROWTH JOURNEY ────────────────────────────────────────────── */}
      <section style={{
        background: "#0a0c18",
        padding: "6rem 1.5rem",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div style={{ marginBottom: "3.5rem" }}>
            <div style={{
              fontFamily: "Space Mono, monospace", fontSize: "0.58rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "rgba(245,245,240,0.3)", marginBottom: "0.75rem",
            }}>
              The Growth Journey
            </div>
            <h2 style={{
              fontFamily: "Space Grotesk, sans-serif", fontWeight: 800,
              fontSize: "clamp(1.8rem,3.2vw,2.8rem)", lineHeight: 1.05,
              letterSpacing: "-0.04em", color: "#f5f5f0",
            }}>
              Systems that build<br />
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(245,245,240,0.4)" }}>on each other.</em>
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", flexWrap: "wrap", gap: "0" }}>
            {JOURNEY.map((step, i) => (
              <div key={step.label} style={{ display: "flex", alignItems: "flex-start", flex: "1 1 auto", minWidth: "120px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                  <div style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    border: `1px solid ${step.color}55`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginBottom: "0.85rem",
                  }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: step.color }} />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "0.85rem", color: step.color, marginBottom: "4px" }}>
                      {step.label}
                    </div>
                    <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.72rem", color: "rgba(245,245,240,0.32)", maxWidth: "88px", lineHeight: 1.4, margin: "0 auto" }}>
                      {step.desc}
                    </div>
                  </div>
                </div>
                {i < JOURNEY.length - 1 && (
                  <div style={{ flex: "0 0 1.5rem", height: "1px", background: "rgba(255,255,255,0.1)", marginTop: "20px" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY TODO ──────────────────────────────────────────────────── */}
      <section style={{ background: "#0d0f1a", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,240,0.3)", marginBottom: "0.75rem" }}>
              Why TODO Growth
            </div>
            <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,3.2vw,2.8rem)", lineHeight: 1.05, letterSpacing: "-0.04em", color: "#f5f5f0" }}>
              Not an agency.<br />
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "#E8C547" }}>An infrastructure partner.</em>
            </h2>
          </div>

          <div style={{ display: "grid", gap: "1px", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={p.label}
                  style={{ padding: "2rem 1.75rem", borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none", transition: "background .2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{ marginBottom: "1.25rem" }}><Icon size={18} color={p.color} /></div>
                  <div style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#f5f5f0", marginBottom: "0.5rem" }}>{p.label}</div>
                  <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "0.82rem", color: "rgba(245,245,240,0.42)", lineHeight: 1.65 }}>{p.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      <section style={{ background: "#0a0c18", padding: "7rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div style={{ maxWidth: "38rem" }}>
            <div style={{ fontFamily: "Space Mono, monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,240,0.3)", marginBottom: "1.25rem" }}>
              Start Building
            </div>
            <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4.5vw,4rem)", lineHeight: 0.97, letterSpacing: "-0.045em", color: "#f5f5f0", marginBottom: "1.25rem" }}>
              Build the infrastructure<br />
              <em style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(245,245,240,0.35)" }}>behind your next stage.</em>
            </h2>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.85, color: "rgba(245,245,240,0.42)", marginBottom: "2.5rem", maxWidth: "28rem" }}>
              Every engagement starts with a free 45-minute discovery session where we map your gaps and design your growth path.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
              <Link to="/discovery"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.07em", textTransform: "uppercase", textDecoration: "none", color: "#0d0f1a", background: "#E8C547", padding: "0.9rem 1.75rem", borderRadius: "8px", transition: "opacity .2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                Book free discovery <ArrowRight size={14} />
              </Link>
              <Link to="/approach"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "Space Mono, monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", color: "rgba(245,245,240,0.4)", borderBottom: "1px solid rgba(245,245,240,0.15)", paddingBottom: "2px", transition: "color .2s, border-color .2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#f5f5f0"; e.currentTarget.style.borderColor = "rgba(245,245,240,0.4)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(245,245,240,0.4)"; e.currentTarget.style.borderColor = "rgba(245,245,240,0.15)"; }}
              >
                See our approach →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
