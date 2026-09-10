import { memo, useContext, useEffect, useRef, type MouseEvent as ReactMouseEvent } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AppReadyContext } from '@/components/app-ready-context';
import EmberField from '@/components/EmberField';
import MagneticButton from '@/components/MagneticButton';
import NetworkRing from '@/components/NetworkRing';
import SplitWords, { MaskWord } from '@/components/SplitWords';
import StarfieldCanvas from '@/components/StarfieldCanvas';
import VelocitySkew from '@/components/scroll/VelocitySkew';
import Reveal from '@/components/scroll/Reveal';
import { isTouchDevice, usePrefersReducedMotion } from '@/lib/motion';
import { TEAM, CONTACT } from '@/data/site';
import { INSIGHTS } from '@/data/insights';
import {
  LegalServicesIcon,
  PrivateServicesIcon,
  CorporateServicesIcon,
  FinancialServicesIcon,
} from '@/components/ServiceIcons';

gsap.registerPlugin(ScrollTrigger);
/* The mobile URL bar collapsing/expanding mid-scroll fires a resize that
   makes scrubbed ScrollTriggers re-measure and jump (the hero planet
   "vanishing" for no reason). Ignore that pseudo-resize on touch devices. */
ScrollTrigger.config({ ignoreMobileResize: true });

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const STATS = [
  { target: 2014, suffix: '', label: 'Trusted experts since' },
  { target: 200, suffix: '+', label: 'Companies trusted us' },
  { target: 100, suffix: '+', label: 'Family offices & private clients' },
  {
    target: 15,
    suffix: '',
    label: 'Regions served worldwide',
  },
];

const PILLARS = [
  {
    index: '01',
    title: 'Legal Services',
    desc: "We guarantee legal support at all stages of the transaction, with our clients' protection as our number one goal.",
    to: '/for-corporates/legal',
    image: '/assets/pillar-legal.jpg',
    imageAlt: 'Glowing orange scales of justice on black — legal services',
    Icon: LegalServicesIcon,
  },
  {
    index: '02',
    title: 'Private Services',
    desc: 'We work with (ultra) high-net-worth individuals and family offices to help maximise opportunities and protect assets.',
    to: '/for-private-clients',
    image: '/assets/pillar-private.jpg',
    imageAlt: 'Glowing orange crescent arc embracing an orb on black — private client services',
    Icon: PrivateServicesIcon,
  },
  {
    index: '03',
    title: 'Corporate Services',
    desc: 'Encompassing a wide range of solutions for companies seeking relocation, formation or administrative services.',
    to: '/for-corporates',
    image: '/assets/pillar-corporate.jpg',
    imageAlt: 'Glowing orange geometric monolith towers on black — corporate services',
    Icon: CorporateServicesIcon,
  },
  {
    index: '04',
    title: 'Financial Services',
    desc: 'We offer a high level of expertise and care in the fields of banking, tax residency and asset protection.',
    to: '/for-corporates/banking',
    image: '/assets/pillar-financial.jpg',
    imageAlt: 'Luminous ascending orange curve on black — financial services',
    Icon: FinancialServicesIcon,
  },
];

/* ------------------------------------------------------------------ */
/* Perpetual micro-animations (isolated + memoised per react-dev.md)   */
/* ------------------------------------------------------------------ */

const ScrollIndicator = memo(function ScrollIndicator() {
  return (
    <div className="js-hero-scroll flex flex-col items-center gap-3">
      <span className="font-mono text-[10px] uppercase tracking-eyebrow text-bone/70">
        Scroll
      </span>
      <span className="js-scroll-line relative block h-12 w-px origin-top overflow-hidden bg-bone/25">
        <span className="absolute left-0 top-0 h-2 w-px animate-scroll-dot bg-bronze" />
      </span>
    </div>
  );
});

const MotionLink = motion(Link);

/**
 * S1 — circular "LET'S TALK" CTA (original-site trait): warm amber-bronze
 * disc with a magnetic pull (attract radius 70px, ≤10px travel, spring
 * back), a GSAP-driven breathing scale (1→1.04, 3s yoyo — see the hero
 * effect) and a soft bronze halo. On hover a thin bone ring draws around it.
 * Reduced motion: no magnet, no breathing (GSAP matchMedia-gated), no ring.
 */
