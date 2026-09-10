import { memo, useEffect, useRef } from 'react';
import { isTouchDevice, prefersReducedMotion } from '@/lib/motion';

interface Ember {
  /** polar position around the planet centre */
  angle: number;
  /** radial distance from the planet centre (px) */
  dist: number;
  /** outward drift speed (px/frame @60fps) */
  radial: number;
  /** tangential swirl (rad/frame @60fps) */
  tangential: number;
  /** slow upward buoyancy (px/frame @60fps) */
  lift: number;
  /** dot radius (1–3.5 CSS px) */
  r: number;
  color: string;
  /** core colour for the hot centre */
  core: string;
  life: number;
  ttl: number;
  spark: boolean;
  wobbleAmp: number;
  wobbleFreq: number;
  wobblePhase: number;
  /** spring-back repulsion offset */
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  /** short position history for spark trails */
  trail: Array<{ x: number; y: number }>;
}

/** warm amber/orange palette sampled per ember */
const COLORS = ['#FFA04E', '#FF824D', '#E56A1E'];
const HOT_CORE = '#F5E6D0';
/** mouse repulsion radius (px) */
const REPEL_R = 90;

/**
 * Ember field (home hero): glowing amber/orange particles erupting from the
 * planet and drifting outward with a gentle orbital curl — a continuous soft
 * eruption. ~15% are brighter sparks with fading trails that fly further.
 * Additive blending ('lighter') for the glow. Soft spring repulsion around
 * the cursor and an eased ±8px mouse drift so the field feels glued to the
 * planet layer. Pure canvas + rAF; pauses off-screen/hidden; renders
 * nothing under prefers-reduced-motion.
 */
