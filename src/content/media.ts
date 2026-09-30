// Media slots. Every image on the site is referenced through this registry, so a
// temporary image can be replaced with a real TODO asset by editing one entry.
//
// status "real"      → TODO's own work or photography, or a screenshot of a site TODO built.
// status "temporary" → licensed stock imagery (Unsplash License), awaiting
//                      replacement with TODO's own photography.
//
// To replace a temporary image: drop the new files into src/assets/media/,
// import them below, update `src`/`srcSet`/`alt`, and set status to "real".

import kigali800 from "@/assets/media/temp/kigali-skyline-800.webp";
import kigali1600 from "@/assets/media/temp/kigali-skyline-1600.webp";
import tourism800 from "@/assets/media/temp/tourism-gorilla-800.webp";
import tourism1600 from "@/assets/media/temp/tourism-gorilla-1600.webp";
import realestate800 from "@/assets/media/temp/realestate-hillside-800.webp";
import realestate1600 from "@/assets/media/temp/realestate-hillside-1600.webp";
import lenses800 from "@/assets/media/temp/camera-lenses-800.webp";
import lenses1600 from "@/assets/media/temp/camera-lenses-1600.webp";
import ruralRoad800 from "@/assets/media/temp/rural-road-800.webp";
import ruralRoad1600 from "@/assets/media/temp/rural-road-1600.webp";

// TODO studio photography. Originals (uncropped, full size) live in media-source/todo-studio/.
import heroStudio800 from "@/assets/media/todo/hero/hero-studio-800.webp";
import heroStudio1600 from "@/assets/media/todo/hero/hero-studio-1600.webp";
import heroStudio2400 from "@/assets/media/todo/hero/hero-studio-2400.webp";
import brandWall800 from "@/assets/media/todo/home/brand-wall-800.webp";
import brandWall1539 from "@/assets/media/todo/home/brand-wall-1539.webp";
import studioOffice800 from "@/assets/media/todo/about/studio-office-800.webp";
import studioOffice1600 from "@/assets/media/todo/about/studio-office-1600.webp";
import muralPanorama800 from "@/assets/media/todo/about/studio-mural-panorama-800.webp";
import muralPanorama1600 from "@/assets/media/todo/about/studio-mural-panorama-1600.webp";
import muralPanorama2400 from "@/assets/media/todo/about/studio-mural-panorama-2400.webp";
import presentWorkstation800 from "@/assets/media/todo/services/present-workstation-800.webp";
import presentWorkstation1600 from "@/assets/media/todo/services/present-workstation-1600.webp";

// Grotta Resort pool photography (supplied September 2026). Original in media-source/grotta/.
import grottaPool800 from "@/assets/media/todo/industries/grotta-pool-800.webp";
import grottaPool1620 from "@/assets/media/todo/industries/grotta-pool-1620.webp";

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
  /** Default object-position (focal point) wherever the slot is cropped; a page can override it. */
  focus?: string;
}

const pair = (small: string, large: string, smallW: number, largeW: number) => ({
  src: large,
  srcSet: `${small} ${smallW}w, ${large} ${largeW}w`,
});

// Shared file sets. One file can back several slots; each slot keeps its own
// entry below so it can be replaced independently.
const FILES = {
  kigali: pair(kigali800, kigali1600, 800, 1600),
  gorilla: pair(tourism800, tourism1600, 800, 1600),
  hillsideBuilding: pair(realestate800, realestate1600, 800, 1600),
  ruralRoad: pair(ruralRoad800, ruralRoad1600, 800, 1600),
};

const UNSPLASH = {
  kigali: "Unsplash, Jean Claude Akarikumutima (b-HnOOPRfTI)",
  gorilla: "Unsplash, Magdalena Kula Manchee (-FezT2WMZr4)",
  hillsideBuilding: "Unsplash, Tamrat Touloumon (-2CWrKkR-GA)",
  ruralRoad: "Unsplash, Tobias Doering (1ihYfuwRZds)",
  lenses: "Unsplash, Hunter Moranville (tyV5vXni8lk)",
};

