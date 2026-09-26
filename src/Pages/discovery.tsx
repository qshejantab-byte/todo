import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import {
  C,
  F,
  TYPE,
  LABEL,
  Seo,
  Section,
  Reveal,
  SectionHeading,
  Eyebrow,
  Cta,
} from "@/components/site/ui";
import { DateField } from "@/components/site/DateField";
import {
  Field,
  controlStyle,
  describe,
  validateInquiry,
  focusFirstError,
  ERROR_COLOR,
  type InquiryErrors,
} from "@/components/site/form";
import { COMPANY, SERVICE_OPTIONS, BUDGET_OPTIONS } from "@/content/site";
import {
  emptyInquiry,
  sendInquiry,
  serviceLabel,
  validServicePreset,
  type Inquiry,
} from "@/lib/inquiry";

const COVERS = [
  {
    title: "Where you are today",
    body: "How customers currently find you, contact you and buy from you, and what's getting in the way.",
  },
  {
    title: "What needs to change",
    body: "The outcome that matters most right now: visibility, bookings, content, leads or efficiency.",
  },
  {
    title: "What fits your stage",
    body: "Which services or package make sense now, and which can wait until later.",
  },
  {
    title: "An honest recommendation",
    body: "A clear next step. If we're not the right fit, or it isn't the right time, we'll tell you.",
  },
];

const SUMMARY_TIPS = [
  "Your website and social media links, if you have them",
  "The main goal you want to reach",
  "What you've tried so far, and what hasn't worked",
];

// Fields validated on each step.
const STEP_FIELDS: (keyof Inquiry)[][] = [
  ["name", "email"],
  ["service", "launchDate"],
  ["summary"],
];

