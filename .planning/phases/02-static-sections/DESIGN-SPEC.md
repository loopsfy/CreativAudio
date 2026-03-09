# Phase 2: Design Specification (from Pencil file)

Source: `C:\Users\zepid\OneDrive\Documentos\creativ audio.pen` — frame "Orbital VST - Light Version" (id: CpPkf)
Width: 1440px, clip: true, fill: #FFFFFF, layout: vertical

## 1. Header (id: yA9Uy)
- Layout: horizontal, justifyContent: space_between, alignItems: center
- Fill: #FFFFFF, padding: [20, 80]
- **Logo** (id: ZoSl0): frame, gap: 10, alignItems: center
  - "CreativAudio" — DM Mono, 20px, weight 600, fill #111111, letterSpacing: 2
- **Nav** (id: dRrcW): frame, gap: 32, alignItems: center
  - Items: "PRODUCTS", "PRESETS", "SUPPORT", "ABOUT"
  - Inter, 13px, weight 500, fill #555555, letterSpacing: 0.8
- **Header Right** (id: fGAFC): frame, gap: 16, alignItems: center
  - Cart icon: lucide "shopping-cart", 20x20, fill #555555
  - Buy button (id: aRgQG): frame, cornerRadius: 6, fill: #FF5C00, padding: [10, 24]
    - "BUY NOW" — Inter, 13px, weight 600, fill #FFFFFF, letterSpacing: 0.5

