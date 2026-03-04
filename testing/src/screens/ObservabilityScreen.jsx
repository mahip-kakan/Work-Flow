import React from 'react';
import { BarChart3, DollarSign, GitCompare, Plus } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';
import InfoTooltip from '../components/InfoTooltip';

const realtimeMetrics = [
  { name: 'Chat panel open rate', value: '34%', change: '+2% WoW' },
  { name: 'Messages per session', value: '3.2', change: '0%' },
  { name: 'Flow created from chat', value: '28%', change: '+5% WoW' },
  { name: 'Error rate (send message)', value: '0.1%', change: '-0.05%' },
];

const costByFeature = [
  { feature: 'AI Chat (glossary + routing)', cost: '$1,200', share: '50%' },
  { feature: 'Landing suggestions', cost: '$600', share: '25%' },
  { feature: 'Evals / regression runs', cost: '$600', share: '25%' },
];

const driftChecks = [
  { id: 'd1', check: 'Glossary term match rate', baseline: '96%', current: '95.8%', status: 'ok' },
  { id: 'd2', check: 'Template routing distribution', baseline: 'Post-discharge 40%', current: '38%', status: 'ok' },
  { id: 'd3', check: 'Fallback rate (no match)', baseline: '12%', current: '18%', status: 'review' },
];

export default function ObservabilityScreen({ onBack, onAddDriftCheck, onDriftDetail }) {
  return (
    <div className="screen-container">
      <ScreenHeader title="Observability" onBack={onBack} />
      <div className="screen-content">
        <div className="block-header">
          <span className="status-pill info">Live</span>
          <button type="button" className="btn-primary" onClick={onAddDriftCheck}>
            <Plus size={16} /> Add drift check
          </button>
        </div>

        <div className="card-grid" style={{ marginBottom: 24 }}>
          <div className="metric-card">
            <div className="label">Error rate (24h) <InfoTooltip term="Error rate" definition="Percentage of requests or actions that fail (e.g. message send failures, API errors). Track over 24h or 7d. Low error rate keeps user trust and avoids lost workflows." /></div>
            <div className="value" style={{ color: 'var(--health-green)' }}>0.1%</div>
            <div className="hint">Message send failures</div>
          </div>
          <div className="metric-card">
            <div className="label">Cost (MTD) <InfoTooltip term="Cost (MTD)" definition="Month-to-date spend on AI features (e.g. chat, evals, API calls). Used to track budget and attribute cost by feature or team." /></div>
            <div className="value">$2,400</div>
            <div className="hint">AI feature spend</div>
          </div>
          <div className="metric-card">
            <div className="label">Drift alerts <InfoTooltip term="Drift check / drift alert" definition="A check that monitors a metric over time and alerts when the current value moves too far from a baseline (e.g. glossary match rate drops from 96% to 90%). Helps catch model or behavior regression." /></div>
            <div className="value">1</div>
            <div className="hint">Fallback rate — review</div>
          </div>
        </div>

        <h3 className="block-title"><BarChart3 size={16} /> User interaction analytics <InfoTooltip term="User interaction analytics" definition="Metrics about how users use the AI assistant: e.g. chat panel open rate, messages per session, flow-created-from-chat rate. Used to improve adoption and UX." /></h3>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Value</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody>
              {realtimeMetrics.map((row, i) => (
                <tr key={i} className="clickable-row">
                  <td>{row.name}</td>
                  <td><strong>{row.value}</strong></td>
                  <td style={{ color: row.change.startsWith('+') ? 'var(--health-green)' : row.change.startsWith('-') ? 'var(--alert-red)' : 'var(--text-muted)' }}>{row.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="block-title"><DollarSign size={16} /> Cost by feature <InfoTooltip term="Cost by feature" definition="Breakdown of spend by feature (e.g. AI Chat, Landing suggestions, Evals). Helps attribute cost and optimize where to reduce usage or tune models." /></h3>
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
                <tr key={i} className="clickable-row">
                  <td>{row.feature}</td>
                  <td><strong>{row.cost}</strong></td>
                  <td>{row.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="block-header">
          <h3><GitCompare size={16} /> Model drift detection <InfoTooltip term="Model drift detection" definition="Monitoring key metrics (e.g. glossary match rate, template distribution, fallback rate) and alerting when they drift from baseline. Surfaces regressions or behavior change over time." /></h3>
          <button type="button" className="btn-secondary btn-sm" onClick={onAddDriftCheck}>
            <Plus size={14} /> Add check
          </button>
        </div>
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
              {driftChecks.map((row) => (
                <tr
                  key={row.id}
                  className="clickable-row"
                  onClick={() => (onDriftDetail || onAddDriftCheck)?.(row)}
                >
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
      </div>
    </div>
  );
}
