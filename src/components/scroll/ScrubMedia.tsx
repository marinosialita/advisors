import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { withMotionContext } from '@/lib/scroll';

interface ScrubMediaProps {
  children: ReactNode;
  className?: string;
  /** starting scale while the block enters the viewport (default 1.15) */
  scaleFrom?: number;
  /** starting rotation in degrees, ≤1.5 (default -1.2; 0 disables) */
  rotateFrom?: number;
}

/**
 * Scroll-driven media settle (scroll-fx §6): the wrapped image subtly scales
 * (1.15→1) and de-rotates (≤1.5deg→0) with scrub as it travels through the
 * viewport. Transform-only; pair with an overflow-hidden frame. Reduced
 * motion: media renders at rest.
 */
export default function ScrubMedia({
  children,
  className,
  scaleFrom = 1.15,
  rotateFrom = -1.2,
}: ScrubMediaProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return withMotionContext(ref, () => {
      gsap.fromTo(
        el,
        { scale: scaleFrom, rotation: rotateFrom },
        {
          scale: 1,
          rotation: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'top 30%',
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    });
  }, [scaleFrom, rotateFrom]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
