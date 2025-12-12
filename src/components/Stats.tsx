const stats = [
  { value: '8+', label: 'Years of Experience' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Happy Clients' },
  { value: '5', label: 'Design Awards' },
];

const Stats = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="mb-16 space-y-4">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Experience
          </p>
          <h2 className="max-w-3xl font-display text-3xl font-medium tracking-tight md:text-4xl">
            It's not just about existence. It's about{' '}
            <span className="text-accent">impact</span> and cultivating a legacy.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group border-l border-border pl-6 transition-colors hover:border-accent"
            >
              <span className="font-display text-5xl font-medium tracking-tight text-foreground transition-colors group-hover:text-accent md:text-6xl">
                {stat.value}
              </span>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
