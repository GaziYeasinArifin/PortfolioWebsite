import { ArrowUpRight } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="bg-foreground py-24 text-primary-foreground md:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary-foreground/60">
            Get in Touch
          </p>
          <h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
            Let's create something{' '}
            <span className="italic text-accent">extraordinary</span> together.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/70">
            Whether you have a project in mind or just want to chat about design,
            I'd love to hear from you.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:hello@portfolio.com"
              className="inline-flex items-center gap-2 rounded-full bg-primary-foreground px-7 py-3.5 text-sm font-medium text-foreground transition-all hover:bg-primary-foreground/90"
            >
              hello@portfolio.com
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="rounded-full border border-primary-foreground/20 px-7 py-3.5 text-sm font-medium transition-all hover:bg-primary-foreground/10"
            >
              Book a Call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
