import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
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
      'AI-assisted pattern recognition',
      'Behavioral analytics & session analysis',
    ],
  },
  {
    number: '02',
    title: 'Architectural Strategy',
    subtitle: 'Systems Thinking',
    description: 'Translating research insights into systemic design logic with AI latency handling and edge-case coverage.',
    icon: BrainCircuit,
    metric: { value: '620+', label: 'Hotjar Recordings' },
    details: [
      'Information architecture & flow mapping',
      'AI confidence scoring & fallback design',
      'Edge-case identification & error states',
    ],
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
      'Remote usability testing (Maze)',
      '100+ A/B tests to validate AI logic',
    ],
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
      'Post-launch measurement & improvement',
    ],
  },
];

// ── Step Card (Bento) ─────────────────────────────────
const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });
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
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div
        className="relative overflow-hidden rounded-card border border-[hsl(var(--process-card-border))]
          bg-[hsl(var(--process-card-bg))] p-6 md:p-8 h-full
          backdrop-blur-md transition-all duration-500"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 50, y: 50 })}
        style={{
          boxShadow: 'var(--process-card-shadow)',
        }}
      >
        {/* Hover radial glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}% ${mousePos.y}%, hsla(var(--process-accent), 0.06) 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 flex flex-col h-full">
          {/* Step number + Icon row */}
          <div className="flex items-center justify-between mb-6">
            <span
              className="text-[32px] md:text-[40px] font-bold leading-none text-[hsl(var(--process-accent))]"
              style={{ fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace", opacity: 0.25 }}
            >
              {step.number}
            </span>
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-sm
                bg-[hsla(var(--process-accent),0.08)] border border-[hsla(var(--process-accent),0.15)]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            >
              <step.icon className="h-5 w-5 text-[hsl(var(--process-accent))]" strokeWidth={1} />
            </motion.div>
          </div>

          {/* Title block */}
          <div className="mb-4">
            <span
              className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-1"
              style={{ fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace" }}
            >
              {step.subtitle}
            </span>
            <h3 className="font-display text-lg md:text-xl font-bold tracking-tight text-foreground leading-tight">
              {step.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-muted-foreground mb-6">
            {step.description}
          </p>

          {/* Detail bullets */}
          <ul className="space-y-2 mb-6 flex-1">
            {step.details.map((detail, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2.5 text-[13px] text-foreground/80"
                initial={{ opacity: 0, x: -6 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.3 + i * 0.06, duration: 0.35 }}
              >
                <span className="mt-1.5 h-1 w-1 rounded-full bg-[hsl(var(--process-accent))] flex-shrink-0" />
                <span style={{ fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace", fontSize: '12px', letterSpacing: '0.01em' }}>
                  {detail}
                </span>
              </motion.li>
            ))}
          </ul>

          {/* Metric badge — anchored to bottom */}
          <div className="pt-4 border-t border-[hsl(var(--process-card-border))] mt-auto">
            <div className="flex items-baseline gap-2">
              <span
                className="text-xl md:text-2xl font-bold text-[hsl(var(--process-accent))]"
                style={{ fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace" }}
              >
                {step.metric.value}
              </span>
              <span
                className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground"
                style={{ fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace" }}
              >
                {step.metric.label}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
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
      <div className="container relative z-10">
        {/* Section header */}
        <div className="mb-16 md:mb-24 max-w-2xl">
          <motion.span
            className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground block mb-4"
            style={{ fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace" }}
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
          </motion.p>
        </div>

        {/* 2×2 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingProcess;
