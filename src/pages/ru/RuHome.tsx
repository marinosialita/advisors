import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';
import Reveal from '@/components/scroll/Reveal';
import EmberField from '@/components/EmberField';
import NetworkRing from '@/components/NetworkRing';
import StarfieldCanvas from '@/components/StarfieldCanvas';
import usePageMeta from '@/components/usePageMeta';
import useHtmlLang from '@/components/useHtmlLang';
import { INSIGHTS } from '@/data/insights';
import { TEAM, CONTACT } from '@/data/site';
import { CORPORATE_SERVICES, PRIVATE_SERVICES } from '@/components/services/data';

const RU_STATS = [
  { value: '2014', label: 'Нам доверяют с 2014 года' },
  { value: '200+', label: 'Компаний — наших клиентов' },
  { value: '100+', label: 'Семейных офисов и частных клиентов' },
  { value: '15', label: 'Регионов присутствия по миру' },
];

const RU_CORPORATE: Record<string, string> = {
  'accounting-bookkeeping': 'Бухгалтерия и учёт',
  banking: 'Банковское сопровождение',
  'corporate-governance': 'Корпоративное управление',
  'corporate-and-legal': 'Корпоративное и правовое сопровождение',
  fiduciary: 'Фидуциарные услуги',
  'fund-administration': 'Администрирование фондов',
  hr: 'HR и персонал',
  'intellectual-property-ip-box-tax-regime': 'ИС и налоговый режим IP Box',
  legal: 'Юридические услуги',
  'licensing-authorization': 'Лицензирование и разрешения',
  'mergers-acquisitions': 'Слияния и поглощения',
  redomiciliation: 'Редомициляция',
  'tax-vat-advisory': 'Налоги и НДС',
  'trust-services': 'Трастовые услуги',
};

const RU_PRIVATE: Record<string, string> = {
  'accounting-bookkeeping': 'Бухгалтерия и учёт',
  banking: 'Банковское сопровождение',
  'comprehensive-real-estate-solutions': 'Комплексные решения в недвижимости',
  'concierge-services': 'Консьерж-сервис',
  'immigration-residency': 'Иммиграция и резидентство',
  'intellectual-property-ip-box': 'Интеллектуальная собственность и IP Box',
  legal: 'Юридические услуги',
  'multifamily-office': 'Мультисемейный офис',
  'real-estate-transaction-investment': 'Сделки и инвестиции в недвижимость',
  'tax-advisory': 'Налоговое консультирование',
};

/**
 * Russian home — full RU mirror of the key homepage narrative for the firm's
 * Russian-speaking clients. Same brand language, native copy.
 */
