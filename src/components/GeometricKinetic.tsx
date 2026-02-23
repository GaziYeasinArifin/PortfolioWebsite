import { useEffect, useRef } from 'react';

/**
 * Architectural Glass — "Prismatic Refraction" v5
 *
 * 65° slanted rectangles at different depth layers behaving like light
 * through architectural glass. Edge refraction glow, mouse spotlight
 * with blur reveal, horizontal drift on 20s loops, film grain overlay.
 * Pauses when off-screen for performance.
 */

const BRAND_ANGLE = (65 * Math.PI) / 180;

/* ─── Glass Panel (slanted rectangle at depth) ─── */
interface GlassPanel {
  cx: number;          // center X (fraction of width)
  cy: number;          // center Y (fraction of height)
  rectW: number;       // rectangle width in px (at 1920 baseline, scaled)
  rectH: number;       // rectangle height in px
  depth: number;       // 0=back, 1=front — affects parallax speed & opacity
  driftRange: number;  // horizontal drift range in px
  driftPeriod: number; // seconds for full cycle
  driftPhase: number;
  color: {
    dark: [number, number, number];   // RGB
    light: [number, number, number];
  };
  opacity: {
    dark: number;
    light: number;
  };
}

const PANELS: GlassPanel[] = [
  // Panel 1 — Broad, far back — Deep Indigo
  {
    cx: 0.18, cy: 0.35, rectW: 180, rectH: 900,
    depth: 0.1, driftRange: 12, driftPeriod: 22, driftPhase: 0,
    color: { dark: [30, 40, 100], light: [205, 215, 235] },
    opacity: { dark: 0.12, light: 0.09 },
  },
  // Panel 2 — Medium, mid-depth — Slate Blue
  {
    cx: 0.52, cy: 0.45, rectW: 120, rectH: 1100,
    depth: 0.35, driftRange: 16, driftPeriod: 20, driftPhase: 2.5,
    color: { dark: [55, 70, 120], light: [195, 205, 228] },
    opacity: { dark: 0.09, light: 0.07 },
  },
  // Panel 3 — Narrow, mid-front — Electric Cyan tint
  {
    cx: 0.72, cy: 0.3, rectW: 60, rectH: 800,
    depth: 0.6, driftRange: 18, driftPeriod: 18, driftPhase: 4.2,
    color: { dark: [0, 140, 180], light: [180, 218, 238] },
    opacity: { dark: 0.07, light: 0.06 },
  },
  // Panel 4 — Very broad, far back — Deep Indigo dark
  {
    cx: 0.38, cy: 0.6, rectW: 200, rectH: 1000,
    depth: 0.05, driftRange: 10, driftPeriod: 24, driftPhase: 1.0,
    color: { dark: [20, 28, 75], light: [215, 222, 242] },
    opacity: { dark: 0.08, light: 0.06 },
  },
  // Panel 5 — Thin accent, front — Slate Grey
  {
    cx: 0.85, cy: 0.55, rectW: 35, rectH: 700,
    depth: 0.8, driftRange: 20, driftPeriod: 19, driftPhase: 5.5,
    color: { dark: [100, 116, 139], light: [170, 185, 200] },
    opacity: { dark: 0.10, light: 0.08 },
  },
];

interface Props {
  mouseX: number; // 0-100
  mouseY: number; // 0-100
  isDesktop: boolean;
}

