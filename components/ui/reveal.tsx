"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reveal — a single, consistent scroll-into-view choreography for the page.
 *
 * One reveal motion is fine; eight different reveals per page is the AI
 * monoculture tell. This composes ALL scroll reveals on the landing page so
 * the rhythm stays coherent. The choreography is exponential ease-out, brief
 * (520ms), with a small Y translate (24px) — decisive, not theatrical.
 *
 * Under `prefers-reduced-motion: reduce`, the element renders in its final
 * state on first paint. Content is never gated on the animation completing,
 * so headless / preview renderers see a fully-populated page.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: 0.52,
        delay,
        ease: [0.16, 1, 0.3, 1], // ease-out-quint
      }}
    >
      {children}
    </motion.div>
  );
}
