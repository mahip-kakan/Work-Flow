import React, { useState } from 'react';
import { GitBranch, Play, CheckCircle, Clock, Layers } from 'lucide-react';

const workflowSteps = [
  { id: 1, name: 'Unit tests', status: 'done', duration: '12s' },
  { id: 2, name: 'Integration tests', status: 'done', duration: '28s' },
  { id: 3, name: 'Load tests', status: 'running', duration: '—' },
  { id: 4, name: 'E2E smoke', status: 'pending', duration: '—' },
];

const recentRuns = [
  { id: 'run-1', trigger: 'Push to main', status: 'passed', duration: '2m 14s', time: '2 min ago' },
  { id: 'run-2', trigger: 'PR #142', status: 'passed', duration: '1m 48s', time: '15 min ago' },
  { id: 'run-3', trigger: 'Scheduled (nightly)', status: 'failed', duration: '4m 02s', time: '6 hours ago' },
];

const conditionalRules = [
  { condition: 'Code change affects API endpoints', action: 'Run load tests' },
  { condition: 'Prompt or glossary files changed', action: 'Run AI evals suite' },
  { condition: 'UI components changed', action: 'Run E2E visual tests' },
];

export default function TestOrchestration() {
  const [parallelCount] = useState(100);

  return (
    <section className="section">
      <div className="section-header">
        <div>
          <h2>
            <GitBranch size={20} color="var(--gravity-purple)" />
            Category 1 — Test Orchestration
          </h2>
          <p className="subtitle">Central coordination for all tests: workflows, parallel execution, conditional logic</p>
        </div>
        <span className="status-pill success">
          <CheckCircle size={14} /> Pipeline healthy
        </span>
      </div>
      <div className="section-body">
        <div className="card-grid" style={{ marginBottom: 24 }}>
          <div className="metric-card">
            <div className="label">Active workflow</div>
            <div className="value">Unit → Integration → Load → E2E</div>
            <div className="hint">Run order defined in orchestration config</div>
          </div>
          <div className="metric-card">
            <div className="label">Parallel workers</div>
            <div className="value">{parallelCount}</div>
            <div className="hint">Tests run simultaneously (not sequentially)</div>
          </div>
          <div className="metric-card">
            <div className="label">Last run</div>
            <div className="value">2 min ago</div>
            <div className="hint">Triggered by push to main</div>
          </div>
        </div>

        <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Play size={16} /> Workflow definition
        </h3>
        <div style={{ marginBottom: 24 }}>
          {workflowSteps.map((step) => (
            <div key={step.id} className={`workflow-step ${step.status}`}>
              <span className="order">{step.status === 'done' ? '✓' : step.id}</span>
              <span style={{ flex: 1 }}>{step.name}</span>
              {step.duration !== '—' && <span className="text-muted" style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{step.duration}</span>}
            </div>
          ))}
        </div>

        <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Layers size={16} /> Conditional logic
        </h3>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Condition</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {conditionalRules.map((rule, i) => (
                <tr key={i}>
                  <td>{rule.condition}</td>
                  <td><span className="status-pill info">{rule.action}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, marginBottom: 12, marginTop: 24, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Clock size={16} /> Recent runs
        </h3>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Trigger</th>
                <th>Status</th>
                <th>Duration</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentRuns.map((run) => (
                <tr key={run.id}>
                  <td>{run.trigger}</td>
                  <td>
                    <span className={`status-pill ${run.status === 'passed' ? 'success' : 'error'}`}>
                      {run.status === 'passed' ? <CheckCircle size={14} /> : null} {run.status}
                    </span>
                  </td>
                  <td>{run.duration}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{run.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: 16 }}>
          <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Example tools: </span>
          <span className="tool-tag">Testkube</span>
          <span className="tool-tag">Argo Workflows</span>
          <span className="tool-tag">Jenkins X</span>
        </div>
      </div>
    </section>
  );
}
