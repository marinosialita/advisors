import { useEffect, useState } from 'react';

/** Easing tokens from design.md §5 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];
export const EASE_IN_OUT_LUXE = [0.65, 0, 0.35, 1] as [number, number, number, number];

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** Reactive prefers-reduced-motion hook */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => prefersReducedMotion());

  useEffect(() => {
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/** True on coarse-pointer / no-hover devices (custom cursor hidden there) */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(hover: none), (pointer: coarse)').matches;
}
