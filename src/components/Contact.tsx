import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';

/* ─── Magnetic Button ─── */
const MagneticButton = ({ children, href }: { children: React.ReactNode; href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const radius = 80;
    if (dist < radius) {
      setPos({ x: dx * 0.35, y: dy * 0.35 });
    } else {
      setPos({ x: 0, y: 0 });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPos({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: pos.x,
        y: pos.y,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.5 }}
      className={`
        relative z-10 inline-flex items-center gap-3 rounded-md px-10 py-5 text-base font-semibold
        transition-colors duration-500
        ${isHovered
          ? 'bg-[hsl(var(--cta-btn-hover-bg))] text-[hsl(var(--cta-btn-hover-text))]'
          : 'bg-[hsl(var(--cta-btn-bg))] text-[hsl(var(--cta-btn-text))]'
        }
      `}
    >
      {children}
      <ArrowUpRight className="h-5 w-5 transition-transform duration-300" style={{ transform: isHovered ? 'rotate(45deg)' : 'none' }} />
    </motion.a>
  );
};

/* ─── Copy Email Helper ─── */
const CopyEmailButton = () => {
  const email = 'arifin.yeasin@gmail.com';
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success('Copied!', { duration: 1500 });
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="relative z-10 inline-flex items-center gap-2 rounded-md border border-[hsl(var(--footer-border))] px-8 py-4 text-sm font-medium text-[hsl(var(--cta-text))] transition-all duration-300 hover:border-[hsl(var(--cta-text))] hover:bg-[hsl(var(--cta-text))]/5"
    >
      Copy Email
    </button>
  );
};

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="grainy-gradient relative overflow-hidden bg-[hsl(var(--cta-bg))] py-32 md:py-40"
    >
      {/* Radial gradient bg */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,hsla(225,60%,40%,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse,hsla(225,80%,50%,0.06)_0%,transparent_70%)]" />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-[hsl(var(--cta-text-sub))]"
          >
            Get in Touch
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl font-medium leading-[1.1] tracking-tight text-[hsl(var(--cta-text))] md:text-6xl lg:text-7xl"
          >
            Let's Build the Future
            <br />
            of AI Together.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto mt-6 max-w-xl text-lg text-[hsl(var(--cta-text-sub))]"
          >
            Currently based in San Francisco, available for leadership roles and strategic partnerships.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-5"
          >
            <MagneticButton href="mailto:arifin.yeasin@gmail.com">
              Say Hello
            </MagneticButton>
            <CopyEmailButton />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
