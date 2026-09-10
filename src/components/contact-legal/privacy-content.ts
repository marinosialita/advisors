/**
 * Privacy policy content — verbatim from the source text of
 * sc-advisors.com.cy/privacy-policy (privacy-source-text.txt).
 * Semicolon-joined enumerations are presented as lists with identical wording.
 */

export type PolicyBlock = { t: 'p'; s: string } | { t: 'list'; items: string[] };

export interface PolicySection {
  id: string;
  title: string;
  blocks: PolicyBlock[];
}

export const POLICY_SECTIONS: PolicySection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    blocks: [
      {
        t: 'p',
        s: 'IP S&C SMART & COMPLIANT ADVISORS LTD ("SC Advisors", "Company", "we", "our" or "us") is committed to protecting the privacy, confidentiality and security of personal data entrusted to us.',
      },
      {
        t: 'p',
        s: 'This Privacy Policy explains how we collect, use, disclose, store, transfer and otherwise process personal data in connection with our professional services, business activities, website and regulatory obligations.',
      },
      { t: 'p', s: 'This Policy is issued in accordance with:' },
      {
        t: 'list',
        items: [
          'Regulation (EU) 2016/679 (General Data Protection Regulation – "GDPR")',
          'The Protection of Natural Persons Against the Processing of Personal Data and the Free Movement of Such Data Law of 2018 (Law 125(I)/2018), as amended',
          'The Prevention and Suppression of Money Laundering and Terrorist Financing Laws of Cyprus, as amended',
          'Any other applicable legal and regulatory requirements',
        ],
      },
      {
        t: 'p',
        s: 'By providing personal data to us or using our services or website, you acknowledge that your personal data may be processed in accordance with this Privacy Policy.',
      },
    ],
  },
  {
    id: 'data-controller',
    title: 'Identity of the Data Controller',
    blocks: [
      {
        t: 'p',
        s: 'The Data Controller responsible for the processing of personal data described in this Privacy Policy is:',
      },
      {
        t: 'p',
        s: "IP S&C SMART & COMPLIANT ADVISORS LTD, an administrative service provider's limited liability company registered in the Republic of Cyprus with registration number HE 432457.",
      },
      {
        t: 'p',
        s: 'Contact Details: Email: team@sc-advisors.cy — Postal Address: Kanika Business Center, 28th October Avenue 317A Block B, 1st Floor, Office 101, 3105 Limassol, Cyprus — Telephone: +357 25 005284',
      },
    ],
  },
  {
    id: 'data-protection-officer',
    title: 'Data Protection Officer',
    blocks: [
      { t: 'p', s: 'The Company has appointed a Data Protection Officer ("DPO").' },
      {
        t: 'p',
        s: 'Name: Despina Glyki — Email: compliance@sc-advisors.cy — Telephone: +357 25 005284',
      },
      {
        t: 'p',
        s: 'Postal Address: Kanika Business Center, 28th October Avenue 317A Block B, 1st Floor, Office 101, 3105 Limassol, Cyprus',
      },
      {
        t: 'p',
        s: 'The DPO may be contacted regarding all matters relating to the processing of personal data and the exercise of rights under applicable data protection legislation.',
      },
    ],
  },
  {
    id: 'personal-data-we-collect',
    title: 'Personal Data We Collect',
    blocks: [
      {
        t: 'p',
        s: 'Depending on the nature of our relationship with you, we may collect and process the following categories of personal data:',
      },
      {
        t: 'list',
        items: [
          'Identification and verification information',
          'Contact details',
          'Corporate and beneficial ownership information',
          'Financial information',
          'Source of wealth and source of funds information',
          'Customer due diligence and enhanced due diligence documentation',
          'Sanctions, politically exposed person (PEP) and adverse media screening information',
          'Professional and business information',
          'Correspondence and communications',
          'Website and technical information',
          'Any other information required for the provision of our services or compliance with legal obligations',
        ],
      },
    ],
  },
  {
    id: 'how-we-collect',
    title: 'How We Collect Personal Data',
    blocks: [
      { t: 'p', s: 'We may collect personal data directly from you when you:' },
      {
        t: 'list',
        items: [
          'Contact us',
          'Request information',
          'Engage our services',
          'Provide documentation',
          'Communicate with us by email, telephone or other means',
        ],
      },
      {
        t: 'p',
        s: 'We may also collect personal data from third parties, including:',
      },
      {
        t: 'list',
        items: [
          'Public registries and official records',
          'Competent authorities',
          'Financial institutions',
          'Professional advisers',
          'Introducers and intermediaries',
          'Sanctions and compliance databases',
          'Publicly available sources',
          'Other lawful sources where permitted by law',
        ],
      },
    ],
  },
  {
    id: 'purposes',
    title: 'Purposes of Processing',
    blocks: [
      { t: 'p', s: 'We may process personal data for the following purposes:' },
      {
        t: 'list',
        items: [
          'Assessing prospective business relationships',
          'Establishing and maintaining client relationships',
          'Providing corporate, fiduciary, governance, compliance and administrative services',
          'Company formation and administration',
          'Corporate secretarial services',
          'Nominee, trustee and registered office services',
          'Compliance with anti-money laundering and counter-terrorist financing obligations',
          'Customer due diligence and ongoing monitoring',
          'Sanctions compliance and risk management',
          'Regulatory compliance',
          'Protection of our legal rights and interests',
          'Prevention and detection of fraud and financial crime',
          'Responding to enquiries and communications',
          'Maintaining records and internal governance procedures',
          'Establishing, exercising or defending legal claims',
        ],
      },
    ],
  },
  {
    id: 'legal-basis',
    title: 'Legal Basis for Processing',
    blocks: [
      {
        t: 'p',
        s: 'We process personal data only where a lawful basis exists, including:',
      },
      {
        t: 'list',
        items: [
          'Performance of a contract or steps prior to entering into a contract',
          'Compliance with legal and regulatory obligations',
          'Legitimate interests pursued by the Company',
          'Consent, where required by law',
          'Protection of vital interests where applicable',
        ],
      },
      {
        t: 'p',
        s: 'Our legitimate interests include business administration, information security, fraud prevention, regulatory compliance, risk management and protection of our legal rights.',
      },
    ],
  },
  {
    id: 'aml-compliance',
    title: 'AML and Regulatory Compliance',
    blocks: [
      {
        t: 'p',
        s: 'As a regulated Administrative Service Provider, we are subject to extensive legal and regulatory obligations relating to anti-money laundering, counter-terrorist financing, sanctions compliance and customer due diligence.',
      },
      {
        t: 'p',
        s: 'Accordingly, we may be required by law to collect, verify, assess, retain and disclose personal data for the purposes of:',
      },
      {
        t: 'list',
        items: [
          'Customer identification and verification',
          'Beneficial ownership verification',
          'Source of wealth and source of funds verification',
          'Sanctions screening',
          'Politically exposed person screening',
          'Risk assessment',
          'Ongoing monitoring',
          'Regulatory reporting',
          'Compliance with legal obligations',
        ],
      },
      {
        t: 'p',
        s: 'Failure to provide requested information may prevent us from establishing or continuing a business relationship or providing services.',
      },
    ],
  },
  {
    id: 'special-category-data',
    title: 'Special Category Data and Criminal Offence Data',
    blocks: [
      {
        t: 'p',
        s: 'Where necessary and lawful, we may process special categories of personal data and personal data relating to criminal convictions and offences where such processing is required for legal, regulatory, compliance or employment purposes or for the establishment, exercise or defence of legal claims.',
      },
    ],
  },
  {
    id: 'disclosure',
    title: 'Disclosure of Personal Data',
    blocks: [
      { t: 'p', s: 'We may disclose personal data, where lawful and necessary, to:' },
      {
        t: 'list',
        items: [
          'Regulatory and supervisory authorities',
          'Governmental authorities',
          'Law enforcement agencies',
          'Courts and tribunals',
          'Tax authorities',
          'Banks and financial institutions',
          'Auditors, accountants and lawyers',
          'Information technology and cloud service providers',
          'Compliance and screening service providers',
          'Other professional advisers and service providers',
        ],
      },
      {
        t: 'p',
        s: 'All disclosures are made subject to appropriate legal, contractual and confidentiality safeguards.',
      },
    ],
  },
  {
    id: 'international-transfers',
    title: 'International Transfers',
    blocks: [
      {
        t: 'p',
        s: 'Personal data may be transferred to and processed in countries outside the European Economic Area.',
      },
      {
        t: 'p',
        s: 'Where such transfers occur, appropriate safeguards will be implemented in accordance with applicable data protection legislation, including adequacy decisions, Standard Contractual Clauses or other lawful transfer mechanisms.',
      },
      {
        t: 'p',
        s: 'The Company may utilise cloud-based service providers, including Microsoft 365 and Google Workspace, for business operations and communications.',
      },
    ],
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    blocks: [
      {
        t: 'p',
        s: 'We retain personal data only for as long as necessary to fulfil the purposes for which it was collected and to comply with legal, regulatory, contractual and professional obligations.',
      },
      {
        t: 'p',
        s: 'AML and customer due diligence records may be retained for a minimum period of five (5) years following the termination of the business relationship or for such longer period as may be required by law or regulatory requirements.',
      },
      {
        t: 'p',
        s: 'Where personal data is no longer required, it will be securely deleted, anonymised or otherwise disposed of.',
      },
    ],
  },
  {
    id: 'data-security',
    title: 'Data Security',
    blocks: [
      {
        t: 'p',
        s: 'We maintain appropriate technical and organisational measures designed to protect personal data against accidental or unlawful destruction, loss, alteration, unauthorised disclosure or unauthorised access.',
      },
      {
        t: 'p',
        s: 'These measures include access controls, information security procedures, staff training, confidentiality obligations and ongoing monitoring of security arrangements.',
      },
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    blocks: [
      { t: 'p', s: 'Subject to applicable law, you may have the right to:' },
      {
        t: 'list',
        items: [
          'Access your personal data',
          'Request correction of inaccurate or incomplete personal data',
          'Request deletion of personal data',
          'Request restriction of processing',
          'Object to processing',
          'Request data portability',
          'Withdraw consent where processing is based on consent',
          'Lodge a complaint with the competent supervisory authority',
        ],
      },
      {
        t: 'p',
        s: 'Certain rights may be restricted where such restriction is permitted by law, including for anti-money laundering, regulatory, law enforcement or legal proceedings purposes.',
      },
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies',
    blocks: [
      {
        t: 'p',
        s: 'Our websites may use cookies and similar technologies to ensure functionality, improve performance and enhance user experience.',
      },
      {
        t: 'p',
        s: 'Where required by law, non-essential cookies will only be used following your consent.',
      },
      {
        t: 'p',
        s: 'Further information may be available through our Cookie Policy and cookie consent mechanism.',
      },
    ],
  },
  {
    id: 'third-party-websites',
    title: 'Third-Party Websites',
    blocks: [
      {
        t: 'p',
        s: 'Our websites may contain links to third-party websites. We do not control and are not responsible for the privacy practices or content of such websites.',
      },
      {
        t: 'p',
        s: 'Users are encouraged to review the privacy policies of any third-party websites they visit.',
      },
    ],
  },
  {
    id: 'complaints',
    title: 'Complaints',
    blocks: [
      {
        t: 'p',
        s: 'If you have concerns regarding the processing of your personal data, we encourage you to contact us in the first instance.',
      },
      { t: 'p', s: 'You also have the right to lodge a complaint with:' },
      {
        t: 'p',
        s: 'Office of the Commissioner for Personal Data Protection, Kypranoros 15, 1061 Nicosia, Cyprus',
      },
      {
        t: 'p',
        s: 'Website: www.dataprotection.gov.cy — Email: commissioner@dataprotection.gov.cy — Telephone: +357 22 818456',
      },
    ],
  },
  {
    id: 'changes',
    title: 'Changes to This Privacy Policy',
    blocks: [
      {
        t: 'p',
        s: 'We may amend this Privacy Policy from time to time to reflect changes in legal, regulatory or operational requirements.',
      },
      {
        t: 'p',
        s: 'The most recent version will always be available on our website.',
      },
    ],
  },
];
