# Roadmap: CreativAudio — Orbital Plugin Store

## Overview

This roadmap delivers a single-page ecommerce landing page for Orbital, an audio synthesizer plugin. The project progresses from Astro scaffold and deploy pipeline, through static section layout matching the Pencil design, marketing features (countdown timer, smooth scroll), scroll-triggered GSAP animations, and finally Shopify cart integration. Commerce is last because it does not block the visual/interactive experience — the full site is built and polished before connecting checkout.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Astro project scaffold, Tailwind theming, and Vercel deployment pipeline
- [ ] **Phase 2: Static Sections** - All page sections rendered as static HTML/CSS matching the Pencil design
- [ ] **Phase 3: Marketing & Navigation** - Countdown timer, smooth-scroll anchor links
- [ ] **Phase 4: Animation** - GSAP scroll-triggered section reveals and staggered animations
- [ ] **Phase 5: Commerce** - Cart drawer, Shopify Storefront API integration, and checkout redirect

## Phase Details

### Phase 1: Foundation
**Goal**: A working Astro 5.x project with Tailwind CSS v4 theming deployed to Vercel, ready to receive page sections
**Depends on**: Nothing (first phase)
**Requirements**: TECH-01, TECH-02, TECH-06
**Success Criteria** (what must be TRUE):
  1. Running `npm run dev` starts a local dev server that renders a page with the CreativAudio color scheme (light theme, #FF5C00 accent)
  2. Pushing to the git repo triggers a Vercel deployment that serves the site at a public URL
  3. The project uses Astro 5.x with island architecture and Tailwind CSS v4 with the project's design tokens (colors, fonts: Orbitron, Inter, DM Mono)
**Plans:** 1 plan

Plans:
- [ ] 01-01-PLAN.md — Scaffold Astro 5.x + Tailwind v4 with design tokens and deploy to Vercel

### Phase 2: Static Sections
**Goal**: Users see the complete landing page with all sections rendered as static HTML/CSS, fully responsive, matching the Pencil design
**Depends on**: Phase 1
**Requirements**: LAYOUT-01, LAYOUT-02, LAYOUT-03, LAYOUT-04, LAYOUT-05, LAYOUT-06, LAYOUT-07, LAYOUT-08, LAYOUT-09, TECH-03, TECH-04, TECH-05, TECH-07
**Success Criteria** (what must be TRUE):
  1. User sees all nine page sections in order: header, hero with DAW compatibility row, features grid, sound library presets, social proof with stats and testimonials, pricing with launch offer, FAQ with expandable items, and footer
  2. Every section is fully responsive across desktop, tablet, and mobile viewports with no layout breakage
  3. Images use optimized formats (WebP/AVIF via Astro Image component) with lazy loading, and the page has proper SEO meta tags (title, description, Open Graph)
  4. The layout, typography, colors, and spacing match the Pencil design file closely
**Plans:** 5 plans

Plans:
- [ ] 02-01-PLAN.md — Update design tokens, SEO meta, install @lucide/astro, SectionDivider
- [ ] 02-02-PLAN.md — Header and Hero sections
- [ ] 02-03-PLAN.md — Features and Sound Library sections
- [ ] 02-04-PLAN.md — Social Proof and Pricing sections
- [ ] 02-05-PLAN.md — FAQ, Footer, page composition, and visual verification

### Phase 3: Marketing & Navigation
**Goal**: Users experience the pricing urgency timer and can navigate between sections with smooth scrolling
**Depends on**: Phase 2
**Requirements**: MKTG-01, MKTG-02, LAYOUT-10
**Success Criteria** (what must be TRUE):
  1. Pricing section displays a countdown timer showing hours, minutes, and seconds that resets on a 24-hour daily loop
  2. Clicking any header navigation link (PRODUCTS, PRESETS, SUPPORT, ABOUT) smooth-scrolls to the corresponding section
**Plans**: TBD

Plans:
- [ ] 03-01: TBD

### Phase 4: Animation
**Goal**: The site feels premium with scroll-triggered animations throughout all sections
**Depends on**: Phase 2
**Requirements**: ANIM-01, ANIM-02, ANIM-03
**Success Criteria** (what must be TRUE):
  1. Sections reveal with scroll-triggered animations as the user scrolls down the page (using GSAP ScrollTrigger)
  2. Feature cards, testimonial cards, and stats animate in with staggered reveal timing
  3. All animations use only transform and opacity properties (no layout thrashing), maintaining smooth 60fps performance
**Plans**: TBD

Plans:
- [ ] 04-01: TBD

### Phase 5: Commerce
**Goal**: Users can add Orbital to cart and check out through Shopify
**Depends on**: Phase 2
**Requirements**: COMM-01, COMM-02, COMM-03, COMM-04, COMM-05, COMM-06
**Success Criteria** (what must be TRUE):
  1. User clicks "Add to Cart" and a cart drawer slides in from the right showing the Orbital product with name, price, quantity, and remove option
  2. User clicks "Checkout" in the cart drawer and is redirected to the Shopify-hosted checkout page for Orbital
  3. Cart state persists across page interactions and refreshes (cart ID stored client-side, rehydrated from Shopify on load)
  4. Header cart icon displays an item count badge when a product is in the cart
  5. All Shopify communication uses the Storefront API Client with Cart API GraphQL mutations (not the deprecated JS Buy SDK)
**Plans**: TBD

Plans:
- [ ] 05-01: TBD
- [ ] 05-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5
Note: Phases 3, 4, and 5 all depend on Phase 2 but are independent of each other. Commerce is intentionally last to build the full visual site before connecting Shopify.

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/1 | Not started | - |
| 2. Static Sections | 0/5 | Not started | - |
| 3. Marketing & Navigation | 0/TBD | Not started | - |
| 4. Animation | 0/TBD | Not started | - |
| 5. Commerce | 0/TBD | Not started | - |
