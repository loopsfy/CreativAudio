# Phase 2: Static Sections - Research

**Researched:** 2026-03-09
**Domain:** Astro 5 static landing page with Tailwind v4, image optimization, icons, SEO
**Confidence:** HIGH

## Summary

This phase builds 9 static sections (Header, Hero, Features, Sound Library, Social Proof, Pricing, FAQ, Footer, plus section dividers) matching a detailed Pencil design spec. The existing scaffold already has Astro 5.18, Tailwind v4 via `@tailwindcss/vite`, design tokens in `@theme`, and Fontsource fonts. The work is primarily HTML/CSS component authoring with no JavaScript frameworks needed.

The stack is straightforward: Astro components for each section, `@lucide/astro` for icons, Astro's built-in `<Image />` and `<Picture />` for product visuals, and CSS-only `<details>/<summary>` for FAQ accordions. The design spec is pixel-precise with exact colors, spacing, fonts, and layout rules, so the main challenge is faithful translation to Tailwind utility classes and responsive adaptation (the design is 1440px desktop-only).

**Primary recommendation:** Create one Astro component per section, compose them in `index.astro`, use `@lucide/astro` for all icons, `<Picture />` for the product visual, `getImage()` for the hero background, and `<details>/<summary>` for FAQ. Extend the `@theme` block to include all design spec colors missing from the current tokens.

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | ^5.17.1 | Static site framework | Already scaffolded, zero-JS output |
| tailwindcss | ^4.2.1 | Utility CSS | Already configured with @theme tokens |
| @tailwindcss/vite | ^4.2.1 | Vite plugin for TW v4 | Already configured |
| @fontsource/orbitron | ^5.2.8 | Heading font | Already installed |
| @fontsource/inter | ^5.2.8 | Body font | Already installed |
| @fontsource/dm-mono | ^5.2.7 | Mono font | Already installed |

### New Dependencies
| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| @lucide/astro | latest | Icon components | Official Lucide package for Astro; renders inline SVG with zero JS; tree-shakeable so only used icons ship |

### Alternatives Considered
| Instead of | Could Use | Why Not |
|------------|-----------|---------|
| @lucide/astro | astro-icon + iconify | @lucide/astro is the official package, simpler API, no extra icon registry needed |
| @lucide/astro | Raw SVG copy-paste | Maintenance burden; @lucide/astro gives typed components with size/color props |
| astro-imagetools BackgroundImage | getImage() | astro-imagetools is a third-party package with extra complexity; getImage() is built-in |

**Installation:**
```bash
npm install @lucide/astro
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── assets/                    # Images for optimization (NOT public/)
│   ├── hero-bg.webp          # Hero background image
│   └── orbital-product.webp  # Product visual screenshot
├── components/
│   ├── Header.astro
│   ├── Hero.astro
│   ├── Features.astro
│   ├── SoundLibrary.astro
│   ├── SocialProof.astro
│   ├── Pricing.astro
│   ├── FAQ.astro
│   ├── Footer.astro
│   └── SectionDivider.astro
├── layouts/
│   └── Layout.astro          # Existing — extend with SEO meta
├── pages/
│   └── index.astro           # Compose all section components
└── styles/
    └── global.css            # Existing — extend @theme tokens
```

### Pattern 1: One Component Per Section
**What:** Each of the 9 design sections becomes its own `.astro` component file.
**Why:** Clean separation, easy to work on one section at a time, keeps index.astro readable.
**Example:**
```astro
---
// src/pages/index.astro
import Layout from "../layouts/Layout.astro";
import Header from "../components/Header.astro";
import Hero from "../components/Hero.astro";
import Features from "../components/Features.astro";
import SoundLibrary from "../components/SoundLibrary.astro";
import SocialProof from "../components/SocialProof.astro";
import Pricing from "../components/Pricing.astro";
import FAQ from "../components/FAQ.astro";
import Footer from "../components/Footer.astro";
import SectionDivider from "../components/SectionDivider.astro";
---
<Layout title="CreativAudio - Orbital Synthesizer">
  <Header />
  <Hero />
  <SectionDivider />
  <Features />
  <SectionDivider />
  <SoundLibrary />
  <SectionDivider />
  <SocialProof />
  <SectionDivider />
  <Pricing />
  <SectionDivider />
  <FAQ />
  <SectionDivider />
  <Footer />
</Layout>
```

