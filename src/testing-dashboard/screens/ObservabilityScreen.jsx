import React from 'react';
import { BarChart3, DollarSign, GitCompare, Plus, Trash2 } from 'lucide-react';
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

export default function ObservabilityScreen({ onBack, onAddDriftCheck, onDriftDetail, driftChecks, onDeleteDriftCheck }) {
  const alertCount = driftChecks.filter(d => d.status === 'review').length;

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
            <div className="label">Error rate (24h) <InfoTooltip term="Error rate" definition="Percentage of requests that fail. Track over 24h or 7d to keep user trust." /></div>
            <div className="value" style={{ color: 'var(--health-green)' }}>0.1%</div>
            <div className="hint">Message send failures</div>
          </div>
          <div className="metric-card">
            <div className="label">Cost (MTD) <InfoTooltip term="Cost (MTD)" definition="Month-to-date spend on AI features. Used to track budget and attribute cost by feature." /></div>
            <div className="value">$2,400</div>
            <div className="hint">AI feature spend</div>
          </div>
          <div className="metric-card">
            <div className="label">Drift alerts <InfoTooltip term="Drift check / drift alert" definition="Alerts when a metric moves too far from baseline. Helps catch model or behavior regression." /></div>
            <div className="value" style={{ color: alertCount > 0 ? 'var(--alert-red)' : 'var(--health-green)' }}>{alertCount}</div>
            <div className="hint">{alertCount > 0 ? 'Checks need review' : 'All checks OK'}</div>
          </div>
        </div>

        <h3 className="block-title"><BarChart3 size={16} /> User interaction analytics <InfoTooltip term="User interaction analytics" definition="Metrics about how users use the AI assistant: chat open rate, messages per session, flow creation rate." /></h3>
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
                <tr key={i}>
                  <td>{row.name}</td>
                  <td><strong>{row.value}</strong></td>
                  <td style={{ color: row.change.startsWith('+') ? 'var(--health-green)' : row.change.startsWith('-') ? 'var(--alert-red)' : 'var(--text-muted)' }}>{row.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="block-title"><DollarSign size={16} /> Cost by feature <InfoTooltip term="Cost by feature" definition="Breakdown of spend by feature. Helps attribute cost and optimize where to reduce usage or tune models." /></h3>
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

        <div className="block-header">
          <h3><GitCompare size={16} /> Model drift detection <InfoTooltip term="Model drift detection" definition="Monitoring key metrics and alerting when they drift from baseline. Surfaces regressions or behavior change over time." /></h3>
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
                {onDeleteDriftCheck && <th style={{ width: 48 }} />}
              </tr>
            </thead>
            <tbody>
              {driftChecks.map((row) => (
                <tr key={row.id} className="clickable-row" onClick={() => onDriftDetail?.(row)}>
                  <td>{row.check}</td>
                  <td>{row.baseline}</td>
                  <td>{row.current}</td>
                  <td>
                    <span className={`status-pill ${row.status === 'ok' ? 'success' : 'warning'}`}>
                      {row.status === 'ok' ? 'OK' : 'Review'}
                    </span>
                  </td>
                  {onDeleteDriftCheck && (
                    <td>
                      <button
                        type="button"
                        className="btn-ghost icon-btn"
                        title="Delete check"
                        onClick={(e) => { e.stopPropagation(); onDeleteDriftCheck(row.id); }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
