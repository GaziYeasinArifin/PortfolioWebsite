import { useEffect, useRef } from 'react';

/**
 * GeometricKinetic — "Atmospheric Refraction" v3
 *
 * Brand-exact geometry from the NY logo (~62° angle). Paired parallel Light Blades
 * with shadow/light opacity. Signature Hook arcs in corners. Chromatic aberration
 * at blade tips. Soft-focus → sharp mouse interaction. Silica grain overlay.
 */

/* ─── Brand angle: ~62° from horizontal (NY logo diagonal) ─── */
const BRAND_ANGLE = (62 * Math.PI) / 180;
const COS_A = Math.cos(BRAND_ANGLE);
const SIN_A = Math.sin(BRAND_ANGLE);

/* ─── Paired Light Blade definition ─── */
interface BladePair {
  cx: number;
  cy: number;
  length: number;
  primaryWidth: number;
  secondaryWidth: number;
  spacing: number; // gap between paired blades (fraction of diag)
  speed: number;
  phase: number;
  period: number;
  colorPrimary: { dark: string; light: string };
  colorSecondary: { dark: string; light: string };
}

/* ─── Signature Hook Arc ─── */
interface HookArc {
  cx: number;
  cy: number;
  radius: number;
  startAngle: number;
  arcLength: number;
  period: number;
  phase: number;
  color: { dark: string; light: string };
}

const BLADE_PAIRS: BladePair[] = [
  {
    cx: 0.18, cy: 0.25, length: 0.75, primaryWidth: 0.045, secondaryWidth: 0.025,
    spacing: 0.035, speed: 0.35, phase: 0, period: 40,
    colorPrimary: { dark: 'rgba(18, 42, 110, 0.20)', light: 'rgba(185, 195, 220, 0.15)' },
    colorSecondary: { dark: 'rgba(18, 42, 110, 0.08)', light: 'rgba(185, 195, 220, 0.06)' },
  },
  {
    cx: 0.62, cy: 0.45, length: 0.9, primaryWidth: 0.035, secondaryWidth: 0.02,
    spacing: 0.03, speed: -0.28, phase: 2.0, period: 44,
    colorPrimary: { dark: 'rgba(50, 60, 95, 0.16)', light: 'rgba(195, 210, 240, 0.13)' },
    colorSecondary: { dark: 'rgba(50, 60, 95, 0.06)', light: 'rgba(195, 210, 240, 0.05)' },
  },
  {
    cx: 0.4, cy: 0.72, length: 0.65, primaryWidth: 0.04, secondaryWidth: 0.022,
    spacing: 0.028, speed: 0.22, phase: 3.5, period: 38,
    colorPrimary: { dark: 'rgba(28, 48, 105, 0.17)', light: 'rgba(205, 215, 238, 0.11)' },
    colorSecondary: { dark: 'rgba(28, 48, 105, 0.07)', light: 'rgba(205, 215, 238, 0.04)' },
  },
  {
    cx: 0.82, cy: 0.2, length: 0.5, primaryWidth: 0.028, secondaryWidth: 0.015,
    spacing: 0.022, speed: -0.18, phase: 5.2, period: 42,
    colorPrimary: { dark: 'rgba(210, 218, 235, 0.06)', light: 'rgba(175, 190, 220, 0.08)' },
    colorSecondary: { dark: 'rgba(210, 218, 235, 0.025)', light: 'rgba(175, 190, 220, 0.03)' },
  },
];

const HOOK_ARCS: HookArc[] = [
  {
    cx: 0.08, cy: 0.85, radius: 0.42,
    startAngle: -0.8, arcLength: 1.1,
    period: 50, phase: 0,
    color: { dark: 'rgba(30, 50, 100, 0.05)', light: 'rgba(180, 195, 215, 0.035)' },
  },
  {
    cx: 0.92, cy: 0.12, radius: 0.35,
    startAngle: 2.0, arcLength: 0.9,
    period: 46, phase: 2.8,
    color: { dark: 'rgba(25, 40, 85, 0.04)', light: 'rgba(190, 205, 228, 0.03)' },
  },
];

interface Props {
  mouseX: number;
  mouseY: number;
  isDesktop: boolean;
}

