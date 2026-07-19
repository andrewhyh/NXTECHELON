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

## Project state (2026-07-16) — REDESIGNED

**The page was rebuilt from the ground up on 2026-07-16.** Andrew's brief: the
site read "boring and bland"; make it friendly and greeting without pushing the
business owner away, keep authority, cut the fluff, lead with the pain the
reader actually has, and optimise for the booking CTA. Much of the doctrine
below was written for the old page and has been rewritten to match what ships.

**What changed and why:**

- **The old page sat in the single most saturated AI aesthetic of the moment.**
  Editorial display serif + small tracked-uppercase mono labels + hairline
  ruled separators + near-monochrome restraint + zero imagery. That is a
  literal, point-for-point description of the "editorial-typographic" lane on
  the impeccable skill's reflex-reject list. Every section was also the same
  `[0.42fr | 1fr]` grid with a two-word `<br />`-broken headline. It wasn't
  under-designed; it was designed straight into the monoculture.
- **Posture flipped from aloof to welcoming.** "Confident enough to be quiet"
  read as standoffish to an owner who already suspects they're behind. The page
  is now LIGHT-by-default (Paper ground; Ink and drenched Petrol are the
  occasional weighted moments), opens with a first-person greeting, and uses a
  real photograph of Andrew.
- **The palette finally commits.** Petrol Teal was the declared brand anchor and
  appeared on ~four tiny kicker labels — the surface was ~98% neutral. It now
  carries a full drenched section.
- **Copy is pain-led and sourced.** The page names what the reader is losing and
  backs it with real, linked, primary-source statistics (see "Evidence rules").
- **`framer-motion` and `simple-icons` were removed entirely.** First Load JS
  went 147 kB → 112 kB; the `/` route went 45.1 kB → 9.64 kB.

**Deleted (superseded, recoverable in git):** `animated-hero`, `animated-list`,
`bento-grid`, `bento-section`, `beam-button`, `border-beam`, `hero-demo`,
`marquee`, `slide-tabs`, `text-scramble`. The live component surface is now
`booking-dialog`, `cta-button`, `reveal`, and the shadcn `button` baseline
(kept, currently unreferenced).

**Note:** `PRODUCT.md`, `DESIGN.md`, and `BRIEF.md` have NOT been updated and
now contradict this file in places (they still describe the quiet-editorial
page, the Spectral/Hanken pairing, and the six-beat structure). This file is the
tiebreaker. Reconcile them when convenient.

---

## Stack (locked, as shipped)

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind v4 (CSS-based `@theme` config in `app/globals.css`) |
| Component baseline | shadcn `new-york` preset at `components/ui/` |
| Motion | framer-motion. One shared `<Reveal>` choreography carries every scroll-in headline. Hero rotating-phrase uses a controlled spring (stiffness 90, damping 16) per the "no bounce/elastic" rule. |
| Fonts | `next/font/google` — **Bricolage Grotesque** (display, variable, `opsz`+`wdth` axes) + **Hanken Grotesk** (body, 300–700 + italic). Self-hosted by Next; no runtime CDN fetch. Bricolage is a humanist grotesque with irregular terminals and a sign-painted build: warm and human at a glance, sturdy at weight — authority without formality. Pairing sits on a real contrast axis (idiosyncratic display vs. neutral text), not two lookalike grotesques. **No mono ships.** `font-mono` is gone entirely — it was rebound to Hanken and used for tracked-uppercase kickers above every section, which was the loudest "AI made this" tell on the old page. **Inter, Geist, Satoshi, and Spectral are not to be reintroduced.** |
| Icons | lucide-react |
| Booking | Cal.com embed via native `<dialog>` (`components/ui/booking-dialog.tsx`). Triggered by any element with `data-booking-trigger`. URL from `NEXT_PUBLIC_BOOKING_URL`. |
| Hosting | Vercel. Single route, statically prerendered. |
| Analytics | None yet. When added: Plausible or Vercel Analytics. |

