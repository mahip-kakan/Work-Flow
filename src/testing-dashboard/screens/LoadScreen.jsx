import React from 'react';
import { DollarSign, Gauge, Plus, Activity, Trash2 } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';
import InfoTooltip from '../components/InfoTooltip';

const costProjection = [
  { traffic: '1x (current)', monthlyCost: '$2,400', note: 'Baseline' },
  { traffic: '5x', monthlyCost: '$9,800', note: 'Within budget' },
  { traffic: '10x', monthlyCost: '$22,000', note: 'Alert if exceeded' },
];

export default function LoadScreen({ onBack, onAddScenario, onScenarioDetail, scenarios, onDeleteScenario }) {
  const allPass = scenarios.every(s => s.status === 'pass');

  return (
    <div className="screen-container">
      <ScreenHeader title="Load & Performance" onBack={onBack} />
      <div className="screen-content">
        <div className="block-header">
          {allPass
            ? <span className="status-pill success"><Activity size={14} /> All load tests pass</span>
            : <span className="status-pill warning"><Activity size={14} /> Some tests failing</span>
          }
          <button type="button" className="btn-primary" onClick={onAddScenario}>
            <Plus size={16} /> Add load scenario
          </button>
        </div>

        <div className="card-grid" style={{ marginBottom: 24 }}>
          <div className="metric-card">
            <div className="label">P95 latency (chat) <InfoTooltip term="P95 latency" definition="95th percentile response time: 95% of requests complete within this time." /></div>
            <div className="value">1.2s</div>
            <div className="hint">Target &lt;2s</div>
          </div>
          <div className="metric-card">
            <div className="label">Peak RPS <InfoTooltip term="RPS (requests per second)" definition="Throughput: how many requests the system handles per second during load tests." /></div>
            <div className="value">100</div>
            <div className="hint">Sustained</div>
          </div>
          <div className="metric-card">
            <div className="label">Projected cost (5x) <InfoTooltip term="Cost projection" definition="Estimated monthly cost if traffic scales to 5x current. Based on current usage and pricing." /></div>
            <div className="value" style={{ color: 'var(--data-blue)' }}>$9.8K</div>
            <div className="hint">Monthly</div>
          </div>
        </div>

        <div className="block-header">
          <h3><Gauge size={16} /> Load test results <InfoTooltip term="Load test / load scenario" definition="A single load test configuration: concurrent users, duration, target P95 latency. Run to validate performance before shipping." /></h3>
          <button type="button" className="btn-secondary btn-sm" onClick={onAddScenario}>
            <Plus size={14} /> New scenario
          </button>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Scenario</th>
                <th>P95 latency</th>
                <th>RPS</th>
                <th>Status</th>
                {onDeleteScenario && <th style={{ width: 48 }} />}
              </tr>
            </thead>
            <tbody>
              {scenarios.map((row) => (
                <tr key={row.id} className="clickable-row" onClick={() => onScenarioDetail?.(row)}>
                  <td>{row.scenario}</td>
                  <td>{row.p95Latency}</td>
                  <td>{row.rps}</td>
                  <td><span className="status-pill success">{row.status}</span></td>
                  {onDeleteScenario && (
                    <td>
                      <button
                        type="button"
                        className="btn-ghost icon-btn"
                        title="Delete scenario"
                        onClick={(e) => { e.stopPropagation(); onDeleteScenario(row.id); }}
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

        <div className="block-header">
          <h3><DollarSign size={16} /> Cost projection at scale <InfoTooltip term="Cost projection at scale" definition="Estimated monthly spend at 1x, 5x, or 10x current traffic. Load and usage data feed these estimates." /></h3>
        </div>
        <p className="panel-hint" style={{ marginBottom: 12 }}>
          Load testing reveals cost at scale before launch. Example: one team found AI feature would cost $50K/month at scale—caught by load tests.
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
      </div>
    </div>
  );
}
