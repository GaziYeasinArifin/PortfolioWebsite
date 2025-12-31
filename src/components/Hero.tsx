import { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import heroBg from '@/assets/hero-bg.png';

const designerTypes = ['Interaction Designer', 'UX Designer', 'Product Designer'];

const taglineText = 'Driving adoption, efficiency, and measurable business impact.';

const subtitleText = 'I design and scale AI-driven iOS and SaaS products used by 850K+ monthly users, delivering $1.5M+ in annual cost savings and 35%+ adoption gains across complex systems.';

const stats = [
  { value: '10+', label: 'years designing production systems' },
  { value: '29+', label: 'shipped products across mobile & SaaS' },
  { value: '4', label: 'App Store Top-10 apps with multi-year rankings' },
  { value: '3', label: 'industry awards' },
];

const Hero = () => {
  const [currentDesignerIndex, setCurrentDesignerIndex] = useState(0);
  const [displayedDesigner, setDisplayedDesigner] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [taglineDisplayed, setTaglineDisplayed] = useState('');
  const [taglineStarted, setTaglineStarted] = useState(false);
  const [statsDisplayed, setStatsDisplayed] = useState<string[]>(['', '', '', '']);
  const [statsStarted, setStatsStarted] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Check if desktop
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Mouse tracking for parallax (desktop only)
  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const offsetX = (e.clientX - centerX) / rect.width;
      setMouseX(offsetX * 25);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDesktop]);

  // Designer type typewriter effect
  useEffect(() => {
    const currentWord = designerTypes[currentDesignerIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedDesigner.length < currentWord.length) {
          setDisplayedDesigner(currentWord.slice(0, displayedDesigner.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedDesigner.length > 0) {
          setDisplayedDesigner(displayedDesigner.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentDesignerIndex((prev) => (prev + 1) % designerTypes.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayedDesigner, isDeleting, currentDesignerIndex]);

  // Tagline typewriter effect - starts after delay
  useEffect(() => {
    const startDelay = setTimeout(() => {
      setTaglineStarted(true);
    }, 800);
    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (!taglineStarted) return;
    if (taglineDisplayed.length >= taglineText.length) {
      // Start stats animation after tagline completes
      setTimeout(() => setStatsStarted(true), 300);
      return;
    }

    const timeout = setTimeout(() => {
      setTaglineDisplayed(taglineText.slice(0, taglineDisplayed.length + 1));
    }, 25);

    return () => clearTimeout(timeout);
  }, [taglineDisplayed, taglineStarted]);

  // Stats typewriter effect
  useEffect(() => {
    if (!statsStarted) return;
    
    const allComplete = statsDisplayed.every((s, i) => s === `${stats[i].value}${stats[i].label}`);
    if (allComplete) return;

    const timeout = setTimeout(() => {
      setStatsDisplayed(prev => {
        return prev.map((current, i) => {
          const full = `${stats[i].value}${stats[i].label}`;
          if (current.length < full.length) {
            return full.slice(0, current.length + 1);
          }
          return current;
        });
      });
    }, 15);

    return () => clearTimeout(timeout);
  }, [statsDisplayed, statsStarted]);

  // Render subtitle with emphasized metrics (no typewriter)
  const renderSubtitle = () => {
    const metrics = ['850K+', '$1.5M+', '35%+'];
    let result = subtitleText;
    metrics.forEach(metric => {
      result = result.replace(metric, `<strong class="text-foreground font-medium">${metric}</strong>`);
    });
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  // Parse stat display to separate value and label
  const parseStatDisplay = (display: string, statIndex: number) => {
    const stat = stats[statIndex];
    const valueLength = stat.value.length;
    const displayedValue = display.slice(0, Math.min(display.length, valueLength));
    const displayedLabel = display.slice(valueLength);
    return { displayedValue, displayedLabel };
  };

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Background image with fade-in and x-axis parallax (desktop only) */}
      <div className="absolute inset-0 z-0 bg-image">
        <img 
          src={heroBg} 
          alt="" 
          className={`w-full object-contain object-top transition-all duration-1000 ease-out no-border ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            transform: isDesktop ? `translateX(${mouseX}px)` : 'none',
            transitionProperty: 'opacity, transform',
            transitionDuration: imageLoaded ? '300ms, 150ms' : '1000ms, 150ms',
          }}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background/60" />
      </div>

      <div className="container relative z-10 flex min-h-screen flex-col justify-center px-6 sm:px-8 lg:px-12 py-24 sm:py-28 md:py-32 lg:py-40">
        <div className="w-full flex flex-col gap-6 sm:gap-7 md:gap-8">
          {/* Label with typewriter animation */}
          <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground opacity-0 delay-100 min-h-[1.5em]">
            {displayedDesigner}
            <span className="animate-pulse">|</span>
          </p>

          {/* Main headline - ALL CAPS, justified full width */}
          <h1 className="font-display font-medium leading-[1.05] tracking-tight w-full">
            <span className="animate-fade-up block text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] opacity-0 delay-200 uppercase text-justify" style={{ textAlignLast: 'justify' }}>
              Product Design Leader
            </span>
            <span className="animate-fade-up block text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] opacity-0 delay-250 uppercase text-justify" style={{ textAlignLast: 'justify' }}>
              for AI-Powered Systems.
            </span>
            {/* Tagline with typewriter animation */}
            <span className="block text-muted-foreground/70 text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl mt-2 sm:mt-3 min-h-[1.5em]">
              {taglineDisplayed}
              {taglineDisplayed.length < taglineText.length && <span className="animate-pulse">|</span>}
            </span>
            {/* Subtitle - no typewriter */}
            <span className="block text-muted-foreground/70 text-base sm:text-lg md:text-lg lg:text-xl xl:text-xl mt-2">
              {renderSubtitle()}
            </span>
          </h1>

          {/* Description - 30% wider */}
          <p className="animate-fade-up max-w-3xl text-base sm:text-lg md:text-lg lg:text-xl leading-relaxed text-muted-foreground opacity-0 delay-300">
            I lead <span className="text-foreground font-medium">research</span>, <span className="text-foreground font-medium">interaction design</span>, and <span className="text-foreground font-medium">execution</span> for data-dense, technically complex products—partnering closely with <span className="text-foreground font-medium">engineering</span> and <span className="text-foreground font-medium">ML teams</span> from concept to scale.
          </p>

          {/* Stats with typewriter animation */}
          <div className="animate-fade-up flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 opacity-0 delay-350">
            {stats.map((stat, index) => {
              const { displayedValue, displayedLabel } = parseStatDisplay(statsDisplayed[index], index);
              return (
                <div key={stat.label} className="flex items-baseline gap-0">
                  <span className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-foreground">
                    {displayedValue}
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {displayedLabel}
                  </span>
                  {index < stats.length - 1 && (
                    <span className="hidden sm:block ml-4 sm:ml-6 md:ml-8 w-px h-4 bg-border" />
                  )}
                </div>
              );
            })}
          </div>

          {/* CTAs + Scroll indicator */}
          <div className="animate-fade-up flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 opacity-0 delay-400 mt-2 sm:mt-3 md:mt-4">
            <a
              href="#case-studies"
              className="group inline-flex items-center gap-3 rounded-[4px] border border-foreground bg-foreground px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-foreground hover:scale-[1.02] active:scale-[0.98]"
            >
              View Case Studies
              <ArrowDown className="w-4 h-4 transition-transform duration-300 -rotate-90 group-hover:rotate-0" />
            </a>
            <a
              href="#process"
              className="relative text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
            >
              Measurable Impact
            </a>
            
            {/* Scroll indicator - desktop only */}
            <a 
              href="#case-studies"
              className="hidden lg:flex items-center gap-3 ml-auto mr-0 text-muted-foreground transition-colors hover:text-foreground group"
            >
              <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Scroll</span>
              <div className="relative w-6 h-10 rounded-full border-2 border-current flex justify-center">
                <div className="absolute top-2 w-1 h-2 rounded-full bg-current animate-bounce" style={{ animationDuration: '1.5s' }} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
