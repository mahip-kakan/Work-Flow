import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddDriftCheckPanel({ onClose, onSave, initialData }) {
  const [metric, setMetric] = useState(initialData?.check || '');
  const [baseline, setBaseline] = useState(initialData?.baseline || '');
  const [thresholdPercent, setThresholdPercent] = useState(5);

  const isEdit = !!initialData;

  const handleSave = () => {
    onSave?.({
      metric: metric || 'Custom metric',
      baseline,
      thresholdPercent,
    });
    onClose();
  };

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <div className="overlay-panel" onClick={(e) => e.stopPropagation()}>
        <div className="panel-header">
          <h3>{isEdit ? 'Edit drift check' : 'Add drift check'}</h3>
          <button type="button" className="panel-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="panel-body">
          <p className="panel-hint">
            Monitor a metric and alert when current value drifts from baseline by more than the threshold.
          </p>
          <div className="form-group">
            <label>Metric name</label>
            <input
              type="text"
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
              placeholder="e.g. Glossary term match rate"
            />
          </div>
          <div className="form-group">
            <label>Baseline value</label>
            <input
              type="text"
              value={baseline}
              onChange={(e) => setBaseline(e.target.value)}
              placeholder="e.g. 96% or 0.96"
            />
          </div>
          <div className="form-group">
            <label>Alert when drift exceeds (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={thresholdPercent}
              onChange={(e) => setThresholdPercent(Number(e.target.value) || 0)}
            />
          </div>
          <div className="panel-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn-primary" onClick={handleSave}>{isEdit ? 'Save changes' : 'Add check'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
