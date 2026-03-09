# Architecture Research

**Domain:** Single-product ecommerce landing page (audio plugin)
**Researched:** 2026-03-09
**Confidence:** HIGH

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │  Header  │ │   Hero   │ │ Features │ │ Presets  │           │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│  │  Social  │ │ Pricing  │ │   FAQ    │ │  Footer  │           │
│  │  Proof   │ │+Countdown│ │          │ │          │           │
│  └──────────┘ └────┬─────┘ └──────────┘ └──────────┘           │
│                    │                                            │
├────────────────────┼────────────────────────────────────────────┤
│              INTERACTION LAYER                                  │
│  ┌─────────────────┴───────────────┐  ┌─────────────────────┐  │
│  │         Cart Drawer             │  │  Countdown Timer    │  │
│  │  (slide-in, add/remove items)   │  │  (localStorage)     │  │
│  └─────────────────┬───────────────┘  └─────────────────────┘  │
│                    │                                            │
├────────────────────┼────────────────────────────────────────────┤
│              STATE LAYER                                        │
│  ┌─────────────────┴───────────────┐  ┌─────────────────────┐  │
│  │         Cart Store              │  │   UI Store          │  │
│  │  (cart ID, lines, totals)       │  │   (drawer open,     │  │
│  │                                 │  │    active section)   │  │
│  └─────────────────┬───────────────┘  └─────────────────────┘  │
│                    │                                            │
├────────────────────┼────────────────────────────────────────────┤
│              API LAYER                                          │
│  ┌─────────────────┴───────────────┐                            │
│  │   Shopify Storefront API Client │                            │
│  │   (@shopify/storefront-api-     │                            │
│  │    client + GraphQL mutations)  │                            │
│  └─────────────────┬───────────────┘                            │
│                    │ HTTPS/GraphQL                               │
└────────────────────┼────────────────────────────────────────────┘
                     ↓
          ┌──────────────────────┐
          │  Shopify Storefront  │
          │  API (hosted)        │
          │  - Cart API          │
          │  - Product data      │
          │  - Checkout redirect │
          └──────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Header | Navigation + CTA + cart icon with badge | Static HTML, JS click handler for smooth scroll, cart badge updates from Cart Store |
| Hero | Above-fold pitch, primary CTA | Static HTML/CSS, background video/image, CTA triggers cart add |
| Features | 6 feature cards with icons | Static HTML grid, CSS animations on scroll (IntersectionObserver) |
| Presets | Preset browser / list | Static or dynamically rendered list, optional audio preview |
| Social Proof | Stats counter + testimonials | Animated number counters (IntersectionObserver trigger), testimonial carousel or grid |
| Pricing | Product card + countdown timer + "Add to Cart" | Core interactive component, reads product data, triggers cart mutations |
| FAQ | Expandable accordion | `<details>`/`<summary>` or custom accordion with aria attributes |
| Footer | Links, legal, social | Static HTML |
| Cart Drawer | Slide-in cart panel from right | Overlay + panel, renders cart lines, quantity controls, checkout button |
| Countdown Timer | 24h urgency timer | `setInterval` + localStorage for persistence across refreshes |
| Cart Store | Client-side cart state | Module holding cart ID + line items, synced with Shopify Cart API |
| Shopify Client | API communication | `@shopify/storefront-api-client` with GraphQL mutations |

## Recommended Project Structure

