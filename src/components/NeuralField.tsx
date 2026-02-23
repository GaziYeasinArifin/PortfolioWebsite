import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  phaseOffset: number;    // for breathing
  driftAngle: number;     // Brownian drift direction
  driftSpeed: number;
}

interface NeuralFieldProps {
  mouseX: number;         // 0–100 percentage
  mouseY: number;         // 0–100 percentage
  isDesktop: boolean;
}

const PARTICLE_COUNT = 180;
const INFLUENCE_RADIUS = 250;       // px
const CONNECTION_DISTANCE = 120;    // max line distance between neighbors
const MAGNETIC_STRENGTH = 0.0008;   // very gentle pull
const DAMPING = 0.96;               // "moving through water"
const DRIFT_SPEED_MAX = 0.15;
const BREATHING_DURATION = 6000;    // ms
const LINE_FADE_DURATION = 1500;    // ms

const NeuralField = ({ mouseX, mouseY, isDesktop }: NeuralFieldProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  const lineAlphasRef = useRef<Map<string, number>>(new Map());
  const lastMouseRef = useRef({ x: -1000, y: -1000 });
  const autoPhaseRef = useRef(0);

  const createParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      particles.push({
        x, y,
        baseX: x,
        baseY: y,
        vx: 0,
        vy: 0,
        radius: Math.random() * 1 + 1,
        phaseOffset: Math.random() * Math.PI * 2,
        driftAngle: Math.random() * Math.PI * 2,
        driftSpeed: Math.random() * DRIFT_SPEED_MAX + 0.02,
      });
    }
    particlesRef.current = particles;
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
      if (particlesRef.current.length === 0) {
        createParticles(rect.width, rect.height);
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [createParticles]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();

    const draw = (now: number) => {
      const dt = Math.min(now - lastTime, 32); // cap at ~30fps minimum
      lastTime = now;
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      const isDark = document.documentElement.classList.contains('dark');

      // Mouse position in pixels
      let mx: number, my: number;
      if (isDesktop) {
        mx = (mouseX / 100) * w;
        my = (mouseY / 100) * h;
        lastMouseRef.current = { x: mx, y: my };
      } else {
        // Mobile: auto-drift a virtual cursor
        autoPhaseRef.current += dt * 0.0003;
        const phase = autoPhaseRef.current;
        mx = w * 0.5 + Math.sin(phase * 0.7) * w * 0.25;
        my = h * 0.5 + Math.cos(phase * 0.5) * h * 0.2;
      }

      const particles = particlesRef.current;
      const breathingTime = now % BREATHING_DURATION;

      // ── Update particles ──
      for (const p of particles) {
        // Brownian drift
        p.driftAngle += (Math.random() - 0.5) * 0.08;
        const driftX = Math.cos(p.driftAngle) * p.driftSpeed;
        const driftY = Math.sin(p.driftAngle) * p.driftSpeed;

        // Distance to cursor
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Magnetic pull (only within influence radius)
        if (dist < INFLUENCE_RADIUS) {
          const force = (1 - dist / INFLUENCE_RADIUS) * MAGNETIC_STRENGTH * dt;
          p.vx += dx * force;
          p.vy += dy * force;
        }

        // Spring back to base
        p.vx += (p.baseX - p.x) * 0.0003 * dt;
        p.vy += (p.baseY - p.y) * 0.0003 * dt;

        // Apply drift + velocity
        p.vx = (p.vx + driftX) * DAMPING;
        p.vy = (p.vy + driftY) * DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
      }

      // ── Draw connections (synapses) ──
      const activeKeys = new Set<string>();

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const dA = Math.sqrt((mx - a.x) ** 2 + (my - a.y) ** 2);
        if (dA > INFLUENCE_RADIUS) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dB = Math.sqrt((mx - b.x) ** 2 + (my - b.y) ** 2);
          if (dB > INFLUENCE_RADIUS) continue;

          const abDist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (abDist > CONNECTION_DISTANCE) continue;

          const key = `${i}-${j}`;
          activeKeys.add(key);

          // Set alpha to full (will be modulated by distance)
          const proximityAlpha = 1 - abDist / CONNECTION_DISTANCE;
          const cursorFade = Math.min(1 - dA / INFLUENCE_RADIUS, 1 - dB / INFLUENCE_RADIUS);
          const targetAlpha = proximityAlpha * cursorFade * 0.35;

          // Smooth alpha ramp-up
          const current = lineAlphasRef.current.get(key) || 0;
          const newAlpha = current + (targetAlpha - current) * 0.15;
          lineAlphasRef.current.set(key, newAlpha);
        }
      }

      // Decay inactive connections
      for (const [key, alpha] of lineAlphasRef.current.entries()) {
        if (!activeKeys.has(key)) {
          const decayed = alpha - (dt / LINE_FADE_DURATION) * alpha * 3;
          if (decayed < 0.001) {
            lineAlphasRef.current.delete(key);
          } else {
            lineAlphasRef.current.set(key, decayed);
          }
        }
      }

      // Render lines
      for (const [key, alpha] of lineAlphasRef.current.entries()) {
        if (alpha < 0.005) continue;
        const [iStr, jStr] = key.split('-');
        const a = particles[parseInt(iStr)];
        const b = particles[parseInt(jStr)];

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = isDark
          ? `rgba(100, 200, 255, ${alpha})`
          : `rgba(60, 120, 180, ${alpha * 0.6})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // ── Draw particles ──
      for (const p of particles) {
        // Breathing: oscillate opacity between 0.08 and 0.28
        const breathPhase = ((breathingTime / BREATHING_DURATION) * Math.PI * 2) + p.phaseOffset;
        const breathAlpha = 0.08 + (Math.sin(breathPhase) * 0.5 + 0.5) * 0.2;

        // Brighten particles near cursor
        const dist = Math.sqrt((mx - p.x) ** 2 + (my - p.y) ** 2);
        const cursorBoost = dist < INFLUENCE_RADIUS ? (1 - dist / INFLUENCE_RADIUS) * 0.4 : 0;
        const finalAlpha = Math.min(breathAlpha + cursorBoost, 0.6);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${finalAlpha})`
          : `rgba(40, 44, 52, ${finalAlpha * 0.7})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [mouseX, mouseY, isDesktop]);

  // Pause when tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        if (animRef.current) cancelAnimationFrame(animRef.current);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
};

export default NeuralField;
