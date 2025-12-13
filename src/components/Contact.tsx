import { ArrowUpRight } from 'lucide-react';
import contactImage from '@/assets/contact-image.png';

const Contact = () => {
  return (
    <section id="contact" className="bg-foreground py-24 text-primary-foreground md:py-32 overflow-hidden">
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
          <div className="mt-[50px] flex justify-center">
            <img 
              src={contactImage} 
              alt="Contact visual" 
              className="w-auto max-w-full animate-[zoomIn_0.8s_ease-out_forwards] origin-bottom"
              style={{
                animation: 'zoomIn 0.8s ease-out forwards',
              }}
            />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes zoomIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
