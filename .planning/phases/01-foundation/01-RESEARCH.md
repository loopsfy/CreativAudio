# Phase 1: Foundation - Research

**Researched:** 2026-03-09
**Domain:** Astro 5.x + Tailwind CSS v4 project scaffold with Vercel deployment
**Confidence:** HIGH

## Summary

Phase 1 establishes the project scaffold: an Astro 5.x site with Tailwind CSS v4 theming and a working Vercel deployment pipeline. This is a well-trodden path with official guides for every step. The three technologies (Astro, Tailwind v4, Vercel) have first-class integration with each other.

Astro 5.x is the current stable major version (latest 5.18.x as of March 2026, with v6 in alpha). Tailwind CSS v4 shipped stable on January 22, 2025, with a fundamentally new CSS-first configuration model replacing the old `tailwind.config.js`. Vercel detects Astro projects automatically and deploys static sites with zero configuration -- no adapter is needed for a static site.

The main complexity in this phase is Tailwind v4's new configuration model. Design tokens (colors, fonts) are now defined via `@theme` blocks in CSS rather than JavaScript config. This is simpler once understood, but tutorials and training data may mix v3 and v4 patterns. The font setup requires installing Fontsource packages and wiring them into `@theme`.

**Primary recommendation:** Use `npm create astro@latest`, add `@tailwindcss/vite` plugin, define design tokens via `@theme` in `global.css`, install fonts via Fontsource, and deploy as a static site to Vercel with zero adapter configuration.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| astro | ^5.18 | Static site framework with island architecture | Current stable, zero-JS by default, file-based routing |
| tailwindcss | ^4.x | Utility-first CSS framework | v4 is stable, CSS-first config, 5x faster builds |
| @tailwindcss/vite | ^4.x | Tailwind integration for Vite-based projects | Official Tailwind plugin for Astro (replaces deprecated @astrojs/tailwind) |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @fontsource/orbitron | latest | Self-hosted Orbitron font (headings) | Import in layout for automatic @font-face |
| @fontsource/inter | latest | Self-hosted Inter font (body text) | Import in layout for automatic @font-face |
| @fontsource/dm-mono | latest | Self-hosted DM Mono font (logo/code) | Import in layout for automatic @font-face |

### Alternatives Considered

| Instead of | Could Use | Why Not |
|------------|-----------|---------|
| @tailwindcss/vite | @astrojs/tailwind | Deprecated for Tailwind v4; the old integration is for v3 only |
| Fontsource | Google Fonts CDN `<link>` | Self-hosting is faster (no external DNS/connection), better for performance, works offline |
| Fontsource | Manual @font-face in public/ | Fontsource handles subsetting, formats, and weight variants automatically |

**Installation:**
```bash
# Create project
npm create astro@latest creativ-audio -- --template minimal

# Install Tailwind v4
npm install tailwindcss @tailwindcss/vite

# Install fonts
npm install @fontsource/orbitron @fontsource/inter @fontsource/dm-mono
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/       # Reusable Astro components (Header, Footer, etc.)
├── layouts/          # Base layout with <head>, font imports, global styles
│   └── Layout.astro  # Single base layout for the single-page site
├── pages/            # File-based routing (only index.astro for single-page)
│   └── index.astro   # Landing page that composes all sections
├── styles/           # Global CSS
│   └── global.css    # Tailwind import + @theme design tokens
└── assets/           # Images processed by Astro (optimized at build)
public/               # Static assets served as-is (favicon, OG image)
astro.config.mjs      # Astro config with Tailwind Vite plugin
```

### Pattern 1: Tailwind v4 CSS-First Configuration

**What:** Define all design tokens in CSS using `@theme`, not in a JavaScript config file.
**When to use:** Always with Tailwind v4. There is no `tailwind.config.js` in v4.

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-accent: #FF5C00;
  --color-accent-light: #FF7A33;
  --color-accent-dark: #CC4A00;
  --color-bg: #FFFFFF;
  --color-text: #1A1A1A;
  --color-text-muted: #6B7280;
  --color-surface: #F9FAFB;
  --color-border: #E5E7EB;

  /* Fonts */
  --font-heading: "Orbitron", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "DM Mono", monospace;
}
```

This generates utility classes like `text-accent`, `bg-surface`, `font-heading`, `font-body`, `font-mono`.

### Pattern 2: Base Layout with Font Imports

**What:** Import Fontsource packages and global CSS once in the base layout.
**When to use:** Every Astro project with custom fonts.

```astro
---
// src/layouts/Layout.astro
import "@fontsource/orbitron/400.css";
import "@fontsource/orbitron/700.css";
import "@fontsource/orbitron/900.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/dm-mono/400.css";
import "../styles/global.css";

interface Props {
  title: string;
  description?: string;
}

const { title, description = "Orbital - Next-gen audio synthesizer by CreativAudio" } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body class="bg-bg text-text font-body">
    <slot />
  </body>
</html>
```

### Pattern 3: Astro Config with Tailwind Vite Plugin

**What:** Register `@tailwindcss/vite` as a Vite plugin in Astro config.
**When to use:** Required for Tailwind v4 in Astro.

```javascript
// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Anti-Patterns to Avoid

