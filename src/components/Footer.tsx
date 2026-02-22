import { useState, useEffect, useCallback, forwardRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { ArrowUp, Linkedin, BookOpen, FileUser } from 'lucide-react';
import logoSvg from '@/assets/logo.svg';

const Footer = forwardRef<HTMLElement>((_, ref) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [currentTime, setCurrentTime] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'America/Los_Angeles',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    return scrollY.on('change', (v) => {
      setShowScrollTop(v > 600);
    });
  }, [scrollY]);

  const handleNavClick = useCallback(
    (href: string) => {
      if (!href.startsWith('/#')) {
        navigate(href);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const sectionId = href.substring(2);
      if (isHomePage) {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    },
    [isHomePage, navigate]
  );

  const navLinks = [
    { label: 'Work', href: '/#case-studies' },
    { label: 'About', href: '/about' },
    { label: 'Process', href: '/#process' },
    { label: 'Resume', href: '/Gazi_Arifin_Resume.pdf' },
  ];

  const socialLinks = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yeasin-arifin/', icon: Linkedin },
    { label: 'Medium', href: 'https://medium.com/@yeasinarifin', icon: BookOpen },
    { label: 'Read.cv', href: 'https://read.cv/gaziarifin', icon: FileUser },
  ];

  return (
    <>
      <footer
        ref={ref}
        className="grainy-gradient relative border-t border-[hsl(var(--footer-border))] bg-[hsl(var(--footer-bg))]"
      >
        <div className="container relative z-10 py-16 md:py-24">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Col 1 — Identity */}
            <div className="lg:col-span-1">
              <img src={logoSvg} alt="Gazi Arifin" className="no-border mb-4 h-8 w-auto brightness-0 invert" />
              <p className="text-sm leading-relaxed text-[hsl(var(--footer-text-muted))]">
                Product designer crafting intelligent systems at the intersection of AI, data, and human behavior.
              </p>
            </div>

            {/* Col 2 — Navigation */}
            <div>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-[hsl(var(--footer-text-muted))]">
                Navigation
              </h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    {link.href.endsWith('.pdf') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[hsl(var(--footer-text))]/70 transition-colors duration-200 hover:text-[hsl(var(--footer-link-hover))]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className="text-sm text-[hsl(var(--footer-text))]/70 transition-colors duration-200 hover:text-[hsl(var(--footer-link-hover))]"
                      >
                        {link.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Social */}
            <div>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-[hsl(var(--footer-text-muted))]">
                Connect
              </h3>
              <ul className="space-y-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-[hsl(var(--footer-text))]/70 transition-colors duration-200 hover:text-[hsl(var(--footer-link-hover))]"
                      >
                        <Icon className="h-4 w-4" />
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Col 4 — Status */}
            <div>
              <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.15em] text-[hsl(var(--footer-text-muted))]">
                Status
              </h3>
              <div className="space-y-4">
                <div className="rounded-card border border-[hsl(var(--footer-border))] bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2 text-xs text-[hsl(var(--footer-text-muted))]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    Open to opportunities
                  </div>
                  <p className="mt-2 text-xs text-[hsl(var(--footer-text-muted))]">
                    San Francisco, CA
                  </p>
                  <p className="mt-1 font-mono text-sm tabular-nums text-[hsl(var(--footer-text))]">
                    {currentTime} PST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[hsl(var(--footer-border))] pt-8 text-xs text-[hsl(var(--footer-text-muted))] md:flex-row">
            <p>© 2026 gazi. all rights reserved.</p>
            <p className="opacity-50">
              Designed with precision in San Francisco. Built for the next 22 million.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll-to-top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-md border border-white/10 bg-black/60 text-white backdrop-blur-xl transition-colors hover:bg-black/80"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
});

Footer.displayName = 'Footer';

export default Footer;
