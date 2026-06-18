# CLAUDE.md — NXTECHELON

> Authoritative entry point for any agent picking up this project cold.
> Read this in full before generating or modifying code.

---

## One-line positioning

**NXTECHELON** is an AI build studio for time-poor SMB operators in Atlanta and remote. Quiet authority. Operator, not tutorial. **The site is the proof.**

The marketing site exists to convert a scanning, time-poor visitor into a booked 30-minute intake call by establishing two things at once: senior-advisor judgment (we understand your business) and operator-grade technical credibility (we can actually build it).

- **Wordmark:** NXTECHELON
- **Domain:** [nextechelon.site](https://nextechelon.site)
- **Founder:** Andrew Huynh, Atlanta, GA. Product security at a Capital Markets firm by day; ships practical AI tooling (multi-LLM command layer, TypeScript summarizer, self-hosted security lab) the rest of the time. B.S. Cybersecurity, Kennesaw State (2024).
- **Fallback contact:** huynh.andrew2021@gmail.com
- **Booking:** Cal.com via native `<dialog>` — live handle `cal.com/nxtechelon/30min`. Override via `NEXT_PUBLIC_BOOKING_URL` for preview/staging deploys.

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
| Fonts | `next/font/google` — **Spectral** (display, light/regular/medium/semibold + italic), **Hanken Grotesk** (body, 300/400/500/600/700 + italic). Self-hosted by Next; no runtime Google CDN fetch. No true mono shipped — `font-mono` is rebound to Hanken in `globals.css`; the small-caps tracked label treatment carries the label role. **Inter is explicitly banned** (reflex-reject list — see DESIGN.md §3). |
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
  animated-list.tsx        Sequential message-stack reveal (bento receptionist)
  beam-button.tsx          Primary CTA button with conic-beam border treatment
  bento-grid.tsx           Tonal-layered grid primitive
  bento-section.tsx        "Show, don't tell" capability layout built on bento-grid
  booking-dialog.tsx       Native <dialog> Cal.com embed, data-booking-trigger
  border-beam.tsx          Sweep animation around the Contact booking card
  button.tsx               shadcn button (variants: default, ghost, outline, …)
  hero-demo.tsx            Demo wrapper kept for reference; not in /
  marquee.tsx              Horizontal infinite scroll (bento searchable-knowledge)
  reveal.tsx               Single shared scroll-into-view choreography
  slide-tabs.tsx           Persistent top nav with sliding indicator
  text-scramble.tsx        Wordmark hover scramble (one moment per page, not decoration)
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

- Display copy (hero, section openers, Operator closer) is Spectral — advisor register, italic for signal moments (the rotating hero phrase, the "we should talk" closer).
- Body copy is Hanken Grotesk — operator register. Plain-spoken. No hype words.
- Label / kicker copy uses Tailwind's `font-mono` utility (currently rebound to Hanken with small-caps tracking) for the hero meta strip, credential roadmap kickers, and section eyebrows where they're earned. Not for decoration.
- Microcopy bans (from PRODUCT.md): no "transform / accelerate / unlock / empower / revolutionize / leverage / supercharge / unleash / cutting-edge / game-changing / let's chat." No "trusted by the world's leading…" No marketing exclamation marks.
- Every sentence is specific or it's cut.

When two readings of a line are plausible, choose the one that assumes the reader is sophisticated.

---

## Page structure (locked)

The live page (top to bottom):

1. **Sticky top nav** — wordmark (left, with TextScramble on hover, `mix-blend-difference` for legibility across dark/light pivots), `SlideTabs` with section anchors (center, lg+), "Book a call" trigger (right).
2. **Hero (dark / Ink)** — three-line display headline with the rotating phrase (operator-voice nouns cycling on a framer-motion spring; the "We ship the / *follow-up tools* / you don't have time to build" composition). Sub-paragraph below; two CTAs (primary "Book a call" in Signal, ghost "See how we work"); mono meta strip closes (`Est. 2026 · Atlanta + Remote · Now taking new clients`).
3. **Services (light / Paper)** — **three pillars: Build / Connect / Maintain.** Type-led blocks, not cards. Each lane: large verb, one paragraph, one specific concrete example.
4. **BentoSection (light / Paper)** — "show, don't tell" capability moments. Tonal-layered grid; the `AnimatedList` "AI receptionist" panel and the `Marquee` "searchable knowledge" panel live here.
5. **Proof (light / Paper)** — pre-portfolio framing. Three blocks: (a) credential roadmap (four free credentials with honest "Free" tags), (b) integration coverage (four groups × five tools, each with a monochrome tool mark — these are *tool* marks, not client logos), (c) a "Results — coming" note that says no fabricated metrics until real receipts exist.
6. **Process (dark / Ink)** — real numbered sequence (`01 → 02 → 03 → 04`): **Find the bottleneck → Focused build → Launch → Hand off the keys.** The *one* deliberate numbered moment on the page.
7. **Operator (light / Paper)** — founder credibility block. Capability-first, no fabricated history. Bio uses the live stub: *"Andrew builds AI systems and tools for small and mid-sized businesses in Atlanta and remote. Background in [TBD — one truthful line]. … Currently booking first engagements."* Right column: "Things we can build for you" — four buildable capability examples. No portrait until a real B&W photo is provided.
8. **Contact (dark / Ink)** — closer headline (one decisive sentence with italic-Signal "we should talk"), one boxed CTA card with `BorderBeam`, fallback email line. Minimal footer with wordmark, year, one or two links.

**Deferred / parked (data exists, not rendered):**

- **FAQ.** A 7-item advisor-voice FAQ (price, timeline, what counts as AI, who does the work, post-launch, geography, no-AI cases) is parked as `archivedFaqItems` in `app/page.tsx`. The block was prepared and then deferred — surface it again when objections become a load-bearing concern (or when the first sales call shows the page isn't answering them).

**Explicitly NOT on the page:**

- **No Social Proof / client logo strip** until real logos exist. A placeholder strip is the cheap-consulting tell DESIGN.md bans. (The integration coverage in Proof is tool marks, not client proof — different signal.)
- **No separate "Outcomes / What You Get" benefit grid.** The services pillars already do this work.
- **No problem/agitation cards.** The hero sub and Services do that work.
- **No category eyebrows** above sections (`ABOUT` / `PROCESS` / `PRICING`). The headline introduces the section.
- **No `01 / 02 / 03` numbered scaffolding** anywhere except Process — that section IS an ordered sequence and earns the numbers.
- **No fabricated case studies with placeholder metrics.** The previous "Results need receipts" placeholder block was replaced by an honest "Results — coming" note.

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
- **Motion:** Choreographed entrances and scroll sequences. **Every animation ships with a `prefers-reduced-motion: reduce` alternative** — audited 2026-06-18: `Reveal`, `AnimatedList`, `Hero`, and `TextScramble` honor this via `useReducedMotion()`; `BorderBeam`, `Marquee`, and the load-fade keyframes are disabled by the `@media (prefers-reduced-motion: reduce)` block in `globals.css`. No animation on CSS layout properties; compose on `transform` and `opacity`. Reveal animations enhance an already-visible default — JS-disabled users get a populated page via the `<noscript>` style block in `app/layout.tsx` that forces `[data-reveal]` to `opacity: 1` and shows phrase 0 of the rotating hero headline.
- **Pattern bans:** No SaaS-template hero (gradient + three feature cards + hero-metric block). No cheap-consulting tropes (stock photos, "transform your business," handshake imagery, rotating logo carousels). No playful mascots, Notion-style doodles, Duolingo characters. No AWS / GCP console aesthetic. No tracked-uppercase eyebrows. No decorative numbered scaffolding outside Process.
- **A11y:** WCAG 2.2 AA. Full keyboard navigation with designed focus states (Signal Accent ring, 3px offset — not the browser default). Semantic HTML, landmark regions, heading order intact. Color is never the only carrier of meaning. JS-disabled fallback: all copy server-rendered, CTA falls back to a direct anchor link to `cal.com/<handle>`.

---

## Booking & email wiring

- The booking dialog opens whenever any element with `data-booking-trigger` is clicked. Cal.com URL comes from `NEXT_PUBLIC_BOOKING_URL`, with a hard-coded fallback to `https://cal.com/nxtechelon/30min` so the dialog works even without the env var.
- `.env.local` sets `NEXT_PUBLIC_BOOKING_URL=https://cal.com/nxtechelon/30min` for local dev. Mirror this in the Vercel project env vars for production parity.
- Fallback email in `app/page.tsx` is `huynh.andrew2021@gmail.com` (live).
- The `metadataBase` in `app/layout.tsx` points at `https://nextechelon.site` — keep this in sync if the production domain ever changes.

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

## Open TODOs

### Done 2026-06-18

- ✅ **Cal.com handle wired live.** `cal.com/nxtechelon/30min` is now the hard-coded fallback in `components/ui/booking-dialog.tsx`; `.env.local` also sets `NEXT_PUBLIC_BOOKING_URL` for explicit dev/Vercel parity. The booking dialog's placeholder meta paragraph was replaced with operator-voice copy.
- ✅ **Andrew's bio is real.** The Operator section now reads a full paragraph from Andrew's resume (product security at a Capital Markets firm; multi-LLM command layer, TypeScript summarizer, self-hosted security lab). No `[TBD]` left in the page.
- ✅ Replaced `hello@example.com` with `huynh.andrew2021@gmail.com` in `app/page.tsx`.
- ✅ Replaced "Jordan Vale" placeholder with Andrew Huynh in the Operator section; reframed bio as capability-first.
- ✅ Reframed "Placeholder examples" kicker → "Things we can build for you"; stripped "Built a placeholder" wording from the buildable systems list.
- ✅ Removed the fabricated case-study slots block + data ("Replace with real metric"); replaced with an honest "Results — coming" note.
- ✅ Replaced the "Atomic Actions uses badges..." meta-commentary paragraph in the Proof intro with an honest pre-portfolio framing.
- ✅ Fixed hero meta strip: "Brooklyn + Remote" → "Atlanta + Remote".
- ✅ Fixed `metadataBase` in `app/layout.tsx`: `https://nxtechelon.com` → `https://nextechelon.site`.
- ✅ Reduced-motion audit complete. `TextScramble` now gates its scramble loop on `useReducedMotion()`; the others were already compliant.
- ✅ JS-disabled fallback added in `app/layout.tsx` as a `<noscript>` `<style>` block targeting `[data-reveal]`, `[data-motion-fade]`, and `[data-rotating-phrase]`. `Reveal` carries `data-reveal`; the hero rotating spans carry `data-rotating-phrase={index}`.
- ✅ Updated BRIEF.md §8 to sanction the live component set (BentoSection, BorderBeam, TextScramble, SlideTabs, Marquee, AnimatedList) and BRIEF.md §9 to reflect the actual Spectral + Hanken pairing (originally Source Serif 4 + Hanken + JetBrains Mono).
- ✅ FAQ section was prepared (7 advisor-voice items), then deferred per project decision. The data lives as `archivedFaqItems` in `app/page.tsx` and the section is not rendered.

### Still worth doing pre-launch

1. **OKLCH contrast verification** in browser DevTools — verify body text clears WCAG AA on every section's background. Tokens look fine analytically (Paper L 0.97 ↔ Ink L 0.18; Vellum L 0.62 against Paper ≈ 4.6:1) but verify in-browser before locking, especially `text-muted-foreground` on `paper` and `text-muted-foreground/70` on the hero meta strip.
2. **Mirror `NEXT_PUBLIC_BOOKING_URL` in the Vercel project env** so preview deploys and production stay in sync with the live Cal handle (`.env.local` only covers local dev).
3. **Lighthouse pass.** Target ≥ 95 on Performance/Accessibility/Best Practices/SEO per PRODUCT.md §accessibility floor + brief expectations.
4. **Optional:** decide whether to name FIS by name in the Operator bio. The current copy reads "a Capital Markets firm" — swap to "at FIS – Capital Markets" if Andrew wants it explicit.

---

## What NOT to touch

- **Don't fabricate proof.** No invented testimonials, client logos, case studies, or numbers. If the bio TBD line is unanswered, ship the page with the capability framing — don't paper over the gap with fake credentials.
- **Don't introduce Inter, Geist, or Satoshi** as the body font. They are on DESIGN.md's reflex-reject list. Hanken Grotesk is the body font; Source Serif 4 is display.
- **Don't add a logo strip, gradient hero, three-feature-card grid, or eyebrow-tracked-uppercase pattern.** Those are the exact SaaS-template tells PRODUCT.md rejects.
- **Don't add components without auditing against DESIGN.md §6 don'ts.** Especially anything with gradient text, side-stripe borders, ambient glow shadows, or glassmorphism.
- **Don't move the Cal.com booking into a custom form.** The native `<dialog>` + Cal.com embed is the committed pattern.
- **Don't track or load third-party scripts without confirmation.** Analytics is post-launch; tracking comes with a cookie banner and a privacy page.
- **Don't drift CLAUDE.md from PRODUCT / DESIGN / BRIEF again.** When you change a load-bearing decision (stack, voice, structure), update this file in the same commit.
