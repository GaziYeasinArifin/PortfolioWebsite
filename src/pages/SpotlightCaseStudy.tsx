import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ArrowUpRight } from 'lucide-react';
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

// Image placeholder component with editorial styling
const ImagePlaceholder = ({ label, className = '' }: { label: string; className?: string }) => (
  <div 
    className={`bg-muted rounded-xl flex items-center justify-center relative overflow-hidden ${className}`}
    style={{ boxShadow: 'var(--image-shadow)' }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/80" />
    <span className="relative z-10 text-muted-foreground text-sm font-medium tracking-wide uppercase">
      {label}
    </span>
  </div>
);

// Stat card component
const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center md:text-left">
    <p className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-2">
      {value}
    </p>
    <p className="text-muted-foreground text-sm md:text-base font-medium">
      {label}
    </p>
  </div>
);

const SpotlightCaseStudy = () => {
  useEffect(() => {
    document.title = 'Unifying Creativity: A Scalable Design System | Gazi Arifin';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 md:pt-28">
        <Link 
          to="/#case-studies" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to projects
        </Link>
      </div>

      {/* Hero Section - Full Screen Split */}
      <section className="min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column - Text Content */}
            <AnimatedSection className="order-2 lg:order-1">
              <div className="space-y-8">
                {/* Eyebrow */}
                <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
                  Lead UX Case Study
                </p>
                
                {/* Headline */}
                <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-semibold leading-[1.1] tracking-tight text-foreground">
                  Unifying Creativity: A Scalable Design System for 22M+ Users
                </h1>
                
                {/* Sub-headline */}
                <p className="text-xl md:text-2xl text-muted-foreground font-normal leading-relaxed">
                  Slideshow Maker & Color Pop
                </p>
                
                {/* Body Text */}
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
                  From 2016 to 2023, I led UX design at Kite Games Studio, shaping three flagship apps that became household names. Through thoughtful research, innovative design, and relentless iteration, we turned ideas into tools that empowered millions of users worldwide.
                </p>
                
                {/* Stats Row */}
                <div className="pt-8 border-t border-border">
                  <div className="grid grid-cols-3 gap-6 md:gap-10">
                    <StatCard value="56%" label="Engagement Increase" />
                    <StatCard value="22M+" label="Total Downloads" />
                    <StatCard value="#1" label="Chart Rankings" />
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right Column - Hero Image */}
            <AnimatedSection delay={150} className="order-1 lg:order-2">
              <ImagePlaceholder 
                label="Hero_UI_Ecosystem" 
                className="aspect-[4/3] lg:aspect-square w-full"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <AnimatedSection delay={400} className="flex justify-center pb-16">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <span className="text-xs font-medium tracking-widest uppercase">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-border to-transparent" />
        </div>
      </AnimatedSection>

      {/* Overview Section */}
      <section className="bg-background py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Section Label */}
              <div className="lg:col-span-3">
                <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase sticky top-32">
                  Overview
                </p>
              </div>
              
              {/* Content */}
              <div className="lg:col-span-9">
                <div className="max-w-3xl">
                  <p className="text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed font-normal mb-8">
                    Three apps, over a decade of design, and millions of downloads later—what's the secret behind creating experiences that dominate the App Store charts for years?
                  </p>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    This case study shares the behind-the-scenes story of their success, from identifying user pain points to designing solutions that continue to delight millions. It's a story of how thoughtful research, innovative design, and relentless iteration turned ideas into tools that empowered users worldwide.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Role & Details Section */}
      <section className="bg-background pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Section Label */}
              <div className="lg:col-span-3">
                <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase sticky top-32">
                  Details
                </p>
              </div>
              
              {/* Content */}
              <div className="lg:col-span-9">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {/* Role */}
                  <div>
                    <h3 className="text-foreground font-semibold text-sm uppercase tracking-widest mb-4">Role</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Product Design Lead
                    </p>
                    <p className="text-muted-foreground text-sm mt-2">
                      Owned the entire design process & product strategy
                    </p>
                  </div>
                  
                  {/* Timeline */}
                  <div>
                    <h3 className="text-foreground font-semibold text-sm uppercase tracking-widest mb-4">Timeline</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      2016 – 2023
                    </p>
                    <p className="text-muted-foreground text-sm mt-2">
                      7 years of continuous iteration
                    </p>
                  </div>
                  
                  {/* Tools */}
                  <div>
                    <h3 className="text-foreground font-semibold text-sm uppercase tracking-widest mb-4">Tools</h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      Figma, FigJam, Adobe Suite
                    </p>
                    <p className="text-muted-foreground text-sm mt-2">
                      Firebase Analytics, ClickUp
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-foreground text-background py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Section Label */}
              <div className="lg:col-span-3">
                <p className="text-background/60 text-sm font-medium tracking-widest uppercase sticky top-32">
                  Impact
                </p>
              </div>
              
              {/* Content */}
              <div className="lg:col-span-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg mb-1">10M+ Downloads</p>
                        <p className="text-background/70 text-sm leading-relaxed">
                          Consistent top-chart rankings across all three apps
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg mb-1">4.7/5 Rating</p>
                        <p className="text-background/70 text-sm leading-relaxed">
                          Featured by Apple with millions of positive reviews
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg mb-1">15% Efficiency Gain</p>
                        <p className="text-background/70 text-sm leading-relaxed">
                          Design systems improved development efficiency
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg mb-1">High Retention</p>
                        <p className="text-background/70 text-sm leading-relaxed">
                          5M+ downloads with industry-leading user retention
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase mb-6">
                Full Case Study
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-8">
                Download the complete PDF for detailed insights
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="/Gazi_Arifin_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-all hover:scale-[1.02]"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
                <Link 
                  to="/#case-studies" 
                  className="inline-flex items-center gap-2 px-8 py-4 text-foreground font-medium hover:underline underline-offset-4 transition-all"
                >
                  View all projects
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SpotlightCaseStudy;