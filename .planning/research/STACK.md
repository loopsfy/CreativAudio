# Stack Research

**Domain:** Audio plugin ecommerce single-page landing
**Researched:** 2026-03-09
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Astro | 5.x (stable) | Site framework | Ships zero JS by default. A single-page product landing is mostly static content with small interactive islands (cart drawer, countdown timer). Astro delivers sub-second loads, perfect Lighthouse scores, and 90% less JS than Next.js for this use case. First-class Vercel support with zero-config static deployment. |
| Tailwind CSS | 4.x | Styling | CSS-first configuration in v4 eliminates tailwind.config.js. 5x faster builds, CSS-native design tokens via @theme. Industry standard for utility-first styling on marketing/landing pages. |
| GSAP | 3.14.x | Animation | The standard for scroll-triggered animations, timeline sequencing, and performant transforms. Now 100% free for commercial use (Webflow acquisition). Unmatched plugin ecosystem: ScrollTrigger for scroll-based reveals, SplitText for text animations. No framework lock-in -- works with vanilla JS in Astro islands. |
| @shopify/storefront-api-client | 1.x | Shopify checkout integration | Official Shopify client for headless storefronts. Lightweight GraphQL client that handles auth and API versioning. Creates cart via Cart API, then redirects to Shopify-hosted checkout via cart.checkoutUrl. The JS Buy SDK is deprecated (EOL Jan 2026) -- this is the replacement. |
| nanostores | 1.x | State management | Astro's officially recommended state manager. 286 bytes. Shares state across framework islands (cart state between add-to-cart buttons and cart drawer). @nanostores/persistent syncs cart to localStorage so it survives page refreshes. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @nanostores/persistent | latest | Persist cart to localStorage | Always -- cart must survive refresh |
| astro-icon | latest | SVG icon system | For feature icons, social icons, UI icons |
| @astrojs/vercel | latest | Vercel deployment adapter | If using any SSR features (server islands, actions). Not needed for pure static export. |
| sharp | latest | Image optimization | Astro uses this under the hood for `<Image>` component. Install as dependency. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| TypeScript | Type safety | Astro has first-class TS support. Use for Shopify API types and cart state. |
| Prettier + prettier-plugin-astro | Code formatting | Astro-aware formatting for .astro files |
| Vite | Dev server / bundler | Built into Astro. No separate config needed. |

## Installation

