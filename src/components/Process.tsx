import { useState, useEffect, useRef } from 'react';
import { Sparkles, CheckCircle } from 'lucide-react';

const pastelColors = [
  'hsl(340, 82%, 76%)', // Pink
  'hsl(280, 67%, 78%)', // Lavender
  'hsl(200, 80%, 74%)', // Sky Blue
  'hsl(160, 60%, 72%)', // Mint
  'hsl(45, 93%, 75%)',  // Peach/Yellow
];

const processSteps = [
  {
    number: 1,
    shortTitle: 'Research & Analysis',
    title: 'AI-Powered User Research & Analysis',
    goal: 'Gain deep insights into user needs and market dynamics.',
    aiAction: 'I use AI to rapidly analyze user data, uncover critical patterns, summarize key findings, and perform comprehensive competitive analysis.',
    outcome: 'This provides quick, actionable insights, ensuring your project starts with a strong, data-driven foundation.',
  },
  {
    number: 2,
    shortTitle: 'Hypothesis Formulation',
    title: 'Problem Definition, Hypothesis with AI',
    goal: 'Clearly define user-centric problems and create testable hypotheses.',
    aiAction: 'I use AI to synthesize research into precise, data-backed problem statements and to generate innovative hypotheses based on user needs.',
    outcome: 'This ensures a sharp focus on solving the most impactful user problems with creative and well-founded solution strategies.',
  },
  {
    number: 3,
    shortTitle: 'Creative Design',
    title: 'AI-Assisted Creative Design',
    goal: 'Generate a wide range of innovative design solutions and rapidly visualize concepts.',
    aiAction: 'I use AI for accelerated ideation, exploring creative concepts, and quickly generating wireframes and visuals. It also helps me maintain a consistent, scalable design system.',
    outcome: 'This boosts creative output, significantly speeds up design cycles, and ensures visual consistency across the entire user interface.',
  },
  {
    number: 4,
    shortTitle: 'User Testing',
    title: 'AI-Enhanced User Testing & Iteration',
    goal: 'Efficiently validate designs and iterate effectively based on user feedback.',
    aiAction: 'I use AI to streamline the analysis of user testing sessions—transcribing feedback, identifying key themes and sentiment from qualitative data, and rapidly pinpointing usability issues.',
    outcome: 'This leads to quicker, data-informed design refinements, ensuring the final solution is closely aligned with user expectations and needs.',
  },
  {
    number: 5,
    shortTitle: 'Evaluation & Improvement',
    title: 'AI-Driven Evaluation & Improvement',
    goal: 'Proactively monitor product performance and continuously improve the user experience based on real-world data.',
    aiAction: 'Post-launch, I use AI to analyze real-time performance metrics and user feedback from all channels. I optimize opportunities and informs a data-driven improvement cycle.',
    outcome: 'My products evolve intelligently through proactive optimization, ensuring they consistently meet and exceed user needs over time.',
  },
];

const TypewriterTitle = () => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "My AI-Powered Process";

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
    <div className="grid md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
      {/* Left Column */}
      <div className="space-y-5">
        <p 
          className="text-sm font-medium"
          style={{ color }}
        >
          Step {step.number}:
        </p>
        <h3 className="font-display text-lg md:text-xl lg:text-2xl font-medium text-background leading-tight">
          {step.title}
        </h3>
        <div 
          className="bg-background/10 rounded-[4px] p-4 border-l-2"
          style={{ borderColor: color }}
        >
          <p className="text-xs font-medium text-background/60 mb-1">Goal:</p>
          <p className="text-sm text-background/90">{step.goal}</p>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-5">
        <div className="flex items-start gap-3">
          <Sparkles 
            className="w-4 h-4 flex-shrink-0 mt-0.5" 
            style={{ color }}
          />
          <div>
            <p className="text-sm font-medium text-background mb-1">AI In Action:</p>
            <p className="text-sm text-background/70 leading-relaxed">
              {step.aiAction}
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-background mb-1">Outcome:</p>
            <p className="text-sm text-background/70 leading-relaxed">
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
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Calculate horizontal scroll position
  const stepWidth = 220;
  const stepGap = 16;
  const totalWidth = (stepWidth + stepGap) * processSteps.length;
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const startOffset = viewportWidth * 0.6;
  const endOffset = -totalWidth + viewportWidth * 0.4;
  const horizontalOffset = startOffset + (endOffset - startOffset) * scrollProgress;

  const currentStep = processSteps[activeStep];
  const currentColor = pastelColors[activeStep];

  return (
    <section 
      ref={sectionRef}
      id="process" 
      className="relative bg-foreground text-background"
      style={{ height: `${100 + (processSteps.length * 120)}vh` }}
    >
      <div className="sticky top-16 md:top-20 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] flex flex-col justify-between py-12 md:py-16 overflow-hidden">
        {/* Title */}
        <div className="container">
          <h2 
            className="font-display font-medium text-xl sm:text-2xl md:text-3xl lg:text-[2rem] xl:text-[2.25rem]"
            style={{ color: 'hsl(var(--background) / 0.7)' }}
          >
            <TypewriterTitle />
          </h2>
        </div>

        {/* Steps Timeline Area */}
        <div className="relative h-[180px] md:h-[200px] flex items-start">
          {/* Left Edge Overlay */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-32 md:w-48 z-20 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, hsl(var(--foreground)) 0%, hsl(var(--foreground)) 20%, transparent 100%)',
            }}
          />
          
          {/* Right Edge Overlay */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-32 md:w-48 z-20 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, hsl(var(--foreground)) 0%, hsl(var(--foreground)) 20%, transparent 100%)',
            }}
          />

          {/* Steps container */}
          <div 
            className="absolute flex items-start"
            style={{
              transform: `translateX(${horizontalOffset}px)`,
              gap: `${stepGap}px`,
            }}
          >
            {processSteps.map((step, index) => {
              const isActive = index === activeStep;
              const verticalOffset = index * 20;
              
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
                  className="flex-shrink-0 rounded-[4px] text-left border-2"
                  style={{
                    width: `${stepWidth}px`,
                    padding: '16px 20px',
                    marginTop: `${verticalOffset}px`,
                    backgroundColor: isActive ? pastelColors[index] : 'transparent',
                    borderColor: isActive ? pastelColors[index] : 'hsl(var(--background) / 0.3)',
                    transition: 'background-color 0.4s ease, border-color 0.4s ease',
                  }}
                >
                  <span 
                    className="block text-xs font-medium mb-1"
                    style={{ 
                      color: isActive ? 'hsl(var(--foreground))' : 'hsl(var(--background) / 0.5)',
                      transition: 'color 0.4s ease',
                    }}
                  >
                    Step {step.number}
                  </span>
                  <span 
                    className="block text-sm font-medium whitespace-nowrap"
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
        <div className="container">
          <div className="max-w-5xl mx-auto w-full">
            <div 
              className="bg-background/5 backdrop-blur-sm rounded-[4px] p-6 md:p-8 lg:p-10 border border-background/10"
              style={{
                transition: 'height 0.3s ease',
              }}
            >
              <StepContent step={processSteps[activeStep]} color={pastelColors[activeStep]} />
            </div>
          </div>
        </div>

        {/* Step indicators */}
        <div className="container">
          <div className="flex justify-center gap-2">
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
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: index === activeStep ? '24px' : '6px',
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