```
creativaudio/
├── public/                    # Static assets (copied as-is by Vite)
│   ├── fonts/                 # Custom typefaces
│   ├── images/                # Product screenshots, icons, backgrounds
│   ├── audio/                 # Preset preview clips (if applicable)
│   └── favicon.ico
├── src/
│   ├── main.js                # Entry point: init all modules
│   ├── styles/
│   │   ├── main.css           # Imports all partials
│   │   ├── _variables.css     # CSS custom properties (colors, spacing, type scale)
│   │   ├── _reset.css         # Minimal reset
│   │   ├── _layout.css        # Grid, container, section spacing
│   │   ├── _header.css        # Header/nav styles
│   │   ├── _hero.css
│   │   ├── _features.css
│   │   ├── _presets.css
│   │   ├── _social-proof.css
│   │   ├── _pricing.css
│   │   ├── _faq.css
│   │   ├── _footer.css
│   │   ├── _cart-drawer.css
│   │   └── _animations.css    # Scroll-triggered animations, transitions
│   ├── components/
│   │   ├── header.js          # Mobile menu toggle, scroll spy for active nav
│   │   ├── hero.js            # CTA click handler
│   │   ├── features.js        # Scroll-triggered reveal animations
│   │   ├── presets.js          # Preset list interaction (filter/preview)
│   │   ├── social-proof.js    # Animated stat counters, testimonial rotation
│   │   ├── pricing.js         # Add-to-cart handler, variant selection
│   │   ├── faq.js             # Accordion expand/collapse
│   │   └── cart-drawer.js     # Cart UI: open/close, render lines, quantity
│   ├── store/
│   │   ├── cart-store.js      # Cart state: ID, lines, totals, persistence
│   │   └── ui-store.js        # UI state: drawer open, countdown active
│   ├── api/
│   │   ├── shopify-client.js  # Storefront API Client initialization
│   │   ├── cart-api.js        # GraphQL mutations: cartCreate, cartLinesAdd, etc.
│   │   └── product-api.js     # GraphQL query: fetch product + variants
│   ├── utils/
│   │   ├── countdown.js       # Countdown timer logic + localStorage
│   │   ├── scroll.js          # Smooth scroll, IntersectionObserver helpers
│   │   ├── format.js          # Currency formatting, number formatting
│   │   └── dom.js             # DOM helper utilities ($, $$, createElement)
│   └── config.js              # Shopify store domain, public access token, product handle
├── index.html                 # Single page with all section markup
├── vite.config.js             # Vite build configuration
├── package.json
└── vercel.json                # Vercel deployment configuration (optional)
```

### Structure Rationale

- **`src/components/`:** One JS module per page section. Each module exports an `init()` function called from `main.js`. Components are responsible for DOM interaction within their section boundary only.
- **`src/store/`:** Simple publish-subscribe state stores, no framework needed. Cart Store is the single source of truth for cart state; components subscribe to changes.
- **`src/api/`:** Isolates all Shopify communication. Components never call the Storefront API directly -- they go through `cart-api.js` which updates Cart Store.
- **`src/utils/`:** Shared utilities with no side effects. Imported by components as needed.
- **`src/styles/`:** CSS partials using CSS custom properties. No preprocessor needed -- modern CSS with nesting (supported in all modern browsers) replaces Sass.

## Architectural Patterns

### Pattern 1: Pub-Sub State Store

**What:** A minimal reactive store pattern. State lives in a module-scoped object. Components subscribe to changes via callbacks. State mutations publish to all subscribers.
**When to use:** Cart state that multiple components need (cart drawer, cart badge in header, pricing section).
**Trade-offs:** Simple and framework-free, but no devtools. Sufficient for 2-3 stores on a single page.

**Example:**
```javascript
// store/cart-store.js
let state = { cartId: null, lines: [], totalAmount: '0.00', currencyCode: 'USD' };
const listeners = new Set();

export function getCart() { return state; }

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function notify() {
  listeners.forEach(fn => fn(state));
}

export function setCart(cart) {
  state = {
    cartId: cart.id,
    lines: cart.lines.edges.map(e => e.node),
    totalAmount: cart.cost.totalAmount.amount,
    currencyCode: cart.cost.totalAmount.currencyCode,
  };
  // Persist cart ID for returning visitors
  localStorage.setItem('cartId', cart.id);
  notify();
}
```

### Pattern 2: Component-as-Module with `init()`

**What:** Each page section has a JS module that exports an `init()` function. The function queries the DOM for its section's elements, attaches event listeners, and subscribes to relevant stores. No component framework, no virtual DOM.
**When to use:** Every section of the landing page.
**Trade-offs:** Dead simple, great performance, but manual DOM updates. Acceptable for a single page with limited dynamic content.