### Pattern 2: Data Arrays for Repeated Items
**What:** Use Astro frontmatter arrays for feature cards, testimonials, FAQ items, preset rows, stats, and footer links rather than duplicating markup.
**Why:** Easier to maintain, less error-prone, matches design spec's repeated card patterns.
**Example:**
```astro
---
// Inside Features.astro
import { Waves, Sparkles, Sliders, Shuffle, Monitor, Zap } from "@lucide/astro";

const features = [
  { icon: Waves, title: "3 Oscillator Engines", description: "..." },
  { icon: Sparkles, title: "Spectral Effects Suite", description: "..." },
  { icon: Sliders, title: "Intelligent Modulation", description: "..." },
  { icon: Shuffle, title: "Preset Morphing", description: "..." },
  { icon: Monitor, title: "Visual Feedback Engine", description: "..." },
  { icon: Zap, title: "Built for Performance", description: "..." },
];
---
<section class="py-[100px] px-[120px] flex flex-col items-center gap-16">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
    {features.map(({ icon: Icon, title, description }) => (
      <div class="bg-card rounded-xl border border-border p-8 flex flex-col gap-5">
        <Icon size={24} class="text-accent" />
        <h3 class="text-lg font-semibold text-primary">{title}</h3>
        <p class="text-[15px] text-muted leading-relaxed">{description}</p>
      </div>
    ))}
  </div>
</section>
```

### Pattern 3: Image Optimization with `<Picture />` and `getImage()`
**What:** Use `<Picture />` for the product visual (generates WebP + AVIF with fallback) and `getImage()` for the hero CSS background.
**Why:** `<Picture />` generates `<picture>` element with multiple formats automatically. `getImage()` returns an optimized URL for use in inline styles.
**Example:**
```astro
---
// Hero background using getImage()
import { getImage, Picture } from "astro:assets";
import heroBg from "../assets/hero-bg.webp";
import productVisual from "../assets/orbital-product.webp";

const optimizedBg = await getImage({ src: heroBg, format: "webp", width: 1440 });
---
<section
  style={`background-image: linear-gradient(rgba(255,240,230,0.8), rgba(255,255,255,0.87)), url('${optimizedBg.src}')`}
  class="bg-cover bg-center"
>
  <!-- Hero content -->
  <Picture
    src={productVisual}
    formats={["avif", "webp"]}
    alt="Orbital synthesizer interface"
    width={900}
    height={500}
    class="rounded-xl border border-border"
  />
</section>
```

### Pattern 4: Lucide Icon Usage
**What:** Import icons individually from `@lucide/astro`. Use `size`, `color`, and `class` props.
**Why:** Tree-shakeable, zero JS, renders as inline SVG.
**Example:**
```astro
---
import { ShoppingCart, ArrowRight, Play, ChevronDown, Check, Star } from "@lucide/astro";
---
<ShoppingCart size={20} class="text-secondary" />
<ArrowRight size={18} class="text-white" />
```

Icons needed from the design spec:
- `ShoppingCart` — Header cart icon
- `ArrowRight` — CTA buttons, "View All" button
- `Play` — Preset list play buttons
- `ChevronDown` — FAQ expand/collapse
- `Check` — Pricing feature list checkmarks
- `Star` — Testimonial ratings, hero social proof

### Pattern 5: FAQ with `<details>/<summary>`
**What:** Use native HTML `<details>` and `<summary>` for FAQ accordion. No JavaScript needed.
**Why:** Built-in accessibility (keyboard nav, screen reader support), semantic HTML, animatable with CSS.
**Example:**
```astro
---
const faqs = [
  { question: "What DAWs does Orbital support?", answer: "..." },
  { question: "Do I get free updates?", answer: "..." },
  // ...
];
---
<div class="w-[800px] max-w-full">
  {faqs.map(({ question, answer }) => (
    <details class="border-b border-border group">
      <summary class="flex justify-between items-center py-6 cursor-pointer list-none text-primary font-medium">
        {question}
        <ChevronDown size={20} class="text-muted transition-transform group-open:rotate-180" />
      </summary>
      <p class="pb-6 text-muted leading-relaxed">{answer}</p>
    </details>
  ))}
</div>
```

**Key CSS detail:** Remove the default disclosure triangle with `summary { list-style: none; }` and `summary::-webkit-details-marker { display: none; }`. Use `details[open]` or Tailwind's `group-open:` to animate the chevron.

