import type { MediaAsset } from "@/content/media";
import { MediaSlot, F } from "./ui";

/** A real website screenshot inside a minimal browser window. */
export function BrowserShot({
  media,
  domain,
  className = "",
  sizes = "(min-width: 1024px) 60vw, 100vw",
  priority = false,
}: {
  media: MediaAsset;
  domain: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 ${className}`}
      style={{ background: "#0e1120", boxShadow: "0 40px 90px -20px rgba(0,0,0,0.6)" }}
    >
      <div
        className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5"
        aria-hidden="true"
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full bg-white/15" />
          ))}
        </div>
        <div
          className="flex-1 truncate rounded-md bg-white/[0.06] px-3 py-1 text-xs text-white/60"
          style={{ fontFamily: F.mono }}
        >
          {domain}
        </div>
      </div>
      <MediaSlot
        media={media}
        aspect="16 / 10"
        rounded="rounded-none"
        position="top"
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}

/** A real mobile screenshot inside a simple phone outline. */
export function PhoneShot({ media, className = "" }: { media: MediaAsset; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[28px] border-[6px] border-[#1a1d2b] ${className}`}
      style={{ background: "#0e1120", boxShadow: "0 30px 70px -15px rgba(0,0,0,0.7)" }}
    >
      <MediaSlot
        media={media}
        aspect="390 / 844"
        rounded="rounded-none"
        position="top"
        sizes="220px"
      />
    </div>
  );
}
