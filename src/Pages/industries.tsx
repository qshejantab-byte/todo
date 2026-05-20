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
} from "lucide-react";

function useIsMobile(breakpoint = 900) {
  const [mobile, setMobile] = useState(window.innerWidth <= breakpoint);
  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return mobile;
}

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

const INDUSTRIES: Industry[] = [
  {
    id: "hospitality",
    index: "01",
    name: "Hospitality",
    tagline: "Luxury presence for premium destinations.",
    insight:
      "Hotels and lodges lose guests to competitors with stronger visual presence — not better rooms.",
    painPoint: "Invisible online. Underbooked despite being exceptional.",
    systems: [
      "Cinematic property reels",
      "Review & reputation workflow",
      "Content calendar system",
      "Direct booking content strategy",
    ],
    accent: "#C8A96E",
    glow: "rgba(200,169,110,0.12)",
    icon: Hotel,
    visualPattern: "hospitality",
  },
  {
    id: "restaurants",
    index: "02",
    name: "Restaurants & Cafés",
    tagline: "Content that makes people hungry before they arrive.",
    insight:
      "Food businesses that invest in visual storytelling fill tables 3× faster than those who don't.",
    painPoint: "Inconsistent social presence. No system behind the content.",
    systems: [
      "Dish & atmosphere reels",
      "Menu launch campaigns",
      "Reservation automation",
      "Review response templates",
    ],
    accent: "#C47B6A",
    glow: "rgba(196,123,106,0.12)",
    icon: UtensilsCrossed,
    visualPattern: "restaurant",
    flip: true,
  },
  {
    id: "realestate",
    index: "03",
    name: "Real Estate",
    tagline: "Architectural storytelling that sells before the viewing.",
    insight:
      "Properties with cinematic content sell 40% faster and attract higher-quality leads.",
    painPoint: "Listings that look average. Leads that don't convert.",
    systems: [
      "Cinematic walkthroughs",
      "Listing photography system",
      "Lead CRM & tracking",
      "Campaign creative",
    ],
    accent: "#5B9E8A",
    glow: "rgba(91,158,138,0.12)",
    icon: Building2,
    visualPattern: "realestate",
  },
  {
    id: "tourism",
    index: "04",
    name: "Tourism & Experiences",
    tagline: "Turn experiences into unforgettable visual journeys.",
    insight:
      "Travelers choose destinations based on digital emotion — what they feel before they book.",
    painPoint: "Amazing experiences that look ordinary online.",
    systems: [
      "Experience documentation",
      "Destination marketing content",
      "TripAdvisor reputation system",
      "Tour campaign creative",
    ],
    accent: "#6A8EC4",
    glow: "rgba(106,142,196,0.12)",
    icon: Plane,
    visualPattern: "tourism",
    flip: true,
  },
  {
    id: "retail",
    index: "05",
    name: "Retail & E-commerce",
    tagline: "Product content systems that drive consistent revenue.",
    insight:
      "Brands with structured product content generate 2× more repeat purchases online.",
    painPoint: "No posting system. Inconsistent product visibility.",
    systems: [
      "Product content system",
      "Campaign creative library",
      "Structured posting calendar",
      "E-commerce content strategy",
    ],
    accent: "#9A7EC0",
    glow: "rgba(154,126,192,0.12)",
    icon: ShoppingBag,
    visualPattern: "retail",
  },
  {
    id: "clinics",
    index: "06",
    name: "Clinics & Services",
    tagline: "Trust-first presence for care-focused businesses.",
    insight:
      "Patients choose clinics based on trust signals — reviews, tone, and digital credibility.",
    painPoint: "Low online visibility. Reputation not actively managed.",
    systems: [
      "Trust-first brand system",
      "Review reminder automation",
      "Calendar coordination",
      "Educational content strategy",
    ],
    accent: "#5B9E8A",
    glow: "rgba(91,158,138,0.12)",
    icon: HeartPulse,
    visualPattern: "clinic",
    flip: true,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Inline Vector Graphic Components
// ─────────────────────────────────────────────────────────────────────────────

function HospitalityVisual() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" style={{ width: "60%", height: "60%", opacity: 0.85 }}>
      <defs>
        <linearGradient id="hotelBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4A69FF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#4A69FF" stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <circle cx="250" cy="250" r="210" fill="url(#hotelBg)" />
      <g transform="translate(10, 0)">
        <rect x="90" y="160" width="180" height="240" rx="4" fill="#6C63FF" opacity="0.15" stroke="#6C63FF" strokeWidth="2" />
        <rect x="110" y="120" width="140" height="40" fill="#4A69FF" opacity="0.3" />
        <path d="M70 120 h220 v10 h-220 z" fill="#6C63FF" />
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2].map((col) => (
            <rect key={`w-${row}-${col}`} x={120 + col * 45} y={190 + row * 45} width="25" height="30" rx="2" fill="#FFFFFF" opacity="0.7" />
          ))
        )}
        <rect x="300" y="220" width="110" height="180" rx="4" fill="#6C63FF" opacity="0.1" stroke="#6C63FF" strokeWidth="1.5" />
        <circle cx="180" cy="70" r="15" fill="#FFD700" opacity="0.8" />
        <path d="M 320 150 L 350 120 L 380 150" stroke="#6C63FF" strokeWidth="3" fill="none" opacity="0.5" />
      </g>
    </svg>
  );
}

