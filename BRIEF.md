# Landing Page Brief — NXTECHELON

**Status:** Shape phase confirmed 2026-06-16. **Stack pivoted and full landing page implemented in shadcn / Tailwind / framer-motion on 2026-06-17** (see Stack Pivot Notice below). Three open questions remain (founder bio, Cal handle, fallback email — §12). Build is green; site renders.

**Read order for any agent picking this up:**
1. [`PRODUCT.md`](./PRODUCT.md) — strategic brief: register, users, brand personality, anti-references, design principles, accessibility floor.
2. [`DESIGN.md`](./DESIGN.md) — seed visual system: North Star, color anchor, type direction, motion energy, named rules, do's and don'ts.
3. This file — task-specific design brief for the landing page.

---

## Stack Pivot Notice (2026-06-17)

This brief was originally written against a **CSS Modules + GSAP + Lenis + SplitType + @fontsource + bespoke HTML-Canvas signature element** stack, and Codex implemented that faithfully on 2026-06-16. On 2026-06-17 the project owner directed a full pivot to **Next.js 15 + TypeScript + Tailwind v4 + shadcn (`new-york` style) + framer-motion + lucide-react** to integrate a supplied animated-hero component. The CSS-Modules version was deleted (`app/page.module.css`, `components/MotionController.tsx`, `components/SignatureCanvas.tsx`), the pivot stack was installed, and the full page was rebuilt in Tailwind preserving the original content (Build/Integrate/Operate services, four-step process, Jordan Vale operator placeholder, contact + booking dialog).

**What changed in this brief versus the original:**
- §4 Scope — stack section rewritten.
- §5 Layout Strategy — the bespoke `SignatureCanvas` is removed from the hero. The signature moment is now the rotating-phrase headline (`We ship the [phrase] you don't have time to build.`) with five operator-voice phrases cycling on a spring. If you want the canvas back, it's a clean add later.
- §9 Typography — Söhne replaced with **Hanken Grotesk** (free, non-reflex, ships on Google Fonts). Source Serif 4 + JetBrains Mono unchanged. Klim swap path still documented at the bottom of §9.
- Everything else (Feature Summary, Primary User Action, Design Direction, Anti-references, States, Interaction Model, Content Requirements, Color Resolution, Open Questions) is unchanged and still applies.

---

## 1. Feature Summary

A single-page, production-ready marketing site at the root of nxtechelon.com. One long-scroll editorial page that converts time-poor business owners into intake-call bookings. The page itself is the primary proof: kinetic typography, a bespoke generative signature element, and operator-grade build quality demonstrate the capability the copy claims, before any case study exists.

## 2. Primary User Action

Book a 30-minute intake call. Single, repeated CTA. No alternate paths competing for attention.

## 3. Design Direction

**Color strategy:** Restrained near-mono + Petrol Teal anchor (committed in DESIGN.md). One Signal Accent reserved for the CTA and one or two deliberate accent moments — nothing else.

**Theme scene sentence:** *"A senior advisor opens a folio at a clean drafting desk in a workshop loft at 9pm — overhead lamps off, focused task lamp on, the work itself the only thing illuminated."* Forces dark surfaces on the hero and around the signature element, light surfaces on the thesis and services where readability is the priority. **Mixed-mode page** — sections shift between a near-black canvas (Ink) and a near-white canvas (Paper), with the brand teal as the through-line.

**Named anchor references:**
- **Locomotive (locomotive.ca)** — scroll choreography, kinetic typography, dark/light section pivots, the overall pacing of a Montreal-studio long-scroll.
- **Anthropic / Stripe Press** — editorial restraint, operator voice in copy, type-led authority without performance.
- **Klim Type Foundry (klim.co.nz)** — type as the primary material, long-form discipline.

**Anti-references (carried from PRODUCT.md as guardrails):** No SaaS-template hero (gradient bg, three feature cards, glass badges, hero-metric block). No cheap-consulting tropes (stock photos, "transform your business"). No playful mascots. No AWS / GCP console aesthetic. No category eyebrows above every section. No `01 / 02 / 03` numbered eyebrows used as scaffolding (numbers are used once, in the "How We Work" section, because it IS a sequence).

## 4. Scope

