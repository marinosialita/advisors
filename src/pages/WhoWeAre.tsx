import { Fragment, useContext, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AppReadyContext } from '@/components/app-ready-context';
import MagneticButton from '@/components/MagneticButton';
import SplitWords, { MaskWord } from '@/components/SplitWords';
import TeamGrid from '@/components/who-we-are/TeamGrid';
import Parallax from '@/components/scroll/Parallax';
import ScrubMedia from '@/components/scroll/ScrubMedia';
import VelocitySkew from '@/components/scroll/VelocitySkew';
import useHtmlLang from '@/components/useHtmlLang';
import usePageMeta from '@/components/usePageMeta';
import { LEGAL } from '@/data/site';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Strings (design/who-we-are.md) — EN source + RU mirror              */
/* ------------------------------------------------------------------ */

const EN_STRINGS = {
  metaTitle: 'Who We Are — SC Advisors | CySEC-Regulated Advisory in Cyprus',
  metaDescription:
    'SC Advisors — Smart & Compliant Advisors. Company story, values, CySEC regulatory standing and the full team of specialists in Limassol, Cyprus.',

  heroAria: 'Who we are',
  heroEyebrow: 'Who We Are',
  heroTitleAria: 'We are your reliable partner for successful business.',
  heroWords: [
    { text: 'We' },
    { text: 'are' },
    { text: 'your' },
    { text: 'reliable', accent: true },
    { text: 'partner', accent: true },
    { text: 'for' },
    { text: 'successful' },
    { text: 'business.' },
  ],
  heroSub:
    'Licensed administrative service provider regulated by CySEC — trusted experts since 2014.',
  heroLocation: 'Kanika Business Center — Limassol, Cyprus',

  storyAria: 'The firm',
  storyEyebrow: '01 — The Firm',
  storyStatementA:
    'SC Advisors — Smart & Compliant Advisors — is a licensed administrative service provider based in ',
  storyStatementEm1: 'Limassol, Cyprus',
  storyStatementB:
    ', regulated by the Cyprus Securities and Exchange Commission (CySEC). ',
  storyStatementEm2: 'Trusted experts since 2014.',
  storyP2:
    'Our expertise spans corporate structuring, business relocation, real estate transactions, human resources and banking — one team across the full lifecycle of your business.',
  storyP3:
    'Compliance, confidentiality and reliability underpin every engagement — from the first conversation to a partnership measured in decades.',
  pillars: [
    ['01', 'Licensed & CySEC-regulated'],
    ['02', 'Full-lifecycle expertise — one team'],
    ['03', 'Compliance, confidentiality, reliability'],
  ],
  storyImgAlt: 'SC Advisors office — Kanika Business Center, Limassol',
  storyCaptionA: 'Kanika Business Center',
  storyCaptionB: 'Limassol, Cyprus',

  valuesAria: 'Our values',
  valuesEyebrow: '02 — Our Values',
  values: [
    { index: '01', name: 'Integrity', gloss: 'We say what we do, and do what we say.' },
    { index: '02', name: 'Excellence', gloss: 'Specialist expertise, held to the highest standard.' },
    { index: '03', name: 'Trust', gloss: 'Earned through consistency, kept through discretion.' },
    { index: '04', name: 'Long-term Thinking', gloss: 'Advice measured in decades, not quarters.' },
    { index: '05', name: 'Clarity', gloss: 'Complex frameworks, made simple.' },
  ],

  regAria: 'Regulatory statement',
  regEyebrow: 'Regulated & Accountable',
  regQuote:
    'A licensed administrative service provider, regulated by the Cyprus Securities and Exchange Commission.',
  regNo: 'Reg. No.',
  republic: 'Republic of Cyprus',

  teamAria: 'The team',
  teamEyebrow: '03 — The Team',
  teamTitle: 'Working together, going further.',

  ctaAria: 'Join or contact us',
  ctaEyebrow: '04 — Join / Contact',
  careersLabel: 'Careers',
  careersTitle: 'Grow with a team that thinks in decades.',
  careersButton: 'Join our Team',
  careersHref: '/careers',
  contactLabel: 'Contact',
  contactTitle: 'Tell us about your next challenge.',
  contactButton: 'Start a Conversation',
  contactHref: '/contact',
};

type Strings = typeof EN_STRINGS;

