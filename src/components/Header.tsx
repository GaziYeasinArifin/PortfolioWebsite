import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Download, ArrowUpRight, Moon, Sun } from 'lucide-react';
import logo from '@/assets/logo.png';

const fullName = 'gazi yeasin arifin';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [displayedName, setDisplayedName] = useState('');
  const [showLogo, setShowLogo] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // In the new system-aware hero, the hero follows the system theme.
  // isDarkNav is true when on home page, not scrolled, AND system is in dark mode.
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const checkDark = () => setIsDarkMode(document.documentElement.classList.contains('dark'));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newDark = !isDarkMode;
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
    setIsDarkMode(newDark);
  };

  const isDarkNav = isHomePage && !isScrolled && isDarkMode;

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

  // Typewriter effect for logo and name
  useEffect(() => {
    const logoTimeout = setTimeout(() => {
      setShowLogo(true);
    }, 200);

    let currentIndex = 0;
    const startTyping = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex <= fullName.length) {
          setDisplayedName(fullName.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 60);
      return () => clearInterval(interval);
    }, 500);

    return () => {
      clearTimeout(logoTimeout);
      clearTimeout(startTyping);
    };
  }, []);

  const navLinks = [
    { label: 'works', href: '/#case-studies' },
    { label: 'about', href: '/about' },
    { label: 'contact', href: '/#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    if (!href.startsWith('/#')) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const sectionId = href.substring(2);
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleLogoClick = () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'nav-glass py-4'
            : isDarkNav
              ? 'py-6 bg-transparent'
              : 'py-6'
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Left: Logo + Name with typewriter */}
          <button onClick={handleLogoClick} className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Gazi Yeasin Arifin Logo" 
              className={`no-border h-[30px] w-auto transition-all duration-500 group-hover:scale-105 ${
                showLogo ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              } ${isDarkNav ? 'brightness-0 invert' : ''}`}
              style={isDarkNav ? { filter: 'brightness(0) invert(1)' } : undefined}
            />
            <span className={`font-display text-lg font-bold tracking-tight transition-all duration-300 inline-flex items-center ${
              isDarkNav ? 'text-white' : 'text-foreground'
            } group-hover:opacity-80`}>
              {displayedName}
              <span className={`inline-block w-[2px] h-[1.1em] ml-0.5 ${
                isDarkNav ? 'bg-white' : 'bg-foreground'
              } ${displayedName.length < fullName.length ? 'animate-pulse' : 'opacity-0'}`} />
            </span>
          </button>

          {/* Middle: Navigation (Desktop) */}
          <nav className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 gap-6">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`relative text-sm font-medium tracking-wide transition-all duration-300 ${
                      isDarkNav
                        ? 'text-white/60 hover:text-white after:bg-white'
                        : 'text-muted-foreground hover:text-foreground after:bg-foreground'
                    } after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-300 hover:after:w-full`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Available in SF badge (desktop) */}
            <div className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium border ${
              isDarkNav
                ? 'border-white/10 text-white/50'
                : 'border-surface-card-border text-muted-foreground'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Available in SF
            </div>
          </nav>

          {/* Right: Resume + Say Hi (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`relative flex items-center justify-center w-8 h-8 rounded-md transition-all duration-300 ${
                isDarkNav
                  ? 'text-white/60 hover:text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <Moon className={`w-[18px] h-[18px] absolute transition-all duration-300 ${isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
              <Sun className={`w-[18px] h-[18px] absolute transition-all duration-300 ${isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
            </button>
            <a
              href="/Gazi_Arifin_Resume.pdf"
              download="Gazi_Arifin_Resume.pdf"
              className={`group relative flex items-center gap-1.5 text-sm font-medium tracking-wide transition-all duration-300 ${
                isDarkNav
                  ? 'text-white/60 hover:text-white after:bg-white'
                  : 'text-muted-foreground hover:text-foreground after:bg-foreground'
              } after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:transition-all after:duration-300 hover:after:w-full`}
            >
              resume
              <Download className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              href="mailto:arifin.yeasin@gmail.com"
              className={`shimmer-button group rounded-[4px] px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                isDarkNav
                  ? 'bg-white text-[#050505] hover:bg-white/90'
                  : 'border border-foreground bg-foreground text-primary-foreground hover:bg-transparent hover:text-foreground'
              }`}
            >
              say hi <span className="inline-block group-hover:animate-[wave_0.5s_ease-in-out]">👋</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden relative flex items-center justify-center w-10 h-10 transition-all duration-300 hover:opacity-70 active:scale-95 ${
              isDarkNav && !isMobileMenuOpen ? 'text-white' : 'text-foreground'
            }`}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <Menu className={`w-6 h-6 absolute transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
            <X className={`w-6 h-6 absolute transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 backdrop-blur-md transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } ${isDarkNav ? 'bg-[#050505]/95' : 'bg-background/95'}`}
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
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`block py-4 text-2xl font-display font-medium transition-all duration-300 hover:opacity-60 hover:translate-x-2 text-left ${
                    isDarkNav ? 'text-white' : 'text-foreground'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          
          <div 
            className={`mt-auto flex flex-col gap-6 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: isMobileMenuOpen ? '300ms' : '0ms' }}
          >
            {/* Available in SF badge (mobile) */}
            <div className={`flex items-center gap-2 text-sm ${
              isDarkNav ? 'text-white/50' : 'text-muted-foreground'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              Available in San Francisco
            </div>

            <div className={`pt-4 border-t flex flex-col gap-4 ${
              isDarkNav ? 'border-white/10' : 'border-border/50'
            }`}>
              <button
                onClick={toggleTheme}
                className={`flex items-center gap-2 py-3 text-lg font-medium transition-all duration-300 hover:translate-x-2 ${
                  isDarkNav ? 'text-white/60 hover:text-white' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {isDarkMode ? 'light mode' : 'dark mode'}
              </button>
              <a
                href="/Gazi_Arifin_Resume.pdf"
                download="Gazi_Arifin_Resume.pdf"
                className={`flex items-center gap-2 py-3 text-lg font-medium transition-all duration-300 hover:translate-x-2 ${
                  isDarkNav ? 'text-white/60 hover:text-white' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                resume <Download className="w-4 h-4" />
              </a>
              <a
                href="mailto:arifin.yeasin@gmail.com"
                className={`shimmer-button group rounded-[4px] px-6 py-4 text-center text-base font-medium transition-all duration-300 active:scale-[0.98] ${
                  isDarkNav
                    ? 'bg-white text-[#050505] hover:bg-white/90'
                    : 'border border-foreground bg-foreground text-primary-foreground hover:bg-transparent hover:text-foreground'
                }`}
              >
                say hi <span className="inline-block group-hover:animate-[wave_0.5s_ease-in-out]">👋</span>
              </a>
            </div>

            {/* Social links (mobile) */}
            <div className="flex items-center gap-6 pt-2">
              <a
                href="https://linkedin.com/in/gaziarifin"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1 text-sm font-medium transition-all duration-300 ${
                  isDarkNav ? 'text-white/40 hover:text-white/80' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                LinkedIn <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://medium.com/@gaziarifin"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1 text-sm font-medium transition-all duration-300 ${
                  isDarkNav ? 'text-white/40 hover:text-white/80' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Medium <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
