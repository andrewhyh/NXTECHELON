# CLAUDE.md — NextEchelon Landing Page

> Context file for Claude Code. Read this fully before generating or modifying code.
> When in doubt, optimize for: clarity, conversion, speed, modern aesthetic.

---

## Project

- **Name:** NextEchelon (stylized as **NXTECHLON** in the wordmark)
- **Domain:** [nextechelon.site](https://nextechelon.site)
- **Type:** Marketing landing page for an AI agency
- **Primary goal:** Convert visitors into booked discovery calls
- **Secondary goal:** Establish credibility and educate prospects on AI's practical business value

---

## About NextEchelon

NextEchelon is an AI agency based in Metro Atlanta, GA, founded by Bryan Vu. We help small and mid-sized businesses modernize through **custom website development** and **practical AI integration** — delivering measurable outcomes without the buzzwords or enterprise price tag.

We are **AI-native from day one**, technically hands-on (not resellers), and we speak business — not just code.

### Positioning Statement

> For businesses that want to grow with technology but don't have the time or team to figure it out, NextEchelon delivers practical websites and AI systems that drive real results.

### Mission

Modernize small and mid-sized businesses through high-performing websites and practical AI integration that produce measurable outcomes.

### Vision

To be the go-to AI partner for small and mid-sized businesses that want to compete with enterprise-grade technology.

### Core Values

1. **Build what works.** No vanity tech.
2. **Speak plainly.** Clients shouldn't need a translator.
3. **Ship and iterate.** Done beats perfect.
4. **Educate the client.** They should leave smarter than they came in.

### Differentiators

- Hands-on technical depth — we build, not resell
- Business-first communication — outcomes, not jargon
- Local presence (Metro Atlanta) + remote delivery anywhere in the U.S.
- AI-native from inception, not bolted on

---

## Ideal Customer Profiles (ICPs)

The landing page should resonate with all three. Use the copy hierarchy to address them in this order.

### ICP 1 — Local Service Businesses (Primary)
- **Examples:** Real estate agents/brokerages, law firms, medical/dental practices, home services (HVAC, roofing, landscaping), auto shops
- **Pain points:** Outdated website, slow lead response, missed calls, manual booking, no follow-up system
- **What they want:** More qualified leads, less time on admin, look professional online
- **Sells well:** AI receptionist/chatbot, lead-capture sites, automated follow-up, review generation

### ICP 2 — E-commerce & DTC Brands
- **Pain points:** High support volume, abandoned carts, poor product discovery, low conversion
- **What they want:** Higher AOV/conversion, lower support cost, better customer experience
- **Sells well:** AI product recommendations, support chatbots, automated email/SMS, conversion-optimized PDPs

### ICP 3 — Small B2B Companies Ready to Scale
- **Pain points:** Founder-led sales, no website conversion, manual lead qualification, inconsistent outreach
- **What they want:** Predictable lead flow, scalable sales motion, professional credibility
- **Sells well:** Lead-gen AI agents, RAG-powered internal tools, sales automation, AI-enhanced CRM workflows

---

## Services to Showcase

Organize the Services section around these four pillars:

### 1. Custom Website Development
Conversion-focused, fast, modern. Mobile-first. Built on Next.js, WordPress, Webflow, or Shopify depending on fit. Client owns the domain, hosting, and code at handoff.

### 2. AI Integration
- Customer-support chatbots
- Lead-qualifying AI assistants
- Internal knowledge search (RAG systems)
- Content generation tools
- Automated email/SMS workflows
- AI-enhanced CRM workflows

### 3. AI Strategy & Consulting
Roadmaps, audits, team training. For businesses that want a plan before they build.

### 4. Workflow Automation
Connecting tools to remove busywork — Zapier, Make, n8n, and custom code where needed.

---

## Required Page Sections (in order)

1. **Hero**
   - Bold headline focused on outcome (e.g., "Smarter Websites. Real AI. Built for Business.")
   - Subheadline naming the ICPs and value
   - Primary CTA: "Book a Free Discovery Call"
   - Secondary CTA: "See Our Services"
   - Visual: animated/abstract AI motif or subtle product mockup

2. **Social Proof Strip** *(immediately under hero — placeholder if no logos yet)*
   - "Trusted by businesses across Metro Atlanta" or logo row

3. **Problem / Agitation**
   - 3 short cards naming the pain ICPs feel (outdated site, missed leads, drowning in busywork)

4. **Services** (4-pillar grid — see above)

5. **How We Work** (3- or 4-step process)
   - Discovery call → Proposal & scope → Build → Launch & support

6. **Outcomes / What You Get** *(benefit-focused, not feature-focused)*
   - More qualified leads, faster response time, less manual work, professional brand

7. **About / Founder** *(short, builds trust)*
   - Bryan Vu, Metro Atlanta, technical background, AI-native focus

8. **FAQ** (5–8 questions — pull from existing FAQ list)

9. **Final CTA Section**
   - "Ready to modernize your business?" + book-a-call button

10. **Footer**
    - Logo, contact, social, light nav, copyright

---

## Brand Voice

- **Confident, not cocky** — we know our craft
- **Plain-spoken** — no jargon walls
- **Outcome-focused** — always tie features to business value
- **Modern & approachable** — tech-forward but human

**Avoid:** "Revolutionary," "synergy," "leverage," "cutting-edge," "game-changing," generic AI hype. Be specific.

---

## Visual & Design Direction

### Aesthetic
Modern, dark-mode-friendly, tech-forward but warm. Think: clean SaaS landing page energy (Linear, Vercel, Anthropic) — not gimmicky AI-art backgrounds.

### Color Palette *(working defaults — confirm with Bryan)*
- **Background:** Near-black `#0A0A0B` or off-white `#FAFAFA` (dark mode primary)
- **Primary accent:** Electric blue or violet (TBD)
- **Secondary accent:** Subtle gradient or neon edge
- **Text:** High-contrast white/near-black

### Typography
- **Display/Headings:** Modern geometric sans (Inter, Geist, Satoshi, or similar)
- **Body:** Same family, lighter weight
- **Mono accents:** For technical credibility (JetBrains Mono, Geist Mono)

### Motion
- Subtle, purposeful. Fade-in on scroll, micro-interactions on CTAs, hover lifts on cards.
- Hero may have a tasteful animated element (gradient mesh, particle, or motion text).
- No autoplay video, no carousels that move on their own.

---

## Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui where useful; custom otherwise
- **Animation:** Framer Motion (sparingly)
- **Icons:** Lucide
- **Forms:** Native + server actions; integrate with email/CRM later
- **Deployment:** Vercel
- **Analytics:** Add Plausible or Vercel Analytics post-launch

---

## Performance Requirements

- Lighthouse score ≥ 95 (Performance, Accessibility, Best Practices, SEO)
- LCP < 2.0s on 4G
- All images: Next/Image with proper sizes and AVIF/WebP
- No render-blocking third-party scripts above the fold
- Mobile-first; test at 375px, 768px, 1280px, 1920px

---

## Accessibility

- WCAG AA minimum
- Semantic HTML (proper landmarks, heading hierarchy)
- All interactive elements keyboard-navigable
- Visible focus states
- Alt text on all images
- Color contrast ratios ≥ 4.5:1 for body text

---

## SEO

- **Primary keywords:** AI agency Atlanta, AI integration small business, custom website development Atlanta, AI chatbot for business
- Unique `<title>` and meta description
- Open Graph + Twitter card meta
- Structured data: `Organization` + `LocalBusiness` (Metro Atlanta) + `Service` schema
- Sitemap and `robots.txt`
- Canonical URLs

---

## CTAs

Every CTA leads to one of:
1. **Book a discovery call** (Calendly or Cal.com embed) — primary
2. **Contact form** — secondary fallback
3. **Email link** — footer only

Use action-oriented language: "Book a free call," "Let's talk," "Start your project" — never "Submit" or "Click here."

---

## Content Guardrails

- **Don't overpromise specific results** (no "guaranteed 10x leads")
- **Use realistic case-study language** when examples exist; placeholder copy if not
- **No fake testimonials**
- **Pricing:** Don't put exact dollar amounts on the page — direct to discovery call
- **Compliance:** Add a basic privacy policy and terms page; cookie banner if analytics added

---

## File / Folder Conventions

```
/app
  /(marketing)
    page.tsx          ← landing page
    layout.tsx
  /components
    /sections         ← Hero, Services, FAQ, etc.
    /ui               ← shadcn primitives
  /lib
  /public
    /images
```

- One section component per file
- Co-locate section-specific helpers
- Keep `page.tsx` as a composition file — sections do the work

---

## What Claude Code Should Do by Default

- **Always** match the brand voice — confident, plain-spoken, outcome-focused
- **Always** prefer accessibility, performance, and semantic HTML
- **Always** mobile-first
- **Never** introduce dependencies without asking
- **Never** add tracking or third-party scripts without confirmation
- **Never** generate fake testimonials, client names, or case-study results
- When unsure about copy specifics — ask, or insert a clearly-marked `{{PLACEHOLDER}}`

---

## Open Questions / TODO

- [ ] Finalize tagline (working: "Smarter Websites. Real AI. Built for Business.")
- [ ] Choose final accent color(s)
- [ ] Logo asset (SVG)
- [ ] Discovery-call booking tool (Calendly vs Cal.com)
- [ ] First case studies / testimonials
- [ ] Privacy policy and terms copy
- [ ] Decide: dark mode default, light mode default, or toggle