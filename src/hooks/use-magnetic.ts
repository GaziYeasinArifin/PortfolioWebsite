import { useRef, useState, useCallback, useEffect, useMemo } from 'react';

interface MagneticState {
  x: number;
  y: number;
  isHovered: boolean;
  glowX: number;
  glowY: number;
}

interface UseMagneticOptions {
  radius?: number;
  maxOffset?: number;
  parallaxOffset?: number;
}

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useMagnetic({
  radius = 100,
  maxOffset = 15,
  parallaxOffset = 5,
}: UseMagneticOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<MagneticState>({
    x: 0, y: 0, isHovered: false, glowX: 50, glowY: 50,
  });

  const disabled = useMemo(() => isTouchDevice() || prefersReducedMotion(), []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Glow position (percentage within card)
      const glowX = ((e.clientX - rect.left) / rect.width) * 100;
      const glowY = ((e.clientY - rect.top) / rect.height) * 100;

      if (dist < radius) {
        const factor = 1 - dist / radius;
        const x = Math.max(-maxOffset, Math.min(maxOffset, dx * factor * 0.3));
        const y = Math.max(-maxOffset, Math.min(maxOffset, dy * factor * 0.3));
        setState({ x, y, isHovered: true, glowX, glowY });
      } else {
        setState((prev) => ({ ...prev, x: 0, y: 0, glowX, glowY }));
      }
    },
    [disabled, radius, maxOffset],
  );

  const handleMouseEnter = useCallback(() => {
    if (!disabled) setState((prev) => ({ ...prev, isHovered: true }));
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    setState({ x: 0, y: 0, isHovered: false, glowX: 50, glowY: 50 });
  }, []);

  // Image parallax (opposite direction)
  const imageTransform = disabled
    ? {}
    : {
        x: -state.x * (parallaxOffset / maxOffset),
        y: -state.y * (parallaxOffset / maxOffset),
      };

  return {
    ref,
    disabled,
    cardAnimateProps: disabled
      ? {}
      : {
          x: state.x,
          y: state.y,
          scale: state.isHovered ? 1.02 : 1,
        },
    imageAnimateProps: imageTransform,
    glowStyle: {
      background: `radial-gradient(600px circle at ${state.glowX}% ${state.glowY}%, rgba(255,255,255,0.06), transparent 40%)`,
    } as React.CSSProperties,
    isHovered: state.isHovered,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
