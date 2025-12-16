import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Figma, Users, Lightbulb } from 'lucide-react';
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

// Placeholder image component matching the case study style
const PlaceholderImage = ({ label, aspectRatio = '4/3', className = '' }: { label: string; aspectRatio?: string; className?: string }) => (
  <div 
    className={`relative w-full overflow-hidden rounded-[4px] bg-secondary group ${className}`}
    style={{ aspectRatio }}
  >
    <div className="absolute inset-0 border-2 border-dashed border-muted-foreground/20 rounded-[4px] flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]">
      <p className="text-muted-foreground text-sm text-center px-6 leading-relaxed">{label}</p>
    </div>
  </div>
);

const ComingSoon = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="container">
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

          {/* Hero section - The Hook */}
          <AnimatedSection delay={100}>
            <div className="mb-16 md:mb-24">
              <h1 className="font-display font-medium leading-[1.05] tracking-tight text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] mb-6">
                <span className="uppercase text-foreground">screenlife app</span>
                <br />
                <span className="lowercase text-muted-foreground">bridging talent and opportunity</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
                <span className="text-foreground font-medium">Challenge:</span> Existing job platforms are <span className="text-foreground font-medium">cluttered and unverified.</span><br />
                <span className="text-foreground font-medium">Solution:</span> A <span className="text-foreground font-medium">verified job marketplace</span> that builds trust.
              </p>
              
              {/* Role & Tools */}
              <div className="flex flex-wrap gap-4 md:gap-6 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>UI/UX Designer</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Lightbulb className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>Iterative Design</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Figma className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>Figma, Photoshop</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">2 Weeks Sprint</p>
            </div>
          </AnimatedSection>

          {/* Hero image */}
          <AnimatedSection delay={200}>
            <PlaceholderImage 
              label="[PLACEHOLDER: 3D Floating Screens - The Final Iteration Result]" 
              aspectRatio="16/9"
              className="mb-24 md:mb-32"
            />
          </AnimatedSection>

          {/* Chapter I: The Problem */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter i</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">The Challenge</h2>
              </div>
            </AnimatedSection>

            {/* The Problem */}
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16">
                <div className="space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">Overwhelmed Job Seekers.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Unemployment is a global issue. Existing platforms are cluttered and unverified, making it difficult for job seekers to find legitimate opportunities and for recruiters to find qualified candidates.
                  </p>
                </div>
                <PlaceholderImage 
                  label="[PLACEHOLDER: Problem Statement Visual / Statistics]" 
                  aspectRatio="4/3"
                />
              </div>
            </AnimatedSection>

            {/* The Solution */}
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <PlaceholderImage 
                  label="[PLACEHOLDER: Solution Overview / App Preview]" 
                  aspectRatio="4/3"
                  className="order-2 lg:order-1"
                />
                <div className="space-y-4 order-1 lg:order-2">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">A Verified Marketplace.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A verified job marketplace that builds trust between employers and job seekers through verified profiles, transparent job listings, and a streamlined application process.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                      <span>Verified company profiles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                      <span>Transparent job listings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                      <span>Streamlined application flow</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter II: The Process */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter ii</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">The Process</h2>
              </div>
            </AnimatedSection>

            {/* Design Process */}
            <AnimatedSection>
              <div className="space-y-8 mb-16">
                <div className="space-y-4 max-w-3xl">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">5-Step User-Centered Design.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    I followed a structured design thinking process: Empathize, Define, Ideate, Prototype, and Test. Each phase brought new insights that shaped the final product.
                  </p>
                </div>
                <PlaceholderImage 
                  label="[PLACEHOLDER: 5-Step Design Process Infographic (Empathize → Define → Ideate → Prototype → Test)]" 
                  aspectRatio="21/6"
                />
              </div>
            </AnimatedSection>

            {/* User Research */}
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16">
                <div className="space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">Understanding the User.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Target audience: Job seekers and recruiters. Through user interviews and research, we identified key pain points and opportunities.
                  </p>
                </div>
                <PlaceholderImage 
                  label="[PLACEHOLDER: User Persona Card (Sarah - The Frustrated Job Seeker)]" 
                  aspectRatio="4/3"
                />
              </div>
            </AnimatedSection>

            {/* Empathy Map */}
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16">
                <PlaceholderImage 
                  label="[PLACEHOLDER: Empathy Map Grid (Says / Thinks / Does / Feels)]" 
                  aspectRatio="1/1"
                  className="order-2 lg:order-1"
                />
                <div className="space-y-4 order-1 lg:order-2">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">Empathy Mapping.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Deep dive into user emotions and behaviors revealed frustrations with existing platforms: spam listings, unresponsive recruiters, and lack of transparency.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Ideation */}
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 mb-16">
                <div className="lg:col-span-3 space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">Information Architecture.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Mapping the user journey to ensure a seamless flow from discovery to application.
                  </p>
                  <PlaceholderImage 
                    label="[PLACEHOLDER: User Flow Diagram]" 
                    aspectRatio="16/10"
                  />
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">Rapid Sketching.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Paper prototyping to test layouts quickly.
                  </p>
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Photo of Hand-Drawn Paper Sketches]" 
                    aspectRatio="4/5"
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Wireframing */}
            <AnimatedSection>
              <div className="space-y-8">
                <div className="space-y-4 max-w-3xl">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">Low-Fidelity Wireframes.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Translating sketches into digital structure to test placement and hierarchy before adding visual design.
                  </p>
                </div>
                <PlaceholderImage 
                  label="[PLACEHOLDER: Low-Fidelity Wireframes Compilation]" 
                  aspectRatio="16/9"
                />
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter III: Visual Design */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter iii</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Visual Design</h2>
              </div>
            </AnimatedSection>

            {/* Style Guide */}
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16">
                <div className="space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">Typography & Color.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Building trust with clean typography (Poppins) and a professional royal blue (#4461F2) color palette.
                  </p>
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Typography Specimen (Poppins)]" 
                    aspectRatio="4/3"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">Color System.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A cohesive palette that conveys professionalism and trust while remaining accessible.
                  </p>
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Color Palette Swatches]" 
                    aspectRatio="4/3"
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Onboarding */}
            <AnimatedSection>
              <div className="mb-16">
                <h3 className="font-display text-xl md:text-2xl font-medium uppercase mb-6">Onboarding Experience.</h3>
                <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                  Engaging the user immediately with clear value propositions and a frictionless signup flow.
                </p>
                <div className="grid grid-cols-3 gap-4 md:gap-6">
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Onboarding Screen 1 - Search]" 
                    aspectRatio="9/16"
                  />
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Onboarding Screen 2 - Apply]" 
                    aspectRatio="9/16"
                  />
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Onboarding Screen 3 - Notification]" 
                    aspectRatio="9/16"
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Core UI */}
            <AnimatedSection>
              <div className="mb-16">
                <h3 className="font-display text-xl md:text-2xl font-medium uppercase mb-6">Core Interface.</h3>
                <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                  Clean feeds and detailed job descriptions designed for quick scanning and informed decisions.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Login Screen]" 
                    aspectRatio="9/16"
                  />
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Signup Screen]" 
                    aspectRatio="9/16"
                  />
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Home Feed Screen]" 
                    aspectRatio="9/16"
                  />
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Job Details Screen]" 
                    aspectRatio="9/16"
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Profile */}
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">User Profile.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A professional dashboard for job seekers featuring CV management, portfolio links, and application tracking.
                  </p>
                </div>
                <PlaceholderImage 
                  label="[PLACEHOLDER: User Profile UI Screen (Photo, CV, Portfolio Links)]" 
                  aspectRatio="9/16"
                />
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter IV: The Outcome */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter iv</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">The Outcome</h2>
              </div>
            </AnimatedSection>

            {/* Interactive Prototype */}
            <AnimatedSection>
              <div className="mb-16">
                <h3 className="font-display text-xl md:text-2xl font-medium uppercase mb-6">Interactive Prototype.</h3>
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-[300px] mb-8">
                    <div className="bg-foreground rounded-[32px] p-3">
                      <PlaceholderImage 
                        label="[PLACEHOLDER: GIF of App Interaction / Scrolling]" 
                        aspectRatio="9/19"
                        className="rounded-[24px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Impact */}
            <AnimatedSection>
              <div className="mb-16">
                <div className="bg-secondary rounded-[4px] p-8 md:p-12">
                  <blockquote className="font-display text-xl md:text-2xl lg:text-3xl font-medium text-center leading-relaxed">
                    "Successfully reduced application time by 40%"
                  </blockquote>
                  <p className="text-center text-muted-foreground mt-4">— Streamlined user flow with verified trust signals</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Learnings */}
            <AnimatedSection>
              <div className="text-center py-12">
                <h3 className="font-display text-xl md:text-2xl font-medium uppercase mb-8">key learnings.</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto">
                  <div>
                    <p className="font-display text-lg font-medium mb-2">Trust is Everything</p>
                    <p className="text-sm text-muted-foreground">Verification builds confidence</p>
                  </div>
                  <div>
                    <p className="font-display text-lg font-medium mb-2">Simplicity Wins</p>
                    <p className="text-sm text-muted-foreground">Clean UI reduces friction</p>
                  </div>
                  <div>
                    <p className="font-display text-lg font-medium mb-2">Iterate Quickly</p>
                    <p className="text-sm text-muted-foreground">Testing reveals insights</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Thank You */}
            <AnimatedSection>
              <div className="py-24 flex items-center justify-center">
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium lowercase">thank you</h2>
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
                  <ArrowLeft className="h-5 w-5 rotate-180 transition-all duration-300 group-hover:text-background" />
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

export default ComingSoon;
