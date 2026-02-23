import { useEffect, useRef } from 'react';

/**
 * Prismatic Refraction — "Living Light" v4
 *
 * Brand-exact geometry from the NY logo (~65° angle). Elongated Light Ribbons
 * with variable widths (1px–200px). Sweeping Hook Arcs in periphery.
 * Flashlight mouse effect with sharpening. Silica grain overlay.
 * 30-second pendulum drift along the brand diagonal.
 * All opacities halved and blur maximised for ethereal atmosphere.
 */

/* ─── Brand angle: 65° from horizontal (NY logo diagonal) ─── */
const BRAND_ANGLE = (65 * Math.PI) / 180;
const COS_A = Math.cos(BRAND_ANGLE);
const SIN_A = Math.sin(BRAND_ANGLE);

/* ─── Light Ribbon definition ─── */
interface LightRibbon {
  cx: number;
  cy: number;
  length: number;       // fraction of diagonal
  width: number;        // fraction of diagonal (variable: thin=0.001, broad=0.12)
  speed: number;        // pendulum drift multiplier
  phase: number;
  period: number;       // seconds for full pendulum cycle (~30s)
  color: { dark: string; light: string };
}

/* ─── Sweeping Arc ─── */
interface SweepingArc {
  cx: number;
  cy: number;
  radius: number;
  startAngle: number;
  arcLength: number;
  period: number;
  phase: number;
  color: { dark: string; light: string };
}

const RIBBONS: LightRibbon[] = [
  // Broad ribbon — Deep Indigo
  {
    cx: 0.22, cy: 0.3, length: 0.85, width: 0.10,
    speed: 0.4, phase: 0, period: 30,
    color: { dark: 'rgba(25, 30, 90, 0.10)', light: 'rgba(200, 210, 235, 0.08)' },
  },
  // Medium ribbon — Electric Cyan
  {
    cx: 0.55, cy: 0.5, length: 0.95, width: 0.06,
    speed: -0.32, phase: 1.8, period: 32,
    color: { dark: 'rgba(0, 170, 210, 0.08)', light: 'rgba(180, 220, 240, 0.07)' },
  },
  // Thin hairline — Slate Grey
  {
    cx: 0.38, cy: 0.65, length: 0.7, width: 0.002,
    speed: 0.25, phase: 3.2, period: 28,
    color: { dark: 'rgba(100, 116, 139, 0.12)', light: 'rgba(160, 175, 195, 0.10)' },
  },
  // Medium-thin — Deep Indigo variant
  {
    cx: 0.75, cy: 0.25, length: 0.6, width: 0.035,
    speed: -0.2, phase: 4.8, period: 34,
    color: { dark: 'rgba(30, 40, 100, 0.07)', light: 'rgba(210, 220, 242, 0.06)' },
  },
  // Ultra-thin hairline — Cyan accent
  {
    cx: 0.48, cy: 0.42, length: 0.55, width: 0.001,
    speed: 0.15, phase: 6.0, period: 36,
    color: { dark: 'rgba(0, 200, 255, 0.10)', light: 'rgba(170, 210, 230, 0.08)' },
  },
];

