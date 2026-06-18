# CLAUDE.md — NXTECHELON

> Authoritative entry point for any agent picking up this project cold.
> Read this in full before generating or modifying code.

---

## One-line positioning

**NXTECHELON** is an AI build studio for time-poor SMB operators in Atlanta and remote. Quiet authority. Operator, not tutorial. **The site is the proof.**

The marketing site exists to convert a scanning, time-poor visitor into a booked 30-minute intake call by establishing two things at once: senior-advisor judgment (we understand your business) and operator-grade technical credibility (we can actually build it).

- **Wordmark:** NXTECHELON
- **Domain:** [nextechelon.site](https://nextechelon.site)
- **Founder:** Andrew Huynh, Atlanta, GA
- **Fallback contact:** huynh.andrew2021@gmail.com
- **Booking:** Cal.com via native `<dialog>` (handle TBD — see TODOs)

---

## Read order (non-optional)

1. **[`PRODUCT.md`](./PRODUCT.md)** — strategic brief. Register, users, brand personality, anti-references, design principles, accessibility floor.
2. **[`DESIGN.md`](./DESIGN.md)** — visual system seed. North Star, color anchor (Petrol Teal), type direction, motion energy, named rules.
3. **[`BRIEF.md`](./BRIEF.md)** — landing-page task brief. Six-beat layout, stack pivot notice, states, content slots, open questions.
4. This file — the reconciled agent context layered on top of the three above.

When the three docs disagree with each other, this file is the tiebreaker.

---

## Project state (2026-06-18)

- **Landing page is built and ships clean.** `npm run build` produces a green production build with the `/` route prerendered as static content.
- **Stack pivoted 2026-06-17** from the original CSS Modules + GSAP + Lenis + SplitType + HTML-Canvas signature element to the shadcn / Tailwind v4 / framer-motion stack documented below.
- **Page composition extended beyond BRIEF.md's original §8 ("type, motion, and one canvas").** The page now uses additional shadcn-style motion primitives (BentoSection, BorderBeam, SlideTabs, TextScramble, marquee, animated-list). These are sanctioned — see "Page structure" below — but every one of them must justify its place against the DESIGN.md don'ts before another is added.
- **Pre-launch blockers** (see TODOs): Andrew's one-line technical background, real Cal.com handle for `NEXT_PUBLIC_BOOKING_URL`, FAQ question list, reduced-motion audit on the new components.

---

## Stack (locked, as shipped)

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind v4 (CSS-based `@theme` config in `app/globals.css`) |
| Component baseline | shadcn `new-york` preset at `components/ui/` |
| Motion | framer-motion. One shared `<Reveal>` choreography carries every scroll-in headline. Hero rotating-phrase uses a controlled spring (stiffness 90, damping 16) per the "no bounce/elastic" rule. |
| Fonts | `next/font/google` — Source Serif 4 (display, regular + light + italic), Hanken Grotesk (body, regular + medium + semibold), JetBrains Mono (labels). Self-hosted by Next; no runtime Google CDN fetch. **Inter is explicitly banned** (reflex-reject list — see DESIGN.md §3). |
| Icons | lucide-react |
| Booking | Cal.com embed via native `<dialog>` (`components/ui/booking-dialog.tsx`). Triggered by any element with `data-booking-trigger`. URL from `NEXT_PUBLIC_BOOKING_URL`. |
| Hosting | Vercel. Single route, statically prerendered. |
| Analytics | None yet. When added: Plausible or Vercel Analytics. |

Do not introduce dependencies without explicit approval. Every new shadcn block must be checked against the DESIGN.md don'ts before being added.

---

## File map

```
app/
  globals.css              Tailwind v4 @theme + brand OKLCH tokens + shadcn vars
  layout.tsx               next/font wiring, metadata
  page.tsx                 Full landing composition (six beats + FAQ)
components/ui/
  animated-hero.tsx        Rotating-phrase hero, framer-motion spring
  animated-list.tsx        Vertical reveal list (Process / FAQ)
  bento-grid.tsx           Tonal-layered grid primitive
  bento-section.tsx        Services / capability layout built on bento-grid
  booking-dialog.tsx       Native <dialog> Cal.com embed, data-booking-trigger
  border-beam.tsx          One-shot beam animation for the hero signature
  button.tsx               shadcn button (variants: default, ghost, outline, …)
  hero-demo.tsx            Demo wrapper kept for reference; not in /
  marquee.tsx              Mono-strip / capability marquee
  reveal.tsx               Single shared scroll-into-view choreography
  slide-tabs.tsx           Persistent top nav with sliding indicator
  text-scramble.tsx        Headline reveal (one moment per page, not decoration)
lib/
  utils.ts                 cn() (clsx + tailwind-merge)
components.json            shadcn config (new-york style, neutral baseColor)
PRODUCT.md / DESIGN.md / BRIEF.md / CLAUDE.md
```

---

## Audience

**Page voice = one persona:** a time-poor business owner who knows AI matters and knows they are behind. They have judgment about their business but not time, language, or technical bandwidth to build with AI themselves. Their visit is a brief evaluation window between meetings, scanning for signals of competence. They are not here to learn about AI — they are here to find someone who will actually build the thing for them.

**Internal targeting frame (sales / SEO, never in the copy):**

1. **Local Atlanta service businesses** (primary). Real estate agencies/brokerages, law firms, medical/dental practices, home services (HVAC, roofing, landscaping), auto shops. Pain: outdated site, slow lead response, missed calls, manual booking, no follow-up system.
2. **Small B2B companies ready to scale** (secondary). Pain: founder-led sales, no website conversion, manual lead qualification, inconsistent outreach. Sells: lead-gen AI agents, RAG-powered internal tools, sales automation, AI-enhanced CRM workflows.

The page reads as one voice to one operator. The two ICPs shape which keywords carry weight in SEO and which case studies eventually live in the Proof section — they never become visible "for [persona]" copy switches on the page.

---

## Voice

Senior advisor + operator. Editorial restraint. Mature, technical, decisive. Confident enough to be quiet.

- Display copy (hero, section openers, Operator closer) is Source Serif 4 — advisor register.
- Body copy is Hanken Grotesk — operator register. Plain-spoken. No hype words.
- Mono accents (JetBrains Mono) are for small technical detail and the hero meta strip. Not for decoration.
- Microcopy bans (from PRODUCT.md): no "transform / accelerate / unlock / empower / revolutionize / leverage / supercharge / unleash / cutting-edge / game-changing / let's chat." No "trusted by the world's leading…" No marketing exclamation marks.
- Every sentence is specific or it's cut.

When two readings of a line are plausible, choose the one that assumes the reader is sophisticated.

---

## Page structure (locked)

The page is six editorial beats, with a quiet FAQ block added between Operator and Contact:

1. **Hero (dark / Ink)** — three-line display headline with the rotating phrase (operator-voice nouns cycling on the framer-motion spring). Announcement chip above; sub-paragraph + two CTAs below; mono meta strip closes.
2. **Thesis (light / Paper)** — one large editorial paragraph. Kinetic word reveal on scroll-in. No bullets, no icons.
3. **Services (light / Paper)** — **three pillars: Build / Connect / Maintain.** Type-led blocks, not cards. Each lane: large verb, one paragraph, one specific concrete example. Implemented today via `BentoSection`.
4. **Process (dark / Ink)** — real numbered sequence (1 → 2 → 3 → 4): **Find the bottleneck → Focused build → Launch → Hand off the keys.** The *one* deliberate numbered moment on the page.
5. **Operator (light / Paper)** — founder credibility block. Capability-first, no fabricated history. Bio stub: *"Andrew Huynh builds AI systems and tools for SMBs in Atlanta. Background in [TBD — one truthful line]. Currently booking first engagements."* No portrait until a real B&W photo is provided.
6. **FAQ (light / Paper)** — quiet advisor-voice section answering the 5–8 objections a scanning operator brings to a pre-portfolio studio: price, timeline, "what counts as AI for my business," ownership/handoff, what happens after launch, where Andrew is based, who actually does the work. Type-only, no accordion ornaments.
7. **Contact (dark / Ink)** — closer headline (one decisive sentence), single CTA to book, fallback email line. Minimal footer with wordmark, year, one or two links.

**Explicitly NOT on the page:**

- **No Social Proof / logo strip** until real logos exist. A placeholder strip is the cheap-consulting tell DESIGN.md bans.
- **No separate "Outcomes / What You Get" benefit grid.** The services pillars already do this work.
- **No problem/agitation cards.** The thesis paragraph carries the stance.
- **No category eyebrows** above sections (`ABOUT` / `PROCESS` / `PRICING`). The headline introduces the section.
- **No `01 / 02 / 03` numbered scaffolding** anywhere except Process — that section IS an ordered sequence and earns the numbers.

Dark/light pivots between sections are scroll-driven crossfades on body color tokens — not abrupt, not parallax-flashy. The pivot itself is part of the rhythm.

---

## Proof posture (pre-portfolio)

Until real testimonials and shipped client systems exist, the Operator section leans on capability statements — "things we can build for clients" — rather than fabricated proof. The existing four-line list in `app/page.tsx` (lead triage, proposal/contract search, customer-question routing, weekly briefing) reads as *capability examples*, not as claimed work.

**Rules:**

- Do not invent operator credentials, client names, logos, case studies, or numbers.
- Do not write "trusted by…" or "joined N businesses…" while N is fabricated.
- When real proof lands, the four capability lines get rewritten as real verb-led shipped systems with metrics; the section header shifts from capabilities to proof.
- Treat the site itself as the load-bearing proof in the meantime. Craft is the credential.

---

## Hard rules (always-on guardrails)

Carried forward from PRODUCT.md and DESIGN.md. Do not violate without checking first.

- **Color:** Restrained near-mono + Petrol Teal anchor. Signal Accent (warm oxide-orange) on ≤10% of any screen. Background is true off-white or tinted toward the brand teal — **never cream / sand / paper-warm**.
- **Type:** Editorial serif display + disciplined sans body. Body text is set in Ink, never pale gray. Body contrast ≥ 4.5:1, large text ≥ 3:1. Cap body line length at 65–75ch. `text-wrap: balance` on h1–h3.
- **Layout:** Flat by default — depth is tonal, not shadow. No glassmorphism as default. No side-stripe borders. No gradient text or backgrounds. Button radius small and disciplined (0–4px).
- **Motion:** Choreographed entrances and scroll sequences. **Every animation ships with a `prefers-reduced-motion: reduce` alternative.** The shared `Reveal` component already honors this via `useReducedMotion()`. The newer primitives (`BorderBeam`, `TextScramble`, `marquee`, `animated-list`) need an audit — see TODOs. No animation on CSS layout properties; compose on `transform` and `opacity`. Reveal animations enhance an already-visible default — never gate content visibility on a JS class.
- **Pattern bans:** No SaaS-template hero (gradient + three feature cards + hero-metric block). No cheap-consulting tropes (stock photos, "transform your business," handshake imagery, rotating logo carousels). No playful mascots, Notion-style doodles, Duolingo characters. No AWS / GCP console aesthetic. No tracked-uppercase eyebrows. No decorative numbered scaffolding outside Process.
- **A11y:** WCAG 2.2 AA. Full keyboard navigation with designed focus states (Signal Accent ring, 3px offset — not the browser default). Semantic HTML, landmark regions, heading order intact. Color is never the only carrier of meaning. JS-disabled fallback: all copy server-rendered, CTA falls back to a direct anchor link to `cal.com/<handle>`.

---

## Booking & email wiring

- The booking dialog opens whenever any element with `data-booking-trigger` is clicked. Cal.com URL comes from `NEXT_PUBLIC_BOOKING_URL`.
- Fallback email in `app/page.tsx` should be `huynh.andrew2021@gmail.com` (currently still `hello@example.com` — fix on the next pass).
- Add a build-time guard that fails the build if the email contains `example.com` or `NEXT_PUBLIC_BOOKING_URL` is unset in production.

---

## Dev commands

```bash
npm install
npm run dev         # http://localhost:3000
npm run build       # production build (statically prerendered)
npm run typecheck   # tsc --noEmit
npm run lint        # next lint (eslint flat config)
```

- The shadcn config lives at `components.json`. To add another component: `npx shadcn@latest add <name>` (lands in `components/ui/`). Audit it against DESIGN.md don'ts before merging.
- The brand semantic-token map lives at the top of `app/globals.css`. To recolor anything globally, edit the `:root` and `.paper` blocks.

---

## Open TODOs (blocking launch)

1. **Andrew's one-line background** for the Operator bio stub.
2. **Real Cal.com handle** → set `NEXT_PUBLIC_BOOKING_URL` in `.env.local` (and Vercel project env).
3. **Replace `hello@example.com`** in `app/page.tsx` with `huynh.andrew2021@gmail.com`.
4. **FAQ question list** — draft 5–8 questions in advisor voice (price, timeline, "what counts as AI," ownership/handoff, post-launch, geography, who builds), Andrew edits.
5. **Reduced-motion audit** on `BorderBeam`, `TextScramble`, `marquee`, `animated-list`. Each must respect `useReducedMotion()` and degrade to instant / crossfade.
6. **JS-disabled smoke test** — confirm no section's content is gated on framer-motion mount.
7. **OKLCH contrast verification** in browser DevTools — verify body text clears AA on every section's background.
8. **Update BRIEF.md §8** to sanction the added components (BentoSection, BorderBeam, SlideTabs, TextScramble, marquee, animated-list) so the brief stops disagreeing with reality.

---

## What NOT to touch

- **Don't fabricate proof.** No invented testimonials, client logos, case studies, or numbers. If the bio TBD line is unanswered, ship the page with the capability framing — don't paper over the gap with fake credentials.
- **Don't introduce Inter, Geist, or Satoshi** as the body font. They are on DESIGN.md's reflex-reject list. Hanken Grotesk is the body font; Source Serif 4 is display.
- **Don't add a logo strip, gradient hero, three-feature-card grid, or eyebrow-tracked-uppercase pattern.** Those are the exact SaaS-template tells PRODUCT.md rejects.
- **Don't add components without auditing against DESIGN.md §6 don'ts.** Especially anything with gradient text, side-stripe borders, ambient glow shadows, or glassmorphism.
- **Don't move the Cal.com booking into a custom form.** The native `<dialog>` + Cal.com embed is the committed pattern.
- **Don't track or load third-party scripts without confirmation.** Analytics is post-launch; tracking comes with a cookie banner and a privacy page.
- **Don't drift CLAUDE.md from PRODUCT / DESIGN / BRIEF again.** When you change a load-bearing decision (stack, voice, structure), update this file in the same commit.
