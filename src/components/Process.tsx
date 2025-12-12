const processSteps = [
  {
    number: '01',
    title: 'Research & Discovery',
    description:
      'Deep dive into user needs, market analysis, and stakeholder interviews to build a solid foundation.',
  },
  {
    number: '02',
    title: 'Ideation & Strategy',
    description:
      'Collaborative workshops and design thinking sessions to explore solutions and define direction.',
  },
  {
    number: '03',
    title: 'Design & Prototype',
    description:
      'High-fidelity designs and interactive prototypes that bring concepts to life for testing.',
  },
  {
    number: '04',
    title: 'Test & Iterate',
    description:
      'User testing and data-driven refinements to ensure the solution truly serves its purpose.',
  },
];

const Process = () => {
  return (
    <section id="process" className="bg-secondary/30 py-24 md:py-32">
      <div className="container">
        <div className="mb-16 max-w-2xl space-y-4">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Approach
          </p>
          <h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
            My all-encompassing approach that builds{' '}
            <span className="text-accent">impactful</span> outcomes.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {processSteps.map((step, index) => (
            <div
              key={step.number}
              className="group relative border-t border-border pt-8 transition-all duration-300 hover:border-accent"
            >
              <span className="absolute -top-3 left-0 bg-background px-2 font-display text-sm text-muted-foreground transition-colors group-hover:text-accent">
                {step.number}
              </span>
              <h3 className="mb-3 font-display text-2xl font-medium">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
