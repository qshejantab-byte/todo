
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PageShell } from "@/components/PageShell";
import {
  ArrowRight,
  Sparkles,
  Megaphone,
  Camera,
  Star,
  Bot,
} from "lucide-react";

interface GraphNode {
  id: string;
  x: number;
  y: number;
  label: string;
  color: string;
  size: number;
  ring: boolean;
}

interface GraphEdge {
  from: number;
  to: number;
}

const NODES: GraphNode[] = [
  { id: "core", x: 50, y: 50, label: "TODO", color: "#E8C547", size: 13, ring: true },
  { id: "brand", x: 22, y: 22, label: "Branding", color: "#5DD6B3", size: 8, ring: false },
  { id: "marketing", x: 78, y: 20, label: "Marketing", color: "#C8A8E9", size: 8, ring: false },
  { id: "content", x: 82, y: 68, label: "Content", color: "#E87D7D", size: 8, ring: false },
  { id: "rep", x: 20, y: 72, label: "Reputation", color: "#7DB8E8", size: 8, ring: false },
  { id: "ai", x: 50, y: 88, label: "AI Ops", color: "#E8C547", size: 8, ring: false },
];

const EDGES: GraphEdge[] = [
  { from: 0, to: 1 },
  { from: 0, to: 2 },
  { from: 0, to: 3 },
  { from: 0, to: 4 },
  { from: 0, to: 5 },
];

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function EcosystemCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let pulseEdge = 0;
    let pulseT = 0;
    let lastSwitch = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (now: number) => {
      const dpr = window.devicePixelRatio || 1;

      const W = canvas.width / dpr;
      const H = canvas.height / dpr;

      const sc = Math.min(W, H) / 100;
      const t = now / 1000;

      const since = now - lastSwitch;

      pulseT = since / 900;

      if (pulseT >= 1) {
        pulseT = 0;
        pulseEdge = (pulseEdge + 1) % EDGES.length;
        lastSwitch = now;
      }

      ctx.clearRect(0, 0, W, H);

      const pos = NODES.map((n, i) => ({
        x: n.x * sc,
        y:
          n.y * sc +
          (i === 0
            ? Math.sin(t * 0.8) * 1.5 * sc
            : Math.sin(t * 0.6 + n.x * 0.1) * 0.8 * sc),
      }));

      EDGES.forEach((e, i) => {
        const a = pos[e.from];
        const b = pos[e.to];

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);

        ctx.strokeStyle =
          i === pulseEdge
            ? "rgba(93,214,179,0.7)"
            : "rgba(255,255,255,0.08)";

        ctx.lineWidth = i === pulseEdge ? 1 : 0.5;

        ctx.stroke();
      });

      const pe = EDGES[pulseEdge];
      const pa = pos[pe.from];
      const pb = pos[pe.to];

      const dotX = pa.x + (pb.x - pa.x) * pulseT;
      const dotY = pa.y + (pb.y - pa.y) * pulseT;

      ctx.beginPath();
      ctx.arc(dotX, dotY, sc * 0.8, 0, Math.PI * 2);

      ctx.fillStyle = "#5DD6B3";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#5DD6B3";

      ctx.fill();

      ctx.shadowBlur = 0;

      NODES.forEach((n, i) => {
        const { x, y } = pos[i];

        const r = n.size * sc * 0.42;

        const [nr, ng, nb] = hexToRgb(n.color);

        const rgba = (a: number) => `rgba(${nr}, ${ng}, ${nb}, ${a})`;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 2.5);

        grad.addColorStop(0, rgba(0.35));
        grad.addColorStop(1, rgba(0));

        ctx.beginPath();
        ctx.arc(x, y, r * 2.5, 0, Math.PI * 2);

        ctx.fillStyle = grad;
        ctx.fill();

        if (n.ring) {
          ctx.save();

          ctx.translate(x, y);
          ctx.rotate(t * 0.25);

          ctx.beginPath();
          ctx.arc(0, 0, r * 1.7, 0, Math.PI * 2);

          ctx.strokeStyle = rgba(0.45);
          ctx.lineWidth = 1;

          ctx.setLineDash([4, 4]);

          ctx.stroke();

          ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);

        if (n.id === "core") {
          ctx.fillStyle = n.color;
          ctx.fill();
        } else {
          ctx.fillStyle = rgba(0.15);
          ctx.fill();

          ctx.strokeStyle = rgba(0.8);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        const fontSize =
          W < 400
            ? n.id === "core"
              ? 12
              : 9
            : n.id === "core"
              ? 16
              : 11;

        ctx.fillStyle = n.id === "core" ? "#0d0f1a" : rgba(0.92);

        ctx.font = `${n.id === "core" ? "bold " : ""
          }${fontSize}px Space Mono`;

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText(n.label, x, y + r + 18);
      });

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full block"
    />
  );
}

