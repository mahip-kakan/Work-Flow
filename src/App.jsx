import React, { useState, useRef, useEffect } from 'react';
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
import FlowHelpPanel from './components/FlowHelpPanel';
import TestDataPanel from './components/TestDataPanel';
import HealthcareGlossary from './components/HealthcareGlossary';
import AIChatPanel from './components/AIChatPanel';
import ChatAssistantButton from './components/ChatAssistantButton';
import TestingDashboardApp from './testing-dashboard/TestingDashboardApp';

function App() {
  // View state
  const [activeView, setActiveView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedClient, setSelectedClient] = useState('optimus');
  const [userRole, setUserRole] = useState('developer');
  const viewBeforeTestingRef = useRef('home');
  
  // Chat assistant state
  const [showChatAssistant, setShowChatAssistant] = useState(false);

  // Current flow being edited
  const [currentFlow, setCurrentFlow] = useState(null);

  // Selected step for configuration
  const [selectedStep, setSelectedStep] = useState(null); // { type: 'trigger' | 'action', index?: number }

  // All saved flows
  const [savedFlows, setSavedFlows] = useState([
    {
      id: 'cc-1',
      name: 'Post-Discharge Follow-Up',
      trigger: {
        id: 'patient-discharge',
        name: 'When patient is discharged',
        description: 'Discharge ADT event received from EHR',
        icon: 'LogOut',
        color: '#DC2626'
      },
      actions: [
        {
          id: 'create-care-plan',
          name: 'Create care plan',
          description: 'Generate post-discharge care plan with medication reconciliation',
          icon: 'FileText',
          color: '#DC2626',
          module: 'Clinical Care'
        },
        {
          id: 'create-care-task',
          name: 'Create care team task',
          description: 'Assign follow-up call task to care coordinator',
          icon: 'ClipboardCheck',
          color: '#DC2626',
          module: 'Clinical Care'
        },
        {
          id: 'send-teams',
          name: 'Send Teams message',
          description: 'Notify care team of new discharge',
          icon: 'MessageCircle',
          color: '#5558af',
          module: null
        }
      ],
      isActive: true
    },
    {
      id: '2',
      name: 'Readmission Risk Alert',
      trigger: {
        id: 'readmission-risk-flagged',
        name: 'When readmission risk is flagged',
        description: '30-day readmission probability > 40%',
        icon: 'AlertTriangle',
        color: '#DC2626'
      },
      actions: [
        {
          id: 'in-app-notification',
          name: 'Push in-app notification',
          description: 'Alert care coordinator inside Gravity',
          icon: 'Bell',
          color: '#1B2B5E',
          module: null
        }
      ],
      isActive: false
    },
    {
      id: '3',
      name: 'Appointment Reminder Automation',
      trigger: {
        id: 'appointment-scheduled',
        name: 'When appointment is scheduled',
        description: 'New appointment created in scheduling system',
        icon: 'Calendar',
        color: '#D97706'
      },
      actions: [
        {
          id: 'send-appointment-reminder',
          name: 'Send appointment reminder',
          description: 'Send SMS, email, or phone call based on patient preference',
          icon: 'Bell',
          color: '#D97706',
          module: 'Patient Experience'
        },
        {
          id: 'send-pre-visit-instructions',
          name: 'Send pre-visit instructions',
          description: 'Deliver preparation instructions and forms',
          icon: 'FileText',
          color: '#D97706',
          module: 'Patient Experience'
        }
      ],
      isActive: true
    }
  ]);

  // Panel state: null, 'trigger', 'action'
  const [activePanel, setActivePanel] = useState(null);

  // Help panel state
  const [showHelpPanel, setShowHelpPanel] = useState(false);
  const [helpFlow, setHelpFlow] = useState(null);

  // Test panel state
  const [showTestPanel, setShowTestPanel] = useState(false);
  const [isTestRunning, setIsTestRunning] = useState(false);

  useEffect(() => {
    if (activeView === 'testing-dashboard' && userRole === 'developer') {
      setActiveView('home');
    }
  }, [activeView, userRole]);

  const handleUserRoleChange = (role) => {
    if (role === 'developer') {
      setUserRole('developer');
      if (activeView === 'testing-dashboard') {
        setActiveView(viewBeforeTestingRef.current);
      }
      setSelectedStep(null);
      return;
    }
    if (userRole === 'developer') {
      viewBeforeTestingRef.current = activeView;
      setUserRole(role);
      setActiveView('testing-dashboard');
      setSelectedProduct(null);
      setSelectedStep(null);
      return;
    }
    setUserRole(role);
  };

  // Create new flow
  const handleNewFlow = () => {
    const newFlow = {
      id: Date.now().toString(),
      name: 'Untitled agent',
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
      name: flowData.name || 'Untitled agent',
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
    setSelectedStep({ type: 'trigger' });
  };

  // Select action
  const handleSelectAction = (action) => {
    const newActions = [...currentFlow.actions, action];
    setCurrentFlow({ ...currentFlow, actions: newActions });
    setActivePanel(null);
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

  // Handle product/domain selection
  const handleSelectProduct = (productName) => {
    setSelectedProduct(productName);
    setActiveView('product-flows');
  };

  // Handle back from product flows
  const handleBackFromProduct = () => {
    setSelectedProduct(null);
    setActiveView('discover');
  };

  // Show help panel for current flow
  const handleShowHelp = () => {
    setHelpFlow(currentFlow);
    setShowHelpPanel(true);
  };

  // Show help panel for template flow
  const handleShowTemplateHelp = (flow) => {
    setHelpFlow(flow);
    setShowHelpPanel(true);
  };

  // Handle test run
  const handleTestRun = () => {
    setShowTestPanel(true);
  };

  // Handle flow activation/deactivation
  const handleActivateFlow = () => {
    if (!currentFlow) return;
    
    const updatedFlow = { ...currentFlow, isActive: !currentFlow.isActive };
    setCurrentFlow(updatedFlow);
    
    // Update in saved flows
    const existingIndex = savedFlows.findIndex(f => f.id === currentFlow.id);
    if (existingIndex >= 0) {
      const updated = [...savedFlows];
      updated[existingIndex] = updatedFlow;
      setSavedFlows(updated);
    } else {
      setSavedFlows([...savedFlows, updatedFlow]);
    }
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
        userRole={userRole}
        onUserRoleChange={handleUserRoleChange}
      />

      <div className="app-body">
        <Sidebar
          onNewFlow={handleNewFlow}
          activeView={activeView}
          userRole={userRole}
          setActiveView={(view) => {
            setActiveView(view);
            if (view !== 'product-flows') {
              setSelectedProduct(null);
            }
            setSelectedStep(null);
          }}
        />

        <main className="main-content">
          {activeView === 'testing-dashboard' && (userRole === 'pm' || userRole === 'admin') ? (
            <TestingDashboardApp embedded userRole={userRole} />
          ) : (
            <>
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
              onShowHelp={handleShowTemplateHelp}
            />
          )}

          {activeView === 'my-flows' && (
            <MyFlowsView
              flows={savedFlows}
              onEditFlow={handleEditFlow}
              onNewFlow={handleNewFlow}
            />
          )}

          {activeView === 'glossary' && (
            <HealthcareGlossary />
          )}

          {activeView === 'editor' && currentFlow && (
            <div className="editor-layout">
              <div className="editor-main">
                <FlowHeader
                  flowName={currentFlow.name}
                  onBack={handleBack}
                  onNameChange={handleNameChange}
                  onShowHelp={handleShowHelp}
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
                  onTestRun={handleTestRun}
                  onActivate={handleActivateFlow}
                  isActive={currentFlow.isActive}
                  isRunning={isTestRunning}
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
            </>
          )}
        </main>
      </div>

      {/* Help Panel */}
      {showHelpPanel && (
        <FlowHelpPanel
          flow={helpFlow}
          onClose={() => {
            setShowHelpPanel(false);
            setHelpFlow(null);
          }}
        />
      )}

      {/* Test Data Panel */}
      {showTestPanel && currentFlow && (
        <TestDataPanel
          flow={currentFlow}
          onClose={() => {
            setShowTestPanel(false);
            setIsTestRunning(false);
          }}
          onRunTest={(results) => {
            console.log('Test results:', results);
            setIsTestRunning(false);
          }}
        />
      )}

      {/* Global Chat Assistant Button */}
      <ChatAssistantButton
        onClick={() => setShowChatAssistant(!showChatAssistant)}
        isOpen={showChatAssistant}
      />

      {/* Global Chat Assistant Panel */}
      {showChatAssistant && (
        <AIChatPanel
          onClose={() => setShowChatAssistant(false)}
          onCreateFlow={handleCreateFlow}
          onSelectTemplate={handleSelectTemplate}
        />
      )}
    </div>
  );
}

export default App;
