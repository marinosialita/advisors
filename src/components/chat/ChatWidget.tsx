import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScopyFace } from './ScopyRobot';
import { askOpenAI, type ChatMsg } from './knowledge';
import { websiteApi } from '@/lib/website-api';

const SUGGESTIONS = [
  'What services do you offer?',
  'Who is on the team?',
  'How can I contact you?',
  'What is the IP Box regime?',
];

const GREETING =
  "Hello — I'm SCOPY, the SC Advisors assistant. Ask me anything about our services, our team, or how to reach us.";

type Msg = ChatMsg & { id: number };

let nextId = 1;

/** Inline **bold** -> styled <strong> (no raw asterisks ever shown). */
function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-bone">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  );
}

/**
 * Minimal markdown for assistant replies: paragraphs, "- " bullet lists and
 * **bold**. Anything else renders as plain text.
 */
function MessageText({ content }: { content: string }) {
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (!list.length) return;
    blocks.push(
      <ul key={`l${blocks.length}`} className="mt-2 space-y-1.5">
        {list.map((li, j) => (
          <li key={j} className="flex gap-2.5">
            <span className="mt-[9px] block h-px w-3 shrink-0 bg-bronze" aria-hidden="true" />
            <span>{renderInline(li)}</span>
          </li>
        ))}
      </ul>,
    );
    list = [];
  };
  content.split('\n').forEach((line, i) => {
    const t = line.trim();
    if (t.startsWith('- ') || t.startsWith('• ') || t.startsWith('* ')) {
      list.push(t.slice(2));
      return;
    }
    flush();
    if (t) blocks.push(<p key={`p${i}`} className={blocks.length ? 'mt-2.5' : ''}>{renderInline(t)}</p>);
  });
  flush();
  return <>{blocks}</>;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [blink, setBlink] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ id: 0, role: 'assistant', content: GREETING }]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const conversationVersion = useRef(0);
  const pending = useRef(false);
  const [chatReady, setChatReady] = useState<boolean | null>(null);
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    websiteApi<{ chatReady: boolean }>({ action: 'status' })
      .then(data => { if (!cancelled) setChatReady(data.chatReady); })
      .catch(() => { if (!cancelled) setChatReady(false); });
    return () => { cancelled = true; };
  }, [open]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* blink loop — the little robot feels alive */
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;
    const loop = () => {
      if (cancelled) return;
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
      timeout = setTimeout(loop, 2200 + Math.random() * 2600);
    };
    timeout = setTimeout(loop, 1500);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  /* autoscroll + focus */
  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open, messages, busy]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || pending.current) return;
      pending.current = true;
      const version = conversationVersion.current;

      const history: Msg[] = [...messages, { id: nextId++, role: 'user', content: trimmed }];
      setMessages(history);
      setInput('');
      setBusy(true);

      try {
        const reply = await askOpenAI(
          history.slice(-12).map((m) => ({ role: m.role, content: m.content })),
        );
        if (version !== conversationVersion.current) return;
        setMessages((m) => [...m, { id: nextId++, role: 'assistant', content: reply }]);
      } catch (err) {
        if (version !== conversationVersion.current) return;
        const detail = err instanceof Error ? err.message : 'unknown error';
        setMessages((m) => [
          ...m,
          {
            id: nextId++,
            role: 'assistant',
            content: `I'm having trouble thinking right now (${detail}). You can always reach the team directly at team@sc-advisors.cy or +357 25005284.`,
          },
        ]);
      } finally {
        if (version === conversationVersion.current) {
          pending.current = false;
          setBusy(false);
        }
      }
    },
    [messages],
  );


  const newChat = () => {
    conversationVersion.current += 1;
    pending.current = false;
    setBusy(false);
    setInput('');
    setMessages([{ id: nextId++, role: 'assistant', content: GREETING }]);
    inputRef.current?.focus();
  };

  return (
    <>
      {/* ---------------- floating robot button ---------------- */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close SCOPY chat' : 'Chat with SCOPY, the SC Advisors assistant'}
        className="fixed bottom-6 right-6 z-[110] cursor-pointer border-0 bg-transparent p-0 md:bottom-8 md:right-8"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        <motion.span
          className="block"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
        >
          <ScopyFace size={64} blink={blink} />
        </motion.span>
        {!open && (
          <span
            className="absolute -right-0.5 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-bronze font-mono text-[9px] font-bold text-ink ring-2 ring-ink"
            aria-hidden="true"
          >
            1
          </span>
        )}
      </motion.button>

      {/* ---------------- chat panel ---------------- */}
      <AnimatePresence>
        {open && (
          <motion.section
            aria-label="SCOPY — SC Advisors AI assistant"
            className="fixed bottom-24 right-4 z-[110] flex w-[calc(100vw-2rem)] max-w-[392px] flex-col overflow-hidden rounded-2xl border border-bone/10 bg-ink shadow-[0_30px_80px_rgba(0,0,0,0.65)] md:bottom-28 md:right-8"
            style={{ height: 'min(560px, calc(100dvh - 9rem))' }}
            initial={{ opacity: 0, y: 24, scale: 0.92, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          >
            {/* header */}
            <header className="flex items-center gap-2 border-b border-bone/10 bg-[#111111] px-3 py-4">
              <div className="shrink-0">
                <ScopyFace size={32} blink={blink} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="whitespace-nowrap font-display text-[14px] min-[380px]:text-[16px] leading-tight text-bone">
                  SCOPY <span className="italic text-bronze">— SC Advisors AI</span>
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-bone/45">
                  <span className={`h-1.5 w-1.5 rounded-full ${chatReady ? 'bg-emerald-400' : 'bg-bronze'}`} />
                  {chatReady ? 'Ask about SC Advisors' : chatReady === null ? 'Connecting…' : 'Contact our team'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="cursor-pointer border-0 bg-transparent p-1 text-bone/50 transition-colors hover:text-bronze"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 4l10 10M14 4L4 14" />
                </svg>
              </button>
            </header>

            {chatReady ? (
              <>
                <div className="flex shrink-0 justify-end border-b border-bone/10 px-4 py-2">
                  <button
                    type="button"
                    onClick={newChat}
                    className="rounded-full border border-bronze/40 px-3 py-1 text-sm text-bronze transition-colors hover:bg-bronze hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-bronze"
                  >
                    New chat
                  </button>
                </div>
                {/* messages */}
                <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-5" style={{ scrollbarWidth: 'thin' }}>
                  {messages.map((m) => (
                    <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {m.role === 'assistant' && (
                        <div className="mr-2.5 mt-1 shrink-0 self-start">
                          <ScopyFace size={26} blink={blink} />
                        </div>
                      )}
                      <div
                        className={
                          m.role === 'user'
                            ? 'max-w-[78%] rounded-2xl rounded-br-sm px-4 py-2.5 text-[13.5px] leading-relaxed text-ink'
                            : 'max-w-[82%] rounded-2xl rounded-bl-sm border border-bone/10 bg-[#161616] px-4 py-2.5 text-[13.5px] leading-relaxed text-bone/90'
                        }
                        style={m.role === 'user' ? { background: 'linear-gradient(150deg,#FF9663,#E56A1E)' } : undefined}
                      >
                        {m.role === 'assistant' ? <MessageText content={m.content} /> : m.content}
                      </div>
                    </div>
                  ))}

                  {busy && (
                    <div className="flex justify-start">
                      <div className="mr-2.5 shrink-0 self-start">
                        <ScopyFace size={26} blink={blink} />
                      </div>
                      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-bone/10 bg-[#161616] px-4 py-3">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="h-1.5 w-1.5 rounded-full bg-bronze"
                            animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* suggestions */}
                {messages.length <= 1 && (
                  <div className="flex flex-wrap gap-2 px-4 pb-3">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => void send(s)}
                        className="cursor-pointer rounded-full border border-bronze/40 bg-transparent px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-bronze transition-colors hover:bg-bronze hover:text-ink"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* input */}
                <form
                  className="flex items-center gap-2 border-t border-bone/10 bg-[#111111] px-4 py-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    void send(input);
                  }}
                >
                  <input
                    ref={inputRef}
                    maxLength={1500}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about SC Advisors…"
                    aria-label="Message SCOPY"
                    className="min-w-0 flex-1 rounded-full border border-bone/15 bg-ink px-4 py-2.5 text-[13.5px] text-bone placeholder:text-bone/35 focus:border-bronze focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={busy || !input.trim()}
                    aria-label="Send message"
                    className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ background: 'linear-gradient(150deg,#FF9663,#E56A1E)' }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M2 8h11M9 3.5L13.5 8 9 12.5" />
                    </svg>
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
                <ScopyFace size={72} blink={blink} />
                <p role="status" className="text-base leading-relaxed text-bone/80">
                  {chatReady === null ? 'Connecting…' : 'SCOPY is currently unavailable. Our team can help you directly.'}
                </p>
                <a href="mailto:team@sc-advisors.cy" className="text-bronze underline">team@sc-advisors.cy</a>
                <a href="tel:+35725005284" className="text-bronze underline">+357 25005284</a>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
