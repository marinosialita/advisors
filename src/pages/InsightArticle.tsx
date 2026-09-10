import { useContext, useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AppReadyContext } from '@/components/app-ready-context';
import MagneticButton from '@/components/MagneticButton';
import { MaskWord } from '@/components/SplitWords';
import Reveal from '@/components/scroll/Reveal';
import usePageTitle from '@/components/contact-legal/usePageTitle';
import { useCanonical } from '@/components/usePageMeta';
import useJsonLd from '@/components/useJsonLd';
import { INSIGHTS, getInsight } from '@/data/insights';
import type { InsightBlock } from '@/data/insights';

gsap.registerPlugin(ScrollTrigger);

type Locale = 'en' | 'ru';

const UI: Record<
  Locale,
  {
    allInsights: string;
    byLine: string;
    inThisArticle: string;
    questions: string;
    talkToTeam: string;
    relatedPractice: string;
    exploreService: string;
    speakWithTeam: string;
    ctaTitle: string;
    startConversation: string;
    prevInsight: string;
    nextInsight: string;
    contactPath: string;
    homePath: string;
    insightsBase: string;
    breadcrumbHome: string;
    breadcrumbInsights: string;
    lang: string;
  }
> = {
  en: {
    allInsights: 'All insights',
    byLine: 'By SC Advisors',
    inThisArticle: 'In this article',
    questions: 'Questions about your case?',
    talkToTeam: 'Talk to the team',
    relatedPractice: 'Related practice',
    exploreService: 'Explore the service',
    speakWithTeam: 'Speak with the team',
    ctaTitle: 'Structure it right — before the first euro arrives.',
    startConversation: 'Start a Conversation',
    prevInsight: 'Previous insight',
    nextInsight: 'Next insight',
    contactPath: '/contact',
    homePath: '/',
    insightsBase: '/insights',
    breadcrumbHome: 'Home',
    breadcrumbInsights: 'Insights',
    lang: 'en',
  },
  ru: {
    allInsights: 'Все статьи',
    byLine: 'SC Advisors',
    inThisArticle: 'В этой статье',
    questions: 'Вопросы по вашей ситуации?',
    talkToTeam: 'Поговорить с командой',
    relatedPractice: 'Смежная практика',
    exploreService: 'Подробнее об услуге',
    speakWithTeam: 'Свяжитесь с командой',
    ctaTitle: 'Выстройте структуру правильно — до первого евро выручки.',
    startConversation: 'Начать диалог',
    prevInsight: 'Предыдущая статья',
    nextInsight: 'Следующая статья',
    contactPath: '/ru/contact',
    homePath: '/ru',
    insightsBase: '/ru/insights',
    breadcrumbHome: 'Главная',
    breadcrumbInsights: 'Статьи',
    lang: 'ru',
  },
};

/** Title with accent words in italic bronze — matches the editorial hero language. */
function HeroTitle({ title, accentWords }: { title: string; accentWords: string[] }) {
  /* multi-word accents ("60 дней") are split so each word highlights */
  const accents = new Set(accentWords.flatMap((w) => w.toLowerCase().split(' ')));
  return (
    <>
      {title.split(' ').map((word, i) => {
        const accent = accents.has(word.toLowerCase().replace(/[.,:;]$/g, ''));
        return (
          <span key={i}>
            {i > 0 && ' '}
            <MaskWord innerClassName={accent ? 'font-normal italic text-bronze' : undefined}>
              {word}
            </MaskWord>
          </span>
        );
      })}
    </>
  );
}

