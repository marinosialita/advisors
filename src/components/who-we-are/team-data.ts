/**
 * Team biographies & credentials for the /who-we-are profile drawers.
 * Facts come ONLY from design/who-we-are.md §S5. Names, roles, portraits
 * and slugs live in @/data/site (TEAM) — keyed here by slug.
 */
export interface TeamBio {
  slug: string;
  /** 2-line card teaser derived from the biography */
  teaser: string;
  /** Full biography paragraphs for the drawer */
  bio: string[];
  /** Mono credential list for the drawer */
  credentials: string[];
  /** Russian translations */
  teaserRu?: string;
  bioRu?: string[];
  credentialsRu?: string[];
}

export const TEAM_BIOS: TeamBio[] = [
  {
    slug: 'iryna-protas',
    teaser:
      'Leads fiduciary & corporate services and legal consulting to Cypriot companies.',
    bio: [
      'Iryna brings more than 10 years of experience in financial and legal advisory within corporate management.',
      'She leads fiduciary & corporate services and legal consulting to Cypriot companies.',
    ],
    credentials: [
      'Certified AML expert',
      'Advanced certificates — CySEC & Cyprus Ministry of Finance',
      'Member — CISI & ICA',
    ],
    teaserRu:
      'Руководит фидуциарными и корпоративными услугами и юридическим консультированием кипрских компаний.',
    bioRu: [
      'Ирина имеет более 10 лет опыта в финансовом и юридическом консультировании в сфере корпоративного управления.',
      'Руководит фидуциарными и корпоративными услугами и юридическим консультированием кипрских компаний.',
    ],
    credentialsRu: [
      'Сертифицированный эксперт по AML',
      'Продвинутые сертификаты — CySEC и Министерство финансов Кипра',
      'Член — CISI и ICA',
    ],
  },
  {
    slug: 'olga-demidova',
    teaser:
      'International headhunter building leadership teams — recruiting CEOs and C-level executives.',
    bio: [
      'Olga brings more than 20 years of experience across law, executive search and HR strategy.',
      'An international headhunter, she builds leadership teams — recruiting CEOs and C-level executives across legal, compliance, GR, M&A and investment.',
      'She is responsible for strategy, business development and HR solutions.',
    ],
    credentials: [
      '20+ years — law, executive search & HR strategy',
      'CEO & C-level recruitment — legal, compliance, GR, M&A, investment',
      'Strategy, business development & HR solutions',
    ],
    teaserRu:
      'Международный хедхантер, формирует команды топ-менеджмента — подбор CEO и руководителей C-level.',
    bioRu: [
      'Ольга имеет более 20 лет опыта в юриспруденции, executive search и HR-стратегии.',
      'Как международный хедхантер, она формирует команды топ-менеджмента — подбирает CEO и руководителей C-level в сферах legal, compliance, GR, M&A и инвестиций.',
      'Отвечает за стратегию, развитие бизнеса и HR-решения.',
    ],
    credentialsRu: [
      '20+ лет — юриспруденция, executive search и HR-стратегия',
      'Подбор CEO и C-level — legal, compliance, GR, M&A, инвестиции',
      'Стратегия, развитие бизнеса и HR-решения',
    ],
  },
  {
    slug: 'vasoulla-papaleontiou',
    teaser:
      'Advises on corporate administration, fiduciary services, IP structuring and trusts.',
    bio: [
      'Vasoulla holds a Bachelor\u2019s in Business Law and an LL.M. in Commercial Law.',
      'She brings more than 20 years in corporate administration, fiduciary services, complex legal advisory, IP structuring and trusts.',
    ],
    credentials: [
      'Bachelor\u2019s in Business Law',
      'LL.M. Commercial Law',
      '20+ years — corporate administration & fiduciary services',
      'Complex legal advisory, IP structuring & trusts',
    ],
    teaserRu:
      'Консультирует по корпоративному администрированию, фидуциарным услугам, структурированию ИС и трастам.',
    bioRu: [
      'Васула имеет степень бакалавра бизнес-права и степень LL.M. в области коммерческого права.',
      'Более 20 лет опыта в корпоративном администрировании, фидуциарных услугах, сложном юридическом консультировании, структурировании интеллектуальной собственности и трастах.',
    ],
    credentialsRu: [
      'Бакалавр бизнес-права',
      'LL.M. — коммерческое право',
      '20+ лет — корпоративное администрирование и фидуциарные услуги',
      'Сложное юридическое консультирование, структурирование ИС и трасты',
    ],
  },
  {
    slug: 'antria-demetriou',
    teaser:
      'Legal advocate supporting corporate and private clients across Cyprus.',
    bio: [
      'Antria is a legal advocate with 5 years of experience advising on legal matters in Cyprus.',
      'She supports the firm’s corporate and private clients across a broad range of legal work.',
    ],
    credentials: [
      'Legal Advocate',
      '5 years of legal experience',
    ],
    teaserRu:
      'Юрист-адвокат, сопровождающий корпоративных и частных клиентов на Кипре.',
    bioRu: [
      'Антрия — юрист-адвокат с 5-летним опытом правового консультирования на Кипре.',
      'Сопровождает корпоративных и частных клиентов фирмы по широкому кругу юридических вопросов.',
    ],
    credentialsRu: [
      'Юрист-адвокат',
      '5 лет юридического опыта',
    ],
  },
  {
    slug: 'evangelos-stavrou',
    teaser:
      'Leads financial reporting, budgeting, auditing and tax planning across jurisdictions.',
    bio: [
      'Evangelos holds a Bachelor\u2019s in Economics.',
      'He brings more than 18 years in accounting and financial management across international jurisdictions — financial reporting, budgeting, auditing, tax planning, IFRS and local compliance.',
    ],
    credentials: [
      'Bachelor\u2019s in Economics',
      '18+ years — accounting & financial management',
      'Financial reporting, budgeting & auditing',
      'Tax planning, IFRS & local compliance',
    ],
    teaserRu:
      'Руководит финансовой отчётностью, бюджетированием, аудитом и налоговым планированием в разных юрисдикциях.',
    bioRu: [
      'Евангелос имеет степень бакалавра экономики.',
      'Более 18 лет опыта в бухгалтерском учёте и финансовом управлении в международных юрисдикциях — финансовая отчётность, бюджетирование, аудит, налоговое планирование, МСФО и локальное соответствие.',
    ],
    credentialsRu: [
      'Бакалавр экономики',
      '18+ лет — бухгалтерский учёт и финансовое управление',
      'Финансовая отчётность, бюджетирование и аудит',
      'Налоговое планирование, МСФО и локальное соответствие',
    ],
  },
  {
    slug: 'anna-honcharenko',
    teaser:
      'Oversees immigration and relocation, VIP concierge, bank accounts and tax residency.',
    bio: [
      'Anna holds a Bachelor\u2019s in Economics. She brings more than 4 years in migration & concierge services and over 10 years in business development and sales.',
      'She oversees immigration and relocation — visas, permanent residency and citizenship — as well as VIP concierge, bank accounts and tax residency.',
    ],
    credentials: [
      'Bachelor\u2019s in Economics',
      '4+ years — migration & concierge services',
      '10+ years — business development & sales',
      'Visas, permanent residency & citizenship',
    ],
    teaserRu:
      'Курирует иммиграцию и релокацию, VIP-консьерж, банковские счета и налоговое резидентство.',
    bioRu: [
      'Анна имеет степень бакалавра экономики. Более 4 лет опыта в миграционных и консьерж-услугах и более 10 лет в развитии бизнеса и продажах.',
      'Курирует иммиграцию и релокацию — визы, постоянное резидентство и гражданство, — а также VIP-консьерж, банковские счета и налоговое резидентство.',
    ],
    credentialsRu: [
      'Бакалавр экономики',
      '4+ года — миграционные и консьерж-услуги',
      '10+ лет — развитие бизнеса и продажи',
      'Визы, постоянное резидентство и гражданство',
    ],
  },
  {
    slug: 'charalambos-konstantinidis',
    teaser:
      'Consults on residence and work permits, family reunification and third-country nationals.',
    bio: [
      'Charalambos holds a BSc in Computer Science and an MSc in Information Security Management from the University of Salford.',
      'He brings more than 10 years in migration consulting and information security — residence and work permits, family reunification and third-country nationals.',
    ],
    credentials: [
      'BSc Computer Science',
      'MSc Information Security Management — University of Salford',
      '10+ years — migration consulting & information security',
      'Residence & work permits, family reunification, third-country nationals',
    ],
    teaserRu:
      'Консультирует по видам на жительство и разрешениям на работу, воссоединению семьи и гражданам третьих стран.',
    bioRu: [
      'Хараламбос имеет степень BSc в области компьютерных наук и MSc в управлении информационной безопасностью Университета Солфорда.',
      'Более 10 лет опыта в миграционном консультировании и информационной безопасности — виды на жительство и разрешения на работу, воссоединение семьи, граждане третьих стран.',
    ],
    credentialsRu: [
      'BSc — компьютерные науки',
      'MSc — управление информационной безопасностью, Университет Солфорда',
      '10+ лет — миграционное консультирование и информационная безопасность',
      'ВНЖ и разрешения на работу, воссоединение семьи, граждане третьих стран',
    ],
  },
];

export function teamBioFor(slug: string): TeamBio | undefined {
  return TEAM_BIOS.find((b) => b.slug === slug);
}
