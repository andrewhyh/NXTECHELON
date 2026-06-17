# NXTECHELON — Agent Context

Pick this up cold. Everything you need is on disk.

## Read order (non-optional)

1. **[`PRODUCT.md`](./PRODUCT.md)** — strategic brief. Register, users, brand personality, anti-references, design principles, accessibility floor. ~50 lines.
2. **[`DESIGN.md`](./DESIGN.md)** — visual system seed. North Star, color anchor (Petrol Teal), type direction, motion energy, named rules, do's and don'ts. ~80 lines.
3. **[`BRIEF.md`](./BRIEF.md)** — the active task brief for the landing page. Originally confirmed 2026-06-16; **stack pivoted on 2026-06-17** (see the Stack Pivot Notice near the top). Sections, stack, states, content slots, open questions. ~200 lines.

## One-line positioning

NXTECHELON is an AI build studio for time-poor business owners who know they need AI and need someone to actually build it. Quiet authority. Operator, not tutorial. **The site is the proof.**

## Project state on 2026-06-17

- **Landing page is built and ships clean.** `npm run build` produces a green production build with the `/` route prerendered as static content. Page weight ~50KB; First Load JS ~152KB.
- **Confirmed stack (live):** Next.js 15 (App Router) + TypeScript + **Tailwind v4** (`@theme`-based config in `app/globals.css`) + **shadcn (`new-york` preset)** at `components/ui/` + **framer-motion** + **lucide-react** + **next/font/google** (Source Serif 4 + Hanken Grotesk + JetBrains Mono). Cal.com embedded via a native `<dialog>` triggered by any `data-booking-trigger` element.
- **What changed from the pre-2026-06-17 brief:** the project was originally CSS Modules + GSAP + Lenis + SplitType + @fontsource + a bespoke HTML-Canvas signature element. That implementation was deleted in the pivot and rebuilt in the shadcn/Tailwind stack. Söhne (paid) → Hanken Grotesk (free, non-reflex). Inter was avoided because it's on the impeccable brand-register reflex-reject list.
- **Blocking inputs needed from the user before launch:** founder bio + 3–5 specific systems shipped (currently the "Jordan Vale" placeholder in `app/page.tsx`), real Cal.com handle (set `NEXT_PUBLIC_BOOKING_URL` in `.env.local`), fallback contact email (currently `hello@example.com` in `app/page.tsx`). See BRIEF.md §12.

## File map

```
app/
  globals.css              Tailwind v4 @theme + brand OKLCH tokens + shadcn vars
  layout.tsx               next/font wiring, metadata
  page.tsx                 Full landing composition (hero + 5 sections)
components/ui/
  animated-hero.tsx        Rotating-phrase hero, framer-motion spring
  booking-dialog.tsx       Native <dialog> Cal.com embed, data-booking-trigger
  button.tsx               shadcn button (variants: default, ghost, outline, …)
  hero-demo.tsx            The supplied demo wrapper (kept for completeness)
  reveal.tsx               Single shared scroll-into-view choreography
lib/
  utils.ts                 `cn()` (clsx + tailwind-merge)
components.json            shadcn config (new-york style, neutral baseColor)
PRODUCT.md / DESIGN.md / BRIEF.md / CLAUDE.md / AGENTS.md
```

## Hard rules (always-on guardrails)

These come from PRODUCT.md and DESIGN.md. Do not violate them without explicitly checking with the user first:

- **Color:** Restrained near-mono + Petrol Teal anchor. Signal Accent on ≤10% of any screen. Background is true off-white or tinted toward the brand teal — **never cream / sand / paper-warm**.
- **Type:** Editorial serif display + disciplined sans body. Body text is set in Ink, never pale gray. Body contrast ≥ 4.5:1, large text ≥ 3:1. Cap body line length at 65–75ch.
- **Layout:** Flat by default — depth is tonal, not shadow. No glassmorphism as default. No side-stripe borders. No gradient text or backgrounds.
- **Motion:** Choreographed entrances and scroll sequences. **Every animation ships with a `prefers-reduced-motion: reduce` alternative** — the existing `Reveal` component already honors this via `useReducedMotion()`. No animation on CSS layout properties. Reveal animations enhance an already-visible default — never gate content visibility on a JS class.
- **Pattern bans:** No SaaS-template hero (gradient + three feature cards + hero-metric). No cheap-consulting tropes (stock photos, "transform your business"). No playful mascots. No AWS / GCP console aesthetic. No tiny tracked uppercase eyebrow above every section. No `01 / 02 / 03` numbered scaffolding except in sections that ARE ordered sequences — the Process section is the one legitimate use on this page.
- **A11y:** WCAG 2.2 AA. Full keyboard navigation with designed focus states (Signal Accent ring, 3px offset). Semantic HTML. Color is never the only carrier of meaning.

## Working with this project

This project was set up using Anthropic's `impeccable` design skill (a Claude Code skill). If you are an agent without that skill loaded (e.g. Codex), you can still work directly from the three docs above — they are the authoritative context, not the skill. The skill produced them; the files stand alone.

### Running the project

```bash
npm install
npm run dev         # http://localhost:3000
npm run build       # production build (statically prerendered)
npm run typecheck   # tsc --noEmit
npm run lint        # next lint (eslint flat config)
```

### Things to know

- The shadcn config is at `components.json`. To add another component: `npx shadcn@latest add <name>` (will land in `components/ui/`).
- The brand semantic-token map lives at the top of `app/globals.css`. To recolor anything globally, edit the `:root` and `.paper` blocks.
- The booking dialog opens whenever any element with `data-booking-trigger` is clicked. Cal.com URL comes from `NEXT_PUBLIC_BOOKING_URL` (set in `.env.local` for real bookings).