export default function RuHome() {
  useHtmlLang('ru');
  usePageMeta(
    'SC Advisors — корпоративные, налоговые и миграционные услуги на Кипре',
    'SC Advisors — лицензированный провайдер корпоративных услуг на Кипре (регулятор CySEC). Регистрация компаний, налоговое планирование, IP Box 3%, правило 60 дней, резидентство и non-dom — для 200+ компаний и 100+ семейных офисов с 2014 года.',
  );

  return (
    <div className="bg-ink">
      {/* ---------- hero (same cinematic planet as the EN home) ---------- */}
      <section className="relative -mt-[var(--nav-h)] overflow-hidden" aria-label="SC Advisors">
        <div className="absolute -inset-y-[15%] inset-x-0" aria-hidden="true">
          <img
            src="/assets/hero-planet.jpg"
            alt=""
            className="h-full w-full object-cover object-[70%_center]"
            fetchPriority="high"
          />
        </div>
        <StarfieldCanvas className="pointer-events-none absolute inset-0 h-full w-full" />
        <div
          className="pointer-events-none absolute left-[72%] top-1/2 hidden aspect-square w-[clamp(320px,42vw,680px)] -translate-x-1/2 -translate-y-1/2 md:block"
          aria-hidden="true"
        >
          <NetworkRing className="h-full w-full opacity-80" />
        </div>
        <EmberField className="pointer-events-none absolute inset-0 h-full w-full" />
        {/* bronze glow bleeding from the planet side into the dark left */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 62% 58% at 72% 46%, rgba(255,130,77,0.20) 0%, rgba(229,106,30,0.09) 42%, rgba(229,106,30,0) 68%)',
          }}
        />
        {/* contrast scrim — deepens the left third behind the headline */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(100deg, rgba(10,8,6,0.72) 0%, rgba(10,8,6,0.38) 36%, rgba(10,8,6,0) 62%)',
          }}
        />
        {/* mobile-only veil */}
        <div className="pointer-events-none absolute inset-0 bg-ink/40 md:hidden" aria-hidden="true" />
        {/* bottom vignette into the audiences panels */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(110px,16vh,190px)]"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.5) 32%, rgba(10,10,10,0.14) 60%, rgba(10,10,10,0) 100%)',
          }}
        />
        <div className="relative z-10 mx-auto flex min-h-[92svh] w-full max-w-site flex-col justify-center px-gutter pb-[10vh] pt-[calc(var(--nav-h)+8vh)]">
          <Reveal>
            <p className="eyebrow text-bronze">Лимассол · Кипр · регулируется CySEC</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-10 max-w-[15ch] font-display text-[clamp(2.8rem,7.5vw,6.4rem)] font-light leading-[1.0] tracking-[-0.02em] text-bone">
              Превращаем вызовы в ваш{' '}
              <span className="font-normal italic text-bronze">рост</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-xl font-display text-[clamp(1.05rem,1.5vw,1.3rem)] font-light leading-[1.75] text-bone/70">
              Корпоративные, юридические, налоговые, миграционные и финансовые
              услуги на Кипре — для компаний, семейных офисов и частных клиентов.
              Одна команда, полный цикл, без компромиссов.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-wrap items-center gap-5">
              <MagneticButton to="/ru/contact" variant="primary">
                Начать диалог
              </MagneticButton>
              <Link
                to="#ru-insights"
                className="group inline-flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-button text-bone/70 transition-colors hover:text-bronze"
              >
                Статьи о налогах Кипра
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- audiences ---------- */}
      <section className="flex flex-col lg:flex-row" aria-label="Наши клиенты">
        <div className="group relative flex flex-1 flex-col justify-center overflow-hidden border-t border-bone/10 bg-ink px-gutter py-24">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-bronze transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
          />
          <div className="relative z-10 mx-auto w-full max-w-xl">
            <p className="eyebrow mb-6 text-bronze">Корпоративным клиентам</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] tracking-[-0.015em] text-bone">
              Выведите бизнес на новый{' '}
              <span className="font-normal italic text-bronze">уровень.</span>
            </h2>
            <p className="mt-8 text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.75] text-parchment">
              Регистрация и релокация компаний на Кипр и в другие юрисдикции,
              банкинг, бухгалтерия, налоговое планирование и режим IP Box с
              эффективной ставкой 3% — сопровождаем на каждом шаге.
            </p>
            <ul className="mt-9 flex flex-wrap gap-2.5">
              {CORPORATE_SERVICES.slice(0, 8).map((s) => (
                <li
                  key={s.slug}
                  className="rounded-full border border-bone/15 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-bone/60"
                >
                  {RU_CORPORATE[s.slug] ?? s.title}
                </li>
              ))}
            </ul>
            <div className="mt-11">
              <MagneticButton to="/ru/for-corporates" variant="ghost">
                Все услуги для бизнеса
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="group relative flex flex-1 flex-col justify-center overflow-hidden border-t border-bone/10 bg-ivory px-gutter py-24">
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-bronze transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
          />
          <div className="relative z-10 mx-auto w-full max-w-xl">
            <p className="eyebrow mb-6 text-bronze">Частным клиентам</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] tracking-[-0.015em] text-ink">
              Сохраните и приумножьте семейный{' '}
              <span className="font-normal italic text-bronze">капитал.</span>
            </h2>
            <p className="mt-8 text-[clamp(1rem,1.2vw,1.15rem)] leading-[1.75] text-umber">
              Налоговое резидентство по правилу 60 дней, статус non-dom,
              переезд на Кипр, недвижимость, семейный офис и наследственное
              планирование — конфиденциально и под ключ.
            </p>
            <ul className="mt-9 flex flex-wrap gap-2.5">
              {PRIVATE_SERVICES.slice(0, 8).map((s) => (
                <li
                  key={s.slug}
                  className="rounded-full border border-ink/15 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-umber"
                >
                  {RU_PRIVATE[s.slug] ?? s.title}
                </li>
              ))}
            </ul>
            <div className="mt-11">
              <MagneticButton to="/ru/for-private-clients" variant="primary">
                Все услуги для частных лиц
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- stats ---------- */}
      <section className="relative overflow-hidden bg-ivory text-ink" aria-label="Цифры">
        <div className="mx-auto max-w-site px-gutter py-[clamp(72px,9vw,120px)]">
          <div className="mb-14 flex items-center justify-between gap-6 border-t border-ink/10 pt-8">
            <p className="eyebrow shrink-0 text-bronze">Нам доверяют — в цифрах</p>
          </div>
          <div className="grid grid-cols-2 gap-y-14 lg:grid-cols-4">
            {RU_STATS.map((stat) => (
              <Reveal key={stat.label}>
                <div className="pr-6">
                  <p className="font-display text-[clamp(2.6rem,5vw,4.4rem)] font-light leading-none tracking-[-0.02em]">
                    {stat.value}
                  </p>
                  <p className="mt-5 font-mono text-[10px] font-medium uppercase leading-[1.8] tracking-nav text-umber">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- team teaser ---------- */}
      <section className="bg-bone" aria-label="Команда">
        <div className="mx-auto max-w-site px-gutter py-[clamp(80px,10vw,140px)]">
          <Reveal>
            <p className="eyebrow text-bronze">02 — Команда</p>
            <h2 className="mt-8 max-w-2xl font-display text-[clamp(2rem,4.4vw,3.6rem)] font-light leading-[1.06] tracking-[-0.015em] text-ink">
              Люди, которые каждый день выстраивают структуры на Кипре.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {TEAM.map((m) => (
              <Reveal key={m.slug}>
                <Link to="/ru/who-we-are" className="group block">
                  <div className="overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-4 font-display text-[15px] font-light text-ink transition-colors group-hover:text-bronze-deep">
                    {m.name}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-umber">
                    {m.role}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- insights ---------- */}
      <section id="ru-insights" className="bg-bone pb-[clamp(90px,11vw,150px)]" aria-label="Статьи">
        <div className="mx-auto max-w-site px-gutter">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6 border-t border-ink/10 pt-14">
              <div>
                <p className="eyebrow text-bronze">03 — Статьи</p>
                <h2 className="mt-8 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-light leading-[1.06] tracking-[-0.015em] text-ink">
                  Ясность — в письменном виде.
                </h2>
              </div>
              <p className="max-w-sm text-[15px] leading-relaxed text-umber">
                Налоги и резидентство Кипра — объясняют люди, которые
                выстраивают эти структуры каждый день.
              </p>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {INSIGHTS.map((a) => {
              const ru = a.ru;
              return (
                <Reveal key={a.slug}>
                  <Link to={`/ru/insights/${a.slug}`} className="group block">
                    <div className="relative overflow-hidden">
                      <img
                        src={a.image}
                        alt={a.imageAlt}
                        className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                      <span className="absolute bottom-4 left-4 rounded-full bg-ink/70 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-bronze backdrop-blur">
                        {ru?.tag ?? a.tag}
                      </span>
                    </div>
                    <div className="border-b-2 border-bronze/0 pb-6 transition-colors duration-500 group-hover:border-bronze">
                      <h3 className="mt-7 font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-light leading-[1.15] tracking-[-0.01em] text-ink transition-colors group-hover:text-bronze-deep">
                        {ru?.title ?? a.title}
                      </h3>
                      <p className="mt-4 text-[15px] leading-relaxed text-umber">
                        {ru?.excerpt ?? a.excerpt}
                      </p>
                      <p className="mt-5 flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-button text-bronze">
                        Читать статью
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="border-t border-bone/10 bg-ink text-bone" aria-label="Контакты">
        <div className="mx-auto flex max-w-site flex-col items-center px-gutter py-[clamp(90px,12vw,160px)] text-center">
          <p className="eyebrow mb-8 text-bronze">Свяжитесь с командой</p>
          <h2 className="max-w-3xl font-display text-[clamp(1.9rem,4.5vw,3.4rem)] font-light leading-[1.1] tracking-[-0.015em]">
            Расскажите о своей задаче — ответим в течение рабочего дня.
          </h2>
          <p className="mt-8 font-mono text-[12px] uppercase tracking-nav text-bone/50">
            {CONTACT.email} · {CONTACT.phone}
          </p>
          <div className="mt-12">
            <MagneticButton
              to="/ru/contact"
              variant="primary"
              className="bg-bronze text-ink hover:bg-bone"
            >
              Начать диалог
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}
