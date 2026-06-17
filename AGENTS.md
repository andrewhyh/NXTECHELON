# NXTECHELON — Agent Context

Pick this up cold. Everything you need is on disk.

## Read order (non-optional)

1. **[`PRODUCT.md`](./PRODUCT.md)** — strategic brief. Register, users, brand personality, anti-references, design principles, accessibility floor. The "who/what/why" of the project. ~50 lines.
2. **[`DESIGN.md`](./DESIGN.md)** — visual system. North Star, color anchor (Petrol Teal), type direction (editorial serif + sans + mono), motion energy (choreographed), named rules, do's and don'ts. Seeded; will be refreshed once code exists. ~80 lines.
3. **[`BRIEF.md`](./BRIEF.md)** — the active task brief for the landing page. Confirmed by the project owner on 2026-06-16. Sections, stack, states, content slots, open questions. **This is the contract for the next implementation pass.** ~180 lines.

## One-line positioning

NXTECHELON is an AI build studio for time-poor business owners who know they need AI and need someone to actually build it. Quiet authority. Operator, not tutorial. **The site is the proof.**

## Project state on 2026-06-16

- **No code yet.** Project is being implemented from scratch.
- **First surface:** a single-page landing site. Brief is in BRIEF.md.
- **Confirmed stack:** Next.js 15 (App Router) + TypeScript + CSS Modules + GSAP/ScrollTrigger/SplitType + Lenis + Canvas 2D + Cal.com embed. No Tailwind on the marketing surface.
- **Confirmed type pairing:** Klim Foundry — GT Sectra Display + Söhne + Söhne Mono. Free fallback pairing documented in BRIEF.md §9.
- **Blocking inputs needed from the user before the Operator section and CTA can be wired:** founder bio + 3–5 specific systems shipped, Cal.com handle, fallback contact email. See BRIEF.md §12.

## Hard rules (always-on guardrails)

These come from PRODUCT.md and DESIGN.md. Do not violate them without explicitly checking with the user first:

- **Color:** Restrained near-mono + Petrol Teal anchor. Signal Accent on ≤10% of any screen. Background is true off-white or tinted toward the brand teal — **never cream / sand / paper-warm**.
- **Type:** Editorial serif display + disciplined sans body. Body text is set in Ink, never pale gray. Body contrast ≥ 4.5:1, large text ≥ 3:1. Cap body line length at 65–75ch.
- **Layout:** Flat by default — depth is tonal, not shadow. No glassmorphism as default. No side-stripe borders. No gradient text or backgrounds.
- **Motion:** Choreographed entrances and scroll sequences. **Every animation ships with a `prefers-reduced-motion: reduce` alternative**. No animation on CSS layout properties. Reveal animations enhance an already-visible default — never gate content visibility on a JS class.
- **Pattern bans:** No SaaS-template hero (gradient + three feature cards + hero-metric). No cheap-consulting tropes (stock photos, "transform your business"). No playful mascots. No AWS / GCP console aesthetic. No tiny tracked uppercase eyebrow above every section. No `01 / 02 / 03` numbered scaffolding except in sections that ARE ordered sequences.
- **A11y:** WCAG 2.2 AA. Full keyboard navigation with designed focus states. Semantic HTML. Color is never the only carrier of meaning.

## Working with this project

This project was set up using Anthropic's `impeccable` design skill (a Claude Code skill). If you are an agent without that skill loaded (e.g. Codex), you can still work directly from the three files above — PRODUCT.md, DESIGN.md, and BRIEF.md are the authoritative context, not the skill. The skill produced them; the files stand alone.

If you ARE running Claude Code with the impeccable skill, the next natural step is:

```
/impeccable craft landing page
```

It will read BRIEF.md and proceed with implementation, asking for the three blocking inputs first.