- **Using @astrojs/tailwind integration:** This is the old v3 integration. Tailwind v4 uses `@tailwindcss/vite` directly as a Vite plugin. Do not run `npx astro add tailwind` if it installs the old integration (check what it installs -- Astro 5.2+ should add the correct v4 plugin).
- **Creating tailwind.config.js:** Tailwind v4 uses CSS-first configuration via `@theme`. There is no JavaScript config file.
- **Using @tailwind directives:** Tailwind v4 uses `@import "tailwindcss"` instead of the old `@tailwind base; @tailwind components; @tailwind utilities;`.
- **Installing @astrojs/vercel for static sites:** The Vercel adapter is only needed for SSR/on-demand rendering. Static Astro sites deploy to Vercel with zero configuration.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading | Manual @font-face declarations | Fontsource npm packages | Handles subsetting, multiple formats (woff2), weight variants automatically |
| CSS reset/normalize | Custom reset stylesheet | Tailwind's Preflight (included by default) | Battle-tested, works with Tailwind utilities |
| Design token system | CSS custom properties manually | Tailwind @theme block | Generates utility classes automatically, single source of truth |
| Build tooling | Custom Vite config | Astro's built-in Vite | Astro configures Vite optimally for its architecture |

**Key insight:** This phase is pure scaffolding. Every piece has an official, documented solution. The value is in wiring them together correctly, not in building anything custom.

## Common Pitfalls

### Pitfall 1: Mixing Tailwind v3 and v4 Patterns
**What goes wrong:** Using `tailwind.config.js`, `@tailwind` directives, or the `@astrojs/tailwind` integration with Tailwind v4 results in styles not loading.
**Why it happens:** Most tutorials and AI training data still reference Tailwind v3 patterns. The v4 configuration model is fundamentally different.
**How to avoid:** Use only `@import "tailwindcss"` and `@theme` blocks. No JavaScript config file. Use `@tailwindcss/vite` not `@astrojs/tailwind`.
**Warning signs:** Styles not appearing, "unknown utility class" errors, empty CSS output.

### Pitfall 2: @apply with Custom Utilities in Component Styles
**What goes wrong:** Using `@apply` with custom theme utilities inside Astro component `<style>` blocks fails with "Cannot apply unknown utility class" error.
**Why it happens:** In Tailwind v4, theme variables and custom utilities are scoped to the main CSS bundle. Component-level `<style>` blocks are separate stylesheets and don't have access to `@theme` definitions.
**How to avoid:** Use `@reference "../styles/global.css"` at the top of component `<style>` blocks if you must use `@apply`. Better yet, use utility classes directly in the HTML template instead of `@apply`.
**Warning signs:** Build errors mentioning "unknown utility class" in component files.

### Pitfall 3: Production vs Development Style Discrepancies
**What goes wrong:** Styles render correctly in `npm run dev` but are missing or broken in the production build.
**Why it happens:** Tailwind v4 had early issues with CSS module generation and class detection in production builds. Some versions (notably 4.0.5-4.0.8) had regressions.
**How to avoid:** Use the latest stable Tailwind v4 version (4.1+). Test production builds locally with `npm run build && npm run preview` before relying on Vercel deploys.
**Warning signs:** Missing styles only visible after deployment.

### Pitfall 4: Importing Wrong Fontsource Weight Files
**What goes wrong:** Fonts appear in a single weight (usually 400) because only one weight file was imported.
**Why it happens:** Fontsource ships each weight as a separate CSS import. You must import each weight you use.
**How to avoid:** Check the Pencil design for which weights are used and import each one explicitly. At minimum: Orbitron 400/700/900, Inter 400/500/600/700, DM Mono 400.
**Warning signs:** Headings look thin, bold text doesn't look bold enough.

### Pitfall 5: Forgetting to Set Default Font on Body
**What goes wrong:** The site uses the browser's default serif/sans-serif font instead of Inter.
**Why it happens:** Defining `--font-body` in `@theme` creates the utility class but doesn't apply it anywhere by default.
**How to avoid:** Add `class="font-body"` to the `<body>` tag in the base layout, or set `--font-sans` to override Tailwind's default sans-serif stack.
**Warning signs:** Text renders in Times New Roman or system default.

## Code Examples

### Complete global.css with Design Tokens
```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  /* Brand colors */
  --color-accent: #FF5C00;
  --color-accent-light: #FF7A33;
  --color-accent-dark: #CC4A00;

  /* Neutral palette */
  --color-bg: #FFFFFF;
  --color-surface: #F9FAFB;
  --color-border: #E5E7EB;
  --color-text: #1A1A1A;
  --color-text-muted: #6B7280;

  /* Typography */
  --font-heading: "Orbitron", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "DM Mono", monospace;
}

/* Apply base font to body */
body {
  font-family: var(--font-body);
}
```

