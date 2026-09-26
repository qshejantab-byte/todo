// Media slots. Every image on the site is referenced through this registry, so a
// temporary image can be replaced with a real TODO asset by editing one entry.
//
// status "real"      → TODO's own work or a screenshot of a site TODO built.
// status "temporary" → licensed development imagery (Unsplash License) used only
//                      to establish layout. Rendered with an "Illustrative image"
//                      tag so it is never presented as TODO's work.
//
// To replace a temporary image: drop the new files into src/assets/media/,
// import them below, update `src`/`srcSet`/`alt`, and set status to "real".

import rwandaHills800 from "@/assets/media/temp/rwanda-hills-800.webp";
import rwandaHills1600 from "@/assets/media/temp/rwanda-hills-1600.webp";
import kigali800 from "@/assets/media/temp/kigali-skyline-800.webp";
import kigali1600 from "@/assets/media/temp/kigali-skyline-1600.webp";
import hospitality800 from "@/assets/media/temp/hospitality-view-800.webp";
import hospitality1600 from "@/assets/media/temp/hospitality-view-1600.webp";
import tourism800 from "@/assets/media/temp/tourism-gorilla-800.webp";
import tourism1600 from "@/assets/media/temp/tourism-gorilla-1600.webp";
import realestate800 from "@/assets/media/temp/realestate-hillside-800.webp";
import realestate1600 from "@/assets/media/temp/realestate-hillside-1600.webp";
import ruralRoad800 from "@/assets/media/temp/rural-road-800.webp";
import ruralRoad1600 from "@/assets/media/temp/rural-road-1600.webp";
import drone800 from "@/assets/media/temp/drone-800.webp";
import drone1600 from "@/assets/media/temp/drone-1600.webp";

import grottaDesk720 from "@/assets/media/portfolio/grotta-desktop-720.webp";
import grottaDesk1440 from "@/assets/media/portfolio/grotta-desktop-1440.webp";
import grottaDesk2720 from "@/assets/media/portfolio/grotta-desktop-2-720.webp";
import grottaDesk21440 from "@/assets/media/portfolio/grotta-desktop-2-1440.webp";
import grottaMobile from "@/assets/media/portfolio/grotta-mobile.webp";
import eagleDesk720 from "@/assets/media/portfolio/eagleview-desktop-720.webp";
import eagleDesk1440 from "@/assets/media/portfolio/eagleview-desktop-1440.webp";
import eagleDesk2720 from "@/assets/media/portfolio/eagleview-desktop-2-720.webp";
import eagleDesk21440 from "@/assets/media/portfolio/eagleview-desktop-2-1440.webp";
import eagleMobile from "@/assets/media/portfolio/eagleview-mobile.webp";

export interface MediaAsset {
  /** "video" slots play `video.src` where appropriate and fall back to `src` as the poster. */
  kind: "image" | "video";
  src: string;
  srcSet?: string;
  alt: string;
  status: "real" | "temporary";
  category: "atmosphere" | "industry" | "service" | "package" | "project";
  /** Where the asset came from. Kept for licensing and replacement tracking. */
  source: string;
  video?: { src: string; type?: string };
}

const pair = (small: string, large: string, smallW: number, largeW: number) => ({
  src: large,
  srcSet: `${small} ${smallW}w, ${large} ${largeW}w`,
});

// Shared file sets. One file can back several slots; each slot keeps its own
// entry below so it can be replaced independently.
const FILES = {
  rwandaHills: pair(rwandaHills800, rwandaHills1600, 800, 1600),
  kigali: pair(kigali800, kigali1600, 800, 1600),
  drone: pair(drone800, drone1600, 800, 1600),
  valley: pair(hospitality800, hospitality1600, 800, 1600),
  gorilla: pair(tourism800, tourism1600, 800, 1600),
  hillsideBuilding: pair(realestate800, realestate1600, 800, 1600),
  ruralRoad: pair(ruralRoad800, ruralRoad1600, 800, 1600),
};

const UNSPLASH = {
  rwandaHills: "Unsplash, Tobias Doering (kcNCqCEdwi8)",
  kigali: "Unsplash, Jean Claude Akarikumutima (b-HnOOPRfTI)",
  drone: "Unsplash, Jason Mavrommatis (XYrjl3j7smo)",
  valley: "Unsplash, Protais Benjamin Mugenzi (f8vDOEq4Qvk)",
  gorilla: "Unsplash, Magdalena Kula Manchee (-FezT2WMZr4)",
  hillsideBuilding: "Unsplash, Tamrat Touloumon (-2CWrKkR-GA)",
  ruralRoad: "Unsplash, Tobias Doering (1ihYfuwRZds)",
};

