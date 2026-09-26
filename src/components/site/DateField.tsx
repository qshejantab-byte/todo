import type { CSSProperties } from "react";

/**
 * Date entry as DD/MM/YYYY (the format used in Rwanda) instead of the
 * browser's locale-dependent date picker. Slashes are inserted as you type.
 */
export function formatDateInput(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean);
  return parts.join("/");
}

/** Empty is valid (the field is optional); otherwise it must be a real calendar date. */
export function isValidDate(value: string) {
  if (value.trim() === "") return true;
  const m = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return false;
  const [d, mo, y] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(y, mo - 1, d);
  return date.getFullYear() === y && date.getMonth() === mo - 1 && date.getDate() === d;
}

export function DateField({
  id,
  value,
  onChange,
  style,
  invalid,
  describedBy,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  style?: CSSProperties;
  invalid?: boolean;
  describedBy?: string;
}) {
  return (
    <input
      id={id}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      placeholder="DD/MM/YYYY"
      maxLength={10}
      value={value}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      onChange={(e) => onChange(formatDateInput(e.target.value))}
      style={style}
    />
  );
}
