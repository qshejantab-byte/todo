
import { useState, useEffect } from "react";
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
  system?: string;
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
  { label: "Foundation", desc: "Brand identity & positioning", color: "#E8C547" },
  { label: "Visibility", desc: "Content & campaign infrastructure", color: "#5DD6B3" },
  { label: "Authority", desc: "Reputation & trust systems", color: "#E87D7D" },
  { label: "Automation", desc: "AI workflows & CRM systems", color: "#C8A8E9" },
  { label: "Scale", desc: "Full growth infrastructure", color: "#7DB8E8" },
];

const PILLARS = [
  {
    icon: Layers,
    label: "Systems Thinking",
    desc: "Every engagement builds toward a compound growth architecture.",
    color: "#5DD6B3",
  },
  {
    icon: Bot,
    label: "AI-Enhanced",
    desc: "Automation and intelligence woven into every workflow.",
    color: "#C8A8E9",
  },
  {
    icon: Star,
    label: "East Africa Focus",
    desc: "Built for the nuances, pace, and opportunity of our region.",
    color: "#E8C547",
  },
  {
    icon: Camera,
    label: "Premium Production",
    desc: "Cinematic quality content that stops scrolls and starts sales.",
    color: "#E87D7D",
  },
] as const;

function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}

function PkgCard({ pkg, position }: { pkg: Package; position: number }) {
  const [hov, setHov] = useState(false);
  const isMobile = useIsMobile();

  const isTall = pkg.featured;
  const isMinimal = !pkg.featured && position === 0;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        padding: isMobile
          ? "1.5rem 1.2rem"
          : isTall
          ? "2.5rem 2.25rem 2rem"
          : "2rem 1.75rem 1.75rem",
        background: isTall ? "rgba(255,255,255,0.035)" : "transparent",
        borderTop: `1px solid ${
          isTall && hov ? pkg.color + "55" : "rgba(255,255,255,0.09)"
        }`,
        borderLeft: isTall ? `1px solid rgba(255,255,255,0.06)` : "none",
        borderRight: isTall ? `1px solid rgba(255,255,255,0.06)` : "none",
        borderBottom: isTall ? `1px solid rgba(255,255,255,0.06)` : "none",
        borderRadius: isTall ? "8px" : "0",
        ...(isTall
          ? {
              borderTop: `2px solid ${pkg.color}`,
            }
          : {}),
        transform: hov && !isMobile ? "translateY(-3px)" : "none",
        transition:
          "transform .35s cubic-bezier(.22,1,.36,1), border-color .25s",
        boxShadow:
          hov && isTall && !isMobile
            ? "0 12px 32px rgba(0,0,0,0.25)"
            : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "baseline",
          justifyContent: "space-between",
          gap: isMobile ? "0.4rem" : "0",
          marginBottom: isTall ? "2rem" : "1.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: pkg.color,
            opacity: 0.85,
          }}
        >
          {pkg.tag}
        </span>

        {pkg.system && !isMinimal && (
          <span
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontStyle: "italic",
              fontSize: "0.72rem",
              color: "rgba(245,245,240,0.25)",
            }}
          >
            {pkg.system}
          </span>
        )}
      </div>

      <h3
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 800,
          fontSize: isMobile
            ? "1.45rem"
            : isTall
            ? "clamp(1.5rem,2.5vw,2rem)"
            : "clamp(1.2rem,2vw,1.55rem)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: "#f5f5f0",
          marginBottom: "0.5rem",
        }}
      >
        {pkg.name}
      </h3>

      <div
        style={{
          fontFamily: "Space Mono, monospace",
          fontSize: "0.56rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(245,245,240,0.22)",
          marginBottom: isTall ? "1.5rem" : "1.25rem",
        }}
      >
        {pkg.sub}
      </div>

      <p
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: isMobile ? "0.9rem" : "0.88rem",
          lineHeight: 1.75,
          fontStyle: "italic",
          color: "rgba(245,245,240,0.48)",
          marginBottom: isTall ? "1.5rem" : "1.4rem",
          maxWidth: "26rem",
        }}
      >
        {pkg.outcome}
      </p>

      <div style={{ marginBottom: "1.7rem" }}>
        {pkg.features.map((f, i) => (
          <div
            key={f}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              padding: "0.75rem 0",
              borderTop:
                i === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: isMobile ? "0.84rem" : "0.85rem",
                color: hov
                  ? "rgba(245,245,240,0.75)"
                  : "rgba(245,245,240,0.55)",
                lineHeight: 1.5,
              }}
            >
              {f}
            </span>

            <span
              style={{
                width: "16px",
                height: "1px",
                background: pkg.color,
                opacity: 0.45,
                display: "block",
                flexShrink: 0,
              }}
            />
          </div>
        ))}
      </div>

      <Link
        to="/discovery"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 600,
          fontSize: "0.72rem",
          letterSpacing: "0.05em",
          textDecoration: "none",
          color: isTall ? "#0d0f1a" : "rgba(245,245,240,0.55)",
          background: isTall ? pkg.color : "transparent",
          padding: isTall ? "0.8rem 1.35rem" : "0",
          borderRadius: isTall ? "6px" : "0",
          borderBottom:
            isTall ? "none" : "1px solid rgba(245,245,240,0.18)",
          paddingBottom: isTall ? undefined : "2px",
          transition: "opacity .2s, color .2s, border-color .2s",
        }}
      >
        Get started <ArrowRight size={12} />
      </Link>
    </div>
  );
}

