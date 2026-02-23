import { useEffect, useRef } from 'react';

/**
 * GeometricKinetic — Architectural hero background
 *
 * Renders floating geometric fragments derived from the logo's DNA:
 * - Parallel diagonals (45° slashes like N/Y stems)
 * - Hook curves (L-shaped paths with rounded outer corners)
 * - Open arc paths
 *
 * Mouse acts as "magnet for order" — fragments near cursor align to grid axes,
 * then drift back to their deconstructed 45° state when cursor leaves.
 */

type FragmentKind = 'diagonal' | 'hook' | 'arc';

interface Fragment {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAngle: number;     // deconstructed angle (multiples of 45°)
  currentAngle: number;  // rendered angle
  targetAngle: number;   // where it's heading
  rotSpeed: number;      // slow rotation period
  rotTimer: number;
  kind: FragmentKind;
  depth: number;         // 0–1 for parallax layering
  lineWidth: number;
}

interface Props {
  mouseX: number; // 0–100
  mouseY: number; // 0–100
  isDesktop: boolean;
}

const FRAGMENT_COUNT = 14;
const INFLUENCE_RADIUS = 300;
const ALIGN_SPEED = 0.03;    // how fast fragments align to grid near cursor
const DRIFT_BACK_SPEED = 0.008; // how slowly they return to 45° state

// Rotation targets: only 0, 45, 90, 135, 180 (logo math)
const LOGO_ANGLES = [0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4, Math.PI];
// Grid-aligned angles (horizontal/vertical)
const GRID_ANGLES = [0, Math.PI / 2, Math.PI];

function createFragments(w: number, h: number): Fragment[] {
  const fragments: Fragment[] = [];
  const kinds: FragmentKind[] = ['diagonal', 'hook', 'arc'];
  const scale = Math.min(w, h) / 900; // responsive scaling

  for (let i = 0; i < FRAGMENT_COUNT; i++) {
    const kind = kinds[i % 3];
    const baseAngle = LOGO_ANGLES[Math.floor(Math.random() * LOGO_ANGLES.length)];
    const depth = 0.3 + Math.random() * 0.7;

    fragments.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.12 * depth,
      vy: (Math.random() - 0.5) * 0.08 * depth,
      size: (60 + Math.random() * 120) * scale,
      baseAngle,
      currentAngle: baseAngle,
      targetAngle: baseAngle,
      rotSpeed: 10 + Math.random() * 8, // 10–18s per rotation event
      rotTimer: Math.random() * 15,
      kind,
      depth,
      lineWidth: (0.5 + Math.random() * 0.5) * Math.max(scale, 0.6),
    });
  }
  return fragments;
}

// Draw a single fragment path
function drawFragment(ctx: CanvasRenderingContext2D, f: Fragment) {
  ctx.save();
  ctx.translate(f.x, f.y);
  ctx.rotate(f.currentAngle);
  ctx.lineWidth = f.lineWidth;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const s = f.size;

  ctx.beginPath();
  switch (f.kind) {
    case 'diagonal':
      // Two parallel 45° slashes — like N stems
      ctx.moveTo(-s * 0.5, -s * 0.4);
      ctx.lineTo(s * 0.2, s * 0.4);
      ctx.moveTo(-s * 0.25, -s * 0.4);
      ctx.lineTo(s * 0.45, s * 0.4);
      break;

    case 'hook':
      // L-shape with rounded outer corner, sharp inner — logo bottom-right
      ctx.moveTo(-s * 0.4, -s * 0.35);
      ctx.lineTo(-s * 0.4, s * 0.15);
      ctx.quadraticCurveTo(-s * 0.4, s * 0.35, -s * 0.2, s * 0.35);
      ctx.lineTo(s * 0.4, s * 0.35);
      break;

    case 'arc':
      // Open curved path — floating technical drawing
      ctx.moveTo(-s * 0.3, -s * 0.2);
      ctx.bezierCurveTo(
        -s * 0.1, -s * 0.45,
        s * 0.2, -s * 0.3,
        s * 0.35, s * 0.1
      );
      break;
  }
  ctx.stroke();
  ctx.restore();
}

