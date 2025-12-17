import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Smartphone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import personaClaire from '@/assets/screenlife-persona-claire.webp';
import personaSarah from '@/assets/screenlife-persona-sarah.webp';
import paperSketches from '@/assets/screenlife-paper-sketches.webp';
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

// Placeholder image component
const PlaceholderImage = ({ label, aspectRatio = '4/3', className = '' }: { label: string; aspectRatio?: string; className?: string }) => (
  <div 
    className={`relative w-full overflow-hidden rounded-[4px] bg-secondary group ${className}`}
    style={{ aspectRatio }}
  >
    <div className="absolute inset-0 border-2 border-dashed border-muted-foreground/30 rounded-[4px] flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.02]">
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

          {/* Hero Section */}
          <AnimatedSection delay={100}>
            <div className="mb-16 md:mb-24">
              <h1 className="font-display font-medium leading-[1.05] tracking-tight text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] mb-6">
                <span className="uppercase text-foreground">screenlife mobile app</span>
                <br />
                <span className="lowercase text-muted-foreground">designing the first mobile interactive video recorder</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mb-8 leading-relaxed">
                Screenlife stands out from the competition because it saves recordings as interactive video files. When a user watches a Screenlife video, all links and buttons inside the recording remain <span className="text-foreground font-medium">clickable and active.</span>
              </p>
              
              {/* Role & Platform */}
              <div className="flex flex-wrap gap-4 md:gap-6 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>Sole UI/UX Designer</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Smartphone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>iOS & Android</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Hero image placeholder */}
          <AnimatedSection delay={200}>
            <PlaceholderImage 
              label="[INSERT: Hero Image - Screenlife App Interface]" 
              aspectRatio="16/9"
              className="mb-24 md:mb-32"
            />
          </AnimatedSection>

          {/* Chapter I: Context */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter i</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Context</h2>
              </div>
            </AnimatedSection>

            {/* The Background */}
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16">
                <div className="space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">The Background.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The product started as a Chrome extension. Stakeholders needed a mobile app to build a community and expand the user base beyond desktop users.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">The Challenge.</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                      <span>Keep features simple despite complex recording technology</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                      <span>Move fast (startup speed) while maintaining quality</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                      <span>Adapt a comprehensive web platform to mobile screens</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter II: Research & Constraints */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter ii</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Research & Constraints</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-8">
                <div className="space-y-4 max-w-3xl">
                  <p className="text-muted-foreground leading-relaxed">
                    Lacking access to real users initially, I created <span className="text-foreground font-medium">provisional personas</span> based on stakeholder interviews to guide the early design. We conducted competitor analysis and stakeholder interviews to understand the market landscape.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative w-full overflow-hidden rounded-[4px] group">
                    <img 
                      src={personaClaire} 
                      alt="Provisional Persona: Claire - 25 year old blogger" 
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="relative w-full overflow-hidden rounded-[4px] group">
                    <img 
                      src={personaSarah} 
                      alt="Provisional Persona: Sarah - 23 year old student" 
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter III: Ideation */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter iii</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Ideation</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-8">
                <div className="space-y-4 max-w-3xl">
                  <p className="text-muted-foreground leading-relaxed">
                    We used <span className="text-foreground font-medium">paper prototypes</span> to adapt web flows to mobile. This allowed developers to spot technical limitations before code was written. Low-fi prototypes allowed us to find the right ideas quickly.
                  </p>
                </div>
                <div className="relative w-full overflow-hidden rounded-[4px] group">
                  <img 
                    src={paperSketches} 
                    alt="Hand-drawn paper prototypes showing mobile app wireframes" 
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter IV: Phase 1 Testing */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter iv</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Phase 1: InVision Testing</h2>
              </div>
            </AnimatedSection>

            {/* 3-column cards */}
            <AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-secondary rounded-[4px] p-6 space-y-3">
                  <h4 className="font-display font-medium uppercase text-sm">Search Clarity</h4>
                  <p className="text-sm text-muted-foreground">Issue: Users couldn't distinguish links from authors.</p>
                  <p className="text-sm text-foreground font-medium">Solution: Added content icons.</p>
                </div>
                <div className="bg-secondary rounded-[4px] p-6 space-y-3">
                  <h4 className="font-display font-medium uppercase text-sm">No Playlist Creation</h4>
                  <p className="text-sm text-muted-foreground">Issue: Users couldn't find how to create a playlist.</p>
                  <p className="text-sm text-foreground font-medium">Solution: Added "Create" button.</p>
                </div>
                <div className="bg-secondary rounded-[4px] p-6 space-y-3">
                  <h4 className="font-display font-medium uppercase text-sm">Player Behavior</h4>
                  <p className="text-sm text-muted-foreground">Issue: Users expected the player to minimize like YouTube.</p>
                  <p className="text-sm text-foreground font-medium">Solution: Added minimization logic.</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PlaceholderImage 
                  label="[INSERT: Search UI]" 
                  aspectRatio="9/16"
                />
                <PlaceholderImage 
                  label="[INSERT: Playlist UI]" 
                  aspectRatio="9/16"
                />
                <PlaceholderImage 
                  label="[INSERT: Player Minimized UI]" 
                  aspectRatio="9/16"
                />
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter V: Design QA */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter v</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Design QA</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-8">
                <div className="space-y-4 max-w-3xl">
                  <p className="text-muted-foreground leading-relaxed">
                    With <span className="text-foreground font-medium">60+ screens</span> in development, I conducted design reviews to fix execution gaps in spacing and layout. Small details (margins, spacing) were missed during implementation, so I created design review docs to align code with design.
                  </p>
                </div>
                <PlaceholderImage 
                  label="[INSERT: Design Review/QA Document Screenshot]" 
                  aspectRatio="16/9"
                />
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter VI: Phase 2 Testing */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter vi</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Phase 2: Onsite Testing</h2>
                <p className="text-muted-foreground mt-4">24 Issues Found</p>
              </div>
            </AnimatedSection>

            {/* 2x2 grid */}
            <AnimatedSection>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-display font-medium uppercase text-sm">Permission Dialogs</h4>
                    <p className="text-sm text-muted-foreground">Users denied native prompts immediately. We moved to custom pre-permission primers.</p>
                  </div>
                  <PlaceholderImage 
                    label="[INSERT: Permission Flow UI]" 
                    aspectRatio="4/3"
                  />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-display font-medium uppercase text-sm">Sign-in Barrier</h4>
                    <p className="text-sm text-muted-foreground">Users missed the "Skip" button. We redesigned the header to make it prominent.</p>
                  </div>
                  <PlaceholderImage 
                    label="[INSERT: Sign-in UI]" 
                    aspectRatio="4/3"
                  />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-display font-medium uppercase text-sm">Filtering</h4>
                    <p className="text-sm text-muted-foreground">Applied filter state was unclear to users. We added better active states.</p>
                  </div>
                  <PlaceholderImage 
                    label="[INSERT: Filter UI]" 
                    aspectRatio="4/3"
                  />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-display font-medium uppercase text-sm">Hashtag Input</h4>
                    <p className="text-sm text-muted-foreground">Users tried typing "#" manually. We added an auto-placeholder.</p>
                  </div>
                  <PlaceholderImage 
                    label="[INSERT: Hashtag UI]" 
                    aspectRatio="4/3"
                  />
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter VII: Refinement & V2 */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter vii</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Refinement & V2</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-8">
                <div className="space-y-4 max-w-3xl">
                  <p className="text-muted-foreground leading-relaxed">
                    Based on the 24 issues, we shipped a major redesign focusing on <span className="text-foreground font-medium">clarity and social features</span>. We added time/likes/views to thumbnails, sorting tabs (Popular/New/Following), and prioritized the Follow feature.
                  </p>
                </div>
                {/* Horizontal scroll */}
                <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible md:grid md:grid-cols-3">
                  <PlaceholderImage 
                    label="[INSERT: New Main Screen (Meta Data)]" 
                    aspectRatio="9/16"
                    className="min-w-[250px] md:min-w-0"
                  />
                  <PlaceholderImage 
                    label="[INSERT: New Tabs Interface]" 
                    aspectRatio="9/16"
                    className="min-w-[250px] md:min-w-0"
                  />
                  <PlaceholderImage 
                    label="[INSERT: Follow Feature UI]" 
                    aspectRatio="9/16"
                    className="min-w-[250px] md:min-w-0"
                  />
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter VIII: Key Learnings */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter viii</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Key Learnings</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-start gap-4">
                  <span className="font-display font-medium text-lg text-muted-foreground">01</span>
                  <div>
                    <h4 className="font-display font-medium mb-2">Access to End Users is Vital</h4>
                    <p className="text-muted-foreground">Basing personas on assumptions was a risk. Direct user access would have accelerated validation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="font-display font-medium text-lg text-muted-foreground">02</span>
                  <div>
                    <h4 className="font-display font-medium mb-2">Jobs-to-be-Done over Personas</h4>
                    <p className="text-muted-foreground">JTBD framework better explains why users act. Focus on motivation, not demographics.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="font-display font-medium text-lg text-muted-foreground">03</span>
                  <div>
                    <h4 className="font-display font-medium mb-2">Test Earlier</h4>
                    <p className="text-muted-foreground">We should have tested paper prototypes instead of waiting for high-fidelity. Validate logic before pixels.</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Thank you section */}
          <AnimatedSection>
            <div className="text-center py-16 md:py-24">
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-6">thank you for reading</p>
              <Link 
                to="/#case-studies" 
                className="inline-flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors duration-300 group"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                <span className="font-display text-lg">back to all projects</span>
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
