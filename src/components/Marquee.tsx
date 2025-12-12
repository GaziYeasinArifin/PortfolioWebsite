const Marquee = () => {
  const items = ['WORKS', 'CASE STUDIES', 'SELECTED PROJECTS'];

  return (
    <section className="border-y border-border bg-secondary/50 py-8 overflow-hidden">
      <div className="flex">
        <div className="marquee">
          {[...items, ...items].map((item, index) => (
            <span key={index} className="flex items-center gap-6">
              <span className="font-display text-xl font-medium tracking-tight text-muted-foreground/70 md:text-2xl lg:text-3xl">
                {item}
              </span>
              <span className="text-muted-foreground/50 text-sm">●</span>
            </span>
          ))}
        </div>
        <div className="marquee" aria-hidden>
          {[...items, ...items].map((item, index) => (
            <span key={index} className="flex items-center gap-6">
              <span className="font-display text-xl font-medium tracking-tight text-muted-foreground/70 md:text-2xl lg:text-3xl">
                {item}
              </span>
              <span className="text-muted-foreground/50 text-sm">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