// ─── Multi-step form: the same 8 fields as Request a Quote ────────────────────
function DiscoveryForm() {
  const [params] = useSearchParams();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [form, setForm] = useState<Inquiry>(() =>
    emptyInquiry(validServicePreset(params.get("service"))),
  );

  const update = (k: keyof Inquiry, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const on =
    (k: keyof Inquiry) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      update(k, e.target.value);
  const ctl = (k: keyof Inquiry) => ({
    id: `d-${k}`,
    style: controlStyle(!!errors[k]),
    ...describe(`d-${k}`, errors[k]),
  });
  const groups = [...new Set(SERVICE_OPTIONS.map((o) => o.group))];

  const steps = [
    {
      question: "Let's start with you.",
      sub: "Who should we speak with?",
      content: (
        <div className="space-y-5">
          <Field id="d-name" label="Name" required error={errors.name}>
            <input autoComplete="name" value={form.name} onChange={on("name")} {...ctl("name")} />
          </Field>
          <Field id="d-company" label="Company" optional>
            <input
              autoComplete="organization"
              value={form.company}
              onChange={on("company")}
              {...ctl("company")}
            />
          </Field>
          <Field id="d-phone" label="Phone / WhatsApp" optional>
            <input
              type="tel"
              autoComplete="tel"
              placeholder="07XX XXX XXX"
              value={form.phone}
              onChange={on("phone")}
              {...ctl("phone")}
            />
          </Field>
          <Field id="d-email" label="Email" required error={errors.email}>
            <input
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={on("email")}
              {...ctl("email")}
            />
          </Field>
        </div>
      ),
    },
    {
      question: "What do you need?",
      sub: "Choose the closest service or package. It's fine if you're not sure yet.",
      content: (
        <div className="space-y-5">
          <Field id="d-service" label="Service needed" required error={errors.service}>
            <select value={form.service} onChange={on("service")} {...ctl("service")}>
              <option value="" disabled>
                Select a service or package
              </option>
              {groups.map((g) => (
                <optgroup key={g} label={g}>
                  {SERVICE_OPTIONS.filter((o) => o.group === g).map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </Field>
          <Field id="d-budget" label="Budget range" optional>
            <select value={form.budget} onChange={on("budget")} {...ctl("budget")}>
              <option value="">Select a range</option>
              {BUDGET_OPTIONS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>
          <Field id="d-launchDate" label="Preferred launch date" optional error={errors.launchDate}>
            <DateField
              id="d-launchDate"
              value={form.launchDate}
              onChange={(v) => update("launchDate", v)}
              style={controlStyle(!!errors.launchDate)}
              invalid={!!errors.launchDate}
              describedBy={errors.launchDate ? "d-launchDate-error" : undefined}
            />
          </Field>
        </div>
      ),
    },
    {
      question: "Tell us about the project.",
      sub: "A few lines help us prepare for the call.",
      content: (
        <Field id="d-summary" label="Project summary" required error={errors.summary}>
          <textarea
            rows={6}
            placeholder="What you need, what it's for, and anything we should know."
            value={form.summary}
            onChange={on("summary")}
            {...ctl("summary")}
            style={{ ...controlStyle(!!errors.summary), resize: "vertical", lineHeight: 1.7 }}
          />
          <ul className="mt-3 space-y-1.5">
            {SUMMARY_TIPS.map((t) => (
              <li
                key={t}
                className="flex items-start gap-2 text-sm leading-6"
                style={{ color: C.muted }}
              >
                <Check size={13} color={C.yellow} className="mt-1 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </Field>
      ),
    },
  ];

  const last = step === steps.length - 1;

  async function next() {
    const found = validateInquiry(form, STEP_FIELDS[step]);
    setErrors(found);
    if (Object.keys(found).length) {
      focusFirstError(found, "d", STEP_FIELDS[step]);
      return;
    }
    if (!last) {
      setStep((s) => s + 1);
      return;
    }
    setLoading(true);
    setError("");
    try {
      await sendInquiry("discovery", form);
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError(`Something went wrong. Please email us directly at ${COMPANY.email}`);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div role="status">
        <div
          className="mb-6 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: C.yellow }}
        >
          <Check size={22} color="#0b0d17" strokeWidth={3} />
        </div>
        <h3 className="mb-3" style={{ ...TYPE.h3, fontSize: "1.8rem", color: C.text }}>
          Request received.
        </h3>
        <p className="mb-6 text-base leading-8" style={{ color: C.body }}>
          Thank you, {form.name.trim().split(" ")[0]}. We'll review your project and follow up to
          schedule your Discovery Call.
        </p>
        <dl className="mb-6 grid gap-4 border-y border-white/10 py-5">
          <div>
            <dt className={LABEL} style={{ fontFamily: F.mono, color: C.muted }}>
              About
            </dt>
            <dd className="mt-1 text-[15px] text-white/90">{serviceLabel(form.service)}</dd>
          </div>
          <div>
            <dt className={LABEL} style={{ fontFamily: F.mono, color: C.muted }}>
              We'll reply to
            </dt>
            <dd className="mt-1 text-[15px] text-white/90">{form.email}</dd>
          </div>
        </dl>
        <p className="text-sm leading-7" style={{ color: C.muted }}>
          Need to reach us sooner? Email{" "}
          <a href={`mailto:${COMPANY.email}`} className="text-white underline underline-offset-4">
            {COMPANY.email}
          </a>
          .
        </p>
      </div>
    );
  }

  const current = steps[step];

  return (
    <div>
      {/* Progress */}
      <div className="mb-7">
        <div className="mb-2 flex items-center justify-between">
          <span className={LABEL} style={{ fontFamily: F.mono, color: C.muted }}>
            Step {step + 1} of {steps.length}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-1.5" aria-hidden="true">
          {steps.map((_, i) => (
            <span
              key={i}
              className="h-1 rounded-full transition-colors"
              style={{ background: i <= step ? C.yellow : "rgba(255,255,255,0.12)" }}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-1" style={{ ...TYPE.h3, color: C.text }}>
          {current.question}
        </h3>
        <p className="text-[15px] leading-6" style={{ color: C.muted }}>
          {current.sub}
        </p>
      </div>

      {current.content}

      {error && (
        <p role="alert" className="mt-5 text-sm leading-6" style={{ color: ERROR_COLOR }}>
          {error}
        </p>
      )}

      <div className="mt-7 flex items-center gap-3">
        {step > 0 && (
          <button
            type="button"
            onClick={() => {
              setErrors({});
              setStep((s) => s - 1);
            }}
            className="inline-flex min-h-[50px] items-center gap-2 rounded-full border border-white/20 px-5 text-[13px] font-semibold text-white/80 transition-colors hover:border-white/50 hover:text-white"
            style={{ fontFamily: F.display }}
          >
            <ArrowLeft size={14} /> Back
          </button>
        )}
        <button
          type="button"
          onClick={next}
          disabled={loading}
          className="inline-flex min-h-[50px] flex-1 items-center justify-center gap-2 rounded-full px-6 text-[13px] font-bold uppercase tracking-[0.07em] text-[#0b0d17] transition-[background-color] hover:bg-[#F0CF5A] disabled:cursor-wait disabled:opacity-70"
          style={{ fontFamily: F.display, background: C.yellow }}
        >
          {loading ? (
            "Sending…"
          ) : last ? (
            <>
              Request my Discovery Call <ArrowRight size={15} />
            </>
          ) : (
            <>
              Continue <ArrowRight size={15} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DiscoveryPage() {
  return (
    <PageShell>
      <Seo
        title="Book a Discovery Call | TODO Growth"
        description="Book a Discovery Call with TODO Growth. Share your project and we'll follow up to schedule a conversation about growth, websites, content, marketing, Microsoft and AI for your business."
        path="/discovery"
      />

      {/* ── HERO + FORM ─────────────────────────────────────────── */}
      <section
        className="px-5 pb-20 pt-12 sm:px-8 lg:px-14 lg:pb-28 lg:pt-16"
        style={{
          background: `radial-gradient(70% 60% at 85% 20%, rgba(232,197,71,0.07) 0%, transparent 70%), linear-gradient(180deg, ${C.bgRaised} 0%, ${C.bg} 70%)`,
        }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start lg:gap-16">
          <div className="lg:pt-6">
            <div className="anim-up" style={{ animationDelay: "0.05s" }}>
              <Eyebrow color={C.yellow} line>
                Discovery Call
              </Eyebrow>
            </div>
            <h1
              className="anim-up mb-6"
              style={{ animationDelay: "0.1s", ...TYPE.pageTitle, color: C.text }}
            >
              Start with a conversation{" "}
              <span style={{ color: "rgba(245,245,240,0.45)" }}>about your business.</span>
            </h1>
            <p
              className="anim-up mb-4 max-w-lg text-base leading-8"
              style={{ animationDelay: "0.16s", color: C.body }}
            >
              A Discovery Call is where we learn how your business works today, what you want to
              change, and which solutions make sense, before anyone talks about a scope or a price.
            </p>
            <p
              className="anim-up max-w-lg border-l-2 pl-4 text-base leading-7 text-white/90"
              style={{ animationDelay: "0.2s", borderColor: C.yellow }}
            >
              Complete the project form and we'll follow up to schedule your call.
            </p>
          </div>

          <div
            id="discovery-form"
            className="anim-up rounded-2xl border border-white/10 p-6 sm:p-9 lg:sticky lg:top-24"
            style={{
              animationDelay: "0.18s",
              background: C.bgRaised,
              boxShadow: "0 40px 90px -30px rgba(0,0,0,0.6)",
            }}
          >
            <div className={`${LABEL} mb-1`} style={{ fontFamily: F.mono, color: C.muted }}>
              Project form
            </div>
            <h2 className="mb-7" style={{ ...TYPE.h3, color: C.text }}>
              Book a Discovery Call
            </h2>
            <DiscoveryForm />
          </div>
        </div>
      </section>

      {/* ── WHAT WE COVER ──────────────────────────────────────── */}
      <Section tone="raised">
        <SectionHeading
          eyebrow="What we'll cover"
          title="A practical conversation."
          accent="Not a pitch."
          signature
        />
        <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {COVERS.map((c, i) => (
            <li
              key={c.title}
              className="border-t-2 pt-5"
              style={{ borderColor: i === 3 ? C.yellow : C.lineStrong }}
            >
              <span
                className={`${LABEL} mb-3 block`}
                style={{ fontFamily: F.mono, color: C.muted }}
              >
                0{i + 1}
              </span>
              <h3
                className="mb-2 text-lg font-bold leading-snug text-[#f5f5f0]"
                style={{ fontFamily: F.display }}
              >
                {c.title}
              </h3>
              <p className="text-[15px] leading-7" style={{ color: C.body }}>
                {c.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* ── CALL VS QUOTE ──────────────────────────────────────── */}
      <Section tone="ink" padding="py-16 lg:py-20">
        <Reveal className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2
              className="mb-3"
              style={{ ...TYPE.h2, fontSize: "clamp(1.6rem,3vw,2.4rem)", color: C.text }}
            >
              Already know what you need?
            </h2>
            <p className="max-w-xl text-base leading-8" style={{ color: C.body }}>
              If you've chosen a service or package and want a scoped proposal, skip the call and
              request a quote.
            </p>
          </div>
          <Cta to="/contact" variant="secondary">
            Request a Quote
          </Cta>
        </Reveal>
      </Section>
    </PageShell>
  );
}