## 2. Hero Section (id: jFUI1)
- Layout: vertical, alignItems: center, gap: 48, padding: [80, 80, 60, 80]
- Fill: image background (opacity 0.3) + radial gradient overlay (#FFF0E6CC → #FFFFFFDD)
- **Social Proof Row** (id: SX4vJ): "Trusted by 10,000+ producers" with star rating
- **Orbital Logo** (id: NAFAZ): frame 532x90, contains SVG path (the ORBITAL wordmark)
- **Hero Text Group** (id: GO4fk): vertical, gap: 24
  - Tagline: "Next-Generation Audio Synthesis" — Orbitron, 20px, weight 400, fill #666666, letterSpacing: 4
  - Subtitle: long text — Inter, 18px, weight 400, fill #666666, lineHeight: 1.6, textAlign: center, width: 560
- **CTA** (id: 4h0yX): frame, cornerRadius: 6, gradient fill (#FF5C00 → #FF8A4C, linear 90°), padding: [16, 40]
  - "GET ORBITAL" — Inter, 15px, weight 600, fill #FFFFFF, letterSpacing: 1
  - Arrow icon: lucide "arrow-right", 18x18, fill #FFFFFF
- **Product Visual** (id: go749): frame 900x500, cornerRadius: 12, image fill, stroke #E5E5E7 1px
  - Glow overlay (id: D36l2): 900x500, radial gradient #FF5C0010 → transparent, opacity 0.4
- **Compatibility Row** (id: zUJwo): horizontal, gap: 32, padding: [20, 0], alignItems: center
  - "Compatible with" — Inter, 12px, fill #888888
  - Separators: 1x16 rectangles, fill #D4D4D8
  - Items: "VST3", "AU", "AAX", "Windows & macOS" — DM Mono, 13px, weight 500, fill #666666

## 3. Features Section (id: ANPSQ)
- Layout: vertical, alignItems: center, gap: 64, padding: [100, 120]
- **Header** (id: 076Ew): vertical, alignItems: center, gap: 16
  - "FEATURES" — Inter, 12px, weight 600, fill #FF5C00, letterSpacing: 2
  - "Designed for the Future of Sound" — Orbitron, 48px, weight 400, fill #111111, letterSpacing: -1, textAlign: center
  - Description — Inter, 18px, fill #666666, lineHeight: 1.6, textAlign: center, width: 600
- **Feature Grid Row 1** (id: ZzrXy): horizontal, gap: 24, width: fill_container
  - 3 cards (feat1, feat2, feat3): each cornerRadius: 12, fill: #F0F0F2, gap: 20, padding: 32, stroke: #E5E5E7 1px, width: fill_container
  - Each card has: icon (lucide, 24x24, fill #FF5C00), title (Inter 18px weight 600 #111111), description (Inter 15px #666666 lineHeight 1.5)
  - Card titles: "3 Oscillator Engines", "Spectral Effects Suite", "Intelligent Modulation"
- **Feature Grid Row 2** (id: qMqAO): same structure
  - Card titles: "Preset Morphing", "Visual Feedback Engine", "Built for Performance"

## 4. Sound Library / Presets Section (id: LQAig)
- Fill: #FAFAFA, layout: vertical, alignItems: center, gap: 48, padding: [100, 120]
- **Header**: same pattern — "SOUND LIBRARY" label, "Explore the Sound" title (Orbitron 48px), description
- **Presets List** (id: NrYJd): vertical, gap: 2, width: fill_container
  - 5 preset items, each: horizontal, cornerRadius: 8, fill: #F0F0F2/#F5F5F7, justifyContent: space_between, padding: [20, 24], alignItems: center
  - Each has: left side (preset name + category), right side (genre tag + play icon)
  - Preset names: "Cosmic Drift", "Neural Bass", "Quantum Pad", "Digital Rain", "Void Lead"
  - Categories: "Ambient Pad", "Bass", "Pad", "Arpeggio", "Lead"
  - Genres: "Ambient", "Dubstep", "Cinematic", "Electronica", "Synthwave"
- **View All Button** (id: zCooe): cornerRadius: 6, stroke: #D4D4D8 1px, padding: [14, 32], gap: 8
  - "GET ORBITAL NOW" — Inter, 13px, weight 500, fill #555555, letterSpacing: 0.5
  - Arrow icon

## 5. Social Proof Section (id: U9P1J)
- Layout: vertical, alignItems: center, gap: 64, padding: [100, 120]
- **Header**: "TRUSTED BY PRODUCERS" label, "What Artists Say" title (Orbitron 48px)
- **Stats Row** (id: Ls8Nx): horizontal, gap: 80, justifyContent: center, width: fill_container
  - 4 stats, each vertical, alignItems: center, gap: 4
  - Values: "10K+", "500+", "4.9/5", "50+"
  - Labels: "Active Users", "Presets", "Rating", "DAW Compatible"
- **Testimonials Row** (id: chTmB): horizontal, gap: 24, width: fill_container
  - 3 cards: cornerRadius: 12, fill: #F0F0F2, gap: 20, padding: 32, stroke: #E5E5E7 1px, width: fill_container
  - Each has: stars row (5 star icons), quote text, author name + role

## 6. Pricing Section (id: 1On7a)
- Fill: radial gradient (#FFF0E6 → #FFFFFF), layout: vertical, alignItems: center, gap: 48, padding: [100, 120]
- **Header**: "PRICING" label, "One Plugin. One Price. No Subscriptions." title (Orbitron 48px)
- **Launch Offer** (id: IHIA3): vertical, alignItems: center, gap: 12
  - "LAUNCH OFFER ENDS IN" — Inter, 11px, weight 600, fill #FF5C00, letterSpacing: 2
  - Timer row (id: 7fsds): horizontal, gap: 12, alignItems: center
    - 3 time boxes (HH, MM, SS): each cornerRadius: 8, fill: #111111, padding: [12, 16]
      - Number — DM Mono, 24px, weight 700, fill #FFFFFF
      - Label — Inter, 10px, fill #999999
    - Separators: ":" in DM Mono 20px fill #CCCCCC
- **Pricing Card** (id: cKpb9): cornerRadius: 12, fill: #F0F0F2, gap: 32, padding: 40, stroke: #E5E5E7 1px, width: 380
  - Contains: plan name, prices (original crossed out + sale price), feature list with checkmarks, CTA button

## 7. FAQ Section (id: zrqjV)
- Fill: #FAFAFA, layout: vertical, alignItems: center, gap: 48, padding: [100, 120]
- **Header**: "FAQ" label, "Frequently Asked Questions" title (Orbitron 48px), description
- **FAQ List** (id: DuSYz): vertical, width: 800
  - 5 FAQ items, each: vertical, padding: [24, 0], stroke bottom: #E5E5E7 1px (except last)
  - Each has: question row (horizontal, justifyContent: space_between) with question text + chevron icon
  - Question text: Inter 16px weight 500 fill #111111
  - Questions: "What DAWs does Orbital support?", "Do I get free updates?", "Can I use Orbital commercially?", "What are the system requirements?", "How does the preset library work?"

## 8. Footer (id: PfVCj)
- Fill: #F5F5F7, layout: vertical, gap: 48, padding: [64, 120]
- **Footer Main** (id: SMzeA): horizontal, justifyContent: space_between
  - Brand column (width: 300): logo + description
  - 3 nav columns: "Product", "Support", "Company" — each with links
- **Footer Divider**: 1px #E5E5E7
- **Footer Bottom** (id: X1ycT): horizontal, justifyContent: space_between
  - Copyright: "© 2026 Orbital Audio. All rights reserved." — Inter 12px #999999
  - Legal links: "Privacy Policy", "Terms of Service", "Refund Policy"

## Dividers
Between each major section: rectangle, height: 1px, fill: #E5E5E7, width: fill_container

## Color Palette (from design)
- Accent: #FF5C00
- Accent gradient: #FF5C00 → #FF8A4C
- Text primary: #111111
- Text secondary: #555555
- Text muted: #666666
- Text light: #888888, #999999
- Background: #FFFFFF
- Surface: #FAFAFA, #F5F5F7
- Card: #F0F0F2
- Border: #E5E5E7, #D4D4D8
- Timer bg: #111111

## Typography
- Headings: Orbitron, 48px, weight 400, letterSpacing: -1
- Section labels: Inter, 12px, weight 600, fill #FF5C00, letterSpacing: 2
- Body: Inter, 18px/15px, weight 400, lineHeight: 1.5-1.6
- Logo: DM Mono, 20px, weight 600, letterSpacing: 2
- Code/mono: DM Mono, 13px, weight 500
- Nav: Inter, 13px, weight 500, letterSpacing: 0.8
- Buttons: Inter, 13-15px, weight 600

## Layout patterns
- Max width: 1440px
- Section padding: [100, 120] (vertical, horizontal)
- Card style: cornerRadius 12, fill #F0F0F2, stroke #E5E5E7 1px, padding 32, gap 20
- Button style: cornerRadius 6, padding [10-16, 24-40]
- Grid gaps: 24px between cards
- Section gap between header and content: 48-64px
