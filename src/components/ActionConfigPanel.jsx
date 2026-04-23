import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Mail, Play, RefreshCw, FileText, Bell, Upload } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const slackChannels = [
  { id: 'care-team', label: '#care-team' },
  { id: 'care-coordination', label: '#care-coordination' },
  { id: 'clinical-alerts', label: '#clinical-alerts' },
  { id: 'discharge-followup', label: '#discharge-followup' },
  { id: 'general', label: '#general' },
];

const emailRecipients = [
  { id: 'care-team', label: 'care-team@your-org.com' },
  { id: 'care-coordinators', label: 'care-coordinators@your-org.com' },
  { id: 'clinical-leadership', label: 'clinical-leadership@your-org.com' },
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

const emailRecipientsHr = [
  { id: 'hr-ops', label: 'hr-ops@your-org.com' },
  { id: 'hrbp-team', label: 'hrbp@your-org.com' },
  { id: 'talent-team', label: 'talent@your-org.com' },
];

const HEALTHCARE_ACTION_DEFAULTS = {
  slackWorkspace: 'main-workspace',
  slackChannel: 'care-team',
  messageTemplate: '🔔 {{flow_name}} Alert\n{{kpi_name}} is {{value}}\nThreshold: {{threshold}}',
  teamsTenant: 'sample-health',
  teamsTeam: 'clinical-operations',
  teamsChannel: 'discharge-alerts',
  teamsAdaptiveCard: true,
  teamsMessageTemplate:
    '🏥 Discharge: {{patient_name}} (MRN {{mrn}})\nAttending: {{provider}}\nCare plan: {{care_plan_link}}\nAcknowledge in the care coordination app.',
  carePlanTemplate: 'post-discharge-standard',
  carePlanStatus: 'draft',
  includeMedReconciliation: true,
  includeFollowUpAppointments: true,
  includePatientEducation: true,
  linkCarePlanToEncounter: true,
  carePlanAuthoringRole: 'care-manager',
  taskAssigneePool: 'care-coordination',
  taskPriority: 'high',
  taskDueHours: '24',
  taskCategory: 'follow-up-call',
  taskDescriptionTemplate:
    'Call patient within 24h of discharge to review medications and confirm follow-up appointments.',
  notifyAssigneeImmediately: true,
  reminderLeadTime: '24',
  reminderChannels: 'patient-preference',
  reminderTemplate: 'Reminder: appt {{appt_date}} at {{location}}. Reply C to confirm.',
  preVisitDelivery: 'portal-and-email',
  preVisitIncludeFormsLink: true,
  smsFromLine: 'clinical-alerts',
  smsTemplate: 'Sample Health: Your appointment is {{appt_when}}. Questions? Call {{clinic_phone}}.',
  modelVersion: 'readmission-v3.2',
  riskThreshold: '0.4',
  cohortScope: 'trigger-patient',
  writeResultsToFhir: true,
  auditModelRun: true,
  summarySections: 'problems-meds-allergies',
  summaryMaxLength: 'medium',
  appointmentType: 'follow-up',
  bookingHorizonDays: '14',
  preferredLocation: 'same-as-last',
  exportFormat: 'csv',
  exportPhiLevel: 'minimum-necessary',
  vbcReportingPeriod: 'current-quarter',
  rcmPayerProfile: 'primary-commercial',
  stepNotes: '',
  continueOnError: false,
  emailRecipients: ['care-team'],
  emailSubject: 'Clinical workflow: {{flow_name}} — {{date}}',
  includeDeviation: true,
  includeExcel: true,
  includeExecutive: false,
  bodyTemplate: 'default',
  simulationType: 'full-refresh',
  scope: 'affected',
  timeHorizon: '12',
  waitForCompletion: true,
  notifyOnFailure: false,
  refreshType: 'full',
  tables: 'all',
  reportFormat: 'pdf',
  reportType: 'deviation',
};

const HR_ACTION_DEFAULTS = {
  modelVersion: 'dq-6000',
  cohortScope: 'trigger-patient',
  teamsTeam: 'people-operations',
  teamsChannel: 'hrbp-intake',
  teamsAdaptiveCard: true,
  teamsMessageTemplate:
    '📋 {{flow_name}}\nEmployee: {{employee_name}} ({{employee_id}})\nManager: {{manager_name}}\nSummary: {{request_summary}}\nOpen task: {{task_link}}',
  taskAssigneePool: 'hrbp-queue',
  taskPriority: 'high',
  taskDueHours: '48',
  taskCategory: 'manager-intake',
  taskDescriptionTemplate:
    'Review the manager request, document policy guidance, and assign follow-ups within 2 business days. Link any relevant HRIS records.',
  emailRecipients: ['hr-ops'],
  emailSubject: 'HR workflow: {{flow_name}} — {{date}}',
};

function buildDefaultActionConfig(vertical) {
  if (vertical === 'hr') {
    return { ...HEALTHCARE_ACTION_DEFAULTS, ...HR_ACTION_DEFAULTS };
  }
  return { ...HEALTHCARE_ACTION_DEFAULTS };
}

const ActionConfigPanel = ({ action, stepNumber, vertical = 'healthcare', onClose, onSave }) => {
  const [config, setConfig] = useState(() => buildDefaultActionConfig(vertical));

  useEffect(() => {
    setConfig(buildDefaultActionConfig(vertical));
  }, [vertical, action?.id]);

  useEffect(() => {
    const id = action?.id || '';
    if (vertical !== 'hr' || !id.includes('invoke-hr-')) return;
    const modelDefaults = {
      'invoke-hr-jd-generator': 'claude-sonnet-jd-v1',
      'invoke-hr-interview-debrief': 'claude-sonnet-debrief-v1',
      'invoke-hr-onboarding-plan': 'claude-sonnet-onb-v1',
      'invoke-hr-policy-qa': 'claude-sonnet-policy-v1'
    };
    const next = modelDefaults[id];
    if (next) {
      setConfig((c) => ({ ...c, modelVersion: next }));
    }
  }, [action?.id, vertical]);

  const IconComponent = LucideIcons[action?.icon] || Bell;

  const availableVariables = [
    { id: 'flow_name', label: 'flow_name' },
    { id: 'kpi_name', label: 'kpi_name' },
    { id: 'value', label: 'value' },
    { id: 'threshold', label: 'threshold' },
    { id: 'date', label: 'date' },
    { id: 'time', label: 'time' },
  ];

  const patientFlowVariables = [
    { id: 'patient_name', label: 'patient_name' },
    { id: 'mrn', label: 'mrn' },
    { id: 'provider', label: 'provider' },
    { id: 'care_plan_link', label: 'care_plan_link' },
    { id: 'appt_date', label: 'appt_date' },
    { id: 'appt_when', label: 'appt_when' },
    { id: 'location', label: 'location' },
    { id: 'clinic_phone', label: 'clinic_phone' },
  ];

  const hrFlowVariables = [
    { id: 'employee_name', label: 'employee_name' },
    { id: 'employee_id', label: 'employee_id' },
    { id: 'manager_name', label: 'manager_name' },
    { id: 'request_summary', label: 'request_summary' },
    { id: 'task_link', label: 'task_link' },
    { id: 'department', label: 'department' },
    { id: 'start_date', label: 'start_date' },
  ];

  const teamsTemplateVariables = vertical === 'hr' ? hrFlowVariables : patientFlowVariables;

  const insertIntoTeamsTemplate = (token) => {
    setConfig((c) => ({
      ...c,
      teamsMessageTemplate: `${c.teamsMessageTemplate} {{${token}}}`,
    }));
  };

  const renderTeamsConfig = () => (
    <>
      <div className="config-description">
        {vertical === 'hr'
          ? 'Post to a Microsoft Teams channel when this HR workflow runs. Uses Microsoft Graph with tenant-scoped app credentials (least privilege).'
          : 'Post to a Microsoft Teams channel or chat when this step runs. Uses Microsoft Graph with tenant-scoped app credentials (least privilege).'}
      </div>

      <div className="config-section">
        <label className="config-label">Tenant / org*</label>
        <select
          value={config.teamsTenant}
          onChange={(e) => setConfig({ ...config, teamsTenant: e.target.value })}
        >
          <option value="sample-health">Sample Health Network</option>
          <option value="sandbox">Sandbox tenant</option>
        </select>
      </div>

      <div className="config-section">
        <label className="config-label">Team*</label>
        <select
          value={config.teamsTeam}
          onChange={(e) => setConfig({ ...config, teamsTeam: e.target.value })}
        >
          {vertical === 'hr' ? (
            <>
              <option value="people-operations">People Operations</option>
              <option value="talent-acquisition">Talent Acquisition</option>
              <option value="hr-systems">HR Systems &amp; Integrations</option>
            </>
          ) : (
            <>
              <option value="clinical-operations">Clinical Operations</option>
              <option value="care-management">Care Management</option>
              <option value="hospital-medicine">Hospital Medicine</option>
            </>
          )}
        </select>
      </div>

      <div className="config-section">
        <label className="config-label">Channel*</label>
        <select
          value={config.teamsChannel}
          onChange={(e) => setConfig({ ...config, teamsChannel: e.target.value })}
        >
          {vertical === 'hr' ? (
            <>
              <option value="hrbp-intake"># hrbp-intake</option>
              <option value="onboarding"># onboarding</option>
              <option value="talent-alerts"># talent-alerts</option>
              <option value="people-ops"># people-ops</option>
            </>
          ) : (
            <>
              <option value="discharge-alerts"># discharge-alerts</option>
              <option value="care-team"># care-team</option>
              <option value="readmission-rounds"># readmission-rounds</option>
            </>
          )}
        </select>
      </div>

      <div className="config-section">
        <label className="checkbox-option">
          <input
            type="checkbox"
            checked={config.teamsAdaptiveCard}
            onChange={(e) => setConfig({ ...config, teamsAdaptiveCard: e.target.checked })}
          />
          <span>
            {vertical === 'hr'
              ? 'Use adaptive card (acknowledge + deep link to HR task)'
              : 'Use adaptive card (acknowledge + deep link to care plan)'}
          </span>
        </label>
      </div>

      <div className="config-section">
        <label className="config-label">Message template</label>
        <textarea
          className="message-template"
          value={config.teamsMessageTemplate}
          onChange={(e) => setConfig({ ...config, teamsMessageTemplate: e.target.value })}
          rows={5}
        />
      </div>

      <div className="config-section">
        <label className="config-label">
          {vertical === 'hr' ? 'Insert employee / HR fields' : 'Insert patient / flow fields'}
        </label>
        <div className="variable-chips">
          {teamsTemplateVariables.map((v) => (
            <button
              key={v.id}
              type="button"
              className="variable-chip"
              onClick={() => insertIntoTeamsTemplate(v.label)}
            >
              {`{{${v.label}}}`}
            </button>
          ))}
        </div>
      </div>
    </>
  );

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
          <option value="main-workspace">Primary workspace</option>
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
        {vertical === 'hr'
          ? 'Send an HR or operational email when this flow runs. Attachments follow workforce data handling and least-privilege distribution lists.'
          : 'Send a clinical or operational email when this flow runs. Attachments respect minimum-necessary PHI policies.'}
      </div>

      <div className="config-section">
        <label className="config-label">Recipients*</label>
        <select
          value={config.emailRecipients[0]}
          onChange={(e) => setConfig({ ...config, emailRecipients: [e.target.value] })}
        >
          {(vertical === 'hr' ? emailRecipientsHr : emailRecipients).map((r) => (
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
            <span>
              {vertical === 'hr'
                ? 'Onboarding / case summary (PDF)'
                : 'Discharge / care plan summary (PDF)'}
            </span>
          </label>
          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={config.includeExcel}
              onChange={(e) => setConfig({ ...config, includeExcel: e.target.checked })}
            />
            <span>
              {vertical === 'hr'
                ? 'Tabular extract — roster or exception list (Excel)'
                : 'Tabular extract — cohort or line items (Excel)'}
            </span>
          </label>
          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={config.includeExecutive}
              onChange={(e) => setConfig({ ...config, includeExecutive: e.target.checked })}
            />
            <span>{vertical === 'hr' ? 'Executive summary (aggregated metrics)' : 'Operational summary (no PHI)'}</span>
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

  const renderCarePlanConfig = () => (
    <>
      <div className="config-description">
        Creates or updates a <strong>FHIR R4 CarePlan</strong> tied to the triggering encounter. Pulls
        medications from the discharge summary, proposed follow-up visits, and education topics from your
        approved template library.
      </div>

      {action?.description && (
        <div className="config-section config-summary-box">
          <label className="config-label">Flow intent</label>
          <p className="config-hint-text">{action.description}</p>
        </div>
      )}

      <div className="config-section">
        <label className="config-label">Care plan template*</label>
        <select
          value={config.carePlanTemplate}
          onChange={(e) => setConfig({ ...config, carePlanTemplate: e.target.value })}
        >
          <option value="post-discharge-standard">Post-discharge — standard</option>
          <option value="post-discharge-chf">Post-discharge — CHF</option>
          <option value="post-discharge-copd">Post-discharge — COPD</option>
          <option value="readmission-bridge">High readmission risk — bridge plan</option>
        </select>
      </div>

      <div className="config-section">
        <label className="config-label">Initial status*</label>
        <select
          value={config.carePlanStatus}
          onChange={(e) => setConfig({ ...config, carePlanStatus: e.target.value })}
        >
          <option value="draft">Draft — care manager review</option>
          <option value="active">Active — upon approval</option>
        </select>
      </div>

      <div className="config-section">
        <label className="config-label">Authoring role*</label>
        <select
          value={config.carePlanAuthoringRole}
          onChange={(e) => setConfig({ ...config, carePlanAuthoringRole: e.target.value })}
        >
          <option value="care-manager">Care manager (system on behalf)</option>
          <option value="attending">Attending of record</option>
          <option value="discharge-np">Discharge NP / PA</option>
        </select>
      </div>

      <div className="config-section">
        <label className="config-label">Sections to generate</label>
        <div className="checkbox-group">
          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={config.includeMedReconciliation}
              onChange={(e) => setConfig({ ...config, includeMedReconciliation: e.target.checked })}
            />
            <span>Medication reconciliation &amp; discharge med list</span>
          </label>
          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={config.includeFollowUpAppointments}
              onChange={(e) => setConfig({ ...config, includeFollowUpAppointments: e.target.checked })}
            />
            <span>Follow-up appointments &amp; pending orders</span>
          </label>
          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={config.includePatientEducation}
              onChange={(e) => setConfig({ ...config, includePatientEducation: e.target.checked })}
            />
            <span>Patient education &amp; red-flag symptoms</span>
          </label>
          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={config.linkCarePlanToEncounter}
              onChange={(e) => setConfig({ ...config, linkCarePlanToEncounter: e.target.checked })}
            />
            <span>Link CarePlan.encounter to discharge encounter</span>
          </label>
        </div>
      </div>

      <div className="config-section">
        <label className="config-label">FHIR write scope</label>
        <p className="config-hint-text">
          Writes <code>CarePlan</code>, <code>CareTeam</code> (optional), and referenced{' '}
          <code>Task</code> placeholders. Requires Clinical Care module entitlement.
        </p>
      </div>
    </>
  );

  const renderUpdateCarePlanConfig = () => (
    <>
      <div className="config-description">
        Merges new goals, activities, or status into an existing CarePlan. Conflicts resolve using the
        latest clinical document timestamp.
      </div>
      {action?.description && (
        <div className="config-section config-summary-box">
          <label className="config-label">Flow intent</label>
          <p className="config-hint-text">{action.description}</p>
        </div>
      )}
      <div className="config-section">
        <label className="config-label">Merge strategy*</label>
        <select defaultValue="append-goals">
          <option value="append-goals">Append new goals &amp; activities</option>
          <option value="replace-section">Replace selected section only</option>
          <option value="supersede">Supersede prior draft version</option>
        </select>
      </div>
      <div className="config-section">
        <label className="config-label">Require co-signature</label>
        <select defaultValue="no">
          <option value="no">No — care manager only</option>
          <option value="pcp">Primary care within 24h</option>
        </select>
      </div>
    </>
  );

  const renderCareTaskConfig = () => (
    <>
      <div className="config-description">
        {vertical === 'hr' ? (
          <>
            Creates a prioritized <strong>work item</strong> in your HR task system (e.g. HRBP triage,
            onboarding checklist, HRIS remediation). Appears in HR queues and optional email digest to
            owners.
          </>
        ) : (
          <>
            Creates a prioritized <strong>FHIR Task</strong> for the care team (e.g. post-discharge call,
            med reconciliation follow-up). Appears in care team work queues and can sync to EHR in-baskets
            where integrated.
          </>
        )}
      </div>

      {action?.description && (
        <div className="config-section config-summary-box">
          <label className="config-label">Flow intent</label>
          <p className="config-hint-text">{action.description}</p>
        </div>
      )}

      <div className="config-section">
        <label className="config-label">Assignee pool*</label>
        <select
          value={config.taskAssigneePool}
          onChange={(e) => setConfig({ ...config, taskAssigneePool: e.target.value })}
        >
          {vertical === 'hr' ? (
            <>
              <option value="hrbp-queue">HRBP intake queue</option>
              <option value="people-ops">People operations</option>
              <option value="talent-coordinators">Talent coordinators</option>
              <option value="hr-systems">HR systems / integrations</option>
            </>
          ) : (
            <>
              <option value="care-coordination">Care coordination queue</option>
              <option value="nurse-navigators">Nurse navigators</option>
              <option value="pharmacy">Clinical pharmacy</option>
              <option value="social-work">Social work</option>
            </>
          )}
        </select>
      </div>

      <div className="config-section">
        <label className="config-label">Priority*</label>
        <select
          value={config.taskPriority}
          onChange={(e) => setConfig({ ...config, taskPriority: e.target.value })}
        >
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="normal">Routine</option>
        </select>
      </div>

      <div className="config-section">
        <label className="config-label">Due after trigger</label>
        <div className="threshold-input">
          <input
            type="number"
            min={1}
            value={config.taskDueHours}
            onChange={(e) => setConfig({ ...config, taskDueHours: e.target.value })}
          />
          <span className="threshold-unit">hours</span>
        </div>
      </div>

      <div className="config-section">
        <label className="config-label">Task type*</label>
        <select
          value={config.taskCategory}
          onChange={(e) => setConfig({ ...config, taskCategory: e.target.value })}
        >
          {vertical === 'hr' ? (
            <>
              <option value="manager-intake">Manager request triage</option>
              <option value="onboarding-checklist">Onboarding checklist</option>
              <option value="access-review">Access / provisioning review</option>
              <option value="hris-exception">HRIS data exception</option>
              <option value="offer-packet">Offer / comp packet assembly</option>
            </>
          ) : (
            <>
              <option value="follow-up-call">Post-discharge phone call</option>
              <option value="med-rec">Medication reconciliation</option>
              <option value="appointment-booking">Schedule follow-up visit</option>
              <option value="sdoh-screen">SDOH screening</option>
            </>
          )}
        </select>
      </div>

      <div className="config-section">
        <label className="config-label">Instructions template</label>
        <textarea
          className="message-template"
          rows={4}
          value={config.taskDescriptionTemplate}
          onChange={(e) => setConfig({ ...config, taskDescriptionTemplate: e.target.value })}
        />
      </div>

      <div className="config-section">
        <label className="checkbox-option">
          <input
            type="checkbox"
            checked={config.notifyAssigneeImmediately}
            onChange={(e) => setConfig({ ...config, notifyAssigneeImmediately: e.target.checked })}
          />
          <span>Notify assignee immediately (in-app + optional email)</span>
        </label>
      </div>
    </>
  );

  const renderAppointmentReminderConfig = () => (
    <>
      <div className="config-description">
        Sends a reminder across channels the patient has opted into (SMS, email, voice, portal push).
        Honors quiet hours and language preference from the patient profile.
      </div>
      {action?.description && (
        <div className="config-section config-summary-box">
          <label className="config-label">Flow intent</label>
          <p className="config-hint-text">{action.description}</p>
        </div>
      )}
      <div className="config-section">
        <label className="config-label">Lead time before appointment*</label>
        <div className="threshold-input">
          <input
            type="number"
            min={1}
            value={config.reminderLeadTime}
            onChange={(e) => setConfig({ ...config, reminderLeadTime: e.target.value })}
          />
          <span className="threshold-unit">hours</span>
        </div>
      </div>
      <div className="config-section">
        <label className="config-label">Channel resolution*</label>
        <select
          value={config.reminderChannels}
          onChange={(e) => setConfig({ ...config, reminderChannels: e.target.value })}
        >
          <option value="patient-preference">Patient preference order</option>
          <option value="sms-first">SMS first, then email</option>
          <option value="portal-only">Patient portal only</option>
        </select>
      </div>
      <div className="config-section">
        <label className="config-label">Message template</label>
        <textarea
          className="message-template"
          rows={3}
          value={config.reminderTemplate}
          onChange={(e) => setConfig({ ...config, reminderTemplate: e.target.value })}
        />
      </div>
    </>
  );

  const renderPreVisitInstructionsConfig = () => (
    <>
      <div className="config-description">
        Delivers pre-visit instructions, fasting rules, and links to forms. Content is assembled from your
        encounter-type library and patient language.
      </div>
      {action?.description && (
        <div className="config-section config-summary-box">
          <label className="config-label">Flow intent</label>
          <p className="config-hint-text">{action.description}</p>
        </div>
      )}
      <div className="config-section">
        <label className="config-label">Delivery*</label>
        <select
          value={config.preVisitDelivery}
          onChange={(e) => setConfig({ ...config, preVisitDelivery: e.target.value })}
        >
          <option value="portal-and-email">Portal + email</option>
          <option value="email-only">Email only</option>
          <option value="sms-link">SMS with secure link</option>
        </select>
      </div>
      <div className="config-section">
        <label className="checkbox-option">
          <input
            type="checkbox"
            checked={config.preVisitIncludeFormsLink}
            onChange={(e) => setConfig({ ...config, preVisitIncludeFormsLink: e.target.checked })}
          />
          <span>Include e-check-in / questionnaire deep link</span>
        </label>
      </div>
    </>
  );

  const renderSmsConfig = () => (
    <>
      <div className="config-description">
        Sends a templated SMS from your registered clinical messaging line. TCPA consent and opt-out
        keywords are enforced automatically.
      </div>
      {action?.description && (
        <div className="config-section config-summary-box">
          <label className="config-label">Flow intent</label>
          <p className="config-hint-text">{action.description}</p>
        </div>
      )}
      <div className="config-section">
        <label className="config-label">Sending line*</label>
        <select
          value={config.smsFromLine}
          onChange={(e) => setConfig({ ...config, smsFromLine: e.target.value })}
        >
          <option value="clinical-alerts">Clinical alerts (short code)</option>
          <option value="appointments">Appointments reminder line</option>
        </select>
      </div>
      <div className="config-section">
        <label className="config-label">Body template (160 char segments)</label>
        <textarea
          className="message-template"
          rows={3}
          value={config.smsTemplate}
          onChange={(e) => setConfig({ ...config, smsTemplate: e.target.value })}
        />
      </div>
    </>
  );

  const renderAgentPipelineConfig = () => {
    const actionId = action?.id || '';
    const isReadmission = actionId.includes('readmission');
    const isHedis = actionId.includes('hedis');
    const isDataQuality = actionId.includes('data-quality');
    const isPriorAuth = actionId.includes('prior-auth');
    const isHrCopilot = vertical === 'hr' && actionId.includes('invoke-hr-');
    return (
      <>
        <div className="config-description">
          {isHrCopilot && actionId.includes('jd')
            ? 'Runs the JD generator: Claude reads hiring intake from Jira/HCM and drafts a structured job description for TA review and posting.'
            : isHrCopilot && actionId.includes('interview-debrief')
              ? 'Runs interview debrief automation: Claude merges calendar metadata, rubric, and panel notes into a structured scorecard draft.'
              : isHrCopilot && actionId.includes('onboarding-plan')
                ? 'Runs onboarding plan generation: Claude produces a 30-60-90 outline and resource kit links aligned to role and location.'
                : isHrCopilot && actionId.includes('policy-qa')
                  ? 'Runs policy Q&A: Claude answers from your HR policy knowledge base with citations; escalates when confidence is low.'
                  : vertical === 'hr'
                    ? isDataQuality
                      ? 'Runs HRIS / workforce data quality rules on the population implied by the trigger. Exceptions are logged with suggested remediation owners.'
                      : 'Runs a governed model or batch job on the cohort implied by the trigger. Outputs are written to your people data platform with an auditable trail.'
                    : 'Runs a governed AI model or batch job on the cohort implied by the trigger. Outputs are written to the Unified Data Model and optionally exposed as FHIR Observations or RiskAssessment resources.'}
        </div>
        {action?.description && (
          <div className="config-section config-summary-box">
            <label className="config-label">Flow intent</label>
            <p className="config-hint-text">{action.description}</p>
          </div>
        )}
        <div className="config-section">
          <label className="config-label">Model or job*</label>
          <select
            value={config.modelVersion}
            onChange={(e) => setConfig({ ...config, modelVersion: e.target.value })}
          >
            {isReadmission && (
              <>
                <option value="readmission-v3.2">Readmission — v3.2 (30-day)</option>
                <option value="readmission-v3.1">Readmission — v3.1 (legacy)</option>
              </>
            )}
            {isHedis && (
              <>
                <option value="hedis-2025">HEDIS MY 2025 engine</option>
                <option value="hedis-partial">HEDIS — incremental measure set</option>
              </>
            )}
            {isDataQuality && (
              <>
                <option value="dq-6000">{vertical === 'hr' ? 'HRIS + ATS composite DQ sweep' : '6000+ rule DQ sweep'}</option>
                <option value="dq-fhir-profile">
                  {vertical === 'hr' ? 'Canonical employee profile validation' : 'FHIR profile validation only'}
                </option>
              </>
            )}
            {isPriorAuth && (
              <>
                <option value="prior-auth-realtime">Prior authorization — real-time payer check</option>
                <option value="prior-auth-batch">Batch re-validation (scheduled)</option>
              </>
            )}
            {isHrCopilot && actionId.includes('invoke-hr-jd-generator') && (
              <>
                <option value="claude-sonnet-jd-v1">Claude Sonnet — JD from Jira/HCM intake</option>
                <option value="claude-haiku-jd-v1">Claude Haiku — fast first draft</option>
              </>
            )}
            {isHrCopilot && actionId.includes('invoke-hr-interview-debrief') && (
              <>
                <option value="claude-sonnet-debrief-v1">Claude Sonnet — scorecard + rubric alignment</option>
                <option value="claude-haiku-debrief-v1">Claude Haiku — notes-only summary</option>
              </>
            )}
            {isHrCopilot && actionId.includes('invoke-hr-onboarding-plan') && (
              <>
                <option value="claude-sonnet-onb-v1">Claude Sonnet — 30-60-90 + resource kit</option>
                <option value="claude-haiku-onb-v1">Claude Haiku — lightweight checklist</option>
              </>
            )}
            {isHrCopilot && actionId.includes('invoke-hr-policy-qa') && (
              <>
                <option value="claude-sonnet-policy-v1">Claude Sonnet — HR docs RAG (citations on)</option>
                <option value="claude-haiku-policy-v1">Claude Haiku — short FAQ-style answers</option>
              </>
            )}
            {!isReadmission && !isHedis && !isDataQuality && !isPriorAuth && !isHrCopilot && (
              <>
                <option value="risk-strat-v2">Risk stratification — v2</option>
                <option value="care-gap-agent">Care Gap Agent (AI)</option>
                <option value="outreach-agent">Outreach Agent (AI)</option>
              </>
            )}
          </select>
        </div>
        <div className="config-section">
          <label className="config-label">Score threshold (if applicable)</label>
          <input
            type="text"
            value={config.riskThreshold}
            onChange={(e) => setConfig({ ...config, riskThreshold: e.target.value })}
            placeholder="e.g. 0.4"
          />
        </div>
        <div className="config-section">
          <label className="config-label">Cohort scope*</label>
          <select
            value={config.cohortScope}
            onChange={(e) => setConfig({ ...config, cohortScope: e.target.value })}
          >
            <option value="trigger-patient">
              {vertical === 'hr' ? 'Trigger record only (employee / case)' : 'Trigger patient only'}
            </option>
            <option value="panel">{vertical === 'hr' ? 'Department / cost center scope' : 'Attributed panel'}</option>
            <option value="custom-list">Custom list from prior step</option>
          </select>
        </div>
        <div className="config-section">
          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={config.writeResultsToFhir}
              onChange={(e) => setConfig({ ...config, writeResultsToFhir: e.target.checked })}
            />
            <span>
              {vertical === 'hr'
                ? 'Persist results to HRIS staging (exceptions + audit record)'
                : 'Persist results to FHIR (Observation / RiskAssessment)'}
            </span>
          </label>
          <label className="checkbox-option">
            <input
              type="checkbox"
              checked={config.auditModelRun}
              onChange={(e) => setConfig({ ...config, auditModelRun: e.target.checked })}
            />
            <span>Full audit trail (inputs hash + model version)</span>
          </label>
        </div>
      </>
    );
  };

  const renderClinicalSummaryConfig = () => (
    <>
      <div className="config-description">
        Generates a concise clinical summary for handoffs or outreach using approved templates and
        Clinical NLP — not a substitute for clinician review.
      </div>
      {action?.description && (
        <div className="config-section config-summary-box">
          <label className="config-label">Flow intent</label>
          <p className="config-hint-text">{action.description}</p>
        </div>
      )}
      <div className="config-section">
        <label className="config-label">Sections*</label>
        <select
          value={config.summarySections}
          onChange={(e) => setConfig({ ...config, summarySections: e.target.value })}
        >
          <option value="problems-meds-allergies">Problems, meds, allergies</option>
          <option value="full-brief">Full brief (last 90 days)</option>
          <option value="visit-focused">Visit-focused only</option>
        </select>
      </div>
      <div className="config-section">
        <label className="config-label">Length</label>
        <select
          value={config.summaryMaxLength}
          onChange={(e) => setConfig({ ...config, summaryMaxLength: e.target.value })}
        >
          <option value="short">Short (~400 tokens)</option>
          <option value="medium">Medium (~800 tokens)</option>
        </select>
      </div>
    </>
  );

  const renderScheduleAppointmentConfig = () => (
    <>
      <div className="config-description">
        Books or proposes a slot via your connected scheduling adapter (FHIR Slot / proprietary API).
        Respects payer authorization flags when available.
      </div>
      {action?.description && (
        <div className="config-section config-summary-box">
          <label className="config-label">Flow intent</label>
          <p className="config-hint-text">{action.description}</p>
        </div>
      )}
      <div className="config-section">
        <label className="config-label">Appointment type*</label>
        <select
          value={config.appointmentType}
          onChange={(e) => setConfig({ ...config, appointmentType: e.target.value })}
        >
          <option value="follow-up">Follow-up</option>
          <option value="annual-wellness">Annual wellness</option>
          <option value="specialty-referral">Specialty referral</option>
        </select>
      </div>
      <div className="config-section">
        <label className="config-label">Booking horizon (days)</label>
        <input
          type="number"
          min={1}
          value={config.bookingHorizonDays}
          onChange={(e) => setConfig({ ...config, bookingHorizonDays: e.target.value })}
        />
      </div>
      <div className="config-section">
        <label className="config-label">Location preference</label>
        <select
          value={config.preferredLocation}
          onChange={(e) => setConfig({ ...config, preferredLocation: e.target.value })}
        >
          <option value="same-as-last">Same as last visit</option>
          <option value="patient-home-clinic">Patient home clinic</option>
        </select>
      </div>
    </>
  );

  const renderExportConfig = () => (
    <>
      <div className="config-description">
        Exports a dataset snapshot for approved operational use. Exports are logged and watermarked.
      </div>
      {action?.description && (
        <div className="config-section config-summary-box">
          <label className="config-label">Flow intent</label>
          <p className="config-hint-text">{action.description}</p>
        </div>
      )}
      <div className="config-section">
        <label className="config-label">Format*</label>
        <select
          value={config.exportFormat}
          onChange={(e) => setConfig({ ...config, exportFormat: e.target.value })}
        >
          <option value="csv">CSV</option>
          <option value="xlsx">Excel</option>
        </select>
      </div>
      <div className="config-section">
        <label className="config-label">{vertical === 'hr' ? 'Data sensitivity*' : 'PHI level*'}</label>
        <select
          value={config.exportPhiLevel}
          onChange={(e) => setConfig({ ...config, exportPhiLevel: e.target.value })}
        >
          {vertical === 'hr' ? (
            <>
              <option value="minimum-necessary">Workforce — minimum necessary</option>
              <option value="de-identified">Aggregated / de-identified extract</option>
            </>
          ) : (
            <>
              <option value="minimum-necessary">Minimum necessary</option>
              <option value="de-identified">Limited data set / de-identified</option>
            </>
          )}
        </select>
      </div>
    </>
  );

  const renderVbcConfig = () => (
    <>
      <div className="config-description">
        Value-based care action — submits measures, rolls up ACO performance, or surfaces coding gaps for
        HCC / RAF programs.
      </div>
      {action?.description && (
        <div className="config-section config-summary-box">
          <label className="config-label">Flow intent</label>
          <p className="config-hint-text">{action.description}</p>
        </div>
      )}
      <div className="config-section">
        <label className="config-label">Reporting period*</label>
        <select
          value={config.vbcReportingPeriod}
          onChange={(e) => setConfig({ ...config, vbcReportingPeriod: e.target.value })}
        >
          <option value="current-quarter">Current quality year / quarter</option>
          <option value="prior-year">Prior performance year</option>
        </select>
      </div>
      <div className="config-section">
        <label className="config-label">Destination</label>
        <select defaultValue="registry">
          <option value="registry">Measure registry</option>
          <option value="payer-portal">Payer portal (SFTP / API)</option>
          <option value="internal-only">Internal analytics only</option>
        </select>
      </div>
    </>
  );

  const renderRcmConfig = () => (
    <>
      <div className="config-description">
        Revenue cycle action — routes work to denial management, runs prior-auth checks, or generates
        denial analytics.
      </div>
      {action?.description && (
        <div className="config-section config-summary-box">
          <label className="config-label">Flow intent</label>
          <p className="config-hint-text">{action.description}</p>
        </div>
      )}
      <div className="config-section">
        <label className="config-label">Primary payer profile*</label>
        <select
          value={config.rcmPayerProfile}
          onChange={(e) => setConfig({ ...config, rcmPayerProfile: e.target.value })}
        >
          <option value="primary-commercial">Primary commercial</option>
          <option value="medicare-advantage">Medicare Advantage</option>
          <option value="medicaid">Medicaid</option>
        </select>
      </div>
      <div className="config-section">
        <label className="config-label">On failure</label>
        <select defaultValue="queue">
          <option value="queue">Route to work queue</option>
          <option value="notify">Notify RCM lead (Teams)</option>
        </select>
      </div>
    </>
  );

  const renderPatientOutreachConfig = () => (
    <>
      <div className="config-description">
        Patient experience messaging step. Uses the same channel governance as reminders (consent, opt-out,
        quiet hours).
      </div>
      {action?.description && (
        <div className="config-section config-summary-box">
          <label className="config-label">Flow intent</label>
          <p className="config-hint-text">{action.description}</p>
        </div>
      )}
      <div className="config-section">
        <label className="config-label">Primary channel*</label>
        <select defaultValue="patient-preference">
          <option value="patient-preference">Patient preference</option>
          <option value="sms">SMS</option>
          <option value="email">Email</option>
          <option value="portal">Portal inbox</option>
        </select>
      </div>
      <div className="config-section">
        <label className="config-label">Template set</label>
        <select defaultValue="standard">
          <option value="standard">Standard library</option>
          <option value="campaign">Campaign-specific copy</option>
        </select>
      </div>
      <div className="config-section">
        <label className="config-label">Step notes</label>
        <textarea
          className="message-template"
          rows={3}
          value={config.stepNotes}
          onChange={(e) => setConfig({ ...config, stepNotes: e.target.value })}
          placeholder="Optional instructions for local teams…"
        />
      </div>
    </>
  );

  const renderGenericStepConfig = (act) => (
    <>
      <div className="config-description">
        {vertical === 'hr'
          ? 'Configure how this step behaves when the HR workflow runs. Defaults are typical for people operations and talent teams; adjust to match your org standards.'
          : 'Configure how this step behaves when the flow runs. Defaults below are typical for many healthcare automation setups; adjust to match your org standards.'}
      </div>
      {act?.description && (
        <div className="config-section config-summary-box">
          <label className="config-label">What this step does</label>
          <p className="config-hint-text">{act.description}</p>
        </div>
      )}
      <div className="config-section">
        <label className="config-label">Module</label>
        <input type="text" readOnly value={act?.module || 'General'} className="config-readonly" />
      </div>
      <div className="config-section">
        <label className="config-label">Execution mode*</label>
        <select defaultValue="sync">
          <option value="sync">Run synchronously (block until complete)</option>
          <option value="async">Queue async job</option>
        </select>
      </div>
      <div className="config-section">
        <label className="config-label">Timeout (seconds)</label>
        <input type="number" defaultValue={120} min={10} />
      </div>
      <div className="config-section">
        <label className="checkbox-option">
          <input
            type="checkbox"
            checked={config.continueOnError}
            onChange={(e) => setConfig({ ...config, continueOnError: e.target.checked })}
          />
          <span>Continue flow on non-fatal error (log + alert)</span>
        </label>
      </div>
      <div className="config-section">
        <label className="config-label">Implementation notes</label>
        <textarea
          className="message-template"
          rows={4}
          value={config.stepNotes}
          onChange={(e) => setConfig({ ...config, stepNotes: e.target.value })}
          placeholder={
            vertical === 'hr'
              ? 'e.g. HRIS interface ID, Workday routing queue, policy version…'
              : 'e.g. interface ID, Epic routing queue, payer-specific rule…'
          }
        />
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

    if (actionId.includes('create-care-plan') || actionId.includes('create-action-plan')) {
      return renderCarePlanConfig();
    }
    if (actionId === 'update-care-plan') {
      return renderUpdateCarePlanConfig();
    }
    if (actionId.includes('create-care-task')) {
      return renderCareTaskConfig();
    }
    if (actionId.includes('schedule-appointment')) {
      return renderScheduleAppointmentConfig();
    }
    if (actionId.includes('generate-clinical-summary')) {
      return renderClinicalSummaryConfig();
    }

    if (actionId.includes('send-teams') || actionId.includes('gchat')) {
      return renderTeamsConfig();
    }
    if (actionId.includes('slack')) {
      return renderSlackConfig();
    }

    if (actionId.includes('send-appointment-reminder')) {
      return renderAppointmentReminderConfig();
    }
    if (actionId.includes('pre-visit') || actionId.includes('pre_visit')) {
      return renderPreVisitInstructionsConfig();
    }
    if (
      actionId.includes('satisfaction-survey') ||
      actionId.includes('portal-invitation') ||
      actionId.includes('portal-tutorial') ||
      actionId.includes('wait-time') ||
      actionId.includes('acknowledgment') ||
      actionId.includes('test-result') ||
      actionId.includes('follow-up-instructions') ||
      actionId.includes('provider-reports')
    ) {
      return renderPatientOutreachConfig();
    }

    if (actionId.includes('send-sms')) {
      return renderSmsConfig();
    }

    if (actionId.includes('email')) {
      return renderEmailConfig();
    }

    if (actionId.includes('notification') || actionId.includes('notify')) {
      return renderNotificationConfig();
    }

    if (
      actionId.includes('run-readmission') ||
      actionId.includes('run-risk-model') ||
      actionId.includes('run-risk') ||
      actionId.includes('run-hedis') ||
      actionId.includes('run-data-quality') ||
      actionId.includes('invoke-') ||
      actionId.includes('identify-care-gaps') ||
      actionId.includes('generate-outreach') ||
      actionId.includes('update-patient-risk') ||
      actionId.includes('run-prior-auth')
    ) {
      return renderAgentPipelineConfig();
    }

    if (
      actionId.includes('submit-quality') ||
      actionId.includes('calculate-aco') ||
      actionId.includes('generate-contract') ||
      actionId.includes('flag-hcc')
    ) {
      return renderVbcConfig();
    }

    if (actionId.includes('flag-claim') || actionId.includes('generate-denial')) {
      return renderRcmConfig();
    }

    if (actionId.includes('export-csv') || actionId.includes('export')) {
      return renderExportConfig();
    }

    if (actionId.includes('refresh-fhir') || actionId.includes('sync-ehr') || actionId.includes('sync')) {
      return renderRefreshConfig();
    }

    if (actionId.includes('simulation') || actionId.includes('run-simulation')) {
      return renderSimulationConfig();
    }

    const isForecastReport =
      actionId.includes('forecast') ||
      actionId.includes('deviation') ||
      (actionId.includes('report') &&
        !actionId.includes('denial') &&
        !actionId.includes('contract') &&
        !actionId.includes('clinical'));

    if (isForecastReport && (actionId.includes('report') || actionId.includes('generate'))) {
      return renderReportConfig();
    }

    return renderGenericStepConfig(action);
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
