import { ArrowRight } from "lucide-react";
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
import { SERVICES, STAGES, serviceById, type Service } from "@/content/site";
import { MEDIA, type MediaKey } from "@/content/media";

// One editorial image per stage chapter (Operate keeps the Microsoft blue language instead).
const STAGE_MEDIA: Partial<Record<string, MediaKey>> = {
  present: "stagePresent",
  attract: "stageAttract",
};

const MICROSOFT = serviceById("microsoft-ai")!;

// Order of services inside each stage chapter.
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
const byStageOrder = (a: Service, b: Service) =>
  STAGE_ORDER.indexOf(a.id) - STAGE_ORDER.indexOf(b.id);

/** Editorial service entry: no icon box, no card, one quiet quote link. */
function ServiceEntry({ s, index }: { s: Service; index: number }) {
  return (
    <article
      id={s.id}
      className="border-t border-white/10 py-10 first:border-t-0 first:pt-0 lg:py-12"
    >
      <div className="mb-3 flex items-baseline gap-4">
        <span className={LABEL} style={{ fontFamily: F.mono, color: s.color }}>
          {String(index).padStart(2, "0")}
        </span>
        <h3 style={{ ...TYPE.h2, fontSize: "clamp(1.6rem,2.8vw,2.4rem)", color: C.text }}>
          {s.name}
        </h3>
      </div>
      <p className="mb-4 text-lg leading-8" style={{ color: s.color }}>
        {s.short}
      </p>
      <p className="mb-6 max-w-2xl text-base leading-8" style={{ color: C.body }}>
        {s.description}
      </p>
      <p className="mb-5 max-w-2xl text-[15px] leading-7 text-white/90">
        {s.capabilities.map((c, i) => (
          <span key={c}>
            <span className="whitespace-nowrap">{c}</span>
            {i < s.capabilities.length - 1 && (
              <span className="px-2.5 text-white/30" aria-hidden="true">
                ·
              </span>
            )}{" "}
          </span>
        ))}
      </p>
      <Cta to={`/contact?service=${s.id}`} variant="link">
        Request a Quote
      </Cta>
    </article>
  );
}

