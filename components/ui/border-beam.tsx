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
 * BorderBeam — Magic UI's animated conic beam, rebuilt to use brand tokens.
 * A single span of color sweeps around the parent's border, tracing the edge
 * deterministically (no random sparkle). Colors default to Signal → Petrol so
 * the beam reads as the brand, not as a neon SaaS effect.
 *
 * Drop into any container with `position: relative` and a border-radius:
 *   <div className="relative rounded-xl overflow-hidden">
 *     <BorderBeam />
 *     {children}
 *   </div>
 */
export function BorderBeam({
  className,
  size = 220,
  duration = 12,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "var(--signal)",
  colorTo = "var(--petrol)",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": size,
          "--duration": duration,
          "--anchor": anchor,
          "--border-width": borderWidth,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as CSSProperties
      }
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        "[border:calc(var(--border-width)*1px)_solid_transparent]",
        "![mask-clip:padding-box,border-box] ![mask-composite:intersect]",
        "[mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]",
        "after:absolute after:aspect-square after:w-[calc(var(--size)*1px)]",
        "after:animate-border-beam after:[animation-delay:var(--delay)]",
        "after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)]",
        "after:[offset-anchor:calc(var(--anchor)*1%)_50%]",
        "after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]",
        className,
      )}
    />
  );
}
