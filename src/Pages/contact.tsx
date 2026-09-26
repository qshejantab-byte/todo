import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageShell } from "@/components/PageShell";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { C, F, LABEL, TYPE, Seo, PageHero, Cta } from "@/components/site/ui";
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

const ORDER: (keyof Inquiry)[] = ["name", "email", "service", "launchDate", "summary"];

function QuoteRequestForm() {
  const [params] = useSearchParams();
  const [form, setForm] = useState<Inquiry>(() =>
    emptyInquiry(validServicePreset(params.get("service"))),
  );
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (k: keyof Inquiry, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };
  const on =
    (k: keyof Inquiry) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      update(k, e.target.value);

  const groups = [...new Set(SERVICE_OPTIONS.map((o) => o.group))];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateInquiry(form, ORDER);
    setErrors(found);
    if (Object.keys(found).length) {
      focusFirstError(found, "q", ORDER);
      return;
    }
    setLoading(true);
    setError("");
    try {
      await sendInquiry("quote", form);
      setSent(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError(`Something went wrong. Please email us directly at ${COMPANY.email}`);
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div
        role="status"
        className="rounded-2xl border p-8 sm:p-10"
        style={{ borderColor: "rgba(232,197,71,0.35)", background: "rgba(232,197,71,0.05)" }}
      >
        <div
          className="mb-6 flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: C.yellow }}
        >
          <Check size={22} color="#0b0d17" strokeWidth={3} />
        </div>
        <h2 className="mb-3" style={{ ...TYPE.h3, fontSize: "1.9rem", color: C.text }}>
          Quote request received.
        </h2>
        <p className="mb-6 max-w-lg text-base leading-8" style={{ color: C.body }}>
          Thank you, {form.name.trim().split(" ")[0]}. We'll review your request and come back to
          you with a proposed scope or a few questions to confirm it.
        </p>
        <dl className="mb-8 grid gap-4 border-y border-white/10 py-5 sm:grid-cols-2">
          <div>
            <dt className={LABEL} style={{ fontFamily: F.mono, color: C.muted }}>
              Service needed
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
          Need to add something? Email{" "}
          <a href={`mailto:${COMPANY.email}`} className="text-white underline underline-offset-4">
            {COMPANY.email}
          </a>
          .
        </p>
      </div>
    );
  }

  const ctl = (k: keyof Inquiry) => ({
    id: `q-${k}`,
    style: controlStyle(!!errors[k]),
    ...describe(`q-${k}`, errors[k]),
  });

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Request a quote"
      className="rounded-2xl border border-white/10 p-6 sm:p-9"
      style={{ background: C.bgRaised }}
    >
      <fieldset>
        <legend
          className={`${LABEL} float-left mb-5 w-full`}
          style={{ fontFamily: F.mono, color: C.yellow }}
        >
          About you
        </legend>
        <div className="clear-both grid gap-5 sm:grid-cols-2">
          <Field id="q-name" label="Name" required error={errors.name}>
            <input autoComplete="name" value={form.name} onChange={on("name")} {...ctl("name")} />
          </Field>
          <Field id="q-company" label="Company" optional>
            <input
              autoComplete="organization"
              value={form.company}
              onChange={on("company")}
              {...ctl("company")}
            />
          </Field>
          <Field id="q-phone" label="Phone / WhatsApp" optional>
            <input
              type="tel"
              autoComplete="tel"
              placeholder="07XX XXX XXX"
              value={form.phone}
              onChange={on("phone")}
              {...ctl("phone")}
            />
          </Field>
          <Field id="q-email" label="Email" required error={errors.email}>
            <input
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={on("email")}
              {...ctl("email")}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="mt-8 border-t border-white/10 pt-8">
        <legend
          className={`${LABEL} float-left mb-5 w-full`}
          style={{ fontFamily: F.mono, color: C.yellow }}
        >
          Your project
        </legend>
        <div className="clear-both grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field id="q-service" label="Service needed" required error={errors.service}>
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
          </div>
          <Field id="q-budget" label="Budget range" optional>
            <select value={form.budget} onChange={on("budget")} {...ctl("budget")}>
              <option value="">Select a range</option>
              {BUDGET_OPTIONS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>
          <Field id="q-launchDate" label="Preferred launch date" optional error={errors.launchDate}>
            <DateField
              id="q-launchDate"
              value={form.launchDate}
              onChange={(v) => update("launchDate", v)}
              style={controlStyle(!!errors.launchDate)}
              invalid={!!errors.launchDate}
              describedBy={errors.launchDate ? "q-launchDate-error" : undefined}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field id="q-summary" label="Project summary" required error={errors.summary}>
              <textarea
                rows={5}
                placeholder="What you need, what it's for, and anything we should know."
                value={form.summary}
                onChange={on("summary")}
                {...ctl("summary")}
                style={{ ...controlStyle(!!errors.summary), resize: "vertical", lineHeight: 1.7 }}
              />
            </Field>
          </div>
        </div>
      </fieldset>

      {error && (
        <p role="alert" className="mt-5 text-sm leading-6" style={{ color: ERROR_COLOR }}>
          {error}
        </p>
      )}
      {Object.values(errors).some(Boolean) && (
        <p role="alert" className="mt-5 text-sm" style={{ color: ERROR_COLOR }}>
          Please check the highlighted fields.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-h-[50px] items-center justify-center gap-2 rounded-full border border-white/25 px-7 text-[13px] font-bold uppercase tracking-[0.07em] text-[#f5f5f0] transition-colors hover:border-[#E8C547] hover:text-[#E8C547] disabled:cursor-wait disabled:opacity-60"
          style={{ fontFamily: F.display }}
        >
          {loading ? (
            "Sending…"
          ) : (
            <>
              Request a Quote <ArrowRight size={15} />
            </>
          )}
        </button>
        <span className="text-sm" style={{ color: C.muted }}>
          Pricing is confirmed in your scope.
        </span>
      </div>
    </form>
  );
}

function Channel({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <div>
        <div className={`${LABEL} mb-1`} style={{ fontFamily: F.mono, color: C.muted }}>
          {label}
        </div>
        <div className="text-base font-semibold text-[#f5f5f0]" style={{ fontFamily: F.display }}>
          {value}
        </div>
      </div>
      {href && (
        <ArrowUpRight
          size={16}
          className="text-white/40 transition-colors group-hover:text-[#E8C547]"
        />
      )}
    </>
  );
  const cls = "group flex min-h-[64px] items-center justify-between border-b border-white/10 py-4";
  return href ? (
    <a
      href={href}
      className={cls}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export default function ContactPage() {
  // Re-mount the form when the pre-selected service changes.
  const [params] = useSearchParams();

  return (
    <PageShell>
      <Seo
        title="Contact TODO Growth | Request a Quote"
        description="Request a quote from TODO Growth for branding, websites, virtual tours, content, digital marketing, Microsoft & AI solutions or a growth package. Based in Kigali, Rwanda."
        path="/contact"
      />

      <PageHero
        compact
        eyebrow="Contact"
        title="Request a quote."
        accent="Tell us what you need."
        intro="Already know which service or package you're interested in? Share the details and we'll come back with a scoped proposal. Still exploring? A Discovery Call is the better first step."
      />

      <section className="px-5 pb-20 pt-4 sm:px-8 lg:px-14 lg:pb-28" style={{ background: C.bg }}>
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
          <QuoteRequestForm key={params.get("service") ?? ""} />

          <aside className="space-y-10">
            <div>
              <h2 className={`${LABEL} mb-2`} style={{ fontFamily: F.mono, color: C.yellow }}>
                Reach us directly
              </h2>
              <div className="border-t border-white/10">
                <Channel label="Email" value={COMPANY.email} href={`mailto:${COMPANY.email}`} />
                <Channel
                  label="WhatsApp"
                  value={COMPANY.phoneDisplay}
                  href={COMPANY.whatsappUrl}
                  external
                />
                <Channel
                  label="Phone"
                  value={COMPANY.phoneDisplay}
                  href={`tel:${COMPANY.phoneTel}`}
                />
                <Channel label="Based in" value={COMPANY.city} />
              </div>
              <p className="mt-4 text-sm leading-7" style={{ color: C.muted }}>
                Serving clients across East Africa and beyond.
              </p>
            </div>

            <div className="border-l-2 pl-5" style={{ borderColor: C.yellow }}>
              <h2 className={`${LABEL} mb-4`} style={{ fontFamily: F.mono, color: C.yellow }}>
                Quote or call?
              </h2>
              <dl className="space-y-4 text-[15px] leading-7">
                <div>
                  <dt className="font-semibold text-[#f5f5f0]">Request a Quote</dt>
                  <dd style={{ color: C.body }}>
                    You know what you need and want a scoped proposal.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#f5f5f0]">Book a Discovery Call</dt>
                  <dd style={{ color: C.body }}>
                    You want to talk through your business and find the right starting point.
                  </dd>
                </div>
              </dl>
              <div className="mt-4">
                <Cta to="/discovery" variant="link">
                  Book a Discovery Call
                </Cta>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
