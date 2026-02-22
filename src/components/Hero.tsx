import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowDown, ArrowRight, MapPin } from 'lucide-react';

const designerTypes = ['Interaction', 'UX', 'Product'];

const stats = [
  { value: '850K+', label: 'Monthly Users' },
  { value: '$1.5M+', label: 'Savings Generated' },
  { value: '35%+', label: 'Adoption Gains' },
];

const Hero = () => {
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>();

  // Check if desktop
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Mouse tracking for mesh background + cursor light
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setMousePos({ x, y });
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    });
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDesktop, handleMouseMove]);

  // Typewriter effect
  useEffect(() => {
    const currentWord = designerTypes[currentTypeIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTypeIndex((prev) => (prev + 1) % designerTypes.length);
        }
      }
    }, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTypeIndex]);

  // Generative mesh background style
  const meshStyle = isDesktop ? {
    background: `
      radial-gradient(ellipse 600px 400px at ${mousePos.x}% ${mousePos.y}%, rgba(0,102,255,0.08) 0%, transparent 70%),
      radial-gradient(ellipse 500px 500px at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(0,212,255,0.06) 0%, transparent 70%),
      radial-gradient(ellipse 400px 300px at ${mousePos.x * 0.5 + 25}% ${mousePos.y * 0.5 + 25}%, rgba(0,102,255,0.04) 0%, transparent 70%),
      linear-gradient(180deg, #050505 0%, #0a0a0a 100%)
    `,
    transition: 'background 0.3s ease-out',
  } : {
    background: `
      radial-gradient(ellipse 600px 400px at 30% 40%, rgba(0,102,255,0.06) 0%, transparent 70%),
      radial-gradient(ellipse 500px 500px at 70% 60%, rgba(0,212,255,0.04) 0%, transparent 70%),
      linear-gradient(180deg, #050505 0%, #0a0a0a 100%)
    `,
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden"
      style={meshStyle}
    >
      {/* AI Cursor trailing light - desktop only */}
      {isDesktop && (
        <div
          className="pointer-events-none absolute z-10 rounded-full opacity-30"
          style={{
            width: 250,
            height: 250,
            left: cursorPos.x - 125,
            top: cursorPos.y - 125,
            background: 'radial-gradient(circle, rgba(0,102,255,0.15) 0%, transparent 70%)',
            transition: 'left 0.15s ease-out, top 0.15s ease-out',
            willChange: 'left, top',
          }}
        />
      )}

      {/* Content */}
      <div className="container relative z-20 flex min-h-screen flex-col items-center justify-center px-6 sm:px-8 lg:px-12 py-24 sm:py-28 md:py-32 lg:py-40 text-center">
        <div className="flex flex-col items-center gap-6 sm:gap-7 md:gap-8 max-w-4xl">
          
          {/* Label with typewriter effect */}
          <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.3em] opacity-0 delay-100"
             style={{ color: '#888' }}>
            {displayText}<span className="animate-pulse">|</span> Designer
          </p>

          {/* Main headline */}
          <h1 className="font-display font-bold leading-[1.05] tracking-tight">
            <span className="animate-fade-up block text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] opacity-0 delay-200 uppercase"
                  style={{ color: '#FAFAFA' }}>
              Product Design Leader
            </span>
            <span className="animate-fade-up block text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.5rem] opacity-0 delay-250 uppercase"
                  style={{ color: '#FAFAFA' }}>
              For <span className="hero-gradient-text">AI-Powered</span> Systems
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="animate-fade-up max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed opacity-0 delay-300"
             style={{ color: '#888' }}>
            Driving adoption and <span style={{ color: '#FAFAFA' }} className="font-medium">$1.5M+</span> in measurable impact through high-scale iOS and SaaS systems.
          </p>

          {/* Bento Grid Stats */}
          <div className="animate-fade-up grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-xl opacity-0 delay-350">
            {stats.map((stat) => (
              <div key={stat.label} className="hero-glass-card rounded-lg px-5 py-4 text-center">
                <div className="font-display text-2xl sm:text-3xl font-bold" style={{ color: '#FAFAFA' }}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm mt-1" style={{ color: '#666' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="animate-fade-up flex flex-col sm:flex-row items-center gap-4 sm:gap-6 opacity-0 delay-400 mt-2">
            <a
              href="#case-studies"
              className="group inline-flex items-center gap-3 rounded-[4px] px-6 py-3.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                backgroundColor: '#0066FF',
                color: '#FAFAFA',
                boxShadow: '0 0 20px rgba(0,102,255,0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0,102,255,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0,102,255,0.2)';
              }}
            >
              View Case Studies
              <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#process"
              className="group inline-flex items-center gap-2 rounded-[4px] px-6 py-3.5 text-sm font-medium transition-all duration-300 hover:scale-[1.02]"
              style={{
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#FAFAFA',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              }}
            >
              Learn My Process
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Location Badge */}
          <div className="animate-fade-up flex items-center gap-2 opacity-0 delay-500 mt-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" style={{ animation: 'hero-dot-pulse 2s ease-in-out infinite' }} />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs tracking-wider uppercase" style={{ color: '#555' }}>
              Now in San Francisco
            </span>
          </div>

          {/* Scroll indicator */}
          <a
            href="#case-studies"
            className="hidden lg:flex items-center gap-3 mt-8 group transition-opacity hover:opacity-80 animate-fade-up opacity-0 delay-600"
            style={{ color: '#555' }}
          >
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Scroll</span>
            <div className="relative w-5 h-8 rounded-full border border-current flex justify-center">
              <div className="absolute top-1.5 w-0.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDuration: '1.5s' }} />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
