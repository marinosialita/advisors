import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  CORPORATE_SERVICES,
  PRIVATE_SERVICES,
  CORPORATE_DETAIL_PATH,
  PRIVATE_DETAIL_PATH,
} from './data';
import type { ServiceItem } from './data';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/motion';
import { refreshScrollTrigger } from '@/lib/scroll';

type TabId = 'corporates' | 'private';

const TABS: { id: TabId; label: string; items: ServiceItem[]; detailPath: string }[] = [
  {
    id: 'corporates',
    label: 'For Corporates',
    items: CORPORATE_SERVICES,
    detailPath: CORPORATE_DETAIL_PATH,
  },
  {
    id: 'private',
    label: 'For Private Clients',
    items: PRIVATE_SERVICES,
    detailPath: PRIVATE_DETAIL_PATH,
  },
];

/**
 * Interactive master service index (what-we-do.md §S2).
 * Desktop: rows on the left, sticky hover/focus preview panel on the right
 * (cross-fade 0.25s). Mobile: each row expands inline as an accordion.
 * Keyboard navigable — ArrowUp/ArrowDown move row focus.
 * Framer Motion only (tabs, staggers, accordion) — no GSAP in this tree.
 */
export default function ServiceIndex({ locale = 'en' }: { locale?: 'en' | 'ru' }) {
  const reduced = usePrefersReducedMotion();
  const [tab, setTab] = useState<TabId>('corporates');
  const [activeSlug, setActiveSlug] = useState<string>(CORPORATE_SERVICES[0].slug);
  /** mobile inline expansion */
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const current = TABS.find((t) => t.id === tab)!;
  const ru = locale === 'ru';
  const tabLabel = (t: (typeof TABS)[number]) =>
    ru ? (t.id === 'corporates' ? 'Для бизнеса' : 'Частным клиентам') : t.label;
  const svcTitle = (svc: ServiceItem) => (ru ? (svc.titleRu ?? svc.title) : svc.title);
  const svcDesc = (svc: ServiceItem) => (ru ? (svc.descriptionRu ?? svc.description) : svc.description);
  const detailBase = ru ? `/ru${current.detailPath}` : current.detailPath;
  const active =
    current.items.find((s) => s.slug === activeSlug) ?? current.items[0];

  const switchTab = (id: TabId) => {
    if (id === tab) return;
    const next = TABS.find((t) => t.id === id)!;
    setTab(id);
    setActiveSlug(next.items[0].slug);
    setExpandedSlug(null);
  };

  /* Roving focus with arrow keys across the row buttons */
  const onListKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const rows = Array.from(
      listRef.current?.querySelectorAll<HTMLButtonElement>('[data-service-row]') ?? [],
    );
    const idx = rows.indexOf(e.target as HTMLButtonElement);
    if (idx === -1) return;
    e.preventDefault();
    const next = e.key === 'ArrowDown' ? (idx + 1) % rows.length : (idx - 1 + rows.length) % rows.length;
    rows[next]?.focus();
  };

  return (
    <div>
      {/* ---- Tab group ------------------------------------------------ */}
      <div
        role="tablist"
        aria-label="Service groups"
        className="flex flex-wrap gap-10 border-b border-stone"
      >
        {TABS.map((t) => {
          const selected = t.id === tab;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={selected}
              onClick={() => switchTab(t.id)}
              className={cn(
                'relative pb-5 font-mono text-xs font-medium uppercase tracking-button transition-colors duration-300',
                selected ? 'text-ink' : 'text-mist hover:text-ink',
              )}
            >
              {tabLabel(t)}
              <span className="ml-3 text-bronze">({t.items.length})</span>
              {selected && (
                <motion.span
                  layoutId="service-tab-underline"
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-0 -bottom-px h-px bg-bronze"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ---- Rows + sticky preview ------------------------------------ */}
      <div className="mt-4 grid gap-12 lg:grid-cols-12 lg:gap-x-8">
        <div
          ref={listRef}
          role="tabpanel"
          onKeyDown={onListKeyDown}
          className="lg:col-span-7"
        >
          <motion.div
            key={tab}
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: reduced ? 0 : 0.04 } },
            }}
          >
            {current.items.map((service, i) => {
              const isActive = active.slug === service.slug;
              const isExpanded = expandedSlug === service.slug;
              return (
                <motion.div
                  key={`${tab}-${service.slug}`}
                  variants={{
                    hidden: { y: reduced ? 0 : 20, opacity: 0 },
                    show: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="border-b border-stone"
                >
                  <button
                    type="button"
                    data-service-row
                    aria-expanded={isExpanded}
                    onMouseEnter={() => setActiveSlug(service.slug)}
                    onFocus={() => setActiveSlug(service.slug)}
                    onClick={() => {
                      setActiveSlug(service.slug);
                      setExpandedSlug(isExpanded ? null : service.slug);
                    }}
                    className="group flex w-full items-baseline gap-6 py-5 text-left"
                  >
                    <span
                      className={cn(
                        'shrink-0 font-mono text-xs font-medium transition-colors duration-300',
                        isActive ? 'text-bronze' : 'text-mist',
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={cn(
                        'flex-1 font-display text-[clamp(1.3rem,2vw,1.75rem)] leading-[1.2] transition-all duration-300 ease-out-expo group-hover:translate-x-2.5',
                        isActive ? 'translate-x-2.5 text-ink' : 'text-ink/80',
                      )}
                    >
                      {svcTitle(service)}
                    </span>
                    <ArrowRight
                      className={cn(
                        'h-4 w-4 shrink-0 self-center transition-all duration-300 ease-out-expo',
                        isActive
                          ? 'translate-x-0 text-bronze opacity-100'
                          : '-translate-x-1 text-bronze opacity-0 group-hover:translate-x-0 group-hover:opacity-100',
                      )}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </button>

                  {/* mobile inline accordion */}
                  <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? 'auto' : 0 }}
                    /* layout-changing animation → re-measure scroll triggers */
                    onAnimationComplete={refreshScrollTrigger}
                    transition={
                      reduced
                        ? { duration: 0.3 }
                        : { type: 'spring', stiffness: 190, damping: 26 }
                    }
                    className="overflow-hidden lg:hidden"
                  >
                    <div className="pb-6 pl-[calc(1.5rem+0.75rem)]">
                      <p className="max-w-md leading-[1.7] text-umber">
                        {svcDesc(service)}
                      </p>
                      <Link
                        to={`${detailBase}/${service.slug}`}
                        className="group/link mt-4 inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-nav text-bronze"
                      >
                        View detail
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover/link:translate-x-1"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* sticky preview panel (desktop) */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-[calc(var(--nav-h)+48px)] border border-stone bg-ivory p-10">
            <p className="eyebrow mb-8">
              {current.id === 'corporates' ? 'Corporate Practice' : 'Private Practice'}
            </p>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${tab}-${active.slug}`}
                initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <h3 className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.15] text-ink">
                  {svcTitle(active)}
                </h3>
                <p className="mt-6 leading-[1.7] text-umber">{svcDesc(active)}</p>
                <Link
                  to={`${detailBase}/${active.slug}`}
                  className="group/preview mt-10 inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-button text-bronze"
                >
                  {ru ? 'Подробнее об услуге' : 'Explore this service'}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/preview:translate-x-1.5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
