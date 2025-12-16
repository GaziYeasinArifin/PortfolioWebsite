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
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Placeholder image component with dashed border
const PlaceholderImage = ({ label, aspectRatio = '16/9' }: { label: string; aspectRatio?: string }) => (
  <div 
    className="w-full bg-[#F5F5F5] border-2 border-dashed border-[#D1D5DB] rounded-[4px] flex items-center justify-center"
    style={{ aspectRatio }}
  >
    <p className="text-[#9CA3AF] text-sm text-center px-6 leading-relaxed font-['Poppins']">{label}</p>
  </div>
);

// Badge component for meta tags
const MetaBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center px-4 py-2 bg-[#EEF2FF] text-[#4461F2] text-sm font-medium rounded-full font-['Poppins']">
    {children}
  </span>
);

// Section title component
const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-10">
    <h2 className="font-['Poppins'] text-3xl md:text-4xl font-semibold text-foreground mb-3">
      {children}
    </h2>
    {subtitle && (
      <p className="font-['Poppins'] text-lg text-muted-foreground max-w-2xl">
        {subtitle}
      </p>
    )}
  </div>
);

const ComingSoon = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-32">
        <div className="container max-w-6xl">
          
          {/* Back navigation */}
          <AnimatedSection>
            <Link 
              to="/#case-studies" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12 group font-['Poppins']"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              back to work
            </Link>
          </AnimatedSection>

          {/* ============================================ */}
          {/* 1. HERO SECTION */}
          {/* ============================================ */}
          <AnimatedSection delay={100}>
            <div className="text-center mb-12">
              <h1 className="font-['Poppins'] text-5xl md:text-6xl lg:text-[64px] font-semibold leading-[1.1] tracking-tight text-foreground mb-6">
                iterative design process
              </h1>
              <p className="font-['Poppins'] text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                iterating from paper sketches to a verified ecosystem through rapid prototyping and user testing.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                <MetaBadge>focus: iterative design</MetaBadge>
                <MetaBadge>duration: 2 weeks</MetaBadge>
                <MetaBadge>outcome: high-fidelity prototype</MetaBadge>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Hero Image Placeholder */}
          <AnimatedSection delay={200}>
            <div className="mb-24">
              <PlaceholderImage 
                label="[PLACEHOLDER: 3D Floating Screens - The Final Iteration Result]" 
                aspectRatio="21/9" 
              />
            </div>
          </AnimatedSection>

          {/* Project Overview */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <div className="text-center mb-12">
                <h2 className="font-['Poppins'] text-3xl md:text-4xl font-semibold mb-4 text-foreground">
                  screenlife app
                </h2>
                <p className="font-['Poppins'] text-lg text-muted-foreground max-w-2xl mx-auto">
                  bridging the gap between talent and opportunity.
                </p>
              </div>
              <div className="bg-secondary/30 rounded-[4px] py-8 px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2 tracking-wide font-['Poppins']">role</p>
                    <p className="font-medium text-foreground font-['Poppins']">UI/UX Designer</p>
                  </div>
                  <div className="text-center md:border-l border-border">
                    <p className="text-sm text-muted-foreground mb-2 tracking-wide font-['Poppins']">tools</p>
                    <p className="font-medium text-foreground font-['Poppins']">Figma, Photoshop</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ============================================ */}
          {/* 2. PROBLEM & SOLUTION (Context) */}
          {/* ============================================ */}
          <AnimatedSection delay={100}>
            <div className="mb-24 bg-secondary/20 rounded-[4px] p-8 md:p-12">
              <h2 className="font-['Poppins'] text-2xl md:text-3xl font-semibold text-center text-foreground mb-10">
                context
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
                {/* The Problem */}
                <div className="md:pr-10 md:border-r border-border">
                  <h3 className="font-['Poppins'] text-xl font-semibold text-foreground mb-4">
                    the problem
                  </h3>
                  <p className="font-['Poppins'] text-muted-foreground leading-relaxed">
                    unemployment is a global issue. existing platforms are cluttered and unverified, making it difficult for job seekers to find legitimate opportunities and for recruiters to find qualified candidates.
                  </p>
                </div>
                
                {/* The Solution */}
                <div className="md:pl-10">
                  <h3 className="font-['Poppins'] text-xl font-semibold text-foreground mb-4">
                    the solution
                  </h3>
                  <p className="font-['Poppins'] text-muted-foreground leading-relaxed">
                    a verified job marketplace that builds trust between employers and job seekers through verified profiles, transparent job listings, and a streamlined application process.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ============================================ */}
          {/* 3. DESIGN PROCESS */}
          {/* ============================================ */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <SectionTitle subtitle="I followed a 5-step user-centered process.">
                the design process
              </SectionTitle>
              <PlaceholderImage 
                label="[PLACEHOLDER: 5-Step Design Process Infographic (Empathize → Define → Ideate → Prototype → Test)]" 
                aspectRatio="4/1" 
              />
            </div>
          </AnimatedSection>

          {/* ============================================ */}
          {/* 4. RESEARCH (Empathize) */}
          {/* ============================================ */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <SectionTitle subtitle="target audience: job seekers & recruiters.">
                understanding the user
              </SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* User Persona */}
                <div>
                  <p className="font-['Poppins'] text-sm text-muted-foreground mb-4 tracking-wide">user persona</p>
                  <PlaceholderImage 
                    label="[PLACEHOLDER: User Persona Card (Sarah - The Frustrated Job Seeker)]" 
                    aspectRatio="3/4" 
                  />
                </div>
                
                {/* Empathy Map */}
                <div>
                  <p className="font-['Poppins'] text-sm text-muted-foreground mb-4 tracking-wide">empathy map</p>
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Empathy Map Grid (Says / Thinks / Does / Feels)]" 
                    aspectRatio="1/1" 
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ============================================ */}
          {/* 5. IDEATION (Logic) */}
          {/* ============================================ */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <SectionTitle subtitle="mapping the user journey to ensure a seamless flow.">
                ideation & logic
              </SectionTitle>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* User Flow - 60% */}
                <div className="lg:col-span-3">
                  <p className="font-['Poppins'] text-sm text-muted-foreground mb-4 tracking-wide">information architecture</p>
                  <PlaceholderImage 
                    label="[PLACEHOLDER: User Flow Diagram]" 
                    aspectRatio="16/10" 
                  />
                </div>
                
                {/* Sketches - 40% */}
                <div className="lg:col-span-2">
                  <p className="font-['Poppins'] text-sm text-muted-foreground mb-4 tracking-wide">rapid paper prototyping</p>
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Photo of Hand-Drawn Paper Sketches]" 
                    aspectRatio="4/5" 
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ============================================ */}
          {/* 6. WIREFRAMES (Structure) */}
          {/* ============================================ */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <SectionTitle subtitle="translating sketches into digital structure to test placement and hierarchy.">
                wireframing
              </SectionTitle>
              <PlaceholderImage 
                label="[PLACEHOLDER: Low-Fidelity Wireframes Compilation]" 
                aspectRatio="16/9" 
              />
            </div>
          </AnimatedSection>

          {/* ============================================ */}
          {/* 7. VISUAL SYSTEM */}
          {/* ============================================ */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <SectionTitle subtitle="building trust with color and typography.">
                visual identity
              </SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Typography */}
                <div>
                  <p className="font-['Poppins'] text-sm text-muted-foreground mb-4 tracking-wide">typography: poppins (geometric, clean)</p>
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Typography Specimen (Poppins)]" 
                    aspectRatio="4/3" 
                  />
                </div>
                
                {/* Color Palette */}
                <div>
                  <p className="font-['Poppins'] text-sm text-muted-foreground mb-4 tracking-wide">color: royal blue (#4461F2)</p>
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Color Palette Swatches]" 
                    aspectRatio="4/3" 
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ============================================ */}
          {/* 8. HIGH-FIDELITY (Onboarding) */}
          {/* ============================================ */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <SectionTitle subtitle="engaging the user immediately with clear value propositions.">
                onboarding experience
              </SectionTitle>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
                {/* Screen 1 */}
                <div className="w-full max-w-[200px]">
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Onboarding Screen 1 - Search]" 
                    aspectRatio="9/16" 
                  />
                </div>
                
                {/* Screen 2 */}
                <div className="w-full max-w-[200px]">
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Onboarding Screen 2 - Apply]" 
                    aspectRatio="9/16" 
                  />
                </div>
                
                {/* Screen 3 */}
                <div className="w-full max-w-[200px]">
                  <PlaceholderImage 
                    label="[PLACEHOLDER: Onboarding Screen 3 - Notification]" 
                    aspectRatio="9/16" 
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ============================================ */}
          {/* 9. HIGH-FIDELITY (Core UI) */}
          {/* ============================================ */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <SectionTitle subtitle="clean feeds and detailed job descriptions.">
                core interface
              </SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Row 1 */}
                <PlaceholderImage 
                  label="[PLACEHOLDER: Login Screen]" 
                  aspectRatio="9/16" 
                />
                <PlaceholderImage 
                  label="[PLACEHOLDER: Signup Screen]" 
                  aspectRatio="9/16" 
                />
                
                {/* Row 2 */}
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

          {/* ============================================ */}
          {/* 10. HIGH-FIDELITY (Profile) */}
          {/* ============================================ */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <SectionTitle subtitle="a professional dashboard for job seekers.">
                user profile
              </SectionTitle>
              <div className="flex justify-center">
                <div className="w-full max-w-[280px]">
                  <PlaceholderImage 
                    label="[PLACEHOLDER: User Profile UI Screen (Photo, CV, Portfolio Links)]" 
                    aspectRatio="9/16" 
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ============================================ */}
          {/* 11. OUTCOME & GIF */}
          {/* ============================================ */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <SectionTitle subtitle="a fully interactive application.">
                interactive prototype
              </SectionTitle>
              <div className="flex flex-col items-center">
                {/* Phone Mockup Container */}
                <div className="w-full max-w-[300px] mb-8">
                  <div className="bg-foreground rounded-[32px] p-3">
                    <div className="bg-[#F5F5F5] border-2 border-dashed border-[#D1D5DB] rounded-[24px] flex items-center justify-center" style={{ aspectRatio: '9/19' }}>
                      <p className="text-[#9CA3AF] text-sm text-center px-6 leading-relaxed font-['Poppins']">
                        [PLACEHOLDER: GIF of App Interaction / Scrolling]
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Outcome Text */}
                <div className="text-center">
                  <p className="font-['Poppins'] text-xl md:text-2xl font-semibold text-foreground mb-2">
                    successfully reduced application time by 40%
                  </p>
                  <p className="font-['Poppins'] text-muted-foreground">
                    streamlined user flow with verified trust signals
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* CTA Footer */}
          <AnimatedSection delay={100}>
            <div className="text-center py-16 border-t border-border">
              <p className="font-['Poppins'] text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                let's create something impactful
              </p>
              <p className="text-muted-foreground text-lg mb-8 font-['Poppins']">
                interested in working together?
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a 
                  href="mailto:arifin.yeasin@gmail.com"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#4461F2] text-white font-medium rounded-[4px] hover:bg-[#3651E2] transition-colors duration-300 font-['Poppins']"
                >
                  get in touch
                </a>
                <Link 
                  to="/#case-studies"
                  className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground font-medium rounded-[4px] hover:bg-secondary/50 transition-colors duration-300 font-['Poppins']"
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
