import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

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

  // Scroll
  const { scrollY } = useScroll();
  const containerScale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const containerOpacity = useTransform(scrollY, [0, 800], [1, 0.3]);

  // Mouse position as motion values for spring physics
  const targetX = useMotionValue(50);
  const targetY = useMotionValue(50);

  // Each shape follows with slightly reduced stiffness for smoother settling
  const s1x = useSpring(targetX, { stiffness: 40, damping: 22 });
  const s1y = useSpring(targetY, { stiffness: 40, damping: 22 });
  const s2x = useSpring(targetX, { stiffness: 28, damping: 26 });
  const s2y = useSpring(targetY, { stiffness: 28, damping: 26 });
  const s3x = useSpring(targetX, { stiffness: 20, damping: 30 });
  const s3y = useSpring(targetY, { stiffness: 20, damping: 30 });

  useEffect(() => {
    if (!isDesktop) return;
    targetX.set(mouseX);
    targetY.set(mouseY);
  }, [mouseX, mouseY, isDesktop, targetX, targetY]);

  // GPU-composited x/y transforms instead of calc() strings for left/top
  const shape1X = useTransform(s1x, v => (v / 100) * (typeof window !== 'undefined' ? window.innerWidth : 1440) - 350);
  const shape1Y = useTransform(s1y, v => (v / 100) * (typeof window !== 'undefined' ? window.innerHeight : 900) - 350);
  const shape2X = useTransform(s2x, v => (v / 100) * (typeof window !== 'undefined' ? window.innerWidth : 1440) + 50);
  const shape2Y = useTransform(s2y, v => (v / 100) * (typeof window !== 'undefined' ? window.innerHeight : 900) - 400);
  const shape3X = useTransform(s3x, v => (v / 100) * (typeof window !== 'undefined' ? window.innerWidth : 1440) - 100);
  const shape3Y = useTransform(s3y, v => (v / 100) * (typeof window !== 'undefined' ? window.innerHeight : 900) + 80);

  // Pre-blurred radial gradients — larger shapes with soft falloff, no CSS filter needed
  const circleGradient = isDark
    ? 'radial-gradient(circle, hsla(190, 90%, 55%, 0.7) 0%, hsla(220, 80%, 50%, 0.35) 35%, transparent 65%)'
    : 'radial-gradient(circle, hsla(190, 70%, 65%, 0.6) 0%, hsla(210, 60%, 55%, 0.3) 35%, transparent 65%)';
  const squareGradient = isDark
    ? 'radial-gradient(circle, hsla(280, 75%, 50%, 0.7) 0%, hsla(310, 70%, 45%, 0.35) 35%, transparent 65%)'
    : 'radial-gradient(circle, hsla(280, 55%, 65%, 0.6) 0%, hsla(300, 50%, 60%, 0.3) 35%, transparent 65%)';
  const triangleGradient = isDark
    ? 'radial-gradient(circle, hsla(30, 90%, 55%, 0.7) 0%, hsla(45, 85%, 50%, 0.35) 35%, transparent 65%)'
    : 'radial-gradient(circle, hsla(25, 80%, 60%, 0.6) 0%, hsla(40, 70%, 55%, 0.3) 35%, transparent 65%)';

  // Idle orbit animations
  const idleOrbit1 = reducedMotion ? undefined : {
    x: ['-30px', '40px', '-20px', '30px', '-30px'],
    y: ['20px', '-35px', '30px', '-25px', '20px'],
    rotate: [0, 5, -3, 4, 0],
  };
  const idleOrbit2 = reducedMotion ? undefined : {
    x: ['25px', '-35px', '30px', '-25px', '25px'],
    y: ['-20px', '30px', '-25px', '35px', '-20px'],
    rotate: [15, 25, 10, 20, 15],
  };
  const idleOrbit3 = reducedMotion ? undefined : {
    x: ['-20px', '30px', '-40px', '20px', '-20px'],
    y: ['30px', '-20px', '25px', '-30px', '30px'],
  };

  const baseTransition = { repeat: Infinity, duration: 30, ease: 'easeInOut' as const };

  // Static default positions for mobile
  const mobilePos1 = { left: '15%', top: '20%' };
  const mobilePos2 = { left: '55%', top: '15%' };
  const mobilePos3 = { left: '30%', top: '45%' };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0"
        style={{ scale: containerScale, opacity: containerOpacity, willChange: 'transform' }}
      >
        {/* Shape 1 — Circle (Cyan/Blue) */}
        <motion.div
          className="absolute"
          style={{
            width: 700, height: 700,
            borderRadius: '50%',
            background: circleGradient,
            opacity: 0.75,
            ...(isDesktop ? { x: shape1X, y: shape1Y, left: 0, top: 0 } : mobilePos1),
            willChange: 'transform',
            transition: 'background 1s ease',
          }}
          animate={idleOrbit1}
          transition={{ ...baseTransition, duration: 28 }}
        />

        {/* Shape 2 — Square (Purple/Magenta) */}
        <motion.div
          className="absolute"
          style={{
            width: 650, height: 650,
            borderRadius: '20%',
            background: squareGradient,
            opacity: 0.7,
            ...(isDesktop ? { x: shape2X, y: shape2Y, left: 0, top: 0 } : mobilePos2),
            willChange: 'transform',
            transition: 'background 1s ease',
          }}
          animate={idleOrbit2}
          transition={{ ...baseTransition, duration: 32 }}
        />

        {/* Shape 3 — Organic blob (Orange/Yellow) */}
        <motion.div
          className="absolute"
          style={{
            width: 680, height: 680,
            borderRadius: '30% 70% 55% 45% / 60% 40% 65% 35%',
            background: triangleGradient,
            opacity: 0.65,
            ...(isDesktop ? { x: shape3X, y: shape3Y, left: 0, top: 0 } : mobilePos3),
            willChange: 'transform',
            transition: 'background 1s ease',
          }}
          animate={idleOrbit3}
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

      {/* Film Grain — 3% */}
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
