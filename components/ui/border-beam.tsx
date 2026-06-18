"use client";

import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

/**
 * BorderBeam
 *
 * A masked conic-gradient ring. This avoids `offset-path` and SVG dash
 * tiling quirks, both of which can render as broken border fragments in
 * Chromium when the parent is responsive.
 */
export function BorderBeam({
  className,
  size = 220,
  duration = 12,
  anchor = 300,
  borderWidth = 1.5,
  colorFrom = "var(--signal)",
  colorTo = "var(--petrol)",
  delay = 0,
}: BorderBeamProps) {
  const beamWidth = Math.max(18, Math.min(42, size / 8));
  const start = anchor;
  const mid = anchor + beamWidth * 0.55;
  const end = anchor + beamWidth;

  return (
    <div
      aria-hidden
      style={
        {
          "--duration": duration,
          "--delay": `-${delay}s`,
          "--border-width": `${borderWidth}px`,
          "--beam-start": `${start}deg`,
          "--beam-mid": `${mid}deg`,
          "--beam-end": `${end}deg`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--beam-fill": "var(--secondary)",
        } as CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 z-0 rounded-[inherit] border border-transparent",
        "animate-border-beam [animation-delay:var(--delay)]",
        "[border-width:var(--border-width)]",
        "[background:linear-gradient(var(--beam-fill),var(--beam-fill))_padding-box,conic-gradient(from_var(--beam-angle),transparent_0deg,transparent_var(--beam-start),var(--color-to)_var(--beam-mid),var(--color-from)_var(--beam-end),transparent_calc(var(--beam-end)+12deg),transparent_360deg)_border-box]",
        className,
      )}
    />
  );
}
