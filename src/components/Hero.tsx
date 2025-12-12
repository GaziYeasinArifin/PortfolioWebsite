import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import heroBg from '@/assets/hero-bg.png';

const designerTypes = ['Interaction', 'UX', 'Product'];
const subtitleText = 'Shaping Next-Gen iOS, SaaS, & Intelligent Apps.';

const Hero = () => {
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [subtitleDisplayed, setSubtitleDisplayed] = useState('');
  const [subtitleStarted, setSubtitleStarted] = useState(false);

  // Designer type typewriter effect
  useEffect(() => {
    const currentWord = designerTypes[currentTypeIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTypeIndex((prev) => (prev + 1) % designerTypes.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTypeIndex]);

  // Subtitle typewriter effect - starts after delay
  useEffect(() => {
    const startDelay = setTimeout(() => {
      setSubtitleStarted(true);
    }, 800);
    return () => clearTimeout(startDelay);
  }, []);

  useEffect(() => {
    if (!subtitleStarted) return;
    if (subtitleDisplayed.length >= subtitleText.length) return;

    const timeout = setTimeout(() => {
      setSubtitleDisplayed(subtitleText.slice(0, subtitleDisplayed.length + 1));
    }, 30);

    return () => clearTimeout(timeout);
  }, [subtitleDisplayed, subtitleStarted]);

  // Render subtitle with italic styling on specific words
  const renderSubtitle = () => {
    const text = subtitleDisplayed;
    const italicWords = ['iOS', 'SaaS', 'Intelligent'];
    
    return text.split(/(\s+)/).map((part, index) => {
      const cleanPart = part.replace(/[,&.]/g, '');
      const isItalic = italicWords.some(word => cleanPart.includes(word));
      
      return (
        <span key={index} className={isItalic ? 'italic' : ''}>
          {part}
        </span>
      );
    });
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="" 
          className="w-full object-contain object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background/60" />
      </div>

      <div className="container relative z-10 flex min-h-screen flex-col justify-center px-6 sm:px-8 lg:px-12 py-24 sm:py-28 md:py-32 lg:py-40">
        <div className="max-w-5xl flex flex-col gap-6 sm:gap-7 md:gap-8">
          {/* Label with typewriter effect */}
          <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground opacity-0 delay-100">
            {displayText} Designer
          </p>

          {/* Main headline */}
          <h1 className="font-display font-medium leading-[1.05] tracking-tight">
            <span className="animate-fade-up block text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] opacity-0 delay-200">
              AI-First Product & Design Leader
            </span>
            <span className="block text-muted-foreground/70 text-xl sm:text-2xl md:text-3xl lg:text-[2rem] xl:text-[2.25rem] mt-2 sm:mt-3 min-h-[1.5em]">
              {renderSubtitle()}
            </span>
          </h1>

          {/* Description */}
          <p className="animate-fade-up max-w-2xl text-base sm:text-lg md:text-lg lg:text-xl leading-relaxed text-muted-foreground opacity-0 delay-300">
            With a background in Software Engineering (B.S.) and Interaction Design (M.A.). Led 5 design teams, built 27+ products, and focus on UX research with AI agents and vibe prototyping.
          </p>

          {/* CTAs + Scroll indicator */}
          <div className="animate-fade-up flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 opacity-0 delay-400 mt-2 sm:mt-3 md:mt-4">
            <a
              href="#case-studies"
              className="group inline-flex items-center gap-3 rounded-[4px] border border-foreground bg-foreground px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-foreground hover:scale-[1.02] active:scale-[0.98]"
            >
              view my work
              <ArrowDown className="w-4 h-4 transition-transform duration-300 -rotate-90 group-hover:rotate-0" />
            </a>
            <a
              href="#process"
              className="relative text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
            >
              learn my process
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
