const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { label: 'linkedin', href: '#' },
    { label: 'dribbble', href: '#' },
    { label: 'medium', href: '#' },
    { label: 'twitter', href: '#' },
  ];

  const navLinks = [
    { label: 'work', href: '#case-studies' },
    { label: 'process', href: '#process' },
    { label: 'articles', href: '#articles' },
    { label: 'contact', href: '#contact' },
  ];

  return (
    <footer className="border-t border-border py-16">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#" className="font-display text-2xl font-semibold tracking-tight">
              portfolio
            </a>
            <p className="mt-4 max-w-sm text-muted-foreground">
              Crafting meaningful digital experiences through thoughtful interaction design.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Connect
            </h3>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
          <p>© {currentYear} Portfolio. All rights reserved.</p>
          <p>Designed with care in San Francisco</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
