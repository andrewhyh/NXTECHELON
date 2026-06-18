"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, PhoneCall } from "lucide-react";
import { BeamButton } from "@/components/ui/beam-button";
import { Button } from "@/components/ui/button";

const loadIn = {
  hidden: { opacity: 0, y: -10 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const loadUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/**
 * NXTECHELON — Animated Hero.
 *
 * Editorial adaptation of the rotating-word hero pattern. Differences from the
 * stock v0/shadcn template (intentional, per PRODUCT.md / DESIGN.md):
 *
 *  - Source Serif 4 carries the headline (editorial advisor voice).
 *    Display letter-spacing tightened to -0.035em (≥ -0.04em brand floor).
 *  - Rotating phrase is italic in Signal Accent (warm oxide-orange) — the
 *    "One Voice Rule" moment: one accent color, one place, the eye lands on
 *    the dynamic element.
 *  - Hanken Grotesk on body copy and UI; no Inter (DESIGN.md reflex-reject).
 *  - Plain-English rotating phrases ("follow-up tools / booking systems / …"),
 *    written for a non-technical business owner (doctor / handyman /
 *    specialist) — not developer jargon, not template adjectives.
 *  - Single repeated primary CTA per BRIEF.md §2; a quiet ghost link sits
 *    beside it without competing visually.
 *  - Spring kept (the template's signature feel) but stiffness raised and
 *    damping introduced so the motion is decisive, not bouncy — the brand
 *    rule against bounce/elastic still holds for state changes; a one-shot
 *    rotation with a controlled spring reads as deliberate.
 */
function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const titles = useMemo(
    () => [
      "follow-up tools",
      "booking systems",
      "intake forms",
      "quote builders",
      "back-office tools",
    ],
    [],
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timeoutId = setTimeout(() => {
      setTitleNumber((current) => (current + 1) % titles.length);
    }, 2400);
    return () => clearTimeout(timeoutId);
  }, [prefersReducedMotion, titleNumber, titles.length]);

  return (
    <section className="relative w-full overflow-hidden bg-background text-foreground">
      {/* A single petrol vignette anchors the dark canvas without becoming a
          gradient surface — flat-by-default rule, allowed atmospheric depth. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_50%_-10%,oklch(0.42_0.075_200_/_0.35),transparent_60%)]"
      />

      <div className="container relative mx-auto px-6">
        <motion.div
          className="flex min-h-[92vh] flex-col items-center justify-center gap-10 py-24 lg:py-32"
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
        >
          {/* Headline — three-line editorial composition. The middle line
              rotates; the slot is reserved so the line never collapses. */}
          <motion.h1
            className="max-w-4xl text-center font-serif font-normal leading-[0.98] text-balance"
            variants={loadIn}
            custom={0.2}
          >
            <span className="block text-[clamp(2.5rem,7vw,5.25rem)] text-foreground">
              We ship the
            </span>

            <span className="relative my-1 block h-[1.05em] w-full overflow-hidden text-[clamp(2.5rem,7vw,5.25rem)] md:my-2">
              {/* Invisible spacer holds the line height while phrases rotate. */}
              <span aria-hidden className="invisible">
                {titles[titleNumber]}
              </span>

              {titles.map((title, index) => (
                <motion.span
                  key={title}
                  // data-rotating-phrase is matched by the noscript style
                  // block in app/layout.tsx so phrase 0 stays visible and the
                  // rest stay hidden under JS-disabled — preserves the
                  // BRIEF.md §6 "static finals of every kinetic moment" rule.
                  data-rotating-phrase={index}
                  className="absolute inset-x-0 italic text-signal"
                  style={{ fontWeight: 400 }}
                  initial={{ opacity: 0, y: 120 }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 90,
                          damping: 16,
                          mass: 0.9,
                        }
                  }
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : {
                          y: titleNumber > index ? -120 : 120,
                          opacity: 0,
                        }
                  }
                  aria-hidden={titleNumber !== index}
                >
                  {title}
                </motion.span>
              ))}
            </span>

            <span className="block text-[clamp(2.5rem,7vw,5.25rem)] text-foreground">
              you don&rsquo;t have time to build.
            </span>
          </motion.h1>

          {/* Sub — Hanken body, Vellum on dark for the second-priority voice. */}
          <motion.p
            className="max-w-2xl text-center font-sans text-lg leading-[1.55] text-muted-foreground md:text-xl"
            variants={loadIn}
            custom={0.4}
          >
            We build the everyday tools that save you and your team hours
            each week &mdash; the kind you&rsquo;d build yourself if you had a
            developer on staff. You run the business. The system handles the
            busywork.
          </motion.p>

          {/* CTAs — primary in Signal, quiet ghost link beside it. The two
              do not compete; the eye lands on the warm button first. */}
          <motion.div
            className="mt-2 flex flex-col items-center gap-4 sm:flex-row"
            variants={loadIn}
            custom={0.6}
          >
            <BeamButton
              size="lg"
              className="group h-12 gap-3 px-7 text-sm tracking-wide"
              data-booking-trigger
            >
              <PhoneCall className="h-4 w-4" strokeWidth={1.8} />
              Book a call
            </BeamButton>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="group h-12 gap-2 px-4 text-sm tracking-wide text-foreground/80 hover:bg-transparent hover:text-foreground"
            >
              <a href="#process">
                See how we work
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                />
              </a>
            </Button>
          </motion.div>

          {/* Micro-meta strip — the operator detail. Builds credibility
              with type, not stock-photo logos. */}
          <motion.div
            className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground/70"
            variants={loadUp}
            custom={0.4}
          >
            <span>Est. 2026</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" aria-hidden />
            <span>Atlanta + Remote</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" aria-hidden />
            <span>Now taking new clients</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom hairline — quiet section divider, Petrol-tinted. */}
      <div className="h-px w-full bg-rule/60" aria-hidden />
    </section>
  );
}

export { Hero };
