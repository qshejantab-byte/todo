import { Link } from "react-router-dom";
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
  MediaSlot,
} from "@/components/site/ui";
import { MEDIA, type MediaKey } from "@/content/media";

interface Industry {
  id: string;
  name: string;
  who: string;
  tagline: string;
  insight: string;
  // Each entry maps to a confirmed TODO service capability.
  systems: string[];
  primary: boolean;
  work?: { label: string; to: string };
}

// Primary focus first. Section IDs match the anchors used across the site.
const INDUSTRIES: Industry[] = [
  {
    id: "hospitality",
    name: "Hospitality",
    who: "Hotels · Resorts · Lodges · Guest houses",
    tagline: "Premium presence for hotels, lodges and resorts.",
    insight:
      "Guests compare properties online long before they book. We help yours look as good as it is, make inquiring and booking easy, and give your team better tools behind the scenes.",
    systems: [
      "Hospitality websites with booking & inquiry integrations",
      "360° virtual tours",
      "Photo, video & drone content",
      "Review management & Google Business Profile",
      "AI knowledge bases & staff training (Microsoft & AI)",
    ],
    primary: true,
    work: { label: "See our work with Grotta Resort and Eagleview Farm", to: "/portfolio" },
  },
  {
    id: "tourism",
    name: "Tourism",
    who: "Tour operators · Experiences · Attractions",
    tagline: "Turn experiences into journeys people want to book.",
    insight:
      "Travelers decide on feeling before they decide on price. We capture your experiences, package them into clear offers and keep your reputation strong where travelers look.",
    systems: [
      "Photo, video & drone content",
      "Offer packaging",
      "Digital marketing & SEO",
      "Online reputation & review management",
    ],
    primary: true,
  },
  {
    id: "realestate",
    name: "Real Estate",
    who: "Developers · Property managers · Agencies",
    tagline: "Property storytelling that sells before the viewing.",
    insight:
      "Buyers and tenants shortlist online. Virtual tours, strong property content and organized lead follow-up help serious inquiries reach your team faster.",
    systems: [
      "360° virtual tours",
      "Property photography & drone production",
      "Campaign landing pages & advertising",
      "CRM & lead-tracking systems (Microsoft & AI)",
    ],
    primary: true,
  },
  {
    id: "restaurants",
    name: "Restaurants",
    who: "Restaurants · Cafés · Bars",
    tagline: "Content that makes people hungry before they arrive.",
    insight:
      "Consistent content, a well-managed Google Business Profile and good reviews keep tables full between the busy nights.",
    systems: [
      "Photo & video for social media",
      "Social media management & advertising",
      "Google Business Profile & review management",
      "Booking & inquiry integrations",
    ],
    primary: false,
  },
  {
    id: "retail",
    name: "Retail",
    who: "Shops · Brands · Showrooms",
    tagline: "Product content that sells consistently.",
    insight:
      "Regular content and campaigns keep your products visible every week, not just at launch.",
    systems: [
      "Product photography & video",
      "Social media management & advertising",
      "Campaign landing pages",
      "Brand identity & marketing materials",
    ],
    primary: false,
  },
  {
    id: "clinics",
    name: "Clinics",
    who: "Clinics · Practices · Care providers",
    tagline: "Trust-first presence for care-focused businesses.",
    insight:
      "Patients choose care on trust. Clear branding, a managed reputation and simple ways to get in touch make that trust visible.",
    systems: [
      "Brand strategy & identity",
      "Online reputation & review management",
      "Booking & inquiry integrations",
      "Microsoft 365 & internal AI assistants",
    ],
    primary: false,
  },
  {
    id: "ngos",
    name: "NGOs & Development",
    who: "Foundations · NGOs · Development programs",
    tagline: "Show the work, not just the mission statement.",
    insight:
      "Supporters and partners want to see impact. Documentary and social content, a strong digital presence and virtual tours bring your programs closer to the people who back them.",
    systems: [
      "Documentary video production",
      "Photo & video for social media",
      "Digital marketing & SEO",
      "360° virtual tours",
    ],
    primary: false,
    work: {
      label: "See our work with Sustainable Villages Foundation",
      to: "/portfolio#sustainable-villages-foundation",
    },
  },
];

// Replaceable image slots for the primary industries (see content/media.ts).
const INDUSTRY_MEDIA: Record<string, MediaKey> = {
  hospitality: "hospitality",
  tourism: "tourism",
  realestate: "realestate",
};

function HowWeHelp({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-8 sm:grid-cols-2">
      {items.map((s) => {
        const ms = s.includes("Microsoft");
        return (
          <li
            key={s}
            className="flex items-start gap-3 border-b border-white/[0.08] py-3 text-[15px] leading-6"
            style={{ color: ms ? C.blue : "rgba(245,245,240,0.9)" }}
          >
            <span
              className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: ms ? C.blue : C.yellow }}
            />
            {s}
          </li>
        );
      })}
    </ul>
  );
}

