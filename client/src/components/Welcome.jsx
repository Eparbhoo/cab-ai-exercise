import React from 'react';

export default function Welcome({ onStart }) {
  return (
    <div className="main-content">
      <div className="card text-center" style={{ maxWidth: 520 }}>
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 'var(--radius-2xl)',
              background: 'linear-gradient(135deg, var(--brand-500), var(--brand-700))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-4)',
              fontSize: '28px',
            }}
          >
            <span role="img" aria-label="sparkle">&#x2728;</span>
          </div>
          <h1 className="heading-xl" style={{ marginBottom: 'var(--space-3)' }}>
            Welcome to the AI in Dentistry Experience
          </h1>
          <p
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--gray-600)',
              lineHeight: 'var(--leading-lg)',
              maxWidth: 440,
              margin: '0 auto',
            }}
          >
            Step into the shoes of someone in a dental organization and imagine how AI could help them.
          </p>
        </div>

        <button className="btn btn--primary btn--lg btn--full" onClick={onStart}>
          Get Started
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <p className="text-xs text-muted" style={{ marginTop: 'var(--space-4)' }}>
          This exercise takes about 3-5 minutes
        </p>
      </div>
    </div>
  );
}
