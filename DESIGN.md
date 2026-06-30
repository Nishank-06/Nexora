---
name: Nexora Dark Precision
colors:
  surface: '#131314'
  surface-dim: '#131314'
  surface-bright: '#3a393a'
  surface-container-lowest: '#0e0e0f'
  surface-container-low: '#1c1b1c'
  surface-container: '#201f20'
  surface-container-high: '#2a2a2b'
  surface-container-highest: '#353436'
  on-surface: '#e5e2e3'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#e5e2e3'
  inverse-on-surface: '#313031'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#ccbeff'
  on-secondary: '#332664'
  secondary-container: '#4a3d7c'
  on-secondary-container: '#baabf3'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#00a572'
  on-tertiary-container: '#00311f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#e7deff'
  secondary-fixed-dim: '#ccbeff'
  on-secondary-fixed: '#1e0e4e'
  on-secondary-fixed-variant: '#4a3d7c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#131314'
  on-background: '#e5e2e3'
  surface-variant: '#353436'
  surface-glass: rgba(24, 24, 27, 0.6)
  grid-line: rgba(255, 255, 255, 0.03)
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.1'
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 64px
  section-padding: 120px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
---

## Brand & Style
The brand personality is defined by **Precision Engineering**, professional sophistication, and high-performance digital craftsmanship. It targets tech-forward enterprises and startups that value speed, reliability, and modern aesthetics.

The visual style is a hybrid of **Glassmorphism** and **Minimalist Dark Mode**. It utilizes deep charcoal surfaces, vibrant violet accents, and frosted glass panels to create a sense of depth and technological "glow." The interface should feel atmospheric yet structured, employing subtle grid overlays and animated focal points (like the "performance rings") to evoke a feeling of constant, optimized movement.

## Colors
The palette is rooted in a "Pitch Black" neutral base (`#0A0A0B`) to provide maximum contrast for the accent colors. 

- **Primary Violet:** Used for core branding, calls to action, and "glow" effects. It represents innovation and luxury.
- **Secondary Lavender:** Used for lighter accents, supporting illustrations, and hover states.
- **Tertiary Emerald:** Reserved specifically for performance indicators, success states, and metrics (e.g., Core Web Vitals).
- **Glass System:** Backgrounds for cards and navigation use a semi-transparent zinc-based color with heavy backdrop blurring.

## Typography
The typography system uses three distinct families to establish a technical hierarchy:
- **Plus Jakarta Sans** is the hero font, providing a modern, friendly, but authoritative voice for headlines. 
- **Inter** handles all long-form body copy for maximum legibility.
- **JetBrains Mono** is used for metadata, "eyebrow" labels, and navigation items, reinforcing the "engineered" feel of the studio.

Headlines utilize negative letter spacing at larger scales to feel tighter and more impactful. Labels are always uppercase with increased tracking for a clean, utilitarian look.

## Layout & Spacing
The system follows a **Fixed Grid** philosophy with a maximum container width of `1280px`. 

- **Vertical Rhythm:** Large sections are separated by `120px` to allow the dark background and grid patterns to breathe. Internal component stacking follows a `12px` / `24px` / `64px` progression.
- **Grid Background:** A subtle 40px square grid overlay is used globally to anchor elements and emphasize the "precision" theme.
- **Mobile Adaptation:** At mobile breakpoints, margins shrink to `20px`, and sections typically stack vertically, with headline sizes reducing by roughly 30-40%.

## Elevation & Depth
Depth is not communicated through traditional shadows, but through **Tonal Layering** and **Luminescence**:
- **Layer 0 (Background):** Deepest black `#0A0A0B` with the 3% opacity grid.
- **Layer 1 (Glass Panels):** `rgba(24, 24, 27, 0.6)` with `12px` backdrop blur. These panels use a `1px` low-contrast border (`outline-variant`) to define their edges.
- **Glow Effects:** High-priority elements (like the primary CTA) use a `20px` violet shadow (`rgba(139, 92, 246, 0.4)`) to appear as if they are emitting light rather than sitting on a surface.
- **Interactive Depth:** On hover, glass panels increase their border opacity and gain a subtle glow, while buttons "lift" via a `translateY(-1px)` transform.

## Shapes
The shape language is **Rounded** and sophisticated. Standard buttons and cards use a base `0.5rem` (8px) radius. Larger glass containers and hero mockups use a more pronounced `0.75rem` (12px) to `1.5rem` (24px) radius. 

- **Interactive Elements:** Buttons and form inputs use `rounded-lg` (8px).
- **Containers:** Section-level feature cards or glass wrappers use `rounded-xl` (12px) or `rounded-3xl` (24px) for a softer, more premium feel.
- **Specialty Shapes:** Status indicators (pulsing dots) and the "Eyebrow" tags are fully pill-shaped.

## Components

### Buttons
- **Primary (Glow):** Inverse-primary background with white text. Features a `glow-button` hover effect (violet shadow and slight lift).
- **Secondary (Outline):** Thin border (`outline-variant/30`) with no fill. Transitions to a `surface-container` fill on hover.
- **Label Mono:** Navigation links use `JetBrains Mono` in uppercase with a violet color shift on hover.

### Cards & Panels
- **Glass Panel:** The core container style. Semi-transparent background with a top-weighted inset shadow (`inset 0 1px 0 0 rgba(255, 255, 255, 0.05)`) to simulate a glass edge catch-light.

### Form Inputs
- **Dark Fields:** Backgrounds match the deepest page color (`#0A0A0B`) to look "recessed." Borders are low-contrast until focused, where they transition to `primary` with a subtle outer ring.

### Chips / Eyebrows
- Small pill-shaped containers with `label-mono` text. Often include a pulsing "Live" dot using the primary color.

### Icons
- **Material Symbols Outlined:** Set to a weight of 400. Primary-colored icons are often paired with a 10% opacity background of the same color for a "button-like" feel.