- **Fidelity:** production-ready, ships to a live host.
- **Breadth:** the whole landing page in one route.
- **Interactivity:** real motion, real interactions, real form submission to a calendar link.
- **Time intent:** polish until it ships.
- **Stack (committed and implemented 2026-06-17):**
  - **Framework:** Next.js 15 (App Router) + TypeScript + Tailwind v4 (CSS-based config via `@theme`) + shadcn (`new-york` style preset) at `components/ui/`. The shadcn CSS-variable theme is wired to the brand OKLCH tokens in `app/globals.css`; dark is the default surface, with a `.paper` class flipping the semantic tokens locally on sections that should be light.
  - **Motion:** framer-motion. One shared `<Reveal>` choreography (`components/ui/reveal.tsx`) carries every scroll-in headline on a single 520ms ease-out-quint, so the page reads as one decision instead of eight different animations. The hero's rotating-phrase animation uses a controlled spring (stiffness 90, damping 16) per the brand "no bounce/elastic" rule.
  - **Hero signature element:** the rotating phrase IS the signature. The previous HTML-Canvas mark was removed in the pivot. Can be added back as a deferred-import client component if the page needs more visual weight.
  - **Fonts:** loaded via `next/font/google` (Source Serif 4 + Hanken Grotesk + JetBrains Mono). Self-hosted by Next's font system, no runtime Google CDN fetch.
  - **Calendar:** Cal.com embed via native `<dialog>` (see `components/ui/booking-dialog.tsx`). Triggered by any element with `data-booking-trigger` anywhere on the page. URL comes from `NEXT_PUBLIC_BOOKING_URL` (placeholder until real handle lands).
  - **Hosting:** Vercel default; works on any static-friendly Node host. Build is fully prerendered static (`Route /` is `○ Static`).
  - **Verification:** `npm run build` ships clean on 2026-06-17. Page weight 49.9KB, First Load JS 152KB.

## 5. Layout Strategy

Single column, long scroll. Six narrative beats, paced deliberately. Each section has a different visual weight — the page breathes, accelerates, holds.

1. **Hero (≈100vh, dark)** — Petrol-tinted near-black canvas (radial vignette, no gradient surface). Three-line display headline: `We ship the` / `[rotating phrase]` / `you don't have time to build.` The rotating phrase cycles every 2.4s through five operator-voice nouns (*AI agents · internal copilots · data pipelines · agent platforms · inference systems*) in italic Signal-Accent (warm oxide-orange) Source Serif 4, springing in/out vertically. A small "Notes from the workshop" announcement chip sits above the headline; below, the sub-paragraph + two CTAs (primary "Book an intake call" in Signal, ghost "See how we work" anchoring to `#process`). A mono meta strip closes the hero (`Est. 2026 · Brooklyn × Remote · Booking Q3 engagements`). Persistent thin top nav at `mix-blend-difference` so the wordmark stays legible across the dark/paper section pivots without a JS observer.
2. **Thesis (≈80vh, light)** — Pivot to Paper. One large editorial paragraph. Kinetic word reveal on scroll-in. Sets the operator stance in plain language. No bullets, no icons.
3. **Services (≈120vh, light)** — Three capability lanes as type-led blocks, not cards. Each lane: a large verb (**Build / Integrate / Operate**), one paragraph, one specific concrete example. Vertical rhythm carries the structure; no boxes, no borders besides hairline rules between lanes.
4. **How We Work (≈100vh, dark)** — Pivot back to Ink. A real numbered sequence (1 → 2 → 3 → 4) because it IS a sequence: **Intake → Scoped sprint → Ship → Handoff with runbooks**. This is the *one* deliberate numbered moment on the page — earned, not scaffolded.
5. **Operator (≈80vh, light)** — Founder/team credibility block. Plain editorial type-led layout: name, one paragraph of background, list of prior systems shipped (verb-led, specific). Optional single B&W founder portrait *only* if a real photograph is provided; otherwise omit entirely.
6. **Contact (≈80vh, dark)** — Closer headline (one decisive sentence), single CTA to book, fallback email line for those who'd rather write. Minimal footer with wordmark, year, one or two links.

Page transitions between Ink and Paper sections are scroll-driven crossfades on the body color/text color tokens — not abrupt, not parallax-flashy. The pivot itself is part of the rhythm.

## 6. Key States

