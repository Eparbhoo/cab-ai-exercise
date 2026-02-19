import React, { useState } from 'react';

export default function ByThemeOnly({ analysis }) {
  const [expandedTheme, setExpandedTheme] = useState(null);

  if (!analysis || analysis.enriched.length === 0) {
    return (
      <div className="text-center" style={{ padding: 'var(--space-12)', color: 'var(--gray-400)' }}>
        <p className="heading-sm">No submissions yet</p>
        <p className="text-sm text-muted" style={{ marginTop: 'var(--space-2)' }}>
          Theme analysis will appear here as questions come in.
        </p>
      </div>
    );
  }

  const { byTheme } = analysis;
  const totalQuestions = analysis.enriched.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      {byTheme.map((theme, idx) => {
        const isExpanded = expandedTheme === theme.id;
        const percentage = Math.round((theme.questions.length / totalQuestions) * 100);

        return (
          <div
            key={theme.id}
            style={{
              background: 'white',
              border: '1px solid var(--gray-200)',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setExpandedTheme(isExpanded ? null : theme.id)}
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
              {/* Rank */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 'var(--radius-full)',
                  background: idx < 3 ? 'var(--brand-600)' : 'var(--gray-200)',
                  color: idx < 3 ? 'white' : 'var(--gray-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: 'var(--text-xs)',
                  flexShrink: 0,
                }}
              >
                {idx + 1}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ fontSize: '16px' }}>{theme.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--gray-900)' }}>
                    {theme.name}
                  </span>
                </div>
                {/* Progress bar */}
                <div
                  style={{
                    height: 4,
                    background: 'var(--gray-100)',
                    borderRadius: 'var(--radius-full)',
                    marginTop: 'var(--space-2)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${percentage}%`,
                      background: idx < 3 ? 'var(--brand-500)' : 'var(--gray-400)',
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 0.5s ease',
                    }}
                  />
                </div>
              </div>

              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--gray-900)' }}>
                  {theme.questions.length}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-500)' }}>
                  {percentage}%
                </div>
              </div>

              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                style={{
                  transition: 'transform 0.2s',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  color: 'var(--gray-400)',
                  flexShrink: 0,
                }}
              >
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {isExpanded && (
              <div
                style={{
                  borderTop: '1px solid var(--gray-200)',
                  padding: 'var(--space-4) var(--space-5)',
                  animation: 'fadeIn 0.2s ease',
                }}
              >
                {theme.questions.map((q, qIdx) => (
                  <div
                    key={qIdx}
                    style={{
                      padding: 'var(--space-3)',
                      background: 'var(--gray-50)',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: 'var(--space-2)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--space-3)',
                    }}
                  >
                    <div
                      className="avatar avatar--sm"
                      style={{
                        background: q.analysis?.theme?.themeId ? 'var(--brand-100)' : 'var(--gray-200)',
                        color: 'var(--brand-700)',
                        fontSize: 'var(--text-xs)',
                        marginTop: 2,
                      }}
                    >
                      {q.personaName?.split(' ').map(n => n[0]).join('') || '?'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-800)', lineHeight: 'var(--leading-sm)' }}>
                        "{q.questionText}"
                      </p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-500)', marginTop: 2 }}>
                        {q.participantName} as {q.personaName} ({q.personaRole})
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
