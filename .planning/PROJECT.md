# CreativAudio — Orbital Plugin Store

## What This Is

A single-page e-commerce website for CreativAudio, a new audio plugin brand. The site sells Orbital, a VST/AU/AAX synthesizer plugin, with a modern landing page that includes product showcase, features, sound library preview, social proof, pricing, and FAQ. The cart drawer and checkout flow delegate to Shopify.

## Core Value

Users can discover Orbital's capabilities and purchase it through a seamless add-to-cart → Shopify checkout flow.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Single-page landing with all sections from Pencil design (header, hero, features, presets, social proof, pricing, FAQ, footer)
- [ ] Responsive header with CreativAudio logo, anchor-link navigation (PRODUCTS, PRESETS, SUPPORT, ABOUT), cart icon with item count, and buy button
- [ ] Hero section with Orbital branding, CTA button, product visual, and DAW compatibility row
- [ ] Features section with 6 feature cards in a grid
- [ ] Sound Library section with preset list
- [ ] Social Proof section with stats and testimonial cards
- [ ] Pricing section with launch offer and 24-hour countdown timer that resets daily (marketing loop)
- [ ] FAQ section with expandable questions
- [ ] Footer with brand info, navigation columns, and legal links
- [ ] Add-to-cart button that opens a lateral cart drawer (slide-in from right)
- [ ] Cart drawer shows Orbital product with quantity, price, and a "Checkout" button
- [ ] Checkout button redirects to Shopify checkout URL for the Orbital product
- [ ] Smooth scroll anchor links for nav items
- [ ] Deploy on Vercel

### Out of Scope

- Multiple products — only Orbital for now
- User accounts / login — not needed, Shopify handles checkout
- Payment processing — delegated entirely to Shopify
- Blog / content pages — single landing page only
- Backend / API — static frontend, Shopify for commerce
- Mobile app — web only

## Context

- Design already exists as a Pencil (.pen) file at `C:\Users\zepid\OneDrive\Documentos\creativ audio.pen`
- Design is a light-themed, clean layout with orange (#FF5C00) as accent color
- Typography: Orbitron for headings, Inter for body, DM Mono for logo/code
- Plugin is compatible with VST3, AU, AAX on Windows & macOS
- Shopify store will be created separately — the site just needs to link to the Shopify checkout URL
- Countdown timer is a marketing strategy: 24h loop that resets every midnight or on page load

## Constraints

- **Tech stack**: Frontend JS framework (lightweight, Vercel-friendly) — no heavy backend
- **Design**: Must match the Pencil design pixel-closely
- **Hosting**: Vercel
- **Commerce**: Shopify checkout only — no self-hosted payment
- **Single page**: All content on one page with anchor navigation

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Shopify for checkout only | Avoid building payment/cart backend, leverage Shopify's infrastructure | — Pending |
| Single-page architecture | One product, all info on one page, simpler to build and maintain | — Pending |
| 24h countdown loop | Marketing urgency without a real deadline | — Pending |
| Vercel hosting | Fast, free tier, great for static/JS sites | — Pending |

---
*Last updated: 2026-03-09 after initialization*
