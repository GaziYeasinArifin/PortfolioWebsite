const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-muted/40 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-muted/30 to-transparent blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-accent/5 to-muted/20 blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />
      </div>

      <div className="container relative z-10 flex min-h-screen flex-col justify-center py-32 lg:py-40">
        <div className="max-w-4xl">
          {/* Label */}
          <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground opacity-0 delay-100 mb-8">
            Interaction Designer
          </p>

          {/* Main headline */}
          <h1 className="animate-fade-up font-display text-4xl font-medium leading-[1.08] tracking-tight opacity-0 delay-200 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-8">
            I craft digital
            <br />
            experiences that
            <br />
            <span className="italic text-muted-foreground/70">resonate</span> with people.
          </h1>

          {/* Description */}
          <p className="animate-fade-up max-w-lg text-base leading-relaxed text-muted-foreground opacity-0 delay-300 mb-12 md:text-lg">
            Transforming complex problems into elegant, intuitive solutions through
            research-driven design and thoughtful interactions.
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-8 lg:left-12">
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="h-12 w-[1px] bg-border animate-pulse" />
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Scroll</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
