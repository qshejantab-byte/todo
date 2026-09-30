import { PageShell } from "@/components/PageShell";
import {
  C,
  F,
  TYPE,
  LABEL,
  Seo,
  PageHero,
  Section,
  Reveal,
  SectionHeading,
  Eyebrow,
  FinalCta,
  MediaSlot,
} from "@/components/site/ui";
import { COMPANY, PROCESS, STAGES, WHY_TODO } from "@/content/site";
import { MEDIA, OPTIONAL_MEDIA } from "@/content/media";

const PRINCIPLES = [
  {
    title: "No guesswork",
    body: "We understand your business before we recommend anything, and every recommendation comes with a clear reason.",
  },
  {
    title: "Systems first",
    body: "We build things that keep working after launch (a website, a content rhythm, a review workflow, a trained AI assistant) rather than one-off activity.",
  },
  {
    title: "Coordinated execution",
    body: "Brand, content, marketing, websites and Microsoft & AI work are planned together and delivered by one team, so nothing contradicts anything else.",
  },
  {
    title: "Continuous improvement",
    body: "Launch is a starting point. We use performance and customer feedback to decide what to improve next.",
  },
  {
    title: "Honest communication",
    body: "Clear scopes, realistic timelines, and a straight answer when something isn't the right fit or the right time.",
  },
];

const PILLARS = [
  {
    term: "Growth",
    body: "is about being seen by the right people, with a brand, content and marketing that earn attention.",
  },
  {
    term: "Commercialization",
    body: "turns that attention into revenue, through clear offers, sensible pricing and a path from inquiry to sale.",
  },
  {
    term: "Digital transformation",
    body: "gives your team the tools to deliver: Microsoft 365, Copilot and practical AI systems that save time and keep knowledge in the business.",
  },
];

