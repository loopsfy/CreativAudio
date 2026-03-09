# Feature Research

**Domain:** Audio plugin ecommerce -- single-product landing page with Shopify checkout delegation
**Researched:** 2026-03-09
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero section with product visual + tagline | Every plugin site (Vital, Serum, Arturia Pigments) opens with a large product screenshot/render and a clear value proposition. Users need to know what this is in under 3 seconds. | LOW | Full-bleed background, product image, headline, subheadline, primary CTA. Arturia and Vital both use dark themes with vibrant accent colors matching the plugin UI. |
| Feature showcase sections | Vital, Serum, and Pigments all dedicate multiple scroll sections to key capabilities (oscillators, filters, effects, modulation). Users evaluate plugins by features. | MEDIUM | 3-5 sections with alternating layout (image left/right). Each section: heading, short paragraph, supporting visual or animation. Splice's Serum 2 page uses 5 feature blocks. |
| Embedded video demo | Vital has a video watch button in the hero. Serum 2 on Splice has a feature video in the gallery carousel. Users expect to hear/see the plugin before buying. | LOW | YouTube or self-hosted embed. One hero-level video is sufficient for MVP. |
| Preset/sound showcase | Vital prominently features preset counts per tier. Pigments leads with "1700+ presets." Users want to know what sounds come out of the box. | MEDIUM | Grid or carousel of preset categories with names/descriptions. Optionally with inline audio players. |
| Pricing section with clear CTA | Every competitor has unambiguous pricing. Vital uses a 4-tier comparison table. Serum uses rent-to-own on Splice ($9.99/mo). Users need to see cost and click to buy without friction. | LOW | Single price point with a prominent "Buy Now" button. For CreativAudio: price display with countdown timer for urgency, linking to Shopify checkout. |
| System requirements / DAW compatibility | Plugin Alliance, Waves, UA, and every major vendor lists OS versions, plugin formats (VST3/AU/AAX), and tested DAWs. Buyers must verify compatibility before purchase. | LOW | Simple table or list: OS (macOS/Windows versions), plugin formats, minimum CPU/RAM, tested DAWs. |
| FAQ section | Standard on Vital (account/licensing), Arturia (installation), and most plugin sites. Reduces support load and purchase hesitation. | LOW | Accordion component. 6-10 questions covering licensing, installation, refunds, updates, DAW compatibility. |
| Footer with legal/support links | Universal across all sites. Privacy policy, terms, contact/support. | LOW | Standard footer: logo, copyright, links to privacy policy, terms, support email. |
| Mobile responsive design | 83% of traffic is mobile per industry data. Every major plugin site is fully responsive. | MEDIUM | All sections must work on mobile. Special attention to video embeds, preset grids, and pricing sections. |
| Social proof / testimonials | Arturia Pigments features user testimonials. Vital references "professional sound designers." 79% of customers trust online reviews as much as personal recommendations. | LOW | 3-5 testimonials with name, role, and quote. Can be from producers, YouTubers, or beta testers. No need for a review system -- curated quotes suffice. |

### Differentiators (Competitive Advantage)