function CategorySection({
  cat,
  index,
}: {
  cat: Category;
  index: number;
}) {
  const Icon = cat.icon;
  const isMobile = useIsMobile();

  const featuredIdx = cat.packages.findIndex((p) => p.featured);

  return (
    <div style={{ marginBottom: isMobile ? "4rem" : "5.5rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: isMobile ? "2rem" : "3rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <Icon size={14} color="rgba(245,245,240,0.35)" />

        <div
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.52rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(245,245,240,0.22)",
          }}
        >
          0{index + 1}
        </div>

        <h2
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontWeight: 700,
            fontSize: isMobile ? "0.9rem" : "0.95rem",
            color: "rgba(245,245,240,0.7)",
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          {cat.label}
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gap: isMobile ? "1.25rem" : "0",
          gridTemplateColumns: isMobile
            ? "1fr"
            : featuredIdx === 1
            ? "1fr 1.15fr 1fr"
            : cat.packages.length === 4
            ? "repeat(2,1fr)"
            : "repeat(auto-fit,minmax(260px,1fr))",
        }}
      >
        {cat.packages.map((pkg, i) => (
          <div
            key={pkg.name}
            style={{
              borderLeft:
                !isMobile && i > 0
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "none",
            }}
          >
            <PkgCard pkg={pkg} position={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PackagesPage() {
  const [activeCategory, setActiveCategory] = useState("content");
  const isMobile = useIsMobile();

  return (
    <PageShell>
      <Helmet>
        <title>Packages — TODO Growth</title>
        <meta
          name="description"
          content="Growth infrastructure packages for ambitious brands."
        />
      </Helmet>

      <nav
        style={{
          background: "#0d0f1a",
          padding: isMobile ? "0 0.5rem" : "0 1.5rem",
          position: "sticky",
          top: "66px",
          zIndex: 40,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: isMobile ? "flex-start" : "center",
              overflowX: "auto",
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const active = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: isMobile ? "0.9rem 1rem" : "1rem 1.5rem",
                    background: "transparent",
                    border: "none",
                    borderBottom: active
                      ? `2px solid ${cat.color}`
                      : "2px solid transparent",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    fontFamily: "Space Mono, monospace",
                    fontSize: isMobile ? "0.54rem" : "0.6rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: active
                      ? "#f5f5f0"
                      : "rgba(245,245,240,0.45)",
                  }}
                >
                  <Icon size={11} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <section
        style={{
          background: "#0d0f1a",
          padding: isMobile ? "2.5rem 1rem" : "4.5rem 1.5rem 3rem",
        }}
      >
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          {CATEGORIES.map((cat, i) => (
            <div
              key={cat.id}
              style={{
                display: activeCategory === cat.id ? "block" : "none",
              }}
            >
              <CategorySection cat={cat} index={i} />
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          background: "#0a0c18",
          padding: isMobile ? "4rem 1rem" : "6rem 1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div style={{ marginBottom: isMobile ? "2.5rem" : "3.5rem" }}>
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(245,245,240,0.3)",
                marginBottom: "0.75rem",
              }}
            >
              The Growth Journey
            </div>

            <h2
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem,8vw,2.8rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                color: "#f5f5f0",
              }}
            >
              Systems that build
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "rgba(245,245,240,0.4)",
                }}
              >
                on each other.
              </em>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(5,minmax(0,1fr))",
              gap: isMobile ? "2rem" : "1rem",
            }}
          >
            {JOURNEY.map((step) => (
              <div
                key={step.label}
                style={{
                  textAlign: isMobile ? "left" : "center",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: `1px solid ${step.color}55`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                    marginInline: isMobile ? "0" : "auto",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: step.color,
                    }}
                  />
                </div>

                <div
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    color: step.color,
                    marginBottom: "0.35rem",
                  }}
                >
                  {step.label}
                </div>

                <div
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "0.78rem",
                    color: "rgba(245,245,240,0.32)",
                    lineHeight: 1.5,
                    maxWidth: isMobile ? "100%" : "110px",
                    marginInline: isMobile ? "0" : "auto",
                  }}
                >
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          background: "#0d0f1a",
          padding: isMobile ? "4rem 1rem" : "6rem 1.5rem",
        }}
      >
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem" }}>
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(245,245,240,0.3)",
                marginBottom: "0.75rem",
              }}
            >
              Why TODO Growth
            </div>

            <h2
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.8rem,8vw,2.8rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
                color: "#f5f5f0",
              }}
            >
              Not an agency.
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#E8C547",
                }}
              >
                An infrastructure partner.
              </em>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gap: isMobile ? "1rem" : "1px",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit,minmax(220px,1fr))",
            }}
          >
            {PILLARS.map((p, i) => {
              const Icon = p.icon;

              return (
                <div
                  key={p.label}
                  style={{
                    padding: isMobile ? "1.5rem" : "2rem 1.75rem",
                    borderLeft:
                      !isMobile && i > 0
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "none",
                    border: isMobile
                      ? "1px solid rgba(255,255,255,0.06)"
                      : undefined,
                    background: "rgba(255,255,255,0.015)",
                  }}
                >
                  <div style={{ marginBottom: "1rem" }}>
                    <Icon size={18} color={p.color} />
                  </div>

                  <div
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      color: "#f5f5f0",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {p.label}
                  </div>

                  <div
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "0.84rem",
                      color: "rgba(245,245,240,0.42)",
                      lineHeight: 1.7,
                    }}
                  >
                    {p.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        style={{
          background: "#0a0c18",
          padding: isMobile ? "4.5rem 1rem" : "7rem 1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <div style={{ maxWidth: "38rem" }}>
            <div
              style={{
                fontFamily: "Space Mono, monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(245,245,240,0.3)",
                marginBottom: "1.25rem",
              }}
            >
              Start Building
            </div>

            <h2
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2rem,10vw,4rem)",
                lineHeight: 0.97,
                letterSpacing: "-0.045em",
                color: "#f5f5f0",
                marginBottom: "1.25rem",
              }}
            >
              Build the infrastructure
              <br />
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "rgba(245,245,240,0.35)",
                }}
              >
                behind your next stage.
              </em>
            </h2>

            <p
              style={{
                fontSize: isMobile ? "0.92rem" : "0.9rem",
                lineHeight: 1.9,
                color: "rgba(245,245,240,0.42)",
                marginBottom: "2.5rem",
                maxWidth: "28rem",
              }}
            >
              Every engagement starts with a free 45-minute discovery
              session where we map your gaps and design your growth path.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                flexWrap: "wrap",
                gap: "1rem",
                alignItems: isMobile ? "stretch" : "center",
              }}
            >
              <Link
                to="/discovery"
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "Space Grotesk, sans-serif",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: "#0d0f1a",
                  background: "#E8C547",
                  padding: "1rem 1.5rem",
                  borderRadius: "8px",
                  transition: "opacity .2s",
                  width: isMobile ? "100%" : "auto",
                }}
              >
                Book free discovery <ArrowRight size={14} />
              </Link>

              <Link
                to="/approach"
                style={{
                  display: "inline-flex",
                  justifyContent: isMobile ? "center" : "flex-start",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "Space Mono, monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: "rgba(245,245,240,0.4)",
                  borderBottom: "1px solid rgba(245,245,240,0.15)",
                  paddingBottom: "2px",
                  transition: "color .2s, border-color .2s",
                }}
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