function Block({ block, id }: { block: InsightBlock; id?: string }) {
  switch (block.type) {
    case 'h2':
      return (
        <Reveal>
          <h2
            id={id}
            className="mt-[clamp(84px,10vw,140px)] scroll-mt-28 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-[1.18] tracking-[-0.01em] text-bone"
          >
            {block.text}
          </h2>
        </Reveal>
      );
    case 'p':
      return (
        <Reveal>
          <p className="mt-10 font-display text-[clamp(1.06rem,1.35vw,1.22rem)] font-light leading-[1.95] text-bone/80">
            {block.text}
          </p>
        </Reveal>
      );
    case 'ul':
      return (
        <Reveal>
          <ul className="mt-10 space-y-7">
            {block.items.map((item) => (
              <li
                key={item}
                className="flex gap-4 font-display text-[clamp(1rem,1.25vw,1.13rem)] font-light leading-[1.85] text-bone/70"
              >
                <span className="mt-[0.78em] block h-px w-6 shrink-0 bg-bronze" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      );
    case 'table':
      return (
        <Reveal>
          <div className="mt-14 overflow-x-auto rounded-lg border border-bone/12">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-bone/15 bg-white/[0.03]">
                  {block.head.map((h) => (
                    <th
                      key={h}
                      className="px-5 py-4 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-bone/50"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row) => {
                  const highlight = row[0] === 'Cyprus' || row[0] === 'Кипр';
                  return (
                    <tr
                      key={row[0]}
                      className={
                        highlight
                          ? 'border-b border-bone/10 bg-bronze/[0.09]'
                          : 'border-b border-bone/10 last:border-b-0'
                      }
                    >
                      {row.map((cell, i) => (
                        <td
                          key={cell}
                          className={`px-5 py-4 text-[14.5px] ${
                            i === 0
                              ? 'font-display text-[16.5px] font-light text-bone'
                              : highlight
                                ? 'font-medium text-bronze'
                                : 'text-bone/60'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>
      );
    case 'example':
      return (
        <Reveal>
          <figure className="mt-16 overflow-hidden rounded-xl border border-bone/12 bg-[#121212]">
            <figcaption className="border-b border-bone/10 px-8 py-5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-bronze">
              {block.title}
            </figcaption>
            <div className="px-8 py-7">
              {block.lines.map((l, i) => (
                <div
                  key={l.label}
                  className={`flex items-baseline justify-between gap-8 py-4 ${
                    i > 0 ? 'border-t border-dashed border-bone/12' : ''
                  }`}
                >
                  <span
                    className={`font-display text-[clamp(0.98rem,1.2vw,1.1rem)] font-light leading-relaxed ${
                      l.strong ? 'text-bone' : 'text-bone/55'
                    }`}
                  >
                    {l.label}
                  </span>
                  <span
                    className={`shrink-0 font-display font-light tabular-nums ${
                      l.strong
                        ? 'text-[clamp(1.5rem,2.4vw,2rem)] text-bronze'
                        : 'text-[clamp(1.15rem,1.7vw,1.45rem)] text-bone/85'
                    }`}
                  >
                    {l.value}
                  </span>
                </div>
              ))}
              {block.note && (
                <p className="mt-6 inline-block rounded-full border border-bronze/35 bg-bronze/10 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-bronze">
                  {block.note}
                </p>
              )}
            </div>
          </figure>
        </Reveal>
      );
    case 'callout':
      return (
        <Reveal>
          <blockquote className="mt-24 border-l-2 border-bronze pl-8 md:pl-10">
            <p className="font-display text-[clamp(1.25rem,2.1vw,1.6rem)] font-light italic leading-[1.55] text-bone/90">
              {block.text}
            </p>
          </blockquote>
        </Reveal>
      );
  }
}

export default function InsightArticle({ locale = 'en' }: { locale?: Locale }) {
  const ready = useContext(AppReadyContext);
  const rootRef = useRef<HTMLDivElement>(null);
  const { slug = '' } = useParams();
  const article = getInsight(slug);
  const [activeSection, setActiveSection] = useState<string>('');

  const t = UI[locale];
  const ru = locale === 'ru' ? article?.ru : undefined;

  /* Locale-resolved view of the article (falls back to EN fields). */
  const view = article
    ? {
        slug: article.slug,
        tag: ru?.tag ?? article.tag,
        title: ru?.title ?? article.title,
        accentWords: ru?.accentWords ?? article.accentWords,
        lead: ru?.lead ?? article.lead,
        excerpt: ru?.excerpt ?? article.excerpt,
        readingTime: ru?.readingTime ?? article.readingTime,
        updated: ru?.updated ?? article.updated,
        blocks: ru?.blocks ?? article.blocks,
        image: article.image,
        imageAlt: article.imageAlt,
        relatedService: article.relatedService,
      }
    : undefined;

  usePageTitle(view ? `${view.title} — SC Advisors` : 'Insights — SC Advisors');

  /* <html lang> follows the route locale */
  useEffect(() => {
    const el = document.documentElement;
    const prev = el.lang;
    el.lang = t.lang;
    return () => {
      el.lang = prev;
    };
  }, [t.lang]);

  /* self-referencing canonical per article + locale */
  useCanonical(view ? `${t.insightsBase}/${view.slug}` : '/');

  /* Article + Breadcrumb structured data — rich-result eligibility */
  const pageUrl = view ? `https://sc-advisors.com.cy${t.insightsBase}/${view.slug}` : '';
  useJsonLd(
    `article-${locale}`,
    view
      ? {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Article',
              headline: view.title,
              description: view.excerpt,
              image: `https://sc-advisors.com.cy${view.image}`,
              datePublished: '2026-09-01',
              dateModified: '2026-09-07',
              inLanguage: t.lang,
              author: {
                '@type': 'Organization',
                name: 'SC Advisors — Smart & Compliant Advisors',
                url: 'https://sc-advisors.com.cy/',
              },
              publisher: {
                '@type': 'Organization',
                name: 'SC Advisors — Smart & Compliant Advisors',
                url: 'https://sc-advisors.com.cy/',
              },
              mainEntityOfPage: pageUrl,
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: t.breadcrumbHome,
                  item: `https://sc-advisors.com.cy${t.homePath}`,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: t.breadcrumbInsights,
                  item: `https://sc-advisors.com.cy${t.homePath}#insights`,
                },
                { '@type': 'ListItem', position: 3, name: view.title, item: pageUrl },
              ],
            },
          ],
        }
      : null,
  );

  /* Index-based section ids (locale-safe — no transliteration needed) */
  const tocSections = view
    ? view.blocks.flatMap((b, i) => (b.type === 'h2' ? [{ id: `s-${i}`, text: b.text }] : []))
    : [];

  useEffect(() => {
    const tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!tag || !view) return;
    const prev = tag.content;
    tag.content = view.excerpt;
    return () => {
      tag.content = prev;
    };
  }, [view]);

  /* scroll-spy for the TOC */
  useEffect(() => {
    if (!view) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }
      },
      { rootMargin: '-18% 0px -68% 0px' },
    );
    tocSections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, ready]);

  /* hero load-in */
  useEffect(() => {
    if (!ready || !rootRef.current || !view) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .fromTo('.js-crumb', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0.1)
          .fromTo(
            '.js-hero .js-word',
            { yPercent: 110 },
            { yPercent: 0, duration: 1.05, stagger: 0.045 },
            0.2,
          )
          .fromTo(
            '.js-lead',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9 },
            0.75,
          )
          .fromTo(
            '.js-meta > *',
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.07 },
            0.9,
          )
          .fromTo(
            '.js-heroimg',
            { opacity: 0, scale: 0.985 },
            { opacity: 1, scale: 1, duration: 1.3, ease: 'power2.out' },
            0.6,
          );
      }, rootRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [ready, view]);

  if (!view) return <Navigate to={t.homePath} replace />;

  const idx = INSIGHTS.findIndex((a) => a.slug === view.slug);
  const prev = INSIGHTS[(idx - 1 + INSIGHTS.length) % INSIGHTS.length];
  const next = INSIGHTS[(idx + 1) % INSIGHTS.length];
  const siblingTitle = (slugOf: string) => {
    const a = INSIGHTS.find((x) => x.slug === slugOf)!;
    return locale === 'ru' && a.ru ? a.ru.title : a.title;
  };

  return (
    <div ref={rootRef} className="bg-ink">
      {/* ---------- hero — full-bleed article image with cinematic scrims ---------- */}
      <section className="js-hero relative -mt-[var(--nav-h)] overflow-hidden" aria-label={view.title}>
        {/* article image as the hero backdrop */}
        <div className="js-heroimg absolute inset-0" aria-hidden="true">
          <img
            src={view.image}
            alt=""
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
        </div>
        {/* left scrim for the headline + top scrim under the nav */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(100deg, rgba(10,8,6,0.88) 0%, rgba(10,8,6,0.62) 42%, rgba(10,8,6,0.28) 70%, rgba(10,8,6,0.42) 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[22vh]"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0) 100%)',
          }}
        />
        {/* bottom fade into the ink body */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[26vh]"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.45) 45%, rgba(10,10,10,0) 100%)',
          }}
        />
        {/* bronze glow accent */}
        <div
          className="pointer-events-none absolute right-[-12%] top-[-25%] h-[80vmin] w-[80vmin] rounded-full opacity-[0.16]"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle, rgba(255,130,77,0.5) 0%, rgba(229,106,30,0.16) 45%, transparent 70%)',
          }}
        />
        <div className="relative z-10 mx-auto flex min-h-[92svh] w-full max-w-site flex-col justify-end px-gutter pb-[clamp(64px,8vh,110px)] pt-[calc(var(--nav-h)+9vh)]">
          <p className="js-crumb flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              to={`${t.homePath}#insights`}
              className="group inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-nav text-bone/50 transition-colors hover:text-bronze"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" strokeWidth={1.5} />
              {t.allInsights}
            </Link>
            <span className="h-px w-10 bg-bone/20" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-nav text-bronze">
              {view.tag}
            </span>
          </p>
          <h1 className="mt-12 max-w-[16ch] font-display text-[clamp(2.5rem,5.8vw,5rem)] font-light leading-[1.04] tracking-[-0.02em] text-bone [text-shadow:0_2px_40px_rgba(10,8,6,0.55)]">
            <HeroTitle title={view.title} accentWords={view.accentWords} />
          </h1>
          <p className="js-lead mt-14 max-w-2xl font-display text-[clamp(1.12rem,1.7vw,1.4rem)] font-light leading-[1.7] text-bone/70">
            {view.lead}
          </p>
          <div className="js-meta mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-nav text-bone/45">
            <span className="text-bone/70">{t.byLine}</span>
            <span>{view.readingTime}</span>
            <span>{view.updated}</span>
          </div>
        </div>
      </section>

      {/* ---------- body + TOC ---------- */}
      <section aria-label="Article">
        <div className="mx-auto max-w-site px-gutter py-[clamp(64px,8vw,120px)]">
          <div className="grid grid-cols-1 gap-20 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-28">
            <div className="max-w-[680px]">
              {view.blocks.map((b, i) => (
                <Block key={i} block={b} id={b.type === 'h2' ? `s-${i}` : undefined} />
              ))}
            </div>

            {/* sticky TOC */}
            <aside className="hidden lg:block">
              <nav
                aria-label={t.inThisArticle}
                className="sticky top-28 rounded-xl border border-bone/12 bg-white/[0.02] p-7"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bronze">
                  {t.inThisArticle}
                </p>
                <ul className="mt-6 space-y-4">
                  {tocSections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`flex items-baseline gap-3 font-display text-[15px] font-light leading-snug transition-colors duration-300 ${
                          activeSection === s.id ? 'text-bronze' : 'text-bone/55 hover:text-bone'
                        }`}
                      >
                        <span
                          className={`block h-px w-4 shrink-0 transition-colors duration-300 ${
                            activeSection === s.id ? 'bg-bronze' : 'bg-bone/20'
                          }`}
                          aria-hidden="true"
                        />
                        {s.text}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-bone/10 pt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone/40">
                    {t.questions}
                  </p>
                  <Link
                    to={t.contactPath}
                    className="group mt-3 inline-flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-button text-bronze"
                  >
                    {t.talkToTeam}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                  </Link>
                </div>
              </nav>
            </aside>
          </div>

          {/* related practice */}
          <Reveal>
            <div className="mt-20 flex flex-col gap-6 rounded-xl border border-bone/12 bg-white/[0.02] p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <div>
                <p className="eyebrow text-bronze">{t.relatedPractice}</p>
                <p className="mt-3 font-display text-[clamp(1.4rem,2.4vw,1.9rem)] font-light text-bone">
                  {view.relatedService.label}
                </p>
              </div>
              <Link
                to={locale === 'ru' ? `/ru${view.relatedService.to}` : view.relatedService.to}
                className="group inline-flex shrink-0 items-center gap-3 font-mono text-xs font-medium uppercase tracking-button text-bronze"
              >
                {t.exploreService}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5" strokeWidth={1.5} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="border-t border-bone/10 text-bone" aria-label="Contact">
        <div className="mx-auto flex max-w-site flex-col items-center px-gutter py-[clamp(90px,12vw,160px)] text-center">
          <p className="eyebrow mb-8 text-bronze">{t.speakWithTeam}</p>
          <h2 className="max-w-3xl font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-light leading-[1.1] tracking-[-0.015em]">
            {t.ctaTitle}
          </h2>
          <div className="mt-12">
            <MagneticButton to={t.contactPath} variant="primary">
              {t.startConversation}
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ---------- prev / next ---------- */}
      <nav className="border-t border-bone/10" aria-label={t.breadcrumbInsights}>
        <div className="mx-auto grid max-w-site grid-cols-1 md:grid-cols-2">
          {[prev, next].map((a, i) => (
            <Link
              key={a.slug}
              to={`${t.insightsBase}/${a.slug}`}
              className={`group flex items-center gap-6 px-gutter py-10 transition-colors hover:bg-white/[0.02] ${
                i === 0 ? 'border-b border-bone/10 md:border-b-0 md:border-r' : 'md:justify-end'
              }`}
            >
              {i === 0 && (
                <ArrowLeft className="h-4 w-4 shrink-0 text-bone/40 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-bronze" strokeWidth={1.5} />
              )}
              <span className={i === 1 ? 'text-right' : ''}>
                <span className="block font-mono text-[10px] uppercase tracking-nav text-bone/40">
                  {i === 0 ? t.prevInsight : t.nextInsight}
                </span>
                <span className="mt-2.5 block max-w-sm font-display text-[clamp(1.1rem,1.8vw,1.4rem)] font-light leading-snug text-bone/85 transition-colors group-hover:text-bronze">
                  {siblingTitle(a.slug)}
                </span>
              </span>
              {i === 1 && (
                <ArrowRight className="h-4 w-4 shrink-0 text-bone/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-bronze" strokeWidth={1.5} />
              )}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
