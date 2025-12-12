const Marquee = () => {
  const items = ['works', 'case studies', 'selected projects'];

  const MarqueeItem = ({ text }: { text: string }) => (
    <div className="inline-flex items-center gap-5 sm:gap-6 md:gap-8">
      <span className="font-display text-sm font-light tracking-wide text-muted-foreground/60 sm:text-base md:text-lg lg:text-xl whitespace-nowrap">
        {text}
      </span>
      <span className="text-muted-foreground/40 text-[5px] sm:text-[6px] flex-shrink-0">●</span>
    </div>
  );

  const MarqueeContent = () => (
    <div className="flex items-center gap-5 sm:gap-6 md:gap-8">
      {items.map((item, index) => (
        <MarqueeItem key={index} text={item} />
      ))}
    </div>
  );

  return (
    <section className="border-y border-border bg-secondary/50 py-8 sm:py-10 md:py-12 overflow-hidden">
      <div className="flex">
        <div className="marquee flex items-center gap-5 sm:gap-6 md:gap-8 shrink-0">
          <MarqueeContent />
          <MarqueeContent />
        </div>
        <div className="marquee flex items-center gap-5 sm:gap-6 md:gap-8 shrink-0" aria-hidden="true">
          <MarqueeContent />
          <MarqueeContent />
        </div>
      </div>
    </section>
  );
};

export default Marquee;
