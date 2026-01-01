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
  tools: string;
  toolImage: string;
}

const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Research Synthesis & Opportunity Framing",
    purpose: "Surface validated user needs, constraints, and leverage points",
    outcome: "Clear priorities aligned with business goals",
    tools: "ChatGPT, Claude, Dovetail",
    toolImage: step1Image,
  },
  {
    number: 2,
    title: "Problem Definition & Hypothesis Design",
    purpose: "Define the right problem and how we'll measure success",
    outcome: "A focused hypothesis that guides decisions and scope",
    tools: "ChatGPT, Notion AI",
    toolImage: step2Image,
  },
  {
    number: 3,
    title: "Concept Exploration & Design Execution",
    purpose: "Explore solution paths quickly without sacrificing feasibility",
    outcome: "Scalable design directions grounded in real constraints",
    tools: "Figma, ChatGPT, Midjourney",
    toolImage: step3Image,
  },
  {
    number: 4,
    title: "Validation, Testing & Iteration",
    purpose: "De-risk decisions through evidence before building too far",
    outcome: "User-validated improvements with fewer costly surprises",
    tools: "Maze, UserTesting, Dovetail",
    toolImage: step4Image,
  },
  {
    number: 5,
    title: "Measurement, Learning & Continuous Improvement",
    purpose: "Measure real behavior and refine based on usage patterns",
    outcome: "Products that improve over time with clear success metrics",
    tools: "Amplitude, Mixpanel, AI Analytics",
    toolImage: step5Image,
  },
];

const LandingProcess = () => {
  const handleCTAClick = () => {
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
        <p className="text-muted-foreground/70 text-sm sm:text-base max-w-3xl mb-12 md:mb-16">
          This process adapts based on product maturity, risk, and business constraints — not every project requires every step.
        </p>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="group relative bg-card/30 backdrop-blur-sm rounded-xl border border-foreground/10 p-5 sm:p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card/50"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-3 left-5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                <span className="text-primary text-xs font-medium tracking-wider">
                  {String(step.number).padStart(2, '0')}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-display font-medium text-foreground text-base sm:text-lg mt-3 mb-3 leading-tight">
                {step.title}
              </h3>
              
              {/* Purpose */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {step.purpose}
              </p>
              
              {/* Outcome */}
              <div className="mb-4 pb-4 border-b border-foreground/5">
                <p className="text-primary/90 text-sm">
                  <span className="text-primary font-medium">→</span> {step.outcome}
                </p>
              </div>

              {/* AI Tools */}
              <div className="flex items-center gap-2">
                <img 
                  src={step.toolImage} 
                  alt={`Tools for ${step.title}`}
                  className="h-6 w-auto object-contain opacity-60 group-hover:opacity-80 transition-opacity"
                />
                <span className="text-muted-foreground/60 text-xs">{step.tools}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <button
            onClick={handleCTAClick}
            className="text-primary text-sm hover:text-primary/80 transition-colors inline-flex items-center gap-2 group"
          >
            See this process applied in real case studies
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LandingProcess;
