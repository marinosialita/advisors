import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { NAV_LINKS, CONTACT } from '@/data/site';
import { EASE_IN_OUT_LUXE, EASE_OUT_EXPO } from '@/lib/motion';

interface MenuProps {
  open: boolean;
  onClose: () => void;
}

/** Russian twins of NAV_LINKS — same order, RU routes + translated labels */
const NAV_LINKS_RU = [
  { label: 'Кто мы', path: '/ru/who-we-are' },
  { label: 'Что мы делаем', path: '/ru/what-we-do' },
  { label: 'Для бизнеса', path: '/ru/for-corporates' },
  { label: 'Частным клиентам', path: '/ru/for-private-clients' },
  { label: 'Карьера', path: '/ru/careers' },
  { label: 'Контакты', path: '/ru/contact' },
];

/**
 * Full-screen menu (design.md §6.3): ink overlay, clip-path circle expand
 * from the burger, Fraunces links with staggered rise, numbered 01–06,
 * contact row + address, oversized "SCA" outline watermark. ESC closes.
 */
export default function Menu({ open, onClose }: MenuProps) {
  const { pathname } = useLocation();
  const isRu = pathname === '/ru' || pathname.startsWith('/ru/');
  const navLinks = isRu ? NAV_LINKS_RU : NAV_LINKS;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="menu"
          className="fixed inset-0 z-[150] bg-ink"
          initial={{ clipPath: 'circle(0% at calc(100% - 60px) 40px)' }}
          animate={{ clipPath: 'circle(150% at calc(100% - 60px) 40px)' }}
          exit={{ clipPath: 'circle(0% at calc(100% - 60px) 40px)' }}
          transition={{ duration: 0.7, ease: EASE_IN_OUT_LUXE }}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          {/* watermark */}
          <span
            aria-hidden="true"
            className="outline-text pointer-events-none absolute -bottom-10 right-0 select-none font-mono text-[38vw] font-medium leading-none"
          >
            SCA
          </span>

          {/* close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center text-bone transition-colors hover:text-bronze md:right-10 md:top-7"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>

          <div className="relative flex h-full flex-col justify-between overflow-y-auto px-6 pb-10 pt-28 md:px-16 lg:px-24">
            <nav aria-label="Full menu">
              <ul className="flex flex-col gap-1 md:gap-2">
                {navLinks.map((link, i) => (
                  <li key={link.path} className="overflow-hidden">
                    <motion.div
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '110%', transition: { duration: 0.3 } }}
                      transition={{
                        duration: 0.8,
                        ease: EASE_OUT_EXPO,
                        delay: 0.15 + i * 0.07,
                      }}
                    >
                      <Link
                        to={link.path}
                        onClick={onClose}
                        className="group flex items-baseline gap-5 py-1 text-bone transition-colors hover:text-bronze"
                      >
                        <span className="font-mono text-xs text-bronze">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-display text-4xl font-light leading-tight md:text-5xl lg:text-[48px]">
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              className="mt-14 flex flex-col gap-8 border-t border-bone/10 pt-8 md:flex-row md:items-end md:justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay: 0.55 }}
            >
              <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-nav">
                <a href={CONTACT.emailHref} className="text-bone transition-colors hover:text-bronze">
                  {CONTACT.email}
                </a>
                <a href={CONTACT.phoneHref} className="text-bone transition-colors hover:text-bronze">
                  {CONTACT.phone}
                </a>
                <a
                  href={CONTACT.telegramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-bone/60 transition-colors hover:text-bronze"
                >
                  Telegram — {CONTACT.telegram}
                </a>
              </div>
              <div className="flex max-w-xs flex-col gap-4">
                <p className="font-mono text-[11px] leading-relaxed text-mist">
                  {CONTACT.address}
                </p>
                <Link
                  to={isRu ? '/ru/privacy-policy' : '/privacy-policy'}
                  onClick={onClose}
                  className="font-mono text-[10px] uppercase tracking-nav text-mist transition-colors hover:text-bronze"
                >
                  {isRu ? 'Политика конфиденциальности' : 'Privacy Policy'}
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
