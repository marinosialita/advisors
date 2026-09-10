/**
 * Insights — long-form articles published under the SC Advisors brand.
 * Rendered by src/pages/InsightArticle.tsx and previewed on the homepage
 * (section 03 — Insights).
 */

export type InsightBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'example'; title: string; lines: { label: string; value: string; strong?: boolean }[]; note?: string }
  | { type: 'callout'; text: string };

export interface InsightLocale {
  tag: string;
  title: string;
  /** words of the title rendered italic bronze in the hero */
  accentWords: string[];
  lead: string;
  excerpt: string;
  readingTime: string;
  updated: string;
  blocks: InsightBlock[];
}

export interface Insight {
  slug: string;
  tag: string;
  title: string;
  /** words of the title rendered italic bronze in the hero */
  accentWords: string[];
  lead: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  readingTime: string;
  updated: string;
  relatedService: { label: string; to: string };
  blocks: InsightBlock[];
  /** Russian translation (used on /ru/insights/:slug) */
  ru?: InsightLocale;
}

export const INSIGHTS: Insight[] = [
  {
    slug: 'cyprus-ip-box-regime',
    tag: 'Tax — IP',
    title: 'The Cyprus IP Box: an effective 3% on qualifying IP profits',
    accentWords: ['3%', 'IP'],
    lead: 'If your company builds software, Cyprus offers something almost no other EU country can match: an effective tax rate of just 3% on qualifying intellectual-property profits. Here is exactly how it works — with real numbers.',
    image: '/assets/insight-ipbox.jpg',
    imageAlt: 'Laptop with code beside brass scales of justice and a glowing orange percentage symbol — Cyprus IP Box',
    excerpt:
      'An 80% deemed deduction on qualifying intellectual-property profits brings the effective Cyprus corporate rate down to 3% — fully OECD-compliant. Here is how the regime works in practice, with real numbers.',
    readingTime: '6 min read',
    updated: 'September 2026',
    relatedService: { label: 'IP & IP Box Tax Regime', to: '/for-corporates/intellectual-property-ip-box-tax-regime' },
    blocks: [
      {
        type: 'p',
        text: 'Cyprus rewards companies that create intellectual property. Under the IP Box regime, qualifying IP profits benefit from an 80% deemed deduction — meaning only 20% of those profits are exposed to corporate tax. With the corporate rate at 15% following the 2026 tax reform, the effective rate on qualifying IP income is 3%.',
      },
      {
        type: 'p',
        text: 'This is not a loophole. The regime follows the OECD BEPS Action 5 "modified nexus approach" and is an internationally recognised framework embedded in EU law.',
      },
      { type: 'h2', text: 'The €1,000,000 example, step by step' },
      {
        type: 'p',
        text: 'Consider a Cyprus company that developed its own software platform and earns €1,000,000 of qualifying profit from it in a single tax year:',
      },
      {
        type: 'example',
        title: 'Worked example — €1,000,000 qualifying software profit',
        lines: [
          { label: 'Qualifying IP profit (nexus fraction 100%)', value: '€1,000,000' },
          { label: 'IP Box exemption — 80% deemed deduction', value: '− €800,000' },
          { label: 'Taxable portion — 20% remains', value: '€200,000' },
          { label: 'Corporate tax at 15% (2026 rate)', value: '€30,000', strong: true },
          { label: 'Effective tax rate on the full €1,000,000', value: '3%', strong: true },
        ],
        note: 'Tax saved versus the standard 15% rate: €120,000 — every single year.',
      },
      { type: 'h2', text: 'What qualifies — and what does not' },
      {
        type: 'p',
        text: 'Crucially for technology businesses, Cyprus explicitly includes copyright-protected software — unlike many patent-only regimes elsewhere in Europe.',
      },
      {
        type: 'ul',
        items: [
          'Qualifying: computer software, mobile applications, SaaS platforms and AI systems (copyright-protected)',
          'Qualifying: patents, patented inventions and utility models',
          'Qualifying income: royalties, licence fees, IP embedded in subscriptions and product sales, and disposal proceeds',
          'Not qualifying: trademarks, brand names, image rights and marketing-related IP — only the underlying technology counts',
        ],
      },
      { type: 'h2', text: 'The nexus fraction — why 3% is the best case' },
      {
        type: 'p',
        text: 'The 80% exemption applies to qualifying profit, and the qualifying amount depends on where the R&D actually happens. A company that develops its software in-house through its Cyprus entity — or outsources to unrelated third parties — can reach a nexus fraction of 100% and the full 3% effective rate. Outsourcing to related group companies, or acquiring finished IP, shrinks the fraction. Structure first, claim second.',
      },
      { type: 'h2', text: 'How Cyprus compares in 2026' },
      {
        type: 'table',
        head: ['Country', 'Effective IP rate', 'Standard corporate rate', 'Software covered?'],
        rows: [
          ['Cyprus', '3.0%', '15.0%', 'Yes — explicitly'],
          ['Belgium', '3.75%', '25.0%', 'Partially'],
          ['Luxembourg', '5.2%', '24.9%', 'Restricted'],
          ['Netherlands', '9.0%', '25.8%', 'With certificates'],
          ['United Kingdom', '10.0%', '25.0%', 'Generally excluded'],
          ['France', '10.3%', '25.0%', 'Restricted'],
        ],
      },
      { type: 'h2', text: 'Making it work in practice' },
      {
        type: 'ul',
        items: [
          'Incorporate a Cyprus company and have it own the qualifying IP',
          'Perform the R&D through that company, tracking qualifying expenditure asset-by-asset from day one',
          'Maintain real substance in Cyprus — the development activity must be genuine',
          'Consider an advance tax ruling from the Cyprus Tax Department for certainty',
          'Combine with non-dom status for shareholders — qualifying dividends can attract 0% Special Defence Contribution',
        ],
      },
      {
        type: 'callout',
        text: 'The benefit lives or dies on structure, substance and documentation. Get all three right before the first euro of revenue arrives — that is exactly what our tax and IP team designs, implements and maintains for clients.',
      },
    ],
    ru: {
      tag: 'Налоги — ИС',
      title: 'IP Box на Кипре: эффективная ставка 3% на прибыль от интеллектуальной собственности',
      accentWords: ['3%'],
      lead: 'Если ваша компания разрабатывает программное обеспечение, Кипр предлагает то, чего почти нет ни в одной другой стране ЕС: эффективную налоговую ставку всего 3% на квалифицируемую прибыль от интеллектуальной собственности. Разбираем, как это работает — с реальными цифрами.',
      excerpt:
        '80% условного вычета из квалифицируемой прибыли от интеллектуальной собственности снижает эффективную корпоративную ставку на Кипре до 3% — в полном соответствии с ОЭСР. Как режим работает на практике, с реальными цифрами.',
      readingTime: '6 мин чтения',
      updated: 'Сентябрь 2026',
      blocks: [
        {
          type: 'p',
          text: 'Кипр поощряет компании, создающие интеллектуальную собственность. В рамках режима IP Box квалифицируемая прибыль от ИС получает условный вычет 80% — то есть корпоративным налогом облагается лишь 20% такой прибыли. При корпоративной ставке 15% после налоговой реформы 2026 года эффективная ставка на квалифицируемый доход от ИС составляет 3%.',
        },
        {
          type: 'p',
          text: 'Это не лазейка. Режим соответствует «модифицированному подходу нексус» ОЭСР (BEPS, Действие 5) и представляет собой международно признанную модель, закреплённую в праве ЕС.',
        },
        { type: 'h2', text: 'Пример на €1 000 000 — шаг за шагом' },
        {
          type: 'p',
          text: 'Рассмотрим кипрскую компанию, которая разработала собственную программную платформу и получила от неё €1 000 000 квалифицируемой прибыли за один налоговый год:',
        },
        {
          type: 'example',
          title: 'Считаем вместе — €1 000 000 квалифицируемой прибыли от ПО',
          lines: [
            { label: 'Квалифицируемая прибыль от ИС (доля нексус 100%)', value: '€1 000 000' },
            { label: 'Освобождение IP Box — условный вычет 80%', value: '− €800 000' },
            { label: 'Налогооблагаемая часть — остаётся 20%', value: '€200 000' },
            { label: 'Корпоративный налог 15% (ставка 2026 года)', value: '€30 000', strong: true },
            { label: 'Эффективная ставка на весь €1 000 000', value: '3%', strong: true },
          ],
          note: 'Экономия по сравнению со стандартной ставкой 15%: €120 000 — каждый год.',
        },
        { type: 'h2', text: 'Что подходит — а что нет' },
        {
          type: 'p',
          text: 'Принципиально важно для технологического бизнеса: Кипр прямо включает программное обеспечение, защищённое авторским правом, — в отличие от многих европейских режимов, ограниченных только патентами.',
        },
        {
          type: 'ul',
          items: [
            'Подходит: программное обеспечение, мобильные приложения, SaaS-платформы и ИИ-системы (защищённые авторским правом)',
            'Подходит: патенты, запатентованные изобретения и полезные модели',
            'Подходящий доход: роялти, лицензионные платежи, ИС, встроенная в подписки и продажи продуктов, а также доход от отчуждения',
            'Не подходит: товарные знаки, бренды, права на имидж и маркетинговая ИС — учитывается только базовая технология',
          ],
        },
        { type: 'h2', text: 'Доля нексус — почему 3% это лучший сценарий' },
        {
          type: 'p',
          text: 'Освобождение 80% применяется к квалифицируемой прибыли, а её размер зависит от того, где фактически ведутся НИОКР. Компания, разрабатывающая ПО собственными силами через кипрское юрлицо — или отдающая работы несвязанным подрядчикам, — может достичь доли нексус 100% и полной эффективной ставки 3%. Аутсорсинг связанным компаниям группы или покупка готовой ИС уменьшают долю. Сначала структура — потом вычет.',
        },
        { type: 'h2', text: 'Как Кипр выглядит на фоне других стран в 2026 году' },
        {
          type: 'table',
          head: ['Страна', 'Эффективная ставка для ИС', 'Стандартная корпоративная ставка', 'ПО включено?'],
          rows: [
            ['Кипр', '3.0%', '15.0%', 'Да — прямо'],
            ['Бельгия', '3.75%', '25.0%', 'Частично'],
            ['Люксембург', '5.2%', '24.9%', 'Ограниченно'],
            ['Нидерланды', '9.0%', '25.8%', 'С сертификатами'],
            ['Великобритания', '10.0%', '25.0%', 'Как правило, нет'],
            ['Франция', '10.3%', '25.0%', 'Ограниченно'],
          ],
        },
        { type: 'h2', text: 'Как это работает на практике' },
        {
          type: 'ul',
          items: [
            'Зарегистрируйте кипрскую компанию и передайте ей права на квалифицируемую ИС',
            'Ведите НИОКР через эту компанию, отслеживая квалифицируемые расходы по каждому активу с первого дня',
            'Обеспечьте реальное присутствие (substance) на Кипре — разработка должна быть подлинной',
            'Рассмотрите предварительное налоговое решение (advance tax ruling) Налогового департамента Кипра для определённости',
            'Комбинируйте со статусом non-dom для акционеров — квалифицируемые дивиденды могут облагаться 0% взноса на специальную оборону',
          ],
        },
        {
          type: 'callout',
          text: 'Выгода стоит на трёх китах: структура, реальное присутствие и документация. Всё три нужно выстроить до поступления первого евро выручки — именно это наша налоговая и IP-команда проектирует, внедряет и сопровождает для клиентов.',
        },
      ],
    },
  },
  {
    slug: 'cyprus-60-day-rule',
    tag: 'Residency — Tax',
    title: 'The Cyprus 60-day rule, explained properly',
    accentWords: ['60-day'],
    lead: 'Every year, thousands of entrepreneurs, investors and remote professionals ask the same question: how can I become tax resident in Cyprus without living here all year? The 60-day rule is the answer — but only if every condition is handled precisely.',
    image: '/assets/insight-60day.jpg',
    imageAlt: 'Desk calendar with one date circled in glowing orange at a Mediterranean sunset — Cyprus 60-day rule',
    excerpt:
      'Cyprus tax residency in as little as 60 days a year — the gateway to non-dom status and 0% tax on dividends for up to 17 years. Four cumulative conditions decide everything. Here is how to get them right.',
    readingTime: '5 min read',
    updated: 'September 2026',
    relatedService: { label: 'Immigration & Residency', to: '/for-private-clients/immigration-residency' },
    blocks: [
      {
        type: 'p',
        text: 'Cyprus offers two routes to tax residency. The 183-day rule is automatic: spend more than 183 days in Cyprus in a calendar year and you are resident. The 60-day rule, introduced in 2017, was built for internationally mobile people — founders, consultants, investors and remote professionals — who have genuine Cyprus ties but travel too much to spend half the year anywhere.',
      },
      { type: 'h2', text: 'The four cumulative conditions' },
      {
        type: 'p',
        text: 'Every one of these must be met within the same tax year — they are cumulative, not alternatives:',
      },
      {
        type: 'ul',
        items: [
          'Spend at least 60 days in Cyprus during the tax year',
          'Do not spend more than 183 days in any other single country',
          'Carry on a business in Cyprus, be employed in Cyprus, or hold office in a Cyprus tax-resident company',
          'Maintain a permanent home in Cyprus — owned or rented — available to you throughout the year',
        ],
      },
      { type: 'h2', text: 'What changed in 2026' },
      {
        type: 'p',
        text: 'The tax reform effective 1 January 2026 removed the former condition that a 60-day claimant could not be tax resident anywhere else in the same year. That makes the framework significantly more accessible: if dual residency arises, it is resolved through the tie-breaker rules of the applicable double tax treaty.',
      },
      { type: 'h2', text: 'How the days are counted' },
      {
        type: 'p',
        text: 'Day counting is where most claims fail. The day you arrive in Cyprus counts as a day in Cyprus; the day you depart counts as a day outside; arriving and departing the same day counts as one day in Cyprus. Keep boarding passes, flight confirmations and travel records — the Tax Department may ask for proof of presence.',
      },
      { type: 'h2', text: 'Why it matters — non-dom status' },
      {
        type: 'p',
        text: 'Cyprus tax residency is the gateway to non-domiciled status, under which qualifying individuals pay 0% Special Defence Contribution on dividends and interest for up to 17 years. Combined with an extensive double tax treaty network, no inheritance tax and no wealth tax, the regime is among the most attractive in the EU — but only if every condition is handled precisely.',
      },
      { type: 'h2', text: 'The mistakes we see most often' },
      {
        type: 'ul',
        items: [
          'Counting only the 60 days and forgetting the other cumulative conditions',
          'Letting the tenancy lapse mid-year',
          'Ending Cyprus employment or a directorship before 31 December',
          'Spending more than 183 days in another single country',
          'Relocating late in the year without checking whether 60 days can still be reached',
        ],
      },
      {
        type: 'callout',
        text: 'The 60-day rule rewards precision and punishes assumptions. Our migration and tax teams verify your day count, secure the right Cyprus ties and home arrangement, and manage the residency and non-dom applications end to end.',
      },
    ],
    ru: {
      tag: 'Резидентство — Налоги',
      title: 'Правило 60 дней на Кипре: полное и честное объяснение',
      accentWords: ['60 дней'],
      lead: 'Каждый год тысячи предпринимателей, инвесторов и удалённых специалистов задают один и тот же вопрос: как стать налоговым резидентом Кипра, не живя здесь круглый год? Ответ — правило 60 дней. Но только если каждое условие выполнено безупречно точно.',
      excerpt:
        'Налоговое резидентство Кипра всего за 60 дней в году — ворота к статусу non-dom и ставке 0% на дивиденды на срок до 17 лет. Всё решают четыре кумулятивных условия. Рассказываем, как выполнить их правильно.',
      readingTime: '5 мин чтения',
      updated: 'Сентябрь 2026',
      blocks: [
        {
          type: 'p',
          text: 'Кипр предлагает два пути к налоговому резидентству. Правило 183 дней работает автоматически: проведите на Кипре более 183 дней в календарном году — и вы резидент. Правило 60 дней, введённое в 2017 году, создано для мобильных людей — основателей, консультантов, инвесторов и удалённых специалистов, — у которых есть реальные связи с Кипром, но кто слишком много путешествует, чтобы проводить полгода в одном месте.',
        },
        { type: 'h2', text: 'Четыре кумулятивных условия' },
        {
          type: 'p',
          text: 'Каждое из этих условий должно быть выполнено в рамках одного налогового года — они кумулятивны, а не альтернативны:',
        },
        {
          type: 'ul',
          items: [
            'Провести на Кипре не менее 60 дней в течение налогового года',
            'Не проводить более 183 дней в любой другой отдельной стране',
            'Вести бизнес на Кипре, быть трудоустроенным на Кипре или занимать должность в компании — налоговом резиденте Кипра',
            'Иметь постоянное жильё на Кипре — собственное или арендованное, — доступное вам в течение всего года',
          ],
        },
        { type: 'h2', text: 'Что изменилось в 2026 году' },
        {
          type: 'p',
          text: 'Налоговая реформа, вступившая в силу 1 января 2026 года, отменила прежнее условие, по которому заявитель по правилу 60 дней не мог быть налоговым резидентом другой страны в том же году. Режим стал значительно доступнее: при возникновении двойного резидентства вопрос решается через tie-breaker правила соответствующего соглашения об избежании двойного налогообложения.',
        },
        { type: 'h2', text: 'Как считаются дни' },
        {
          type: 'p',
          text: 'Именно на подсчёте дней ломается большинство заявлений. День прибытия на Кипр считается днём на Кипре; день отъезда — днём за пределами Кипра; прибытие и отъезд в один день считаются одним днём на Кипре. Сохраняйте посадочные талоны, подтверждения рейсов и историю поездок — Налоговый департамент может запросить доказательства присутствия.',
        },
        { type: 'h2', text: 'Почему это важно — статус non-dom' },
        {
          type: 'p',
          text: 'Налоговое резидентство Кипра — ворота к статусу non-dom (недомицилированного лица), при котором квалифицируемые лица платят 0% взноса на специальную оборону (SDC) с дивидендов и процентов на срок до 17 лет. В сочетании с развитой сетью соглашений об избежании двойного налогообложения, отсутствием налога на наследство и налога на богатство этот режим — один из самых привлекательных в ЕС. Но только если каждое условие выполнено безупречно точно.',
        },
        { type: 'h2', text: 'Ошибки, которые мы видим чаще всего' },
        {
          type: 'ul',
          items: [
            'Считать только 60 дней и забывать про остальные кумулятивные условия',
            'Позволить аренде жилья прерваться в середине года',
            'Завершить трудоустройство на Кипре или директорство до 31 декабря',
            'Провести более 183 дней в другой отдельной стране',
            'Переехать в конце года, не проверив, успеете ли набрать 60 дней',
          ],
        },
        {
          type: 'callout',
          text: 'Правило 60 дней вознаграждает точность и наказывает за предположения. Наши миграционная и налоговая команды проверяют ваш подсчёт дней, обеспечивают правильные связи с Кипром и жилищное решение, а также ведут заявления на резидентство и статус non-dom под ключ.',
        },
      ],
    },
  },
];

export function getInsight(slug: string | undefined): Insight | undefined {
  return INSIGHTS.find((a) => a.slug === slug);
}
