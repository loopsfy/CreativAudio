# Requirements: CreativAudio — Orbital Plugin Store

**Defined:** 2026-03-09
**Core Value:** Users can discover Orbital's capabilities and purchase it through a seamless add-to-cart → Shopify checkout flow.

## v1 Requirements

### Layout & Structure

- [ ] **LAYOUT-01**: User sees a responsive header with CreativAudio logo, anchor-link navigation (PRODUCTS, PRESETS, SUPPORT, ABOUT), cart icon with item count badge, and buy CTA button
- [ ] **LAYOUT-02**: User sees a hero section with Orbital branding/logo, tagline, subtitle, primary CTA button, and product visual image
- [ ] **LAYOUT-03**: User sees a DAW compatibility row (VST3, AU, AAX, Windows & macOS) below the hero
- [ ] **LAYOUT-04**: User sees a features section with heading and 6 feature cards in a responsive grid
- [ ] **LAYOUT-05**: User sees a sound library section with preset list items showing preset name, category, and genre
- [ ] **LAYOUT-06**: User sees a social proof section with stats row (downloads, ratings, etc.) and 3 testimonial cards
- [ ] **LAYOUT-07**: User sees a pricing section with launch offer badge, 24h countdown timer, price display, feature list, and CTA
- [ ] **LAYOUT-08**: User sees an FAQ section with expandable/collapsible question-answer items
- [ ] **LAYOUT-09**: User sees a footer with brand description, navigation columns, and legal/copyright row
- [ ] **LAYOUT-10**: All sections are accessible via smooth-scroll anchor links from the header navigation

### Commerce

- [ ] **COMM-01**: User can click "Add to Cart" and a lateral cart drawer slides in from the right
- [ ] **COMM-02**: Cart drawer displays Orbital product with name, price, quantity, and a remove option
- [ ] **COMM-03**: Cart drawer has a "Checkout" button that redirects to the Shopify-hosted checkout page for Orbital
- [ ] **COMM-04**: Cart state persists across page interactions (stored client-side via nanostores)
- [ ] **COMM-05**: Header cart icon shows item count badge when product is in cart
- [ ] **COMM-06**: Commerce integration uses Shopify Storefront API with Cart API GraphQL mutations (not deprecated JS Buy SDK)

### Marketing

- [ ] **MKTG-01**: Pricing section displays a 24-hour countdown timer that resets daily (loops every 24h)
- [ ] **MKTG-02**: Countdown timer shows hours, minutes, and seconds remaining

### Animation

- [ ] **ANIM-01**: Sections reveal with scroll-triggered animations using GSAP ScrollTrigger
- [ ] **ANIM-02**: Feature cards, testimonials, and stats animate in with staggered reveals
- [ ] **ANIM-03**: Animations are performant (only transform/opacity, no layout thrashing)

### Technical

- [ ] **TECH-01**: Site is built with Astro 5.x using island architecture (zero JS by default, interactive islands for cart/timer)
- [ ] **TECH-02**: Styling uses Tailwind CSS v4 matching the Pencil design (light theme, #FF5C00 accent)
- [ ] **TECH-03**: Site is fully responsive (desktop, tablet, mobile)
- [ ] **TECH-04**: Images are optimized (WebP/AVIF via Astro's Image component, lazy loading)
- [ ] **TECH-05**: Site includes proper SEO meta tags (title, description, Open Graph)
- [ ] **TECH-06**: Site deploys to Vercel with zero-config from git repo
- [ ] **TECH-07**: Design matches the Pencil file closely (typography, colors, spacing, layout)

## v2 Requirements

### Audio Previews

- **AUDIO-01**: User can play inline audio previews of presets in the Sound Library section
- **AUDIO-02**: Audio player shows play/pause, progress, and waveform visualization

### Enhanced Commerce

- **ECOMM-01**: Product data (price, name) fetched from Shopify at build time instead of hardcoded
- **ECOMM-02**: Post-checkout redirect back to landing page with success message

### Community

- **COMMUNITY-01**: User sees a community/social section with links to Discord, YouTube, etc.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Multiple products | Only Orbital exists, single-product focus |
| User accounts / login | Shopify handles customer accounts at checkout |
| Payment processing | Delegated entirely to Shopify |
| Blog / CMS | Single landing page, no content management |
| Backend / API server | All client-side, Shopify for commerce |
| Mobile app | Web only |
| Dark theme | Design is light-themed with orange accent |
| Multi-language | English only for launch |
| Rent-to-own pricing | Complexity not justified for single product |
| WebAudio synth demo | High complexity, defer to v2+ |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| LAYOUT-01 | Phase 2 | Pending |
| LAYOUT-02 | Phase 2 | Pending |
| LAYOUT-03 | Phase 2 | Pending |
| LAYOUT-04 | Phase 2 | Pending |
| LAYOUT-05 | Phase 2 | Pending |
| LAYOUT-06 | Phase 2 | Pending |
| LAYOUT-07 | Phase 2 | Pending |
| LAYOUT-08 | Phase 2 | Pending |
| LAYOUT-09 | Phase 2 | Pending |
| LAYOUT-10 | Phase 3 | Pending |
| COMM-01 | Phase 5 | Pending |
| COMM-02 | Phase 5 | Pending |
| COMM-03 | Phase 5 | Pending |
| COMM-04 | Phase 5 | Pending |
| COMM-05 | Phase 5 | Pending |
| COMM-06 | Phase 5 | Pending |
| MKTG-01 | Phase 3 | Pending |
| MKTG-02 | Phase 3 | Pending |
| ANIM-01 | Phase 4 | Pending |
| ANIM-02 | Phase 4 | Pending |
| ANIM-03 | Phase 4 | Pending |
| TECH-01 | Phase 1 | Pending |
| TECH-02 | Phase 1 | Pending |
| TECH-03 | Phase 2 | Pending |
| TECH-04 | Phase 2 | Pending |
| TECH-05 | Phase 2 | Pending |
| TECH-06 | Phase 1 | Pending |
| TECH-07 | Phase 2 | Pending |

**Coverage:**
- v1 requirements: 28 total
- Mapped to phases: 28
- Unmapped: 0

---
*Requirements defined: 2026-03-09*
*Last updated: 2026-03-09 after roadmap revision*
