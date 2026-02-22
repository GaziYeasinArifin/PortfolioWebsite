import { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Search, BrainCircuit, FlaskConical, Shield } from 'lucide-react';

// ── Step Data ──────────────────────────────────────────
const steps = [
  {
    number: '01',
    title: 'Data & Discovery',
    subtitle: 'Research Synthesis',
    description: 'Grounding every decision in evidence through mixed-methods research and AI-assisted data synthesis.',
    icon: Search,
    metric: { value: '131+', label: 'User Interviews' },
    details: [
      'Qualitative & quantitative data mining',
      'AI-assisted pattern recognition (Dovetail, Claude)',
      'Behavioral analytics & Hotjar session analysis',
    ],
    codeSnippet: null,
  },
  {
    number: '02',
    title: 'Architectural Strategy',
    subtitle: 'Systems Thinking',
    description: 'Translating research insights into systemic design logic with AI latency handling and edge-case coverage.',
    icon: BrainCircuit,
    metric: { value: '620+', label: 'Hotjar Recordings' },
    details: [
      'Information architecture & user flow mapping',
      'AI confidence scoring & fallback design',
      'Edge-case identification & error states',
    ],
    codeSnippet: {
      title: 'ai_confidence_model.json',
      code: `{
  "model": "content-recommendation-v3",
  "confidence_threshold": 0.82,
  "fallback_strategy": "human_curated",
  "latency_budget_ms": 120,
  "user_segments": ["power_user", "casual"]
}`,
    },
  },
  {
    number: '03',
    title: 'Rapid Iteration',
    subtitle: 'Test & Validate',
    description: 'High-velocity experimentation through prototyping, A/B testing, and data-driven validation loops.',
    icon: FlaskConical,
    metric: { value: '210+', label: 'A/B Tests Launched' },
    details: [
      'High-fidelity prototyping & motion design',
      'Remote usability testing (Maze, UserTesting)',
      '100+ A/B tests to validate AI-sync logic',
    ],
    codeSnippet: null,
  },
  {
    number: '04',
    title: 'Governance & Scale',
    subtitle: 'Design Systems',
    description: 'Building scalable design infrastructure, developer handoff systems, and measurable business outcomes.',
    icon: Shield,
    metric: { value: '$1.5M+', label: 'Savings Generated' },
    details: [
      'Cross-platform design system governance',
      'Developer handoff & token documentation',
      'Post-launch measurement & continuous improvement',
    ],
    codeSnippet: null,
  },
];

// ── Dotted Grid Background (SVG pattern) ───────────────
const DottedGrid = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
    <defs>
      <pattern id="dotgrid" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.8" fill="hsl(var(--process-dot-color))" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dotgrid)" />
  </svg>
);

// ── Icon Chip ──────────────────────────────────────────
const IconChip = ({ Icon, isInView }: { Icon: typeof Search; isInView: boolean }) => (
  <motion.div
    className="relative flex h-12 w-12 items-center justify-center rounded-md
      bg-[hsl(var(--process-card-bg))] border border-[hsl(var(--process-card-border))]"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={isInView ? { scale: 1, opacity: 1 } : {}}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    style={{
      boxShadow: '0 0 16px hsla(var(--process-accent), 0.1), inset 0 0 8px hsla(var(--process-accent), 0.05)',
    }}
  >
    <Icon className="h-5 w-5 text-[hsl(var(--process-accent))]" strokeWidth={1.5} />
  </motion.div>
);

// ── Code Block ─────────────────────────────────────────
const CodeBlock = ({ title, code }: { title: string; code: string }) => (
  <div className="mt-4 rounded-md overflow-hidden border border-[hsl(var(--process-card-border))] bg-[hsl(var(--process-bg))]">
    <div className="flex items-center gap-2 px-4 py-2 border-b border-[hsl(var(--process-card-border))]">
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
      </div>
      <span className="text-[10px] font-mono text-muted-foreground tracking-wide">{title}</span>
    </div>
    <pre className="p-4 text-[11px] font-mono leading-relaxed text-muted-foreground overflow-x-auto">
      <code>{code}</code>
    </pre>
  </div>
);

