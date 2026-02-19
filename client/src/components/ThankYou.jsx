import React from 'react';
import { personas } from '../data/personas';

export default function ThankYou({ participantName, totalQuestions, personaQuestions }) {
  return (
    <div className="main-content">
      <div className="card text-center" style={{ maxWidth: 520 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 'var(--radius-full)',
            background: 'var(--success-50)',
            border: '2px solid var(--success-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--space-5)',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17l-5-5" stroke="var(--success-600)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="heading-lg" style={{ marginBottom: 'var(--space-3)' }}>
          Thanks, {participantName}!
        </h1>

        <p
          style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--gray-600)',
            lineHeight: 'var(--leading-lg)',
            marginBottom: 'var(--space-6)',
          }}
        >
          Your questions will help shape the future of AI in dentistry.
        </p>

        {/* Summary stats */}
        <div
          style={{
            background: 'var(--gray-50)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5)',
            border: '1px solid var(--gray-200)',
            marginBottom: 'var(--space-4)',
          }}
        >
          <div style={{ fontSize: 'var(--text-display-xs)', fontWeight: 700, color: 'var(--brand-600)', marginBottom: 'var(--space-1)' }}>
            {totalQuestions}
          </div>
          <div style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-500)', marginBottom: 'var(--space-4)' }}>
            total questions across {personas.length} personas
          </div>

          {/* Per-persona breakdown */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {personas.map((p) => {
              const count = personaQuestions[p.id] || 0;
              return (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-2) var(--space-3)',
                    background: 'white',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--gray-200)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <div
                      className="avatar avatar--sm"
                      style={{ background: p.color, width: 24, height: 24, fontSize: '10px' }}
                    >
                      {p.avatar}
                    </div>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-700)' }}>
                      {p.role}
                    </span>
                  </div>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--brand-600)' }}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-xs text-muted">
          You can close this window now. Enjoy the rest of Orbit!
        </p>
      </div>
    </div>
  );
}
