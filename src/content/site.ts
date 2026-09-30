// Single source of truth for TODO Growth site copy that appears on more than one page.
// Everything here reflects information confirmed by the TODO Growth team.
import type { ElementType } from "react";
import { Sparkles, Globe, Rotate3d, Camera, Megaphone, Star, TrendingUp, Cpu } from "lucide-react";

export const SITE_URL = "https://todo.rw";

export const COMPANY = {
  name: "TODO Growth",
  legalName: "TODO Growth Ltd.",
  positioning: "Growth, Commercialization & Digital Transformation",
  geography: "Rwanda-based, serving East Africa and beyond.",
  city: "Kigali, Rwanda",
  email: "info@todo.rw",
  phoneDisplay: "0799537999",
  // Same number in international format (Rwanda, +250) for WhatsApp and tel: links.
  phoneTel: "+250799537999",
  whatsappUrl: "https://wa.me/250799537999",
} as const;

// Package prices are not approved for public display. Pricing is discussed per scope.
export const PRICE_PENDING_LABEL = "Price on request";

// ─── Growth stages: how the services connect ─────────────────────────────────
export type StageId = "present" | "attract" | "convert" | "operate";

export const STAGES: { id: StageId; label: string; line: string; color: string }[] = [
  {
    id: "present",
    label: "Present",
    line: "Look as good online as you are in person.",
    color: "#5DD6B3",
  },
  {
    id: "attract",
    label: "Attract",
    line: "Reach the right customers and earn their trust.",
    color: "#C8A8E9",
  },
  {
    id: "convert",
    label: "Convert",
    line: "Turn attention and inquiries into revenue.",
    color: "#E87D7D",
  },
  {
    id: "operate",
    label: "Operate",
    line: "Give your team the tools to run more efficiently.",
    color: "#7DB8E8",
  },
];

// ─── Services (confirmed scope, in official order) ───────────────────────────
// `stage` places each service in the Present → Attract → Convert → Operate
// journey; `color` always equals its stage color.
export type ServiceId =
  | "branding"
  | "websites"
  | "virtual-tours"
  | "content"
  | "marketing"
  | "microsoft-ai"
  | "sales"
  | "reputation";

export interface Service {
  id: ServiceId;
  name: string;
  short: string;
  description: string;
  capabilities: string[];
  stage: StageId;
  color: string;
  icon: ElementType;
  featured?: boolean;
}

export const SERVICES: Service[] = [
  {
    id: "branding",
    name: "Branding",
    short: "Strategy and identity that make your business clear and consistent.",
    description:
      "Your brand is the first thing customers judge. We define your strategy, build your identity and document it in guidelines, so every marketing material looks and sounds like the same business.",
    capabilities: ["Brand strategy", "Brand identity", "Brand guidelines", "Marketing materials"],
    stage: "present",
    color: "#5DD6B3",
    icon: Sparkles,
  },
  {
    id: "websites",
    name: "Website Design & Development",
    short: "Websites built to generate inquiries and bookings, not just to look good.",
    description:
      "A website should be your best salesperson. We design and build sites that present your offer clearly and make it easy for customers to inquire or book.",
    capabilities: [
      "Business & corporate websites",
      "Hospitality & tourism websites",
      "Campaign landing pages",
      "Booking & inquiry integrations",
    ],
    stage: "present",
    color: "#5DD6B3",
    icon: Globe,
  },
  {
    id: "virtual-tours",
    name: "Virtual Tours & Interactive Experiences",
    short: "Let guests and buyers explore your space before they arrive.",
    description:
      "A 360° virtual tour shows the whole space, not just selected photos, so potential customers can experience a property remotely before they book, view or visit.",
    capabilities: ["360° virtual tours"],
    stage: "attract",
    color: "#C8A8E9",
    icon: Rotate3d,
  },
  {
    id: "content",
    name: "Content Production",
    short: "Photo and video that help customers understand what you offer.",
    description:
      "Professional content made for how customers actually decide: on their phones, in seconds. For projects that need a longer story, we also produce documentaries.",
    capabilities: [
      "Photography for social media",
      "Video production for social media",
      "Drone production",
      "Documentary production (project-dependent)",
    ],
    stage: "attract",
    color: "#C8A8E9",
    icon: Camera,
  },
  {
    id: "marketing",
    name: "Digital Marketing",
    short: "Reach the right customers and stay visible.",
    description:
      "Consistent, structured marketing that improves your visibility, reach and engagement, and brings more inquiries to your business.",
    capabilities: [
      "Social media management",
      "Advertising",
      "SEO",
      "Google Business optimization",
      "Influencer campaigns",
    ],
    stage: "attract",
    color: "#C8A8E9",
    icon: Megaphone,
  },
  {
    id: "microsoft-ai",
    name: "Microsoft & AI Business Solutions",
    short:
      "Microsoft 365, Copilot and practical AI systems that help your team work faster and serve customers better.",
    description:
      "Most teams already pay for tools they barely use. We help you set up and adopt Microsoft 365 properly, then build practical AI systems around it, so staff find answers faster, customers get quicker responses and routine work runs itself.",
    capabilities: [
      "Microsoft 365 setup & adoption",
      "Microsoft Copilot implementation & training",
      "AI staff training",
      "AI knowledge bases",
      "AI sales & customer-service agents",
      "Internal AI assistants",
      "Workflow & process automation",
      "CRM & lead-tracking systems",
      "Microsoft systems integrations",
    ],
    stage: "operate",
    color: "#7DB8E8",
    icon: Cpu,
    featured: true,
  },
  {
    id: "sales",
    name: "Sales & Commercialization Support",
    short: "Turn what you offer into something customers can easily buy.",
    description:
      "Visibility only matters if it converts. We shape your commercial strategy and package your products and experiences into clear offers.",
    capabilities: ["Commercial strategy", "Offer packaging"],
    stage: "convert",
    color: "#E87D7D",
    icon: TrendingUp,
  },
  {
    id: "reputation",
    name: "Reputation Management",
    short: "Maintain and strengthen how your business is seen online.",
    description:
      "Customers read reviews before they read your website. We manage your reviews, your Google Business Profile and your online presence so the first impression is a strong one.",
    capabilities: [
      "Online reputation management",
      "Review management",
      "Google Business Profile",
      "Brand perception",
      "Reputation monitoring",
    ],
    stage: "convert",
    color: "#E87D7D",
    icon: Star,
  },
];

