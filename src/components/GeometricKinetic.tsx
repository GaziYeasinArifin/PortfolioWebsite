import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';

/**
 * Anamorphic Refraction — v6
 *
 * 7 "Light Slashes" at exact 65° (rotate: 65deg), varying from broad soft
 * (300px) to thin sharp hairlines (2px). Independent drift animations,
 * depth-based parallax, mouse-driven illumination, frosted blur layer,
 * silica grain, and rim-light edge glow on sharp slashes.
 */

interface SlashConfig {
  left: string;        // CSS position
  top: string;
  width: number;       // px at 1920 baseline
  height: string;      // CSS height
  depth: number;       // 0=far back, 1=front — affects parallax & opacity
  driftX: [number, number]; // horizontal drift range in px
  driftDuration: number;    // seconds
  lightColor: string;  // hsla
  darkColor: string;   // hsla
  sharp: boolean;      // thin slash with rim light
}

const SLASHES: SlashConfig[] = [
  // Broad soft — Deep Indigo / Silver
  {
    left: '8%', top: '-20%', width: 300, height: '160%',
    depth: 0.1, driftX: [-35, 35], driftDuration: 28,
    lightColor: 'hsla(210, 50%, 88%, 0.35)',
    darkColor: 'hsla(244, 47%, 20%, 0.30)',
    sharp: false,
  },
  // Medium — Lavender / Indigo
  {
    left: '25%', top: '-15%', width: 180, height: '150%',
    depth: 0.25, driftX: [30, -30], driftDuration: 24,
    lightColor: 'hsla(270, 35%, 87%, 0.30)',
    darkColor: 'hsla(244, 47%, 18%, 0.25)',
    sharp: false,
  },
  // Thin hairline — edge highlight
  {
    left: '35%', top: '-10%', width: 2, height: '140%',
    depth: 0.7, driftX: [-20, 20], driftDuration: 20,
    lightColor: 'hsla(0, 0%, 100%, 0.18)',
    darkColor: 'hsla(0, 0%, 100%, 0.08)',
    sharp: true,
  },
  // Broad soft — Pale Blue / Charcoal
  {
    left: '48%', top: '-25%', width: 260, height: '170%',
    depth: 0.15, driftX: [-40, 40], driftDuration: 30,
    lightColor: 'hsla(210, 55%, 85%, 0.28)',
    darkColor: 'hsla(222, 47%, 11%, 0.28)',
    sharp: false,
  },
  // Medium-thin — Cyan accent
  {
    left: '60%', top: '-12%', width: 80, height: '145%',
    depth: 0.45, driftX: [25, -25], driftDuration: 22,
    lightColor: 'hsla(195, 50%, 85%, 0.25)',
    darkColor: 'hsla(200, 80%, 40%, 0.12)',
    sharp: false,
  },
  // Thin hairline — edge highlight
  {
    left: '72%', top: '-8%', width: 2, height: '135%',
    depth: 0.8, driftX: [-15, 15], driftDuration: 18,
    lightColor: 'hsla(0, 0%, 100%, 0.15)',
    darkColor: 'hsla(0, 0%, 100%, 0.06)',
    sharp: true,
  },
  // Broad soft — Warm Pearl / Deep Indigo
  {
    left: '82%', top: '-18%', width: 220, height: '155%',
    depth: 0.2, driftX: [30, -30], driftDuration: 26,
    lightColor: 'hsla(28, 40%, 90%, 0.30)',
    darkColor: 'hsla(244, 47%, 22%, 0.22)',
    sharp: false,
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

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  // Mouse parallax for entire group (gentle)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 40, damping: 30 });
  const springY = useSpring(my, { stiffness: 40, damping: 30 });

  useEffect(() => {
    if (!isDesktop) return;
    mx.set((mouseX - 50) * 0.3);
    my.set((mouseY - 50) * 0.3);
  }, [mouseX, mouseY, isDesktop, mx, my]);

  // Scale factor for responsive widths
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => setScale(Math.max(window.innerWidth / 1920, 0.5));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Layer 1: Light Slashes */}
      <motion.div
        className="absolute inset-0"
        style={isDesktop ? { x: springX, y: springY } : undefined}
      >
        {SLASHES.map((slash, i) => (
          <LightSlash
            key={i}
            config={slash}
            isDark={isDark}
            mouseX={mouseX}
            mouseY={mouseY}
            isDesktop={isDesktop}
            reducedMotion={reducedMotion}
            scale={scale}
          />
        ))}
      </motion.div>

      {/* Layer 2: Frosted blur — "refraction" layer */}
      <FrostLayer mouseX={mouseX} mouseY={mouseY} isDesktop={isDesktop} />

      {/* Layer 3: Silica grain */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
    </div>
  );
};

