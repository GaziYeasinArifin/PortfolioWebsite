import { ArrowUpRight } from 'lucide-react';
import contactImage from '@/assets/contact-image.png';

const Contact = () => {
  return (
    <section id="contact" className="bg-foreground pt-24 text-primary-foreground md:pt-32 overflow-hidden">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary-foreground/60">
            Get in Touch
          </p>
          <h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl">
            Let's build <span className="bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 via-cyan-400 to-green-400 bg-clip-text text-transparent animate-[gradient_3s_ease-in-out_infinite] bg-[length:200%_auto]">meaningful</span> products together.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/70">
            If you're exploring a role, collaboration, or a complex design challenge, I'd be happy to connect.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:arifin.yeasin@gmail.com"
              className="group inline-flex items-center gap-2 rounded-[4px] border border-primary-foreground bg-primary-foreground px-7 py-3.5 text-sm font-medium text-foreground transition-all duration-300 hover:bg-transparent hover:text-primary-foreground hover:scale-[1.02] active:scale-[0.98]"
            >
              arifin.yeasin@gmail.com
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>
            <a
              href="mailto:arifin.yeasin@gmail.com?subject=Let's%20Book%20a%20Call"
              className="rounded-[4px] border border-primary-foreground/30 px-7 py-3.5 text-sm font-medium transition-all duration-300 hover:bg-primary-foreground hover:text-foreground hover:scale-[1.02] active:scale-[0.98]"
            >
              book a call
            </a>
          </div>
        </div>
      </div>
      <div className="relative w-screen left-1/2 -translate-x-1/2 mt-[50px]">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-foreground to-transparent z-10 pointer-events-none" />
        <img 
          src={contactImage} 
          alt="Contact visual" 
          className="w-full h-auto block object-cover object-bottom"
        />
      </div>
    </section>
  );
};

export default Contact;
