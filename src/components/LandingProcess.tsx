import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

// Step images for AI tools
import step1Image from '@/assets/process-step-1.png';
import step2Image from '@/assets/process-step-2.png';
import step3Image from '@/assets/process-step-3.png';
import step4Image from '@/assets/process-step-4.png';
import step5Image from '@/assets/process-step-5.png';

interface ProcessStep {
  number: number;
  title: string;
  purpose: string;
  outcome: string;
  howIWork: string;
  tools: string;
  toolImage: string;
}

const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Research Synthesis & Opportunity Framing",
    purpose: "Surface validated user needs, constraints, and leverage points",
    outcome: "Clear priorities aligned with business goals",
    howIWork: "I synthesize qualitative & quantitative research to surface patterns, align teams on validated opportunities, and frame problems worth solving. I use AI to accelerate transcript analysis and identify thematic clusters across large datasets.",
    tools: "ChatGPT, Claude, Dovetail",
    toolImage: step1Image,
  },
  {
    number: 2,
    title: "Problem Definition & Hypothesis Design",
    purpose: "Define the right problem and how we'll measure success",
    outcome: "A focused hypothesis that guides decisions and scope",
    howIWork: "I translate research insights into clear problem statements and testable hypotheses. AI helps me pressure-test assumptions, generate alternative framings, and ensure we're solving the right problem before committing resources.",
    tools: "ChatGPT, Notion AI",
    toolImage: step2Image,
  },
  {
    number: 3,
    title: "Concept Exploration & Design Execution",
    purpose: "Explore solution paths quickly without sacrificing feasibility",
    outcome: "Scalable design directions grounded in real constraints",
    howIWork: "I rapidly explore multiple solution directions, from low-fidelity sketches to high-fidelity prototypes. AI accelerates ideation, helps generate UI variations, and enables faster iteration cycles without sacrificing craft.",
    tools: "Figma, ChatGPT, Midjourney",
    toolImage: step3Image,
  },
  {
    number: 4,
    title: "Validation, Testing & Iteration",
    purpose: "De-risk decisions through evidence before building too far",
    outcome: "User-validated improvements with fewer costly surprises",
    howIWork: "I design and run usability tests, analyze results, and iterate based on real user behavior. AI helps me synthesize test findings faster, identify patterns across sessions, and prioritize which issues to address first.",
    tools: "Maze, UserTesting, Dovetail",
    toolImage: step4Image,
  },
  {
    number: 5,
    title: "Measurement, Learning & Continuous Improvement",
    purpose: "Measure real behavior and refine based on usage patterns",
    outcome: "Products that improve over time with clear success metrics",
    howIWork: "I establish success metrics, monitor post-launch performance, and drive continuous improvement. AI helps me spot anomalies in usage data, generate insights from large datasets, and recommend optimization opportunities.",
    tools: "Amplitude, Mixpanel, AI Analytics",
    toolImage: step5Image,
  },
];

const LandingProcess = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Handle wheel to horizontal scroll conversion
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // Only convert vertical scroll to horizontal if there's horizontal overflow
      if (container.scrollWidth > container.clientWidth) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          container.scrollLeft += e.deltaY;
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleCTAClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const caseStudiesSection = document.getElementById('case-studies');
    if (caseStudiesSection) {
      caseStudiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      
      <div className="container px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <h2 className="font-display font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
          My UX Process (AI-Augmented, Human-Led)
        </h2>
        
        {/* Confidence Statement */}
        <p className="text-muted-foreground/70 text-sm sm:text-base max-w-3xl mb-12">
          This process adapts based on product maturity, risk, and business constraints — not every project requires every step.
        </p>
      </div>

      {/* Horizontal Scroll Container */}
      <div
        ref={scrollContainerRef}
        className={`flex gap-4 sm:gap-6 px-4 sm:px-6 pb-4 overflow-x-auto scrollbar-hide ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left spacer for container alignment */}
        <div className="flex-shrink-0 w-[calc((100vw-1280px)/2)] max-w-0 lg:max-w-none" />
        
        {processSteps.map((step, index) => (
          <div
            key={step.number}
            className={`flex-shrink-0 w-[280px] sm:w-[320px] bg-card/50 backdrop-blur-sm rounded-xl border transition-all duration-300 ${
              expandedCard === index 
                ? 'border-primary/40 shadow-lg shadow-primary/10' 
                : 'border-foreground/10 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5'
            }`}
            onClick={() => toggleCard(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCard(index);
              }
            }}
            tabIndex={0}
            role="button"
            aria-expanded={expandedCard === index}
          >
            <div className="p-5 sm:p-6">
              {/* Step Label */}
              <span className="text-primary text-xs font-medium tracking-wider uppercase">
                Step {step.number}
              </span>
              
              {/* Title */}
              <h3 className="font-display font-medium text-foreground text-lg sm:text-xl mt-2 mb-3 leading-tight">
                {step.title}
              </h3>
              
              {/* Purpose */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                {step.purpose}
              </p>
              
              {/* Outcome */}
              <p className="text-primary/80 text-sm">
                <span className="text-primary">→</span> Outcome: {step.outcome}
              </p>

              {/* Expand indicator */}
              <div className={`flex items-center justify-center mt-4 pt-4 border-t border-foreground/5 transition-transform duration-300 ${
                expandedCard === index ? 'rotate-180' : ''
              }`}>
                <ChevronDown className="w-5 h-5 text-muted-foreground/50" />
              </div>

              {/* Expanded Content */}
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedCard === index ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
              }`}>
                <div className="space-y-5 pt-4 border-t border-foreground/10">
                  {/* How I Work */}
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider mb-2">
                      How I Work
                    </h4>
                    <p className="text-foreground/80 text-sm leading-relaxed">
                      {step.howIWork}
                    </p>
                  </div>

                  {/* AI Tools */}
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider mb-3">
                      AI Tools Used
                    </h4>
                    <div className="flex items-center gap-3">
                      <img 
                        src={step.toolImage} 
                        alt={`Tools for ${step.title}`}
                        className="h-8 w-auto object-contain opacity-80"
                      />
                      <span className="text-muted-foreground text-xs">{step.tools}</span>
                    </div>
                  </div>

                  {/* CTA Link */}
                  <button
                    onClick={handleCTAClick}
                    className="text-primary text-sm hover:text-primary/80 transition-colors inline-flex items-center gap-1 group"
                  >
                    See this applied in a real case study
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Right spacer for container alignment */}
        <div className="flex-shrink-0 w-4 sm:w-6 lg:w-[calc((100vw-1280px)/2)]" />
      </div>
    </section>
  );
};

export default LandingProcess;