/* ─── Frost Layer with mouse-driven focus reduction ─── */
const FrostLayer = ({ mouseX, mouseY, isDesktop }: { mouseX: number; mouseY: number; isDesktop: boolean }) => {
  // Dynamic blur: base 120px, reduced to 60px within 250px of cursor
  // We approximate this with a radial "clear" overlay
  return (
    <div className="absolute inset-0 z-[1]">
      {/* Base heavy blur */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: 'blur(120px)',
          WebkitBackdropFilter: 'blur(120px)',
        }}
      />
      {/* Focus reveal near cursor — reduces blur effect */}
      {isDesktop && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(250px circle at ${mouseX}% ${mouseY}%, rgba(255,255,255,0.03) 0%, transparent 100%)`,
          }}
        />
      )}
    </div>
  );
};

/* ─── Individual Light Slash ─── */
const LightSlash = ({
  config,
  isDark,
  mouseX,
  mouseY,
  isDesktop,
  reducedMotion,
  scale,
}: {
  config: SlashConfig;
  isDark: boolean;
  mouseX: number;
  mouseY: number;
  isDesktop: boolean;
  reducedMotion: boolean;
  scale: number;
}) => {
  const color = isDark ? config.darkColor : config.lightColor;
  const scaledWidth = Math.max(config.width * scale, config.sharp ? 1 : 40);

  // Parallax: deeper layers move slower with mouse
  const depthFactor = config.depth;
  const parallaxX = isDesktop ? (mouseX - 50) * depthFactor * 0.5 : 0;
  const parallaxY = isDesktop ? (mouseY - 50) * depthFactor * 0.3 : 0;

  // Proximity-based brightness boost
  const panelCenterX = parseFloat(config.left);
  const dist = Math.sqrt(
    (mouseX - panelCenterX) ** 2 + (mouseY - 50) ** 2
  );
  const illumination = isDesktop && dist < 35
    ? (1 - dist / 35) * 0.25
    : 0;

  // Extract base alpha and boost it
  const baseAlpha = parseFloat(color.match(/[\d.]+\)$/)?.[0] || '0.3');
  const boostedAlpha = Math.min(baseAlpha + illumination, 0.55);
  const dynamicColor = color.replace(/[\d.]+\)$/, `${boostedAlpha.toFixed(3)})`);

  // Rim light for sharp slashes
  const rimLight = config.sharp
    ? isDark
      ? 'inset 0 0 0 1px rgba(255,255,255,0.10)'
      : 'inset 0 0 0 1px rgba(255,255,255,0.20)'
    : 'none';

  return (
    <motion.div
      className="absolute will-change-transform"
      style={{
        left: config.left,
        top: config.top,
        width: `${scaledWidth}px`,
        height: config.height,
        backgroundColor: dynamicColor,
        transform: `rotate(65deg) translate(${parallaxX}px, ${parallaxY}px)`,
        transformOrigin: 'center center',
        borderRadius: config.sharp ? '0px' : '2px',
        transition: 'background-color 1s ease-in-out',
        boxShadow: rimLight,
        // Soft edges for broad slashes
        ...(config.sharp ? {} : {
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        }),
      }}
      animate={reducedMotion ? undefined : {
        x: config.driftX,
      }}
      transition={
        reducedMotion ? undefined : {
          repeat: Infinity,
          repeatType: 'mirror' as const,
          duration: config.driftDuration,
          ease: 'easeInOut',
        }
      }
    />
  );
};

export default GeometricKinetic;
