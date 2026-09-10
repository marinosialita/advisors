/**
 * Shared site data — facts come ONLY from the research inventory
 * (design.md §10 content accuracy rules). Page agents: reuse, don't duplicate.
 */

export interface NavItem {
  label: string;
  path: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: 'Who We Are', path: '/who-we-are' },
  { label: 'What We Do', path: '/what-we-do' },
  { label: 'For Corporates', path: '/for-corporates' },
  { label: 'For Private Clients', path: '/for-private-clients' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

/** Mono page labels for the curtain transition / menu numbering */
export const PAGE_LABELS: Record<string, string> = {
  '/': '00 — HOME',
  '/who-we-are': '01 — WHO WE ARE',
  '/what-we-do': '02 — WHAT WE DO',
  '/for-corporates': '03 — FOR CORPORATES',
  '/for-private-clients': '04 — FOR PRIVATE CLIENTS',
  '/careers': '05 — CAREERS',
  '/contact': '06 — CONTACT',
  '/privacy-policy': '07 — PRIVACY POLICY',
};

export interface TeamMember {
  name: string;
  role: string;
  /** Russian role (used on /ru/who-we-are) */
  roleRu?: string;
  image: string;
  /** anchor id on /who-we-are#team */
  slug: string;
}

export const TEAM: TeamMember[] = [
  {
    name: 'Iryna Protas',
    role: 'Managing Partner, Co-Founder',
    roleRu: 'Управляющий партнёр, сооснователь',
    image: '/assets/team/iryna.jpg',
    slug: 'iryna-protas',
  },
  {
    name: 'Olga Demidova',
    role: 'Head of Strategy & HR Solutions, Co-Founder',
    roleRu: 'Руководитель стратегии и HR-решений, сооснователь',
    image: '/assets/team/olga.jpg',
    slug: 'olga-demidova',
  },
  {
    name: 'Vasoulla Papaleontiou',
    role: 'Head of Legal & Corporate Practice',
    roleRu: 'Руководитель юридической и корпоративной практики',
    image: '/assets/team/vasoula.jpg',
    slug: 'vasoulla-papaleontiou',
  },
  {
    name: 'Antria Demetriou',
    role: 'Legal Advocate',
    roleRu: 'Юрист-адвокат',
    image: '/assets/team/antria.jpg',
    slug: 'antria-demetriou',
  },
  {
    name: 'Evangelos Stavrou',
    role: 'Head of Finance & Accounting Practice',
    roleRu: 'Руководитель финансовой и бухгалтерской практики',
    image: '/assets/team/evangelos.jpg',
    slug: 'evangelos-stavrou',
  },
  {
    name: 'Anna Honcharenko',
    role: 'Head of Migration & Concierge Practice',
    roleRu: 'Руководитель миграционной и консьерж-практики',
    image: '/assets/team/anna.jpg',
    slug: 'anna-honcharenko',
  },
  {
    name: 'Charalambos Konstantinidis',
    role: 'Associated Partner, Migration Practice',
    roleRu: 'Ассоциированный партнёр, миграционная практика',
    image: '/assets/team/charalambos.jpg',
    slug: 'charalambos-konstantinidis',
  },
];

export const CONTACT = {
  address: '28 Oktovriou, 317A, Block B, Kanika Business Center, Office 101, Limassol, 3105, Cyprus',
  phone: '+357 25005284',
  phoneHref: 'tel:+35725005284',
  email: 'team@sc-advisors.cy',
  emailHref: 'mailto:team@sc-advisors.cy',
  telegram: 't.me/oidemidova',
  telegramHref: 'https://t.me/oidemidova',
};

export const LEGAL = {
  entity: 'IP S&C Smart & Compliant Advisors Ltd',
  reg: 'HE 432457',
  regulator: 'CySEC',
};
