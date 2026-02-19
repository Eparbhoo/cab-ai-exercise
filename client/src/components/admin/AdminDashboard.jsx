import React, { useState, useEffect, useRef } from 'react';
import { analyzeAllSubmissions, generateCSV } from '../../utils/analyzer';
import ByPersonaTheme from './ByPersonaTheme';
import ByThemeOnly from './ByThemeOnly';
import EndpointMapping from './EndpointMapping';

const API_BASE = '/api';

export default function AdminDashboard({ onLogout }) {
  const [submissions, setSubmissions] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState('endpoint');
  const [lastUpdated, setLastUpdated] = useState(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const eventSourceRef = useRef(null);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch(`${API_BASE}/submissions`);
      const data = await res.json();
      setSubmissions(data);
      setAnalysis(analyzeAllSubmissions(data));
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to fetch submissions:', err);
    }
  };

  // Initial fetch + polling for real-time updates
  useEffect(() => {
    fetchSubmissions();
    const interval = setInterval(fetchSubmissions, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleExport = () => {
    const csv = generateCSV(submissions);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `cab-ai-exercise-export-${date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = async () => {
    setIsResetting(true);
    try {
      await fetch(`${API_BASE}/submissions`, { method: 'DELETE' });
      setSubmissions([]);
      setAnalysis(null);
      setShowResetModal(false);
    } catch (err) {
      console.error('Failed to reset:', err);
    }
    setIsResetting(false);
  };

  const stats = analysis?.stats || {
    totalQuestions: 0,
    uniqueParticipants: 0,
    coveredCount: 0,
    partialCount: 0,
    notCoveredCount: 0,
  };

  const tabs = [
    { id: 'endpoint', label: 'API Endpoint Mapping', icon: '\uD83D\uDD17' },
    { id: 'persona', label: 'By Persona & Theme', icon: '\uD83D\uDC64' },
    { id: 'theme', label: 'By Theme Only', icon: '\uD83C\uDFF7\uFE0F' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray-50)' }}>
      {/* Dashboard Header */}
      <div
        style={{
          background: 'white',
          borderBottom: '1px solid var(--gray-200)',
          padding: 'var(--space-4) var(--space-6)',
        }}
      >
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            <div>
              <h1 className="heading-lg">Admin Dashboard</h1>
              {lastUpdated && (
                <p className="text-xs text-muted" style={{ marginTop: 2 }}>
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
              )}
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
              <button className="btn btn--secondary" onClick={handleExport} disabled={submissions.length === 0}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 10v2a2 2 0 002 2h8a2 2 0 002-2v-2M8 2v8m0 0L5 7m3 3l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Export CSV
              </button>
              <button className="btn btn--danger" onClick={() => setShowResetModal(true)} disabled={submissions.length === 0}>
                Reset
              </button>
              <button className="btn btn--ghost" onClick={onLogout}>
                Sign Out
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="stat-row" style={{ marginTop: 'var(--space-4)', marginBottom: 0 }}>
            <div className="stat-card">
              <div className="stat-card__value">{stats.uniqueParticipants}</div>
              <div className="stat-card__label">Participants</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__value">{stats.totalQuestions}</div>
              <div className="stat-card__label">Total Questions</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__value" style={{ color: 'var(--success-600)' }}>{stats.coveredCount}</div>
              <div className="stat-card__label">API Covered</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__value" style={{ color: 'var(--error-600)' }}>{stats.notCoveredCount}</div>
              <div className="stat-card__label">Gaps Found</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: 'var(--space-6)' }}>
        {/* Tabs */}
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span style={{ marginRight: 'var(--space-1)' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'persona' && <ByPersonaTheme analysis={analysis} />}
        {activeTab === 'theme' && <ByThemeOnly analysis={analysis} />}
        {activeTab === 'endpoint' && <EndpointMapping analysis={analysis} />}
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="modal-overlay" onClick={() => setShowResetModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__title">Reset All Data</div>
            <p className="modal__text">
              This will permanently delete all {submissions.length} submission{submissions.length !== 1 ? 's' : ''} and reset persona assignments. This cannot be undone.
            </p>
            <div className="modal__actions">
              <button className="btn btn--secondary" onClick={() => setShowResetModal(false)}>
                Cancel
              </button>
              <button className="btn btn--danger" onClick={handleReset} disabled={isResetting}>
                {isResetting ? 'Resetting...' : 'Yes, Reset Everything'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
