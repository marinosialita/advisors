import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { currentVelocity, scrollState, withMotionContext } from '@/lib/scroll';
import { cn } from '@/lib/utils';

interface VelocityMarqueeProps {
  children: ReactNode;
  className?: string;
  /** resting speed in px per frame (~60fps reference), default 0.9 */
  baseSpeed?: number;
  /** glide to a stop while the pointer hovers the track (GSAP mode) */
  pauseOnHover?: boolean;
}

/**
 * Scroll-velocity marquee (scroll-fx §8): renders the standard CSS
 * `animate-marquee` track by default; under `no-preference` GSAP takes over
 * — the track speeds up with Lenis scroll velocity and reverses direction
 * when scrolling up. Transform-only, one ticker per marquee. Reduced motion
 * keeps the CSS track, which the global reduced-motion sheet flattens.
 */
export default function VelocityMarquee({ children, className, baseSpeed = 0.9, pauseOnHover = false }: VelocityMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    return withMotionContext(trackRef, () => {
      track.style.animation = 'none';

      const setX = gsap.quickSetter(track, 'x', 'px') as (v: number) => void;
      let x = 0;
      let speed = baseSpeed;
      let dir = -1; // marquees travel right → left at rest
      let half = track.scrollWidth / 2;
      let hovered = false;

      const onResize = () => {
        half = track.scrollWidth / 2;
      };
      window.addEventListener('resize', onResize);
      const onEnter = () => {
        hovered = true;
      };
      const onLeave = () => {
        hovered = false;
      };
      if (pauseOnHover) {
        track.addEventListener('mouseenter', onEnter);
        track.addEventListener('mouseleave', onLeave);
      }

      const tick = (_time: number, deltaMs: number) => {
        if (half <= 0) half = track.scrollWidth / 2;
        const v = currentVelocity();
        // Velocity boost: brisk scrolling adds up to ~7px/frame
        let target = baseSpeed + Math.min(Math.abs(v) * 0.3, 7);
        if (hovered) target = 0;
        speed += (target - speed) * 0.08;
        // Reverse when scrolling up — eased so the flip glides
        const targetDir = scrollState.direction < 0 && Math.abs(v) > 0.5 ? 1 : -1;
        dir += (targetDir - dir) * 0.06;

        x += dir * speed * (deltaMs / 16.7);
        const wrap = gsap.utils.wrap(-half, 0);
        setX(wrap(x));
      };

      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        window.removeEventListener('resize', onResize);
        if (pauseOnHover) {
          track.removeEventListener('mouseenter', onEnter);
          track.removeEventListener('mouseleave', onLeave);
        }
        gsap.set(track, { clearProps: 'x' });
        track.style.animation = '';
      };
    });
  }, [baseSpeed, pauseOnHover]);

  return (
    <div ref={trackRef} className={cn('marquee-track flex w-max animate-marquee', className)}>
      {children}
    </div>
  );
}
