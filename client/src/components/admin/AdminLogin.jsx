import React, { useState } from 'react';

const ADMIN_PASSWORD = 'Nekhtmp5535!';

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('cab-admin-auth', 'true');
      onLogin();
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className="main-content">
      <div className="card" style={{ maxWidth: 400 }}>
        <div className="text-center" style={{ marginBottom: 'var(--space-6)' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-xl)',
              background: 'var(--gray-100)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-4)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="11" width="18" height="11" rx="2" stroke="var(--gray-600)" strokeWidth="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4" stroke="var(--gray-600)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="heading-md">Admin Dashboard</h2>
          <p className="text-sm text-muted" style={{ marginTop: 'var(--space-1)' }}>
            Enter the admin password to view submissions
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              className="input"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              autoFocus
            />
            {error && (
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--error-600)', marginTop: 'var(--space-1)' }}>
                {error}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn--primary btn--full" disabled={!password}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