**Example:**
```javascript
// components/header.js
import { subscribe } from '../store/cart-store.js';

export function init() {
  const badge = document.querySelector('[data-cart-badge]');
  const cartBtn = document.querySelector('[data-cart-toggle]');

  cartBtn.addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('cart:toggle'));
  });

  subscribe((cart) => {
    const count = cart.lines.reduce((sum, line) => sum + line.quantity, 0);
    badge.textContent = count || '';
    badge.hidden = count === 0;
  });
}
```

### Pattern 3: API Layer with Cart Lifecycle

**What:** All Shopify API calls go through a dedicated API module. On first "add to cart," create a cart via `cartCreate`. On subsequent adds, use `cartLinesAdd`. Cart ID persists in localStorage so returning visitors keep their cart. Checkout redirects to Shopify-hosted checkout via `checkoutUrl`.
**When to use:** All cart interactions.
**Trade-offs:** Requires managing cart ID lifecycle (creation, expiry, invalid carts). Shopify handles all payment/checkout security.

**Example:**
```javascript
// api/cart-api.js
import { client } from './shopify-client.js';
import { setCart, getCart } from '../store/cart-store.js';

const CART_CREATE = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges { node { id quantity merchandise { ... on ProductVariant { id title price { amount currencyCode } } } } }
        }
        cost { totalAmount { amount currencyCode } subtotalAmount { amount currencyCode } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_ADD = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
`;

export async function addToCart(variantId, quantity = 1) {
  const { cartId } = getCart();
  if (!cartId) {
    const { data } = await client.request(CART_CREATE, {
      variables: { input: { lines: [{ merchandiseId: variantId, quantity }] } }
    });
    setCart(data.cartCreate.cart);
  } else {
    const { data } = await client.request(CART_LINES_ADD, {
      variables: { cartId, lines: [{ merchandiseId: variantId, quantity }] }
    });
    setCart(data.cartLinesAdd.cart);
  }
}
```

## Data Flow

### Primary Purchase Flow

```
[User clicks "Add to Cart" in Pricing section]
    ↓
[pricing.js] → calls addToCart(variantId) in cart-api.js
    ↓
[cart-api.js] → checks Cart Store for existing cartId
    ├── No cartId → cartCreate mutation → Shopify Storefront API
    └── Has cartId → cartLinesAdd mutation → Shopify Storefront API
    ↓
[Shopify API responds with full cart object]
    ↓
[cart-api.js] → calls setCart() in cart-store.js
    ↓
[cart-store.js] → updates state, persists cartId to localStorage, notifies subscribers
    ↓
[Subscribers react:]
    ├── cart-drawer.js → re-renders line items, shows drawer
    ├── header.js → updates cart badge count
    └── pricing.js → updates button text ("Added!")
```

### Checkout Flow

```
[User clicks "Checkout" in Cart Drawer]
    ↓
[cart-drawer.js] → reads checkoutUrl from cart state
    ↓
[window.location.href = checkoutUrl]
    ↓
[User lands on Shopify-hosted checkout]
    ↓
[Shopify handles payment, order creation, confirmation]
```

### Countdown Timer Flow

```
[Page loads]
    ↓
[countdown.js init()]
    ├── Check localStorage for 'countdown_end'
    │   ├── Found + not expired → resume countdown from stored end time
    │   ├── Found + expired → hide pricing urgency, show regular price
    │   └── Not found → set end time = now + 24h, store in localStorage
    ↓
[setInterval every 1000ms]
    ↓
[Update DOM: hours, minutes, seconds]
    ↓
[On expiry → dispatch 'countdown:expired' event]
```

### Cart State Restoration (Returning Visitor)

```
[Page loads]
    ↓
[main.js] → checks localStorage for 'cartId'
    ├── Found → fetch cart via Storefront API query
    │   ├── Cart still valid → setCart(), restore UI
    │   └── Cart expired/invalid → clear localStorage, fresh state
    └── Not found → no-op, cart is empty
