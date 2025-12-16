import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Custom hook for scroll-triggered animations
const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// Animated section wrapper component
const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// Gray placeholder box component
const PlaceholderBox = ({ 
  aspectRatio = '16/9', 
  label,
  className = '' 
}: { 
  aspectRatio?: string; 
  label?: string;
  className?: string;
}) => (
  <div 
    className={`bg-muted/50 border border-border/50 rounded-[4px] flex items-center justify-center ${className}`}
    style={{ aspectRatio }}
  >
    {label && (
      <span className="text-muted-foreground text-sm font-medium">{label}</span>
    )}
  </div>
);

// Timeline item component
const TimelineItem = ({ 
  step, 
  title, 
  description, 
  isLast = false 
}: { 
  step: string; 
  title: string; 
  description: string; 
  isLast?: boolean;
}) => (
  <div className="relative flex gap-6">
    {/* Timeline line and dot */}
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-medium shrink-0">
        {step}
      </div>
      {!isLast && (
        <div className="w-px h-full bg-border mt-4" />
      )}
    </div>
    
    {/* Content */}
    <div className="pb-12">
      <h4 className="font-display text-lg font-medium mb-2">{title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  </div>
);

// Comparison grid component
const ComparisonGrid = ({ 
  beforeLabel, 
  afterLabel,
  beforeItems,
  afterItems
}: { 
  beforeLabel: string; 
  afterLabel: string;
  beforeItems: string[];
  afterItems: string[];
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Before */}
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <span className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">before</span>
        <span className="text-sm text-muted-foreground">— {beforeLabel}</span>
      </div>
      <div className="space-y-3">
        {beforeItems.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 shrink-0" />
            <span className="text-sm text-muted-foreground">{item}</span>
          </div>
        ))}
      </div>
    </div>
    
    {/* After */}
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-3 border-b border-foreground">
        <span className="text-xs font-medium tracking-[0.15em] uppercase text-foreground">after</span>
        <span className="text-sm text-foreground">— {afterLabel}</span>
      </div>
      <div className="space-y-3">
        {afterItems.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
            <span className="text-sm text-foreground">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Fidelity section component
const FidelitySection = ({ 
  level, 
  title, 
  description, 
  tools,
  deliverables
}: { 
  level: 'low' | 'mid' | 'high';
  title: string; 
  description: string;
  tools: string[];
  deliverables: string[];
}) => {
  const levelStyles = {
    low: 'border-muted-foreground/30',
    mid: 'border-muted-foreground/60',
    high: 'border-foreground'
  };
  
  const levelLabels = {
    low: 'low-fidelity',
    mid: 'mid-fidelity',
    high: 'high-fidelity'
  };

  return (
    <div className={`border-l-2 ${levelStyles[level]} pl-6 py-2`}>
      <span className="text-xs font-medium tracking-[0.15em] uppercase text-muted-foreground">{levelLabels[level]}</span>
      <h4 className="font-display text-xl font-medium mt-2 mb-3">{title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-4 text-xs">
        <div>
          <span className="text-muted-foreground">tools: </span>
          <span className="text-foreground">{tools.join(', ')}</span>
        </div>
        <div>
          <span className="text-muted-foreground">deliverables: </span>
          <span className="text-foreground">{deliverables.join(', ')}</span>
        </div>
      </div>
    </div>
  );
};

const CaseStudyDetail = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="container max-w-4xl">
          {/* Back link */}
          <AnimatedSection>
            <Link 
              to="/#case-studies" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              back to work
            </Link>
          </AnimatedSection>

          {/* Hero Section */}
          <AnimatedSection delay={100}>
            <div className="mb-16">
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">case study</p>
              <h1 className="font-display font-medium leading-[1.1] tracking-tight text-3xl sm:text-4xl md:text-5xl mb-6">
                iterative design process
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mb-8">
                a deep dive into how iterative methodology transforms vague requirements into polished, user-centered experiences.
              </p>
              
              {/* Meta info */}
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div>
                  <span className="text-foreground">role:</span> lead ux designer
                </div>
                <div>
                  <span className="text-foreground">duration:</span> 8 weeks
                </div>
                <div>
                  <span className="text-foreground">team:</span> 4 members
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Hero placeholder */}
          <AnimatedSection delay={200}>
            <PlaceholderBox aspectRatio="16/9" label="hero image" className="mb-24" />
          </AnimatedSection>

          {/* Overview Section */}
          <section className="mb-24">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">01</p>
                <h2 className="font-display text-2xl md:text-3xl font-medium mb-6">overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  this project demonstrates how structured iteration—moving from rough sketches to polished prototypes—creates better outcomes than jumping straight to high-fidelity designs. each phase builds upon validated learnings from the previous stage.
                </p>
              </div>
            </AnimatedSection>

            {/* Problem / Solution comparison */}
            <AnimatedSection>
              <ComparisonGrid 
                beforeLabel="the problem"
                afterLabel="the solution"
                beforeItems={[
                  "users struggled to complete core tasks",
                  "navigation was confusing and inconsistent",
                  "feedback loops were missing entirely",
                  "stakeholder requirements kept changing"
                ]}
                afterItems={[
                  "task completion improved by 47%",
                  "clear, predictable navigation patterns",
                  "real-time feedback at every step",
                  "iterative validation prevented scope creep"
                ]}
              />
            </AnimatedSection>
          </section>

          {/* Process Timeline Section */}
          <section className="mb-24">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">02</p>
                <h2 className="font-display text-2xl md:text-3xl font-medium">design process</h2>
              </div>
            </AnimatedSection>

            {/* Vertical Timeline */}
            <AnimatedSection>
              <div className="mb-12">
                <TimelineItem 
                  step="1"
                  title="research & discovery"
                  description="conducted user interviews, competitive analysis, and stakeholder workshops to understand the problem space and define success metrics."
                />
                <TimelineItem 
                  step="2"
                  title="ideation & sketching"
                  description="rapid sketching sessions to explore multiple solutions. divergent thinking before converging on the strongest concepts."
                />
                <TimelineItem 
                  step="3"
                  title="low-fidelity prototyping"
                  description="paper prototypes and wireframes to test core flows. quick iterations based on early user feedback."
                />
                <TimelineItem 
                  step="4"
                  title="mid-fidelity design"
                  description="grayscale wireframes with interaction patterns. usability testing to validate navigation and information architecture."
                />
                <TimelineItem 
                  step="5"
                  title="high-fidelity prototyping"
                  description="full visual design with micro-interactions. final usability testing and stakeholder sign-off."
                  isLast
                />
              </div>
            </AnimatedSection>

            {/* Process placeholder images */}
            <AnimatedSection>
              <div className="grid grid-cols-2 gap-4">
                <PlaceholderBox aspectRatio="4/3" label="research" />
                <PlaceholderBox aspectRatio="4/3" label="ideation" />
              </div>
            </AnimatedSection>
          </section>

          {/* Low-Fidelity Section */}
          <section className="mb-24">
            <AnimatedSection>
              <div className="mb-8">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">03</p>
                <h2 className="font-display text-2xl md:text-3xl font-medium mb-6">low-fidelity</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <FidelitySection 
                level="low"
                title="paper prototypes & sketches"
                description="started with rough sketches to explore layout options without committing to any specific direction. tested with 5 users to validate core concepts before investing in detailed design work."
                tools={['pen & paper', 'whiteboard', 'sticky notes']}
                deliverables={['concept sketches', 'user flow diagrams', 'initial feedback']}
              />
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-3 gap-4 mt-8">
                <PlaceholderBox aspectRatio="1/1" label="sketch 1" />
                <PlaceholderBox aspectRatio="1/1" label="sketch 2" />
                <PlaceholderBox aspectRatio="1/1" label="sketch 3" />
              </div>
            </AnimatedSection>

            {/* Before/After for Low-Fi */}
            <AnimatedSection>
              <div className="mt-12">
                <ComparisonGrid 
                  beforeLabel="initial concept"
                  afterLabel="after testing"
                  beforeItems={[
                    "complex multi-step wizard",
                    "hidden navigation menu",
                    "text-heavy instructions"
                  ]}
                  afterItems={[
                    "simplified single-page flow",
                    "visible persistent navigation",
                    "visual guides and icons"
                  ]}
                />
              </div>
            </AnimatedSection>
          </section>

          {/* Mid-Fidelity Section */}
          <section className="mb-24">
            <AnimatedSection>
              <div className="mb-8">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">04</p>
                <h2 className="font-display text-2xl md:text-3xl font-medium mb-6">mid-fidelity</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <FidelitySection 
                level="mid"
                title="wireframes & interaction patterns"
                description="grayscale wireframes focused on layout, hierarchy, and interaction patterns. conducted 8 usability tests to refine navigation and validate information architecture decisions."
                tools={['figma', 'whimsical', 'maze']}
                deliverables={['clickable prototype', 'usability report', 'iteration notes']}
              />
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <PlaceholderBox aspectRatio="3/4" label="wireframe a" />
                <PlaceholderBox aspectRatio="3/4" label="wireframe b" />
              </div>
            </AnimatedSection>

            {/* Before/After for Mid-Fi */}
            <AnimatedSection>
              <div className="mt-12">
                <ComparisonGrid 
                  beforeLabel="wireframe v1"
                  afterLabel="wireframe v2"
                  beforeItems={[
                    "unclear call-to-action hierarchy",
                    "inconsistent spacing system",
                    "missing error states"
                  ]}
                  afterItems={[
                    "clear primary and secondary actions",
                    "8px grid system applied",
                    "comprehensive error handling"
                  ]}
                />
              </div>
            </AnimatedSection>

            {/* Usability findings */}
            <AnimatedSection>
              <div className="mt-12 p-6 bg-muted/30 rounded-[4px]">
                <h4 className="font-display text-lg font-medium mb-4">key usability findings</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <p className="text-2xl font-display font-medium text-foreground mb-1">73%</p>
                    <p className="text-muted-foreground">task success rate (v1)</p>
                  </div>
                  <div>
                    <p className="text-2xl font-display font-medium text-foreground mb-1">89%</p>
                    <p className="text-muted-foreground">task success rate (v2)</p>
                  </div>
                  <div>
                    <p className="text-2xl font-display font-medium text-foreground mb-1">-42s</p>
                    <p className="text-muted-foreground">avg. time on task</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* High-Fidelity Section */}
          <section className="mb-24">
            <AnimatedSection>
              <div className="mb-8">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">05</p>
                <h2 className="font-display text-2xl md:text-3xl font-medium mb-6">high-fidelity</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <FidelitySection 
                level="high"
                title="visual design & micro-interactions"
                description="full visual treatment with brand colors, typography, and motion design. final round of testing ensured the visual layer didn't introduce new usability issues."
                tools={['figma', 'principle', 'lottie']}
                deliverables={['design system', 'animated prototype', 'dev handoff']}
              />
            </AnimatedSection>

            <AnimatedSection>
              <PlaceholderBox aspectRatio="16/9" label="final design" className="mt-8" />
            </AnimatedSection>

            {/* Final comparison */}
            <AnimatedSection>
              <div className="mt-12">
                <ComparisonGrid 
                  beforeLabel="before redesign"
                  afterLabel="final design"
                  beforeItems={[
                    "generic visual treatment",
                    "no motion or feedback",
                    "accessibility issues",
                    "inconsistent component usage"
                  ]}
                  afterItems={[
                    "distinctive brand expression",
                    "purposeful micro-interactions",
                    "wcag aa compliant",
                    "unified design system"
                  ]}
                />
              </div>
            </AnimatedSection>

            {/* Final screens grid */}
            <AnimatedSection>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                <PlaceholderBox aspectRatio="9/16" label="screen 1" />
                <PlaceholderBox aspectRatio="9/16" label="screen 2" />
                <PlaceholderBox aspectRatio="9/16" label="screen 3" />
                <PlaceholderBox aspectRatio="9/16" label="screen 4" />
              </div>
            </AnimatedSection>
          </section>

          {/* Results Section */}
          <section className="mb-24">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">06</p>
                <h2 className="font-display text-2xl md:text-3xl font-medium mb-6">results & impact</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="text-center p-6 bg-muted/30 rounded-[4px]">
                  <p className="text-3xl font-display font-medium text-foreground mb-1">+47%</p>
                  <p className="text-sm text-muted-foreground">task completion</p>
                </div>
                <div className="text-center p-6 bg-muted/30 rounded-[4px]">
                  <p className="text-3xl font-display font-medium text-foreground mb-1">-58%</p>
                  <p className="text-sm text-muted-foreground">user errors</p>
                </div>
                <div className="text-center p-6 bg-muted/30 rounded-[4px]">
                  <p className="text-3xl font-display font-medium text-foreground mb-1">4.6</p>
                  <p className="text-sm text-muted-foreground">satisfaction score</p>
                </div>
                <div className="text-center p-6 bg-muted/30 rounded-[4px]">
                  <p className="text-3xl font-display font-medium text-foreground mb-1">3x</p>
                  <p className="text-sm text-muted-foreground">faster onboarding</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="p-8 border border-border rounded-[4px]">
                <blockquote className="font-display text-xl md:text-2xl font-medium text-center leading-relaxed mb-4">
                  "the iterative approach helped us catch issues early and deliver a product that truly serves our users."
                </blockquote>
                <p className="text-center text-sm text-muted-foreground">— product manager</p>
              </div>
            </AnimatedSection>
          </section>

          {/* Learnings Section */}
          <section className="mb-24">
            <AnimatedSection>
              <div className="mb-8">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">07</p>
                <h2 className="font-display text-2xl md:text-3xl font-medium mb-6">key learnings</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-display text-lg font-medium mb-2">test early, test often</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    low-fidelity testing revealed fundamental issues that would have been costly to fix later in the process.
                  </p>
                </div>
                <div>
                  <h4 className="font-display text-lg font-medium mb-2">embrace ambiguity</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    starting rough allows for more creative exploration before committing to specific solutions.
                  </p>
                </div>
                <div>
                  <h4 className="font-display text-lg font-medium mb-2">document decisions</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    tracking why decisions were made helps onboard new team members and prevents revisiting solved problems.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Next project */}
          <AnimatedSection>
            <div className="pt-16 border-t border-border">
              <Link 
                to="/#case-studies" 
                className="group flex items-center justify-between"
              >
                <div>
                  <p className="text-sm text-muted-foreground mb-2">next project</p>
                  <h3 className="font-display text-2xl md:text-3xl font-medium">explore more work</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-[4px] border border-border transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
                  <ArrowRight className="h-5 w-5 transition-all duration-300 group-hover:text-background" />
                </div>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
