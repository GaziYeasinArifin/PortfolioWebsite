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
    document.title = 'Designing One Scalable System | Gazi Arifin';
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

      {/* Hero Section */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Hero Text Content */}
          <AnimatedSection>
            <div className="max-w-4xl mb-16">
              {/* Role Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-foreground/5 rounded-full mb-8">
                <span className="text-sm font-medium text-foreground">Design System Lead</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span className="text-sm text-muted-foreground">14 Designers & Engineers</span>
              </div>
              
              {/* Headline */}
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.05] tracking-tight text-foreground mb-8">
                Designing One Scalable System Across Three Creative Apps
              </h1>
              
              {/* Sub-headline */}
              <p className="text-xl md:text-2xl text-muted-foreground font-normal leading-relaxed max-w-3xl">
                How I led a 14-person team to unify Slideshow Maker w Music and Color Pop under a single design system used by millions worldwide.
              </p>
            </div>
          </AnimatedSection>

          {/* Products */}
          <AnimatedSection delay={100}>
            <div className="flex flex-wrap items-center gap-3 mb-12">
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Products</span>
              <span className="w-8 h-px bg-border" />
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-background rounded-full text-sm font-medium text-foreground border border-border">
                  Slideshow Maker w Music
                </span>
                <span className="px-4 py-2 bg-background rounded-full text-sm font-medium text-foreground border border-border">
                  Color Pop: AI Photo Editor
                </span>
              </div>
            </div>
          </AnimatedSection>

          {/* Hero Visual */}
          <AnimatedSection delay={200}>
            <div className="relative">
              {/* Main Image Container */}
              <div 
                className="bg-muted rounded-2xl overflow-hidden relative"
                style={{ boxShadow: 'var(--image-shadow)' }}
              >
                <div className="aspect-[16/9] flex items-center justify-center bg-gradient-to-br from-muted to-muted/60">
                  <div className="text-center p-8">
                    <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-2">Hero Visual</p>
                    <p className="text-muted-foreground/70 text-xs max-w-md">
                      Side-by-side UI previews of Slideshow Maker and Color Pop showing shared components (buttons, typography, layout grid)
                    </p>
                  </div>
                </div>
                
                {/* Overlay Metrics */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex flex-wrap justify-center md:justify-start gap-3">
                    <div className="px-5 py-3 bg-foreground text-background rounded-full backdrop-blur-sm">
                      <span className="font-semibold">22M+</span>
                      <span className="text-background/70 ml-2 text-sm">Downloads</span>
                    </div>
                    <div className="px-5 py-3 bg-foreground text-background rounded-full backdrop-blur-sm">
                      <span className="font-semibold">56%</span>
                      <span className="text-background/70 ml-2 text-sm">Engagement Increase</span>
                    </div>
                    <div className="px-5 py-3 bg-foreground text-background rounded-full backdrop-blur-sm">
                      <span className="font-semibold">15%</span>
                      <span className="text-background/70 ml-2 text-sm">Dev Efficiency Gain</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
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