export const serviceById = (id: string) => SERVICES.find((s) => s.id === id);

// ─── Packages ────────────────────────────────────────────────────────────────
export interface Package {
  id: string;
  name: string;
  audience: string;
  // Short forms of the approved audience line, used in the scope-led layout.
  forWhom: string;
  supports: string;
  includes: string[];
  cta: { label: string; to: string };
  color: string;
  featured?: boolean;
}

export const PACKAGES: Package[] = [
  {
    id: "starter-growth",
    name: "Starter Growth",
    audience: "For small businesses building a professional digital presence.",
    forWhom: "Small businesses",
    supports: "A professional digital presence",
    includes: [
      "One-page website",
      "Professional photography",
      "Social media setup",
      "Google Business optimization",
    ],
    cta: { label: "Request a Quote", to: "/contact?service=starter-growth" },
    color: "#5DD6B3",
  },
  {
    id: "business-growth",
    name: "Business Growth",
    audience: "For businesses ready to strengthen visibility and customer acquisition.",
    forWhom: "Businesses ready to grow",
    supports: "Stronger visibility and customer acquisition",
    includes: [
      "Full website",
      "Content production",
      "Social media management",
      "Advertising setup",
      "Monthly reporting",
    ],
    cta: { label: "Request a Quote", to: "/contact?service=business-growth" },
    color: "#C8A8E9",
  },
  {
    id: "hospitality-transformation",
    name: "Hospitality Transformation",
    audience:
      "For hotels, lodges and resorts that need an integrated commercial and digital upgrade.",
    forWhom: "Hotels, lodges and resorts",
    supports: "An integrated commercial and digital upgrade",
    includes: [
      "Commercial strategy",
      "Website redesign",
      "Virtual tour",
      "Content production",
      "AI knowledge base",
      "Staff training system",
    ],
    cta: { label: "Request a Quote", to: "/contact?service=hospitality-transformation" },
    color: "#E8C547",
    featured: true,
  },
];

// ─── Industries (summary; the Industries page holds the full detail) ─────────
export const PRIMARY_INDUSTRIES = [
  { id: "hospitality", name: "Hospitality", who: "Hotels · Resorts · Lodges · Guest houses" },
  {
    id: "tourism",
    name: "Tourism",
    who: "Tour operators · Experiences · Attractions",
  },
  { id: "realestate", name: "Real Estate", who: "Developers · Property managers · Agencies" },
] as const;

