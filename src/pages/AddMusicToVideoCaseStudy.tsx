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

          {/* Project Overview */}
          <AnimatedSection delay={100}>
            <div className="grid md:grid-cols-2 gap-16 mb-24">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-medium mb-6">the challenge</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Challenge description will be added here.
                </p>
              </div>
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-medium mb-6">the solution</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Solution description will be added here.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Project Details */}
          <AnimatedSection delay={100}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 py-8 border-y border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-2">role</p>
                <p className="font-medium">TBD</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">tools</p>
                <p className="font-medium">TBD</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">duration</p>
                <p className="font-medium">TBD</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">team</p>
                <p className="font-medium">TBD</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Content sections will be added here */}
          <AnimatedSection delay={100}>
            <div className="py-24 text-center">
              <p className="text-muted-foreground text-lg">
                Case study content coming soon...
              </p>
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
