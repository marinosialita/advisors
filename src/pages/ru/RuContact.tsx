import { ArrowUpRight } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';
import Reveal from '@/components/scroll/Reveal';
import usePageMeta from '@/components/usePageMeta';
import useHtmlLang from '@/components/useHtmlLang';
import { CONTACT, LEGAL } from '@/data/site';
import { MAP_DIRECTIONS_HREF, MAP_EMBED_SRC } from '@/components/contact-legal/data';

const ROWS = [
  {
    label: 'Адрес',
    value: CONTACT.address,
    href: MAP_DIRECTIONS_HREF,
    hint: 'Как добраться',
  },
  { label: 'Телефон', value: CONTACT.phone, href: CONTACT.phoneHref, hint: 'Позвонить' },
  { label: 'Email', value: CONTACT.email, href: CONTACT.emailHref, hint: 'Написать' },
  {
    label: 'Telegram',
    value: CONTACT.telegram,
    href: CONTACT.telegramHref,
    hint: 'Открыть Telegram',
  },
];

/** Russian contact page — same facts as /contact, native copy. */
export default function RuContact() {
  useHtmlLang('ru');
  usePageMeta(
    'Контакты — SC Advisors | Лимассол, Кипр',
    'Свяжитесь со SC Advisors: офис в Лимассоле (Kanika Business Center, 28 Oktovriou), телефон +357 25005284, email team@sc-advisors.cy, Telegram. Отвечаем в течение рабочего дня.',
  );

  return (
    <div className="bg-ink">
      {/* ---------- hero ---------- */}
      <section className="relative -mt-[var(--nav-h)] overflow-hidden" aria-label="Контакты">
        <div
          className="pointer-events-none absolute right-[-10%] top-[-20%] h-[80vmin] w-[80vmin] rounded-full opacity-[0.14]"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(circle, rgba(255,130,77,0.5) 0%, rgba(229,106,30,0.16) 45%, transparent 70%)',
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-site px-gutter pb-[clamp(56px,7vw,96px)] pt-[calc(var(--nav-h)+10vh)]">
          <Reveal>
            <p className="eyebrow text-bronze">Контакты</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-10 max-w-[14ch] font-display text-[clamp(2.8rem,7vw,6rem)] font-light leading-[1.0] tracking-[-0.02em] text-bone">
              Начнём <span className="font-normal italic text-bronze">диалог.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-xl font-display text-[clamp(1.05rem,1.5vw,1.3rem)] font-light leading-[1.75] text-bone/70">
              Расскажите о своей задаче — регистрация компании, налоги,
              резидентство, переезд или семейный офис. Русскоязычная команда
              ответит в течение рабочего дня.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- contact rows ---------- */}
      <section aria-label="Как связаться" className="border-t border-bone/10">
        <div className="mx-auto max-w-site px-gutter py-[clamp(64px,8vw,110px)]">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              {ROWS.map((row) => (
                <Reveal key={row.label}>
                  <a
                    href={row.href}
                    target={row.href.startsWith('http') ? '_blank' : undefined}
                    rel={row.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="group flex items-baseline justify-between gap-6 border-b border-bone/10 py-7 transition-colors"
                  >
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-bronze">
                        {row.label}
                      </p>
                      <p className="mt-3 font-display text-[clamp(1.1rem,1.7vw,1.45rem)] font-light leading-snug text-bone/90 transition-colors group-hover:text-bronze">
                        {row.value}
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-nav text-bone/40 transition-colors group-hover:text-bronze">
                      {row.hint}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                    </span>
                  </a>
                </Reveal>
              ))}
              <Reveal>
                <p className="mt-10 font-mono text-[10px] uppercase leading-[2] tracking-[0.14em] text-bone/35">
                  {LEGAL.entity} · рег. № {LEGAL.reg}
                  <br />
                  Лицензированный провайдер административных услуг · регулятор {LEGAL.regulator}
                </p>
              </Reveal>
            </div>

            {/* map */}
            <Reveal delay={0.15}>
              <div className="overflow-hidden border border-bone/10">
                <iframe
                  title="SC Advisors — офис в Лимассоле на карте"
                  src={MAP_EMBED_SRC}
                  className="aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[480px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-20 flex flex-col items-center rounded-xl border border-bone/12 bg-white/[0.02] px-8 py-14 text-center">
              <p className="eyebrow text-bronze">Предпочитаете письмо?</p>
              <p className="mt-6 max-w-xl font-display text-[clamp(1.3rem,2.4vw,2rem)] font-light leading-snug text-bone">
                Напишите нам — и получите структурированный ответ от профильного
                специалиста, а не от секретаря.
              </p>
              <div className="mt-10">
                <MagneticButton href={CONTACT.emailHref} variant="primary">
                  {CONTACT.email}
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
