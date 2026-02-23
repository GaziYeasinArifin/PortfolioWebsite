import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

/**
 * FloatingGlass — Framer Motion + Tailwind hero background
 *
 * 5 slanted rectangles at 65° (via CSS transform: skewY(-25deg))
 * with independent floating animations, mouse parallax,
 * proximity-based opacity boost, frosted blur layer, and film grain.
 *
 * Light: Soft Orange, Pale Blue, Lavender
 * Dark: Deep Indigo (#1E1B4B), Charcoal (#0F172A)
 */

interface PanelConfig {
  // Position & size (% or viewport units)
  left: string;
  top: string;
  width: string;
  height: string;
  // Light / Dark mode colors
  lightColor: string;
  darkColor: string;
  // Animation
  animate: Record<string, number[]>;
  duration: number;
}

const PANELS: PanelConfig[] = [
  {
    left: '5%', top: '-10%', width: '220px', height: '140%',
    lightColor: 'hsla(28, 80%, 78%, 0.4)',   // Soft Orange
    darkColor: 'hsla(244, 47%, 20%, 0.4)',    // Deep Indigo
    animate: { y: [-20, 20] },
    duration: 15,
  },
  {
    left: '22%', top: '-5%', width: '160px', height: '130%',
    lightColor: 'hsla(210, 60%, 82%, 0.4)',   // Pale Blue
    darkColor: 'hsla(222, 47%, 11%, 0.4)',    // Charcoal
    animate: { x: [-30, 30] },
    duration: 22,
  },
  {
    left: '42%', top: '-15%', width: '280px', height: '150%',
    lightColor: 'hsla(270, 40%, 85%, 0.4)',   // Lavender
    darkColor: 'hsla(244, 47%, 20%, 0.35)',   // Deep Indigo
    animate: { rotate: [-1, 1] },
    duration: 18,
  },
  {
    left: '62%', top: '-8%', width: '120px', height: '135%',
    lightColor: 'hsla(28, 70%, 82%, 0.35)',   // Soft Orange light
    darkColor: 'hsla(222, 47%, 11%, 0.35)',   // Charcoal
    animate: { y: [15, -15] },
    duration: 20,
  },
  {
    left: '80%', top: '-12%', width: '200px', height: '145%',
    lightColor: 'hsla(210, 55%, 86%, 0.35)',  // Pale Blue light
    darkColor: 'hsla(244, 47%, 20%, 0.3)',    // Deep Indigo muted
    animate: { x: [20, -20] },
    duration: 25,
  },
];

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

  // Track dark mode
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  // Mouse parallax — entire group shifts by 0.02 factor
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 50, damping: 30 });
  const springY = useSpring(my, { stiffness: 50, damping: 30 });

  useEffect(() => {
    if (!isDesktop) return;
    // Convert 0-100 to centered offset, multiply by 0.02 factor
    mx.set((mouseX - 50) * 0.4); // 50 * 0.02 * 20px range = ±10px
    my.set((mouseY - 50) * 0.4);
  }, [mouseX, mouseY, isDesktop, mx, my]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Layer 1: Moving rectangles */}
      <motion.div
        className="absolute inset-0"
        style={isDesktop ? { x: springX, y: springY } : undefined}
      >
        {PANELS.map((panel, i) => (
          <GlassPanel
            key={i}
            config={panel}
            isDark={isDark}
            mouseX={mouseX}
            mouseY={mouseY}
            isDesktop={isDesktop}
            reducedMotion={reducedMotion}
            index={i}
          />
        ))}
      </motion.div>

      {/* Layer 2: Frosted blur overlay — above rectangles, below text */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backdropFilter: 'blur(80px)',
          WebkitBackdropFilter: 'blur(80px)',
        }}
      />

      {/* Layer 3: Film grain noise */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
    </div>
  );
};

/* ─── Individual Glass Panel ─── */
const GlassPanel = ({
  config,
  isDark,
  mouseX,
  mouseY,
  isDesktop,
  reducedMotion,
  index,
}: {
  config: PanelConfig;
  isDark: boolean;
  mouseX: number;
  mouseY: number;
  isDesktop: boolean;
  reducedMotion: boolean;
  index: number;
}) => {
  const color = isDark ? config.darkColor : config.lightColor;

  // Calculate proximity to mouse for opacity boost
  const [proximity, setProximity] = useState(0);

  useEffect(() => {
    if (!isDesktop) {
      setProximity(0);
      return;
    }
    // Approximate panel center from CSS values
    const panelCenterX = parseFloat(config.left) + parseFloat(config.width) / (2 * 19.2); // rough %
    const panelCenterY = 50; // approximate center
    const dist = Math.sqrt(
      (mouseX - panelCenterX) ** 2 + (mouseY - panelCenterY) ** 2
    );
    const maxDist = 40; // proximity radius in % units
    setProximity(Math.max(0, 1 - dist / maxDist));
  }, [mouseX, mouseY, isDesktop, config.left, config.width]);

  // Opacity: base 0.4 → up to 0.6 on proximity
  const dynamicOpacity = 0.4 + proximity * 0.2;

  // Build the color with dynamic opacity
  const dynamicColor = color.replace(/[\d.]+\)$/, `${dynamicOpacity.toFixed(2)})`);

  return (
    <motion.div
      className="absolute will-change-transform"
      style={{
        left: config.left,
        top: config.top,
        width: config.width,
        height: config.height,
        backgroundColor: dynamicColor,
        transform: 'skewY(-25deg)',
        borderRadius: '2px',
        transition: 'background-color 1s ease-in-out',
        // Edge refraction — subtle inner glow
        boxShadow: isDark
          ? 'inset 1px 0 0 rgba(255,255,255,0.08), inset -1px 0 0 rgba(255,255,255,0.08)'
          : 'inset 1px 0 0 rgba(255,255,255,0.15), inset -1px 0 0 rgba(255,255,255,0.15)',
      }}
      animate={reducedMotion ? undefined : config.animate}
      transition={
        reducedMotion
          ? undefined
          : {
              repeat: Infinity,
              repeatType: 'mirror' as const,
              duration: config.duration,
              ease: 'easeInOut',
            }
      }
    />
  );
};

export default GeometricKinetic;