const STUDIO = "TODO Growth studio photography (supplied September 2026)";

export const MEDIA = {
  // ── Atmosphere ──────────────────────────────────────────────────────────────
  // Home hero layer behind the diagram: the full studio frame (office-1), centred, with the
  // TODO mural visible on the back wall. Still a video slot: add `video: { src }` for a muted loop.
  heroAmbient: {
    kind: "image",
    src: heroStudio1600,
    srcSet: `${heroStudio800} 800w, ${heroStudio1600} 1600w, ${heroStudio2400} 2400w`,
    alt: "",
    status: "real",
    category: "atmosphere",
    source: STUDIO,
  },
  // Home "Who we are": the TODO.RW wall close up (the hero already shows the whole studio).
  // Held left of centre so the logo and the plant both survive the near-square desktop crop.
  whoWeAre: {
    kind: "image",
    ...pair(brandWall800, brandWall1539, 800, 1539),
    alt: "The TODO.RW Build Brand Grow sign on the studio wall, beside a plant",
    status: "real",
    category: "atmosphere",
    source: "Supplied by TODO Growth (Colorful TODO.RW Brand Wall.png, September 2026)",
    focus: "30% center",
  },
  // About lead image until a team photo exists (OPTIONAL_MEDIA.team takes priority).
  // The studio from the edit desks (office6): TODO mural at the back, values wall on the right.
  // Held right so the whole values wall stays in the 4:5 frame.
  aboutLead: {
    kind: "image",
    ...pair(studioOffice800, studioOffice1600, 800, 1600),
    alt: "The TODO Growth studio, with the TODO mural and the Focus, Create, Solve, Impact wall",
    status: "real",
    category: "atmosphere",
    source: STUDIO,
    focus: "100% center",
  },
  aboutBand: {
    kind: "image",
    src: muralPanorama1600,
    srcSet: `${muralPanorama800} 800w, ${muralPanorama1600} 1600w, ${muralPanorama2400} 2400w`,
    alt: "The TODO mural, Build Brand Grow, lit by spotlights in the studio",
    status: "real",
    category: "atmosphere",
    source: STUDIO,
  },

  // ── Services: one editorial image per stage chapter ──────────────────────────
  stagePresent: {
    kind: "image",
    ...pair(presentWorkstation800, presentWorkstation1600, 800, 1600),
    alt: "A TODO Growth workstation, with the TODO logo on a laptop between two monitors",
    status: "real",
    category: "service",
    source: STUDIO,
    // Desktop crops this to 4:3: hold the laptop and right-hand monitor.
    focus: "62% center",
  },
  // Stock (Unsplash License): camera lenses for content production.
  stageAttract: {
    kind: "image",
    ...pair(lenses800, lenses1600, 800, 1600),
    alt: "Camera lenses grouped on a wooden table",
    status: "temporary",
    category: "service",
    source: UNSPLASH.lenses,
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
    ...pair(grottaPool800, grottaPool1620, 800, 1620),
    alt: "The Grotta Resort pool seen from inside the cave, with the resort building beyond",
    status: "real",
    category: "package",
    source: "Grotta Resort photography supplied by TODO Growth (September 2026)",
    focus: "70% center",
  },

  // ── Industries (temporary) ──────────────────────────────────────────────────
  hospitality: {
    kind: "image",
    ...pair(grottaPool800, grottaPool1620, 800, 1620),
    alt: "The Grotta Resort pool seen from inside the cave, with the resort building beyond",
    status: "real",
    category: "industry",
    source: "Grotta Resort photography supplied by TODO Growth (September 2026)",
    focus: "70% center",
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

// Real media for "More work" entries (see ADDITIONAL_WORK), keyed by entry id.
// Empty until approved assets exist; each entry shows its image once added.
// Never temporary or client-website imagery presented as TODO's work.
export const WORK_MEDIA: Partial<Record<string, MediaAsset>> = {};
