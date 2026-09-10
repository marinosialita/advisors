import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/motion';

interface NavbarProps {
  onMenuOpen: () => void;
}

/** Original-site minimal nav: two plain text links … */
const TEXT_LINKS = [
  { label: 'Who We Are', path: '/who-we-are' },
  { label: 'What We Do', path: '/what-we-do' },
];

/** … then two outlined pill links; everything else lives in the Menu overlay */
const PILL_LINKS = [
  { label: 'For Corporates', path: '/for-corporates' },
  { label: 'For Private Clients', path: '/for-private-clients' },
];

/** Russian twins — same order, RU routes + translated labels */
const TEXT_LINKS_RU = [
  { label: 'Кто мы', path: '/ru/who-we-are' },
  { label: 'Что мы делаем', path: '/ru/what-we-do' },
];

const PILL_LINKS_RU = [
  { label: 'Для бизнеса', path: '/ru/for-corporates' },
  { label: 'Частным клиентам', path: '/ru/for-private-clients' },
];

/**
 * EN / RU language switch — maps the current path to its localized twin.
 * Every route has a /ru mirror, so the mapping is a pure prefix swap.
 */
function LangSwitch() {
  const { pathname } = useLocation();
  const isRu = pathname === '/ru' || pathname.startsWith('/ru/');

  const enPath = isRu ? pathname.replace(/^\/ru/, '') || '/' : pathname;
  /* Every route now has a RU twin — mirror the path wholesale. */
  const ruPath = isRu ? pathname : pathname === '/' ? '/ru' : `/ru${pathname}`;

  const itemCls = (active: boolean) =>
    cn(
      'px-1.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em] transition-colors duration-300',
      active ? 'text-bronze' : 'text-bone/50 hover:text-bone',
    );

  return (
    <div
      className="flex items-center gap-1 rounded-full border border-bone/15 px-2 py-0.5"
      aria-label="Language / Язык"
    >
      <Link to={enPath} className={itemCls(!isRu)} aria-current={!isRu ? 'true' : undefined}>
        EN
      </Link>
      <span className="h-3 w-px bg-bone/20" aria-hidden="true" />
      <Link to={ruPath} className={itemCls(isRu)} aria-current={isRu ? 'true' : undefined}>
        RU
      </Link>
    </div>
  );
}

/**
 * Circular bronze burger (original-site trait): perfect circle, three thin
 * bone lines, magnetic pull + hover scale 1.06. Opens the full-screen Menu.
 */
function CircularMenuButton({ onClick }: { onClick: () => void }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14 });
  const sy = useSpring(y, { stiffness: 180, damping: 14 });

  const handleMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-6, Math.min(6, relX * 0.18)));
    y.set(Math.max(-6, Math.min(6, relY * 0.18)));
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={reduced ? undefined : { scale: 1.06 }}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      style={{ x: sx, y: sy }}
      aria-label="Open menu"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bronze text-bone shadow-[0_8px_22px_rgba(255,130,77,0.35)] transition-colors duration-300 ease-out-expo hover:bg-bronze-deep"
    >
      <span className="flex flex-col items-center gap-[4.5px]" aria-hidden="true">
        <span className="block h-px w-[18px] bg-current" />
        <span className="block h-px w-[18px] bg-current" />
        <span className="block h-px w-[18px] bg-current" />
      </span>
    </motion.button>
  );
}

/**
 * Header: fixed top, ALWAYS a thin black bar (ink/92 + blur, hairline
 * bone/10 border) per brand (black/white/orange). Hides on scroll down past
 * 400px, reveals on scroll up.
 *
 * Desktop nav mirrors the original sc-advisors.com.cy: logo left; "Who We
 * Are" + "What We Do" as text links, "For Corporates" + "For Private
 * Clients" as outlined pills, and a circular bronze burger holding the rest.
 * Mobile: logo + burger only.
 *
 * NOTE (routing/offset contract): this nav is `fixed` — the shared Layout
 * owns the top offset for page content. Do not add nav-height padding in
 * pages; full-bleed heroes opt out with `-mt-[var(--nav-h)]`.
 */
export default function Navbar({ onMenuOpen }: NavbarProps) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { pathname } = useLocation();
  const isRu = pathname === '/ru' || pathname.startsWith('/ru/');
  const textLinks = isRu ? TEXT_LINKS_RU : TEXT_LINKS;
  const pillLinks = isRu ? PILL_LINKS_RU : PILL_LINKS;

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 400 && y > lastY.current + 4) {
        setHidden(true);
      } else if (y < lastY.current - 4 || y <= 400) {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The bar is always black → always the white logo + bone nav text.

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[100] transition-all duration-500 ease-out-expo',
        hidden ? '-translate-y-full' : 'translate-y-0',
        'border-b border-bone/10 bg-ink/[0.92] backdrop-blur-[12px]',
      )}
    >
      <div className="mx-auto flex h-[var(--nav-h)] max-w-site items-center justify-between px-gutter">
        {/* Logo */}
        <NavLink
          to={isRu ? '/ru' : '/'}
          aria-label="SC Advisors — home"
          className="relative z-10 shrink-0"
        >
          <img
            src="/assets/original/sc-advisors-logo-white.svg"
            alt="SC Advisors"
            className="h-[20px] w-auto"
          />
        </NavLink>

        {/* Right cluster — text links + pills are desktop-only; the circular
            burger serves every viewport */}
        <div className="flex items-center gap-6 lg:gap-8">
          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {textLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'group relative py-2 font-sans text-[13px] font-medium uppercase tracking-nav transition-colors duration-300',
                    'text-bone hover:text-bronze',
                    isActive && 'text-bronze',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute bottom-0 left-0 h-px w-full origin-left bg-bronze transition-transform duration-300 ease-out-expo',
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                      )}
                    />
                  </>
                )}
              </NavLink>
            ))}

            {pillLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'rounded-full border px-[18px] py-[7px] font-mono text-[11px] font-medium uppercase tracking-nav transition-all duration-300 ease-out-expo hover:-translate-y-px hover:border-bronze hover:text-bronze',
                    'border-bone/60 text-bone',
                    isActive && 'border-bronze text-bronze',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <LangSwitch />
          <CircularMenuButton onClick={onMenuOpen} />
        </div>
      </div>
    </header>
  );
}
