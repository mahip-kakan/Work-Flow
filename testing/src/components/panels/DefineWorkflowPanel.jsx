import React, { useState } from 'react';
import { X } from 'lucide-react';

const DEFAULT_STEPS = [
  { id: 1, name: 'Unit tests' },
  { id: 2, name: 'Integration tests' },
  { id: 3, name: 'Load tests' },
  { id: 4, name: 'E2E smoke' },
];

export default function DefineWorkflowPanel({ onClose, onSave }) {
  const [steps, setSteps] = useState(DEFAULT_STEPS);

  const move = (from, to) => {
    if (to < 0 || to >= steps.length) return;
    const next = [...steps];
    const [removed] = next.splice(from, 1);
    next.splice(to, 0, removed);
    setSteps(next);
  };

  const handleSave = () => {
    onSave?.({ steps });
    onClose();
  };

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-panel" onClick={(e) => e.stopPropagation()}>
        <div className="panel-header">
          <h3>Define workflow</h3>
          <button type="button" className="panel-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="panel-body">
          <p className="panel-hint">
            Set the order tests run in (e.g. unit first, then integration, then load). Used by Testkube / Argo-style orchestration.
          </p>
          <label className="label-block">Run order</label>
          {steps.map((step, i) => (
            <div key={step.id} className="workflow-edit-step">
              <span className="workflow-order">{i + 1}</span>
              <span className="workflow-name">{step.name}</span>
              <div className="workflow-move">
                <button type="button" className="btn-ghost btn-sm" onClick={() => move(i, i - 1)} disabled={i === 0}>
                  Up
                </button>
                <button type="button" className="btn-ghost btn-sm" onClick={() => move(i, i + 1)} disabled={i === steps.length - 1}>
                  Down
                </button>
              </div>
            </div>
          ))}
          <div className="panel-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn-primary" onClick={handleSave}>Save workflow</button>
          </div>
        </div>
      </div>
    </div>
  );
}
