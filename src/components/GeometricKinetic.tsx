import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState, useMemo, useRef } from 'react';

/**
 * Geometric Light v9
 *
 * Three distinct geometric shapes (circle, square, triangle) with extreme blur,
 * spring-physics mouse attraction, proximity highlight, and film grain.
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

  // Scroll
  const { scrollY } = useScroll();
  const containerScale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const containerOpacity = useTransform(scrollY, [0, 800], [1, 0.3]);

  // Mouse position as motion values for spring physics
  const targetX = useMotionValue(50);
  const targetY = useMotionValue(50);

  // Each shape follows with different spring strengths
  const s1x = useSpring(targetX, { stiffness: 50, damping: 20 });
  const s1y = useSpring(targetY, { stiffness: 50, damping: 20 });
  const s2x = useSpring(targetX, { stiffness: 35, damping: 25 });
  const s2y = useSpring(targetY, { stiffness: 35, damping: 25 });

  // Proximity tracking for highlight
  const closestIdx = useRef(0);
  const [activeShape, setActiveShape] = useState(0);

  useEffect(() => {
    if (!isDesktop) return;
    targetX.set(mouseX);
    targetY.set(mouseY);
  }, [mouseX, mouseY, isDesktop, targetX, targetY]);

  // Update closest shape based on spring positions
  useEffect(() => {
    if (!isDesktop) return;
    const interval = setInterval(() => {
      const positions = [
        { x: s1x.get(), y: s1y.get() },
        { x: s2x.get(), y: s2y.get() },
      ];
      let minDist = Infinity;
      let closest = 0;
      positions.forEach((p, i) => {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      if (closest !== closestIdx.current) {
        closestIdx.current = closest;
        setActiveShape(closest);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [isDesktop, mouseX, mouseY, s1x, s1y, s2x, s2y]);

  // Offset transforms — shapes orbit around cursor, not directly on it
  const shape1Left = useTransform(s1x, v => `calc(${v}% - 200px)`);
  const shape1Top = useTransform(s1y, v => `calc(${v}% - 200px)`);
  const shape2Left = useTransform(s2x, v => `calc(${v}% + 50px)`);
  const shape2Top = useTransform(s2y, v => `calc(${v}% - 250px)`);
  const shape3Left = useTransform(s3x, v => `calc(${v}% - 100px)`);
  const shape3Top = useTransform(s3y, v => `calc(${v}% + 80px)`);

  // Colors
  const circleColor = isDark
    ? 'radial-gradient(circle, hsla(190, 90%, 55%, 0.7), hsla(220, 80%, 50%, 0.5))'
    : 'radial-gradient(circle, hsla(190, 70%, 65%, 0.6), hsla(210, 60%, 55%, 0.4))';
  const squareColor = isDark
    ? 'radial-gradient(circle, hsla(280, 75%, 50%, 0.7), hsla(310, 70%, 45%, 0.5))'
    : 'radial-gradient(circle, hsla(280, 55%, 65%, 0.6), hsla(300, 50%, 60%, 0.4))';
  const triangleColor = isDark
    ? 'radial-gradient(circle, hsla(30, 90%, 55%, 0.7), hsla(45, 85%, 50%, 0.5))'
    : 'radial-gradient(circle, hsla(25, 80%, 60%, 0.6), hsla(40, 70%, 55%, 0.4))';

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
            width: 400, height: 400,
            borderRadius: '50%',
            background: circleColor,
            filter: 'blur(120px)',
            opacity: activeShape === 0 ? 0.9 : 0.7,
            transform: `scale(${activeShape === 0 ? 1.1 : 1})`,
            ...(isDesktop ? { left: shape1Left, top: shape1Top } : { left: '15%', top: '20%' }),
            willChange: 'transform, filter, opacity',
            transition: 'opacity 0.6s ease, transform 0.6s ease, background 1s ease',
          }}
          animate={!isDesktop ? idleOrbit1 : idleOrbit1}
          transition={{ ...baseTransition, duration: 28 }}
        />

        {/* Shape 2 — Square (Purple/Magenta), slightly rotated */}
        <motion.div
          className="absolute"
          style={{
            width: 350, height: 350,
            borderRadius: '20%',
            background: squareColor,
            filter: 'blur(120px)',
            opacity: activeShape === 1 ? 0.9 : 0.65,
            transform: `scale(${activeShape === 1 ? 1.1 : 1})`,
            ...(isDesktop ? { left: shape2Left, top: shape2Top } : { left: '55%', top: '15%' }),
            willChange: 'transform, filter, opacity',
            transition: 'opacity 0.6s ease, transform 0.6s ease, background 1s ease',
          }}
          animate={!isDesktop ? idleOrbit2 : idleOrbit2}
          transition={{ ...baseTransition, duration: 32 }}
        />

        {/* Shape 3 — Triangle (Orange/Yellow) via clip-path */}
        <motion.div
          className="absolute"
          style={{
            width: 380, height: 380,
            clipPath: 'polygon(50% 5%, 95% 90%, 5% 90%)',
            background: triangleColor,
            filter: 'blur(120px)',
            opacity: activeShape === 2 ? 0.9 : 0.6,
            transform: `scale(${activeShape === 2 ? 1.1 : 1})`,
            ...(isDesktop ? { left: shape3Left, top: shape3Top } : { left: '30%', top: '45%' }),
            willChange: 'transform, filter, opacity',
            transition: 'opacity 0.6s ease, transform 0.6s ease, background 1s ease',
          }}
          animate={!isDesktop ? idleOrbit3 : idleOrbit3}
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