- **Default (cold load):** Hero kinetic-type reveal plays once on load; signature canvas begins its build animation. Scroll is locked for the first ~600ms then released.
- **Scroll-through:** Each section's headline runs its own choreographed reveal as it enters the viewport. Reveals enhance an already-visible default — content is never gated on a JS class.
- **Reduced motion:** All kinetic typography degrades to instant on-load; signature canvas degrades to a static rendered final frame; section transitions are crossfade-only. Tested with `prefers-reduced-motion: reduce`.
- **Tap/click on CTA:** Cal.com embed opens in a native `<dialog>` overlay (not a redirect). Closes with `esc` or backdrop click.
- **CTA pre-load:** Cal.com chunk is preconnected on first scroll past the hero, not on initial load.
- **Resize / responsive:** Mobile (≤640px) collapses long-scroll into the same six sections but tightens the kinetic-type clamp scale. Hero headline tested to not overflow at 320px. Signature element scales proportionally, never below 200px.
- **JS-disabled:** All copy is server-rendered and readable. Static finals of every kinetic moment. CTA falls back to a direct anchor link to `cal.com/<handle>`.
- **Slow connection:** Fonts ship with `font-display: swap` and a tuned fallback metric (size-adjust). Signature canvas defers until idle; hero copy is never blocked on it.

## 7. Interaction Model

**Page-load (one moment, then quiet):**
- Lenis initializes; scroll locked for ~600ms.
- Hero headline plays a sequenced SplitType reveal (per-word, ease-out-expo, ~60ms stagger).
- Signature canvas builds itself in parallel — a generative mark that resolves over ~1.5s.
- After the reveal, motion goes quiet. No idle confetti.

**Scroll:**
- Lenis smooth scroll across the page. **Lenis is conditionally disabled** under `prefers-reduced-motion: reduce`.
- Section headlines trigger their own SplitType reveal on `ScrollTrigger` entry (one-shot, not on every re-entry).
- Background-color pivots (Ink ↔ Paper) are scroll-driven crossfades on body color/text color tokens.
- The signature mark in the hero stays pinned during the hero's vertical range only, then releases.

**Pointer:**
- CTA buttons have a subtle hover lift (`translateY(-2px)`, ~200ms `ease-out-quart`) plus a Signal Accent underline animating from 0% to 100% width.
- Links use a 1px underline at rest with a thicker animated underline on hover.
- **No global magnetic cursor.**

**Keyboard:**
- Full tab order. Visible focus rings (Signal Accent, 2px offset — not the browser default).
- CTA dialog is focus-trapped while open; restores focus on close.

**Submission:**
- The primary CTA opens Cal.com in a `<dialog>`. Cal.com handles the booking. No custom form to maintain on launch.

## 8. Content Requirements

| Slot | Real content needed | Default if user doesn't provide |
|---|---|---|
| Hero headline | Operator-voice one-line thesis | *"We build the AI you don't have time to build."* |
| Hero sub | Single sentence positioning | *"An AI build studio for operators with judgment and no time. We ship the systems. You run your business."* |
| Thesis paragraph | One paragraph of stance | Drafted in operator voice from PRODUCT.md; user approves or rewrites. |
| Service lane verbs + bodies | Three lanes, one paragraph each | **Build** / **Integrate** / **Operate** — drafted, user confirms. |
| How-we-work steps (1–4) | Real process | **Intake → Scoped sprint → Ship → Handoff with runbooks** — drafted. |
| Operator name + bio | Real | **Required from user.** Brief is incomplete without it. |
| Prior systems shipped | 3–5 verb-led, specific | **Required from user.** Cannot be fabricated. |
| Founder portrait | Single B&W photo | Optional. Omit entirely if not provided. |
| Closer headline | One decisive sentence | *"If you've already decided AI matters, let's talk."* |
| Cal.com handle | Real URL | **Required from user** to wire CTA. |
| Fallback contact email | Real address | **Required from user.** |
| Signature element direction | See below | Drafted as default; user can redirect. |

**Imagery / media inventory:**

- **Signature element (hero, primary):** A bespoke generative mark on HTML Canvas — a particle field that resolves into the NXTECHELON wordmark over ~1.5s, then drifts with low-amplitude parametric motion. Operator-mathematics aesthetic: a vector field finding its attractor, not a logo animation. Renders deterministically (seeded RNG) so every visitor sees the same composition. ~12KB of code, no asset payload.
- **Section dividers (optional):** A 1px Petrol Teal hairline rule between major sections, never thicker.
- **Founder portrait:** Single B&W, editorial framing, only if real. No stock.
- **No icons, no illustrations, no decorative SVG, no stock photography.** The page is type, motion, and one canvas signature.

