import { useEffect, useRef } from "react";
import LOGO from "@/assets/logo-192.webp";
import { STAGES, type StageId } from "@/content/site";
import { useInView, usePrefersReducedMotion } from "./ui";

// TODO at the hub; each service sits on the arc of its growth stage.
// Angles are in degrees, 0 = right, clockwise (canvas coordinates).
const NODES: { label: string; stage: StageId; angle: number; major?: boolean }[] = [
  { label: "Branding", stage: "present", angle: -150 },
  { label: "Websites", stage: "present", angle: -112 },
  { label: "Content", stage: "attract", angle: -68 },
  { label: "Marketing", stage: "attract", angle: -36 },
  { label: "Virtual Tours", stage: "attract", angle: -4 },
  { label: "Sales", stage: "convert", angle: 38 },
  { label: "Reputation", stage: "convert", angle: 72 },
  { label: "Microsoft & AI", stage: "operate", angle: 132, major: true },
];

const ARCS: Record<StageId, [number, number]> = {
  present: [-166, -96],
  attract: [-84, 12],
  convert: [24, 88],
  operate: [104, 160],
};

const STAGE_COLOR = Object.fromEntries(STAGES.map((s) => [s.id, s.color])) as Record<
  StageId,
  string
>;
const STAGE_LABEL = Object.fromEntries(STAGES.map((s) => [s.id, s.label])) as Record<
  StageId,
  string
>;

const rgba = (hex: string, a: number) =>
  `rgba(${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)},${a})`;
const rad = (d: number) => (d * Math.PI) / 180;

/**
 * `compact`: the mobile hero version. Same system (logo hub, stage arcs and
 * colors, nodes, pulse) with the per-service labels removed and a larger hub,
 * so it reads clearly at ~220px.
 */
export function GrowthDiagram({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { ref: wrapRef, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const logo = new Image();
    logo.src = LOGO;

    let raf = 0;
    const start = performance.now();

    const size = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return r.width;
    };
    let W = size();

    const draw = (now: number) => {
      // rAF timestamps can precede `start` slightly; never let time go negative.
      const t = Math.max(0, now - start) / 1000;
      const cx = W / 2;
      const cy = W / 2;
      const R = W * (compact ? 0.3 : 0.34);
      const small = W < 420;
      ctx.clearRect(0, 0, W, W);

      // Stage arcs + stage labels
      (Object.keys(ARCS) as StageId[]).forEach((st) => {
        const [a0, a1] = ARCS[st];
        ctx.beginPath();
        ctx.arc(cx, cy, R, rad(a0), rad(a1));
        ctx.strokeStyle = rgba(STAGE_COLOR[st], 0.55);
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();

        const mid = rad((a0 + a1) / 2);
        const lr = R + W * (compact ? 0.155 : small ? 0.13 : 0.12);
        ctx.font = `600 ${small ? 11 : 12}px "Space Mono", monospace`;
        ctx.fillStyle = rgba(STAGE_COLOR[st], 0.95);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          STAGE_LABEL[st].toUpperCase(),
          cx + Math.cos(mid) * lr,
          cy + Math.sin(mid) * lr,
        );
      });

      // Spokes + active pulse
      const active = Math.floor(t / 1.1) % NODES.length; // t >= 0, so always a valid index
      const p = (t % 1.1) / 1.1;
      NODES.forEach((n, i) => {
        const x = cx + Math.cos(rad(n.angle)) * R;
        const y = cy + Math.sin(rad(n.angle)) * R;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle =
          i === active && !reduced ? rgba(STAGE_COLOR[n.stage], 0.5) : "rgba(255,255,255,0.07)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });
      if (!reduced) {
        const n = NODES[active];
        const x = cx + Math.cos(rad(n.angle)) * R * p;
        const y = cy + Math.sin(rad(n.angle)) * R * p;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = STAGE_COLOR[n.stage];
        ctx.shadowBlur = 12;
        ctx.shadowColor = STAGE_COLOR[n.stage];
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Service nodes + labels
      NODES.forEach((n) => {
        const a = rad(n.angle);
        const x = cx + Math.cos(a) * R;
        const y = cy + Math.sin(a) * R;
        const c = STAGE_COLOR[n.stage];
        const r = n.major ? W * 0.034 : W * (compact ? 0.024 : 0.018);

        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
        g.addColorStop(0, rgba(c, 0.3));
        g.addColorStop(1, rgba(c, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(c, n.major ? 0.9 : 0.22);
        ctx.fill();
        ctx.strokeStyle = rgba(c, 0.9);
        ctx.lineWidth = 1.2;
        ctx.stroke();

        if (n.major) {
          ctx.save();
          ctx.translate(x, y);
          if (!reduced) ctx.rotate(t * 0.3);
          ctx.setLineDash([4, 5]);
          ctx.beginPath();
          ctx.arc(0, 0, r * 1.6, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(c, 0.6);
          ctx.stroke();
          ctx.restore();
        }

        if (compact) return; // stage labels carry the meaning at this size

        // Labels sit on the inside of the ring so they never clip.
        const inward = R - r - (small ? 12 : 16);
        const lx = cx + Math.cos(a) * inward;
        const ly = cy + Math.sin(a) * inward;
        ctx.font = `${n.major ? "700 " : ""}${small ? 11 : n.major ? 14 : 13}px "Space Grotesk", sans-serif`;
        ctx.fillStyle = n.major ? c : "rgba(245,245,240,0.88)";
        // Nodes near the top/bottom get centered labels so neighbours never collide.
        const vertical = Math.abs(Math.sin(a)) > 0.7;
        ctx.textAlign = vertical ? "center" : Math.cos(a) > 0 ? "right" : "left";
        ctx.textBaseline = Math.sin(a) > 0.35 ? "bottom" : Math.sin(a) < -0.35 ? "top" : "middle";
        ctx.fillText(n.label, lx, ly);
      });

      // Hub: the TODO logo, unchanged, on a soft yellow halo
      const hub = W * (compact ? 0.1 : 0.075);
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, hub * 2.6);
      halo.addColorStop(0, "rgba(232,197,71,0.22)");
      halo.addColorStop(1, "rgba(232,197,71,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, hub * 2.6, 0, Math.PI * 2);
      ctx.fill();
      if (logo.complete && logo.naturalWidth) {
        ctx.drawImage(logo, cx - hub, cy - hub, hub * 2, hub * 2);
      }
    };

    // One animation loop per effect run. Resize and logo-load only redraw a
    // single frame; they never start a second loop.
    let stopped = false;
    const loop = (now: number) => {
      if (stopped) return;
      draw(now);
      if (!reduced && inView) raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(() => {
      W = size();
      draw(performance.now());
    });
    ro.observe(canvas);
    logo.onload = () => draw(performance.now());
    raf = requestAnimationFrame(loop);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      logo.onload = null;
    };
  }, [inView, reduced, compact]);

  return (
    <div ref={wrapRef} className={`relative aspect-square w-full ${className}`}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="TODO Growth at the center of eight services, grouped into four stages: Present, Attract, Convert and Operate."
        className="block h-full w-full"
      />
    </div>
  );
}