Do not introduce dependencies without explicit approval. Every new shadcn block must be checked against the DESIGN.md don'ts before being added.

---

## File map

```
app/
  globals.css              Tailwind v4 @theme + brand OKLCH tokens + .ink/.deep
                           surfaces + CSS view() scroll reveal
  layout.tsx               next/font wiring (Bricolage + Hanken), metadata
  page.tsx                 Full landing composition — the whole page, one file
components/ui/
  booking-dialog.tsx       Native <dialog> Cal.com embed, data-booking-trigger.
                           The ONLY client component on the page.
  cta-button.tsx           The single primary action. Warm oxide fill, ink text.
  reveal.tsx               Scroll reveal. Server component, no JS — see below.
  reveal-words.tsx         Hero headline word-by-word entrance. Server component,
                           pure CSS stagger (.nx-word). Renders as spans with
                           real whitespace — reads as one sentence to a screen
                           reader; never gates content.
  stat-arc.tsx             The luminous bowl behind the evidence figures.
                           Decorative SVG, aria-hidden. Adapted from a reference
                           site Andrew liked — structure copied, palette NOT
                           (their cyan/white → our petrol/oxide). Interior fill
                           kept low so it never drops the source-link text below
                           AA; the glow lives in the rim.
  button.tsx               shadcn baseline. Currently unreferenced; kept so
                           `npx shadcn add` has its expected primitive.
lib/
  utils.ts                 cn() (clsx + tailwind-merge)
public/images/             andrew-huynh.jpg|.webp (1000x1250, from Headshot.JPG)
public/logos/integrations/ 14 tool SVGs — UNUSED since the integration grid was
                           cut. Kept in case that section returns; delete freely.
components.json            shadcn config (new-york style, neutral baseColor)
PRODUCT.md / DESIGN.md / BRIEF.md / CLAUDE.md
```

**The page ships with essentially no JavaScript.** `page.tsx` is a server
component; the only client JS is the booking dialog. Do not casually add `"use
client"` or a motion library — that was the previous architecture and it cost
35 kB and a correctness bug (below).

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

- Display copy (hero, section openers, the closer) is Bricolage Grotesque at 700–800.
- Body copy is Hanken Grotesk. Plain-spoken. No hype words.
- **First person, singular.** The page says "I", not "we" — it's one person, and pretending otherwise is the exact credibility leak the honest-proof posture exists to avoid. The old page said "we" throughout.
- **Friendly, not deferential; direct, not shaming.** The reader already suspects they're behind. Name the gap, then explicitly take the blame off them ("None of that is a character flaw. You were busy."). Authority comes from specificity and honesty, not from distance.
- **No tracked-uppercase kicker labels above sections.** Removed page-wide.
- Microcopy bans (from PRODUCT.md): no "transform / accelerate / unlock / empower / revolutionize / leverage / supercharge / unleash / cutting-edge / game-changing / let's chat." No "trusted by the world's leading…" No marketing exclamation marks.
- Every sentence is specific or it's cut.

When two readings of a line are plausible, choose the one that assumes the reader is sophisticated.

---


## Page structure (as shipped 2026-07-16)

One narrative: *you're behind, here's the proof, it's not your fault, it's
fixable, here's how, here's who I am, book the call.* Every section either
advances that or gets cut.

1. **Sticky nav (Paper)** — wordmark, four section links (lg+), and the orange
   "Book a call" CTA, always visible. The CTA is on screen at every scroll
   position; that's the conversion floor.
