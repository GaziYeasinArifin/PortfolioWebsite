import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Compass, PenTool, BrainCircuit, Layers, Shield,
  Sparkles, BarChart3, Lightbulb, MapPin,
} from 'lucide-react';
import aboutImage from '@/assets/about-1.png';

// ── Impact Stats ───────────────────────────────────────
const impactStats = [
  { value: '22M+', label: 'Installs', sublabel: 'iOS & Android' },
  { value: '$1.5M', label: 'Savings', sublabel: 'Design Systems' },
  { value: '130+', label: 'Interviews', sublabel: 'At Scale' },
  { value: '210+', label: 'A/B Tests', sublabel: 'Managed' },
];

// ── Skill Chips ────────────────────────────────────────
const skills = [
  { label: 'Product Strategy', icon: Compass, hue: '225 80% 55%' },
  { label: 'Interaction Design', icon: PenTool, hue: '187 100% 45%' },
  { label: 'ML / AI Interface Design', icon: BrainCircuit, hue: '270 80% 60%' },
  { label: 'Prototyping & Motion', icon: Sparkles, hue: '340 80% 55%' },
  { label: 'Design Systems', icon: Layers, hue: '160 70% 45%' },
  { label: 'System Governance', icon: Shield, hue: '45 90% 50%' },
  { label: 'Data-Driven Design', icon: BarChart3, hue: '200 80% 50%' },
  { label: 'UX Research', icon: Lightbulb, hue: '30 90% 55%' },
];

// ── Trusted-by logos (text-based for monochrome) ───────
const trustedBy = [
  'InShot', 'Screenlife', 'Spotlight', 'Cal State EB', 'Maze', 'Amplitude', 'Figma', 'Dovetail',
];

// ── Stat Card with Shimmer ─────────────────────────────
const StatCard = ({ stat, index }: { stat: typeof impactStats[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className="stat-shimmer-card relative overflow-hidden rounded-card p-6
        bg-surface-card border border-surface-card-border
        transition-all duration-500 group cursor-default"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      style={{ boxShadow: 'var(--surface-shadow)' }}
    >
      {/* Shimmer sweep overlay on hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100">
        <div className="stat-shimmer-sweep absolute inset-[-1px] rounded-card" />
      </div>

      <div className="relative z-10">
        <div
          className="text-3xl md:text-4xl font-bold text-foreground"
          style={{ fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace" }}
        >
          {stat.value}
        </div>
        <div className="mt-1 text-sm font-medium text-foreground">{stat.label}</div>
        <div className="text-[11px] font-mono tracking-wider uppercase text-muted-foreground mt-0.5">
          {stat.sublabel}
        </div>
      </div>
    </motion.div>
  );
};

// ── Skill Chip ─────────────────────────────────────────
const SkillChip = ({ skill, index }: { skill: typeof skills[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-3 px-4 py-3 rounded-sm cursor-default select-none
        border transition-all duration-400"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: isHovered
          ? `hsla(${skill.hue}, 0.08)`
          : 'hsl(var(--about-chip-bg))',
        borderColor: isHovered
          ? `hsla(${skill.hue}, 0.3)`
          : 'hsl(var(--about-chip-border))',
        boxShadow: isHovered
          ? `0 0 20px hsla(${skill.hue}, 0.12)`
          : 'none',
      }}
    >
      <skill.icon
        className="h-4 w-4 transition-colors duration-300 flex-shrink-0"
        strokeWidth={1.5}
        style={{ color: isHovered ? `hsl(${skill.hue})` : 'hsl(var(--muted-foreground))' }}
      />
      <span className="text-[13px] font-medium tracking-wide text-foreground whitespace-nowrap">
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
            <Track />
            <Track />
          </div>
          <div className="marquee flex items-center shrink-0 group-hover:[animation-play-state:paused]" aria-hidden="true">
            <Track />
            <Track />
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Main About Section ─────────────────────────────────
const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isHeadingInView = useInView(headingRef, { once: true, margin: '-60px' });

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="relative py-24 md:py-32 overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: 'hsl(var(--about-bg))' }}
    >
      <div className="container relative z-10">
        {/* Golden Ratio Layout: 40/60 split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 md:mb-24">

          {/* Left 40%: Portrait (5 of 12 ≈ ~40%) */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative rounded-card overflow-hidden aspect-[3/4] lg:aspect-auto lg:h-full">
              <img
                src={aboutImage}
                alt="Gazi Yeasin Arifin"
                className="no-border h-full w-full object-cover"
              />

              {/* Glassmorphism overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5
                backdrop-blur-xl bg-background/60 border-t border-border/20">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  </span>
                  <div>
                    <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> San Francisco, CA
                    </span>
                    <span className="text-[11px] text-muted-foreground block mt-0.5">
                      Open to Lead Product Design roles
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right 60%: Executive Summary (7 of 12 ≈ ~60%) */}
          <div ref={headingRef} className="lg:col-span-7 flex flex-col justify-center">
            <motion.span
              className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground block mb-4"
              initial={{ opacity: 0, y: 12 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              About
            </motion.span>

            <motion.h2
              className="font-display font-bold leading-[1.1] tracking-tight text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] text-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              11+ years leading design for high-scale AI systems, moving the needle on adoption and multi-million dollar business goals.
            </motion.h2>

            {/* Three distinct paragraphs with bold lead-ins */}
            <div className="space-y-5">
              <motion.p
                className="text-base md:text-lg text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 16 }}
                animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="font-semibold text-foreground">AI meets intuition.</span>{' '}
                I specialize in the intersection of product design and AI systems, building interfaces that translate complex machine learning models into experiences people actually trust and enjoy.
              </motion.p>

              <motion.p
                className="text-base md:text-lg text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 16 }}
                animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="font-semibold text-foreground">Scale without compromise.</span>{' '}
                My work spans iOS, Android, and SaaS platforms serving millions of users, where every pixel must perform under real-world constraints like latency budgets, confidence thresholds, and cross-platform parity.
              </motion.p>

              <motion.p
                className="text-sm text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 16 }}
                animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <span className="font-semibold text-foreground">Proven at InShot.</span>{' '}
                I led design across 3 creative apps that hit the App Store Top 10, established a cross-platform design system, and drove $1.5M+ in operational savings.
              </motion.p>
            </div>

            {/* Stats grid — aligned with text column */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {impactStats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Skill Cloud */}
        <div className="mb-0">
          <motion.p
            className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Core Competencies
          </motion.p>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <SkillChip key={skill.label} skill={skill} index={i} />
            ))}
          </div>
        </div>

        {/* Trusted-By Marquee */}
        <TrustedByMarquee />
      </div>
    </section>
  );
};

export default AboutSection;
