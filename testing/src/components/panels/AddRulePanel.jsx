import React, { useState } from 'react';
import { X } from 'lucide-react';

const CONDITIONS = [
  'Code change affects API endpoints',
  'Prompt or glossary files changed',
  'UI components changed',
  'New dependency added',
];
const ACTIONS = [
  'Run load tests',
  'Run AI evals suite',
  'Run E2E visual tests',
  'Run security scan',
  'Run full pipeline',
];

export default function AddRulePanel({ onClose, onSave }) {
  const [condition, setCondition] = useState(CONDITIONS[0]);
  const [action, setAction] = useState(ACTIONS[0]);

  const handleSave = () => {
    onSave?.({ condition, action });
    onClose();
  };

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-panel" onClick={(e) => e.stopPropagation()}>
        <div className="panel-header">
          <h3>Add conditional rule</h3>
          <button type="button" className="panel-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="panel-body">
          <p className="panel-hint">
            When the condition is met (e.g. certain files changed), this action is triggered. Reduces unnecessary test runs.
          </p>
          <div className="form-group">
            <label>When (condition)</label>
            <select value={condition} onChange={(e) => setCondition(e.target.value)}>
              {CONDITIONS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Then (action)</label>
            <select value={action} onChange={(e) => setAction(e.target.value)}>
              {ACTIONS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div className="panel-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn-primary" onClick={handleSave}>Add rule</button>
          </div>
        </div>
      </div>
    </div>
  );
}
