// Publishable client configuration. No server or OpenAI secrets belong here.
const URL = 'https://zhsrvidzhgfmqvxyxohd.supabase.co/functions/v1/website-api';
const KEY = 'sb_publishable_DoVN9hiq-HF_2w679y6wyg_9KRBh7O5';

export async function websiteApi<T>(body: Record<string, unknown>): Promise<T> {
  const response = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', apikey: KEY },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30000),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || !data) throw new Error(data?.error || 'Unable to connect. Please try again or contact team@sc-advisors.cy.');
  return data as T;
}

export async function submitWebsiteForm(kind: 'contact' | 'career', values: object, id: string, locale = 'en') {
  const result = await websiteApi<{ ok: boolean }>({ action: 'submit', kind, values, id, locale });
  if (!result.ok) throw new Error('Your message was not saved. Please try again.');
}
