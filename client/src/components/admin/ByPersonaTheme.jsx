import React, { useState } from 'react';
import { personas } from '../../data/personas';
import { themes as themeList } from '../../data/themes';

export default function ByPersonaTheme({ analysis }) {
  const [expandedPersona, setExpandedPersona] = useState(null);

  if (!analysis || analysis.enriched.length === 0) {
    return (
      <div className="text-center" style={{ padding: 'var(--space-12)', color: 'var(--gray-400)' }}>
        <p className="heading-sm">No submissions yet</p>
        <p className="text-sm text-muted" style={{ marginTop: 'var(--space-2)' }}>
          Submissions will appear here as participants complete the exercise.
        </p>
      </div>
    );
  }

  const { byPersona } = analysis;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      {personas.map((persona) => {
        const data = byPersona[persona.id];
        const isExpanded = expandedPersona === persona.id;
        const count = data ? data.submissions.length : 0;

        return (
          <div
            key={persona.id}
            style={{
              background: 'white',
              border: '1px solid var(--gray-200)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
            }}
          >
            {/* Persona Header */}
            <button
              onClick={() => setExpandedPersona(isExpanded ? null : persona.id)}
              style={{
                width: '100%',
                padding: 'var(--space-4) var(--space-5)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'var(--font-sans)',
              }}
            >
              <div
                className="avatar avatar--sm"
                style={{ background: persona.color }}
              >
                {persona.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--gray-900)' }}>
                  {persona.name}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-500)' }}>
                  {persona.role}
                </div>
              </div>
              <span className="badge badge--brand">
                {count} question{count !== 1 ? 's' : ''}
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                style={{
                  transition: 'transform 0.2s',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  color: 'var(--gray-400)',
                }}
              >
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Expanded Content: Themed Clusters */}
            {isExpanded && data && (
              <div
                style={{
                  borderTop: '1px solid var(--gray-200)',
                  padding: 'var(--space-4) var(--space-5)',
                  animation: 'fadeIn 0.2s ease',
                }}
              >
                {Object.values(data.themes)
                  .sort((a, b) => b.questions.length - a.questions.length)
                  .map((themeGroup) => {
                    const themeInfo = themeList.find((t) => t.id === themeGroup.themeId);
                    return (
                      <div key={themeGroup.themeId} style={{ marginBottom: 'var(--space-4)' }}>
                        <div
                          style={{
                            fontSize: 'var(--text-xs)',
                            fontWeight: 600,
                            color: 'var(--gray-500)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            marginBottom: 'var(--space-2)',
                          }}
                        >
                          {themeInfo?.icon || '❓'} {themeGroup.themeName} ({themeGroup.questions.length})
                        </div>
                        {themeGroup.questions.map((q, idx) => (
                          <div
                            key={idx}
                            style={{
                              padding: 'var(--space-2) var(--space-3)',
                              background: 'var(--gray-50)',
                              borderRadius: 'var(--radius-md)',
                              marginBottom: 'var(--space-1)',
                              fontSize: 'var(--text-sm)',
                              color: 'var(--gray-700)',
                              borderLeft: '3px solid var(--brand-200)',
                            }}
                          >
                            "{q.questionText}"
                            <span className="text-xs text-muted" style={{ marginLeft: 'var(--space-2)' }}>
                              — {q.participantName}
                            </span>
                          </div>
                        ))}
                      </div>
                    );
                  })}

                {count === 0 && (
                  <p className="text-sm text-muted">No submissions for this persona yet.</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
