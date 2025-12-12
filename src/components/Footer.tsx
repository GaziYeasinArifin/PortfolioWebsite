import { useState, useEffect } from 'react';

const Footer = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const pstTime = now.toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTime(pstTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { label: 'linkedin', href: '#' },
    { label: 'medium', href: '#' },
  ];

  const navLinks = [
    { label: 'work', href: '#case-studies' },
    { label: 'process', href: '#process' },
    { label: 'contact', href: '#contact' },
  ];

  return (
    <footer className="border-t border-border py-16 md:py-24">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1]">
              gazi arifin
            </h2>
            <p className="mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-muted-foreground font-display">PST</p>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-muted-foreground font-display tabular-nums">{currentTime}</p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="relative text-foreground transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              connect
            </h3>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="relative text-foreground transition-colors hover:text-foreground after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
          <p>© 2026 gazi. all rights reserved.</p>
          <p>designed & developed by gazi in san francisco</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
