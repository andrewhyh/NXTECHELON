import Link from "next/link";
import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowUpRight, PhoneCall } from "lucide-react";
import {
  siCalendly,
  siGoogle,
  siHubspot,
  siMake,
  siQuickbooks,
  type SimpleIcon,
  siXero,
} from "simple-icons";

import { Hero } from "@/components/ui/animated-hero";
import { BeamButton } from "@/components/ui/beam-button";
import { BentoSection } from "@/components/ui/bento-section";
import { BookingDialog } from "@/components/ui/booking-dialog";
import { BorderBeam } from "@/components/ui/border-beam";
import { Reveal } from "@/components/ui/reveal";
import { SlideTabs } from "@/components/ui/slide-tabs";
import { TextScramble } from "@/components/ui/text-scramble";

/* ---------------------------------------------------------------------------
   Content. Pre-portfolio posture: real founder, real capabilities, no
   fabricated proof. Real Cal.com handle and one truthful line for Andrew's
   background still land via the user — see CLAUDE.md TODOs.
   --------------------------------------------------------------------------- */

const fallbackEmail = "huynh.andrew2021@gmail.com";

const navTabs = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Proof", href: "#proof" },
  { label: "Process", href: "#process" },
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

const buildableSystems = [
  "A tool that sorts new leads by urgency and fit, so the team only calls back the ones worth their time.",
  "An assistant that searches every proposal, contract, and note at once — finding the right one takes seconds, not an hour.",
  "A system that answers routine customer questions, flags the ones that need a real person, and learns from every reply.",
  "A weekly briefing that pulls from every tool and lands one clear summary in the owner's inbox every Monday morning.",
] as const;

const integrationGroups = [
  {
    group: "Operations",
    tools: [
      { name: "Airtable", logo: "airtable" },
      { name: "Notion", logo: "notion" },
      { name: "Google Sheets", logo: "sheets" },
      { name: "Slack", logo: "slack" },
      { name: "Microsoft Teams", logo: "teams" },
    ],
  },
  {
    group: "Revenue",
    tools: [
      { name: "HubSpot", logo: "hubspot" },
      { name: "Stripe", logo: "stripe" },
      { name: "Calendly", logo: "calendly" },
      { name: "Gmail", logo: "gmail" },
      { name: "Google Workspace", logo: "workspace" },
    ],
  },
  {
    group: "Finance",
    tools: [
      { name: "QuickBooks", logo: "quickbooks" },
      { name: "Xero", logo: "xero" },
      { name: "Ramp", logo: "ramp" },
      { name: "Google Drive", logo: "drive" },
      { name: "Dropbox", logo: "dropbox" },
    ],
  },
  {
    group: "Automation",
    tools: [
      { name: "Make", logo: "make" },
      { name: "Zapier", logo: "zapier" },
      { name: "n8n", logo: "n8n" },
      { name: "OpenAI", logo: "openai" },
      { name: "Anthropic", logo: "anthropic" },
    ],
  },
] as const;

const archivedFaqItems = [
  {
    q: "How much does a build cost?",
    a: "Engagements are fixed-price, scoped to one bottleneck. The first call is free and ends with a written quote — or an honest 'this isn't worth building yet.' No retainers, no surprise hourly bills.",
  },
  {
    q: "How long does a build take?",
    a: "Most builds land in four to eight weeks from quote to handoff. We work in weekly checkpoints so you call the shots as scope sharpens — no open-ended timelines, no scope creep.",
  },
  {
    q: "What actually counts as AI for my business?",
    a: "The boring parts that drain your week — sorting leads, drafting proposals, answering routine customer questions, pulling reports from five tools at once. Not chatbots that wow on demo day and confuse your staff on Tuesday.",
  },
  {
    q: "Who actually does the work?",
    a: "Andrew Huynh, hands on keys. No offshore handoff, no junior team you've never met. If something breaks, you call the person who built it.",
  },
  {
    q: "What happens after launch?",
    a: "You own the code, the accounts, and the documentation. We hand off with plain-English instructions and a person on your team trained to run it. The Maintain pillar is an opt-in agreement — not a permanent retainer.",
  },
  {
    q: "Where are you based?",
    a: "Atlanta, Georgia. We work in person with Atlanta-area businesses and remotely with everyone else. Same posture either way — weekly progress, fixed scope, fixed price.",
  },
  {
    q: "What if AI isn't the right fix for my problem?",
    a: "We'll tell you on the first call. Half the bottlenecks we see are solved by a workflow change or a twenty-dollar tool — not a custom build. If that's you, we'll point you in the right direction and call it a good thirty minutes.",
  },
] as const;

