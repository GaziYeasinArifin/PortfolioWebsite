import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Animated section component for scroll-triggered animations
const AnimatedSection = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

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

// Placeholder image component with dashed border
const PlaceholderImage = ({ label, aspectRatio = '16/9' }: { label: string; aspectRatio?: string }) => (
  <div 
    className="w-full bg-secondary border-2 border-dashed border-muted-foreground/30 rounded-[4px] flex items-center justify-center"
    style={{ aspectRatio }}
  >
    <p className="text-muted-foreground text-sm text-center px-6 leading-relaxed font-poppins">{label}</p>
  </div>
);

// Badge component for meta tags - uses the Screenlife brand colors
const MetaBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center px-4 py-2 bg-[#EEF2FF] text-[#4461F2] text-sm font-medium rounded-full font-poppins">
    {children}
  </span>
);

const ComingSoon = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="container">
          
          {/* Back navigation */}
          <AnimatedSection>
            <Link 
              to="/#case-studies" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              back to work
            </Link>
          </AnimatedSection>

          {/* ============================================ */}
          {/* 1. HERO SECTION */}
          {/* ============================================ */}
          <AnimatedSection delay={100}>
            <div className="mb-16 md:mb-24">
              <h1 className="font-poppins font-semibold leading-[1.05] tracking-tight text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] mb-6 text-foreground">
                iterative design process
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8 font-poppins">
                iterating from paper sketches to a verified ecosystem through rapid prototyping and user testing.
              </p>
              
              {/* Meta Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <MetaBadge>focus: iterative design</MetaBadge>
                <MetaBadge>duration: 2 weeks</MetaBadge>
                <MetaBadge>outcome: high-fidelity prototype</MetaBadge>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Hero Image Placeholder */}
          <AnimatedSection delay={200}>
            <div className="relative aspect-[21/9] overflow-hidden rounded-[4px] bg-secondary mb-24 md:mb-32">
              <div className="absolute inset-0 border-2 border-dashed border-muted-foreground/30 rounded-[4px] flex items-center justify-center">
                <p className="text-muted-foreground text-sm text-center px-6 leading-relaxed font-poppins">
                  [PLACEHOLDER: 3D Floating Screens - The Final Iteration Result]
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Project Overview */}
          <AnimatedSection delay={100}>
            <div className="mb-24 md:mb-32">
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4 font-poppins">overview</p>
                <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
                  screenlife app
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-poppins">
                  bridging the gap between talent and opportunity.
                </p>
              </div>
              
              {/* Role & Tools Grid */}
              <div className="flex flex-wrap gap-4 md:gap-6">
                <div className="flex items-center gap-2 text-sm font-poppins">
                  <span className="text-muted-foreground">role:</span>
                  <span className="text-foreground">UI/UX Designer</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-poppins">
                  <span className="text-muted-foreground">tools:</span>
                  <span className="text-foreground">Figma, Photoshop</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ============================================ */}
          {/* 2. PROBLEM & SOLUTION (Context) */}
          {/* ============================================ */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4 font-poppins">context</p>
                <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">the challenge</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* The Problem */}
                <div className="space-y-4">
                  <h3 className="font-poppins text-xl md:text-2xl font-semibold text-foreground uppercase">the problem</h3>
                  <p className="text-muted-foreground leading-relaxed font-poppins">
                    unemployment is a global issue. existing platforms are cluttered and unverified, making it difficult for job seekers to find legitimate opportunities and for recruiters to find qualified candidates.
                  </p>
                </div>
                
                {/* The Solution */}
                <div className="space-y-4">
                  <h3 className="font-poppins text-xl md:text-2xl font-semibold text-foreground uppercase">the solution</h3>
                  <p className="text-muted-foreground leading-relaxed font-poppins">
                    a verified job marketplace that builds trust between employers and job seekers through verified profiles, transparent job listings, and a streamlined application process.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* ============================================ */}
          {/* 3. DESIGN PROCESS */}
          {/* ============================================ */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4 font-poppins">methodology</p>
                <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">the design process</h2>
                <p className="text-lg text-muted-foreground mt-4 font-poppins">I followed a 5-step user-centered process.</p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection>
              <PlaceholderImage 
                label="[PLACEHOLDER: 5-Step Design Process Infographic (Empathize → Define → Ideate → Prototype → Test)]" 
                aspectRatio="4/1" 
              />
            </AnimatedSection>
          </section>

          {/* ============================================ */}
          {/* 4. RESEARCH (Empathize) */}
          {/* ============================================ */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4 font-poppins">empathize</p>
                <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">understanding the user</h2>
                <p className="text-lg text-muted-foreground mt-4 font-poppins">target audience: job seekers & recruiters.</p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* User Persona */}
                <div className="space-y-4">
                  <h3 className="font-poppins text-sm text-muted-foreground uppercase tracking-wide">user persona</h3>
                  <PlaceholderImage 
                    label="[PLACEHOLDER: User Persona Card (Sarah - The Frustrated Job Seeker)]" 
                    aspectRatio="3/4" 
                  />
                </div>
                
                {/* Empathy Map */}
                <div className="space-y-4">
                  <h3 className="font-poppins text-sm text-muted-foreground uppercase tracking-wide">empathy map</h3>
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Empathy Map Grid (Says / Thinks / Does / Feels)]" 
                    aspectRatio="1/1" 
                  />
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* ============================================ */}
          {/* 5. IDEATION (Logic) */}
          {/* ============================================ */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4 font-poppins">define & ideate</p>
                <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">ideation & logic</h2>
                <p className="text-lg text-muted-foreground mt-4 font-poppins">mapping the user journey to ensure a seamless flow.</p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
                {/* User Flow - 60% */}
                <div className="lg:col-span-3 space-y-4">
                  <h3 className="font-poppins text-sm text-muted-foreground uppercase tracking-wide">information architecture</h3>
                  <PlaceholderImage 
                    label="[PLACEHOLDER: User Flow Diagram]" 
                    aspectRatio="16/10" 
                  />
                </div>
                
                {/* Sketches - 40% */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="font-poppins text-sm text-muted-foreground uppercase tracking-wide">rapid paper prototyping</h3>
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Photo of Hand-Drawn Paper Sketches]" 
                    aspectRatio="4/5" 
                  />
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* ============================================ */}
          {/* 6. WIREFRAMES (Structure) */}
          {/* ============================================ */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4 font-poppins">prototype</p>
                <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">wireframing</h2>
                <p className="text-lg text-muted-foreground mt-4 font-poppins">translating sketches into digital structure to test placement and hierarchy.</p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection>
              <PlaceholderImage 
                label="[PLACEHOLDER: Low-Fidelity Wireframes Compilation]" 
                aspectRatio="16/9" 
              />
            </AnimatedSection>
          </section>

          {/* ============================================ */}
          {/* 7. VISUAL SYSTEM */}
          {/* ============================================ */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4 font-poppins">style guide</p>
                <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">visual identity</h2>
                <p className="text-lg text-muted-foreground mt-4 font-poppins">building trust with color and typography.</p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Typography */}
                <div className="space-y-4">
                  <h3 className="font-poppins text-sm text-muted-foreground uppercase tracking-wide">typography: poppins (geometric, clean)</h3>
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Typography Specimen (Poppins)]" 
                    aspectRatio="4/3" 
                  />
                </div>
                
                {/* Color Palette */}
                <div className="space-y-4">
                  <h3 className="font-poppins text-sm text-muted-foreground uppercase tracking-wide">color: royal blue (#4461F2)</h3>
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Color Palette Swatches]" 
                    aspectRatio="4/3" 
                  />
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* ============================================ */}
          {/* 8. HIGH-FIDELITY (Onboarding) */}
          {/* ============================================ */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4 font-poppins">high-fidelity</p>
                <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">onboarding experience</h2>
                <p className="text-lg text-muted-foreground mt-4 font-poppins">engaging the user immediately with clear value propositions.</p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
                <div className="w-full max-w-[200px]">
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Onboarding Screen 1 - Search]" 
                    aspectRatio="9/16" 
                  />
                </div>
                <div className="w-full max-w-[200px]">
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Onboarding Screen 2 - Apply]" 
                    aspectRatio="9/16" 
                  />
                </div>
                <div className="w-full max-w-[200px]">
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Onboarding Screen 3 - Notification]" 
                    aspectRatio="9/16" 
                  />
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* ============================================ */}
          {/* 9. HIGH-FIDELITY (Core UI) */}
          {/* ============================================ */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4 font-poppins">core screens</p>
                <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">core interface</h2>
                <p className="text-lg text-muted-foreground mt-4 font-poppins">clean feeds and detailed job descriptions.</p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection>
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
            </AnimatedSection>
          </section>

          {/* ============================================ */}
          {/* 10. HIGH-FIDELITY (Profile) */}
          {/* ============================================ */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4 font-poppins">profile</p>
                <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">user profile</h2>
                <p className="text-lg text-muted-foreground mt-4 font-poppins">a professional dashboard for job seekers.</p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection>
              <div className="flex justify-center">
                <div className="w-full max-w-[280px]">
                  <PlaceholderImage 
                    label="[PLACEHOLDER: User Profile UI Screen (Photo, CV, Portfolio Links)]" 
                    aspectRatio="9/16" 
                  />
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* ============================================ */}
          {/* 11. OUTCOME & GIF */}
          {/* ============================================ */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4 font-poppins">outcome</p>
                <h2 className="font-poppins text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">interactive prototype</h2>
                <p className="text-lg text-muted-foreground mt-4 font-poppins">a fully interactive application.</p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection>
              <div className="flex flex-col items-center">
                {/* Phone Mockup Container */}
                <div className="w-full max-w-[300px] mb-10">
                  <div className="bg-foreground rounded-[32px] p-3">
                    <div className="bg-secondary border-2 border-dashed border-muted-foreground/30 rounded-[24px] flex items-center justify-center" style={{ aspectRatio: '9/19' }}>
                      <p className="text-muted-foreground text-sm text-center px-6 leading-relaxed font-poppins">
                        [PLACEHOLDER: GIF of App Interaction / Scrolling]
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Outcome Text */}
                <div className="text-center max-w-xl">
                  <p className="font-poppins text-xl md:text-2xl font-semibold text-foreground mb-2">
                    successfully reduced application time by 40%
                  </p>
                  <p className="text-muted-foreground font-poppins">
                    streamlined user flow with verified trust signals
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* CTA Footer */}
          <AnimatedSection>
            <div className="text-center pt-16 border-t border-border">
              <p className="font-poppins text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                let's create something impactful
              </p>
              <p className="text-muted-foreground text-lg mb-8 font-poppins">
                interested in working together?
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a 
                  href="mailto:arifin.yeasin@gmail.com"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#4461F2] text-white font-medium rounded-[4px] hover:bg-[#3651E2] transition-colors duration-300 font-poppins"
                >
                  get in touch
                </a>
                <Link 
                  to="/#case-studies"
                  className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground font-medium rounded-[4px] hover:bg-secondary transition-colors duration-300 font-poppins"
                >
                  view more work
                </Link>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ComingSoon;
