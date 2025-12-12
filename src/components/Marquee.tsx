const Marquee = () => {
  const MarqueeItem = () => (
    <div className="inline-flex items-center">
      <span className="text-muted-foreground/40 text-[5px] sm:text-[6px] flex-shrink-0 mx-5 sm:mx-6 md:mx-8">●</span>
      <span className="font-display text-sm font-light tracking-wide text-muted-foreground/60 sm:text-base md:text-lg lg:text-xl whitespace-nowrap">
        selected projects
      </span>
    </div>
  );

  const MarqueeContent = () => (
    <div className="flex items-center">
      {[...Array(6)].map((_, index) => (
        <MarqueeItem key={index} />
      ))}
    </div>
  );

  return (
    <section className="border-y border-border bg-secondary/50 py-8 sm:py-10 md:py-12 overflow-hidden group">
      <div className="flex">
        <div className="marquee flex items-center shrink-0 group-hover:[animation-play-state:paused]">
          <MarqueeContent />
          <MarqueeContent />
        </div>
        <div className="marquee flex items-center shrink-0 group-hover:[animation-play-state:paused]" aria-hidden="true">
          <MarqueeContent />
          <MarqueeContent />
        </div>
      </div>
    </section>
  );
};

export default Marquee;
