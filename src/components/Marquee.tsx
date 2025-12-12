const Marquee = () => {
  const items = ['PROJECTS', 'CASE STUDIES', 'WORKS', 'SHOWCASE'];

  return (
    <section className="border-y border-border bg-secondary/50 py-8 overflow-hidden">
      <div className="flex">
        <div className="marquee">
          {[...items, ...items].map((item, index) => (
            <span key={index} className="flex items-center gap-8">
              <span className="font-display text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
                {item}
              </span>
              <span className="text-accent text-2xl">✦</span>
            </span>
          ))}
        </div>
        <div className="marquee" aria-hidden>
          {[...items, ...items].map((item, index) => (
            <span key={index} className="flex items-center gap-8">
              <span className="font-display text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
                {item}
              </span>
              <span className="text-accent text-2xl">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
