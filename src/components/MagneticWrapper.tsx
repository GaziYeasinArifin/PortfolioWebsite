import { useRef, useState, useCallback, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MagneticWrapperProps {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
  as?: 'div' | 'span';
}

const MagneticWrapper = ({
  children,
  strength = 0.35,
  radius = 80,
  className = '',
  as = 'div',
}: MagneticWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        setPos({ x: dx * strength, y: dy * strength });
      } else {
        setPos({ x: 0, y: 0 });
      }
    },
    [strength, radius]
  );

  const handleMouseLeave = useCallback(() => {
    setPos({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const Component = motion[as];

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: pos.x,
        y: pos.y,
        scale: isHovered ? 1.04 : 1,
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 18, mass: 0.4 }}
      className={className}
    >
      {children}
    </Component>
  );
};

export default MagneticWrapper;
