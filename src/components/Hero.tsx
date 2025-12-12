import heroBg from '@/assets/hero-bg.png';

const Hero = () => {
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
          {/* Label */}
          <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground opacity-0 delay-100 mb-8">
            Interaction Designer
          </p>

          {/* Main headline - 2 lines on desktop */}
          <h1 className="animate-fade-up font-display text-5xl font-medium leading-[1.05] tracking-tight opacity-0 delay-200 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-8">
            Crafting Digital Experiences
            <br />
            <span className="italic text-muted-foreground/60">That Resonate.</span>
          </h1>

          {/* Description - 2 lines */}
          <p className="animate-fade-up max-w-2xl text-lg leading-relaxed text-muted-foreground opacity-0 delay-300 mb-12 md:text-xl lg:text-2xl">
            Transforming complex problems into elegant solutions
            <br className="hidden sm:block" />
            through research-driven design and thoughtful interactions.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 opacity-0 delay-400">
            <a
              href="#case-studies"
              className="group inline-flex items-center gap-3 rounded-lg bg-foreground px-6 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:scale-[1.02] hover:bg-foreground/90 active:scale-[0.98]"
            >
              View My Work
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#process"
              className="relative text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
            >
              Learn My Process
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator - right bottom */}
      <div className="absolute bottom-8 right-8 lg:right-12">
        <a 
          href="#case-studies"
          className="group flex flex-col items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
        >
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Scroll</span>
          <div className="relative w-6 h-10 rounded-full border-2 border-current flex justify-center">
            <div className="absolute top-2 w-1 h-2 rounded-full bg-current animate-bounce" style={{ animationDuration: '1.5s' }} />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
