import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

/**
 * Ambient Refraction — v7
 *
 * Two large amorphous blobs drifting in a slow figure-eight pattern.
 * Frosted grain overlay, scroll-reactive scale/opacity, edge fades.
 */

interface Props {
  mouseX: number;
  mouseY: number;
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

  // Scroll-driven scale & opacity
  const { scrollY } = useScroll();
  const blobScale = useTransform(scrollY, [0, 800], [1, 1.1]);
  const blobOpacity = useTransform(scrollY, [0, 800], [1, 0.4]);

  // Blob colors
  const blob1Color = isDark
    ? 'hsla(244, 47%, 20%, 0.50)'   // Deep Indigo
    : 'hsla(270, 40%, 88%, 0.55)';  // Pale Lavender

  const blob2Color = isDark
    ? 'hsla(195, 50%, 35%, 0.35)'   // Desaturated Cyan
    : 'hsla(25, 60%, 88%, 0.50)';   // Warm Peach

  // Figure-eight keyframes (blob 1 and blob 2 offset)
  const blob1Animation = reducedMotion ? undefined : {
    x: ['-5%', '8%', '-3%', '-8%', '5%', '-5%'],
    y: ['-8%', '5%', '8%', '-3%', '-6%', '-8%'],
  };
  const blob2Animation = reducedMotion ? undefined : {
    x: ['6%', '-7%', '4%', '9%', '-5%', '6%'],
    y: ['5%', '-6%', '-8%', '4%', '7%', '5%'],
  };

  const driftTransition = {
    repeat: Infinity,
    duration: 40,
    ease: 'easeInOut' as const,
  };

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base canvas color is handled by parent bg-background */}

      {/* Blob container — scroll reactive */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          scale: blobScale,
          opacity: blobOpacity,
        }}
      >
        {/* Blob 1 */}
        <motion.div
          className="absolute will-change-transform"
          style={{
            left: '20%',
            top: '15%',
            width: '55vw',
            height: '55vh',
            borderRadius: '40% 60% 55% 45% / 50% 40% 60% 50%',
            background: blob1Color,
            filter: 'blur(120px)',
            transition: 'background 1s ease',
          }}
          animate={blob1Animation}
          transition={driftTransition}
        />

        {/* Blob 2 */}
        <motion.div
          className="absolute will-change-transform"
          style={{
            right: '15%',
            bottom: '10%',
            width: '50vw',
            height: '50vh',
            borderRadius: '55% 45% 40% 60% / 45% 55% 50% 50%',
            background: blob2Color,
            filter: 'blur(120px)',
            transition: 'background 1s ease',
          }}
          animate={blob2Animation}
          transition={{ ...driftTransition, duration: 44 }}
        />
      </motion.div>

      {/* Top edge fade */}
      <div
        className="absolute inset-x-0 top-0 z-[1] h-[15%]"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, #050505 0%, transparent 100%)'
            : 'linear-gradient(to bottom, #FBFBFD 0%, transparent 100%)',
          transition: 'background 1s ease',
        }}
      />

      {/* Bottom edge fade */}
      <div
        className="absolute inset-x-0 bottom-0 z-[1] h-[15%]"
        style={{
          background: isDark
            ? 'linear-gradient(to top, #050505 0%, transparent 100%)'
            : 'linear-gradient(to top, #FBFBFD 0%, transparent 100%)',
          transition: 'background 1s ease',
        }}
      />

      {/* Silica grain texture */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
    </div>
  );
};

export default GeometricKinetic;
