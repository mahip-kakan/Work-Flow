import React from 'react';
import { MessageSquare, TrendingUp, Plus, Play, AlertTriangle, Trash2 } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';
import InfoTooltip from '../components/InfoTooltip';

export default function AIModelScreen({ onBack, onNewEval, onEvalRunDetail, onAddPromptTest, onEditPromptTest, evalResults, promptTests, onDeleteEval, onDeletePromptTest }) {
  const failCount = evalResults.filter(e => e.status === 'fail').length;

  return (
    <div className="screen-container">
      <ScreenHeader title="AI Model Testing" onBack={onBack} />
      <div className="screen-content">
        <div className="block-header">
          {failCount > 0
            ? <span className="status-pill warning"><AlertTriangle size={14} /> {failCount} eval{failCount > 1 ? 's' : ''} below threshold</span>
            : <span className="status-pill success">All evals passing</span>
          }
          <button type="button" className="btn-primary" onClick={onNewEval}>
            <Plus size={16} /> Define new eval
          </button>
        </div>

        <div className="card-grid" style={{ marginBottom: 24 }}>
          {evalResults.slice(0, 3).map((e) => (
            <div className="metric-card" key={e.id}>
              <div className="label">{e.suite} <InfoTooltip term={e.suite} definition={`Evaluation suite: ${e.suite}. Target ≥${e.threshold}%.`} /></div>
              <div className="value" style={{ color: e.status === 'pass' ? 'var(--health-green)' : 'var(--alert-red)' }}>{e.score}%</div>
              <div className="hint">Target ≥{e.threshold}%{e.status === 'fail' ? ' — review' : ''}</div>
            </div>
          ))}
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
                {onDeleteEval && <th style={{ width: 48 }} />}
              </tr>
            </thead>
            <tbody>
              {evalResults.map((row) => (
                <tr key={row.id} className="clickable-row" onClick={() => onEvalRunDetail?.(row)}>
                  <td>{row.suite}</td>
                  <td><strong>{row.score}%</strong></td>
                  <td>≥{row.threshold}%</td>
                  <td>{row.count}</td>
                  <td>
                    <span className={`status-pill ${row.status === 'pass' ? 'success' : 'error'}`}>
                      {row.status === 'pass' ? 'Pass' : 'Fail'}
                    </span>
                  </td>
                  {onDeleteEval && (
                    <td>
                      <button
                        type="button"
                        className="btn-ghost icon-btn"
                        title="Delete eval"
                        onClick={(e) => { e.stopPropagation(); onDeleteEval(row.id); }}
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
          <h3><MessageSquare size={16} /> Prompt tests <InfoTooltip term="Prompt tests" definition="Individual test cases: a user input and the expected AI behavior. Used in evals and regression suites to catch broken or wrong answers." /></h3>
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
                {onDeletePromptTest && <th style={{ width: 48 }} />}
              </tr>
            </thead>
            <tbody>
              {promptTests.map((row) => (
                <tr key={row.id} className="clickable-row" onClick={() => onEditPromptTest?.(row)}>
                  <td>{row.name}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{row.input}</td>
                  <td>{row.expected}</td>
                  <td><span className={`status-pill ${row.status === 'pass' ? 'success' : 'error'}`}>{row.status}</span></td>
                  {onDeletePromptTest && (
                    <td>
                      <button
                        type="button"
                        className="btn-ghost icon-btn"
                        title="Delete test"
                        onClick={(e) => { e.stopPropagation(); onDeletePromptTest(row.id); }}
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
