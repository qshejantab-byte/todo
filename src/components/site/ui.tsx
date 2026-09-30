import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import { SITE_URL } from "@/content/site";
import type { MediaAsset } from "@/content/media";

// ─── Tokens ──────────────────────────────────────────────────────────────────
// Color has meaning: yellow = action / TODO identity, blue = Microsoft & AI,
// and each growth stage keeps one color everywhere (see STAGES in site.ts).
export const C = {
  bg: "#0b0d17",
  bgRaised: "#10131f",
  bgInk: "#07080f",
  text: "#f5f5f0",
  body: "rgba(245,245,240,0.76)",
  muted: "rgba(245,245,240,0.6)",
  line: "rgba(255,255,255,0.09)",
  lineStrong: "rgba(255,255,255,0.16)",
  yellow: "#E8C547",
  blue: "#7DB8E8",
} as const;

export const F = {
  display: "Space Grotesk, sans-serif",
  mono: "Space Mono, monospace",
} as const;

export const EASE = "cubic-bezier(.22,1,.36,1)";

// Type scale. The home hero is the largest heading on the site.
export const TYPE = {
  display: {
    fontFamily: F.display,
    fontWeight: 700,
    fontSize: "clamp(2.6rem, 5.6vw, 5.6rem)",
    lineHeight: 0.98,
    letterSpacing: "-0.045em",
  },
  pageTitle: {
    fontFamily: F.display,
    fontWeight: 700,
    fontSize: "clamp(2.3rem, 4.4vw, 4.2rem)",
    lineHeight: 1,
    letterSpacing: "-0.04em",
  },
  h2: {
    fontFamily: F.display,
    fontWeight: 700,
    fontSize: "clamp(1.85rem, 3.2vw, 2.9rem)",
    lineHeight: 1.05,
    letterSpacing: "-0.035em",
  },
  h3: {
    fontFamily: F.display,
    fontWeight: 700,
    fontSize: "clamp(1.3rem, 1.9vw, 1.7rem)",
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
  },
} as const;

// Readable label style: mono, uppercase, never below 12px.
export const LABEL = "text-xs uppercase tracking-[0.1em] sm:tracking-[0.14em]";

// ─── SEO ─────────────────────────────────────────────────────────────────────
export function Seo({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  const url = `${SITE_URL}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TODO Growth" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}

// ─── Motion helpers ──────────────────────────────────────────────────────────
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

export function useMediaQuery(query: string) {
  const [match, setMatch] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

/** True while the element is on screen. Used to pause canvases and media off-screen. */
export function useInView<T extends HTMLElement>(rootMargin = "100px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}

/**
 * One-time reveal. Content is visible by default; it is only hidden (and then
 * revealed) when it starts below the fold, motion is allowed and the browser
 * supports IntersectionObserver. Nothing stays hidden if animation fails.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [phase, setPhase] = useState<"static" | "hidden" | "shown">("static");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    setPhase("hidden");
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("shown");
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible: phase !== "hidden" };
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(16px)",
        transition: `opacity .7s ${delay}s ${EASE}, transform .7s ${delay}s ${EASE}`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Typography ──────────────────────────────────────────────────────────────
export function Eyebrow({
  children,
  color = C.muted,
  line = false,
  className = "mb-5",
}: {
  children: ReactNode;
  color?: string;
  line?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {line && <span className="hidden h-px w-6 shrink-0 sm:block" style={{ background: color }} />}
      <span className={LABEL} style={{ fontFamily: F.mono, color }}>
        {children}
      </span>
    </div>
  );
}

/**
 * Section heading. `accent` continues the title in a muted tone (same weight).
 * The italic treatment is reserved for rare `signature` moments.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  color = C.muted,
  signature = false,
  className = "",
  as: Tag = "h2",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  accent?: ReactNode;
  intro?: ReactNode;
  color?: string;
  signature?: boolean;
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <div className={`mb-12 max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow color={color}>{eyebrow}</Eyebrow>}
      <Tag style={{ ...TYPE.h2, color: C.text }}>
        {title}
        {accent &&
          (signature ? (
            <>
              <br />
              <em className="font-normal italic" style={{ color: "rgba(245,245,240,0.5)" }}>
                {accent}
              </em>
            </>
          ) : (
            <span style={{ color: "rgba(245,245,240,0.45)" }}> {accent}</span>
          ))}
      </Tag>
      {intro && (
        <p className="mt-5 max-w-2xl text-base leading-8" style={{ color: C.body }}>
          {intro}
        </p>
      )}
    </div>
  );
}

// ─── Layout ──────────────────────────────────────────────────────────────────
type Tone = "base" | "raised" | "ink";
const TONE_BG: Record<Tone, string> = { base: C.bg, raised: C.bgRaised, ink: C.bgInk };

