import React, { useState, useRef, useEffect } from 'react';

const API_BASE = '/api';

// Typing indicator component
function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 4, padding: '4px 0' }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--gray-400)',
            animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function ChatInterface({ persona, participantName, organization, sessionId, onComplete, personaIndex, totalPersonas }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const MIN_QUESTIONS = 3;
  const MAX_QUESTIONS = 5;

  // AI responses after each question
  const aiResponses = [
    "Great question! What else would you ask?",
    "Interesting — what other questions come to mind?",
    "Love it! What else would be helpful?",
    "That's a practical one. What other info would make this role easier?",
    "Excellent! Anything else?",
  ];

  // Initial AI greeting — uses role, not fictional name
  useEffect(() => {
    setMessages([]);
    setQuestionCount(0);
    setInput('');
    const timer = setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            type: 'ai',
            text: `You're now the ${persona.role}.\n\n${persona.instructions}\n\nIf you had an AI assistant connected to your dental software, what would you ask it?`,
          },
        ]);
      }, 600);
    }, 200);
    return () => clearTimeout(timer);
  }, [persona.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendQuestion = async () => {
    const text = input.trim();
    if (!text || isSending || questionCount >= MAX_QUESTIONS) return;

    setInput('');
    setIsSending(true);
    const newCount = questionCount + 1;
    setQuestionCount(newCount);

    // Add user message
    setMessages((prev) => [...prev, { type: 'user', text }]);

    // Save to backend immediately
    try {
      await fetch(`${API_BASE}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participantName,
          organization,
          personaId: persona.id,
          personaName: persona.name,
          personaRole: persona.role,
          questionText: text,
          questionNumber: newCount,
          sessionId,
        }),
      });
    } catch (err) {
      console.error('Failed to save submission:', err);
    }

    // AI response after a delay
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      if (newCount >= MAX_QUESTIONS) {
        setMessages((prev) => [
          ...prev,
          {
            type: 'ai',
            text: `That's ${newCount} questions — nice work! Let's move on.`,
          },
        ]);
      } else if (newCount >= MIN_QUESTIONS) {
        setMessages((prev) => [
          ...prev,
          {
            type: 'ai',
            text: `${aiResponses[(newCount - 1) % aiResponses.length]}\n\nYou've got ${newCount}. Add more or tap "Next Persona" to move on.`,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { type: 'ai', text: aiResponses[(newCount - 1) % aiResponses.length] },
        ]);
      }
      setIsSending(false);
      inputRef.current?.focus();
    }, 500 + Math.random() * 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendQuestion();
    }
  };

  const canFinish = questionCount >= MIN_QUESTIONS;
  const isMaxed = questionCount >= MAX_QUESTIONS;
  const isLastPersona = personaIndex === totalPersonas - 1;
  const nextLabel = isLastPersona ? 'Finish Exercise' : 'Next Persona';

  return (
    <div className="main-content" style={{ padding: 'var(--space-4)', justifyContent: 'flex-start', paddingTop: 'var(--space-4)' }}>
      <div className="card card--chat">
        {/* Chat Header */}
        <div
          style={{
            padding: 'var(--space-4) var(--space-5)',
            borderBottom: '1px solid var(--gray-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div
              className="avatar avatar--sm"
              style={{ background: persona.color }}
            >
              {persona.avatar}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--gray-900)' }}>
                {persona.role}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-500)' }}>
                Persona {personaIndex + 1} of {totalPersonas}
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--gray-500)',
              background: 'var(--gray-100)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 500,
            }}
          >
            {questionCount} / {MIN_QUESTIONS}-{MAX_QUESTIONS}
          </div>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: 'var(--space-4) var(--space-5)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
          }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                animation: 'fadeInUp 0.3s ease-out',
              }}
            >
              <div
                style={{
                  maxWidth: '80%',
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius:
                    msg.type === 'user'
                      ? 'var(--radius-xl) var(--radius-xl) var(--radius-sm) var(--radius-xl)'
                      : 'var(--radius-xl) var(--radius-xl) var(--radius-xl) var(--radius-sm)',
                  background: msg.type === 'user' ? 'var(--brand-600)' : 'var(--gray-100)',
                  color: msg.type === 'user' ? 'white' : 'var(--gray-800)',
                  fontSize: 'var(--text-sm)',
                  lineHeight: 'var(--leading-sm)',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: 'var(--radius-xl) var(--radius-xl) var(--radius-xl) var(--radius-sm)',
                  background: 'var(--gray-100)',
                }}
              >
                <TypingIndicator />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div
          style={{
            borderTop: '1px solid var(--gray-200)',
            padding: 'var(--space-3) var(--space-4)',
          }}
        >
          {/* Progress indicator */}
          {questionCount > 0 && questionCount < MIN_QUESTIONS && (
            <div
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--gray-500)',
                marginBottom: 'var(--space-2)',
                textAlign: 'center',
              }}
            >
              {MIN_QUESTIONS - questionCount} more question{MIN_QUESTIONS - questionCount > 1 ? 's' : ''} to go
            </div>
          )}

          {isMaxed ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-2)' }}>
              <button className="btn btn--primary btn--lg btn--full" onClick={() => onComplete(questionCount)}>
                {nextLabel}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-end' }}>
              <input
                ref={inputRef}
                className="input"
                type="text"
                placeholder={
                  questionCount === 0
                    ? 'What would the ' + persona.role + ' ask?'
                    : 'Ask another question...'
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isSending}
                style={{ flex: 1 }}
                autoFocus
              />
              <button
                className="btn btn--primary"
                onClick={sendQuestion}
                disabled={!input.trim() || isSending}
                style={{ flexShrink: 0, padding: '10px 14px' }}
                aria-label="Send"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 2.5l-7.5 15-2.5-6.25L1.25 8.75l16.25-6.25z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 2.5l-10 8.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          )}

          {canFinish && !isMaxed && (
            <button
              className="btn btn--ghost btn--full"
              style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)' }}
              onClick={() => onComplete(questionCount)}
            >
              {nextLabel} ({questionCount} questions submitted)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
