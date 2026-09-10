/**
 * Service catalogue — names and descriptions come ONLY from the page design
 * files (for-corporates.md §S2, for-private-clients.md §S2). Slugs double as
 * anchor ids on the detail pages so rows can deep-link.
 */

export interface ServiceItem {
  /** kebab-case anchor id, e.g. /for-corporates#banking */
  slug: string;
  title: string;
  description: string;
  /** Russian title (locale === 'ru'), falls back to `title` */
  titleRu?: string;
  /** Russian description (locale === 'ru'), falls back to `description` */
  descriptionRu?: string;
  /** featured detail section on the detail page, if any */
  featured?: 'banking' | 'legal' | 'concierge' | 'multifamily-office';
}

export const CORPORATE_SERVICES: ServiceItem[] = [
  {
    slug: 'accounting-bookkeeping',
    title: 'Accounting & Bookkeeping',
    description:
      'Accurate, compliant day-to-day accounting and bookkeeping that keeps your corporate records audit-ready.',
    titleRu: 'Бухгалтерия и учёт',
    descriptionRu:
      'Точный и соответствующий требованиям ежедневный учёт и ведение бухгалтерии, благодаря которым корпоративная документация всегда готова к аудиту.',
  },
  {
    slug: 'banking',
    title: 'Banking',
    description:
      'End-to-end banking support, from bank selection to account structuring and ongoing coordination.',
    titleRu: 'Банковское сопровождение',
    descriptionRu:
      'Полное банковское сопровождение — от выбора банка до структурирования счетов и постоянной координации.',
    featured: 'banking',
  },
  {
    slug: 'corporate-governance',
    title: 'Corporate Governance',
    description:
      'Governance frameworks, board support and statutory compliance that keep your company in good standing.',
    titleRu: 'Корпоративное управление',
    descriptionRu:
      'Модели корпоративного управления, поддержка совета директоров и соблюдение обязательных требований для безупречного статуса вашей компании.',
  },
  {
    slug: 'corporate-and-legal',
    title: 'Corporate and Legal',
    description:
      'Combined corporate administration and legal support across the full company lifecycle.',
    titleRu: 'Корпоративное и правовое сопровождение',
    descriptionRu:
      'Комплексное корпоративное администрирование и юридическая поддержка на всех этапах жизненного цикла компании.',
  },
  {
    slug: 'fiduciary',
    title: 'Fiduciary',
    description:
      'Professional fiduciary services delivered with discretion, diligence and long-term thinking.',
    titleRu: 'Фидуциарные услуги',
    descriptionRu:
      'Профессиональные фидуциарные услуги, оказываемые с осмотрительностью, добросовестностью и ориентацией на долгосрочный результат.',
  },
  {
    slug: 'fund-administration',
    title: 'Fund Administration',
    description:
      'Reliable fund administration backed by licensed expertise and deep industry knowledge.',
    titleRu: 'Администрирование фондов',
    descriptionRu:
      'Надёжное администрирование фондов, подкреплённое лицензированной экспертизой и глубоким знанием отрасли.',
  },
  {
    slug: 'hr',
    title: 'HR',
    description:
      'Human-resources support for companies establishing or scaling teams in Cyprus and abroad.',
    titleRu: 'HR и персонал',
    descriptionRu:
      'Кадровая поддержка компаний, создающих или масштабирующих команды на Кипре и за рубежом.',
  },
  {
    slug: 'intellectual-property-ip-box-tax-regime',
    title: 'Intellectual Property & IP Box Tax Regime',
    description:
      'IP structuring and Cyprus IP Box tax-regime advisory to protect and optimise intangible assets.',
    titleRu: 'ИС и налоговый режим IP Box',
    descriptionRu:
      'Структурирование интеллектуальной собственности и консультирование по кипрскому налоговому режиму IP Box для защиты и оптимизации нематериальных активов.',
  },
  {
    slug: 'legal',
    title: 'Legal',
    description:
      'Full-spectrum legal advisory, with dedicated depth in IT and technology.',
    titleRu: 'Юридические услуги',
    descriptionRu:
      'Юридическое консультирование по всему спектру вопросов с особой глубиной экспертизы в сфере IT и технологий.',
    featured: 'legal',
  },
  {
    slug: 'licensing-authorization',
    title: 'Licensing & Authorization',
    description:
      'Guidance through licensing and authorisation processes with the competent regulators.',
    titleRu: 'Лицензирование и разрешения',
    descriptionRu:
      'Сопровождение процедур лицензирования и получения разрешений во взаимодействии с компетентными регуляторами.',
  },
  {
    slug: 'mergers-acquisitions',
    title: 'Mergers & Acquisitions',
    description:
      'Advisory through M&A transactions, from structuring to completion.',
    titleRu: 'Слияния и поглощения',
    descriptionRu:
      'Консультирование по сделкам слияний и поглощений — от структурирования до закрытия.',
  },
  {
    slug: 'redomiciliation',
    title: 'Redomiciliation',
    description:
      'Seamless relocation of existing companies to Cyprus or other jurisdictions.',
    titleRu: 'Редомициляция',
    descriptionRu:
      'Беспрепятственный перенос действующих компаний на Кипр или в другие юрисдикции.',
  },
  {
    slug: 'tax-vat-advisory',
    title: 'Tax & VAT Advisory',
    description:
      'Practical tax and VAT advisory aligned with Cypriot and international frameworks.',
    titleRu: 'Налоги и НДС',
    descriptionRu:
      'Практическое консультирование по налогам и НДС в соответствии с кипрским и международным законодательством.',
  },
  {
    slug: 'trust-services',
    title: 'Trust Services',
    description:
      'Trust formation and administration for asset protection and succession.',
    titleRu: 'Трастовые услуги',
    descriptionRu:
      'Учреждение и администрирование трастов для защиты активов и наследственного планирования.',
  },
];

