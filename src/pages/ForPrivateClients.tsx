import { useContext, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import usePageMeta from '@/components/usePageMeta';
import useHtmlLang from '@/components/useHtmlLang';
import { AppReadyContext } from '@/components/app-ready-context';
import MagneticButton from '@/components/MagneticButton';
import SplitWords, { MaskWord } from '@/components/SplitWords';
import ServiceAccordion from '@/components/services/ServiceAccordion';
import VelocitySkew from '@/components/scroll/VelocitySkew';
import { PRIVATE_SERVICES, PRIVATE_DETAIL_PATH } from '@/components/services/data';

gsap.registerPlugin(ScrollTrigger);

const EN_STRINGS = {
  metaTitle: 'Private Client Services — SC Advisors | Family Office, Residency & Concierge',
  metaDescription:
    'Family office, succession planning, Cyprus residency and non-dom status, real estate investment, concierge and private tax advisory for HNWIs and entrepreneurs — SC Advisors, Limassol.',
  heroAria: 'For private clients',
  heroEyebrow: 'For Private Clients',
  heroTitleAria: 'Preserve and grow generational wealth.',
  heroWords: [
    { text: 'Preserve', accent: false },
    { text: 'and', accent: false },
    { text: 'grow', accent: false },
    { text: 'generational', accent: true },
    { text: 'wealth.', accent: true },
  ],
  heroLead:
    'We help family offices and high-net-worth individuals navigate regulatory and administrative frameworks, preserve generational wealth, assist in succession planning, and speed up the process of managing and investing wealth.',
  practiceStrip: 'Family Office — Succession — Residency — Concierge',
  s2Aria: 'Private client services',
  s2Eyebrow: '01 — Private Services',
  s2Title: 'Absolute discretion. Complete capability.',
  accordionTag: 'Private Practice',
  s3Aria: 'Featured — Concierge Services',
  s3Eyebrow: 'Featured — Concierge Services',
  s3Title: 'Luxury lifestyle management, delivered with absolute discretion.',
  s3Lead:
    'From relocation logistics to day-to-day arrangements, our concierge practice handles the details so you can focus on what matters.',
  s3Caption: 'Absolute Discretion',
  s4Aria: 'Featured — Multifamily Office',
  s4Eyebrow: 'Featured — Multifamily Office',
  s4Title: 'One trusted office for everything your family owns — and everything it plans to become.',
  s4Lead:
    'We coordinate wealth structuring, succession planning, real estate, banking and reporting under one accountable roof — so generational wealth is preserved, organised and ready to move when you are.',
  s5Aria: 'Contact',
  s5Title: 'Begin the conversation — in confidence.',
  ctaPrimary: 'Contact Our Team',
  ctaPrimaryHref: '/contact',
  ctaSecondary: 'Explore Corporate Services',
  ctaSecondaryHref: '/for-corporates',
  detailBasePath: PRIVATE_DETAIL_PATH,
};

const RU_STRINGS: typeof EN_STRINGS = {
  metaTitle: 'Услуги для частных клиентов — SC Advisors | Семейный офис, резидентство и консьерж',
  metaDescription:
    'Семейный офис, наследственное планирование, резидентство на Кипре и статус non-dom, инвестиции в недвижимость, консьерж и частное налоговое консультирование для состоятельных лиц и предпринимателей — SC Advisors, Лимассол.',
  heroAria: 'Для частных клиентов',
  heroEyebrow: 'Для частных клиентов',
  heroTitleAria: 'Сохраняем и приумножаем капитал поколений.',
  heroWords: [
    { text: 'Сохраняем', accent: false },
    { text: 'и', accent: false },
    { text: 'приумножаем', accent: false },
    { text: 'капитал', accent: true },
    { text: 'поколений.', accent: true },
  ],
  heroLead:
    'Мы помогаем семейным офисам и состоятельным частным лицам ориентироваться в регуляторных и административных требованиях, сохранять капитал поколений, планировать наследование, а также эффективнее управлять капиталом и инвестировать.',
  practiceStrip: 'Семейный офис — Наследование — Резидентство — Консьерж',
  s2Aria: 'Услуги для частных клиентов',
  s2Eyebrow: '01 — Частные услуги',
  s2Title: 'Абсолютная конфиденциальность. Полный спектр возможностей.',
  accordionTag: 'Частная практика',
  s3Aria: 'Ключевое направление — Консьерж-сервис',
  s3Eyebrow: 'Ключевое направление — Консьерж-сервис',
  s3Title: 'Управление стилем жизни премиум-класса — с абсолютной конфиденциальностью.',
  s3Lead:
    'От логистики переезда до повседневных поручений — наша консьерж-практика берёт на себя детали, чтобы вы могли сосредоточиться на главном.',
  s3Caption: 'Абсолютная конфиденциальность',
  s4Aria: 'Ключевое направление — Мультисемейный офис',
  s4Eyebrow: 'Ключевое направление — Мультисемейный офис',
  s4Title: 'Один надёжный офис для всего, чем владеет ваша семья, — и всего, чему ей предстоит стать.',
  s4Lead:
    'Мы координируем структурирование капитала, наследственное планирование, недвижимость, банкинг и отчётность под одной ответственной крышей — чтобы капитал поколений был сохранён, организован и готов к действию, когда готовы вы.',
  s5Aria: 'Контакты',
  s5Title: 'Начнём диалог — конфиденциально.',
  ctaPrimary: 'Связаться с нашей командой',
  ctaPrimaryHref: '/ru/contact',
  ctaSecondary: 'Корпоративные услуги',
  ctaSecondaryHref: '/ru/for-corporates',
  detailBasePath: '/ru/for-private-clients',
};

const MFO_STATS = [
  {
    target: 100,
    suffix: '+',
    label: 'Family offices & private clients',
    labelRu: 'Семейных офисов и частных клиентов',
  },
  { target: 15, suffix: '', label: 'Regions', labelRu: 'Регионов' },
  {
    target: 2014,
    suffix: '',
    label: 'Trusted experts since',
    labelRu: 'Экспертам доверяют с',
  },
];

export default function ForPrivateClients({ locale = 'en' }: { locale?: 'en' | 'ru' }) {
  const ready = useContext(AppReadyContext);
  const rootRef = useRef<HTMLDivElement>(null);
  const T = locale === 'ru' ? RU_STRINGS : EN_STRINGS;

  useHtmlLang(locale);
  usePageMeta(T.metaTitle, T.metaDescription);

  const services =
    locale === 'ru'
      ? PRIVATE_SERVICES.map((s) => ({
          ...s,
          title: s.titleRu ?? s.title,
          description: s.descriptionRu ?? s.description,
        }))
      : PRIVATE_SERVICES;

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

        /* S2 — section title reveal */
        gsap.fromTo(
          '.js-s2 .js-word',
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.045,
            scrollTrigger: { trigger: '.js-s2', start: 'top 80%', once: true },
          },
        );

        /* S3 — concierge: pinned cinematic band (scrub) */
        const conciergeTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.js-concierge',
            start: 'top top',
            end: '+=100%',
            pin: true,
            scrub: 1,
          },
        });
        conciergeTl
          .fromTo('.js-concierge-bg', { scale: 1.15 }, { scale: 1, ease: 'none', duration: 1 }, 0)
          .fromTo(
            '.js-concierge-bg',
            { yPercent: -5 },
            { yPercent: 5, ease: 'none', duration: 1 },
            0,
          )
          .fromTo(
            '.js-concierge-title',
            { letterSpacing: '0.08em', opacity: 0.55 },
            { letterSpacing: '-0.015em', opacity: 1, ease: 'none', duration: 0.8 },
            0,
          )
          .fromTo(
            '.js-concierge-caption',
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
            0.75,
          );

        /* S4 — multifamily office: body stagger + stat counters */
        gsap.fromTo(
          '.js-mfo-copy > *',
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: { trigger: '.js-mfo', start: 'top 75%', once: true },
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
          Same language as the Who We Are + What We Do heroes: orange planet
          right, masked-word headline with bronze italics, bronze rule,
          bottom fade into bone. */}
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
            {T.heroWords.map((word, i) => (
              <span key={`${word.text}-${i}`}>
                {i > 0 ? ' ' : null}
                <MaskWord
                  innerClassName={word.accent ? 'font-normal italic text-bronze' : undefined}
                >
                  {word.text}
                </MaskWord>
              </span>
            ))}
          </h1>
          <p className="js-hero-fade mt-10 max-w-xl text-[clamp(1.05rem,1.4vw,1.3rem)] leading-[1.65] text-parchment">
            {T.heroLead}
          </p>
          <p className="js-hero-fade mt-8 font-mono text-[10px] uppercase tracking-nav text-bone/60">
            {T.practiceStrip}
          </p>
        </div>
      </section>

      {/* ================= S2 — FULL SERVICE INDEX ================= */}
      <section className="js-s2 bg-bone" aria-label={T.s2Aria}>
        <div className="mx-auto max-w-site px-gutter py-[clamp(96px,14vw,200px)]">
          <p className="eyebrow mb-8">{T.s2Eyebrow}</p>
          <h2 className="mb-16 max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.05] tracking-[-0.015em] text-ink">
            <SplitWords text={T.s2Title} />
          </h2>
          {/* velocity-reactive skew on the service accordion (scroll-fx §2) */}
          <VelocitySkew>
            <ServiceAccordion
              items={services}
              tag={T.accordionTag}
              basePath={T.detailBasePath}
              exploreLabel={locale === 'ru' ? 'Подробнее' : 'Explore service'}
            />
          </VelocitySkew>
        </div>
      </section>

      {/* ================= S3 — FEATURED: CONCIERGE (pinned band) ================= */}
      <section
        id="concierge-feature"
        className="js-concierge relative overflow-hidden bg-ink text-bone"
        aria-label={T.s3Aria}
      >
        {/* dimmed, blurred background layer with parallax */}
        <div className="js-concierge-bg absolute -inset-[8%]" aria-hidden="true">
          <img
            src="/assets/about.jpg"
            alt=""
            className="h-full w-full object-cover opacity-[0.18] blur-[2px]"
            loading="lazy"
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-3xl flex-col items-center justify-center px-gutter py-24 text-center">
          <p className="eyebrow mb-10">{T.s3Eyebrow}</p>
          <h3 className="js-concierge-title font-display text-[clamp(1.8rem,4.2vw,3.6rem)] font-light italic leading-[1.15] tracking-[-0.015em]">
            {T.s3Title}
          </h3>
          <p className="mt-10 max-w-xl leading-[1.7] text-parchment">
            {T.s3Lead}
          </p>
          <p className="js-concierge-caption mt-16 font-mono text-[11px] font-medium uppercase tracking-eyebrow text-bronze">
            {T.s3Caption}
          </p>
        </div>
      </section>

      {/* ================= S4 — FEATURED: MULTIFAMILY OFFICE ================= */}
      <section id="multifamily-feature" className="js-mfo bg-ivory" aria-label={T.s4Aria}>
        <div className="mx-auto max-w-site px-gutter py-[clamp(96px,14vw,200px)]">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-8">
            <div className="js-mfo-copy lg:col-span-7">
              <p className="eyebrow mb-8">{T.s4Eyebrow}</p>
              <h3 className="font-display text-[clamp(1.8rem,3.4vw,3rem)] font-light leading-[1.1] tracking-[-0.015em] text-ink">
                {T.s4Title}
              </h3>
              <p className="mt-10 max-w-xl leading-[1.7] text-umber">
                {T.s4Lead}
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              {MFO_STATS.map((stat) => (
                <div key={stat.label} className="border-t border-stone py-6 last:border-b">
                  <p className="font-display text-[clamp(2.4rem,4vw,3.6rem)] font-light leading-none text-ink">
                    <span
                      className="js-stat-num"
                      data-target={stat.target}
                      data-suffix={stat.suffix}
                    >
                      {stat.target}
                      {stat.suffix}
                    </span>
                  </p>
                  <p className="mt-3 font-mono text-[11px] font-medium uppercase tracking-nav text-mist">
                    {locale === 'ru' ? stat.labelRu : stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= S5 — CTA ================= */}
      <section className="js-cta bg-bone" aria-label={T.s5Aria}>
        <div className="mx-auto max-w-site px-gutter py-[clamp(120px,16vw,220px)]">
          <h2 className="max-w-4xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.05] tracking-[-0.015em] text-ink">
            <SplitWords text={T.s5Title} />
          </h2>
          <div className="js-cta-actions mt-12 flex flex-wrap items-center gap-8">
            <MagneticButton to={T.ctaPrimaryHref} variant="primary">
              {T.ctaPrimary}
            </MagneticButton>
            <MagneticButton to={T.ctaSecondaryHref} variant="ghost-light">
              {T.ctaSecondary}
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