const SWEEPING_ARCS: SweepingArc[] = [
  {
    cx: 0.05, cy: 0.88, radius: 0.50,
    startAngle: -0.6, arcLength: 1.3,
    period: 55, phase: 0,
    color: { dark: 'rgba(25, 35, 80, 0.025)', light: 'rgba(190, 205, 225, 0.02)' },
  },
  {
    cx: 0.95, cy: 0.08, radius: 0.42,
    startAngle: 2.2, arcLength: 1.0,
    period: 50, phase: 3.0,
    color: { dark: 'rgba(20, 30, 70, 0.02)', light: 'rgba(200, 215, 235, 0.018)' },
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
      d[i + 3] = 6; // ~2.5% opacity
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

      // ── Draw Light Ribbons with massive blur simulation ──
      for (const ribbon of RIBBONS) {
        // Pendulum drift along brand diagonal (30s cycle)
        const pendulum = Math.sin((elapsed / ribbon.period) * Math.PI * 2 + ribbon.phase);
        const driftMag = diag * 0.08 * ribbon.speed;
        const driftX = pendulum * driftMag * COS_A;
        const driftY = pendulum * driftMag * SIN_A;

        const cx = ribbon.cx * w + driftX;
        const cy = ribbon.cy * h + driftY;
        const halfLen = (ribbon.length * diag) / 2;
        const halfWid = Math.max((ribbon.width * diag) / 2, 0.5);

        // Mouse flashlight: increase brightness near cursor
        let flashlightBoost = 0;
        if (isDesktop && mx > 0) {
          const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
          const flashRadius = 200;
          if (dist < flashRadius) {
            flashlightBoost = (1 - dist / flashRadius) * 0.6;
          }
        }

        const colorStr = isDark ? ribbon.color.dark : ribbon.color.light;
        const baseAlpha = parseFloat(colorStr.match(/[\d.]+\)$/)?.[0] || '0.1');
        const boostedAlpha = Math.min(baseAlpha + flashlightBoost * baseAlpha * 3, 0.35);
        const colorBase = colorStr.replace(/[\d.]+\)$/, '');

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(BRAND_ANGLE);

        // Simulate extreme blur with very wide gradient falloff
        // For broad ribbons, the gradient extends well beyond the geometric width
        const blurSpread = halfWid + Math.max(halfWid * 3, 40); // atmospheric spread

        const grad = ctx.createLinearGradient(0, -blurSpread, 0, blurSpread);
        grad.addColorStop(0, colorBase + '0)');
        grad.addColorStop(0.2, colorBase + (boostedAlpha * 0.15).toFixed(4) + ')');
        grad.addColorStop(0.4, colorBase + (boostedAlpha * 0.6).toFixed(4) + ')');
        grad.addColorStop(0.5, colorBase + boostedAlpha.toFixed(4) + ')');
        grad.addColorStop(0.6, colorBase + (boostedAlpha * 0.6).toFixed(4) + ')');
        grad.addColorStop(0.8, colorBase + (boostedAlpha * 0.15).toFixed(4) + ')');
        grad.addColorStop(1, colorBase + '0)');

        // Also fade along length
        const lengthGrad = ctx.createLinearGradient(-halfLen, 0, halfLen, 0);
        lengthGrad.addColorStop(0, 'rgba(255,255,255,0)');
        lengthGrad.addColorStop(0.15, 'rgba(255,255,255,1)');
        lengthGrad.addColorStop(0.85, 'rgba(255,255,255,1)');
        lengthGrad.addColorStop(1, 'rgba(255,255,255,0)');

        // Draw the ribbon as a very soft rectangle
        ctx.fillStyle = grad;
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillRect(-halfLen, -blurSpread, halfLen * 2, blurSpread * 2);

        ctx.restore();
      }

      // ── Sweeping Arcs (periphery) ──
      for (const arc of SWEEPING_ARCS) {
        const driftAngle = Math.sin((elapsed / arc.period) * Math.PI * 2 + arc.phase) * 0.06;
        const r = arc.radius * Math.min(w, h);
        const ax = arc.cx * w;
        const ay = arc.cy * h;
        const color = isDark ? arc.color.dark : arc.color.light;

        ctx.save();
        ctx.translate(ax, ay);
        ctx.rotate(driftAngle);

        ctx.beginPath();
        ctx.arc(0, 0, r, arc.startAngle, arc.startAngle + arc.arcLength);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Inner companion
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.92, arc.startAngle + 0.1, arc.startAngle + arc.arcLength - 0.1);
        const innerAlpha = parseFloat(color.match(/[\d.]+\)$/)?.[0] || '0.02') * 0.4;
        ctx.strokeStyle = color.replace(/[\d.]+\)$/, innerAlpha.toFixed(4) + ')');
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.restore();
      }

      // ── Flashlight Focus Spotlight ──
      if (isDesktop && mx > 0) {
        const spotRadius = 200;
        const spotGrad = ctx.createRadialGradient(mx, my, 0, mx, my, spotRadius);
        const spotAlpha = 0.04;
        if (isDark) {
          spotGrad.addColorStop(0, `rgba(180, 210, 255, ${spotAlpha})`);
          spotGrad.addColorStop(0.4, `rgba(120, 160, 220, ${(spotAlpha * 0.5).toFixed(4)})`);
          spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          spotGrad.addColorStop(0, `rgba(255, 255, 255, ${(spotAlpha * 1.5).toFixed(4)})`);
          spotGrad.addColorStop(0.35, `rgba(255, 255, 255, ${(spotAlpha * 0.6).toFixed(4)})`);
          spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }
        ctx.beginPath();
        ctx.arc(mx, my, spotRadius, 0, Math.PI * 2);
        ctx.fillStyle = spotGrad;
        ctx.fill();
      }

      // ── Silica Grain overlay ──
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
