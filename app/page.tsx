import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Check } from "lucide-react";

import { BookingDialog } from "@/components/ui/booking-dialog";
import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";
import { RevealWords } from "@/components/ui/reveal-words";
import { StatArc } from "@/components/ui/stat-arc";

/* ---------------------------------------------------------------------------
   Content.

   Posture: friendly and direct. The reader is a busy owner who already
   suspects they're behind and does not need to be lectured, shamed, or sold.
   Name the gap, prove it with real sources, say it's fixable, offer the call.

   Every figure below is a real, published number with a real citation. No
   invented metrics, no laundered vendor-blog statistics, no fabricated client
   proof. If a number isn't traceable to a primary source, it isn't on the page.
   --------------------------------------------------------------------------- */

const fallbackEmail = "huynh.andrew2021@gmail.com";

/**
 * Every booking CTA is a real <a> to this URL carrying `data-booking-trigger`.
 * BookingDialog intercepts the click and preventDefault()s it, so with JS you
 * get the dialog; with JS off, broken, or still loading, the link just goes to
 * Cal.com. A <button> here would be a dead control on the most important
 * action on the page.
 */
const bookingFallback =
  process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://cal.com/nxtechelon/30min";

const navLinks = [
  { label: "The gap", href: "#gap" },
  { label: "What we build", href: "#services" },
  { label: "How it works", href: "#process" },
  { label: "About", href: "#about" },
] as const;

/** Verified 2026-07-16. Sources are shown on the page — they're the proof. */
const evidence = [
  {
    figure: "37%",
    versus: "vs. under 20%",
    claim:
      "of companies with 250+ employees are using AI. Among businesses with four or fewer people, it's under 20% — and between December 2025 and May 2026, that smaller group didn't move at all.",
    source: "U.S. Census Bureau, Business Trends and Outlook Survey, 2026",
    href: "https://www.census.gov/library/stories/2026/05/ai-use-businesses.html",
  },
  {
    figure: "23%",
    versus: "never replied",
    claim:
      "of companies never responded to a sales enquiry from their own website. Of the ones that did, the average reply took 42 hours. Only 37% answered within an hour.",
    source: "Harvard Business Review, audit of 2,241 U.S. companies, 2011",
    href: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
  },
  {
    figure: "21×",
    versus: "5 min vs. 30 min",
    claim:
      "more likely to qualify a lead when you answer in five minutes instead of thirty. Not five hours — thirty minutes. The drop-off is that steep, and it's the cheapest thing on this page to fix.",
    source: "Lead Response Management Study, 15,000+ leads, 2007",
    href: "https://www.leadresponsemanagement.org/lrm_study/",
  },
] as const;

const services = [
  {
    verb: "Build",
    line: "The tool that doesn't exist yet",
    body: "Software shaped around how your business actually runs, not how a software company guessed it might. Sorting incoming leads by who's worth calling first. Drafting the quote you write forty times a month. Finding the one contract you need without opening six folders.",
  },
  {
    verb: "Connect",
    line: "Into what your team already uses",
    body: "Your email, your calendar, your invoicing, your scheduler. Nobody learns a new system, nobody changes their day. The notes write themselves after the call. The inbox sorts itself before you open it.",
  },
  {
    verb: "Maintain",
    line: "And it keeps working after I leave",
    body: "I check on it, fix what breaks, and update it as your business changes. Someone on your team learns to run it. You own the code and the accounts. There's no retainer you can't cancel and no black box you can't open.",
  },
] as const;

const steps = [
  {
    title: "We talk for thirty minutes",
    body: "You tell me what's eating your week. I ask questions. It's free, there's no deck, and if AI isn't the right fix I'll tell you on that call — about half the time it isn't.",
  },
  {
    title: "You get a fixed price",
    body: "One bottleneck, one plan, one number, one date. Written down before anything starts. No hourly billing, no scope creep, no surprise invoice in week six.",
  },
  {
    title: "I build it, you watch it happen",
    body: "Progress every week, in plain English. You call the shots as things sharpen up. Most builds land in four to eight weeks.",
  },
  {
    title: "I hand you the keys",
    body: "Working software, your team trained on it, instructions a human can read, and my number if it breaks. Then I get out of your way.",
  },
] as const;

