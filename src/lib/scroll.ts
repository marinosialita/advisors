import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared scroll state for velocity-reactive effects (scroll-fx layer).
 *
 * Layout owns the Lenis instance and reports every scroll event here via
 * `reportScroll()`. Velocity-driven primitives (VelocitySkew,
 * VelocityMarquee) read `scrollState` from gsap.ticker callbacks instead of
 * subscribing to Lenis directly, so sampling is frame-throttled and there is
 * a single source of truth. When Lenis is disabled (reduced motion) the
 * velocity simply stays 0 and the effects rest at their neutral state.
 */
export const scrollState = {
  /** Signed scroll velocity reported by Lenis (≈ px per frame). */
  velocity: 0,
  /** Scroll direction: 1 down, -1 up. */
  direction: 1,
  /** Timestamp (ms) of the last scroll event — used to decay stale velocity. */
  lastScrollAt: 0,
};

export function reportScroll(velocity: number, direction: number) {
  scrollState.velocity = velocity;
  scrollState.direction = direction >= 0 ? 1 : -1;
  scrollState.lastScrollAt = performance.now();
}

/**
 * Current velocity, decayed to 0 when Lenis has gone quiet (>120ms without
 * a scroll event). Signed: positive = scrolling down.
 */
export function currentVelocity(): number {
  if (performance.now() - scrollState.lastScrollAt > 120) return 0;
  return scrollState.velocity;
}

/**
 * Run GSAP scroll effects inside the project's standard guard:
 * `prefers-reduced-motion: no-preference` via gsap.matchMedia + a gsap.context
 * whose revert handles cleanup (tweens, ScrollTriggers, ticker callbacks).
 *
 * Returns the teardown function for the enclosing useEffect.
 */
export function withMotionContext(
  scope: React.RefObject<HTMLElement | null> | HTMLElement,
  setup: () => void | (() => void),
  conditions = '(prefers-reduced-motion: no-preference)',
): () => void {
  const mm = gsap.matchMedia();
  mm.add(conditions, () => {
    const ctx = gsap.context(setup, scope);
    return () => ctx.revert();
  });
  return () => mm.revert();
}

/** Refresh ScrollTrigger after layout-changing UI (accordions, drawers). */
export function refreshScrollTrigger() {
  ScrollTrigger.refresh();
}