function MicrosoftFeature() {
  return (
    <article
      id="microsoft-ai"
      className="relative overflow-hidden rounded-3xl border p-7 sm:p-10 lg:p-14"
      style={{
        borderColor: "rgba(125,184,232,0.4)",
        background:
          "linear-gradient(150deg, rgba(125,184,232,0.16) 0%, rgba(125,184,232,0.05) 45%, rgba(11,13,23,0) 100%)",
      }}
    >
      <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <span
            className={`${LABEL} mb-6 inline-block rounded-full border px-3 py-1`}
            style={{ fontFamily: F.mono, color: C.blue, borderColor: "rgba(125,184,232,0.45)" }}
          >
            Core capability
          </span>
          <h3
            className="mb-6"
            style={{ ...TYPE.display, fontSize: "clamp(2.1rem,4.2vw,3.6rem)", color: C.text }}
          >
            Microsoft & AI <span style={{ color: C.blue }}>Business Solutions</span>
          </h3>
          <p className="mb-5 text-base leading-8" style={{ color: C.body }}>
            {MICROSOFT.description}
          </p>
          <p className="mb-8 text-base leading-8" style={{ color: C.body }}>
            Useful for hotels training new staff, sales teams answering the same questions every
            day, and any business whose knowledge lives in a few people's heads.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Cta to={`/contact?service=${MICROSOFT.id}`} variant="secondary">
              Request a Quote
            </Cta>
            <Cta to="/discovery" variant="link">
              Or book a Discovery Call
            </Cta>
          </div>
        </div>
        <ol className="self-start border-t border-[#7DB8E8]/25">
          {MICROSOFT.capabilities.map((c, i) => (
            <li
              key={c}
              className="grid grid-cols-[2.5rem_1fr] items-baseline border-b border-[#7DB8E8]/15 py-3.5 text-[15px] text-white/90"
            >
              <span className={LABEL} style={{ fontFamily: F.mono, color: C.blue }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {c}
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}

export default function ServicesPage() {
  let running = 0;

  return (
    <PageShell>
      <Seo
        title="Services | TODO Growth"
        description="Branding, website design, virtual tours, content production, digital marketing, reputation management, sales & commercialization support and Microsoft & AI business solutions, delivered by one team in Rwanda."
        path="/services"
      />

      <PageHero
        eyebrow="Services"
        title="Everything you need to present, attract, convert and operate."
        intro="Eight services delivered by one coordinated team. Start with the one you need most, or combine them into a growth system built around your business."
        aside={
          <a
            href="#microsoft-ai"
            className="group block rounded-2xl border p-7 transition-colors hover:border-[#7DB8E8]"
            style={{
              borderColor: "rgba(125,184,232,0.35)",
              background:
                "linear-gradient(160deg, rgba(125,184,232,0.14) 0%, rgba(125,184,232,0.03) 70%)",
            }}
          >
            <span className={LABEL} style={{ fontFamily: F.mono, color: C.blue }}>
              Core capability
            </span>
            <div className="mb-3 mt-4" style={{ ...TYPE.h3, color: C.text }}>
              {MICROSOFT.name}
            </div>
            <p className="mb-5 text-sm leading-7" style={{ color: C.body }}>
              {MICROSOFT.short}
            </p>
            <span
              className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold"
              style={{ color: C.blue }}
            >
              See what it includes
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        }
      >
        {/* Journey index: the four stages */}
        <nav
          aria-label="Service stages"
          className="grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-4"
        >
          {STAGES.map((st, i) => (
            <a
              key={st.id}
              href={`#stage-${st.id}`}
              className="flex min-h-[56px] flex-col justify-center gap-0.5 px-4 py-3 transition-colors hover:bg-[#141828]"
              style={{ background: C.bg }}
            >
              <span className={LABEL} style={{ fontFamily: F.mono, color: st.color }}>
                0{i + 1}
              </span>
              <span
                className="text-[15px] font-semibold text-white/90"
                style={{ fontFamily: F.display }}
              >
                {st.label}
              </span>
            </a>
          ))}
        </nav>
        {/* Below lg the aside is hidden, so Microsoft & AI gets a direct link here. */}
        <a
          href="#microsoft-ai"
          className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold lg:hidden"
          style={{ color: C.blue }}
        >
          Core capability: Microsoft & AI Business Solutions <ArrowRight size={14} />
        </a>
      </PageHero>

      {STAGES.map((st, i) => {
        const items = SERVICES.filter((s) => s.stage === st.id).sort(byStageOrder);
        const isOperate = st.id === "operate";
        return (
          <section
            key={st.id}
            id={`stage-${st.id}`}
            className="px-5 py-16 sm:px-8 lg:px-14 lg:py-24"
            style={{ background: i % 2 ? C.bgRaised : C.bg }}
          >
            <div
              className={`mx-auto max-w-7xl ${
                isOperate ? "" : "grid gap-10 lg:grid-cols-[0.36fr_0.64fr] lg:gap-16"
              }`}
            >
              {/* Stage column (sticky on desktop) */}
              <div className={isOperate ? "mb-10 max-w-3xl" : "lg:sticky lg:top-24 lg:self-start"}>
                <div className="mb-4 h-0.5 w-16" style={{ background: st.color }} />
                <div className="flex items-baseline gap-4">
                  <span
                    style={{
                      ...TYPE.display,
                      fontSize: "clamp(2.8rem,5vw,4.5rem)",
                      color: st.color,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <h2 style={{ ...TYPE.h2, color: C.text }}>{st.label}</h2>
                </div>
                <p className="mt-3 text-lg leading-8" style={{ color: C.body }}>
                  {st.line}
                </p>
                {STAGE_MEDIA[st.id] && (
                  <MediaSlot
                    media={MEDIA[STAGE_MEDIA[st.id]!]}
                    aspect="16 / 7"
                    rounded="rounded-xl"
                    className="mt-6 lg:hidden"
                    sizes="100vw"
                  />
                )}
                {!isOperate && (
                  <ul className="mt-6 hidden lg:block">
                    {items.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="flex min-h-[40px] items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: st.color }}
                          />
                          {s.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                {STAGE_MEDIA[st.id] && (
                  <MediaSlot
                    media={MEDIA[STAGE_MEDIA[st.id]!]}
                    aspect="4 / 3"
                    rounded="rounded-xl"
                    className="mt-8 hidden lg:block"
                    sizes="30vw"
                  />
                )}
              </div>

              {isOperate ? (
                <Reveal>
                  <MicrosoftFeature />
                </Reveal>
              ) : (
                <div>
                  {items.map((s) => {
                    running += 1;
                    return <ServiceEntry key={s.id} s={s} index={running} />;
                  })}
                </div>
              )}
            </div>
          </section>
        );
      })}

      <Section tone="base" padding="py-14 lg:py-16">
        <div className="flex flex-wrap items-center justify-between gap-6 border-y border-white/10 py-8">
          <div>
            <div
              className="mb-1 text-xl font-bold text-[#f5f5f0]"
              style={{ fontFamily: F.display }}
            >
              Prefer a defined bundle?
            </div>
            <p className="text-[15px]" style={{ color: C.body }}>
              Our packages combine the most-requested services into one clear scope.
            </p>
          </div>
          <Cta to="/packages" variant="link">
            Compare packages
          </Cta>
        </div>
      </Section>

      <FinalCta
        variant="split"
        title="Not sure which service you need?"
        body="Book a Discovery Call. Tell us what you want to improve and we'll recommend where to start. If you already know what you need, request a quote instead."
      />
    </PageShell>
  );
}
