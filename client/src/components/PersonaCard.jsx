import React from 'react';

export default function PersonaCard({ persona, participantName, onContinue, personaIndex, totalPersonas }) {
  return (
    <div className="main-content">
      <div className="card text-center" style={{ maxWidth: 480 }}>
        {/* Progress */}
        <p className="text-sm text-muted" style={{ marginBottom: 'var(--space-5)' }}>
          Persona {personaIndex + 1} of {totalPersonas}
        </p>

        {/* Avatar */}
        <div
          className="avatar avatar--lg"
          style={{
            background: persona.color,
            margin: '0 auto var(--space-4)',
            fontSize: '1.75rem',
          }}
        >
          {persona.avatar}
        </div>

        {/* Name & Role */}
        <h2 className="heading-md" style={{ marginBottom: 'var(--space-4)' }}>
          {persona.role}
        </h2>

        {/* Instructions */}
        <p
          style={{
            fontSize: 'var(--text-md)',
            color: 'var(--gray-600)',
            lineHeight: 'var(--leading-md)',
            marginBottom: 'var(--space-6)',
            textAlign: 'left',
            background: 'var(--gray-50)',
            padding: 'var(--space-4)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--gray-200)',
          }}
        >
          {persona.instructions}
        </p>

        <button className="btn btn--primary btn--lg btn--full" onClick={onContinue}>
          Start Chatting
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.333 9.233c.004.42-.05.838-.166 1.244a5.833 5.833 0 01-5.667 4.357h-.833L7.5 17.5v-2.667a5.833 5.833 0 01-3.333-5.267c0-3.222 2.612-5.833 5.833-5.833h.5a5.833 5.833 0 017.833 5.5z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
