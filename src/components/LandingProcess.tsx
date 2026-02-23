import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const tabLabels = ['Discovery', 'Strategy', 'Iteration', 'Governance'];

// ── Main Section ───────────────────────────────────────
const LandingProcess = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const activeStep = steps[activeIndex];
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative py-24 md:py-32 overflow-hidden transition-colors duration-500 border-t border-[hsl(var(--surface-card-border))]"
      style={{ backgroundColor: 'hsl(var(--process-bg))' }}
    >
      <div className="container relative z-10">
        {/* Section header */}
        <div className="mb-12 md:mb-16 max-w-2xl">
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
            className="font-display font-bold leading-[1.05] tracking-[-0.04em] text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl text-foreground"
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

        {/* Tab Controller */}
        <motion.div
          className="flex items-center gap-1 mb-10 p-1 rounded-[var(--radius-sm)] bg-[hsl(var(--process-card-bg))] border border-[hsl(var(--process-card-border))] w-fit"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          {tabLabels.map((label, i) => (
            <button
              key={label}
              onClick={() => setActiveIndex(i)}
              className={`relative px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.08em] rounded-[var(--radius-xs)] transition-colors duration-300 focus-visible:outline-none
                ${activeIndex === i ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/70'}`}
              style={{ fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace" }}
            >
              {activeIndex === i && (
                <motion.div
                  layoutId="blueprint-tab-bg"
                  className="absolute inset-0 rounded-[var(--radius-xs)] bg-[hsla(var(--process-accent),0.1)] border border-[hsla(var(--process-accent),0.2)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </motion.div>

        {/* Content Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <div
              className="relative overflow-hidden rounded-card border border-[hsl(var(--process-card-border))]
                bg-[hsl(var(--process-card-bg))] backdrop-blur-md"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setMousePos({ x: 50, y: 50 })}
              style={{ boxShadow: 'var(--process-card-shadow)' }}
            >
              {/* Hover radial glow */}
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(500px circle at ${mousePos.x}% ${mousePos.y}%, hsla(var(--process-accent), 0.05) 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0">
                {/* Left — Main content */}
                <div className="p-8 md:p-12">
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className="text-[48px] md:text-[64px] font-bold leading-none text-[hsl(var(--process-accent))]"
                      style={{ fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace", opacity: 0.2 }}
                    >
                      {activeStep.number}
                    </span>
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-sm
                        bg-[hsla(var(--process-accent),0.08)] border border-[hsla(var(--process-accent),0.15)]"
                    >
                      <activeStep.icon className="h-6 w-6 text-[hsl(var(--process-accent))]" strokeWidth={1} />
                    </div>
                  </div>

                  <span
                    className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-2"
                    style={{ fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace" }}
                  >
                    {activeStep.subtitle}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold tracking-[-0.04em] text-foreground leading-tight mb-4">
                    {activeStep.title}
                  </h3>
                  <p className="text-base leading-relaxed text-muted-foreground max-w-lg">
                    {activeStep.description}
                  </p>

                  {/* Metric */}
                  <div className="mt-8 pt-6 border-t border-[hsl(var(--process-card-border))]">
                    <div className="flex items-baseline gap-3">
                      <span
                        className="text-3xl md:text-4xl font-bold text-[hsl(var(--process-accent))]"
                        style={{ fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace" }}
                      >
                        {activeStep.metric.value}
                      </span>
                      <span
                        className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground"
                        style={{ fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace" }}
                      >
                        {activeStep.metric.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden lg:block bg-[hsl(var(--process-card-border))]" />

                {/* Right — Detail bullets */}
                <div className="p-8 md:p-12 flex flex-col justify-center border-t lg:border-t-0 border-[hsl(var(--process-card-border))]">
                  <span
                    className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground block mb-6"
                    style={{ fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace" }}
                  >
                    Key Activities
                  </span>
                  <ul className="space-y-4">
                    {activeStep.details.map((detail, i) => (
                      <motion.li
                        key={detail}
                        className="flex items-start gap-3 text-foreground/80"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.08, duration: 0.35 }}
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[hsl(var(--process-accent))] flex-shrink-0" />
                        <span
                          className="text-sm leading-relaxed"
                          style={{ fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace", letterSpacing: '0.01em' }}
                        >
                          {detail}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LandingProcess;
