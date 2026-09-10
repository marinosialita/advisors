/**
 * Full editorial body content for every service detail page.
 *
 * Source: the original SC Advisors service pages (24 markdown captures),
 * transferred verbatim — only line-break artifacts (sentences split
 * mid-phrase across lines) were rejoined. Slugs match `data.ts`.
 */

import { SERVICE_DETAILS_RU_CORPORATE } from './details-ru';
import { SERVICE_DETAILS_RU_PRIVATE } from './details-ru-private';

export type ServiceGroup = 'corporate' | 'private';

export type ServiceBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'section-heading'; text: string }
  | { type: 'offer-item'; lead: string; text?: string; items?: string[] }
  | { type: 'list'; items: string[] };

/** group → service slug → structured body blocks */
export const SERVICE_DETAILS: Record<ServiceGroup, Record<string, ServiceBlock[]>> = {
  corporate: {
    "accounting-bookkeeping": [
      { type: 'paragraph', text: "Our team of dedicated, experienced accountants provides a broad spectrum of accounting services, tailored to meet our clients’ unique business needs. These include bookkeeping and payroll solutions for a wide range of firms and entities, multi-currency accounting preparation, invoicing and valuation, and training and auditing" },
      { type: 'paragraph', text: "At the core of our business philosophy is one clear goal: to deliver high-quality accounting services that add real value to your operations while upholding the highest standards of professionalism, confidentiality, and business ethics." },
      { type: 'paragraph', text: "We leverage industry-leading, professional computerized accounting software to maintain accurate records, generate insightful reports, and prepare fully compliant financial statements tailored to your business needs." },
      { type: 'section-heading', text: "What We Offer" },
      { type: 'paragraph', text: "Our accounting team supports businesses across all industries, including regulated Financial Services, FinTech, RegTech, E-commerce, Real Estate, and Trading, with a full suite of customized solutions:" },
      {
        type: 'offer-item',
        lead: "Multi-Currency Accounting & Bookkeeping",
        text: "Maintain proper, up-to-date accounting records in any major currency, fully compliant with International Accounting Standards and your company’s functional currency.",
      },
      {
        type: 'offer-item',
        lead: "Management Reporting",
        text: "Preparation of periodic management accounts, including profit & loss statements, balance sheets, and customized reports to support informed business decisions.",
      },
      {
        type: 'offer-item',
        lead: "Financial Statements (IFRS & Other Frameworks)",
        text: "Assistance with the preparation of annual financial statements in full compliance with IFRS or other relevant standards such as UK GAAP, UK FRS, and local requirements.",
      },
      {
        type: 'offer-item',
        lead: "Expert Accounting Advice",
        text: "Guidance on the appropriate treatment of complex transactions to ensure your records align with correct accounting principles.",
      },
      {
        type: 'offer-item',
        lead: "Sales Invoice Management",
        text: "Issuance and distribution of commercial and pro forma invoices based on your instructions, along with proper recording in your accounting system.",
      },
      {
        type: 'offer-item',
        lead: "Bank Reconciliations & Reporting",
        text: "Reconciliation of bank statements and detailed bank movement analysis to ensure clarity, accuracy, and control.",
      },
      {
        type: 'offer-item',
        lead: "Payroll Services",
        text: "End-to-end payroll processing, including monthly payroll calculations, Social Insurance & PAYE filings in Cyprus, and National Insurance & PAYE submissions in the UK.",
      },
      {
        type: 'offer-item',
        lead: "Client Fund Reconciliation & Audit Support",
        text: "Specialized assistance with client fund tracking, reconciliation, audit preparation, and accounting training for in-house teams.",
      },
      {
        type: 'offer-item',
        lead: "Outsourced Accounting Solutions",
        text: "Scalable services for global groups and complex organizations needing flexible, dedicated, and smart outsourced accounting support.",
      },
    ],
    "banking": [
      { type: 'paragraph', text: "Opening and managing a bank account, whether personal, corporate, or investment-related, requires more than just paperwork. It demands expertise, strategy, and trusted connections. With our deep knowledge of banking requirements and long-standing relationships with reputable financial institutions, we offer a seamless, fully guided experience tailored to your financial goals." },
      { type: 'section-heading', text: "What We Offer" },
      {
        type: 'offer-item',
        lead: "Expert bank selection support",
        text: "to match you with the ideal institution based on your unique financial needs",
      },
      {
        type: 'offer-item',
        lead: "Personalized advice on how to strategically organize your accounts",
        text: "to ensure optimal tax efficiency",
      },
      {
        type: 'offer-item',
        lead: "Assistance with completing all required forms and paperwork",
        text: "for account opening",
      },
      {
        type: 'offer-item',
        lead: "Full coordination with banks to streamline application and approval",
      },
      {
        type: 'offer-item',
        lead: "Support with signatory services, account maintenance, and ongoing monitoring",
      },
      {
        type: 'offer-item',
        lead: "Fast, compliant processing with real-time updates",
        text: "and clear communication",
      },
      {
        type: 'offer-item',
        lead: "Secure and timely facilitation of payments",
      },
      { type: 'paragraph', text: "We don’t just help you open an account, we ensure you open the right account, in the right jurisdiction, with the right structure in place. Our team is committed to delivering smart, efficient, and personalized banking solutions that simplify the process and support your broader financial strategy." },
    ],
    "corporate-governance": [
      { type: 'paragraph', text: "Smart corporate governance that builds confidence is the backbone of a successful business. It’s not just about compliance, it’s about creating a structure that supports agile decision-making, accountability, and long-term growth." },
      { type: 'paragraph', text: "We help you design and implement governance frameworks that are not only legally sound but also strategically smart." },
      { type: 'section-heading', text: "With our expert support, you’ll ensure:" },
      {
        type: 'list',
        items: [
          "Full compliance with local and international legal standards",
          "Clear, enforceable, and well-documented decisions",
          "A smart, balanced distribution of power between directors, shareholders, and other key stakeholders",
        ],
      },
    ],
    "corporate-and-legal": [
      { type: 'paragraph', text: "Our corporate services are at the heart of what we do, and encompass a wide range of solutions for companies seeking relocation, formation or administration services, both in Cyprus and in other jurisdictions. Our turnkey business solutions include assistance with Representation, Mergers and Acquisitions, Restructuring and other professional advice. We pay special attention to our clients’ specific requirements and provide customized solutions for managing your business that meet the highest quality standards." },
      { type: 'section-heading', text: "Our Corporate Services include" },
      {
        type: 'list',
        items: [
          "Fiduciary Services",
          "Nominee Shareholder Services",
          "Commercial Contracts",
          "Shareholder Agreements",
          "Mergers & Acquisitions",
          "Redomiciliation to Cyprus",
          "Trust Services",
          "Fund Administration Services",
        ],
      },
      { type: 'paragraph', text: "Our Legal & Corporate practice areas seamlessly complement our company’s full suite of services, integrating at various stages of a business or legal entity’s lifecycle to enhance values for shareholders and management. We offer comprehensive and tailored range of legal and corporate services to clients across the region, with our clients’ protection as our number one goal. From advisory support to document preparation, local logistics and tailored banking solutions, we guarantee compliance, we help our clients navigate success every step of the way." },
      { type: 'section-heading', text: "Our legal services include" },
      {
        type: 'offer-item',
        lead: "Legal Advisory for IT & Tech Companies in Cyprus",
        text: "We offer specialized legal advisory services to IT and tech companies operating in or expanding to Cyprus, helping you safeguard your innovation, scale your operations, and stay compliant with evolving regulations.",
      },
      { type: 'paragraph', text: "Whether you're launching a software platform, developing digital products, or managing sensitive user data, we provide practical legal support tailored to your business model and growth strategy." },
      { type: 'section-heading', text: "Our Services for IT & Tech Companies cover the following areas" },
      {
        type: 'offer-item',
        lead: "Company Formation & Structuring",
        text: "Set up and structure your business in Cyprus with full regulatory and tax compliance.",
      },
      {
        type: 'offer-item',
        lead: "Intellectual Property Protection",
        items: [
          "Copyright registration & enforcement",
          "Design right protection for digital products & user interfaces",
          "Trademark registration and brand strategy",
          "Licensing & IP transfer agreements",
        ],
      },
      {
        type: 'offer-item',
        lead: "Technology & Commercial Contracts",
        text: "Drafting and negotiation of software licenses, SaaS agreements, service level agreements (SLAs), reseller and distribution contracts.",
      },
      {
        type: 'offer-item',
        lead: "GDPR & Data Protection Compliance",
        text: "Ensure full compliance with EU data privacy laws, including policies, audits, and cross-border data transfer solutions.",
      },
      {
        type: 'offer-item',
        lead: "Employment & Contractor Agreements",
        text: "Tailored contracts for tech teams, including IP assignment and confidentiality clauses.",
      },
      {
        type: 'offer-item',
        lead: "Advisory for SaaS, AI, and Software Startups",
        text: "Navigate regulatory frameworks while protecting your innovation and intellectual property.",
      },
    ],
    "fiduciary": [
      { type: 'paragraph', text: "We offer a full suite of corporate fiduciary services tailored to your operational and strategic goals, with the aim to support the effective and compliant operation of Cyprus companies. Our experienced professionals provide the legal, administrative, and infrastructure support needed to meet regulatory obligations while ensuring privacy and operational efficiency." },
      { type: 'paragraph', text: "We serve international clients who benefit from Cyprus’s favorable tax regime, offering flexible and discreet structuring options through a trusted and experienced team." },
      { type: 'section-heading', text: "Our Fiduciary Services cover the following areas" },
      {
        type: 'offer-item',
        lead: "Provision of Professional Directors",
        text: "We provide expert nominee directorship to companies seeking to benefit from Cyprus’s tax advantages, and prepare and maintain all required legal and compliance documentation.",
      },
    ],
    "fund-administration": [
      { type: 'paragraph', text: "We are a full-scope fund administration service provider supporting both EU and third-country investment funds, structured as investment companies or partnerships. Our comprehensive, technology-enabled solutions are designed to ensure smooth, compliant, and efficient fund operations from launch through the full lifecycle." },
      { type: 'paragraph', text: "With deep regulatory expertise and an integrated team of specialists we help you mitigate operational risk, reduce administrative burden, and boost investor confidence." },
      { type: 'section-heading', text: "Our Fund Administration Services cover the following areas" },
      {
        type: 'offer-item',
        lead: "NAV Calculation",
        text: "Accurate and timely Net Asset Value computations.",
      },
      {
        type: 'offer-item',
        lead: "Investor Services",
        text: "Onboarding, KYC updates, investor communications, and transaction processing (subscriptions, redemptions, transfers, conversions).",
      },
      {
        type: 'offer-item',
        lead: "Shareholder Register Management",
        text: "Full electronic record-keeping of investors and real-time updates.",
      },
      {
        type: 'offer-item',
        lead: "Fund Reporting & Documentation",
        text: "Preparation and distribution of reports, circulars, legal documents, minutes, and other required materials.",
      },
      {
        type: 'offer-item',
        lead: "Board & Shareholder Meeting Support",
        text: "Attendance and preparation of relevant documents.",
      },
      {
        type: 'offer-item',
        lead: "Reconciliations",
        text: "Daily and periodic reconciliations of depositary, custodian, and bank accounts.",
      },
      {
        type: 'offer-item',
        lead: "Regulatory Reporting Support",
        text: "Assistance with regulatory filings, including FATCA/CRS reports.",
      },
      {
        type: 'offer-item',
        lead: "Ad-Hoc Investor Requests",
        text: "Timely response and accurate reporting for investor inquiries.",
      },
      {
        type: 'offer-item',
        lead: "Bookkeeping & Accounting",
        text: "Comprehensive general ledger and fund-specific financial records.",
      },
    ],
    "hr": [
      { type: 'paragraph', text: "Executive Search. Talent Strategy. People Advisory." },
      { type: 'paragraph', text: "We provide comprehensive HR and recruitment services in Cyprus and internationally, for both corporate clients and family offices. Whether you’re setting up a new business or life in Limassol or expanding across borders, we help you find, assess, and grow the right people." },
      { type: 'paragraph', text: "Our team specializes in executive search, HR advisory, talent assessment, and leadership development, with a deep understanding of both local and global talent dynamics. We work closely with founders, investors, and senior leaders to build resilient teams, future-proof leadership, and a culture of performance and trust." },
      { type: 'section-heading', text: "We support" },
      {
        type: 'list',
        items: [
          "Executive & board-level recruitment in Cyprus and abroad",
          "Interim & fractional leadership placement (CEO, CFO, General Counsel, COO)",
          "HR due diligence during M&A, fundraising, and restructuring",
          "Building HR & people operations from scratch for new companies or branches",
          "Talent retention, culture diagnostics, compensation strategy",
          "Recruitment for family offices: private staff, advisors, investment professionals",
          "Founder coaching & succession planning",
          "Talent & leadership assessment, individual and team-based",
          "Evaluation of leadership potential and team effectiveness",
          "Development programs using tailored, research-based tools and methodologies",
        ],
      },
      { type: 'paragraph', text: "Our proprietary approach combines deep business insight with behavioural assessment tools to identify potential, unlock growth, and strengthen decision-making capacity inside teams." },
      { type: 'paragraph', text: "Whether you’re hiring a CEO, evaluating your executive team, or setting up HR processes for your Cyprus-based company, we help you attract, assess, and develop talent that drives long-term value." },
    ],
    "intellectual-property-ip-box-tax-regime": [
      { type: 'paragraph', text: "Our Tax Compliance team works alongside each client, offering personalized recommendations that ensure optimal tax efficiency and cater to your particular set of financial requirements, both onshore and offshore. Whether this means assisting with structured and regulatory-compliant global tax planning and optimization, tax registration and filings and social insurance registration, or capital tax computations and preparation of capital statements, we offer an individualized approach that ensures our clients achieve optimal results, every time." },
      { type: 'paragraph', text: "We also specialize in helping businesses navigate the Cyprus IP Box Regime, including IP Asset Identification and Structuring, application and tax ruling, compliance and reporting, and strategic tax planning so that clients can fully benefit from the regime while remaining compliant with all legal and regulatory requirements." },
      { type: 'section-heading', text: "Our Tax Compliance Services include" },
      {
        type: 'offer-item',
        lead: "Intellectual Property & IP Box Tax Regime",
        text: "Your brand is more than a name — it’s your identity, your reputation, and one of your most powerful business assets. Whether you're launching something new or growing an established brand, we help you protect it with smart, strategic IP solutions.",
      },
      { type: 'section-heading', text: "Our services include" },
      {
        type: 'list',
        items: [
          "Trademark registration, patent registration, copyright registration, design rights and database rights across Europe and internationally to secure your brand wherever you do business.",
          "Proactive legal strategies to safeguard, enforce, and maximize the value of your intellectual property.",
          "Advisory and structuring services for the Cyprus IP Box Regime, a tax incentive offering an effective tax rate of 2.5% on qualifying IP income, including patents, copyrighted software, and other eligible intangible assets.",
          "Assistance with IP ownership structuring, acquisition, assignment, and licensing agreements.",
          "Legal and tax due diligence for IP portfolios, ensuring compliance with Cyprus and international law.",
        ],
      },
      { type: 'section-heading', text: "Benefits of the Cyprus IP Box Regime" },
      {
        type: 'offer-item',
        lead: "Attracting Innovation",
        text: "The reduced tax rate incentivizes companies to invest in research and development activities. This, in turn, stimulates innovation and the creation of valuable IP assets",
      },
      {
        type: 'offer-item',
        lead: "Competitive Advantage",
        text: "The preferential tax treatment can enhance a company’s competitiveness in the global market, as it enables businesses to maximize the after-tax return on their IP-related activities.",
      },
      {
        type: 'offer-item',
        lead: "Financial Planning",
        text: "Companies can plan their finances more effectively, knowing that a significant portion of their IP income will be taxed at a reduced rate, providing stability and predictability for long-term investment.",
      },
      {
        type: 'offer-item',
        lead: "Global Expansion",
        text: "Access to a network of double tax treaties allows companies to expand their global footprint while minimizing international tax challenges",
      },
      {
        type: 'offer-item',
        lead: "Attracting Foreign Investment",
        text: "The Cyprus IP Box Regime attracts foreign investment and can serve as a getaway for companies looking to establish a presence in Europe or leverage Cyprus as a hub for their intellectual property activities.",
      },
    ],
    "legal": [
      { type: 'paragraph', text: "Our Legal & Corporate practice areas seamlessly complement our company’s full suite of services, integrating at various stages of a business or legal entity’s lifecycle to enhance values for shareholders and management. We offer comprehensive and tailored range of legal and corporate services to clients across the region, with our clients’ protection as our number one goal. From advisory support to document preparation, local logistics and tailored banking solutions, we guarantee compliance, we help our clients navigate success every step of the way." },
      { type: 'section-heading', text: "Our legal services include" },
      {
        type: 'offer-item',
        lead: "Legal Advisory for IT & Tech Companies in Cyprus",
        text: "We offer specialized legal advisory services to IT and tech companies operating in or expanding to Cyprus, helping you safeguard your innovation, scale your operations, and stay compliant with evolving regulations.",
      },
      { type: 'paragraph', text: "Whether you're launching a software platform, developing digital products, or managing sensitive user data, we provide practical legal support tailored to your business model and growth strategy." },
      { type: 'section-heading', text: "Our Services for IT & Tech Companies cover the following areas" },
      {
        type: 'offer-item',
        lead: "Company Formation & Structuring",
        text: "Set up and structure your business in Cyprus with full regulatory and tax compliance.",
      },
      {
        type: 'offer-item',
        lead: "Intellectual Property Protection",
        items: [
          "Copyright registration & enforcement",
          "Design right protection for digital products & user interfaces",
          "Trademark registration and brand strategy",
          "Licensing & IP transfer agreements",
        ],
      },
      {
        type: 'offer-item',
        lead: "Technology & Commercial Contracts",
        text: "Drafting and negotiation of software licenses, SaaS agreements, service level agreements (SLAs), reseller and distribution contracts.",
      },
      {
        type: 'offer-item',
        lead: "GDPR & Data Protection Compliance",
        text: "Ensure full compliance with EU data privacy laws, including policies, audits, and cross-border data transfer solutions.",
      },
      {
        type: 'offer-item',
        lead: "Employment & Contractor Agreements",
        text: "Tailored contracts for tech teams, including IP assignment and confidentiality clauses.",
      },
      {
        type: 'offer-item',
        lead: "Advisory for SaaS, AI, and Software Startups",
        text: "Navigate regulatory frameworks while protecting your innovation and intellectual property.",
      },
    ],
    "licensing-authorization": [
      { type: 'paragraph', text: "We specialize in the licensing and authorization of investment funds across a wide range of EU and non-EU jurisdictions. Our smart, end-to-end approach is designed to accelerate market entry while aligning with your strategic and operational goals." },
      { type: 'section-heading', text: "Our services cover the following areas, among others" },
      {
        type: 'offer-item',
        lead: "Smart compliance & tax structuring",
        text: "Guidance on optimizing the structure of the regulated entity to meet jurisdictional requirements and investor profiles.",
      },
      {
        type: 'offer-item',
        lead: "Jurisdictional strategy consulting",
        text: "Insightful advice on selecting the most appropriate jurisdiction based on your licensing and operational needs.",
      },
      {
        type: 'offer-item',
        lead: "Prospectus & fund documentation drafting",
        text: "Preparation of your fund’s prospectus or information memorandum, with strategic structuring to support retail, professional, or well-informed investor targeting.",
      },
      {
        type: 'offer-item',
        lead: "Custom internal policies & procedures",
        text: "Drafting and tailoring of internal operations manuals fully aligned with current regulatory directives and the specific requirements of your fund.",
      },
      {
        type: 'offer-item',
        lead: "Transparent project planning",
        text: "A clear, structured roadmap with defined workflows, tangible milestones, and smart deadlines to keep your licensing process on track.",
      },
      {
        type: 'offer-item',
        lead: "Regulatory representation & coordination",
        text: "Full management of regulator interactions, including direct representation, correspondence, and coordination of all required meetings.",
      },
    ],
    "mergers-acquisitions": [
      { type: 'paragraph', text: "Whether you're buying, selling, or restructuring a business, we’re here to guide you through every step with smart, strategic legal support that protects your interests and maximizes value." },
      { type: 'section-heading', text: "Our M&A experts help you" },
      {
        type: 'offer-item',
        lead: "Make informed decisions with smart structuring advice",
        text: "whether it’s a share or asset deal",
      },
      {
        type: 'offer-item',
        lead: "Minimize legal and commercial risks through smart due diligence",
        text: "and tailored payment structures",
      },
      {
        type: 'offer-item',
        lead: "Ensure every part of the process is legally compliant",
        text: "from drafting and negotiation to execution and filing",
      },
      { type: 'paragraph', text: "With our team, you get more than just a transaction, you get a smooth, well-executed deal that aligns with your goals." },
    ],
    "redomiciliation": [
      { type: 'paragraph', text: "We offer smart and compliant redomiciliation services to Cyprus, enabling companies to seamlessly transfer their legal seat while preserving continuity of operations, ownership, assets, and contracts." },
      { type: 'paragraph', text: "Cyprus stands out as a flexible and forward-looking jurisdiction, allowing redomiciliation both into and out of the country, making it a strategic choice for international businesses seeking efficiency, EU alignment, and tax optimization." },
      { type: 'paragraph', text: "Our team combines deep cross-border structuring experience with hands-on regulatory insight. With in-house experts in legal, tax, corporate governance, and accounting, we manage the entire process from planning to registration, ensuring your migration is fully aligned with Cyprus law and international standards." },
      { type: 'paragraph', text: "We deliver a confidential, fully compliant, and cost-effective solution, tailored to your operational goals. To further support your presence in Cyprus, we offer value-added services such as premium office space, substance solutions, banking setup, and ongoing administrative support, designed to help your business operate efficiently and stay one step ahead." },
    ],
    "tax-vat-advisory": [
      { type: 'paragraph', text: "Our Tax Compliance & Planning team provides personalized, strategic support to ensure your company meets its obligations while optimizing its tax position, both in Cyprus and internationally." },
      { type: 'section-heading', text: "Our Tax Services Include" },
      {
        type: 'offer-item',
        lead: "Global Tax & VAT Planning and Optimization",
        text: "Strategic structuring and planning that reduce exposure and enhance efficiency across multiple jurisdictions.",
      },
      {
        type: 'offer-item',
        lead: "Preliminary & Annual Tax Reviews",
        text: "In-depth analysis of your company’s tax computation and financial statements to identify tax risks, assess them by risk level, and uncover opportunities for greater tax efficiency.",
      },
      {
        type: 'offer-item',
        lead: "Tax and VAT Rulings & Opinions",
        text: "Guidance on complex transactions with the option to request advance tax rulings from the Cyprus tax authorities.",
      },
      {
        type: 'offer-item',
        lead: "Timely Tax Return Submission",
        text: "Preparation and filing of corporate tax returns, ensuring full compliance with deadlines and regulations.",
      },
      {
        type: 'offer-item',
        lead: "Tax Authority Liaison & Representation",
        text: "We handle correspondence and negotiations with the Cyprus Tax Department and other authorities, including filing objections, resolving disputes, and attending meetings on your behalf.",
      },
      {
        type: 'offer-item',
        lead: "Tax Residency Certificates",
        text: "Assistance with obtaining tax residency certificates for both companies and individuals, with full documentation and follow-up support.",
      },
      {
        type: 'offer-item',
        lead: "Tax Payment Management",
        text: "We manage and process tax payments on your behalf, ensuring accuracy and timeliness.",
      },
      {
        type: 'offer-item',
        lead: "Social Insurance Registration & Compliance",
        text: "Set up and support with social insurance filings.",
      },
      {
        type: 'offer-item',
        lead: "VAT & VIES Registration and Submissions",
        text: "Accurate and timely submissions aligned with EU VAT rules.",
      },
      {
        type: 'offer-item',
        lead: "Capital Gains Tax (CGT) Computations",
        text: "Expert calculations and reporting to ensure your CGT obligations are correctly handled.",
      },
      {
        type: 'offer-item',
        lead: "Capital Statement Preparation",
        text: "Complete preparation and submission of required capital statements for individuals and businesses",
      },
      { type: 'paragraph', text: "With our smart, hands-on approach, you’ll have a trusted partner to navigate tax complexity, avoid unnecessary exposure, and ensure full regulatory compliance, all while enhancing your financial efficiency." },
    ],
    "trust-services": [
      { type: 'paragraph', text: "Our specialist Trust Services Team offers expert support in the formation and administration of Cyprus International Trusts, combining complete confidentiality with smart, compliant structuring to safeguard assets and support long-term wealth planning." },
      { type: 'paragraph', text: "With deep expertise and a client-first approach, we provide tailored solutions for individuals, families, and businesses seeking to protect and manage their wealth through the flexible Cyprus trust framework." },
      { type: 'section-heading', text: "Our Trust Services cover the following areas" },
      {
        type: 'offer-item',
        lead: "Formation & Structuring",
        items: [
          "Drafting and establishing Cyprus International Trusts in line with legal and regulatory requirements",
          "Structuring the trust to reflect the settlor’s specific goals and instructions",
        ],
      },
      {
        type: 'offer-item',
        lead: "Comprehensive Administration",
        items: [
          "Acting as corporate trustee and managing trust assets",
          "Appointment and administration of protectors",
          "Managing trusts used in employee bonus schemes and corporate structures",
          "Administering the trust in accordance with the settlor’s wishes",
        ],
      },
      {
        type: 'offer-item',
        lead: "Asset Protection & Estate Planning",
        items: [
          "Advising on family asset protection, succession planning, and inheritance strategies",
          "Handling all estate matters, including asset valuation, debt payments, tax liabilities, and distributions to beneficiaries",
        ],
      },
      {
        type: 'offer-item',
        lead: "Banking & Investment Coordination",
        items: [
          "Opening, administering, and monitoring bank accounts linked to the trust",
          "Coordinating with fund managers for investment accounts",
          "Ensuring good title and ongoing management of real estate held in trust",
        ],
      },
      {
        type: 'offer-item',
        lead: "Ongoing Compliance & Advisory",
        items: [
          "Maintaining accurate accounting records",
          "Providing ongoing legal, regulatory, and fiduciary advice to settlors, trustees, and beneficiaries",
        ],
      },
    ],
  },
  private: {
    "accounting-bookkeeping": [
      { type: 'paragraph', text: "Our team of dedicated, experienced accountants provides a broad spectrum of accounting services, tailored to meet our clients’ unique business needs. These include bookkeeping and payroll solutions for a wide range of firms and entities, multi-currency accounting preparation, invoicing and valuation, and training and auditing" },
      { type: 'paragraph', text: "At the core of our business philosophy is one clear goal: to deliver high-quality accounting services that add real value to your operations while upholding the highest standards of professionalism, confidentiality, and business ethics." },
      { type: 'paragraph', text: "We leverage industry-leading, professional computerized accounting software to maintain accurate records, generate insightful reports, and prepare fully compliant financial statements tailored to your business needs." },
      { type: 'section-heading', text: "What We Offer" },
      { type: 'paragraph', text: "Our accounting team supports businesses across all industries, including regulated Financial Services, FinTech, RegTech, E-commerce, Real Estate, and Trading, with a full suite of customized solutions:" },
      {
        type: 'offer-item',
        lead: "Multi-Currency Accounting & Bookkeeping",
        text: "Maintain proper, up-to-date accounting records in any major currency, fully compliant with International Accounting Standards and your company’s functional currency.",
      },
      {
        type: 'offer-item',
        lead: "Management Reporting",
        text: "Preparation of periodic management accounts, including profit & loss statements, balance sheets, and customized reports to support informed business decisions.",
      },
      {
        type: 'offer-item',
        lead: "Financial Statements (IFRS & Other Frameworks)",
        text: "Assistance with the preparation of annual financial statements in full compliance with IFRS or other relevant standards such as UK GAAP, UK FRS, and local requirements.",
      },
      {
        type: 'offer-item',
        lead: "Expert Accounting Advice",
        text: "Guidance on the appropriate treatment of complex transactions to ensure your records align with correct accounting principles.",
      },
      {
        type: 'offer-item',
        lead: "Sales Invoice Management",
        text: "Issuance and distribution of commercial and pro forma invoices based on your instructions, along with proper recording in your accounting system.",
      },
      {
        type: 'offer-item',
        lead: "Bank Reconciliations & Reporting",
        text: "Reconciliation of bank statements and detailed bank movement analysis to ensure clarity, accuracy, and control.",
      },
      {
        type: 'offer-item',
        lead: "Payroll Services",
        text: "End-to-end payroll processing, including monthly payroll calculations, Social Insurance & PAYE filings in Cyprus, and National Insurance & PAYE submissions in the UK.",
      },
      {
        type: 'offer-item',
        lead: "Client Fund Reconciliation & Audit Support",
        text: "Specialized assistance with client fund tracking, reconciliation, audit preparation, and accounting training for in-house teams.",
      },
      {
        type: 'offer-item',
        lead: "Outsourced Accounting Solutions",
        text: "Scalable services for global groups and complex organizations needing flexible, dedicated, and smart outsourced accounting support.",
      },
    ],
    "banking": [
      { type: 'paragraph', text: "Opening and managing a bank account, whether personal, corporate, or investment-related, requires more than just paperwork. It demands expertise, strategy, and trusted connections. With our deep knowledge of banking requirements and long-standing relationships with reputable financial institutions, we offer a seamless, fully guided experience tailored to your financial goals." },
      { type: 'section-heading', text: "What We Offer" },
      {
        type: 'offer-item',
        lead: "Expert bank selection support",
        text: "to match you with the ideal institution based on your unique financial needs",
      },
      {
        type: 'offer-item',
        lead: "Personalized advice on how to strategically organize your accounts",
        text: "to ensure optimal tax efficiency",
      },
      {
        type: 'offer-item',
        lead: "Assistance with completing all required forms and paperwork",
        text: "for account opening",
      },
      {
        type: 'offer-item',
        lead: "Full coordination with banks to streamline application and approval",
      },
      {
        type: 'offer-item',
        lead: "Support with signatory services, account maintenance, and ongoing monitoring",
      },
      {
        type: 'offer-item',
        lead: "Fast, compliant processing with real-time updates",
        text: "and clear communication",
      },
      {
        type: 'offer-item',
        lead: "Secure and timely facilitation of payments",
      },
      { type: 'paragraph', text: "We don’t just help you open an account, we ensure you open the right account, in the right jurisdiction, with the right structure in place. Our team is committed to delivering smart, efficient, and personalized banking solutions that simplify the process and support your broader financial strategy." },
    ],
    "comprehensive-real-estate-solutions": [
      { type: 'paragraph', text: "Whether you're acquiring, developing, investing in, or managing real estate, we provide high-quality, tailor-made solutions designed to optimize every aspect of your transaction:" },
      {
        type: 'list',
        items: [
          "Acquisition & Sale of Property",
          "Legal & Regulatory Compliance",
          "Investment Structuring & Tax Efficiency",
          "Leasing Strategy & Execution",
          "ROI Monitoring & Strategic Advisory",
        ],
      },
    ],
    "concierge-services": [
      { type: 'paragraph', text: "Tailored solutions for every detail that matters." },
      { type: 'paragraph', text: "We provide bespoke concierge services for private clients, entrepreneurs, and families who value time, trust, and impeccable execution. Whether you’re relocating across borders or organizing a last-minute private event, our team ensures that every aspect of your personal and professional life runs smoothly." },
      { type: 'paragraph', text: "We work with a trusted network of service providers and manage every request with absolute discretion and precision, so you can focus on what matters most." },
      { type: 'section-heading', text: "Our services include" },
      {
        type: 'list',
        items: [
          "Relocation & residency permits",
          "Private schooling & education consulting",
          "Personal staffing & assistants",
          "Real estate sourcing & property management",
          "Lifestyle management (travel, wellness, events)",
          "Daily support with urgent or complex personal matters",
        ],
      },
    ],
    "immigration-residency": [
      { type: 'paragraph', text: "Whether you’re an investor, business owner, foreign national, or high-net-worth individual, relocating to Cyprus comes with exciting opportunities, and our expert team is here to make your journey smooth, compliant, and successful." },
      { type: 'paragraph', text: "With deep expertise in Cyprus immigration law and a global network of professional partners, we provide comprehensive, end-to-end support across all immigration, residency, and citizenship matters." },
      { type: 'section-heading', text: "Our Services Include" },
      {
        type: 'offer-item',
        lead: "Temporary Residence and Work Permits",
        text: "Assistance for foreign-owned companies, skilled professionals, and their employees seeking legal residence and work rights in Cyprus.",
      },
      {
        type: 'offer-item',
        lead: "Employment Visa Applications",
        text: "Expert guidance and submission support for all employment-related visas, including applications, extensions, and renewals.",
      },
      {
        type: 'offer-item',
        lead: "Change of Status Applications",
        text: "Seamless transition from one visa category to another (e.g., Visitor Visa to Employment Visa), ensuring full legal compliance throughout.",
      },
      {
        type: 'offer-item',
        lead: "Investment Visas & Permanent Residence Permits",
        text: "Strategic consulting for investors and their families, including full guidance on qualifying investments, eligibility, and required documentation.",
      },
      {
        type: 'offer-item',
        lead: "Cypriot Citizenship by Investment",
        text: "Complete support at every stage of the citizenship process, from collecting required documents and filling application forms to legal representation, banking coordination, and property acquisition.",
      },
      {
        type: 'offer-item',
        lead: "Dependent Visas",
        text: "Visa applications for family members, including de-facto spouses and children, handled with care and efficiency.",
      },
      {
        type: 'offer-item',
        lead: "Full Application Handling & Coordination",
        text: "We assist with the gathering, translation, and legalisation of all necessary documents (individual and corporate), followed by coordinated processing of visas and permits through our in-house experts and trusted local partners.",
      },
      {
        type: 'offer-item',
        lead: "Banking Advisory",
        text: "We help you select the most suitable banking options, whether for account openings, transferring funds from abroad, or fulfilling immigration-related financial criteria.",
      },
      {
        type: 'offer-item',
        lead: "Investment Advisory & Property Selection",
        text: "Tailored advice on selecting the most efficient investment route based on your goals, financial situation, and family needs. We also connect you with licensed real estate agents offering high-value properties that meet your exact requirements.",
      },
      {
        type: 'offer-item',
        lead: "Property Legal Support",
        text: "Full legal services for property agreements, including review, drafting, and negotiation to ensure full protection and compliance.",
      },
      {
        type: 'offer-item',
        lead: "In-Person Support",
        text: "If required, we will escort you and your family to the Migration Department or Civil Registry, and offer ongoing representation as needed.",
      },
      {
        type: 'offer-item',
        lead: "Ongoing Monitoring & Updates",
        text: "You will receive regular updates on your application status and guidance throughout every stage of the process.",
      },
    ],
    "intellectual-property-ip-box": [
      { type: 'paragraph', text: "Your brand is more than a name, it’s your identity, your reputation, and one of your most powerful business assets. Whether you're launching something new or growing an established brand, we help you protect it with smart, strategic IP solutions." },
      { type: 'section-heading', text: "Our services include" },
      {
        type: 'list',
        items: [
          "Trademark registration, patent registration, copyright registration, design rights and database rights across Europe and internationally to secure your brand wherever you do business.",
          "Proactive legal strategies to safeguard, enforce, and maximize the value of your intellectual property.",
          "Advisory and structuring services for the Cyprus IP Box Regime, a tax incentive offering an effective tax rate of 2.5% on qualifying IP income, including patents, copyrighted software, and other eligible intangible assets.",
          "Assistance with IP ownership structuring, acquisition, assignment, and licensing agreements.",
          "Legal and tax due diligence for IP portfolios, ensuring compliance with Cyprus and international law.",
        ],
      },
      { type: 'section-heading', text: "Benefits of the Cyprus IP Box Regime" },
      {
        type: 'offer-item',
        lead: "Attracting Innovation",
        text: "The reduced tax rate incentivizes companies to invest in research and development activities. This, in turn, stimulates innovation and the creation of valuable IP assets",
      },
      {
        type: 'offer-item',
        lead: "Competitive Advantage",
        text: "The preferential tax treatment can enhance a company’s competitiveness in the global market, as it enables businesses to maximize the after-tax return on their IP-related activities.",
      },
      {
        type: 'offer-item',
        lead: "Financial Planning",
        text: "Companies can plan their finances more effectively, knowing that a significant portion of their IP income will be taxed at a reduced rate, providing stability and predictability for long-term investment.",
      },
      {
        type: 'offer-item',
        lead: "Global Expansion",
        text: "Access to a network of double tax treaties allows companies to expand their global footprint while minimizing international tax challenges",
      },
      {
        type: 'offer-item',
        lead: "Attracting Foreign Investment",
        text: "The Cyprus IP Box Regime attracts foreign investment and can serve as a getaway for companies looking to establish a presence in Europe or leverage Cyprus as a hub for their intellectual property activities.",
      },
    ],
    "legal": [
      { type: 'paragraph', text: "Our Legal & Corporate practice areas seamlessly complement our company’s full suite of services, integrating at various stages of a business or legal entity’s lifecycle to enhance values for shareholders and management. We offer comprehensive and tailored range of legal and corporate services to clients across the region, with our clients’ protection as our number one goal. From advisory support to document preparation, local logistics and tailored banking solutions, we guarantee compliance, we help our clients navigate success every step of the way." },
      { type: 'section-heading', text: "Our legal services include" },
      {
        type: 'offer-item',
        lead: "Legal Advisory for IT & Tech Companies in Cyprus",
        text: "We offer specialized legal advisory services to IT and tech companies operating in or expanding to Cyprus —helping you safeguard your innovation, scale your operations, and stay compliant with evolving regulations.",
      },
      { type: 'paragraph', text: "Whether you're launching a software platform, developing digital products, or managing sensitive user data, we provide practical legal support tailored to your business model and growth strategy." },
      { type: 'section-heading', text: "Our Services for IT & Tech Companies cover the following areas" },
      {
        type: 'offer-item',
        lead: "Company Formation & Structuring",
        text: "Set up and structure your business in Cyprus with full regulatory and tax compliance.",
      },
      {
        type: 'offer-item',
        lead: "Intellectual Property Protection",
        items: [
          "Copyright registration & enforcement",
          "Design right protection for digital products & user interfaces",
          "Trademark registration and brand strategy",
          "Licensing & IP transfer agreements",
        ],
      },
      {
        type: 'offer-item',
        lead: "Technology & Commercial Contracts",
        text: "Drafting and negotiation of software licenses, SaaS agreements, service level agreements (SLAs), reseller and distribution contracts.",
      },
      {
        type: 'offer-item',
        lead: "GDPR & Data Protection Compliance",
        text: "Ensure full compliance with EU data privacy laws, including policies, audits, and cross-border data transfer solutions.",
      },
      {
        type: 'offer-item',
        lead: "Employment & Contractor Agreements",
        text: "Tailored contracts for tech teams, including IP assignment and confidentiality clauses.",
      },
      {
        type: 'offer-item',
        lead: "Advisory for SaaS, AI, and Software Startups",
        text: "Navigate regulatory frameworks while protecting your innovation and intellectual property.",
      },
    ],
    "multifamily-office": [
      { type: 'paragraph', text: "Our Multifamily Office services are designed to help individuals and families manage their investments and assets seamlessly across multiple jurisdictions, providing the expertise and strategic planning needed for long-term success." },
      { type: 'paragraph', text: "We offer a comprehensive range of corporate and personal structuring solutions, including:" },
      {
        type: 'offer-item',
        lead: "Financial and Tax Planning",
        text: "tailored to optimize your wealth",
      },
      {
        type: 'offer-item',
        lead: "Record Keeping and Reporting",
        text: "to ensure transparency and compliance",
      },
      {
        type: 'offer-item',
        lead: "Family Succession and Estate Planning",
        text: "for smooth generational transitions",
      },
      {
        type: 'offer-item',
        lead: "Trustee and Company Management",
        text: "to ensure your assets are well-governed",
      },
      {
        type: 'offer-item',
        lead: "Philanthropy",
        text: "strategies that align with your values and legacy",
      },
      {
        type: 'offer-item',
        lead: "Smart Risk Management",
        text: "to protect your wealth from uncertainty",
      },
      {
        type: 'offer-item',
        lead: "Lifestyle Options",
        text: "to complement and enhance your personal goals and aspirations",
      },
      { type: 'paragraph', text: "With our holistic approach, we provide customized solutions that secure your financial future and ensure your wealth is effectively managed, protected, and optimized for growth." },
    ],
    "real-estate-transaction-investment": [
      { type: 'paragraph', text: "We provide comprehensive support for the acquisition of real estate and land across Europe and other international markets. Our mission is to source and secure the right property for each client, whether for personal use, development, or investment, by aligning our search precisely with your needs and objectives." },
      { type: 'paragraph', text: "From strategic property sourcing to full legal execution, our services ensure a seamless, compliant, and value-driven experience in any market." },
      { type: 'section-heading', text: "Our services cover the following areas" },
      {
        type: 'offer-item',
        lead: "Targeted Property Search",
        text: "We identify and assess real estate opportunities that match your specific investment criteria, prioritizing location, value, and long-term potential.",
      },
      {
        type: 'offer-item',
        lead: "End-to-End Legal Support",
        text: "Our experienced legal professionals guide each transaction to completion, ensuring compliance with local laws and international standards.",
      },
      {
        type: 'offer-item',
        lead: "Multijurisdictional Expertise",
        text: "With deep market knowledge and operational experience across multiple countries, we help clients navigate complex real estate environments with confidence.",
      },
    ],
    "tax-advisory": [
      { type: 'paragraph', text: "Our Tax Compliance & Planning team provides personalized, strategic support to ensure your company meets its obligations while optimizing its tax position, both in Cyprus and internationally." },
      { type: 'section-heading', text: "Our Tax Services Include" },
      {
        type: 'offer-item',
        lead: "Global Tax & VAT Planning and Optimization",
        text: "Strategic structuring and planning that reduce exposure and enhance efficiency across multiple jurisdictions.",
      },
      {
        type: 'offer-item',
        lead: "Preliminary & Annual Tax Reviews",
        text: "In-depth analysis of your company’s tax computation and financial statements to identify tax risks, assess them by risk level, and uncover opportunities for greater tax efficiency.",
      },
      {
        type: 'offer-item',
        lead: "Tax and VAT Rulings & Opinions",
        text: "Guidance on complex transactions with the option to request advance tax rulings from the Cyprus tax authorities.",
      },
      {
        type: 'offer-item',
        lead: "Timely Tax Return Submission",
        text: "Preparation and filing of corporate tax returns, ensuring full compliance with deadlines and regulations.",
      },
      {
        type: 'offer-item',
        lead: "Tax Authority Liaison & Representation",
        text: "We handle correspondence and negotiations with the Cyprus Tax Department and other authorities, including filing objections, resolving disputes, and attending meetings on your behalf.",
      },
      {
        type: 'offer-item',
        lead: "Tax Residency Certificates",
        text: "Assistance with obtaining tax residency certificates for both companies and individuals, with full documentation and follow-up support.",
      },
      {
        type: 'offer-item',
        lead: "Tax Payment Management",
        text: "We manage and process tax payments on your behalf, ensuring accuracy and timeliness.",
      },
      {
        type: 'offer-item',
        lead: "Social Insurance Registration & Compliance",
        text: "Set up and support with social insurance filings.",
      },
      {
        type: 'offer-item',
        lead: "VAT & VIES Registration and Submissions",
        text: "Accurate and timely submissions aligned with EU VAT rules.",
      },
      {
        type: 'offer-item',
        lead: "Capital Gains Tax (CGT) Computations",
        text: "Expert calculations and reporting to ensure your CGT obligations are correctly handled.",
      },
      {
        type: 'offer-item',
        lead: "Capital Statement Preparation",
        text: "Complete preparation and submission of required capital statements for individuals and businesses",
      },
      { type: 'paragraph', text: "With our smart, hands-on approach, you’ll have a trusted partner to navigate tax complexity, avoid unnecessary exposure, and ensure full regulatory compliance, all while enhancing your financial efficiency." },
    ],
  },
};

/**
 * Body blocks for a service detail page. When `locale` is 'ru' and a Russian
 * translation exists for the slug, the RU blocks are returned; otherwise the
 * English blocks are used as fallback. Existing 2-arg callers get 'en'.
 */
export function getServiceBlocks(
  group: ServiceGroup,
  slug: string,
  locale: 'en' | 'ru' = 'en',
): ServiceBlock[] | undefined {
  if (locale === 'ru') {
    const ru =
      group === 'corporate' ? SERVICE_DETAILS_RU_CORPORATE[slug] : SERVICE_DETAILS_RU_PRIVATE[slug];
    if (ru) return ru;
  }
  return SERVICE_DETAILS[group][slug];
}
