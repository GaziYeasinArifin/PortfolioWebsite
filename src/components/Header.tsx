import { useState, useEffect } from 'react';

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
        isScrolled ? 'bg-background/90 backdrop-blur-md py-4' : 'py-6'
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#" className="font-display text-2xl font-semibold tracking-tight">
          Portfolio
        </a>
        <nav className="hidden md:block">
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
        <a
          href="#contact"
          className="hidden rounded-full border border-foreground bg-foreground px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-transparent hover:text-foreground md:block"
        >
          Let's Talk
        </a>
      </div>
    </header>
  );
};

export default Header;
