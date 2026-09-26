import type { CSSProperties, ReactNode } from "react";
import { C, F } from "./ui";
import { isValidEmail, type Inquiry } from "@/lib/inquiry";
import { isValidDate } from "./DateField";

export const ERROR_COLOR = "#FF9C8A";

/** Shared control style. Focus is shown by the global :focus-visible ring. */
export const controlStyle = (invalid?: boolean): CSSProperties => ({
  width: "100%",
  boxSizing: "border-box",
  minHeight: 50,
  background: "rgba(255,255,255,0.04)",
  border: `1px solid ${invalid ? ERROR_COLOR : "rgba(255,255,255,0.16)"}`,
  borderRadius: 10,
  padding: "0.8rem 1rem",
  fontFamily: F.display,
  fontSize: "1rem",
  color: C.text,
  colorScheme: "dark",
});

export function Field({
  id,
  label,
  required,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs uppercase tracking-[0.12em]"
        style={{ fontFamily: F.mono, color: "rgba(245,245,240,0.75)" }}
      >
        {label}
        {required && (
          <span style={{ color: C.yellow, marginLeft: 4 }} aria-hidden="true">
            *
          </span>
        )}
        {optional && (
          <span className="ml-1.5 normal-case tracking-normal" style={{ color: C.muted }}>
            (optional)
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm" style={{ color: C.muted }}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm" style={{ color: ERROR_COLOR }}>
          {error}
        </p>
      )}
    </div>
  );
}

/** ARIA wiring for a control inside <Field>. */
export const describe = (id: string, error?: string, hint?: string) => ({
  "aria-invalid": error ? (true as const) : undefined,
  "aria-describedby": error ? `${id}-error` : hint ? `${id}-hint` : undefined,
});

export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;

/** Validates the given fields of an inquiry and returns messages for the invalid ones. */
export function validateInquiry(f: Inquiry, fields: (keyof Inquiry)[]): InquiryErrors {
  const e: InquiryErrors = {};
  for (const k of fields) {
    if (k === "name" && f.name.trim().length < 2) e.name = "Please enter your name.";
    if (k === "email" && !isValidEmail(f.email)) e.email = "Please enter a valid email address.";
    if (k === "service" && !f.service)
      e.service = "Please choose a service, package or “Not sure yet”.";
    if (k === "summary" && !f.summary.trim()) e.summary = "Please add a short project summary.";
    if (k === "launchDate" && !isValidDate(f.launchDate))
      e.launchDate = "Please use the format DD/MM/YYYY, e.g. 15/01/2027.";
  }
  return e;
}

/** Moves focus to the first invalid control after validation fails. */
export function focusFirstError(errors: InquiryErrors, prefix: string, order: (keyof Inquiry)[]) {
  const first = order.find((k) => errors[k]);
  if (first) document.getElementById(`${prefix}-${first}`)?.focus();
}