const RU_STRINGS: Strings = {
  metaTitle: 'Кто мы — SC Advisors | Консалтинг на Кипре под надзором CySEC',
  metaDescription:
    'SC Advisors — Smart & Compliant Advisors. История компании, ценности, регуляторный статус CySEC и вся команда специалистов в Лимассоле, Кипр.',

  heroAria: 'Кто мы',
  heroEyebrow: 'Кто мы',
  heroTitleAria: 'Мы — ваш надёжный партнёр для успешного бизнеса.',
  heroWords: [
    { text: 'Мы' },
    { text: '—' },
    { text: 'ваш' },
    { text: 'надёжный', accent: true },
    { text: 'партнёр', accent: true },
    { text: 'для' },
    { text: 'успешного' },
    { text: 'бизнеса.' },
  ],
  heroSub:
    'Лицензированный провайдер административных услуг под надзором CySEC — эксперты, которым доверяют с 2014 года.',
  heroLocation: 'Kanika Business Center — Лимассол, Кипр',

  storyAria: 'О компании',
  storyEyebrow: '01 — О компании',
  storyStatementA:
    'SC Advisors — Smart & Compliant Advisors — лицензированный провайдер административных услуг с офисом в ',
  storyStatementEm1: 'Лимассоле, Кипр',
  storyStatementB:
    ', регулируемый Кипрской комиссией по ценным бумагам и биржам (CySEC). ',
  storyStatementEm2: 'Эксперты, которым доверяют с 2014 года.',
  storyP2:
    'Наша экспертиза охватывает корпоративное структурирование, релокацию бизнеса, сделки с недвижимостью, управление персоналом и банковское сопровождение — одна команда на всех этапах жизненного цикла вашего бизнеса.',
  storyP3:
    'Комплаенс, конфиденциальность и надёжность лежат в основе каждого нашего проекта — от первого разговора до партнёрства, исчисляемого десятилетиями.',
  pillars: [
    ['01', 'Лицензирована и регулируется CySEC'],
    ['02', 'Экспертиза полного цикла — одна команда'],
    ['03', 'Комплаенс, конфиденциальность, надёжность'],
  ],
  storyImgAlt: 'Офис SC Advisors — Kanika Business Center, Лимассол',
  storyCaptionA: 'Kanika Business Center',
  storyCaptionB: 'Лимассол, Кипр',

  valuesAria: 'Наши ценности',
  valuesEyebrow: '02 — Наши ценности',
  values: [
    { index: '01', name: 'Порядочность', gloss: 'Мы говорим то, что делаем, и делаем то, что говорим.' },
    { index: '02', name: 'Совершенство', gloss: 'Профильная экспертиза, выдержанная по высшему стандарту.' },
    { index: '03', name: 'Доверие', gloss: 'Заслуженное последовательностью, хранимое конфиденциальностью.' },
    { index: '04', name: 'Долгосрочное мышление', gloss: 'Советы, исчисляемые десятилетиями, а не кварталами.' },
    { index: '05', name: 'Ясность', gloss: 'Сложные структуры — простым языком.' },
  ],

  regAria: 'Регуляторный статус',
  regEyebrow: 'Регулирование и подотчётность',
  regQuote:
    'Лицензированный провайдер административных услуг, регулируемый Кипрской комиссией по ценным бумагам и биржам.',
  regNo: 'Рег. №',
  republic: 'Республика Кипр',

  teamAria: 'Команда',
  teamEyebrow: '03 — Команда',
  teamTitle: 'Работаем вместе, идём дальше.',

  ctaAria: 'Присоединяйтесь или свяжитесь с нами',
  ctaEyebrow: '04 — Карьера / Контакты',
  careersLabel: 'Карьера',
  careersTitle: 'Развивайтесь в команде, которая мыслит десятилетиями.',
  careersButton: 'Присоединяйтесь к команде',
  careersHref: '/ru/careers',
  contactLabel: 'Контакты',
  contactTitle: 'Расскажите нам о вашей следующей задаче.',
  contactButton: 'Начать диалог',
  contactHref: '/ru/contact',
};

/* ------------------------------------------------------------------ */
/* Who We Are                                                          */
/* ------------------------------------------------------------------ */

