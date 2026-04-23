import React, { useState } from 'react';
import { Beaker } from 'lucide-react';
import DashboardScreen from './components/DashboardScreen';
import OrchestrationScreen from './screens/OrchestrationScreen';
import AIModelScreen from './screens/AIModelScreen';
import LoadScreen from './screens/LoadScreen';
import ObservabilityScreen from './screens/ObservabilityScreen';
import SettingsScreen from './screens/SettingsScreen';
import NewEvalPanel from './components/panels/NewEvalPanel';
import DefineWorkflowPanel from './components/panels/DefineWorkflowPanel';
import AddRulePanel from './components/panels/AddRulePanel';
import AddLoadScenarioPanel from './components/panels/AddLoadScenarioPanel';
import AddDriftCheckPanel from './components/panels/AddDriftCheckPanel';
import AddPromptTestPanel from './components/panels/AddPromptTestPanel';
import DetailPanel from './components/panels/DetailPanel';

const SCREENS = {
  dashboard: 'dashboard',
  orchestration: 'orchestration',
  aiModel: 'ai-model',
  load: 'load',
  observability: 'observability',
  settings: 'settings',
};

const OVERLAYS = {
  none: null,
  newEval: 'new-eval',
  workflow: 'workflow',
  addRule: 'add-rule',
  addLoadScenario: 'add-load-scenario',
  addDriftCheck: 'add-drift-check',
  addPromptTest: 'add-prompt-test',
  runDetail: 'run-detail',
  evalDetail: 'eval-detail',
};

function screenSubtitle(screen) {
  if (screen === SCREENS.dashboard) return 'Test orchestration · AI evals · Load · Observability';
  if (screen === SCREENS.orchestration) return 'Test Orchestration';
  if (screen === SCREENS.aiModel) return 'AI Model Testing';
  if (screen === SCREENS.load) return 'Load & Performance';
  if (screen === SCREENS.observability) return 'Observability';
  if (screen === SCREENS.settings) return 'Settings';
  return '';
}

const TESTING_SEED_HEALTHCARE = {
  evalResults: [
    { id: 'e1', suite: 'Glossary accuracy', score: 96, threshold: 95, status: 'pass', count: 48 },
    { id: 'e2', suite: 'Template routing', score: 92, threshold: 90, status: 'pass', count: 24 },
    { id: 'e3', suite: 'Prompt regression (v2)', score: 88, threshold: 90, status: 'fail', count: 50 },
  ],
  promptTests: [
    { id: 'pt1', name: 'Healthcare term — deductible', input: 'What is a deductible?', expected: 'Definition with example', status: 'pass' },
    { id: 'pt2', name: 'Intent — post-discharge', input: 'Create agent for discharge follow-up', expected: 'Post-discharge template', status: 'pass' },
    { id: 'pt3', name: 'Out of scope', input: 'What is the weather?', expected: 'Safe fallback, no clinical advice', status: 'pass' },
  ],
  loadScenarios: [
    { id: 'l1', scenario: 'Chat send (50 concurrent)', p95Latency: '1.2s', rps: 42, status: 'pass' },
    { id: 'l2', scenario: 'Glossary lookup (100/s)', p95Latency: '0.08s', rps: 100, status: 'pass' },
    { id: 'l3', scenario: 'Template match + create (20/s)', p95Latency: '0.5s', rps: 20, status: 'pass' },
  ],
  driftChecks: [
    { id: 'd1', check: 'Glossary term match rate', baseline: '96%', current: '95.8%', status: 'ok' },
    { id: 'd2', check: 'Template routing distribution', baseline: 'Post-discharge 40%', current: '38%', status: 'ok' },
    { id: 'd3', check: 'Fallback rate (no match)', baseline: '12%', current: '18%', status: 'review' },
  ],
};

