

# Navigation & Brand Header Redesign

## Overview
Redesign the navigation bar to be high-contrast, accessible, and visually polished. The current header uses `bg-background/95` (white/light) which clashes with the dark hero. This fix ensures the nav is always readable, adds glassmorphism on scroll, a shimmer CTA, a status badge, and improves mobile UX.

---

## The Problem
The header currently uses the light theme's background color variables. Over the dark (#050505) hero section, the white/light text and background create a low-contrast, unreadable experience. A FAANG recruiter would immediately flag this as an accessibility failure.

---

## Changes

### 1. Smart Header Theming (Dark on Hero, Glass on Scroll)

**Before scroll:** Fully transparent background, white text/logo when over the dark hero.  
**After scroll:** Glassmorphism effect with `backdrop-filter: blur(12px)`, a thin `1px` bottom border (`rgba(255,255,255,0.08)` on dark, `rgba(0,0,0,0.06)` on light), and a semi-transparent background.

The header will detect whether it's on the home page and over the hero section to apply white text. On other pages or when scrolled past the hero, it reverts to the standard theme colors.

### 2. Logo & Name Visibility

- Logo image: apply a CSS `brightness(0) invert(1)` filter when over the dark hero to force white rendering
- Name text: use `text-white` when over hero, `text-foreground` otherwise
- Increase font weight to `font-bold` (700) for "gazi yeasin arifin" to ensure legibility at small sizes
- Add a subtle hover glow effect (soft white text-shadow) instead of just opacity changes

### 3. Navigation Links

- Over dark hero: links use `text-white/60` base, `text-white` on hover
- Scrolled/light: links use `text-muted-foreground` base, `text-foreground` on hover
- Hover underline adapts color to match current theme context

### 4. "Available in San Francisco" Status Badge

- Add a green pulsing dot + "Available in SF" text next to the nav links (desktop only)
- Small pill-shaped badge with subtle border
- Uses the same pulse animation already defined (`hero-dot-pulse`)

### 5. "Say Hi" Button Shimmer

- Add a CSS shimmer animation: a diagonal light sweep that plays once on hover
- Button keeps the existing dark/light contrast but gains the shimmer for visual interest
- No new dependencies needed -- pure CSS `@keyframes` and pseudo-element

### 6. Resume Link Enhancement

- Add a small download icon (`Download` from lucide-react) next to "resume"
- Icon animates downward slightly on hover (translateY +2px)

### 7. Mobile Menu Improvements

- Full-screen overlay already exists -- enhance with:
  - Social links (LinkedIn, Medium) at the bottom of the mobile menu
  - "Available in SF" badge visible in mobile menu footer
  - Dark background matching the hero when on home page

---

## Technical Details

### Files to modify:

1. **`src/components/Header.tsx`**
   - Add state: `isOverHero` (boolean) -- computed from scroll position and whether on home page. The hero section is `min-h-screen`, so roughly `window.innerHeight` is the threshold
   - Derive `isDarkNav` = `isHomePage && !isScrolled` (when at top of home page, use white text)
   - Update header classes: when `isScrolled`, apply `backdrop-blur-xl bg-background/80 border-b border-border/10`; when not scrolled on home page, fully transparent
   - Logo `<img>`: add conditional `filter brightness(0) invert(1)` class when `isDarkNav`
   - Name text: conditional `text-white` vs `text-foreground`
   - Nav links: conditional color classes based on `isDarkNav`
   - Add "Available in SF" badge component inline (desktop nav area)
   - Add `Download` icon to resume link
   - "Say Hi" button: add `shimmer-button` class with CSS animation
   - Mobile menu: add LinkedIn + Medium social links, "Available in SF" badge

2. **`src/index.css`**
   - Add `@keyframes shimmer` for the button shine effect
   - Add `.shimmer-button` styles with pseudo-element overlay
   - Add `.nav-glass` utility for the glassmorphism scroll state

### No new dependencies needed
- All effects use CSS animations and Tailwind utilities
- Download icon from existing `lucide-react` package

### Accessibility improvements
- All text meets WCAG AA contrast ratios (white on #050505 = 18.4:1)
- Focus-visible states maintained on all interactive elements
- Semantic HTML preserved (nav, ul/li, button/a)

