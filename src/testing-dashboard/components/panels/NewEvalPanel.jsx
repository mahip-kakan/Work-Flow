import React, { useState } from 'react';
import { X, Plus, Play } from 'lucide-react';

const SUITES = ['Glossary accuracy', 'Template routing', 'Prompt regression', 'Custom'];

export default function NewEvalPanel({ onClose, onSave }) {
  const [name, setName] = useState('');
  const [suite, setSuite] = useState(SUITES[0]);
  const [testCases, setTestCases] = useState([
    { input: '', expected: '' },
  ]);

  const addCase = () => setTestCases((c) => [...c, { input: '', expected: '' }]);
  const updateCase = (i, field, value) => {
    setTestCases((c) => c.map((t, j) => (j === i ? { ...t, [field]: value } : t)));
  };
  const removeCase = (i) => setTestCases((c) => c.filter((_, j) => j !== i));

  const handleSave = () => {
    onSave?.({ name: name || 'New Eval', suite, testCases: testCases.filter((t) => t.input.trim()) });
    onClose();
  };

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-panel overlay-panel-wide" onClick={(e) => e.stopPropagation()}>
        <div className="panel-header">
          <h3>Define new eval</h3>
          <button type="button" className="panel-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="panel-body">
          <p className="panel-hint">
            Define an evaluation suite: name, category, and test cases (input + expected). Run to check AI assistant behavior (e.g. glossary answers, template routing). Inspired by Braintrust / Langfuse evals.
          </p>
          <div className="form-group">
            <label>Eval name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Glossary — insurance terms"
            />
          </div>
          <div className="form-group">
            <label>Suite</label>
            <select value={suite} onChange={(e) => setSuite(e.target.value)}>
              {SUITES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <div className="form-group-header">
              <label>Test cases</label>
              <button type="button" className="btn-secondary btn-sm" onClick={addCase}>
                <Plus size={14} /> Add case
              </button>
            </div>
            {testCases.map((tc, i) => (
              <div key={i} className="test-case-row">
                <input
                  type="text"
                  value={tc.input}
                  onChange={(e) => updateCase(i, 'input', e.target.value)}
                  placeholder="User input (e.g. What is a deductible?)"
                />
                <input
                  type="text"
                  value={tc.expected}
                  onChange={(e) => updateCase(i, 'expected', e.target.value)}
                  placeholder="Expected behavior or output"
                />
                <button type="button" className="btn-ghost" onClick={() => removeCase(i)} aria-label="Remove">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="panel-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn-primary" onClick={handleSave}>
              <Play size={16} /> Save & run eval
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
