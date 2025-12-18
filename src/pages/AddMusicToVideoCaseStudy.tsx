import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
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

const AddMusicToVideoCaseStudy = () => {
  useEffect(() => {
    document.title = 'Add Music to Video | Gazi Arifin';
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
                <span className="uppercase text-foreground">Redefining Mobile Video Editing</span>
                <br />
                <span className="lowercase text-muted-foreground">leading the ux for a top-charting creative app</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mb-8 leading-relaxed">
                Add Music to Video scaled from a simple utility to a creative powerhouse at Kite Games Studio, staying on <span className="text-foreground font-medium">top charts for years</span> and enabling me to scale the design team from 4 to 22 members.
              </p>
              
              {/* Role & Duration */}
              <div className="flex flex-wrap gap-4 md:gap-6 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span>Lead UX Designer</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>2016 - 2023</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Hero image placeholder */}
          <AnimatedSection delay={200}>
            <div className="relative w-full overflow-hidden rounded-[4px] group mb-24 md:mb-32">
              <PlaceholderImage 
                label="[INSERT: High-Fidelity App Home Screen - Dark Mode]" 
                aspectRatio="16/9" 
              />
            </div>
          </AnimatedSection>

          {/* Chapter I: Context */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter i</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Context</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16">
                <div className="space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">The Role.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    As Lead UX Designer at Kite Games Studio in Dhaka, I scaled the design team from 4 to 22 members while leading 16+ successful projects.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">The Collaboration.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Close integration with developers and QA engineers ensured pixel-perfect execution and seamless transitions.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter II: The Challenge */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter ii</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">The Challenge</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-4 max-w-3xl mb-16">
                <h3 className="font-display text-xl md:text-2xl font-medium uppercase">The 2016 Landscape.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The original experience was cluttered and technically rigid. Users struggled to sync audio, and the visual output felt "cheap." I needed to dismantle the existing flow and rebuild it based on <span className="text-foreground font-medium">how people feel music</span>, not just how code handles it.
                </p>
              </div>
            </AnimatedSection>

            {/* Comparison Layout */}
            <AnimatedSection>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
                <div className="w-full max-w-[220px]">
                  <PlaceholderImage 
                    label="[INSERT: Old 2016 Cluttered Interface]" 
                    aspectRatio="9/16" 
                  />
                </div>
                
                <div className="text-muted-foreground/50 rotate-90 md:rotate-0">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
                
                <div className="w-full max-w-[220px]">
                  <PlaceholderImage 
                    label="[INSERT: New 2017 Clean Interface]" 
                    aspectRatio="9/16" 
                  />
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter III: Research & Methodology */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter iii</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Research & Methodology</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-4 max-w-3xl mb-12">
                <h3 className="font-display text-xl md:text-2xl font-medium uppercase">Unconventional Methods.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I employed <span className="text-foreground font-medium">unconventional research methods</span> to understand how users interact with music and video beyond typical usability testing.
                </p>
              </div>
            </AnimatedSection>
            
            {/* Bento Grid */}
            <AnimatedSection>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-secondary/20 rounded-[4px] p-6">
                  <PlaceholderImage 
                    label="[INSERT: DJ/Audio Waveform visual]" 
                    aspectRatio="1/1" 
                    className="mb-6"
                  />
                  <h4 className="font-display text-xl font-medium uppercase mb-3">The DJ Study.</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    I analyzed DJ beat-matching to understand how non-musicians perceive audio structure.
                  </p>
                </div>
                
                <div className="bg-secondary/20 rounded-[4px] p-6">
                  <PlaceholderImage 
                    label="[INSERT: Movie Scene Breakdown]" 
                    aspectRatio="1/1" 
                    className="mb-6"
                  />
                  <h4 className="font-display text-xl font-medium uppercase mb-3">Cinematic Grammar.</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    I studied movie transitions to create a "logic grammar" for video themes.
                  </p>
                </div>
                
                <div className="bg-secondary/20 rounded-[4px] p-6">
                  <PlaceholderImage 
                    label="[INSERT: Abstract Psychology/Persona Image]" 
                    aspectRatio="1/1" 
                    className="mb-6"
                  />
                  <h4 className="font-display text-xl font-medium uppercase mb-3">Psychology.</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Analyzed psychology to understand how users (specifically female demographics) view self-image in editing.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter IV: The Bridge */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter iv</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">The Bridge</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">Bridging Design & Code.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    In 2016, tools like Figma weren't advanced enough for my vision. I used <span className="text-foreground font-medium">After Effects to demonstrate complex animations</span> and wrote "Transition Grammar" on paper to explain the logic to developers.
                  </p>
                  <p className="text-lg md:text-xl italic text-foreground/80 leading-relaxed pt-4">
                    "I didn't just hand off pixels; I defined the physics of the app."
                  </p>
                </div>
                
                <div>
                  <PlaceholderImage 
                    label="[INSERT: Photo of Handwritten Logic Paper or After Effects Timeline]" 
                    aspectRatio="16/9" 
                  />
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter V: The Solution */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter v</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">The Solution</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-4 max-w-3xl mb-12">
                <h3 className="font-display text-xl md:text-2xl font-medium uppercase">The Reimagined Editor.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The final design featured a dark-mode interface that prioritized the content. We introduced a <span className="text-foreground font-medium">drag-and-drop timeline that felt tactile</span>, allowing users to "touch" the music. The result was a seamless flow from import to export.
                </p>
              </div>
            </AnimatedSection>
            
            {/* Solution Gallery */}
            <AnimatedSection>
              <div className="bg-[hsl(220,10%,15%)] rounded-[4px] p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
                  <div className="w-full max-w-[180px]">
                    <div 
                      className="w-full bg-[hsl(220,10%,20%)] border-2 border-dashed border-[hsl(220,10%,30%)] rounded-[4px] flex items-center justify-center p-4"
                      style={{ aspectRatio: '9/16' }}
                    >
                      <p className="text-[hsl(220,10%,50%)] text-xs text-center leading-relaxed">
                        [INSERT: Music Selection Screen]
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full max-w-[180px]">
                    <div 
                      className="w-full bg-[hsl(220,10%,20%)] border-2 border-dashed border-[hsl(220,10%,30%)] rounded-[4px] flex items-center justify-center p-4"
                      style={{ aspectRatio: '9/16' }}
                    >
                      <p className="text-[hsl(220,10%,50%)] text-xs text-center leading-relaxed">
                        [INSERT: Main Editor Timeline]
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full max-w-[180px]">
                    <div 
                      className="w-full bg-[hsl(220,10%,20%)] border-2 border-dashed border-[hsl(220,10%,30%)] rounded-[4px] flex items-center justify-center p-4"
                      style={{ aspectRatio: '9/16' }}
                    >
                      <p className="text-[hsl(220,10%,50%)] text-xs text-center leading-relaxed">
                        [INSERT: Export & Share Screen]
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="text-center text-[hsl(220,10%,50%)] text-sm mt-8">
                  The 2017 Redesign
                </p>
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter VI: Execution */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter vi</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Execution</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="space-y-4 max-w-3xl mb-12">
                <h3 className="font-display text-xl md:text-2xl font-medium uppercase">Pixel-Perfect Execution.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The best design fails without implementation. I sat side-by-side with developers and QA engineers in countless meetings, <span className="text-foreground font-medium">fixing glitches and refining transition timings</span> until the app felt indistinguishable from the After Effects prototype.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection>
              <PlaceholderImage 
                label="[INSERT: Photo of Team Collaboration or Code/Design Split Screen]" 
                aspectRatio="21/9" 
              />
            </AnimatedSection>
          </section>

          {/* Chapter VII: Impact */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter vii</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Impact</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">7 Years of Leadership.</h3>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    This project was just the beginning. It stayed on the <span className="text-foreground font-medium">Top Charts for years</span>, and the success allowed me to scale the design team to 22 members, leading 16+ successful projects at Kite Games Studio.
                  </p>
                  
                  {/* Results */}
                  <div className="space-y-4">
                    <div>
                      <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
                        Top Charts
                      </p>
                      <p className="text-muted-foreground text-sm">App Store & Play Store</p>
                    </div>
                    
                    <div>
                      <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
                        16+ Projects
                      </p>
                      <p className="text-muted-foreground text-sm">Shipped Successfully</p>
                    </div>
                    
                    <div>
                      <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
                        22 Designers
                      </p>
                      <p className="text-muted-foreground text-sm">Team Led & Mentored</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <PlaceholderImage 
                    label="[INSERT: App Store Top Charts Badge or Growth Graph]" 
                    aspectRatio="1/1" 
                  />
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* CTA Footer Section */}
          <AnimatedSection>
            <div className="py-24 text-center">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium mb-4">
                Ready to build the next success story?
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                Let's create something memorable.
              </p>
              <a 
                href="mailto:arifin.yeasin@gmail.com"
                className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-medium text-lg rounded-[4px] hover:bg-foreground/90 transition-colors duration-300"
              >
                Contact Me
              </a>
            </div>
          </AnimatedSection>

          {/* Navigation to other projects */}
          <AnimatedSection>
            <div className="pt-16 border-t border-border">
              <Link 
                to="/#case-studies" 
                className="group flex items-center justify-between"
              >
                <div>
                  <p className="text-sm text-muted-foreground mb-2">back to</p>
                  <p className="font-display text-2xl md:text-3xl font-medium group-hover:text-muted-foreground transition-colors">
                    all projects
                  </p>
                </div>
                <ArrowUpRight className="w-8 h-8 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </AnimatedSection>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddMusicToVideoCaseStudy;
