import {
  CalendarDays,
  FileText,
  MessageSquare,
  Share2,
} from "lucide-react";

import { AnimatedList } from "@/components/ui/animated-list";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Bento section — four "moments" that show, not tell. Each card lifts a real
   capability NextEchelon ships and gives it a small, on-brand demonstration.
   --------------------------------------------------------------------------- */

const knowledgeFiles = [
  {
    name: "service-agreement-2026.pdf",
    body: "Standard MSA covering scope, payment terms, IP ownership, and termination.",
  },
  {
    name: "intake-questions.md",
    body: "The 12 questions we ask every new client before the first call.",
  },
  {
    name: "Q3-proposal-template.docx",
    body: "Proposal scaffold with three pricing tiers and a clear deliverables breakdown.",
  },
  {
    name: "runbook-monthly-ops.md",
    body: "Monthly operating cadence: check-ins, quality reviews, model updates.",
  },
  {
    name: "logos.svg",
    body: "Wordmark + monogram + favicon, exportable at any size for the client.",
  },
];

const inboxMessages = [
  {
    sender: "Maria L.",
    avatar: "ML",
    initial: "M",
    color: "var(--petrol)",
    body: "Can you fit me in Tuesday morning?",
    status: "Booked",
    statusTone: "text-signal",
  },
  {
    sender: "Site enquiry",
    avatar: "SQ",
    initial: "S",
    color: "oklch(0.50 0.06 200)",
    body: "Quote for kitchen remodel? 14x18 ft.",
    status: "Drafting",
    statusTone: "text-foreground",
  },
  {
    sender: "James D.",
    avatar: "JD",
    initial: "J",
    color: "var(--petrol)",
    body: "Urgent — water leak under sink.",
    status: "Flagged",
    statusTone: "text-signal",
  },
  {
    sender: "Aisha P.",
    avatar: "AP",
    initial: "A",
    color: "oklch(0.50 0.06 200)",
    body: "Following up on the proposal from last week.",
    status: "Replied",
    statusTone: "text-foreground",
  },
  {
    sender: "Routine",
    avatar: "·",
    initial: "?",
    color: "oklch(0.36 0.014 200)",
    body: "What are your hours on weekends?",
    status: "Auto",
    statusTone: "text-muted-foreground",
  },
  {
    sender: "Spam",
    avatar: "××",
    initial: "×",
    color: "oklch(0.30 0.014 200)",
    body: "Your account has been compromised...",
    status: "Junk",
    statusTone: "text-muted-foreground",
  },
];

const tools = [
  { label: "Gmail",     x: 60,  y: 38  },
  { label: "HubSpot",   x: 340, y: 38  },
  { label: "Stripe",    x: 40,  y: 202 },
  { label: "Calendly",  x: 360, y: 202 },
  { label: "QuickBooks",x: 200, y: 20  },
];

const calendarDays = Array.from({ length: 35 }, (_, i) => i - 2); // grid offset

