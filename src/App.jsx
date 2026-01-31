import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FlowHeader from './components/FlowHeader';
import FlowCanvas from './components/FlowCanvas';
import TriggerPanel from './components/TriggerPanel';
import ActionPanel from './components/ActionPanel';
import TriggerConfigPanel from './components/TriggerConfigPanel';
import ActionConfigPanel from './components/ActionConfigPanel';
import AILandingPage from './components/AILandingPage';
import DiscoverView from './components/DiscoverView';
import MyFlowsView from './components/MyFlowsView';
import ProductFlowsView from './components/ProductFlowsView';
import AnalyticsDashboard from './components/AnalyticsDashboard';

function App() {
  // View state
  const [activeView, setActiveView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedClient, setSelectedClient] = useState('carters');
  
  // Current flow being edited
  const [currentFlow, setCurrentFlow] = useState(null);
  
  // Selected step for configuration
  const [selectedStep, setSelectedStep] = useState(null); // { type: 'trigger' | 'action', index?: number }
  
  // All saved flows
  const [savedFlows, setSavedFlows] = useState([
    {
      id: '1',
      name: 'Daily Morning Briefing',
      trigger: {
        id: 'on-schedule',
        name: 'On a schedule',
        description: 'Every Monday at 8:00 AM',
        icon: 'Clock',
        color: '#4285f4'
      },
      actions: [
        {
          id: 'refresh-insights',
          name: 'Refresh insights',
          description: 'Update AI-generated insights',
          icon: 'Sparkles',
          color: '#f59e0b',
          product: 'MondaySmart'
        },
        {
          id: 'send-slack',
          name: 'Send Slack message',
          description: 'Alert team channels via Slack',
          icon: 'MessageSquare',
          color: '#4a154b',
          product: null
        }
      ],
      isActive: true
    },
    {
      id: '2',
      name: 'Low Inventory Alert',
      trigger: {
        id: 'kpi-threshold',
        name: 'When KPI threshold breached',
        description: 'WOH < 2 weeks',
        icon: 'AlertTriangle',
        color: '#ea4335'
      },
      actions: [
        {
          id: 'in-app-notification',
          name: 'Push in-app notification',
          description: 'Alert inventory managers',
          icon: 'Bell',
          color: '#4285f4',
          product: null
        }
      ],
      isActive: false
    },
    {
      id: '3',
      name: 'Weekly Forecast Refresh',
      trigger: {
        id: 'on-schedule',
        name: 'On a schedule',
        description: 'Every Friday at 6:00 PM',
        icon: 'Clock',
        color: '#4285f4'
      },
      actions: [
        {
          id: 'run-simulation',
          name: 'Run simulation pipeline',
          description: 'Execute Vertex AI simulation',
          icon: 'Play',
          color: '#0891b2',
          product: 'ItemSmart'
        },
        {
          id: 'refresh-forecast',
          name: 'Refresh forecast',
          description: 'Update demand forecast',
          icon: 'TrendingUp',
          color: '#0891b2',
          product: 'ItemSmart'
        },
        {
          id: 'send-email',
          name: 'Send email with report',
          description: 'Email weekly summary',
          icon: 'Mail',
          color: '#ea4335',
          product: null
        }
      ],
      isActive: true
    }
  ]);
  
  // Panel state: null, 'trigger', 'action'
  const [activePanel, setActivePanel] = useState(null);

  // Create new flow
  const handleNewFlow = () => {
    const newFlow = {
      id: Date.now().toString(),
      name: 'Untitled flow',
      trigger: null,
      actions: [],
      isActive: false
    };
    setCurrentFlow(newFlow);
    setActiveView('editor');
    setActivePanel(null);
    setSelectedStep(null);
  };

  // Create flow from template or AI
  const handleCreateFlow = (flowData) => {
    const newFlow = {
      id: Date.now().toString(),
      name: flowData.name || 'Untitled flow',
      trigger: flowData.trigger || null,
      actions: flowData.actions || [],
      isActive: false
    };
    setCurrentFlow(newFlow);
    setActiveView('editor');
    setActivePanel(null);
    setSelectedStep(null);
  };

  // Create flow from template
  const handleCreateFromTemplate = (template) => {
    const newFlow = {
      id: Date.now().toString(),
      name: template.name,
      trigger: template.trigger,
      actions: [...template.actions],
      isActive: false
    };
    setCurrentFlow(newFlow);
    setActiveView('editor');
    setActivePanel(null);
    setSelectedStep(null);
  };

  // Edit existing flow
  const handleEditFlow = (flow) => {
    setCurrentFlow({ ...flow, actions: [...flow.actions] });
    setActiveView('editor');
    setActivePanel(null);
    setSelectedStep(null);
  };

  // Go back from editor
  const handleBack = () => {
    if (currentFlow && (currentFlow.trigger || currentFlow.actions.length > 0)) {
      const existingIndex = savedFlows.findIndex(f => f.id === currentFlow.id);
      if (existingIndex >= 0) {
        const updated = [...savedFlows];
        updated[existingIndex] = currentFlow;
        setSavedFlows(updated);
      } else {
        setSavedFlows([...savedFlows, currentFlow]);
      }
    }
    setCurrentFlow(null);
    setActiveView('my-flows');
    setActivePanel(null);
    setSelectedStep(null);
  };

  // Update flow name
  const handleNameChange = (name) => {
    setCurrentFlow({ ...currentFlow, name });
  };

  // Select trigger
  const handleSelectTrigger = (trigger) => {
    setCurrentFlow({ ...currentFlow, trigger });
    setActivePanel(null);
    // Open trigger config panel
    setSelectedStep({ type: 'trigger' });
  };

  // Select action
  const handleSelectAction = (action) => {
    const newActions = [...currentFlow.actions, action];
    setCurrentFlow({ ...currentFlow, actions: newActions });
    setActivePanel(null);
    // Open action config panel for the new action
    setSelectedStep({ type: 'action', index: newActions.length - 1 });
  };

  // Handle trigger node click
  const handleTriggerClick = () => {
    if (currentFlow?.trigger) {
      setSelectedStep({ type: 'trigger' });
      setActivePanel(null);
    }
  };

  // Handle action node click
  const handleActionClick = (index) => {
    setSelectedStep({ type: 'action', index });
    setActivePanel(null);
  };

  // Close config panel
  const handleCloseConfig = () => {
    setSelectedStep(null);
  };

  // Remove trigger
  const handleRemoveTrigger = () => {
    setCurrentFlow({ ...currentFlow, trigger: null });
    setSelectedStep(null);
  };

  // Remove action
  const handleRemoveAction = (index) => {
    const newActions = [...currentFlow.actions];
    newActions.splice(index, 1);
    setCurrentFlow({ ...currentFlow, actions: newActions });
    setSelectedStep(null);
  };

  // Reorder action
  const handleReorderAction = (fromIndex, toIndex) => {
    const newActions = [...currentFlow.actions];
    const [moved] = newActions.splice(fromIndex, 1);
    newActions.splice(toIndex, 0, moved);
    setCurrentFlow({ ...currentFlow, actions: newActions });
  };

  // Handle template selection from Discover view
  const handleSelectTemplate = (template) => {
    handleNewFlow();
  };

  // Handle product selection
  const handleSelectProduct = (productName) => {
    setSelectedProduct(productName);
    setActiveView('product-flows');
  };

  // Handle back from product flows
  const handleBackFromProduct = () => {
    setSelectedProduct(null);
    setActiveView('discover');
  };

  // Determine which config panel to show
  const getConfigPanel = () => {
    if (!selectedStep || !currentFlow) return null;

    if (selectedStep.type === 'trigger' && currentFlow.trigger) {
      return (
        <TriggerConfigPanel
          trigger={currentFlow.trigger}
          onClose={handleCloseConfig}
          onSave={(config) => {
            // Save trigger config
            handleCloseConfig();
          }}
        />
      );
    }

    if (selectedStep.type === 'action' && selectedStep.index !== undefined) {
      const action = currentFlow.actions[selectedStep.index];
      if (action) {
        return (
          <ActionConfigPanel
            action={action}
            stepNumber={selectedStep.index + 2}
            onClose={handleCloseConfig}
            onSave={(config) => {
              // Save action config
              handleCloseConfig();
            }}
          />
        );
      }
    }

    return null;
  };

  return (
    <div className="app">
      <Header 
        selectedClient={selectedClient}
        onClientChange={setSelectedClient}
      />
      
      <div className="app-body">
        <Sidebar 
          onNewFlow={handleNewFlow}
          activeView={activeView}
          setActiveView={(view) => {
            setActiveView(view);
            if (view !== 'product-flows') {
              setSelectedProduct(null);
            }
            setSelectedStep(null);
          }}
        />

        <main className="main-content">
          {activeView === 'home' && (
            <AILandingPage 
              onSelectTemplate={handleSelectTemplate}
              onSelectProduct={handleSelectProduct}
              onCreateFlow={handleCreateFlow}
            />
          )}

          {activeView === 'analytics' && (
            <AnalyticsDashboard selectedClient={selectedClient} />
          )}

          {activeView === 'discover' && (
            <DiscoverView 
              onSelectTemplate={handleSelectTemplate}
              onSelectProduct={handleSelectProduct}
            />
          )}

          {activeView === 'product-flows' && selectedProduct && (
            <ProductFlowsView
              productName={selectedProduct}
              onBack={handleBackFromProduct}
              onSelectFlow={handleEditFlow}
              onCreateFromTemplate={handleCreateFromTemplate}
            />
          )}

          {activeView === 'my-flows' && (
            <MyFlowsView 
              flows={savedFlows}
              onEditFlow={handleEditFlow}
              onNewFlow={handleNewFlow}
            />
          )}

          {activeView === 'editor' && currentFlow && (
            <div className="editor-layout">
              <div className="editor-main">
                <FlowHeader 
                  flowName={currentFlow.name}
                  onBack={handleBack}
                  onNameChange={handleNameChange}
                />
                <FlowCanvas 
                  trigger={currentFlow.trigger}
                  actions={currentFlow.actions}
                  onSelectTrigger={() => setActivePanel('trigger')}
                  onSelectAction={() => setActivePanel('action')}
                  onRemoveTrigger={handleRemoveTrigger}
                  onRemoveAction={handleRemoveAction}
                  onReorderAction={handleReorderAction}
                  onTriggerClick={handleTriggerClick}
                  onActionClick={handleActionClick}
                  selectedStep={selectedStep}
                />
              </div>

              <div className={`editor-panel ${activePanel || selectedStep ? 'open' : ''}`}>
                {activePanel === 'trigger' && (
                  <TriggerPanel 
                    onSelectTrigger={handleSelectTrigger}
                    onClose={() => setActivePanel(null)}
                  />
                )}
                {activePanel === 'action' && (
                  <ActionPanel 
                    onSelectAction={handleSelectAction}
                    onClose={() => setActivePanel(null)}
                  />
                )}
                {!activePanel && getConfigPanel()}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
