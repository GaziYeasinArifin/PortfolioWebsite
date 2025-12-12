import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.svg';

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
    { label: 'Work', href: '#case-studies' },
    { label: 'Process', href: '#process' },
    { label: 'Articles', href: '#articles' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
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
            className="h-[38px] w-auto rounded-lg transition-transform duration-300 group-hover:scale-105" 
          />
          <span className="font-display text-lg font-semibold tracking-tight">
            Gazi Arifin
          </span>
        </a>

        {/* Middle: Navigation (Desktop) */}
        <nav className="hidden md:block absolute left-1/2 -translate-x-1/2">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="link-underline text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
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
            className="text-sm font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            Resume
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-transparent hover:text-foreground"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 text-foreground"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container py-6">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={handleNavClick}
                  className="block py-2 text-lg font-medium text-foreground transition-colors hover:text-muted-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-border flex flex-col gap-4">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Resume
            </a>
            <a
              href="#contact"
              onClick={handleNavClick}
              className="rounded-lg border border-foreground bg-foreground px-5 py-3 text-center text-sm font-medium text-primary-foreground transition-all hover:bg-transparent hover:text-foreground"
            >
              Let's Talk
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
