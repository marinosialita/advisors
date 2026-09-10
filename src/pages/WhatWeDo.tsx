import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import usePageMeta from '@/components/usePageMeta';
import useHtmlLang from '@/components/useHtmlLang';
import { AppReadyContext } from '@/components/app-ready-context';
import MagneticButton from '@/components/MagneticButton';
import SplitWords, { MaskWord } from '@/components/SplitWords';
import ServiceIndex from '@/components/services/ServiceIndex';
import RegionDotMap from '@/components/services/RegionDotMap';
import Parallax from '@/components/scroll/Parallax';
import ScrubMedia from '@/components/scroll/ScrubMedia';
import VelocitySkew from '@/components/scroll/VelocitySkew';
import Reveal from '@/components/scroll/Reveal';
import { REGION_MARKERS } from '@/components/services/map-data';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const EN_STRINGS = {
  metaTitle: 'What We Do — Advisory Services | SC Advisors',
  metaDescription:
    'Corporate, legal, financial, migration and banking services in Cyprus — one dedicated partner for company formation, tax, IP Box, funds and global expansion across 15+ regions.',
  heroAria: 'What we do',
  heroEyebrow: 'What We Do',
  heroTitleAria: 'Smart solutions for global business expansion.',
  heroWords: ['Smart', 'solutions', 'for', 'global', 'business', 'expansion.'],
  heroLede:
    'Our team of highly skilled and licensed experts brings a wealth of experience and deep industry knowledge to provide exceptional advisory services.',
  heroDisciplines: 'Legal — Corporate — Financial — Migration — Banking',
  indexAria: 'Service index',
  approachAria: 'How we work',
  approachEyebrow: '01 — How We Work',
  approachTitle: 'Specialist expertise. Personal service.',
  approach: [
    {
      index: '01',
      title: 'LISTEN',
      body: 'Every engagement begins with understanding your structure, goals and constraints.',
    },
    {
      index: '02',
      title: 'STRUCTURE',
      body: 'We combine specialist expertise across legal, corporate, financial and migration disciplines into one clear plan.',
    },
    {
      index: '03',
      title: 'DELIVER',
      body: 'Trusted solutions, executed with long-term experience and personal service — success, ensured.',
    },
  ],
  approachImgAlt: 'SC Advisors — firm and office context',
  regionsAria: 'Where we operate',
  regionsEyebrow: '02 — Where We Operate',
  regionsTitle: '15 regions. One point of contact.',
  regionsNote: 'And further jurisdictions across Europe and international markets.',
  mapPanelLabel: 'Global Reach',
  mapPanelMeta: '15 regions worldwide',
  mapPanelFoot: 'One point of contact — every jurisdiction',
  officePanelLabel: 'Our Office — Live',
  officePanelMeta: 'Real-time satellite',
  officeMapTitle:
    'SC Advisors headquarters — Kanika Business Center, Limassol (interactive satellite map)',
  officePanelFoot: 'Kanika Business Center — 28 Oktovriou 317A, Limassol',
  ctaAria: 'Get started',
  ctaEyebrow: '03 — Start Here',
  ctaTitle: 'Not sure where to start?',
  ctaBody: 'Tell us your challenge — we will map the route.',
  ctaButton: 'Start a Conversation',
  corporates: 'For Corporates',
  privateClients: 'For Private Clients',
  contactPath: '/contact',
  corporatesPath: '/for-corporates',
  privatePath: '/for-private-clients',
};

