import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { currentVelocity, withMotionContext } from '@/lib/scroll';

interface VelocitySkewProps {
  children: ReactNode;
  className?: string;
  /** max skewY in degrees (default 2.5) */
  max?: number;
}

/**
 * Velocity-reactive skew (scroll-fx §2): skews the wrapper ±`max`°
 * proportional to Lenis scroll velocity and eases back to 0 at rest.
 * Transform-only, sampled once per gsap tick. Apply to long scrolling
 * content (service lists, team grids) — never to pinned sections.
 * GSAP touches only this wrapper div, never the (Framer Motion) children.
 */
export default function VelocitySkew({ children, className, max = 2.5 }: VelocitySkewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return withMotionContext(ref, () => {
      const skewTo = gsap.quickTo(el, 'skewY', { duration: 0.5, ease: 'power2.out' });
      const clamp = gsap.utils.clamp(-max, max);
      let last = 0;

      const tick = () => {
        // ~48px/frame of velocity maps to the full `max` degrees
        const target = clamp(currentVelocity() * 0.052);
        if (Math.abs(target - last) < 0.01) return;
        last = target;
        skewTo(target);
      };

      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        gsap.set(el, { skewY: 0 });
      };
    });
  }, [max]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
