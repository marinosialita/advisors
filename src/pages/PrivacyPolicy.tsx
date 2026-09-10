import { useContext, useEffect, useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll } from 'framer-motion';
import { AppReadyContext } from '@/components/app-ready-context';
import MagneticButton from '@/components/MagneticButton';
import SplitWords from '@/components/SplitWords';
import { cn } from '@/lib/utils';
import { EASE_OUT_EXPO, usePrefersReducedMotion } from '@/lib/motion';
import { DPO } from '@/components/contact-legal/data';
import type { PolicySection } from '@/components/contact-legal/privacy-content';
import { POLICY_SECTIONS } from '@/components/contact-legal/privacy-content';
import usePageMeta from '@/components/usePageMeta';
import useHtmlLang from '@/components/useHtmlLang';

gsap.registerPlugin(ScrollTrigger);

interface PrivacyPolicyProps {
  locale?: 'en' | 'ru';
}

const META_LINE =
  'LAST UPDATED — 2024 · CONTROLLER: IP S&C SMART & COMPLIANT ADVISORS LTD · REG. NO. HE 432457';

const META_LINE_RU =
  'ПОСЛЕДНЕЕ ОБНОВЛЕНИЕ — 2024 · ОПЕРАТОР: IP S&C SMART & COMPLIANT ADVISORS LTD · РЕГ. № HE 432457';

/** Linkify emails and the Commissioner website inside verbatim prose. */
const LINK_RE = /([\w.+-]+@[\w-]+\.[\w.]+|www\.dataprotection\.gov\.cy)/g;
const EMAIL_TEST = /^[\w.+-]+@[\w-]+\.[\w.]+$/;

