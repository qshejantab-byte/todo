import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import {
  ArrowRight,
  Hotel,
  UtensilsCrossed,
  Building2,
  Plane,
  ShoppingBag,
  HeartPulse,
  Sparkles,
  Star,
  MapPin,
  BedDouble,
  Coffee,
  Utensils,
  Home,
  Camera,
  ShoppingCart,
  Stethoscope,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Responsive helper
// ─────────────────────────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 900) {
  const [mobile, setMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return mobile;
}

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
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
  visualPattern:
    | "hospitality"
    | "restaurant"
    | "realestate"
    | "tourism"
    | "retail"
    | "clinic";
  flip?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────
const INDUSTRIES: Industry[] = [
  {
    id: "hospitality",
    index: "01",
    name: "Hospitality",
    tagline: "Luxury presence for premium destinations.",
    insight:
      "Hotels and lodges lose guests to competitors with stronger visual presence — not better rooms.",
    painPoint:
      "Invisible online. Underbooked despite being exceptional.",
    systems: [
      "Cinematic property reels",
      "Review & reputation workflow",
      "Content calendar system",
      "Direct booking content strategy",
    ],
    accent: "#E8C547",
    glow: "rgba(232,197,71,0.15)",
    icon: Hotel,
    visualPattern: "hospitality",
  },

  {
    id: "restaurants",
    index: "02",
    name: "Restaurants & Cafés",
    tagline:
      "Content that makes people hungry before they arrive.",
    insight:
      "Food businesses that invest in visual storytelling fill tables 3× faster than those who don't.",
    painPoint:
      "Inconsistent social presence. No system behind the content.",
    systems: [
      "Dish & atmosphere reels",
      "Menu launch campaigns",
      "Reservation automation",
      "Review response templates",
    ],
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
    tagline:
      "Architectural storytelling that sells before the viewing.",
    insight:
      "Properties with cinematic content sell 40% faster and attract higher-quality leads.",
    painPoint:
      "Listings that look average. Leads that don't convert.",
    systems: [
      "Cinematic walkthroughs",
      "Listing photography system",
      "Lead CRM & tracking",
      "Campaign creative",
    ],
    accent: "#5DD6B3",
    glow: "rgba(93,214,179,0.15)",
    icon: Building2,
    visualPattern: "realestate",
  },

  {
    id: "tourism",
    index: "04",
    name: "Tourism & Experiences",
    tagline:
      "Turn experiences into unforgettable visual journeys.",
    insight:
      "Travelers choose destinations based on digital emotion — what they feel before they book.",
    painPoint:
      "Amazing experiences that look ordinary online.",
    systems: [
      "Experience documentation",
      "Destination marketing content",
      "TripAdvisor reputation system",
      "Tour campaign creative",
    ],
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
    tagline:
      "Product content systems that drive consistent revenue.",
    insight:
      "Brands with structured product content generate 2× more repeat purchases online.",
    painPoint:
      "No posting system. Inconsistent product visibility.",
    systems: [
      "Product content system",
      "Campaign creative library",
      "Structured posting calendar",
      "E-commerce content strategy",
    ],
    accent: "#C8A8E9",
    glow: "rgba(200,168,233,0.15)",
    icon: ShoppingBag,
    visualPattern: "retail",
  },

  {
    id: "clinics",
    index: "06",
    name: "Clinics & Services",
    tagline:
      "Trust-first presence for care-focused businesses.",
    insight:
      "Patients choose clinics based on trust signals — reviews, tone, and digital credibility.",
    painPoint:
      "Low online visibility. Reputation not actively managed.",
    systems: [
      "Trust-first brand system",
      "Review reminder automation",
      "Calendar coordination",
      "Educational content strategy",
    ],
    accent: "#5DD6B3",
    glow: "rgba(93,214,179,0.15)",
    icon: HeartPulse,
    visualPattern: "clinic",
    flip: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Fade hook
// ─────────────────────────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

// ─────────────────────────────────────────────────────────────────────────────
// Visual block
// ─────────────────────────────────────────────────────────────────────────────
function IndustryVisual({
  industry,
}: {
  industry: Industry;
}) {
  const isMobile = useIsMobile();

  const sharedCard = {
    position: "absolute" as const,
    borderRadius: "24px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(16px)",
    overflow: "hidden",
    boxShadow: `0 20px 60px ${industry.accent}15`,
  };

  const imageOverlay = {
    position: "absolute" as const,
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(8,10,18,0.82) 100%)",
  };

  // ───────────────────────────────────────────────────────────────────────────
  // Hospitality
  // ───────────────────────────────────────────────────────────────────────────
  if (industry.visualPattern === "hospitality") {
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            ...sharedCard,
            top: isMobile ? "6%" : "8%",
            left: isMobile ? "5%" : "10%",
            width: isMobile ? "90%" : "72%",
            height: isMobile ? "58%" : "70%",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <div style={imageOverlay} />

          <div
            style={{
              position: "absolute",
              left: "1.3rem",
              bottom: "1.3rem",
              right: "1.3rem",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "6px",
                marginBottom: "0.7rem",
              }}
            >
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={13}
                  fill={industry.accent}
                  color={industry.accent}
                />
              ))}
            </div>

            <div
              style={{
                color: "#fff",
                fontFamily: "Space Grotesk",
                fontWeight: 700,
                fontSize: isMobile ? "1rem" : "1.2rem",
              }}
            >
              Premium resort presentation
            </div>
          </div>
        </div>

        <div
          style={{
            ...sharedCard,
            bottom: isMobile ? "6%" : "10%",
            right: isMobile ? "6%" : "12%",
            padding: "1rem",
            width: isMobile ? "170px" : "240px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "0.7rem",
              alignItems: "center",
            }}
          >
            <BedDouble size={18} color={industry.accent} />

            <div>
              <div
                style={{
                  color: "#fff",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  fontFamily: "Space Grotesk",
                }}
              >
                Direct bookings up
              </div>

              <div
                style={{
                  color: "rgba(255,255,255,0.45)",
                  fontSize: "0.72rem",
                }}
              >
                Reputation + cinematic content
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Restaurant
  // ───────────────────────────────────────────────────────────────────────────
  if (industry.visualPattern === "restaurant") {
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            ...sharedCard,
            top: isMobile ? "8%" : "10%",
            left: isMobile ? "6%" : "8%",
            width: isMobile ? "88%" : "70%",
            height: isMobile ? "68%" : "76%",
            transform: "rotate(-3deg)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <div style={imageOverlay} />

          <div
            style={{
              position: "absolute",
              bottom: "1.2rem",
              left: "1.2rem",
              right: "1.2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginBottom: "0.8rem",
              }}
            >
              <Coffee size={16} color={industry.accent} />
              <Utensils size={16} color={industry.accent} />
            </div>

            <div
              style={{
                color: "#fff",
                fontWeight: 700,
                fontFamily: "Space Grotesk",
                fontSize: isMobile ? "1rem" : "1.2rem",
              }}
            >
              Atmosphere that sells online
            </div>
          </div>
        </div>

        <div
          style={{
            ...sharedCard,
            right: isMobile ? "5%" : "8%",
            bottom: isMobile ? "5%" : "10%",
            padding: "1rem",
            width: isMobile ? "180px" : "260px",
          }}
        >
          <div
            style={{
              color: industry.accent,
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
              fontFamily: "Space Mono",
            }}
          >
            Reservation flow
          </div>

          <div
            style={{
              height: "6px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "72%",
                height: "100%",
                background: industry.accent,
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Real estate
  // ───────────────────────────────────────────────────────────────────────────
  if (industry.visualPattern === "realestate") {
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            ...sharedCard,
            inset: isMobile ? "8%" : "10%",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <div style={imageOverlay} />

          <div
            style={{
              position: "absolute",
              left: "1.3rem",
              right: "1.3rem",
              bottom: "1.3rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "1rem",
            }}
          >
            <div>
              <div
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontFamily: "Space Grotesk",
                  fontSize: isMobile ? "1rem" : "1.3rem",
                  marginBottom: "0.4rem",
                }}
              >
                High-conversion property media
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "0.45rem",
                  alignItems: "center",
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "0.8rem",
                }}
              >
                <MapPin size={14} />
                Kigali · Luxury Listing
              </div>
            </div>

            <div
              style={{
                padding: "0.7rem 0.9rem",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Home size={18} color={industry.accent} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Tourism
  // ───────────────────────────────────────────────────────────────────────────
  if (industry.visualPattern === "tourism") {
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            ...sharedCard,
            top: isMobile ? "10%" : "8%",
            left: isMobile ? "5%" : "8%",
            width: isMobile ? "90%" : "76%",
            height: isMobile ? "72%" : "78%",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <div style={imageOverlay} />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(125,184,232,0.05), transparent)",
            }}
          />

          <div
            style={{
              position: "absolute",
              left: "1.4rem",
              bottom: "1.4rem",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "0.7rem",
                marginBottom: "0.8rem",
              }}
            >
              <Plane size={18} color="#fff" />
              <Camera size={18} color="#fff" />
            </div>

            <div
              style={{
                color: "#fff",
                fontWeight: 700,
                fontFamily: "Space Grotesk",
                fontSize: isMobile ? "1rem" : "1.25rem",
                marginBottom: "0.35rem",
              }}
            >
              Destination storytelling
            </div>

            <div
              style={{
                color: "rgba(255,255,255,0.58)",
                fontSize: "0.82rem",
              }}
            >
              Emotion-first travel marketing
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Retail
  // ───────────────────────────────────────────────────────────────────────────
  if (industry.visualPattern === "retail") {
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            inset: isMobile ? "10%" : "12%",
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: isMobile ? "0.8rem" : "1rem",
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                ...sharedCard,
                position: "relative",
                inset: "unset",
                minHeight: isMobile ? "120px" : "180px",
              }}
            >
              <img
                src={`https://images.unsplash.com/photo-${
                  i === 1
                    ? "1523381210434-271e8be1f52b"
                    : i === 2
                    ? "1521572163474-6864f9cf17ab"
                    : i === 3
                    ? "1542291026-7eec264c27ff"
                    : "1483985988355-763728e1935b"
                }?q=80&w=1000&auto=format&fit=crop`}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              <div style={imageOverlay} />

              <div
                style={{
                  position: "absolute",
                  left: "0.9rem",
                  bottom: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                }}
              >
                <ShoppingCart
                  size={14}
                  color={industry.accent}
                />

                <span
                  style={{
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.76rem",
                  }}
                >
                  Product Content
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Clinic
  // ───────────────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        style={{
          ...sharedCard,
          inset: isMobile ? "10%" : "12%",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=1600&auto=format&fit=crop"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <div style={imageOverlay} />

        <div
          style={{
            position: "absolute",
            left: "1.3rem",
            right: "1.3rem",
            bottom: "1.3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                color: "#fff",
                fontWeight: 700,
                fontFamily: "Space Grotesk",
                fontSize: isMobile ? "1rem" : "1.2rem",
                marginBottom: "0.4rem",
              }}
            >
              Trust-first patient experience
            </div>

            <div
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "0.82rem",
              }}
            >
              Reviews · Education · Visibility
            </div>
          </div>

          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stethoscope
              size={22}
              color={industry.accent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────────────────────────────────────
function IndustrySection({ ind }: { ind: Industry }) {
  const { ref, visible } = useFadeIn();
  const Icon = ind.icon;
  const isMobile = useIsMobile();

  const copy = (
    <div
      style={{
        padding: isMobile ? "3rem 1.4rem" : "5rem 4rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        zIndex: 2,
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0px)"
          : "translateY(30px)",
        transition:
          "opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.8rem",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: isMobile ? "42px" : "52px",
            height: isMobile ? "42px" : "52px",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(10px)",
          }}
        >
          <Icon size={isMobile ? 18 : 22} color={ind.accent} />
        </div>

        <span
          style={{
            fontFamily: "Space Mono, monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(245,245,240,0.35)",
          }}
        >
          {ind.index} — Industry System
        </span>
      </div>

      <h2
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 800,
          fontSize: isMobile
            ? "clamp(2rem,10vw,3rem)"
            : "clamp(3rem,5vw,5rem)",
          lineHeight: 0.92,
          letterSpacing: "-0.05em",
          color: "#f5f5f0",
          marginBottom: "1rem",
          maxWidth: "14ch",
        }}
      >
        {ind.name}
      </h2>

      <p
        style={{
          color: ind.accent,
          fontFamily: "Space Grotesk, sans-serif",
          fontStyle: "italic",
          fontSize: isMobile ? "0.95rem" : "1.1rem",
          lineHeight: 1.6,
          marginBottom: "1.5rem",
          maxWidth: "34rem",
        }}
      >
        {ind.tagline}
      </p>

      <p
        style={{
          fontFamily: "Space Grotesk, sans-serif",
          fontSize: isMobile ? "0.9rem" : "0.98rem",
          lineHeight: 1.9,
          color: "rgba(245,245,240,0.55)",
          maxWidth: "36rem",
          marginBottom: "1.4rem",
        }}
      >
        {ind.insight}
      </p>

      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: isMobile ? "1rem" : "1.15rem",
          borderRadius: "18px",
          marginBottom: "2rem",
          maxWidth: "36rem",
          backdropFilter: "blur(8px)",
        }}
      >
        <Sparkles
          size={16}
          color={ind.accent}
          style={{ marginTop: "2px", flexShrink: 0 }}
        />

        <span
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            color: "rgba(245,245,240,0.48)",
            lineHeight: 1.7,
            fontSize: "0.85rem",
          }}
        >
          {ind.painPoint}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.65rem",
          marginBottom: "2.5rem",
        }}
      >
        {ind.systems.map((s) => (
          <div
            key={s}
            style={{
              padding: isMobile
                ? "0.5rem 0.7rem"
                : "0.55rem 0.9rem",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              color: "rgba(245,245,240,0.62)",
              fontFamily: "Space Mono, monospace",
              fontSize: "0.56rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {s}
          </div>
        ))}
      </div>

      <Link
        to="/discovery"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          width: "fit-content",
          textDecoration: "none",
          padding: isMobile
            ? "0.9rem 1.2rem"
            : "1rem 1.5rem",
          borderRadius: "999px",
          background: ind.accent,
          color: "#0d0f1a",
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 700,
          fontSize: "0.72rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          boxShadow: `0 0 32px ${ind.accent}40`,
        }}
      >
        Start a conversation <ArrowRight size={14} />
      </Link>
    </div>
  );

  const visual = (
    <div
      style={{
        position: "relative",
        minHeight: isMobile ? "420px" : "760px",
        overflow: "hidden",
        background: `
          radial-gradient(circle at 50% 50%, ${ind.glow} 0%, transparent 70%),
          linear-gradient(180deg, rgba(255,255,255,0.02), transparent)
        `,
        borderLeft: isMobile
          ? "none"
          : "1px solid rgba(255,255,255,0.05)",
        borderBottom: isMobile
          ? "1px solid rgba(255,255,255,0.05)"
          : "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 20% 20%, ${ind.accent}12 0%, transparent 35%),
            radial-gradient(circle at 80% 80%, ${ind.accent}10 0%, transparent 35%)
          `,
        }}
      />

      <IndustryVisual industry={ind} />

      <div
        style={{
          position: "absolute",
          right: isMobile ? "1rem" : "2rem",
          bottom: isMobile ? "1rem" : "2rem",
          fontSize: isMobile ? "4rem" : "8rem",
          fontWeight: 800,
          fontFamily: "Space Grotesk, sans-serif",
          color: `${ind.accent}10`,
          lineHeight: 1,
          userSelect: "none",
          zIndex: 5,
        }}
      >
        {ind.index}
      </div>
    </div>
  );

  return (
    <section
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: isMobile
          ? "1fr"
          : "1fr 1fr",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        background: "#0d0f1a",
      }}
    >
      {isMobile ? (
        <>
          {visual}
          {copy}
        </>
      ) : ind.flip ? (
        <>
          {visual}
          {copy}
        </>
      ) : (
        <>
          {copy}
          {visual}
        </>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function IndustriesPage() {
  const isMobile = useIsMobile();

  return (
    <PageShell>
      <Helmet>
        <title>Industries — TODO Growth</title>

        <meta
          name="description"
          content="Brand, content, and AI workflows for hospitality, restaurants, real estate, tourism, retail, and clinics across East Africa."
        />
      </Helmet>

      {/* HERO */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(180deg,#0b0d17 0%,#0d0f1a 100%)",
          padding: isMobile
            ? "6rem 1.25rem 4rem"
            : "9rem 2rem 6rem",
          borderBottom:
            "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "50vw",
              height: "50vw",
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(93,214,179,0.08),transparent 70%)",
              top: "-10%",
              left: "-10%",
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "40vw",
              height: "40vw",
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(232,197,71,0.06),transparent 70%)",
              bottom: "-10%",
              right: "-10%",
            }}
          />
        </div>

        <div
          style={{
            maxWidth: "72rem",
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#5DD6B3",
              marginBottom: "1.2rem",
            }}
          >
            Industry Growth Infrastructure
          </div>

          <h1
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 800,
              fontSize: isMobile
                ? "clamp(2.8rem,13vw,4rem)"
                : "clamp(5rem,8vw,8rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.06em",
              color: "#f5f5f0",
              marginBottom: "1.5rem",
              maxWidth: "14ch",
            }}
          >
            Systems tailored to your industry.
          </h1>

          <p
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: isMobile ? "0.95rem" : "1.08rem",
              lineHeight: 1.9,
              color: "rgba(245,245,240,0.5)",
              maxWidth: "40rem",
            }}
          >
            Every industry grows differently. We design
            content systems, automation, and visibility
            infrastructure specific to your market.
          </p>
        </div>
      </section>

      {/* INDUSTRIES */}
      <div style={{ background: "#0d0f1a" }}>
        {INDUSTRIES.map((ind) => (
          <IndustrySection key={ind.id} ind={ind} />
        ))}
      </div>

      {/* CTA */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg,#0d0f1a 0%,#0f1525 50%,#0a0f1e 100%)",
          padding: isMobile
            ? "5rem 1.25rem"
            : "7rem 1.5rem",
          borderTop:
            "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: "72rem",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Space Mono, monospace",
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#5DD6B3",
              marginBottom: "1rem",
            }}
          >
            Ready to scale?
          </div>

          <h2
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 800,
              fontSize: isMobile
                ? "clamp(2rem,12vw,3.2rem)"
                : "clamp(3rem,6vw,5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.05em",
              color: "#f5f5f0",
              marginBottom: "1.5rem",
            }}
          >
            Build the infrastructure behind your growth.
          </h2>

          <p
            style={{
              maxWidth: "42rem",
              margin: "0 auto 2.5rem",
              fontSize: isMobile ? "0.92rem" : "1rem",
              lineHeight: 1.9,
              color: "rgba(245,245,240,0.45)",
            }}
          >
            We combine cinematic content, AI systems,
            automation, and strategic positioning into one
            growth engine.
          </p>

          <Link
            to="/discovery"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              background:
                "linear-gradient(135deg,#F0CF5A 0%,#E8C547 100%)",
              color: "#0d0f1a",
              padding: isMobile
                ? "1rem 1.4rem"
                : "1.1rem 2rem",
              borderRadius: "999px",
              fontFamily: "Space Grotesk, sans-serif",
              fontWeight: 700,
              fontSize: "0.78rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              boxShadow:
                "0 0 40px rgba(232,197,71,0.35)",
            }}
          >
            Book free discovery <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

