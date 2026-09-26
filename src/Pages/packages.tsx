import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import {
  C,
  F,
  TYPE,
  LABEL,
  Seo,
  PageHero,
  Reveal,
  Cta,
  FinalCta,
  Section,
  MediaSlot,
} from "@/components/site/ui";
import { PACKAGES, PRICE_PENDING_LABEL, serviceById, type Package } from "@/content/site";
import { MEDIA, type MediaKey } from "@/content/media";

// Low-opacity background image per package (secondary to the package content).
const PACKAGE_MEDIA: Record<string, MediaKey> = {
  "starter-growth": "packageStarter",
  "business-growth": "packageBusiness",
  "hospitality-transformation": "packageHospitality",
};

/** Scope-led package block: who it's for, what you get, what it supports, how to start. */
function PackageRow({ pkg, index }: { pkg: Package; index: number }) {
  const featured = pkg.featured;
  return (
    <article
      id={pkg.id}
      className={`relative grid gap-10 overflow-hidden border-t py-12 lg:grid-cols-[0.9fr_1.15fr_0.75fr] lg:gap-12 lg:py-16 ${
        featured ? "-mx-5 rounded-3xl border px-5 sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10" : ""
      }`}
      style={{
        borderColor: featured ? "rgba(232,197,71,0.35)" : C.line,
        background: featured
          ? "linear-gradient(160deg, rgba(232,197,71,0.08) 0%, rgba(232,197,71,0.02) 55%)"
          : undefined,
      }}
    >
      <div aria-hidden="true" className="package-media pointer-events-none absolute inset-0">
        <MediaSlot
          media={MEDIA[PACKAGE_MEDIA[pkg.id]]}
          fill
          rounded="rounded-none"
          sizes="(min-width: 1024px) 45vw, 100vw"
          imgClassName="opacity-[0.24]"
          tagPosition="right"
        />
      </div>

      {/* Who it's for */}
      <div className="relative">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span
            className={LABEL}
            style={{ fontFamily: F.mono, color: featured ? C.yellow : C.muted }}
          >
            Package {String(index + 1).padStart(2, "0")}
          </span>
          {featured && (
            <span
              className={`${LABEL} rounded-full border px-2.5 py-0.5`}
              style={{ fontFamily: F.mono, color: C.yellow, borderColor: "rgba(232,197,71,0.45)" }}
            >
              For hospitality
            </span>
          )}
        </div>
        <h2 className="mb-5" style={{ ...TYPE.h2, color: C.text }}>
          {pkg.name}
        </h2>
        <dl className="space-y-4">
          <div>
            <dt className={LABEL} style={{ fontFamily: F.mono, color: C.muted }}>
              Who it's for
            </dt>
            <dd className="mt-1 text-base leading-7 text-white/90">{pkg.forWhom}</dd>
          </div>
          <div>
            <dt className={LABEL} style={{ fontFamily: F.mono, color: C.muted }}>
              What it supports
            </dt>
            <dd className="mt-1 text-base leading-7 text-white/90">{pkg.supports}</dd>
          </div>
        </dl>
      </div>

      {/* What you get */}
      <div className="relative">
        <div className={`${LABEL} mb-3`} style={{ fontFamily: F.mono, color: C.muted }}>
          What you get
        </div>
        <ul className="grid gap-x-8 sm:grid-cols-2">
          {pkg.includes.map((item) => (
            <li
              key={item}
              className="flex min-h-[48px] items-center gap-3 border-b border-white/[0.08] py-2 text-[15px] text-white/90"
            >
              <Check
                size={15}
                color={featured ? C.yellow : "rgba(245,245,240,0.6)"}
                className="shrink-0"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* How to start */}
      <div className="relative flex flex-col justify-between gap-6 lg:border-l lg:border-white/10 lg:pl-10">
        <div>
          <div className={LABEL} style={{ fontFamily: F.mono, color: C.muted }}>
            Investment
          </div>
          <div className="mt-1 text-xl font-bold text-[#f5f5f0]" style={{ fontFamily: F.display }}>
            {PRICE_PENDING_LABEL}
          </div>
          <p className="mt-2 text-sm leading-6" style={{ color: C.muted }}>
            Confirmed in a written scope with deliverables and timeline.
          </p>
        </div>
        <Cta to={pkg.cta.to} variant="secondary" className="w-full sm:w-auto lg:w-full">
          {pkg.cta.label}
        </Cta>
      </div>
    </article>
  );
}

const EXTENSIONS = [
  {
    id: "microsoft-ai",
    title: "Microsoft & AI Business Solutions",
    body: "Extend any package with Microsoft 365, Copilot, AI knowledge bases or AI staff training.",
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    body: "Add social media management, advertising, SEO or influencer campaigns.",
  },
  {
    id: "virtual-tours",
    title: "Virtual Tours",
    body: "Add a 360° virtual tour so customers can explore your space before they arrive.",
  },
];

export default function PackagesPage() {
  return (
    <PageShell>
      <Seo
        title="Growth Packages | TODO Growth"
        description="Ready-to-buy growth packages for small businesses, growing companies and hospitality brands: websites, photography, content, social media, advertising and hospitality transformation."
        path="/packages"
      />

      <PageHero
        compact
        eyebrow="Packages"
        title="Ready-to-buy growth packages."
        accent="Clear scope. One team."
        intro="Packages bring our most-requested services together so the next step is simple. Every package is confirmed in a written scope with deliverables, timeline and investment before work starts."
      />

      <Section padding="pt-6 pb-20 lg:pb-28">
        {PACKAGES.map((pkg, i) => (
          <Reveal key={pkg.id}>
            <PackageRow pkg={pkg} index={i} />
          </Reveal>
        ))}
        <p className="mt-10 text-sm leading-7" style={{ color: C.muted }}>
          Package contents can be adjusted to your business. Every package follows our{" "}
          <Link
            to="/about#how-we-work"
            className="text-white/90 underline decoration-white/30 underline-offset-4 hover:text-[#E8C547]"
          >
            four-step process
          </Link>
          .
        </p>
      </Section>

      <Section tone="raised" padding="py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="mb-3" style={{ ...TYPE.h2, color: C.text }}>
              Need more than a package covers?
            </h2>
            <p className="text-base leading-8" style={{ color: C.body }}>
              Add individual services to any package, or request a quote for exactly what you need.
            </p>
          </div>
          <ul className="border-t border-white/10">
            {EXTENSIONS.map((e) => {
              const s = serviceById(e.id)!;
              return (
                <li key={e.id}>
                  <Link
                    to={`/services#${e.id}`}
                    className="group grid gap-1 border-b border-white/10 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
                  >
                    <div>
                      <div
                        className="mb-1 flex items-center gap-2.5 text-lg font-bold text-[#f5f5f0] transition-colors group-hover:text-[#E8C547]"
                        style={{ fontFamily: F.display }}
                      >
                        <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                        {e.title}
                      </div>
                      <p className="text-[15px] leading-7" style={{ color: C.body }}>
                        {e.body}
                      </p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="hidden text-white/40 transition-transform group-hover:translate-x-0.5 sm:block"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      <FinalCta
        variant="statement"
        title="Not sure which package fits?"
        body="Book a Discovery Call and we'll recommend the right starting point, or request a quote if you already know what you need."
      />
    </PageShell>
  );
}
