# Project Research Summary

**Project:** CreativAudio -- Orbital Plugin Store
**Domain:** Single-product ecommerce landing page (audio plugin, Shopify headless checkout)
**Researched:** 2026-03-09
**Confidence:** HIGH

## Executive Summary

CreativAudio is a single-page ecommerce landing page for Orbital, a VST/AU/AAX synthesizer plugin. The expert consensus for this type of product is clear: use a static-first site generator (Astro) that ships zero JavaScript by default, add small interactive islands only where needed (cart drawer, countdown timer), and delegate all payment and checkout to Shopify via the Storefront API Cart mutations. This is not a complex web application -- it is a conversion-optimized marketing page with a thin commerce layer. The architecture should reflect that simplicity.

The recommended approach is Astro 5.x with Tailwind CSS 4.x for styling, GSAP for scroll-triggered animations, nanostores for cross-island state (cart), and `@shopify/storefront-api-client` for Shopify integration. The site deploys as a static build on Vercel. All cart operations happen client-side using Shopify's public Storefront Access Token, and checkout redirects to Shopify's hosted checkout page. No backend, no server functions, no API routes needed for the core flow.

The top risks are: (1) accidentally building on the deprecated JS Buy SDK instead of the current Storefront API Client -- this is a hard blocker with no graceful fallback; (2) cart state desync between the client and Shopify's Cart API, which destroys checkout trust; (3) the countdown timer being implemented as a deceptive dark pattern that gets called out by the tight-knit audio production community on KVR/Reddit; and (4) poor Core Web Vitals from unoptimized hero images on a visually heavy dark-themed page. All four are preventable with correct architecture decisions made early.

## Key Findings

### Recommended Stack

The stack is lightweight and static-first. Astro eliminates the JavaScript runtime penalty that frameworks like Next.js or React SPAs impose on what is fundamentally a content page. Interactive pieces (cart drawer, countdown, cart badge) use Astro islands with vanilla JS or Preact. GSAP handles all animation needs including scroll-triggered reveals, and its recent move to fully free commercial licensing removes any cost concern.

**Core technologies:**
- **Astro 5.x:** Static site framework -- ships zero JS by default, islands for interactivity, perfect Lighthouse scores for content-heavy pages
- **Tailwind CSS 4.x:** Utility-first styling -- CSS-first config in v4, 5x faster builds, no PostCSS config needed with Vite
- **GSAP 3.14.x:** Animation engine -- scroll-triggered reveals, timeline sequencing, now 100% free for commercial use
- **@shopify/storefront-api-client 1.x:** Shopify integration -- official replacement for deprecated JS Buy SDK, handles cart creation and checkout URL generation
- **nanostores 1.x:** State management -- 286 bytes, Astro's official recommendation for sharing cart state across islands

**Critical version note:** The JS Buy SDK (`shopify-buy` npm package) is dead. It was deprecated January 2025 and reached EOL January 2026. All Shopify headless commerce must use the Storefront API Client with Cart API mutations.

### Expected Features

