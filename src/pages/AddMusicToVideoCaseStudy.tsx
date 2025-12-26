import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ArrowRight, ArrowDown } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import amtvHero from '@/assets/amtv-hero.png';
import amtv2016Design from '@/assets/amtv-2016-design.png';
import amtv2019Slide1 from '@/assets/amtv-2019-slide-1.png';
import amtv2019Slide2 from '@/assets/amtv-2019-slide-2.png';
import amtv2019Slide3 from '@/assets/amtv-2019-slide-3.png';
import amtv2019Slide4 from '@/assets/amtv-2019-slide-4.png';
import amtvBridgeSketch from '@/assets/amtv-bridge-sketch.png';
import amtvBridgeCurves from '@/assets/amtv-bridge-curves.png';
import amtvResearchWaveform from '@/assets/amtv-research-waveform.png';
import amtvResearchTimeline from '@/assets/amtv-research-timeline.png';
import amtvResearchMiro from '@/assets/amtv-research-miro.png';
import amtvCollab from '@/assets/amtv-collab.png';
import amtvImpact from '@/assets/amtv-impact.png';
import amtvSolution1 from '@/assets/amtv-solution-1.png';
import amtvSolution2 from '@/assets/amtv-solution-2.png';
import amtvSolution3 from '@/assets/amtv-solution-3.png';
import amtvSolution4 from '@/assets/amtv-solution-4.png';
import amtvSolution5 from '@/assets/amtv-solution-5.png';
import amtvSolution6 from '@/assets/amtv-solution-6.png';
import amtvSolution7 from '@/assets/amtv-solution-7.png';
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

// Comparison slideshow component
const ComparisonSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [amtv2019Slide1, amtv2019Slide2, amtv2019Slide3, amtv2019Slide4];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
      {/* 2016 Design - Static */}
      <div className="w-full max-w-[280px]">
        <p className="text-muted-foreground text-sm text-center mb-4">Before</p>
        <img 
          src={amtv2016Design}
          alt="2016 AMTV Design"
          className="no-border block w-full h-auto object-contain"
        />
        <p className="text-muted-foreground text-sm text-center mt-4">2016 design</p>
      </div>
      
      {/* Divider + Arrow */}
      <div className="relative flex items-center justify-center py-4 md:py-0">
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 h-44 w-px bg-border" />
        <div className="md:hidden absolute top-1/2 -translate-y-1/2 w-44 h-px bg-border" />
        <div className="relative bg-background px-3 py-2">
          <ArrowDown className="md:hidden w-8 h-8 text-muted-foreground" />
          <ArrowRight className="hidden md:block w-8 h-8 text-muted-foreground" />
        </div>
      </div>
      
      {/* 2019 Update - Slideshow */}
      <div className="w-full max-w-[280px]">
        <p className="text-muted-foreground text-sm text-center mb-4">After</p>
        <div className="relative">
          {slides.map((slide, index) => (
            <img 
              key={index}
              src={slide}
              alt={`2019 AMTV Update ${index + 1}`}
              className={`no-border block w-full h-auto object-contain transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
              }`}
            />
          ))}
        </div>
        <p className="text-muted-foreground text-sm text-center mt-4">2019 update</p>
      </div>
    </div>
  );
};

// Bridge section slideshow component
const BridgeSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [amtvBridgeSketch, amtvBridgeCurves];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full rounded-[4px] overflow-hidden">
      {slides.map((slide, index) => (
        <img 
          key={index}
          src={slide}
          alt={`Bridge concept ${index + 1}`}
          className={`no-border block w-full h-auto object-cover transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
          }`}
        />
      ))}
    </div>
  );
};

