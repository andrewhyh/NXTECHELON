<!-- SEED: re-run /impeccable document once there's code to capture the actual tokens and components. -->

---
name: NXTECHELON
description: AI build studio for time-poor business owners — the site is the proof.
---

# Design System: NXTECHELON

## 1. Overview

**Creative North Star: "The Operator's Workshop"**

Walk into a serious workshop and you can tell within five seconds whether the person who works there knows what they are doing. The tools are arranged. The light is good. Nothing is performing for you. Nothing apologizes for being there. The NXTECHELON site has that quality. It is the proof, not the pitch.

The system is built on near-monochrome restraint with a deep teal anchor — petrol, pine, the color of an oxide patina on real metal — accented sparingly. An editorial serif sets the advisor voice; a disciplined sans does the operator's work. Motion is choreographed but never loud: orchestrated scroll sequences, considered easing, real attention to the craft of transition. Every section earns its place. The page respects the visitor's time because the brand respects it.

The system explicitly rejects the AI-tool monoculture currently saturating the category: cream backgrounds, gradient accents, identical feature triplets, hero-metric blocks. It rejects the cheap-consulting aesthetic of stock photos and "transform your business" copy. It rejects the playful-illustration register. And it rejects the enterprise-utility console aesthetic — dense gray chrome, no personality, all function. Marketing surfaces are not consoles.

**Key Characteristics:**
- Restrained near-monochrome surface; deep teal anchor; chromatic accent on ≤10% of any screen
- Editorial serif display + disciplined sans body — advisor authority meeting operator clarity
- Choreographed motion: orchestrated section reveals and scroll-driven sequences, never decorative
- Type and negative space carry the system; no gradients, no glass, no illustrated mascots
- Every screen reads as evidence of capability before any copy claims it

## 2. Colors

The palette is near-monochrome with a single deep teal anchor and one sharp accent reserved for moments that matter. Restraint is the system; rarity is what makes the accent legible.

### Primary
- **Petrol Teal** `[to be resolved during implementation — target OKLCH around L 0.32 / C 0.06 / H 200, deep oxide-on-metal]`: the brand anchor. Carries headlines, primary buttons, the largest committed surface beyond neutrals. Not navy. Not corporate teal. The color of patinated copper roof, deep pine in shade, oxidized brass.

### Secondary (optional, sparingly used)
- **Signal Accent** `[to be resolved at implementation — likely a high-chroma warm: oxide orange, bone white on dark surfaces, or a single near-saturated chromatic in the 30–60° hue band]`: reserved for the smallest set of high-meaning moments — primary CTAs in a dense section, link underlines on body text, an active state. Never decorative.

### Neutral
- **Ink** `[to be resolved — near-black at OKLCH L ~0.18, tinted ~0.005 chroma toward the brand teal, not pure #000]`: body text, headlines on light surfaces, primary UI strokes.
- **Paper** `[to be resolved — true off-white at OKLCH L ~0.97, near-zero chroma or 0.003 tinted toward the brand hue. NOT cream. NOT sand. NOT warm-tinted.]`: the dominant body background.
- **Vellum** `[to be resolved — mid-tone neutral around L ~0.62, tinted toward brand]`: secondary text, dividers, low-emphasis UI.
- **Rule** `[to be resolved — fine hairline neutral around L ~0.88]`: 1px dividers, table borders, fine details.

### Named Rules

**The One Voice Rule.** The Signal Accent appears on ≤10% of any given screen. Its rarity is what makes it carry. If two accent moments are competing on the same screen, one of them is wrong.

**The No-Cream Rule.** The background neutral is true off-white or a tinted near-white where the tint moves *toward the brand teal*, not toward warmth-by-default. The cream / sand / paper / parchment band (L 0.84–0.97, warm chroma, hue 40–100) is the AI default of the moment. We do not live there.

**The No-Gradient Rule.** No gradient text. No gradient backgrounds. No gradient buttons. No gradient borders. Color is committed as flat fields. Depth comes from tonal layering, not from gradients.

## 3. Typography

**Display Font:** `[to be chosen at implementation — editorial serif with strong character at large size; candidates in the GT Sectra / Tiempos Headline / IBM Plex Serif / Söhne Breit family]` (with Georgia, "Times New Roman", serif fallback)

**Body Font:** `[to be chosen at implementation — disciplined neo-grotesque or humanist sans; candidates: Söhne, Suisse Int'l, Inter, IBM Plex Sans]` (with -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif fallback)

**Label/Mono Font:** `[to be chosen at implementation — monospace for code, system labels, and small technical detail; candidates: IBM Plex Mono, JetBrains Mono, Söhne Mono]`

**Character:** A serif that has been used to set books and a sans that has been used to set systems. The pairing is the visual analog of the brand voice itself: advisor on the headlines, operator on the body. Avoid pairing two similar sans families or two similar serifs — pair on a contrast axis (serif + sans + mono), never on a near-duplicate axis.

