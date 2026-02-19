import React, { useState } from 'react';

export default function NameEntry({ onSubmit }) {
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit({ name: name.trim(), organization: org.trim() });
    }
  };

  return (
    <div className="main-content">
      <div className="card">
        <h2 className="heading-lg" style={{ marginBottom: 'var(--space-2)' }}>
          Before we begin...
        </h2>
        <p className="text-muted" style={{ marginBottom: 'var(--space-6)' }}>
          Tell us a bit about yourself so we can personalize your experience.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              What's your first name? <span style={{ color: 'var(--error-500)' }}>*</span>
            </label>
            <input
              id="name"
              className="input"
              type="text"
              placeholder="Enter your first name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              autoComplete="given-name"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="org">
              What organization are you from?
              <span className="text-muted" style={{ fontWeight: 400 }}> (optional)</span>
            </label>
            <input
              id="org"
              className="input"
              type="text"
              placeholder="e.g., Acme Dental Group"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              autoComplete="organization"
            />
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--lg btn--full"
            disabled={!name.trim()}
            style={{ marginTop: 'var(--space-2)' }}
          >
            Meet Your Persona
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