export const SECONDARY_INDUSTRIES = [
  { id: "restaurants", name: "Restaurants" },
  { id: "retail", name: "Retail" },
  { id: "clinics", name: "Clinics" },
  { id: "ngos", name: "NGOs & Development" },
] as const;

// ─── Why TODO ────────────────────────────────────────────────────────────────
export const WHY_TODO = [
  {
    title: "Practical, not theoretical",
    body: "We build things you can use (websites, content, campaigns and working systems), not slide decks and long consulting engagements.",
  },
  {
    title: "Productized services",
    body: "Every engagement has a defined scope, clear deliverables and an agreed outcome, so you know exactly what you are buying.",
  },
  {
    title: "Local market knowledge",
    body: "Based in Rwanda, we understand how hospitality, tourism and property businesses win customers here and across East Africa.",
  },
  {
    title: "AI + digital expertise",
    body: "Branding, content, websites, marketing, Microsoft and AI are delivered by one coordinated team instead of several separate suppliers.",
  },
];

// ─── How it works: the one official process ──────────────────────────────────
export const PROCESS = [
  {
    num: "01",
    title: "Choose your outcome",
    short:
      "More visibility, bookings, content, leads or operational efficiency. Tell us what needs to change.",
    detail:
      "Every project starts with a business outcome, not a deliverable. We look at how customers currently find you, book and buy, and agree on what should improve first.",
    signals: ["Visibility", "Bookings & inquiries", "Content", "Operational efficiency"],
    accent: "#E8C547",
  },
  {
    num: "02",
    title: "Receive a clear scope",
    short: "Deliverables, timeline, responsibilities and investment, defined before work starts.",
    detail:
      "No guesswork. You receive a written scope that says what we will deliver, when, who is responsible for what, and what it costs.",
    signals: ["Deliverables", "Timeline", "Responsibilities", "Investment"],
    accent: "#E8C547",
  },
  {
    num: "03",
    title: "Build & launch",
    short: "Our team produces, implements and launches the agreed solution.",
    detail:
      "Content, websites, campaigns and systems are produced by one coordinated team working from the same plan, then prepared for real-world use by you and your staff.",
    signals: ["Production", "Implementation", "Team handover", "Launch"],
    accent: "#E8C547",
  },
  {
    num: "04",
    title: "Improve & scale",
    short: "We refine what works and plan the next growth move as your business grows.",
    detail:
      "Launch is not the end. Performance data and customer feedback show what to refine next, and which part of your growth system to strengthen after that.",
    signals: ["Performance insights", "Customer feedback", "Refinement", "Next growth move"],
    accent: "#E8C547",
  },
];

