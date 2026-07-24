import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

import { ScrollJourney } from "@/components/ui/scroll-journey";
import { BookingDialog } from "@/components/ui/booking-dialog";
import { CtaButton } from "@/components/ui/cta-button";

export const metadata: Metadata = {
  title: "The Journey | NXTECHELON",
  description:
    "An immersive scroll-driven experience through what NXTECHELON builds for small businesses.",
};

const bookingFallback =
  process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://cal.com/nxtechelon/30min";

const scenes = [
  {
    start: -0.05,
    end: 0.16,
    content: (
      <div className="text-center">
        <p className="font-display text-[clamp(3.5rem,10vw,8rem)] font-extrabold tracking-[-0.03em] text-paper">
          NXTECHELON
        </p>
        <p className="mt-3 text-[clamp(1rem,2vw,1.3rem)] text-paper/60">
          AI that actually gets built
        </p>
      </div>
    ),
  },
  {
    start: 0.2,
    end: 0.36,
    content: (
      <div className="max-w-[42rem] text-center">
        <p className="font-display text-[clamp(2rem,5vw,4rem)] font-extrabold leading-[1.05] text-paper">
          You know AI could help.
        </p>
        <p className="mt-4 font-display text-[clamp(1.2rem,3vw,2.2rem)] font-bold text-paper/50">
          You just never got a spare month to figure out how.
        </p>
      </div>
    ),
  },
  {
    start: 0.4,
    end: 0.56,
    content: (
      <div className="max-w-[52rem] text-center">
        <p className="font-display text-[clamp(3rem,7vw,5.5rem)] font-extrabold text-signal">
          37%
        </p>
        <p className="mt-3 text-[clamp(1rem,2vw,1.3rem)] leading-[1.6] text-paper/70">
          of large companies are using AI.{" "}
          <span className="text-paper">Under 20% of small ones.</span>
          <br />
          The gap is real, and it widened this year.
        </p>
      </div>
    ),
  },
  {
    start: 0.6,
    end: 0.76,
    content: (
      <div className="max-w-[42rem] text-center">
        <p className="font-display text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-[1.05] text-paper">
          It&rsquo;s fixable.
        </p>
        <p className="mt-5 text-[clamp(1rem,2vw,1.25rem)] leading-[1.65] text-paper/60">
          Build the tool. Connect it to what you use. Keep it running after I
          leave.
          <br />
          None of the fixes take six months.
        </p>
      </div>
    ),
  },
  {
    start: 0.82,
    end: 1.1,
    content: (
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="font-display text-[clamp(1.6rem,4vw,3rem)] font-extrabold text-paper">
          Tell me what&rsquo;s broken.
        </p>
        <CtaButton asChild>
          <a href={bookingFallback} data-booking-trigger>
            Book a 30-minute call
            <ArrowRight
              className="h-[1.05rem] w-[1.05rem]"
              strokeWidth={2.2}
            />
          </a>
        </CtaButton>
        <p className="text-[0.92rem] text-paper/50">
          Free. No pitch. Fixed price before anything starts.
        </p>
      </div>
    ),
  },
];

export default function ExperiencePage() {
  return (
    <>
      <header className="fixed top-0 z-40 w-full">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4 sm:px-10">
          <Link
            href="/"
            className="font-display text-[0.95rem] font-extrabold tracking-[-0.03em] text-paper/80 transition-colors hover:text-paper"
          >
            NXTECHELON
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[0.85rem] text-paper/50 transition-colors hover:text-paper"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            Back to site
          </Link>
        </div>
      </header>

      <ScrollJourney scenes={scenes} />

      <section className="ink">
        <div className="mx-auto max-w-[1180px] px-6 py-16 text-center sm:px-10">
          <p className="text-[0.95rem] text-muted-foreground">
            <Link
              href="/"
              className="text-foreground underline decoration-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground"
            >
              Back to the full site
            </Link>
            {" "}·{" "}
            <a
              href={bookingFallback}
              data-booking-trigger
              className="text-foreground underline decoration-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground"
            >
              Book a call
            </a>
          </p>
        </div>
      </section>

      <BookingDialog />
    </>
  );
}