export default function AboutPage() {
  const team = OPTIONAL_MEDIA.team;

  return (
    <PageShell>
      <Seo
        title="About TODO Growth"
        description="TODO Growth Ltd. is a Rwanda-based growth, commercialization and digital transformation company serving East Africa and beyond. Learn how we work and what we believe."
        path="/about"
      />

      <PageHero
        eyebrow="About TODO Growth"
        title="We build the infrastructure"
        accent="behind growing businesses."
        intro={`${COMPANY.legalName} is a growth, commercialization and digital transformation company. ${COMPANY.geography} We help businesses present themselves clearly, attract the right customers, turn interest into revenue and run more efficiently.`}
        aside={
          <MediaSlot
            media={team ?? MEDIA.aboutLead}
            aspect="4 / 5"
            sizes="(min-width: 1024px) 35vw, 100vw"
            priority
          />
        }
      />

      {/* ── WHY THE THREE BELONG TOGETHER ───────────────────────── */}
      <Section tone="raised">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <Eyebrow>Why growth, commercialization and digital transformation?</Eyebrow>
            <p
              className="text-[#f5f5f0]"
              style={{ ...TYPE.h2, fontSize: "clamp(1.6rem,2.8vw,2.4rem)", lineHeight: 1.2 }}
            >
              Most businesses buy these separately: a designer here, a marketer there, an IT
              supplier somewhere else.{" "}
              <span style={{ color: "rgba(245,245,240,0.5)" }}>The pieces rarely connect.</span>
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <dl className="border-t border-white/10">
              {PILLARS.map((p) => (
                <div key={p.term} className="border-b border-white/10 py-5">
                  <dt
                    className="mb-1 text-lg font-bold text-[#f5f5f0]"
                    style={{ fontFamily: F.display }}
                  >
                    {p.term}
                  </dt>
                  <dd className="text-base leading-7" style={{ color: C.body }}>
                    {p.body}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-base leading-7 text-white/90">
              We bring all three together under one team. That is what we mean by growth
              infrastructure.
            </p>
          </Reveal>
        </div>

        {/* The four stages, in their fixed colors */}
        <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((st, i) => (
            <li key={st.id} className="p-6" style={{ background: C.bgRaised }}>
              <div className="mb-4 h-0.5 w-10" style={{ background: st.color }} />
              <div className={`${LABEL} mb-1`} style={{ fontFamily: F.mono, color: st.color }}>
                0{i + 1}
              </div>
              <div
                className="mb-1 text-lg font-bold text-[#f5f5f0]"
                style={{ fontFamily: F.display }}
              >
                {st.label}
              </div>
              <div className="text-[15px] leading-7" style={{ color: C.body }}>
                {st.line}
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── WHAT WE BELIEVE ─────────────────────────────────────── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="What we believe"
            title="How we think about growth."
            accent="Practical, structured, honest."
            signature
            className="mb-0 lg:sticky lg:top-28 lg:self-start"
          />
          <ol>
            {PRINCIPLES.map((p, i) => (
              <li
                key={p.title}
                className="grid grid-cols-[3rem_1fr] gap-4 border-t border-white/10 py-6 first:border-t-0 first:pt-0"
              >
                <span className={LABEL} style={{ fontFamily: F.mono, color: C.yellow }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    className="mb-2 text-xl font-bold text-[#f5f5f0]"
                    style={{ fontFamily: F.display }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-base leading-7" style={{ color: C.body }}>
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ── Atmospheric band: breaks the long text run (replaceable: MEDIA.aboutBand) ── */}
      <section style={{ background: C.bgInk }}>
        <div className="relative aspect-[16/9] sm:aspect-[21/8] lg:aspect-[21/7]">
          <MediaSlot media={MEDIA.aboutBand} fill rounded="rounded-none" sizes="100vw" />
        </div>
      </section>

      {/* ── HOW WE WORK: the one official process, in full ──────── */}
      <Section id="how-we-work" tone="ink">
        <SectionHeading
          eyebrow="How we work"
          title="One process for every engagement."
          intro="Whether it's a one-page website or a full hospitality transformation, every project follows the same four steps."
        />
        <ol className="relative">
          <span
            className="absolute bottom-6 left-[21px] top-6 w-px bg-white/15 lg:left-[27px]"
            aria-hidden="true"
          />
          {PROCESS.map((p) => (
            <Reveal key={p.num}>
              <li className="relative grid grid-cols-[44px_1fr] gap-5 pb-12 last:pb-0 lg:grid-cols-[56px_0.9fr_1.1fr] lg:gap-10">
                <span
                  className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 text-sm font-bold lg:h-14 lg:w-14 lg:text-base"
                  style={{
                    borderColor: C.yellow,
                    color: C.yellow,
                    background: C.bgInk,
                    fontFamily: F.mono,
                  }}
                >
                  {p.num}
                </span>
                <div className="lg:pt-2">
                  <h3 style={{ ...TYPE.h3, color: C.text }}>{p.title}</h3>
                  <p className="mt-2 text-base leading-7 text-white/90">{p.short}</p>
                </div>
                <div className="col-start-2 lg:col-start-auto lg:pt-2">
                  <p className="mb-4 text-base leading-8" style={{ color: C.body }}>
                    {p.detail}
                  </p>
                  <p className="text-[15px] leading-7" style={{ color: C.muted }}>
                    {p.signals.join("  ·  ")}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ── WHY TODO + WHERE ────────────────────────────────────── */}
      <Section tone="raised">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Why TODO Growth"
              title="What working with us is like."
              className="mb-8"
            />
            <div className="border-l-2 pl-5" style={{ borderColor: C.yellow }}>
              <div className={`${LABEL} mb-2`} style={{ fontFamily: F.mono, color: C.yellow }}>
                Where we are
              </div>
              <p className="text-base leading-8" style={{ color: C.body }}>
                Based in {COMPANY.city}, serving clients across East Africa and beyond. Our content
                work covers photography, video and drone production.
              </p>
            </div>
          </div>
          <dl className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
            {WHY_TODO.map((w) => (
              <div key={w.title}>
                <dt
                  className="mb-2 text-lg font-bold text-[#f5f5f0]"
                  style={{ fontFamily: F.display }}
                >
                  {w.title}
                </dt>
                <dd className="text-[15px] leading-7" style={{ color: C.body }}>
                  {w.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <FinalCta
        variant="split"
        title="Let's talk about your business."
        body="A Discovery Call is the simplest way to start. Tell us where you are and what you want to change, and we'll recommend a clear next step."
      />
    </PageShell>
  );
}
