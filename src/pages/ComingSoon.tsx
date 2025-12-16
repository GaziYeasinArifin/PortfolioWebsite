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

          {/* Hero Section */}
          <AnimatedSection delay={100}>
            <div className="text-center mb-12">
              {/* Main Headline */}
              <h1 className="font-['Poppins'] text-5xl md:text-6xl lg:text-[64px] font-semibold leading-[1.1] tracking-tight text-foreground mb-6">
                iterative design process
              </h1>
              
              {/* Subheadline */}
              <p className="font-['Poppins'] text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                iterating from paper sketches to a verified ecosystem through rapid prototyping and user testing.
              </p>
              
              {/* Meta Badges */}
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

          {/* Project Overview Section */}
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
              
              {/* Role & Tools Grid */}
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

          {/* CTA Footer */}
          <AnimatedSection delay={100}>
            <div className="text-center py-16 border-t border-border">
              <p className="font-['Poppins'] text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                more sections coming soon
              </p>
              <p className="text-muted-foreground text-lg mb-8 font-['Poppins']">
                this case study is being built section by section.
              </p>
              <Link 
                to="/#case-studies"
                className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-medium rounded-[4px] hover:bg-foreground/90 transition-colors duration-300 font-['Poppins']"
              >
                view other work
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
