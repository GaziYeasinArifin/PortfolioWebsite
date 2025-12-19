import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// App icon imports - these would be replaced with actual app icons
import colorPopIcon from '@/assets/case-study-2.jpg';
import amtvIcon from '@/assets/amtv-thumbnail.png';
import slideshowIcon from '@/assets/case-study-3.jpg';

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

const SpotlightCaseStudy = () => {
  useEffect(() => {
    document.title = 'Designing for the Spotlight | Gazi Arifin';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Back Navigation */}
      <div className="container pt-24 md:pt-28">
        <Link 
          to="/#case-studies" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>
      </div>

      {/* Hero Section - Phone Mockups */}
      <section className="container py-12 md:py-16">
        <AnimatedSection>
          {/* Three Phone Mockups */}
          <div className="flex justify-center items-end gap-4 md:gap-8 mb-8">
            {/* Left Phone - smaller */}
            <div className="w-24 md:w-36 lg:w-44 aspect-[9/19] bg-muted rounded-2xl md:rounded-3xl" />
            {/* Center Phone - larger with border */}
            <div className="w-32 md:w-48 lg:w-56 aspect-[9/19] bg-muted rounded-2xl md:rounded-3xl ring-4 ring-foreground/10" />
            {/* Right Phone - smaller */}
            <div className="w-24 md:w-36 lg:w-44 aspect-[9/19] bg-muted rounded-2xl md:rounded-3xl" />
          </div>

          {/* App Icons Row */}
          <div className="flex justify-center items-start gap-8 md:gap-16 lg:gap-24">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                <img src={colorPopIcon} alt="Color Pop" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs text-muted-foreground text-center max-w-[80px] md:max-w-none">Color Pop: AI Photo Editor</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span className="text-xs text-muted-foreground text-center max-w-[80px] md:max-w-none">Add Music to Video Editor</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <span className="text-xs text-muted-foreground text-center max-w-[80px] md:max-w-none">Slideshow Maker w Music</span>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Title Section */}
      <section className="container pb-12 md:pb-16">
        <AnimatedSection delay={100}>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-muted-foreground text-lg mb-2">Designing for the</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6">
              Spotlight
            </h1>
            <p className="text-muted-foreground mb-2">A case study on</p>
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-medium tracking-tight">
              How Three Apps Revolutionized Creativity and Topped the Charts
            </h2>
          </div>
        </AnimatedSection>
      </section>

      {/* Stats Cards Section */}
      <section className="container pb-12 md:pb-16">
        <AnimatedSection delay={200}>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 md:gap-6">
            {/* 56% Card */}
            <div className="bg-muted/50 rounded-3xl p-6 md:p-8 text-center min-w-[160px]">
              <p className="text-4xl md:text-5xl font-display font-medium mb-2">56%</p>
              <p className="text-sm text-muted-foreground">increase in<br />user engagement</p>
            </div>
            
            {/* 22M+ Card */}
            <div className="bg-muted/50 rounded-3xl p-6 md:p-8 text-center min-w-[160px]">
              <p className="text-4xl md:text-5xl font-display font-medium mb-2">22M+</p>
              <p className="text-sm text-muted-foreground">Downloads<br />Worldwide</p>
            </div>
            
            {/* Phone with iOS Top Charts */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-32 md:w-40 aspect-[9/19] bg-muted rounded-2xl md:rounded-3xl ring-2 ring-foreground/10" />
              <p className="text-xs text-muted-foreground">iOS Top Charts</p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* App Store Top Charts Card */}
      <section className="container pb-12 md:pb-16">
        <AnimatedSection delay={250}>
          <div className="flex justify-center">
            <div className="bg-muted/50 rounded-2xl p-4 md:p-6 flex items-center gap-4 max-w-md">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-white">
                  <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <div>
                <p className="font-medium text-lg">App Store Top Charts</p>
                <p className="text-sm text-muted-foreground">Ranking on the App Store Top Charts for many years straight!</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Tagline Section */}
      <section className="container pb-12 md:pb-16">
        <AnimatedSection delay={300}>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-lg md:text-xl font-medium">
              Three apps, millions of downloads, and years at the top here's how thoughtful design and relentless iteration made it happen.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Download CTA */}
      <section className="container pb-12 md:pb-16">
        <AnimatedSection delay={350}>
          <div className="flex flex-col items-center gap-3">
            <a 
              href="/Gazi_Arifin_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity text-sm"
            >
              Download full PDF
            </a>
            <p className="text-muted-foreground text-sm">or</p>
            <Link to="/#case-studies" className="text-sm font-medium hover:underline underline-offset-4">
              explore my work
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* Overview Text */}
      <section className="container pb-12 md:pb-16">
        <AnimatedSection delay={100}>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-sm text-muted-foreground leading-relaxed">
              <p>
                Three apps, over a decade of design, and millions of downloads later—what's the secret behind creating experiences that dominate the App Store charts for years? This is the story of how thoughtful research, innovative design, and relentless iteration turned ideas into tools that empowered users worldwide.
              </p>
              <p>
                From 2016 to 2023, I had the privilege of leading UX design at Kite Games Studio, where I shaped the three flagship apps: Add Music to Video Editor, Color Pop, and Slideshow Maker w Music. These apps became household names, staying on the App Store top charts for years and share their stories effortlessly.
              </p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-6 max-w-4xl">
              This case study shares the behind-the-scenes story of their success, from identifying user pain points to designing solutions that continue to delight millions.
            </p>
          </div>
        </AnimatedSection>
      </section>

      {/* Role & Impact Cards */}
      <section className="container pb-16 md:pb-24">
        <AnimatedSection delay={200}>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - My Role & Tools */}
              <div className="space-y-6">
                {/* My Role Card */}
                <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
                  <h3 className="text-lg font-medium mb-3">My Role</h3>
                  <p className="text-sm text-muted-foreground">
                    Product Design Lead<br />
                    Owned the entire design, process & product strategy of the suite.
                  </p>
                </div>
                
                {/* Tools Used Card */}
                <div className="bg-muted/30 rounded-2xl p-6 border border-border/50">
                  <h3 className="text-lg font-medium mb-3">Tools used</h3>
                  <p className="text-sm text-muted-foreground">
                    Figma, FigJam, Invision, Adobe Creative suit.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    ClickUp, Firebase Analytics
                  </p>
                </div>
              </div>

              {/* Right Column - Impact Card (Dark) */}
              <div className="bg-foreground text-background rounded-2xl p-6">
                <h3 className="text-lg font-medium mb-4">Impact</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-background/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 24 24" className="w-5 h-5">
                        <path fill="currentColor" d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-sm opacity-90">Over 10M downloads and consistent top-chart rankings.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-background/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 24 24" className="w-5 h-5">
                        <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                      </svg>
                    </div>
                    <p className="text-sm opacity-90">Featured by Apple, with a 4.7/5 rating and millions of downloads.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-background/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 24 24" className="w-5 h-5">
                        <path fill="currentColor" d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <p className="text-sm opacity-90">5M+ downloads with high user retention.</p>
                  </div>
                  <p className="text-sm opacity-90 pt-2 border-t border-background/10">
                    Created design systems, resulting in a 15% improvement in development efficiency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <Footer />
    </div>
  );
};

export default SpotlightCaseStudy;