const RU_STRINGS: typeof EN_STRINGS = {
  metaTitle: 'Чем мы занимаемся — Консультационные услуги | SC Advisors',
  metaDescription:
    'Корпоративные, юридические, финансовые, миграционные и банковские услуги на Кипре — один выделенный партнёр для регистрации компаний, налогообложения, IP Box, фондов и глобальной экспансии более чем в 15 регионах.',
  heroAria: 'Чем мы занимаемся',
  heroEyebrow: 'Чем мы занимаемся',
  heroTitleAria: 'Интеллектуальные решения для глобального роста бизнеса.',
  heroWords: ['Интеллектуальные', 'решения', 'для', 'глобального', 'роста', 'бизнеса.'],
  heroLede:
    'Наша команда высококвалифицированных лицензированных экспертов сочетает богатый опыт и глубокое знание отрасли, чтобы предоставлять консультационные услуги исключительного уровня.',
  heroDisciplines: 'Право — Корпоративное сопровождение — Финансы — Миграция — Банкинг',
  indexAria: 'Каталог услуг',
  approachAria: 'Как мы работаем',
  approachEyebrow: '01 — Как мы работаем',
  approachTitle: 'Профильная экспертиза. Персональный сервис.',
  approach: [
    {
      index: '01',
      title: 'ВНИКАЕМ',
      body: 'Каждый проект начинается с понимания вашей структуры, целей и ограничений.',
    },
    {
      index: '02',
      title: 'СТРУКТУРИРУЕМ',
      body: 'Мы объединяем профильную экспертизу в правовой, корпоративной, финансовой и миграционной областях в единый чёткий план.',
    },
    {
      index: '03',
      title: 'РЕАЛИЗУЕМ',
      body: 'Надёжные решения, воплощённые с многолетним опытом и персональным сервисом, — успех обеспечен.',
    },
  ],
  approachImgAlt: 'SC Advisors — атмосфера фирмы и офиса',
  regionsAria: 'География работы',
  regionsEyebrow: '02 — Где мы работаем',
  regionsTitle: '15 регионов. Один контакт.',
  regionsNote: 'А также другие юрисдикции Европы и международных рынков.',
  mapPanelLabel: 'Глобальный охват',
  mapPanelMeta: '15 регионов по всему миру',
  mapPanelFoot: 'Один контакт — любая юрисдикция',
  officePanelLabel: 'Наш офис — онлайн',
  officePanelMeta: 'Спутник в реальном времени',
  officeMapTitle:
    'Штаб-квартира SC Advisors — Kanika Business Center, Лимассол (интерактивная спутниковая карта)',
  officePanelFoot: 'Kanika Business Center — 28 Oktovriou 317A, Лимассол',
  ctaAria: 'С чего начать',
  ctaEyebrow: '03 — Начните здесь',
  ctaTitle: 'Не знаете, с чего начать?',
  ctaBody: 'Расскажите нам о вашей задаче — мы наметим путь.',
  ctaButton: 'Начать диалог',
  corporates: 'Корпоративным клиентам',
  privateClients: 'Частным клиентам',
  contactPath: '/ru/contact',
  corporatesPath: '/ru/for-corporates',
  privatePath: '/ru/for-private-clients',
};

