import { useState, useEffect, useRef, useMemo } from 'react';
import { Sparkles, CheckCircle } from 'lucide-react';

// Step images
import processStep1 from '@/assets/process-step-1.png';
import processStep2 from '@/assets/process-step-2.png';
import processStep3 from '@/assets/process-step-3.png';
import processStep4 from '@/assets/process-step-4.png';
import processStep5 from '@/assets/process-step-5.png';

const stepImages = [processStep1, processStep2, processStep3, processStep4, processStep5];

const tealColors = [
  'hsl(175, 70%, 45%)', // Teal dark
  'hsl(175, 65%, 52%)', // Teal medium-dark
  'hsl(175, 60%, 58%)', // Teal medium
  'hsl(175, 55%, 65%)', // Teal light
  'hsl(175, 50%, 72%)', // Teal lightest
];

const processSteps = [
  {
    number: 1,
    shortTitle: 'Research Synthesis',
    title: 'Research Synthesis & Opportunity Framing',
    goal: 'Understand user needs, behaviors, and market constraints.',
    aiAction: 'I lead user research and discovery, using AI tools such as ChatGPT, Claude, and Dovetail AI to accelerate synthesis by summarizing qualitative data, identifying behavioral patterns, and supporting competitive analysis. Key insights and priorities are validated through design judgment and stakeholder alignment.',
    outcome: 'Clear, evidence-based user opportunities and constraints aligned with product and business goals.',
  },
  {
    number: 2,
    shortTitle: 'Problem Definition',
    title: 'Problem Definition & Hypothesis Design',
    goal: 'Define the right user problems and success metrics.',
    aiAction: 'I translate research insights into clear problem statements, JTBD frameworks, and measurable hypotheses. AI supports exploration of alternative framings and assumption checks, while prioritization and scope remain human-driven.',
    outcome: 'Focused, high-impact problem definitions that guide effective solution design.',
  },
  {
    number: 3,
    shortTitle: 'Concept Exploration',
    title: 'Concept Exploration & Design Execution',
    goal: 'Explore solution spaces efficiently while ensuring scalability and quality.',
    aiAction: 'I use Figma AI, ChatGPT, and generative tools to accelerate ideation, visualize early concepts, and maintain design system consistency. When relevant, I design AI-assisted or agent-based interactions with clearly defined roles, boundaries, and fallback behaviors.',
    outcome: 'Well-rationalized design directions that balance innovation, usability, and technical feasibility.',
  },
  {
    number: 4,
    shortTitle: 'Validation & Testing',
    title: 'Validation, Testing & Iteration',
    goal: 'Reduce product risk through continuous validation.',
    aiAction: 'I conduct usability testing and feedback sessions using tools like Maze, UserTesting, and Dovetail AI to synthesize insights, detect usability issues, and understand user sentiment. For AI-assisted experiences, I validate clarity, trust, and failure states alongside core UI flows.',
    outcome: 'Refined, user-validated designs grounded in real feedback and measurable improvements.',
  },
  {
    number: 5,
    shortTitle: 'Measurement & Learning',
    title: 'Measurement, Learning & Continuous Improvement',
    goal: 'Ensure the experience improves over time based on real usage.',
    aiAction: 'Post-launch, I analyze behavioral metrics and feedback using Amplitude, Mixpanel, and AI-assisted analytics to identify friction points and optimization opportunities. Learnings feed directly into the next iteration cycle.',
    outcome: 'Products that evolve thoughtfully over time, driven by data, usability insights, and clear success metrics.',
  },
];

const TypewriterTitle = () => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "My UX Process (AI-Augmented, Human-Led)";

  useEffect(() => {
    setDisplayText('');
    setIsTyping(true);
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-flex items-center">
      {displayText}
      <span 
        className={`inline-block w-[3px] h-[1em] bg-background ml-1 ${isTyping ? 'animate-pulse' : 'opacity-0'}`}
      />
    </span>
  );
};

