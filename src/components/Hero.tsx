import heroSculpture from '@/assets/hero-sculpture.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      <div className="container relative z-10 flex min-h-[calc(100vh-6rem)] flex-col justify-center py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-8">
            <p className="animate-fade-up text-sm font-medium uppercase tracking-widest text-muted-foreground opacity-0 delay-100">
              Interaction Designer
            </p>
            <h1 className="animate-fade-up font-display text-5xl font-medium leading-[1.1] tracking-tight opacity-0 delay-200 md:text-6xl lg:text-7xl">
              I craft digital experiences that{' '}
              <span className="italic text-accent">resonate</span> with people.
            </h1>
            <p className="animate-fade-up max-w-md text-lg leading-relaxed text-muted-foreground opacity-0 delay-300">
              Transforming complex problems into elegant, intuitive solutions through
              research-driven design and thoughtful interactions.
            </p>
            <div className="animate-fade-up flex flex-wrap items-center gap-4 opacity-0 delay-400">
              <a
                href="#case-studies"
                className="rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:bg-foreground/90"
              >
                View My Work
              </a>
              <a
                href="#process"
                className="link-underline text-sm font-medium"
              >
                Learn My Process
              </a>
            </div>
          </div>
          <div className="animate-fade-up relative aspect-square opacity-0 delay-500">
            <div className="image-reveal absolute inset-0 rounded-3xl bg-secondary">
              <img
                src={heroSculpture}
                alt="Abstract sculptural form representing creative design"
                className="h-full w-full rounded-3xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-widest">SCROLL</span>
          <div className="h-12 w-[1px] bg-border" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
