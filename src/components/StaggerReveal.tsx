import { ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
}

/**
 * Wraps children in a staggered fade+slide-up reveal triggered on scroll.
 * Each direct child is animated with an incremental delay.
 */
const StaggerReveal = ({
  children,
  className = '',
  stagger = 0.05,
  y = 24,
}: StaggerRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {Array.isArray(children) ? (
        children.map((child, i) => (
          <motion.div key={i} variants={item}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={item}>{children}</motion.div>
      )}
    </motion.div>
  );
};

export default StaggerReveal;