### Anti-Patterns to Avoid
- **Don't put images in `public/` for optimizable content:** Only `src/assets/` images get optimized by Astro's build pipeline. Use `public/` only for favicons or files that must keep exact filenames.
- **Don't use `@astrojs/image` (deprecated):** It was replaced by the built-in `astro:assets` module in Astro 3+. Always import from `astro:assets`.
- **Don't hardcode pixel values everywhere:** Use Tailwind's spacing scale where possible. Only use arbitrary values `[100px]` when the design spec requires exact non-standard values.
- **Don't create sub-components prematurely:** A `FeatureCard` component is unnecessary when the card is only used in one place via a `.map()` loop. Keep it in the section component.

## Design Token Gap Analysis

The current `@theme` block is missing several colors from the design spec. Here is what needs to be added:

```css
@theme {
  /* Existing - keep */
  --color-accent: #FF5C00;
  --color-accent-light: #FF7A33;
  --color-accent-dark: #CC4A00;
  --color-bg: #FFFFFF;
  --color-surface: #F9FAFB;
  --color-border: #E5E7EB;
  --color-text: #1A1A1A;
  --color-text-muted: #6B7280;

  /* NEW — needed by design spec */
  --color-accent-end: #FF8A4C;        /* Gradient end: #FF5C00 -> #FF8A4C */
  --color-text-primary: #111111;       /* Primary heading text */
  --color-text-secondary: #555555;     /* Nav items, secondary text */
  --color-text-light: #888888;         /* "Compatible with" text */
  --color-text-lighter: #999999;       /* Copyright, timer labels */
  --color-text-body: #666666;          /* Body/description text */
  --color-surface-alt: #FAFAFA;        /* Sound Library, FAQ bg */
  --color-surface-footer: #F5F5F7;     /* Footer bg */
  --color-card: #F0F0F2;              /* Card backgrounds */
  --color-border-light: #E5E5E7;       /* Section dividers, card strokes */
  --color-border-medium: #D4D4D8;      /* Compatibility separators */
  --color-timer-bg: #111111;           /* Pricing timer boxes */
}
```