```bash
# Core
npm create astro@latest
npm install gsap nanostores @nanostores/persistent @shopify/storefront-api-client

# Astro integrations
npx astro add tailwind
npx astro add vercel  # only if using SSR features

# Dev dependencies
npm install -D typescript prettier prettier-plugin-astro
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Astro | Next.js | Only if you need full React app with complex client-side routing, auth flows, or dynamic server-rendered pages. Massive overkill for a single product landing page -- ships 85KB+ of React runtime for content that is 95% static. |
| Astro | Vanilla HTML/CSS/JS | If the team has zero framework experience. But Astro's learning curve is minimal and the component model, image optimization, and build pipeline justify it over raw HTML. |
| GSAP | Motion (Framer Motion) | Only if already deep in React ecosystem. Motion is React-first; GSAP is framework-agnostic and better suited for Astro's island architecture where animations span non-React elements. |
| GSAP | CSS animations only | If zero animation complexity (just fades/slides). But the CreativAudio landing needs scroll-triggered reveals, staggered grids, and potentially audio waveform animations -- CSS alone becomes unmaintainable. |
| Tailwind CSS | Vanilla CSS / CSS Modules | If the team strongly prefers writing semantic CSS. But for a landing page with many one-off sections, Tailwind's utility approach is faster to build and iterate. |
| @shopify/storefront-api-client | shopify-buy (JS Buy SDK) | Never. Deprecated January 2025. Final v3.0 reaches EOL January 2026. |
| nanostores | Zustand / Jotai | Only in a full React SPA. These are React-specific. Nanostores is framework-agnostic and Astro's official recommendation for cross-island state. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| shopify-buy (JS Buy SDK) | Deprecated Jan 2025, EOL Jan 2026. Uses legacy Checkout API being removed. | @shopify/storefront-api-client with Cart API |
| Next.js | 85KB+ JS runtime for a site that is 95% static HTML. Slower first paint, unnecessary complexity for single-page landing. | Astro (zero JS by default, islands for interactivity) |
| React (as full SPA) | Hydrates entire page when only cart drawer and countdown timer need JS. Worse Core Web Vitals. | Astro with vanilla JS or Preact islands for interactive pieces |
| Anime.js | Smaller community than GSAP, fewer plugins, no ScrollTrigger equivalent. Less battle-tested for complex scroll animations. | GSAP (free, more plugins, better docs) |
| Shopify Hydrogen | Full React meta-framework for building complete Shopify storefronts. Overkill for a single-product landing page -- it's designed for multi-page catalogs with routing, search, filtering. | Astro + Storefront API Client (lighter, simpler) |
| Lenis / Locomotive Scroll | Smooth scroll libraries that hijack native scroll. Cause accessibility issues, break native scroll behavior, and conflict with GSAP ScrollTrigger. | Native CSS scroll-behavior: smooth + GSAP ScrollTrigger |

## Stack Patterns by Variant

**If pure static (no server-side rendering needed):**
- Use `output: 'static'` in Astro config (default)
- Deploy to Vercel as static site -- no adapter needed
- Cart state managed entirely client-side via nanostores
- Shopify checkout redirect is a client-side URL redirect
- Because: Simplest deployment, fastest performance, cheapest hosting

**If countdown timer needs server-verified end time:**
- Use Astro server islands for the pricing section
- Add `@astrojs/vercel` adapter with `output: 'server'`
- Server island fetches authoritative countdown end time
- Because: Prevents client-side clock manipulation for time-sensitive pricing

**If product data should be fresh without rebuilds:**
- Use Astro's on-demand rendering for the pricing section
- Fetch product price/availability from Shopify Storefront API at request time
- Because: Price changes in Shopify admin reflect immediately without redeployment

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| Astro 5.x | @astrojs/vercel 8.x | Vercel adapter must match Astro major version |
| Astro 5.x | Tailwind CSS 4.x | Use `npx astro add tailwind` for automatic config |
| Astro 5.x | nanostores 1.x | Official Astro recommendation, documented in Astro docs |
| @shopify/storefront-api-client 1.x | Storefront API 2025-04 through 2026-01 | Specify apiVersion in client constructor |
| GSAP 3.14.x | All modern browsers | No framework dependency, works in any Astro island or `<script>` tag |
| Tailwind CSS 4.x | Vite (built into Astro) | v4 uses Vite plugin natively, no PostCSS config needed |

## Shopify Integration Architecture

The integration is lightweight by design:

1. **Storefront Access Token** -- Generated from Shopify admin via the Headless channel. Public token, safe to expose in client-side code.
2. **Cart Creation** -- Client-side JS calls Storefront API `cartCreate` mutation when user adds product.
3. **Cart Updates** -- `cartLinesAdd` / `cartLinesUpdate` mutations manage quantities.
4. **Checkout Redirect** -- Query `cart.checkoutUrl` and redirect user to Shopify-hosted checkout. Shopify handles payment, tax, shipping, order creation.
5. **No backend needed** -- All API calls use the public Storefront Access Token. No server, no proxy, no API routes required for basic cart + checkout flow.

```graphql
# Example: Create cart with one item
mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      checkoutUrl
      lines(first: 10) {
        edges {
          node {
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price { amount currencyCode }
              }
            }
          }
        }
      }
    }
  }
}
```

## Sources

- [Astro 6 Beta blog post](https://astro.build/blog/astro-6-beta/) -- Confirmed Astro 5 is current stable, v6 is beta (HIGH confidence)
- [Astro Shopify starter](https://github.com/thomasKn/astro-shopify) -- Proven Astro + Shopify Storefront API pattern (HIGH confidence)
- [Shopify Storefront API reference](https://shopify.dev/docs/api/storefront/latest) -- API versions 2025-04 through 2026-01 (HIGH confidence)
- [@shopify/storefront-api-client npm](https://www.npmjs.com/package/@shopify/storefront-api-client) -- v1.0.9, official Shopify client (HIGH confidence)
- [JS Buy SDK deprecation](https://shopify.dev/docs/storefronts/headless/additional-sdks/js-buy) -- Deprecated Jan 2025, v3 EOL Jan 2026 (HIGH confidence)
- [GSAP free for commercial use](https://css-tricks.com/gsap-is-now-completely-free-even-for-commercial-use/) -- All plugins free including SplitText, MorphSVG (HIGH confidence)
- [Astro vs Next.js benchmarks](https://eastondev.com/blog/en/posts/dev/20251202-astro-vs-nextjs-comparison/) -- Astro 40% faster, 90% less JS for static sites (MEDIUM confidence)
- [Tailwind CSS v4.0 announcement](https://tailwindcss.com/blog/tailwindcss-v4) -- CSS-first config, 5x faster builds (HIGH confidence)
- [nanostores GitHub](https://github.com/nanostores/nanostores) -- 286 bytes, framework-agnostic (HIGH confidence)
- [Astro docs: sharing state between islands](https://docs.astro.build/en/recipes/sharing-state-islands/) -- Official nanostores recommendation (HIGH confidence)
- [Astro Vercel deployment guide](https://docs.astro.build/en/guides/deploy/vercel/) -- Zero-config static, adapter for SSR (HIGH confidence)
- [Shopify Cart API migration](https://github.com/Shopify/storefront-api-feedback/discussions/225) -- Cart API replaces Checkout API (HIGH confidence)

---
*Stack research for: CreativAudio -- Audio Plugin Ecommerce Landing Page*
*Researched: 2026-03-09*