export default function WhatWeDo({ locale = 'en' }: { locale?: 'en' | 'ru' }) {
  const T = locale === 'ru' ? RU_STRINGS : EN_STRINGS;
  const ready = useContext(AppReadyContext);
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  useHtmlLang(locale);
  usePageMeta(T.metaTitle, T.metaDescription);

  /* ---- GSAP scroll storytelling (no-preference only, context cleanup) -- */
  useEffect(() => {
    if (!ready || !rootRef.current) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        /* S1 — hero load-in (same language as Who We Are hero) */
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .fromTo('.js-hero-eyebrow', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0)
          .fromTo(
            '.js-hero .js-word',
            { yPercent: 110 },
            { yPercent: 0, duration: 1.1, stagger: 0.05 },
            0.3,
          )
          .fromTo(
            '.js-hero-fade',
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 },
            0.7,
          );

        /* S3 — approach: stacked card deck (scroll-fx §5). Cards stick with a
           cascading top offset; as the next card scrolls over, the covered
           card scales down / dims / recedes (scrub). */
        const deckCards = gsap.utils.toArray<HTMLElement>('.js-deck-card');
        deckCards.forEach((card, i) => {
          const next = deckCards[i + 1];
          if (!next) return;
          gsap.to(card, {
            scale: 0.94,
            y: -14,
            opacity: 0.55,
            transformOrigin: 'center top',
            ease: 'none',
            scrollTrigger: {
              trigger: next,
              start: 'top bottom',
              end: () => `top top+=${next.offsetTop - card.offsetTop + 120}`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });

        gsap.fromTo(
          '.js-approach-imgwrap',
          { clipPath: 'inset(12% 8%)' },
          {
            clipPath: 'inset(0% 0%)',
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.js-approach', start: 'top 70%', once: true },
          },
        );
        /* approach image scale/parallax is scrub-driven via ScrubMedia+Parallax (scroll-fx §3/§6) */

        /* S4 — regions: chips stagger, dots fade in radius-based stagger */
        gsap.fromTo(
          '.js-chip',
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            stagger: 0.06,
            scrollTrigger: { trigger: '.js-regions', start: 'top 75%', once: true },
          },
        );
        gsap.fromTo(
          '.js-map-dot',
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            ease: 'none',
            stagger: { amount: 1.4, grid: 'auto', from: 'center' },
            scrollTrigger: { trigger: '.js-regions-map', start: 'top 80%', once: true },
          },
        );

        /* S5 — CTA reveal */
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
            stagger: 0.1,
            delay: 0.2,
            scrollTrigger: { trigger: '.js-cta', start: 'top 75%', once: true },
          },
        );
      }, rootRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [ready]);

  return (
    <div ref={rootRef}>
      {/* ================= S1 — HERO (cinematic planet) ==========
          Same language as the Who We Are + Contact heroes: orange planet
          right, masked-word headline with bronze italics, bronze rule.
          No bottom fade — clean cut into the section below. */}
      <section
        className="js-hero relative -mt-[var(--nav-h)] flex min-h-[88dvh] items-center overflow-hidden bg-ink"
        aria-label={T.heroAria}
      >
        {/* planet backdrop */}
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src="/assets/hero-planet.jpg"
            alt=""
            className="h-full w-full object-cover object-[72%_center]"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(100deg, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.6) 42%, rgba(10,10,10,0.15) 75%, rgba(10,10,10,0.3) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-site px-gutter pb-16 pt-[calc(var(--nav-h)+8vh)]">
          <p className="js-hero-eyebrow eyebrow mb-8 text-bronze">{T.heroEyebrow}</p>
          <span className="js-hero-fade mb-10 block h-px w-32 bg-bronze" aria-hidden="true" />
          <h1
            className="max-w-[15ch] font-display text-[clamp(2.75rem,6.2vw,5.75rem)] font-light leading-[1.02] tracking-[-0.02em] text-bone [text-shadow:0_2px_40px_rgba(10,8,6,0.55)]"
            aria-label={T.heroTitleAria}
          >
            <MaskWord>{T.heroWords[0]}</MaskWord> <MaskWord>{T.heroWords[1]}</MaskWord>{' '}
            <MaskWord>{T.heroWords[2]}</MaskWord>{' '}
            <MaskWord innerClassName="font-normal italic text-bronze">{T.heroWords[3]}</MaskWord>{' '}
            <MaskWord>{T.heroWords[4]}</MaskWord>{' '}
            <MaskWord innerClassName="font-normal italic text-bronze">{T.heroWords[5]}</MaskWord>
          </h1>
          <p className="js-hero-fade mt-10 max-w-md text-[clamp(1.05rem,1.4vw,1.3rem)] leading-[1.65] text-parchment">
            {T.heroLede}
          </p>
          <p className="js-hero-fade mt-8 font-mono text-[10px] uppercase tracking-nav text-bone/60">
            {T.heroDisciplines}
          </p>
        </div>
      </section>

      {/* ================= S2 — SERVICE INDEX ================= */}
      <section className="bg-bone" aria-label={T.indexAria}>
        <div className="mx-auto max-w-site px-gutter py-[clamp(96px,14vw,200px)]">
          {/* velocity-reactive skew on the service list (scroll-fx §2) */}
          <VelocitySkew>
            <ServiceIndex locale={locale} />
          </VelocitySkew>
        </div>
      </section>

      {/* ================= S3 — APPROACH (stacked card deck) =================
          Cards stick in cascade; the next card scrolls over while the covered
          card scales down / recedes (scroll-fx §5). No pin — works everywhere. */}
      <section className="js-approach bg-ivory" aria-label={T.approachAria}>
        <div className="mx-auto max-w-site px-gutter py-[clamp(96px,14vw,200px)]">
          <div className="grid w-full gap-16 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-8">{T.approachEyebrow}</p>
              <h2 className="mb-16 font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.05] tracking-[-0.015em] text-ink">
                {T.approachTitle}
              </h2>
              <div className="js-deck">
                {T.approach.map((step, i) => (
                  <div
                    key={step.index}
                    className="js-deck-card sticky mb-6 border border-stone bg-ivory p-8 last:mb-0 md:p-12"
                    style={{ top: `calc(var(--nav-h) + ${32 + i * 28}px)` }}
                  >
                    <div className="flex items-baseline gap-8">
                      <span className="shrink-0 font-mono text-xs font-medium text-bronze">
                        {step.index}
                      </span>
                      <div>
                        <h3 className="font-display text-[clamp(1.8rem,3.6vw,3rem)] font-medium leading-[1.05] tracking-[-0.01em] text-ink">
                          {step.title}
                        </h3>
                        <p className="mt-4 max-w-lg leading-[1.7] text-umber">{step.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
              <div className="lg:sticky lg:top-[calc(var(--nav-h)+48px)]">
                <div className="js-approach-imgwrap relative aspect-[4/5] overflow-hidden border-2 border-stone/60">
                  {/* parallax layer (0.15×) + scrub settle scale/rotation (scroll-fx §3/§6) */}
                  <Parallax speed={0.15} className="absolute inset-x-0 -inset-y-[12%]">
                    <ScrubMedia className="h-full w-full" scaleFrom={1.15} rotateFrom={1.2}>
                      <img
                        src="/assets/original/who-we-are-fold.jpg"
                        alt={T.approachImgAlt}
                        className="js-approach-img h-full w-full object-cover"
                        loading="lazy"
                      />
                    </ScrubMedia>
                  </Parallax>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= S4 — REGIONS ================= */}
      <section className="js-regions bg-ink text-bone" aria-label={T.regionsAria}>
        <div className="mx-auto max-w-site px-gutter py-[clamp(96px,14vw,200px)]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-8">{T.regionsEyebrow}</p>
              <h2 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.05] tracking-[-0.015em]">
                {T.regionsTitle}
              </h2>
            </div>
            <div className="flex flex-col justify-end lg:col-span-4">
              <Reveal delay={0.1}>
                <p className="leading-[1.7] text-parchment">
                  {T.regionsNote}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            {REGION_MARKERS.map((region) => (
              <button
                key={region.id}
                type="button"
                onMouseEnter={() => setActiveRegion(region.id)}
                onMouseLeave={() => setActiveRegion(null)}
                onFocus={() => setActiveRegion(region.id)}
                onBlur={() => setActiveRegion(null)}
                className={cn(
                  'js-chip rounded-full border px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-nav transition-colors duration-300',
                  activeRegion === region.id
                    ? 'border-bronze text-bronze'
                    : 'border-bone/25 text-bone/80 hover:border-bronze hover:text-bronze',
                )}
              >
                {locale === 'ru' ? (region.labelRu ?? region.label) : region.label}
              </button>
            ))}
          </div>

          {/* Two symmetric panels: abstract region map + live satellite
              view of the headquarters building (Google Maps, real-time). */}
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {/* regions dot map */}
            <div className="js-regions-map group flex flex-col border border-bone/15 p-6 transition-colors duration-500 hover:border-bronze/50 md:p-8">
              <div className="flex items-baseline justify-between gap-6">
                <p className="font-mono text-[10px] font-medium uppercase tracking-eyebrow text-bronze">
                  {T.mapPanelLabel}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-nav text-bone/50">
                  {T.mapPanelMeta}
                </p>
              </div>
              <div className="mt-8 flex flex-1 items-center">
                <RegionDotMap activeId={activeRegion} onHover={setActiveRegion} locale={locale} />
              </div>
              <p className="mt-8 border-t border-bone/10 pt-5 font-mono text-[10px] uppercase tracking-nav text-bone/50">
                {T.mapPanelFoot}
              </p>
            </div>

            {/* live satellite map — headquarters */}
            <div className="group flex flex-col border border-bone/15 p-6 transition-colors duration-500 hover:border-bronze/50 md:p-8">
              <div className="flex items-baseline justify-between gap-6">
                <p className="font-mono text-[10px] font-medium uppercase tracking-eyebrow text-bronze">
                  {T.officePanelLabel}
                </p>
                <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-nav text-bone/50">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-bronze" aria-hidden="true" />
                  {T.officePanelMeta}
                </span>
              </div>
              <div className="relative mt-8 flex-1 overflow-hidden border border-bone/10">
                <iframe
                  title={T.officeMapTitle}
                  src="https://maps.google.com/maps?q=Kanika%20Business%20Center%2C%2028%20Oktovriou%20317A%2C%20Limassol%2C%20Cyprus&t=k&z=19&output=embed"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="mt-8 border-t border-bone/10 pt-5 font-mono text-[10px] uppercase tracking-nav text-bone/50">
                {T.officePanelFoot}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= S5 — CTA ================= */}
      <section className="js-cta bg-bone" aria-label={T.ctaAria}>
        <div className="mx-auto max-w-site px-gutter py-[clamp(120px,16vw,220px)]">
          <p className="eyebrow mb-8">{T.ctaEyebrow}</p>
          <h2 className="max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.05] tracking-[-0.015em] text-ink">
            <SplitWords text={T.ctaTitle} />
          </h2>
          <p className="mt-8 max-w-xl text-[clamp(1.05rem,1.4vw,1.3rem)] leading-[1.65] text-umber">
            {T.ctaBody}
          </p>
          <div className="js-cta-actions mt-12 flex flex-wrap items-center gap-8">
            <MagneticButton to={T.contactPath} variant="primary">
              {T.ctaButton}
            </MagneticButton>
            <div className="flex items-center gap-8">
              <Link
                to={T.corporatesPath}
                className="group inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-button text-bronze"
              >
                {T.corporates}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
              <Link
                to={T.privatePath}
                className="group inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-button text-bronze"
              >
                {T.privateClients}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
