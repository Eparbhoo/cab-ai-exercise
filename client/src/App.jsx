import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import NameEntry from './components/NameEntry';
import PersonaCard from './components/PersonaCard';
import ChatInterface from './components/ChatInterface';
import ThankYou from './components/ThankYou';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { personas } from './data/personas';

const API_BASE = '/api';

function generateSessionId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// App Header shared across participant views
function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <span className="app-header__logo">Planet DDS</span>
        <div className="app-header__divider" />
        <span className="app-header__tagline">AI in Dentistry — Role Play Exercise</span>
      </div>
    </header>
  );
}

// Participant flow — each person rotates through ALL 7 personas
function ParticipantFlow() {
  const [step, setStep] = useState('welcome');
  const [participantName, setParticipantName] = useState('');
  const [organization, setOrganization] = useState('');
  const [sessionId] = useState(generateSessionId);
  const [currentPersonaIndex, setCurrentPersonaIndex] = useState(0);
  const [personaQuestions, setPersonaQuestions] = useState({});
  const [totalQuestions, setTotalQuestions] = useState(0);

  const currentPersona = personas[currentPersonaIndex];

  const handleNameSubmit = async ({ name, organization: org }) => {
    setParticipantName(name);
    setOrganization(org);

    // Create session record
    try {
      await fetch(`${API_BASE}/sessions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          participantName: name,
          organization: org,
          personaId: personas[0].id,
        }),
      });
    } catch (err) {
      console.error('Failed to create session:', err);
    }

    setStep('persona');
  };

  const handleContinueToChat = () => {
    setStep('chat');
  };

  const handleChatComplete = (count) => {
    // Record questions for this persona
    const updatedPersonaQuestions = {
      ...personaQuestions,
      [currentPersona.id]: count,
    };
    setPersonaQuestions(updatedPersonaQuestions);
    setTotalQuestions((prev) => prev + count);

    // Check if there are more personas
    const nextIndex = currentPersonaIndex + 1;
    if (nextIndex < personas.length) {
      // Move to next persona card
      setCurrentPersonaIndex(nextIndex);
      setStep('persona');
    } else {
      // All personas complete — show thank you
      setStep('thanks');
    }
  };

  return (
    <>
      <AppHeader />
      {step === 'welcome' && <Welcome onStart={() => setStep('name')} />}
      {step === 'name' && <NameEntry onSubmit={handleNameSubmit} />}
      {step === 'persona' && currentPersona && (
        <PersonaCard
          persona={currentPersona}
          participantName={participantName}
          onContinue={handleContinueToChat}
          personaIndex={currentPersonaIndex}
          totalPersonas={personas.length}
        />
      )}
      {step === 'chat' && currentPersona && (
        <ChatInterface
          persona={currentPersona}
          participantName={participantName}
          organization={organization}
          sessionId={sessionId}
          onComplete={handleChatComplete}
          personaIndex={currentPersonaIndex}
          totalPersonas={personas.length}
        />
      )}
      {step === 'thanks' && (
        <ThankYou
          participantName={participantName}
          totalQuestions={totalQuestions}
          personaQuestions={personaQuestions}
        />
      )}
    </>
  );
}

// Admin flow
function AdminFlow() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('cab-admin-auth') === 'true'
  );

  const handleLogout = () => {
    sessionStorage.removeItem('cab-admin-auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        <AppHeader />
        <AdminLogin onLogin={() => setIsAuthenticated(true)} />
      </>
    );
  }

  return <AdminDashboard onLogout={handleLogout} />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ParticipantFlow />} />
        <Route path="/admin" element={<AdminFlow />} />
      </Routes>
    </Router>
  );
}
