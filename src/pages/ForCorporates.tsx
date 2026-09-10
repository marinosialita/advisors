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
import Reveal from '@/components/scroll/Reveal';
import { CORPORATE_SERVICES, CORPORATE_DETAIL_PATH } from '@/components/services/data';

gsap.registerPlugin(ScrollTrigger);

const EN_STRINGS = {
  metaTitle: 'Corporate Services — SC Advisors | Company Formation, Banking, Tax & Legal',
  metaDescription:
    'Company formation and redomiciliation in Cyprus, banking, corporate governance, fiduciary, fund administration, tax & VAT, IP Box, M&A and licensing — CySEC-regulated advisors in Limassol.',
  heroAria: 'For corporates',
  heroEyebrow: 'For Corporates',
  heroTitleAria: 'Take your business to a new level.',
  heroWords: [
    { text: 'Take', accent: false },
    { text: 'your', accent: false },
    { text: 'business', accent: false },
    { text: 'to', accent: false },
    { text: 'a', accent: false },
    { text: 'new', accent: true },
    { text: 'level.', accent: true },
  ],
  heroLead:
    'Whether you want to establish a company or relocate an existing company in Cyprus or another jurisdiction, our professional team of experts combine specialist expertise with personal service to help you every step of the way.',
  practiceStrip: 'LEGAL — CORPORATE — FIDUCIARY — TAX — FUNDS — BANKING',
  s2Aria: 'Corporate services',
  s2Eyebrow: '01 — Corporate Services',
  s2Title: 'Fourteen disciplines. One accountable team.',
  accordionTag: 'Corporate Practice',
  s3Aria: 'Featured — Banking',
  s3Eyebrow: 'Featured — Banking',
  s3Title: 'Banking, structured around your business.',
  s3Lead:
    'End-to-end banking support, from bank selection to account structuring and ongoing coordination.',
  s4Aria: 'Featured — Legal',
  s4Eyebrow: 'Featured — Legal',
  s4Title: 'Legal counsel for technology-driven companies.',
  s4Lead: 'Dedicated advisory for IT, SaaS, AI and software businesses.',
  s5Aria: 'Get started',
  s5Title: 'Ready to establish, relocate or restructure?',
  ctaPrimary: 'Start a Conversation',
  ctaPrimaryHref: '/contact',
  ctaSecondary: 'Explore Private Client Services',
  ctaSecondaryHref: '/for-private-clients',
  detailBasePath: CORPORATE_DETAIL_PATH,
};

const RU_STRINGS: typeof EN_STRINGS = {
  metaTitle: 'Корпоративные услуги — SC Advisors | Регистрация компаний, банкинг, налоги и право',
  metaDescription:
    'Регистрация и редомициляция компаний на Кипре, банковское сопровождение, корпоративное управление, фидуциарные услуги, администрирование фондов, налоги и НДС, IP Box, M&A и лицензирование — консультанты под надзором CySEC в Лимассоле.',
  heroAria: 'Для корпоративных клиентов',
  heroEyebrow: 'Для корпоративных клиентов',
  heroTitleAria: 'Выведите ваш бизнес на новый уровень.',
  heroWords: [
    { text: 'Выведите', accent: false },
    { text: 'ваш', accent: false },
    { text: 'бизнес', accent: false },
    { text: 'на', accent: false },
    { text: 'новый', accent: true },
    { text: 'уровень.', accent: true },
  ],
  heroLead:
    'Независимо от того, хотите ли вы учредить компанию или перенести существующую на Кипр либо в другую юрисдикцию, наша команда профессионалов сочетает узкую экспертизу с персональным сервисом и сопровождает вас на каждом этапе.',
  practiceStrip: 'ПРАВО — КОРПОРАТИВНАЯ ПРАКТИКА — ФИДУЦИАРНЫЕ УСЛУГИ — НАЛОГИ — ФОНДЫ — БАНКИНГ',
  s2Aria: 'Корпоративные услуги',
  s2Eyebrow: '01 — Корпоративные услуги',
  s2Title: 'Четырнадцать направлений. Одна ответственная команда.',
  accordionTag: 'Корпоративная практика',
  s3Aria: 'Ключевое направление — Банковское сопровождение',
  s3Eyebrow: 'Ключевое направление — Банкинг',
  s3Title: 'Банковские решения, выстроенные вокруг вашего бизнеса.',
  s3Lead:
    'Полное банковское сопровождение — от выбора банка до структурирования счетов и постоянной координации.',
  s4Aria: 'Ключевое направление — Юридические услуги',
  s4Eyebrow: 'Ключевое направление — Право',
  s4Title: 'Юридическое сопровождение технологичных компаний.',
  s4Lead: 'Специализированное консультирование IT-, SaaS-, AI- и софтверных компаний.',
  s5Aria: 'Начать работу',
  s5Title: 'Готовы учредить, перенести или реструктурировать компанию?',
  ctaPrimary: 'Начать диалог',
  ctaPrimaryHref: '/ru/contact',
  ctaSecondary: 'Услуги для частных клиентов',
  ctaSecondaryHref: '/ru/for-private-clients',
  detailBasePath: '/ru/for-corporates',
};

