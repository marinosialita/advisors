import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { withMotionContext } from '@/lib/scroll';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section progress hairline (scroll-fx §10): a 2px bronze rule fixed to the
 * very top of the viewport (above the navbar), scaleX driven by overall page
 * scroll progress. Gated to no-preference; hidden for reduced motion.
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return withMotionContext(ref, () => {
      ScrollTrigger.create({
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        onUpdate: (self) => {
          gsap.set(el, { scaleX: self.progress });
        },
      });
    });
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left scale-x-0 bg-bronze"
    />
  );
}
