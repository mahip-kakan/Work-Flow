import React from 'react';
import { Brain, MessageSquare, TrendingUp, AlertTriangle } from 'lucide-react';

const evalResults = [
  { suite: 'Glossary accuracy', score: 96, threshold: 95, status: 'pass', count: 48 },
  { suite: 'Template routing', score: 92, threshold: 90, status: 'pass', count: 24 },
  { suite: 'Prompt regression (v2)', score: 88, threshold: 90, status: 'fail', count: 50 },
];

const promptTests = [
  { name: 'Healthcare term — deductible', input: 'What is a deductible?', expected: 'Definition with example', status: 'pass' },
  { name: 'Intent — post-discharge', input: 'Create agent for discharge follow-up', expected: 'Post-discharge template', status: 'pass' },
  { name: 'Out of scope', input: 'What is the weather?', expected: 'Safe fallback, no clinical advice', status: 'pass' },
];

const modelVersions = [
  { version: 'glossary-v3', deployed: '2025-02-28', evals: '96%' },
  { version: 'routing-v2', deployed: '2025-02-20', evals: '92%' },
];

export default function AIModelTesting() {
  return (
    <section className="section">
      <div className="section-header">
        <div>
          <h2>
            <Brain size={20} color="var(--accent-purple)" />
            Category 2 — AI Model Testing
          </h2>
          <p className="subtitle">Regression, evals, and prompt testing for AI assistant outputs</p>
        </div>
        <span className="status-pill warning">
          <AlertTriangle size={14} /> 1 eval below threshold
        </span>
      </div>
      <div className="section-body">
        <div className="card-grid" style={{ marginBottom: 24 }}>
          <div className="metric-card">
            <div className="label">Glossary eval score</div>
            <div className="value" style={{ color: 'var(--health-green)' }}>96%</div>
            <div className="hint">Target ≥95% — in scope terms</div>
          </div>
          <div className="metric-card">
            <div className="label">Template routing accuracy</div>
            <div className="value" style={{ color: 'var(--health-green)' }}>92%</div>
            <div className="hint">Target ≥90%</div>
          </div>
          <div className="metric-card">
            <div className="label">Prompt regression suite</div>
            <div className="value" style={{ color: 'var(--alert-red)' }}>88%</div>
            <div className="hint">Target ≥90% — review required</div>
          </div>
        </div>

        <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrendingUp size={16} /> Evaluation results
        </h3>
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
              {evalResults.map((row, i) => (
                <tr key={i}>
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

        <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: 12, marginTop: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <MessageSquare size={16} /> Prompt tests (sample)
        </h3>
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
                <tr key={i}>
                  <td>{row.name}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{row.input}</td>
                  <td>{row.expected}</td>
                  <td><span className="status-pill success">{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: 12, marginTop: 24 }}>Model / version tracking</h3>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Version</th>
                <th>Deployed</th>
                <th>Evals at release</th>
              </tr>
            </thead>
            <tbody>
              {modelVersions.map((v, i) => (
                <tr key={i}>
                  <td>{v.version}</td>
                  <td>{v.deployed}</td>
                  <td>{v.evals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 16 }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Example tools: </span>
          <span className="tool-tag">Braintrust</span>
          <span className="tool-tag">Langfuse</span>
          <span className="tool-tag">PromptLayer</span>
          <span className="tool-tag">Weights & Biases</span>
          <span className="tool-tag">Arize</span>
        </div>
      </div>
    </section>
  );
}
