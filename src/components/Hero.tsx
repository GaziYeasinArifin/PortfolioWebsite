import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import MagneticWrapper from '@/components/MagneticWrapper';

// ─── Typewriter Hook ───────────────────────────────────────────────
const PREFIXES = ['PRODUCT', 'UX', 'INTERACTION'];
const SUFFIX = '  DESIGNER';
const TYPE_SPEED = 80;
const DELETE_SPEED = 40;
const PAUSE_DURATION = 3000;
const INITIAL_DELAY = 1500;

type Phase = 'idle' | 'deleting' | 'typing' | 'paused';

function useTypewriter() {
  const [prefixIndex, setPrefixIndex] = useState(0);
  const [displayed, setDisplayed] = useState(PREFIXES[0]); // start with PRODUCT
  const [phase, setPhase] = useState<Phase>('idle');
  const [cursorVisible, setCursorVisible] = useState(false);
  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    // Initial pause, then start deleting
    const initialTimer = setTimeout(() => {
      setPhase('deleting');
      setCursorVisible(true);
    }, INITIAL_DELAY);
    return () => clearTimeout(initialTimer);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || phase === 'idle') return;

    if (phase === 'deleting') {
      if (displayed.length === 0) {
        // Move to next prefix
        const next = (prefixIndex + 1) % PREFIXES.length;
        setPrefixIndex(next);
        setPhase('typing');
        return;
      }
      const timer = setTimeout(() => {
        setDisplayed(prev => prev.slice(0, -1));
      }, DELETE_SPEED);
      return () => clearTimeout(timer);
    }

    if (phase === 'typing') {
      const target = PREFIXES[prefixIndex];
      if (displayed.length === target.length) {
        setCursorVisible(false);
        setPhase('paused');
        return;
      }
      const timer = setTimeout(() => {
        setDisplayed(target.slice(0, displayed.length + 1));
      }, TYPE_SPEED);
      return () => clearTimeout(timer);
    }

    if (phase === 'paused') {
      const timer = setTimeout(() => {
        setCursorVisible(true);
        setPhase('deleting');
      }, PAUSE_DURATION);
      return () => clearTimeout(timer);
    }
  }, [phase, displayed, prefixIndex, reducedMotion]);

  // Cursor blink during active phases
  const [cursorBlink, setCursorBlink] = useState(true);
  useEffect(() => {
    if (!cursorVisible) return;
    const interval = setInterval(() => setCursorBlink(prev => !prev), 500);
    return () => clearInterval(interval);
  }, [cursorVisible]);

  return { displayed, cursorVisible, cursorBlink, reducedMotion };
}

const stats = [
  { value: '850K+', label: 'Monthly Users' },
  { value: '22M+', label: 'Installs' },
  { value: '$1.5M+', label: 'Savings' },
  { value: 'Top 10', label: 'App Store' },
];

import GeometricKinetic from '@/components/GeometricKinetic';

