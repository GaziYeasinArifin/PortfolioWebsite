import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Placeholder for hero image - will be replaced
import placeholderSvg from '@/assets/placeholder-image.svg';

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

const AnalyticsDashboardCaseStudy = () => {
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
            <div className="mb-16">
              <p className="text-sm text-muted-foreground mb-4 tracking-wide">WEB DESIGN • 2023</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.05] tracking-tight mb-6">
                Analytics Dashboard
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
                Enterprise data visualization made intuitive
              </p>
            </div>
          </AnimatedSection>

          {/* Hero Image Placeholder */}
          <AnimatedSection delay={200}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] bg-secondary mb-24">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground text-lg">Hero image will be added here</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Project Overview */}
          <AnimatedSection delay={100}>
            <div className="grid md:grid-cols-2 gap-16 mb-24">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-medium mb-6">The Challenge</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Challenge description will be added here.
                </p>
              </div>
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-medium mb-6">The Solution</h2>
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
                <p className="text-sm text-muted-foreground mb-2">Role</p>
                <p className="font-medium">TBD</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Tools</p>
                <p className="font-medium">TBD</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Duration</p>
                <p className="font-medium">TBD</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Team</p>
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

export default AnalyticsDashboardCaseStudy;
