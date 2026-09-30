import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import {
  C,
  F,
  TYPE,
  LABEL,
  Seo,
  Eyebrow,
  PageHero,
  Reveal,
  FinalCta,
  MediaSlot,
} from "@/components/site/ui";
import { BrowserShot, PhoneShot } from "@/components/site/work";
import { ADDITIONAL_WORK, PROJECTS, type AdditionalWork, type Project } from "@/content/site";
import { MEDIA, PROJECT_MEDIA, WORK_MEDIA, type ProjectMediaKind } from "@/content/media";

// ─── Shared project parts ────────────────────────────────────────────────────
function ProjectTitle({ p }: { p: Project }) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-baseline gap-x-5 gap-y-2">
        <span
          className="leading-none"
          style={{ ...TYPE.display, fontSize: "clamp(3.2rem,6vw,5.5rem)", color: p.accent }}
        >
          {p.index}
        </span>
        <span className={LABEL} style={{ fontFamily: F.mono, color: p.accent }}>
          {p.category}
        </span>
      </div>
      <h2
        className="mb-4"
        style={{ ...TYPE.display, fontSize: "clamp(2.4rem,5vw,4.4rem)", color: C.text }}
      >
        {p.client}
      </h2>
      <p className="mb-2 text-sm" style={{ color: C.muted }}>
        {p.location} · Focus: {p.focus}
      </p>
      <p className="max-w-xl text-base leading-8" style={{ color: C.body }}>
        {p.summary}
      </p>
    </div>
  );
}

function Label({ children, color = C.muted }: { children: React.ReactNode; color?: string }) {
  return (
    <div className={`${LABEL} mb-3`} style={{ fontFamily: F.mono, color }}>
      {children}
    </div>
  );
}