// Step Content Component
const StepContent = ({ step, color }: { step: typeof processSteps[0]; color: string }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-10">
      {/* Left Column */}
      <div className="space-y-3 md:space-y-4">
        <p 
          className="text-[10px] md:text-xs font-medium tracking-wide uppercase"
          style={{ color }}
        >
          Step {step.number}
        </p>
        <h3 className="font-display text-sm sm:text-base md:text-lg lg:text-xl font-medium text-background leading-snug">
          {step.title}
        </h3>
        <div 
          className="bg-background/10 rounded-[4px] p-2.5 md:p-3 border-l-2"
          style={{ borderColor: color }}
        >
          <p className="text-[10px] font-medium text-background/60 mb-0.5">Goal:</p>
          <p className="text-[11px] md:text-xs text-background/90 leading-relaxed">{step.goal}</p>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-3 md:space-y-4">
        <div className="flex items-start gap-2">
          <Sparkles 
            className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0 mt-0.5" 
            style={{ color }}
          />
          <div>
            <p className="text-[10px] md:text-xs font-medium text-background mb-0.5">How I Work:</p>
            <p className="text-[11px] md:text-xs text-background/70 leading-relaxed">
              {step.aiAction}
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <CheckCircle className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] md:text-xs font-medium text-background mb-0.5">Outcome:</p>
            <p className="text-[11px] md:text-xs text-background/70 leading-relaxed">
              {step.outcome}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Handle resize for responsive calculations
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      const scrollStart = rect.top;
      const scrollRange = sectionHeight - viewportHeight;
      
      if (scrollStart <= 0 && scrollStart >= -scrollRange) {
        const progress = Math.abs(scrollStart) / scrollRange;
        setScrollProgress(Math.min(Math.max(progress, 0), 1));
        const stepIndex = Math.min(
          Math.floor(progress * processSteps.length),
          processSteps.length - 1
        );
        setActiveStep(stepIndex);
      } else if (scrollStart > 0) {
        setActiveStep(0);
        setScrollProgress(0);
      } else if (scrollStart < -scrollRange) {
        setActiveStep(processSteps.length - 1);
        setScrollProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Responsive step dimensions
  const stepWidth = useMemo(() => {
    if (viewportWidth < 640) return 160;
    if (viewportWidth < 768) return 180;
    return 220;
  }, [viewportWidth]);

  const stepGap = useMemo(() => {
    if (viewportWidth < 640) return 12;
    return 16;
  }, [viewportWidth]);

  const verticalStagger = useMemo(() => {
    if (viewportWidth < 640) return 12;
    return 20;
  }, [viewportWidth]);

  // Calculate horizontal scroll position
  const totalWidth = (stepWidth + stepGap) * processSteps.length;
  const startOffset = viewportWidth * 0.6;
  const endOffset = -totalWidth + viewportWidth * 0.4;
  const horizontalOffset = startOffset + (endOffset - startOffset) * scrollProgress;

  return (
    <section 
      ref={sectionRef}
      id="process" 
      className="relative bg-foreground text-background"
      style={{ height: `${100 + (processSteps.length * 120)}vh` }}
    >
      <div className="sticky top-14 sm:top-16 md:top-20 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] flex flex-col justify-between py-3 sm:py-4 md:py-6 lg:py-8 overflow-hidden">
        {/* Title */}
        <div className="container px-4 sm:px-6 flex-shrink-0">
          <h2 
            className="font-display font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[2.25rem]"
            style={{ color: 'hsl(var(--background) / 0.7)' }}
          >
            <TypewriterTitle />
          </h2>
        </div>

        {/* Steps Timeline Area */}
        <div className="relative h-[90px] sm:h-[110px] md:h-[130px] lg:h-[150px] flex items-start mt-2 sm:mt-3 md:mt-4 flex-shrink-0">
          {/* Left Edge Overlay */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 lg:w-48 z-20 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, hsl(var(--foreground)) 0%, hsl(var(--foreground)) 30%, transparent 100%)',
            }}
          />
          
          {/* Right Edge Overlay */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 lg:w-48 z-20 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, hsl(var(--foreground)) 0%, hsl(var(--foreground)) 30%, transparent 100%)',
            }}
          />

          {/* Steps container */}
          <div 
            className="absolute flex items-start will-change-transform"
            style={{
              transform: `translateX(${horizontalOffset}px)`,
              gap: `${stepGap}px`,
            }}
          >
            {processSteps.map((step, index) => {
              const isActive = index === activeStep;
              const verticalOffset = index * verticalStagger;
              
              return (
                <button
                  key={step.number}
                  onClick={() => {
                    if (sectionRef.current) {
                      const sectionTop = sectionRef.current.offsetTop;
                      const scrollRange = sectionRef.current.offsetHeight - window.innerHeight;
                      const targetScroll = sectionTop + (scrollRange * (index / processSteps.length));
                      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                    }
                  }}
                  className="flex-shrink-0 rounded-[4px] text-left border-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-background/50"
                  style={{
                    width: `${stepWidth}px`,
                    padding: viewportWidth < 640 ? '12px 14px' : '16px 20px',
                    marginTop: `${verticalOffset}px`,
                    backgroundColor: isActive ? tealColors[index] : 'transparent',
                    borderColor: isActive ? tealColors[index] : 'hsl(var(--background) / 0.3)',
                    transition: 'background-color 0.4s ease, border-color 0.4s ease',
                  }}
                >
                  <span 
                    className="block text-[10px] sm:text-xs font-medium mb-0.5 sm:mb-1"
                    style={{ 
                      color: isActive ? 'hsl(var(--foreground))' : 'hsl(var(--background) / 0.5)',
                      transition: 'color 0.4s ease',
                    }}
                  >
                    Step {step.number}
                  </span>
                  <span 
                    className="block text-xs sm:text-sm font-medium whitespace-nowrap"
                    style={{ 
                      color: isActive ? 'hsl(var(--foreground))' : 'hsl(var(--background) / 0.8)',
                      transition: 'color 0.4s ease',
                    }}
                  >
                    {step.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="container px-4 sm:px-6 flex-1 flex flex-col justify-center min-h-0 mt-2 sm:mt-3 md:mt-4">
          <div className="max-w-5xl mx-auto w-full">
            {/* Crossfade Step Images */}
            <div className="relative w-full h-8 sm:h-10 md:h-12 lg:h-14 mb-2 sm:mb-3 md:mb-4 flex items-center justify-center">
              {stepImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Step ${index + 1} tools`}
                  className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out"
                  style={{
                    opacity: index === activeStep ? 1 : 0,
                  }}
                />
              ))}
            </div>
            
            <div className="bg-background/5 backdrop-blur-sm rounded-[4px] p-3 sm:p-4 md:p-5 lg:p-6 border border-background/10">
              <StepContent step={processSteps[activeStep]} color={tealColors[activeStep]} />
            </div>
          </div>
        </div>

        {/* Step indicators */}
        <div className="container px-4 sm:px-6 pt-2 sm:pt-3 flex-shrink-0">
          <div className="flex justify-center gap-1.5 sm:gap-2">
            {processSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (sectionRef.current) {
                    const sectionTop = sectionRef.current.offsetTop;
                    const scrollRange = sectionRef.current.offsetHeight - window.innerHeight;
                    const targetScroll = sectionTop + (scrollRange * (index / processSteps.length));
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                  }
                }}
                className="h-1 sm:h-1.5 rounded-full transition-all duration-300 focus:outline-none"
                style={{
                  width: index === activeStep ? (viewportWidth < 640 ? '18px' : '24px') : '6px',
                  backgroundColor: index === activeStep 
                    ? 'hsl(var(--background) / 0.5)' 
                    : 'hsl(var(--background) / 0.2)',
                }}
                aria-label={`Go to Step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
