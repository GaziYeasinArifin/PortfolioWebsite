

## Plan: Add Dark Mode Toggle to Navigation

The site already has a complete `.dark` theme defined in `src/index.css` with all surface, hero, and component tokens. The only missing piece is a user-facing toggle button.

### Changes

**File: `src/components/Header.tsx`**

1. Import `Moon` and `Sun` icons from `lucide-react`
2. Add a `toggleTheme` function that toggles `document.documentElement.classList.toggle('dark')` and persists the choice to `localStorage`
3. On mount, read `localStorage` for saved preference (falling back to system preference via `prefers-color-scheme`)
4. Place a moon/sun icon button in the desktop nav — between the nav links area and the "resume" link — styled consistently with existing nav items
5. Also add the toggle in the mobile menu

**Button behavior:**
- Shows `Moon` icon in light mode, `Sun` icon in dark mode
- On click: toggles `dark` class on `<html>`, saves preference to `localStorage`, updates `isDarkMode` state
- Styled to match existing nav link styling (same text color, hover states, size ~18px icon)

**File: `index.html`**
- Add a small inline `<script>` in `<head>` that reads `localStorage.theme` and applies the `dark` class before first paint, preventing a flash of wrong theme (FOUC prevention)

### No other files need changes
All components already use CSS custom properties that respond to the `.dark` class.

