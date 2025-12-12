const testimonials = [
  {
    id: 1,
    quote:
      "Working with this designer transformed our product. The attention to detail and user-centric approach resulted in a 40% increase in engagement.",
    author: 'Sarah Chen',
    role: 'CEO, TechStart',
  },
  {
    id: 2,
    quote:
      "An exceptional collaborator who truly understands how to balance business goals with user needs. Our conversion rate doubled.",
    author: 'Marcus Johnson',
    role: 'Head of Product, FinanceApp',
  },
  {
    id: 3,
    quote:
      "The design system delivered was not just beautiful but incredibly scalable. It's been the foundation of our product for three years.",
    author: 'Elena Rodriguez',
    role: 'CTO, DataViz Inc',
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="mb-16 space-y-4">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Testimonials
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-medium tracking-tight md:text-4xl">
            Satisfaction isn't one-sided. It's about building solutions that{' '}
            <span className="text-accent">truly work</span> for all.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
            className="card-hover rounded-lg border border-border bg-card p-8"
            >
              <blockquote className="mb-8 font-display text-lg italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-secondary" />
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