function Counter({
  to,
  suffix = "",
}: {
  to: number;
  suffix?: string;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let cur = 0;

    const step = () => {
      cur = Math.min(cur + Math.ceil(to / 35), to);

      setVal(cur);

      if (cur < to) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [to]);

  return (
    <span>
      {val}
      {suffix}
    </span>
  );
}

const CORES = [
  {
    icon: Sparkles,
    label: "Branding",
    desc: "Identity systems that command attention.",
    color: "#5DD6B3",
  },
  {
    icon: Megaphone,
    label: "Marketing Systems",
    desc: "Strategy structures built to scale.",
    color: "#C8A8E9",
  },
  {
    icon: Camera,
    label: "Content Production",
    desc: "Visuals that stop scrolls and start sales.",
    color: "#E87D7D",
  },
  {
    icon: Star,
    label: "Reputation Management",
    desc: "Trust systems that convert visitors.",
    color: "#7DB8E8",
  },
  {
    icon: Bot,
    label: "Microsoft Systems ",
    desc: "Integrating Microsoft ecosystem to your business ",
    color: "#E8C547",
  },
];

// const STATS = [
//   { to: 5, suffix: "+", label: "Core Systems" },
//   { to: 40, suffix: "+", label: "Assets / Month" },
//   { to: 3, suffix: "x", label: "Avg. Growth" },
// ];

export default function HomePage() {
  return (
    <PageShell>
      <Helmet>
        <title>
          TODO Growth — Growth Infrastructure for Ambitious Brands
        </title>

        <style>{`
@keyframes h - up {
            from {
    opacity: 0;
    transform: translateY(18px);
  }
            to {
    opacity: 1;
    transform: translateY(0);
  }
}

          .anim - up {
  animation: h - up .7s cubic - bezier(.22, 1, .36, 1) both;
}
`}</style>
      </Helmet>

      <section
        className="
          relative
          overflow-hidden
          bg-[#0d0f1a]
        "
        style={{
          minHeight: "calc(100svh - 78px)",
          background:
            "linear-gradient(135deg,#0d0f1a 0%,#111827 55%,#0a0f1e 100%)",
        }}
      >
        {/* background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="
              absolute
              left-[-10%]
              top-[-10%]
              h-[50vw]
              w-[50vw]
              rounded-full
            "
            style={{
              background:
                "radial-gradient(circle,rgba(93,214,179,0.08) 0%,transparent 70%)",
            }}
          />

          <div
            className="
              absolute
              bottom-0
              right-[-5%]
              h-[45vw]
              w-[45vw]
              rounded-full
            "
            style={{
              background:
                "radial-gradient(circle,rgba(200,168,233,0.08) 0%,transparent 70%)",
            }}
          />
        </div>

        <div
          className="
            relative
            z-10
            mx-auto
            grid
            max-w-7xl
            grid-cols-1
            items-center
            gap-10
            px-5
            py-14
            sm:px-8
            md:px-10
            lg:min-h-[calc(100svh-78px)]
            lg:grid-cols-2
            lg:gap-14
            lg:px-14
            xl:px-20
          "
        >
          {/* LEFT */}
          <div className="flex flex-col justify-center">
            <div
              className="anim-up mb-6 flex items-center gap-3"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="h-[2px] w-6 rounded bg-[#5DD6B3]" />

              <span
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.22em]
                  text-[#5DD6B3]
                  sm:text-[11px]
                "
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                Kigali, Rwanda — Growth Infrastructure
              </span>
            </div>

<h1
  className="mb-6 leading-[1.05] tracking-[-0.05em] text-[#f5f5f0]"
  style={{
    fontFamily: "Space Grotesk, sans-serif",
    fontSize: "clamp(2rem, 7vw, 5rem)",
  }}
>
  {/* Line 1: Brand better. */}
  <span
    className="text-[#E8C547] font-bold"
    style={{ WebkitTextStroke: "1.5px var(--navy)" }}
  >
    Brand
  </span>{" "}
  better.
  <br />

  {/* Line 2: Market smarter. — forced onto one line */}
  <span className="whitespace-nowrap">
    {"Market "}
    <span className="text-teal italic font-medium">
      smarter.
    </span>
  </span>
  <br />

  {/* Line 3: Microsoft integration. */}
  <span className="whitespace-nowrap">
    {"Microsoft "}
    <span
      className="text-pink font-bold"
      style={{ fontSize: "clamp(2rem, 7vw, 5rem)" }}
    >
      integrations.
    </span>
  </span>
</h1>
            <p
              className="
                mb-8
                max-w-xl
                text-sm
                leading-8
                text-white/50
                sm:text-[15px]
              "
            >
              TODO helps businesses improve presentation, visibility, customer trust, and internal coordination through branding, content systems, reputation management, and automation workflows.
            </p>

            <div
              className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
              "
            >
              <Link
                to="/packages"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#E8C547]
                  px-7
                  py-4
                  text-center
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.08em]
                  text-[#0d0f1a]
                  shadow-[0_0_24px_rgba(232,197,71,0.35)]
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  hover:shadow-[0_0_40px_rgba(232,197,71,0.55)]
                  sm:w-auto
                "
                style={{
                  fontFamily: "Space Grotesk,sans-serif",
                }}
              >
                View Packages
                <ArrowRight size={15} />
              </Link>

              <Link
                to="/discovery"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-[11px]
                  uppercase
                  tracking-[0.14em]
                  text-white/60
                  transition-colors
                  hover:text-[#5DD6B3]
                "
                style={{
                  fontFamily: "Space Mono, monospace",
                }}
              >
                Book Discovery Session →
              </Link>
            </div>

            {/* stats */}
            {/* <div
              className="
                mt-12
                grid
                grid-cols-3
                gap-5
                sm:flex
                sm:flex-wrap
                sm:gap-10
              "
            >
              {STATS.map((s) => (
                <div key={s.label}>
                  <div
                    className="
                      text-[1.6rem]
                      font-extrabold
                      leading-none
                      tracking-[-0.03em]
                      text-[#E8C547]
                      sm:text-[2.3rem]
                    "
                    style={{
                      fontFamily: "Space Grotesk,sans-serif",
                    }}
                  >
                    <Counter
                      to={s.to}
                      suffix={s.suffix}
                    />
                  </div>

                  <div
                    className="
                      mt-1
                      text-[9px]
                      uppercase
                      tracking-[0.18em]
                      text-white/35
                      sm:text-[10px]
                    "
                    style={{
                      fontFamily: "Space Mono, monospace",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div> */}
          </div>

          {/* RIGHT */}
          <div
            className="
              relative
              flex
              items-center
              justify-center
              py-6
              lg:py-0
            "
          >
            <div
              className="
                absolute
                inset-[8%]
                rounded-full
              "
              style={{
                background:
                  "radial-gradient(circle,rgba(93,214,179,0.06) 0%,transparent 70%)",
              }}
            />

            <div
              className="
                relative
                z-10
                aspect-square
                w-full
                max-w-[520px]
              "
            >
              <EcosystemCanvas />
            </div>
          </div>
        </div>
      </section>

      {/* CORE SYSTEMS */}
      <section
        className="
          border-t
          border-white/5
          bg-[#0d0f1a]
          px-5
          py-16
          sm:px-8
          md:px-10
          lg:px-14
          lg:py-24
        "
      >
        <div className="mx-auto max-w-7xl">
          <div
            className="
              mb-4
              text-[10px]
              uppercase
              tracking-[0.22em]
              text-[#5DD6B3]
            "
            style={{
              fontFamily: "Space Mono, monospace",
            }}
          >
            01 — Core Systems
          </div>

          <h2
            className="
              mb-12
              leading-none
              tracking-[-0.05em]
              text-[#f5f5f0]
            "
            style={{
              fontFamily: "Space Grotesk,sans-serif",
              fontSize: "clamp(2rem,6vw,4rem)",
            }}
          >
            Five systems.
            <br />
            <em className="font-light italic text-[#5DD6B3]">
              One growth engine.
            </em>
          </h2>

          <div
            className="
              grid
              gap-5
              sm:grid-cols-2
              xl:grid-cols-5
            "
          >
            {CORES.map((c) => (
              <div
                key={c.label}
                className="
                  rounded-2xl
                  border
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-1
                "
                style={{
                  borderColor: `${c.color} 30`,
                  background: `${c.color}08`,
                }}
              >
                <div
                  className="
                    mb-5
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                  "
                  style={{
                    background: `${c.color} 18`,
                    border: `1px solid ${c.color} 40`,
                  }}
                >
                  <c.icon
                    size={20}
                    color={c.color}
                  />
                </div>

                <div
                  className="
                    mb-2
                    text-base
                    font-bold
                    text-[#f5f5f0]
                  "
                  style={{
                    fontFamily: "Space Grotesk,sans-serif",
                  }}
                >
                  {c.label}
                </div>

                <div className="text-sm leading-7 text-white/45">
                  {c.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

