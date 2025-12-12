const Marquee = () => {
  const items = ['works', 'case studies', 'selected projects'];

  const MarqueeContent = () => (
    <>
      {items.map((item, index) => (
        <span key={index} className="inline-flex items-center shrink-0">
          <span className="font-display text-sm font-light tracking-wide text-muted-foreground/60 sm:text-base md:text-lg lg:text-xl px-4 sm:px-5 md:px-6">
            {item}
          </span>
          <span className="text-muted-foreground/40 text-[5px] sm:text-[6px]">●</span>
        </span>
      ))}
    </>
  );

  return (
    <section className="border-y border-border bg-secondary/50 py-8 sm:py-10 md:py-12 overflow-hidden">
      <div className="flex">
        <div className="marquee flex shrink-0">
          <MarqueeContent />
          <MarqueeContent />
        </div>
        <div className="marquee flex shrink-0" aria-hidden="true">
          <MarqueeContent />
          <MarqueeContent />
        </div>
      </div>
    </section>
  );
};

export default Marquee;
