import { useState, useEffect } from 'react';
import logo from '@/assets/logo.svg';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#case-studies' },
    { label: 'Process', href: '#process' },
    { label: 'Articles', href: '#articles' },
    { label: 'Contact', href: '#contact' },
  ];

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
            className="w-10 h-10 transition-transform duration-300 group-hover:scale-105" 
          />
          <span className="font-display text-lg font-semibold tracking-tight">
            Gazi Arifin
          </span>
        </a>

        {/* Middle: Navigation */}
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

        {/* Right: Resume + Let's Talk */}
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
            className="border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-transparent hover:text-foreground"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
