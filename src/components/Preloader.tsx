import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { EASE_IN_OUT_LUXE } from '@/lib/motion';

interface PreloaderProps {
  /** fired when the split panels begin to part — pages stage hero reveals */
  onReveal: () => void;
  /** fired when the panels have fully exited — unmount the preloader */
  onDone: () => void;
}

/**
 * Preloader (design.md §6.1) — first visit only (Layout gates on
 * sessionStorage + reduced-motion). Ink screen, white logo, mono percentage
 * counter 00→100 over ~1.4s; on complete the logo scales 0.96 and the screen
 * splits into two panels parting left/right (0.9s luxe).
 */
export default function Preloader({ onReveal, onDone }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(false);
  const holdRef = useRef<number | null>(null);

  // Counter 00→100 over ~1.4s, also gated on fonts/hero readiness
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      // ease-out so the counter feels physical
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!doneRef.current) {
        doneRef.current = true;
        // hold a beat at 100 so the completed state lands before the part
        holdRef.current = window.setTimeout(() => {
          setExiting(true);
          onReveal();
        }, 200);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (holdRef.current) window.clearTimeout(holdRef.current);
    };
  }, [onReveal]);

  // Preload the hero image while the counter runs
  useEffect(() => {
    const img = new Image();
    img.src = '/assets/hero-planet.jpg';
  }, []);

  return (
    <div
      className="fixed inset-0 z-[400] flex"
      role="status"
      aria-label="Loading SC Advisors"
    >
      {/* split panels */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 bg-ink"
        animate={exiting ? { x: '-100%' } : { x: 0 }}
        transition={{ duration: 0.9, ease: EASE_IN_OUT_LUXE, delay: exiting ? 0.25 : 0 }}
      />
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 bg-ink"
        animate={exiting ? { x: '100%' } : { x: 0 }}
        transition={{ duration: 0.9, ease: EASE_IN_OUT_LUXE, delay: exiting ? 0.25 : 0 }}
        onAnimationComplete={() => {
          if (exiting) onDone();
        }}
      />

      {/* content layer */}
      <motion.div
        className="relative z-10 flex h-full w-full items-center justify-center"
        animate={exiting ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.img
          src="/assets/original/sc-advisors-logo-white.svg"
          alt="SC Advisors"
          className="h-7 w-auto"
          animate={exiting ? { scale: 0.96 } : { scale: 1 }}
          transition={{ duration: 0.4, ease: EASE_IN_OUT_LUXE }}
        />
        <div className="absolute bottom-8 left-8 font-mono text-sm tracking-nav text-bone/70">
          {String(count).padStart(2, '0')}
          <span className="text-bone/40"> / 100</span>
          {/* bronze progress hairline tracking the counter */}
          <span className="mt-3 block h-px w-28 bg-bone/15">
            <span
              className="block h-px w-full origin-left bg-bronze"
              style={{ transform: `scaleX(${count / 100})` }}
            />
          </span>
        </div>
        <div className="absolute bottom-8 right-8 font-mono text-[10px] uppercase tracking-eyebrow text-bone/40">
          Limassol — Cyprus
        </div>
      </motion.div>
    </div>
  );
}