// ── Step Card ──────────────────────────────────────────
const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-80px' });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      <div
        className="relative overflow-hidden rounded-card border border-[hsl(var(--process-card-border))]
          bg-[hsl(var(--process-card-bg))] p-6 md:p-8 transition-all duration-500"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 50, y: 50 })}
        style={{
          boxShadow: 'var(--card-shadow)',
        }}
      >
        {/* Hover radial glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, hsla(var(--process-accent), 0.06) 0%, transparent 70%)`,
          }}
        />

        {/* Dotted grid inside card */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <DottedGrid />
        </div>

        <div className="relative z-10">
          {/* Header row */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-4">
              <IconChip Icon={step.icon} isInView={isInView} />
              <div>
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground">
                  Step {step.number}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-foreground leading-tight">
                  {step.title}
                </h3>
              </div>
            </div>
            {/* Metric badge */}
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="font-display text-2xl md:text-3xl font-bold text-[hsl(var(--process-accent))]">
                {step.metric.value}
              </span>
              <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">
                {step.metric.label}
              </span>
            </div>
          </div>

          {/* Mobile metric */}
          <div className="flex sm:hidden items-center gap-3 mb-4 p-4 rounded-md bg-[hsl(var(--process-bg))] border border-[hsl(var(--process-card-border))]">
            <span className="font-display text-xl font-bold text-[hsl(var(--process-accent))]">
              {step.metric.value}
            </span>
            <span className="text-[10px] font-mono tracking-wider uppercase text-muted-foreground">
              {step.metric.label}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-muted-foreground mb-5 max-w-lg">
            {step.description}
          </p>

          {/* Detail bullets */}
          <ul className="space-y-2.5">
            {step.details.map((detail, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 text-sm text-foreground/80"
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.12 + 0.3 + i * 0.08, duration: 0.4 }}
              >
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[hsl(var(--process-accent))] flex-shrink-0" />
                <span className="font-mono text-[13px] tracking-wide">{detail}</span>
              </motion.li>
            ))}
          </ul>

          {/* Code snippet (only for Strategy step) */}
          {step.codeSnippet && (
            <CodeBlock title={step.codeSnippet.title} code={step.codeSnippet.code} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ── Connector Line (scroll-driven) ────────────────────
const ConnectorLine = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 80%', 'end 20%'],
  });

  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div ref={lineRef} className="absolute left-6 md:left-8 top-0 bottom-0 w-px hidden lg:block">
      {/* Track */}
      <div className="absolute inset-0 bg-[hsl(var(--process-line))]" />
      {/* Animated fill */}
      <motion.div
        className="absolute top-0 left-0 w-full origin-top"
        style={{
          scaleY,
          height: '100%',
          background: `linear-gradient(180deg, hsl(var(--process-accent)), hsla(var(--process-accent), 0.3))`,
        }}
      />
      {/* Dots at step positions */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[hsl(var(--process-accent))] bg-[hsl(var(--process-card-bg))]"
          style={{ top: `${i * 33.33}%` }}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, type: 'spring', stiffness: 300, damping: 20 }}
        />
      ))}
    </div>
  );
};

// ── Main Section ───────────────────────────────────────
const LandingProcess = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-24 md:py-32 overflow-hidden transition-colors duration-500 border-t border-[hsl(var(--surface-card-border))]"
      style={{ backgroundColor: 'hsl(var(--process-bg))' }}
    >
      {/* Full section dotted grid */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <DottedGrid />
      </div>

      <div className="container relative z-10">
        {/* Section header */}
        <div className="mb-16 md:mb-24 max-w-2xl">
          <motion.span
            className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground block mb-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Methodology
          </motion.span>
          <motion.h2
            className="font-display font-bold leading-[1.05] tracking-tight text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            The Blueprint
          </motion.h2>
          <motion.p
            className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            A systematic, AI-augmented process refined over{' '}
            <span className="font-medium text-foreground">7+ years</span> of shipping products at scale.
            Every phase is data-informed, human-led, and built for measurable outcomes.
          </motion.p>
        </div>

        {/* Steps grid with connector */}
        <div className="relative">
          {/* Vertical connector line (desktop) */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0" style={{ width: '64px' }}>
            <ConnectorLine />
          </div>

          <div className="grid gap-8 lg:pl-20">
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingProcess;
