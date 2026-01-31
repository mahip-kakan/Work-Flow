import React, { useState } from 'react';
import { X, MessageSquare, Mail, Play, RefreshCw, FileText, Bell, Upload } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const slackChannels = [
  { id: 'demand-planning', label: '#demand-planning' },
  { id: 'inventory-alerts', label: '#inventory-alerts' },
  { id: 'forecasting', label: '#forecasting' },
  { id: 'planning-team', label: '#planning-team' },
  { id: 'general', label: '#general' },
];

const emailRecipients = [
  { id: 'planning-team', label: 'planning-team@impactanalytics.co' },
  { id: 'demand-planners', label: 'demand-planners@impactanalytics.co' },
  { id: 'leadership', label: 'leadership@impactanalytics.co' },
];

const simulationTypes = [
  { id: 'full-refresh', label: 'Full refresh' },
  { id: 'incremental', label: 'Incremental update' },
  { id: 'affected-only', label: 'Affected SKUs only' },
];

const reportFormats = [
  { id: 'pdf', label: 'PDF Report' },
  { id: 'excel', label: 'Excel Workbook' },
  { id: 'csv', label: 'CSV Export' },
];

const ActionConfigPanel = ({ action, stepNumber, onClose, onSave }) => {
  const [config, setConfig] = useState({
    // Slack configs
    slackWorkspace: 'impact-analytics',
    slackChannel: 'demand-planning',
    messageTemplate: '🔔 {{flow_name}} Alert\n{{kpi_name}} is {{value}}\nThreshold: {{threshold}}',
    // Email configs
    emailRecipients: ['planning-team'],
    emailSubject: 'Weekly Forecast Report - {{date}}',
    includeDeviation: true,
    includeExcel: true,
    includeExecutive: false,
    bodyTemplate: 'default',
    // Simulation configs
    simulationType: 'full-refresh',
    scope: 'affected',
    timeHorizon: '12',
    waitForCompletion: true,
    notifyOnFailure: false,
    // Refresh configs
    refreshType: 'full',
    tables: 'all',
    // Report configs
    reportFormat: 'pdf',
    reportType: 'deviation',
  });

  const IconComponent = LucideIcons[action?.icon] || Bell;

  const availableVariables = [
    { id: 'flow_name', label: 'flow_name' },
    { id: 'kpi_name', label: 'kpi_name' },
    { id: 'value', label: 'value' },
    { id: 'threshold', label: 'threshold' },
    { id: 'date', label: 'date' },
    { id: 'time', label: 'time' },
  ];

  const renderSlackConfig = () => (
    <>
      <div className="config-description">
        Send a message to a Slack channel when this flow runs.
      </div>

      <div className="config-section">
        <label className="config-label">Workspace*</label>
        <select
          value={config.slackWorkspace}
          onChange={(e) => setConfig({ ...config, slackWorkspace: e.target.value })}
        >
          <option value="impact-analytics">Impact Analytics</option>
        </select>
      </div>

      <div className="config-section">
        <label className="config-label">Channel*</label>
        <select
          value={config.slackChannel}
          onChange={(e) => setConfig({ ...config, slackChannel: e.target.value })}
        >
          {slackChannels.map(ch => (
            <option key={ch.id} value={ch.id}>{ch.label}</option>
          ))}
        </select>
      </div>

      <div className="config-section">
        <label className="config-label">Message template</label>
        <textarea
          className="message-template"
          value={config.messageTemplate}
          onChange={(e) => setConfig({ ...config, messageTemplate: e.target.value })}
          rows={4}
        />
      </div>

      <div className="config-section">
        <label className="config-label">Available variables</label>
        <div className="variable-chips">
          {availableVariables.map(v => (
            <button 
              key={v.id} 
              className="variable-chip"
              onClick={() => setConfig({ 
                ...config, 
                messageTemplate: config.messageTemplate + ` {{${v.label}}}` 
              })}
            >
              {`{{${v.label}}}`}
            </button>
          ))}
        </div>
      </div>
    </>
  );

  const renderEmailConfig = () => (
    <>
      <div className="config-description">
        Send an email with optional attachments when this flow runs.
      </div>

      <div className="config-section">
        <label className="config-label">Recipients*</label>
        <select
          value={config.emailRecipients[0]}
          onChange={(e) => setConfig({ ...config, emailRecipients: [e.target.value] })}
        >
          {emailRecipients.map(r => (
            <option key={r.id} value={r.id}>{r.label}</option>
          ))}
        </select>
        <button className="add-recipient-btn">+ Add recipient</button>
      </div>

      <div className="config-section">
        <label className="config-label">Subject</label>
        <input
          type="text"
          value={config.emailSubject}
          onChange={(e) => setConfig({ ...config, emailSubject: e.target.value })}
        />
      </div>

      <div className="config-section">
        <label className="config-label">Include attachments</label>
        <div className="checkbox-group">
          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={config.includeDeviation}
              onChange={(e) => setConfig({ ...config, includeDeviation: e.target.checked })}
            />
            <span>Forecast deviation report (PDF)</span>
          </label>
          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={config.includeExcel}
              onChange={(e) => setConfig({ ...config, includeExcel: e.target.checked })}
            />
            <span>Raw data export (Excel)</span>
          </label>
          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={config.includeExecutive}
              onChange={(e) => setConfig({ ...config, includeExecutive: e.target.checked })}
            />
            <span>Executive summary</span>
          </label>
        </div>
      </div>

      <div className="config-section">
        <label className="config-label">Body template</label>
        <select
          value={config.bodyTemplate}
          onChange={(e) => setConfig({ ...config, bodyTemplate: e.target.value })}
        >
          <option value="default">Use default</option>
          <option value="custom">Custom template</option>
        </select>
      </div>
    </>
  );

  const renderSimulationConfig = () => (
    <>
      <div className="config-description">
        Run the Vertex AI forecast simulation pipeline.
      </div>

      <div className="config-section">
        <label className="config-label">Simulation Type*</label>
        <select
          value={config.simulationType}
          onChange={(e) => setConfig({ ...config, simulationType: e.target.value })}
        >
          {simulationTypes.map(t => (
            <option key={t.id} value={t.id}>{t.label}</option>
          ))}
        </select>
      </div>

      <div className="config-section">
        <label className="config-label">Scope</label>
        <div className="radio-group">
          <label className="radio-option">
            <input
              type="radio"
              name="scope"
              value="all"
              checked={config.scope === 'all'}
              onChange={(e) => setConfig({ ...config, scope: e.target.value })}
            />
            <span>All SKUs</span>
          </label>
          <label className="radio-option">
            <input
              type="radio"
              name="scope"
              value="affected"
              checked={config.scope === 'affected'}
              onChange={(e) => setConfig({ ...config, scope: e.target.value })}
            />
            <span>Affected SKUs only</span>
          </label>
        </div>
      </div>

      <div className="config-section">
        <label className="config-label">Time horizon</label>
        <div className="threshold-input">
          <input
            type="number"
            value={config.timeHorizon}
            onChange={(e) => setConfig({ ...config, timeHorizon: e.target.value })}
          />
          <span className="threshold-unit">weeks</span>
        </div>
      </div>

      <div className="config-section">
        <div className="checkbox-group">
          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={config.waitForCompletion}
              onChange={(e) => setConfig({ ...config, waitForCompletion: e.target.checked })}
            />
            <span>Wait for completion before next step</span>
          </label>
          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={config.notifyOnFailure}
              onChange={(e) => setConfig({ ...config, notifyOnFailure: e.target.checked })}
            />
            <span>Send notification on failure</span>
          </label>
        </div>
      </div>
    </>
  );

  const renderRefreshConfig = () => (
    <>
      <div className="config-description">
        Refresh data tables and update forecasts.
      </div>

      <div className="config-section">
        <label className="config-label">Refresh Type*</label>
        <select
          value={config.refreshType}
          onChange={(e) => setConfig({ ...config, refreshType: e.target.value })}
        >
          <option value="full">Full refresh</option>
          <option value="incremental">Incremental</option>
          <option value="delta">Delta only</option>
        </select>
      </div>

      <div className="config-section">
        <label className="config-label">Tables</label>
        <select
          value={config.tables}
          onChange={(e) => setConfig({ ...config, tables: e.target.value })}
        >
          <option value="all">All tables</option>
          <option value="forecast">Forecast tables only</option>
          <option value="master">Master data only</option>
          <option value="derived">Derived tables only</option>
        </select>
      </div>
    </>
  );

  const renderReportConfig = () => (
    <>
      <div className="config-description">
        Generate a report based on current data.
      </div>

      <div className="config-section">
        <label className="config-label">Report Type*</label>
        <select
          value={config.reportType}
          onChange={(e) => setConfig({ ...config, reportType: e.target.value })}
        >
          <option value="deviation">Forecast Deviation Report</option>
          <option value="summary">Business Summary</option>
          <option value="planning">Item Planning Report</option>
          <option value="variance">Variance Report</option>
        </select>
      </div>

      <div className="config-section">
        <label className="config-label">Format*</label>
        <div className="radio-group">
          {reportFormats.map(f => (
            <label key={f.id} className="radio-option">
              <input
                type="radio"
                name="reportFormat"
                value={f.id}
                checked={config.reportFormat === f.id}
                onChange={(e) => setConfig({ ...config, reportFormat: e.target.value })}
              />
              <span>{f.label}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );

  const renderNotificationConfig = () => (
    <>
      <div className="config-description">
        Send an in-app notification to users.
      </div>

      <div className="config-section">
        <label className="config-label">Notification Title</label>
        <input
          type="text"
          defaultValue="{{flow_name}} completed"
          placeholder="Enter notification title"
        />
      </div>

      <div className="config-section">
        <label className="config-label">Priority</label>
        <select defaultValue="normal">
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <div className="config-section">
        <label className="config-label">Notify</label>
        <div className="checkbox-group">
          <label className="checkbox-option">
            <input type="checkbox" defaultChecked />
            <span>Flow owner</span>
          </label>
          <label className="checkbox-option">
            <input type="checkbox" />
            <span>Team members</span>
          </label>
          <label className="checkbox-option">
            <input type="checkbox" />
            <span>Specific users</span>
          </label>
        </div>
      </div>
    </>
  );

  const renderDefaultConfig = () => (
    <div className="config-description">
      Configure the action settings for this step.
    </div>
  );

  const getConfigContent = () => {
    if (!action) return renderDefaultConfig();
    
    const actionId = action.id;
    
    if (actionId.includes('slack') || actionId.includes('teams') || actionId.includes('gchat')) {
      return renderSlackConfig();
    }
    if (actionId.includes('email')) {
      return renderEmailConfig();
    }
    if (actionId.includes('simulation') || actionId.includes('run-simulation')) {
      return renderSimulationConfig();
    }
    if (actionId.includes('refresh') || actionId.includes('sync')) {
      return renderRefreshConfig();
    }
    if (actionId.includes('report') || actionId.includes('generate')) {
      return renderReportConfig();
    }
    if (actionId.includes('notification') || actionId.includes('notify')) {
      return renderNotificationConfig();
    }
    
    return renderDefaultConfig();
  };

  return (
    <div className="config-panel">
      <div className="config-panel-header">
        <div className="config-step-info">
          <span className="step-label">Step {stepNumber}</span>
          <div className="config-title-row">
            <div 
              className="config-icon"
              style={{ backgroundColor: (action?.color || '#4285f4') + '15', color: action?.color || '#4285f4' }}
            >
              <IconComponent size={20} />
            </div>
            <h3>{action?.name || 'Configure Action'}</h3>
          </div>
        </div>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="config-panel-content">
        {getConfigContent()}
      </div>

      <div className="config-panel-footer">
        <button className="show-less-btn" onClick={onClose}>
          Show less
        </button>
      </div>
    </div>
  );
};

export default ActionConfigPanel;