**Microcopy bans (from PRODUCT.md anti-references):** No "transform / accelerate / unlock / empower / revolutionize / leverage / supercharge / unleash." No "let's chat." No "founder-led" as a vague claim. No "trusted by the world's leading…". Every sentence is specific or it's cut.

## 9. Committed Typography

DESIGN.md left this as a placeholder. The shape phase committed to:

**Implemented 2026-06-17 (Google Fonts via `next/font/google`):**
- **Display:** **Source Serif 4** (regular, light, italic) — editorial advisor voice. Hero headline, section headlines, all `<h1>`–`<h3>`.
- **Body / UI sans:** **Hanken Grotesk** (regular, medium, semibold) — disciplined operator voice. All body copy, sub-headlines, navigation, button labels. *Swapped from the originally-planned Inter at the pivot, since Inter is on the impeccable brand-register reflex-reject list; Hanken Grotesk is a non-reflex neo-grotesque that pairs cleanly with Source Serif 4 on a serif/sans contrast axis.*
- **Mono / labels:** **JetBrains Mono** — small technical detail, metadata, kicker chips, the mono meta strip in the hero footer.

Pair on a contrast axis: serif display + neo-grotesque sans + mono. None of the three are on the brand-register reflex-reject list.

**Klim premium swap path (still open):** GT Sectra Display + Söhne + Söhne Mono was the original committed pairing. If the Klim license is procured, swap is `app/layout.tsx` `next/font` declarations + the `--font-*-brand` variables in `app/globals.css`. The rest of the system does not change.

## 10. Color Resolution (to commit during implementation)

DESIGN.md left exact OKLCH values as placeholders. The implementation pass should commit:

```
--ink:    oklch(0.18 0.012 200);   /* near-black, tinted toward brand teal */
--paper:  oklch(0.97 0.003 200);   /* off-white, faint brand tint, NOT cream */
--petrol: oklch(0.32 0.060 200);   /* the brand anchor — deep oxide-on-metal */
--signal: oklch(0.68 0.180 55);    /* warm signal accent — oxide-orange */
--vellum: oklch(0.62 0.008 200);   /* mid-neutral, secondary text */
--rule:   oklch(0.88 0.004 200);   /* hairline divider */
```

These are starting OKLCH values. Verify body-text contrast in browser before locking; bump `--ink` darker or `--vellum` darker if the AA floor is not cleared.

## 11. Recommended Impeccable References During Implementation

- **`reference/animate.md`** — scroll choreography and kinetic typography land most of the craft load here.
- **`reference/typeset.md`** — the page is type-led; getting the editorial serif + sans pairing right is half the brief.
- **`reference/layout.md`** — long-scroll rhythm and varied spacing between sections.
- **`reference/harden.md`** — reduced motion, JS-disabled fallback, slow connection states, real form/CTA behavior.
- **`reference/audit.md`** (post-build) — a11y and perf checks before launch.

## 12. Open Questions (blocking)

These are the only items the implementation cannot decide. Resolve before or during the first pass of craft:

1. **Operator bio + prior systems shipped.** The load-bearing proof on a pre-portfolio launch.
   - Founder name.
   - 3–4 sentence background (operator voice — what they built, not titles).
   - **3–5 specific systems shipped**, verb-led, with real numbers where possible. *Example shape: "Built the inference-routing service that handles 4M requests/day for X." Not: "Worked on AI infrastructure at Y."*
2. **Cal.com handle** to wire the booking CTA (e.g. `cal.com/<handle>`).
3. **Fallback contact email** for the closer section.

Optional but materially helpful:

- A real B&W founder portrait. If not provided, the Operator section runs type-only — still works, marginally less warm.
- Confirmation that the Klim license is in hand, or an instruction to swap to the free pairing (see §9).

---

## Implementation handoff notes

- This brief is the contract for the first craft pass. Treat the layout strategy and stack commitments as decided; revisit them only if implementation surfaces a real reason.
- Do not invent operator credentials, case studies, client logos, or numbers. If the three open questions are not yet answered, leave the Operator section as a clearly-marked placeholder block and ship the rest, rather than fabricating proof.
- All anti-references in PRODUCT.md and DESIGN.md apply. Re-read both before writing any new component.
- Resolve the OKLCH values above into actual `:root` CSS custom properties on the first pass and verify contrast with a real tool (e.g. Chrome DevTools' contrast inspector) before locking.
