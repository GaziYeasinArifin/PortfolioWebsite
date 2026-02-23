import { useEffect, useRef } from 'react';

/**
 * AtmosphericBackground — "Light behind frosted glass"
 *
 * Renders 4 large blurred light orbs with slow pendulum drift,
 * a film-grain noise overlay, and a mouse-driven illumination spotlight.
 * Pure Canvas 2D — no dependencies. Pauses when hero is off-screen or tab hidden.
 */

interface Orb {
  cx: number;       // center X as fraction 0–1
  cy: number;       // center Y as fraction 0–1
  rx: number;       // radius X multiplier
  ry: number;       // radius Y multiplier
  periodX: number;  // seconds for full X cycle
  periodY: number;  // seconds for full Y cycle
  phaseX: number;   // initial phase offset
  phaseY: number;
  color: { dark: string; light: string };
}

const ORBS: Orb[] = [
  {
    cx: 0.25, cy: 0.3, rx: 0.35, ry: 0.25,
    periodX: 25, periodY: 30, phaseX: 0, phaseY: 0.5,
    color: {
      dark: 'rgba(30, 27, 75, 0.5)',     // Deep Indigo
      light: 'rgba(220, 225, 240, 0.45)', // Soft Pearl
    },
  },
  {
    cx: 0.75, cy: 0.5, rx: 0.3, ry: 0.3,
    periodX: 28, periodY: 22, phaseX: 1.2, phaseY: 0,
    color: {
      dark: 'rgba(20, 60, 120, 0.35)',    // Electric Blue sliver
      light: 'rgba(200, 218, 245, 0.4)',  // Sky-blue hint
    },
  },
  {
    cx: 0.5, cy: 0.7, rx: 0.4, ry: 0.35,
    periodX: 32, periodY: 26, phaseX: 2.5, phaseY: 1.8,
    color: {
      dark: 'rgba(40, 45, 60, 0.4)',      // Muted Slate Grey
      light: 'rgba(210, 215, 225, 0.35)', // Silver
    },
  },
  {
    cx: 0.6, cy: 0.25, rx: 0.25, ry: 0.2,
    periodX: 20, periodY: 35, phaseX: 3.8, phaseY: 2.2,
    color: {
      dark: 'rgba(25, 35, 80, 0.3)',      // Deep Indigo secondary
      light: 'rgba(230, 235, 250, 0.3)',  // Pearl secondary
    },
  },
];

interface Props {
  mouseX: number; // 0–100
  mouseY: number; // 0–100
  isDesktop: boolean;
}

const AtmosphericBackground = ({ mouseX, mouseY, isDesktop }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grainRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef(performance.now());
  const isVisibleRef = useRef(true);

  // Generate static grain texture once
  useEffect(() => {
    const grain = grainRef.current;
    if (!grain) return;
    const size = 256;
    grain.width = size;
    grain.height = size;
    const ctx = grain.getContext('2d');
    if (!ctx) return;
    const imageData = ctx.createImageData(size, size);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = Math.random() * 255;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 12; // ~4.7% opacity
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
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // IntersectionObserver to pause when off-screen
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Pause on tab hidden
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

      const elapsed = (now - startTimeRef.current) / 1000;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const isDark = document.documentElement.classList.contains('dark');

      // Clear
      ctx.clearRect(0, 0, w, h);

      // ── Draw orbs ──
      for (const orb of ORBS) {
        const t = elapsed;
        // Slow pendulum via sine
        const ox = Math.sin((t / orb.periodX) * Math.PI * 2 + orb.phaseX) * w * 0.08;
        const oy = Math.sin((t / orb.periodY) * Math.PI * 2 + orb.phaseY) * h * 0.06;
        const x = orb.cx * w + ox;
        const y = orb.cy * h + oy;
        const radiusX = orb.rx * w;
        const radiusY = orb.ry * h;
        const radius = Math.max(radiusX, radiusY);

        const color = isDark ? orb.color.dark : orb.color.light;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, color);
        grad.addColorStop(0.5, color.replace(/[\d.]+\)$/, '0.15)'));
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // ── Mouse illumination spotlight ──
      if (isDesktop) {
        const mx = (mouseX / 100) * w;
        const my = (mouseY / 100) * h;
        const spotRadius = Math.min(w, h) * 0.35;

        const spotGrad = ctx.createRadialGradient(mx, my, 0, mx, my, spotRadius);
        if (isDark) {
          spotGrad.addColorStop(0, 'rgba(255, 255, 255, 0.04)');
          spotGrad.addColorStop(0.4, 'rgba(180, 210, 255, 0.02)');
          spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          spotGrad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
          spotGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.05)');
          spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }

        ctx.beginPath();
        ctx.arc(mx, my, spotRadius, 0, Math.PI * 2);
        ctx.fillStyle = spotGrad;
        ctx.fill();
      }

      // ── Film grain overlay ──
      ctx.globalAlpha = isDark ? 0.06 : 0.04;
      // Tile the 256px grain texture across the canvas with a random offset for shimmer
      const grainOffsetX = (Math.random() * 256) | 0;
      const grainOffsetY = (Math.random() * 256) | 0;
      const pattern = ctx.createPattern(grain, 'repeat');
      if (pattern) {
        ctx.save();
        ctx.translate(grainOffsetX, grainOffsetY);
        ctx.fillStyle = pattern;
        ctx.fillRect(-grainOffsetX, -grainOffsetY, w + 256, h + 256);
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
      {/* Off-screen grain source */}
      <canvas ref={grainRef} className="hidden" />
      {/* Main atmospheric canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </>
  );
};

export default AtmosphericBackground;
