import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddPromptTestPanel({ onClose, onSave }) {
  const [name, setName] = useState('');
  const [input, setInput] = useState('');
  const [expected, setExpected] = useState('');

  const handleSave = () => {
    onSave?.({ name: name || 'New prompt test', input, expected });
    onClose();
  };

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-panel" onClick={(e) => e.stopPropagation()}>
        <div className="panel-header">
          <h3>Add prompt test</h3>
          <button type="button" className="panel-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="panel-body">
          <p className="panel-hint">
            Add a single test case: user input and expected AI behavior. Used for regression and evals.
          </p>
          <div className="form-group">
            <label>Scenario name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Healthcare term — deductible"
            />
          </div>
          <div className="form-group">
            <label>User input</label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. What is a deductible?"
            />
          </div>
          <div className="form-group">
            <label>Expected behavior</label>
            <input
              type="text"
              value={expected}
              onChange={(e) => setExpected(e.target.value)}
              placeholder="e.g. Definition with example"
            />
          </div>
          <div className="panel-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn-primary" onClick={handleSave}>Add test</button>
          </div>
        </div>
      </div>
    </div>
  );
}
