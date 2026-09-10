import { submitWebsiteForm } from '@/lib/website-api';
import { useContext, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { AppReadyContext } from '@/components/app-ready-context';
import MagneticButton from '@/components/MagneticButton';
import SplitWords from '@/components/SplitWords';
import { CONTACT } from '@/data/site';
import {
  ConsentField,
  EMAIL_RE,
  SelectField,
  TextAreaField,
  TextField,
} from '@/components/contact-legal/fields';
import FormSuccess from '@/components/contact-legal/FormSuccess';
import usePageMeta from '@/components/usePageMeta';
import useHtmlLang from '@/components/useHtmlLang';
import Parallax from '@/components/scroll/Parallax';
import Reveal from '@/components/scroll/Reveal';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const EN_STRINGS = {
  metaTitle: 'Careers — Join Our Team | SC Advisors, Limassol',
  metaDescription:
    'Join SC Advisors in Limassol, Cyprus — careers in corporate, legal, finance, migration and concierge services at a CySEC-regulated advisory firm.',
  heroAria: 'Careers at SC Advisors',
  heroEyebrow: 'Careers',
  heroTitle: 'Join our team.',
  heroLede:
    'Become part of a dynamic team of professionals who turn complex challenges into smart, compliant solutions.',
  whyAria: 'Why SC Advisors',
  whyEyebrow: '01 — Why Here',
  whyTitle: 'Expertise you can grow with.',
  whyColumns: [
    {
      title: 'Real Responsibility',
      body: 'Work directly with clients across 15 regions on corporate, legal, financial and migration matters.',
    },
    {
      title: 'Regulated Standards',
      body: 'Build your career inside a CySEC-regulated firm where compliance and quality are the default.',
    },
    {
      title: 'A Team That Goes Further',
      body: 'Working together, going further — a culture built on integrity, excellence and trust.',
    },
  ],
  valuesAria: 'Our values',
  values: ['INTEGRITY', 'EXCELLENCE', 'TRUST', 'LONG-TERM THINKING', 'CLARITY'],
  disciplines: [
    'Legal',
    'Corporate',
    'Finance & Accounting',
    'Migration & Concierge',
    'Strategy & HR',
    'Other',
  ],
  applyAria: 'Open application',
  applyEyebrow: '02 — Apply',
  applyTitle: 'Introduce yourself.',
  applyBody:
    'We are always interested in exceptional people across corporate, legal, financial, migration and concierge disciplines. Tell us who you are and where you excel — we reply to every serious application.',
  formAria: 'Open application form',
  successHeading: 'Thank you for your interest.',
  successLine: 'APPLICATION RECEIVED — WE REPLY TO EVERY SERIOUS APPLICATION',
  labelName: 'Full Name',
  labelEmail: 'Email',
  labelPhone: 'Phone (optional)',
  labelDiscipline: 'Discipline',
  labelMessage: 'Message',
  labelCv: 'CV link (optional)',
  submit: 'Send Application',
  errName: 'Please enter your full name',
  errEmailRequired: 'Please enter your email address',
  errEmailInvalid: 'Please enter a valid email address',
  errPhoneInvalid: 'Please enter a valid phone number',
  errDiscipline: 'Please select a discipline',
  errMessageRequired: 'Please tell us about yourself',
  errMessageShort: 'Please tell us a little more — min. 10 characters',
  errCvInvalid: 'Please enter a valid URL',
  errConsent: 'Your consent is required',
  consentPre: 'I consent to the processing of my personal data in line with the',
  consentLink: 'Privacy Policy',
  ctaAria: 'Prefer to talk first',
  ctaTitle: 'Prefer to talk first?',
  ctaLink: 'Contact us',
  contactPath: '/contact',
  privacyPath: '/privacy-policy',
};

const RU_STRINGS: typeof EN_STRINGS = {
  metaTitle: 'Карьера — Присоединяйтесь к команде | SC Advisors, Лимассол',
  metaDescription:
    'Присоединяйтесь к SC Advisors в Лимассоле на Кипре — карьера в корпоративной, юридической, финансовой, миграционной и консьерж-сфере в консалтинговой фирме, регулируемой CySEC.',
  heroAria: 'Карьера в SC Advisors',
  heroEyebrow: 'Карьера',
  heroTitle: 'Присоединяйтесь к команде.',
  heroLede:
    'Станьте частью динамичной команды профессионалов, которые превращают сложные задачи в разумные решения, полностью соответствующие регуляторным требованиям.',
  whyAria: 'Почему SC Advisors',
  whyEyebrow: '01 — Почему здесь',
  whyTitle: 'Экспертиза, с которой вы растёте.',
  whyColumns: [
    {
      title: 'Реальная ответственность',
      body: 'Работайте напрямую с клиентами из 15 регионов по корпоративным, юридическим, финансовым и миграционным вопросам.',
    },
    {
      title: 'Регулируемые стандарты',
      body: 'Стройте карьеру в фирме, регулируемой CySEC, где комплаенс и качество — стандарт по умолчанию.',
    },
    {
      title: 'Команда, которая идёт дальше',
      body: 'Работаем вместе — достигаем большего: культура, построенная на честности, совершенстве и доверии.',
    },
  ],
  valuesAria: 'Наши ценности',
  values: ['ЧЕСТНОСТЬ', 'СОВЕРШЕНСТВО', 'ДОВЕРИЕ', 'ДОЛГОСРОЧНОЕ МЫШЛЕНИЕ', 'ЯСНОСТЬ'],
  disciplines: [
    'Юридическая',
    'Корпоративная',
    'Финансы и учёт',
    'Миграция и консьерж',
    'Стратегия и HR',
    'Другое',
  ],
  applyAria: 'Открытая заявка',
  applyEyebrow: '02 — Подайте заявку',
  applyTitle: 'Представьтесь.',
  applyBody:
    'Нам всегда интересны выдающиеся специалисты в корпоративной, юридической, финансовой, миграционной и консьерж-сферах. Расскажите, кто вы и в чём вы особенно сильны, — мы отвечаем на каждую серьёзную заявку.',
  formAria: 'Форма открытой заявки',
  successHeading: 'Благодарим за интерес.',
  successLine: 'ЗАЯВКА ПОЛУЧЕНА — МЫ ОТВЕЧАЕМ НА КАЖДУЮ СЕРЬЁЗНУЮ ЗАЯВКУ',
  labelName: 'Полное имя',
  labelEmail: 'Email',
  labelPhone: 'Телефон (необязательно)',
  labelDiscipline: 'Направление',
  labelMessage: 'Сообщение',
  labelCv: 'Ссылка на резюме (необязательно)',
  submit: 'Отправить заявку',
  errName: 'Пожалуйста, укажите ваше полное имя',
  errEmailRequired: 'Пожалуйста, укажите ваш адрес электронной почты',
  errEmailInvalid: 'Пожалуйста, укажите корректный адрес электронной почты',
  errPhoneInvalid: 'Пожалуйста, укажите корректный номер телефона',
  errDiscipline: 'Пожалуйста, выберите направление',
  errMessageRequired: 'Пожалуйста, расскажите о себе',
  errMessageShort: 'Пожалуйста, расскажите чуть подробнее — минимум 10 символов',
  errCvInvalid: 'Пожалуйста, укажите корректную ссылку',
  errConsent: 'Требуется ваше согласие',
  consentPre: 'Я даю согласие на обработку моих персональных данных в соответствии с',
  consentLink: 'Политикой конфиденциальности',
  ctaAria: 'Хотите сначала поговорить',
  ctaTitle: 'Хотите сначала поговорить?',
  ctaLink: 'Свяжитесь с нами',
  contactPath: '/ru/contact',
  privacyPath: '/ru/privacy-policy',
};

interface ApplicationValues {
  name: string;
  email: string;
  phone: string;
  discipline: string;
  message: string;
  cv: string;
  consent: boolean;
}

const INITIAL_VALUES: ApplicationValues = {
  name: '',
  email: '',
  phone: '',
  discipline: '',
  message: '',
  cv: '',
  consent: false,
};

const PHONE_RE = /^[+()\d][\d\s()./-]{5,}$/;

/* ------------------------------------------------------------------ */
/* Careers — /careers (careers.md)                                     */
/* ------------------------------------------------------------------ */

export default function Careers({ locale = 'en' }: { locale?: 'en' | 'ru' }) {
  const T = locale === 'ru' ? RU_STRINGS : EN_STRINGS;

  useHtmlLang(locale);
  usePageMeta(T.metaTitle, T.metaDescription);

  const ready = useContext(AppReadyContext);
  const rootRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [values, setValues] = useState<ApplicationValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationValues, string>>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const submissionId = useRef(crypto.randomUUID());
  const submittingRef = useRef(false);

  /* ---- GSAP scroll/load-in storytelling (reduced-motion guarded) ---- */
  useEffect(() => {
    if (!ready || !rootRef.current) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        /* S1 — hero load-in */
        const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
        intro
          .fromTo('.js-hero-scrim', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0)
          .fromTo(
            '.js-hero .js-word',
            { yPercent: 110 },
            { yPercent: 0, duration: 1.1, stagger: 0.045 },
            0.15,
          )
          .fromTo(
            '.js-hero-fade',
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 },
            0.5,
          );

        /* S1 — Ken Burns (single pass, holds final frame) */
        gsap.fromTo(
          '.js-kenburns',
          { scale: 1 },
          { scale: 1.06, duration: 8, ease: 'none' },
        );

        /* S2 — culture columns stagger up + rules draw */
        gsap.fromTo(
          '.js-why-col',
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: { trigger: '.js-why-grid', start: 'top 80%', once: true },
          },
        );
        gsap.fromTo(
          '.js-why-rule',
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'power2.inOut',
            transformOrigin: 'left center',
            stagger: 0.1,
            scrollTrigger: { trigger: '.js-why-grid', start: 'top 80%', once: true },
          },
        );

        /* S4 — apply copy + form fields stagger in */
        gsap.fromTo(
          '.js-apply-copy',
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.js-s4', start: 'top 75%', once: true },
          },
        );
        gsap.fromTo(
          '.js-s4-form .js-field',
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'expo.out',
            stagger: 0.07,
            scrollTrigger: { trigger: '.js-s4-form', start: 'top 80%', once: true },
          },
        );

        /* S5 — closing CTA fade */
        gsap.fromTo(
          '.js-s5-inner',
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.js-s5', start: 'top 85%', once: true },
          },
        );
      }, rootRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [ready]);

  /* ---- S3 — values highlight bronze as they cross viewport centre --- */
  useEffect(() => {
    const root = marqueeRef.current;
    if (!root) return;
    const words = root.querySelectorAll<HTMLElement>('[data-marquee-word]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          el.style.color = entry.isIntersecting ? '#FF824D' : 'rgba(255, 255, 255, 0.22)';
        });
      },
      { root: null, rootMargin: '0px -42% 0px -42%', threshold: 0 },
    );
    words.forEach((word) => io.observe(word));
    return () => io.disconnect();
  }, []);

  /* ---- Form -------------------------------------------------------- */
  const setField =
    (key: keyof ApplicationValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const next = key === 'consent' ? (e.target as HTMLInputElement).checked : e.target.value;
      setValues((v) => ({ ...v, [key]: next }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;
    const next: Partial<Record<keyof ApplicationValues, string>> = {};

    if (!values.name.trim()) next.name = T.errName;
    if (!values.email.trim()) next.email = T.errEmailRequired;
    else if (!EMAIL_RE.test(values.email.trim())) next.email = T.errEmailInvalid;
    if (values.phone.trim() && !PHONE_RE.test(values.phone.trim()))
      next.phone = T.errPhoneInvalid;
    if (!values.discipline) next.discipline = T.errDiscipline;
    if (!values.message.trim()) next.message = T.errMessageRequired;
    else if (values.message.trim().length < 10)
      next.message = T.errMessageShort;
    if (values.cv.trim()) {
      try {
        void new URL(values.cv.trim());
      } catch {
        next.cv = T.errCvInvalid;
      }
    }
    if (!values.consent) next.consent = T.errConsent;

    setErrors(next);
    if (Object.keys(next).length !== 0) return;
    submittingRef.current = true;
    setSubmitting(true);
    setSubmitError('');
    try {
      await submitWebsiteForm('career', values, submissionId.current, locale);
      setSent(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to send. Please try again.');
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  return (
    <div ref={rootRef}>
      {/* ================= S1 — HERO (image-backed, ~85vh) ============= */}
      <section
        className="js-hero relative flex min-h-[calc(85dvh-var(--nav-h))] items-center overflow-hidden bg-ink"
        aria-label={T.heroAria}
      >
        <div className="absolute inset-0" aria-hidden="true">
          {/* parallax layer (0.15×) with headroom; ken burns runs on the img (scroll-fx §3) */}
          <Parallax speed={0.15} className="absolute inset-x-0 -inset-y-[12%]">
            <img
              src="/assets/hero.jpg"
              alt=""
              className="js-kenburns h-full w-full object-cover will-change-transform"
              fetchPriority="high"
            />
          </Parallax>
        </div>
        <div className="js-hero-scrim absolute inset-0 bg-ink/60" aria-hidden="true" />

        <div className="relative z-10 mx-auto w-full max-w-site px-gutter py-24">
          <p className="js-hero-fade eyebrow mb-8">{T.heroEyebrow}</p>
          <h1 className="font-display text-[clamp(3rem,8.5vw,7.5rem)] font-light leading-[0.98] tracking-[-0.02em] text-bone">
            <SplitWords text={T.heroTitle} />
          </h1>
          <p className="js-hero-fade mt-10 max-w-xl text-[clamp(1.05rem,1.4vw,1.3rem)] leading-[1.65] text-bone/85">
            {T.heroLede}
          </p>
        </div>
      </section>

      {/* ================= S2 — WHY SC ADVISORS (bone) ================= */}
      <section className="bg-bone" aria-label={T.whyAria}>
        <div className="mx-auto max-w-site px-gutter py-[clamp(96px,14vw,200px)]">
          <Reveal>
            <p className="eyebrow mb-8">{T.whyEyebrow}</p>
            <h2 className="max-w-3xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.05] tracking-[-0.015em] text-ink">
              {T.whyTitle}
            </h2>
          </Reveal>

          <div className="js-why-grid mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
            {T.whyColumns.map((col) => (
              <div key={col.title} className="js-why-col">
                <span className="js-why-rule rule" aria-hidden="true" />
                <h3 className="mt-8 font-mono text-xs font-medium uppercase tracking-eyebrow text-bronze">
                  {col.title}
                </h3>
                <p className="mt-6 leading-[1.7] text-umber">{col.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= S3 — VALUES STRIP (ink marquee) ============= */}
      <section className="overflow-hidden bg-ink py-14 md:py-20" aria-label={T.valuesAria}>
        <div
          ref={marqueeRef}
          className="marquee-track flex w-max animate-marquee [animation-duration:30s]"
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center"
              aria-hidden={copy === 1 || undefined}
            >
              {T.values.map((word) => (
                <span
                  key={`${copy}-${word}`}
                  className="flex items-center whitespace-nowrap font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-none"
                >
                  <span
                    data-marquee-word
                    className="px-8 transition-colors duration-500 md:px-12"
                    style={{ color: 'rgba(255, 255, 255, 0.22)' }}
                  >
                    {word}
                  </span>
                  <span className="text-[0.5em] text-bronze" aria-hidden="true">
                    ·
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ================= S4 — OPEN APPLICATION (ivory) =============== */}
      <section className="js-s4 bg-ivory" aria-label={T.applyAria}>
        <div className="mx-auto max-w-site px-gutter py-[clamp(96px,14vw,200px)]">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5">
              <div className="js-apply-copy lg:sticky lg:top-[calc(var(--nav-h)+48px)]">
                <p className="eyebrow mb-8">{T.applyEyebrow}</p>
                <h2 className="font-display text-[clamp(2.2rem,5vw,4.2rem)] font-light leading-[1.05] tracking-[-0.015em] text-ink">
                  {T.applyTitle}
                </h2>
                <p className="mt-8 max-w-md text-[clamp(1.05rem,1.4vw,1.3rem)] leading-[1.65] text-umber">
                  {T.applyBody}
                </p>
                <p className="mt-10 font-mono text-xs uppercase tracking-nav">
                  <a
                    href={CONTACT.emailHref}
                    className="text-bronze transition-colors duration-300 hover:text-bronze-deep"
                  >
                    {CONTACT.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <AnimatePresence mode="wait">
                {sent ? (
                  <FormSuccess
                    key="success"
                    heading={T.successHeading}
                    line={T.successLine}
                  />
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="js-s4-form flex flex-col gap-10"
                    initial={false}
                    exit={{ opacity: 0, y: -16, transition: { duration: 0.3 } }}
                    aria-label={T.formAria}
                  >
                    <TextField
                      id="careers-name"
                      label={T.labelName}
                      value={values.name}
                      onChange={setField('name')}
                      error={errors.name}
                      required
                      autoComplete="name"
                    />
                    <TextField
                      id="careers-email"
                      label={T.labelEmail}
                      type="email"
                      value={values.email}
                      onChange={setField('email')}
                      error={errors.email}
                      required
                      autoComplete="email"
                      inputMode="email"
                    />
                    <TextField
                      id="careers-phone"
                      label={T.labelPhone}
                      type="tel"
                      value={values.phone}
                      onChange={setField('phone')}
                      error={errors.phone}
                      autoComplete="tel"
                      inputMode="tel"
                    />
                    <SelectField
                      id="careers-discipline"
                      label={T.labelDiscipline}
                      value={values.discipline}
                      onChange={setField('discipline')}
                      options={T.disciplines}
                      error={errors.discipline}
                      required
                    />
                    <TextAreaField
                      id="careers-message"
                      label={T.labelMessage}
                      value={values.message}
                      onChange={setField('message')}
                      error={errors.message}
                      required
                    />
                    <TextField
                      id="careers-cv"
                      label={T.labelCv}
                      type="url"
                      value={values.cv}
                      onChange={setField('cv')}
                      error={errors.cv}
                      inputMode="url"
                    />
                    <ConsentField
                      id="careers-consent"
                      checked={values.consent}
                      onChange={setField('consent')}
                      error={errors.consent}
                    >
                      <>
                        {T.consentPre}{' '}
                        <Link
                          to={T.privacyPath}
                          className="text-bronze underline decoration-bronze/40 underline-offset-4 transition-colors duration-300 hover:text-bronze-deep"
                        >
                          {T.consentLink}
                        </Link>
                        .
                      </>
                    </ConsentField>
                    <div className="js-field pt-2">
                      {submitError && <p role="alert" className="mb-4 text-sm text-red-700">{submitError}</p>}
                      <fieldset disabled={submitting} aria-busy={submitting}>
                        <MagneticButton type="submit">{submitting ? (locale === 'ru' ? 'Отправка…' : 'Sending…') : T.submit}</MagneticButton>
                      </fieldset>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ================= S5 — CTA (bone) ============================= */}
      <section className="js-s5 bg-bone" aria-label={T.ctaAria}>
        <div className="mx-auto max-w-site px-gutter py-[clamp(64px,9vw,120px)]">
          <div className="js-s5-inner flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-[clamp(1.8rem,3.4vw,3rem)] font-light leading-[1.1] text-ink">
                {T.ctaTitle}
              </h2>
              <Link
                to={T.contactPath}
                className="group mt-6 inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-button text-bronze"
              >
                {T.ctaLink}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
            </div>
            <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-nav text-mist sm:flex-row sm:items-center sm:gap-8">
              <a
                href={CONTACT.phoneHref}
                className="transition-colors duration-300 hover:text-bronze"
              >
                {CONTACT.phone}
              </a>
              <span className="hidden h-px w-8 bg-stone sm:block" aria-hidden="true" />
              <a
                href={CONTACT.emailHref}
                className="transition-colors duration-300 hover:text-bronze"
              >
                {CONTACT.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