function RestaurantVisual() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" style={{ width: "60%", height: "60%", opacity: 0.85 }}>
      <circle cx="250" cy="250" r="220" fill="#6C63FF" opacity="0.05" />
      <circle cx="230" cy="270" r="130" fill="#E6E6E6" opacity="0.4" stroke="#6C63FF" strokeWidth="2" />
      <circle cx="230" cy="270" r="100" fill="#FFFFFF" />
      <path d="M 120 180 C 120 120, 170 120, 170 180 Z" fill="#6C63FF" opacity="0.2" />
      <g transform="translate(200, 120)">
        <path d="M10 15 v120 h15 v-120 z" fill="#6C63FF" />
        <path d="M40 15 v60 c0 15, 25 15, 25 0 v-60" fill="none" stroke="#6C63FF" strokeWidth="4" />
        <line x1="52" y1="75" x2="52" y2="135" stroke="#6C63FF" strokeWidth="4" />
      </g>
      <circle cx="340" cy="360" r="45" fill="#6C63FF" opacity="0.15" />
      <path d="M 80 400 Q 250 370 420 400" stroke="#6C63FF" strokeWidth="2" fill="none" opacity="0.3" />
    </svg>
  );
}

function RealEstateVisual() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" style={{ width: "60%", height: "60%", opacity: 0.85 }}>
      <rect x="50" y="50" width="400" height="400" rx="20" fill="#5B9E8A" opacity="0.05" />
      <g transform="translate(40, 40)">
        <path d="M 60 280 L 210 130 L 360 280 Z" fill="#5B9E8A" opacity="0.2" stroke="#5B9E8A" strokeWidth="3" />
        <rect x="90" y="280" width="240" height="140" fill="#FFFFFF" stroke="#5B9E8A" strokeWidth="3" />
        <rect x="130" y="320" width="50" height="50" fill="#5B9E8A" opacity="0.3" />
        <rect x="240" y="320" width="50" height="100" fill="#5B9E8A" opacity="0.5" />
        <circle cx="210" cy="200" r="20" fill="#5B9E8A" opacity="0.15" />
        <line x1="40" y1="420" x2="380" y2="420" stroke="#5B9E8A" strokeWidth="4" />
      </g>
    </svg>
  );
}

