import { useState, useEffect, useRef } from 'react';
import { Sparkles, CheckCircle } from 'lucide-react';

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
        className={`inline-block w-[3px] h-[1em] bg-foreground ml-1 ${isTyping ? 'animate-pulse' : 'opacity-0'}`}
      />
    </span>
  );
};

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !contentRef.current) return;
      
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress within the section
      const scrollStart = rect.top;
      const scrollRange = sectionHeight - viewportHeight;
      
      if (scrollStart <= 0 && scrollStart >= -scrollRange) {
        const progress = Math.abs(scrollStart) / scrollRange;
        const stepIndex = Math.min(
          Math.floor(progress * processSteps.length),
          processSteps.length - 1
        );
        setActiveStep(stepIndex);
      } else if (scrollStart > 0) {
        setActiveStep(0);
      } else if (scrollStart < -scrollRange) {
        setActiveStep(processSteps.length - 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentStep = processSteps[activeStep];

  return (
    <section 
      ref={sectionRef}
      id="process" 
      className="relative bg-foreground text-background"
      style={{ height: `${100 + (processSteps.length * 100)}vh` }}
    >
      <div 
        ref={contentRef}
        className="sticky top-0 h-screen overflow-hidden"
      >
        {/* Title */}
        <div className="container pt-16 md:pt-24">
          <h2 className="font-display font-medium leading-[1.05] tracking-tight text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] text-center text-background">
            <TypewriterTitle text="My AI Powered Process" />
          </h2>
        </div>

        {/* Timeline Steps - Horizontal scrolling */}
        <div className="relative mt-12 md:mt-16">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-background/20" />
          
          {/* Center dot */}
          <div className="absolute left-1/2 top-0 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent border-2 border-background z-10" />
          
          {/* Steps container */}
          <div 
            className="flex items-start justify-center gap-8 md:gap-12 transition-transform duration-700 ease-out px-4"
            style={{
              transform: `translateX(${activeStep * -180}px)`,
            }}
          >
            {processSteps.map((step, index) => {
              const isActive = index === activeStep;
              const isPast = index < activeStep;
              
              return (
                <div
                  key={step.number}
                  className={`flex-shrink-0 transition-all duration-500 ${
                    isActive 
                      ? 'opacity-100' 
                      : isPast 
                        ? 'opacity-40' 
                        : 'opacity-60'
                  }`}
                  style={{
                    transform: `translateY(${index * 36}px)`,
                  }}
                >
                  <div 
                    className={`px-4 py-2 rounded-[4px] whitespace-nowrap transition-all duration-500 ${
                      isActive 
                        ? 'bg-background text-foreground' 
                        : 'bg-background/10 text-background/80'
                    }`}
                  >
                    <span className="text-sm md:text-base font-medium">
                      Step {step.number}: {step.shortTitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Vertical line extending down */}
          <div className="absolute left-1/2 top-3 w-px h-48 md:h-64 bg-background/20" />
        </div>

        {/* Step Content */}
        <div className="container mt-32 md:mt-48">
          <div className="max-w-5xl mx-auto">
            <div className="bg-background/5 backdrop-blur-sm rounded-[4px] p-8 md:p-12 border border-background/10">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                {/* Left Column */}
                <div className="space-y-6">
                  <p className="text-accent font-medium">
                    Step {currentStep.number}:
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium text-background leading-tight">
                    {currentStep.title}
                  </h3>
                  <div className="bg-background/10 rounded-[4px] p-6 border-l-2 border-accent">
                    <p className="text-sm font-medium text-background/60 mb-2">Goal:</p>
                    <p className="text-background/90">{currentStep.goal}</p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
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
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeStep 
                      ? 'bg-accent w-8' 
                      : 'bg-background/30 hover:bg-background/50'
                  }`}
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
