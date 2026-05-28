import React from 'react';

const SCENARIOS = [
  {
    id: 'breast_cancer',
    title: 'Breast cancer — 8 months post-chemotherapy',
    description:
      'Sarah, 42. Completed adjuvant chemo 8 months ago; now on hormone therapy. Presenting with persistent fatigue.',
  },
  {
    id: 'colorectal',
    title: 'Colorectal cancer — 6 months post-surgery',
    description:
      'David, 58. Anterior resection 6 months ago; adjuvant chemo completed 3 months ago. Hoping to return to work as a PE teacher.',
  },
  {
    id: 'lymphoma',
    title: "Lymphoma — 1 year post-treatment",
    description:
      "Aisha, 29. Hodgkin's lymphoma; completed treatment 12 months ago, in remission. Next PET scan due in 3 weeks.",
  },
];

export default function ScenarioSelector({ onStart }) {
  const [selected, setSelected] = React.useState(null);

  return (
    <div className="scenario-selector">
      <h2>Choose a Patient Scenario</h2>
      <p className="intro">
        Select one of the three cancer survivors below. You will then begin a
        consultation as the nurse. Try to elicit the patient&apos;s concerns
        using open, empathetic questioning.
      </p>

      <div className="scenario-cards">
        {SCENARIOS.map(s => (
          <button
            key={s.id}
            className={`scenario-card${selected === s.id ? ' selected' : ''}`}
            onClick={() => setSelected(s.id)}
            aria-pressed={selected === s.id}
          >
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </button>
        ))}
      </div>

      <button
        className="btn-start"
        disabled={!selected}
        onClick={() => onStart(selected)}
      >
        Begin consultation
      </button>
    </div>
  );
}
