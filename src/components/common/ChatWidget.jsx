import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSend, FiX, FiMessageSquare, FiMinus } from 'react-icons/fi';
import { RiHeartPulseLine, RiRobot2Line } from 'react-icons/ri';
import { sanitize, checkRateLimit } from '../../utils';

const Apiurl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/ai';

const SYSTEM_PROMPT = `You are DocsAura Assistant, a helpful and empathetic medical information assistant. 
Your role is to provide general health information, help users find appropriate doctors, and answer common medical questions.
Always include a disclaimer that you are not a substitute for professional medical advice.
Keep responses concise, friendly, and under 150 words.
Never diagnose conditions or prescribe treatments.`;

export default function ChatWidget() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    setMessages([
      { role: 'assistant', content: t('chat.greeting') }
    ]);
  }, [i18n.language, t]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open && !minimized) inputRef.current?.focus();
  }, [open, minimized]);

  const sendMessage = useCallback(async (text) => {
    const clean = sanitize(text.trim());
    if (!clean || clean.length > 500) return;
    if (!checkRateLimit()) {
      setError(t('chat.rateLimitError'));
      return;
    }
    setError('');
    const userMsg = { role: 'user', content: clean };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = [...messages, userMsg]
        .filter(m => m.role !== 'system')
        .map(m => ({ role: m.role, content: m.content }));

      const response = await fetch(`${Apiurl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: clean,
          lang: i18n.language,
          history: history.slice(-6)
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error || 'API error');
      }

      const data = await response.json();

      let reply = t('chat.fallbackError');

      if (data.success && data.data) {
        reply = data.data;
      } else if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: t('chat.connectionError')
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [messages, t, i18n.language]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) sendMessage(input);
  };

  const suggestions = t('chat.suggestions', { returnObjects: true });

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 cursor-pointer right-5 z-50 w-14 h-14 rounded-full bg-teal-700 hover:bg-teal-600 text-white shadow-lg transition-all hover:scale-105 flex items-center justify-center"
          aria-label="Open chat"
        >
          <FiMessageSquare size={22} />
        </button>
      )}

      {open && (
        <div
          className={`fixed bottom-6 right-5 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col animate-chat-appear overflow-hidden transition-all duration-200 ${minimized ? 'h-16' : 'h-[520px]'
            }`}
        >
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-teal-700 to-teal-600 shrink-0">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <RiHeartPulseLine size={17} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-none">
                {t('chat.title')}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <p className="text-teal-100 text-xs">{t('chat.online')}</p>
              </div>
            </div>
            <button
              onClick={() => setMinimized(p => !p)}
              className="text-white/70 hover:text-white p-1 transition-colors"
            >
              <FiMinus size={17} />
            </button>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white p-1 transition-colors"
            >
              <FiX size={17} />
            </button>
          </div>

          {!minimized && (
            <>
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50/50">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                        <RiRobot2Line size={14} className="text-teal-600" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'
                        }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex gap-2 justify-start">
                    <div className="w-7 h-7 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                      <RiRobot2Line size={14} className="text-teal-600" />
                    </div>
                    <div className="chat-bubble-ai px-4 py-3 flex items-center gap-1.5">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  </div>
                )}

                {error && (
                  <p className="text-center text-xs text-red-500 bg-red-50 rounded-lg py-2 px-3">
                    {error}
                  </p>
                )}

                <div ref={bottomRef} />
              </div>

              {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-col gap-1.5 bg-slate-50/50">
                  {Array.isArray(suggestions) &&
                    suggestions.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(s)}
                        className="text-left text-xs text-teal-700 bg-white border border-teal-100 rounded-xl px-3 py-2 hover:bg-teal-50 hover:border-teal-300 transition-colors truncate"
                      >
                        {s}
                      </button>
                    ))}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="flex items-end gap-2 px-3 py-3 border-t border-slate-100 bg-white shrink-0"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value.slice(0, 500))}
                  placeholder={t('chat.placeholder')}
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-teal-400 focus:bg-white transition-all resize-none"
                  disabled={loading}
                  maxLength={500}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 rounded-xl bg-teal-700 hover:bg-teal-600 text-white flex items-center justify-center shrink-0 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSend size={15} />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}