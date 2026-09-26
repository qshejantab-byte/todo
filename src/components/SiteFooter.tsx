import { Link } from "react-router-dom";
import LOGO from "../assets/logo-192.webp";
import { ArrowRight } from "lucide-react";
import { COMPANY } from "@/content/site";

const MONO = "Space Mono, monospace";
const DISPLAY = "Space Grotesk, sans-serif";

/**
 * Compact closing footer. Navigation lives in the header; the footer only
 * carries the brand, one call to action and direct contact details.
 */
export function SiteFooter() {
  return (
    <footer
      className="px-5 pb-8 pt-14 sm:px-8 lg:px-14 lg:pb-8 lg:pt-16"
      style={{ background: "#07080f", color: "#f5f5f0", fontFamily: DISPLAY }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
          {/* Brand */}
          <div className="order-2 lg:order-1">
            <Link
              to="/"
              aria-label="TODO Growth, home"
              className="mb-5 inline-flex min-h-[44px] items-center gap-3"
            >
              <img src={LOGO} alt="" width={44} height={44} />
              <span className="text-xl font-bold tracking-[-0.02em]">
                TODO <span className="font-medium text-white/60">Growth</span>
              </span>
            </Link>
            <p className="text-[15px] leading-7 text-white/75">{COMPANY.positioning}</p>
            <p
              className="mt-2 text-xs uppercase tracking-[0.14em] text-white/50"
              style={{ fontFamily: MONO }}
            >
              Rwanda · East Africa
            </p>
          </div>

          {/* Closing call to action */}
          <div className="order-1 lg:order-2">
            <h2
              className="mb-4"
              style={{
                fontWeight: 700,
                fontSize: "clamp(2.6rem, 5vw, 4.4rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.045em",
              }}
            >
              Ready to grow?
            </h2>
            <p className="mb-7 max-w-md text-base leading-7 text-white/75">
              Tell us what you want to improve and we'll recommend the right next step.
            </p>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <Link
                to="/discovery"
                className="inline-flex min-h-[50px] w-fit items-center gap-2 whitespace-nowrap rounded-full bg-[#E8C547] px-7 text-[13px] font-bold uppercase tracking-[0.07em] text-[#0b0d17] transition-[background-color,transform] hover:-translate-y-0.5 hover:bg-[#F0CF5A]"
              >
                Book a Discovery Call <ArrowRight size={15} />
              </Link>
              <ul className="flex flex-wrap gap-x-6 gap-y-1 text-[15px]">
                <li>
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="inline-flex min-h-[44px] items-center text-white/85 underline decoration-white/25 underline-offset-[6px] transition-colors hover:text-[#E8C547] hover:decoration-[#E8C547]"
                  >
                    {COMPANY.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${COMPANY.phoneTel}`}
                    className="inline-flex min-h-[44px] items-center text-white/85 underline decoration-white/25 underline-offset-[6px] transition-colors hover:text-[#E8C547] hover:decoration-[#E8C547]"
                  >
                    {COMPANY.phoneDisplay}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div
          className="mt-12 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.12em] text-white/50"
          style={{ fontFamily: MONO }}
        >
          © {new Date().getFullYear()} {COMPANY.legalName} · {COMPANY.city}
        </div>
      </div>
    </footer>
  );
}