// Normalize angle to [-PI, PI]
function normalizeAngle(a: number): number {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

// Find nearest grid angle
function nearestGridAngle(current: number): number {
  let best = GRID_ANGLES[0];
  let bestDiff = Infinity;
  for (const g of GRID_ANGLES) {
    const diff = Math.abs(normalizeAngle(current - g));
    if (diff < bestDiff) {
      bestDiff = diff;
      best = g;
    }
  }
  return best;
}

const GeometricKinetic = ({ mouseX, mouseY, isDesktop }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grainRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const fragmentsRef = useRef<Fragment[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  const isVisibleRef = useRef(true);

  // Generate grain texture once
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
      data[i + 3] = 10;
    }
    ctx.putImageData(imageData, 0, 0);
  }, []);

  // Resize & init
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
      fragmentsRef.current = createFragments(rect.width, rect.height);
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

  // Tab hidden
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

  // Main loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const grain = grainRef.current;
    if (!canvas || !grain) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const draw = (now: number) => {
      animRef.current = requestAnimationFrame(draw);
      if (!isVisibleRef.current) return;

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const { w, h } = sizeRef.current;
      const isDark = document.documentElement.classList.contains('dark');

      ctx.clearRect(0, 0, w, h);

      const mx = isDesktop ? (mouseX / 100) * w : -9999;
      const my = isDesktop ? (mouseY / 100) * h : -9999;

      const fragments = fragmentsRef.current;

      for (const f of fragments) {
        // ── Drift ──
        f.x += f.vx * f.depth * 60 * dt;
        f.y += f.vy * f.depth * 60 * dt;

        // Wrap
        if (f.x < -f.size) f.x = w + f.size;
        if (f.x > w + f.size) f.x = -f.size;
        if (f.y < -f.size) f.y = h + f.size;
        if (f.y > h + f.size) f.y = -f.size;

        // ── Occasional rotation to another logo angle ──
        f.rotTimer -= dt;
        if (f.rotTimer <= 0) {
          f.rotTimer = f.rotSpeed + Math.random() * 5;
          const newAngle = LOGO_ANGLES[Math.floor(Math.random() * LOGO_ANGLES.length)];
          f.baseAngle = newAngle;
          f.targetAngle = newAngle;
        }

        // ── Mouse influence: align to grid ──
        const dx = mx - f.x;
        const dy = my - f.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < INFLUENCE_RADIUS) {
          const influence = 1 - dist / INFLUENCE_RADIUS;
          const gridAngle = nearestGridAngle(f.currentAngle);
          f.targetAngle = gridAngle;
          // Stronger alignment the closer the cursor
          const speed = ALIGN_SPEED * influence * 3;
          const diff = normalizeAngle(f.targetAngle - f.currentAngle);
          f.currentAngle += diff * speed;
        } else {
          // Drift back to base deconstructed angle
          const diff = normalizeAngle(f.baseAngle - f.currentAngle);
          f.currentAngle += diff * DRIFT_BACK_SPEED;
        }

        // ── Draw ──
        const baseAlpha = isDark ? 0.035 : 0.025;
        // Brighten slightly near cursor
        const cursorBoost = dist < INFLUENCE_RADIUS ? (1 - dist / INFLUENCE_RADIUS) * 0.04 : 0;
        const alpha = baseAlpha + cursorBoost;

        ctx.strokeStyle = isDark
          ? `rgba(255, 255, 255, ${alpha})`
          : `rgba(0, 0, 0, ${alpha})`;

        drawFragment(ctx, f);
      }

      // ── Film grain ──
      ctx.globalAlpha = isDark ? 0.05 : 0.035;
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
      />
    </>
  );
};

export default GeometricKinetic;
