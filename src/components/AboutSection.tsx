import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Compass, PenTool, BrainCircuit, Layers, Shield,
  Sparkles, BarChart3, Lightbulb, MapPin,
} from 'lucide-react';
import aboutImage from '@/assets/about-1.png';

// ── Data ───────────────────────────────────────────────
const impactStats = [
  { value: '22M+', label: 'Installs', sublabel: 'iOS & Android' },
  { value: '$1.5M', label: 'Savings', sublabel: 'Design Systems' },
  { value: '130+', label: 'Interviews', sublabel: 'At Scale' },
  { value: '210+', label: 'A/B Tests', sublabel: 'Managed' },
];

const skills = [
  { label: 'Product Strategy', icon: Compass },
  { label: 'Interaction Design', icon: PenTool },
  { label: 'ML / AI Interface Design', icon: BrainCircuit },
  { label: 'Prototyping & Motion', icon: Sparkles },
  { label: 'Design Systems', icon: Layers },
  { label: 'System Governance', icon: Shield },
  { label: 'Data-Driven Design', icon: BarChart3 },
  { label: 'UX Research', icon: Lightbulb },
];

const trustedBy = [
  'InShot', 'Screenlife', 'Spotlight', 'Cal State EB', 'Maze', 'Amplitude', 'Figma', 'Dovetail',
];

// ── Stagger animation ──────────────────────────────────
const cellVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
  }),
};

// Shared rim-light shadow (1px top inset, white 10%)
const rimLight = 'inset 0 1px 0 0 hsla(0,0%,100%,0.1)';
const rimLightDark = 'inset 0 1px 0 0 hsla(0,0%,100%,0.06)';