### Minimal index.astro to Verify Setup
```astro
---
// src/pages/index.astro
import Layout from "../layouts/Layout.astro";
---
<Layout title="CreativAudio - Orbital Synthesizer">
  <main class="min-h-screen flex items-center justify-center">
    <div class="text-center space-y-6">
      <h1 class="font-heading text-4xl font-bold text-text">
        CreativAudio
      </h1>
      <p class="font-mono text-sm text-accent tracking-wider uppercase">
        Orbital Synthesizer
      </p>
      <p class="text-text-muted max-w-md mx-auto">
        Coming soon. Site under construction.
      </p>
      <div class="inline-block bg-accent text-white px-8 py-3 rounded-lg font-heading font-bold">
        #FF5C00 Accent
      </div>
    </div>
  </main>
</Layout>
```

### Vercel Deployment (Zero Config)
```bash
# 1. Initialize git repo
git init
git add .
git commit -m "Initial Astro + Tailwind v4 scaffold"

# 2. Push to GitHub
gh repo create creativ-audio --public --source=. --push

# 3. Import in Vercel dashboard (vercel.com/new)
#    - Select the GitHub repo
#    - Vercel auto-detects Astro
#    - Click Deploy
#    - No framework settings or adapter needed for static sites
```

No `@astrojs/vercel` adapter is needed. Vercel's build system detects Astro and runs `npm run build` automatically.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| @astrojs/tailwind integration | @tailwindcss/vite plugin | Tailwind v4 (Jan 2025) | Old integration does not work with Tailwind v4 |
| tailwind.config.js | @theme in CSS | Tailwind v4 (Jan 2025) | No JavaScript config file needed |
| @tailwind base/components/utilities | @import "tailwindcss" | Tailwind v4 (Jan 2025) | Single import replaces three directives |
| Google Fonts CDN links | Fontsource npm packages | Convention ~2023+ | Self-hosted, no external requests, better performance |
| @astrojs/vercel adapter for all deploys | No adapter for static sites | Vercel zero-config support | Simpler setup for static Astro sites |

**Deprecated/outdated:**
- `@astrojs/tailwind`: Do not use with Tailwind v4. Only works with v3.
- `tailwind.config.js` / `tailwind.config.ts`: Tailwind v4 uses CSS-first configuration exclusively.
- `@tailwind base; @tailwind components; @tailwind utilities;`: Replaced by `@import "tailwindcss"`.

## Open Questions

1. **Exact Fontsource weight variants needed**
   - What we know: Orbitron, Inter, DM Mono are the three fonts. Orbitron is for headings, Inter for body, DM Mono for logo/code elements.
   - What's unclear: Exact weights used in the Pencil design file. The design file would need to be inspected.
   - Recommendation: Import common weights (Orbitron 400/700/900, Inter 400/500/600/700, DM Mono 400) and adjust if the design uses different weights.

2. **Additional accent color shades**
   - What we know: Primary accent is #FF5C00.
   - What's unclear: Whether the design uses hover/active/lighter/darker variants of the accent.
   - Recommendation: Define accent, accent-light, and accent-dark at minimum. Expand the palette during Phase 2 when building actual sections against the design.

3. **Astro version pinning: 5.x vs latest**
   - What we know: Astro 5.18.x is current stable. Astro 6 is in alpha.
   - What's unclear: Whether `npm create astro@latest` will scaffold v5 or v6 by the time this runs.
   - Recommendation: Use `npm create astro@latest` and verify the installed version is 5.x. If v6 has gone stable, evaluate whether to use it (likely fine, but would need updated research).

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS v4 Astro installation guide](https://tailwindcss.com/docs/installation/framework-guides/astro) - Official step-by-step setup
- [Tailwind CSS v4 @theme documentation](https://tailwindcss.com/docs/theme) - Custom colors, fonts, design tokens
- [Astro Vercel deployment guide](https://docs.astro.build/en/guides/deploy/vercel/) - Static site zero-config deployment
- [Astro fonts guide](https://docs.astro.build/en/guides/fonts/) - Fontsource recommended approach
- [Astro project structure docs](https://docs.astro.build/en/basics/project-structure/) - Canonical directory layout

### Secondary (MEDIUM confidence)
- [Tailwind v4 release announcement](https://tailwindcss.com/blog/tailwindcss-v4) - CSS-first config, performance improvements
- [Vercel Astro zero-config changelog](https://vercel.com/changelog/astro-projects-can-now-be-deployed-with-zero-configuration) - Confirms no adapter needed
- [Astro npm releases](https://www.npmjs.com/package/astro) - Current version 5.18.x

### Tertiary (LOW confidence)
- [Tailwind v4 + Astro GitHub issues](https://github.com/tailwindlabs/tailwindcss/issues/18055) - @apply scoping issues, production build discrepancies

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries are stable, official installation guides exist and were verified
- Architecture: HIGH - Standard Astro project structure, well-documented patterns
- Pitfalls: MEDIUM - Based on GitHub issues and community reports; specific version-related bugs may be resolved in latest versions

**Research date:** 2026-03-09
**Valid until:** 2026-04-09 (stable ecosystem, 30-day validity)