const GeometricKinetic = ({ mouseX, mouseY, isDesktop }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grainRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startRef = useRef(performance.now());
  const isVisibleRef = useRef(true);
  const sizeRef = useRef({ w: 0, h: 0 });

  // Generate film grain texture once
  useEffect(() => {
    const grain = grainRef.current;
    if (!grain) return;
    const size = 256;
    grain.width = size;
    grain.height = size;
    const ctx = grain.getContext('2d');
    if (!ctx) return;
    const imageData = ctx.createImageData(size, size);
    const d = imageData.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = Math.random() * 255;
      d[i] = v; d[i + 1] = v; d[i + 2] = v;
      d[i + 3] = 7; // ~3% opacity
    }
    ctx.putImageData(imageData, 0, 0);
  }, []);

  // Resize handler
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      ctx?.scale(dpr, dpr);
      sizeRef.current = { w: rect.width, h: rect.height };
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Pause when off-screen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const obs = new IntersectionObserver(
      ([e]) => { isVisibleRef.current = e.isIntersecting; },
      { threshold: 0.05 }
    );
    obs.observe(canvas);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handler = () => {
      if (document.hidden && animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = 0;
      }
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  // ─── Main Render Loop ───
  useEffect(() => {
    const canvas = canvasRef.current;
    const grain = grainRef.current;
    if (!canvas || !grain) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = (now: number) => {
      animRef.current = requestAnimationFrame(draw);
      if (!isVisibleRef.current) return;

      const elapsed = (now - startRef.current) / 1000;
      const { w, h } = sizeRef.current;
      if (w === 0 || h === 0) return;
      const isDark = document.documentElement.classList.contains('dark');
      const scale = w / 1920; // scale panels relative to 1920 baseline

      ctx.clearRect(0, 0, w, h);

      // Mouse position in px
      const mx = isDesktop ? (mouseX / 100) * w : -9999;
      const my = isDesktop ? (mouseY / 100) * h : -9999;

      // Parallax offset from mouse (normalized -0.5 to 0.5)
      const parallaxNx = isDesktop ? (mouseX / 100 - 0.5) : 0;
      const parallaxNy = isDesktop ? (mouseY / 100 - 0.5) : 0;

      // ── Draw Glass Panels (back to front by depth) ──
      const sorted = [...PANELS].sort((a, b) => a.depth - b.depth);

      for (const panel of sorted) {
        // Horizontal drift (slow-motion reflection)
        const drift = Math.sin((elapsed / panel.driftPeriod) * Math.PI * 2 + panel.driftPhase) * panel.driftRange * scale;

        // Parallax: deeper panels move less with mouse, front panels move more
        const parallaxStrength = panel.depth * 15 * scale;
        const px = parallaxNx * parallaxStrength;
        const py = parallaxNy * parallaxStrength;

        const cx = panel.cx * w + drift + px;
        const cy = panel.cy * h + py;
        const rw = panel.rectW * scale;
        const rh = panel.rectH * scale;

        const [r, g, b] = isDark ? panel.color.dark : panel.color.light;
        let baseOpacity = isDark ? panel.opacity.dark : panel.opacity.light;

        // ── Mouse Spotlight: boost brightness & saturation near cursor ──
        let spotlightBoost = 0;
        if (isDesktop && mx > 0) {
          const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
          const spotRadius = 150;
          if (dist < spotRadius) {
            spotlightBoost = (1 - dist / spotRadius);
          }
        }

        const finalOpacity = Math.min(baseOpacity + spotlightBoost * baseOpacity * 2.5, 0.3);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(BRAND_ANGLE);

        // ── The Glass Panel Body ──
        // Soft fill with gradient edges to simulate frosted glass blur
        const blurPad = rw * 0.8; // soft edge spread
        const totalW = rw + blurPad * 2;

        // Cross-axis gradient (width direction) for soft blur edges
        const crossGrad = ctx.createLinearGradient(-totalW / 2, 0, totalW / 2, 0);
        crossGrad.addColorStop(0, `rgba(${r},${g},${b}, 0)`);
        crossGrad.addColorStop(blurPad / totalW, `rgba(${r},${g},${b}, ${(finalOpacity * 0.4).toFixed(4)})`);
        crossGrad.addColorStop(0.35, `rgba(${r},${g},${b}, ${(finalOpacity * 0.85).toFixed(4)})`);
        crossGrad.addColorStop(0.5, `rgba(${r},${g},${b}, ${finalOpacity.toFixed(4)})`);
        crossGrad.addColorStop(0.65, `rgba(${r},${g},${b}, ${(finalOpacity * 0.85).toFixed(4)})`);
        crossGrad.addColorStop(1 - blurPad / totalW, `rgba(${r},${g},${b}, ${(finalOpacity * 0.4).toFixed(4)})`);
        crossGrad.addColorStop(1, `rgba(${r},${g},${b}, 0)`);

        ctx.fillStyle = crossGrad;
        // Fade along length too
        ctx.globalAlpha = 1;
        ctx.fillRect(-totalW / 2, -rh / 2, totalW, rh);

        // Top & bottom length fade overlay (erase ends to transparency)
        const fadeLen = rh * 0.2;
        // Top fade
        const topFade = ctx.createLinearGradient(0, -rh / 2, 0, -rh / 2 + fadeLen);
        topFade.addColorStop(0, 'rgba(0,0,0,1)');
        topFade.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.globalCompositeOperation = 'destination-in';
        ctx.fillStyle = topFade;
        ctx.fillRect(-totalW / 2, -rh / 2, totalW, fadeLen);

        // Bottom fade
        const botFade = ctx.createLinearGradient(0, rh / 2 - fadeLen, 0, rh / 2);
        botFade.addColorStop(0, 'rgba(0,0,0,0)');
        botFade.addColorStop(1, 'rgba(0,0,0,1)');
        ctx.fillStyle = botFade;
        ctx.fillRect(-totalW / 2, rh / 2 - fadeLen, totalW, fadeLen);

        // Reset composite before edge refraction
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;

        // ── Edge Refraction — inner glow on panel edges ──
        const edgeAlpha = isDark ? 0.08 + spotlightBoost * 0.12 : 0.06 + spotlightBoost * 0.08;
        const edgeColor = isDark ? `rgba(255,255,255,${edgeAlpha.toFixed(4)})` : `rgba(0,0,0,${(edgeAlpha * 0.5).toFixed(4)})`;

        // Left edge
        ctx.beginPath();
        ctx.moveTo(-rw / 2, -rh / 2 + fadeLen);
        ctx.lineTo(-rw / 2, rh / 2 - fadeLen);
        ctx.strokeStyle = edgeColor;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Right edge
        ctx.beginPath();
        ctx.moveTo(rw / 2, -rh / 2 + fadeLen);
        ctx.lineTo(rw / 2, rh / 2 - fadeLen);
        ctx.stroke();

        ctx.restore();
      }

      // ── Mouse "Reveal" Spotlight — decreases fog, increases clarity ──
      if (isDesktop && mx > 0) {
        const revealRadius = 150;
        const spotGrad = ctx.createRadialGradient(mx, my, 0, mx, my, revealRadius);
        if (isDark) {
          spotGrad.addColorStop(0, 'rgba(160, 190, 240, 0.035)');
          spotGrad.addColorStop(0.5, 'rgba(100, 140, 200, 0.015)');
          spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          spotGrad.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
          spotGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.02)');
          spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }
        ctx.beginPath();
        ctx.arc(mx, my, revealRadius, 0, Math.PI * 2);
        ctx.fillStyle = spotGrad;
        ctx.fill();
      }

      // ── Film Grain overlay (3%) ──
      ctx.globalAlpha = isDark ? 0.03 : 0.025;
      const ox = (Math.random() * 256) | 0;
      const oy = (Math.random() * 256) | 0;
      const pattern = ctx.createPattern(grain, 'repeat');
      if (pattern) {
        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = pattern;
        ctx.fillRect(-ox, -oy, w + 256, h + 256);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [mouseX, mouseY, isDesktop]);

  return (
    <>
      <canvas ref={grainRef} className="hidden" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default GeometricKinetic;
