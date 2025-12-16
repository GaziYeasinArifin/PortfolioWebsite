import { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Cpu, Figma, Lightbulb, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OptimizedImage from '@/components/OptimizedImage';
import placeholderSvg from '@/assets/placeholder-image.svg';
import phantomFootprintHero from '@/assets/phantom-footprint-hero.png';
import phantomResearchCardSort from '@/assets/phantom-research-card-sort.jpg';
import phantomPersonaInsight from '@/assets/phantom-persona-insight.png';
import phantomPaperPrototype from '@/assets/phantom-paper-prototype.jpg';
import phantomScreenVsTactile from '@/assets/phantom-screen-vs-tactile.jpg';
import phantomArduino1 from '@/assets/phantom-arduino-1.jpg';
import phantomArduino2 from '@/assets/phantom-arduino-2.jpg';
import phantomAssembly1 from '@/assets/phantom-assembly-1.jpg';
import phantomAssembly2 from '@/assets/phantom-assembly-2.png';
import phantomAbTest from '@/assets/phantom-ab-test.png';
import phantomScope1 from '@/assets/phantom-scope-1.jpg';
import phantomScope2 from '@/assets/phantom-scope-2.png';
import phantomScope3 from '@/assets/phantom-scope-3.jpg';
import phantomIterationGraphic from '@/assets/phantom-iteration-graphic.svg';

// Hook to preload images and track loading state
const usePreloadImages = (images: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setLoadedImages((prev) => new Set([...prev, src]));
      };
    });
  }, [images]);
  
  return loadedImages.size === images.length;
};

