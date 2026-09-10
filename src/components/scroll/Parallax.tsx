import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { withMotionContext } from '@/lib/scroll';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /**
   * Layer speed as a multiple of scroll speed: 0.15 for backgrounds
   * (moves with scroll, slower than content), negative (e.g. -0.1) for
   * foreground labels drifting against scroll. Travel = speed × 320px.
   */
  speed?: number;
}

/**
 * Multi-layer parallax primitive (scroll-fx §3): the wrapper translates in Y
 * with scroll scrub between `top bottom` → `bottom top` of its parent
 * element. Give the wrapper extra vertical headroom (e.g. `-inset-y-[12%]`
 * inside an overflow-hidden frame) so the travel never exposes edges.
 * Reduced motion: the layer simply stays put.
 */
export default function Parallax({ children, className, speed = 0.15 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return withMotionContext(ref, () => {
      const travel = speed * 320;
      gsap.fromTo(
        el,
        { y: -travel },
        {
          y: travel,
          ease: 'none',
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    });
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
