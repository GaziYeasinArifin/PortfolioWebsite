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
    title: 'AI-Powered Research & Analysis',
    goal: 'Gain deep insights into user needs and market dynamics.',
    aiAction: 'I use AI to rapidly analyze user data, uncover critical patterns, summarize key findings, and perform comprehensive competitive analysis.',
    outcome: 'This provides quick, actionable insights, ensuring your project starts with a strong, data-driven foundation.',
  },
  {
    number: 2,
    shortTitle: 'Hypothesis Formulation',
    title: 'AI-Driven Problem Definition & Hypothesis',
    goal: 'Clearly define user-centric problems and create testable hypotheses.',
    aiAction: 'I use AI to synthesize research into precise, data-backed problem statements and to generate innovative hypotheses based on user needs.',
    outcome: 'This ensures a sharp focus on solving the most impactful user problems with creative and well-founded solution strategies.',
  },
  {
    number: 3,
    shortTitle: 'Creative Design',
    title: 'AI-Assisted Creative Design',
    goal: 'Generate a wide range of innovative design solutions and rapidly visualize concepts.',
    aiAction: 'I use AI for accelerated ideation, exploring creative concepts, and quickly generating initial wireframes and visual designs. It also helps me maintain a consistent, scalable design system in Figma.',
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
    aiAction: 'Post-launch, I use AI to analyze real-time performance metrics and user feedback from all channels. This helps me identify optimization opportunities and informs a data-driven improvement cycle.',
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

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);

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

  const currentStep = processSteps[activeStep];
  
  // Calculate horizontal scroll position
  const stepWidth = 220;
  const stepGap = 16;
  const totalWidth = (stepWidth + stepGap) * processSteps.length;
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const startOffset = viewportWidth * 0.6;
  const endOffset = -totalWidth + viewportWidth * 0.4;
  const horizontalOffset = startOffset + (endOffset - startOffset) * scrollProgress;

  return (
    <section 
      ref={sectionRef}
      id="process" 
      className="relative bg-foreground text-background"
      style={{ height: `${100 + (processSteps.length * 100)}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Title */}
        <div className="container pt-16 md:pt-20">
          <h2 
            className="font-display font-medium text-xl sm:text-2xl md:text-3xl lg:text-[2rem] xl:text-[2.25rem]"
            style={{ color: 'hsl(var(--background) / 0.7)' }}
          >
            <TypewriterTitle />
          </h2>
        </div>

        {/* Steps Timeline Area */}
        <div className="relative flex-1 flex items-center">
          {/* Left Edge Overlay - blends steps into background */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-32 md:w-48 z-20 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, hsl(var(--foreground)) 0%, hsl(var(--foreground)) 20%, transparent 100%)',
            }}
          />
          
          {/* Right Edge Overlay - blends steps into background */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-32 md:w-48 z-20 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, hsl(var(--foreground)) 0%, hsl(var(--foreground)) 20%, transparent 100%)',
            }}
          />

          {/* Steps container */}
          <div 
            ref={stepsContainerRef}
            className="absolute w-full flex items-center"
            style={{
              transform: `translateX(${horizontalOffset}px)`,
              transition: 'transform 0.1s linear',
              willChange: 'transform',
              gap: `${stepGap}px`,
            }}
          >
            {processSteps.map((step, index) => {
              const isActive = index === activeStep;
              
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
                  className="flex-shrink-0 rounded-[4px] text-left transition-all duration-300 border-2"
                  style={{
                    width: `${stepWidth}px`,
                    padding: '16px 20px',
                    backgroundColor: isActive ? pastelColors[index] : 'transparent',
                    borderColor: isActive ? pastelColors[index] : 'hsl(var(--background) / 0.3)',
                  }}
                >
                  <span 
                    className="block text-xs font-medium mb-1 transition-colors duration-300"
                    style={{ 
                      color: isActive ? 'hsl(var(--foreground))' : 'hsl(var(--background) / 0.5)',
                    }}
                  >
                    Step {step.number}
                  </span>
                  <span 
                    className="block text-sm font-medium whitespace-nowrap transition-colors duration-300"
                    style={{ 
                      color: isActive ? 'hsl(var(--foreground))' : 'hsl(var(--background) / 0.8)',
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
        <div className="container pb-12 md:pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="bg-background/5 backdrop-blur-sm rounded-[4px] p-6 md:p-8 lg:p-10 border border-background/10">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
                {/* Left Column */}
                <div className="space-y-4">
                  <p 
                    className="text-sm font-medium"
                    style={{ color: pastelColors[activeStep] }}
                  >
                    Step {currentStep.number}:
                  </p>
                  <h3 className="font-display text-lg md:text-xl lg:text-2xl font-medium text-background leading-tight">
                    {currentStep.title}
                  </h3>
                  <div 
                    className="bg-background/10 rounded-[4px] p-4 border-l-2"
                    style={{ borderColor: pastelColors[activeStep] }}
                  >
                    <p className="text-xs font-medium text-background/60 mb-1">Goal:</p>
                    <p className="text-sm text-background/90">{currentStep.goal}</p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Sparkles 
                      className="w-4 h-4 flex-shrink-0 mt-0.5" 
                      style={{ color: pastelColors[activeStep] }}
                    />
                    <div>
                      <p className="text-sm font-medium text-background mb-1">AI In Action:</p>
                      <p className="text-sm text-background/70 leading-relaxed">
                        {currentStep.aiAction}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-background mb-1">Outcome:</p>
                      <p className="text-sm text-background/70 leading-relaxed">
                        {currentStep.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step indicators */}
            <div className="flex justify-center gap-2 mt-6">
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
                    width: index === activeStep ? '20px' : '6px',
                    backgroundColor: index === activeStep 
                      ? pastelColors[activeStep] 
                      : 'hsl(var(--background) / 0.3)',
                  }}
                  aria-label={`Go to Step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
