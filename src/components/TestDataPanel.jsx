import React, { useState } from 'react';
import { X, Play, CheckCircle, Clock, AlertCircle, User, Calendar, FileText, ClipboardCheck, MessageCircle } from 'lucide-react';

const TestDataPanel = ({ flow, onClose, onRunTest }) => {
  const [testStatus, setTestStatus] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // Generate test data based on flow type
  const getTestData = (flowId) => {
    const testDataMap = {
      'cc-1': {
        trigger: {
          event: 'Patient Discharge',
          patient: {
            id: 'PAT-12345',
            name: 'John Smith',
            age: 67,
            mrn: 'MRN-987654',
            admissionDate: '2024-01-15',
            dischargeDate: '2024-01-18',
            dischargeDiagnosis: 'Acute myocardial infarction',
            attendingPhysician: 'Dr. Sarah Johnson',
            primaryCareProvider: 'Dr. Michael Chen'
          },
          facility: {
            name: 'Optimus Health Medical Center',
            location: 'Main Campus',
            department: 'Cardiology'
          }
        },
        actions: [
          {
            step: 1,
            name: 'Create care plan',
            status: 'pending',
            data: {
              carePlanId: 'CP-2024-001',
              medications: [
                { name: 'Aspirin', dosage: '81mg', frequency: 'Daily' },
                { name: 'Atorvastatin', dosage: '40mg', frequency: 'Daily' },
                { name: 'Metoprolol', dosage: '25mg', frequency: 'Twice daily' }
              ],
              followUpRequired: true,
              followUpDate: '2024-01-25',
              instructions: 'Monitor blood pressure daily, take medications as prescribed'
            }
          },
          {
            step: 2,
            name: 'Create care team task',
            status: 'pending',
            data: {
              taskId: 'TASK-2024-001',
              assignedTo: 'Care Coordinator - Mary Williams',
              priority: 'High',
              dueDate: '2024-01-20',
              description: 'Follow-up call with patient within 48 hours of discharge'
            }
          },
          {
            step: 3,
            name: 'Send Teams message',
            status: 'pending',
            data: {
              messageId: 'MSG-2024-001',
              recipients: ['Care Team - Cardiology', 'Dr. Sarah Johnson'],
              channel: 'Cardiology Care Team',
              message: 'New discharge: John Smith (MRN-987654) discharged on 2024-01-18. Care plan created and task assigned.'
            }
          }
        ]
      }
    };

    return testDataMap[flowId] || {
      trigger: { event: 'Test Event', patient: { name: 'Test Patient' } },
      actions: []
    };
  };

  const testData = getTestData(flow?.id);

  const handleRunTest = async () => {
    setIsRunning(true);
    setTestStatus('running');

    // Simulate test execution with delays
    const actions = [...testData.actions];
    
    for (let i = 0; i < actions.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      actions[i].status = 'success';
      setTestStatus({ ...testStatus, actions: [...actions] });
    }

    setIsRunning(false);
    setTestStatus('completed');
    
    if (onRunTest) {
      onRunTest({ success: true, executionTime: '4.2s', actionsCompleted: actions.length });
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} className="status-success" />;
      case 'running':
        return <Clock size={16} className="status-running" />;
      case 'failed':
        return <AlertCircle size={16} className="status-failed" />;
      default:
        return <Clock size={16} className="status-pending" />;
    }
  };

  return (
    <div className="test-data-panel-overlay" onClick={onClose}>
      <div className="test-data-panel" onClick={(e) => e.stopPropagation()}>
        <div className="test-panel-header">
          <div className="test-panel-title">
            <Play size={24} />
            <h2>Test Run: {flow?.name}</h2>
          </div>
          <button className="test-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="test-panel-content">
          {/* Test Data Preview */}
          <div className="test-section">
            <h3>Test Data</h3>
            <div className="test-data-preview">
              <div className="test-data-item">
                <strong>Trigger Event:</strong>
                <span>{testData.trigger.event}</span>
              </div>
              {testData.trigger.patient && (
                <div className="test-data-card">
                  <div className="test-data-header">
                    <User size={18} />
                    <strong>Patient Information</strong>
                  </div>
                  <div className="test-data-grid">
                    <div><strong>Name:</strong> {testData.trigger.patient.name}</div>
                    <div><strong>MRN:</strong> {testData.trigger.patient.mrn}</div>
                    <div><strong>Age:</strong> {testData.trigger.patient.age}</div>
                    <div><strong>Discharge Date:</strong> {testData.trigger.patient.dischargeDate}</div>
                    <div><strong>Diagnosis:</strong> {testData.trigger.patient.dischargeDiagnosis}</div>
                    <div><strong>Attending:</strong> {testData.trigger.patient.attendingPhysician}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions Preview */}
          <div className="test-section">
            <h3>Actions to Execute</h3>
            <div className="test-actions-list">
              {testData.actions.map((action, index) => (
                <div key={index} className="test-action-item">
                  <div className="test-action-header">
                    {getStatusIcon(action.status || 'pending')}
                    <div className="test-action-info">
                      <strong>Step {action.step}: {action.name}</strong>
                      <span className="test-action-status">
                        {action.status === 'success' ? 'Completed' : 
                         action.status === 'running' ? 'Running...' : 
                         action.status === 'failed' ? 'Failed' : 'Pending'}
                      </span>
                    </div>
                  </div>
                  {action.data && (
                    <div className="test-action-details">
                      {action.data.carePlanId && (
                        <div className="detail-item">
                          <FileText size={14} />
                          <span>Care Plan ID: {action.data.carePlanId}</span>
                        </div>
                      )}
                      {action.data.taskId && (
                        <div className="detail-item">
                          <ClipboardCheck size={14} />
                          <span>Task ID: {action.data.taskId}</span>
                        </div>
                      )}
                      {action.data.messageId && (
                        <div className="detail-item">
                          <MessageCircle size={14} />
                          <span>Message ID: {action.data.messageId}</span>
                        </div>
                      )}
                      {action.data.assignedTo && (
                        <div className="detail-item">
                          <User size={14} />
                          <span>Assigned to: {action.data.assignedTo}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Test Controls */}
          <div className="test-controls">
            <button 
              className="test-run-btn"
              onClick={handleRunTest}
              disabled={isRunning || testStatus === 'completed'}
            >
              {isRunning ? (
                <>
                  <Clock size={18} />
                  Running test...
                </>
              ) : testStatus === 'completed' ? (
                <>
                  <CheckCircle size={18} />
                  Test Completed
                </>
              ) : (
                <>
                  <Play size={18} />
                  Run Test
                </>
              )}
            </button>
            {testStatus === 'completed' && (
              <div className="test-results">
                <div className="result-item success">
                  <CheckCircle size={16} />
                  <span>All actions completed successfully</span>
                </div>
                <div className="result-item">
                  <Clock size={16} />
                  <span>Execution time: 4.2s</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDataPanel;