Features that set CreativAudio apart from typical plugin vendor sites.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Inline audio players for preset demos | Most plugin sites show preset names but do not let you audition sounds directly on the page. Vital and Serum rely on external YouTube demos. Letting visitors hear presets without leaving the page dramatically increases engagement. | MEDIUM | HTML5 audio elements with custom waveform/progress UI. 8-12 short clips (10-15 seconds each). Lazy-load audio files. |
| 24-hour rolling countdown timer on pricing | Creates urgency without being deceptive -- price is always the same, but the countdown resets daily, creating a "deal ends today" feeling. Evergreen countdown timers are proven to increase conversion. | LOW | Client-side countdown that resets at midnight UTC (or visitor-local). Pure UI element -- no backend needed. Must be implemented honestly (same price always). |
| Cart drawer with Shopify checkout redirect | Most plugin vendors use full-page checkout flows or redirect to third-party stores (Plugin Boutique, Splice). A slide-out cart drawer keeps users on-page and reduces friction before redirecting to Shopify's hosted checkout. | MEDIUM | Shopify Storefront API via Cart API (NOT the deprecated JS Buy SDK). Create cart, add line item, get checkoutUrl, redirect. Drawer UI with quantity, total, and checkout button. |
| Scroll-triggered animations and micro-interactions | Arturia Pigments and Vital use animated UI elements and parallax effects. Most indie plugin sites are static. Motion design signals premium quality. | MEDIUM | Intersection Observer-based reveal animations. CSS transitions on feature sections. Parallax on hero. Keep performant -- no heavy JS animation libraries. |
| Dark theme with vibrant accent colors | Matches the aesthetic expectations of music producers. Vital, Serum, FabFilter, and Arturia all use dark backgrounds. A polished dark theme immediately signals "this is a real audio product." | LOW | Dark background (#0a0a0a range), vibrant accent color matching Orbital's brand. All text, components, and images designed for dark context. |
| Social media integration (Discord, YouTube, Instagram) | Vital prominently links Discord, YouTube, Instagram, and Bluesky. Community presence builds trust and signals active development. | LOW | Icon links in header/footer. Optionally a "Join our community" CTA section. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems for a single-product landing page.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Full ecommerce store / multi-product catalog | "We might sell presets or bundles later" | Adds routing, product listing, filtering, cart complexity. Overkill for a single product. Shopify handles the actual store if needed. | Single product page with Shopify checkout delegation. If preset packs are added later, they can be separate Shopify products linked from the same page or a minimal /presets route. |
| User accounts / login system | "Users need to manage licenses" | Massive complexity (auth, sessions, password reset, security). License delivery is handled by Shopify order emails + download links or a service like Gumroad/FastSpring. | Shopify handles customer accounts. Link to Shopify account page for order history. Use email-based license delivery. |
| Built-in audio engine / WebAudio synth demo | "Let people play the synth in the browser" | Enormous engineering effort. WebAudio latency and browser compatibility issues. No plugin vendor does this. | Short audio clips of presets. Link to a free trial download so users can try the actual plugin in their DAW. |
| Blog / content management system | "We need SEO content" | Adds CMS complexity, content creation burden, and maintenance overhead for a product launch. A landing page with good meta tags and structured data is sufficient for launch SEO. | Static landing page optimized for "[product name] synth plugin" keywords. Add a blog later only if content marketing becomes a priority. |
| Real-time chat support widget | "Users need help before buying" | Support burden for a small team. Chat widgets add page weight and distract from the conversion flow. | FAQ section covers common questions. Support email in footer. Discord community for discussions. |
| Rent-to-own / subscription pricing | "Splice does it, we should too" | Requires payment infrastructure, subscription management, license provisioning/revocation, and Splice partnership. Enormous complexity for launch. | Single purchase price. Potentially offer via Splice later as a distribution channel (they handle all the infrastructure). |
| Multi-language / i18n | "We have international customers" | Significant content and engineering effort. Translation quality matters -- bad translations hurt more than English-only. | English-only at launch. Music production is a globally English-comfortable market. Revisit only if analytics show significant non-English traffic. |
| A/B testing framework | "We need to optimize conversions" | Premature optimization. Need traffic before testing. Adds complexity to the codebase. | Use Vercel's built-in analytics for basic metrics. Manual A/B testing (deploy variant, measure for a week) is sufficient at launch scale. |

## Feature Dependencies

```
[Hero Section]
    no dependencies -- build first

[Feature Showcase Sections]
    requires --> [Hero Section] (establishes visual language and layout patterns)

[Video Demo]
    requires --> [Hero Section] (embedded within or immediately after hero)

[Preset Showcase]
    standalone, but enhances --> [Feature Showcase Sections]
    optionally requires --> [Inline Audio Players] (if audio previews are included)

[Inline Audio Players]
    enhances --> [Preset Showcase]
    standalone component, no hard dependencies

[Pricing Section]
    requires --> [Shopify Product Setup] (needs product ID and price from Shopify)
    optionally includes --> [Countdown Timer]

[Countdown Timer]
    enhances --> [Pricing Section]
    no technical dependencies (pure client-side)

[Cart Drawer + Shopify Checkout]
    requires --> [Shopify Product Setup] (Storefront API access token, product variant ID)
    requires --> [Pricing Section] (CTA triggers cart)

[FAQ Section]
    no dependencies -- standalone accordion component

[Social Proof / Testimonials]
    no dependencies -- standalone section

[System Requirements]
    no dependencies -- standalone section

[Footer]
    no dependencies -- build alongside any section
```

### Dependency Notes

- **Cart Drawer requires Shopify Product Setup:** The Storefront API access token and product variant ID must exist in Shopify before the cart can be created. This is a configuration dependency, not a code dependency.
- **Inline Audio Players enhance Preset Showcase:** Audio players are a differentiator that makes the preset section interactive, but the preset section works without them (showing names/categories/descriptions only).
- **Countdown Timer enhances Pricing Section:** The countdown is purely additive UI -- pricing works without it.

## MVP Definition

### Launch With (v1)

Minimum viable product -- what's needed to start selling Orbital.

- [ ] **Hero section** -- product image, tagline, primary CTA ("Buy Now" or "Get Orbital") -- this is the first impression
- [ ] **Feature showcase (3-5 sections)** -- explain what Orbital does and why it matters
- [ ] **Video demo embed** -- one YouTube embed showing the plugin in action
- [ ] **Pricing section with countdown** -- price, urgency timer, "Add to Cart" button
- [ ] **Cart drawer with Shopify checkout redirect** -- slide-out cart, redirect to Shopify checkout
- [ ] **Social proof (3-5 testimonials)** -- curated quotes from producers/beta testers
- [ ] **FAQ accordion** -- 6-10 questions covering licensing, compatibility, installation
- [ ] **System requirements** -- OS, DAW, plugin format compatibility
- [ ] **Footer** -- legal links, social media icons, support email
- [ ] **Mobile responsive** -- all sections functional on mobile
- [ ] **Dark theme** -- matches audio production aesthetic expectations

### Add After Validation (v1.x)

Features to add once the site is live and generating traffic.

- [ ] **Preset showcase with categories** -- add when preset library is finalized and marketing wants to highlight specific sounds
- [ ] **Inline audio players** -- add when audio clips are produced; significant engagement boost
- [ ] **Scroll-triggered animations** -- add polish once core conversion flow is validated
- [ ] **Community section (Discord/social CTAs)** -- add when community channels are active

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] **Preset pack upsells** -- additional Shopify products linked from the page
- [ ] **Blog / content section** -- only if content marketing becomes a strategy
- [ ] **Splice rent-to-own integration** -- partnership-level decision, not a website feature
- [ ] **Additional product pages** -- only when there are more products to sell

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Hero section + CTA | HIGH | LOW | P1 |
| Feature showcase sections | HIGH | MEDIUM | P1 |
| Video demo embed | HIGH | LOW | P1 |
| Pricing section | HIGH | LOW | P1 |
| Cart drawer + Shopify checkout | HIGH | MEDIUM | P1 |
| FAQ accordion | MEDIUM | LOW | P1 |
| System requirements | MEDIUM | LOW | P1 |
| Social proof / testimonials | HIGH | LOW | P1 |
| Dark theme | HIGH | LOW | P1 |
| Mobile responsive | HIGH | MEDIUM | P1 |
| Footer | LOW | LOW | P1 |
| Countdown timer | MEDIUM | LOW | P1 |
| Preset showcase | HIGH | MEDIUM | P2 |
| Inline audio players | HIGH | MEDIUM | P2 |
| Scroll animations | MEDIUM | MEDIUM | P2 |
| Community section | LOW | LOW | P2 |
| Preset pack upsells | MEDIUM | MEDIUM | P3 |
| Blog | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

