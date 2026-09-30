import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import {
  C,
  F,
  TYPE,
  LABEL,
  Seo,
  Eyebrow,
  SectionHeading,
  Section,
  Reveal,
  Cta,
  MediaSlot,
} from "@/components/site/ui";
import { GrowthDiagram } from "@/components/site/GrowthDiagram";
import { BrowserShot } from "@/components/site/work";
import {
  COMPANY,
  SERVICES,
  STAGES,
  PACKAGES,
  PRIMARY_INDUSTRIES,
  SECONDARY_INDUSTRIES,
  WHY_TODO,
  PROCESS,
  PROJECTS,
  PRICE_PENDING_LABEL,
  serviceById,
} from "@/content/site";
import { MEDIA } from "@/content/media";

const MICROSOFT = serviceById("microsoft-ai")!;
const HERO_SERVICES = ["Marketing", "Content", "Websites", "Microsoft & AI", "Sales systems"];
const INDUSTRY_MEDIA = {
  hospitality: "hospitality",
  tourism: "tourism",
  realestate: "realestate",
} as const;
// Mobile hero shading over the full-bleed image: dark behind the type, clearer
// around the diagram, dark again at the CTA, with a soft edge vignette.
const MOBILE_HERO_SHADE = [
  "radial-gradient(120% 70% at 50% 62%, rgba(11,13,23,0) 45%, rgba(11,13,23,0.6) 100%)",
  "linear-gradient(180deg, rgba(11,13,23,0.94) 0%, rgba(11,13,23,0.82) 30%, rgba(11,13,23,0.74) 47%, rgba(11,13,23,0.32) 58%, rgba(11,13,23,0.3) 70%, rgba(11,13,23,0.78) 84%, rgb(11,13,23) 100%)",
].join(", ");
const STAGE_ORDER = [
  "branding",
  "websites",
  "content",
  "marketing",
  "virtual-tours",
  "sales",
  "reputation",
  "microsoft-ai",
];