const TalkCTA = memo(function TalkCTA() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14 });
  const sy = useSpring(y, { stiffness: 180, damping: 14 });

  /* True magnetic field: listen at window level so the disc starts
     attracting while the cursor is still ~70px outside its bounds. */
  useEffect(() => {
    if (reduced || isTouchDevice()) return;
    const onMove = (e: globalThis.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(relX, relY);
      const radius = 70 + Math.max(rect.width, rect.height) / 2;
      if (dist < radius) {
        const strength = 10 * (1 - dist / radius) + 1.5;
        x.set(Math.max(-10, Math.min(10, (relX / (rect.width / 2)) * strength)));
        y.set(Math.max(-10, Math.min(10, (relY / (rect.height / 2)) * strength)));
      } else {
        x.set(0);
        y.set(0);
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced, x, y]);

  return (
    <MotionLink
      ref={ref}
      to="/contact"
      aria-label="Let's talk — contact SC Advisors"
      style={{ x: sx, y: sy }}
      className="group/talk relative block h-[clamp(120px,11vw,140px)] w-[clamp(120px,11vw,140px)]"
    >
      {/* breathing group — GSAP owns the scale on this wrapper */}
      <span className="js-talk-breath absolute inset-0 will-change-transform">
        {/* soft bronze glow halo */}
        <span
          aria-hidden="true"
          className="absolute -inset-9 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255,130,77,0.38) 0%, rgba(255,130,77,0.14) 46%, rgba(255,130,77,0) 70%)',
          }}
        />
        {/* disc */}
        <span className="absolute inset-0 rounded-full bg-[#FF824D] shadow-[0_18px_50px_rgba(255,130,77,0.35)] transition-colors duration-300 ease-out-expo group-hover/talk:bg-bronze-deep" />
        {/* label */}
        <span className="relative z-10 flex h-full w-full items-center justify-center font-mono text-[11px] font-medium uppercase tracking-nav text-bone">
          Let&rsquo;s Talk
        </span>
      </span>
      {/* thin bone ring draws on hover (stroke-dashoffset draw) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="pointer-events-none absolute -inset-2.5 h-[calc(100%+20px)] w-[calc(100%+20px)] -rotate-90 motion-reduce:hidden"
      >
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          pathLength={1}
          className="[stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-700 ease-out-expo group-hover/talk:[stroke-dashoffset:0]"
        />
      </svg>
    </MotionLink>
  );
});

/* S2 audience panels — cursor-following bronze spotlight (desktop only;
   pure CSS vars, zero re-renders) */
function handleSpotlight(e: ReactMouseEvent<HTMLDivElement>) {
  if (isTouchDevice()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}

function Spotlight({ tone }: { tone: 'dark' | 'light' }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-out-expo group-hover:opacity-100"
      style={{
        background: `radial-gradient(460px circle at var(--mx, 50%) var(--my, 50%), rgba(255,130,77,${
          tone === 'dark' ? '0.16' : '0.13'
        }), transparent 65%)`,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  const ready = useContext(AppReadyContext);
  const rootRef = useRef<HTMLDivElement>(null);
  const teamRowRef = useRef<HTMLDivElement>(null);

  /* ---- GSAP scroll storytelling (guarded for reduced motion) -------- */
  useEffect(() => {
    if (!ready || !rootRef.current) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const cleanups: Array<() => void> = [];
        /* Nested breakpoint contexts (S4 horizontal pin) — reverted with ctx */
        const mmInner = gsap.matchMedia();
        cleanups.push(() => mmInner.revert());

        /* S1 — hero load-in (runs after preloader): the planet scene rises
           out of the preloader's ink screen, then copy reveals */
        const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
        intro
          .fromTo(
            '.js-hero-bg',
            { opacity: 0, scale: 1.04 },
            { opacity: 1, scale: 1, duration: 1.6 },
            0,
          )
          .fromTo('.js-hero-scrim', { opacity: 0 }, { opacity: 1, duration: 0.9 }, 0)
          .fromTo(
            '.js-hero-stars',
            { opacity: 0 },
            { opacity: 1, duration: 2.2, ease: 'power1.out' },
            0.4,
          )
          .fromTo(
            '.js-hero-embers',
            { opacity: 0 },
            { opacity: 1, duration: 2.4, ease: 'power1.out' },
            0.6,
          )
          .fromTo(
            '.js-hero .js-word',
            { yPercent: 110 },
            { yPercent: 0, duration: 1.2, stagger: 0.05 },
            0.15,
          )
          .fromTo(
            '.js-hero-fade',
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 },
            0.45,
          )
          .fromTo(
            '.js-scroll-line',
            { scaleY: 0 },
            { scaleY: 1, duration: 1, ease: 'power2.out' },
            0.9,
          );

        /* S1 — cinematic drift: barely-there scale breathing, 20s yoyo */
        gsap.fromTo(
          '.js-hero-drift',
          { scale: 1 },
          { scale: 1.08, duration: 20, ease: 'sine.inOut', yoyo: true, repeat: -1 },
        );

        /* S1 — LET'S TALK circle: continuous breathing scale, 3s yoyo */
        gsap.fromTo(
          '.js-talk-breath',
          { scale: 1 },
          { scale: 1.04, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 },
        );

        /* S1 — mouse parallax on the planet layer (±14px, eased; fine pointers only) */
        const heroEl = rootRef.current?.querySelector('.js-hero');
        const planetLayer = rootRef.current?.querySelector('.js-hero-mouse');
        if (heroEl && planetLayer && !isTouchDevice()) {
          const px = gsap.quickTo(planetLayer, 'x', { duration: 1.2, ease: 'power3.out' });
          const py = gsap.quickTo(planetLayer, 'y', { duration: 1.2, ease: 'power3.out' });
          const onMove = (e: Event) => {
            const me = e as MouseEvent;
            const r = (heroEl as HTMLElement).getBoundingClientRect();
            px(((me.clientX - r.left) / r.width - 0.5) * 28);
            py(((me.clientY - r.top) / r.height - 0.5) * 20);
          };
          heroEl.addEventListener('mousemove', onMove);
          cleanups.push(() => heroEl.removeEventListener('mousemove', onMove));
        }

        /* S1 — scroll parallax */
        gsap.to('.js-hero-bg', {
          y: 120,
          ease: 'none',
          scrollTrigger: { trigger: '.js-hero', start: 'top top', end: 'bottom top', scrub: true },
        });
        /* S1 — cinematic exit: the hero dissolves instead of scrolling away.
           The planet must stay present for most of the scroll-out — it only
           dims in the LAST 55% and never below 0.4 opacity, so it never
           "disappears" while still on screen. Text leaves first.
           No filter animation on touch: scrubbed blur on a full-screen layer
           makes mobile GPUs drop the layer entirely (planet flickers/vanishes). */
        const touch = isTouchDevice();
        const heroExit = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: '.js-hero', start: 'top top', end: 'bottom top', scrub: true },
        });
        heroExit
          .to(
            '.js-hero-bg',
            {
              scale: 1.1,
              opacity: 0.4,
              duration: 0.55,
              ...(touch ? {} : { filter: 'blur(3px)' }),
            },
            0.45,
          )
          .to('.js-hero .js-word', { y: -64, opacity: 0, stagger: 0.06, duration: 0.7 }, 0)
          .to('.js-hero-fade', { y: -28, opacity: 0, stagger: 0.04, duration: 0.5 }, 0)
          .to('.js-hero-stars', { opacity: 0, duration: 0.8 }, 0.1)
          .to('.js-hero-embers', { opacity: 0, duration: 0.7 }, 0.1)
          .to('.js-hero-ring', { opacity: 0, duration: 0.6 }, 0);
        gsap.to('.js-hero-scroll', {
          opacity: 0,
          duration: 0.3,
          scrollTrigger: {
            trigger: '.js-hero',
            start: 'top top-=40',
            toggleActions: 'play none none reverse',
          },
        });

        /* stats */
        gsap.fromTo(
          '.js-stat',
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.12,
            scrollTrigger: { trigger: '.js-stats', start: 'top 85%', once: true },
          },
        );
        gsap.utils.toArray<HTMLElement>('.js-stat-num').forEach((el) => {
          const target = Number(el.dataset.target ?? '0');
          const suffix = el.dataset.suffix ?? '';
          const counter = { v: 0 };
          gsap.to(counter, {
            v: target,
            duration: 1.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            onStart: () => {
              el.textContent = `0${suffix}`;
            },
            onUpdate: () => {
              el.textContent = `${Math.round(counter.v)}${suffix}`;
            },
          });
        });
        gsap.fromTo(
          '.js-stat-unit',
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            delay: 1.7,
            scrollTrigger: { trigger: '.js-stats', start: 'top 85%', once: true },
          },
        );

        /* S2C — cinematic interlude: pinned scrub on desktop, simple reveal
           on mobile (same breakpoint pattern as S6) */
        mmInner.add('(min-width: 768px)', () => {
          const ctxI = gsap.context(() => {
            const il = gsap.timeline({
              defaults: { ease: 'none' },
              scrollTrigger: {
                trigger: '.js-interlude',
                start: 'top top',
                end: '+=140%',
                pin: true,
                scrub: 1,
                anticipatePin: 1,
              },
            });
            il.fromTo('.js-interlude-img', { scale: 1.15 }, { scale: 1, duration: 1 }, 0)
              .fromTo(
                '.js-interlude-media',
                { yPercent: -5 },
                { yPercent: 5, duration: 1 },
                0,
              )
              .fromTo(
                '.js-il-word',
                { opacity: 0.2 },
                { opacity: 1, stagger: 0.18, duration: 0.55 },
                0.12,
              )
              .fromTo(
                '.js-interlude-rule',
                { scaleX: 0 },
                { scaleX: 1, duration: 0.45 },
                0.4,
              )
              .fromTo(
                '.js-interlude-meta p',
                { opacity: 0, y: 14 },
                { opacity: 1, y: 0, duration: 0.4 },
                0.42,
              );
          }, rootRef);
          return () => ctxI.revert();
        });

        mmInner.add('(max-width: 767px)', () => {
          const ctxIM = gsap.context(() => {
            gsap.fromTo(
              '.js-interlude-img',
              { scale: 1.15 },
              {
                scale: 1,
                duration: 1.8,
                ease: 'expo.out',
                scrollTrigger: { trigger: '.js-interlude', start: 'top 75%', once: true },
              },
            );
            gsap.fromTo(
              '.js-il-word',
              { opacity: 0.15, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'expo.out',
                stagger: 0.1,
                scrollTrigger: { trigger: '.js-interlude', start: 'top 65%', once: true },
              },
            );
            gsap.fromTo(
              '.js-interlude-rule',
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 1.2,
                ease: 'power2.inOut',
                scrollTrigger: { trigger: '.js-interlude', start: 'top 65%', once: true },
              },
            );
            gsap.fromTo(
              '.js-interlude-meta p',
              { opacity: 0, y: 14 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'expo.out',
                delay: 0.2,
                scrollTrigger: { trigger: '.js-interlude', start: 'top 65%', once: true },
              },
            );
          }, rootRef);
          return () => ctxIM.revert();
        });

        /* S4 — black gallery list: masked-rise headline, staggered row
           entrances and a slow-scrub bronze glow drifting behind the rows.
           No pin here anymore — S6 keeps the pinned moment. */
        gsap.fromTo(
          '.js-s4 .js-word',
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.05,
            scrollTrigger: { trigger: '.js-s4', start: 'top 80%', once: true },
          },
        );
        /* ambient bronze glow drifts slowly behind the rows on scrub */
        gsap.fromTo(
          '.js-s4-glow',
          { yPercent: -14 },
          {
            yPercent: 14,
            ease: 'none',
            scrollTrigger: { trigger: '.js-s4', start: 'top bottom', end: 'bottom top', scrub: 1 },
          },
        );

        /* cards rise in with a stagger, the offset column trailing behind */
        gsap.fromTo(
          '.js-s4-card',
          { y: 64, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.05,
            ease: 'expo.out',
            stagger: 0.12,
            scrollTrigger: { trigger: '.js-s4-grid', start: 'top 80%', once: true },
          },
        );

        mmInner.add('(max-width: 767px)', () => {
          const ctxM = gsap.context(() => {
            gsap.fromTo(
              '.js-pillar',
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: 'expo.out',
                stagger: 0.1,
                scrollTrigger: { trigger: '.js-s4-rows', start: 'top 75%', once: true },
              },
            );
          }, rootRef);
          return () => ctxM.revert();
        });

        /* S5 — split panels clip wipes */
        gsap.fromTo(
          '.js-split-left',
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: '.js-s5', start: 'top 70%', once: true },
          },
        );
        gsap.fromTo(
          '.js-split-right',
          { clipPath: 'inset(0 0 0 100%)' },
          {
            clipPath: 'inset(0 0 0 0%)',
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: '.js-s5', start: 'top 70%', once: true },
          },
        );

        /* S5 — masked-rise headlines + bronze hairlines inside the panels,
           firing just after the clip wipes land */
        gsap.fromTo(
          '.js-s5 .js-word',
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.05,
            ease: 'expo.out',
            stagger: 0.055,
            delay: 0.45,
            scrollTrigger: { trigger: '.js-s5', start: 'top 70%', once: true },
          },
        );
        gsap.fromTo(
          '.js-split-rule',
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.3,
            ease: 'expo.out',
            stagger: 0.18,
            delay: 0.75,
            transformOrigin: 'left center',
            scrollTrigger: { trigger: '.js-s5', start: 'top 70%', once: true },
          },
        );

        /* S6 — team image reveals run on every no-preference viewport (they
           target the inner wrappers, so they never fight the pin transform);
           the row itself is revealed on mobile and pinned on desktop. */
        gsap.fromTo(
          '.js-team-imgwrap',
          { clipPath: 'inset(12% 8%)' },
          {
            clipPath: 'inset(0% 0%)',
            duration: 1.2,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: { trigger: '.js-s6', start: 'top 75%', once: true },
          },
        );
        gsap.fromTo(
          '.js-team-img',
          { scale: 1.25 },
          {
            scale: 1,
            duration: 1.2,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: { trigger: '.js-s6', start: 'top 75%', once: true },
          },
        );

        /* S6 — team carousel: pinned horizontal scrub on desktop
           (scroll-fx §4) — now the page's only pinned moment after the
           interlude. Mobile / reduced motion keep the
           native swipeable scroll-snap row. */
        mmInner.add('(min-width: 768px)', () => {
          const row = teamRowRef.current;
          const pin = rootRef.current?.querySelector<HTMLElement>('.js-s6-pin');
          const progress = rootRef.current?.querySelector<HTMLElement>('.js-team-progress');
          const counter = rootRef.current?.querySelector<HTMLElement>('.js-team-counter');
          const bar = rootRef.current?.querySelector<HTMLElement>('.js-team-bar');
          if (!row || !pin) return;

          /* Switch to the pinned layout ONLY while the pin is active —
             mobile / reduced-motion keep the scroll-snap row (see S4). */
          const cards = gsap.utils.toArray<HTMLElement>(
            '.js-team-card',
            rootRef.current ?? undefined,
          );
          pin.classList.add(
            'md:flex',
            'md:min-h-[100svh]',
            'md:flex-col',
            'md:justify-center',
            'md:py-[clamp(48px,8vh,120px)]',
          );
          row.classList.add('md:mt-12', 'md:snap-none', 'md:overflow-visible');
          cards.forEach((c) => c.classList.add('md:w-[clamp(200px,24vw,32vh)]'));
          /* While pinned the wheel drives the carousel: drag is disabled
             (guarded in the drag effect below) and its cursor label removed
             so the drag affordance never lies. */
          row.dataset.pinned = 'true';
          progress?.classList.remove('hidden');
          progress?.classList.add('md:flex');

          /* Subtle entrance: cards fade/scale in as they cross the right edge */
          const setEntrance = () => {
            const vw = window.innerWidth;
            cards.forEach((card) => {
              const r = card.getBoundingClientRect();
              const t = gsap.utils.clamp(0, 1, (vw - r.left) / (vw * 0.28));
              gsap.set(card, { opacity: 0.3 + 0.7 * t, scale: 0.95 + 0.05 * t });
            });
          };

          const ctxX = gsap.context(() => {
            /* travel = real track overflow vs. its visible width — no magic
               numbers; scroll length = travel + a short dwell on the last card */
            const getDistance = () => Math.max(0, row.scrollWidth - row.clientWidth);
            gsap.to(row, {
              x: () => -getDistance(),
              ease: 'none',
              scrollTrigger: {
                trigger: '.js-s6',
                start: 'top top',
                end: () => `+=${getDistance() + Math.round(window.innerHeight * 0.25)}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  if (counter) {
                    const idx = Math.min(
                      TEAM.length,
                      Math.floor(self.progress * TEAM.length) + 1,
                    );
                    counter.textContent = String(idx).padStart(2, '0');
                  }
                  if (bar) gsap.set(bar, { scaleX: self.progress });
                  setEntrance();
                },
              },
            });
          }, rootRef);
          setEntrance();
          return () => {
            ctxX.revert();
            pin.classList.remove(
              'md:flex',
              'md:min-h-[100svh]',
              'md:flex-col',
              'md:justify-center',
              'md:py-[clamp(48px,8vh,120px)]',
            );
            row.classList.remove('md:mt-12', 'md:snap-none', 'md:overflow-visible');
            cards.forEach((c) => c.classList.remove('md:w-[clamp(200px,24vw,32vh)]'));
            gsap.set(cards, { clearProps: 'opacity,scale' });
            row.removeAttribute('data-pinned');
            progress?.classList.add('hidden');
            progress?.classList.remove('md:flex');
          };
        });

        mmInner.add('(max-width: 767px)', () => {
          const ctxM = gsap.context(() => {
            gsap.fromTo(
              '.js-team-row',
              { x: 80, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: 'expo.out',
                scrollTrigger: { trigger: '.js-s6', start: 'top 75%', once: true },
              },
            );
          }, rootRef);
          return () => ctxM.revert();
        });

        /* S7 — closing CTA */
        gsap.fromTo(
          '.js-s7 .js-word',
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.05,
            scrollTrigger: { trigger: '.js-s7', start: 'top 75%', once: true },
          },
        );
        gsap.fromTo(
          '.js-s7-cta',
          { y: 24, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.4)',
            delay: 0.2,
            scrollTrigger: { trigger: '.js-s7', start: 'top 75%', once: true },
          },
        );

        /* S7 — headline fills mist → bone on scrub, like the interlude */
        gsap.fromTo(
          '.js-s7 .js-word',
          { color: '#8A8A85' },
          {
            color: '#FFFFFF',
            stagger: 0.06,
            ease: 'none',
            scrollTrigger: { trigger: '.js-s7', start: 'top 85%', end: 'top 30%', scrub: true },
          },
        );
        /* S7 — hairline bronze frame draws in on enter */
        gsap.fromTo(
          '.js-s7-frame-h',
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.6,
            ease: 'power2.inOut',
            stagger: 0.12,
            scrollTrigger: { trigger: '.js-s7', start: 'top 70%', once: true },
          },
        );
        gsap.fromTo(
          '.js-s7-frame-v',
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.6,
            ease: 'power2.inOut',
            stagger: 0.12,
            delay: 0.15,
            scrollTrigger: { trigger: '.js-s7', start: 'top 70%', once: true },
          },
        );
        /* S7 — conic ring slowly sweeps (60s/rev, guarded by matchMedia) */
        gsap.to('.js-s7-ring', { rotation: 360, duration: 60, ease: 'none', repeat: -1 });

        /* S7 — bronze glow drifts with cursor (±20px) */
        const glow = rootRef.current?.querySelector('.js-s7-glow');
        const s7 = rootRef.current?.querySelector('.js-s7');
        if (glow && s7) {
          const gx = gsap.quickTo(glow, 'x', { duration: 0.6, ease: 'power2.out' });
          const gy = gsap.quickTo(glow, 'y', { duration: 0.6, ease: 'power2.out' });
          const onMove = (e: Event) => {
            const me = e as MouseEvent;
            const r = (s7 as HTMLElement).getBoundingClientRect();
            gx(((me.clientX - r.left) / r.width - 0.5) * 40);
            gy(((me.clientY - r.top) / r.height - 0.5) * 40);
          };
          s7.addEventListener('mousemove', onMove);
          cleanups.push(() => s7.removeEventListener('mousemove', onMove));
        }

        /* Recalculate every trigger with the JS-toggled pin layout (S6)
           in its final state — keeps the closing CTA / footer curtain
           offsets correct after the pin inserts its spacer. */
        ScrollTrigger.refresh();

        return () => cleanups.forEach((fn) => fn());
      }, rootRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [ready]);

  /* ---- Team row: drag-to-scroll ---------------------------------------
     Active on touch-scroll layouts (mobile / reduced motion). While the
     desktop pin owns the row (`data-pinned`), the wheel drives the carousel
     and drag is inert — the row no longer scrolls natively. */
  useEffect(() => {
    const row = teamRowRef.current;
    if (!row) return;
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let dragged = false;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (row.dataset.pinned === 'true') return;
      isDown = true;
      dragged = false;
      startX = e.clientX;
      startScroll = row.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 5) dragged = true;
      row.scrollLeft = startScroll - dx;
    };
    const onUp = () => {
      isDown = false;
    };
    const onClick = (e: MouseEvent) => {
      if (dragged) {
        e.preventDefault();
        e.stopPropagation();
        dragged = false;
      }
    };

    row.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    row.addEventListener('click', onClick, true);
    return () => {
      row.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      row.removeEventListener('click', onClick, true);
    };
  }, []);

  return (
    <div ref={rootRef}>
      {/* ================= S1 — HERO (cinematic planet) ================= */}
      <section
        className="js-hero relative -mt-[var(--nav-h)] flex min-h-[100svh] items-center overflow-hidden bg-ink"
        aria-label="Introduction"
      >
        {/* planet scene — layered so scroll parallax, mouse parallax and the
            slow scale drift each own one wrapper:
            .js-hero-bg    scroll parallax (scrub y)
            .js-hero-mouse mouse-move parallax (±14px, horizontal bleed to hide edges)
            .js-hero-drift 20s yoyo scale breathing */}
        <div className="js-hero-bg absolute -inset-y-[15%] inset-x-0" aria-hidden="true">
          <div className="js-hero-mouse absolute inset-y-0 -inset-x-[3%]">
            <div className="js-hero-drift absolute inset-0 will-change-transform">
              <img
                src="/assets/hero-planet.jpg"
                alt=""
                className="h-full w-full object-cover object-[70%_center]"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>

        {/* code-generated twinkling starfield for extra depth */}
        <StarfieldCanvas className="js-hero-stars pointer-events-none absolute inset-0 h-full w-full" />

        {/* orbiting network ring — code-generated satellite lattice echoing
            the original site's network web; above the planet, below the copy.
            Hidden on small screens; disabled internally on touch/reduced-motion */}
        <div
          className="js-hero-ring pointer-events-none absolute left-[72%] top-1/2 hidden aspect-square w-[clamp(320px,42vw,680px)] -translate-x-1/2 -translate-y-1/2 md:block"
          aria-hidden="true"
        >
          <NetworkRing className="h-full w-full opacity-80" />
        </div>

        {/* ember field — glowing amber particles erupting from the planet and
            drifting outward; above the planet + ring, below the copy (the copy
            layer is z-10). Reduced count on small screens */}
        <EmberField className="js-hero-embers pointer-events-none absolute inset-0 h-full w-full" />

        {/* bronze/amber glow bleeding from the planet side into the dark left */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 62% 58% at 72% 46%, rgba(255,130,77,0.20) 0%, rgba(229,106,30,0.09) 42%, rgba(229,106,30,0) 68%)',
          }}
        />
        {/* contrast scrim — deepens the left third behind the headline */}
        <div
          className="js-hero-scrim absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(100deg, rgba(10,8,6,0.72) 0%, rgba(10,8,6,0.38) 36%, rgba(10,8,6,0) 62%)',
          }}
        />
        {/* mobile-only veil — planet sits nearer the copy on narrow screens */}
        <div className="pointer-events-none absolute inset-0 bg-ink/40 md:hidden" aria-hidden="true" />
        {/* bottom gradient fade — subtle dark vignette into the black audiences panel */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(110px,16vh,190px)]"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.5) 32%, rgba(10,10,10,0.14) 60%, rgba(10,10,10,0) 100%)',
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-site flex-col items-center justify-center px-gutter pb-[10vh] pt-[12vh] text-center lg:block lg:min-h-0 lg:text-left">
          <h1
            className="js-hero-title mx-auto max-w-[12ch] font-display lg:mx-0 text-[clamp(3.2rem,9vw,8rem)] font-light leading-[0.98] tracking-[-0.02em] text-bone [text-shadow:0_2px_40px_rgba(10,8,6,0.55)]"
            aria-label="Turning challenges into your growth"
          >
            <span className="block">
              <MaskWord>Turning</MaskWord> <MaskWord>challenges</MaskWord>
            </span>
            <span className="block">
              <MaskWord>into</MaskWord> <MaskWord>your</MaskWord>{' '}
              <MaskWord innerClassName="font-normal italic text-bronze">growth</MaskWord>
            </span>
          </h1>
          {/* mobile LET'S TALK — in flow below the headline */}
          <div className="js-hero-fade mt-10 lg:hidden">
            <TalkCTA />
          </div>
        </div>

        {/* desktop LET'S TALK — circular CTA in the hero's lower-right */}
        <div className="js-hero-fade absolute bottom-[18vh] right-[9vw] z-10 hidden lg:block">
          <TalkCTA />
        </div>

        {/* bottom chrome — scroll indicator, centered just above the bone fade */}
        <div className="absolute inset-x-0 bottom-[clamp(96px,14vh,150px)] z-10 flex justify-center">
          <ScrollIndicator />
        </div>
      </section>

      {/* ================= S2 — FOR CORPORATES / FOR PRIVATE CLIENTS =========
          Original-site order: the two audiences open the page right after
          the hero (clip-wipe entrance panels, hover-grow on desktop) */}
      <section className="js-s5 flex flex-col lg:flex-row" aria-label="Our clients">
        {/* For Corporates */}
        <div
          className="js-split-left group relative flex min-h-[85vh] flex-1 flex-col justify-center overflow-hidden bg-ink px-gutter py-28 lg:min-h-[92vh]"
          onMouseMove={handleSpotlight}
        >
          {/* cursor spotlight + bronze top edge that ignites on hover */}
          <Spotlight tone="dark" />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-bronze transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
          />
          <div className="relative z-10 mx-auto w-full max-w-xl ">
            <p className="eyebrow mb-6 text-bronze">For Corporates</p>
            <span className="js-split-rule mb-10 block h-px w-28 bg-bronze/80" aria-hidden="true" />
            <h3
              className="font-display text-[clamp(2.4rem,4.6vw,4.2rem)] font-light leading-[1.06] tracking-[-0.015em] text-bone"
              aria-label="Take your business to a new level."
            >
              <MaskWord>Take</MaskWord> <MaskWord>your</MaskWord>{' '}
              <MaskWord>business</MaskWord> <MaskWord>to</MaskWord> <MaskWord>a</MaskWord>{' '}
              <MaskWord>new</MaskWord>{' '}
              <MaskWord innerClassName="font-normal italic text-bronze">level.</MaskWord>
            </h3>
            <p className="mt-9 text-[clamp(1.02rem,1.25vw,1.2rem)] leading-[1.75] text-parchment">
              Whether you want to establish a company or relocate an existing
              company in Cyprus or another jurisdiction, our professional team
              of experts combine specialist expertise with personal service to
              help you every step of the way.
            </p>
            <div className="mt-12">
              <MagneticButton to="/for-corporates" variant="ghost">
                For Corporates
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* For Private Clients */}
        <div
          className="js-split-right group relative flex min-h-[85vh] flex-1 flex-col justify-center overflow-hidden bg-ivory px-gutter py-28 lg:min-h-[92vh]"
          onMouseMove={handleSpotlight}
        >
          <Spotlight tone="light" />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-bronze transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
          />
          <div className="relative z-10 mx-auto w-full max-w-xl ">
            <p className="eyebrow mb-6 text-bronze">For Private Clients</p>
            <span className="js-split-rule mb-10 block h-px w-28 bg-bronze/80" aria-hidden="true" />
            <h3
              className="font-display text-[clamp(2.4rem,4.6vw,4.2rem)] font-light leading-[1.06] tracking-[-0.015em] text-ink"
              aria-label="Preserve and grow generational wealth."
            >
              <MaskWord>Preserve</MaskWord> <MaskWord>and</MaskWord> <MaskWord>grow</MaskWord>{' '}
              <MaskWord>generational</MaskWord>{' '}
              <MaskWord innerClassName="font-normal italic text-bronze">wealth.</MaskWord>
            </h3>
            <p className="mt-9 text-[clamp(1.02rem,1.25vw,1.2rem)] leading-[1.75] text-umber">
              We help family offices and high-net-worth individuals navigate
              regulatory and administrative frameworks, preserve generational
              wealth, assist in succession planning, and speed up the process
              of managing and investing wealth.
            </p>
            <div className="mt-12">
              <MagneticButton to="/for-private-clients" variant="primary">
                For Private Clients
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ================= S4 — SERVICES (original-style staggered grid) ====
          The official site's Trusted Solutions layout, elevated: intro
          column (pill badge, display headline, promise copy, orange pill
          CTA) + staggered two-column card grid with the original SVG icons.
          Cards: icon ignites orange, hairline sweeps, arrow glides on hover. */}
      <section className="js-s4 relative overflow-hidden bg-ink text-bone" aria-label="What we do">
        {/* slow-scrub bronze glow drifting behind the grid (≤10% opacity) */}
        <div
          className="js-s4-glow pointer-events-none absolute -inset-y-[15%] inset-x-0 opacity-[0.09]"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 55% 42% at 68% 38%, rgba(255,130,77,0.55) 0%, rgba(229,106,30,0.22) 45%, rgba(229,106,30,0) 72%)',
          }}
        />

        <div className="relative mx-auto max-w-site px-gutter py-[clamp(96px,14vw,200px)]">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-10">
            {/* intro column — sticky on desktop so it holds while cards scroll */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-[calc(var(--nav-h)+8vh)]">
                <p className="inline-flex items-center gap-2.5 rounded-full border border-bone/20 px-5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-eyebrow text-bone/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-bronze" aria-hidden="true" />
                  01 — What We Do
                </p>
                <h2
                  className="mt-10 font-display text-[clamp(3rem,6.5vw,5.6rem)] font-light leading-[1.02] tracking-[-0.02em] text-bone"
                  aria-label="Trusted solutions"
                >
                  <MaskWord>Trusted</MaskWord>{' '}
                  <MaskWord innerClassName="font-normal italic text-bronze">solutions</MaskWord>
                </h2>
                <Reveal className="mt-10 max-w-md" delay={0.1}>
                  <p className="leading-[1.75] text-parchment">
                    Our offering encompasses a range of services, from legal to
                    corporate to cross-border — and we help you cross every
                    business hurdle effortlessly.
                  </p>
                </Reveal>
                <Reveal className="mt-12" delay={0.2}>
                  <Link
                    to="/what-we-do"
                    className="group inline-flex items-center gap-3 rounded-full bg-bronze px-8 py-4 font-mono text-[11px] font-medium uppercase tracking-button text-ink transition-all duration-300 ease-out-expo hover:bg-bronze-deep hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze"
                  >
                    View all our expertise
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </Link>
                </Reveal>
              </div>
            </div>

            {/* symmetric card grid — every card the same size, details fit snugly */}
            <div className="js-s4-grid grid auto-rows-fr gap-6 sm:grid-cols-2 lg:col-span-7">
              {PILLARS.map((pillar) => (
                <div key={pillar.index} className="h-full">
                  <Link
                    to={pillar.to}
                    className="js-s4-card group relative flex h-full flex-col border border-bone/12 bg-white/[0.02] p-7 transition-all duration-500 ease-out-expo hover:-translate-y-2 hover:border-bronze/50 hover:bg-white/[0.045] focus-visible:border-bronze/50 focus-visible:outline-none lg:p-8"
                  >
                    {/* original service icon — mist at rest, ignites orange on hover */}
                    <pillar.Icon
                      className="h-12 w-12 text-bone/85 transition-all duration-500 ease-out-expo group-hover:scale-110 group-hover:text-bronze group-focus-visible:text-bronze lg:h-14 lg:w-14"
                      aria-hidden="true"
                    />
                    <span className="mt-6 flex items-baseline justify-between gap-4">
                      <span className="font-display text-[clamp(1.5rem,2.2vw,2.1rem)] font-light leading-[1.1] text-bone transition-colors duration-500 group-hover:text-bronze group-focus-visible:text-bronze">
                        {pillar.title}
                      </span>
                      <span className="font-mono text-[10px] tracking-nav text-mist transition-colors duration-500 group-hover:text-bronze">
                        {pillar.index}
                      </span>
                    </span>
                    <span className="mt-4 flex-1 text-[0.95rem] leading-[1.7] text-parchment/75 transition-colors duration-500 group-hover:text-parchment">
                      {pillar.desc}
                    </span>
                    <span className="mt-6 inline-flex items-center gap-2.5 font-mono text-[10px] font-medium uppercase tracking-nav text-bone/60 transition-colors duration-500 group-hover:text-bronze">
                      Explore
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                    {/* orange hairline sweep */}
                    <span
                      className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-bronze transition-transform duration-700 ease-out-expo group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ================= S2B — TRUSTED IN NUMBERS (light editorial) =====
          A calm ivory break between the dark services grid and the dark
          interlude: ink numerals, orange suffixes, fine hairlines, count-up
          on entry. Quiet, confident, editorial — no boxes, no gimmicks. */}
      <section
        className="js-stats-band relative overflow-hidden bg-ivory text-ink"
        aria-label="Our track record"
      >
        <div className="relative mx-auto max-w-site px-gutter py-[clamp(80px,10vw,140px)]">
          <div className="mb-[clamp(40px,5vw,64px)] flex items-center gap-6">
            <p className="eyebrow shrink-0 text-bronze">Trusted — In Numbers</p>
            <span className="h-px flex-1 bg-ink/12" aria-hidden="true" />
            <p className="hidden shrink-0 font-mono text-[10px] uppercase tracking-eyebrow text-mist sm:block">
              Est. 2014 — Cyprus · Worldwide
            </p>
          </div>

          {/* editorial number row — ink numerals with bronze suffixes */}
          <div className="js-stats grid grid-cols-2 gap-y-14 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`js-stat group relative pr-6 ${
                  i > 0 ? 'lg:border-l lg:border-ink/12 lg:pl-10' : ''
                } ${i % 2 === 1 ? 'pl-6 sm:pl-10 lg:pl-10' : ''}`}
              >
                <p className="font-display text-[clamp(3.4rem,7vw,7.5rem)] font-light leading-[0.95] tracking-[-0.025em] text-ink transition-colors duration-500 ease-out-expo group-hover:text-bronze">
                  <span
                    className="js-stat-num"
                    data-target={stat.target}
                    data-suffix={stat.suffix}
                  >
                    {stat.target}
                    {stat.suffix}
                  </span>
                </p>
                {/* hairline under each numeral — sweeps orange on hover */}
                <span
                  className="mt-5 block h-px w-14 bg-ink/25 transition-all duration-500 ease-out-expo group-hover:w-24 group-hover:bg-bronze"
                  aria-hidden="true"
                />
                <p className="js-stat-unit mt-5 font-mono text-[10px] font-medium uppercase leading-[1.8] tracking-nav text-umber lg:whitespace-nowrap">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= S2C — CINEMATIC INTERLUDE =================
          Desktop (≥768px, no-preference): pinned 140vh scrub — the coastline
          settles from 1.15→1 while the line fills in word by word.
          Mobile / reduced motion: normal full-bleed section, simple reveals. */}
      <section
        className="js-interlude relative overflow-hidden bg-ink"
        aria-label="Limassol, Cyprus — global reach, local expertise, justice"
      >
        <div className="js-interlude-stage relative flex h-[100svh] items-center justify-center">
          <div className="absolute inset-0" aria-hidden="true">
            <div className="js-interlude-media absolute inset-x-0 -inset-y-[10%] will-change-transform">
              <img
                src="/assets/interlude-limassol-sunset.jpg?v=2"
                alt=""
                className="js-interlude-img h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          {/* dark scrim for legibility against the dusk sky */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(to bottom, rgba(10,8,6,0.62) 0%, rgba(10,8,6,0.30) 42%, rgba(10,8,6,0.66) 100%)',
            }}
          />
          <div className="relative z-10 mx-auto w-full max-w-site px-gutter text-center">
            <h2
              className="font-display text-[clamp(2.8rem,8vw,7.5rem)] font-light leading-[1.02] tracking-[-0.02em] text-bone"
              aria-label="Empowering Success, Together"
            >
              <span aria-hidden="true" className="js-il-word inline-block">
                Empowering
              </span>{' '}
              <span aria-hidden="true" className="js-il-word inline-block">
                Success,
              </span>{' '}
              <span
                aria-hidden="true"
                className="js-il-word inline-block font-normal italic text-bronze"
              >
                Together
              </span>
            </h2>
            <div className="js-interlude-meta mt-[clamp(32px,6vh,64px)] flex flex-col items-center gap-7">
              <span
                className="js-interlude-rule block h-px w-[clamp(120px,18vw,220px)] origin-center bg-bronze"
                aria-hidden="true"
              />
              <p className="whitespace-nowrap font-mono text-[8.5px] uppercase tracking-[0.16em] text-bone/70 md:text-[11px] md:tracking-eyebrow">
                Limassol, Cyprus — 34.6841° N, 33.0589° E
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= S5 — CORPORATES / PRIVATE SPLIT ================= */}
      {/* ================= S6 — TEAM PREVIEW =================
          Desktop (≥768px, no-preference): pinned horizontal-scrub carousel —
          vertical scroll drives all six cards across the viewport.
          Mobile / reduced motion: native swipeable
          scroll-snap row, exactly as before. */}
      <section className="js-s6 overflow-hidden bg-ivory" aria-label="Our team">
        <div className="js-s6-pin mx-auto max-w-site px-gutter py-[clamp(96px,14vw,200px)]">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-8">02 — Our Team</p>
              <h2 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.05] tracking-[-0.015em] text-ink">
                <SplitWords text="Working together, going further." />
              </h2>
            </div>
            <div className="flex shrink-0 flex-col items-start gap-8 md:items-end">
              <Link
                to="/who-we-are"
                className="group inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-button text-bronze"
              >
                Meet the full team
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
              {/* pinned-sequence progress (mono, matches S4) — revealed by JS
                  only while the desktop pin is active; sits in the header so
                  it stays visible for the whole pin */}
              <div
                className="js-team-progress hidden w-full items-center gap-6 font-mono text-xs uppercase tracking-nav text-mist md:w-72"
                aria-hidden="true"
              >
                <span>
                  <span className="js-team-counter text-bronze">01</span> /{' '}
                  {String(TEAM.length).padStart(2, '0')}
                </span>
                <span className="relative h-px flex-1 bg-stone">
                  <span className="js-team-bar absolute inset-0 origin-left scale-x-0 bg-bronze" />
                </span>
                <span>Scroll</span>
              </div>
            </div>
          </div>

          {/* velocity-reactive skew (scroll-fx §2) */}
          <VelocitySkew>
          <div
            ref={teamRowRef}
            className="js-team-row mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [scrollbar-width:thin] [scrollbar-color:var(--sand)_transparent]"
            aria-label="Team members — scrollable"
          >
            {TEAM.map((member) => (
              <Link
                key={member.slug}
                to={`/who-we-are#${member.slug}`}
                className="js-team-card group w-[min(340px,78vw)] shrink-0 snap-start"
              >
                <div className="js-team-imgwrap aspect-[5/7] overflow-hidden border-2 border-stone/60">
                  <img
                    src={member.image}
                    alt={`${member.name} — ${member.role}`}
                    className="js-team-img h-full w-full object-cover grayscale-[0.15] transition-all duration-500 ease-out-expo group-hover:scale-[1.04] group-hover:grayscale-0"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-6 font-display text-2xl text-ink">{member.name}</h3>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-nav text-bronze">
                  {member.role}
                </p>
              </Link>
            ))}
          </div>
          </VelocitySkew>
        </div>
      </section>

      {/* ================= S6b — INSIGHTS ================= */}
      <section id="insights" className="bg-bone" aria-label="Insights">
        <div className="mx-auto max-w-site px-gutter py-[clamp(96px,14vw,200px)]">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-8">03 — Insights</p>
              <h2 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.05] tracking-[-0.015em] text-ink">
                <SplitWords text="Clarity, in writing." />
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-[1.75] text-umber md:pb-2 md:text-right">
              Cyprus tax and residency, explained by the people who structure it every day.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {INSIGHTS.map((article, i) => (
              <Reveal key={article.slug} delay={i * 0.08}>
                <Link
                  to={`/insights/${article.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden border border-stone bg-ivory transition-all duration-500 ease-out-expo hover:-translate-y-2 hover:border-bronze/60 hover:shadow-[0_30px_60px_-30px_rgba(229,106,30,0.35)]"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.imageAlt}
                      className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                    <span
                      className="absolute bottom-4 left-4 rounded-full border border-bone/25 bg-ink/70 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-bronze backdrop-blur-sm"
                    >
                      {article.tag}
                    </span>
                    <span
                      className="absolute right-5 top-4 font-display text-[clamp(2rem,3.4vw,2.8rem)] font-light leading-none text-bone/80 [text-shadow:0_2px_16px_rgba(10,10,10,0.6)]"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-8 md:p-10">
                    <h3 className="max-w-[20ch] font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-light leading-[1.15] tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-bronze-deep">
                      {article.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-[14.5px] leading-[1.75] text-umber">
                      {article.excerpt}
                    </p>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-4 pt-10">
                      <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-nav text-mist">
                        <span>{article.readingTime}</span>
                        <span className="h-px w-6 bg-stone" aria-hidden="true" />
                        <span>{article.updated}</span>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap font-mono text-[11px] font-medium uppercase tracking-button text-bronze">
                        Read article
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                  <span
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-bronze transition-transform duration-500 ease-out-expo group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= S7 — CLOSING CTA ================= */}
      <section
        className="js-s7 relative overflow-hidden bg-ink text-bone"
        aria-label="Contact"
      >
        {/* layered bronze ambience — cursor-drifting glow + slow conic ring */}
        <div
          className="js-s7-glow pointer-events-none absolute left-1/2 top-1/2 h-[85vmin] w-[85vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16]"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle, rgba(255,224,196,0.55) 0%, rgba(255,130,77,0.28) 26%, rgba(229,106,30,0.12) 46%, transparent 66%)',
          }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          <div
            className="js-s7-ring h-full w-full rounded-full opacity-[0.07]"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0deg, rgba(255,130,77,0.9) 38deg, transparent 95deg, transparent 190deg, rgba(255,224,196,0.7) 248deg, transparent 305deg)',
            }}
          />
        </div>
        {/* local grain for a filmic finish */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
          aria-hidden="true"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* hairline bronze frame — draws in as the section enters */}
        <div
          className="pointer-events-none absolute inset-[clamp(14px,2.5vw,40px)]"
          aria-hidden="true"
        >
          <span className="js-s7-frame-h absolute left-0 top-0 h-px w-full origin-left bg-bronze/40" />
          <span className="js-s7-frame-h absolute bottom-0 left-0 h-px w-full origin-right bg-bronze/40" />
          <span className="js-s7-frame-v absolute left-0 top-0 h-full w-px origin-top bg-bronze/40" />
          <span className="js-s7-frame-v absolute right-0 top-0 h-full w-px origin-bottom bg-bronze/40" />
        </div>
        <div className="relative mx-auto flex max-w-site flex-col items-center px-gutter py-[clamp(120px,16vw,220px)] text-center">
          <p className="eyebrow mb-10">04 — Contact</p>
          <h2 className="max-w-5xl font-display text-[clamp(2.6rem,6.5vw,5.5rem)] font-light leading-[1.02] tracking-[-0.02em]">
            <SplitWords text="Let's turn your next challenge into growth." />
          </h2>
          <div className="js-s7-cta mt-14 flex flex-col items-center gap-8">
            <MagneticButton
              to="/contact"
              variant="primary"
              className="bg-bronze text-ink hover:bg-bone"
            >
              Start a Conversation
            </MagneticButton>
            <div className="flex flex-col items-center gap-3 font-mono text-xs uppercase tracking-nav text-mist sm:flex-row sm:gap-8">
              <a
                href={CONTACT.emailHref}
                className="transition-colors duration-300 hover:text-bronze"
              >
                {CONTACT.email}
              </a>
              <span className="hidden h-px w-8 bg-stone/40 sm:block" aria-hidden="true" />
              <a
                href={CONTACT.phoneHref}
                className="transition-colors duration-300 hover:text-bronze"
              >
                {CONTACT.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
