"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  sx: number;
  sy: number;
  phase: number;
};

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function SignatureCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const random = seededRandom(872612);
    let points: Point[] = [];
    let frame = 0;
    let width = 0;
    let height = 0;
    let startedAt = performance.now();

    const buildPoints = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(260, Math.floor(rect.width));
      height = Math.max(220, Math.floor(rect.height));
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const offscreen = document.createElement("canvas");
      const offscreenContext = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offscreenContext) return;

      offscreen.width = width;
      offscreen.height = height;
      offscreenContext.fillStyle = "#ffffff";
      offscreenContext.textAlign = "center";
      offscreenContext.textBaseline = "middle";
      offscreenContext.font = `600 ${Math.max(34, width / 12)}px Inter, Arial, sans-serif`;
      offscreenContext.fillText("NXTECHELON", width / 2, height / 2);

      const image = offscreenContext.getImageData(0, 0, width, height).data;
      const nextPoints: Point[] = [];
      const step = width < 520 ? 7 : 6;

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const alpha = image[(y * width + x) * 4 + 3];
          if (alpha > 80 && random() > 0.22) {
            const angle = random() * Math.PI * 2;
            const distance = width * (0.26 + random() * 0.34);
            nextPoints.push({
              x,
              y,
              sx: width / 2 + Math.cos(angle) * distance,
              sy: height / 2 + Math.sin(angle) * distance * 0.62,
              phase: random() * Math.PI * 2,
            });
          }
        }
      }

      points = nextPoints.slice(0, 1800);
      startedAt = performance.now();
    };

    const draw = (now: number) => {
      context.clearRect(0, 0, width, height);
      const progress = reduced ? 1 : Math.min(1, (now - startedAt) / 1500);
      const settled = easeOutExpo(progress);
      const idle = Math.max(0, now - startedAt - 1500) / 1000;

      context.fillStyle = "rgba(169, 207, 203, 0.92)";
      for (const point of points) {
        const drift = reduced ? 0 : Math.sin(idle * 0.45 + point.phase) * 1.45;
        const x = point.sx + (point.x - point.sx) * settled + drift;
        const y = point.sy + (point.y - point.sy) * settled + drift * 0.38;
        context.globalAlpha = 0.18 + settled * 0.82;
        context.beginPath();
        context.arc(x, y, width < 520 ? 1 : 1.15, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 0.16;
      context.strokeStyle = "rgba(169, 207, 203, 0.42)";
      context.lineWidth = 1;
      for (let index = 0; index < points.length; index += 26) {
        const point = points[index];
        const next = points[index + 8];
        if (!next) continue;
        const x = point.sx + (point.x - point.sx) * settled;
        const y = point.sy + (point.y - point.sy) * settled;
        const nx = next.sx + (next.x - next.sx) * settled;
        const ny = next.sy + (next.y - next.sy) * settled;
        if (Math.hypot(nx - x, ny - y) < 58) {
          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(nx, ny);
          context.stroke();
        }
      }
      context.globalAlpha = 1;

      if (!reduced) {
        frame = requestAnimationFrame(draw);
      }
    };

    buildPoints();
    frame = requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      buildPoints();
      frame = requestAnimationFrame(draw);
    });

    resizeObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      width={900}
      height={340}
      className="signature-canvas"
    />
  );
}
