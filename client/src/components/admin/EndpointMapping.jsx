import React, { useState } from 'react';

function CoverageBadge({ coverage }) {
  const map = {
    covered: { label: 'Fully Covered', cls: 'badge--covered', icon: '\u2705' },
    partial: { label: 'Partially Covered', cls: 'badge--partial', icon: '\u26A0\uFE0F' },
    not_covered: { label: 'Not Covered', cls: 'badge--not-covered', icon: '\u274C' },
  };
  const info = map[coverage] || map.not_covered;
  return (
    <span className={`badge ${info.cls}`}>
      {info.icon} {info.label}
    </span>
  );
}

export default function EndpointMapping({ analysis }) {
  const [activeFilter, setActiveFilter] = useState('all');

  if (!analysis || analysis.enriched.length === 0) {
    return (
      <div className="text-center" style={{ padding: 'var(--space-12)', color: 'var(--gray-400)' }}>
        <p className="heading-sm">No submissions yet</p>
        <p className="text-sm text-muted" style={{ marginTop: 'var(--space-2)' }}>
          Endpoint mapping analysis will appear here as questions come in.
        </p>
      </div>
    );
  }

  const { byCoverage, stats } = analysis;

  const sections = [
    { key: 'all', label: 'All', count: stats.totalQuestions },
    { key: 'covered', label: 'Covered', count: stats.coveredCount, icon: '\u2705' },
    { key: 'partial', label: 'Partial', count: stats.partialCount, icon: '\u26A0\uFE0F' },
    { key: 'not_covered', label: 'Not Covered', count: stats.notCoveredCount, icon: '\u274C' },
  ];

  const filteredQuestions =
    activeFilter === 'all' ? analysis.enriched : byCoverage[activeFilter] || [];

  return (
    <div>
      {/* Coverage Summary */}
      <div className="stat-row" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="stat-card" style={{ borderLeft: '4px solid var(--success-500)' }}>
          <div className="stat-card__value" style={{ color: 'var(--success-600)' }}>{stats.coveredCount}</div>
          <div className="stat-card__label">Covered by API</div>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid var(--warning-500)' }}>
          <div className="stat-card__value" style={{ color: 'var(--warning-600)' }}>{stats.partialCount}</div>
          <div className="stat-card__label">Partially Covered</div>
        </div>
        <div className="stat-card" style={{ borderLeft: '4px solid var(--error-500)' }}>
          <div className="stat-card__value" style={{ color: 'var(--error-600)' }}>{stats.notCoveredCount}</div>
          <div className="stat-card__label">No Endpoint (Gaps)</div>
        </div>
      </div>

      {/* Coverage % bar */}
      <div
        style={{
          display: 'flex',
          height: 8,
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          marginBottom: 'var(--space-6)',
          background: 'var(--gray-100)',
        }}
      >
        {stats.coveredCount > 0 && (
          <div
            style={{
              width: `${(stats.coveredCount / stats.totalQuestions) * 100}%`,
              background: 'var(--success-500)',
              transition: 'width 0.5s ease',
            }}
          />
        )}
        {stats.partialCount > 0 && (
          <div
            style={{
              width: `${(stats.partialCount / stats.totalQuestions) * 100}%`,
              background: 'var(--warning-500)',
              transition: 'width 0.5s ease',
            }}
          />
        )}
        {stats.notCoveredCount > 0 && (
          <div
            style={{
              width: `${(stats.notCoveredCount / stats.totalQuestions) * 100}%`,
              background: 'var(--error-500)',
              transition: 'width 0.5s ease',
            }}
          />
        )}
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
        {sections.map((sec) => (
          <button
            key={sec.key}
            onClick={() => setActiveFilter(sec.key)}
            className={`btn ${activeFilter === sec.key ? 'btn--primary' : 'btn--secondary'}`}
            style={{ fontSize: 'var(--text-xs)', padding: '6px 12px' }}
          >
            {sec.icon && <span>{sec.icon}</span>} {sec.label} ({sec.count})
          </button>
        ))}
      </div>

      {/* Question List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {filteredQuestions.map((q, idx) => (
          <div
            key={idx}
            style={{
              background: 'white',
              border: '1px solid var(--gray-200)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-4) var(--space-5)',
            }}
          >
            {/* Question header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--gray-900)', lineHeight: 'var(--leading-sm)', flex: 1 }}>
                "{q.questionText}"
              </p>
              <CoverageBadge coverage={q.analysis.coverage} />
            </div>

            {/* Persona info */}
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-500)', marginBottom: 'var(--space-3)' }}>
              Asked by {q.participantName} as <strong>{q.personaName}</strong> ({q.personaRole})
            </div>

            {/* Mapped Endpoints */}
            {q.analysis.mappedEndpoints.length > 0 && (
              <div style={{ marginBottom: 'var(--space-2)' }}>
                <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--gray-500)', marginBottom: 'var(--space-1)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Mapped Endpoints
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                  {q.analysis.mappedEndpoints.map((ep, epIdx) => (
                    <span
                      key={epIdx}
                      style={{
                        fontSize: 'var(--text-xs)',
                        background: 'var(--brand-25)',
                        color: 'var(--brand-700)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'monospace',
                        border: '1px solid var(--brand-100)',
                      }}
                    >
                      {ep}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Gap Notes */}
            <div
              style={{
                fontSize: 'var(--text-xs)',
                color: q.analysis.coverage === 'not_covered' ? 'var(--error-700)' : 'var(--gray-600)',
                background: q.analysis.coverage === 'not_covered' ? 'var(--error-25)' : 'var(--gray-50)',
                padding: 'var(--space-2) var(--space-3)',
                borderRadius: 'var(--radius-md)',
                lineHeight: 'var(--leading-xs)',
              }}
            >
              {q.analysis.notes}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
