import React, { useState } from 'react';
import ScenarioSelector from './components/ScenarioSelector.jsx';
import ChatInterface from './components/ChatInterface.jsx';
import FeedbackDisplay from './components/FeedbackDisplay.jsx';

// View states: 'select' | 'chat' | 'feedback'

export default function App() {
  const [view, setView] = useState('select');
  const [scenarioId, setScenarioId] = useState(null);
  const [transcript, setTranscript] = useState([]);
  const [showAbout, setShowAbout] = useState(false);

  function handleStart(id) {
    setScenarioId(id);
    setTranscript([]);
    setView('chat');
  }

  function handleRequestFeedback(messages) {
    setTranscript(messages);
    setView('feedback');
  }

  function handleRestart() {
    setScenarioId(null);
    setTranscript([]);
    setView('select');
  }

  return (
    <div className="app-shell">
      {/* Safety disclaimer — subtle but always visible */}
      <div className="safety-banner" role="note">
        Educational simulation. Fictional patient. For communication practice
        only — not clinical advice or diagnosis.
      </div>

      <header className="app-header">
        <div className="header-icon" aria-hidden="true">🩺</div>
        <div className="header-titles">
          <h1>Cancer Survivor Conversation Simulator</h1>
          <div className="subtitle">
            Supportive-care communication practice for pre-registration nursing students
          </div>
        </div>
        <button
          className="about-link"
          onClick={() => setShowAbout(true)}
        >
          About this prototype
        </button>
      </header>

      <main className="app-content">
        {view === 'select' && (
          <>
            <p className="landing-attribution">
              Prototype by Phillip Johnson — feedback welcome.
            </p>
            <ScenarioSelector onStart={handleStart} />
          </>
        )}

        {view === 'chat' && (
          <>
            <ChatInterface
              key={scenarioId}
              scenarioId={scenarioId}
              onRequestFeedback={handleRequestFeedback}
            />
            <button className="btn-new-session" onClick={handleRestart}>
              ← Choose a different scenario
            </button>
          </>
        )}

        {view === 'feedback' && (
          <FeedbackDisplay
            scenarioId={scenarioId}
            transcript={transcript}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* About modal */}
      {showAbout && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="About this prototype"
          onClick={() => setShowAbout(false)}
        >
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>About this prototype</h2>
              <button
                className="modal-close"
                onClick={() => setShowAbout(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <p>
              This is an early educational prototype exploring whether AI-supported
              conversation practice can help pre-registration nurses build
              supportive-care communication skills with cancer survivors. Patients
              are fictional. The open research question — whether a tool like this
              is safe, valid, and useful for learning — would be the focus of
              formal evaluation. Built by Phillip Johnson (RN, Nurse Educator).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