// ─── Portfolio ───────────────────────────────────────────────────────────────
// `delivered` and `upcoming` are confirmed by TODO. Client summaries describe
// the organizations themselves. No verified numerical results exist yet, so
// `results` stays empty until TODO confirms them.
export interface Project {
  id: string;
  index: string;
  client: string;
  url: string;
  domain: string;
  category: string;
  focus: string;
  location: string;
  summary: string;
  delivered: { label: string; service: ServiceId }[];
  upcoming?: { label: string; service: ServiceId }[];
  // General benefits of the delivered services. Not measured client results.
  purpose: string[];
  accent: string;
  results?: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "grotta-resort",
    index: "01",
    client: "Grotta Resort",
    url: "https://grottaresort.rw/",
    domain: "grottaresort.rw",
    category: "Hospitality · Tourism · Digital Experience",
    focus: "Digital experience",
    location: "Musanze, Northern Rwanda",
    summary:
      "An adventure resort near Volcanoes National Park, built around a signature cave experience alongside gorilla trekking, volcano hikes, e-bike tours and wellness.",
    delivered: [
      { label: "Website design & development", service: "websites" },
      { label: "Photography & video for social media", service: "content" },
      { label: "Digital marketing & SEO", service: "marketing" },
      { label: "360° virtual tour", service: "virtual-tours" },
      { label: "Sales & commercialization support", service: "sales" },
    ],
    upcoming: [{ label: "Microsoft systems integrations", service: "microsoft-ai" }],
    purpose: [
      "Present rooms and experiences clearly online",
      "Show the resort's experiences through professional content",
      "Improve visibility in search and on social media",
      "Let guests explore the property remotely before they book",
    ],
    accent: "#C9A86A", // Grotta Resort gold
  },
  {
    id: "eagleview-farm",
    index: "02",
    client: "Eagleview Farm",
    url: "https://eagleviewfarm.rw/",
    domain: "eagleviewfarm.rw",
    category: "Hospitality · Tourism · Brand Experience",
    focus: "Brand experience",
    location: "Bugesera, Rwanda",
    summary:
      "A working lakeside retreat farm near Lake Mirayi, built around slow stays, farm-to-table dining and the heritage of Inyambo cattle.",
    delivered: [
      { label: "Website design & development", service: "websites" },
      { label: "Photography & video for social media", service: "content" },
      { label: "Digital marketing & SEO", service: "marketing" },
      { label: "Sales & commercialization support", service: "sales" },
    ],
    purpose: [
      "Present stays and farm experiences clearly online",
      "Communicate the farm's character through professional content",
      "Improve visibility in search and on social media",
    ],
    accent: "#A9B98C", // Eagleview Farm sage
  },
  {
    id: "sustainable-villages-foundation",
    index: "03",
    client: "Sustainable Villages Foundation",
    url: "https://www.s-v-f.org/",
    domain: "s-v-f.org",
    category: "NGO · Development · Digital Presence",
    focus: "Digital presence",
    location: "Berlin, Germany & rural Rwanda",
    summary:
      "A nonprofit developing self-sustaining villages in rural Rwanda through water, agriculture, energy, healthcare, education and income programs.",
    delivered: [
      { label: "Photography & video for social media", service: "content" },
      { label: "Documentary video production", service: "content" },
      { label: "Digital marketing & SEO", service: "marketing" },
      { label: "360° virtual tour", service: "virtual-tours" },
    ],
    purpose: [
      "Tell the foundation's story through documentary and social content",
      "Improve the foundation's visibility online",
      "Let supporters experience the work remotely",
    ],
    accent: "#9FB7C9", // neutral slate until SVF assets arrive
  },
];

// Additional client work: confirmed facts only. `summary` is client context (what
// the client is), kept separate from `delivered` (what TODO confirmed it did).
// Optional fields render only when present; leave them out until confirmed.
// No results or metrics beyond those confirmed.
export interface AdditionalWork {
  id: string;
  index: string;
  client: string;
  category: string;
  accent: string;
  metric?: string;
  location?: string;
  focus?: string;
  url?: string;
  domain?: string;
  summary?: string;
  delivered?: { label: string; service: ServiceId }[];
  purpose?: string[];
}

export const ADDITIONAL_WORK: AdditionalWork[] = [
  {
    id: "nuttintodo",
    index: "04",
    client: "NuttinTODO",
    category: "Travel · Experiences",
    accent: "#C4B49C", // neutral sand until NuttinTODO brand assets arrive
    location: "Kigali, Rwanda",
    focus: "Brand & website",
    url: "https://www.nuttintodo.com/",
    domain: "nuttintodo.com",
    // Client context from nuttintodo.com (researched September 2026).
    summary:
      "A marketplace where travelers discover and book authentic experiences with local hosts across Africa, from culture and craft to nature and adventure.",
    delivered: [
      { label: "Branding", service: "branding" },
      { label: "Website design & development", service: "websites" },
    ],
    purpose: [
      "Give the platform a clear, recognizable identity",
      "Help travelers discover and book authentic local experiences online",
    ],
  },
  {
    id: "rwanda-mango-fest",
    index: "05",
    client: "Rwanda Mango Fest",
    category: "Event",
    accent: "#E8C547",
    metric: "+1,000 attendees",
  },
  {
    id: "rwanda-summer-fest",
    index: "06",
    client: "Rwanda Summer Fest",
    category: "Event",
    accent: "#E8C547",
    metric: "+1,000 attendees",
  },
];

// ─── Inquiry form options (Discovery Call + Request a Quote) ─────────────────
export const SERVICE_OPTIONS: { value: string; label: string; group: string }[] = [
  ...SERVICES.map((s) => ({ value: s.id, label: s.name, group: "Services" })),
  ...PACKAGES.map((p) => ({ value: p.id, label: `${p.name} Package`, group: "Packages" })),
  { value: "not-sure", label: "Not sure yet", group: "Other" },
];

// A range the visitor selects about their own budget. Not TODO pricing.
export const BUDGET_OPTIONS = [
  "Under $1,000",
  "$1,000–$2,500",
  "$2,500–$5,000",
  "$5,000–$10,000",
  "$10,000+",
];
