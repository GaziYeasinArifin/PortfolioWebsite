import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
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
    <p className="text-muted-foreground text-sm text-center px-4">{label}</p>
  </div>
);

const AddMusicToVideoCaseStudy = () => {
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
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
              {/* Left side - Text content */}
              <div>
                <h1 className="font-display text-5xl md:text-6xl lg:text-[64px] font-bold leading-[1.1] tracking-tight text-foreground mb-6">
                  Redefining Mobile Video Editing
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                  Leading the UX for Add Music to Video—a top-charting app developed at Kite Games Studio that scaled from a simple utility to a creative powerhouse.
                </p>
                <p className="font-mono text-sm text-muted-foreground tracking-wide">
                  2016 - 2023 • Lead UX Designer
                </p>
              </div>
              
              {/* Right side - Mobile screen placeholder */}
              <div className="flex justify-center lg:justify-end">
                <div 
                  className="w-full max-w-[280px] bg-secondary/40 border-2 border-dashed border-muted-foreground/30 rounded-[40px] flex items-center justify-center p-6"
                  style={{ aspectRatio: '9/19' }}
                >
                  <p className="text-muted-foreground text-sm text-center leading-relaxed">
                    [INSERT: High-Fidelity App Home Screen - Dark Mode]
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Context & Role Section */}
          <AnimatedSection delay={100}>
            <div className="bg-secondary/30 rounded-[4px] py-10 px-8 mb-24">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                {/* Role */}
                <div className="px-4 md:px-6 py-4">
                  <p className="text-sm text-muted-foreground mb-2 tracking-wide">role</p>
                  <p className="font-medium text-foreground">Lead UX Designer</p>
                </div>
                
                {/* Growth */}
                <div className="px-4 md:px-6 py-4 border-l border-border">
                  <p className="text-sm text-muted-foreground mb-2 tracking-wide">growth</p>
                  <p className="font-medium text-foreground">Scaled Team 4 → 22</p>
                </div>
                
                {/* Location */}
                <div className="px-4 md:px-6 py-4 md:border-l border-border">
                  <p className="text-sm text-muted-foreground mb-2 tracking-wide">location</p>
                  <p className="font-medium text-foreground">Kite Games Studio, Dhaka</p>
                </div>
                
                {/* Collaboration */}
                <div className="px-4 md:px-6 py-4 border-l border-border">
                  <p className="text-sm text-muted-foreground mb-2 tracking-wide">collaboration</p>
                  <p className="font-medium text-foreground">Dev & QA Integration</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* The Challenge Section */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <h2 className="font-display text-3xl md:text-4xl font-medium mb-4">the challenge</h2>
              <p className="text-lg text-muted-foreground mb-2">The 2016 Landscape</p>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mb-16">
                The original experience was cluttered and technically rigid. Users struggled to sync audio, and the visual output felt "cheap." I needed to dismantle the existing flow and rebuild it based on how people feel music, not just how code handles it.
              </p>
              
              {/* Comparison Layout */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
                {/* Old Interface */}
                <div className="w-full max-w-[220px]">
                  <div 
                    className="w-full bg-secondary/30 border-2 border-dashed border-muted-foreground/30 rounded-[4px] flex items-center justify-center p-4"
                    style={{ aspectRatio: '9/16' }}
                  >
                    <p className="text-muted-foreground text-xs text-center leading-relaxed">
                      [INSERT: Old 2016 Cluttered Interface]
                    </p>
                  </div>
                </div>
                
                {/* Arrow */}
                <div className="text-muted-foreground/50 rotate-90 md:rotate-0">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
                
                {/* New Interface */}
                <div className="w-full max-w-[220px]">
                  <div 
                    className="w-full bg-secondary/30 border-2 border-dashed border-muted-foreground/30 rounded-[4px] flex items-center justify-center p-4"
                    style={{ aspectRatio: '9/16' }}
                  >
                    <p className="text-muted-foreground text-xs text-center leading-relaxed">
                      [INSERT: New 2017 Clean Interface]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Research & Methodology Section */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <h2 className="font-display text-3xl md:text-4xl font-medium mb-4">research & methodology</h2>
              <p className="text-lg text-muted-foreground mb-12">Unconventional Research Methods</p>
              
              {/* Bento Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Card 1 - DJ Study */}
                <div className="bg-secondary/20 rounded-[4px] p-6">
                  <div 
                    className="w-full bg-secondary/40 border-2 border-dashed border-muted-foreground/30 rounded-[4px] flex items-center justify-center mb-6"
                    style={{ aspectRatio: '1/1' }}
                  >
                    <p className="text-muted-foreground text-xs text-center px-4">
                      [INSERT: DJ/Audio Waveform visual]
                    </p>
                  </div>
                  <h3 className="font-display text-xl font-medium mb-3">The DJ Study</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    I analyzed DJ beat-matching to understand how non-musicians perceive audio structure.
                  </p>
                </div>
                
                {/* Card 2 - Cinematic Grammar */}
                <div className="bg-secondary/20 rounded-[4px] p-6">
                  <div 
                    className="w-full bg-secondary/40 border-2 border-dashed border-muted-foreground/30 rounded-[4px] flex items-center justify-center mb-6"
                    style={{ aspectRatio: '1/1' }}
                  >
                    <p className="text-muted-foreground text-xs text-center px-4">
                      [INSERT: Movie Scene Breakdown]
                    </p>
                  </div>
                  <h3 className="font-display text-xl font-medium mb-3">Cinematic Grammar</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    I studied movie transitions to create a "logic grammar" for video themes.
                  </p>
                </div>
                
                {/* Card 3 - Psychology */}
                <div className="bg-secondary/20 rounded-[4px] p-6">
                  <div 
                    className="w-full bg-secondary/40 border-2 border-dashed border-muted-foreground/30 rounded-[4px] flex items-center justify-center mb-6"
                    style={{ aspectRatio: '1/1' }}
                  >
                    <p className="text-muted-foreground text-xs text-center px-4">
                      [INSERT: Abstract Psychology/Persona Image]
                    </p>
                  </div>
                  <h3 className="font-display text-xl font-medium mb-3">Psychology</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Analyzed psychology to understand how users (specifically female demographics) view self-image in editing.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* The Bridge Section */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left side - Text content */}
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-medium mb-4">the "bridge"</h2>
                  <p className="text-lg text-muted-foreground mb-6">Bridging Design & Code</p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    In 2016, tools like Figma weren't advanced enough for my vision. I used After Effects to demonstrate complex animations and wrote "Transition Grammar" on paper to explain the logic to developers.
                  </p>
                  <p className="text-lg md:text-xl italic text-foreground/80 leading-relaxed">
                    "I didn't just hand off pixels; I defined the physics of the app."
                  </p>
                </div>
                
                {/* Right side - Placeholder */}
                <div>
                  <div 
                    className="w-full bg-secondary/30 border-2 border-dashed border-muted-foreground/30 rounded-[4px] flex items-center justify-center p-6"
                    style={{ aspectRatio: '16/9' }}
                  >
                    <p className="text-muted-foreground text-sm text-center leading-relaxed">
                      [INSERT: Photo of Handwritten Logic Paper or After Effects Timeline]
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Navigation to other projects */}
          <AnimatedSection delay={100}>
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
