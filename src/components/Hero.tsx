import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowDown, ArrowRight, MapPin } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const stats = [
  { value: '850K+', label: 'Monthly Users' },
  { value: '22M+', label: 'Installs' },
  { value: '$1.5M+', label: 'Savings' },
  { value: 'Top 10', label: 'App Store' },
];

// Neural Mesh Canvas — low-opacity grid that ripples on cursor
const NeuralMesh = ({ mouseX, mouseY }: { mouseX: number; mouseY: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();
  const nodesRef = useRef<{ x: number; y: number; baseX: number; baseY: number }[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });

  const initNodes = useCallback((w: number, h: number) => {
    const spacing = 60;
    const nodes: typeof nodesRef.current = [];
    for (let x = 0; x < w + spacing; x += spacing) {
      for (let y = 0; y < h + spacing; y += spacing) {
        nodes.push({ x, y, baseX: x, baseY: y });
      }
    }
    nodesRef.current = nodes;
    sizeRef.current = { w, h };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      initNodes(rect.width, rect.height);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [initNodes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseX * w / 100;
      const my = mouseY * h / 100;
      const rippleRadius = 180;

      // Compute if dark mode
      const isDark = document.documentElement.classList.contains('dark');
      const lineColor = isDark ? 'rgba(0, 212, 255,' : 'rgba(140, 140, 140,';

      for (const node of nodesRef.current) {
        const dx = mx - node.baseX;
        const dy = my - node.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < rippleRadius) {
          const force = (1 - dist / rippleRadius) * 12;
          node.x = node.baseX - (dx / dist) * force;
          node.y = node.baseY - (dy / dist) * force;
        } else {
          node.x += (node.baseX - node.x) * 0.08;
          node.y += (node.baseY - node.y) * 0.08;
        }
      }

      // Draw connections
      const spacing = 60;
      const cols = Math.ceil(w / spacing) + 1;
      for (let i = 0; i < nodesRef.current.length; i++) {
        const n = nodesRef.current[i];
        // Right neighbor
        const right = nodesRef.current[i + 1];
        if (right && Math.abs(n.baseY - right.baseY) < 1) {
          const d = Math.sqrt((mx - n.x) ** 2 + (my - n.y) ** 2);
          const alpha = Math.max(0.03, Math.min(0.15, 1 - d / 400));
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(right.x, right.y);
          ctx.strokeStyle = `${lineColor} ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
        // Down neighbor
        const down = nodesRef.current[i + cols];
        if (down) {
          const d = Math.sqrt((mx - n.x) ** 2 + (my - n.y) ** 2);
          const alpha = Math.max(0.03, Math.min(0.15, 1 - d / 400));
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(down.x, down.y);
          ctx.strokeStyle = `${lineColor} ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 'var(--hero-mesh-opacity, 0.1)' }}
    />
  );
};

// Bento stat card with spring hover
const StatCard = ({ value, label, index }: { value: string; label: string; index: number }) => {
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  return (
    <motion.div
      className="hero-glass-card rounded-2xl px-5 py-5 text-center cursor-default select-none"
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
      {/* Neural Mesh Background */}
      {isDesktop && <NeuralMesh mouseX={mousePos.x} mouseY={mousePos.y} />}

      {/* Content with parallax */}
      <div className="container relative z-20 flex min-h-screen flex-col items-center justify-center px-6 sm:px-8 lg:px-12 py-24 sm:py-28 md:py-32 lg:py-40 text-center">
        <motion.div
          className="flex flex-col items-center gap-6 sm:gap-7 md:gap-8 max-w-4xl"
          style={isDesktop ? { x: parallaxX, y: parallaxY } : undefined}
        >
          {/* Eyebrow */}
          <motion.p
            className="text-xs font-medium uppercase tracking-[0.3em] text-[hsl(var(--hero-text-sub))]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            Product Designer · San Francisco
          </motion.p>

          {/* Main headline */}
          <h1 className="font-display font-bold leading-[1.05] tracking-tight">
            <motion.span
              className="block text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] text-[hsl(var(--hero-text))]"
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-2xl">
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
            <a
              href="#case-studies"
              className="group inline-flex items-center gap-3 rounded-xl px-7 py-3.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-[hsl(var(--hero-accent))] text-white"
              style={{ boxShadow: '0 0 24px hsla(var(--hero-accent), 0.25)' }}
            >
              View Case Studies
              <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#process"
              className="group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02] border text-[hsl(var(--hero-text))] border-[hsla(var(--hero-text),0.15)] hover:border-[hsla(var(--hero-text),0.4)]"
            >
              Learn My Process
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
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
