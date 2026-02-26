import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';

interface Props {
  mouseX: number; // 0-100
  mouseY: number; // 0-100
  isDesktop: boolean;
}

const GeometricKinetic = ({ mouseX, mouseY, isDesktop }: Props) => {
  const [isDark, setIsDark] = useState(false);
  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  // Scroll parallax
  const { scrollY } = useScroll();
  const containerScale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const containerOpacity = useTransform(scrollY, [0, 800], [1, 0.3]);

  // ─── Inertia Spring System ──────────────────────────────────────
  // All shapes track the same target but with different spring configs
  const targetX = useMotionValue(50);
  const targetY = useMotionValue(50);

  // Circle (Azure) — heavy, slow lag: stiffness 50, damping 30
  const circleX = useSpring(targetX, { stiffness: 50, damping: 30 });
  const circleY = useSpring(targetY, { stiffness: 50, damping: 30 });

  // Square (Magenta) — magnetic, snappy: stiffness 90, damping 20
  const squareX = useSpring(targetX, { stiffness: 90, damping: 20 });
  const squareY = useSpring(targetY, { stiffness: 90, damping: 20 });

  // Triangle (Teal) — floaty, only reacts within 200px proximity
  const triangleTargetX = useMotionValue(55);
  const triangleTargetY = useMotionValue(45);
  const triangleX = useSpring(triangleTargetX, { stiffness: 35, damping: 35 });
  const triangleY = useSpring(triangleTargetY, { stiffness: 35, damping: 35 });

  // Triangle center for proximity check
  const triCenterRef = useRef({ x: 55, y: 45 });

  useEffect(() => {
    if (!isDesktop) return;
    targetX.set(mouseX);
    targetY.set(mouseY);

    // Triangle: only react if mouse is within ~200px (≈20% of viewport)
    const triCenter = triCenterRef.current;
    const dx = mouseX - triCenter.x;
    const dy = mouseY - triCenter.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 20) {
      // Within proximity — attract gently
      triangleTargetX.set(triCenter.x + dx * 0.4);
      triangleTargetY.set(triCenter.y + dy * 0.4);
    } else {
      // Outside proximity — drift back to home
      triangleTargetX.set(triCenter.x);
      triangleTargetY.set(triCenter.y);
    }
  }, [mouseX, mouseY, isDesktop, targetX, targetY, triangleTargetX, triangleTargetY]);

  // ─── GPU-composited transforms ──────────────────────────────────
  const ww = typeof window !== 'undefined' ? window.innerWidth : 1440;
  const wh = typeof window !== 'undefined' ? window.innerHeight : 900;

  // Circle: top-left anchor
  const c1X = useTransform(circleX, v => (v / 100) * ww - 350);
  const c1Y = useTransform(circleY, v => (v / 100) * wh - 350);

  // Square: bottom-right anchor, tilted 15deg
  const c2X = useTransform(squareX, v => (v / 100) * ww + 50);
  const c2Y = useTransform(squareY, v => (v / 100) * wh - 100);

  // Triangle: center-right anchor
  const c3X = useTransform(triangleX, v => (v / 100) * ww - 100);
  const c3Y = useTransform(triangleY, v => (v / 100) * wh + 80);

  // ─── Gradients — vibrant, max opacity 60% ──────────────────────
  const circleGradient = isDark
    ? 'radial-gradient(circle, hsla(210, 100%, 60%, 0.6) 0%, hsla(220, 90%, 50%, 0.3) 35%, transparent 65%)'
    : 'radial-gradient(circle, hsla(210, 80%, 65%, 0.55) 0%, hsla(215, 70%, 55%, 0.25) 35%, transparent 65%)';

  const squareGradient = isDark
    ? 'radial-gradient(circle, hsla(290, 85%, 55%, 0.6) 0%, hsla(310, 80%, 45%, 0.3) 35%, transparent 65%)'
    : 'radial-gradient(circle, hsla(285, 60%, 65%, 0.55) 0%, hsla(300, 55%, 60%, 0.25) 35%, transparent 65%)';

  const triangleGradient = isDark
    ? 'radial-gradient(circle, hsla(175, 90%, 50%, 0.6) 0%, hsla(185, 85%, 45%, 0.3) 35%, transparent 65%)'
    : 'radial-gradient(circle, hsla(175, 70%, 55%, 0.55) 0%, hsla(180, 60%, 50%, 0.25) 35%, transparent 65%)';

  // ─── Idle orbits ────────────────────────────────────────────────
  const idleCircle = reducedMotion ? undefined : {
    x: ['-30px', '40px', '-20px', '30px', '-30px'],
    y: ['20px', '-35px', '30px', '-25px', '20px'],
    rotate: [0, 3, -2, 4, 0],
  };
  const idleSquare = reducedMotion ? undefined : {
    x: ['25px', '-35px', '30px', '-25px', '25px'],
    y: ['-20px', '30px', '-25px', '35px', '-20px'],
    rotate: [15, 25, 10, 20, 15],
  };
  const idleTriangle = reducedMotion ? undefined : {
    x: ['-20px', '30px', '-40px', '20px', '-20px'],
    y: ['30px', '-20px', '25px', '-30px', '30px'],
    rotate: [0, 8, -5, 10, 0],
  };

  const baseTransition = { repeat: Infinity, ease: 'easeInOut' as const };

  // Static default positions for mobile
  const mobilePos1 = { left: '15%', top: '20%' };
  const mobilePos2 = { left: '55%', top: '15%' };
  const mobilePos3 = { left: '30%', top: '45%' };

  // Shared GPU hint styles — force compositing layer for Safari
  const gpuHints: React.CSSProperties = {
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    transform: 'translateZ(0)',
    transition: 'background 1s ease',
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ isolation: 'isolate' }}>
      <motion.div
        className="absolute inset-0"
        style={{ scale: containerScale, opacity: containerOpacity, willChange: 'transform', transform: 'translateZ(0)' }}
      >
        {/* Shape 1 — Circle (Azure Blue) — heavy, slow lag */}
        <motion.div
          className="absolute blur-[120px]"
          style={{
            width: 700, height: 700,
            borderRadius: '50%',
            background: circleGradient,
            opacity: 0.6,
            ...(isDesktop ? { x: c1X, y: c1Y, left: 0, top: 0 } : mobilePos1),
            ...gpuHints,
          }}
          animate={idleCircle}
          transition={{ ...baseTransition, duration: 28 }}
        />

        {/* Shape 2 — Square (Magenta/Violet) — magnetic, snappy, 15deg tilt */}
        <motion.div
          className="absolute blur-[120px]"
          style={{
            width: 650, height: 650,
            borderRadius: '20%',
            rotate: 15,
            background: squareGradient,
            opacity: 0.55,
            ...(isDesktop ? { x: c2X, y: c2Y, left: 0, top: 0 } : mobilePos2),
            ...gpuHints,
          }}
          animate={idleSquare}
          transition={{ ...baseTransition, duration: 32 }}
        />

        {/* Shape 3 — Triangle/Organic (Teal/Cyan) — floaty, proximity-gated */}
        <motion.div
          className="absolute blur-[120px]"
          style={{
            width: 680, height: 680,
            borderRadius: '30% 70% 55% 45% / 60% 40% 65% 35%',
            background: triangleGradient,
            opacity: 0.5,
            ...(isDesktop ? { x: c3X, y: c3Y, left: 0, top: 0 } : mobilePos3),
            ...gpuHints,
          }}
          animate={idleTriangle}
          transition={{ ...baseTransition, duration: 35 }}
        />
      </motion.div>

      {/* Top vignette */}
      <div
        className="absolute inset-x-0 top-0 z-[1] h-[15%]"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, #050505 0%, transparent 100%)'
            : 'linear-gradient(to bottom, #FBFBFD 0%, transparent 100%)',
          transition: 'background 1s ease',
        }}
      />
      {/* Bottom vignette */}
      <div
        className="absolute inset-x-0 bottom-0 z-[1] h-[15%]"
        style={{
          background: isDark
            ? 'linear-gradient(to top, #050505 0%, transparent 100%)'
            : 'linear-gradient(to top, #FBFBFD 0%, transparent 100%)',
          transition: 'background 1s ease',
        }}
      />

      {/* Film Grain — 3% opacity noise overlay */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
    </div>
  );
};

export default GeometricKinetic;
