import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Download } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import spotlightHero from '@/assets/spotlight-hero.png';

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

      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <AnimatedSection>
          <div className="max-w-4xl">
            {/* App Labels */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-2 bg-muted rounded-full text-sm font-medium">Color Pop: AI Photo Editor</span>
              <span className="px-4 py-2 bg-muted rounded-full text-sm font-medium">Add Music to Video Editor</span>
              <span className="px-4 py-2 bg-muted rounded-full text-sm font-medium">Slideshow Maker w Music</span>
            </div>
            
            {/* Main Title */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6">
              Designing for the Spotlight
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-12">
              A case study on How Three Apps Revolutionized Creativity and Topped the Charts
            </p>
          </div>
        </AnimatedSection>

        {/* Stats Row */}
        <AnimatedSection delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center md:text-left">
              <p className="text-4xl md:text-5xl font-display font-medium mb-2">56%</p>
              <p className="text-muted-foreground">increase in user engagement</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-4xl md:text-5xl font-display font-medium mb-2">22M+</p>
              <p className="text-muted-foreground">Downloads</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-4xl md:text-5xl font-display font-medium mb-2">#1</p>
              <p className="text-muted-foreground">Ranking on the App Store Top Charts for many years straight!</p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Hero Image Section */}
      <AnimatedSection delay={200}>
        <section className="w-full bg-muted/30 py-16">
          <div className="container">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 p-8">
              <div className="text-center mb-8">
                <p className="text-lg font-medium mb-2">iOS Top Charts</p>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Three apps, millions of downloads, and years at the top — here's how thoughtful design and relentless iteration made it happen.
                </p>
              </div>
              
              {/* Phone Mockups */}
              <div className="flex justify-center items-end gap-4">
                <img 
                  src={spotlightHero}
                  alt="App Screenshots"
                  className="w-full max-w-4xl h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Download CTA */}
      <AnimatedSection delay={300}>
        <section className="container py-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/Gazi_Arifin_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              <Download className="h-4 w-4" />
              Download full PDF
            </a>
            <span className="text-muted-foreground">or explore my work</span>
          </div>
        </section>
      </AnimatedSection>

      {/* Overview Section */}
      <AnimatedSection delay={100}>
        <section className="container py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
              Three apps, over a decade of design, and millions of downloads later—what's the secret behind Color Pop, Add Music to Video, and Slideshow Maker w Music? From 2016 to 2023, I had the privilege of leading UX research, innovative design, and relentless iteration that turned ideas into tools that empowered users worldwide. These apps became household names, staying on the App Store top charts for years and helping users share their stories effortlessly.
            </p>

            {/* Role & Impact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* My Role */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">My Role</h3>
                <p className="font-medium text-lg">Product Design Lead</p>
                <div className="space-y-2 pt-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Tools used</h3>
                  <p className="text-muted-foreground">
                    Figma, FigJam, Invision, Adobe Creative Suite, ClickUp, Firebase Analytics
                  </p>
                </div>
              </div>

              {/* Impact */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Impact</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-foreground">•</span>
                    Over 10M downloads and consistent top-chart rankings.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground">•</span>
                    Featured by Apple, with a 4.7/5 rating and millions of downloads.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground">•</span>
                    5M+ downloads with high user retention.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-foreground">•</span>
                    Created design systems, resulting in a 15% improvement in development efficiency.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="container py-16 md:py-24 border-t">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-medium mb-6">
              Want to see more details?
            </h2>
            <p className="text-muted-foreground mb-8">
              This case study is being expanded with more insights. Check back soon for the complete story.
            </p>
            <Link 
              to="/#case-studies" 
              className="inline-flex items-center gap-2 text-foreground font-medium hover:underline underline-offset-4"
            >
              View all case studies
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </AnimatedSection>

      <Footer />
    </div>
  );
};

export default SpotlightCaseStudy;