export const MEDIA = {
  // ── Atmosphere (temporary) ──────────────────────────────────────────────────
  // Home hero layer behind the diagram. Built as a video slot: add
  // `video: { src: heroVideo }` (muted loop) to switch to real TODO footage.
  heroAmbient: {
    kind: "image",
    ...FILES.rwandaHills,
    alt: "",
    status: "temporary",
    category: "atmosphere",
    source: UNSPLASH.rwandaHills,
  },
  kigaliSkyline: {
    kind: "image",
    ...FILES.kigali,
    alt: "Kigali skyline at sunset",
    status: "temporary",
    category: "atmosphere",
    source: UNSPLASH.kigali,
  },
  aboutBand: {
    kind: "image",
    ...FILES.rwandaHills,
    alt: "Green hills in Rwanda under a cloudy sky",
    status: "temporary",
    category: "atmosphere",
    source: UNSPLASH.rwandaHills,
  },

  // ── Services: one editorial image per stage chapter (temporary) ─────────────
  stagePresent: {
    kind: "image",
    ...FILES.hillsideBuilding,
    alt: "A modern building on a green hillside",
    status: "temporary",
    category: "service",
    source: UNSPLASH.hillsideBuilding,
  },
  stageAttract: {
    kind: "image",
    ...FILES.drone,
    alt: "A camera drone in flight over a forest",
    status: "temporary",
    category: "service",
    source: UNSPLASH.drone,
  },

  // ── Packages: one narrow strip per package (temporary) ──────────────────────
  packageStarter: {
    kind: "image",
    ...FILES.kigali,
    alt: "Kigali skyline at sunset",
    status: "temporary",
    category: "package",
    source: UNSPLASH.kigali,
  },
  packageBusiness: {
    kind: "image",
    ...FILES.hillsideBuilding,
    alt: "A modern building on a green hillside",
    status: "temporary",
    category: "package",
    source: UNSPLASH.hillsideBuilding,
  },
  packageHospitality: {
    kind: "image",
    ...FILES.valley,
    alt: "A green valley seen from a hillside property",
    status: "temporary",
    category: "package",
    source: UNSPLASH.valley,
  },

  // ── Industries (temporary) ──────────────────────────────────────────────────
  hospitality: {
    kind: "image",
    ...FILES.valley,
    alt: "A green valley seen from a hillside property",
    status: "temporary",
    category: "industry",
    source: UNSPLASH.valley,
  },
  tourism: {
    kind: "image",
    ...FILES.gorilla,
    alt: "A mountain gorilla resting among bamboo leaves",
    status: "temporary",
    category: "industry",
    source: UNSPLASH.gorilla,
  },
  realestate: {
    kind: "image",
    ...FILES.hillsideBuilding,
    alt: "A modern building on a green hillside",
    status: "temporary",
    category: "industry",
    source: UNSPLASH.hillsideBuilding,
  },

  // ── Portfolio (real: screenshots of sites TODO built) ───────────────────────
  grottaSite: {
    kind: "image",
    ...pair(grottaDesk720, grottaDesk1440, 720, 1440),
    alt: "Grotta Resort website homepage, designed and developed by TODO Growth",
    status: "real",
    category: "project",
    source: "Screenshot of grottaresort.rw (captured September 2026)",
  },
  grottaSiteDetail: {
    kind: "image",
    ...pair(grottaDesk2720, grottaDesk21440, 720, 1440),
    alt: "Grotta Resort website experiences section",
    status: "real",
    category: "project",
    source: "Screenshot of grottaresort.rw (captured September 2026)",
  },
  grottaSiteMobile: {
    kind: "image",
    src: grottaMobile,
    alt: "Grotta Resort website on a mobile phone",
    status: "real",
    category: "project",
    source: "Screenshot of grottaresort.rw at 390px (captured September 2026)",
  },
  eagleviewSite: {
    kind: "image",
    ...pair(eagleDesk720, eagleDesk1440, 720, 1440),
    alt: "Eagleview Farm website homepage, designed and developed by TODO Growth",
    status: "real",
    category: "project",
    source: "Screenshot of eagleviewfarm.rw (captured September 2026)",
  },
  eagleviewSiteDetail: {
    kind: "image",
    ...pair(eagleDesk2720, eagleDesk21440, 720, 1440),
    alt: "Eagleview Farm website story section",
    status: "real",
    category: "project",
    source: "Screenshot of eagleviewfarm.rw (captured September 2026)",
  },
  eagleviewSiteMobile: {
    kind: "image",
    src: eagleMobile,
    alt: "Eagleview Farm website on a mobile phone",
    status: "real",
    category: "project",
    source: "Screenshot of eagleviewfarm.rw at 390px (captured September 2026)",
  },
  // TODO did not build the SVF website, so no site screenshot is used. This slot
  // is for SVF documentary / photo stills once the TODO asset pack arrives.
  svfLead: {
    kind: "image",
    ...FILES.ruralRoad,
    alt: "A rural road through green hills in Rwanda",
    status: "temporary",
    category: "project",
    source: UNSPLASH.ruralRoad,
  },
} satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof MEDIA;

// Slots that stay hidden until a real TODO asset exists. Never fill these with
// temporary imagery: an invented "team" photo would misrepresent the company.
//   team → TODO team or studio photo, rendered on the About page when added.
export const OPTIONAL_MEDIA: Partial<Record<"team", MediaAsset>> = {};

// Real project media, per portfolio project. Empty until TODO supplies assets;
// each project renders a media strip automatically once entries exist.
// Only TODO's own work belongs here (never temporary imagery).
export type ProjectMediaKind = "photography" | "video" | "drone" | "tour-360" | "documentary";
export const PROJECT_MEDIA: Record<
  string,
  { kind: ProjectMediaKind; caption: string; asset: MediaAsset }[]
> = {
  "grotta-resort": [],
  "eagleview-farm": [],
  "sustainable-villages-foundation": [],
};