const features = [
  {
    Icon: FileText,
    name: "Searchable knowledge",
    description:
      "We index every contract, proposal, SOP, and note your team has ever written — so anyone can find anything in seconds, not an hour.",
    href: "#services",
    cta: "How it works",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:24s]"
      >
        {knowledgeFiles.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-44 cursor-pointer overflow-hidden rounded-lg border p-3",
              "border-border bg-secondary/40 hover:bg-secondary/70",
              "transform-gpu blur-[0.5px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
              <figcaption className="truncate font-mono text-[0.7rem] font-medium uppercase tracking-[0.12em] text-foreground">
                {f.name}
              </figcaption>
            </div>
            <blockquote className="mt-2 line-clamp-2 text-[0.72rem] leading-[1.4] text-muted-foreground">
              {f.body}
            </blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: MessageSquare,
    name: "AI receptionist",
    description:
      "Inbound messages get triaged, answered, or routed to the right person — every hour of the day, in your voice.",
    href: "#services",
    cta: "How it works",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute right-4 top-6 h-[280px] w-[min(100%,440px)] overflow-hidden [mask-image:linear-gradient(to_top,transparent_8%,#000_100%)]">
        <AnimatedList delay={1600}>
          {inboxMessages.map((msg, idx) => (
            <div
              key={`${msg.sender}-${idx}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-secondary/70 p-3 shadow-sm backdrop-blur"
            >
              <span
                aria-hidden
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-medium text-paper"
                style={{ background: msg.color }}
              >
                {msg.initial}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2 text-sm">
                  <span className="truncate font-medium text-foreground">
                    {msg.sender}
                  </span>
                </div>
                <p className="truncate text-xs text-muted-foreground">
                  {msg.body}
                </p>
              </div>
              <span
                className={cn(
                  "shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.16em]",
                  msg.statusTone,
                )}
              >
                {msg.status}
              </span>
            </div>
          ))}
        </AnimatedList>
      </div>
    ),
  },
  {
    Icon: Share2,
    name: "Plugs into your stack",
    description:
      "We wire the AI into Gmail, HubSpot, Stripe, Calendly, QuickBooks — whichever tools your team already lives in.",
    href: "#services",
    cta: "Integrations we support",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 [mask-image:linear-gradient(to_top,transparent_8%,#000_100%)]">
        <svg
          viewBox="0 0 400 240"
          className="h-full w-full"
          aria-hidden
          preserveAspectRatio="xMidYMid meet"
        >
          {/* connectors */}
          {tools.map((tool) => (
            <line
              key={`line-${tool.label}`}
              x1="200"
              y1="120"
              x2={tool.x}
              y2={tool.y}
              stroke="var(--border)"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
          ))}
          {/* animated beams (one per line) */}
          {tools.map((tool, i) => (
            <line
              key={`beam-${tool.label}`}
              x1="200"
              y1="120"
              x2={tool.x}
              y2={tool.y}
              stroke="var(--signal)"
              strokeWidth="1.5"
              strokeDasharray="10 200"
              className="animate-beam-flow"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
          ))}
          {/* outer nodes */}
          {tools.map((tool) => (
            <g key={`node-${tool.label}`}>
              <circle
                cx={tool.x}
                cy={tool.y}
                r="18"
                fill="var(--background)"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <text
                x={tool.x}
                y={tool.y + 3}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="7"
                letterSpacing="1"
                fill="var(--foreground)"
                className="uppercase"
              >
                {tool.label}
              </text>
            </g>
          ))}
          {/* center node */}
          <circle cx="200" cy="120" r="24" fill="var(--signal)" />
          <text
            x="200"
            y="124"
            textAnchor="middle"
            fontFamily="var(--font-serif)"
            fontSize="20"
            fontStyle="italic"
            fill="var(--ink)"
          >
            N
          </text>
        </svg>
      </div>
    ),
  },
  {
    Icon: CalendarDays,
    name: "Self-serve booking",
    description:
      "Customers schedule themselves. You stop playing phone tag. Your calendar fills the way you actually want it filled.",
    className: "col-span-3 lg:col-span-1",
    href: "#contact",
    cta: "Book a call yourself",
    background: (
      <div className="absolute right-4 top-10 origin-top scale-90 transition-transform duration-300 ease-out group-hover:scale-100">
        <div className="rounded-lg border border-border bg-secondary/60 p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground">
              October 2026
            </p>
            <div className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" aria-hidden />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" aria-hidden />
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <span
                key={`${d}-${i}`}
                className="font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground/70"
              >
                {d}
              </span>
            ))}
            {calendarDays.map((dayOffset, i) => {
              const day = dayOffset + 1;
              const isCurrentMonth = day >= 1 && day <= 31;
              const isHighlighted = day === 14;
              const isAvailable = [3, 7, 10, 17, 21, 24, 28].includes(day);
              return (
                <span
                  key={i}
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded font-mono text-[0.62rem]",
                    !isCurrentMonth && "text-muted-foreground/30",
                    isCurrentMonth && !isHighlighted && !isAvailable && "text-foreground/70",
                    isAvailable && "text-foreground bg-secondary border border-border",
                    isHighlighted && "bg-signal text-ink font-medium",
                  )}
                >
                  {isCurrentMonth ? day : ""}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    ),
  },
] as const;

export function BentoSection() {
  return (
    <section
      aria-labelledby="capabilities-title"
      id="capabilities"
      className="relative bg-background text-foreground"
    >
      <div className="mx-auto max-w-[1180px] px-6 py-28 sm:px-10 lg:py-40">
        <div className="mx-auto mb-14 max-w-[820px] text-center sm:mb-20">
          <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-signal">
            What you get
          </p>
          <h2
            id="capabilities-title"
            className="mt-4 font-serif font-light leading-[0.98] text-[clamp(2rem,4vw,3.75rem)]"
          >
            Four pieces that work together&nbsp;&mdash;{" "}
            <em className="italic text-petrol">on day one.</em>
          </h2>
          <p className="mx-auto mt-5 max-w-[58ch] text-base leading-[1.6] text-muted-foreground sm:text-lg">
            Each system below is one of ours. Hover any card to see how it
            shows up in your day&mdash;handled before you noticed it needed
            handling.
          </p>
        </div>

        <BentoGrid>
          {features.map((feature) => (
            <BentoCard key={feature.name} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