export default function HomePage() {
  const [grotta, eagleview, svf] = PROJECTS;

  return (
    <PageShell>
      <Seo
        title="TODO Growth | Growth, Commercialization & Digital Transformation"
        description="TODO Growth helps hospitality, tourism and real estate businesses grow faster with branding, websites, virtual tours, content, digital marketing, Microsoft & AI solutions and sales support. Based in Rwanda."
        path="/"
      />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden px-5 sm:px-8 lg:px-14"
        style={{ background: C.bg }}
      >
        {/* Mobile: full-bleed atmosphere behind the whole hero. Replaceable slot: MEDIA.heroAmbient. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 md:hidden">
          <MediaSlot
            media={MEDIA.heroAmbient}
            fill
            rounded="rounded-none"
            priority
            sizes="100vw"
            position="center"
            imgClassName="opacity-[0.62]"
          />
          <div className="absolute inset-0" style={{ background: MOBILE_HERO_SHADE }} />
        </div>

        {/* Atmosphere behind the diagram (desktop). Replaceable slot: MEDIA.heroAmbient. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] lg:block"
          style={{
            maskImage: "linear-gradient(90deg, transparent 0%, #000 40%)",
            WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 40%)",
          }}
        >
          <MediaSlot
            media={MEDIA.heroAmbient}
            fill
            rounded="rounded-none"
            motion="drift"
            priority
            sizes="62vw"
            imgClassName="opacity-[0.38]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(48% 52% at 52% 50%, rgba(11,13,23,0.78) 0%, rgba(11,13,23,0.35) 65%, rgba(11,13,23,0.15) 100%), linear-gradient(180deg, rgba(11,13,23,0.5) 0%, rgba(11,13,23,0) 25%, rgba(11,13,23,0) 70%, rgba(11,13,23,0.9) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-6 pb-10 pt-5 md:pb-14 md:pt-10 lg:min-h-[calc(100svh-76px)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-12">
          {/* Below md the column is a flex stack so the mobile composition can reorder. */}
          <div className="flex flex-col md:block">
            <div className="anim-up order-1" style={{ animationDelay: "0.05s" }}>
              <Eyebrow color={C.yellow} line className="mb-3 md:mb-5">
                Kigali, Rwanda · Growth infrastructure
              </Eyebrow>
            </div>

            <h1
              className="anim-up order-2 mb-4 max-w-[13ch] text-[#f5f5f0] md:mb-7"
              style={{ animationDelay: "0.1s", ...TYPE.display }}
            >
              We help hospitality, tourism & real estate businesses{" "}
              <span style={{ color: C.yellow }}>grow faster.</span>
            </h1>

            <ul
              className="anim-up order-3 mb-2 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-white/10 pt-3 md:mb-7 md:gap-x-4 md:gap-y-2 md:border-0 md:pt-0"
              style={{ animationDelay: "0.15s" }}
              aria-label="What we do"
            >
              {HERO_SERVICES.map((s, i) => (
                <li
                  key={s}
                  className={`${LABEL} flex items-center gap-4 whitespace-nowrap`}
                  style={{ fontFamily: F.mono, color: s === "Microsoft & AI" ? C.blue : C.body }}
                >
                  {s}
                  {i < HERO_SERVICES.length - 1 && (
                    <span className="text-white/25" aria-hidden="true">
                      /
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <p
              className="anim-up hidden max-w-xl md:mb-9 md:block md:text-[17px] md:leading-8"
              style={{ animationDelay: "0.2s", color: C.body }}
            >
              We help businesses grow, commercialize and transform through practical digital
              solutions that increase bookings, sales inquiries, customer engagement and operational
              efficiency.
            </p>

            {/* ── Mobile: compact signature diagram, set directly on the full-bleed atmosphere ── */}
            <div
              className="anim-up relative order-5 my-7 flex justify-center md:hidden"
              style={{ animationDelay: "0.18s" }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(11,13,23,0.6) 0%, rgba(11,13,23,0) 100%)",
                }}
              />
              <div className="relative h-[256px] w-[256px]">
                <GrowthDiagram compact />
              </div>
            </div>

            {/* ── Mobile CTA: primary dominant, secondary as an editorial link ── */}
            <div className="anim-up order-6 md:hidden" style={{ animationDelay: "0.24s" }}>
              <Cta to="/discovery" className="w-full">
                Book a Discovery Call
              </Cta>
              <div className="mt-2 flex items-center gap-4">
                <span className="h-px flex-1 bg-white/15" aria-hidden="true" />
                <Cta to="/services" variant="link">
                  View Services
                </Cta>
              </div>
            </div>

            <div
              className="anim-up hidden gap-3 md:flex md:flex-row md:items-center"
              style={{ animationDelay: "0.26s" }}
            >
              <Cta to="/discovery">Book a Discovery Call</Cta>
              <Cta to="/services" variant="secondary">
                View Services
              </Cta>
            </div>

            <p
              className="anim-up hidden max-w-md border-l-2 pl-4 text-sm leading-6 md:mt-7 md:block"
              style={{ animationDelay: "0.32s", color: C.muted, borderColor: C.yellow }}
            >
              No long consulting engagements. Just clear solutions designed to deliver measurable
              results.
            </p>
          </div>

          {/* Tablet stacked diagram + desktop right column (mobile uses the compact band above). */}
          <div className="relative -mx-5 hidden px-5 py-4 sm:-mx-8 sm:px-8 md:block lg:m-0 lg:p-0">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 lg:hidden"
              style={{
                maskImage: "linear-gradient(180deg, transparent 0%, #000 30%, #000 100%)",
                WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 30%, #000 100%)",
              }}
            >
              <MediaSlot
                media={MEDIA.heroAmbient}
                fill
                rounded="rounded-none"
                sizes="100vw"
                imgClassName="opacity-[0.32]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(50% 50% at 50% 50%, rgba(11,13,23,0.75) 0%, rgba(11,13,23,0.2) 100%)",
                }}
              />
            </div>
            <div
              className="anim-up relative mx-auto w-full max-w-[400px] sm:max-w-[520px] lg:max-w-[620px]"
              style={{ animationDelay: "0.2s" }}
            >
              <GrowthDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE: image-led split ──────────────────────────── */}
      <section id="who-we-are" style={{ background: C.bgRaised }}>
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[560px]">
            <MediaSlot
              media={MEDIA.whoWeAre}
              fill
              rounded="rounded-none"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          <Reveal className="flex flex-col justify-center px-5 py-16 sm:px-8 lg:px-16 lg:py-20">
            <Eyebrow>Who we are</Eyebrow>
            <p
              className="mb-6 text-[#f5f5f0]"
              style={{ ...TYPE.h3, fontSize: "clamp(1.45rem,2.4vw,2.05rem)", lineHeight: 1.25 }}
            >
              {COMPANY.legalName} is a Rwanda-based team delivering growth, commercialization and
              digital transformation for businesses across East Africa and beyond.
            </p>
            <p className="max-w-xl text-base leading-8" style={{ color: C.body }}>
              From content production and websites to Microsoft and AI-powered business systems, we
              help businesses attract customers, convert sales and operate more efficiently. We call
              it <span className="text-white">growth infrastructure</span>: the brand, content,
              marketing and systems that keep working for you long after launch.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── SERVICES: the four-stage journey ─────────────────────── */}
      <Section id="services-overview">
        <SectionHeading
          eyebrow="Services"
          title="One team for every part of growth."
          accent="Use one service, or connect them."
          intro="Each service solves a specific business problem. Together they form one system that helps customers find you, trust you and buy from you."
        />

        <div className="grid gap-10 md:grid-cols-3 md:gap-8 xl:grid-cols-[1fr_1fr_1fr_1.35fr]">
          {STAGES.filter((st) => st.id !== "operate").map((st, i) => (
            <Reveal key={st.id} delay={i * 0.05}>
              <div className="mb-5 h-0.5 w-full" style={{ background: st.color }} />
              <div className="mb-1 flex items-baseline gap-3">
                <span className={LABEL} style={{ fontFamily: F.mono, color: st.color }}>
                  0{i + 1}
                </span>
                <span
                  className="text-xl font-bold text-[#f5f5f0]"
                  style={{ fontFamily: F.display }}
                >
                  {st.label}
                </span>
              </div>
              <p className="mb-4 text-sm leading-6" style={{ color: C.muted }}>
                {st.line}
              </p>
              <ul>
                {SERVICES.filter((s) => s.stage === st.id)
                  .sort((a, b) => STAGE_ORDER.indexOf(a.id) - STAGE_ORDER.indexOf(b.id))
                  .map((s) => (
                    <li key={s.id}>
                      <Link
                        to={`/services#${s.id}`}
                        className="group flex min-h-[44px] items-center justify-between gap-3 border-b border-white/[0.07] py-2 text-[15px] text-white/90 transition-colors hover:text-white"
                      >
                        {s.name}
                        <ArrowRight
                          size={14}
                          className="shrink-0 text-white/30 transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                    </li>
                  ))}
              </ul>
            </Reveal>
          ))}

          {/* Operate: Microsoft & AI as the core capability */}
          <Reveal delay={0.15} className="md:col-span-3 xl:col-span-1">
            <Link
              to="/services#microsoft-ai"
              className="group relative block h-full overflow-hidden rounded-2xl border p-7 transition-colors hover:border-[#7DB8E8]"
              style={{
                borderColor: "rgba(125,184,232,0.35)",
                background:
                  "linear-gradient(160deg, rgba(125,184,232,0.16) 0%, rgba(125,184,232,0.04) 60%)",
              }}
            >
              <div className="flex flex-wrap items-baseline gap-3">
                <span className={LABEL} style={{ fontFamily: F.mono, color: C.blue }}>
                  04
                </span>
                <span
                  className="text-xl font-bold text-[#f5f5f0]"
                  style={{ fontFamily: F.display }}
                >
                  Operate
                </span>
                <span
                  className={`${LABEL} ml-auto rounded-full border px-2.5 py-0.5`}
                  style={{
                    fontFamily: F.mono,
                    color: C.blue,
                    borderColor: "rgba(125,184,232,0.45)",
                  }}
                >
                  Core capability
                </span>
              </div>
              <h3 className="mb-3 mt-5" style={{ ...TYPE.h3, color: C.text }}>
                {MICROSOFT.name}
              </h3>
              <p className="mb-5 text-sm leading-7" style={{ color: C.body }}>
                {MICROSOFT.short}
              </p>
              <ul className="mb-6 space-y-2">
                {MICROSOFT.capabilities.slice(0, 5).map((c) => (
                  <li key={c} className="flex items-center gap-2.5 text-sm text-white/85">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: C.blue }}
                    />
                    {c}
                  </li>
                ))}
              </ul>
              <span
                className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold"
                style={{ color: C.blue }}
              >
                Explore Microsoft & AI
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* ── SELECTED WORK: proof, image-led ──────────────────────── */}
      <Section id="selected-work" tone="ink">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            title="Real projects."
            accent="Real organizations in Rwanda."
            className="mb-0"
          />
          <Cta to="/portfolio" variant="link">
            View portfolio
          </Cta>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-8">
            <Link to={`/portfolio#${grotta.id}`} className="group block">
              <BrowserShot
                media={MEDIA.grottaSite}
                domain={grotta.domain}
                className="transition-transform duration-500 group-hover:-translate-y-1"
              />
              <ProjectCaption p={grotta} />
            </Link>
          </Reveal>
          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:gap-8">
            <Reveal delay={0.08}>
              <Link to={`/portfolio#${eagleview.id}`} className="group block">
                <BrowserShot
                  media={MEDIA.eagleviewSite}
                  domain={eagleview.domain}
                  sizes="(min-width: 1024px) 30vw, 50vw"
                  className="transition-transform duration-500 group-hover:-translate-y-1"
                />
                <ProjectCaption p={eagleview} small />
              </Link>
            </Reveal>
            <Reveal delay={0.14}>
              <Link to={`/portfolio#${svf.id}`} className="group block">
                <MediaSlot
                  media={MEDIA.svfLead}
                  aspect="16 / 10"
                  rounded="rounded-xl"
                  sizes="(min-width: 1024px) 30vw, 50vw"
                  className="transition-transform duration-500 group-hover:-translate-y-1"
                />
                <ProjectCaption p={svf} small />
              </Link>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── PACKAGES: editorial rows ─────────────────────────────── */}
      <Section id="packages-overview" tone="raised">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Packages"
              title="Ready-to-buy solutions."
              accent="A clear scope from day one."
              intro="Packages bring the most-requested services together so the next step is simple."
              className="mb-6"
            />
            <Cta to="/packages" variant="link">
              Compare packages
            </Cta>
          </div>
          <ul className="border-t border-white/10">
            {PACKAGES.map((p) => (
              <li key={p.id}>
                <Link
                  to={`/packages#${p.id}`}
                  className="group grid gap-2 border-b border-white/10 py-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8"
                >
                  <div>
                    <div className="mb-1 flex flex-wrap items-center gap-3">
                      <span
                        className="text-xl font-bold text-[#f5f5f0] transition-colors group-hover:text-[#E8C547]"
                        style={{ fontFamily: F.display }}
                      >
                        {p.name}
                      </span>
                      {p.featured && (
                        <span
                          className={`${LABEL} rounded-full border px-2.5 py-0.5`}
                          style={{
                            fontFamily: F.mono,
                            color: C.yellow,
                            borderColor: "rgba(232,197,71,0.45)",
                          }}
                        >
                          For hospitality
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-6" style={{ color: C.body }}>
                      {p.audience}
                    </p>
                  </div>
                  <span
                    className={`${LABEL} flex items-center gap-2 text-white/70`}
                    style={{ fontFamily: F.mono }}
                  >
                    {PRICE_PENDING_LABEL}
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ── INDUSTRIES: image-led editorial rows ─────────────────── */}
      <Section id="industries-overview">
        <Eyebrow>Industries</Eyebrow>
        <h2 className="mb-10 max-w-3xl" style={{ ...TYPE.h2, color: C.text }}>
          Built for businesses that sell experiences and spaces.
        </h2>
        <ul className="border-t border-white/10">
          {PRIMARY_INDUSTRIES.map((ind) => (
            <li key={ind.id}>
              <Link
                to={`/industries#${ind.id}`}
                className="group grid items-center gap-4 border-b border-white/10 py-6 md:grid-cols-[1fr_minmax(0,0.95fr)] md:gap-10 lg:py-8"
              >
                <div>
                  <span
                    className="block transition-colors group-hover:text-[#E8C547]"
                    style={{ ...TYPE.display, fontSize: "clamp(2rem,5vw,4rem)", color: C.text }}
                  >
                    {ind.name}
                  </span>
                  <span className="mt-2 block text-sm" style={{ color: C.muted }}>
                    {ind.who}
                  </span>
                </div>
                <MediaSlot
                  media={MEDIA[INDUSTRY_MEDIA[ind.id]]}
                  aspect="21 / 8"
                  rounded="rounded-xl"
                  sizes="(min-width: 768px) 45vw, 100vw"
                  imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1">
          <span className={LABEL} style={{ fontFamily: F.mono, color: C.muted }}>
            Also serving
          </span>
          {SECONDARY_INDUSTRIES.map((ind) => (
            <Link
              key={ind.id}
              to={`/industries#${ind.id}`}
              className="inline-flex min-h-[44px] items-center text-[15px] text-white/85 transition-colors hover:text-[#E8C547]"
            >
              {ind.name}
            </Link>
          ))}
        </div>
      </Section>

      {/* ── WHY TODO + HOW IT WORKS ──────────────────────────────── */}
      <Section id="why-todo" tone="raised">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="Why TODO Growth"
            title="Growth you can actually use."
            accent="Built, launched, working."
            signature
            className="mb-0"
          />
          <dl className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
            {WHY_TODO.map((w) => (
              <Reveal key={w.title}>
                <dt
                  className="mb-2 text-lg font-bold text-[#f5f5f0]"
                  style={{ fontFamily: F.display }}
                >
                  {w.title}
                </dt>
                <dd className="text-[15px] leading-7" style={{ color: C.body }}>
                  {w.body}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <div id="how-it-works" className="mt-24 lg:mt-28">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 style={{ ...TYPE.h2, color: C.text }}>
              Four steps.{" "}
              <span style={{ color: "rgba(245,245,240,0.45)" }}>No guesswork in between.</span>
            </h2>
            <Cta to="/about#how-we-work" variant="link">
              How we work
            </Cta>
          </div>
          <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
            <span
              className="absolute left-0 right-0 top-[7px] hidden h-px bg-white/15 md:block"
              aria-hidden="true"
            />
            {PROCESS.map((p) => (
              <li key={p.num} className="relative pl-7 md:pl-0 md:pt-9">
                <span
                  className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 md:top-0"
                  style={{ borderColor: C.yellow, background: C.bgRaised }}
                  aria-hidden="true"
                />
                <span
                  className={`${LABEL} mb-2 block`}
                  style={{ fontFamily: F.mono, color: C.yellow }}
                >
                  Step {p.num}
                </span>
                <h3
                  className="mb-2 text-lg font-bold text-[#f5f5f0]"
                  style={{ fontFamily: F.display }}
                >
                  {p.title}
                </h3>
                <p className="text-[15px] leading-7" style={{ color: C.body }}>
                  {p.short}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* The site footer ("Ready to grow?") is the closing scene on Home. */}
    </PageShell>
  );
}

function ProjectCaption({ p, small = false }: { p: (typeof PROJECTS)[number]; small?: boolean }) {
  return (
    <div className="mt-5 flex items-start justify-between gap-4">
      <div>
        <div className={`${LABEL} mb-1`} style={{ fontFamily: F.mono, color: p.accent }}>
          {p.index} · {p.category}
        </div>
        <div
          className="font-bold text-[#f5f5f0] transition-colors group-hover:text-[#E8C547]"
          style={{
            fontFamily: F.display,
            fontSize: small ? "1.25rem" : "clamp(1.5rem,2.4vw,2rem)",
            letterSpacing: "-0.03em",
          }}
        >
          {p.client}
        </div>
        {!small && (
          <div className="mt-1 text-sm" style={{ color: C.muted }}>
            {p.delivered.map((d) => d.label).join(" · ")}
          </div>
        )}
      </div>
      <ArrowUpRight
        size={18}
        className="mt-1 shrink-0 text-white/40 transition-colors group-hover:text-[#E8C547]"
      />
    </div>
  );
}
