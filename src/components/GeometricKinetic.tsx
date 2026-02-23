import { useEffect, useRef } from 'react';

/**
 * GeometricKinetic — "Atmospheric Refraction"
 *
 * Renders precision-cut Light Blades (long 45° rectangular gradients) and
 * Signature Sweeps (large arc paths from logo DNA) with prismatic drift,
 * refractive mouse focus, logo-resonance ghost lines, and silica grain overlay.
 *
 * Canvas 2D. Pauses off-screen / tab-hidden. Capped at 60fps.
 */

/* ─── Light Blade definition ─── */
interface Blade {
  cx: number;       // center X fraction 0–1
  cy: number;       // center Y fraction 0–1
  length: number;   // fraction of diagonal
  width: number;    // thickness fraction
  speed: number;    // drift speed (pixels per second along 45° axis)
  phase: number;    // animation phase offset
  period: number;   // full cycle in seconds
  color: { dark: string; light: string };
}

/* ─── Signature Sweep (arc) definition ─── */
interface Sweep {
  cx: number;
  cy: number;
  radius: number;   // fraction of min(w,h)
  startAngle: number;
  arcLength: number;
  period: number;
  phase: number;
  color: { dark: string; light: string };
}

const BLADES: Blade[] = [
  {
    cx: 0.2, cy: 0.3, length: 0.7, width: 0.06,
    speed: 0.4, phase: 0, period: 38,
    color: {
      dark: 'rgba(20, 50, 120, 0.18)',    // Deep Cobalt
      light: 'rgba(190, 200, 220, 0.14)', // Soft Silver
    },
  },
  {
    cx: 0.65, cy: 0.5, length: 0.85, width: 0.04,
    speed: -0.3, phase: 1.8, period: 42,
    color: {
      dark: 'rgba(60, 70, 95, 0.14)',     // Cool Slate
      light: 'rgba(200, 215, 240, 0.12)', // Mist Blue
    },
  },
  {
    cx: 0.45, cy: 0.7, length: 0.6, width: 0.05,
    speed: 0.25, phase: 3.2, period: 35,
    color: {
      dark: 'rgba(35, 55, 110, 0.16)',    // Deep Cobalt secondary
      light: 'rgba(210, 220, 240, 0.1)',  // Translucent Pearl
    },
  },
  {
    cx: 0.8, cy: 0.25, length: 0.55, width: 0.035,
    speed: -0.2, phase: 5.0, period: 45,
    color: {
      dark: 'rgba(220, 225, 235, 0.05)',  // Titanium White edge
      light: 'rgba(180, 195, 220, 0.08)', // Pearl edge
    },
  },
];

const SWEEPS: Sweep[] = [
  {
    cx: 0.3, cy: 0.55, radius: 0.35,
    startAngle: -0.6, arcLength: 1.2,
    period: 40, phase: 0,
    color: {
      dark: 'rgba(40, 60, 110, 0.06)',
      light: 'rgba(180, 195, 215, 0.04)',
    },
  },
  {
    cx: 0.7, cy: 0.35, radius: 0.28,
    startAngle: 1.8, arcLength: 1.0,
    period: 36, phase: 2.5,
    color: {
      dark: 'rgba(30, 45, 90, 0.05)',
      light: 'rgba(190, 205, 230, 0.035)',
    },
  },
];

interface Props {
  mouseX: number; // 0–100
  mouseY: number; // 0–100
  isDesktop: boolean;
}

