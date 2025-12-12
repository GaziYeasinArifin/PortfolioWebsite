import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { label: 'works', href: '#case-studies' },
    { label: 'process', href: '#process' },
    { label: 'articles', href: '#articles' },
    { label: 'contact', href: '#contact' },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-background/95 backdrop-blur-md py-4' : 'py-6'
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Left: Logo + Name */}
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Gazi Arifin Logo" 
              className="h-[38px] w-auto rounded-lg transition-all duration-300 group-hover:scale-105 group-hover:opacity-80" 
            />
            <span className="font-display text-lg font-semibold tracking-tight transition-opacity duration-300 group-hover:opacity-70">
              gazi arifin
            </span>
          </a>

          {/* Middle: Navigation (Desktop) */}
          <nav className="hidden md:block absolute left-1/2 -translate-x-1/2">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="relative text-sm font-medium tracking-wide text-muted-foreground transition-all duration-300 hover:text-foreground after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: Resume + Let's Talk (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-sm font-medium tracking-wide text-muted-foreground transition-all duration-300 hover:text-foreground after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
            >
              resume
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-foreground hover:scale-[1.02] active:scale-[0.98]"
            >
              say hi 👋
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative flex items-center justify-center w-10 h-10 text-foreground transition-all duration-300 hover:opacity-70 active:scale-95"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <Menu className={`w-6 h-6 absolute transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
            <X className={`w-6 h-6 absolute transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: isScrolled ? '64px' : '80px' }}
      >
        <nav className="container h-full flex flex-col pt-12 pb-8">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <li 
                key={link.label}
                className={`transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: isMobileMenuOpen ? `${index * 75}ms` : '0ms' }}
              >
                <a
                  href={link.href}
                  onClick={handleNavClick}
                  className="block py-4 text-2xl font-display font-medium text-foreground transition-all duration-300 hover:opacity-60 hover:translate-x-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div 
            className={`mt-auto pt-8 border-t border-border/50 flex flex-col gap-4 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: isMobileMenuOpen ? '300ms' : '0ms' }}
          >
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavClick}
              className="py-3 text-lg font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-2"
            >
              resume
            </a>
            <a
              href="#contact"
              onClick={handleNavClick}
              className="rounded-lg border border-foreground bg-foreground px-6 py-4 text-center text-base font-medium text-primary-foreground transition-all duration-300 hover:bg-transparent hover:text-foreground active:scale-[0.98]"
            >
              say hi 👋
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
