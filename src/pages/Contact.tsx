import { submitWebsiteForm } from '@/lib/website-api';
import { useContext, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Copy } from 'lucide-react';
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
import { DPO, MAP_DIRECTIONS_HREF, MAP_EMBED_SRC } from '@/components/contact-legal/data';
import { EASE_OUT_EXPO } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const CLIENT_TYPES = ['A Corporate Client', 'A Private Client', 'Other'];

interface EnquiryValues {
  name: string;
  email: string;
  company: string;
  iam: string;
  message: string;
  consent: boolean;
}

const INITIAL_VALUES: EnquiryValues = {
  name: '',
  email: '',
  company: '',
  iam: '',
  message: '',
  consent: false,
};

const LOCAL_BUSINESS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'SC Advisors — Smart & Compliant Advisors',
  legalName: 'IP S&C Smart & Compliant Advisors Ltd',
  url: 'https://sc-advisors.com.cy/contact',
  telephone: '+357 25005284',
  email: 'team@sc-advisors.cy',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '28 Oktovriou, 317A, Block B, Kanika Business Center, Office 101',
    addressLocality: 'Limassol',
    postalCode: '3105',
    addressCountry: 'CY',
  },
};

/* ------------------------------------------------------------------ */
/* Contact — /contact (contact.md)                                     */
/* ------------------------------------------------------------------ */