**Important note:** The existing tokens use slightly different values from the design spec (e.g., `--color-surface: #F9FAFB` vs design's `#FAFAFA`, `--color-border: #E5E7EB` vs design's `#E5E5E7`, `--color-text: #1A1A1A` vs design's `#111111`). The planner should decide whether to align existing tokens to the design spec or keep both. Recommendation: **Update existing tokens to match the design spec exactly** since no production content depends on the old values yet.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image optimization | Custom sharp pipeline | `<Picture />` from `astro:assets` | Built-in, generates srcset, handles AVIF/WebP |
| Background image optimization | Manual conversion | `getImage()` from `astro:assets` | Returns optimized URL for CSS use |
| Icon system | SVG sprite sheet or copy-paste SVGs | `@lucide/astro` | Typed components, tree-shakeable, zero JS |
| FAQ accordion | Custom JS toggle | `<details>/<summary>` HTML | Native, accessible, keyboard-navigable, zero JS |
| SEO meta tags | Manual meta tag strings | Props on Layout.astro | Already has the pattern, just extend it |
| Responsive design | Custom media queries | Tailwind breakpoint prefixes | Mobile-first, consistent, design-system aligned |

**Key insight:** This is a static landing page. Every problem that seems like it needs JavaScript can be solved with HTML/CSS. The only JS-adjacent element is the countdown timer in Pricing, which should be deferred to a later phase (interactivity).

## Common Pitfalls

### Pitfall 1: Designing Desktop-First Then Struggling with Mobile
**What goes wrong:** The Pencil design is 1440px desktop-only. Developers build the desktop layout first with pixel values, then find it nearly impossible to make responsive.
**Why it happens:** Fixed widths (e.g., `width: 560px` on subtitle, `width: 800px` on FAQ, `width: 380px` on pricing card) break on mobile.
**How to avoid:** Write mobile-first Tailwind (unprefixed = mobile, `md:` / `lg:` = desktop). Use `max-w-*` instead of fixed `w-*`. Example: `max-w-[560px] w-full` instead of `w-[560px]`.
**Warning signs:** Horizontal scroll on mobile, text overflowing containers.

### Pitfall 2: Wrong Image Location (public/ vs src/assets/)
**What goes wrong:** Images placed in `public/` are served as-is with no optimization. Build output includes uncompressed PNGs/JPGs.
**Why it happens:** Confusion about Astro's two image directories.
**How to avoid:** All optimizable images go in `src/assets/`. Only favicons and robots.txt go in `public/`.
**Warning signs:** Large image file sizes in build output, no `.webp` files generated.

### Pitfall 3: Mismatched Design Tokens
**What goes wrong:** Using existing token names (e.g., `text-muted`) that don't match design spec colors, resulting in subtle color differences from the Pencil design.
**Why it happens:** Phase 1 tokens were approximate; Phase 2 needs exact values.
**How to avoid:** Audit all `@theme` tokens against the design spec before building sections. Update existing tokens to match the spec exactly.
**Warning signs:** Side-by-side comparison shows wrong grays, wrong backgrounds.

### Pitfall 4: Forgetting `list-style: none` on `<summary>`
**What goes wrong:** Default browser disclosure triangle appears next to FAQ items alongside the custom chevron icon.
**Why it happens:** `<summary>` has a default `list-style: disclosure-closed` marker.
**How to avoid:** Add global CSS: `summary { list-style: none; } summary::-webkit-details-marker { display: none; }`.
**Warning signs:** Two arrows visible on FAQ items.

### Pitfall 5: Hero Background Image Not Optimized
**What goes wrong:** Hero background image is a large unoptimized file because CSS `background-image: url()` bypasses Astro's image pipeline.
**Why it happens:** Only `<Image />` and `<Picture />` components go through the optimization pipeline. CSS `url()` references are not processed.
**How to avoid:** Use `getImage()` in the Astro frontmatter to get an optimized URL, then pass it to an inline `style` attribute.
**Warning signs:** Large hero image in network tab, no format conversion.

### Pitfall 6: Section Padding Not Responsive
**What goes wrong:** Design spec uses `padding: [100px, 120px]` (vertical, horizontal) which looks fine at 1440px but wastes space or causes overflow on mobile.
**Why it happens:** Direct translation of Pencil values without responsive adaptation.
**How to avoid:** Use responsive padding: `px-6 md:px-16 lg:px-[120px] py-16 md:py-[100px]`.
**Warning signs:** Tiny content area on tablet, horizontal scroll on mobile.

## Code Examples

### SEO Meta Tags Extension for Layout.astro
```astro
---
// Source: Astro docs pattern
interface Props {
  title: string;
  description?: string;
  ogImage?: string;
}

const {
  title,
  description = "Orbital - Next-gen audio synthesizer by CreativAudio",
  ogImage = "/og-image.png"
} = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalURL} />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:url" content={canonicalURL} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />

  <title>{title}</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</head>
```

### Responsive Section Container Pattern
```astro
<!-- Standard section wrapper matching design spec -->
<section class="py-16 md:py-[100px] px-6 md:px-16 lg:px-[120px] flex flex-col items-center gap-12 md:gap-16">
  <!-- Section header pattern -->
  <div class="flex flex-col items-center gap-4 text-center">
    <span class="text-xs font-semibold text-accent tracking-[2px] uppercase">SECTION LABEL</span>
    <h2 class="font-heading text-3xl md:text-[48px] font-normal text-primary tracking-tight">Section Title</h2>
    <p class="text-lg text-body leading-relaxed max-w-[600px]">Description text here.</p>
  </div>
  <!-- Section content -->
</section>
```

### Card Pattern (reused across Features, Testimonials)
```astro
<div class="rounded-xl bg-card border border-border-light p-8 flex flex-col gap-5">
  <!-- Card content -->
</div>
```

### Gradient CTA Button
```astro
<a href="#" class="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-accent to-accent-end px-10 py-4 text-[15px] font-semibold text-white tracking-wider">
  GET ORBITAL
  <ArrowRight size={18} />
</a>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@astrojs/image` integration | Built-in `astro:assets` module | Astro 3.0 (Aug 2023) | No extra package needed; `<Image />`, `<Picture />`, `getImage()` built in |
| `tailwind.config.js` | CSS `@theme` block | Tailwind v4 (Jan 2025) | Config-free, CSS-native theme customization |
| `lucide-astro` (community) | `@lucide/astro` (official) | 2024 | Official package, better maintained, same API |
| JS accordion libraries | `<details>/<summary>` | Broad browser support since 2020 | Zero JS, built-in a11y, supports `name` attribute for exclusive accordions |
| Manual responsive images | Astro `<Picture />` with `formats` | Astro 3.0+ | Auto-generates AVIF/WebP with `<picture>` fallback |

**Deprecated/outdated:**
- `@astrojs/image`: Removed in Astro 3.0, replaced by `astro:assets`
- `lucide-astro` (npm): Deprecated in favor of official `@lucide/astro`
- Tailwind `tailwind.config.js`: Still works but v4 prefers CSS `@theme`

## Responsive Strategy

The design spec targets 1440px. Tailwind's default breakpoints cover the responsive range well:

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Default (mobile) | < 640px | Single column, stacked cards, hamburger-ready nav, reduced padding |
| `sm` | >= 640px | Minor spacing adjustments |
| `md` | >= 768px | 2-column grids, side-by-side layouts |
| `lg` | >= 1024px | 3-column feature grid, full nav visible, design-spec padding |
| `xl` | >= 1280px | Max-width container, approaching design spec's 1440px |

**Container strategy:** Wrap the page content in a `max-w-[1440px] mx-auto` container to prevent content from stretching beyond the design width on ultra-wide screens.

## Open Questions

1. **Hero background image source**
   - What we know: Design spec references an AI-generated image with opacity 0.3 and gradient overlay
   - What's unclear: The actual image file doesn't exist yet; it needs to be generated or sourced
   - Recommendation: Use a placeholder during development (solid gradient), create/source the actual image as a task. Place in `src/assets/` for optimization.

2. **Orbital SVG wordmark**
   - What we know: Design spec references a 532x90 frame containing an SVG path for the "ORBITAL" wordmark
   - What's unclear: Whether this is a custom SVG that needs to be extracted from the Pencil file or recreated
   - Recommendation: Extract the SVG path data from the Pencil file if possible, or recreate using Orbitron font with custom styling. Inline SVG is preferred for crisp rendering.

3. **Product visual image**
   - What we know: 900x500 product screenshot with glow overlay and border
   - What's unclear: Whether the actual product screenshot exists or needs to be created/mocked
   - Recommendation: Use a placeholder image initially. The glow overlay can be done with a CSS pseudo-element using the radial gradient from the spec (`#FF5C0010` to transparent).

4. **Countdown timer behavior**
   - What we know: Design spec shows HH:MM:SS countdown boxes in the Pricing section
   - What's unclear: Whether this should be functional (requires JS) or static in this phase
   - Recommendation: Build the timer as **static HTML** with hardcoded values in this phase. Functional countdown is interactivity and belongs in a later phase.

5. **Mobile navigation**
   - What we know: Desktop nav has horizontal links. Design spec only shows desktop.
   - What's unclear: Mobile nav pattern (hamburger menu? hidden? simplified?)
   - Recommendation: Hide nav links on mobile, show hamburger icon. Actual mobile menu toggle requires JS and should be deferred to the interactivity phase. For now, render the hamburger icon but no toggle behavior.

## Sources

### Primary (HIGH confidence)
- [Astro Images Guide](https://docs.astro.build/en/guides/images/) - Image/Picture components, getImage(), src vs public
- [Astro Assets API Reference](https://docs.astro.build/en/reference/modules/astro-assets/) - getImage() function details
- [Lucide Astro Official Guide](https://lucide.dev/guide/packages/lucide-astro) - @lucide/astro installation and usage
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design) - v4 breakpoints, @theme customization

### Secondary (MEDIUM confidence)
- [MDN: HTML details exclusive accordions](https://developer.mozilla.org/en-US/blog/html-details-exclusive-accordions/) - details/summary name attribute
- [Astro SEO Complete Guide](https://eastondev.com/blog/en/posts/dev/20251202-astro-seo-complete-guide/) - Meta tags, JSON-LD patterns
- [CSS-Tricks: Details/Summary Accordion](https://css-tricks.com/quick-reminder-that-details-summary-is-the-easiest-way-ever-to-make-an-accordion/) - Styling patterns

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All tools are built-in or official packages with verified docs
- Architecture: HIGH - Standard Astro component patterns, well-documented
- Pitfalls: HIGH - Common, well-known issues with documented solutions
- Responsive strategy: MEDIUM - Design spec is desktop-only, mobile adaptation is judgment-based

**Research date:** 2026-03-09
**Valid until:** 2026-04-09 (stable domain, 30-day validity)
