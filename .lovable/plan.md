

## Performance Analysis

The hero background (`GeometricKinetic.tsx`) has several performance bottlenecks:

1. **`filter: blur(120px)` on 3 elements** — CSS blur is GPU-expensive, especially at 120px radius on 350-400px elements. Each frame requires compositing large blurred layers.
2. **`willChange: 'transform, filter, opacity'`** — Declaring `filter` in `willChange` forces the GPU to keep large blur textures in memory. Since `filter` never actually animates, this is wasteful.
3. **6 spring motion values** updating every frame on mouse move — each triggers style recalculations.
4. **`setInterval` every 200ms** for proximity detection causes unnecessary re-renders via `setActiveShape`.
5. **Inline `calc()` expressions** in `useTransform` create string-based style updates that bypass GPU-only compositing.

## Optimization Plan

### 1. Replace CSS `blur(120px)` with pre-blurred radial gradients
Instead of applying a real-time blur filter, make the shapes larger with softer gradients that *look* blurred without the GPU cost. Remove `filter: blur(120px)` entirely — use a much larger element size (e.g., 600-700px) with a radial gradient that fades to transparent at the edges. This eliminates the most expensive operation.

### 2. Remove `filter` from `willChange`
Change `willChange` to just `'transform, opacity'` since we no longer use `filter`.

### 3. Remove proximity-based re-renders
Delete the `setInterval` + `setActiveShape` logic. All three shapes keep a fixed opacity — no React state updates on mouse move. This eliminates the biggest source of re-renders.

### 4. Use `useTransform` with percentage-based transforms instead of `calc()` strings
Convert position updates to use `x` and `y` transforms (GPU-composited) instead of `left`/`top` with `calc()` strings. This keeps everything on the compositor thread.

### 5. Reduce spring stiffness slightly for smoother, less frequent updates
Lower stiffness values mean the springs settle faster and produce fewer intermediate frames.

## Technical Details

**File changed:** `src/components/GeometricKinetic.tsx`

- Shape sizes increase from 400px to ~700px, but with radial gradients that fade out at 40-50% radius, simulating the blur effect purely through gradient falloff
- `filter: blur(...)` removed from all three shapes
- `activeShape` state and the 200ms interval removed entirely; shapes use static opacity values
- Position computed via `x`/`y` motion style props (GPU transform) instead of `left`/`top` with `calc()`
- `willChange` simplified to `'transform'`

The visual result will be nearly identical — soft, diffused colored light blobs — but rendered at a fraction of the GPU cost.

