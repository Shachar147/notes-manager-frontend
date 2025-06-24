import React, { useState, useRef, useEffect } from 'react';
import styles from './chat-widget.module.css';
import { chatApiService, ChatNoteRef } from '../services/chat-api.service';
import Icon from '../../../common/components/icon/icon';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  notes?: ChatNoteRef[];
}

const initialMessages: Message[] = [
  { sender: 'bot', text: 'Hi! How can I help you today?' }
];

// Utility to parse Markdown code blocks
function parseMessageWithCodeBlocks(text: string) {
  const regex = /```([a-zA-Z0-9]*)\n([\s\S]*?)```/g;
  const parts: Array<{ type: 'text' | 'code'; content: string; lang?: string }> = [];
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'code', content: match[2], lang: match[1] });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) });
  }
  return parts;
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const conversationRef = useRef<HTMLDivElement>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  useEffect(() => {
    if (open && conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function handleSend(e?: React.FormEvent) {
    e?.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { sender: 'user', text: input }]);
    setInput('');
    setLoading(true);
    setError(null);
    try {
      const res = await chatApiService.chat(input);
      setMessages((msgs) => [
        ...msgs,
        {
          sender: 'bot',
          text: res.data.answer,
          notes: res.data.notes,
        },
      ]);
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
        err?.message ||
        'Sorry, something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  }

  function handleCopy(code: string, idx: number) {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1200);
  }

  function renderBotMessage(msg: Message, idx: number) {
    const parts = parseMessageWithCodeBlocks(msg.text);
    return (
      <div key={idx} className={styles.botMsg} aria-live="polite">
        {parts.map((part, i) =>
          part.type === 'code' ? (
            <div className={styles.codeBlockWrapper} key={i}>
              <button
                className={styles.copyBtn}
                onClick={() => handleCopy(part.content, i)}
                aria-label="Copy code"
                type="button"
              >
                {copiedIdx === i ? 'Copied!' : 'Copy'}
              </button>
              <pre className={styles.codeBlock}>
                <code>{part.content}</code>
              </pre>
            </div>
          ) : (
            <span key={i}>{part.content}</span>
          )
        )}
        {msg.notes && msg.notes.length > 0 && (
          <div className={styles.noteLinks}>
            {msg.notes.map((note) => (
              <a
                key={note.id}
                href={`/#note-${note.id}`}
                className={styles.noteLink}
                // target="_blank"
                rel="noopener noreferrer"
              >
                📄 {note.title}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {!open && (
        <button
          className={styles.fab}
          aria-label="Open chat"
          onClick={() => setOpen(true)}
        >
          <Icon name="comment" size="lg" />
        </button>
      )}
      {open && (
        <div className={styles.overlay}>
          <div className={styles.chatWindow} role="dialog" aria-modal="true" aria-label="Chatbot">
            <header className={styles.header}>
              <span>Chatbot</span>
              <button
                className={styles.closeBtn}
                aria-label="Close chat"
                onClick={() => setOpen(false)}
              >
                <Icon name="times" size="lg" />
              </button>
            </header>
            <div className={styles.conversation} ref={conversationRef}>
              {messages.map((msg, idx) =>
                msg.sender === 'user' ? (
                  <div key={idx} className={styles.userMsg} aria-live="polite">
                    {msg.text}
                  </div>
                ) : (
                  renderBotMessage(msg, idx)
                )
              )}
              {loading && <div className={styles.loading}>Thinking…</div>}
              {error && <div className={styles.error}>{error}</div>}
            </div>
            <form className={styles.inputArea} onSubmit={handleSend}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your question…"
                aria-label="Type your question"
                disabled={loading}
                className={styles.input}
              />
              <button type="submit" className={styles.sendBtn} disabled={loading || !input.trim()}>
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatWidget; 