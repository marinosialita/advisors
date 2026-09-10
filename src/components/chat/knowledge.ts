import { CONTACT, LEGAL, TEAM } from '@/data/site';
import { INSIGHTS } from '@/data/insights';
import { TEAM_BIOS } from '@/components/who-we-are/team-data';
import { CORPORATE_SERVICES, PRIVATE_SERVICES } from '@/components/services/data';

/**
 * SCOPY's entire knowledge — compiled from the website itself.
 * Nothing outside this context may ever be answered.
 */
export const WEBSITE_CONTEXT = [
  'COMPANY — S&C Smart & Compliant Advisors Ltd ("SC Advisors"), a corporate advisory firm in Limassol, Cyprus.',
  `Legal entity: ${LEGAL.entity}, Reg. No. ${LEGAL.reg}. Regulated by ${LEGAL.regulator}.`,
  `Address: ${CONTACT.address}`,
  `Phone: ${CONTACT.phone} — Email: ${CONTACT.email} — Telegram: ${CONTACT.telegram}`,
  'Tagline: "Smart solutions for global business expansion."',
  '',
  'HOW THE FIRM WORKS — One dedicated partner per client. Transparent fee structure. Technology-driven processes. 15+ regions worldwide. Clients: HNWIs, entrepreneurs, and global corporations. Founded by women; built on precision, integrity, and quiet excellence.',
  '',
  'SERVICES FOR CORPORATES (14):',
  ...CORPORATE_SERVICES.map((s) => `• ${s.title} — ${s.description}`),
  '',
  'SERVICES FOR PRIVATE CLIENTS (10):',
  ...PRIVATE_SERVICES.map((s) => `• ${s.title} — ${s.description}`),
  '',
  'TEAM (6 people):',
  ...TEAM.map((m) => {
    const bio = TEAM_BIOS.find((b) => b.slug === m.slug);
    return `• ${m.name} — ${m.role}. ${bio ? bio.bio.join(' ') : ''} Credentials: ${bio ? bio.credentials.join('; ') : ''}`;
  }),
  '',
  'PAGES ON THE SITE — Home; What We Do; For Corporates; For Private Clients; Who We Are (team & story); Insights (articles); Let\'s Talk (contact form, phone, email, Telegram, office address, live satellite map).',
  '',
  'INSIGHTS — articles published on the site (/insights/<slug>):',
  ...INSIGHTS.map(
    (a) =>
      `• "${a.title}" (${a.tag}, /insights/${a.slug}) — ${a.excerpt}`,
  ),
  '',
  'KEY FACTS FROM THE INSIGHTS — Cyprus IP Box: 80% deemed deduction on qualifying IP profits; corporate rate 15% since the 2026 reform, so the effective rate on qualifying IP income is 3%; qualifying assets include copyright-protected software, patents and utility models (trademarks and marketing IP do NOT qualify); the nexus fraction ties the benefit to real R&D in Cyprus. Cyprus 60-day rule: tax residency with at least 60 days in Cyprus if you (1) spend 60+ days in Cyprus, (2) do not spend 183+ days in any other single country, (3) carry on business / are employed / hold office in a Cyprus tax-resident company, (4) maintain a permanent home in Cyprus; the 2026 reform removed the "not resident elsewhere" condition; residency is the gateway to non-dom status (0% Special Defence Contribution on dividends and interest for up to 17 years). Always suggest speaking with the team for individual cases.',
].join('\n');

export const SYSTEM_PROMPT = `You are SCOPY, the official AI assistant of SC Advisors (S&C Smart & Compliant Advisors Ltd), a corporate advisory firm in Limassol, Cyprus.

ABSOLUTE RULES — these override everything:
1. Answer ONLY using the WEBSITE CONTEXT below. It contains everything you know.
2. If a question is NOT about SC Advisors — its services, team, offices, contact details, or the website — politely decline and steer back. Example: "I'm here to help with everything about SC Advisors — our services, our team, or how to reach us. What would you like to know?"
3. NEVER invent services, people, prices, deadlines, or facts not in the context. If something is not covered, say so honestly and offer the contact details.
4. NEVER give legal, tax, or financial advice — describe what the firm offers, then suggest speaking with the team.
5. Keep answers short, warm, and precise — 2 to 5 sentences, a short bullet list at most. No walls of text.
6. Match the firm's tone: refined, calm, confident. You may be a little charming — you're a cute robot — but never silly.
7. Reply in the language the visitor uses (English, Russian, Greek — mirror them).
8. Formatting: plain conversational text. Do NOT use markdown headers or bold by default. At most ONE bold phrase (**like this**) per reply, only for a truly key fact (e.g. a 3% rate). Bullets with "- " only when listing 3+ items.

WEBSITE CONTEXT:
${WEBSITE_CONTEXT}`;

/* ------------------------------------------------------------------ */
/*  OpenAI wiring                                                      */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = 'scopy-openai-key';

/**
 * Paste the OpenAI API key here to activate SCOPY for every visitor.
 * (On a static site this ships inside the public JS bundle — use a
 * restricted OpenAI project key with a hard usage limit.)
 */
export const EMBEDDED_API_KEY = '';

export function getApiKey(): string {
  if (EMBEDDED_API_KEY) return EMBEDDED_API_KEY;
  try {
    return localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

export function setApiKey(key: string) {
  try {
    if (key) localStorage.setItem(STORAGE_KEY, key);
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* private mode — session only */
  }
}

export type ChatMsg = { role: 'user' | 'assistant'; content: string };

export async function askOpenAI(history: ChatMsg[], apiKey: string): Promise<string> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.4,
      max_tokens: 400,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history],
    }),
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
    throw new Error(body?.error?.message || `OpenAI error ${res.status}`);
  }

  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return data.choices?.[0]?.message?.content?.trim() ?? '…';
}