## Competitor Feature Analysis

| Feature | Vital | Serum (Splice) | Arturia Pigments | Our Approach |
|---------|-------|----------------|------------------|--------------|
| Hero section | Dark theme, product screenshot, "Get Vital" CTA | Product name, tagline, image gallery carousel | Dark theme, vibrant accents, overview hero | Dark theme, product render, tagline, "Get Orbital" CTA |
| Feature sections | Inline feature demos with animations | 5 "NEW:" feature blocks with images | Multi-section with synthesis engine details | 3-5 alternating sections with visuals |
| Video | Video watch button in hero area | Feature video in gallery carousel | Referenced but not prominently embedded | YouTube embed in or below hero |
| Pricing | 4-tier table (Free/Plus/Pro/Subscribe) | $9.99/mo rent-to-own, "Start free trial" CTA | Buy outright via store page | Single price with countdown, "Add to Cart" CTA |
| Presets info | Preset counts per pricing tier (e.g., "250 presets") | "Endless Creation" section, presets mentioned | "1700+ presets" prominently featured | Preset categories/names, optionally with audio players |
| Audio demos | None on page (relies on YouTube) | None on page | None on page | Inline audio players (differentiator) |
| Social proof | "Professional sound designers" mention | None visible | User testimonials | Curated producer testimonials |
| System requirements | OS compatibility section | Platform icons (macOS, Windows, AAX, AU, VST) | On separate specs page | Inline table/list on landing page |
| FAQ | Account/licensing questions | Link to manufacturer site | On separate support page | Inline accordion on landing page |
| Cart/checkout | Redirects to account.vital.audio | "Start free trial" button (Splice handles checkout) | Redirects to arturia.com/store | Cart drawer with Shopify checkout redirect |
| Community links | Discord, YouTube, Instagram, Bluesky | None | Social links in footer | Discord, YouTube, Instagram in header/footer |

## Sources

- [Vital.audio](https://vital.audio/) -- direct analysis of product page structure (HIGH confidence)
- [Splice Serum 2 page](https://splice.com/plugins/39137242-serum-2-au-by-xfer-records) -- product page structure via WebFetch (HIGH confidence)
- [FabFilter products page](https://www.fabfilter.com/products) -- product catalog structure (HIGH confidence)
- [Arturia Pigments](https://www.arturia.com/products/software-instruments/pigments/overview) -- feature structure via WebSearch (MEDIUM confidence -- page content not fully renderable)
- [Shopify Buy Button docs](https://www.shopify.com/blog/60670213-5-ways-you-can-use-shopify-buy-buttons-to-sell-on-your-website-or-blog) -- Buy Button and headless checkout patterns (HIGH confidence)
- [Shopify Storefront API Cart docs](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart) -- Cart API for headless checkout (HIGH confidence)
- [Shopify JS Buy SDK deprecation](https://shopify.dev/docs/storefronts/headless/additional-sdks/js-buy) -- JS Buy SDK deprecated Jan 2025, use Cart API instead (HIGH confidence)
- [Splice rent-to-own model](https://splice.com/features/plugins) -- pricing model reference (MEDIUM confidence)
- [Ecommerce landing page best practices](https://unbounce.com/landing-page-examples/best-landing-page-examples/) -- conversion data, mobile stats (MEDIUM confidence)

---
*Feature research for: Audio plugin ecommerce (CreativAudio / Orbital synth plugin)*
*Researched: 2026-03-09*