export default function WhoWeAre({ locale = 'en' }: { locale?: 'en' | 'ru' }) {
  const T = locale === 'ru' ? RU_STRINGS : EN_STRINGS;
  const ready = useContext(AppReadyContext);
  const rootRef = useRef<HTMLDivElement>(null);

  useHtmlLang(locale);

  /* ---- SEO (design/who-we-are.md) ----------------------------------- */
  usePageMeta(T.metaTitle, T.metaDescription);

  /* ---- GSAP scroll storytelling (guarded for reduced motion) -------- */
  useEffect(() => {
    if (!ready || !rootRef.current) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        /* S1 — hero load-in (runs after preloader reveals) */
        const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
        intro
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

        /* S2 — story prose + fold image masked reveal */
        gsap.fromTo(
          '.js-story-p',
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: { trigger: '.js-story', start: 'top 75%', once: true },
          },
        );
        gsap.fromTo(
          '.js-story-fig',
          { clipPath: 'inset(12% 8% 12% 8%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.js-story-fig', start: 'top 75%', once: true },
          },
        );
        /* story fig image scale is scrub-driven via ScrubMedia (scroll-fx §6) */

        /* S3 — values rows: rule draws, then text slides up */
        gsap.fromTo(
          '.js-value-rule',
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'power2.inOut',
            transformOrigin: 'left center',
            stagger: 0.08,
            scrollTrigger: { trigger: '.js-values-list', start: 'top 80%', once: true },
          },
        );
        gsap.fromTo(
          '.js-value-text',
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: { trigger: '.js-values-list', start: 'top 80%', once: true },
          },
        );

        /* S4 — regulatory quote: sequential word fade + rules draw inward */
        gsap.fromTo(
          '.js-reg-rule',
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: '.js-reg', start: 'top 75%', once: true },
          },
        );
        gsap.fromTo(
          '.js-q-word',
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'expo.out',
            stagger: 0.04,
            scrollTrigger: { trigger: '.js-reg', start: 'top 75%', once: true },
          },
        );
        gsap.fromTo(
          '.js-reg-legal',
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            delay: 0.6,
            scrollTrigger: { trigger: '.js-reg', start: 'top 75%', once: true },
          },
        );

        /* S5 — team title + card stagger with masked image reveals */
        gsap.fromTo(
          '.js-team-title .js-word',
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.045,
            scrollTrigger: { trigger: '.js-team-title', start: 'top 80%', once: true },
          },
        );
        gsap.fromTo(
          '.js-team-card',
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'expo.out',
            stagger: 0.09,
            scrollTrigger: { trigger: '.js-team-grid', start: 'top 80%', once: true },
          },
        );
        gsap.fromTo(
          '.js-team-imgwrap',
          { clipPath: 'inset(12% 8% 12% 8%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: 'expo.out',
            stagger: 0.09,
            scrollTrigger: { trigger: '.js-team-grid', start: 'top 80%', once: true },
          },
        );
        gsap.fromTo(
          '.js-team-img',
          { scale: 1.25 },
          {
            scale: 1,
            duration: 1.2,
            ease: 'expo.out',
            stagger: 0.09,
            scrollTrigger: { trigger: '.js-team-grid', start: 'top 80%', once: true },
          },
        );

        /* S6 — CTA split panels clip-wipe from center outward */
        gsap.fromTo(
          '.js-cta-left',
          { clipPath: 'inset(0% 0% 0% 100%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.9,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: '.js-cta', start: 'top 70%', once: true },
          },
        );
        gsap.fromTo(
          '.js-cta-right',
          { clipPath: 'inset(0% 100% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.9,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: '.js-cta', start: 'top 70%', once: true },
          },
        );
      }, rootRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [ready]);

  return (
    <div ref={rootRef}>
      {/* ================= S1 — PAGE HERO (cinematic planet) ==========
          Same language as the homepage + contact heroes: orange planet
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
            className="max-w-[14ch] font-display text-[clamp(2.75rem,6.2vw,5.75rem)] font-light leading-[1.02] tracking-[-0.02em] text-bone [text-shadow:0_2px_40px_rgba(10,8,6,0.55)]"
            aria-label={T.heroTitleAria}
          >
            {T.heroWords.map((word, i) => (
              <Fragment key={`${word.text}-${i}`}>
                <MaskWord
                  innerClassName={word.accent ? 'font-normal italic text-bronze' : undefined}
                >
                  {word.text}
                </MaskWord>
                {i < T.heroWords.length - 1 ? ' ' : null}
              </Fragment>
            ))}
          </h1>
          <p className="js-hero-fade mt-10 max-w-md text-[clamp(1.05rem,1.4vw,1.3rem)] leading-[1.65] text-parchment">
            {T.heroSub}
          </p>
          <p className="js-hero-fade mt-8 font-mono text-[10px] uppercase tracking-nav text-bone/60">
            {T.heroLocation}
          </p>
        </div>
      </section>

      {/* ================= S2 — THE FIRM (editorial statement) ========
          Homepage language: orange eyebrow + bronze rule, display statement
          with italic accents, three numbered fact rows, photo with clean
          wipe reveal on the right. */}
      <section className="js-story bg-bone" aria-label={T.storyAria}>
        <div className="mx-auto max-w-site px-gutter py-[clamp(96px,14vw,200px)]">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-10">
            {/* statement column */}
            <div className="lg:col-span-7">
              <p className="eyebrow mb-8 text-bronze">{T.storyEyebrow}</p>
              <span className="js-story-p mb-10 block h-px w-32 bg-bronze" aria-hidden="true" />

              <p className="js-story-p font-display text-[clamp(1.8rem,3.4vw,3rem)] font-light leading-[1.25] tracking-[-0.01em] text-ink">
                {T.storyStatementA}
                <em className="font-normal italic text-bronze">{T.storyStatementEm1}</em>
                {T.storyStatementB}
                <em className="font-normal italic text-bronze">{T.storyStatementEm2}</em>
              </p>
              <p className="js-story-p mt-10 max-w-xl text-[17px] leading-[1.75] text-umber">
                {T.storyP2}
              </p>
              <p className="js-story-p mt-6 max-w-xl text-[17px] leading-[1.75] text-umber">
                {T.storyP3}
              </p>

              {/* the firm's pillars — numbered rows like the homepage guarantees */}
              <ul className="js-story-p mt-14 grid max-w-xl border-t border-stone">
                {T.pillars.map(([n, label]) => (
                  <li
                    key={n}
                    className="flex items-baseline gap-6 border-b border-stone py-5"
                  >
                    <span className="font-mono text-[11px] font-medium tracking-nav text-bronze">
                      {n}
                    </span>
                    <span className="font-display text-[clamp(1.1rem,1.7vw,1.5rem)] font-light text-ink">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* photograph column */}
            <div className="lg:col-span-5">
              <figure className="js-story-fig relative aspect-[4/5] w-full overflow-hidden">
                {/* parallax layer (0.15×) + scrub settle scale/rotation — scroll-fx §3/§6 */}
                <Parallax speed={0.15} className="absolute inset-x-0 -inset-y-[12%]">
                  <ScrubMedia className="h-full w-full" scaleFrom={1.15} rotateFrom={-1.2}>
                    <img
                      src="/assets/original/who-we-are-fold.jpg"
                      alt={T.storyImgAlt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </ScrubMedia>
                </Parallax>
                <span
                  className="pointer-events-none absolute inset-0 border border-ink/10"
                  aria-hidden="true"
                />
              </figure>
              <figcaption className="js-story-p mt-5 flex items-baseline justify-between font-mono text-[10px] uppercase tracking-eyebrow text-mist">
                <span>{T.storyCaptionA}</span>
                <span className="text-bronze">{T.storyCaptionB}</span>
              </figcaption>
            </div>
          </div>
        </div>
      </section>

      {/* ================= S3 — VALUES (ivory) ================= */}
      <section className="js-values bg-ivory" aria-label={T.valuesAria}>
        <div className="mx-auto max-w-site px-gutter py-[clamp(96px,14vw,200px)]">
          <p className="eyebrow mb-16">{T.valuesEyebrow}</p>

          <ul className="js-values-list">
            {T.values.map((value) => (
              <li key={value.index} className="group relative">
                <span className="js-value-rule rule" aria-hidden="true" />
                <div className="relative flex flex-col gap-3 py-10 md:flex-row md:items-baseline md:gap-16 md:py-12">
                  {/* ghost numeral enlarges behind on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 top-0 -translate-y-1/4 select-none font-display text-[4.5rem] font-light leading-none opacity-50 transition-transform ease-out-expo group-hover:scale-105 md:right-0 md:top-1/2 md:-translate-y-1/2 md:text-[10rem] md:opacity-100"
                    style={{
                      color: 'transparent',
                      WebkitTextStroke: '1px var(--stone)',
                      transitionDuration: '400ms',
                    }}
                  >
                    {value.index}
                  </span>

                  <div className="js-value-text relative z-10 flex flex-col gap-3 md:flex-row md:flex-1 md:items-baseline md:gap-16">
                    <span className="font-mono text-xs font-medium text-bronze">
                      {value.index}
                    </span>
                    <h3
                      className="font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-normal leading-[1.15] text-ink transition-[transform,color] ease-out-expo group-hover:translate-x-3 group-hover:text-bronze md:w-[45%] md:shrink-0"
                      style={{ transitionDuration: '400ms' }}
                    >
                      {value.name}
                    </h3>
                    <p className="max-w-md text-[15px] leading-[1.7] text-umber md:ml-auto md:text-right">
                      {value.gloss}
                    </p>
                  </div>
                </div>
              </li>
            ))}
            <li aria-hidden="true">
              <span className="js-value-rule rule" />
            </li>
          </ul>
        </div>
      </section>

      {/* ================= S4 — REGULATORY STATEMENT (ink band) ================= */}
      <section className="js-reg bg-ink text-bone" aria-label={T.regAria}>
        <div className="mx-auto max-w-site px-gutter py-[clamp(72px,10vw,128px)]">
          <div className="mx-auto max-w-[720px] text-center">
            <p className="eyebrow mb-12">{T.regEyebrow}</p>

            <div className="mb-12 flex items-center gap-6" aria-hidden="true">
              <span className="js-reg-rule h-px flex-1 origin-left bg-bronze/70" />
              <span className="js-reg-rule h-px flex-1 origin-right bg-bronze/70" />
            </div>

            <blockquote
              className="font-display text-[clamp(1.5rem,3vw,2.5rem)] font-light italic leading-[1.3] text-bone"
              aria-label={T.regQuote}
            >
              {T.regQuote.split(' ').map((word, i) => (
                <span key={`${word}-${i}`}>
                  <span className="js-q-word inline-block will-change-transform" aria-hidden="true">
                    {word}
                  </span>{' '}
                </span>
              ))}
            </blockquote>

            <div className="mt-12 flex items-center gap-6" aria-hidden="true">
              <span className="js-reg-rule h-px flex-1 origin-left bg-bronze/70" />
              <span className="js-reg-rule h-px flex-1 origin-right bg-bronze/70" />
            </div>

            <p className="js-reg-legal mt-12 font-mono text-[11px] uppercase tracking-eyebrow text-mist">
              {LEGAL.entity} · {T.regNo} {LEGAL.reg} · {T.republic}
            </p>
          </div>
        </div>
      </section>

      {/* ================= S5 — TEAM (bone) ================= */}
      <section id="team" className="scroll-mt-24 bg-bone" aria-label={T.teamAria}>
        <div className="mx-auto max-w-site px-gutter py-[clamp(96px,14vw,200px)]">
          <p className="eyebrow mb-8">{T.teamEyebrow}</p>
          <h2 className="js-team-title mb-20 max-w-3xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.05] tracking-[-0.015em] text-ink">
            <SplitWords text={T.teamTitle} />
          </h2>
          {/* velocity-reactive skew on the team grid (scroll-fx §2) */}
          <VelocitySkew>
            <TeamGrid locale={locale} />
          </VelocitySkew>
        </div>
      </section>

      {/* ================= S6 — CTA (ink) ================= */}
      <section className="js-cta bg-ink text-bone" aria-label={T.ctaAria}>
        <div className="mx-auto max-w-site px-gutter py-[clamp(96px,12vw,160px)]">
          <p className="eyebrow mb-16">{T.ctaEyebrow}</p>

          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            <div className="js-cta-left flex flex-col items-start border border-bone/10 p-10 md:p-14">
              <p className="font-mono text-[11px] font-medium uppercase tracking-eyebrow text-mist">
                {T.careersLabel}
              </p>
              <h3 className="mt-6 font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-light leading-[1.15]">
                {T.careersTitle}
              </h3>
              <div className="mt-10">
                <MagneticButton to={T.careersHref} variant="ghost">
                  {T.careersButton}
                </MagneticButton>
              </div>
            </div>

            <div className="js-cta-right flex flex-col items-start border border-bone/10 p-10 md:p-14">
              <p className="font-mono text-[11px] font-medium uppercase tracking-eyebrow text-mist">
                {T.contactLabel}
              </p>
              <h3 className="mt-6 font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-light leading-[1.15]">
                {T.contactTitle}
              </h3>
              <div className="mt-10">
                <MagneticButton to={T.contactHref} variant="primary">
                  {T.contactButton}
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
