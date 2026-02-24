import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState, useMemo, useRef } from 'react';

/**
 * Fluid Color Storm — v8
 *
 * 3 massive amorphous blobs: one follows the mouse with heavy spring lag,
 * two orbit and "breathe". 180px+ blur, 5% film grain, vignette fades.
 */

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

  // Scroll-driven dynamics
  const { scrollY } = useScroll();
  const blobScale = useTransform(scrollY, [0, 800], [1, 1.15]);
  const blobOpacity = useTransform(scrollY, [0, 800], [1, 0.3]);

  // Mouse-following blob with heavy spring lag
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);
  const lagX = useSpring(rawX, { stiffness: 20, damping: 40 });
  const lagY = useSpring(rawY, { stiffness: 20, damping: 40 });
  const lagXPercent = useTransform(lagX, v => `${v}%`);
  const lagYPercent = useTransform(lagY, v => `${v}%`);

  // Track mouse velocity for opacity spike
  const prevMouseRef = useRef({ x: 50, y: 50, time: Date.now() });
  const velocityOpacity = useMotionValue(0.7);
  const smoothOpacity = useSpring(velocityOpacity, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (!isDesktop) return;
    rawX.set(mouseX);
    rawY.set(mouseY);

    const now = Date.now();
    const dt = Math.max(now - prevMouseRef.current.time, 1);
    const dx = mouseX - prevMouseRef.current.x;
    const dy = mouseY - prevMouseRef.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy) / dt;
    // Map speed to opacity: base 0.7, spike to 0.9
    const targetOp = Math.min(0.7 + speed * 0.8, 0.9);
    velocityOpacity.set(targetOp);
    prevMouseRef.current = { x: mouseX, y: mouseY, time: now };
  }, [mouseX, mouseY, isDesktop, rawX, rawY, velocityOpacity]);

  // Blob colors
  const blob1 = isDark
    ? 'hsla(255, 70%, 45%, 0.7)'   // Electric Indigo
    : 'hsla(25, 85%, 60%, 0.65)';  // Sunset Orange

  const blob2 = isDark
    ? 'hsla(280, 60%, 40%, 0.6)'   // Vibrant Violet
    : 'hsla(270, 50%, 70%, 0.6)';  // Deep Lavender

  const blob3 = isDark
    ? 'hsla(210, 80%, 50%, 0.5)'   // Azure Blue
    : 'hsla(350, 60%, 75%, 0.55)'; // Soft Rose

  // Breathing animation for orbiting blobs
  const breathe = reducedMotion ? undefined : {
    scale: [1, 1.5, 1],
  };
  const breatheTransition = {
    repeat: Infinity,
    duration: 10,
    ease: 'easeInOut' as const,
  };

  // Orbit paths for blob 2 & 3
  const orbit2 = reducedMotion ? undefined : {
    x: ['-8%', '12%', '5%', '-10%', '-8%'],
    y: ['5%', '-8%', '10%', '-5%', '5%'],
    scale: [1, 1.4, 1, 1.3, 1],
  };
  const orbit3 = reducedMotion ? undefined : {
    x: ['10%', '-6%', '-12%', '8%', '10%'],
    y: ['-6%', '8%', '-4%', '10%', '-6%'],
    scale: [1.2, 1, 1.5, 1, 1.2],
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Blob container — scroll reactive */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale: blobScale,
          opacity: blobOpacity,
          willChange: 'transform, filter',
        }}
      >
        {/* Blob 1 — Mouse follower (largest, dominant) */}
        {isDesktop ? (
          <motion.div
            className="absolute"
            style={{
              width: '60vw',
              height: '60vh',
              borderRadius: '40% 60% 55% 45% / 50% 40% 60% 50%',
              background: blob1,
              filter: 'blur(180px)',
              opacity: smoothOpacity,
              left: lagXPercent,
              top: lagYPercent,
              x: '-50%',
              y: '-50%',
              willChange: 'transform, filter',
              transition: 'background 1s ease',
            }}
          />
        ) : (
          <motion.div
            className="absolute"
            style={{
              width: '60vw',
              height: '60vh',
              borderRadius: '40% 60% 55% 45% / 50% 40% 60% 50%',
              background: blob1,
              filter: 'blur(180px)',
              opacity: 0.7,
              left: '20%',
              top: '20%',
              willChange: 'transform, filter',
              transition: 'background 1s ease',
            }}
            animate={!reducedMotion ? {
              x: ['-5%', '8%', '-3%', '-5%'],
              y: ['-8%', '5%', '8%', '-8%'],
            } : undefined}
            transition={{ repeat: Infinity, duration: 30, ease: 'easeInOut' }}
          />
        )}
        {/* Blob 2 — Orbiting, breathing */}
        <motion.div
          className="absolute"
          style={{
            left: '60%',
            top: '30%',
            width: '50vw',
            height: '50vh',
            borderRadius: '55% 45% 40% 60% / 45% 55% 50% 50%',
            background: blob2,
            filter: 'blur(180px)',
            willChange: 'transform, filter',
            transition: 'background 1s ease',
          }}
          animate={orbit2}
          transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
        />

        {/* Blob 3 — Orbiting, breathing (accent) */}
        <motion.div
          className="absolute"
          style={{
            left: '30%',
            bottom: '10%',
            width: '45vw',
            height: '45vh',
            borderRadius: '50% 50% 45% 55% / 55% 45% 50% 50%',
            background: blob3,
            filter: 'blur(180px)',
            willChange: 'transform, filter',
            transition: 'background 1s ease',
          }}
          animate={orbit3}
          transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Top vignette fade */}
      <div
        className="absolute inset-x-0 top-0 z-[1] h-[20%]"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, #050505 0%, #050505 30%, transparent 100%)'
            : 'linear-gradient(to bottom, #FBFBFD 0%, #FBFBFD 30%, transparent 100%)',
          transition: 'background 1s ease',
        }}
      />

      {/* Bottom vignette fade */}
      <div
        className="absolute inset-x-0 bottom-0 z-[1] h-[20%]"
        style={{
          background: isDark
            ? 'linear-gradient(to top, #050505 0%, #050505 30%, transparent 100%)'
            : 'linear-gradient(to top, #FBFBFD 0%, #FBFBFD 30%, transparent 100%)',
          transition: 'background 1s ease',
        }}
      />

      {/* Film Grain texture — 5% opacity */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
    </div>
  );
};

export default GeometricKinetic;
