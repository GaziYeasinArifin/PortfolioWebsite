

# Case Studies Section Redesign: Premium Editorial Gallery

## Overview
Transform the current 2-column grid case studies section into a high-end, interactive gallery with an asymmetric bento layout, impact badges, parallax hover effects, progressive disclosure, and a filter bar with animated layout transitions.

---

## 1. Layout: Asymmetric Bento Grid

Replace the uniform `grid-cols-2` with a mixed layout for the UX Projects tab:

```text
+-------------------------------+---------------+
|                               |               |
|   FEATURED CARD 1             |   CARD 3      |
|   Add Music to Video          |   Spotlight    |
|   (spans 2 rows tall)         |   Design Sys  |
|                               |               |
+-------------------------------+---------------+
|               |                               |
|   CARD 2      |   FEATURED CARD 4             |
|   Screenlife  |   Phantom Footprint           |
|               |   (spans wider)               |
+---------------+-------------------------------+
```

- Featured cards ("Add Music to Video" and "Design System for Spotlight") get larger visual presence using `col-span` and `row-span` in a CSS grid
- Other tabs (branding, writing, academic) keep a simpler grid layout since they don't need the asymmetry

---

## 2. Case Study Card Component

Each card will include:

**Impact Badge (top-right corner):**
- Glassmorphism pill with glowing border, always visible
- Content per project:
  - Add Music to Video: "22M+ Users"
  - Spotlight: "Top 10 App Store"
  - Screenlife: "First-of-its-Kind"
  - Phantom Footprint: "IoT + Board Game"

**Role Tags (below title):**
- Displayed in a monospace font (`font-mono`) for a technical feel
- Tags like: `AI / ML`, `iOS`, `Lead Designer`, `SaaS`, `Design Systems`

**Progressive Disclosure (on hover):**
- A one-sentence "Challenge / Result" summary slides up from the bottom of the image
- Example: "Challenge: Scale a video editor for 22M users. Result: 35% increase in retention."

**Hover Effects:**
- Card scales up slightly (`scale-[1.02]`) with a smooth transition
- Background image zooms in slightly more (`scale-110` to `scale-115`) creating a parallax-like effect
- Layered shadow deepens on hover for the floating effect

---

## 3. Visual Treatment

- **Squircle radius:** Change card corners from `rounded-[4px]` to `rounded-2xl` (16px) for the Apple squircle feel
- **Layered shadows:** Multi-layer `box-shadow` on cards: a diffuse outer shadow + a tighter inner shadow
- **Typography:** Project titles increase to `text-3xl font-bold` with the display font (Syne)
- **High-contrast headings:** Section title stays large and bold

---

## 4. Filter Bar

Replace the current tab system with a minimalist pill-style filter bar:

**Filters:** `[All] [AI Systems] [Mobile] [SaaS] [Design Systems]`

- Each filter is a pill button; selected state has a solid background
- Selecting a filter animates cards in/out with a staggered fade-up effect
- The existing tab categories (branding, writing, academic) move to a secondary row or are accessible via "All"
- Cards are tagged with filter categories and filtered client-side

**Implementation approach:** Since we cannot use Framer Motion (not installed), we'll use CSS transitions with `opacity` and `transform` for enter/exit animations. Cards that don't match the filter get `opacity-0 scale-95 pointer-events-none h-0` with transitions.

---

## 5. Content Mapping

| Project | Impact Badge | Filter Tags | Challenge/Result |
|---------|-------------|-------------|-----------------|
| Add Music to Video | 22M+ Users | Mobile, AI Systems | Challenge: Scale a video editor for 22M users. Result: 35% retention increase. |
| Spotlight Design System | Top 10 App Store | Design Systems, Mobile | Challenge: Unify 3 creative apps. Result: Cross-platform design governance. |
| Screenlife | First-of-its-Kind | Mobile, SaaS | Challenge: Create the first interactive video recorder. Result: Novel interaction paradigm. |
| Phantom Footprint | IoT Innovation | AI Systems | Challenge: Close the climate feedback loop. Result: IoT-enhanced board game. |

Branding, writing, and academic items appear under "All" filter only (or their own dedicated filter if space permits).

---

## Technical Details

### Files to modify:

1. **`src/components/CaseStudies.tsx`** -- Major rewrite:
   - Add `impactBadge`, `filterTags`, `challengeResult`, and `roleTags` fields to each case study data object
   - Replace tab system with a unified filter bar (pill buttons)
   - Implement asymmetric bento grid using CSS Grid with `grid-template-rows` and `col-span`/`row-span` for featured items
   - New `CaseStudyCard` sub-component with: impact badge (glassmorphism pill), role tags (mono font), hover parallax zoom, progressive disclosure overlay, layered shadows
   - Filter logic: all items in one flat array, filtered by selected tag
   - Animated transitions using CSS `transition` on `opacity`, `transform`, and `max-height`

2. **`src/index.css`** -- Add new utility styles:
   - `.bento-card` class with layered shadow and squircle radius
   - `.bento-card:hover` with deepened shadow and slight lift
   - `.impact-badge` glassmorphism styling (reuses `hero-glass-card` pattern)
   - `.card-reveal` for the progressive disclosure slide-up animation

### No new dependencies:
- All animations use CSS transitions and keyframes
- Filter animation via CSS classes toggled by React state
- No Framer Motion needed (layout animations approximated with CSS grid + transitions)

### Responsive behavior:
- Desktop (1024px+): Full asymmetric bento grid, hover effects active
- Tablet (768-1023px): 2-column grid, simplified hover
- Mobile (<768px): Single column stack, impact badges still visible, no hover effects

