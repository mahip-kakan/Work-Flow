import React from 'react';
import { MessageSquare, TrendingUp, Plus, Play, AlertTriangle } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';
import InfoTooltip from '../components/InfoTooltip';

const evalResults = [
  { id: 'e1', suite: 'Glossary accuracy', score: 96, threshold: 95, status: 'pass', count: 48 },
  { id: 'e2', suite: 'Template routing', score: 92, threshold: 90, status: 'pass', count: 24 },
  { id: 'e3', suite: 'Prompt regression (v2)', score: 88, threshold: 90, status: 'fail', count: 50 },
];

const promptTests = [
  { name: 'Healthcare term — deductible', input: 'What is a deductible?', expected: 'Definition with example', status: 'pass' },
  { name: 'Intent — post-discharge', input: 'Create agent for discharge follow-up', expected: 'Post-discharge template', status: 'pass' },
  { name: 'Out of scope', input: 'What is the weather?', expected: 'Safe fallback, no clinical advice', status: 'pass' },
];

export default function AIModelScreen({ onBack, onNewEval, onEvalRunDetail, onAddPromptTest }) {
  return (
    <div className="screen-container">
      <ScreenHeader title="AI Model Testing" onBack={onBack} />
      <div className="screen-content">
        <div className="block-header">
          <span className="status-pill warning"><AlertTriangle size={14} /> 1 eval below threshold</span>
          <button type="button" className="btn-primary" onClick={onNewEval}>
            <Plus size={16} /> Define new eval
          </button>
        </div>

        <div className="card-grid" style={{ marginBottom: 24 }}>
          <div className="metric-card">
            <div className="label">Glossary accuracy <InfoTooltip term="Glossary accuracy" definition="Percentage of healthcare and platform terms the AI defines correctly against a curated eval set. Measures whether the assistant returns the right definition (and example) when users ask e.g. 'What is a deductible?' or 'What is Gravity Shield?'." /></div>
            <div className="value" style={{ color: 'var(--health-green)' }}>96%</div>
            <div className="hint">Target ≥95%</div>
          </div>
          <div className="metric-card">
            <div className="label">Template routing <InfoTooltip term="Template routing" definition="How well the assistant maps user intent to the correct flow template (e.g. 'discharge follow-up' → Post-Discharge, 'readmission' → Readmission Risk Alert). Measured by accuracy on a set of intent phrases." /></div>
            <div className="value" style={{ color: 'var(--health-green)' }}>92%</div>
            <div className="hint">Target ≥90%</div>
          </div>
          <div className="metric-card">
            <div className="label">Prompt regression <InfoTooltip term="Prompt regression" definition="Tests that ensure prompt or model changes don’t break existing expected outputs. A regression suite runs the same inputs after each change and flags if behavior or quality drops below threshold." /></div>
            <div className="value" style={{ color: 'var(--alert-red)' }}>88%</div>
            <div className="hint">Target ≥90% — review</div>
          </div>
        </div>

        <div className="block-header">
          <h3><TrendingUp size={16} /> Evaluation results</h3>
          <button type="button" className="btn-secondary btn-sm" onClick={onNewEval}>
            <Play size={14} /> New eval
          </button>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Suite</th>
                <th>Score</th>
                <th>Threshold</th>
                <th>Test count</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {evalResults.map((row) => (
                <tr
                  key={row.id}
                  className="clickable-row"
                  onClick={() => onEvalRunDetail?.(row)}
                >
                  <td>{row.suite}</td>
                  <td><strong>{row.score}%</strong></td>
                  <td>≥{row.threshold}%</td>
                  <td>{row.count}</td>
                  <td>
                    <span className={`status-pill ${row.status === 'pass' ? 'success' : 'error'}`}>
                      {row.status === 'pass' ? 'Pass' : 'Fail'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="block-header">
          <h3><MessageSquare size={16} /> Prompt tests (sample) <InfoTooltip term="Prompt tests" definition="Individual test cases: a user input (e.g. 'What is a deductible?') and the expected AI behavior or output. Used in evals and regression suites to catch broken or wrong answers." /></h3>
          <button type="button" className="btn-secondary btn-sm" onClick={onAddPromptTest}>
            <Plus size={14} /> Add prompt test
          </button>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Scenario</th>
                <th>Input</th>
                <th>Expected</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {promptTests.map((row, i) => (
                <tr key={i} className="clickable-row" onClick={onAddPromptTest}>
                  <td>{row.name}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{row.input}</td>
                  <td>{row.expected}</td>
                  <td><span className="status-pill success">{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