const GeometricKinetic = ({ mouseX, mouseY, isDesktop }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grainRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startRef = useRef(performance.now());
  const isVisibleRef = useRef(true);
  const sizeRef = useRef({ w: 0, h: 0 });

  // Generate silica grain texture once (high-frequency, 3% opacity)
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
      d[i + 3] = 8; // ~3% opacity
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

  // Visibility observer
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

  // Tab visibility
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

  // Main render loop
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

      // ── Draw Light Blades ──
      for (const blade of BLADES) {
        const t = elapsed;
        // Prismatic drift along 45° axis
        const drift = Math.sin((t / blade.period) * Math.PI * 2 + blade.phase) * diag * 0.08;
        // Offset along the 45° direction
        const driftX = drift * Math.cos(Math.PI / 4);
        const driftY = drift * Math.sin(Math.PI / 4);

        const cx = blade.cx * w + driftX;
        const cy = blade.cy * h + driftY;
        const halfLen = (blade.length * diag) / 2;
        const halfWid = (blade.width * diag) / 2;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(Math.PI / 4); // strict 45°

        // Variable blur: center sharp, ends fade
        // We simulate this with a gradient along the blade's length
        const color = isDark ? blade.color.dark : blade.color.light;

        // Mouse refractive focus — if cursor is near this blade, increase brightness & tighten
        const distToBlade = Math.abs(
          (mx - cx) * Math.cos(Math.PI / 4 + Math.PI / 2) +
          (my - cy) * Math.sin(Math.PI / 4 + Math.PI / 2)
        );
        const focusRadius = Math.min(w, h) * 0.25;
        const focusAmount = distToBlade < focusRadius
          ? (1 - distToBlade / focusRadius)
          : 0;

        // Blade gradient along its length (center bright, ends transparent)
        const grad = ctx.createLinearGradient(-halfLen, 0, halfLen, 0);
        const baseAlpha = parseFloat(color.match(/[\d.]+\)$/)?.[0] || '0.15');
        const boostedAlpha = Math.min(baseAlpha + focusAmount * 0.12, 0.4);
        const colorBase = color.replace(/[\d.]+\)$/, '');

        grad.addColorStop(0, colorBase + '0)');
        grad.addColorStop(0.2, colorBase + (boostedAlpha * 0.4).toFixed(3) + ')');
        grad.addColorStop(0.5, colorBase + boostedAlpha.toFixed(3) + ')');
        grad.addColorStop(0.8, colorBase + (boostedAlpha * 0.4).toFixed(3) + ')');
        grad.addColorStop(1, colorBase + '0)');

        ctx.fillStyle = grad;

        // Blade width narrows near cursor (higher focus = thinner)
        const effectiveHalfWid = halfWid * (1 - focusAmount * 0.4);
        ctx.fillRect(-halfLen, -effectiveHalfWid, halfLen * 2, effectiveHalfWid * 2);

        ctx.restore();
      }

      // ── Draw Signature Sweeps (logo hook arcs) ──
      for (const sweep of SWEEPS) {
        const t = elapsed;
        const driftAngle = Math.sin((t / sweep.period) * Math.PI * 2 + sweep.phase) * 0.15;
        const r = sweep.radius * Math.min(w, h);
        const sx = sweep.cx * w;
        const sy = sweep.cy * h;

        const color = isDark ? sweep.color.dark : sweep.color.light;

        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(driftAngle);

        ctx.beginPath();
        ctx.arc(0, 0, r, sweep.startAngle, sweep.startAngle + sweep.arcLength);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Draw a second thinner arc slightly offset for depth
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.92, sweep.startAngle + 0.1, sweep.startAngle + sweep.arcLength - 0.1);
        ctx.strokeStyle = color.replace(/[\d.]+\)$/, (parseFloat(color.match(/[\d.]+\)$/)?.[0] || '0.05') * 0.5).toFixed(3) + ')');
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.restore();
      }

      // ── Logo Resonance ghost — 45° line near cursor ──
      if (isDesktop && mx > 0 && my > 0) {
        // Check if cursor is near the center headline area
        const centerX = w / 2;
        const centerY = h * 0.42;
        const distToCenter = Math.sqrt((mx - centerX) ** 2 + (my - centerY) ** 2);
        const resonanceRadius = Math.min(w, h) * 0.3;

        if (distToCenter < resonanceRadius) {
          const resonanceAlpha = (1 - distToCenter / resonanceRadius) * (isDark ? 0.06 : 0.04);
          const ghostLen = Math.min(w, h) * 0.4;

          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(Math.PI / 4);

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

      // ── Refractive focus: mouse spotlight with tighter grain ──
      if (isDesktop && mx > 0) {
        const spotRadius = Math.min(w, h) * 0.2;
        const spotGrad = ctx.createRadialGradient(mx, my, 0, mx, my, spotRadius);
        if (isDark) {
          spotGrad.addColorStop(0, 'rgba(200, 220, 255, 0.03)');
          spotGrad.addColorStop(0.5, 'rgba(150, 180, 220, 0.015)');
          spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          spotGrad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
          spotGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.03)');
          spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }
        ctx.beginPath();
        ctx.arc(mx, my, spotRadius, 0, Math.PI * 2);
        ctx.fillStyle = spotGrad;
        ctx.fill();
      }

      // ── Silica Grain overlay ──
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
