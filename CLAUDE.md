# NXTECHELON

## Design Context

Brand brief, target audience, anti-references, and strategic design principles live in [`PRODUCT.md`](./PRODUCT.md). Visual system (color, typography, motion, components) lives in [`DESIGN.md`](./DESIGN.md). The active task brief for the landing page (originally confirmed 2026-06-16; stack pivoted on 2026-06-17 — see the BRIEF.md Stack Pivot Notice) lives in [`BRIEF.md`](./BRIEF.md). Read all three before working on any UI surface.

A mirrored agent-context file for non–Claude-Code agents (Codex, etc.) lives at [`AGENTS.md`](./AGENTS.md). Keep the two pointer files in sync if either changes.

**Register:** brand (marketing / landing). Design IS the product — every surface is proof of capability.

**One-line positioning:** NXTECHELON is an AI build studio for time-poor business owners who know they need AI and need someone to actually build it. Quiet authority. Operator, not tutorial. The site is the proof.

**Hard nos:** SaaS template (gradient hero, identical feature cards, eyebrow-above-every-section), cheap-consulting tropes (stock photos, "transform your business"), playful illustrated mascots, web3 maximalism, AWS / GCP console aesthetic. See PRODUCT.md anti-references and DESIGN.md don'ts.

## Current implementation (2026-06-17)

The landing page is **built and ships clean**. `npm run build` is green. Static prerendered route at `/`. Page weight ~50KB.

**Stack (live):**
- Next.js 15 (App Router) + TypeScript
- Tailwind v4 (CSS-based config via `@theme` in `app/globals.css`)
- shadcn `new-york` preset at `components/ui/`
- framer-motion (one shared `<Reveal>` choreography in `components/ui/reveal.tsx` + the hero's controlled spring)
- lucide-react icons
- next/font/google: Source Serif 4 + Hanken Grotesk + JetBrains Mono
- Cal.com booking via native `<dialog>` + `data-booking-trigger` attribute (`NEXT_PUBLIC_BOOKING_URL`)

**Key files:**
- `app/page.tsx` — full landing composition (hero + thesis + services + process + operator + contact + footer + booking dialog).
- `app/globals.css` — brand OKLCH tokens + shadcn semantic theme; `.paper` class flips dark→light per-section.
- `components/ui/animated-hero.tsx` — the editorial rotating-phrase hero.
- `components/ui/booking-dialog.tsx` — native dialog with Cal.com iframe.
- `components/ui/reveal.tsx` — the single scroll-into-view choreography.
- `components/ui/button.tsx` — shadcn button (default + ghost + outline + secondary + link).

**Blocking inputs still required from the user:**
- Founder bio + 3–5 specific systems shipped (currently placeholder "Jordan Vale").
- Real Cal.com handle (currently placeholder; set `NEXT_PUBLIC_BOOKING_URL` in `.env.local`).
- Fallback contact email (currently `hello@example.com` in `app/page.tsx`).
See BRIEF.md §12.

## Past stack (gone on 2026-06-17, kept here for handoff context)

The project was originally built (correctly, by Codex on 2026-06-16) in **CSS Modules + GSAP + Lenis + SplitType + @fontsource + a bespoke HTML-Canvas signature element** (`MotionController.tsx`, `SignatureCanvas.tsx`, `app/page.module.css`). The user directed a full pivot to the shadcn/Tailwind/framer-motion stack to integrate a supplied animated-hero pattern. The pivot deleted those files and rebuilt the page from scratch. The original BRIEF.md design intent is preserved; only the implementation technology changed.
