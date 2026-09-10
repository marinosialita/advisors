import { memo, useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

interface Star {
  x: number;
  y: number;
  /** size in CSS px (1–1.5) */
  r: number;
  /** base opacity */
  base: number;
  /** twinkle amplitude */
  amp: number;
  /** twinkle speed (rad/s) */
  speed: number;
  phase: number;
  bronze: boolean;
}

/**
 * Lightweight code-generated twinkling starfield (home hero). Pure canvas,
 * no deps: ~80–120 tiny stars with per-star opacity twinkle drawn via
 * requestAnimationFrame. Paused when off-screen (IntersectionObserver) or
 * when the tab is hidden; renders nothing under prefers-reduced-motion.
 */
const StarfieldCanvas = memo(function StarfieldCanvas({
  className,
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Reduced motion: no twinkle at all — the hero image carries the scene.
    if (prefersReducedMotion()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      if (!w || !h) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // ~100 stars on a desktop hero, clamped to the 80–120 brief
      const count = Math.round(Math.min(120, Math.max(80, (w * h) / 16000)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() < 0.85 ? 1 : 1.5,
        base: 0.15 + Math.random() * 0.3,
        amp: 0.15 + Math.random() * 0.35,
        speed: 0.4 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
        bronze: Math.random() < 0.22,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const alpha = s.base + s.amp * (0.5 + 0.5 * Math.sin(s.phase + t * s.speed));
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.fillStyle = s.bronze ? '#FF824D' : '#FFFFFF';
        ctx.fillRect(s.x, s.y, s.r, s.r);
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      draw(now / 1000);
      if (running) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Pause when the hero scrolls off-screen
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);

    // Pause when the tab is hidden
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    const ro = new ResizeObserver(seed);
    ro.observe(canvas);

    seed();
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
});

export default StarfieldCanvas;
