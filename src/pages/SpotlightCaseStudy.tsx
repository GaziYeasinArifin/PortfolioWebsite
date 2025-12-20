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

      {/* Context & Scope Section */}
      <section className="bg-background py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Section Label */}
              <div className="lg:col-span-3">
                <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase sticky top-32">
                  Context & Scope
                </p>
              </div>
              
              {/* Content */}
              <div className="lg:col-span-9">
                <div className="max-w-3xl space-y-8">
                  {/* Lead paragraph */}
                  <p className="text-2xl md:text-3xl lg:text-4xl text-foreground leading-[1.3] font-normal">
                    This case study represents <span className="font-semibold">one design systems initiative</span> spanning three separate apps, each with different audiences, feature depth, and creative workflows.
                  </p>
                  
                  {/* Challenge intro */}
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    While these products served different use cases — slideshows, photo editing, and video creation — they shared a growing challenge:
                  </p>
                  
                  {/* Key problems - emphasized */}
                  <div className="py-6 border-l-2 border-foreground pl-6">
                    <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed">
                      Inconsistent UI, duplicated effort, and poor scalability across teams.
                    </p>
                  </div>
                  
                  {/* Scale context */}
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    As usage grew into the <span className="text-foreground font-medium">tens of millions</span>, design decisions made in isolation began to slow development, confuse users, and dilute brand trust.
                  </p>
                  
                  {/* Transformation statement */}
                  <div className="pt-4">
                    <p className="text-lg md:text-xl text-foreground leading-relaxed">
                      This project became less about individual features — and more about <span className="font-semibold">building a system that could scale across products, teams, and time.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Visual Assets */}
          <AnimatedSection delay={150}>
            <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Context Diagram */}
              <div 
                className="bg-muted rounded-2xl overflow-hidden"
                style={{ boxShadow: 'var(--image-shadow)' }}
              >
                <div className="aspect-[4/3] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-muted to-muted/60">
                  <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-2">Context Diagram</p>
                  <p className="text-muted-foreground/70 text-xs text-center max-w-xs">
                    Visual showing three apps branching from one shared design system foundation
                  </p>
                </div>
              </div>
              
              {/* Before Snapshot */}
              <div 
                className="bg-muted rounded-2xl overflow-hidden"
                style={{ boxShadow: 'var(--image-shadow)' }}
              >
                <div className="aspect-[4/3] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-muted to-muted/60">
                  <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-2">Before Snapshot</p>
                  <p className="text-muted-foreground/70 text-xs text-center max-w-xs">
                    Mixed UI styles from different apps pre-system
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Problem Definition Section */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Section Label */}
              <div className="lg:col-span-3">
                <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase sticky top-32">
                  The Problem
                </p>
              </div>
              
              {/* Content */}
              <div className="lg:col-span-9">
                <div className="max-w-3xl space-y-10">
                  {/* Lead statement */}
                  <p className="text-2xl md:text-3xl lg:text-4xl text-foreground leading-[1.3] font-normal">
                    Before the design system, each app evolved <span className="font-semibold">independently.</span>
                  </p>
                  
                  {/* Problem list */}
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-base md:text-lg mb-6">That resulted in:</p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4">
                        <span className="w-2 h-2 rounded-full bg-foreground mt-2.5 flex-shrink-0" />
                        <span className="text-foreground text-lg md:text-xl">Multiple button styles solving the same problem</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="w-2 h-2 rounded-full bg-foreground mt-2.5 flex-shrink-0" />
                        <span className="text-foreground text-lg md:text-xl">Inconsistent navigation and iconography across apps</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="w-2 h-2 rounded-full bg-foreground mt-2.5 flex-shrink-0" />
                        <span className="text-foreground text-lg md:text-xl">Designers recreating components instead of improving experiences</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="w-2 h-2 rounded-full bg-foreground mt-2.5 flex-shrink-0" />
                        <span className="text-foreground text-lg md:text-xl">Developers rebuilding UI logic repeatedly</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="w-2 h-2 rounded-full bg-foreground mt-2.5 flex-shrink-0" />
                        <span className="text-foreground text-lg md:text-xl">Slow onboarding for new team members</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Impact statements */}
                  <div className="pt-8 border-t border-border space-y-2">
                    <p className="text-xl md:text-2xl text-foreground font-medium">
                      Users noticed the inconsistency.
                    </p>
                    <p className="text-xl md:text-2xl text-foreground font-medium">
                      Teams felt the inefficiency.
                    </p>
                  </div>
                  
                  {/* Solution direction */}
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    We needed a <span className="text-foreground font-medium">single source of truth</span> — one that balanced flexibility for different products with consistency across the ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Visual Assets */}
          <AnimatedSection delay={150}>
            <div className="mt-20">
              {/* UI Audit Board */}
              <div 
                className="bg-muted rounded-2xl overflow-hidden relative"
                style={{ boxShadow: 'var(--image-shadow)' }}
              >
                <div className="aspect-[16/9] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-muted to-muted/60">
                  <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-2">UI Audit Board</p>
                  <p className="text-muted-foreground/70 text-xs text-center max-w-md">
                    Screenshot or mock of UI audit with repeated components highlighted
                  </p>
                </div>
                
                {/* Pain Point Labels */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-destructive/10 text-destructive rounded-full text-sm font-medium border border-destructive/20">
                    Duplication
                  </span>
                  <span className="px-4 py-2 bg-destructive/10 text-destructive rounded-full text-sm font-medium border border-destructive/20">
                    Inconsistency
                  </span>
                  <span className="px-4 py-2 bg-destructive/10 text-destructive rounded-full text-sm font-medium border border-destructive/20">
                    Slow Iteration
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Personas Section */}
      <section className="bg-background py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Section Label */}
              <div className="lg:col-span-3">
                <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase sticky top-32">
                  User Personas
                </p>
              </div>
              
              {/* Content */}
              <div className="lg:col-span-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Persona 1: The Passionate Editor */}
                  <div 
                    className="bg-secondary rounded-2xl p-8 relative overflow-hidden"
                    style={{ boxShadow: 'var(--card-shadow)' }}
                  >
                    {/* Avatar placeholder */}
                    <div className="w-16 h-16 rounded-full bg-muted mb-6 flex items-center justify-center">
                      <span className="text-2xl">🎬</span>
                    </div>
                    
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2">
                      The Passionate Editor
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Advanced creator using Slideshow Maker for professional or semi-professional content.
                    </p>
                    
                    {/* Needs */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                        <span className="text-foreground text-sm">Needs deep customization</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                        <span className="text-foreground text-sm">Uses editing tools frequently</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                        <span className="text-foreground text-sm">Values efficiency and precision</span>
                      </div>
                    </div>
                    
                    {/* Frustration */}
                    <div className="mt-6 pt-6 border-t border-border">
                      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Frustration</p>
                      <p className="text-foreground text-sm italic">"Frustrated by shallow or rigid tools"</p>
                    </div>
                  </div>
                  
                  {/* Persona 2: The Casual Creator */}
                  <div 
                    className="bg-secondary rounded-2xl p-8 relative overflow-hidden"
                    style={{ boxShadow: 'var(--card-shadow)' }}
                  >
                    {/* Avatar placeholder */}
                    <div className="w-16 h-16 rounded-full bg-muted mb-6 flex items-center justify-center">
                      <span className="text-2xl">✨</span>
                    </div>
                    
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2">
                      The Casual Creator
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Social-first user using Color Pop for quick, shareable results.
                    </p>
                    
                    {/* Behaviors */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                        <span className="text-foreground text-sm">Wants instant results</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                        <span className="text-foreground text-sm">Avoids complex interfaces</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground" />
                        <span className="text-foreground text-sm">Learns by doing, not reading</span>
                      </div>
                    </div>
                    
                    {/* Behavior note */}
                    <div className="mt-6 pt-6 border-t border-border">
                      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Behavior</p>
                      <p className="text-foreground text-sm italic">"Leaves quickly if confused"</p>
                    </div>
                  </div>
                </div>
                
                {/* Design System Implication */}
                <div className="mt-12 p-8 bg-foreground text-background rounded-2xl">
                  <p className="text-xs uppercase tracking-widest opacity-60 mb-3">Design System Implication</p>
                  <p className="text-xl md:text-2xl font-medium leading-relaxed">
                    We designed components that scale in complexity — <span className="opacity-70">simple by default, powerful when expanded.</span>
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Strategy Section */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Section Label */}
              <div className="lg:col-span-3">
                <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase sticky top-32">
                  Strategy
                </p>
              </div>
              
              {/* Content */}
              <div className="lg:col-span-9">
                <div className="max-w-3xl space-y-10">
                  {/* Lead statement */}
                  <p className="text-2xl md:text-3xl lg:text-4xl text-foreground leading-[1.3] font-normal">
                    Instead of redesigning apps independently, I led the team to <span className="font-semibold">pause feature work</span> and invest in a shared design foundation.
                  </p>
                  
                  {/* Strategy steps */}
                  <div className="space-y-1">
                    <p className="text-muted-foreground text-base md:text-lg mb-8">The strategy:</p>
                    <div className="space-y-0">
                      {[
                        'Audit all existing UI patterns across apps',
                        'Identify shared behaviors and components',
                        'Define system principles (clarity, flexibility, speed)',
                        'Build a modular, reusable component library',
                        'Establish governance and contribution rules'
                      ].map((step, index) => (
                        <div key={index} className="flex items-start gap-6 py-4 border-b border-border last:border-0">
                          <span className="font-display text-3xl md:text-4xl font-semibold text-muted-foreground/30 w-12 flex-shrink-0">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="text-foreground text-lg md:text-xl pt-1">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Outcome statement */}
                  <div className="pt-8">
                    <p className="text-lg md:text-xl text-foreground leading-relaxed">
                      This approach ensured every future feature <span className="font-semibold">improved the system</span> — not fragmented it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Visual Assets */}
          <AnimatedSection delay={150}>
            <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* System Architecture Diagram */}
              <div 
                className="bg-background rounded-2xl overflow-hidden"
                style={{ boxShadow: 'var(--image-shadow)' }}
              >
                <div className="aspect-[4/3] flex flex-col items-center justify-center p-8">
                  <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-4">System Architecture</p>
                  {/* Architecture flow */}
                  <div className="flex items-center gap-3 text-sm">
                    <span className="px-4 py-2 bg-foreground text-background rounded-lg font-medium">Tokens</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="px-4 py-2 bg-foreground text-background rounded-lg font-medium">Components</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="px-4 py-2 bg-foreground text-background rounded-lg font-medium">Patterns</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="px-4 py-2 bg-foreground text-background rounded-lg font-medium">Products</span>
                  </div>
                </div>
              </div>
              
              {/* Principles Board */}
              <div 
                className="bg-foreground text-background rounded-2xl overflow-hidden"
                style={{ boxShadow: 'var(--image-shadow)' }}
              >
                <div className="aspect-[4/3] flex flex-col items-center justify-center p-8">
                  <p className="text-background/60 text-sm font-medium tracking-wide uppercase mb-6">Design Principles</p>
                  <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                    <div className="text-center p-4 rounded-xl bg-background/10">
                      <p className="font-display text-lg font-semibold">Clarity</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-background/10">
                      <p className="font-display text-lg font-semibold">Flexibility</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-background/10">
                      <p className="font-display text-lg font-semibold">Consistency</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-background/10">
                      <p className="font-display text-lg font-semibold">Speed</p>
                    </div>
                  </div>
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