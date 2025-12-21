import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ArrowUpRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import spotlightHeroPhones from '@/assets/spotlight-hero-phones.png';
import spotlightContextDiagram from '@/assets/spotlight-context-diagram.png';
import spotlightBeforeSnapshot from '@/assets/spotlight-before-snapshot.png';
import spotlightAuditBoard from '@/assets/spotlight-audit-board.png';
import spotlightThumbnail from '@/assets/spotlight-thumbnail.png';

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
                className="rounded-2xl overflow-hidden relative"
                style={{ boxShadow: 'var(--image-shadow)' }}
              >
                <img 
                  src={spotlightHeroPhones} 
                  alt="Slideshow Maker and Color Pop apps showing unified design system with shared components"
                  className="w-full h-auto"
                />
                
                {/* Top Right Badges - Vertical Flow */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6 flex flex-col gap-2">
                  <div className="px-4 py-2 bg-foreground backdrop-blur-sm rounded-full shadow-lg flex items-baseline gap-1.5">
                    <span className="text-base md:text-lg font-bold text-background">22M+</span>
                    <span className="text-xs font-light text-background/80">Downloads</span>
                  </div>
                  <div className="px-4 py-2 bg-foreground backdrop-blur-sm rounded-full shadow-lg flex items-baseline gap-1.5">
                    <span className="text-base md:text-lg font-bold text-background">56%</span>
                    <span className="text-xs font-light text-background/80">Engagement ↑</span>
                  </div>
                  <div className="px-4 py-2 bg-foreground backdrop-blur-sm rounded-full shadow-lg flex items-baseline gap-1.5">
                    <span className="text-base md:text-lg font-bold text-background">15%</span>
                    <span className="text-xs font-light text-background/80">Dev Efficiency ↑</span>
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
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: 'var(--image-shadow)' }}
              >
                <img 
                  src={spotlightContextDiagram} 
                  alt="Design system connecting Slideshow Maker and Color Pop with shared tokens, components, and patterns"
                  className="w-full h-auto"
                />
              </div>
              
              {/* Before Snapshot */}
              <div 
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: 'var(--image-shadow)' }}
              >
                <img 
                  src={spotlightBeforeSnapshot} 
                  alt="Before: Fragmented UI styles across apps showing button mismatches, broken type ramps, and inconsistent padding"
                  className="w-full h-auto"
                />
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
                className="rounded-2xl overflow-hidden relative"
                style={{ boxShadow: 'var(--image-shadow)' }}
              >
                <img 
                  src={spotlightAuditBoard} 
                  alt="UI Audit board showing fragmented styles with button mismatches, duplicated search bars, and inconsistent icon weights"
                  className="w-full h-auto"
                />
                
                {/* Pain Point Labels */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-destructive/10 text-destructive rounded-full text-sm font-medium border border-destructive/20 backdrop-blur-sm">
                    Duplication
                  </span>
                  <span className="px-4 py-2 bg-destructive/10 text-destructive rounded-full text-sm font-medium border border-destructive/20 backdrop-blur-sm">
                    Inconsistency
                  </span>
                  <span className="px-4 py-2 bg-destructive/10 text-destructive rounded-full text-sm font-medium border border-destructive/20 backdrop-blur-sm">
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

      {/* Design System Components Section */}
      <section className="bg-background py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Section Label */}
              <div className="lg:col-span-3">
                <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase sticky top-32">
                  The System
                </p>
              </div>
              
              {/* Content */}
              <div className="lg:col-span-9">
                <div className="max-w-3xl space-y-10">
                  {/* Lead statement */}
                  <p className="text-2xl md:text-3xl lg:text-4xl text-foreground leading-[1.3] font-normal">
                    We built a comprehensive design system in <span className="font-semibold">Figma</span>, supported by Illustrator and After Effects for visual and motion consistency.
                  </p>
                  
                  {/* Two columns: Elements + Support */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
                    {/* System Elements */}
                    <div>
                      <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest mb-6">System Elements</p>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-md bg-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-foreground" />
                          </span>
                          <span className="text-foreground">Design tokens (color, typography, spacing)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-md bg-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-foreground" />
                          </span>
                          <span className="text-foreground">Reusable components with variants</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-md bg-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-foreground" />
                          </span>
                          <span className="text-foreground">Motion and interaction guidelines</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-md bg-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-foreground" />
                          </span>
                          <span className="text-foreground">Cross-app iconography</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-md bg-foreground/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-foreground" />
                          </span>
                          <span className="text-foreground">Responsive layout rules</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* System Support */}
                    <div>
                      <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest mb-6">System Support</p>
                      <div className="space-y-6">
                        <div className="p-5 bg-secondary rounded-xl">
                          <p className="font-medium text-foreground mb-1">Slideshow Maker</p>
                          <p className="text-muted-foreground text-sm">Feature-rich flows with deep customization</p>
                        </div>
                        <div className="p-5 bg-secondary rounded-xl">
                          <p className="font-medium text-foreground mb-1">Color Pop</p>
                          <p className="text-muted-foreground text-sm">One-tap AI interactions for instant results</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Visual Assets Grid */}
          <AnimatedSection delay={150}>
            <div className="mt-20 space-y-8">
              {/* Main Component Library */}
              <div 
                className="bg-muted rounded-2xl overflow-hidden"
                style={{ boxShadow: 'var(--image-shadow)' }}
              >
                <div className="aspect-[21/9] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-muted to-muted/60">
                  <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-2">Figma Component Library</p>
                  <p className="text-muted-foreground/70 text-xs text-center max-w-md">
                    Buttons, sliders, cards, navigation — all with multiple variants and states
                  </p>
                </div>
              </div>
              
              {/* Two column: Tokens + Motion */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Design Tokens */}
                <div 
                  className="bg-muted rounded-2xl overflow-hidden"
                  style={{ boxShadow: 'var(--image-shadow)' }}
                >
                  <div className="aspect-square flex flex-col items-center justify-center p-8 bg-gradient-to-br from-muted to-muted/60">
                    <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-4">Design Tokens</p>
                    {/* Token preview mockup */}
                    <div className="space-y-3 w-full max-w-[200px]">
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-lg bg-foreground" />
                        <div className="w-8 h-8 rounded-lg bg-foreground/80" />
                        <div className="w-8 h-8 rounded-lg bg-foreground/60" />
                        <div className="w-8 h-8 rounded-lg bg-foreground/40" />
                        <div className="w-8 h-8 rounded-lg bg-foreground/20" />
                      </div>
                      <div className="space-y-1">
                        <div className="h-3 bg-foreground/20 rounded w-full" />
                        <div className="h-2 bg-foreground/10 rounded w-3/4" />
                        <div className="h-2 bg-foreground/10 rounded w-1/2" />
                      </div>
                    </div>
                    <p className="text-muted-foreground/70 text-xs text-center mt-4">
                      Color & typography scales
                    </p>
                  </div>
                </div>
                
                {/* Motion Demo */}
                <div 
                  className="bg-foreground text-background rounded-2xl overflow-hidden"
                  style={{ boxShadow: 'var(--image-shadow)' }}
                >
                  <div className="aspect-square flex flex-col items-center justify-center p-8">
                    <p className="text-background/60 text-sm font-medium tracking-wide uppercase mb-4">Motion Guidelines</p>
                    {/* Motion preview mockup */}
                    <div className="relative w-24 h-24 mb-4">
                      <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-background/30" />
                      <div className="absolute inset-2 rounded-xl bg-background/20 animate-pulse" />
                    </div>
                    <p className="text-background/70 text-xs text-center">
                      Subtle transitions and feedback animations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Product Comparison Section */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Section Label */}
              <div className="lg:col-span-3">
                <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase sticky top-32">
                  Adaptation
                </p>
              </div>
              
              {/* Product Cards */}
              <div className="lg:col-span-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Slideshow Maker */}
                  <div 
                    className="bg-background rounded-2xl p-8 relative"
                    style={{ boxShadow: 'var(--card-shadow)' }}
                  >
                    <div className="absolute top-8 right-8">
                      <span className="text-4xl">🎬</span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-6 pr-16">
                      Slideshow Maker w Music
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2.5 flex-shrink-0" />
                        <span className="text-foreground">Modular timeline editor</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2.5 flex-shrink-0" />
                        <span className="text-foreground">Theme-based customization</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2.5 flex-shrink-0" />
                        <span className="text-foreground">Advanced controls surfaced progressively</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Color Pop */}
                  <div 
                    className="bg-background rounded-2xl p-8 relative"
                    style={{ boxShadow: 'var(--card-shadow)' }}
                  >
                    <div className="absolute top-8 right-8">
                      <span className="text-4xl">✨</span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-6 pr-16">
                      Color Pop: AI Photo Editor
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2.5 flex-shrink-0" />
                        <span className="text-foreground">One-tap AI effects</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2.5 flex-shrink-0" />
                        <span className="text-foreground">Minimal UI with familiar components</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2.5 flex-shrink-0" />
                        <span className="text-foreground">Refinement controls using shared patterns</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Tagline */}
                <div className="mt-16 text-center">
                  <p className="font-display text-xl md:text-2xl lg:text-3xl font-semibold leading-tight">
                    <span className="text-foreground">Different products.</span>
                    <span className="mx-3 text-muted-foreground/30">·</span>
                    <span className="text-muted-foreground">Same system.</span>
                    <span className="mx-3 text-muted-foreground/30">·</span>
                    <span className="text-foreground">Zero relearning.</span>
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Visual Assets */}
          <AnimatedSection delay={150}>
            <div className="mt-20">
              {/* Side-by-Side Comparison */}
              <div 
                className="bg-muted rounded-2xl overflow-hidden relative"
                style={{ boxShadow: 'var(--image-shadow)' }}
              >
                <div className="aspect-[16/9] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-muted to-muted/60">
                  <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-2">Side-by-Side Screens</p>
                  <p className="text-muted-foreground/70 text-xs text-center max-w-md mb-8">
                    Slideshow Maker vs Color Pop showing shared UI patterns
                  </p>
                  
                  {/* Mockup preview */}
                  <div className="flex items-center gap-8">
                    <div className="w-28 md:w-40 aspect-[9/19] bg-background rounded-2xl border border-border/50 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Slideshow</span>
                    </div>
                    <div className="w-28 md:w-40 aspect-[9/19] bg-background rounded-2xl border border-border/50 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Color Pop</span>
                    </div>
                  </div>
                </div>
                
                {/* Shared Component Callouts */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-center gap-3">
                  <span className="px-4 py-2 bg-background text-foreground rounded-full text-sm font-medium border border-border shadow-sm">
                    Shared Buttons
                  </span>
                  <span className="px-4 py-2 bg-background text-foreground rounded-full text-sm font-medium border border-border shadow-sm">
                    Unified Typography
                  </span>
                  <span className="px-4 py-2 bg-background text-foreground rounded-full text-sm font-medium border border-border shadow-sm">
                    Common Icons
                  </span>
                  <span className="px-4 py-2 bg-background text-foreground rounded-full text-sm font-medium border border-border shadow-sm">
                    Consistent Spacing
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="bg-background py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Section Label */}
              <div className="lg:col-span-3">
                <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase sticky top-32">
                  Collaboration
                </p>
              </div>
              
              {/* Content */}
              <div className="lg:col-span-9">
                <div className="max-w-3xl space-y-12">
                  {/* Lead statement */}
                  <p className="text-2xl md:text-3xl lg:text-4xl text-foreground leading-[1.3] font-normal">
                    The system only worked because it was <span className="font-semibold">shared.</span>
                  </p>
                  
                  {/* Two columns: Led + Result */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* I Led */}
                    <div>
                      <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest mb-6">I Led</p>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0 text-xs font-semibold">1</span>
                          <span className="text-foreground pt-0.5">Cross-functional design–engineering reviews</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0 text-xs font-semibold">2</span>
                          <span className="text-foreground pt-0.5">Component alignment sessions</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0 text-xs font-semibold">3</span>
                          <span className="text-foreground pt-0.5">Clear contribution and update workflows</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0 text-xs font-semibold">4</span>
                          <span className="text-foreground pt-0.5">Documentation for designers and developers</span>
                        </li>
                      </ul>
                    </div>
                    
                    {/* The Result */}
                    <div>
                      <p className="text-muted-foreground text-sm font-medium uppercase tracking-widest mb-6">The Result</p>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-secondary rounded-xl">
                          <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-foreground" />
                          </div>
                          <span className="text-foreground font-medium">Faster onboarding</span>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-secondary rounded-xl">
                          <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-foreground" />
                          </div>
                          <span className="text-foreground font-medium">Fewer inconsistencies</span>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-secondary rounded-xl">
                          <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-foreground" />
                          </div>
                          <span className="text-foreground font-medium">Less rework</span>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-secondary rounded-xl">
                          <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-foreground" />
                          </div>
                          <span className="text-foreground font-medium">Higher trust between teams</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Visual Assets */}
          <AnimatedSection delay={150}>
            <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Team Workshop Photo */}
              <div 
                className="bg-muted rounded-2xl overflow-hidden"
                style={{ boxShadow: 'var(--image-shadow)' }}
              >
                <div className="aspect-[4/3] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-muted to-muted/60">
                  <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-2">Team Workshop</p>
                  <p className="text-muted-foreground/70 text-xs text-center max-w-xs">
                    Designers & engineers collaborating on component reviews
                  </p>
                </div>
              </div>
              
              {/* Handoff Flow Diagram */}
              <div 
                className="bg-foreground text-background rounded-2xl overflow-hidden"
                style={{ boxShadow: 'var(--image-shadow)' }}
              >
                <div className="aspect-[4/3] flex flex-col items-center justify-center p-8">
                  <p className="text-background/60 text-sm font-medium tracking-wide uppercase mb-6">Handoff Flow</p>
                  {/* Flow diagram */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="px-5 py-3 bg-background/20 rounded-xl font-medium">Figma</div>
                    <span className="text-background/50">→</span>
                    <div className="px-5 py-3 bg-background/20 rounded-xl font-medium">Dev</div>
                    <span className="text-background/50">→</span>
                    <div className="px-5 py-3 bg-background/20 rounded-xl font-medium">Product</div>
                  </div>
                  <p className="text-background/50 text-xs mt-6">Clear ownership at every stage</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Impact Metrics Section */}
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
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {/* 22M+ Downloads */}
                  <div className="p-8 bg-background/5 rounded-2xl border border-background/10">
                    <p className="font-display text-5xl md:text-6xl font-semibold mb-3">22M+</p>
                    <p className="text-background/70">total downloads across the product suite</p>
                  </div>
                  
                  {/* 56% Engagement */}
                  <div className="p-8 bg-background/5 rounded-2xl border border-background/10">
                    <p className="font-display text-5xl md:text-6xl font-semibold mb-3">56%</p>
                    <p className="text-background/70">increase in user engagement</p>
                  </div>
                  
                  {/* 15% Efficiency */}
                  <div className="p-8 bg-background/5 rounded-2xl border border-background/10">
                    <p className="font-display text-5xl md:text-6xl font-semibold mb-3">15%</p>
                    <p className="text-background/70">improvement in development efficiency</p>
                  </div>
                  
                  {/* 4.7 Rating */}
                  <div className="p-8 bg-background/5 rounded-2xl border border-background/10">
                    <p className="font-display text-5xl md:text-6xl font-semibold mb-3">4.7★</p>
                    <p className="text-background/70">average rating, featured by Apple</p>
                  </div>
                  
                  {/* Top Rankings */}
                  <div className="p-8 bg-background/5 rounded-2xl border border-background/10 sm:col-span-2">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-background/10 flex items-center justify-center flex-shrink-0">
                        <svg viewBox="0 0 24 24" className="w-7 h-7">
                          <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-display text-2xl md:text-3xl font-semibold">Top App Store Rankings</p>
                        <p className="text-background/70 mt-1">Sustained chart performance for years</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Closing statement */}
                <div className="pt-8 border-t border-background/20">
                  <p className="text-2xl md:text-3xl font-normal leading-relaxed">
                    The design system scaled with the product — <span className="text-background/60">and paid for itself.</span>
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          {/* App Store Proof */}
          <AnimatedSection delay={150}>
            <div className="mt-20">
              <div 
                className="bg-background/10 rounded-2xl overflow-hidden border border-background/10"
              >
                <div className="aspect-[21/9] flex flex-col items-center justify-center p-8">
                  <p className="text-background/60 text-sm font-medium tracking-wide uppercase mb-2">App Store Proof</p>
                  <p className="text-background/50 text-xs text-center max-w-md">
                    Rankings and ratings screenshots demonstrating sustained performance
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Reflection Section */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Section Label */}
              <div className="lg:col-span-3">
                <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase sticky top-32">
                  Reflection
                </p>
              </div>
              
              {/* Content */}
              <div className="lg:col-span-9">
                <div className="max-w-3xl space-y-12">
                  {/* Lead statement */}
                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                    This project reinforced that:
                  </p>
                  
                  {/* Key learnings */}
                  <div className="space-y-6">
                    <div className="p-6 bg-background rounded-2xl border-l-4 border-foreground" style={{ boxShadow: 'var(--card-shadow)' }}>
                      <p className="text-lg md:text-xl text-foreground font-medium">
                        Design systems are <span className="font-semibold">products</span>, not assets
                      </p>
                    </div>
                    <div className="p-6 bg-background rounded-2xl border-l-4 border-foreground" style={{ boxShadow: 'var(--card-shadow)' }}>
                      <p className="text-lg md:text-xl text-foreground font-medium">
                        Consistency is earned through <span className="font-semibold">governance</span>
                      </p>
                    </div>
                    <div className="p-6 bg-background rounded-2xl border-l-4 border-foreground" style={{ boxShadow: 'var(--card-shadow)' }}>
                      <p className="text-lg md:text-xl text-foreground font-medium">
                        Simplicity requires <span className="font-semibold">deep system thinking</span>
                      </p>
                    </div>
                    <div className="p-6 bg-background rounded-2xl border-l-4 border-foreground" style={{ boxShadow: 'var(--card-shadow)' }}>
                      <p className="text-lg md:text-xl text-foreground font-medium">
                        Leadership is about <span className="font-semibold">alignment</span>, not control
                      </p>
                    </div>
                  </div>
                  
                  {/* Closing statement */}
                  <div className="pt-8">
                    <p className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
                      It changed how I design — <span className="text-muted-foreground">permanently.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Visual Asset */}
          <AnimatedSection delay={150}>
            <div className="mt-20">
              <div 
                className="bg-foreground text-background rounded-2xl overflow-hidden"
                style={{ boxShadow: 'var(--image-shadow)' }}
              >
                <div className="aspect-[21/9] flex flex-col items-center justify-center p-8 relative">
                  <p className="text-background/60 text-sm font-medium tracking-wide uppercase mb-4">Reflection Visual</p>
                  
                  {/* Abstract system metaphor */}
                  <div className="relative w-full max-w-md h-32 flex items-center justify-center">
                    {/* Nodes */}
                    <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background/30" />
                    <div className="absolute left-1/2 top-1/4 -translate-x-1/2 w-6 h-6 rounded-full bg-background/50" />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80" />
                    <div className="absolute left-1/2 bottom-1/4 -translate-x-1/2 w-5 h-5 rounded-full bg-background/40" />
                    <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-background/30" />
                    
                    {/* Connection lines */}
                    <div className="absolute left-1/4 top-1/2 w-1/4 h-px bg-gradient-to-r from-background/30 to-background/60" />
                    <div className="absolute right-1/4 top-1/2 w-1/4 h-px bg-gradient-to-l from-background/30 to-background/60" />
                    <div className="absolute left-1/2 top-1/4 -translate-x-1/2 w-px h-1/4 bg-gradient-to-b from-background/40 to-background/70" />
                    <div className="absolute left-1/2 bottom-1/4 -translate-x-1/2 w-px h-1/4 bg-gradient-to-t from-background/40 to-background/70" />
                  </div>
                  
                  <p className="text-background/50 text-xs text-center mt-4">
                    Systems thinking: nodes, connections, and emergent design
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Closing Section */}
      <section className="bg-background py-32 md:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              {/* Statement */}
              <p className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-foreground leading-[1.15] tracking-tight mb-8">
                This case study isn't about apps.
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed mb-16">
                It's about scaling design quality across products, teams, and millions of users.
              </p>
              
              {/* Forward-looking statement */}
              <div className="inline-block p-8 md:p-12 bg-foreground text-background rounded-3xl" style={{ boxShadow: 'var(--image-shadow)' }}>
                <p className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
                  That's the kind of challenge<br />I'm excited to solve next.
                </p>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Closing Visual */}
          <AnimatedSection delay={150}>
            <div className="mt-24 flex justify-center">
              <div className="relative">
                {/* System motif - minimal nodes */}
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-foreground/20" />
                  <div className="w-8 h-px bg-foreground/20" />
                  <div className="w-4 h-4 rounded-full bg-foreground/40" />
                  <div className="w-12 h-px bg-foreground/30" />
                  <div className="w-6 h-6 rounded-full bg-foreground" />
                  <div className="w-12 h-px bg-foreground/30" />
                  <div className="w-4 h-4 rounded-full bg-foreground/40" />
                  <div className="w-8 h-px bg-foreground/20" />
                  <div className="w-3 h-3 rounded-full bg-foreground/20" />
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