function Delivered({ p }: { p: Pick<Project, "delivered" | "accent"> }) {
  return (
    <div>
      <Label>What we delivered</Label>
      <ul className="border-t border-white/10">
        {p.delivered.map((d) => (
          <li key={d.label}>
            <Link
              to={`/services#${d.service}`}
              className="group flex min-h-[48px] items-center justify-between gap-4 border-b border-white/10 py-2 text-[15px] text-white/90 transition-colors hover:text-white"
            >
              <span className="flex items-center gap-3">
                <Check size={15} color={p.accent} className="shrink-0" />
                {d.label}
              </span>
              <ArrowRight
                size={14}
                className="shrink-0 text-white/30 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Upcoming({ p }: { p: Project }) {
  if (!p.upcoming?.length) return null;
  return (
    <div className="rounded-xl border border-dashed border-[#7DB8E8]/40 px-5 py-4">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`${LABEL} rounded-full border px-2.5 py-0.5`}
          style={{ fontFamily: F.mono, color: C.blue, borderColor: "rgba(125,184,232,0.45)" }}
        >
          Upcoming
        </span>
        <span className="text-[15px] text-white/90">
          {p.upcoming.map((u) => u.label).join(" · ")}
        </span>
      </div>
      <p className="mt-2 text-sm" style={{ color: C.muted }}>
        Planned next phase. Not yet delivered.
      </p>
    </div>
  );
}

function Purpose({ p }: { p: Pick<Project, "purpose" | "accent" | "results"> }) {
  return (
    <div>
      <Label>What this work is designed to do</Label>
      <ul className="space-y-3">
        {p.purpose.map((h) => (
          <li key={h} className="flex items-start gap-3 text-[15px] leading-7 text-white/85">
            <span
              className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: p.accent }}
            />
            {h}
          </li>
        ))}
      </ul>
      {p.results && p.results.length > 0 && (
        <ul className="mt-6 space-y-2">
          {p.results.map((r) => (
            <li key={r} className="text-[15px] text-white/90">
              {r}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function LiveLink({ p }: { p: Pick<Project, "url" | "domain"> }) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/25 px-6 text-[13px] font-bold uppercase tracking-[0.07em] text-[#f5f5f0] transition-colors hover:border-[#E8C547] hover:text-[#E8C547]"
      style={{ fontFamily: F.display }}
    >
      Visit {p.domain} <ArrowUpRight size={15} />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

const MEDIA_KIND_LABEL: Record<ProjectMediaKind, string> = {
  photography: "Photography",
  video: "Video",
  drone: "Drone",
  "tour-360": "360° tour",
  documentary: "Documentary",
};

/** Real project media (photos, video stills, drone, 360°, documentary). Renders only once TODO supplies assets. */
function ProjectMedia({ p }: { p: Project }) {
  const items = PROJECT_MEDIA[p.id] ?? [];
  if (!items.length) return null;
  return (
    <div className="mt-14">
      <Label>From the project</Label>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m) => (
          <li key={m.caption}>
            <MediaSlot
              media={m.asset}
              aspect="4 / 3"
              rounded="rounded-xl"
              sizes="(min-width: 1024px) 30vw, 50vw"
            />
            <p className="mt-2 text-sm" style={{ color: C.muted }}>
              <span className={LABEL} style={{ fontFamily: F.mono, color: p.accent }}>
                {MEDIA_KIND_LABEL[m.kind]}
              </span>{" "}
              · {m.caption}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── 01 Grotta Resort: the lead project ──────────────────────────────────────
function GrottaSection({ p }: { p: Project }) {
  return (
    <section
      id={p.id}
      className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28"
      style={{ background: C.bg }}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <ProjectTitle p={p} />
          <div className="lg:pb-2">
            <LiveLink p={p} />
          </div>
        </Reveal>

        {/* Media: real desktop screenshot with the real mobile view overlapping */}
        <Reveal className="relative mb-16 lg:mb-24 lg:pr-24">
          <BrowserShot
            media={MEDIA.grottaSite}
            domain={p.domain}
            sizes="(min-width: 1024px) 80vw, 100vw"
          />
          <PhoneShot
            media={MEDIA.grottaSiteMobile}
            className="absolute -bottom-10 right-0 hidden w-[180px] lg:block xl:w-[210px]"
          />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-12">
          <Delivered p={p} />
          <div className="space-y-6">
            <Upcoming p={p} />
            <MediaSlot
              media={MEDIA.grottaSiteDetail}
              aspect="16 / 10"
              rounded="rounded-xl"
              position="top"
              sizes="(min-width: 1024px) 30vw, 100vw"
            />
          </div>
          <Purpose p={p} />
        </div>
        <ProjectMedia p={p} />
      </div>
    </section>
  );
}

// ─── 02 Eagleview Farm: reversed asymmetric split, sage-tinted ───────────────
function EagleviewSection({ p }: { p: Project }) {
  return (
    <section
      id={p.id}
      className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28"
      style={{ background: "linear-gradient(180deg, #0f1411 0%, #0c100e 100%)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
        <Reveal className="relative lg:order-1 lg:pb-16">
          <BrowserShot
            media={MEDIA.eagleviewSiteDetail}
            domain={p.domain}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="mt-6 lg:absolute lg:-bottom-4 lg:left-10 lg:mt-0">
            <PhoneShot media={MEDIA.eagleviewSiteMobile} className="w-[150px] sm:w-[170px]" />
          </div>
        </Reveal>

        <Reveal className="lg:order-2" delay={0.08}>
          <ProjectTitle p={p} />
          <div className="mt-10 space-y-10">
            <Delivered p={p} />
            <Purpose p={p} />
            <LiveLink p={p} />
          </div>
        </Reveal>
        <div className="lg:col-span-2">
          <ProjectMedia p={p} />
        </div>
      </div>
    </section>
  );
}

// ─── 03 Sustainable Villages Foundation: cinematic, documentary-led ──────────
function SvfSection({ p }: { p: Project }) {
  return (
    <section id={p.id} style={{ background: C.bgInk }}>
      <div className="relative aspect-[4/3] sm:aspect-[16/8] lg:aspect-[21/9]">
        <MediaSlot
          media={MEDIA.svfLead}
          fill
          rounded="rounded-none"
          sizes="100vw"
          tagPosition="right"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(7,8,15,0.1) 30%, rgba(7,8,15,0.95) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-8 sm:px-8 lg:px-14 lg:pb-12">
          <div className="mx-auto max-w-7xl">
            <span
              className={`${LABEL} inline-flex items-center gap-2 rounded-full px-3 py-1`}
              style={{ fontFamily: F.mono, color: C.text, background: "rgba(7,8,15,0.7)" }}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: p.accent }} />
              Documentary video production
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 py-16 sm:px-8 lg:px-14 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <ProjectTitle p={p} />
            <div className="mt-8">
              <LiveLink p={p} />
            </div>
          </Reveal>
          <Reveal className="space-y-10" delay={0.08}>
            <Delivered p={p} />
            <Purpose p={p} />
          </Reveal>
          <div className="lg:col-span-2">
            <ProjectMedia p={p} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 04–06 More work: compact client sections, media-led once assets exist ───
function MoreWorkHead({ w }: { w: AdditionalWork }) {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span
          className="leading-none"
          style={{ ...TYPE.display, fontSize: "clamp(2.2rem,4vw,3.6rem)", color: w.accent }}
        >
          {w.index}
        </span>
        <span className={LABEL} style={{ fontFamily: F.mono, color: w.accent }}>
          {w.category}
        </span>
      </div>
      <h3
        className="mb-3"
        style={{ ...TYPE.display, fontSize: "clamp(2rem,4.4vw,3.8rem)", color: C.text }}
      >
        {w.client}
      </h3>
      {(w.location || w.focus) && (
        <p className="mb-2 text-sm" style={{ color: C.muted }}>
          {[w.location, w.focus && `Focus: ${w.focus}`].filter(Boolean).join(" · ")}
        </p>
      )}
      {w.summary && (
        <p className="max-w-xl text-base leading-8" style={{ color: C.body }}>
          {w.summary}
        </p>
      )}
    </div>
  );
}

/** Confirmed metric, set as the entry's visual until real event media exists. */
function MetricFigure({ w }: { w: AdditionalWork }) {
  if (!w.metric) return null;
  const [figure, ...rest] = w.metric.split(" ");
  return (
    <div className="border-l-2 pl-5 md:pl-7" style={{ borderColor: w.accent }}>
      <div
        className="leading-none"
        style={{ ...TYPE.display, fontSize: "clamp(2.8rem,6vw,5.2rem)", color: C.text }}
      >
        {figure}
      </div>
      <div className={`${LABEL} mt-3`} style={{ fontFamily: F.mono, color: w.accent }}>
        {rest.join(" ")}
      </div>
    </div>
  );
}

function MoreWorkEntry({ w, reverse }: { w: AdditionalWork; reverse: boolean }) {
  const media = WORK_MEDIA[w.id];
  const visual = media ? (
    <MediaSlot
      media={media}
      aspect="4 / 3"
      rounded="rounded-xl"
      sizes="(min-width: 1024px) 45vw, 100vw"
    />
  ) : (
    <MetricFigure w={w} />
  );
  const hasVisual = !!(media || w.metric);
  const hasDetails = !!(w.delivered?.length || w.purpose?.length);
  const details = hasDetails ? (
    <div className={`gap-10 ${hasVisual ? "grid md:grid-cols-2 lg:col-span-2" : "space-y-10"}`}>
      {w.delivered?.length ? <Delivered p={{ delivered: w.delivered, accent: w.accent }} /> : null}
      {w.purpose?.length ? <Purpose p={{ purpose: w.purpose, accent: w.accent }} /> : null}
    </div>
  ) : null;
  return (
    <li id={w.id} className="border-b border-white/10">
      <Reveal
        className={`grid gap-8 py-12 lg:gap-16 lg:py-16 ${
          hasVisual ? "lg:grid-cols-2 lg:items-center" : "lg:grid-cols-[1.1fr_0.9fr]"
        }`}
      >
        <div className={`space-y-8 ${reverse ? "lg:order-2" : ""}`}>
          <MoreWorkHead w={w} />
          {w.url && w.domain && <LiveLink p={{ url: w.url, domain: w.domain }} />}
        </div>
        {hasVisual && <div className={reverse ? "lg:order-1" : ""}>{visual}</div>}
        {/* Without a visual, details take the second column; with one, they run beneath. */}
        {details && <div className={hasVisual ? "lg:order-3 lg:col-span-2" : ""}>{details}</div>}
      </Reveal>
    </li>
  );
}

function MoreWorkSection() {
  return (
    <section
      id="more-work"
      className="px-5 py-20 sm:px-8 lg:px-14 lg:py-28"
      style={{ background: C.bg }}
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-10 lg:mb-14">
          <Eyebrow color={C.yellow} line>
            More work
          </Eyebrow>
          <p
            className="max-w-2xl"
            style={{ ...TYPE.h3, fontSize: "clamp(1.4rem,2.4vw,2rem)", color: C.text }}
          >
            Selected client work beyond our featured projects.
          </p>
        </Reveal>
        <ol className="border-t border-white/10">
          {ADDITIONAL_WORK.map((w, i) => (
            <MoreWorkEntry key={w.id} w={w} reverse={i % 2 === 0 && i > 0} />
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function PortfolioPage() {
  const [grotta, eagleview, svf] = PROJECTS;
  return (
    <PageShell>
      <Seo
        title="Portfolio | TODO Growth"
        description="TODO Growth projects in Rwanda: websites, content production, digital marketing, SEO, documentary video, 360° virtual tours and branding for Grotta Resort, Eagleview Farm, Sustainable Villages Foundation, NuttinTODO and more."
        path="/portfolio"
      />

      <PageHero
        compact
        eyebrow="Portfolio"
        title="Selected work."
        accent="Real projects in Rwanda."
        intro="A resort, a retreat farm, a development foundation and more. Here is what we delivered for each of them."
      >
        <ol className="flex flex-wrap gap-x-8 gap-y-1">
          {PROJECTS.map((p) => (
            <li key={p.id}>
              <a
                href={`#${p.id}`}
                className="inline-flex min-h-[44px] items-baseline gap-2 text-[15px] text-white/85 transition-colors hover:text-[#E8C547]"
              >
                <span className={LABEL} style={{ fontFamily: F.mono, color: p.accent }}>
                  {p.index}
                </span>
                {p.client}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#more-work"
              className="inline-flex min-h-[44px] items-baseline gap-2 text-[15px] text-white/60 transition-colors hover:text-[#E8C547]"
            >
              <span className={LABEL} style={{ fontFamily: F.mono, color: C.muted }}>
                04–06
              </span>
              More work
            </a>
          </li>
        </ol>
      </PageHero>

      <GrottaSection p={grotta} />
      <EagleviewSection p={eagleview} />
      <SvfSection p={svf} />
      <MoreWorkSection />

      <FinalCta
        variant="statement"
        title="Your project could be next."
        body="Hospitality, tourism, real estate, NGOs and more. Tell us what you want to improve and we'll show you where to start."
      />
    </PageShell>
  );
}