```

### Key Data Flows Summary

1. **Add to Cart:** User action -> component handler -> cart-api (GraphQL) -> Shopify API -> cart-store update -> subscriber UI updates
2. **Checkout:** Cart drawer -> read checkoutUrl from store -> browser redirect to Shopify checkout
3. **Cart Persistence:** Cart ID saved to localStorage on every cart mutation, restored on page load
4. **Scroll Animations:** IntersectionObserver watches section elements -> triggers CSS class toggle on visibility

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-10k visitors/day | Current static architecture is sufficient. Vite builds to static assets on Vercel CDN. Shopify handles all backend load. No server needed. |
| 10k-100k visitors/day | Still fine. Vercel CDN handles static asset delivery. Shopify Storefront API has no rate limits with built-in bot protection. Consider image optimization (WebP/AVIF, lazy loading). |
| 100k+ visitors/day | Add Vercel Edge Middleware for A/B testing or geo-routing. Pre-render critical CSS inline. Consider splitting audio preview files to a separate CDN if used. |

### Scaling Priorities

1. **First bottleneck:** Asset loading speed. Solve with image optimization, font subsetting, critical CSS inlining, and Vite's code splitting.
2. **Second bottleneck:** Third-party script loading (analytics, chat widgets). Solve with lazy loading non-critical scripts after user interaction.

## Anti-Patterns

### Anti-Pattern 1: Calling Shopify API Directly from Components

**What people do:** Import the Shopify client into every component that needs cart data and make API calls scattered throughout the codebase.
**Why it's wrong:** Duplicates cart logic, makes error handling inconsistent, makes it impossible to coordinate optimistic UI updates.
**Do this instead:** Route all API calls through `cart-api.js`. Components only interact with `cart-store.js`.

### Anti-Pattern 2: Using the Deprecated JS Buy SDK

**What people do:** Install `shopify-buy` because older tutorials reference it.
**Why it's wrong:** The JS Buy SDK was deprecated in January 2025. The underlying Checkout API it depended on was deprecated April 2025. Even v3.0 (which uses Cart API) has no future maintenance.
**Do this instead:** Use `@shopify/storefront-api-client` with direct GraphQL mutations against the Cart API.

### Anti-Pattern 3: Building Custom Checkout

**What people do:** Try to build checkout forms (payment, shipping) in the landing page.
**Why it's wrong:** PCI compliance burden, Shopify terms of service issues, massive complexity for no gain.
**Do this instead:** Use Shopify's hosted checkout via `checkoutUrl`. The cart redirects to Shopify for payment. This is the intended headless flow.

### Anti-Pattern 4: Fat HTML with Inline Scripts

**What people do:** Put all JavaScript inline in index.html or use script tags without modules.
**Why it's wrong:** No code splitting, no tree shaking, no hot module replacement during development, cache invalidation issues.
**Do this instead:** Use Vite as build tool. ES modules in development, optimized bundle in production. Vercel auto-detects Vite projects.

### Anti-Pattern 5: Countdown Timer Without Server-Side Anchor

**What people do:** Set countdown purely from client-side `Date.now()` without any persistence strategy.
**Why it's wrong:** Every new browser/device starts a fresh 24h countdown. Users can clear localStorage to reset. Timer is trivially circumventable.
**Do this instead:** For an MVP, localStorage persistence is acceptable (store the target end time, not the duration). Accept that it is not fraud-proof -- it is a marketing nudge, not a hard deadline. If stricter enforcement is needed later, anchor the countdown to a server-provided timestamp.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Shopify Storefront API | `@shopify/storefront-api-client` with public access token, GraphQL over HTTPS | Public token is safe to expose in client-side code. It has limited scope (read products, manage carts). Never use private access tokens in frontend code. |
| Shopify Checkout | Browser redirect to `checkoutUrl` returned by Cart API | No custom integration needed. Shopify handles entire checkout flow. Post-purchase redirect back to site requires Shopify admin configuration. |
| Vercel | Git push triggers build. Vite detected automatically. Static output served from CDN edge. | `vercel.json` only needed for custom headers/redirects. Otherwise zero-config. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Components <-> Stores | Pub-sub (subscribe/notify) | Components subscribe on init(). Never mutate store directly -- use exported setter functions. |
| Components <-> API | Function calls (import cart-api) | Only pricing.js and cart-drawer.js call API functions. Other components only read from stores. |
| Components <-> DOM | querySelector + event listeners | Each component owns its own DOM section. No component reaches into another component's DOM. data-* attributes mark interactive elements. |
| Stores <-> localStorage | Read on init, write on mutation | Cart ID and countdown end time are the only persisted values. |

## Build Pipeline (Vite + Vercel)

### Development
```
npm run dev
  → Vite dev server (localhost:5173)
  → ES modules served directly (no bundling)
  → HMR for CSS and JS changes
  → Proxied API calls if needed