function WorkLink({ work }: { work?: Industry["work"] }) {
  if (!work) return null;
  return (
    <Link
      to={work.to}
      className="group inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-white/90 underline decoration-white/30 underline-offset-[6px] transition-colors hover:text-[#E8C547]"
    >
      {work.label}
      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/** Primary industry: large horizontal image with the name set into it, copy below. */
function PrimaryIndustry({ ind, flip }: { ind: Industry; flip: boolean }) {
  const media = MEDIA[INDUSTRY_MEDIA[ind.id]];
  return (
    <section
      id={ind.id}
      className="px-5 py-14 sm:px-8 lg:px-14 lg:py-20"
      style={{ background: flip ? C.bgRaised : C.bg }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Large horizontal image with the industry name set into it */}
        <Reveal className="relative">
          <div className="relative aspect-[4/3] sm:aspect-[16/8] lg:aspect-[21/9]">
            <MediaSlot
              media={media}
              fill
              rounded="rounded-2xl"
              sizes="(min-width: 1280px) 1200px, 100vw"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            style={{
              background: `linear-gradient(${flip ? "250deg" : "110deg"}, rgba(7,8,15,0.88) 0%, rgba(7,8,15,0.45) 45%, rgba(7,8,15,0) 75%)`,
            }}
          />
          <div
            className={`absolute bottom-0 p-6 sm:p-10 lg:p-12 ${flip ? "right-0 text-right" : "left-0"}`}
          >
            <span className={LABEL} style={{ fontFamily: F.mono, color: C.yellow }}>
              Primary focus
            </span>
            <h2
              className="mt-2"
              style={{ ...TYPE.display, fontSize: "clamp(2.6rem,6.4vw,6rem)", color: C.text }}
            >
              {ind.name}
            </h2>
            <p className="mt-2 text-sm text-white/80">{ind.who}</p>
          </div>
        </Reveal>

        {/* Copy in two columns beneath the image */}
        <Reveal
          className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
          delay={0.05}
        >
          <div>
            <p
              className="mb-4 text-[#f5f5f0]"
              style={{ ...TYPE.h3, fontSize: "clamp(1.4rem,2.2vw,1.9rem)", lineHeight: 1.3 }}
            >
              {ind.tagline}
            </p>
            <p className="mb-8 max-w-xl text-base leading-8" style={{ color: C.body }}>
              {ind.insight}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Cta to="/discovery">Book a Discovery Call</Cta>
              <WorkLink work={ind.work} />
            </div>
          </div>
          <div>
            <div className={`${LABEL} mb-2`} style={{ fontFamily: F.mono, color: C.muted }}>
              How we help
            </div>
            <HowWeHelp items={ind.systems} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Secondary industry: compact editorial row, no imagery. */
function SecondaryIndustry({ ind }: { ind: Industry }) {
  return (
    <article
      id={ind.id}
      className="grid gap-5 border-t border-white/10 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
    >
      <div>
        <h3 style={{ ...TYPE.h2, fontSize: "clamp(1.7rem,2.8vw,2.4rem)", color: C.text }}>
          {ind.name}
        </h3>
        <p className="mt-1 text-sm" style={{ color: C.muted }}>
          {ind.who}
        </p>
      </div>
      <div>
        <p className="mb-2 text-lg leading-8 text-[#f5f5f0]" style={{ fontFamily: F.display }}>
          {ind.tagline}
        </p>
        <p className="mb-5 max-w-2xl text-base leading-8" style={{ color: C.body }}>
          {ind.insight}
        </p>
        <p className="text-[15px] leading-7 text-white/85">
          <span className={`${LABEL} mr-3`} style={{ fontFamily: F.mono, color: C.muted }}>
            How we help
          </span>
          {ind.systems.map((s, i) => (
            <span key={s}>
              <span
                className="whitespace-nowrap"
                style={{ color: s.includes("Microsoft") ? C.blue : undefined }}
              >
                {s}
              </span>
              {i < ind.systems.length - 1 && (
                <span className="px-2 text-white/30" aria-hidden="true">
                  ·
                </span>
              )}{" "}
            </span>
          ))}
        </p>
        {ind.work && (
          <div className="mt-3">
            <WorkLink work={ind.work} />
          </div>
        )}
      </div>
    </article>
  );
}

export default function IndustriesPage() {
  const primary = INDUSTRIES.filter((i) => i.primary);
  const secondary = INDUSTRIES.filter((i) => !i.primary);

  return (
    <PageShell>
      <Seo
        title="Industries | TODO Growth"
        description="TODO Growth works primarily with hospitality, tourism and real estate businesses, and also serves restaurants, retail, clinics and NGOs across Rwanda and East Africa."
        path="/industries"
      />

      <PageHero
        compact
        eyebrow="Industries"
        title="Built for businesses that sell experiences and spaces."
        intro="Hospitality, tourism and real estate are where we focus most. These businesses win or lose customers on presentation, trust and how easy it is to book or inquire. We bring the same approach to restaurants, retail, clinics, and NGOs & development organizations."
      >
        <nav aria-label="Industries" className="flex flex-wrap gap-x-6 gap-y-1">
          {INDUSTRIES.map((i) => (
            <a
              key={i.id}
              href={`#${i.id}`}
              className="inline-flex min-h-[44px] items-center text-[15px] transition-colors hover:text-[#E8C547]"
              style={{ color: i.primary ? C.text : C.muted, fontWeight: i.primary ? 600 : 400 }}
            >
              {i.name}
            </a>
          ))}
        </nav>
      </PageHero>

      {primary.map((ind, i) => (
        <PrimaryIndustry key={ind.id} ind={ind} flip={i % 2 === 1} />
      ))}

      <section className="px-5 py-16 sm:px-8 lg:px-14 lg:py-24" style={{ background: C.bgInk }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
            <h2 style={{ ...TYPE.h2, color: C.text }}>Also serving</h2>
            <p className="text-sm" style={{ color: C.muted }}>
              The same growth system, applied to other sectors.
            </p>
          </div>
          {secondary.map((ind) => (
            <Reveal key={ind.id}>
              <SecondaryIndustry ind={ind} />
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCta
        variant="split"
        title="Don't see your industry?"
        body="If your business depends on how customers see you, find you and trust you, we can probably help. Book a Discovery Call and tell us what you want to improve."
      />
    </PageShell>
  );
}
