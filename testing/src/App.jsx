import React, { useState } from 'react';
import { Beaker } from 'lucide-react';
import DashboardScreen from './components/DashboardScreen';
import OrchestrationScreen from './screens/OrchestrationScreen';
import AIModelScreen from './screens/AIModelScreen';
import LoadScreen from './screens/LoadScreen';
import ObservabilityScreen from './screens/ObservabilityScreen';
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

export default function App() {
  const [screen, setScreen] = useState(SCREENS.dashboard);
  const [overlay, setOverlay] = useState(OVERLAYS.none);
  const [detailData, setDetailData] = useState(null);

  const goTo = (s) => {
    setScreen(s);
    setOverlay(OVERLAYS.none);
    setDetailData(null);
  };

  const openOverlay = (o, data = null) => {
    setOverlay(o);
    setDetailData(data);
  };

  const closeOverlay = () => {
    setOverlay(OVERLAYS.none);
    setDetailData(null);
  };

  return (
    <div className="app">
      <header className="dashboard-header">
        <h1>
          <Beaker size={22} />
          Gravity AI Studio — Testing Dashboard
          <span className="badge">PM view · Port 2303</span>
        </h1>
        <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>
          {screen === SCREENS.dashboard && 'Test orchestration · AI evals · Load · Observability'}
          {screen === SCREENS.orchestration && 'Test Orchestration'}
          {screen === SCREENS.aiModel && 'AI Model Testing'}
          {screen === SCREENS.load && 'Load & Performance'}
          {screen === SCREENS.observability && 'Observability'}
        </span>
      </header>

      <main className="dashboard-content">
        {screen === SCREENS.dashboard && (
          <DashboardScreen onSelectCategory={(id) => setScreen(id)} />
        )}
        {screen === SCREENS.orchestration && (
          <OrchestrationScreen
            onBack={() => goTo(SCREENS.dashboard)}
            onOpenWorkflow={() => openOverlay(OVERLAYS.workflow)}
            onOpenAddRule={() => openOverlay(OVERLAYS.addRule)}
            onOpenRunDetail={(run) => openOverlay(OVERLAYS.runDetail, run)}
          />
        )}
        {screen === SCREENS.aiModel && (
          <AIModelScreen
            onBack={() => goTo(SCREENS.dashboard)}
            onNewEval={() => openOverlay(OVERLAYS.newEval)}
            onEvalRunDetail={(evalRow) => openOverlay(OVERLAYS.evalDetail, evalRow)}
            onAddPromptTest={() => openOverlay(OVERLAYS.addPromptTest)}
          />
        )}
        {screen === SCREENS.load && (
          <LoadScreen
            onBack={() => goTo(SCREENS.dashboard)}
            onAddScenario={() => openOverlay(OVERLAYS.addLoadScenario)}
            onScenarioDetail={(row) => openOverlay(OVERLAYS.addLoadScenario, row)}
          />
        )}
        {screen === SCREENS.observability && (
          <ObservabilityScreen
            onBack={() => goTo(SCREENS.dashboard)}
            onAddDriftCheck={() => openOverlay(OVERLAYS.addDriftCheck)}
            onDriftDetail={(row) => openOverlay(OVERLAYS.addDriftCheck, row)}
          />
        )}
      </main>

      {/* Overlays */}
      {overlay === OVERLAYS.newEval && (
        <NewEvalPanel
          onClose={closeOverlay}
          onSave={(data) => {
            console.log('New eval saved:', data);
            closeOverlay();
          }}
        />
      )}
      {overlay === OVERLAYS.workflow && (
        <DefineWorkflowPanel
          onClose={closeOverlay}
          onSave={(data) => {
            console.log('Workflow saved:', data);
            closeOverlay();
          }}
        />
      )}
      {overlay === OVERLAYS.addRule && (
        <AddRulePanel
          onClose={closeOverlay}
          onSave={(data) => {
            console.log('Rule added:', data);
            closeOverlay();
          }}
        />
      )}
      {overlay === OVERLAYS.addLoadScenario && (
        <AddLoadScenarioPanel
          onClose={closeOverlay}
          onSave={(data) => {
            console.log('Load scenario added:', data);
            closeOverlay();
          }}
        />
      )}
      {overlay === OVERLAYS.addDriftCheck && (
        <AddDriftCheckPanel
          onClose={closeOverlay}
          onSave={(data) => {
            console.log('Drift check added:', data);
            closeOverlay();
          }}
        />
      )}
      {overlay === OVERLAYS.addPromptTest && (
        <AddPromptTestPanel
          onClose={closeOverlay}
          onSave={(data) => {
            console.log('Prompt test added:', data);
            closeOverlay();
          }}
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
        </DetailPanel>
      )}
    </div>
  );
}