### Hierarchy
- **Display** (regular or light weight, `clamp(2.75rem, 6vw, 5.5rem)`, line-height ~0.95–1.0, letter-spacing ≥ -0.03em): hero headlines, single moments per page. Used scarce.
- **Headline** (regular, `clamp(1.75rem, 3vw, 2.75rem)`, line-height 1.1): section openers.
- **Title** (medium, `clamp(1.125rem, 1.5vw, 1.375rem)`, line-height 1.25): card headers, list group titles.
- **Body** (regular, `1rem` → `1.0625rem`, line-height 1.55, max line length 65–75ch): long-form copy. Color is Ink — never a pale gray.
- **Label** (medium, `0.75rem`, letter-spacing 0.04em, sentence case): metadata, small UI labels. **Not** all-caps eyebrow text above every section — see Don'ts.

### Named Rules

**The No-Eyebrow Rule.** Tiny uppercase tracked eyebrow text above every section is the 2023-era SaaS landing tell and now a saturated AI scaffold. We do not use category eyebrows ("ABOUT" / "PROCESS" / "PRICING") above section headlines. Sections are introduced by the headline itself, or by a deliberate kicker chosen once as a named brand element — not as page scaffolding.

**The Body-Is-Ink Rule.** Body text is set in Ink, not in a mid-gray "for elegance". Mid-gray body on tinted near-white is the single biggest reason AI design feels unreadable. Body contrast meets WCAG AA at minimum.

**The text-wrap Rule.** All h1–h3 use `text-wrap: balance`. Long-form prose uses `text-wrap: pretty` to suppress orphans.

## 4. Elevation

Flat by default. The system uses tonal layering, not shadows, to convey depth. A surface in the foreground is not "raised" — it is a different tonal step on the same vertical plane. Shadows appear only as state response: focus rings, an active dropdown leaving its parent stacking context, a single ambient glow under the primary accent at a deliberate moment. They are never ambient decoration on cards at rest.

### Shadow Vocabulary
- **Focus ring** `[to be resolved at implementation — 2–3px outset offset, tinted toward Signal Accent]`: keyboard focus only. Visible. Never invisible.
- **Ambient (rare)** `[to be resolved at implementation]`: reserved for one deliberate moment per page where elevation is the point. Not the default.

### Named Rules

**The Flat-By-Default Rule.** Cards, sections, buttons, inputs have no shadow at rest. Depth is tonal. If a surface needs a shadow to read, the tonal contrast is wrong; fix that first.

## 5. Components

Component patterns will be defined during implementation. The system will be built component-first using the tokens and rules above. Re-run `/impeccable document` once the canonical button, input, navigation, and card primitives exist; that pass will populate this section and write `.impeccable/design.json` so live mode can render real primitives.

## 6. Do's and Don'ts

### Do:
- **Do** anchor every page in deep Petrol Teal + Ink + Paper. The Signal Accent appears on ≤10% of any screen.
- **Do** use editorial serif for display, disciplined sans for body. Pair on a contrast axis.
- **Do** treat motion as part of the build — choreographed entrances, scroll-driven sequences, considered easing (ease-out-quart / quint / expo).
- **Do** ship every animation with a `prefers-reduced-motion: reduce` alternative — a crossfade or instant state — that preserves meaning.
- **Do** verify body text contrast ≥ 4.5:1; large text ≥ 3:1; placeholder text held to the body floor.
- **Do** cap body line length at 65–75ch. Long lines break the editorial register.
- **Do** treat negative space as a first-class material. The page can be quiet.
- **Do** keep button radius small and disciplined (0–4px); the system is editorial, not playful-pill.

### Don't:
- **Don't** ship a cream / sand / beige / paper-warm body background. That warm-neutral band is the saturated AI default of 2026. Off-white is true off-white or tinted toward the brand teal, not toward warmth-by-default.
- **Don't** use gradient text (`background-clip: text`), gradient backgrounds, gradient buttons, or gradient borders anywhere. Solid fields only.
- **Don't** ship glassmorphism as default styling. Blurs and glass cards are decorative when used by reflex; we don't use them.
- **Don't** place a tiny tracked uppercase eyebrow ("ABOUT" / "PROCESS" / "PRICING") above every section. That is AI scaffolding, not voice.
- **Don't** ship a `01 / 02 / 03` numbered section sequence as default scaffolding. Numbers earn their place only when the section actually IS an ordered sequence.
- **Don't** use side-stripe borders (`border-left` > 1px as a colored accent on cards or callouts). Rewrite the element.
- **Don't** ship the SaaS template: gradient hero, three identical feature cards, glassy badges, hero-metric template. That is exactly what PRODUCT.md rejects.
- **Don't** ship the cheap-consulting template: handshake stock photos, suit-and-skyline imagery, rotating client-logo carousels, "transform your business" copy.
- **Don't** ship illustrated mascots, doodles, or Notion/Duolingo-style friendly characters. Wrong register for executive buyers.
- **Don't** drift toward the enterprise-utility console aesthetic (AWS / GCP). Dense gray chrome and no personality is not the brand. The marketing site is a workshop, not a console.
- **Don't** use pale gray body text on a tinted near-white background "for elegance." That is the single biggest readability failure in AI design and a hard WCAG AA fail.
- **Don't** animate CSS layout properties. Compose motion on `transform` and `opacity`; introduce blur, clip-path, mask, or filter only when they materially improve the effect and stay smooth.
- **Don't** gate content visibility on a scroll-triggered class transition. Reveal animations must enhance an already-visible default, or headless renderers ship the page blank.