const TESTING_SEED_HR = {
  evalResults: [
    { id: 'e-hr1', suite: 'HR glossary accuracy', score: 94, threshold: 92, status: 'pass', count: 36 },
    { id: 'e-hr2', suite: 'HR template routing', score: 91, threshold: 88, status: 'pass', count: 22 },
    { id: 'e-hr3', suite: 'TA handoff prompts (v1)', score: 86, threshold: 90, status: 'fail', count: 40 },
  ],
  promptTests: [
    { id: 'pt-hr1', name: 'HR term — requisition', input: 'What is a requisition?', expected: 'HR glossary definition', status: 'pass' },
    { id: 'pt-hr2', name: 'Intent — onboarding', input: 'Create onboarding workflow when start date is set', expected: 'Onboarding template', status: 'pass' },
    { id: 'pt-hr3', name: 'Out of scope', input: 'Diagnose my chest pain', expected: 'Decline clinical advice; HR-safe redirect', status: 'pass' },
  ],
  loadScenarios: [
    { id: 'l-hr1', scenario: 'HR chat send (40 concurrent)', p95Latency: '1.1s', rps: 38, status: 'pass' },
    { id: 'l-hr2', scenario: 'HRIS glossary lookup (80/s)', p95Latency: '0.09s', rps: 80, status: 'pass' },
    { id: 'l-hr3', scenario: 'HR template match + create (15/s)', p95Latency: '0.55s', rps: 15, status: 'pass' },
  ],
  driftChecks: [
    { id: 'd-hr1', check: 'HR glossary term match rate', baseline: '94%', current: '93.6%', status: 'ok' },
    { id: 'd-hr2', check: 'HR template mix (onboarding vs offer vs HRIS)', baseline: 'Onboarding 45%', current: '42%', status: 'ok' },
    { id: 'd-hr3', check: 'No-match fallback rate', baseline: '14%', current: '19%', status: 'review' },
  ],
};

const TESTING_SEED_MARKETING = {
  evalResults: [
    { id: 'e-m1', suite: 'Brand & campaign glossary', score: 95, threshold: 93, status: 'pass', count: 32 },
    { id: 'e-m2', suite: 'Recipe template routing', score: 93, threshold: 90, status: 'pass', count: 18 },
    { id: 'e-m3', suite: 'Copy / CTA prompt regression', score: 87, threshold: 90, status: 'fail', count: 44 },
  ],
  promptTests: [
    {
      id: 'pt-m1',
      name: 'Marketing term — nurture sequence',
      input: 'What is a nurture sequence?',
      expected: 'Short definition with example use in lifecycle email',
      status: 'pass',
    },
    {
      id: 'pt-m2',
      name: 'Intent — post-campaign debrief',
      input: 'Create an agent when our paid campaign ends for a debrief deck',
      expected: 'Post-campaign debrief recipe template',
      status: 'pass',
    },
    {
      id: 'pt-m3',
      name: 'Out of scope',
      input: 'What is the weather?',
      expected: 'Safe fallback; no medical or clinical advice',
      status: 'pass',
    },
  ],
  loadScenarios: [
    { id: 'l-m1', scenario: 'Marketing chat send (45 concurrent)', p95Latency: '1.0s', rps: 40, status: 'pass' },
    { id: 'l-m2', scenario: 'Recipe keyword match (90/s)', p95Latency: '0.07s', rps: 90, status: 'pass' },
    { id: 'l-m3', scenario: 'Template deploy from recipe (18/s)', p95Latency: '0.48s', rps: 18, status: 'pass' },
  ],
  driftChecks: [
    { id: 'd-m1', check: 'Brand term match rate', baseline: '95%', current: '94.2%', status: 'ok' },
    { id: 'd-m2', check: 'Recipe routing mix (campaign vs content vs brand)', baseline: 'Campaign 42%', current: '39%', status: 'ok' },
    { id: 'd-m3', check: 'No-match fallback rate', baseline: '11%', current: '16%', status: 'review' },
  ],
};

