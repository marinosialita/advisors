import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE_OUT_EXPO, usePrefersReducedMotion } from '@/lib/motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** extra delay in seconds */
  delay?: number;
  /** rise distance in px (ignored for reduced motion) */
  y?: number;
  /** clip reveal: content is unmasked from the bottom as it rises */
  clip?: boolean;
}

/**
 * Global scroll reveal (scroll-fx §1): fade + rise (optionally unmasked by
 * an overflow clip) once the block enters the viewport. Framer Motion only —
 * safe to wrap around any UI tree. Reduced-motion users get a plain fade.
 */
export default function Reveal({ children, className, delay = 0, y = 28, clip = false }: RevealProps) {
  const reduced = usePrefersReducedMotion();

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.85, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );

  if (!clip) return <div className={className}>{inner}</div>;

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { clipPath: 'inset(0% 0% 100% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE_OUT_EXPO }}
    >
      {inner}
    </motion.div>
  );
}
