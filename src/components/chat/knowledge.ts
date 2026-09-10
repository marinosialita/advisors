import { websiteApi } from '@/lib/website-api';

export type ChatMsg = { role: 'user' | 'assistant'; content: string };

export async function askOpenAI(history: ChatMsg[]): Promise<string> {
  const data = await websiteApi<{ reply: string }>({ action: 'chat', messages: history });
  return data.reply;
}