// Custom hook for scroll-triggered animations
const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// Animated section wrapper component
const AnimatedSection = ({ 
  children, 
  className = '', 
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

const CaseStudyDetail = () => {
  const { slug } = useParams();
  const [arduinoImageIndex, setArduinoImageIndex] = useState(0);
  const [assemblyImageIndex, setAssemblyImageIndex] = useState(0);
  const arduinoImages = [phantomArduino1, phantomArduino2];
  const assemblyImages = [phantomAssembly1, phantomAssembly2];
  
  const arduinoImagesLoaded = usePreloadImages(arduinoImages);
  const assemblyImagesLoaded = usePreloadImages(assemblyImages);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setArduinoImageIndex((prev) => (prev + 1) % arduinoImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [arduinoImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAssemblyImageIndex((prev) => (prev + 1) % assemblyImages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [assemblyImages.length]);

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="container">
          {/* Back link */}
          <AnimatedSection>
            <Link 
              to="/#case-studies" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 mb-12 group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              back to work
            </Link>
          </AnimatedSection>

          {/* Hero section - The Hook */}
          <AnimatedSection delay={100}>
            <div className="mb-16 md:mb-24">
              <h1 className="font-display font-medium leading-[1.05] tracking-tight text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] mb-6">
                <span className="uppercase text-foreground">phantom footprint</span>
                <br />
                <span className="lowercase text-muted-foreground">closing the climate feedback loop</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mb-8">
                <span className="text-foreground font-medium">Challenge:</span> Making <span className="text-foreground font-medium">climate consequences</span> tangible for <span className="text-foreground font-medium">college students.</span><br />
                <span className="text-foreground font-medium">Solution:</span> An <span className="text-foreground font-medium">IoT-enhanced,</span> physical <span className="text-foreground font-medium">board game.</span>
              </p>
              
              {/* Role & Tools */}
              <div className="flex flex-wrap gap-4 md:gap-6 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>Lead UX Designer, Researcher, Prototyper</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Lightbulb className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>Design Thinking</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Cpu className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>Arduino Uno, RFID</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Figma className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span>Figma</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">4 Months (Thesis Project)</p>
            </div>
          </AnimatedSection>

          {/* Hero image */}
          <AnimatedSection delay={200}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] bg-secondary mb-24 md:mb-32 group">
              <OptimizedImage 
                src={phantomFootprintHero} 
                alt="Phantom Footprint - IoT-enhanced board game for climate education" 
                className="transition-transform duration-700 group-hover:scale-[1.02]"
                priority
              />
            </div>
          </AnimatedSection>

          {/* Chapter I: The Problem */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter i</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">The Problem</h2>
              </div>
            </AnimatedSection>

            {/* The Status Quo */}
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16">
                <div className="space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">Overwhelmed User.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Climate education is inaccessible, abstract, and doesn't connect daily actions to global outcomes. Users feel disconnected from the consequences of their choices.
                  </p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-secondary group">
                  <OptimizedImage 
                    src={phantomResearchCardSort} 
                    alt="Research & card sort session" 
                    className="transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* Defining the User */}
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-secondary order-2 lg:order-1 group">
                  <OptimizedImage 
                    src={phantomPersonaInsight} 
                    alt="Persona: The Digital Nomad Student - Alex, 22" 
                    className="transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="space-y-4 order-1 lg:order-2">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">The College Student Archetype: Wanting Impact, Lacking Tools.</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    They are digitally engaged but feel passive about climate change.
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                      <span>Passive learner vs. socially active advocate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                      <span>Need immediate, tangible feedback</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                      <span>Desire for meaningful action</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* The Gap */}
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">The Opportunity: Interactivity {">"} Simulation.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Existing tools (calculators, digital apps) lack the hands-on, immediate, emotional connection required for behavioral change.
                  </p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-secondary group">
                  <OptimizedImage 
                    src={phantomScreenVsTactile} 
                    alt="Boring screen vs tactile game comparison" 
                    className="transition-transform duration-500 group-hover:scale-[1.02]"
                    objectPosition="top"
                  />
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter II: Technologies */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter ii</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">Technologies</h2>
              </div>
            </AnimatedSection>

            {/* Ideation & Sketch */}
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16">
                <div className="space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">From Paper Prototype to Tangible Mechanic.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Rapid prototyping phase using Double Diamond methodology. The game mechanic is built around choice cards representing daily actions with environmental consequences.
                  </p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-secondary group">
                  <OptimizedImage 
                    src={phantomPaperPrototype} 
                    alt="Initial paper prototype & game layout" 
                    className="transition-transform duration-500 group-hover:scale-[1.02]"
                    objectPosition="top"
                  />
                </div>
              </div>
            </AnimatedSection>

            {/* The Tech Solution */}
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-secondary order-2 lg:order-1">
                  {/* Placeholder */}
                  <img
                    src={placeholderSvg}
                    alt=""
                    aria-hidden="true"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      arduinoImagesLoaded ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  {/* Cycling images */}
                  {arduinoImages.map((img, index) => (
                    <img 
                      key={index}
                      src={img} 
                      alt={`Arduino LED breadboard circuit ${index + 1}`} 
                      className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${
                        arduinoImagesLoaded && index === arduinoImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                    />
                  ))}
                </div>
                <div className="space-y-4 order-1 lg:order-2">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">Mapping Action to Immediate Feedback (Arduino + RFID).</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The core innovation: using RFID to scan a choice card and trigger an LED status light (red/yellow/green) via Arduino. This closes the feedback loop instantly, connecting user actions to environmental consequences.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Building the System */}
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16">
                <div className="space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">From Wiring to Final Assembly.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Showcasing the hands-on nature of full-stack design thinking: digital UX combined with physical product development. Soldering, wiring, and final assembly of the board and sensor mechanism.
                  </p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-secondary">
                  {/* Placeholder */}
                  <img
                    src={placeholderSvg}
                    alt=""
                    aria-hidden="true"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      assemblyImagesLoaded ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  {/* Cycling images */}
                  {assemblyImages.map((img, index) => (
                    <img 
                      key={index}
                      src={img} 
                      alt={`Soldering, wiring & assembly demo ${index + 1}`} 
                      className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${
                        assemblyImagesLoaded && index === assemblyImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Iteration Loop */}
            <AnimatedSection>
              <div className="space-y-8">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] bg-secondary group">
                  <OptimizedImage 
                    src={phantomAbTest} 
                    alt="A/B test comparison - game interface and feedback system iterations" 
                    className="transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="space-y-4 max-w-3xl">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">Testing Ambiguity. Improving Nuance.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Key finding from usability testing: players craved nuance over simple positive/negative feedback. Iteration added a medium impact category (yellow LED) to better reflect real-world complexity.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Code Section */}
            <AnimatedSection>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-16">
                <div className="space-y-4">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">Code</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Every great interaction begins with elegant code. The RFID-to-LED mapping was built using Arduino's MFRC522 library—reading card data, writing feedback states, and triggering visual responses in under 50 lines of C++.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Simple, modular, and intentional. The code embodies the same design philosophy as the game itself: clarity over complexity.
                  </p>
                </div>
                <div className="relative overflow-hidden rounded-[4px] bg-[#1e1e1e] p-4 md:p-6 font-mono text-xs md:text-sm leading-relaxed">
                  <div className="overflow-x-auto">
                    <pre className="text-[#d4d4d4]">
<span className="text-[#c586c0]">#include</span> <span className="text-[#ce9178]">&lt;SPI.h&gt;</span>
<span className="text-[#c586c0]">#include</span> <span className="text-[#ce9178]">&lt;MFRC522.h&gt;</span>

<span className="text-[#c586c0]">#define</span> <span className="text-[#9cdcfe]">RST_PIN</span> <span className="text-[#b5cea8]">9</span>
<span className="text-[#c586c0]">#define</span> <span className="text-[#9cdcfe]">SS_PIN</span> <span className="text-[#b5cea8]">10</span>

<span className="text-[#4ec9b0]">MFRC522</span> <span className="text-[#9cdcfe]">rfid</span>(<span className="text-[#9cdcfe]">SS_PIN</span>, <span className="text-[#9cdcfe]">RST_PIN</span>);

<span className="text-[#569cd6]">void</span> <span className="text-[#dcdcaa]">setup</span>() {"{"}
  Serial.<span className="text-[#dcdcaa]">begin</span>(<span className="text-[#b5cea8]">9600</span>);
  SPI.<span className="text-[#dcdcaa]">begin</span>();
  rfid.<span className="text-[#dcdcaa]">PCD_Init</span>();
  Serial.<span className="text-[#dcdcaa]">println</span>(<span className="text-[#ce9178]">"Scan your RFID card to write data..."</span>);
{"}"}

<span className="text-[#569cd6]">void</span> <span className="text-[#dcdcaa]">loop</span>() {"{"}
  <span className="text-[#c586c0]">if</span> (!rfid.<span className="text-[#dcdcaa]">PICC_IsNewCardPresent</span>() || !rfid.<span className="text-[#dcdcaa]">PICC_ReadCardSerial</span>())
    <span className="text-[#c586c0]">return</span>;
    
  String cardType = <span className="text-[#ce9178]">"Positive"</span>;
  <span className="text-[#dcdcaa]">writeDataToCard</span>(cardType);
  
  rfid.<span className="text-[#dcdcaa]">PICC_HaltA</span>();
  rfid.<span className="text-[#dcdcaa]">PCD_StopCrypto1</span>();
  <span className="text-[#dcdcaa]">delay</span>(<span className="text-[#b5cea8]">2000</span>);
{"}"}

<span className="text-[#569cd6]">void</span> <span className="text-[#dcdcaa]">writeDataToCard</span>(String data) {"{"}
  <span className="text-[#569cd6]">byte</span> block = <span className="text-[#b5cea8]">1</span>;
  <span className="text-[#569cd6]">byte</span> buffer[<span className="text-[#b5cea8]">16</span>] = {"{"}{"}"};
  data.<span className="text-[#dcdcaa]">getBytes</span>(buffer, <span className="text-[#b5cea8]">16</span>);
  
  MFRC522::StatusCode status = rfid.<span className="text-[#dcdcaa]">MIFARE_Write</span>(block, buffer, <span className="text-[#b5cea8]">16</span>);
  <span className="text-[#c586c0]">if</span> (status == MFRC522::STATUS_OK) {"{"}
    Serial.<span className="text-[#dcdcaa]">println</span>(<span className="text-[#ce9178]">"Write successful! Data written: "</span> + data);
  {"}"} <span className="text-[#c586c0]">else</span> {"{"}
    Serial.<span className="text-[#dcdcaa]">println</span>(<span className="text-[#ce9178]">"Write failed!"</span>);
  {"}"}
{"}"}</pre>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </section>

          {/* Chapter III: The Resolution */}
          <section className="mb-24 md:mb-32">
            <AnimatedSection>
              <div className="mb-12">
                <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-4">chapter iii</p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium">The Resolution</h2>
              </div>
            </AnimatedSection>

            {/* The Impact */}
            <AnimatedSection>
              <div className="mb-16">
                <h3 className="font-display text-xl md:text-2xl font-medium uppercase mb-6">Bridging the Gap. 90% Engagement.</h3>
                <div className="bg-secondary rounded-[4px] p-8 md:p-12">
                  <blockquote className="font-display text-xl md:text-2xl lg:text-3xl font-medium text-center leading-relaxed">
                    "The LED system helped players connect their choices to tangible results."
                  </blockquote>
                  <p className="text-center text-muted-foreground mt-4">— User Testing Feedback</p>
                </div>
                <p className="text-muted-foreground leading-relaxed mt-6">
                  Immediate feedback led to deeper reflection. Players connected choices to consequences, creating meaningful behavioral awareness.
                </p>
              </div>
            </AnimatedSection>

            {/* What I Learned */}
            <AnimatedSection>
              <div className="mb-16 text-center py-12">
                <div className="mb-[90px]">
                  <div className="w-full max-w-4xl mx-auto mb-4 aspect-[16/6]">
                    <OptimizedImage 
                      src={phantomIterationGraphic} 
                      alt="Iteration process graphic" 
                      objectFit="contain"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Double Diamond Framework</p>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-medium uppercase mb-8">simplicity, iteration, and the power of physical ux.</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto">
                  <div>
                    <p className="font-display text-lg font-medium mb-2">Simplicity Matters</p>
                    <p className="text-sm text-muted-foreground">Clear feedback over complex systems</p>
                  </div>
                  <div>
                    <p className="font-display text-lg font-medium mb-2">Iterative Design is Key</p>
                    <p className="text-sm text-muted-foreground">Testing revealed nuance requirements</p>
                  </div>
                  <div>
                    <p className="font-display text-lg font-medium mb-2">Immediate Feedback is Crucial</p>
                    <p className="text-sm text-muted-foreground">Closing the action-consequence loop</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Looking Forward */}
            <AnimatedSection>
              <div className="space-y-8">
                <div className="space-y-4 max-w-3xl">
                  <h3 className="font-display text-xl md:text-2xl font-medium uppercase">Scope: From Campus Game to Global Platform.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Future vision includes expanding to younger audiences, gamifying the concept further into a digital companion app, and creating scalable educational tools for climate awareness.
                  </p>
                </div>
                
                {/* 2 portrait top, 1 landscape bottom */}
                <div className="flex flex-col gap-4">
                  {/* Top row: 2 portrait images */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] group">
                      <OptimizedImage 
                        src={phantomScope1} 
                        alt="Players engaging with Phantom Footprint game" 
                        className="transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-[4px] bg-[#c8c4c0] group">
                      <OptimizedImage 
                        src={phantomScope3} 
                        alt="Final Phantom Footprint game board design" 
                        className="transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                  
                  {/* Bottom: Landscape image */}
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[4px] bg-[#c8c4c0] group">
                    <OptimizedImage 
                      src={phantomScope2} 
                      alt="Phantom Footprint product iterations and components" 
                      className="transition-transform duration-500 group-hover:scale-[1.02]"
                      objectFit="contain"
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Thank You */}
            <AnimatedSection>
              <div className="mt-16 py-24 flex items-center justify-center">
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-medium lowercase">thank you</h2>
              </div>
            </AnimatedSection>
          </section>

          {/* Next project */}
          <AnimatedSection>
            <div className="pt-16 border-t border-border">
              <Link 
                to="/#case-studies" 
                className="group flex items-center justify-between"
              >
                <div>
                  <p className="text-sm text-muted-foreground mb-2">next project</p>
                  <h3 className="font-display text-2xl md:text-3xl font-medium">explore more work</h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-[4px] border border-border transition-all duration-300 group-hover:bg-foreground group-hover:border-foreground">
                  <ArrowLeft className="h-5 w-5 rotate-180 transition-all duration-300 group-hover:text-background" />
                </div>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudyDetail;