**Must have (table stakes):**
- Hero section with product visual, tagline, and primary CTA
- Feature showcase (3-5 sections explaining Orbital's capabilities)
- Embedded video demo (YouTube)
- Pricing section with clear CTA and countdown timer
- Cart drawer with Shopify checkout redirect
- Social proof / testimonials (3-5 curated quotes)
- FAQ accordion (6-10 questions)
- System requirements / DAW compatibility list
- Footer with legal links and social media
- Mobile responsive across all sections
- Dark theme matching audio production aesthetic

**Should have (differentiators):**
- Inline audio players for preset demos (no competitor does this on-page)
- Scroll-triggered animations and micro-interactions (signals premium quality)
- Preset showcase with categories

**Defer (v2+):**
- Preset pack upsells (additional Shopify products)
- Blog / content section
- Splice rent-to-own integration
- Multi-language support
- A/B testing framework

### Architecture Approach

The architecture follows a four-layer model: Presentation (static HTML sections rendered by Astro), Interaction (cart drawer and countdown timer as Astro islands), State (nanostores for cart and UI state with localStorage persistence), and API (Shopify Storefront API Client with GraphQL mutations). Each section is a self-contained Astro component. Only the cart drawer, pricing CTA, header cart badge, and countdown timer require client-side JavaScript. Everything else is static HTML/CSS delivered from Vercel's CDN.

**Major components:**
1. **Astro page sections** (Header, Hero, Features, Presets, Social Proof, Pricing, FAQ, Footer) -- static HTML rendered at build time
2. **Cart Store + Cart API layer** -- nanostores-based cart state synced with Shopify Cart API, persists cart ID to localStorage
3. **Cart Drawer island** -- slide-in panel rendering cart lines, quantities, totals from Shopify, with checkout redirect button
4. **Shopify Client** -- `@shopify/storefront-api-client` initialized with public Storefront Access Token, executes `cartCreate`/`cartLinesAdd` mutations

**Key patterns:**
- Pub-sub state store (nanostores) for cart state shared across islands
- API layer isolates all Shopify communication -- components never call GraphQL directly
- Shopify Cart API is always the source of truth -- local state updated only from API responses
- Cart ID (not full cart) persisted to localStorage; rehydrated from Shopify on page load

### Critical Pitfalls

1. **Using deprecated JS Buy SDK** -- Do not install `shopify-buy`. Any code using `Client.buildClient()` or `checkout.create()` is building on a dead API. Use `@shopify/storefront-api-client` with Cart API mutations from day one. Retrofitting is a full rewrite.

2. **Cart state desync** -- Never maintain local cart state independent of Shopify. After every mutation, update local state from the API response only. Store only `cartId` in localStorage, not full cart contents. Handle expired carts (30-day Shopify policy) by creating a new cart transparently.

3. **Countdown timer as dark pattern** -- The audio community is small and vocal. A fake countdown that resets every visit will be called out on KVR, Gearspace, and Reddit. Anchor the timer to a real event (launch window, genuine sale end date). If using a 24h marketing loop, be transparent about what it is.

4. **LCP failure from hero images** -- Dark-themed plugin landing pages are image-heavy. The hero product shot must be optimized (WebP/AVIF), properly sized, and loaded with `fetchpriority="high"`. Use Astro's built-in `<Image>` component with sharp. All animations must use `transform`/`opacity` only.

5. **Checkout redirect UX gap** -- The 1-3 second gap between clicking "Checkout" and landing on Shopify's checkout page needs a loading state. Without it, users click multiple times or think the site is broken.

## Implications for Roadmap

Based on research, the project naturally divides into 5 phases following the dependency graph identified in ARCHITECTURE.md.

### Phase 1: Foundation and Static Layout
**Rationale:** Everything depends on the project scaffold, build pipeline, and HTML structure. Image optimization and performance standards must be established here, not retrofitted later.
**Delivers:** Working Astro project deployed to Vercel with all page sections rendered as static HTML/CSS. Dark theme implemented. All images optimized. Lighthouse performance score validated.
**Features addressed:** Hero section, feature showcase sections, video embed, social proof, FAQ accordion, system requirements, footer, dark theme, mobile responsive layout
**Pitfalls avoided:** LCP failure (image pipeline correct from start), fat HTML anti-pattern (Astro component model enforced), SEO meta tags (Open Graph, structured data for Product)
**Stack used:** Astro 5.x, Tailwind CSS 4.x, sharp for image optimization, Vite (built into Astro)

### Phase 2: Shopify Integration and Cart
**Rationale:** The commerce layer is the core value of the site. It depends on Phase 1's HTML structure (pricing section CTA, header cart badge) but is otherwise independent. This phase has the highest integration risk and must be built carefully.
**Delivers:** Working add-to-cart flow, cart drawer with line items/totals from Shopify, checkout redirect to Shopify hosted checkout. Cart persists across page refreshes.
**Features addressed:** Cart drawer with Shopify checkout redirect, pricing section with "Add to Cart" CTA
**Pitfalls avoided:** Deprecated Buy SDK (use Storefront API Client from start), cart state desync (Shopify as source of truth), checkout redirect UX (loading state implemented)
**Stack used:** @shopify/storefront-api-client, nanostores + @nanostores/persistent, Shopify Cart API GraphQL mutations

### Phase 3: Countdown Timer and Marketing Features
**Rationale:** The countdown timer is a marketing feature that sits on top of the working commerce flow. It requires careful design to avoid dark pattern issues. Build it after the core purchase flow works so it does not block revenue.
**Delivers:** Countdown timer on pricing section, properly anchored to a real deadline or transparently implemented as a recurring promotion.
**Features addressed:** 24-hour countdown timer, pricing section enhancement
**Pitfalls avoided:** Countdown dark pattern (anchor to real event, timer must actually expire and offer must change)

### Phase 4: Animation and Polish
**Rationale:** Scroll animations and micro-interactions are polish that make the site feel premium. They depend on all sections being in place (Phase 1) and the purchase flow working (Phase 2). Adding animations before core functionality is correct inverts priorities.
**Delivers:** Scroll-triggered section reveals, staggered grid animations, hover micro-interactions, smooth transitions throughout.
**Features addressed:** Scroll-triggered animations, micro-interactions
**Stack used:** GSAP 3.14.x with ScrollTrigger plugin

### Phase 5: Audio Previews and Enhanced Content
**Rationale:** Inline audio players are the key differentiator but depend on audio assets being produced. This phase can proceed in parallel with Phase 4 if assets are ready, or be deferred to v1.x.
**Delivers:** Preset showcase section with categories and inline audio players, community section with Discord/social CTAs
**Features addressed:** Preset showcase with categories, inline audio players (differentiator), community/social section

### Phase Ordering Rationale

- **Phase 1 before everything:** The Astro project structure, Tailwind theme, image pipeline, and deployment to Vercel are foundational. Every other phase builds on this scaffold. Performance standards (LCP < 2.5s) must be validated here because retrofitting optimization is painful.
- **Phase 2 immediately after Phase 1:** The site's core purpose is selling Orbital. A beautiful landing page that cannot complete a purchase is useless. Shopify integration is also the highest-risk phase (API integration, state management, cross-domain redirect) and should not be deferred.
- **Phase 3 after Phase 2:** The countdown timer only makes sense adjacent to a working purchase flow. It also requires the most careful design review (legal and community trust implications).
- **Phase 4 after Phases 1-2:** Animations are visual polish. GSAP ScrollTrigger needs all sections in the DOM to configure scroll triggers correctly. Adding animations to sections that might change structure wastes effort.
- **Phase 5 last or parallel:** Audio previews depend on external asset production. The preset showcase is a P2 feature that enhances but does not gate the launch.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (Shopify Integration):** The Shopify Storefront API Cart mutations, cart lifecycle (creation, expiry, invalid cart handling), and checkout redirect flow need API-level research. The deprecation landscape (Buy SDK dead, Checkout API dead) means many online examples are wrong. Use official Shopify docs only.
- **Phase 3 (Countdown Timer):** Legal implications of countdown timers vary by jurisdiction (FTC, EU DSA/DMA, South Korea). The implementation must be reviewed against the PROJECT.md requirement for a "24h loop that resets every midnight or on page load" -- this specific pattern is the one regulators flag as deceptive.

Phases with standard patterns (skip deep research):
- **Phase 1 (Foundation):** Astro + Tailwind + Vercel is extremely well-documented with official guides and starter templates.
- **Phase 4 (Animation):** GSAP ScrollTrigger is the industry standard with extensive documentation and examples.
- **Phase 5 (Audio Previews):** HTML5 audio elements with custom UI is a well-understood pattern.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All recommendations backed by official docs, npm packages verified, version compatibility confirmed. Astro + Shopify Storefront API is a proven pattern with existing starter templates. |
| Features | HIGH | Competitor analysis covers major players (Vital, Serum, Arturia Pigments, FabFilter). Feature prioritization aligns with single-product landing page best practices. |
| Architecture | HIGH | Four-layer architecture is straightforward for a single-page site. Pub-sub state, API isolation, and Shopify checkout delegation are established patterns. |
| Pitfalls | MEDIUM-HIGH | Critical pitfalls (Buy SDK deprecation, cart desync) verified against official Shopify docs. Countdown timer legal analysis draws from FTC reports but jurisdiction-specific compliance needs legal review. |

**Overall confidence:** HIGH

### Gaps to Address

- **Architecture file inconsistency:** ARCHITECTURE.md describes a vanilla Vite + HTML project structure (no Astro), while STACK.md recommends Astro. The roadmap should follow the Astro recommendation from STACK.md. The architecture patterns (pub-sub store, API layer isolation) transfer directly -- they just live inside Astro components and islands instead of vanilla JS modules.
- **Pitfalls file inconsistency:** PITFALLS.md references Next.js patterns (`next/image`, `next/dynamic`) in its prevention advice, which contradicts the Astro stack recommendation. Use Astro's `<Image>` component (powered by sharp) and Astro's native island architecture instead.
- **Countdown timer legal review:** The PROJECT.md explicitly requests a "24h loop that resets every midnight or on page load." Research flags this as a potential dark pattern. This tension needs a product decision before Phase 3 implementation -- either anchor to a real deadline or accept the risk with transparent messaging.
- **Shopify store setup:** The site depends on a Shopify store being configured with the Orbital product, a Storefront Access Token (via Headless channel), and a product variant ID. This is a configuration dependency that must be resolved before Phase 2 development begins.
- **Design asset pipeline:** The Pencil design file exists but images, fonts, and audio assets need to be exported and optimized. The design specifies a light theme with orange (#FF5C00) accent, which conflicts with the dark theme recommendation from feature research. This needs a design decision.

## Sources

### Primary (HIGH confidence)
- [Shopify Storefront API reference](https://shopify.dev/docs/api/storefront/latest) -- Cart API mutations, checkout URL flow
- [Shopify JS Buy SDK deprecation](https://shopify.dev/docs/storefronts/headless/additional-sdks/js-buy) -- confirmed deprecated Jan 2025, EOL Jan 2026
- [Shopify Cart API docs](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart) -- cartCreate, cartLinesAdd, cart management
- [Astro documentation](https://docs.astro.build/) -- islands architecture, nanostores integration, Vercel deployment
- [Tailwind CSS v4.0 announcement](https://tailwindcss.com/blog/tailwindcss-v4) -- CSS-first config, Vite plugin
- [GSAP free licensing](https://css-tricks.com/gsap-is-now-completely-free-even-for-commercial-use/) -- all plugins free for commercial use
- [nanostores GitHub](https://github.com/nanostores/nanostores) -- Astro-recommended state management
- [Vercel Vite deployment](https://vercel.com/docs/frameworks/frontend/vite) -- zero-config static deployment
- [FTC Dark Patterns Report](https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers) -- countdown timer legal risk

### Secondary (MEDIUM confidence)
- [Vital.audio](https://vital.audio/) -- competitor feature analysis
- [Splice Serum 2 page](https://splice.com/plugins/39137242-serum-2-au-by-xfer-records) -- competitor feature analysis
- [Astro vs Next.js benchmarks](https://eastondev.com/blog/en/posts/dev/20251202-astro-vs-nextjs-comparison/) -- 40% faster, 90% less JS for static sites
- [Astro Shopify starter](https://github.com/thomasKn/astro-shopify) -- proven integration pattern

### Tertiary (LOW confidence)
- [Single-Page Website SEO Impact 2025](https://amplewebsol.com/how-single-page-websites-impact-seo-in-2025/) -- SEO implications of SPA architecture

---
*Research completed: 2026-03-09*
*Ready for roadmap: yes*