// ─── Typewriter Eyebrow Component ──────────────────────────────────
const TypewriterEyebrow = () => {
  const { displayed, cursorVisible, cursorBlink, reducedMotion } = useTypewriter();

  if (reducedMotion) {
    return (
      <span className="text-xs font-medium uppercase tracking-[0.15em] text-[hsl(var(--hero-text-sub))] font-mono">
        PRODUCT DESIGNER
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-baseline text-xs font-medium uppercase tracking-[0.15em] text-[hsl(var(--hero-text-sub))]"
      style={{ fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace", fontWeight: 500 }}
    >
      {/* Dynamic prefix — min-width prevents DESIGNER from jumping */}
      <span
        className="inline-block text-right"
        style={{ minWidth: '9.5ch' }}
      >
        {displayed}
      </span>
      {/* Static suffix */}
      <span>{SUFFIX}</span>
    </span>
  );
};

// Glassmorphic stat card with magnetic pull
const StatCard = ({ value, label, index }: { value: string; label: string; index: number }) => {
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <MagneticWrapper strength={0.2} radius={80}>
      <motion.div
        className="px-5 py-5 text-center cursor-default select-none rounded-[var(--radius-sm)]
          bg-white/40 dark:bg-black/40
          backdrop-blur-[20px] border border-white/20 dark:border-white/10
          transition-all duration-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 + index * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ y: springY }}
        onHoverStart={() => y.set(-6)}
        onHoverEnd={() => y.set(0)}
      >
        <div className="font-display text-2xl sm:text-3xl font-bold text-[hsl(var(--hero-text))]">
          {value}
        </div>
        <div className="text-xs sm:text-sm mt-1.5 text-[hsl(var(--hero-text-sub))]">
          {label}
        </div>
      </motion.div>
    </MagneticWrapper>
  );
};

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isDesktop, setIsDesktop] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>();

  // Parallax motion values
  const mouseXMotion = useMotionValue(0);
  const mouseYMotion = useMotionValue(0);
  const parallaxX = useSpring(useTransform(mouseXMotion, [-0.5, 0.5], [-8, 8]), { stiffness: 100, damping: 30 });
  const parallaxY = useSpring(useTransform(mouseYMotion, [-0.5, 0.5], [-6, 6]), { stiffness: 100, damping: 30 });

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setMousePos({ x: nx * 100, y: ny * 100 });
      mouseXMotion.set(nx - 0.5);
      mouseYMotion.set(ny - 0.5);
    });
  }, [mouseXMotion, mouseYMotion]);

  useEffect(() => {
    if (!isDesktop) return;
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDesktop, handleMouseMove]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: 'hsl(var(--hero-bg))',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Geometric Kinetic Background */}
      <GeometricKinetic mouseX={mousePos.x} mouseY={mousePos.y} isDesktop={isDesktop} />

      {/* Content with parallax */}
      <div className="container relative z-20 flex min-h-screen flex-col items-center justify-center px-6 sm:px-8 lg:px-12 py-24 sm:py-32 md:py-40 lg:py-48 text-center">
        <motion.div
          className="flex flex-col items-center gap-6 sm:gap-7 md:gap-8 max-w-4xl"
          style={isDesktop ? { x: parallaxX, y: parallaxY } : undefined}
        >
          {/* Typewriter Eyebrow */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            <TypewriterEyebrow />
          </motion.div>

          {/* Main headline */}
          <h1
            className="font-display font-bold leading-[1.05] tracking-[-0.04em] uppercase"
            style={{
              textShadow: '3px 6px 12px rgba(0, 0, 0, 0.12)',
              filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.06))',
            }}
          >
            <motion.span
              className="block whitespace-nowrap text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] text-[hsl(var(--hero-text))]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              Product Design Leader
            </motion.span>
            <motion.span
              className="block text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] text-[hsl(var(--hero-text))]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              For <span className="hero-gradient-text">AI-Powered</span> Systems
            </motion.span>
          </h1>

          {/* Sub-headline */}
          <motion.p
            className="max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-[hsl(var(--hero-text-sub))]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Designing for <span className="font-medium text-[hsl(var(--hero-text))]">22M+</span> users and driving{' '}
            <span className="font-medium text-[hsl(var(--hero-text))]">$1.5M+</span> in measurable impact through high-scale iOS and SaaS systems.
          </motion.p>

          {/* Bento Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} {...stat} index={i} />
            ))}
          </div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <MagneticWrapper strength={0.3} radius={100}>
              <a
                href="#case-studies"
                className="group inline-flex items-center gap-3 rounded-md px-8 py-4 text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-[hsl(var(--hero-accent))] text-white"
                style={{ boxShadow: '0 0 24px hsla(var(--hero-accent), 0.25)' }}
              >
                View Case Studies
                <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </MagneticWrapper>
            <MagneticWrapper strength={0.3} radius={100}>
              <a
                href="#process"
                className="group inline-flex items-center gap-2 rounded-md px-8 py-4 text-sm font-medium transition-all duration-300 hover:scale-[1.02] border text-[hsl(var(--hero-text))] border-[hsla(var(--hero-text),0.15)] hover:border-[hsla(var(--hero-text),0.4)]"
              >
                Learn My Process
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </MagneticWrapper>
          </motion.div>

          {/* Location Badge */}
          <motion.div
            className="flex items-center gap-2 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" style={{ animation: 'hero-dot-pulse 2s ease-in-out infinite' }} />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs tracking-wider uppercase text-[hsl(var(--hero-text-sub))]">
              Now in San Francisco
            </span>
          </motion.div>

          {/* Scroll indicator */}
          <motion.a
            href="#case-studies"
            className="hidden lg:flex items-center gap-3 mt-8 group transition-opacity hover:opacity-80 text-[hsl(var(--hero-text-sub))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Scroll</span>
            <div className="relative w-5 h-8 rounded-full border border-current flex justify-center">
              <div className="absolute top-1.5 w-0.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDuration: '1.5s' }} />
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
