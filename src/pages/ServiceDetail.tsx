import { useContext, useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import { AppReadyContext } from '@/components/app-ready-context';
import MagneticButton from '@/components/MagneticButton';
import SplitWords from '@/components/SplitWords';
import Reveal from '@/components/scroll/Reveal';
import usePageTitle from '@/components/contact-legal/usePageTitle';
import { useCanonical } from '@/components/usePageMeta';
import useJsonLd from '@/components/useJsonLd';
import useHtmlLang from '@/components/useHtmlLang';
import {
  CORPORATE_SERVICES,
  PRIVATE_SERVICES,
  CORPORATE_DETAIL_PATH,
  PRIVATE_DETAIL_PATH,
} from '@/components/services/data';
import type { ServiceItem } from '@/components/services/data';
import { getServiceBlocks } from '@/components/services/details';
import type { ServiceBlock, ServiceGroup } from '@/components/services/details';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/lib/motion';
import { refreshScrollTrigger } from '@/lib/scroll';

gsap.registerPlugin(ScrollTrigger);

const GROUP_META: Record<
  ServiceGroup,
  { path: string; label: string; breadcrumb: string; services: ServiceItem[] }
> = {
  corporate: {
    path: CORPORATE_DETAIL_PATH,
    label: 'For Corporates',
    breadcrumb: 'For Corporates',
    services: CORPORATE_SERVICES,
  },
  private: {
    path: PRIVATE_DETAIL_PATH,
    label: 'For Private Clients',
    breadcrumb: 'For Private Clients',
    services: PRIVATE_SERVICES,
  },
};

/** Number the offer-items of a body sequentially (01, 02, …) across sections. */
function offerIndices(blocks: ServiceBlock[]): (number | null)[] {
  let n = 0;
  return blocks.map((b) => (b.type === 'offer-item' ? ++n : null));
}

type Locale = 'en' | 'ru';

/** titleRu/descriptionRu are added to ServiceItem in data.ts — read defensively. */
type LocalizedServiceItem = ServiceItem & { titleRu?: string; descriptionRu?: string };

function localizedTitle(s: ServiceItem, locale: Locale): string {
  return locale === 'ru' ? ((s as LocalizedServiceItem).titleRu ?? s.title) : s.title;
}

function localizedDescription(s: ServiceItem, locale: Locale): string {
  return locale === 'ru'
    ? ((s as LocalizedServiceItem).descriptionRu ?? s.description)
    : s.description;
}

/** Hardcoded page chrome strings, per locale. */
function chromeStrings(locale: Locale, group: ServiceGroup) {
  const ru = locale === 'ru';
  const groupLabel = ru
    ? group === 'corporate'
      ? 'Корпоративным клиентам'
      : 'Частным клиентам'
    : GROUP_META[group].label;
  return {
    home: ru ? 'Главная' : 'Home',
    groupLabel,
    moreServices: ru ? `Другие услуги — ${groupLabel}` : `More ${groupLabel} services`,
    moreServicesAria: ru ? 'Другие услуги' : 'More services',
    breadcrumbAria: ru ? 'Навигационная цепочка' : 'Breadcrumb',
    prevService: ru ? 'Предыдущая услуга' : 'Previous service',
    nextService: ru ? 'Следующая услуга' : 'Next service',
    nextStep: ru ? 'Следующий шаг' : 'Next step',
    ctaHeading: ru ? 'Свяжитесь с нами' : 'Get in touch with us',
    ctaButton: ru ? 'Связаться' : 'Get in touch',
    ctaAria: ru ? 'Связаться с нами' : 'Get in touch',
  };
}

export default function ServiceDetail({
  group,
  locale = 'en',
}: {
  group: ServiceGroup;
  locale?: Locale;
}) {
  const ready = useContext(AppReadyContext);
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const { slug = '' } = useParams();
  const meta = GROUP_META[group];
  const T = chromeStrings(locale, group);

  /* Locale-aware link targets: RU pages live under /ru/… */
  const base = locale === 'ru' ? '/ru' : '';
  const detailPath = `${base}${meta.path}`;
  const groupIndexPath = `${base}${group === 'corporate' ? '/for-corporates' : '/for-private-clients'}`;
  const homePath = locale === 'ru' ? '/ru' : '/';
  const contactPath = `${base}/contact`;

  const service = meta.services.find((s) => s.slug === slug);
  const blocks = service ? getServiceBlocks(group, service.slug, locale) : undefined;

  const [siblingsOpen, setSiblingsOpen] = useState(false);

  const displayTitle = service ? localizedTitle(service, locale) : '';
  const title = service ? `${displayTitle} — SC Advisors` : 'SC Advisors';
  usePageTitle(title);
  useHtmlLang(locale);

  const firstParagraph = blocks?.find((b) => b.type === 'paragraph');
  const description =
    firstParagraph && firstParagraph.type === 'paragraph'
      ? firstParagraph.text
      : service
        ? localizedDescription(service, locale)
        : '';

  /* Per-page meta description from the first paragraph (verbatim). */
  useEffect(() => {
    const tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!tag || !description) return;
    const prev = tag.content;
    tag.content = description.length > 160 ? `${description.slice(0, 157)}…` : description;
    return () => {
      tag.content = prev;
    };
  }, [description]);

  /* self-referencing canonical per service page (locale-aware /ru path) */
  useCanonical(service ? `${detailPath}/${service.slug}` : detailPath);

  /* Breadcrumb + Service structured data for rich results. */
  useJsonLd(
    'service',
    service
      ? {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Service',
              name: displayTitle,
              description: description || undefined,
              provider: {
                '@type': 'Organization',
                name: 'SC Advisors Ltd',
                url: 'https://sc-advisors.com.cy',
              },
              areaServed: { '@type': 'Country', name: 'Cyprus' },
              url: `https://sc-advisors.com.cy${detailPath}/${service.slug}`,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: T.home,
                  item: `https://sc-advisors.com.cy${homePath}`,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: T.groupLabel,
                  item: `https://sc-advisors.com.cy${groupIndexPath}`,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: displayTitle,
                  item: `https://sc-advisors.com.cy${detailPath}/${service.slug}`,
                },
              ],
            },
          ],
        }
      : null,
  );

  /* ---- GSAP hero + CTA storytelling (no-preference only, context cleanup) -- */
  useEffect(() => {
    if (!ready || !rootRef.current || !service) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        /* hero load-in: split-word reveal + hairline rule draw */
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .fromTo(
            '.js-hero .js-word',
            { yPercent: 110 },
            { yPercent: 0, duration: 1.1, stagger: 0.05 },
            0.15,
          )
          .fromTo(
            '.js-breadcrumb',
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 },
            0.1,
          )
          .fromTo(
            '.js-rule',
            { scaleX: 0 },
            { scaleX: 1, duration: 1.2, ease: 'power2.inOut', transformOrigin: 'left center' },
            0.5,
          );

        /* CTA band reveal */
        gsap.fromTo(
          '.js-cta .js-word',
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.05,
            scrollTrigger: { trigger: '.js-cta', start: 'top 75%', once: true },
          },
        );
        gsap.fromTo(
          '.js-cta-actions > *',
          { y: 24, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.4)',
            delay: 0.2,
            scrollTrigger: { trigger: '.js-cta', start: 'top 75%', once: true },
          },
        );
      }, rootRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [ready, service]);

  /* 404 within template: unknown slug → group page */
  if (!service || !blocks) return <Navigate to={detailPath} replace />;

  const index = meta.services.findIndex((s) => s.slug === service.slug);
  const prev = meta.services[(index - 1 + meta.services.length) % meta.services.length];
  const next = meta.services[(index + 1) % meta.services.length];
  const indices = offerIndices(blocks);

  const siblingList = (
    <ul className="flex flex-col">
      {meta.services.map((s) => {
        const active = s.slug === service.slug;
        return (
          <li key={s.slug}>
            <Link
              to={`${detailPath}/${s.slug}`}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'group/sib block border-b border-stone py-3 font-mono text-[11px] font-medium uppercase tracking-nav transition-colors duration-300',
                active ? 'text-bronze' : 'text-umber hover:text-ink',
              )}
            >
              <span className="underline-offset-4 decoration-bronze group-hover/sib:underline">
                {localizedTitle(s, locale)}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div ref={rootRef}>
      {/* ================= HERO (compact) ================= */}
      <section className="js-hero bg-bone" aria-label={displayTitle}>
        <div className="mx-auto max-w-site px-gutter pb-[clamp(56px,8vw,104px)] pt-[clamp(40px,6vw,80px)]">
          <nav aria-label={T.breadcrumbAria}>
            <p className="js-breadcrumb font-mono text-[11px] font-medium uppercase tracking-eyebrow text-mist">
              <Link to={homePath} className="transition-colors duration-300 hover:text-bronze">
                {T.home}
              </Link>
              <span className="text-bronze" aria-hidden="true">
                {' '}
                //{' '}
              </span>
              <Link to={detailPath} className="transition-colors duration-300 hover:text-bronze">
                {T.groupLabel}
              </Link>
              <span className="text-bronze" aria-hidden="true">
                {' '}
                //{' '}
              </span>
              <span className="text-ink">{displayTitle}</span>
            </p>
          </nav>
          <h1
            className="mt-10 max-w-5xl font-display text-[clamp(2.6rem,6vw,5.25rem)] font-light leading-[1.02] tracking-[-0.02em] text-ink"
            aria-label={displayTitle}
          >
            <SplitWords text={displayTitle} />
          </h1>
          <span className="js-rule mt-[clamp(40px,5vw,64px)] block h-px w-full bg-stone" aria-hidden="true" />
        </div>
      </section>

      {/* ================= BODY + SIBLING SIDEBAR ================= */}
      <section
        className="bg-bone"
        aria-label={locale === 'ru' ? `${displayTitle} — подробнее` : `${displayTitle} details`}
      >
        <div className="mx-auto max-w-site px-gutter pb-[clamp(80px,10vw,140px)]">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-8">
            <article className="max-w-[720px] lg:col-span-6 lg:col-start-2">
              {blocks.map((block, bi) => {
                const nextIsOffer = blocks[bi + 1]?.type === 'offer-item';
                switch (block.type) {
                  case 'paragraph':
                    return (
                      <Reveal key={bi} className={bi === 0 ? '' : 'mt-7'}>
                        <p
                          className={cn(
                            'leading-[1.75] text-umber',
                            bi === 0 && 'text-[clamp(1.05rem,1.4vw,1.25rem)] text-ink/90',
                          )}
                        >
                          {block.text}
                        </p>
                      </Reveal>
                    );
                  case 'section-heading':
                    return (
                      <Reveal key={bi} className="mt-14">
                        <h2 className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-light leading-[1.15] tracking-[-0.01em] text-ink">
                          {block.text}
                        </h2>
                      </Reveal>
                    );
                  case 'offer-item': {
                    const n = indices[bi] ?? 0;
                    return (
                      <Reveal
                        key={bi}
                        className={cn('border-t border-stone', !nextIsOffer && 'border-b')}
                        delay={Math.min((n - 1) * 0.05, 0.25)}
                        y={20}
                      >
                        <div className="grid gap-2 py-7 sm:grid-cols-[3rem_1fr] sm:gap-6">
                          <span
                            className="font-mono text-xs font-medium text-bronze sm:pt-1"
                            aria-hidden="true"
                          >
                            {String(n).padStart(2, '0')}
                          </span>
                          <div>
                            <h3 className="font-semibold leading-[1.4] text-ink">{block.lead}</h3>
                            {block.text && (
                              <p className="mt-2 leading-[1.7] text-umber">{block.text}</p>
                            )}
                            {block.items && (
                              <ul className="mt-4 flex flex-col gap-2">
                                {block.items.map((item) => (
                                  <li key={item} className="flex gap-3 leading-[1.65] text-umber">
                                    <span
                                      className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-bronze"
                                      aria-hidden="true"
                                    />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      </Reveal>
                    );
                  }
                  case 'list':
                    return (
                      <Reveal key={bi} className="mt-8">
                        <ul className="border-t border-stone">
                          {block.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-baseline gap-4 border-b border-stone py-4 leading-[1.65] text-umber"
                            >
                              <span
                                className="h-1 w-1 shrink-0 self-center rounded-full bg-bronze"
                                aria-hidden="true"
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </Reveal>
                    );
                }
              })}

              {/* mobile sibling list (collapsible) */}
              <div className="mt-20 lg:hidden">
                <button
                  type="button"
                  onClick={() => setSiblingsOpen((v) => !v)}
                  aria-expanded={siblingsOpen}
                  className="flex w-full items-center justify-between border-t border-stone py-5 text-left font-mono text-[11px] font-medium uppercase tracking-eyebrow text-ink"
                >
                  {T.moreServices}
                  <motion.span
                    animate={{ rotate: siblingsOpen ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-bronze"
                    aria-hidden="true"
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: siblingsOpen ? 'auto' : 0 }}
                  /* layout-changing animation → re-measure scroll triggers */
                  onAnimationComplete={refreshScrollTrigger}
                  transition={
                    reduced
                      ? { duration: 0.3 }
                      : { type: 'spring', stiffness: 190, damping: 26, mass: 0.9 }
                  }
                  className="overflow-hidden"
                >
                  <div className="border-t border-stone pb-4 pt-2">{siblingList}</div>
                </motion.div>
              </div>
            </article>

            {/* sticky sibling sidebar (desktop) */}
            <aside className="hidden lg:col-span-3 lg:col-start-9 lg:block" aria-label={T.moreServicesAria}>
              <div className="sticky top-[calc(var(--nav-h)+48px)]">
                <Reveal>
                  <p className="eyebrow mb-6">{T.groupLabel}</p>
                  {siblingList}
                </Reveal>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ================= PREV / NEXT ================= */}
      <nav className="border-t border-stone bg-bone" aria-label={T.moreServicesAria}>
        <div className="mx-auto grid max-w-site px-gutter md:grid-cols-2 md:px-0">
          <Link
            to={`${detailPath}/${prev.slug}`}
            className="group border-b border-stone py-10 md:border-b-0 md:border-r md:px-gutter md:py-14"
          >
            <span className="flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-eyebrow text-mist transition-colors duration-300 group-hover:text-bronze">
              <ArrowLeft
                className="h-4 w-4 text-bronze transition-transform duration-300 ease-out-expo group-hover:-translate-x-1"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              {T.prevService}
            </span>
            <span className="mt-4 block font-display text-[clamp(1.4rem,2.4vw,2rem)] font-light leading-[1.15] text-ink transition-colors duration-300 group-hover:text-bronze">
              {localizedTitle(prev, locale)}
            </span>
          </Link>
          <Link
            to={`${detailPath}/${next.slug}`}
            className="group py-10 text-right md:px-gutter md:py-14"
          >
            <span className="flex items-center justify-end gap-3 font-mono text-[11px] font-medium uppercase tracking-eyebrow text-mist transition-colors duration-300 group-hover:text-bronze">
              {T.nextService}
              <ArrowRight
                className="h-4 w-4 text-bronze transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </span>
            <span className="mt-4 block font-display text-[clamp(1.4rem,2.4vw,2rem)] font-light leading-[1.15] text-ink transition-colors duration-300 group-hover:text-bronze">
              {localizedTitle(next, locale)}
            </span>
          </Link>
        </div>
      </nav>

      {/* ================= CTA BAND ================= */}
      <section className="js-cta bg-ink text-bone" aria-label={T.ctaAria}>
        <div className="mx-auto max-w-site px-gutter py-[clamp(96px,12vw,160px)]">
          <p className="eyebrow mb-8">{T.nextStep}</p>
          <h2 className="max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.05] tracking-[-0.015em]">
            <SplitWords text={T.ctaHeading} />
          </h2>
          <div className="js-cta-actions mt-12">
            <MagneticButton
              to={contactPath}
              variant="primary"
              className="bg-bronze text-ink hover:bg-bone hover:text-ink"
            >
              {T.ctaButton}
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
