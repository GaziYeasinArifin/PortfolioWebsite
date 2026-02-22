

# Hero Section Redesign: "Minimalist Tech-Noir"

## Overview
A complete redesign of the Hero section targeting Lead Product Design roles at FAANG/Tier-1 companies. The new design combines Apple's precision with Vercel's technical edge, featuring interactive elements that showcase your interaction design expertise.

---

## 1. Visual Design

**Color palette shift:**
- Background: Deep navy-black (#050505) applied to the hero section only (not global)
- Accent: Electric Blue (#0066FF) to Cyan (#00D4FF) gradient for "AI-Powered" text
- Text: Pure white (#FAFAFA) for headlines, silver (#888) for secondary text
- Card borders: Subtle white/blue glow using rgba borders

**Typography:**
- Headline in Syne (existing display font) -- bold, uppercase
- Sub-headline in Inter (existing body font) -- regular weight
- Stats in Inter with tabular numbers

---

## 2. Layout Structure

**Stacked center-aligned layout with wide margins:**

```text
+--------------------------------------------------+
|          [Generative mesh background]             |
|                                                   |
|     "AI Cursor" trailing light on mouse move      |
|                                                   |
|        Interaction / UX / Product Designer        |
|          (typewriter -- kept from current)         |
|                                                   |
|      PRODUCT DESIGN LEADER                        |
|      FOR  AI-Powered  SYSTEMS                     |
|           ^^^^^^^^^^ gradient text                |
|                                                   |
|   Driving adoption and $1.5M+ in measurable       |
|   impact through high-scale iOS and SaaS systems  |
|                                                   |
|   +----------+ +----------+ +----------+          |
|   | 850K+    | | $1.5M+   | | 35%+     |          |
|   | Monthly  | | Savings  | | Adoption |          |
|   | Users    | | Generated| | Gains    |          |
|   +----------+ +----------+ +----------+          |
|   (glassmorphism bento cards with glow)            |
|                                                   |
|   [View Case Studies]   Learn My Process -->       |
|                                                   |
|   Now in San Francisco  *                         |
|                                                   |
|              (scroll indicator)                   |
+--------------------------------------------------+
```

---

## 3. Interactive Elements

**Generative mesh background:**
- A canvas-based flowing mesh/gradient that reacts slowly to mouse position (desktop only)
- Uses 3-4 soft radial gradients in deep blue/cyan that shift position based on cursor
- Lightweight -- no heavy libraries, just CSS radial gradients with transform

**AI cursor trailing light:**
- A soft, glowing radial gradient (~200px) that follows the mouse with a slight delay
- Creates a "spotlight" effect over dark content
- Desktop only, hidden on mobile

**Staggered reveal animations:**
- Each element (label, headline, sub-headline, stats, CTAs) fades in with slide-up effect
- Progressive delays (100ms, 200ms, 300ms, etc.) using existing animation utilities

---

## 4. Bento Grid Stats

Three glassmorphism cards in a horizontal row:
- **850K+** Monthly Users
- **$1.5M+** Savings Generated  
- **35%+** Adoption Gains

Card styling:
- Semi-transparent background: rgba(255,255,255,0.03)
- 1px border with subtle white/blue glow
- Slight hover: border brightens, card lifts 2px

---

## 5. CTA Buttons

- **Primary "View Case Studies"**: Solid electric blue button with subtle pulse animation on hover, white text
- **Secondary "Learn My Process"**: Outline button with arrow icon that slides right on hover

---

## 6. Location Badge

A small pill badge: "Now in San Francisco" with a subtle pulsing green dot, positioned below CTAs.

---

## Technical Details

### Files to modify:
1. **`src/components/Hero.tsx`** -- Complete rewrite with new layout, generative background (CSS-based), mouse-tracking cursor light, glassmorphism stat cards, updated copy, gradient text, location badge
2. **`src/index.css`** -- Add new keyframes for pulse glow, gradient animation, and cursor light styles; add delay-250, delay-275, delay-350 utilities if not present
3. **`tailwind.config.ts`** -- No changes needed (existing animations sufficient with CSS additions)

### No new dependencies:
- All animations done with CSS transforms, keyframes, and React state (no Framer Motion needed to keep bundle light)
- Generative background uses CSS radial-gradient with mousemove-driven inline styles
- Cursor light effect uses a div with pointer-events-none that tracks mouse position

### Performance considerations:
- Mouse tracking throttled with requestAnimationFrame
- Canvas-free approach (CSS gradients only) for maximum performance
- Background effects disabled on mobile to preserve battery
- Will-change hints on animated elements

### Responsive behavior:
- Desktop (1024px+): Full interactive experience with cursor light and mesh background
- Tablet (768-1023px): Static mesh background, no cursor effects, stats in 3-column grid
- Mobile (<768px): Simplified dark hero, stats stacked in single column, no interactive background effects

