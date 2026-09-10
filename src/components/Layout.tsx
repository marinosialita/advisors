import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import Menu from './Menu';
import Preloader from './Preloader';
import GrainOverlay from './GrainOverlay';
import { PAGE_LABELS } from '@/data/site';
import { AppReadyContext } from './app-ready-context';
import { EASE_IN_OUT_LUXE, prefersReducedMotion } from '@/lib/motion';
import { reportScroll } from '@/lib/scroll';
import ScrollProgress from './scroll/ScrollProgress';
import ChatWidget from './chat/ChatWidget';

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared layout — owns the fixed-nav offset, Lenis smooth scroll, preloader,
 * full-screen menu, custom cursor, grain overlay and curtain page transition.
 *
 * Routing contract (react-dev.md): this Layout renders <Outlet/>, so App.tsx
 * MUST use nested <Route> elements — never <Layout><Routes/></Layout>.
 *
 * Offset contract: the nav is fixed. The content slot below carries
 * `pt-[var(--nav-h)]` so every page starts below the nav. Pages with a
 * full-bleed hero opt out inside the page with `-mt-[var(--nav-h)]`.
 */
export default function Layout() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [ready, setReady] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return prefersReducedMotion() || sessionStorage.getItem('sca-visited') === '1';
  });
  const [showPreloader, setShowPreloader] = useState(() => !ready);

  // ---- Lenis smooth scroll (design.md §5) --------------------------------
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
    });
    lenis.on('scroll', (e: Lenis) => {
      ScrollTrigger.update();
      // Feed the shared velocity store for skew / marquee effects (scroll-fx)
      reportScroll(e.velocity, e.direction);
    });
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // ---- Scroll to top on route change --------------------------------------
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [location.pathname]);

  // (Menu closes itself via its link onClick handlers.)

  const handlePreloaderReveal = () => {
    // Panels begin parting — pages start their hero reveals beneath.
    setReady(true);
  };

  const handlePreloaderDone = () => {
    sessionStorage.setItem('sca-visited', '1');
    setShowPreloader(false);
  };

  const pageLabel = PAGE_LABELS[location.pathname] ?? 'SC ADVISORS';
  const [curtainKey, setCurtainKey] = useState<string | null>(null);
  const [prevPath, setPrevPath] = useState(location.pathname);

  // Trigger the curtain during render when the route changes (React-endorsed
  // "derive state from props" pattern — no effect, no first-render flash).
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    if (!prefersReducedMotion()) setCurtainKey(location.pathname);
  }

  return (
    <AppReadyContext.Provider value={ready}>
      <a href="#content" className="skip-link">
        Skip to content
      </a>

      <GrainOverlay />

      {showPreloader && (
        <Preloader onReveal={handlePreloaderReveal} onDone={handlePreloaderDone} />
      )}

      {/* Curtain page transition (design.md §5.1) — non-blocking overlay:
          enters from below, wipes up to reveal the new page. */}
      <AnimatePresence>
        {curtainKey && (
          <motion.div
            key={curtainKey}
            className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-ink"
            initial={{ y: '0%' }}
            animate={{ y: '-100%' }}
            transition={{
              duration: 0.7,
              delay: 0.18,
              ease: EASE_IN_OUT_LUXE,
            }}
            onAnimationComplete={() => setCurtainKey(null)}
            aria-hidden="true"
          >
            <span className="font-mono text-xs uppercase tracking-eyebrow text-bone/70">
              {pageLabel}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar onMenuOpen={() => setMenuOpen(true)} />
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Bronze page-scroll progress hairline (scroll-fx §10) */}
      <ScrollProgress />

      {/*
        Footer curtain reveal (scroll-fx §7): on ≥md the footer is sticky at
        the viewport bottom, stacked behind <main>; the page content slides up
        over it and casts it off. Pure CSS (scroll-driven, Lenis-safe) — on
        mobile the footer simply follows the content as usual.
      */}
      <main
        id="content"
        className="relative z-10 bg-bone pt-[var(--nav-h)] md:shadow-[0_70px_110px_-40px_rgba(10,10,10,0.45)]"
      >
        <Outlet />
      </main>

      <Footer />
      <ChatWidget />
    </AppReadyContext.Provider>
  );
}
