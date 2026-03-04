import React from 'react';
import { Play, CheckCircle, Clock, Layers, Plus, Settings } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';
import InfoTooltip from '../components/InfoTooltip';

const WORKFLOW_DEFS = {
  'Unit tests': 'Tests that verify individual functions or components in isolation. They run first in the pipeline and are fast. No external services required.',
  'Integration tests': 'Tests that verify multiple parts of the system work together (e.g. API + database, chat + flow creation). Run after unit tests.',
  'Load tests': 'Tests that simulate many concurrent users or requests to check performance and scalability. Run before release to catch cost and latency issues.',
  'E2E smoke': 'End-to-end tests that run critical user flows (e.g. open chat, send message, create flow). Smoke = quick sanity check that the app works.',
};

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

export default function OrchestrationScreen({ onBack, onOpenWorkflow, onOpenAddRule, onOpenRunDetail }) {
  return (
    <div className="screen-container">
      <ScreenHeader title="Test Orchestration" onBack={onBack} />
      <div className="screen-content">
        <div className="card-grid" style={{ marginBottom: 24 }}>
          <div className="metric-card clickable" onClick={onOpenWorkflow} title="Click to edit workflow">
            <div className="label">Active workflow</div>
            <div className="value">Unit → Integration → Load → E2E</div>
            <div className="hint">Click to define run order</div>
          </div>
          <div className="metric-card">
            <div className="label">Parallel workers <InfoTooltip term="Parallel workers" definition="Number of tests that run at the same time instead of one after another. Higher values shorten total pipeline time but use more resources." /></div>
            <div className="value">100</div>
            <div className="hint">Tests run simultaneously</div>
          </div>
          <div className="metric-card">
            <div className="label">Last run</div>
            <div className="value">2 min ago</div>
            <div className="hint">Triggered by push to main</div>
          </div>
        </div>

        <div className="block-header">
          <h3><Play size={16} /> Workflow definition</h3>
          <button type="button" className="btn-primary btn-sm" onClick={onOpenWorkflow}>
            <Settings size={14} /> Edit workflow
          </button>
        </div>
        <div className="clickable-list">
          {workflowSteps.map((step) => (
            <div
              key={step.id}
              className={`workflow-step ${step.status} clickable`}
              onClick={onOpenWorkflow}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onOpenWorkflow()}
            >
              <span className="order">{step.status === 'done' ? '✓' : step.id}</span>
              <span style={{ flex: 1 }}>{step.name} <InfoTooltip term={step.name} definition={WORKFLOW_DEFS[step.name]} /></span>
              {step.duration !== '—' && <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{step.duration}</span>}
            </div>
          ))}
        </div>

        <div className="block-header">
          <h3><Layers size={16} /> Conditional logic <InfoTooltip term="Conditional logic" definition="Rules that trigger specific test suites only when relevant code or config changes (e.g. run load tests only if API endpoints changed). Reduces unnecessary runs and saves time." /></h3>
          <button type="button" className="btn-primary btn-sm" onClick={onOpenAddRule}>
            <Plus size={14} /> Add rule
          </button>
        </div>
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
                <tr key={i} className="clickable-row" onClick={onOpenAddRule}>
                  <td>{rule.condition}</td>
                  <td><span className="status-pill info">{rule.action}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="block-header">
          <h3><Clock size={16} /> Recent runs</h3>
        </div>
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
                <tr
                  key={run.id}
                  className="clickable-row"
                  onClick={() => onOpenRunDetail?.(run)}
                >
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
      </div>
    </div>
  );
}