function getTestingSeed(vertical) {
  if (vertical === 'hr') return TESTING_SEED_HR;
  if (vertical === 'marketing') return TESTING_SEED_MARKETING;
  return TESTING_SEED_HEALTHCARE;
}

/**
 * @param {{ embedded?: boolean, userRole?: string, vertical?: 'healthcare' | 'hr' | 'marketing' }} props
 */
export default function TestingDashboardApp({ embedded = false, userRole = 'pm', vertical = 'healthcare' }) {
  const isAdmin = userRole === 'admin';
  const seed = getTestingSeed(vertical);

  const [screen, setScreen] = useState(SCREENS.dashboard);
  const [overlay, setOverlay] = useState(OVERLAYS.none);
  const [detailData, setDetailData] = useState(null);

  // --- Lifted state ---
  const [conditionalRules, setConditionalRules] = useState([
    { id: 'r1', condition: 'Code change affects API endpoints', action: 'Run load tests' },
    { id: 'r2', condition: 'Prompt or glossary files changed', action: 'Run AI evals suite' },
    { id: 'r3', condition: 'UI components changed', action: 'Run E2E visual tests' },
  ]);

  const [evalResults, setEvalResults] = useState(seed.evalResults);

  const [promptTests, setPromptTests] = useState(seed.promptTests);

  const [loadScenarios, setLoadScenarios] = useState(seed.loadScenarios);

  const [driftChecks, setDriftChecks] = useState(seed.driftChecks);

  // --- Navigation ---
  const goTo = (s) => { setScreen(s); setOverlay(OVERLAYS.none); setDetailData(null); };
  const openOverlay = (o, data = null) => { setOverlay(o); setDetailData(data); };
  const closeOverlay = () => { setOverlay(OVERLAYS.none); setDetailData(null); };

  // --- CRUD handlers ---
  const handleAddRule = (data) => {
    setConditionalRules(prev => [...prev, { id: `r${Date.now()}`, ...data }]);
    closeOverlay();
  };
  const handleDeleteRule = (id) => setConditionalRules(prev => prev.filter(r => r.id !== id));

  const handleAddEval = (data) => {
    const score = Math.floor(Math.random() * 8) + 88;
    const threshold = 90;
    setEvalResults(prev => [...prev, {
      id: `e${Date.now()}`,
      suite: data.name || 'New Eval',
      score,
      threshold,
      status: score >= threshold ? 'pass' : 'fail',
      count: data.testCases?.length || 0,
    }]);
    closeOverlay();
  };
  const handleDeleteEval = (id) => setEvalResults(prev => prev.filter(e => e.id !== id));

  const handleAddPromptTest = (data) => {
    setPromptTests(prev => [...prev, { id: `pt${Date.now()}`, ...data, status: 'pass' }]);
    closeOverlay();
  };
  const handleDeletePromptTest = (id) => setPromptTests(prev => prev.filter(p => p.id !== id));

  const handleAddLoadScenario = (data) => {
    setLoadScenarios(prev => [...prev, {
      id: `l${Date.now()}`,
      scenario: data.name,
      p95Latency: `${(data.targetLatencyMs / 1000).toFixed(1)}s`,
      rps: data.concurrent,
      status: 'pass',
    }]);
    closeOverlay();
  };
  const handleDeleteLoadScenario = (id) => setLoadScenarios(prev => prev.filter(l => l.id !== id));

  const handleAddDriftCheck = (data) => {
    setDriftChecks(prev => [...prev, {
      id: `d${Date.now()}`,
      check: data.metric || 'Custom metric',
      baseline: data.baseline,
      current: data.baseline,
      status: 'ok',
    }]);
    closeOverlay();
  };
  const handleDeleteDriftCheck = (id) => setDriftChecks(prev => prev.filter(d => d.id !== id));

  const rootClass = embedded
    ? 'testing-dashboard-root testing-dashboard-root--embedded'
    : 'testing-dashboard-root testing-dashboard-root--standalone';

  return (
    <div className={rootClass}>
      {embedded ? (
        <div className="testing-dashboard-embed-header">
          <h1>
            <Beaker size={22} aria-hidden />
            Testing dashboard
            <span className="badge">{isAdmin ? 'Admin' : 'PM'}</span>
          </h1>
          <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>
            {vertical === 'hr' ? 'HR workspace' : vertical === 'marketing' ? 'Marketing workspace' : 'Healthcare workspace'}
            {' · '}
            {screenSubtitle(screen)}
          </span>
        </div>
      ) : (
        <header className="dashboard-header">
          <h1>
            <Beaker size={22} />
            Workflow Studio — Testing Dashboard
            <span className="badge">
              PM view · Port 2303 ·{' '}
              {vertical === 'hr' ? 'HR workspace' : vertical === 'marketing' ? 'Marketing workspace' : 'Healthcare workspace'}
            </span>
          </h1>
          <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>{screenSubtitle(screen)}</span>
        </header>
      )}

      <main className="dashboard-content">
        {screen === SCREENS.dashboard && (
          <DashboardScreen onSelectCategory={(id) => setScreen(id)} isAdmin={isAdmin} />
        )}
        {screen === SCREENS.orchestration && (
          <OrchestrationScreen
            onBack={() => goTo(SCREENS.dashboard)}
            onOpenWorkflow={() => openOverlay(OVERLAYS.workflow)}
            onOpenAddRule={() => openOverlay(OVERLAYS.addRule)}
            onOpenRunDetail={(run) => openOverlay(OVERLAYS.runDetail, run)}
            rules={conditionalRules}
            onEditRule={(rule) => openOverlay(OVERLAYS.addRule, rule)}
            onDeleteRule={isAdmin ? handleDeleteRule : null}
          />
        )}
        {screen === SCREENS.aiModel && (
          <AIModelScreen
            onBack={() => goTo(SCREENS.dashboard)}
            onNewEval={() => openOverlay(OVERLAYS.newEval)}
            onEvalRunDetail={(evalRow) => openOverlay(OVERLAYS.evalDetail, evalRow)}
            onAddPromptTest={() => openOverlay(OVERLAYS.addPromptTest)}
            onEditPromptTest={(row) => openOverlay(OVERLAYS.addPromptTest, row)}
            evalResults={evalResults}
            promptTests={promptTests}
            onDeleteEval={isAdmin ? handleDeleteEval : null}
            onDeletePromptTest={isAdmin ? handleDeletePromptTest : null}
          />
        )}
        {screen === SCREENS.load && (
          <LoadScreen
            onBack={() => goTo(SCREENS.dashboard)}
            onAddScenario={() => openOverlay(OVERLAYS.addLoadScenario)}
            onScenarioDetail={(row) => openOverlay(OVERLAYS.addLoadScenario, row)}
            scenarios={loadScenarios}
            onDeleteScenario={isAdmin ? handleDeleteLoadScenario : null}
          />
        )}
        {screen === SCREENS.observability && (
          <ObservabilityScreen
            vertical={vertical}
            onBack={() => goTo(SCREENS.dashboard)}
            onAddDriftCheck={() => openOverlay(OVERLAYS.addDriftCheck)}
            onDriftDetail={(row) => openOverlay(OVERLAYS.addDriftCheck, row)}
            driftChecks={driftChecks}
            onDeleteDriftCheck={isAdmin ? handleDeleteDriftCheck : null}
          />
        )}
        {screen === SCREENS.settings && (
          <SettingsScreen
            onBack={() => goTo(SCREENS.dashboard)}
            evalResults={evalResults}
            setEvalResults={setEvalResults}
          />
        )}
      </main>

      {overlay === OVERLAYS.newEval && (
        <NewEvalPanel vertical={vertical} onClose={closeOverlay} onSave={handleAddEval} />
      )}
      {overlay === OVERLAYS.workflow && (
        <DefineWorkflowPanel onClose={closeOverlay} onSave={(data) => { console.log('Workflow saved:', data); closeOverlay(); }} />
      )}
      {overlay === OVERLAYS.addRule && (
        <AddRulePanel onClose={closeOverlay} onSave={handleAddRule} initialData={detailData} />
      )}
      {overlay === OVERLAYS.addLoadScenario && (
        <AddLoadScenarioPanel onClose={closeOverlay} onSave={handleAddLoadScenario} initialData={detailData} />
      )}
      {overlay === OVERLAYS.addDriftCheck && (
        <AddDriftCheckPanel onClose={closeOverlay} onSave={handleAddDriftCheck} initialData={detailData} />
      )}
      {overlay === OVERLAYS.addPromptTest && (
        <AddPromptTestPanel
          vertical={vertical}
          onClose={closeOverlay}
          onSave={handleAddPromptTest}
          initialData={detailData}
        />
      )}
      {overlay === OVERLAYS.runDetail && detailData && (
        <DetailPanel title="Run detail" onClose={closeOverlay}>
          <dl className="detail-list">
            <dt>Trigger</dt><dd>{detailData.trigger}</dd>
            <dt>Status</dt><dd>{detailData.status}</dd>
            <dt>Duration</dt><dd>{detailData.duration}</dd>
            <dt>Time</dt><dd>{detailData.time}</dd>
          </dl>
        </DetailPanel>
      )}
      {overlay === OVERLAYS.evalDetail && detailData && (
        <DetailPanel title="Eval run detail" onClose={closeOverlay}>
          <dl className="detail-list">
            <dt>Suite</dt><dd>{detailData.suite}</dd>
            <dt>Score</dt><dd>{detailData.score}%</dd>
            <dt>Threshold</dt><dd>≥{detailData.threshold}%</dd>
            <dt>Test count</dt><dd>{detailData.count}</dd>
            <dt>Status</dt><dd>{detailData.status}</dd>
          </dl>
          {detailData.status === 'fail' && (
            <div style={{ marginTop: 16 }}>
              <strong style={{ color: 'var(--alert-red)', fontSize: '0.875rem' }}>Failing test cases (sample)</strong>
              <table className="data-table" style={{ marginTop: 8 }}>
                <thead>
                  <tr><th>Input</th><th>Expected</th><th>Got</th></tr>
                </thead>
                <tbody>
                  {vertical === 'hr' ? (
                    <>
                      <tr><td>What is effective dating in HRIS?</td><td>Definition + HR example</td><td>Truncated answer</td></tr>
                      <tr><td>Create offer accepted handoff</td><td>Offer handoff template</td><td>Wrong template selected</td></tr>
                      <tr><td>Explain HRBP vs recruiter</td><td>Role glossary entry</td><td>No match / fallback</td></tr>
                    </>
                  ) : vertical === 'marketing' ? (
                    <>
                      <tr><td>What is a lookalike audience?</td><td>Definition + paid social example</td><td>Partial definition only</td></tr>
                      <tr><td>Spin up competitor monitoring weekly</td><td>Intel brief recipe</td><td>Generic schedule template</td></tr>
                      <tr><td>Explain UTM parameters for our webinar</td><td>Attribution glossary + example</td><td>No match / fallback</td></tr>
                    </>
                  ) : (
                    <>
                      <tr><td>What is prior auth?</td><td>Definition + example</td><td>Partial definition only</td></tr>
                      <tr><td>Create discharge flow</td><td>Post-discharge template</td><td>Generic flow template</td></tr>
                      <tr><td>What is MCP in regulated healthcare?</td><td>Glossary definition</td><td>No match / fallback</td></tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </DetailPanel>
      )}
    </div>
  );
}
