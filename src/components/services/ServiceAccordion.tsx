import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import type { ServiceItem } from './data';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/motion';
import { refreshScrollTrigger } from '@/lib/scroll';

interface ServiceAccordionProps {
  items: ServiceItem[];
  /** mono tag shown inside the open state, e.g. "CORPORATE PRACTICE" */
  tag: string;
  /** base path of the group's detail routes, e.g. "/for-corporates" */
  basePath: string;
  /** localized CTA label, defaults to EN */
  exploreLabel?: string;
  /** extra classes on the row title (theme hook) */
  className?: string;
}

/**
 * Editorial service accordion (for-corporates.md §S2 / for-private-clients.md §S2):
 * full-width rows divided by 1px rules, mono index, Fraunces title, plus icon
 * that rotates 45° into an ×. One open at a time; first item (or the
 * location-hash target) opens by default. Height spring ≈0.45s, content
 * fades 0.25s after the open begins. Framer Motion only — no GSAP here.
 */
export default function ServiceAccordion({ items, tag, basePath, exploreLabel = 'Explore service', className }: ServiceAccordionProps) {
  const reduced = usePrefersReducedMotion();
  const { hash } = useLocation();
  const [open, setOpen] = useState<string>(() => {
    const fromHash = hash ? items.find((s) => `#${s.slug}` === hash)?.slug : undefined;
    return fromHash ?? items[0]?.slug ?? '';
  });

  /* Deep-link: open + scroll the anchored row (deferred one frame so the
     row stagger/layout settles first; async callback avoids sync setState
     in the effect body) */
  useEffect(() => {
    if (!hash) return;
    const target = items.find((s) => `#${s.slug}` === hash);
    const t = window.setTimeout(() => {
      if (target) setOpen(target.slug);
      document
        .getElementById(hash.slice(1))
        ?.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' });
    }, 350);
    return () => window.clearTimeout(t);
  }, [hash, items, reduced]);

  return (
    <motion.div
      role="list"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
      className={className}
    >
      {items.map((service, i) => {
        const isOpen = open === service.slug;
        return (
          <motion.div
            key={service.slug}
            role="listitem"
            id={service.slug}
            variants={{
              hidden: { y: reduced ? 0 : 24, opacity: 0 },
              show: {
                y: 0,
                opacity: 1,
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="scroll-mt-28 border-t border-stone last:border-b"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? '' : service.slug)}
              aria-expanded={isOpen}
              aria-controls={`${service.slug}-panel`}
              className="group flex w-full items-baseline gap-6 py-7 text-left md:gap-10"
            >
              <span
                className={cn(
                  'shrink-0 font-mono text-xs font-medium transition-colors duration-300',
                  isOpen ? 'text-bronze' : 'text-mist group-hover:text-bronze',
                )}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.15] text-ink transition-transform duration-300 ease-out-expo group-hover:translate-x-1">
                {service.title}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  'shrink-0 self-center transition-colors duration-300',
                  isOpen ? 'text-bronze' : 'text-ink group-hover:text-bronze',
                )}
                aria-hidden="true"
              >
                <Plus className="h-5 w-5" strokeWidth={1.5} />
              </motion.span>
            </button>

            <motion.div
              id={`${service.slug}-panel`}
              initial={false}
              animate={{ height: isOpen ? 'auto' : 0 }}
              /* layout-changing animation → re-measure scroll triggers */
              onAnimationComplete={refreshScrollTrigger}
              transition={
                reduced
                  ? { duration: 0.3 }
                  : { type: 'spring', stiffness: 190, damping: 26, mass: 0.9 }
              }
              className="overflow-hidden"
            >
              <motion.div
                initial={false}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : reduced ? 0 : 8 }}
                transition={{
                  duration: 0.25,
                  delay: isOpen ? 0.25 : 0,
                  ease: 'easeOut',
                }}
                className="grid gap-6 pb-9 pl-[calc(1.5rem+0.75rem)] pr-4 md:grid-cols-12 md:pl-[calc(2.5rem+0.75rem)]"
              >
                <div className="max-w-xl md:col-span-8">
                  <p className="leading-[1.7] text-umber">{service.description}</p>
                  <Link
                    to={`${basePath}/${service.slug}`}
                    className="group/link mt-5 inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-nav text-bronze"
                  >
                    {exploreLabel}
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 ease-out-expo group-hover/link:translate-x-1"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </Link>
                </div>
                <p className="font-mono text-[11px] font-medium uppercase tracking-eyebrow text-bronze md:col-span-4 md:self-start md:text-right">
                  {tag}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
