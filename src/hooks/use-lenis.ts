// Lenis disabled for Safari performance — using native CSS smooth scrolling instead.
// Anchor scroll support preserved via native behavior.

import { useEffect } from 'react';

export const useLenis = () => {
  useEffect(() => {
    // Enable native smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    // Support anchor scrolling
    const handleAnchor = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    };
    document.addEventListener('click', handleAnchor);

    return () => {
      document.removeEventListener('click', handleAnchor);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
};

export const getLenis = () => null;
