const Marquee = () => {
  const items = ['works', 'case studies', 'selected projects'];

  return (
    <section className="border-y border-border bg-secondary/50 py-12 overflow-hidden">
      <div className="flex">
        <div className="marquee">
          {[...items, ...items].map((item, index) => (
            <span key={index} className="flex items-center gap-6">
              <span className="font-display text-base font-light tracking-wide text-muted-foreground/60 md:text-lg lg:text-xl">
                {item}
              </span>
              <span className="text-muted-foreground/40 text-[6px]">●</span>
            </span>
          ))}
        </div>
        <div className="marquee" aria-hidden>
          {[...items, ...items].map((item, index) => (
            <span key={index} className="flex items-center gap-6">
              <span className="font-display text-base font-light tracking-wide text-muted-foreground/60 md:text-lg lg:text-xl">
                {item}
              </span>
              <span className="text-muted-foreground/40 text-[6px]">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
