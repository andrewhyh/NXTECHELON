import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowUpRight, PhoneCall } from "lucide-react";

import { Hero } from "@/components/ui/animated-hero";
import { BentoSection } from "@/components/ui/bento-section";
import { BookingDialog } from "@/components/ui/booking-dialog";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SlideTabs } from "@/components/ui/slide-tabs";

/* ---------------------------------------------------------------------------
   Content. Pulled forward from the Codex implementation (CSS-Modules
   version, deleted in this rebuild). Placeholders match the brief:
   real bio / shipped systems / Cal handle / email land via the user.
   --------------------------------------------------------------------------- */

const fallbackEmail = "hello@example.com";

const navTabs = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Operator", href: "#operator" },
  { label: "Contact", href: "#contact" },
] as const;

const services = [
  {
    verb: "Build",
    body: "Custom tools for the parts of your business that no off-the-shelf software fits — built around how you actually work, not how a software company imagined you might.",
    example:
      "Sorting new patient or client requests, drafting the proposals you send every week, finding the right past job or file in seconds, or helping you decide who to follow up with first.",
  },
  {
    verb: "Connect",
    body: "We wire AI into the tools your team already uses every day — your email, calendar, scheduling, or invoicing software — so nobody has to learn one more thing.",
    example:
      "Notes that write themselves after a call. An inbox that sorts itself by what matters. Reports that pull from every tool instead of you copy-pasting between tabs.",
  },
  {
    verb: "Maintain",
    body: "After we hand the tool over, we make sure it keeps working. We check on it, fix what breaks, improve it as your business changes, and teach your team to run it themselves.",
    example:
      "Weekly check-ins, fixes when something goes sideways, updates as the AI itself gets better, and one clear person on your team who owns it.",
  },
] as const;

const steps = [
  {
    title: "Find the bottleneck",
    body: "We figure out the one thing costing you the most time or money — and exactly what would fix it. No code, no jargon, just a clear answer.",
  },
  {
    title: "Focused build",
    body: "A clear plan, a fixed budget, a fixed timeline. You see progress weekly and call the shots as they come — no surprises, no scope creep.",
  },
  {
    title: "Launch",
    body: "A working tool in the hands of the people who will actually use it, tested against the everyday cases you face — not a polished demo for the founder.",
  },
  {
    title: "Hand off the keys",
    body: "Plain-English instructions, someone to call if something breaks, and a clear way to keep improving it. No black box, no permanent consultant on retainer.",
  },
] as const;

const shippedSystems = [
  "Built a placeholder tool that sorts new leads by urgency and fit, so the team only calls back the ones worth their time.",
  "Built a placeholder assistant that searches every proposal, contract, and note at once — finding the right one takes seconds, not an hour.",
  "Built a placeholder system that answers routine customer questions, flags the ones that need a real person, and learns from every reply.",
  "Built a placeholder weekly briefing that pulls from every tool and lands one clear summary in the owner's inbox every Monday morning.",
] as const;