const BANKING_CAPABILITIES = [
  {
    index: '01',
    title: 'Bank Selection',
    gloss: 'Identifying the right banking partners for your profile.',
    titleRu: 'Выбор банка',
    glossRu: 'Подбор банковских партнёров под ваш профиль.',
  },
  {
    index: '02',
    title: 'Account Structuring',
    gloss: 'Structured for tax efficiency.',
    titleRu: 'Структурирование счетов',
    glossRu: 'Структура счетов с учётом налоговой эффективности.',
  },
  {
    index: '03',
    title: 'Paperwork',
    gloss: 'Complete preparation and handling of documentation.',
    titleRu: 'Документы',
    glossRu: 'Полная подготовка и ведение документации.',
  },
  {
    index: '04',
    title: 'Coordination',
    gloss: 'End-to-end coordination with the bank on your behalf.',
    titleRu: 'Координация',
    glossRu: 'Комплексная координация с банком от вашего имени.',
  },
  {
    index: '05',
    title: 'Signatory Services',
    gloss: 'Professional signatory support where required.',
    titleRu: 'Услуги подписанта',
    glossRu: 'Профессиональная поддержка подписанта там, где это необходимо.',
  },
  {
    index: '06',
    title: 'Payment Facilitation',
    gloss: 'Smooth facilitation of payments and operations.',
    titleRu: 'Проведение платежей',
    glossRu: 'Беспрепятственное проведение платежей и операций.',
  },
];

const LEGAL_CAPABILITIES = [
  {
    title: 'Company Formation & Structuring',
    gloss: 'The right corporate foundation for technology ventures.',
    titleRu: 'Регистрация и структурирование компаний',
    glossRu: 'Правильный корпоративный фундамент для технологических проектов.',
  },
  {
    title: 'IP Protection',
    gloss: 'Copyright, design, trademark and licensing strategies.',
    titleRu: 'Защита интеллектуальной собственности',
    glossRu: 'Стратегии защиты авторских прав, дизайна, товарных знаков и лицензирования.',
  },
  {
    title: 'Technology & Commercial Contracts',
    gloss: 'SaaS agreements, SLAs and commercial terms.',
    titleRu: 'Технологические и коммерческие договоры',
    glossRu: 'SaaS-соглашения, SLA и коммерческие условия.',
  },
  {
    title: 'GDPR Compliance',
    gloss: 'Data-protection compliance built into your operations.',
    titleRu: 'Соответствие GDPR',
    glossRu: 'Соответствие требованиям о защите данных, встроенное в ваши операционные процессы.',
  },
  {
    title: 'Employment & Contractor Agreements',
    gloss: 'Clear, enforceable team arrangements.',
    titleRu: 'Трудовые договоры и договоры с подрядчиками',
    glossRu: 'Прозрачные и юридически надёжные договорённости с командой.',
  },
  {
    title: 'Startup Advisory',
    gloss: 'Ongoing counsel for SaaS, AI and software startups.',
    titleRu: 'Сопровождение стартапов',
    glossRu: 'Постоянное консультирование SaaS-, AI- и софтверных стартапов.',
  },
];

