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

// Placeholder image component
const PlaceholderImage = ({ label, aspectRatio = '16/9' }: { label: string; aspectRatio?: string }) => (
  <div 
    className="w-full bg-secondary/30 border-2 border-dashed border-muted-foreground/30 rounded-[4px] flex items-center justify-center"
    style={{ aspectRatio }}
  >
    <p className="text-muted-foreground text-sm text-center px-6 leading-relaxed">{label}</p>
  </div>
);

// Step badge component
const StepBadge = ({ number }: { number: number }) => (
  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-foreground text-background text-sm font-medium">
    {number}
  </span>
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
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              back to work
            </Link>
          </AnimatedSection>

          {/* Hero Section */}
          <AnimatedSection delay={100}>
            <div className="text-center mb-16">
              <h1 className="font-display text-5xl md:text-6xl lg:text-[64px] font-medium leading-[1.1] tracking-tight text-foreground mb-6">
                evolving the mobile editor
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
                how we iterated from a cluttered utility to a top-charting creative tool through deep research and developer collaboration.
              </p>
              <p className="font-mono text-sm text-muted-foreground/70 tracking-wide">
                iterative cycle: 2016-2023 • role: lead ux designer
              </p>
            </div>
          </AnimatedSection>
          
          {/* Process Banner Placeholder */}
          <AnimatedSection delay={200}>
            <div className="mb-24">
              <PlaceholderImage 
                label="[INSERT: a visual flow showing sketch → wireframe → final ui evolving left to right]" 
                aspectRatio="21/9" 
              />
            </div>
          </AnimatedSection>

          {/* Context & Role Section */}
          <AnimatedSection delay={100}>
            <div className="bg-secondary/30 rounded-[4px] py-10 px-8 mb-24">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                <div className="px-4 md:px-6 py-4">
                  <p className="text-sm text-muted-foreground mb-2 tracking-wide">role</p>
                  <p className="font-medium text-foreground">Lead UX Designer</p>
                </div>
                <div className="px-4 md:px-6 py-4 border-l border-border">
                  <p className="text-sm text-muted-foreground mb-2 tracking-wide">timeline</p>
                  <p className="font-medium text-foreground">7 Years (2016-2023)</p>
                </div>
                <div className="px-4 md:px-6 py-4 md:border-l border-border">
                  <p className="text-sm text-muted-foreground mb-2 tracking-wide">team</p>
                  <p className="font-medium text-foreground">Scaled 4 → 22</p>
                </div>
                <div className="px-4 md:px-6 py-4 border-l border-border">
                  <p className="text-sm text-muted-foreground mb-2 tracking-wide">tools</p>
                  <p className="font-medium text-foreground">Sketch, AE, Figma</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Iteration 0: The Baseline */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left: Text Content */}
                <div>
                  <span className="inline-block text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">
                    the hypothesis
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">
                    iteration 0: the baseline (2016)
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    we started with a functional but rigid app. user testing revealed that while the code worked, the "feeling" was wrong. users couldn't "feel" the beat when editing.
                  </p>
                  <div className="p-6 bg-secondary/30 border-l-2 border-foreground rounded-r-[4px]">
                    <p className="text-foreground font-medium leading-relaxed">
                      hypothesis: if we visualize audio structure like a dj deck, users will edit more intuitively.
                    </p>
                  </div>
                </div>
                
                {/* Right: Placeholder */}
                <div className="flex flex-col items-center lg:items-end">
                  <div className="w-full max-w-[240px]">
                    <PlaceholderImage 
                      label="[INSERT: the original 2016 'cluttered' interface]" 
                      aspectRatio="9/16" 
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center lg:text-right mt-4 max-w-[240px]">
                    the starting point: functional but friction-heavy.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Iteration 1: The Logic Layer */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <div className="flex items-center gap-4 mb-8">
                <StepBadge number={1} />
                <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  low-fidelity iteration
                </span>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Left: Text Content */}
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">
                    iteration 1: defining the logic
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    before touching pixels, I iterated on the rules.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    I analyzed movie transitions and dj beat-matching to create a "transition grammar." I sketched these logic flows on paper to stress-test them with the cto before a single line of code was written.
                  </p>
                </div>
                
                {/* Right: Placeholder */}
                <div>
                  <PlaceholderImage 
                    label="[INSERT: scanned images of handwritten logic/paper sketches]" 
                    aspectRatio="1/1" 
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Iteration 2: The Motion Layer */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <div className="flex items-center gap-4 mb-8">
                <StepBadge number={2} />
                <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  mid-fidelity iteration
                </span>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Left: Placeholder */}
                <div className="order-2 lg:order-1">
                  <PlaceholderImage 
                    label="[INSERT: after effects timeline or gif placeholder of motion prototype]" 
                    aspectRatio="16/9" 
                  />
                </div>
                
                {/* Right: Text Content */}
                <div className="order-1 lg:order-2">
                  <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">
                    iteration 2: prototyping motion
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    static wireframes couldn't capture the timing of a video transition.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    I moved to after effects to prototype the "physics" of the app. we iterated on the speed of the "slide" and the snap of the "cut" until it felt organic. this animation became the "spec" for developers.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Iteration 3: The Refinement Loop */}
          <AnimatedSection delay={100}>
            <div className="mb-24 text-center">
              <span className="inline-block text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">
                the dev loop
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">
                iteration 3: the developer sync
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4 max-w-3xl mx-auto">
                the most critical iteration happened in code.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
                I sat with developers to review the build. we found glitches where the code didn't match the design physics. we iterated pixel-by-pixel, adjusting easing curves and touch targets until the live app matched the after effects prototype perfectly.
              </p>
              
              {/* Wide Placeholder */}
              <div className="mb-10">
                <PlaceholderImage 
                  label="[INSERT: photo of 'over-the-shoulder' collaboration with dev or redline document]" 
                  aspectRatio="21/9" 
                />
              </div>
              
              {/* Quote */}
              <p className="text-xl md:text-2xl font-display font-medium text-foreground italic">
                "the design isn't done until it feels right in code."
              </p>
            </div>
          </AnimatedSection>

          {/* The Final Polish - Dark Section */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <div className="text-center mb-12">
                <span className="inline-block text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">
                  high-fidelity
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">
                  the final state: a tactile interface
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-4 max-w-3xl mx-auto">
                  after 3 major iterative cycles, we launched the "dark mode" editor.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
                  the timeline was no longer just a bar—it was a touchable surface. the result was an experience that felt "expensive" and professional, leading to immediate chart success.
                </p>
              </div>
              
              {/* Dark Gallery */}
              <div className="bg-[hsl(220,10%,10%)] rounded-[4px] p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
                  {/* Screen 1 */}
                  <div className="w-full max-w-[180px]">
                    <div 
                      className="w-full bg-[hsl(220,10%,18%)] border-2 border-dashed border-[hsl(220,10%,28%)] rounded-[4px] flex items-center justify-center p-4"
                      style={{ aspectRatio: '9/16' }}
                    >
                      <p className="text-[hsl(220,10%,50%)] text-xs text-center leading-relaxed">
                        [INSERT: final music picker]
                      </p>
                    </div>
                  </div>
                  
                  {/* Screen 2 */}
                  <div className="w-full max-w-[180px]">
                    <div 
                      className="w-full bg-[hsl(220,10%,18%)] border-2 border-dashed border-[hsl(220,10%,28%)] rounded-[4px] flex items-center justify-center p-4"
                      style={{ aspectRatio: '9/16' }}
                    >
                      <p className="text-[hsl(220,10%,50%)] text-xs text-center leading-relaxed">
                        [INSERT: final timeline editor]
                      </p>
                    </div>
                  </div>
                  
                  {/* Screen 3 */}
                  <div className="w-full max-w-[180px]">
                    <div 
                      className="w-full bg-[hsl(220,10%,18%)] border-2 border-dashed border-[hsl(220,10%,28%)] rounded-[4px] flex items-center justify-center p-4"
                      style={{ aspectRatio: '9/16' }}
                    >
                      <p className="text-[hsl(220,10%,50%)] text-xs text-center leading-relaxed">
                        [INSERT: final export screen]
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Caption */}
                <p className="text-center text-[hsl(220,10%,50%)] text-sm mt-8 tracking-wide">
                  shipped version 2017-2023
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Results / Impact */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">
                  the impact of iteration
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                  by slowing down to iterate on logic and motion, we sped up adoption.
                </p>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-16">
                <div className="text-center p-8 bg-secondary/20 rounded-[4px]">
                  <p className="font-display font-bold text-6xl md:text-7xl lg:text-8xl mb-3">7+</p>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">years on top charts</p>
                </div>
                <div className="text-center p-8 bg-secondary/20 rounded-[4px]">
                  <p className="font-display font-bold text-6xl md:text-7xl lg:text-8xl mb-3">22</p>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">team scaled from 4</p>
                </div>
                <div className="text-center p-8 bg-secondary/20 rounded-[4px]">
                  <p className="font-display font-bold text-6xl md:text-7xl lg:text-8xl mb-3">16+</p>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">projects expanded</p>
                </div>
              </div>
              
              {/* Full-width Placeholder */}
              <PlaceholderImage 
                label="[INSERT: growth graph or app store review snippets]" 
                aspectRatio="21/9" 
              />
            </div>
          </AnimatedSection>

          {/* CTA Footer */}
          <AnimatedSection delay={100}>
            <div className="text-center py-16 border-t border-border">
              <p className="text-2xl md:text-3xl font-display font-medium mb-4">
                ready to build the next success story?
              </p>
              <p className="text-muted-foreground text-lg mb-8">
                let's create something memorable.
              </p>
              <a 
                href="mailto:arifin.yeasin@gmail.com"
                className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-medium rounded-[4px] hover:bg-foreground/90 transition-colors duration-300"
              >
                contact me
              </a>
            </div>
          </AnimatedSection>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ComingSoon;