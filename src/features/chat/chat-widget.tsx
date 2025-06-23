import React, { useState, useRef, useEffect } from 'react';
import styles from './chat-widget.module.css';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const initialMessages: Message[] = [
  { sender: 'bot', text: 'Hi! How can I help you today?' }
];

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const conversationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { sender: 'user', text: input }]);
    setInput('');
    setLoading(true);
    setError(null);
    // Mock API call
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { sender: 'bot', text: 'This is a mock response. (API integration coming soon!)' }
      ]);
      setLoading(false);
    }, 1200);
  };

  return (
    <>
      {!open && (
        <button
          className={styles.fab}
          aria-label="Open chat"
          onClick={() => setOpen(true)}
        >
          💬
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
                ×
              </button>
            </header>
            <div className={styles.conversation} ref={conversationRef}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={
                    msg.sender === 'user' ? styles.userMsg : styles.botMsg
                  }
                  aria-live="polite"
                >
                  {msg.text}
                </div>
              ))}
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
};

export default ChatWidget; 