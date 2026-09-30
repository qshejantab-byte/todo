// Shared data + EmailJS payload for the two project forms (Discovery Call and
// Request a Quote). Both collect the same 8 confirmed fields.
import emailjs from "@emailjs/browser";
import { COMPANY, SERVICE_OPTIONS } from "@/content/site";

const EMAILJS_SERVICE_ID = "service_tyheci5";
const EMAILJS_PUBLIC_KEY = "C7fH5rnk5-9g05t9A";

// Where form submissions go. Sent as `to_email`; each EmailJS template's
// "To Email" setting must be {{to_email}} for this to take effect.
export const INQUIRY_RECIPIENT = COMPANY.email;

export const EMAILJS_TEMPLATES = {
  discovery: "template_q0zx8tz",
  quote: "template_0n9539s",
} as const;

export type InquiryType = keyof typeof EMAILJS_TEMPLATES;

export interface Inquiry {
  name: string;
  company: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  launchDate: string;
  summary: string;
}

export const emptyInquiry = (service = ""): Inquiry => ({
  name: "",
  company: "",
  phone: "",
  email: "",
  service,
  budget: "",
  launchDate: "",
  summary: "",
});

/** Returns the preset only if it matches a real service/package option. */
export const validServicePreset = (value: string | null) =>
  value && SERVICE_OPTIONS.some((o) => o.value === value) ? value : "";

export const serviceLabel = (value: string) =>
  SERVICE_OPTIONS.find((o) => o.value === value)?.label ?? value;

export const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

const orNotProvided = (v: string) => (v.trim() !== "" ? v.trim() : "Not provided");

/**
 * Template variables sent to EmailJS. Every field has its own variable, and the
 * full inquiry is also written into `message`, which both existing templates
 * already render, so nothing is lost before the templates are updated.
 */
export function buildTemplateParams(type: InquiryType, f: Inquiry) {
  const fields = {
    name: f.name.trim(),
    company: orNotProvided(f.company),
    phone: orNotProvided(f.phone),
    email: f.email.trim(),
    service: serviceLabel(f.service),
    budget: orNotProvided(f.budget),
    launch_date: orNotProvided(f.launchDate),
    summary: f.summary.trim(),
  };
  const heading = type === "discovery" ? "DISCOVERY CALL REQUEST" : "QUOTE REQUEST";

  return {
    ...fields,
    to_email: INQUIRY_RECIPIENT,
    inquiry_type: type === "discovery" ? "Discovery Call" : "Request a Quote",
    reply_to: fields.email,
    // Legacy variable names used by the existing templates.
    business: fields.company,
    focus: fields.service,
    message: [
      heading,
      `Name: ${fields.name}`,
      `Company: ${fields.company}`,
      `Phone / WhatsApp: ${fields.phone}`,
      `Email: ${fields.email}`,
      `Service needed: ${fields.service}`,
      `Budget range: ${fields.budget}`,
      `Preferred launch date: ${fields.launch_date}`,
      "",
      "Project summary:",
      fields.summary,
    ].join("\n"),
  };
}

export function sendInquiry(type: InquiryType, f: Inquiry) {
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATES[type],
    buildTemplateParams(type, f),
    EMAILJS_PUBLIC_KEY,
  );
}