const buildable = [
  "Sorts new leads by urgency so your team calls the right one first",
  "Answers routine customer questions and flags the ones that need you",
  "Searches every proposal, contract, and note you've ever written",
  "Lands one clear summary of the whole business in your inbox Monday morning",
] as const;

export default function Home() {
  return (
    <>
      <header
        aria-label="Primary"
        className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-6 py-3.5 sm:px-10">
          <Link
            href="#top"
            className="font-display text-[1.05rem] font-extrabold tracking-[-0.03em] text-foreground"
          >
            NXTECHELON
          </Link>

          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[0.92rem] text-muted-foreground">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <CtaButton asChild className="h-10 px-4 text-[0.85rem] sm:px-5">
            <a href={bookingFallback} data-booking-trigger>
              Book a call
            </a>
          </CtaButton>
        </div>
      </header>

      <main id="top">
        {/* ----- Hero ---------------------------------------------------- */}
        {/* `isolate` is load-bearing: it gives the section its own stacking
            context so the z-0 wash paints above the body background instead of
            behind it. */}
        <section className="relative isolate overflow-hidden">
          {/* The one piece of ambient motion on the page — a slow warm bloom
              behind the greeting. Two soft ellipses, no gradient surface, no
              glow on a card. */}
          <div
            aria-hidden
            className="nx-bloom-in pointer-events-none absolute inset-0 z-0 overflow-hidden"
          >
            <div className="nx-drift absolute -top-[34%] left-[52%] h-[40rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,oklch(0.70_0.175_50_/_0.30),transparent)]" />
            <div className="nx-drift absolute -top-[16%] right-[-8%] h-[34rem] w-[46rem] rounded-full bg-[radial-gradient(closest-side,oklch(0.44_0.078_205_/_0.26),transparent)] [animation-delay:-9s]" />
          </div>

          <div className="relative z-10 mx-auto max-w-[1180px] px-6 pb-20 pt-16 sm:px-10 sm:pb-28 sm:pt-24 lg:pb-32 lg:pt-28">
            <p
              className="nx-rise text-[0.98rem] font-medium text-signal-ink"
              style={{ "--load-delay": "60ms" } as CSSProperties}
            >
              Hi — I&rsquo;m Andrew. I build AI tools for small businesses in
              Atlanta.
            </p>

            {/* The headline arrives word by word. `nx-rise` is deliberately NOT
                on the h1 any more — the word stagger IS the entrance, and
                running both would double up the motion. */}
            <h1 className="mt-5 max-w-[21ch] font-display text-[clamp(2.6rem,6.6vw,5.75rem)] font-extrabold leading-[0.96] text-foreground">
              <RevealWords
                text="You know AI could help. You just never got a spare month to figure out how."
                startDelay={180}
                stagger={44}
              />
            </h1>

            {/* Asymmetric lower band: the paragraph and the action sit side by
                side so the fold uses its full width instead of trailing off
                into 400px of dead space at desktop. */}
            <div className="mt-10 grid grid-cols-1 gap-x-14 gap-y-9 lg:mt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
              <p
                className="nx-rise max-w-[52ch] text-[1.12rem] leading-[1.65] text-muted-foreground sm:text-[1.2rem]"
                style={{ "--load-delay": "1000ms" } as CSSProperties}
              >
                So it stayed on the list. Meanwhile the tools got good, the
                bigger companies moved, and the gap quietly widened. I build the
                practical stuff that closes it — the system that answers a lead
                at 7pm, fills the calendar, and finds any file in seconds.
              </p>

              <div>
                <div
                  className="nx-rise flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
                  style={{ "--load-delay": "1150ms" } as CSSProperties}
                >
                  <CtaButton asChild>
                    <a href={bookingFallback} data-booking-trigger>
                      Book a 30-minute call
                      <ArrowRight
                        className="h-[1.05rem] w-[1.05rem] transition-transform duration-200 ease-out group-hover:translate-x-1"
                        strokeWidth={2.2}
                      />
                    </a>
                  </CtaButton>
                  <CtaButton asChild tone="quiet">
                    <a href="#gap">Show me what I&rsquo;m missing</a>
                  </CtaButton>
                </div>

                <ul
                  className="nx-rise mt-7 space-y-2.5 text-[0.98rem] text-muted-foreground"
                  style={{ "--load-delay": "1290ms" } as CSSProperties}
                >
                  {[
                    "Free, and there's no pitch",
                    "If AI won't help, I'll say so",
                    "Fixed price before anything starts",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <Check
                        className="h-[1.05rem] w-[1.05rem] shrink-0 text-signal-ink"
                        strokeWidth={2.6}
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ----- The gap (drenched petrol — the evidence) -----------------
            `isolate` again: the arc sits at -z-0 inside this section's own
            stacking context, under the content but above the section fill. */}
        <section
          className="deep relative isolate overflow-hidden"
          aria-labelledby="gap-title"
          id="gap"
        >
          <div className="relative z-10 mx-auto max-w-[1180px] px-6 py-24 sm:px-10 sm:py-32">
            <Reveal className="grid grid-cols-1 gap-x-16 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
              <h2
                id="gap-title"
                className="max-w-[16ch] font-display text-[clamp(2.1rem,4.6vw,3.9rem)] font-extrabold leading-[1.02]"
              >
                While you were running the business, this happened.
              </h2>
              <p className="max-w-[46ch] text-[1.08rem] leading-[1.65] text-muted-foreground lg:pb-2">
                Not opinions, and not our numbers — these are the published
                ones, linked so you can check them yourself.
              </p>
            </Reveal>

            {/* The luminous bowl cradles the figures. Its wrapper carries the
                vertical padding the arc needs to breathe — without it the rim
                crops against the content.
                3-up only at lg: at tablet widths three columns collapse to
                ~197px each, far too tight for a 50px+ figure plus a claim and a
                source link.
                Reveal IS the div wrapper <dl> permits, rather than adding a
                second nested one. */}
            <div className="relative isolate mt-12 pb-14 pt-12 sm:pb-20 sm:pt-16">
              <StatArc />
              <dl className="relative z-10 grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-3">
              {evidence.map((item, index) => (
                <Reveal
                  key={item.figure}
                  index={index}
                  className="flex h-full flex-col border-t-2 border-signal pt-6"
                >
                  <dt className="nx-figures font-display text-[clamp(3.2rem,6vw,4.6rem)] font-extrabold leading-[0.9] tracking-[-0.035em] text-signal">
                    {item.figure}
                  </dt>
                  <p className="mt-2 text-[0.92rem] font-semibold text-foreground/80">
                    {item.versus}
                  </p>
                  <dd className="mt-4 flex flex-1 flex-col">
                    <p className="text-[1.02rem] leading-[1.6] text-muted-foreground">
                      {item.claim}
                    </p>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-5 inline-block max-w-[34ch] text-[0.82rem] leading-[1.45] text-foreground/90 underline decoration-foreground/40 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
                    >
                      {item.source}
                    </a>
                  </dd>
                </Reveal>
              ))}
              </dl>
            </div>

            <Reveal className="mt-6 grid grid-cols-1 gap-x-16 gap-y-5 border-t border-border pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
              <p className="max-w-[42ch] font-display text-[clamp(1.35rem,2.4vw,1.85rem)] font-bold leading-[1.3] text-foreground">
                None of that is a character flaw. You were busy. It&rsquo;s just
                what happens when nobody in the building has a spare month.
              </p>
              <p className="max-w-[42ch] text-[1.08rem] leading-[1.65] text-muted-foreground lg:pb-1">
                Every one of those gaps is fixable, and none of the fixes take
                six months. That&rsquo;s the whole reason this business exists.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ----- What we build ------------------------------------------- */}
        <section className="relative" aria-labelledby="services-title" id="services">
          <div className="mx-auto max-w-[1180px] px-6 py-24 sm:px-10 sm:py-32">
            <Reveal>
              <h2
                id="services-title"
                className="max-w-[14ch] font-display text-[clamp(2.1rem,4.6vw,3.9rem)] font-extrabold leading-[1.02]"
              >
                What I actually build.
              </h2>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-3">
              {services.map((service, index) => (
                <Reveal key={service.verb} index={index}>
                  <article className="flex h-full flex-col">
                    <p className="font-display text-[0.95rem] font-extrabold uppercase tracking-[0.06em] text-signal-ink">
                      {service.verb}
                    </p>
                    <h3 className="mt-3 max-w-[16ch] font-display text-[clamp(1.5rem,2.6vw,2rem)] font-bold leading-[1.15]">
                      {service.line}
                    </h3>
                    <p className="mt-4 max-w-[46ch] text-[1.05rem] leading-[1.65] text-muted-foreground">
                      {service.body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ----- How it works -------------------------------------------- */}
        <section
          className="relative border-y border-border bg-secondary/50"
          aria-labelledby="process-title"
          id="process"
        >
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-x-16 gap-y-12 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)]">
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <h2
                  id="process-title"
                  className="max-w-[12ch] font-display text-[clamp(2.1rem,4.6vw,3.9rem)] font-extrabold leading-[1.02]"
                >
                  How it works.
                </h2>
                <p className="mt-6 max-w-[38ch] text-[1.08rem] leading-[1.65] text-muted-foreground">
                  Four steps. You always know the price, the date, and what
                  happens next.
                </p>
                <CtaButton asChild className="mt-8">
                  <a href={bookingFallback} data-booking-trigger>
                    Start with the call
                    <ArrowRight
                      className="h-[1.05rem] w-[1.05rem] transition-transform duration-200 ease-out group-hover:translate-x-1"
                      strokeWidth={2.2}
                    />
                  </a>
                </CtaButton>
              </div>
            </Reveal>

            {/* The one place numbers appear as scaffolding — because this
                genuinely is an ordered sequence and the order is the point.
                Reveal renders AS the <li>: wrapping it in a div would put an
                invalid child inside <ol>, drop the list semantics, and make
                every item both :first-child and :last-child of its own
                wrapper — silently killing the first:/last: rules below. */}
            <ol className="flex flex-col">
              {steps.map((step, index) => (
                <Reveal
                  as="li"
                  key={step.title}
                  index={index}
                  className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-5 border-b border-border py-8 first:pt-0 last:border-b-0 last:pb-0 sm:gap-7"
                >
                  <span
                    className="nx-figures mt-0.5 font-display text-[1.35rem] font-extrabold leading-none text-signal-ink"
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[clamp(1.3rem,2.2vw,1.65rem)] font-bold leading-[1.2]">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-[52ch] text-[1.05rem] leading-[1.65] text-muted-foreground">
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ----- About ---------------------------------------------------- */}
        <section className="relative" aria-labelledby="about-title" id="about">
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-start gap-x-16 gap-y-12 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
            <Reveal>
              {/* Sticky at lg: the bio column is ~400px taller than the photo,
                  and letting the portrait ride alongside it beats leaving a
                  column of dead space. */}
              <figure className="relative lg:sticky lg:top-24">
                {/* Tonal block behind the photo — depth from flat colour, not
                    from a shadow. */}
                <div
                  aria-hidden
                  className="absolute -left-3 -top-3 h-full w-full rounded-xl bg-petrol/12 sm:-left-4 sm:-top-4"
                />
                <Image
                  src="/images/andrew-huynh.jpg"
                  alt="Andrew Huynh, founder of NXTECHELON"
                  width={1000}
                  height={1250}
                  sizes="(max-width: 1024px) 100vw, 420px"
                  priority={false}
                  className="relative w-full rounded-xl border border-border object-cover"
                />
                <figcaption className="relative mt-5">
                  <span className="block font-display text-[1.05rem] font-extrabold text-foreground">
                    Andrew Huynh
                  </span>
                  <span className="mt-1 block text-[0.92rem] text-muted-foreground">
                    Founder &middot; Atlanta, GA
                  </span>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal>
              <div>
                <h2
                  id="about-title"
                  className="max-w-[15ch] font-display text-[clamp(2.1rem,4.6vw,3.9rem)] font-extrabold leading-[1.02]"
                >
                  You&rsquo;ll be working with me.
                </h2>

                <div className="mt-7 max-w-[54ch] space-y-5 text-[1.08rem] leading-[1.7] text-foreground">
                  <p>
                    Not a salesperson, not an account manager, not a team
                    offshore you never meet. I take the call, I scope the work,
                    and I write the code. If something breaks at 9pm, you have
                    the number of the person who built it.
                  </p>
                  <p className="text-muted-foreground">
                    My day job is product security at a capital markets firm —
                    closing vulnerabilities in software that moves millions of
                    dollars a day, and automating the busywork that piles up
                    around it. The rest of my time goes into practical AI
                    tooling: a multi-LLM command layer that runs my own
                    workflow, a TypeScript summarizer that cuts long-form review
                    time, and a self-hosted security lab with a hardened Docker
                    stack and a vulnerability scanner pulling live CVE data.
                  </p>
                  <p className="text-muted-foreground">
                    NXTECHELON is new and I&rsquo;m booking the first
                    engagements now, so I&rsquo;ll be honest about what that
                    means: no client logos to show you yet. What I can show you
                    is the work itself — on the call, in the plan, and in the
                    thing I hand over.
                  </p>
                </div>

                <div className="mt-10 rounded-xl border border-border bg-card p-6 sm:p-7">
                  <h3 className="font-display text-[1.15rem] font-bold">
                    Things I can build for you
                  </h3>
                  <ul className="mt-5 space-y-3.5">
                    {buildable.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check
                          className="mt-1 h-[1.05rem] w-[1.05rem] shrink-0 text-signal-ink"
                          strokeWidth={2.6}
                          aria-hidden
                        />
                        <span className="text-[1.02rem] leading-[1.55] text-muted-foreground">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ----- Contact -------------------------------------------------- */}
        <section className="ink relative" aria-labelledby="contact-title" id="contact">
          <div className="mx-auto max-w-[1180px] px-6 py-24 sm:px-10 sm:py-32">
            <Reveal>
              <div className="mx-auto max-w-[46rem] text-center">
                <h2
                  id="contact-title"
                  className="mx-auto max-w-[17ch] font-display text-[clamp(2.3rem,5.4vw,4.4rem)] font-extrabold leading-[1.0]"
                >
                  Tell me what&rsquo;s broken. I&rsquo;ll tell you if I can fix
                  it.
                </h2>
                <p className="mx-auto mt-7 max-w-[52ch] text-[1.12rem] leading-[1.65] text-muted-foreground">
                  Thirty minutes, free, no slide deck and no homework. Bring the
                  thing that&rsquo;s been eating your week. You&rsquo;ll leave
                  with a straight answer — and a fixed-price plan if
                  there&rsquo;s something real to build.
                </p>

                <div className="mt-10 flex flex-col items-center gap-4">
                  <CtaButton asChild className="w-full sm:w-auto">
                    <a href={bookingFallback} data-booking-trigger>
                      Book a 30-minute call
                      <ArrowRight
                        className="h-[1.05rem] w-[1.05rem] transition-transform duration-200 ease-out group-hover:translate-x-1"
                        strokeWidth={2.2}
                      />
                    </a>
                  </CtaButton>
                  <p className="text-[0.98rem] text-muted-foreground">
                    Prefer email?{" "}
                    <a
                      href={`mailto:${fallbackEmail}`}
                      className="text-foreground underline decoration-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground"
                    >
                      {fallbackEmail}
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer aria-label="Site footer" className="ink border-t border-border">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div>
            <p className="font-display text-[1.05rem] font-extrabold tracking-[-0.03em]">
              NXTECHELON
            </p>
            <p className="mt-1.5 text-[0.92rem] text-muted-foreground">
              Practical AI for small business. Atlanta &amp; remote.
            </p>
          </div>
          {/* inline-flex + min-h-6 keeps these standalone links at the WCAG 2.2
              (2.5.8) 24px target minimum; at their natural line-height they
              land at 23px. */}
          <div className="flex flex-wrap items-center gap-x-7 gap-y-1 text-[0.92rem] text-muted-foreground">
            <a
              href={bookingFallback}
              data-booking-trigger
              className="inline-flex min-h-6 items-center transition-colors hover:text-foreground"
            >
              Book a call
            </a>
            <a
              href={`mailto:${fallbackEmail}`}
              className="inline-flex min-h-6 items-center transition-colors hover:text-foreground"
            >
              Email
            </a>
            <span className="inline-flex min-h-6 items-center">
              &copy; {new Date().getFullYear()} NXTECHELON
            </span>
          </div>
        </div>
      </footer>

      <BookingDialog />
    </>
  );
}