// Solution auto-scrolling carousel component
const SolutionCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const speedRef = useRef(0.5);
  const targetSpeedRef = useRef(0.5);
  
  const solutionImages = [
    { src: amtvSolution1, alt: 'Video Editing Interface' },
    { src: amtvSolution2, alt: 'Timeline Editor' },
    { src: amtvSolution3, alt: 'Audio Edit Panel' },
    { src: amtvSolution4, alt: 'AI Filters' },
    { src: amtvSolution5, alt: 'Audio Library' },
    { src: amtvSolution6, alt: 'Projects View' },
    { src: amtvSolution7, alt: 'Audio Add Screen' },
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = scrollContainer.scrollLeft || 0;
    const maxSpeed = 0.5;
    const easeAmount = 0.02; // How fast it eases in/out

    const animate = () => {
      // Ease speed toward target
      targetSpeedRef.current = isHovered ? 0 : maxSpeed;
      speedRef.current += (targetSpeedRef.current - speedRef.current) * easeAmount;
      
      scrollPosition += speedRef.current;
      
      // Reset when we've scrolled past half (the duplicated set)
      const halfWidth = scrollContainer.scrollWidth / 2;
      if (scrollPosition >= halfWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  return (
    <div 
      className="relative w-screen left-1/2 -translate-x-1/2 py-12 md:py-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left fade gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      
      {/* Right fade gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden"
        style={{ scrollBehavior: 'auto' }}
      >
        {/* Duplicate images for seamless loop */}
        {[...solutionImages, ...solutionImages].map((image, index) => (
          <div 
            key={index} 
            className="flex-shrink-0"
          >
            <img 
              src={image.src}
              alt={image.alt}
              className="h-[500px] md:h-[600px] w-auto object-contain no-border"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const AddMusicToVideoCaseStudy = () => {
  const navigate = useNavigate();

  const handleNavToProjects = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('case-studies');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    document.title = 'Add Music to Video | Gazi Arifin';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-32">
        <div className="container max-w-6xl">
          
          {/* Back navigation */}
          <AnimatedSection>
            <button 
              onClick={handleNavToProjects}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              back to work
            </button>
          </AnimatedSection>

          {/* Hero Section */}
          <AnimatedSection delay={100}>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
              {/* Left side - Text content */}
              <div>
                <h1 className="font-display font-medium leading-[1.05] tracking-tight text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] mb-6">
                  <span className="uppercase text-foreground">Redefining Mobile Video Editing</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                  Leading the UX for Add Music to Video. A top-charting app developed at Kite Games Studio that scaled from a simple utility to a creative powerhouse.
                </p>
                <p className="font-mono text-sm text-muted-foreground tracking-wide mb-6">
                  2016 - 2023 • Lead UX Designer
                </p>
                
                {/* App Store Badges */}
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://apps.apple.com/us/app/add-music-to-video-editor/id947792997" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80"
                  >
                    <img 
                      src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                      alt="Download on the App Store" 
                      className="h-10"
                    />
                  </a>
                  <a 
                    href="https://play.google.com/store/apps/details?id=kgs.com.addmusictovideos&hl=en_US" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-80"
                  >
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                      alt="Get it on Google Play" 
                      className="h-10"
                    />
                  </a>
                </div>
              </div>
              
              {/* Right side - Square hero image */}
              <div className="flex justify-center lg:justify-end">
                <img 
                  src={amtvHero}
                  alt="Add Music to Video App"
                  className="w-full max-w-[440px] h-[500px] object-cover no-border"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Context & Role Section */}
          <AnimatedSection delay={100}>
            <div className="bg-secondary/30 rounded-[4px] py-10 px-8 mb-24">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                {/* Role */}
                <div className="px-4 md:px-6 py-4">
                  <p className="text-sm text-muted-foreground mb-2 tracking-wide">role</p>
                  <p className="font-medium text-foreground">Lead UX Designer</p>
                </div>
                
                {/* Growth */}
                <div className="px-4 md:px-6 py-4 border-l border-border">
                  <p className="text-sm text-muted-foreground mb-2 tracking-wide">growth</p>
                  <p className="font-medium text-foreground">Scaled Team 4 → 22</p>
                </div>
                
                {/* Location */}
                <div className="px-4 md:px-6 py-4 md:border-l border-border">
                  <p className="text-sm text-muted-foreground mb-2 tracking-wide">location</p>
                  <p className="font-medium text-foreground">Kite Games Studio, Dhaka</p>
                </div>
                
                {/* Collaboration */}
                <div className="px-4 md:px-6 py-4 border-l border-border">
                  <p className="text-sm text-muted-foreground mb-2 tracking-wide">collaboration</p>
                  <p className="font-medium text-foreground">Dev & QA Integration</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* The Challenge Section */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter i</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium mb-4">The Challenge</h2>
              <p className="text-lg text-muted-foreground mb-2">The 2016 Landscape</p>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mb-16">
                The original experience was cluttered and technically rigid. Users struggled to sync audio, and the visual output felt "cheap." I needed to dismantle the existing flow and rebuild it based on how people feel music, not just how code handles it.
              </p>
              
              {/* Comparison Layout */}
              <ComparisonSlideshow />
            </div>
          </AnimatedSection>

          {/* Research & Methodology Section */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter ii</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium mb-4">Research & Methodology</h2>
              <p className="text-lg text-muted-foreground mb-16">Unconventional Research Methods</p>
              
              {/* Row 1 - Text Left, Image Right */}
              <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase mb-4">The DJ Study</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    I analyzed DJ beat-matching to understand how non-musicians perceive audio structure. By studying how DJs intuitively sync tracks, I discovered patterns that could be translated into visual cues for our video editor.
                  </p>
                </div>
                <div className="rounded-[4px] overflow-hidden">
                  <img 
                    src={amtvResearchWaveform}
                    alt="DJ audio waveform analysis"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              
              {/* Row 2 - Image Left, Text Right */}
              <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <div className="rounded-[4px] overflow-hidden md:order-1 order-2">
                  <img 
                    src={amtvResearchTimeline}
                    alt="Cinematic grammar timeline analysis"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="md:order-2 order-1">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase mb-4">Cinematic Grammar</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    I studied movie transitions to create a "logic grammar" for video themes. By breaking down how professional editors use timing, cuts, and visual rhythm, I developed a systematic approach to automated video editing.
                  </p>
                </div>
              </div>
              
              {/* Row 3 - Text Left, Image Right */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase mb-4">Psychology</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Analyzed psychology to understand how users (specifically female demographics) view self-image in editing. This research informed our approach to filters, effects, and the overall emotional tone of the editing experience.
                  </p>
                </div>
                <div className="rounded-[4px] overflow-hidden">
                  <img 
                    src={amtvResearchMiro}
                    alt="User psychology research board"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* The Bridge Section */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left side - Text content */}
                <div>
                  <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter iii</p>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium mb-4">The "Bridge"</h2>
                  <p className="text-lg text-muted-foreground mb-6">Bridging Design & Code</p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    In 2016, tools like Figma weren't advanced enough for my vision. I used After Effects to demonstrate complex animations and wrote "Transition Grammar" on paper to explain the logic to developers.
                  </p>
                  <p className="text-lg md:text-xl italic text-foreground/80 leading-relaxed">
                    "I didn't just hand off pixels; I defined the physics of the app."
                  </p>
                </div>
                
                {/* Right side - Slideshow */}
                <BridgeSlideshow />
              </div>
            </div>
          </AnimatedSection>

          {/* The Solution Section */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter iv</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium mb-4">The Solution</h2>
              <p className="text-lg text-muted-foreground mb-6">The Reimagined Editor</p>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mb-12">
                The final design featured a light and dark mode interface that prioritized the content. We introduced a drag-and-drop timeline that felt tactile, allowing users to "touch" the music. The result was a seamless flow from import to export.
              </p>
              
              {/* Solution Gallery - Auto-scrolling Carousel */}
              <SolutionCarousel />
            </div>
          </AnimatedSection>

          {/* Execution Section */}
          <AnimatedSection delay={100}>
            <div className="mb-24 text-center">
              <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter v</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium mb-4">Execution</h2>
              <p className="text-lg text-muted-foreground mb-6">Pixel-Perfect Execution</p>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-12">
                The best design fails without implementation. I sat side-by-side with developers and QA engineers in countless meetings, fixing glitches and refining transition timings until the app felt indistinguishable from the After Effects prototype.
              </p>
              
              {/* Collaboration Image */}
              <figure className="w-full">
                <OptimizedImage 
                  src={amtvCollab} 
                  alt="In-person team collaboration" 
                  className="w-full rounded-[4px]"
                />
                <figcaption className="text-sm text-muted-foreground mt-4">
                  In-person team collaboration.
                </figcaption>
              </figure>
            </div>
          </AnimatedSection>

          {/* Impact Section */}
          <AnimatedSection delay={100}>
            <div className="mb-24">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left side - Text content */}
                <div>
                  <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter vi</p>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium mb-4">Impact</h2>
                  <p className="text-lg text-muted-foreground mb-6">7 Years of Leadership</p>
                  <p className="text-muted-foreground leading-relaxed mb-10">
                    This project was just the beginning. It stayed on the Top Charts for years, and the success allowed me to scale the design team to 22 members, leading 16+ successful projects at Kite Games Studio.
                  </p>
                  
                  {/* Results */}
                  <div className="space-y-4">
                    <p className="font-display text-2xl md:text-3xl font-bold text-foreground">
                      Top Charts
                    </p>
                    <p className="text-muted-foreground text-sm -mt-2">App Store & Play Store</p>
                    
                    <p className="font-display text-2xl md:text-3xl font-bold text-foreground pt-2">
                      16+ Projects
                    </p>
                    <p className="text-muted-foreground text-sm -mt-2">Shipped Successfully</p>
                    
                    <p className="font-display text-2xl md:text-3xl font-bold text-foreground pt-2">
                      22 Designers
                    </p>
                    <p className="text-muted-foreground text-sm -mt-2 mb-6">Team Led & Mentored</p>
                    
                    {/* App Store Badges */}
                    <div className="flex flex-wrap gap-3 pt-4">
                      <a 
                        href="https://apps.apple.com/us/app/add-music-to-video-editor/id947792997" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="transition-opacity hover:opacity-80"
                      >
                        <img 
                          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                          alt="Download on the App Store" 
                          className="h-10"
                        />
                      </a>
                      <a 
                        href="https://play.google.com/store/apps/details?id=kgs.com.addmusictovideos&hl=en_US" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="transition-opacity hover:opacity-80"
                      >
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                          alt="Get it on Google Play" 
                          className="h-10"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Right side - Impact Image */}
                <div>
                  <img 
                    src={amtvImpact}
                    alt="Add Music to Video - Featured on App Store Top Charts"
                    className="w-full h-auto rounded-[40px] no-border"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* CTA Footer Section */}
          <AnimatedSection delay={100}>
            <div className="py-24 text-center">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium mb-4">
                Ready to build the next success story?
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                Let's create something memorable.
              </p>
              <a 
                href="mailto:arifin.yeasin@gmail.com"
                className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-medium text-lg rounded-[4px] hover:bg-foreground/90 transition-colors duration-300"
              >
                Contact Me
              </a>
            </div>
          </AnimatedSection>

          {/* Navigation to other projects */}
          <AnimatedSection delay={100}>
            <div className="pt-16 border-t border-border">
              <button 
                onClick={handleNavToProjects}
                className="group flex items-center justify-between w-full"
              >
                <div>
                  <p className="text-sm text-muted-foreground mb-2">back to</p>
                  <p className="font-display text-2xl md:text-3xl font-medium group-hover:text-muted-foreground transition-colors">
                    all projects
                  </p>
                </div>
                <ArrowUpRight className="w-8 h-8 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </AnimatedSection>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddMusicToVideoCaseStudy;
