import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import spotlightHero from '@/assets/spotlight-hero.png';
import spotlightReflection from '@/assets/spotlight-reflection.png';
import spotlightContextDiagram from '@/assets/spotlight-context-diagram.png';
import spotlightBeforeSnapshot from '@/assets/spotlight-before-snapshot.png';
import spotlightAuditBoard from '@/assets/spotlight-audit-board.png';
import spotlightThumbnail from '@/assets/spotlight-thumbnail.png';
import spotlightColorpop1 from '@/assets/spotlight-colorpop-1.png';
import spotlightColorpop2 from '@/assets/spotlight-colorpop-2.png';
import spotlightColorpop3 from '@/assets/spotlight-colorpop-3.png';
import spotlightColorpop4 from '@/assets/spotlight-colorpop-4.png';
import spotlightColorpop5 from '@/assets/spotlight-colorpop-5.png';
import spotlightSlideshow1 from '@/assets/spotlight-slideshow-1.png';
import spotlightSlideshow2 from '@/assets/spotlight-slideshow-2.png';
import spotlightSlideshow3 from '@/assets/spotlight-slideshow-3.png';
import spotlightSlideshow4 from '@/assets/spotlight-slideshow-4.png';
import spotlightSlideshow5 from '@/assets/spotlight-slideshow-5.png';
import spotlightStrategyArchitecture from '@/assets/spotlight-strategy-architecture.png';
import spotlightDesignPrinciples from '@/assets/spotlight-design-principles.png';
import spotlightAppStoreProof from '@/assets/spotlight-app-store-proof.png';
import spotlightFigmaLibrary1 from '@/assets/spotlight-figma-library-1.png';
import spotlightFigmaLibrary2 from '@/assets/spotlight-figma-library-2.png';
import spotlightDesignTokens from '@/assets/spotlight-design-tokens.png';
import spotlightMotionGuidelines from '@/assets/spotlight-motion-guidelines.png';
import spotlightTeamWorkshop from '@/assets/spotlight-team-workshop.png';
import spotlightHandoffFlow from '@/assets/spotlight-handoff-flow.png';
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

// Figma Library Slideshow component with auto-loop and crossfade
const FigmaLibrarySlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [spotlightFigmaLibrary1, spotlightFigmaLibrary2];
  
  // Auto-loop every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--image-shadow)' }}>
      <div className="relative">
        {/* Crossfade images */}
        {slides.map((slide, index) => (
          <img 
            key={index}
            src={slide} 
            alt={`Figma Component Library - Slide ${index + 1}`}
            className={`w-full h-auto transition-opacity duration-700 ease-in-out ${
              index === 0 ? '' : 'absolute inset-0'
            } ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        
        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-foreground' : 'bg-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Caption */}
      <div className="absolute top-4 left-4 px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-full z-10">
        <p className="text-foreground text-xs font-medium">Figma Component Library</p>
      </div>
    </div>
  );
};

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
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: 'var(--image-shadow)' }}
              >
                <img 
                  src={spotlightHero} 
                  alt="Slideshow Maker and Color Pop apps showing unified design system with shared components"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Project Details */}
      <AnimatedSection delay={300}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-12 border-t border-border">
            {/* Role */}
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-3">Role</p>
              <p className="text-lg font-medium text-foreground">Product Design Lead</p>
              <p className="text-sm text-muted-foreground mt-1">Owned the entire design process & product strategy</p>
            </div>
            
            {/* Timeline */}
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-3">Timeline</p>
              <p className="text-lg font-medium text-foreground">2016 – 2023</p>
              <p className="text-sm text-muted-foreground mt-1">7 years of continuous iteration</p>
            </div>
            
            {/* Tools */}
            <div>
              <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-3">Tools</p>
              <p className="text-lg font-medium text-foreground">Figma, FigJam, Adobe Suite</p>
              <p className="text-sm text-muted-foreground mt-1">Firebase Analytics, ClickUp</p>
            </div>
          </div>
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
                  <span className="px-4 py-2 bg-foreground text-destructive rounded-full text-sm font-medium">
                    Duplication
                  </span>
                  <span className="px-4 py-2 bg-foreground text-destructive rounded-full text-sm font-medium">
                    Inconsistency
                  </span>
                  <span className="px-4 py-2 bg-foreground text-destructive rounded-full text-sm font-medium">
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
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: 'var(--image-shadow)' }}
              >
                <img 
                  src={spotlightStrategyArchitecture} 
                  alt="Design System Architecture - Tokens, Components, Patterns, Products hierarchy"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Design Principles */}
              <div 
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: 'var(--image-shadow)' }}
              >
                <img 
                  src={spotlightDesignPrinciples} 
                  alt="Design Principles - Clarity, Flexibility, Consistency, Speed"
                  className="w-full h-full object-cover"
                />
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
              {/* Main Component Library - Slideshow */}
              <FigmaLibrarySlideshow />
              
              {/* Two column: Tokens + Motion */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Design Tokens */}
                <div className="space-y-3">
                  <div 
                    className="rounded-2xl overflow-hidden"
                    style={{ boxShadow: 'var(--image-shadow)' }}
                  >
                    <img 
                      src={spotlightDesignTokens} 
                      alt="Design Tokens - Button system, typography scale, and iconography set"
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Design Tokens</p>
                </div>
                
                {/* Motion Guidelines */}
                <div className="space-y-3">
                  <div 
                    className="rounded-2xl overflow-hidden"
                    style={{ boxShadow: 'var(--image-shadow)' }}
                  >
                    <img 
                      src={spotlightMotionGuidelines} 
                      alt="Motion Guidelines - Button feedback, page transitions, and loading states"
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground text-center">Motion Guidelines</p>
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
                <div className="mt-16 text-left">
                  <p className="text-2xl md:text-3xl lg:text-4xl text-foreground leading-[1.3] font-normal">
                    Different products, <span className="font-semibold">same system,</span> zero relearning.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Visual Assets - Side-by-Side Carousel */}
          <AnimatedSection delay={150}>
            <div className="mt-20">
              <div className="text-center mb-8 px-6">
                <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-2">Side-by-Side Screens</p>
                <p className="text-muted-foreground/70 text-base max-w-md mx-auto">
                  Slideshow Maker vs Color Pop showing shared UI patterns
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
        
        {/* Full-width Carousel Container */}
        <AnimatedSection delay={200}>
          <div className="relative w-full overflow-hidden">
            <div 
              className="flex gap-5 py-8 carousel-track"
            >
              {/* First set of images */}
              {[
                { src: spotlightSlideshow1, label: 'Slideshow Maker' },
                { src: spotlightColorpop1, label: 'Color Pop' },
                { src: spotlightSlideshow2, label: 'Slideshow Maker' },
                { src: spotlightColorpop2, label: 'Color Pop' },
                { src: spotlightSlideshow3, label: 'Slideshow Maker' },
                { src: spotlightColorpop3, label: 'Color Pop' },
                { src: spotlightSlideshow4, label: 'Slideshow Maker' },
                { src: spotlightColorpop4, label: 'Color Pop' },
                { src: spotlightSlideshow5, label: 'Slideshow Maker' },
                { src: spotlightColorpop5, label: 'Color Pop' },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-44 md:w-52"
                >
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src={item.src} 
                      alt={`${item.label} screen ${Math.floor(index / 2) + 1}`}
                      className="w-full h-auto no-border"
                      style={{ border: 'none', borderRadius: 0 }}
                    />
                  </div>
                  <p className="text-center text-xs text-muted-foreground mt-3 font-medium">{item.label}</p>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {[
                { src: spotlightSlideshow1, label: 'Slideshow Maker' },
                { src: spotlightColorpop1, label: 'Color Pop' },
                { src: spotlightSlideshow2, label: 'Slideshow Maker' },
                { src: spotlightColorpop2, label: 'Color Pop' },
                { src: spotlightSlideshow3, label: 'Slideshow Maker' },
                { src: spotlightColorpop3, label: 'Color Pop' },
                { src: spotlightSlideshow4, label: 'Slideshow Maker' },
                { src: spotlightColorpop4, label: 'Color Pop' },
                { src: spotlightSlideshow5, label: 'Slideshow Maker' },
                { src: spotlightColorpop5, label: 'Color Pop' },
              ].map((item, index) => (
                <div 
                  key={`dup-${index}`}
                  className="flex-shrink-0 w-44 md:w-52"
                >
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src={item.src} 
                      alt={`${item.label} screen ${Math.floor(index / 2) + 1}`}
                      className="w-full h-auto no-border"
                      style={{ border: 'none', borderRadius: 0 }}
                    />
                  </div>
                  <p className="text-center text-xs text-muted-foreground mt-3 font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Shared Component Callouts */}
          <div className="mt-8 mb-8 flex flex-wrap justify-center gap-3">
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
              <div className="space-y-3">
                <div 
                  className="aspect-[4/3] rounded-2xl overflow-hidden"
                  style={{ boxShadow: 'var(--image-shadow)' }}
                >
                  <img 
                    src={spotlightTeamWorkshop} 
                    alt="Team Workshop - Designers & engineers collaborating on component reviews"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">Team Workshop</p>
              </div>
              
              {/* Handoff Flow Diagram */}
              <div className="space-y-3">
                <div 
                  className="aspect-[4/3] rounded-2xl overflow-hidden"
                  style={{ boxShadow: 'var(--image-shadow)' }}
                >
                  <img 
                    src={spotlightHandoffFlow} 
                    alt="Handoff Flow - Clear ownership at every stage"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center">Handoff Flow</p>
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
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: 'var(--image-shadow)' }}
              >
                <img 
                  src={spotlightAppStoreProof} 
                  alt="App Store Proof - Rankings and ratings screenshots demonstrating sustained performance" 
                  className="w-full h-auto"
                />
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
                className="rounded-2xl overflow-hidden"
                style={{ boxShadow: 'var(--image-shadow)' }}
              >
                <img 
                  src={spotlightReflection} 
                  alt="Systems thinking: nodes, connections, and emergent design"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Closing Section */}
      <section className="bg-background py-32 md:py-48">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="space-y-16 md:space-y-24">
              {/* Main statement */}
              <div className="space-y-6">
                <p className="text-2xl md:text-3xl lg:text-4xl text-foreground leading-[1.4] font-light tracking-tight">
                  This case study isn't about apps.
                </p>
                <p className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground leading-[1.4] font-light tracking-tight">
                  It's about scaling design quality across products, teams, and millions of users.
                </p>
              </div>
              
              {/* Forward-looking */}
              <div className="pt-8 border-t border-border/50">
                <p className="text-xl md:text-2xl text-foreground leading-relaxed font-light">
                  That's the kind of challenge I'm excited to solve next.
                </p>
              </div>
              
              {/* Thank you + CTA */}
              <div className="pt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
                <p className="text-lg text-muted-foreground font-light tracking-wide">
                  Thank you
                </p>
                <Link 
                  to="/#case-studies" 
                  className="group inline-flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors"
                >
                  <span className="text-sm font-medium tracking-wide">Explore all projects</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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