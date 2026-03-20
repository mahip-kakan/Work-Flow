import React, { useState } from 'react';
import { Settings, Zap, Bell, Save, CheckCircle } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';

export default function SettingsScreen({ onBack, evalResults, setEvalResults }) {
  const [thresholds, setThresholds] = useState(
    Object.fromEntries(evalResults.map(e => [e.id, e.threshold]))
  );
  const [slackChannel, setSlackChannel] = useState('#testing-alerts');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [ciEnabled, setCiEnabled] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Apply updated thresholds back to eval results
    setEvalResults(prev => prev.map(e => {
      const newThreshold = thresholds[e.id] ?? e.threshold;
      return { ...e, threshold: newThreshold, status: e.score >= newThreshold ? 'pass' : 'fail' };
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="screen-container">
      <ScreenHeader title="Settings" onBack={onBack} />
      <div className="screen-content">

        {/* Eval thresholds */}
        <div className="block-header">
          <h3><Settings size={16} /> Eval pass thresholds</h3>
        </div>
        <p className="panel-hint" style={{ marginBottom: 12 }}>
          Set the minimum passing score for each evaluation suite. Changes apply immediately to pass/fail status.
        </p>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Suite</th>
                <th>Threshold (%)</th>
                <th>Current score</th>
                <th>Status preview</th>
              </tr>
            </thead>
            <tbody>
              {evalResults.map(e => {
                const previewThreshold = thresholds[e.id] ?? e.threshold;
                const wouldPass = e.score >= previewThreshold;
                return (
                  <tr key={e.id}>
                    <td>{e.suite}</td>
                    <td>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={thresholds[e.id] ?? e.threshold}
                        onChange={(ev) => setThresholds(prev => ({ ...prev, [e.id]: Number(ev.target.value) || 0 }))}
                        style={{ width: 72 }}
                      />
                    </td>
                    <td>{e.score}%</td>
                    <td>
                      <span className={`status-pill ${wouldPass ? 'success' : 'error'}`}>
                        {wouldPass ? 'Pass' : 'Fail'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* CI/CD integration */}
        <div className="block-header" style={{ marginTop: 24 }}>
          <h3><Zap size={16} /> CI/CD integration</h3>
        </div>
        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={ciEnabled}
              onChange={e => setCiEnabled(e.target.checked)}
            />
            Run tests on every GitHub Actions push
          </label>
        </div>
        <div className="form-group">
          <label>GitHub Actions status</label>
          <div style={{ marginTop: 6 }}>
            <span className="status-pill success"><CheckCircle size={13} /> Connected</span>
          </div>
        </div>

        {/* Notifications */}
        <div className="block-header" style={{ marginTop: 24 }}>
          <h3><Bell size={16} /> Notifications</h3>
        </div>
        <div className="form-group">
          <label>Slack channel for alerts</label>
          <input
            type="text"
            value={slackChannel}
            onChange={e => setSlackChannel(e.target.value)}
            placeholder="#testing-alerts"
          />
        </div>
        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={e => setEmailAlerts(e.target.checked)}
            />
            Send email alerts when evals fail
          </label>
        </div>

        <div className="panel-actions" style={{ marginTop: 28 }}>
          <button type="button" className="btn-secondary" onClick={onBack}>Cancel</button>
          <button type="button" className="btn-primary" onClick={handleSave}>
            {saved ? <><CheckCircle size={15} /> Saved!</> : <><Save size={15} /> Save settings</>}
          </button>
        </div>
      </div>
    </div>
  );
}