export default function Home() {
  return (
    <>
      {/* Sticky nav — mix-blend-difference so the wordmark stays legible
          across the dark/paper section pivots without a JS observer. */}
      <header
        aria-label="Primary navigation"
        className="nx-load-fade-in pointer-events-none fixed inset-x-0 top-0 z-30"
        style={{ "--load-delay": "600ms" } as CSSProperties}
      >
        <div className="mx-auto grid max-w-[1280px] grid-cols-[1fr_auto] items-center gap-4 px-6 py-4 text-paper sm:px-10 lg:grid-cols-[1fr_auto_1fr]">
          <Link
            href="#top"
            className="pointer-events-auto font-mono text-[0.78rem] font-medium uppercase tracking-[0.22em] mix-blend-difference"
          >
            NXTECHELON
          </Link>
          <div className="pointer-events-auto hidden justify-self-center lg:block">
            <SlideTabs tabs={navTabs} />
          </div>
          <button
            type="button"
            data-booking-trigger
            className="pointer-events-auto justify-self-end font-mono text-[0.78rem] font-medium uppercase tracking-[0.22em] underline underline-offset-[6px] decoration-1 mix-blend-difference transition-opacity hover:opacity-70"
          >
            Book a call
          </button>
        </div>
      </header>

      <main id="top">
        <Hero />

        {/* ----- Thesis ------------------------------------------------- */}
        <section
          className="paper relative"
          aria-labelledby="thesis-title"
          id="thesis"
        >
          <div className="mx-auto grid min-h-[78svh] max-w-[1180px] items-center px-6 py-28 sm:px-10 lg:py-40">
            <Reveal>
              <h2
                id="thesis-title"
                className="font-serif font-light leading-[1.04] text-[clamp(2rem,4.4vw,4.7rem)]"
              >
                Most AI projects fail because they start with the technology,
                not the work. We start with the bottleneck you actually feel
                &mdash; the calls that don&rsquo;t get returned, the paperwork
                that piles up, the customers who slip through &mdash; and
                build something that handles it. Then we make sure it keeps
                working{" "}
                <em className="italic text-petrol">
                  after we hand you the keys.
                </em>
              </h2>
            </Reveal>
          </div>
        </section>

        {/* ----- Services ----------------------------------------------- */}
        <section
          className="paper relative"
          aria-labelledby="services-title"
          id="services"
        >
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-12 px-6 py-28 sm:px-10 lg:grid-cols-[minmax(220px,0.42fr)_minmax(0,1fr)] lg:gap-[6rem] lg:py-40">
            <Reveal>
              <h2
                id="services-title"
                className="font-serif font-light leading-none text-[clamp(2.1rem,4vw,4.2rem)]"
              >
                What we
                <br />
                build.
              </h2>
            </Reveal>

            <div className="border-t border-[color:var(--rule)]">
              {services.map((service, index) => (
                <Reveal key={service.verb} delay={index * 0.08}>
                  <article className="grid grid-cols-1 gap-6 border-b border-[color:var(--rule)] py-10 sm:grid-cols-[minmax(140px,0.34fr)_minmax(0,1fr)] sm:gap-12 sm:py-14">
                    <h3 className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-[1.05]">
                      {service.verb}
                    </h3>
                    <div className="space-y-4">
                      <p className="max-w-[60ch] text-base leading-[1.6] text-foreground sm:text-lg">
                        {service.body}
                      </p>
                      <p className="max-w-[60ch] text-sm leading-[1.6] text-muted-foreground sm:text-base">
                        {service.example}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ----- Bento (the "show, don't tell" moment) ------------------ */}
        <BentoSection />

        {/* ----- Process ------------------------------------------------ */}
        <section
          className="relative bg-background text-foreground"
          aria-labelledby="process-title"
          id="process"
        >
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-12 px-6 py-28 sm:px-10 lg:grid-cols-[minmax(220px,0.42fr)_minmax(0,1fr)] lg:gap-[6rem] lg:py-40">
            <Reveal>
              <h2
                id="process-title"
                className="font-serif font-light leading-none text-[clamp(2.1rem,4vw,4.2rem)]"
              >
                How it
                <br />
                goes.
              </h2>
            </Reveal>

            <ol className="border-t border-white/10">
              {steps.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.06}>
                  <li className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-6 border-b border-white/10 py-10 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-12 sm:py-14">
                    <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-signal">
                      0{index + 1}
                    </span>
                    <div className="space-y-3">
                      <h3 className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-[1.05]">
                        {step.title}
                      </h3>
                      <p className="max-w-[60ch] text-base leading-[1.6] text-muted-foreground sm:text-lg">
                        {step.body}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ----- Operator ----------------------------------------------- */}
        <section
          className="paper relative"
          aria-labelledby="operator-title"
          id="operator"
        >
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-12 px-6 py-28 sm:px-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(280px,0.62fr)] lg:gap-[6rem] lg:py-40">
            <Reveal>
              <div>
                <h2
                  id="operator-title"
                  className="font-serif font-light leading-none text-[clamp(2.1rem,4vw,4.2rem)]"
                >
                  Jordan Vale
                </h2>
                <p className="mt-6 max-w-[60ch] text-base leading-[1.65] text-foreground sm:text-lg">
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-petrol">
                    Placeholder bio —{" "}
                  </span>
                  Jordan has spent the last decade building practical tools
                  for businesses that needed them &mdash; not flashy demos,
                  not pitch decks, but software that real teams use every
                  day. The work sits between understanding what the business
                  actually needs and getting the thing built. Replace this
                  paragraph with the real founder background before launch.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="border-t border-[color:var(--rule)] pt-6">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-petrol">
                  Placeholder examples
                </p>
                <ul className="mt-6 space-y-5 text-base leading-[1.6] text-foreground sm:text-lg">
                  {shippedSystems.map((system) => (
                    <li
                      key={system}
                      className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-2"
                    >
                      <span aria-hidden className="select-none text-signal">
                        →
                      </span>
                      <span>{system}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ----- Contact ------------------------------------------------ */}
        <section
          className="relative bg-background text-foreground"
          aria-labelledby="contact-title"
          id="contact"
        >
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 px-6 py-28 sm:px-10 lg:py-40">
            <Reveal>
              <h2
                id="contact-title"
                className="max-w-[18ch] font-serif font-light leading-[0.98] text-[clamp(2.4rem,5.8vw,6rem)]"
              >
                If you&rsquo;ve already decided AI matters,{" "}
                <em className="italic text-signal">we should talk.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="relative max-w-2xl overflow-hidden rounded-2xl border border-border bg-secondary/30 p-8 backdrop-blur-sm sm:p-10">
                <BorderBeam size={260} duration={11} />
                <BorderBeam size={260} duration={11} delay={5.5} colorFrom="var(--petrol)" colorTo="var(--signal)" />

                <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-signal">
                  Thirty minutes. No pitch.
                </p>
                <h3 className="mt-3 font-serif text-2xl font-light leading-[1.1] text-foreground sm:text-3xl">
                  Tell us what&rsquo;s broken. We&rsquo;ll tell you whether AI
                  can fix it.
                </h3>
                <p className="mt-3 max-w-[52ch] text-sm leading-[1.6] text-muted-foreground sm:text-base">
                  No slide deck, no homework. Bring the problem &mdash;
                  we&rsquo;ll bring the questions, the honest answer, and a
                  fixed-price plan if there&rsquo;s a real system to build.
                </p>

                <div className="mt-7 flex flex-col items-start gap-5">
                  <Button
                    size="lg"
                    className="group h-12 gap-3 px-7 text-sm tracking-wide"
                    data-booking-trigger
                  >
                    <PhoneCall className="h-4 w-4" strokeWidth={1.8} />
                    Book a 30-minute call
                  </Button>
                  <p className="font-mono text-[0.78rem] uppercase tracking-[0.18em] text-muted-foreground">
                    Or write —{" "}
                    <a
                      href={`mailto:${fallbackEmail}`}
                      className="text-foreground underline underline-offset-4 decoration-1 hover:text-signal"
                    >
                      {fallbackEmail}
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <footer className="mx-auto flex max-w-[1180px] flex-col items-start gap-3 border-t border-white/10 px-6 py-10 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <span>NXTECHELON</span>
            <span className="flex items-center gap-2">
              MMXXVI
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" aria-hidden />
              An AI build studio
              <ArrowUpRight className="h-3 w-3 text-signal" strokeWidth={1.75} />
            </span>
          </footer>
        </section>
      </main>

      <BookingDialog />
    </>
  );
}
