import React, { useState } from 'react';
import { X } from 'lucide-react';

function parseLatencyMs(latencyStr) {
  if (!latencyStr) return 2000;
  const num = parseFloat(latencyStr);
  if (latencyStr.endsWith('ms')) return Math.round(num);
  return Math.round(num * 1000);
}

export default function AddLoadScenarioPanel({ onClose, onSave, initialData }) {
  const [name, setName] = useState(initialData?.scenario || '');
  const [concurrent, setConcurrent] = useState(initialData?.rps || 50);
  const [durationSec, setDurationSec] = useState(60);
  const [targetLatencyMs, setTargetLatencyMs] = useState(parseLatencyMs(initialData?.p95Latency));

  const isEdit = !!initialData;

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
          <h3>{isEdit ? 'Edit load scenario' : 'Add load scenario'}</h3>
          <button type="button" className="panel-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="panel-body">
          <p className="panel-hint">
            Define a scenario: concurrent users, duration, and target latency. Run to validate cost and performance at scale.
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
            <button type="button" className="btn-primary" onClick={handleSave}>{isEdit ? 'Save changes' : 'Add scenario'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
