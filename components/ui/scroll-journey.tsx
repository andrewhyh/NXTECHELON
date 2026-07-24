"use client";

import { useEffect, useRef } from "react";

interface Scene {
  start: number;
  end: number;
  content: React.ReactNode;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  bokeh: boolean;
  ci: number;
}

const DEPTH = 2400;
const FOV = 700;
const N_DUST = 500;
const N_BOKEH = 24;

type RGB = readonly [number, number, number];

const C = {
  ink: [38, 44, 52] as RGB,
  paper: [244, 246, 248] as RGB,
  petrol: [55, 115, 132] as RGB,
  deep: [32, 72, 86] as RGB,
  signal: [225, 135, 45] as RGB,
};

function mix(a: RGB, b: RGB, t: number): string {
  return `rgb(${(a[0] + (b[0] - a[0]) * t) | 0},${(a[1] + (b[1] - a[1]) * t) | 0},${(a[2] + (b[2] - a[2]) * t) | 0})`;
}

const bgStops: { at: number; c: RGB }[] = [
  { at: 0, c: C.ink },
  { at: 0.12, c: C.deep },
  { at: 0.3, c: C.petrol },
  { at: 0.5, c: C.deep },
  { at: 0.7, c: C.ink },
  { at: 0.85, c: C.deep },
  { at: 1, c: C.ink },
];

function bgColor(p: number): string {
  let i = 0;
  while (i < bgStops.length - 1 && bgStops[i + 1].at <= p) i++;
  if (i >= bgStops.length - 1) return mix(bgStops[i].c, bgStops[i].c, 0);
  const t = (p - bgStops[i].at) / (bgStops[i + 1].at - bgStops[i].at);
  return mix(bgStops[i].c, bgStops[i + 1].c, t);
}

const pColors: RGB[] = [C.paper, C.paper, C.petrol, C.signal, C.paper];

function makeParticles(): Particle[] {
  const out: Particle[] = [];
  for (let i = 0; i < N_DUST; i++) {
    out.push({
      x: (Math.random() - 0.5) * 1800,
      y: (Math.random() - 0.5) * 1800,
      z: Math.random() * DEPTH,
      size: Math.random() * 1.5 + 0.4,
      bokeh: false,
      ci: (Math.random() * pColors.length) | 0,
    });
  }
  for (let i = 0; i < N_BOKEH; i++) {
    out.push({
      x: (Math.random() - 0.5) * 1200,
      y: (Math.random() - 0.5) * 1200,
      z: Math.random() * DEPTH,
      size: Math.random() * 14 + 6,
      bokeh: true,
      ci: (Math.random() * pColors.length) | 0,
    });
  }
  return out;
}

function sceneOpacity(p: number, s: number, e: number): number {
  if (p < s || p > e) return 0;
  const d = e - s;
  const fi = s + d * 0.18;
  const fo = e - d * 0.18;
  if (p < fi) return (p - s) / (fi - s);
  if (p > fo) return (e - p) / (e - fo);
  return 1;
}