const EmberField = memo(function EmberField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const touch = isTouchDevice();

    let embers: Ember[] = [];
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    /** planet emission zone (matches NetworkRing anchor: 72% / 50%) */
    let cx = 0;
    let cy = 0;
    let emitR = 0;
    /** eased mouse-parallax drift (±8px) */
    let driftX = 0;
    let driftY = 0;
    let targetDriftX = 0;
    let targetDriftY = 0;
    /** cursor in canvas coords (NaN when absent) */
    let mouseX = NaN;
    let mouseY = NaN;

    const spawn = (e: Ember, preAge: boolean) => {
      e.angle = Math.random() * Math.PI * 2;
      e.dist = emitR * (0.55 + Math.random() * 0.45);
      e.spark = Math.random() < 0.15;
      e.radial = e.spark ? 0.35 + Math.random() * 0.35 : 0.15 + Math.random() * 0.35;
      e.tangential = (Math.random() - 0.5) * 0.008;
      e.lift = 0.05 + Math.random() * 0.12;
      e.r = e.spark ? 1.4 + Math.random() * 1.6 : 1 + Math.random() * 2.5;
      e.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      // occasional white-hot core on regular embers; sparks always burn hot
      e.core = e.spark || Math.random() < 0.3 ? HOT_CORE : e.color;
      e.ttl = 6 + Math.random() * 8;
      e.life = preAge ? Math.random() * e.ttl * 0.85 : 0;
      if (preAge) e.dist += e.radial * e.life * 60;
      e.wobbleAmp = 4 + Math.random() * 10;
      e.wobbleFreq = 0.6 + Math.random() * 1.4;
      e.wobblePhase = Math.random() * Math.PI * 2;
      e.ox = 0;
      e.oy = 0;
      e.vx = 0;
      e.vy = 0;
      e.trail.length = 0;
    };

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      if (!w || !h) return;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w * 0.72;
      cy = h * 0.5;
      emitR = w * 0.22;
      // ~70–110 desktop, reduced ~45 on small screens
      const mobile = w < 768;
      const count = mobile
        ? 45
        : Math.round(Math.min(110, Math.max(70, (w * h) / 22000)));
      embers = Array.from({ length: count }, () => {
        const e: Ember = {
          angle: 0,
          dist: 0,
          radial: 0,
          tangential: 0,
          lift: 0,
          r: 1,
          color: COLORS[0],
          core: HOT_CORE,
          life: 0,
          ttl: 1,
          spark: false,
          wobbleAmp: 0,
          wobbleFreq: 1,
          wobblePhase: 0,
          ox: 0,
          oy: 0,
          vx: 0,
          vy: 0,
          trail: [],
        };
        spawn(e, true);
        return e;
      });
    };

    /** base (un-repelled) position at current life */
    const basePos = (e: Ember, t: number) => {
      const wobble = Math.sin(e.wobblePhase + t * e.wobbleFreq) * e.wobbleAmp;
      return {
        x: cx + Math.cos(e.angle) * e.dist - Math.sin(e.angle) * wobble,
        y: cy + Math.sin(e.angle) * e.dist + Math.cos(e.angle) * wobble - e.lift * e.life * 60,
      };
    };

    const draw = (t: number, dt: number) => {
      // ease the parallax drift toward the mouse target
      driftX += (targetDriftX - driftX) * 0.04;
      driftY += (targetDriftY - driftY) * 0.04;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (const e of embers) {
        e.life += dt;
        if (e.life >= e.ttl || e.dist > emitR * (e.spark ? 3.2 : 2.4)) {
          spawn(e, false);
          continue;
        }
        e.dist += e.radial * dt * 60;
        e.angle += e.tangential * dt * 60;

        const p = basePos(e, t);

        // soft spring repulsion around the cursor
        if (!touch && !Number.isNaN(mouseX)) {
          const dx = p.x + e.ox - mouseX;
          const dy = p.y + e.oy - mouseY;
          const d2 = dx * dx + dy * dy;
          if (d2 < REPEL_R * REPEL_R && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = ((1 - d / REPEL_R) * 0.9 * dt * 60) / d;
            e.vx += dx * f;
            e.vy += dy * f;
          }
        }
        // spring the offset back to rest
        e.vx += -e.ox * 0.02 * dt * 60;
        e.vy += -e.oy * 0.02 * dt * 60;
        const damp = Math.pow(0.86, dt * 60);
        e.vx *= damp;
        e.vy *= damp;
        e.ox += e.vx * dt * 60;
        e.oy += e.vy * dt * 60;

        const x = p.x + e.ox + driftX;
        const y = p.y + e.oy + driftY;

        // fade in over the first 12%, out over the last 30%
        const lifeT = e.life / e.ttl;
        const alpha = Math.min(1, lifeT / 0.12) * Math.min(1, (1 - lifeT) / 0.3);
        if (alpha <= 0) continue;

        if (e.spark) {
          // fading streak through recent positions
          e.trail.push({ x, y });
          if (e.trail.length > 7) e.trail.shift();
          if (e.trail.length > 1) {
            for (let i = 1; i < e.trail.length; i++) {
              const segA = (alpha * (i / e.trail.length) * 0.55).toFixed(3);
              ctx.beginPath();
              ctx.moveTo(e.trail[i - 1].x, e.trail[i - 1].y);
              ctx.lineTo(e.trail[i].x, e.trail[i].y);
              ctx.strokeStyle = `rgba(246, 136, 42, ${segA})`;
              ctx.lineWidth = e.r * (0.3 + 0.5 * (i / e.trail.length));
              ctx.lineCap = 'round';
              ctx.stroke();
            }
          }
        }

        // soft radial glow
        const glowR = e.r * (e.spark ? 4.5 : 3.4);
        const g = ctx.createRadialGradient(x, y, 0, x, y, glowR);
        g.addColorStop(0, hexA(e.core, alpha * 0.9));
        g.addColorStop(0.4, hexA(e.color, alpha * 0.45));
        g.addColorStop(1, hexA(e.color, 0));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // hot dot core
        ctx.fillStyle = hexA(e.core, Math.min(1, alpha + 0.1));
        ctx.beginPath();
        ctx.arc(x, y, e.r * 0.55, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
    };

    let last = 0;
    const loop = (now: number) => {
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
      last = now;
      draw(now / 1000, dt);
      if (running) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || document.hidden) return;
      running = true;
      last = 0;
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

    // cursor: repulsion + ±8px parallax drift (fine pointers only)
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return;
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
      targetDriftX = (mouseX / r.width - 0.5) * 16;
      targetDriftY = (mouseY / r.height - 0.5) * 16;
    };
    const onLeave = () => {
      mouseX = NaN;
      mouseY = NaN;
      targetDriftX = 0;
      targetDriftY = 0;
    };
    if (!touch) {
      window.addEventListener('mousemove', onMove, { passive: true });
      document.documentElement.addEventListener('mouseleave', onLeave);
    }

    seed();
    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      if (!touch) {
        window.removeEventListener('mousemove', onMove);
        document.documentElement.removeEventListener('mouseleave', onLeave);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
});

/** '#RRGGBB' + alpha → rgba() string */
function hexA(hex: string, a: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, a)).toFixed(3)})`;
}

export default EmberField;
