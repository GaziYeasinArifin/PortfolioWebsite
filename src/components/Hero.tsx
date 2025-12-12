import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import heroBg from '@/assets/hero-bg.png';

const designerTypes = ['Interaction', 'UX', 'Product'];

const Hero = () => {
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = designerTypes[currentTypeIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          // Wait before starting to delete
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

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="" 
          className="w-full object-contain object-top"
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background/60" />
      </div>

      <div className="container relative z-10 flex min-h-screen flex-col justify-center py-32 lg:py-40">
        <div className="max-w-5xl">
          {/* Label with typewriter effect */}
          <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground opacity-0 delay-100 mb-8">
            <span className="inline-block min-w-[90px]">{displayText}</span>
            <span className="animate-pulse">|</span> Designer
          </p>

          {/* Main headline - 2 lines on desktop */}
          <h1 className="animate-fade-up font-display font-medium leading-[1.05] tracking-tight opacity-0 delay-200 mb-8">
            <span className="block text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl">AI-First Product & Design Leader</span>
            <span className="block italic text-muted-foreground/60 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl mt-2">Shaping Next-Gen iOS, SaaS, & Intelligent Apps.</span>
          </h1>

          {/* Description - 2 lines */}
          <p className="animate-fade-up max-w-2xl text-lg leading-relaxed text-muted-foreground opacity-0 delay-300 mb-12 md:text-xl lg:text-2xl">
            With a background in Software Engineering (B.S.) and Interaction Design (M.A.). Led 5 design teams, built 27+ products, and focus on UX research with AI agents and vibe prototyping.
          </p>

          {/* CTAs + Scroll indicator */}
          <div className="animate-fade-up flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 opacity-0 delay-400">
            <a
              href="#case-studies"
              className="group inline-flex items-center gap-3 rounded-lg border border-foreground bg-foreground px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-foreground hover:scale-[1.02] active:scale-[0.98]"
            >
              View My Work
              <ArrowDown className="w-4 h-4 transition-transform duration-300 -rotate-90 group-hover:rotate-0" />
            </a>
            <a
              href="#process"
              className="relative text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
            >
              Learn My Process
            </a>
            
            {/* Scroll indicator - desktop only, aligned with CTAs */}
            <a 
              href="#case-studies"
              className="hidden lg:flex items-center gap-3 ml-auto text-muted-foreground transition-colors hover:text-foreground group"
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