export default function ForCorporates({ locale = 'en' }: { locale?: 'en' | 'ru' }) {
  const ready = useContext(AppReadyContext);
  const rootRef = useRef<HTMLDivElement>(null);
  const T = locale === 'ru' ? RU_STRINGS : EN_STRINGS;

  useHtmlLang(locale);
  usePageMeta(T.metaTitle, T.metaDescription);

  const services =
    locale === 'ru'
      ? CORPORATE_SERVICES.map((s) => ({
          ...s,
          title: s.titleRu ?? s.title,
          description: s.descriptionRu ?? s.description,
        }))
      : CORPORATE_SERVICES;

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

        /* S3 — banking cells: stagger in, 1px borders draw (scaleX → scaleY) */
        gsap.fromTo(
          '.js-bank-cell',
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: { trigger: '.js-bank-grid', start: 'top 78%', once: true },
          },
        );
        gsap.fromTo(
          '.js-bank-border-x',
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'power2.inOut',
            transformOrigin: 'left center',
            stagger: 0.08,
            scrollTrigger: { trigger: '.js-bank-grid', start: 'top 78%', once: true },
          },
        );
        gsap.fromTo(
          '.js-bank-border-y',
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.9,
            delay: 0.35,
            ease: 'power2.inOut',
            transformOrigin: 'center top',
            stagger: 0.08,
            scrollTrigger: { trigger: '.js-bank-grid', start: 'top 78%', once: true },
          },
        );

        /* S4 — legal rows: alternating left/right 24px slides */
        gsap.utils.toArray<HTMLElement>('.js-legal-row').forEach((row, i) => {
          gsap.fromTo(
            row,
            { x: i % 2 === 0 ? -24 : 24, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'expo.out',
              delay: i * 0.07,
              scrollTrigger: { trigger: '.js-legal-list', start: 'top 80%', once: true },
            },
          );
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

      {/* ================= S3 — FEATURED: BANKING ================= */}
      <section id="banking-feature" className="bg-ivory" aria-label={T.s3Aria}>
        <div className="mx-auto max-w-site px-gutter py-[clamp(96px,14vw,200px)]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow mb-8">{T.s3Eyebrow}</p>
                <h3 className="font-display text-[clamp(1.8rem,3.4vw,3rem)] font-light leading-[1.1] tracking-[-0.015em] text-ink">
                  {T.s3Title}
                </h3>
              </Reveal>
            </div>
            <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9">
              <Reveal delay={0.1}>
                <p className="leading-[1.7] text-umber">{T.s3Lead}</p>
              </Reveal>
            </div>
          </div>

          <div className="js-bank-grid mt-16 grid gap-px border border-stone bg-stone md:grid-cols-2 lg:grid-cols-3">
            {BANKING_CAPABILITIES.map((cap) => (
              <div key={cap.index} className="js-bank-cell group relative bg-ivory p-8 lg:p-10">
                {/* drawn borders (animated by GSAP) */}
                <span
                  className="js-bank-border-x absolute inset-x-0 top-0 h-px bg-bronze/60"
                  aria-hidden="true"
                />
                <span
                  className="js-bank-border-y absolute inset-y-0 left-0 w-px bg-bronze/60"
                  aria-hidden="true"
                />
                <span
                  className="block h-1.5 w-1.5 rounded-full bg-bronze opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <p className="mt-4 font-mono text-[11px] font-medium uppercase tracking-eyebrow text-ink transition-transform duration-300 ease-out-expo group-hover:translate-x-1">
                  {locale === 'ru' ? cap.titleRu : cap.title}
                </p>
                <p className="mt-4 text-sm leading-[1.7] text-umber">
                  {locale === 'ru' ? cap.glossRu : cap.gloss}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= S4 — FEATURED: LEGAL / IT & TECHNOLOGY ================= */}
      <section id="legal-feature" className="bg-ink text-bone" aria-label={T.s4Aria}>
        <div className="mx-auto max-w-site px-gutter py-[clamp(96px,14vw,200px)]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow mb-8">{T.s4Eyebrow}</p>
                <h3 className="font-display text-[clamp(1.8rem,3.4vw,3rem)] font-light leading-[1.1] tracking-[-0.015em]">
                  {T.s4Title}
                </h3>
                <p className="mt-8 max-w-xl leading-[1.7] text-parchment">
                  {T.s4Lead}
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <div className="js-legal-list border-t border-bone/15">
                {LEGAL_CAPABILITIES.map((cap, i) => (
                  <div
                    key={cap.title}
                    className="js-legal-row group relative border-b border-bone/15 py-7 pl-6"
                  >
                    <span
                      className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-bronze transition-transform duration-300 ease-out-expo group-hover:scale-y-100"
                      aria-hidden="true"
                    />
                    <p className="font-mono text-[11px] font-medium uppercase tracking-eyebrow text-bronze">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h4 className="mt-3 font-display text-xl leading-[1.2] text-bone md:text-2xl">
                      {locale === 'ru' ? cap.titleRu : cap.title}
                    </h4>
                    <p className="mt-3 text-sm leading-[1.7] text-parchment/80">
                      {locale === 'ru' ? cap.glossRu : cap.gloss}
                    </p>
                  </div>
                ))}
              </div>
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
