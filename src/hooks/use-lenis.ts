import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const useLenis = () => {
  useEffect(() => {
    if (lenisInstance) return;

    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    const raf = (time: number) => {
      lenisInstance?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Support anchor scrolling
    const handleAnchor = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        lenisInstance?.scrollTo(el as HTMLElement, { offset: 0 });
      }
    };
    document.addEventListener('click', handleAnchor);

    return () => {
      document.removeEventListener('click', handleAnchor);
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);
};

export const getLenis = () => lenisInstance;
