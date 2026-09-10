import { memo, useEffect, useRef } from 'react';
import { isTouchDevice, prefersReducedMotion } from '@/lib/motion';

interface Node {
  /** base angle on the ring (rad) */
  angle: number;
  /** radius in px at draw time (1.5–2.5) */
  r: number;
  /** pulse speed (rad/s) */
  speed: number;
  phase: number;
}

/** Ring inclination vs. the viewer (rad) — a flat, satellite-dish ellipse */
const TILT = 1.12;
/** One full orbit every 60s */
const OMEGA = (Math.PI * 2) / 60;

/**
 * Orbiting network ring (home hero): a code-generated canvas echo of the
 * original site's network-web concept — a slowly rotating wireframe
 * elliptical ring with glowing nodes joined by hairline bronze/amber arcs,
 * like a satellite lattice around the planet. Pure canvas + rAF; pauses
 * when off-screen or when the tab is hidden. Fully disabled on
 * reduced-motion, touch and small viewports (returns a blank canvas there).
 */
const NetworkRing = memo(function NetworkRing({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || isTouchDevice()) return;
    if (!window.matchMedia('(min-width: 768px)').matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let nodes: Node[] = [];
    let size = 0;
    let raf = 0;
    let running = false;
    let tiltX = 0; // eased mouse tilt (rad, ±6°)
    let tiltY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      if (!size) return;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = 10 + Math.floor(Math.random() * 5); // 10–14 nodes
      nodes = Array.from({ length: count }, (_, i) => ({
        angle: (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.3,
        r: 1.5 + Math.random(),
        speed: 0.5 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    /** Project a ring-plane point to screen space (orthographic, inclined ring) */
    const project = (a: number, orbit: number, rx: number, ry: number) => {
      const x = Math.cos(a + orbit) * rx;
      const flat = Math.sin(a + orbit) * ry;
      // mouse tilt nudges the projection, ±6°
      const y = flat * Math.cos(TILT + tiltX) - x * Math.sin(tiltY) * 0.35;
      return { x: size / 2 + x, y: size / 2 + y };
    };

    const draw = (t: number) => {
      const s = t / 1000;
      // ease the mouse tilt
      tiltX += (targetTiltX - tiltX) * 0.04;
      tiltY += (targetTiltY - tiltY) * 0.04;
      const orbit = s * OMEGA;
      const rx = size * 0.46;
      const ry = size * 0.46 * Math.abs(Math.cos(TILT)); // ellipse squash

      ctx.clearRect(0, 0, size, size);

      // wireframe ellipse
      ctx.beginPath();
      ctx.ellipse(size / 2, size / 2, rx, ry, tiltY * 0.35, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 130, 77, 0.16)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // node positions + depth (front of the ring = lower half of ellipse)
      const pts = nodes.map((n) => {
        const p = project(n.angle, orbit, rx, ry);
        const depth = 0.5 + 0.5 * Math.sin(n.angle + orbit); // 0 back, 1 front
        return { ...p, depth, n };
      });

      // hairline arcs joining neighbours along the ring
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        const b = pts[(i + 1) % pts.length];
        const alpha = 0.08 + 0.2 * Math.min(a.depth, b.depth);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(255, 130, 77, ${alpha.toFixed(3)})`;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      }

      // glowing nodes — soft pulse, brighter toward the front
      for (const p of pts) {
        const pulse = 0.55 + 0.45 * Math.sin(p.n.phase + s * p.n.speed);
        const alpha = (0.25 + 0.65 * p.depth) * pulse;
        const glow = p.n.r * 3.2;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glow);
        g.addColorStop(0, `rgba(255, 224, 196, ${(alpha * 0.9).toFixed(3)})`);
        g.addColorStop(0.45, `rgba(255, 130, 77, ${(alpha * 0.5).toFixed(3)})`);
        g.addColorStop(1, 'rgba(255, 130, 77, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glow, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, alpha + 0.15).toFixed(3)})`;
        ctx.fillRect(p.x - p.n.r / 2, p.y - p.n.r / 2, p.n.r, p.n.r);
      }
    };

    const loop = (now: number) => {
      draw(now);
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

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      if (!r.width) return;
      const mx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const my = (e.clientY - (r.top + r.height / 2)) / r.height;
      const max = (Math.PI / 180) * 6; // ±6°
      targetTiltY = Math.max(-max, Math.min(max, mx * max));
      targetTiltX = Math.max(-max, Math.min(max, my * max));
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    );
    io.observe(canvas);
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
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
});

export default NetworkRing;
