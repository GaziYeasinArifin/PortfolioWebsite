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
  const fullText = "my AI-powered process";

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

  // Render plain text
  const renderText = () => {
    return displayText;
  };

  return (
    <span className="inline-flex items-center">
      {renderText()}
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
        setScrollProgress(progress);
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
  
  // Calculate horizontal offset - start centered, move left within 80% of screen
  const stepWidth = 180;
  const gap = 20;
  const totalStepWidth = stepWidth + gap;
  const horizontalOffset = scrollProgress * totalStepWidth * (processSteps.length - 1);

  return (
    <section 
      ref={sectionRef}
      id="process" 
      className="relative bg-foreground text-background"
      style={{ height: `${100 + (processSteps.length * 80)}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Title - Match hero subtitle size */}
        <div className="container pt-16 md:pt-20">
          <h2 className="font-display font-medium text-muted-foreground/70 text-xl sm:text-2xl md:text-3xl lg:text-[2rem] xl:text-[2.25rem]" style={{ color: 'hsl(var(--background) / 0.7)' }}>
            <TypewriterTitle />
          </h2>
        </div>

        {/* Timeline Steps - Horizontal scrolling with wipe effect */}
        <div className="relative flex-1 flex items-center mt-8">
          {/* Center divider line - 50% shorter */}
          <div className="absolute left-1/2 top-1/4 bottom-1/4 w-px bg-background/30 z-10" />
          
          {/* Steps container with clip masks for wipe effect - constrained to 80% center */}
          <div className="relative w-[80%] mx-auto h-[120px]">
            {/* Dark layer (left side) - clips to show only left of center */}
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{
                clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
              }}
            >
              <div 
                className="flex items-center"
                style={{
                  gap: `${gap}px`,
                  transform: `translateX(calc(-${horizontalOffset}px))`,
                  transition: 'transform 0.15s ease-out',
                }}
              >
                {processSteps.map((step, index) => {
                  const isActive = index === activeStep;
                  const isPast = index < activeStep;
                  
                  return (
                    <div
                      key={`dark-${step.number}`}
                      className="flex-shrink-0 transition-all duration-300"
                      style={{
                        width: `${stepWidth}px`,
                        opacity: isPast || isActive ? 1 : 0.4,
                      }}
                    >
                      <div 
                        className={`px-5 py-3 rounded-[4px] whitespace-nowrap border transition-all duration-300 ${
                          isActive 
                            ? 'bg-background/10 border-background/40' 
                            : 'bg-transparent border-background/20'
                        }`}
                        style={{ color: 'hsl(var(--background) / 0.8)' }}
                      >
                        <span className="text-sm font-medium">
                          step {step.number}
                        </span>
                        <p className="text-xs mt-1 opacity-70">
                          {step.shortTitle.toLowerCase()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Colorful layer (right side) - clips to show only right of center */}
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{
                clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
              }}
            >
              <div 
                className="flex items-center"
                style={{
                  gap: `${gap}px`,
                  transform: `translateX(calc(-${horizontalOffset}px))`,
                  transition: 'transform 0.15s ease-out',
                }}
              >
                {processSteps.map((step, index) => {
                  const isFuture = index > activeStep;
                  const isActive = index === activeStep;
                  
                  return (
                    <div
                      key={`color-${step.number}`}
                      className="flex-shrink-0 transition-all duration-300"
                      style={{
                        width: `${stepWidth}px`,
                        opacity: isFuture || isActive ? 1 : 0.5,
                      }}
                    >
                      <div 
                        className="px-5 py-3 rounded-[4px] whitespace-nowrap border transition-all duration-300"
                        style={{
                          backgroundColor: pastelColors[index],
                          borderColor: pastelColors[index],
                          color: 'hsl(var(--foreground))',
                        }}
                      >
                        <span className="text-sm font-medium">
                          step {step.number}
                        </span>
                        <p className="text-xs mt-1 opacity-80">
                          {step.shortTitle.toLowerCase()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Step Content - Increased spacing: 15px increments */}
        <div className="container pb-16 pt-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-background/5 backdrop-blur-sm rounded-[4px] p-8 md:p-10 border border-background/10">
              <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                {/* Left Column */}
                <div className="space-y-6">
                  <p 
                    className="text-sm font-medium"
                    style={{ color: pastelColors[activeStep] }}
                  >
                    step {currentStep.number}:
                  </p>
                  <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-medium text-background leading-tight mt-2">
                    {currentStep.title.toLowerCase()}
                  </h3>
                  <div 
                    className="bg-background/10 rounded-[4px] p-5 border-l-2 mt-4"
                    style={{ borderColor: pastelColors[activeStep] }}
                  >
                    <p className="text-xs font-medium text-background/60 mb-2">goal:</p>
                    <p className="text-sm text-background/90">{currentStep.goal}</p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6 mt-0">
                  <div className="flex items-start gap-4">
                    <Sparkles 
                      className="w-4 h-4 flex-shrink-0 mt-1" 
                      style={{ color: pastelColors[activeStep] }}
                    />
                    <div>
                      <p className="text-sm font-medium text-background mb-2">ai in action:</p>
                      <p className="text-sm text-background/70 leading-relaxed mt-1">
                        {currentStep.aiAction}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 mt-4">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-background mb-2">outcome:</p>
                      <p className="text-sm text-background/70 leading-relaxed mt-1">
                        {currentStep.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step indicators - more spacing */}
            <div className="flex justify-center gap-3 mt-8">
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
                      ? pastelColors[activeStep] 
                      : 'hsla(var(--background) / 0.3)',
                  }}
                  aria-label={`Go to step ${index + 1}`}
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