function TourismVisual() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" style={{ width: "60%", height: "60%", opacity: 0.85 }}>
      <circle cx="250" cy="250" r="200" fill="#6A8EC4" opacity="0.08" stroke="#6A8EC4" strokeWidth="2" strokeDasharray="5 5" />
      <path d="M 120 350 L 200 220 L 280 350 Z" fill="#6A8EC4" opacity="0.2" />
      <path d="M 220 350 L 300 200 L 380 350 Z" fill="#6A8EC4" opacity="0.3" />
      <circle cx="360" cy="120" r="35" fill="#FFB74D" opacity="0.6" />
      <path d="M 100 200 C 180 100, 320 100, 400 200" fill="none" stroke="#6A8EC4" strokeWidth="3" strokeDasharray="8 4" />
      <g transform="translate(235, 125) rotate(45)">
        <path d="M0 0 L20 -10 L40 0 L20 40 Z" fill="#6A8EC4" />
      </g>
    </svg>
  );
}

function RetailVisual() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" style={{ width: "60%", height: "60%", opacity: 0.85 }}>
      <rect x="60" y="60" width="380" height="380" rx="30" fill="#9A7EC0" opacity="0.05" />
      <g transform="translate(110, 100)">
        <path d="M 40 120 L 70 40 L 210 40 L 240 120 Z" fill="none" stroke="#9A7EC0" strokeWidth="4" strokeLinecap="round" />
        <rect x="20" y="110" width="240" height="220" rx="12" fill="#9A7EC0" opacity="0.2" stroke="#9A7EC0" strokeWidth="3" />
        <circle cx="140" cy="220" r="35" fill="#FFFFFF" opacity="0.7" />
        <path d="M 120 220 H 160 M 140 200 V 240" stroke="#9A7EC0" strokeWidth="4" strokeLinecap="round" />
      </g>
      <circle cx="380" cy="120" r="25" fill="#9A7EC0" opacity="0.4" />
    </svg>
  );
}

function ClinicVisual() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" style={{ width: "60%", height: "60%", opacity: 0.85 }}>
      <circle cx="250" cy="250" r="210" fill="#5B9E8A" opacity="0.06" />
      <g transform="translate(125, 125)">
        <rect x="90" y="0" width="70" height="250" rx="10" fill="#5B9E8A" opacity="0.2" />
        <rect x="0" y="90" width="250" height="70" rx="10" fill="#5B9E8A" opacity="0.2" />
        <rect x="105" y="15" width="40" height="220" rx="4" fill="#5B9E8A" opacity="0.4" />
        <rect x="15" y="105" width="220" height="40" rx="4" fill="#5B9E8A" opacity="0.4" />
      </g>
      <path d="M 50 400 Q 150 370 250 400 T 450 400" fill="none" stroke="#5B9E8A" strokeWidth="3" opacity="0.3" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Dynamic Visual Manager Component