```

### Production Build
```
npm run build
  → Vite bundles src/ into dist/
  → HTML minified, CSS extracted and minified
  → JS tree-shaken, code-split, minified
  → Static assets hashed for cache busting
  → dist/ directory is the deploy artifact
```

### Deployment
```
git push origin main
  → Vercel detects Vite project
  → Runs npm install && npm run build
  → Deploys dist/ to global CDN
  → Preview deployments on PRs
  → Production deployment on main merge
```

## Build Order (Dependency Graph)

Build order matters because later components depend on earlier ones.

```
Phase 1: Foundation (no dependencies)
  ├── index.html (section structure, semantic markup)
  ├── CSS variables + reset + layout
  ├── Vite config + Vercel config
  └── config.js (Shopify credentials placeholder)

Phase 2: Static Sections (depend on Phase 1 markup)
  ├── Header (nav, mobile menu)
  ├── Hero (CTA wired but no cart yet)
  ├── Features (cards, scroll animations)
  ├── Presets (list rendering)
  ├── Social Proof (stat counters, testimonials)
  ├── FAQ (accordion)
  └── Footer

Phase 3: State + API Layer (independent of sections)
  ├── shopify-client.js (API client init)
  ├── cart-store.js (pub-sub store)
  ├── ui-store.js (drawer state)
  ├── cart-api.js (GraphQL mutations)
  └── product-api.js (fetch product data)

Phase 4: Interactive Components (depend on Phase 2 + 3)
  ├── Pricing section (add-to-cart, variant selection)
  ├── Cart Drawer (line items, quantity, checkout button)
  ├── Header cart badge (subscribe to cart store)
  ├── Countdown timer (localStorage persistence)
  └── Hero CTA → wired to cart

Phase 5: Polish + Deploy
  ├── Scroll animations (IntersectionObserver)
  ├── Loading states for API calls
  ├── Error handling (network failures, expired carts)
  ├── SEO meta tags, Open Graph
  ├── Performance optimization (lazy images, font loading)
  └── Vercel production deployment
```

## Sources

- [Shopify JS Buy SDK deprecation notice](https://shopify.dev/docs/storefronts/headless/additional-sdks/js-buy) -- official Shopify documentation confirming deprecation January 2025
- [Shopify Storefront API Client](https://github.com/Shopify/shopify-app-js/tree/main/packages/api-clients/storefront-api-client) -- official GitHub repository with usage examples
- [Shopify Cart API management guide](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage) -- official docs for cartCreate, cartLinesAdd mutations
- [Shopify Storefront API reference](https://shopify.dev/docs/api/storefront/latest) -- full API reference
- [Shopify Checkout API deprecation (April 2025)](https://github.com/Shopify/storefront-api-feedback/discussions/225) -- migration from Checkout to Cart API
- [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite) -- official Vercel docs for Vite deployment
- [@shopify/storefront-api-client on npm](https://www.npmjs.com/package/@shopify/storefront-api-client) -- package details and version info

---
*Architecture research for: CreativAudio - Orbital synth plugin landing page*
*Researched: 2026-03-09*
