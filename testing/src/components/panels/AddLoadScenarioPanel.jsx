import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddLoadScenarioPanel({ onClose, onSave }) {
  const [name, setName] = useState('');
  const [concurrent, setConcurrent] = useState(50);
  const [durationSec, setDurationSec] = useState(60);
  const [targetLatencyMs, setTargetLatencyMs] = useState(2000);

  const handleSave = () => {
    onSave?.({
      name: name || `Load test — ${concurrent} users`,
      concurrent,
      durationSec,
      targetLatencyMs,
    });
    onClose();
  };

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-panel" onClick={(e) => e.stopPropagation()}>
        <div className="panel-header">
          <h3>Add load scenario</h3>
          <button type="button" className="panel-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="panel-body">
          <p className="panel-hint">
            Define a scenario for K6 / Locust / Artillery: concurrent users, duration, and target latency. Run to validate cost and performance at scale.
          </p>
          <div className="form-group">
            <label>Scenario name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Chat send — 50 concurrent"
            />
          </div>
          <div className="form-group">
            <label>Concurrent users</label>
            <input
              type="number"
              min={1}
              value={concurrent}
              onChange={(e) => setConcurrent(Number(e.target.value) || 1)}
            />
          </div>
          <div className="form-group">
            <label>Duration (seconds)</label>
            <input
              type="number"
              min={10}
              value={durationSec}
              onChange={(e) => setDurationSec(Number(e.target.value) || 10)}
            />
          </div>
          <div className="form-group">
            <label>Target P95 latency (ms)</label>
            <input
              type="number"
              min={100}
              value={targetLatencyMs}
              onChange={(e) => setTargetLatencyMs(Number(e.target.value) || 100)}
            />
            <span className="form-hint">Alert if exceeded (e.g. 2000 = 2s)</span>
          </div>
          <div className="panel-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn-primary" onClick={handleSave}>Add scenario</button>
          </div>
        </div>
      </div>
    </div>
  );
}