// ── Metric Pill ────────────────────────────────────────
const MetricPill = ({ stat, index }: { stat: typeof impactStats[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className="metric-pill group relative overflow-hidden rounded-[var(--radius-sm)] p-5
        backdrop-blur-xl
        border border-[hsla(0,0%,0%,0.06)] dark:border-[hsla(0,0%,100%,0.1)]
        transition-all duration-500 cursor-default"
      custom={index + 3}
      variants={cellVariant}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover={{ scale: 1.02, y: -2 }}
      style={{
        background: 'hsla(0,0%,100%,0.05)',
        boxShadow: rimLight,
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[var(--radius-sm)]"
        style={{
          background: 'radial-gradient(ellipse at center, hsla(210,100%,60%,0.1) 0%, transparent 70%)',
        }}
      />
      <div className="relative z-10">
        {/* Gradient number — Cyan-to-Blue, matching hero */}
        <div
          className="text-2xl md:text-3xl font-bold metric-gradient-text"
          style={{ fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace" }}
        >
          {stat.value}
        </div>
        <div className="mt-1 text-sm font-medium text-foreground/60">{stat.label}</div>
        <div className="text-[11px] font-mono tracking-wider uppercase text-muted-foreground/60 mt-0.5">
          {stat.sublabel}
        </div>
      </div>
    </motion.div>
  );
};

// ── Ghost Tag ──────────────────────────────────────────
const GhostTag = ({ skill, index }: { skill: typeof skills[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-2 px-3 py-2 rounded-[var(--radius-xs)] cursor-default select-none
        border border-[hsla(0,0%,0%,0.06)] dark:border-[hsla(0,0%,100%,0.1)]
        bg-transparent hover:bg-[hsla(0,0%,0%,0.02)] dark:hover:bg-[hsla(0,0%,100%,0.04)]
        transition-all duration-300 group"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.04, duration: 0.4 }}
    >
      <skill.icon
        className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300 flex-shrink-0"
        strokeWidth={1.5}
      />
      <span className="text-[13px] font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300 whitespace-nowrap">
        {skill.label}
      </span>
    </motion.div>
  );
};

// ── Trusted-By Marquee ─────────────────────────────────
const TrustedByMarquee = () => {
  const LogoItem = ({ name }: { name: string }) => (
    <span className="inline-flex items-center mx-6 md:mx-10">
      <span className="text-sm md:text-base font-display font-semibold tracking-wide text-muted-foreground/40 uppercase whitespace-nowrap">
        {name}
      </span>
    </span>
  );

  const Track = () => (
    <div className="flex items-center">
      {trustedBy.map((name) => (
        <LogoItem key={name} name={name} />
      ))}
    </div>
  );

  return (
    <div className="mt-16 md:mt-20">
      <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground text-center mb-6">
        Tools & Teams I've Worked With
      </p>
      <div className="overflow-hidden group">
        <div className="flex">
          <div className="marquee flex items-center shrink-0 group-hover:[animation-play-state:paused]">
            <Track /><Track />
          </div>
          <div className="marquee flex items-center shrink-0 group-hover:[animation-play-state:paused]" aria-hidden="true">
            <Track /><Track />
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main About Section — Bento Grid ────────────────────
const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const isGridInView = useInView(gridRef, { once: true, margin: '-60px' });

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="relative py-24 md:py-32 overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: 'hsl(var(--about-bg))' }}
    >
      <div className="container relative z-10 max-w-6xl">
        {/* Section label */}
        <motion.span
          className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground block mb-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About
        </motion.span>

        {/* ── Bento Grid — 24px gap ── */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: 24 }}>

          {/* Cell A — Narrative Card (2/3 width), 40px internal padding */}
          <motion.div
            className="lg:col-span-2 rounded-[var(--radius-card)]
              bg-[hsl(var(--surface-card))]
              border border-[hsl(var(--surface-card-border))]
              dark:border-[hsla(0,0%,100%,0.06)]"
            custom={0}
            variants={cellVariant}
            initial="hidden"
            animate={isGridInView ? 'visible' : 'hidden'}
            style={{
              padding: 40,
              boxShadow: `${rimLight}, var(--surface-shadow)`,
            }}
          >
            <h2
              className="font-display font-bold leading-[1.15] tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-[2rem] text-foreground"
              style={{ marginBottom: 32 }}
            >
              11+ years leading design for high-scale AI systems, moving the needle on adoption and multi-million dollar business goals.
            </h2>

            <div className="space-y-5">
              <p className="text-base md:text-lg text-muted-foreground leading-[1.6]">
                <span className="font-semibold text-foreground text-[1.1em]">AI meets intuition.</span>{' '}
                I specialize in the intersection of product design and AI systems, building interfaces that translate complex machine learning models into experiences people actually trust and enjoy.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-[1.6]">
                <span className="font-semibold text-foreground text-[1.1em]">Scale without compromise.</span>{' '}
                My work spans iOS, Android, and SaaS platforms serving millions of users, where every pixel must perform under real-world constraints like latency budgets, confidence thresholds, and cross-platform parity.
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-[1.6]">
                <span className="font-semibold text-foreground text-[1.1em]">Proven at InShot.</span>{' '}
                I led design across 3 creative apps that hit the App Store Top 10, established a cross-platform design system, and drove $1.5M+ in operational savings.
              </p>
            </div>
          </motion.div>

          {/* Cell B — Human Card (1/3 width) */}
          <motion.div
            className="lg:col-span-1 relative rounded-[var(--radius-card)] overflow-hidden group
              border border-[hsl(var(--surface-card-border))]
              dark:border-[hsla(0,0%,100%,0.06)]
              aspect-[4/5] lg:aspect-auto"
            custom={1}
            variants={cellVariant}
            initial="hidden"
            animate={isGridInView ? 'visible' : 'hidden'}
            style={{ boxShadow: rimLight }}
          >
            <img
              src={aboutImage}
              alt="Gazi Yeasin Arifin"
              className="no-border h-full w-full object-cover object-center
                grayscale-[40%] saturate-[70%]
                group-hover:grayscale-0 group-hover:saturate-100
                transition-all duration-700 ease-out"
              style={{ borderRadius: 'var(--radius-card)' }}
            />

            {/* Status tag — bottom-left, glassmorphism */}
            <div
              className="absolute bottom-4 left-4 z-10
                flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                background: 'hsla(0,0%,0%,0.5)',
                border: '1px solid hsla(0,0%,100%,0.12)',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-[11px] font-medium flex items-center gap-1" style={{ color: 'hsla(0,0%,100%,0.9)' }}>
                <MapPin className="h-3 w-3" /> San Francisco
              </span>
            </div>
          </motion.div>

          {/* Cell C — Metric Pills (4 equal columns across full width) */}
          <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-4" style={{ gap: 24 }}>
            {impactStats.map((stat, i) => (
              <MetricPill key={stat.label} stat={stat} index={i} />
            ))}
          </div>

          {/* Cell D — Competencies (full width) */}
          <motion.div
            className="lg:col-span-3 rounded-[var(--radius-card)]
              bg-[hsl(var(--surface-card))]
              border border-[hsl(var(--surface-card-border))]
              dark:border-[hsla(0,0%,100%,0.06)]"
            custom={7}
            variants={cellVariant}
            initial="hidden"
            animate={isGridInView ? 'visible' : 'hidden'}
            style={{
              padding: '32px 40px',
              boxShadow: `${rimLight}, var(--surface-shadow)`,
            }}
          >
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-5">
              Core Competencies
            </p>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <GhostTag key={skill.label} skill={skill} index={i} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Trusted-By Marquee */}
        <TrustedByMarquee />
      </div>
    </section>
  );
};

export default AboutSection;
