import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, CONTACT, LEGAL } from '@/data/site';
import VelocityMarquee from './scroll/VelocityMarquee';

const SERVICE_LINKS = [
  { label: 'Legal Services', path: '/for-corporates/legal' },
  { label: 'Private Services', path: '/for-private-clients' },
  { label: 'Corporate Services', path: '/for-corporates' },
  { label: 'Financial Services', path: '/for-corporates/fund-administration' },
  { label: 'Migration Services', path: '/for-private-clients/immigration-residency' },
  { label: 'Banking Services', path: '/for-corporates/banking' },
];

/** Russian twins — same order, RU routes + translated labels */
const NAV_LINKS_RU = [
  { label: 'Кто мы', path: '/ru/who-we-are' },
  { label: 'Что мы делаем', path: '/ru/what-we-do' },
  { label: 'Для бизнеса', path: '/ru/for-corporates' },
  { label: 'Частным клиентам', path: '/ru/for-private-clients' },
  { label: 'Карьера', path: '/ru/careers' },
  { label: 'Контакты', path: '/ru/contact' },
];

const SERVICE_LINKS_RU = [
  { label: 'Юридические услуги', path: '/ru/for-corporates/legal' },
  { label: 'Услуги для частных лиц', path: '/ru/for-private-clients' },
  { label: 'Корпоративные услуги', path: '/ru/for-corporates' },
  { label: 'Финансовые услуги', path: '/ru/for-corporates/fund-administration' },
  { label: 'Миграционные услуги', path: '/ru/for-private-clients/immigration-residency' },
  { label: 'Банковские услуги', path: '/ru/for-corporates/banking' },
];

const MARQUEE_WORDS = ['INTEGRITY', 'EXCELLENCE', 'TRUST', 'LONG-TERM THINKING', 'CLARITY'];

/**
 * Footer (design.md §6.4) — dark ink, oversized Fraunces line + CTA,
 * 4-column link grid, values marquee, legal row.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();
  const isRu = pathname === '/ru' || pathname.startsWith('/ru/');
  const navLinks = isRu ? NAV_LINKS_RU : NAV_LINKS;
  const serviceLinks = isRu ? SERVICE_LINKS_RU : SERVICE_LINKS;

  return (
    <footer
      className="bg-ink text-bone md:sticky md:bottom-0"
      aria-label="Site footer"
    >
      {/* 4-column link grid */}
      <div className="mx-auto grid max-w-site grid-cols-1 gap-12 px-gutter pb-20 pt-[clamp(72px,9vw,120px)] sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src="/assets/original/sc-advisors-logo-white.svg"
            alt="SC Advisors"
            className="mb-6 h-[22px] w-auto"
          />
          <p className="max-w-xs text-sm leading-[1.7] text-parchment">
            {isRu
              ? `Smart & Compliant Advisors — лицензированный провайдер административных услуг, регулируемый ${LEGAL.regulator}. Нам доверяют с 2014 года.`
              : `Smart & Compliant Advisors — licensed administrative service provider regulated by ${LEGAL.regulator}. Trusted experts since 2014.`}
          </p>
        </div>

        <nav aria-label="Footer quick links">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-eyebrow text-mist">
            {isRu ? 'Быстрые ссылки' : 'Quick links'}
          </p>
          <ul className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="text-sm text-parchment transition-colors duration-300 hover:text-bronze"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to={isRu ? '/ru/privacy-policy' : '/privacy-policy'}
                className="text-sm text-parchment transition-colors duration-300 hover:text-bronze"
              >
                {isRu ? 'Политика конфиденциальности' : 'Privacy Policy'}
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Footer services">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-eyebrow text-mist">
            {isRu ? 'Услуги' : 'Services'}
          </p>
          <ul className="flex flex-col gap-3">
            {serviceLinks.map((s) => (
              <li key={s.label}>
                <Link
                  to={s.path}
                  className="text-sm text-parchment transition-colors duration-300 hover:text-bronze"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-eyebrow text-mist">
            {isRu ? 'Контакты' : 'Contact'}
          </p>
          <address className="flex flex-col gap-3 text-sm not-italic leading-[1.7] text-parchment">
            <span className="max-w-[240px]">{CONTACT.address}</span>
            <a href={CONTACT.phoneHref} className="transition-colors duration-300 hover:text-bronze">
              {CONTACT.phone}
            </a>
            <a href={CONTACT.emailHref} className="transition-colors duration-300 hover:text-bronze">
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.telegramHref}
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-300 hover:text-bronze"
            >
              Telegram — {CONTACT.telegram}
            </a>
          </address>
        </div>
      </div>

      {/* Values marquee */}
      <div
        className="overflow-hidden border-t border-bone/10 py-6"
        aria-hidden="true"
      >
        <VelocityMarquee className="gap-0">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {MARQUEE_WORDS.map((word) => (
                <span
                  key={`${copy}-${word}`}
                  className="outline-text whitespace-nowrap px-6 font-mono text-2xl font-medium uppercase tracking-[0.2em]"
                >
                  {word} <span className="text-bronze" style={{ WebkitTextStroke: '0' }}>—</span>
                </span>
              ))}
            </div>
          ))}
        </VelocityMarquee>
      </div>

      {/* Row 3 — legal */}
      <div className="border-t border-bone/10">
        <div className="mx-auto flex max-w-site flex-col gap-4 px-gutter py-8 font-mono text-[11px] text-mist md:flex-row md:items-center md:justify-between">
          <p>
            © {year} SCA — {LEGAL.entity} · Reg. {LEGAL.reg}
          </p>
          <div className="flex gap-6 uppercase tracking-nav">
            <Link
              to={isRu ? '/ru/careers' : '/careers'}
              className="transition-colors hover:text-bronze"
            >
              {isRu ? 'Карьера' : 'Careers'}
            </Link>
            <Link
              to={isRu ? '/ru/privacy-policy' : '/privacy-policy'}
              className="transition-colors hover:text-bronze"
            >
              {isRu ? 'Политика конфиденциальности' : 'Privacy & Policy'}
            </Link>
            <Link
              to={isRu ? '/ru/contact' : '/contact'}
              className="transition-colors hover:text-bronze"
            >
              {isRu ? 'Контакты' : 'Contact'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