const GeometricKinetic = ({ mouseX, mouseY, isDesktop }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grainRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startRef = useRef(performance.now());
  const isVisibleRef = useRef(true);
  const sizeRef = useRef({ w: 0, h: 0 });
  const mouseSpeedRef = useRef(0);
  const lastMouseRef = useRef({ x: 0, y: 0, t: 0 });

  // Generate silica grain texture once
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
      d[i + 3] = 8;
    }
    ctx.putImageData(imageData, 0, 0);
  }, []);

  // Resize
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

  // Visibility
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

  // Main render
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
      const diag = Math.sqrt(w * w + h * h);

      ctx.clearRect(0, 0, w, h);

      const mx = isDesktop ? (mouseX / 100) * w : -9999;
      const my = isDesktop ? (mouseY / 100) * h : -9999;

      // Track mouse speed for focus state
      const nowMs = performance.now();
      const dt = (nowMs - lastMouseRef.current.t) / 1000;
      if (dt > 0) {
        const dx = mx - lastMouseRef.current.x;
        const dy = my - lastMouseRef.current.y;
        const speed = Math.sqrt(dx * dx + dy * dy) / dt;
        mouseSpeedRef.current = mouseSpeedRef.current * 0.9 + speed * 0.1;
      }
      lastMouseRef.current = { x: mx, y: my, t: nowMs };

      // Focus amount: moving mouse = sharp, stationary = soft
      const isMoving = mouseSpeedRef.current > 5;
      const globalFocusMix = isMoving ? Math.min(mouseSpeedRef.current / 200, 1) : 0;

      // Helper: parse alpha from rgba string
      const parseAlpha = (c: string) => parseFloat(c.match(/[\d.]+\)$/)?.[0] || '0.1');
      const replaceAlpha = (c: string, a: number) => c.replace(/[\d.]+\)$/, a.toFixed(4) + ')');

      // ── Draw Paired Light Blades ──
      for (const pair of BLADE_PAIRS) {
        const drift = Math.sin((elapsed / pair.period) * Math.PI * 2 + pair.phase) * diag * 0.07;
        const driftX = drift * COS_A;
        const driftY = drift * SIN_A;

        const cx = pair.cx * w + driftX;
        const cy = pair.cy * h + driftY;
        const halfLen = (pair.length * diag) / 2;

        // Distance from mouse to blade axis (perpendicular)
        const perpDist = Math.abs(
          (mx - cx) * Math.cos(BRAND_ANGLE + Math.PI / 2) +
          (my - cy) * Math.sin(BRAND_ANGLE + Math.PI / 2)
        );
        const focusRadius = Math.min(w, h) * 0.28;
        const localFocus = perpDist < focusRadius
          ? (1 - perpDist / focusRadius) * globalFocusMix
          : 0;

        // Draw primary and secondary (shadow) blade
        for (let bi = 0; bi < 2; bi++) {
          const isPrimary = bi === 0;
          const colorStr = isDark
            ? (isPrimary ? pair.colorPrimary.dark : pair.colorSecondary.dark)
            : (isPrimary ? pair.colorPrimary.light : pair.colorSecondary.light);
          const halfWid = ((isPrimary ? pair.primaryWidth : pair.secondaryWidth) * diag) / 2;
          const offset = isPrimary ? 0 : pair.spacing * diag;

          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(BRAND_ANGLE);
          ctx.translate(0, isPrimary ? 0 : offset);

          // Soft-focus → sharp: blur simulation via alpha modulation
          const baseAlpha = parseAlpha(colorStr);
          const focusedAlpha = Math.min(baseAlpha + localFocus * 0.15, 0.45);
          const focusedWidth = halfWid * (1 - localFocus * 0.35);

          const grad = ctx.createLinearGradient(-halfLen, 0, halfLen, 0);
          const colorBase = colorStr.replace(/[\d.]+\)$/, '');

          // Variable blur: sharper center, ethereal ends
          const sharpness = 0.15 + localFocus * 0.2; // tighter center in focus
          grad.addColorStop(0, colorBase + '0)');
          grad.addColorStop(sharpness, colorBase + (focusedAlpha * 0.35).toFixed(4) + ')');
          grad.addColorStop(0.5, colorBase + focusedAlpha.toFixed(4) + ')');
          grad.addColorStop(1 - sharpness, colorBase + (focusedAlpha * 0.35).toFixed(4) + ')');
          grad.addColorStop(1, colorBase + '0)');

          ctx.fillStyle = grad;
          ctx.fillRect(-halfLen, -focusedWidth, halfLen * 2, focusedWidth * 2);

          // ── Chromatic Aberration at blade tips ──
          if (isPrimary) {
            const tipLen = halfLen * 0.15;
            const aberrationAlpha = isDark ? 0.08 : 0.06;

            // Cyan tip (left end)
            ctx.fillStyle = `rgba(0, 200, 255, ${(aberrationAlpha * (0.5 + localFocus * 0.5)).toFixed(4)})`;
            ctx.fillRect(-halfLen - 1, -focusedWidth * 0.5, tipLen, focusedWidth);

            // Magenta tip (right end)
            ctx.fillStyle = `rgba(220, 0, 255, ${(aberrationAlpha * (0.5 + localFocus * 0.5)).toFixed(4)})`;
            ctx.fillRect(halfLen - tipLen + 1, -focusedWidth * 0.5, tipLen, focusedWidth);
          }

          ctx.restore();
        }
      }

      // ── Signature Hook Arcs (corners, 50% slower drift) ──
      for (const hook of HOOK_ARCS) {
        const driftAngle = Math.sin((elapsed / hook.period) * Math.PI * 2 + hook.phase) * 0.08;
        const r = hook.radius * Math.min(w, h);
        const hx = hook.cx * w;
        const hy = hook.cy * h;
        const color = isDark ? hook.color.dark : hook.color.light;

        ctx.save();
        ctx.translate(hx, hy);
        ctx.rotate(driftAngle);

        // Main arc — thick frosted stroke
        ctx.beginPath();
        ctx.arc(0, 0, r, hook.startAngle, hook.startAngle + hook.arcLength);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Inner companion arc — thinner, fainter
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.93, hook.startAngle + 0.08, hook.startAngle + hook.arcLength - 0.08);
        ctx.strokeStyle = replaceAlpha(color, parseAlpha(color) * 0.4);
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.restore();
      }

      // ── Logo Resonance ghost — brand-angle line near headline ──
      if (isDesktop && mx > 0 && my > 0) {
        const centerX = w / 2;
        const centerY = h * 0.42;
        const distToCenter = Math.sqrt((mx - centerX) ** 2 + (my - centerY) ** 2);
        const resonanceRadius = Math.min(w, h) * 0.3;

        if (distToCenter < resonanceRadius) {
          const resonanceAlpha = (1 - distToCenter / resonanceRadius) * (isDark ? 0.06 : 0.04);
          const ghostLen = Math.min(w, h) * 0.4;

          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(BRAND_ANGLE);

          const ghostGrad = ctx.createLinearGradient(-ghostLen / 2, 0, ghostLen / 2, 0);
          const ghostColor = isDark ? '255, 255, 255' : '0, 0, 0';
          ghostGrad.addColorStop(0, `rgba(${ghostColor}, 0)`);
          ghostGrad.addColorStop(0.5, `rgba(${ghostColor}, ${resonanceAlpha})`);
          ghostGrad.addColorStop(1, `rgba(${ghostColor}, 0)`);

          ctx.strokeStyle = ghostGrad;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(-ghostLen / 2, 0);
          ctx.lineTo(ghostLen / 2, 0);
          ctx.stroke();

          ctx.restore();
        }
      }

      // ── Refractive focus spotlight ──
      if (isDesktop && mx > 0 && globalFocusMix > 0.01) {
        const spotRadius = Math.min(w, h) * 0.18;
        const spotGrad = ctx.createRadialGradient(mx, my, 0, mx, my, spotRadius);
        const spotAlpha = globalFocusMix * 0.04;
        if (isDark) {
          spotGrad.addColorStop(0, `rgba(200, 220, 255, ${spotAlpha.toFixed(4)})`);
          spotGrad.addColorStop(0.5, `rgba(150, 180, 220, ${(spotAlpha * 0.4).toFixed(4)})`);
          spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          spotGrad.addColorStop(0, `rgba(255, 255, 255, ${(spotAlpha * 2).toFixed(4)})`);
          spotGrad.addColorStop(0.4, `rgba(255, 255, 255, ${(spotAlpha * 0.8).toFixed(4)})`);
          spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }
        ctx.beginPath();
        ctx.arc(mx, my, spotRadius, 0, Math.PI * 2);
        ctx.fillStyle = spotGrad;
        ctx.fill();
      }

      // ── Silica Grain overlay (3%) ──
      ctx.globalAlpha = isDark ? 0.04 : 0.03;
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