export default function Contact() {
  usePageMeta(
    'Contact — SC Advisors | Limassol, Cyprus',
    'Start a conversation with SC Advisors — Kanika Business Center, 28 Oktovriou 317A, Limassol, Cyprus. Call +357 25005284, email team@sc-advisors.cy or message us on Telegram. Reply within one business day.',
  );

  const ready = useContext(AppReadyContext);
  const rootRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [values, setValues] = useState<EnquiryValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryValues, string>>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const submissionId = useRef(crypto.randomUUID());
  const submittingRef = useRef(false);
  const [copied, setCopied] = useState<string | null>(null);

  /* ---- JSON-LD: LocalBusiness (contact.md SEO) ---------------------- */
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'contact-localbusiness-jsonld';
    script.text = JSON.stringify(LOCAL_BUSINESS_JSON_LD);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  /* ---- GSAP scroll/load-in storytelling (reduced-motion guarded) ---- */
  useEffect(() => {
    if (!ready || !rootRef.current) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        /* S1 — hero load-in */
        const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
        intro
          .fromTo(
            '.js-hero .js-word',
            { yPercent: 110 },
            { yPercent: 0, duration: 1.1, stagger: 0.045 },
            0.1,
          )
          .fromTo(
            '.js-hero-fade',
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 },
            0.45,
          );

        /* S2 — detail blocks stagger up 28px */
        gsap.fromTo(
          '.js-detail',
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: { trigger: '.js-details', start: 'top 80%', once: true },
          },
        );

        /* S2 — form fields stagger in */
        gsap.fromTo(
          '.js-contact-form .js-field',
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'expo.out',
            stagger: 0.07,
            scrollTrigger: { trigger: '.js-contact-form', start: 'top 80%', once: true },
          },
        );

        /* S3 — map band: 8px rise fade + overlay card slides from left */
        gsap.fromTo(
          '.js-map',
          { y: 8, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.js-map-band', start: 'top 85%', once: true },
          },
        );
        gsap.fromTo(
          '.js-map-card',
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'expo.out',
            delay: 0.15,
            scrollTrigger: { trigger: '.js-map-band', start: 'top 85%', once: true },
          },
        );

      }, rootRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [ready]);

  /* ---- Copy-on-click + mono toast (aria-live) ----------------------- */
  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  const copyValue = (text: string) => () => {
    // The link still follows its tel:/mailto: target — copy is additive.
    void navigator.clipboard?.writeText(text).catch(() => undefined);
    setCopied(text);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setCopied(null), 1600);
  };

  /* ---- Form --------------------------------------------------------- */
  const setField =
    (key: keyof EnquiryValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const next = key === 'consent' ? (e.target as HTMLInputElement).checked : e.target.value;
      setValues((v) => ({ ...v, [key]: next }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submittingRef.current) return;
    const next: Partial<Record<keyof EnquiryValues, string>> = {};

    if (!values.name.trim()) next.name = 'Please enter your full name';
    if (!values.email.trim()) next.email = 'Please enter your email address';
    else if (!EMAIL_RE.test(values.email.trim())) next.email = 'Please enter a valid email address';
    if (!values.iam) next.iam = 'Please select an option';
    if (!values.message.trim()) next.message = 'Please tell us about your enquiry';
    else if (values.message.trim().length < 10)
      next.message = 'Please tell us a little more — min. 10 characters';
    if (!values.consent) next.consent = 'Your consent is required';

    setErrors(next);
    if (Object.keys(next).length !== 0) return;
    submittingRef.current = true;
    setSubmitting(true);
    setSubmitError('');
    try {
      await submitWebsiteForm('contact', values, submissionId.current, 'en');
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
      {/* ================= S1 — HERO (cinematic planet, ~78vh) =========
          Same visual language as the homepage hero: the orange planet,
          masked-word headline, bronze rule, bottom fade into bone. */}
      <section
        className="js-hero relative flex min-h-[78dvh] items-center overflow-hidden bg-ink text-bone"
        aria-label="Contact SC Advisors"
      >
        {/* planet backdrop, anchored right like the homepage */}
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src="/assets/hero-planet.jpg"
            alt=""
            className="h-full w-full object-cover object-[72%_center]"
            loading="eager"
          />
          {/* legibility scrim — left-to-right */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(100deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.55) 42%, rgba(10,10,10,0.12) 75%, rgba(10,10,10,0.25) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-site px-gutter py-24">
          <p className="js-hero-fade eyebrow mb-8 text-bronze">Contact</p>
          <span
            className="js-hero-fade mb-10 block h-px w-32 bg-bronze"
            aria-hidden="true"
          />
          <h1
            className="font-display text-[clamp(3rem,8.5vw,7.5rem)] font-light leading-[0.98] tracking-[-0.02em] [text-shadow:0_2px_40px_rgba(10,8,6,0.55)]"
            aria-label="Start a conversation."
          >
            <SplitWords text="Start a" />{' '}
            <span className="font-normal italic text-bronze">
              <SplitWords text="conversation." />
            </span>
          </h1>
          <p className="js-hero-fade mt-10 max-w-xl text-[clamp(1.05rem,1.4vw,1.3rem)] leading-[1.65] text-parchment">
            Tell us your challenge — a member of our team will reply within one
            business day.
          </p>
        </div>
      </section>

      {/* ================= S2 — CONTACT GRID (bone) ==================== */}
      <section className="bg-bone" aria-label="Contact details and enquiry form">
        <div className="mx-auto max-w-site px-gutter py-[clamp(96px,14vw,200px)]">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-8">
            {/* Left — details (columns 1–5) */}
            <div className="js-details flex flex-col gap-12 lg:col-span-5">
              <div className="js-detail group relative border-t border-stone pt-6">
                <p className="flex items-baseline gap-4 font-mono text-[11px] font-medium uppercase tracking-eyebrow text-mist">
                  <span className="text-bronze">01</span> Office
                </p>
                <address className="mt-5 font-display text-xl leading-[1.5] text-ink not-italic">
                  {CONTACT.address}
                </address>
              </div>

              <div className="js-detail group relative border-t border-stone pt-6">
                <p className="flex items-baseline gap-4 font-mono text-[11px] font-medium uppercase tracking-eyebrow text-mist">
                  <span className="text-bronze">02</span> Telephone
                </p>
                <p className="mt-5 flex items-center gap-3">
                  <a
                    href={CONTACT.phoneHref}
                    onClick={copyValue('+35725005284')}
                    className="font-display text-xl text-ink transition-colors duration-300 hover:text-bronze"
                    title="Click to copy"
                  >
                    {CONTACT.phone}
                  </a>
                  <Copy className="h-4 w-4 text-mist" strokeWidth={1.5} aria-hidden="true" />
                </p>
              </div>

              <div className="js-detail group relative border-t border-stone pt-6">
                <p className="flex items-baseline gap-4 font-mono text-[11px] font-medium uppercase tracking-eyebrow text-mist">
                  <span className="text-bronze">03</span> Email
                </p>
                <p className="mt-5 flex items-center gap-3">
                  <a
                    href={CONTACT.emailHref}
                    onClick={copyValue(CONTACT.email)}
                    className="font-display text-xl text-ink transition-colors duration-300 hover:text-bronze"
                    title="Click to copy"
                  >
                    {CONTACT.email}
                  </a>
                  <Copy className="h-4 w-4 text-mist" strokeWidth={1.5} aria-hidden="true" />
                </p>
              </div>

              <div className="js-detail group relative border-t border-stone pt-6">
                <p className="flex items-baseline gap-4 font-mono text-[11px] font-medium uppercase tracking-eyebrow text-mist">
                  <span className="text-bronze">04</span> Telegram
                </p>
                <p className="mt-5">
                  <a
                    href={CONTACT.telegramHref}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 font-display text-xl text-ink transition-colors duration-300 hover:text-bronze"
                  >
                    {CONTACT.telegram}
                    <ArrowUpRight
                      className="h-4 w-4 text-mist transition-colors duration-300 group-hover:text-bronze"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </a>
                </p>
              </div>

              <div className="js-detail group relative border-t border-stone pt-6">
                <p className="flex items-baseline gap-4 font-mono text-[11px] font-medium uppercase tracking-eyebrow text-mist">
                  <span className="text-bronze">05</span> Data Protection Officer
                </p>
                <p className="mt-5 font-display text-xl text-ink">{DPO.name}</p>
                <p className="mt-3 flex flex-col gap-2 font-mono text-xs uppercase tracking-nav text-umber">
                  <a
                    href={DPO.emailHref}
                    className="w-fit transition-colors duration-300 hover:text-bronze"
                  >
                    {DPO.email}
                  </a>
                  <a
                    href={DPO.phoneHref}
                    className="w-fit transition-colors duration-300 hover:text-bronze"
                  >
                    {DPO.phone}
                  </a>
                </p>
              </div>
            </div>

            {/* Right — form (columns 7–12) */}
            <div className="lg:col-span-6 lg:col-start-7">
              <AnimatePresence mode="wait">
                {sent ? (
                  <FormSuccess key="success" />
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    className="js-contact-form flex flex-col gap-10"
                    initial={false}
                    exit={{ opacity: 0, y: -16, transition: { duration: 0.3 } }}
                    aria-label="Enquiry form"
                  >
                    <TextField
                      id="contact-name"
                      label="Full Name"
                      value={values.name}
                      onChange={setField('name')}
                      error={errors.name}
                      required
                      autoComplete="name"
                    />
                    <TextField
                      id="contact-email"
                      label="Email"
                      type="email"
                      value={values.email}
                      onChange={setField('email')}
                      error={errors.email}
                      required
                      autoComplete="email"
                      inputMode="email"
                    />
                    <TextField
                      id="contact-company"
                      label="Company (optional)"
                      value={values.company}
                      onChange={setField('company')}
                      autoComplete="organization"
                    />
                    <SelectField
                      id="contact-iam"
                      label="I am"
                      value={values.iam}
                      onChange={setField('iam')}
                      options={CLIENT_TYPES}
                      error={errors.iam}
                      required
                    />
                    <TextAreaField
                      id="contact-message"
                      label="Message"
                      value={values.message}
                      onChange={setField('message')}
                      error={errors.message}
                      required
                    />
                    <ConsentField
                      id="contact-consent"
                      checked={values.consent}
                      onChange={setField('consent')}
                      error={errors.consent}
                    />
                    <div className="js-field pt-2">
                      {submitError && <p role="alert" className="mb-4 text-sm text-red-700">{submitError}</p>}
                      <fieldset disabled={submitting} aria-busy={submitting}>
                        <MagneticButton type="submit">{submitting ? 'Sending…' : 'Send Message'}</MagneticButton>
                      </fieldset>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ================= S3 — MAP BAND (ivory, compact) ============== */}
      <section className="js-map-band bg-ivory py-[clamp(64px,8vw,96px)]" aria-label="Office map">
        <div className="js-map relative mx-auto max-w-site px-gutter">
          <div className="relative overflow-hidden border-2 border-stone/60">
            <iframe
              src={MAP_EMBED_SRC}
              title="Map — Kanika Business Center, 28 Oktovriou 317A, Limassol 3105, Cyprus"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-[420px] w-full border-0 [filter:grayscale(1)_sepia(0.15)]"
            />
            {/* Overlay card */}
            <div className="js-map-card absolute left-4 top-4 max-w-[calc(100%-2rem)] bg-ink p-7 text-bone shadow-dark-card md:left-8 md:top-8 md:max-w-sm md:p-9">
              <p className="font-mono text-[11px] font-medium uppercase tracking-eyebrow text-bronze">
                Office
              </p>
              <address className="mt-4 text-sm not-italic leading-[1.7] text-parchment">
                {CONTACT.address}
              </address>
              <a
                href={MAP_DIRECTIONS_HREF}
                target="_blank"
                rel="noreferrer"
                className="group mt-6 inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-button text-bronze transition-colors duration-300 hover:text-bone"
              >
                Get Directions
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Copy toast — mono, aria-live */}
      <AnimatePresence>
        {copied && (
          <motion.div
            key="copied-toast"
            role="status"
            aria-live="polite"
            className="fixed bottom-8 left-1/2 z-[150] -translate-x-1/2 bg-ink px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-eyebrow text-bone"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
          >
            Copied
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