export const PRIVATE_SERVICES: ServiceItem[] = [
  {
    slug: 'accounting-bookkeeping',
    title: 'Accounting & Bookkeeping',
    description:
      'Meticulous personal and family-office accounting and record-keeping.',
    titleRu: 'Бухгалтерия и учёт',
    descriptionRu:
      'Тщательный учёт и ведение документации для частных лиц и семейных офисов.',
  },
  {
    slug: 'banking',
    title: 'Banking',
    description:
      'Private banking selection, account opening and ongoing coordination.',
    titleRu: 'Банковское сопровождение',
    descriptionRu:
      'Выбор частного банка, открытие счетов и постоянная координация.',
  },
  {
    slug: 'comprehensive-real-estate-solutions',
    title: 'Comprehensive Real Estate Solutions',
    description:
      'End-to-end support across the property lifecycle.',
    titleRu: 'Комплексные решения в недвижимости',
    descriptionRu:
      'Комплексная поддержка на всех этапах жизненного цикла недвижимости.',
  },
  {
    slug: 'concierge-services',
    title: 'Concierge Services',
    description:
      'Luxury lifestyle management with absolute discretion.',
    titleRu: 'Консьерж-сервис',
    descriptionRu:
      'Управление стилем жизни премиум-класса с абсолютной конфиденциальностью.',
    featured: 'concierge',
  },
  {
    slug: 'immigration-residency',
    title: 'Immigration & Residency',
    description:
      'Visas, permanent residency and citizenship pathways, managed end to end.',
    titleRu: 'Иммиграция и резидентство',
    descriptionRu:
      'Визы, постоянное резидентство и пути к гражданству — сопровождение под ключ на каждом этапе.',
  },
  {
    slug: 'intellectual-property-ip-box',
    title: 'Intellectual Property & IP Box',
    description:
      'Personal IP structuring and Cyprus IP Box regime advisory.',
    titleRu: 'Интеллектуальная собственность и IP Box',
    descriptionRu:
      'Структурирование личной интеллектуальной собственности и консультирование по кипрскому режиму IP Box.',
  },
  {
    slug: 'legal',
    title: 'Legal',
    description:
      'Private legal advisory across personal, property and family matters.',
    titleRu: 'Юридические услуги',
    descriptionRu:
      'Частное юридическое консультирование по личным, имущественным и семейным вопросам.',
  },
  {
    slug: 'multifamily-office',
    title: 'Multifamily Office',
    description:
      'Coordinated stewardship of family wealth across generations.',
    titleRu: 'Мультисемейный офис',
    descriptionRu:
      'Скоординированное управление семейным капиталом на протяжении поколений.',
    featured: 'multifamily-office',
  },
  {
    slug: 'real-estate-transaction-investment',
    title: 'Real Estate Transaction & Investment',
    description:
      'Acquisition across Europe and international markets.',
    titleRu: 'Сделки и инвестиции в недвижимость',
    descriptionRu:
      'Приобретение недвижимости в Европе и на международных рынках.',
  },
  {
    slug: 'tax-advisory',
    title: 'Tax Advisory',
    description:
      'Personal tax residency and planning within compliant frameworks.',
    titleRu: 'Налоговое консультирование',
    descriptionRu:
      'Личное налоговое резидентство и планирование в рамках действующего законодательства.',
  },
];

export const CORPORATE_DETAIL_PATH = '/for-corporates';
export const PRIVATE_DETAIL_PATH = '/for-private-clients';