export function Section({
  children,
  id,
  tone = "base",
  className = "",
  padding = "py-20 lg:py-28",
}: {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  className?: string;
  padding?: string;
}) {
  return (
    <section
      id={id}
      className={`px-5 sm:px-8 lg:px-14 ${padding} ${className}`}
      style={{ background: TONE_BG[tone] }}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

const GRID_BG = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
  backgroundSize: "56px 56px",
};

export function PageHero({
  eyebrow,
  title,
  accent,
  intro,
  children,
  aside,
  color = C.yellow,
  compact = false,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  accent?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  /** Optional right-hand content (image, index, diagram) on large screens. */
  aside?: ReactNode;
  color?: string;
  compact?: boolean;
}) {
  return (
    <section
      className={`relative overflow-hidden px-5 sm:px-8 lg:px-14 ${
        compact ? "pb-10 pt-12 lg:pb-14 lg:pt-16" : "pb-16 pt-14 sm:pt-16 lg:pb-24 lg:pt-20"
      }`}
      style={{ background: `linear-gradient(170deg, ${C.bgRaised} 0%, ${C.bg} 70%)` }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ ...GRID_BG, maskImage: "linear-gradient(180deg, #000 0%, transparent 85%)" }}
      />
      <div
        className={`relative z-10 mx-auto max-w-7xl ${
          aside ? "grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16" : ""
        }`}
      >
        <div>
          <div className="anim-up" style={{ animationDelay: "0.05s" }}>
            <Eyebrow color={color} line>
              {eyebrow}
            </Eyebrow>
          </div>
          <h1
            className="anim-up max-w-4xl"
            style={{ animationDelay: "0.1s", ...TYPE.pageTitle, color: C.text }}
          >
            {title}
            {accent && <span style={{ color: "rgba(245,245,240,0.45)" }}> {accent}</span>}
          </h1>
          {intro && (
            <p
              className="anim-up mt-6 max-w-2xl text-base leading-8 sm:text-[17px]"
              style={{ animationDelay: "0.16s", color: C.body }}
            >
              {intro}
            </p>
          )}
          {children && (
            <div className="anim-up mt-8" style={{ animationDelay: "0.22s" }}>
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div className="anim-up hidden lg:block" style={{ animationDelay: "0.2s" }}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Media ───────────────────────────────────────────────────────────────────
/**
 * A replaceable image slot. The slot owns the aspect ratio and crop, so a new
 * asset can be dropped into the registry without changing any layout.
 */
const TAG_POSITION = {
  left: "bottom-3 left-3",
  right: "bottom-3 right-3",
  "top-left": "top-3 left-3",
  "top-right": "top-3 right-3",
} as const;

export function MediaSlot({
  media,
  aspect = "16 / 10",
  className = "",
  imgClassName = "",
  position,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  overlay = false,
  rounded = "rounded-2xl",
  fill = false,
  tagPosition = "left",
  tag = true,
  motion,
}: {
  media: MediaAsset;
  aspect?: string;
  className?: string;
  imgClassName?: string;
  position?: string;
  sizes?: string;
  priority?: boolean;
  overlay?: boolean;
  rounded?: string;
  /** Fill the positioned parent instead of using an aspect ratio. */
  fill?: boolean;
  tagPosition?: "left" | "right" | "top-left" | "top-right";
  /** Show the "Illustrative image" tag on temporary media (default true). */
  tag?: boolean;
  /** "drift": very slow cinematic scale/pan on stills. Paused off-screen and for reduced motion. */
  motion?: "drift";
}) {
  const { ref, inView } = useInView<HTMLElement>("0px");
  const reduced = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  // Video plays only on larger screens, with motion allowed, while visible.
  const playVideo = media.kind === "video" && !!media.video && !reduced && isDesktop;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView) v.play().catch(() => undefined);
    else v.pause();
  }, [inView, playVideo]);

  const animate = motion === "drift" && !reduced;
  const objectPosition = position ?? media.focus ?? "center";

  return (
    <figure
      ref={ref}
      className={`${fill ? "absolute inset-0" : "relative"} m-0 overflow-hidden ${rounded} ${className}`}
      style={fill ? { background: C.bgRaised } : { aspectRatio: aspect, background: C.bgRaised }}
    >
      {playVideo ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
          style={{ objectPosition }}
          poster={media.src}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden={media.alt ? undefined : true}
          aria-label={media.alt || undefined}
        >
          <source src={media.video!.src} type={media.video!.type ?? "video/mp4"} />
        </video>
      ) : (
        <img
          src={media.src}
          srcSet={media.srcSet}
          sizes={media.srcSet ? sizes : undefined}
          alt={media.alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover ${animate ? "media-drift" : ""} ${imgClassName}`}
          style={{
            objectPosition,
            animationPlayState: animate && inView ? "running" : "paused",
          }}
        />
      )}
      {overlay && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(7,8,15,0) 40%, rgba(7,8,15,0.75) 100%)",
          }}
        />
      )}
      {tag && media.status === "temporary" && media.tagged !== false && (
        <figcaption
          className={`absolute z-10 rounded-full ${TAG_POSITION[tagPosition]} px-2.5 py-1 text-[11px] tracking-[0.06em]`}
          style={{
            background: "rgba(7,8,15,0.7)",
            color: "rgba(245,245,240,0.8)",
            fontFamily: F.mono,
          }}
        >
          Illustrative image
        </figcaption>
      )}
    </figure>
  );
}

// ─── Calls to action ─────────────────────────────────────────────────────────
type CtaVariant = "primary" | "secondary" | "link";

const CTA_CLASSES: Record<CtaVariant, string> = {
  primary:
    "inline-flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.07em] text-[#0b0d17] transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#F0CF5A]",
  secondary:
    "inline-flex min-h-[48px] items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/25 px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.07em] text-[#f5f5f0] transition-colors duration-200 hover:border-[#E8C547] hover:text-[#E8C547]",
  link: "group inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[#f5f5f0] underline decoration-white/30 underline-offset-[6px] transition-colors duration-200 hover:text-[#E8C547] hover:decoration-[#E8C547]",
};

export function Cta({
  to,
  children,
  variant = "primary",
  className = "",
  arrow = true,
}: {
  to: string;
  children: ReactNode;
  variant?: CtaVariant;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`${CTA_CLASSES[variant]} ${className}`}
      style={{
        fontFamily: F.display,
        ...(variant === "primary" ? { background: C.yellow } : {}),
      }}
    >
      {children}
      {arrow && (
        <ArrowRight
          size={15}
          className={variant === "link" ? "transition-transform group-hover:translate-x-0.5" : ""}
        />
      )}
    </Link>
  );
}

// ─── Closing conversion section ──────────────────────────────────────────────
/**
 * Closing call to action. One system, three compositions so page endings
 * don't repeat: "statement" (large type), "split" (headline + actions side by
 * side) and "image" (framed by a media slot).
 */
export function FinalCta({
  title = "Ready to grow?",
  body = "Whether you need a website, a virtual tour, content, marketing support, a Microsoft & AI solution or a sharper commercial offer, we help you move from idea to implementation.",
  variant = "statement",
  media,
}: {
  title?: ReactNode;
  body?: ReactNode;
  variant?: "statement" | "split" | "image";
  media?: MediaAsset;
}) {
  const actions = (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Cta to="/discovery">Book a Discovery Call</Cta>
      <Cta to="/contact" variant="secondary">
        Request a Quote
      </Cta>
    </div>
  );

  // In the split layout the actions share a narrow column at 1024px, so they stack until xl.
  const splitActions = (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-start xl:flex-row xl:items-center">
      <Cta to="/discovery">Book a Discovery Call</Cta>
      <Cta to="/contact" variant="secondary">
        Request a Quote
      </Cta>
    </div>
  );

  if (variant === "split") {
    return (
      <Section tone="ink" padding="py-20 lg:py-24">
        <Reveal className="grid gap-10 border-t border-white/10 pt-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <h2 style={{ ...TYPE.h2, color: C.text }}>{title}</h2>
          <div>
            <p className="mb-8 text-base leading-8" style={{ color: C.body }}>
              {body}
            </p>
            {splitActions}
          </div>
        </Reveal>
      </Section>
    );
  }

  if (variant === "image" && media) {
    return (
      <section className="relative overflow-hidden" style={{ background: C.bgInk }}>
        <MediaSlot
          media={media}
          fill
          rounded="rounded-none"
          imgClassName="opacity-50"
          sizes="100vw"
          tagPosition="right"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(7,8,15,0.96) 0%, rgba(7,8,15,0.7) 55%, rgba(7,8,15,0.3) 100%)",
          }}
        />
        <Reveal className="relative z-10 mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-14 lg:py-32">
          <div className="max-w-2xl">
            <h2
              className="mb-6"
              style={{ ...TYPE.h2, fontSize: "clamp(2.2rem,4.4vw,3.8rem)", color: C.text }}
            >
              {title}
            </h2>
            <p className="mb-10 text-base leading-8" style={{ color: C.body }}>
              {body}
            </p>
            {actions}
          </div>
        </Reveal>
      </section>
    );
  }

  return (
    <Section tone="ink" padding="py-24 lg:py-32">
      <Reveal className="max-w-3xl">
        <h2
          className="mb-6"
          style={{ ...TYPE.display, fontSize: "clamp(2.4rem,5vw,4.6rem)", color: C.text }}
        >
          {title}
        </h2>
        <p className="mb-10 max-w-2xl text-base leading-8" style={{ color: C.body }}>
          {body}
        </p>
        {actions}
      </Reveal>
    </Section>
  );
}