void archivedFaqItems;

type IntegrationLogo = (typeof integrationGroups)[number]["tools"][number]["logo"];

function IntegrationMark({ logo }: { logo: IntegrationLogo }) {
  const common = {
    className: "h-5 w-5 shrink-0",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
  } as const;

  switch (logo) {
    case "airtable":
      return (
        <svg {...common}>
          <path d="M4 7.2 12 4l8 3.2-8 3.2L4 7.2Z" fill="currentColor" />
          <path d="M4 9.5 11 12.3v6.2L4 15.7V9.5Z" fill="currentColor" opacity="0.52" />
          <path d="M13 12.3 20 9.5v6.2l-7 2.8v-6.2Z" fill="currentColor" opacity="0.72" />
        </svg>
      );
    case "notion":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 16V8h1.9l4.2 5.8V8H16v8h-1.8L10 10.1V16H8Z" fill="currentColor" />
        </svg>
      );
    case "sheets":
      return (
        <svg {...common}>
          <path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M14 3v5h4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 11h7M9 14h7M11.3 9v8M13.7 9v8" stroke="currentColor" strokeWidth="1.1" />
        </svg>
      );
    case "slack":
      return (
        <svg {...common}>
          <path d="M8 4.5a2 2 0 0 1 4 0v4H8v-4ZM4.5 8a2 2 0 0 1 0-4H8v4H4.5ZM16 4.5a2 2 0 0 1 4 0V8h-4V4.5ZM12 8h4v4h-4V8ZM4 16h4v3.5a2 2 0 0 1-4 0V16ZM8 12h4v4H8v-4ZM16 16h3.5a2 2 0 0 1 0 4H16v-4ZM12 16h4v3.5a2 2 0 0 1-4 0V16Z" fill="currentColor" />
        </svg>
      );
    case "teams":
      return (
        <svg {...common}>
          <rect x="4" y="8" width="11" height="10" rx="1.5" fill="currentColor" />
          <circle cx="17" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 12h4v2.5a3.5 3.5 0 0 1-4 3.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 11h5M9.5 11v5" stroke="var(--background)" strokeWidth="1.2" />
        </svg>
      );
    case "hubspot":
      return (
        <svg {...common}>
          <circle cx="15.5" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="7" cy="16" r="2.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 14.5 13.2 10M15.5 4.8V3M18.2 9.8 20 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "stripe":
      return (
        <svg {...common}>
          <path d="M17.2 7.4c-1.4-.7-2.9-1-4.6-1-3 0-4.8 1.4-4.8 3.5 0 3.8 6.7 2.6 6.7 4.5 0 .7-.7 1.1-2.1 1.1-1.7 0-3.4-.5-4.8-1.3v3.1c1.5.7 3.1 1 4.8 1 3.3 0 5.2-1.4 5.2-3.8 0-3.9-6.7-2.8-6.7-4.5 0-.6.6-1 1.9-1 1.5 0 3 .4 4.4 1.1V7.4Z" fill="currentColor" />
        </svg>
      );
    case "calendly":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M15.8 14.4a4.5 4.5 0 1 1 0-4.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "gmail":
      return (
        <svg {...common}>
          <path d="M4 7.5v9.8h16V7.5l-8 6-8-6Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 7.5 12 13.5l8-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "workspace":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="7" height="7" rx="1.5" fill="currentColor" />
          <rect x="13" y="4" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.52" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.72" />
          <rect x="13" y="13" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.88" />
        </svg>
      );
    case "quickbooks":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
          <path d="M11.5 8.5h-1.2a3.5 3.5 0 1 0 0 7h3.4a3.5 3.5 0 1 0 0-7h-1.2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "xero":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
          <path d="m8.2 8.5 7.6 7M15.8 8.5l-7.6 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "ramp":
      return (
        <svg {...common}>
          <path d="M5 18V6h6.7c2.8 0 4.5 1.5 4.5 3.8 0 1.7-.9 3-2.4 3.5L18 18h-4.2l-3.5-4.3H8.6V18H5Zm3.6-7.1h2.6c.9 0 1.4-.4 1.4-1.1s-.5-1.1-1.4-1.1H8.6v2.2Z" fill="currentColor" />
        </svg>
      );
    case "drive":
      return (
        <svg {...common}>
          <path d="M10.2 4h4.2l6 10.4h-4.3L10.2 4Z" fill="currentColor" />
          <path d="M9.6 5 3.8 15.4l2.1 3.6 5.9-10.4L9.6 5Z" fill="currentColor" opacity="0.58" />
          <path d="M6.5 20h11.8l2.1-3.6H8.6L6.5 20Z" fill="currentColor" opacity="0.78" />
        </svg>
      );
    case "dropbox":
      return (
        <svg {...common}>
          <path d="m8 4 4 2.5L8 9 4 6.5 8 4Zm8 0 4 2.5L16 9l-4-2.5L16 4ZM8 10l4 2.5L8 15l-4-2.5L8 10Zm8 0 4 2.5L16 15l-4-2.5L16 10Zm-4 3.8 4 2.5-4 2.7-4-2.7 4-2.5Z" fill="currentColor" />
        </svg>
      );
    case "make":
      return (
        <svg {...common}>
          <circle cx="5" cy="12" r="2" fill="currentColor" />
          <circle cx="12" cy="7" r="2" fill="currentColor" />
          <circle cx="19" cy="12" r="2" fill="currentColor" />
          <circle cx="12" cy="17" r="2" fill="currentColor" />
          <path d="M6.8 10.8 10.2 8.3M13.8 8.3l3.4 2.5M17.2 13.2l-3.4 2.5M10.2 15.7l-3.4-2.5" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case "zapier":
      return (
        <svg {...common}>
          <path d="M12 4v16M4 12h16M6.4 6.4l11.2 11.2M17.6 6.4 6.4 17.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="2.4" fill="var(--background)" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      );
    case "n8n":
      return (
        <svg {...common}>
          <path d="M5.5 12h13M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="5" cy="12" r="2.2" fill="var(--background)" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="12" cy="8.5" r="2.2" fill="var(--background)" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="12" cy="15.5" r="2.2" fill="var(--background)" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="19" cy="12" r="2.2" fill="var(--background)" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "openai":
      return (
        <svg {...common}>
          <path d="M12 4.2 15.4 6v4l3.4 2v3.8L15.4 18 12 16l-3.4 2-3.4-2.2V12l3.4-2V6L12 4.2Z" stroke="currentColor" strokeWidth="1.35" strokeLinejoin="round" />
          <path d="M8.6 10 12 12l3.4-2M12 12v4M8.6 6v4M15.4 14v4M5.2 12l3.4 2M18.8 12l-3.4 2" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
        </svg>
      );
    case "anthropic":
      return (
        <svg {...common}>
          <path d="M5 18 10.3 6h3.4L19 18h-3.4l-.9-2.3H9.3L8.4 18H5Zm5.2-5h3.6L12 8.3 10.2 13Z" fill="currentColor" />
        </svg>
      );
  }
}

const integrationLogoAssets: Partial<Record<IntegrationLogo, string>> = {
  airtable: "/logos/integrations/airtable.svg",
  notion: "/logos/integrations/notion.svg",
  sheets: "/logos/integrations/google-sheets-2026.svg",
  slack: "/logos/integrations/slack.svg",
  teams: "/logos/integrations/microsoft-teams.svg",
  stripe: "/logos/integrations/stripe.svg",
  gmail: "/logos/integrations/gmail-2026.svg",
  ramp: "/logos/integrations/ramp.svg",
  drive: "/logos/integrations/google-drive-2026.svg",
  dropbox: "/logos/integrations/dropbox.svg",
  zapier: "/logos/integrations/zapier.svg",
  n8n: "/logos/integrations/n8n.svg",
  openai: "/logos/integrations/openai.svg",
  anthropic: "/logos/integrations/anthropic.svg",
};

const simpleIconFallbacks: Partial<Record<IntegrationLogo, SimpleIcon>> = {
  calendly: siCalendly,
  hubspot: siHubspot,
  make: siMake,
  quickbooks: siQuickbooks,
  workspace: siGoogle,
  xero: siXero,
};

function IntegrationLogoMark({
  logo,
}: {
  logo: IntegrationLogo;
}) {
  const asset = integrationLogoAssets[logo];

  if (asset) {
    return (
      <Image
        src={asset}
        alt=""
        width={24}
        height={24}
        className="h-6 w-6 object-contain"
        loading="lazy"
      />
    );
  }

  const icon = simpleIconFallbacks[logo];

  if (icon) {
    return (
      <svg
        aria-hidden
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ color: `#${icon.hex}` }}
      >
        <path d={icon.path} />
      </svg>
    );
  }

  return <IntegrationMark logo={logo} />;
}

const faqItems = [
  {
    q: "How much does a build cost?",
    a: "Engagements are fixed-price, scoped to one bottleneck. The first call is free and ends with a written quote — or an honest 'this isn't worth building yet.' No retainers, no surprise hourly bills.",
  },
  {
    q: "How long does a build take?",
    a: "Most builds land in four to eight weeks from quote to handoff. We work in weekly checkpoints so you call the shots as scope sharpens — no open-ended timelines, no scope creep.",
  },
  {
    q: "What actually counts as AI for my business?",
    a: "The boring parts that drain your week — sorting leads, drafting proposals, answering routine customer questions, pulling reports from five tools at once. Not chatbots that wow on demo day and confuse your staff on Tuesday.",
  },
  {
    q: "Who actually does the work?",
    a: "Andrew Huynh, hands on keys. No offshore handoff, no junior team you've never met. If something breaks, you call the person who built it.",
  },
  {
    q: "What happens after launch?",
    a: "You own the code, the accounts, and the documentation. We hand off with plain-English instructions and a person on your team trained to run it. The Maintain pillar is an opt-in agreement — not a permanent retainer.",
  },
  {
    q: "Where are you based?",
    a: "Atlanta, Georgia. We work in person with Atlanta-area businesses and remotely with everyone else. Same posture either way — weekly progress, fixed scope, fixed price.",
  },
  {
    q: "What if AI isn't the right fix for my problem?",
    a: "We'll tell you on the first call. Half the bottlenecks we see are solved by a workflow change or a twenty-dollar tool — not a custom build. If that's you, we'll point you in the right direction and call it a good thirty minutes.",
  },
] as const;

void faqItems;

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
            aria-label="NXTECHELON — home"
            className="pointer-events-auto mix-blend-difference"
          >
            <TextScramble
              text="NXTECHELON"
              textClassName="font-mono text-[0.78rem] font-medium uppercase tracking-[0.22em]"
            />
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

        {/* ----- Services ----------------------------------------------- */}
        <section
          className="paper relative"
          aria-labelledby="services-title"
          id="services"
        >
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-12 px-6 py-24 sm:px-10 sm:py-28 lg:grid-cols-[minmax(220px,0.42fr)_minmax(0,1fr)] lg:gap-[6rem] lg:py-36">
            <Reveal>
              <h2
                id="services-title"
                className="font-serif font-normal leading-none text-[clamp(2.1rem,4vw,4.2rem)]"
              >
                What we{" "}
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

        {/* ----- Proof -------------------------------------------------- */}
        <section
          className="paper relative"
          aria-labelledby="proof-title"
          id="proof"
        >
          <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-12 px-6 py-24 sm:px-10 sm:py-28 lg:grid-cols-[minmax(240px,0.4fr)_minmax(0,1fr)] lg:gap-[6rem] lg:py-36">
            <Reveal>
              <div>
                <h2
                  id="proof-title"
                  className="font-serif font-normal leading-none text-[clamp(2.1rem,4vw,4.2rem)]"
                >
                  Proof we{" "}
                  <br />
                  can point to.
                </h2>
                <p className="mt-6 max-w-[48ch] text-base leading-[1.6] text-foreground sm:text-lg">
                  No client logos yet, no fabricated case studies. What we can
                  point to today: the integration coverage to plug into the
                  stack you already use, and a clear before-and-after promise
                  for every engagement that ships.
                </p>
              </div>
            </Reveal>

            <div className="space-y-14">
              <Reveal>
                <div className="grid grid-cols-1 gap-8 border-t border-[color:var(--rule)] pt-8 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)]">
                  <div>
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-petrol">
                      Integration coverage
                    </p>
                    <h3 className="mt-3 max-w-[18ch] font-serif text-[clamp(1.55rem,2.4vw,2.6rem)] font-light leading-[1.05]">
                      Keep the stack. Connect the work.
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-x-10 gap-y-8 min-[560px]:grid-cols-2">
                    {integrationGroups.map((group) => (
                      <div key={group.group}>
                        <h4 className="border-b border-[color:var(--rule)] pb-3 font-mono text-[0.72rem] font-medium uppercase tracking-[0.18em] text-foreground">
                          {group.group}
                        </h4>
                        <ul className="mt-4 flex flex-wrap gap-2.5">
                          {group.tools.map((tool) => (
                            <li
                              key={tool.name}
                              className="group flex min-h-10 max-w-full items-center gap-2 rounded-[2px] border border-[color:var(--rule)] bg-background/35 px-2.5 py-2 text-foreground transition-colors hover:border-petrol hover:text-petrol"
                            >
                              <span
                                className="grid h-8 w-8 shrink-0 place-items-center rounded-[4px] border border-[color:var(--rule)] bg-white p-1 text-ink group-hover:border-petrol"
                                aria-hidden
                              >
                                <IntegrationLogoMark
                                  logo={tool.logo}
                                />
                              </span>
                              <span className="min-w-0 break-words font-mono text-[0.66rem] font-medium uppercase tracking-[0.12em] text-current">
                                {tool.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.04}>
                <div className="border-t border-[color:var(--rule)] pt-8">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-petrol">
                    Results — coming
                  </p>
                  <h3 className="mt-3 max-w-[24ch] font-serif text-[clamp(1.55rem,2.4vw,2.6rem)] font-light leading-[1.05]">
                    Real before-and-after numbers will land here as the first
                    engagements ship.
                  </h3>
                  <p className="mt-4 max-w-[60ch] text-sm leading-[1.6] text-muted-foreground sm:text-base">
                    No fabricated metrics, no stock testimonials. Until those
                    receipts exist, the site itself is the proof — the way it
                    reads is the way the work reads.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

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
                className="font-serif font-normal leading-none text-[clamp(2.1rem,4vw,4.2rem)]"
              >
                How it{" "}
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
                  className="font-serif font-normal leading-none text-[clamp(2.1rem,4vw,4.2rem)]"
                >
                  Andrew Huynh
                </h2>
                <p className="mt-6 max-w-[60ch] text-base leading-[1.65] text-foreground sm:text-lg">
                  Andrew builds AI systems and tools for small and mid-sized
                  businesses in Atlanta and remote. His day work is product
                  security at a Capital Markets firm &mdash; closing critical
                  vulnerabilities in software that moves millions in daily
                  transactions, and automating the busywork that piles up
                  around it. The rest of his time goes into practical AI
                  tooling: a multi-LLM command layer that runs his own
                  knowledge and task workflow, a TypeScript summarizer that
                  cuts long-form review time, and a self-hosted security lab
                  with a hardened Docker stack and a Python vulnerability
                  scanner pulling live CVE data from NVD. The work sits
                  between understanding what the business actually needs and
                  getting the thing built &mdash; not flashy demos, not pitch
                  decks, but software that real teams use every day. Currently
                  booking first engagements.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="border-t border-[color:var(--rule)] pt-6">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-petrol">
                  Things we can build for you
                </p>
                <ul className="mt-6 space-y-5 text-base leading-[1.6] text-foreground sm:text-lg">
                  {buildableSystems.map((system) => (
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
                className="max-w-[18ch] font-serif font-normal leading-[0.98] text-[clamp(2.4rem,5.8vw,6rem)]"
              >
                If you&rsquo;ve already decided AI matters,{" "}
                <em className="italic text-signal">we should talk.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="relative isolate max-w-2xl overflow-hidden rounded-2xl border border-border bg-secondary/30 p-8 backdrop-blur-sm sm:p-10">
                <BorderBeam size={260} duration={11} />

                <div className="relative z-10">
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
                  <BeamButton
                    size="lg"
                    className="group h-12 gap-3 px-7 text-sm tracking-wide"
                    data-booking-trigger
                  >
                    <PhoneCall className="h-4 w-4" strokeWidth={1.8} />
                    Book a 30-minute call
                  </BeamButton>
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
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ----- Site footer -------------------------------------------------
          Lives outside <main> so it's a proper page-level landmark, not the
          tail of the contact section. Three-column layout on desktop —
          brand block, sections nav, contact — then a bottom strip with
          copyright + Privacy/Terms slots. Matches the rest of the site:
          dark surface, Petrol kicker labels, Signal hover accent, hairline
          white/10 rules, Hanken body type, TextScramble wordmark mirroring
          the nav.                                                          */}
      <footer
        aria-label="Site footer"
        className="relative bg-background text-foreground"
      >
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-12 border-t border-white/10 py-16 sm:py-20 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-16">
            {/* Brand block */}
            <div>
              <Link
                href="#top"
                aria-label="NXTECHELON — back to top"
                className="inline-block"
              >
                <TextScramble
                  text="NXTECHELON"
                  textClassName="font-mono text-[0.85rem] font-medium uppercase tracking-[0.22em]"
                />
              </Link>
              <p className="mt-6 max-w-[34ch] text-base leading-[1.6] text-muted-foreground">
                Practical AI and modern websites for small and mid-sized
                businesses. Built in Atlanta, working remote across the U.S.
              </p>
              <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-petrol">
                Now booking first engagements
              </p>
            </div>

            {/* Sections nav */}
            <nav aria-label="Footer sections">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-petrol">
                Sections
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-[1.6] text-foreground">
                <li>
                  <Link
                    href="#services"
                    className="transition-colors hover:text-signal"
                  >
                    What we build
                  </Link>
                </li>
                <li>
                  <Link
                    href="#capabilities"
                    className="transition-colors hover:text-signal"
                  >
                    What you get
                  </Link>
                </li>
                <li>
                  <Link
                    href="#proof"
                    className="transition-colors hover:text-signal"
                  >
                    Proof
                  </Link>
                </li>
                <li>
                  <Link
                    href="#process"
                    className="transition-colors hover:text-signal"
                  >
                    How it goes
                  </Link>
                </li>
                <li>
                  <Link
                    href="#operator"
                    className="transition-colors hover:text-signal"
                  >
                    The operator
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="transition-colors hover:text-signal"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Contact block */}
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-petrol">
                Start a conversation
              </p>
              <div className="mt-5 space-y-4 text-sm leading-[1.6]">
                <button
                  type="button"
                  data-booking-trigger
                  className="group inline-flex items-center gap-2 text-foreground transition-colors hover:text-signal"
                >
                  Book a 30-minute call
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                  />
                </button>
                <p className="text-muted-foreground">
                  Or write &mdash;{" "}
                  <a
                    href={`mailto:${fallbackEmail}`}
                    className="text-foreground underline underline-offset-4 decoration-1 transition-colors hover:text-signal"
                  >
                    {fallbackEmail}
                  </a>
                </p>
                <p className="pt-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground/80">
                  Atlanta &middot; Remote across the U.S.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="flex flex-col items-start gap-3 border-t border-white/10 py-8 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>&copy; 2026 NXTECHELON</span>
            <span className="flex items-center gap-5">
              <Link href="#" className="transition-colors hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="transition-colors hover:text-foreground">
                Terms
              </Link>
              <Link
                href="#top"
                className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
              >
                Top
                <ArrowUpRight className="h-3 w-3" strokeWidth={1.75} />
              </Link>
            </span>
          </div>
        </div>
      </footer>

      <BookingDialog />
    </>
  );
}