// ─────────────────────────────────────────────────────────────────────────────
function IndustryVisual({ pattern }: { pattern: Industry["visualPattern"] }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(160deg, #0e1020 0%, #0b0d18 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {pattern === "hospitality" && <HospitalityVisual />}
      {pattern === "restaurant" && <RestaurantVisual />}
      {pattern === "realestate" && <RealEstateVisual />}
      {pattern === "tourism" && <TourismVisual />}
      {pattern === "retail" && <RetailVisual />}
      {pattern === "clinic" && <ClinicVisual />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Fade in hook
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
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

// ─────────────────────────────────────────────────────────────────────────────
// Industry section
// ─────────────────────────────────────────────────────────────────────────────
function IndustrySection({ ind }: { ind: Industry }) {
  const { ref, visible } = useFadeIn();
  const Icon = ind.icon;
  const isMobile = useIsMobile();

  // ── copy panel ────────────────────────────────────────────────────────────
  const copyPanel = (
    <div
      style={{
        padding: isMobile ? "3rem 1.4rem" : "5rem 4rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        zIndex: 2,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(30px)",
        transition: "opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.8rem", flexWrap: "wrap" }}>
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
          fontSize: isMobile ? "clamp(2rem,10vw,3rem)" : "clamp(3rem,5vw,5rem)",
          lineHeight: 0.92,
          letterSpacing: "-0.05em",
          color: "#f5f5f0",
          marginBottom: "1rem",
          maxWidth: "14ch",
        }}
      >
        {ind.name}
      </h2>

      <p style={{ color: ind.accent, fontFamily: "Space Grotesk, sans-serif", fontStyle: "italic", fontSize: isMobile ? "0.95rem" : "1.1rem", lineHeight: 1.6, marginBottom: "1.5rem", maxWidth: "34rem" }}>
        {ind.tagline}
      </p>

      <p style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: isMobile ? "0.9rem" : "0.98rem", lineHeight: 1.9, color: "rgba(245,245,240,0.55)", maxWidth: "36rem", marginBottom: "1.4rem" }}>
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
        <Sparkles size={16} color={ind.accent} style={{ marginTop: "2px", flexShrink: 0 }} />
        <span style={{ fontFamily: "Space Grotesk, sans-serif", color: "rgba(245,245,240,0.48)", lineHeight: 1.7, fontSize: "0.85rem" }}>
          {ind.painPoint}
        </span>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.65rem", marginBottom: "2.5rem" }}>
        {ind.systems.map((s) => (
          <div
            key={s}
            style={{
              padding: isMobile ? "0.5rem 0.7rem" : "0.55rem 0.9rem",
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

      {/* <Link
        to="/discovery"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          width: "fit-content",
          textDecoration: "none",
          padding: isMobile ? "0.9rem 1.2rem" : "1rem 1.5rem",
          borderRadius: "999px",
          background: ind.accent,
          color: "#05050a",
          fontFamily: "Space Grotesk, sans-serif",
          fontWeight: 700,
          fontSize: "0.88rem",
        }}
      >
        <span>Build Your System</span> 
         <ArrowRight size={16} />
      </Link> */}
    </div>
  );

  // ── visual panel ──────────────────────────────────────────────────────────
  const visualPanel = (
    <div
      style={{
        height: isMobile ? "220px" : "100%",
        minHeight: isMobile ? "auto" : "400px",
        borderLeft: !isMobile && !ind.flip ? "1px solid rgba(255,255,255,0.05)" : "none",
        borderRight: !isMobile && ind.flip ? "1px solid rgba(255,255,255,0.05)" : "none",
      }}
    >
      <IndustryVisual pattern={ind.visualPattern} />
    </div>
  );

  // ── layout: single consistent 3fr/2fr grid, children placed directly ─────
  // flip=true  → visual (col 1) | copy (col 2)  — grid is still "3fr 2fr" but
  //              we reverse by assigning gridColumn explicitly to each child
  // flip=false → copy (col 1) | visual (col 2)  — natural DOM order
  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "3fr 2fr",
        gridTemplateRows: isMobile ? "auto auto" : "auto",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "#05050a",
      }}
    >
      {isMobile ? (
        // Mobile: visual on top, copy below
        <>
          <div>{visualPanel}</div>
          <div>{copyPanel}</div>
        </>
      ) : ind.flip ? (
        // Desktop flipped: visual in narrow col 1, copy in wide col 2
        // Achieve by assigning explicit gridColumn to each child
        <>
          <div style={{ gridColumn: "1", gridRow: "1" }}>{visualPanel}</div>
          <div style={{ gridColumn: "2", gridRow: "1" }}>{copyPanel}</div>
        </>
      ) : (
        // Desktop normal: copy in wide col 1, visual in narrow col 2
        <>
          <div style={{ gridColumn: "1", gridRow: "1" }}>{copyPanel}</div>
          <div style={{ gridColumn: "2", gridRow: "1" }}>{visualPanel}</div>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Primary Page Export
// ─────────────────────────────────────────────────────────────────────────────
export default function IndustriesPage() {
  return (
    <PageShell>
      <Helmet>
        <title>Industry Systems — Framework</title>
      </Helmet>
      <div style={{ background: "#05050a", minHeight: "100vh" }}>
        {INDUSTRIES.map((ind) => (
          <IndustrySection key={ind.id} ind={ind} />
        ))}
      </div>
    </PageShell>
  );
}