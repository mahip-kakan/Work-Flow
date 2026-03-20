import React from 'react';
import { Zap, DollarSign, Gauge, Activity } from 'lucide-react';

const loadSummary = [
  { scenario: 'Chat send (50 concurrent)', p95Latency: '1.2s', rps: 42, status: 'pass' },
  { scenario: 'Glossary lookup (100/s)', p95Latency: '0.08s', rps: 100, status: 'pass' },
  { scenario: 'Template match + create (20/s)', p95Latency: '0.5s', rps: 20, status: 'pass' },
];

const costProjection = [
  { traffic: '1x (current)', monthlyCost: '$2,400', note: 'Baseline' },
  { traffic: '5x', monthlyCost: '$9,800', note: 'Within budget' },
  { traffic: '10x', monthlyCost: '$22,000', note: 'Alert if exceeded' },
];

export default function LoadPerformance() {
  return (
    <section className="section">
      <div className="section-header">
        <div>
          <h2>
            <Zap size={20} color="var(--amber)" />
            Category 3 — Load & Performance
          </h2>
          <p className="subtitle">Ensure AI features perform under real traffic; cost visibility before scale</p>
        </div>
        <span className="status-pill success">
          <Activity size={14} /> All load tests pass
        </span>
      </div>
      <div className="section-body">
        <div className="card-grid" style={{ marginBottom: 24 }}>
          <div className="metric-card">
            <div className="label">P95 latency (chat response)</div>
            <div className="value">1.2s</div>
            <div className="hint">Target &lt;2s — under threshold</div>
          </div>
          <div className="metric-card">
            <div className="label">Peak RPS (sustained)</div>
            <div className="value">100</div>
            <div className="hint">Glossary lookup load test</div>
          </div>
          <div className="metric-card">
            <div className="label">Projected monthly cost (5x)</div>
            <div className="value" style={{ color: 'var(--data-blue)' }}>$9.8K</div>
            <div className="hint">If traffic scales 5x — within budget</div>
          </div>
        </div>

        <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Gauge size={16} /> Load test results
        </h3>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Scenario</th>
                <th>P95 latency</th>
                <th>RPS</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loadSummary.map((row, i) => (
                <tr key={i}>
                  <td>{row.scenario}</td>
                  <td>{row.p95Latency}</td>
                  <td>{row.rps}</td>
                  <td><span className="status-pill success">{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: 12, marginTop: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <DollarSign size={16} /> Cost projection at scale
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
          Example: one team discovered AI feature would cost $50K/month at scale; load and cost testing caught it before launch.
        </p>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Traffic</th>
                <th>Projected monthly cost</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {costProjection.map((row, i) => (
                <tr key={i}>
                  <td>{row.traffic}</td>
                  <td><strong>{row.monthlyCost}</strong></td>
                  <td style={{ color: 'var(--text-muted)' }}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 16 }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Example tools: </span>
          <span className="tool-tag">K6</span>
          <span className="tool-tag">Locust</span>
          <span className="tool-tag">Gatling</span>
          <span className="tool-tag">Artillery</span>
        </div>
      </div>
    </section>
  );
}
