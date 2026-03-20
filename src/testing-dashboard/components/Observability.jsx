import React from 'react';
import { Eye, BarChart3, DollarSign, GitCompare } from 'lucide-react';

const realtimeMetrics = [
  { name: 'Chat panel open rate', value: '34%', trend: 'up', change: '+2% WoW' },
  { name: 'Messages per session', value: '3.2', trend: 'stable', change: '0%' },
  { name: 'Flow created from chat', value: '28%', trend: 'up', change: '+5% WoW' },
  { name: 'Error rate (send message)', value: '0.1%', trend: 'down', change: '-0.05%' },
];

const costByFeature = [
  { feature: 'AI Chat (glossary + routing)', cost: '$1,200', share: '50%' },
  { feature: 'Landing suggestions', cost: '$600', share: '25%' },
  { feature: 'Evals / regression runs', cost: '$600', share: '25%' },
];

const driftChecks = [
  { check: 'Glossary term match rate', baseline: '96%', current: '95.8%', status: 'ok' },
  { check: 'Template routing distribution', baseline: 'Post-discharge 40%', current: '38%', status: 'ok' },
  { check: 'Fallback rate (no match)', baseline: '12%', current: '18%', status: 'review' },
];

export default function Observability() {
  return (
    <section className="section">
      <div className="section-header">
        <div>
          <h2>
            <Eye size={20} color="var(--data-blue)" />
            Category 4 — Observability
          </h2>
          <p className="subtitle">Real-time AI performance, user analytics, cost per feature, model drift</p>
        </div>
        <span className="status-pill info">Live</span>
      </div>
      <div className="section-body">
        <div className="card-grid" style={{ marginBottom: 24 }}>
          <div className="metric-card">
            <div className="label">Error rate (last 24h)</div>
            <div className="value" style={{ color: 'var(--health-green)' }}>0.1%</div>
            <div className="hint">Message send failures</div>
          </div>
          <div className="metric-card">
            <div className="label">Cost (MTD)</div>
            <div className="value">$2,400</div>
            <div className="hint">AI feature spend this month</div>
          </div>
          <div className="metric-card">
            <div className="label">Drift alerts</div>
            <div className="value">1</div>
            <div className="hint">Fallback rate up — review</div>
          </div>
        </div>

        <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <BarChart3 size={16} /> User interaction analytics
        </h3>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
                <th>Trend</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {realtimeMetrics.map((row, i) => (
                <tr key={i}>
                  <td>{row.name}</td>
                  <td><strong>{row.value}</strong></td>
                  <td>{row.trend}</td>
                  <td style={{ color: row.change.startsWith('+') ? 'var(--health-green)' : row.change.startsWith('-') ? 'var(--alert-red)' : 'var(--text-muted)' }}>{row.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: 12, marginTop: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <DollarSign size={16} /> Cost tracking per feature
        </h3>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Cost (MTD)</th>
                <th>Share</th>
              </tr>
            </thead>
            <tbody>
              {costByFeature.map((row, i) => (
                <tr key={i}>
                  <td>{row.feature}</td>
                  <td><strong>{row.cost}</strong></td>
                  <td>{row.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: 12, marginTop: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <GitCompare size={16} /> Model drift detection
        </h3>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Check</th>
                <th>Baseline</th>
                <th>Current</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {driftChecks.map((row, i) => (
                <tr key={i}>
                  <td>{row.check}</td>
                  <td>{row.baseline}</td>
                  <td>{row.current}</td>
                  <td>
                    <span className={`status-pill ${row.status === 'ok' ? 'success' : 'warning'}`}>
                      {row.status === 'ok' ? 'OK' : 'Review'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 16 }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Example tools: </span>
          <span className="tool-tag">DataDog</span>
          <span className="tool-tag">New Relic</span>
          <span className="tool-tag">Grafana</span>
          <span className="tool-tag">OpenTelemetry</span>
        </div>
      </div>
    </section>
  );
}
