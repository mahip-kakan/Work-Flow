import React from 'react';
import { DollarSign, Gauge, Plus, Activity } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';
import InfoTooltip from '../components/InfoTooltip';

const loadSummary = [
  { id: 'l1', scenario: 'Chat send (50 concurrent)', p95Latency: '1.2s', rps: 42, status: 'pass' },
  { id: 'l2', scenario: 'Glossary lookup (100/s)', p95Latency: '0.08s', rps: 100, status: 'pass' },
  { id: 'l3', scenario: 'Template match + create (20/s)', p95Latency: '0.5s', rps: 20, status: 'pass' },
];

const costProjection = [
  { traffic: '1x (current)', monthlyCost: '$2,400', note: 'Baseline' },
  { traffic: '5x', monthlyCost: '$9,800', note: 'Within budget' },
  { traffic: '10x', monthlyCost: '$22,000', note: 'Alert if exceeded' },
];

export default function LoadScreen({ onBack, onAddScenario, onScenarioDetail }) {
  return (
    <div className="screen-container">
      <ScreenHeader title="Load & Performance" onBack={onBack} />
      <div className="screen-content">
        <div className="block-header">
          <span className="status-pill success"><Activity size={14} /> All load tests pass</span>
          <button type="button" className="btn-primary" onClick={onAddScenario}>
            <Plus size={16} /> Add load scenario
          </button>
        </div>

        <div className="card-grid" style={{ marginBottom: 24 }}>
          <div className="metric-card">
            <div className="label">P95 latency (chat) <InfoTooltip term="P95 latency" definition="95th percentile response time: 95% of requests complete within this time. A 1.2s P95 means most users see responses under 1.2s; a few may be slower. Used to set SLAs (e.g. target &lt;2s)." /></div>
            <div className="value">1.2s</div>
            <div className="hint">Target &lt;2s</div>
          </div>
          <div className="metric-card">
            <div className="label">Peak RPS <InfoTooltip term="RPS (requests per second)" definition="Throughput: how many requests the system can handle per second. Peak RPS is the sustained rate achieved during load tests (e.g. 100/s for glossary lookup). Higher is better for scale." /></div>
            <div className="value">100</div>
            <div className="hint">Sustained</div>
          </div>
          <div className="metric-card">
            <div className="label">Projected cost (5x) <InfoTooltip term="Cost projection" definition="Estimated monthly cost if traffic scales (e.g. 5x or 10x). Based on current usage and pricing. Load testing helps validate these numbers before launch so cost doesn’t surprise you." /></div>
            <div className="value" style={{ color: 'var(--data-blue)' }}>$9.8K</div>
            <div className="hint">Monthly</div>
          </div>
        </div>

        <div className="block-header">
          <h3><Gauge size={16} /> Load test results <InfoTooltip term="Load test / load scenario" definition="A single load test configuration: e.g. 50 concurrent users for 60 seconds, with a target P95 latency. Run to validate performance and cost before shipping. Each row is one scenario." /></h3>
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
              </tr>
            </thead>
            <tbody>
              {loadSummary.map((row) => (
                <tr
                  key={row.id}
                  className="clickable-row"
                  onClick={() => (onScenarioDetail || onAddScenario)?.(row)}
                >
                  <td>{row.scenario}</td>
                  <td>{row.p95Latency}</td>
                  <td>{row.rps}</td>
                  <td><span className="status-pill success">{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="block-header">
          <h3><DollarSign size={16} /> Cost projection at scale <InfoTooltip term="Cost projection at scale" definition="Estimated monthly spend at 1x, 5x, or 10x current traffic. Load and usage data feed these estimates. Set alerts when projected cost exceeds budget (e.g. alert if 10x &gt; $25K)." /></h3>
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
                <tr key={i} className="clickable-row">
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