function linkify(text: string): ReactNode {
  const parts = text.split(LINK_RE);
  if (parts.length === 1) return text;
  return parts.map((part, i) => {
    if (EMAIL_TEST.test(part)) {
      return (
        <a
          key={`${part}-${i}`}
          href={`mailto:${part}`}
          className="text-bronze underline decoration-bronze/40 underline-offset-4 transition-colors duration-300 hover:text-bronze-deep"
        >
          {part}
        </a>
      );
    }
    if (part === 'www.dataprotection.gov.cy') {
      return (
        <a
          key={`${part}-${i}`}
          href="https://www.dataprotection.gov.cy"
          target="_blank"
          rel="noreferrer"
          className="text-bronze underline decoration-bronze/40 underline-offset-4 transition-colors duration-300 hover:text-bronze-deep"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

/* ------------------------------------------------------------------ */
/* Russian translation — mirrors POLICY_SECTIONS section-for-section.  */
/* Company name, addresses, e-mails, GDPR/CySEC references kept as-is. */
/* ------------------------------------------------------------------ */

const POLICY_SECTIONS_RU: PolicySection[] = [
  {
    id: 'introduction',
    title: 'Введение',
    blocks: [
      {
        t: 'p',
        s: 'IP S&C SMART & COMPLIANT ADVISORS LTD («SC Advisors», «Компания», «мы», «наш» или «нас») придаёт первостепенное значение защите конфиденциальности, приватности и безопасности доверенных нам персональных данных.',
      },
      {
        t: 'p',
        s: 'Настоящая Политика конфиденциальности разъясняет, как мы собираем, используем, раскрываем, храним, передаём и иным образом обрабатываем персональные данные в связи с оказанием профессиональных услуг, ведением деловой деятельности, работой нашего сайта и исполнением регуляторных обязательств.',
      },
      { t: 'p', s: 'Настоящая Политика издана в соответствии с:' },
      {
        t: 'list',
        items: [
          'Регламент (ЕС) 2016/679 (Общий регламент о защите данных — «GDPR»)',
          'Закон о защите физических лиц при обработке персональных данных и о свободном обращении таких данных 2018 года (Закон 125(I)/2018) с изменениями',
          'Законы Республики Кипр о предотвращении отмывания денежных средств и финансирования терроризма и борьбе с ними с изменениями',
          'Иные применимые правовые и регуляторные требования',
        ],
      },
      {
        t: 'p',
        s: 'Предоставляя нам персональные данные или пользуясь нашими услугами либо сайтом, вы подтверждаете, что ваши персональные данные могут обрабатываться в соответствии с настоящей Политикой конфиденциальности.',
      },
    ],
  },
  {
    id: 'data-controller',
    title: 'Оператор персональных данных',
    blocks: [
      {
        t: 'p',
        s: 'Оператором персональных данных, ответственным за обработку персональных данных, описанную в настоящей Политике конфиденциальности, является:',
      },
      {
        t: 'p',
        s: 'IP S&C SMART & COMPLIANT ADVISORS LTD — компания с ограниченной ответственностью, поставщик административных услуг, зарегистрированная в Республике Кипр под регистрационным номером HE 432457.',
      },
      {
        t: 'p',
        s: 'Контактные данные: Эл. почта: team@sc-advisors.cy — Почтовый адрес: Kanika Business Center, 28th October Avenue 317A Block B, 1st Floor, Office 101, 3105 Limassol, Cyprus — Телефон: +357 25 005284',
      },
    ],
  },
  {
    id: 'data-protection-officer',
    title: 'Специалист по защите данных',
    blocks: [
      { t: 'p', s: 'Компания назначила специалиста по защите данных («DPO»).' },
      {
        t: 'p',
        s: 'Имя: Despina Glyki — Эл. почта: compliance@sc-advisors.cy — Телефон: +357 25 005284',
      },
      {
        t: 'p',
        s: 'Почтовый адрес: Kanika Business Center, 28th October Avenue 317A Block B, 1st Floor, Office 101, 3105 Limassol, Cyprus',
      },
      {
        t: 'p',
        s: 'Со специалистом по защите данных можно связаться по всем вопросам, касающимся обработки персональных данных и реализации прав, предусмотренных применимым законодательством о защите данных.',
      },
    ],
  },
  {
    id: 'personal-data-we-collect',
    title: 'Какие персональные данные мы собираем',
    blocks: [
      {
        t: 'p',
        s: 'В зависимости от характера наших отношений с вами мы можем собирать и обрабатывать следующие категории персональных данных:',
      },
      {
        t: 'list',
        items: [
          'Идентификационные и верификационные сведения',
          'Контактные данные',
          'Сведения о корпоративной структуре и бенефициарных владельцах',
          'Финансовая информация',
          'Сведения об источниках благосостояния и происхождении средств',
          'Документы комплексной проверки клиентов и углублённой проверки',
          'Сведения санкционного скрининга, проверки на статус публичного должностного лица (PEP) и мониторинга негативных публикаций',
          'Профессиональная и деловая информация',
          'Переписка и сообщения',
          'Информация о сайте и технические данные',
          'Любая иная информация, необходимая для оказания наших услуг или соблюдения юридических обязательств',
        ],
      },
    ],
  },
  {
    id: 'how-we-collect',
    title: 'Как мы собираем персональные данные',
    blocks: [
      { t: 'p', s: 'Мы можем собирать персональные данные непосредственно у вас, когда вы:' },
      {
        t: 'list',
        items: [
          'Обращаетесь к нам',
          'Запрашиваете информацию',
          'Заказываете наши услуги',
          'Предоставляете документы',
          'Связываетесь с нами по электронной почте, телефону или иными способами',
        ],
      },
      {
        t: 'p',
        s: 'Мы также можем получать персональные данные от третьих лиц, включая:',
      },
      {
        t: 'list',
        items: [
          'Публичные реестры и официальные записи',
          'Компетентные органы',
          'Финансовые учреждения',
          'Профессиональные консультанты',
          'Реферальные партнёры и посредники',
          'Санкционные и комплаенс-базы данных',
          'Общедоступные источники',
          'Иные законные источники в случаях, разрешённых законом',
        ],
      },
    ],
  },
  {
    id: 'purposes',
    title: 'Цели обработки',
    blocks: [
      { t: 'p', s: 'Мы можем обрабатывать персональные данные в следующих целях:' },
      {
        t: 'list',
        items: [
          'Оценка потенциальных деловых отношений',
          'Установление и поддержание отношений с клиентами',
          'Оказание корпоративных, фидуциарных, управленческих, комплаенс- и административных услуг',
          'Регистрация и администрирование компаний',
          'Корпоративно-секретарские услуги',
          'Номинальные, трастовые услуги и услуги зарегистрированного офиса',
          'Соблюдение обязательств в сфере противодействия отмыванию денежных средств и финансированию терроризма',
          'Комплексная проверка клиентов и текущий мониторинг',
          'Соблюдение санкционного законодательства и управление рисками',
          'Соблюдение регуляторных требований',
          'Защита наших законных прав и интересов',
          'Предотвращение и выявление мошенничества и финансовых преступлений',
          'Ответы на запросы и обращения',
          'Ведение учёта и внутренних процедур корпоративного управления',
          'Установление, осуществление или защита юридических требований',
        ],
      },
    ],
  },
  {
    id: 'legal-basis',
    title: 'Правовые основания обработки',
    blocks: [
      {
        t: 'p',
        s: 'Мы обрабатываем персональные данные только при наличии правового основания, включая:',
      },
      {
        t: 'list',
        items: [
          'Исполнение договора или действия, предшествующие заключению договора',
          'Соблюдение юридических и регуляторных обязательств',
          'Законные интересы, преследуемые Компанией',
          'Согласие — в случаях, когда оно требуется по закону',
          'Защита жизненно важных интересов — где применимо',
        ],
      },
      {
        t: 'p',
        s: 'К нашим законным интересам относятся администрирование бизнеса, информационная безопасность, предотвращение мошенничества, соблюдение регуляторных требований, управление рисками и защита наших законных прав.',
      },
    ],
  },
  {
    id: 'aml-compliance',
    title: 'Соблюдение требований ПОД/ФТ и регуляторных норм',
    blocks: [
      {
        t: 'p',
        s: 'Как регулируемый поставщик административных услуг, мы несём обширные юридические и регуляторные обязательства в сфере противодействия отмыванию денежных средств, финансированию терроризма, соблюдения санкций и комплексной проверки клиентов.',
      },
      {
        t: 'p',
        s: 'Соответственно, мы можем быть обязаны по закону собирать, проверять, оценивать, хранить и раскрывать персональные данные в целях:',
      },
      {
        t: 'list',
        items: [
          'Идентификация и верификация клиентов',
          'Верификация бенефициарных владельцев',
          'Проверка источников благосостояния и происхождения средств',
          'Санкционный скрининг',
          'Проверка на статус публичного должностного лица',
          'Оценка рисков',
          'Текущий мониторинг',
          'Регуляторная отчётность',
          'Соблюдение юридических обязательств',
        ],
      },
      {
        t: 'p',
        s: 'Отказ от предоставления запрашиваемой информации может помешать нам установить или продолжить деловые отношения либо оказывать услуги.',
      },
    ],
  },
  {
    id: 'special-category-data',
    title: 'Специальные категории данных и данные о судимостях',
    blocks: [
      {
        t: 'p',
        s: 'В необходимых и законных случаях мы можем обрабатывать специальные категории персональных данных, а также персональные данные, касающиеся судимостей и правонарушений, если такая обработка необходима в юридических, регуляторных, комплаенс- или трудовых целях либо для установления, осуществления или защиты юридических требований.',
      },
    ],
  },
  {
    id: 'disclosure',
    title: 'Раскрытие персональных данных',
    blocks: [
      { t: 'p', s: 'Мы можем раскрывать персональные данные, когда это законно и необходимо, следующим лицам:' },
      {
        t: 'list',
        items: [
          'Регулирующие и надзорные органы',
          'Государственные органы',
          'Правоохранительные органы',
          'Суды и трибуналы',
          'Налоговые органы',
          'Банки и финансовые учреждения',
          'Аудиторы, бухгалтеры и юристы',
          'Поставщики информационных технологий и облачных услуг',
          'Поставщики комплаенс- и скрининговых услуг',
          'Иные профессиональные консультанты и поставщики услуг',
        ],
      },
      {
        t: 'p',
        s: 'Все случаи раскрытия осуществляются при соблюдении надлежащих правовых, договорных и конфиденциальных гарантий.',
      },
    ],
  },
  {
    id: 'international-transfers',
    title: 'Трансграничная передача данных',
    blocks: [
      {
        t: 'p',
        s: 'Персональные данные могут передаваться в страны за пределами Европейской экономической зоны и обрабатываться в них.',
      },
      {
        t: 'p',
        s: 'При такой передаче применяются надлежащие гарантии в соответствии с применимым законодательством о защите данных, включая решения о достаточности, стандартные договорные условия или иные законные механизмы передачи.',
      },
      {
        t: 'p',
        s: 'Компания может использовать облачных поставщиков услуг, включая Microsoft 365 и Google Workspace, для ведения деятельности и коммуникаций.',
      },
    ],
  },
  {
    id: 'data-retention',
    title: 'Сроки хранения данных',
    blocks: [
      {
        t: 'p',
        s: 'Мы храним персональные данные только в течение срока, необходимого для достижения целей, для которых они были собраны, и для соблюдения юридических, регуляторных, договорных и профессиональных обязательств.',
      },
      {
        t: 'p',
        s: 'Документы по противодействию отмыванию денежных средств и комплексной проверке клиентов могут храниться не менее пяти (5) лет после прекращения деловых отношений либо в течение более длительного срока, если это требуется законом или регуляторными требованиями.',
      },
      {
        t: 'p',
        s: 'Когда персональные данные больше не требуются, они надёжно удаляются, обезличиваются или иным образом уничтожаются.',
      },
    ],
  },
  {
    id: 'data-security',
    title: 'Безопасность данных',
    blocks: [
      {
        t: 'p',
        s: 'Мы применяем надлежащие технические и организационные меры, направленные на защиту персональных данных от случайного или незаконного уничтожения, утраты, изменения, несанкционированного раскрытия или несанкционированного доступа.',
      },
      {
        t: 'p',
        s: 'Эти меры включают контроль доступа, процедуры информационной безопасности, обучение персонала, обязательства о конфиденциальности и постоянный мониторинг мер безопасности.',
      },
    ],
  },
  {
    id: 'your-rights',
    title: 'Ваши права',
    blocks: [
      { t: 'p', s: 'В соответствии с применимым законодательством вы можете иметь право:' },
      {
        t: 'list',
        items: [
          'Получить доступ к своим персональным данным',
          'Потребовать исправления неточных или неполных персональных данных',
          'Потребовать удаления персональных данных',
          'Потребовать ограничения обработки',
          'Возразить против обработки',
          'Потребовать переноса данных',
          'Отозвать согласие, если обработка основана на согласии',
          'Подать жалобу в компетентный надзорный орган',
        ],
      },
      {
        t: 'p',
        s: 'Отдельные права могут быть ограничены в случаях, когда такое ограничение допускается законом, в том числе в целях противодействия отмыванию денежных средств, регуляторного надзора, правоохранительной деятельности или судебных разбирательств.',
      },
    ],
  },
  {
    id: 'cookies',
    title: 'Файлы cookie',
    blocks: [
      {
        t: 'p',
        s: 'Наши сайты могут использовать файлы cookie и аналогичные технологии для обеспечения функциональности, повышения производительности и улучшения пользовательского опыта.',
      },
      {
        t: 'p',
        s: 'В случаях, предусмотренных законом, необязательные файлы cookie используются только после получения вашего согласия.',
      },
      {
        t: 'p',
        s: 'Дополнительная информация может быть представлена в нашей Политике в отношении файлов cookie и механизме согласия на их использование.',
      },
    ],
  },
  {
    id: 'third-party-websites',
    title: 'Сайты третьих лиц',
    blocks: [
      {
        t: 'p',
        s: 'Наши сайты могут содержать ссылки на сайты третьих лиц. Мы не контролируем и не несём ответственности за практики конфиденциальности или содержание таких сайтов.',
      },
      {
        t: 'p',
        s: 'Рекомендуем пользователям ознакомиться с политиками конфиденциальности любых сайтов третьих лиц, которые они посещают.',
      },
    ],
  },
  {
    id: 'complaints',
    title: 'Жалобы',
    blocks: [
      {
        t: 'p',
        s: 'Если у вас есть замечания относительно обработки ваших персональных данных, мы рекомендуем в первую очередь обратиться к нам.',
      },
      { t: 'p', s: 'Вы также имеете право подать жалобу в:' },
      {
        t: 'p',
        s: 'Офис Уполномоченного по защите персональных данных, Kypranoros 15, 1061 Nicosia, Cyprus',
      },
      {
        t: 'p',
        s: 'Сайт: www.dataprotection.gov.cy — Эл. почта: commissioner@dataprotection.gov.cy — Телефон: +357 22 818456',
      },
    ],
  },
  {
    id: 'changes',
    title: 'Изменения настоящей Политики конфиденциальности',
    blocks: [
      {
        t: 'p',
        s: 'Мы можем периодически вносить изменения в настоящую Политику конфиденциальности, отражая изменения правовых, регуляторных или операционных требований.',
      },
      {
        t: 'p',
        s: 'Актуальная версия всегда доступна на нашем сайте.',
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Privacy Policy — /privacy-policy (privacy.md)                       */
/* ------------------------------------------------------------------ */

export default function PrivacyPolicy({ locale = 'en' }: PrivacyPolicyProps) {
  const isRu = locale === 'ru';
  useHtmlLang(locale);
  usePageMeta(
    isRu ? 'Политика конфиденциальности — SC Advisors' : 'Privacy Policy — SC Advisors',
    isRu
      ? 'Как SC Advisors собирает, использует, защищает и хранит ваши персональные данные — в соответствии с GDPR, Законом Кипра 125(I)/2018 и применимым законодательством о противодействии отмыванию денежных средств.'
      : 'How SC Advisors collects, uses, protects and retains your personal data — in line with the GDPR, Cyprus Law 125(I)/2018 and applicable AML legislation.',
  );

  const sections = isRu ? POLICY_SECTIONS_RU : POLICY_SECTIONS;
  const metaLine = isRu ? META_LINE_RU : META_LINE;

  const ready = useContext(AppReadyContext);
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>(POLICY_SECTIONS[0].id);

  /* Reading-progress bar (1px bronze under the header) */
  const { scrollYProgress } = useScroll();

  /* ---- GSAP load-in + section reveals (reduced-motion guarded) ------ */
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
            { yPercent: 0, duration: 1.1, stagger: 0.05 },
            0.1,
          )
          .fromTo(
            '.js-hero-fade',
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.08 },
            0.5,
          );

        /* S1 — meta line types in (0.6s) */
        const meta = rootRef.current?.querySelector<HTMLElement>('.js-meta');
        if (meta) {
          const full = meta.dataset.text ?? '';
          const state = { v: 0 };
          gsap.to(state, {
            v: full.length,
            duration: 0.6,
            delay: 0.55,
            ease: 'none',
            onStart: () => {
              meta.textContent = '';
            },
            onUpdate: () => {
              meta.textContent = full.slice(0, Math.round(state.v));
            },
            onComplete: () => {
              meta.textContent = full;
            },
          });
        }

        /* S2 — policy sections fade up 20px as they enter (15% viewport) */
        gsap.utils.toArray<HTMLElement>('.js-pp-section').forEach((section) => {
          gsap.fromTo(
            section,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'expo.out',
              scrollTrigger: { trigger: section, start: 'top 85%', once: true },
            },
          );
        });

        /* S3 — closing block */
        gsap.fromTo(
          '.js-dpo',
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'expo.out',
            scrollTrigger: { trigger: '.js-dpo-band', start: 'top 80%', once: true },
          },
        );
      }, rootRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [ready]);

  /* ---- Scroll-spy: highlight the active TOC entry ------------------- */
  useEffect(() => {
    const sections = POLICY_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 },
    );
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, []);

  const scrollToSection = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveId(id);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <div ref={rootRef}>
      {/* Reading progress — slim bronze bar under the header */}
      <motion.div
        className="fixed inset-x-0 top-[var(--nav-h)] z-[90] h-px origin-left bg-bronze"
        style={{ scaleX: scrollYProgress }}
        aria-hidden="true"
      />

      {/* ================= S1 — HERO (bone, compact ~50vh) ============= */}
      <section
        className="js-hero flex min-h-[calc(50dvh-var(--nav-h))] items-center bg-bone"
        aria-label={isRu ? 'Введение в политику конфиденциальности' : 'Privacy policy introduction'}
      >
        <div className="mx-auto w-full max-w-site px-gutter py-20">
          <p className="js-hero-fade eyebrow mb-8">{isRu ? 'Юридическое' : 'Legal'}</p>
          <h1 className="font-display text-[clamp(3rem,8.5vw,7.5rem)] font-light leading-[0.98] tracking-[-0.02em] text-ink">
            <SplitWords text={isRu ? 'Политика конфиденциальности.' : 'Privacy Policy.'} />
          </h1>
          <p
            className="js-meta mt-10 min-h-[1.5em] font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-mist"
            data-text={metaLine}
          >
            {metaLine}
          </p>
          <p className="js-hero-fade mt-8 max-w-2xl text-[clamp(1.05rem,1.4vw,1.3rem)] leading-[1.65] text-umber">
            {isRu
              ? 'Как мы собираем, используем, защищаем и храним ваши персональные данные — в соответствии с GDPR, Законом Кипра 125(I)/2018 и применимым законодательством о противодействии отмыванию денежных средств.'
              : 'How we collect, use, protect and retain your personal data — in line with the GDPR, Cyprus Law 125(I)/2018 and applicable AML legislation.'}
          </p>
        </div>
      </section>

      {/* ================= S2 — POLICY BODY (bone) ===================== */}
      <section className="bg-bone" aria-label={isRu ? 'Политика конфиденциальности' : 'Privacy policy'}>
        <div className="mx-auto max-w-site px-gutter pb-[clamp(96px,14vw,200px)] pt-8">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-8">
            {/* Sticky table of contents */}
            <nav
              aria-label={isRu ? 'Содержание политики' : 'Policy contents'}
              className="hidden lg:col-span-4 lg:block"
            >
              <div className="sticky top-[calc(var(--nav-h)+48px)]">
                <p className="eyebrow mb-8">{isRu ? 'Содержание' : 'Contents'}</p>
                <ol className="relative flex flex-col gap-3 border-l border-stone">
                  {sections.map((section, i) => {
                    const active = section.id === activeId;
                    return (
                      <li key={section.id} className="relative pl-6">
                        {active && (
                          <motion.span
                            layoutId="toc-indicator"
                            className="absolute left-[-1px] top-0 h-full w-px bg-bronze"
                            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                            aria-hidden="true"
                          />
                        )}
                        <a
                          href={`#${section.id}`}
                          onClick={scrollToSection(section.id)}
                          aria-current={active ? 'true' : undefined}
                          className={cn(
                            'font-mono text-[11px] uppercase leading-[1.6] tracking-[0.14em] transition-colors duration-300',
                            active ? 'text-bronze' : 'text-mist hover:text-ink',
                          )}
                        >
                          {String(i + 1).padStart(2, '0')} — {section.title}
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </nav>

            {/* Prose column */}
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="max-w-[680px]">
                {sections.map((section, i) => (
                  <section
                    key={section.id}
                    id={section.id}
                    aria-labelledby={`${section.id}-title`}
                    className={cn(
                      'js-pp-section scroll-mt-[calc(var(--nav-h)+40px)]',
                      i > 0 && 'mt-16 border-t border-stone pt-14',
                    )}
                  >
                    <p
                      className="font-mono text-[11px] font-medium uppercase tracking-eyebrow text-bronze"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h2
                      id={`${section.id}-title`}
                      className="mt-4 font-display text-[28px] font-normal leading-[1.2] text-ink"
                    >
                      {section.title}
                    </h2>
                    {section.blocks.map((block, j) =>
                      block.t === 'p' ? (
                        <p key={j} className="mt-5 text-base leading-[1.75] text-umber">
                          {linkify(block.s)}
                        </p>
                      ) : (
                        <ul key={j} className="mt-5 flex flex-col gap-2.5">
                          {block.items.map((item) => (
                            <li
                              key={item}
                              className="flex gap-4 text-base leading-[1.75] text-umber"
                            >
                              <span
                                className="mt-[0.72em] h-1 w-1 shrink-0 bg-bronze"
                                aria-hidden="true"
                              />
                              <span>{linkify(item)}</span>
                            </li>
                          ))}
                        </ul>
                      ),
                    )}
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= S3 — CLOSING (ink, compact) ================= */}
      <section
        className="js-dpo-band bg-ink text-bone"
        aria-label={isRu ? 'Контакты по защите данных' : 'Data protection contact'}
      >
        <div className="js-dpo mx-auto max-w-site px-gutter py-[clamp(64px,9vw,120px)]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-6">
              <p className="eyebrow mb-10">{isRu ? 'Вопросы о ваших данных?' : 'Questions about your data?'}</p>
              <h2 className="font-display text-[clamp(1.8rem,3.4vw,3rem)] font-light leading-[1.1]">
                {isRu
                  ? 'Свяжитесь с нашим специалистом по защите данных.'
                  : 'Contact our Data Protection Officer.'}
              </h2>
              <div className="mt-10">
                <MagneticButton href={DPO.emailHref} variant="primary">
                  {isRu ? 'Связаться с DPO' : 'Contact the DPO'}
                </MagneticButton>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="font-display text-2xl">{DPO.name}</p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-nav text-bronze">
                {isRu ? 'Специалист по защите данных' : 'Data Protection Officer'}
              </p>
              <span className="mt-8 block h-px w-full bg-bone/15" aria-hidden="true" />
              <address className="mt-8 flex flex-col gap-3 text-sm not-italic leading-[1.7] text-parchment">
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
                <span className="max-w-xs">{DPO.address}</span>
              </address>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