2. **Hero (Paper)** — first-person greeting in Signal-ink ("Hi — I'm Andrew…"),
   then the empathetic pain headline ("You know AI could help. You just never
   got a spare month to figure out how."). Below it an asymmetric band: the
   sub-paragraph left, the CTA pair + three trust bullets right. Behind it, two
   soft drifting blooms (warm + petrol) — the only ambient motion on the page.
   The section needs `isolate`, or the `z-0` wash paints behind the body
   background and vanishes.
3. **The gap (drenched Petrol — `.deep`)** — THE new section, and the reason the
   page works. Three real statistics, each with a big Signal figure and a
   **linked, checkable primary source**. Closes by taking the blame off the
   reader and promising it's fixable. See "Evidence rules".
4. **What I actually build (Paper)** — three pillars: Build / Connect /
   Maintain. Type-led, no cards.
5. **How it works (Paper, `bg-secondary/50`)** — sticky left column (headline +
   CTA) beside the four-step `01–04` list. The *one* numbered sequence on the
   page; it earns the numbers because it genuinely is an ordered sequence.
6. **About (Paper)** — Andrew's real headshot (sticky at lg) beside a
   first-person bio and a "Things I can build for you" card. This is the
   friendliness anchor: a real face doing more work than any adjective.
7. **Contact (`.ink`)** — centred closer, one CTA, email fallback.
8. **Footer (`.ink`)** — wordmark, one line, three links.

**Explicitly NOT on the page:**

- **No client logo strip, no testimonials, no case studies, no metrics of our
  own.** There aren't any yet. The About copy says so out loud.
- **No tracked-uppercase kicker/eyebrow labels.** Removed page-wide — it was the
  loudest AI tell on the old build.
- **No bento grid.** Cut: it was four SaaS-cliché cards demoing imaginary
  product, and it's the "identical card grid" ban.
- **No `01/02/03` scaffolding** outside How it works.
- **No mono type.** None ships.
- **No FAQ.** The old `archivedFaqItems` block is gone with the rewrite; the
  hero trust bullets and the process section answer the top objections (price,
  timeline, who does the work, what if AI won't help) inline instead.

---

## Evidence rules (load-bearing — read before touching the gap section)

The gap section is the most persuasive thing on the page **and the easiest place
to destroy the site's credibility.** Andrew asked for real statistics; these are
real, and they are cited so a sharp prospect can verify them.

**What ships (verified 2026-07-16):**

| Figure | Claim | Source |
|---|---|---|
| **37%** vs. under 20% | 250+ employee firms using AI vs. firms with ≤4. AI use rose for firms with 20+ employees and **didn't move** for firms under 20, Dec 2025 → May 2026. | [U.S. Census Bureau BTOS, 2026](https://www.census.gov/library/stories/2026/05/ai-use-businesses.html) |
| **23%** never replied | of companies never responded to a web sales enquiry; average reply 42 hours; only 37% within an hour. Audit of 2,241 U.S. companies. | [HBR, 2011](https://hbr.org/2011/03/the-short-life-of-online-sales-leads) |
| **21×** | more likely to qualify a lead answering in 5 min vs. 30 min. 15,000+ leads. | [Lead Response Management Study, 2007](https://www.leadresponsemanagement.org/lrm_study/) |

**Rules:**

- **Never add a statistic without a primary source, and link the source on the
  page.** The link is not decoration; it's the proof that we didn't make it up.
- **The 21× figure is NOT Harvard Business Review.** It's the 2007 Lead Response
  Management study (Oldroyd/Elkington, InsideSales data). It is *very* widely
  misattributed to HBR across the internet. Citing it wrong is exactly the error
  a sharp prospect catches. HBR 2011 is a separate, real study — that's the 23% /
  42-hour row.
- **Rejected: the "62% of business calls go unanswered / $126K lost per year"
  family of statistics.** They are everywhere, they look perfect for this page,
  and they trace back only to AI-vendor marketing blogs citing each other with no
  primary source. A prospect who googles that number finds vendor spam, and the
  page's credibility dies. Do not add them.
- The HBR and LRM studies are 2011 and 2007. Old, but canonical and honestly
  dated on the page. If newer primary research appears, swap it in.
- **Do not invent precision.** An earlier draft wanted a time-series chart of the
  Census gap; only two comparable data points actually exist, so it ships as a
  typographic stat rather than a chart with fabricated intermediate values.

---

## Proof posture (pre-portfolio)

No clients yet. The page handles this by saying it plainly in the About section
("no client logos to show you yet") rather than papering over it.

- Do not invent credentials, client names, logos, case studies, or numbers.
- Do not write "trusted by…" or "joined N businesses…" while N is fabricated.
- Third-party research about the *market* is fair game and is what the gap
  section runs on. Claims about *our own results* are not, until they're real.
- Craft is the credential in the meantime.

---

## Hard rules (always-on guardrails)

- **Color:** Light-by-default (Paper). Petrol Teal carries the drenched `.deep`
  section; Ink carries the closer. Background is off-white tinted toward the
  brand teal — **never cream / sand / warm-tinted.**
  **Two warms, not interchangeable:** `--signal` (bright oxide) is **2.64:1 on
  Paper — fails even the large-text floor.** It is FILL-ONLY on light surfaces
  (buttons, rules, figures on dark). `--signal-ink` (5.50:1) is the text-safe
  warm on Paper. Getting these backwards is the easiest way to ship an
  inaccessible page.
- **Type:** Bricolage Grotesque display + Hanken Grotesk body. Body in Ink, never
  pale gray. Body ≥ 4.5:1, large ≥ 3:1. Cap measure at 65–75ch. `text-wrap:
  balance` on h1–h3. Display tracking floor −0.04em (we sit at −0.021em).
- **Layout:** Flat by default — depth is tonal (see the petrol block behind the
  headshot), not shadow. No glassmorphism. No side-stripe borders. No gradient
  text. The hero blooms are soft radial washes, not a gradient surface.
- **Motion:** Scarce and CSS-only. Mechanisms: `.nx-rise` (hero sub/CTA load),
  `.nx-word` (headline word-by-word reveal), `.nx-bloom-in` (hero wash swell),
  `[data-reveal]` + `.nx-arc` (scroll, via `view()` timeline). All pure CSS, all
  disabled under `prefers-reduced-motion: reduce`, all compose on
  transform/opacity/filter only. Several were adapted from a reference site
  Andrew liked (word reveal, load bloom, the stat arc) — kept the motion, not
  the dark cyan palette. Whole page stays light per Andrew's direction.
- **Reveal animations must NEVER gate content visibility.** This is a hard-won
  rule: the previous `Reveal` used framer-motion `whileInView`, which serialises
  `opacity: 0` inline at SSR and only clears it after hydration + an
  IntersectionObserver fires. **Entire sections rendered blank** in headless
  renderers, link-preview bots, and crawlers. The current `Reveal` is a server
  component that is visible by default and layers a CSS `view()` timeline on
  top; browsers without `animation-timeline` (Firefox today) just see the
  finished page. Do not regress this.
- **A11y:** WCAG 2.2 AA. Semantic HTML — `Reveal` takes an `as` prop precisely so
  it can BE the `<li>` rather than wrap it (a `<div>` inside `<ol>` is invalid,
  drops list semantics, and makes every item both `:first-child` and
  `:last-child` of its own wrapper). Designed focus states, 3px offset. Tap
  targets ≥ 24px (2.5.8). Color never the only carrier of meaning.
- **Every booking CTA is an `<a href>` to Cal.com carrying
  `data-booking-trigger`**, never a `<button>`. The dialog intercepts and
  `preventDefault()`s it. A `<button>` is a dead control with JS off, broken, or
  still loading — on the single most important action on the page.
- **Pattern bans:** No SaaS-template hero. No stock photography, handshakes,
  "transform your business", logo carousels. No mascots or doodles. No
  tracked-uppercase eyebrows. No hero-metric template. No identical card grids.

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


### Done 2026-07-16 (redesign)

- ✅ **Full redesign** — see "Project state" above for the what and why.
- ✅ **Andrew's headshot shipped.** Source `C:\Users\huynh\Pictures\Headshot.JPG`
  (4991×7486, 8.15 MB) → cropped head-and-shoulders and resized to 1000×1250 at
  `public/images/andrew-huynh.{jpg,webp}` (93 KB / 78 KB). Re-run the sharp crop
  in git history if a new photo lands.
- ✅ **OKLCH contrast verified in-browser** (closes the long-standing TODO #1).
  Measured by rasterising each computed colour to sRGB pixels — `getComputedStyle`
  returns `oklch()` strings, so naive RGB parsing silently reports ~1.0 for
  everything. 94/94 text elements pass AA at 390px; 17/17 pairs pass at 1440px.
- ✅ **framer-motion + simple-icons removed.** First Load JS 147 kB → 112 kB.
- ✅ **Fixed: sections rendered blank in headless/preview renderers** (framer
  `whileInView` gating). Now CSS-only. See the Reveal rule in Hard rules.
- ✅ **Fixed: `<ol>` contained `<div>` wrappers**, killing list semantics and all
  `first:`/`last:` styling on the process steps. `Reveal` now takes `as`.
- ✅ **Fixed: booking CTAs were dead `<button>`s with JS off.** Now real anchors.
- ✅ **Fixed: evidence grid went 3-up at `md`** (~197px columns). Now `lg`.
- ✅ Tap targets raised to the 24px WCAG 2.2 (2.5.8) floor in the footer.

### Still worth doing pre-launch

1. **Mirror `NEXT_PUBLIC_BOOKING_URL` in the Vercel project env** so preview
   deploys and production stay in sync with the live Cal handle (`.env.local`
   only covers local dev).
2. **Lighthouse pass.** Target ≥ 95 across the board. Should be easy now — the
   page is static HTML/CSS with one client component and one image.
3. **Reconcile PRODUCT.md / DESIGN.md / BRIEF.md** with this file. They still
   describe the old quiet-editorial page and now actively contradict what ships.
4. **Firefox check.** `animation-timeline: view()` is unsupported there, so
   reveals are simply absent (content still fully visible, by design). Confirm
   that reads as intentional rather than broken.
5. **Optional:** name FIS explicitly in the About bio — currently "a capital
   markets firm".
6. **Optional:** `public/logos/integrations/` (14 SVGs) is now unused. Delete it,
   or bring back a compact "plugs into your stack" strip if sales calls show the
   objection is real.

---

## What NOT to touch

- **Don't fabricate proof.** No invented testimonials, client logos, case
  studies, or numbers about our own work. See "Evidence rules" for what's
  allowed and what was deliberately rejected.
- **Don't add a statistic without a linked primary source.** And don't let the
  "62% of calls / $126K" vendor-blog family back onto the page.
- **Don't reintroduce Inter, Geist, Satoshi, or Spectral.** Bricolage Grotesque
  is display; Hanken Grotesk is body.
- **Don't re-add mono type or tracked-uppercase eyebrows.** They were the tells.
- **Don't gate content behind a JS reveal.** Sections shipped blank last time.
- **Don't turn a booking CTA back into a `<button>`.**
- **Don't add a logo strip, gradient hero, bento grid, or three-feature-card
  grid.**
- **Don't casually add `"use client"` or a motion library.** The page is a server
  component with one client island. That's worth defending.
- **Don't run `npm run build` while `next dev` is running** — they share `.next`
  and corrupt each other (`__webpack_modules__ is not a function`). Use the
  `nxtechelon-prod` launch config to preview the real artifact.
- **Don't move the Cal.com booking into a custom form.** The native `<dialog>` +
  Cal.com embed is the committed pattern.
- **Don't track or load third-party scripts without confirmation.**
- **Don't drift CLAUDE.md from what ships.** When you change a load-bearing
  decision (stack, voice, structure, evidence), update this file in the same
  commit.