export function ScrollJourney({
  videoSrc,
  scenes,
}: {
  videoSrc?: string;
  scenes: Scene[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayEls = useRef<(HTMLDivElement | null)[]>([]);
  const promptRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const dotEls = useRef<(HTMLButtonElement | null)[]>([]);
  const progress = useRef(-1);
  const activeScene = useRef(-1);
  const pts = useRef<Particle[]>([]);

  function draw() {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d", { alpha: false });
    if (!ctx) return;

    const w = cvs.width;
    const h = cvs.height;
    const cx = w / 2;
    const cy = h / 2;
    const p = progress.current;
    const camZ = p * DEPTH;

    ctx.fillStyle = bgColor(p);
    ctx.fillRect(0, 0, w, h);

    const gr = Math.min(w, h) * 0.5;
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, gr);
    const gp = Math.sin(p * Math.PI);
    glow.addColorStop(0, `rgba(55,115,132,${(0.14 + gp * 0.1).toFixed(3)})`);
    glow.addColorStop(0.6, `rgba(225,135,45,${(0.04 * gp).toFixed(3)})`);
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    const all = pts.current;
    const cutoff = DEPTH * 0.8;
    for (let i = 0; i < all.length; i++) {
      const pt = all[i];
      let rz = ((pt.z - camZ) % DEPTH + DEPTH) % DEPTH;
      if (rz < 1) rz = 1;
      if (rz > cutoff) continue;

      const sc = FOV / rz;
      const sx = cx + pt.x * sc;
      const sy = cy + pt.y * sc;
      if (sx < -120 || sx > w + 120 || sy < -120 || sy > h + 120) continue;

      const sz = pt.size * sc;
      const fog = 1 - rz / cutoff;
      const c = pColors[pt.ci];

      if (pt.bokeh) {
        ctx.globalAlpha = fog * fog * 0.07;
        ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(1, sz), 0, 6.2832);
        ctx.fill();
      } else {
        ctx.globalAlpha = fog * fog * 0.85;
        ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.3, sz), 0, 6.2832);
        ctx.fill();
        if (sz > 2.5) {
          ctx.globalAlpha = fog * 0.1;
          ctx.beginPath();
          ctx.arc(sx, sy, sz * 3, 0, 6.2832);
          ctx.fill();
        }
      }
    }

    ctx.globalAlpha = 1;
    const vig = ctx.createRadialGradient(
      cx,
      cy,
      Math.min(w, h) * 0.32,
      cx,
      cy,
      Math.max(w, h) * 0.78,
    );
    vig.addColorStop(0, "transparent");
    vig.addColorStop(1, "rgba(20,24,28,0.55)");
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;
  }

  useEffect(() => {
    pts.current = makeParticles();

    const cvs = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resize = () => {
      if (cvs) {
        cvs.width = window.innerWidth * dpr;
        cvs.height = window.innerHeight * dpr;
      }
      if (!videoSrc) draw();
    };
    resize();

    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / scrollable));

      if (Math.abs(p - progress.current) < 0.0001) return;
      progress.current = p;

      if (videoRef.current?.duration) {
        videoRef.current.currentTime = p * videoRef.current.duration;
      }

      if (!videoSrc && !reducedMotion) draw();

      for (let i = 0; i < scenes.length; i++) {
        const div = overlayEls.current[i];
        if (!div) continue;
        const o = sceneOpacity(p, scenes[i].start, scenes[i].end);
        div.style.opacity = String(o);
        div.style.pointerEvents = o > 0.1 ? "auto" : "none";
      }

      let active = -1;
      for (let i = 0; i < scenes.length; i++) {
        if (p >= scenes[i].start && p <= scenes[i].end) {
          active = i;
          break;
        }
      }
      if (active !== activeScene.current) {
        activeScene.current = active;
        for (let i = 0; i < scenes.length; i++) {
          const dot = dotEls.current[i];
          if (!dot) continue;
          if (i === active) {
            dot.style.backgroundColor = "rgb(225,135,45)";
            dot.style.borderColor = "rgb(225,135,45)";
          } else {
            dot.style.backgroundColor = "rgba(244,246,248,0.2)";
            dot.style.borderColor = "rgba(244,246,248,0.4)";
          }
        }
      }

      if (promptRef.current) {
        promptRef.current.style.opacity = p < 0.02 ? "1" : "0";
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleY(${p})`;
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [scenes, videoSrc]);

  const scrollToScene = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const scrollable = el.offsetHeight - window.innerHeight;
    const mid = (scenes[i].start + scenes[i].end) / 2;
    window.scrollTo({
      top: el.offsetTop + scrollable * mid,
      behavior: "smooth",
    });
  };

  return (
    <div ref={containerRef} className="relative" style={{ height: "600vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[rgb(38,44,52)]">
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        )}

        {scenes.map((scene, i) => (
          <div
            key={i}
            ref={(el) => {
              overlayEls.current[i] = el;
            }}
            className="absolute inset-0 flex items-center justify-center px-6 sm:px-10"
            style={{
              opacity: 0,
              pointerEvents: "none",
              transition: "opacity 80ms linear",
            }}
          >
            {scene.content}
          </div>
        ))}

        <div className="absolute right-0 top-0 h-full w-[3px]">
          <div
            ref={barRef}
            className="h-full w-full origin-top bg-signal/70"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        <nav
          aria-label="Journey sections"
          className="absolute right-5 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 sm:flex"
        >
          {scenes.map((_, i) => (
            <button
              key={i}
              ref={(el) => {
                dotEls.current[i] = el;
              }}
              onClick={() => scrollToScene(i)}
              className="h-2.5 w-2.5 rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
              style={{
                backgroundColor: "rgba(244,246,248,0.2)",
                borderColor: "rgba(244,246,248,0.4)",
              }}
              aria-label={`Go to scene ${i + 1}`}
            />
          ))}
        </nav>

        <div
          ref={promptRef}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center transition-opacity duration-500"
        >
          <p className="text-[0.85rem] font-medium tracking-wide text-paper/60">
            Scroll to explore
          </p>
          <div className="mx-auto mt-2 h-8 w-[1.5px] animate-pulse bg-paper/30" />
        </div>
      </div>
    </div>
  );
}
