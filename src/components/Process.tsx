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

const TypewriterTitle = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayText('');
    setIsTyping(true);
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [text]);

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
  
  // Calculate horizontal offset - start centered, move left
  const stepWidth = 200; // approximate width of each step
  const gap = 20;
  const totalStepWidth = stepWidth + gap;
  const horizontalOffset = scrollProgress * totalStepWidth * processSteps.length;

  return (
    <section 
      ref={sectionRef}
      id="process" 
      className="relative bg-foreground text-background"
      style={{ height: `${100 + (processSteps.length * 100)}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Title - Left aligned like CaseStudies */}
        <div className="container py-24 md:py-32">
          <h2 className="font-display font-medium leading-[1.05] tracking-tight text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] text-background">
            <TypewriterTitle text="My AI Powered Process" />
          </h2>
        </div>

        {/* Timeline Steps - Horizontal scrolling with wipe effect */}
        <div className="relative mt-8 md:mt-12">
          {/* Center divider line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-background/30 z-10" />
          
          {/* Steps container with clip masks for wipe effect */}
          <div className="relative h-[280px] overflow-hidden">
            {/* Dark layer (left side) - clips to show only left of center */}
            <div 
              className="absolute inset-0 flex items-center"
              style={{
                clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)',
              }}
            >
              <div 
                className="flex items-start"
                style={{
                  gap: `${gap}px`,
                  transform: `translateX(calc(50vw - ${horizontalOffset}px - ${stepWidth / 2}px))`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                {processSteps.map((step, index) => {
                  const isActive = index === activeStep;
                  const isPast = index < activeStep;
                  
                  return (
                    <div
                      key={`dark-${step.number}`}
                      className="flex-shrink-0 transition-opacity duration-300"
                      style={{
                        width: `${stepWidth}px`,
                        opacity: isPast || isActive ? 1 : 0.4,
                        transform: `translateY(${index * 40}px)`,
                      }}
                    >
                      <div 
                        className={`px-5 py-3 rounded-[4px] whitespace-nowrap border transition-all duration-300 ${
                          isActive 
                            ? 'bg-background text-foreground border-background' 
                            : 'bg-transparent text-background/60 border-background/20'
                        }`}
                      >
                        <span className="text-sm font-medium">
                          Step {step.number}
                        </span>
                        <p className="text-xs mt-1 opacity-80">
                          {step.shortTitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Colorful layer (right side) - clips to show only right of center */}
            <div 
              className="absolute inset-0 flex items-center"
              style={{
                clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
              }}
            >
              <div 
                className="flex items-start"
                style={{
                  gap: `${gap}px`,
                  transform: `translateX(calc(50vw - ${horizontalOffset}px - ${stepWidth / 2}px))`,
                  transition: 'transform 0.1s ease-out',
                }}
              >
                {processSteps.map((step, index) => {
                  const isFuture = index > activeStep;
                  const isActive = index === activeStep;
                  
                  return (
                    <div
                      key={`color-${step.number}`}
                      className="flex-shrink-0 transition-opacity duration-300"
                      style={{
                        width: `${stepWidth}px`,
                        opacity: isFuture || isActive ? 1 : 0.5,
                        transform: `translateY(${index * 40}px)`,
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
                          Step {step.number}
                        </span>
                        <p className="text-xs mt-1 opacity-80">
                          {step.shortTitle}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="container mt-8 md:mt-12">
          <div className="max-w-5xl mx-auto">
            <div className="bg-background/5 backdrop-blur-sm rounded-[4px] p-8 md:p-12 border border-background/10">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Left Column */}
                <div className="space-y-6">
                  <p 
                    className="font-medium"
                    style={{ color: pastelColors[activeStep] }}
                  >
                    Step {currentStep.number}:
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium text-background leading-tight">
                    {currentStep.title}
                  </h3>
                  <div 
                    className="bg-background/10 rounded-[4px] p-6 border-l-2"
                    style={{ borderColor: pastelColors[activeStep] }}
                  >
                    <p className="text-sm font-medium text-background/60 mb-2">Goal:</p>
                    <p className="text-background/90">{currentStep.goal}</p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Sparkles 
                      className="w-5 h-5 flex-shrink-0 mt-1" 
                      style={{ color: pastelColors[activeStep] }}
                    />
                    <div>
                      <p className="font-medium text-background mb-2">AI in Action:</p>
                      <p className="text-background/70 leading-relaxed">
                        {currentStep.aiAction}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-background mb-2">Outcome:</p>
                      <p className="text-background/70 leading-relaxed">
                        {currentStep.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step indicators */}
            <div className="flex justify-center gap-2 mt-8">
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
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: index === activeStep ? '32px' : '8px',
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
