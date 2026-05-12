import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, Zap, Users, TrendingUp, Heart, UserCheck, Smile, DollarSign, MessageCircle, Search, Briefcase, Globe } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { HR_FEATURED_FLOWS, hrFeaturedToQuickTemplate } from '../data/hrFeaturedCopilotFlows';
import { MARKETING_FLOW_TEMPLATES, MARKETING_MODULES, MARKETING_AI_SUGGESTIONS } from '../data/marketingTemplates';

const quickTemplates = [
  {
    id: 'post-discharge-followup',
    category: 'Prevent readmissions',
    title: 'Post-discharge follow-up',
    description: 'Automatically create care team tasks and notify care managers after patient discharge',
    icons: ['LogOut', 'ClipboardCheck', 'MessageCircle'],
    color: '#DC2626',
    trigger: {
      id: 'patient-discharge',
      name: 'When patient is discharged',
      description: 'Discharge ADT event received from EHR',
      icon: 'LogOut',
      color: '#DC2626'
    },
    actions: [
      { id: 'create-care-plan', name: 'Create care plan', icon: 'FileText', color: '#DC2626' },
      { id: 'create-care-task', name: 'Create care team task', icon: 'ClipboardCheck', color: '#DC2626' },
      { id: 'send-teams', name: 'Send Teams message', icon: 'MessageCircle', color: '#5558af' }
    ]
  },
  {
    id: 'readmission-risk-alert',
    category: 'Prevent adverse events',
    title: 'Readmission risk alert',
    description: 'Flag high-risk patients at discharge and trigger immediate care team follow-up',
    icons: ['AlertTriangle', 'Activity', 'Bell'],
    color: '#DC2626',
    trigger: {
      id: 'readmission-risk-flagged',
      name: 'When readmission risk is flagged',
      description: '30-day readmission probability > 40%',
      icon: 'AlertTriangle',
      color: '#DC2626'
    },
    actions: [
      { id: 'run-readmission-model', name: 'Run Readmission Risk Model', icon: 'Activity', color: '#7C3AED' },
      { id: 'create-care-plan', name: 'Create enhanced care plan', icon: 'FileText', color: '#DC2626' },
      { id: 'in-app-notification', name: 'Push in-app notification', icon: 'Bell', color: '#1B2B5E' }
    ]
  },
  {
    id: 'appointment-reminder',
    category: 'Improve patient access',
    title: 'Appointment reminder automation',
    description: 'Send personalized appointment reminders via patient preferred channel',
    icons: ['Calendar', 'Bell', 'MessageCircle'],
    color: '#D97706',
    trigger: {
      id: 'appointment-scheduled',
      name: 'When appointment is scheduled',
      description: 'New appointment created in scheduling system',
      icon: 'Calendar',
      color: '#D97706'
    },
    actions: [
      { id: 'send-appointment-reminder', name: 'Send appointment reminder', icon: 'Bell', color: '#D97706' },
      { id: 'send-pre-visit-instructions', name: 'Send pre-visit instructions', icon: 'FileText', color: '#D97706' }
    ]
  }
];

const modules = [
  { name: 'Population Health', icon: 'Users', color: '#7C3AED' },
  { name: 'Value-Based Care', icon: 'TrendingUp', color: '#059669' },
  { name: 'RCM', icon: 'DollarSign', color: '#0284C7' },
  { name: 'Clinical Care', icon: 'Heart', color: '#DC2626' },
  { name: 'Provider Engagement', icon: 'UserCheck', color: '#0891b2' },
  { name: 'Patient Experience', icon: 'Smile', color: '#D97706' },
];

const aiSuggestions = [
  { query: 'discharge', suggestion: 'Post-discharge follow-up', template: 'post-discharge-followup' },
  { query: 'readmission', suggestion: 'Readmission risk alert', template: 'readmission-risk-alert' },
  { query: 'appointment', suggestion: 'Appointment reminder automation', template: 'appointment-reminder' },
  { query: 'reminder', suggestion: 'Appointment reminder automation', template: 'appointment-reminder' },
  { query: 'follow-up', suggestion: 'Post-discharge follow-up', template: 'post-discharge-followup' },
  { query: 'risk', suggestion: 'Readmission risk alert', template: 'readmission-risk-alert' },
  { query: 'patient', suggestion: 'Appointment reminder automation', template: 'appointment-reminder' },
  { query: 'alert', suggestion: 'Readmission risk alert', template: 'readmission-risk-alert' },
];

const hrQuickTemplates = [
  ...HR_FEATURED_FLOWS.map(hrFeaturedToQuickTemplate),
  {
    id: 'hr-onboarding-runbook',
    category: 'People ops',
    title: 'New hire onboarding runbook',
    description: 'T-minus tasks for IT, facilities, and manager when start date is confirmed',
    icons: ['CalendarCheck', 'ClipboardCheck', 'MessageCircle'],
    color: '#D97706',
    trigger: {
      id: 'start-date-set',
      name: 'When start date is set',
      description: 'Confirmed start date in HRIS; kick off provisioning checklist',
      icon: 'CalendarCheck',
      color: '#D97706'
    },
    actions: [
      { id: 'create-care-task-hr-onboarding', name: 'Create onboarding checklist', icon: 'ClipboardCheck', color: '#D97706' },
      { id: 'send-teams', name: 'Send Teams message', icon: 'MessageCircle', color: '#5558af' },
      { id: 'send-email', name: 'Send welcome email', icon: 'Mail', color: '#D97706' }
    ]
  },
  {
    id: 'hr-offer-handoff',
    category: 'Talent acquisition',
    title: 'Offer accepted — onboarding handoff',
    description: 'Notify People ops and IT when a candidate accepts an offer',
    icons: ['UserCheck', 'ClipboardCheck', 'MessageCircle'],
    color: '#059669',
    trigger: {
      id: 'offer-accepted',
      name: 'When offer is accepted',
      description: 'Candidate signed offer; handoff to People ops for onboarding',
      icon: 'UserCheck',
      color: '#059669'
    },
    actions: [
      { id: 'send-hr-offer-email', name: 'Send welcome email', icon: 'Mail', color: '#059669' },
      { id: 'create-care-task-hr-onboarding', name: 'Create People ops task', icon: 'ClipboardCheck', color: '#D97706' },
      { id: 'send-teams', name: 'Notify IT provisioning', icon: 'MessageCircle', color: '#5558af' }
    ]
  },
  {
    id: 'hr-manager-triage',
    category: 'HRBP',
    title: 'Manager request triage',
    description: 'Route manager requests to HRBP with Teams summary and follow-up task',
    icons: ['UserPlus', 'ClipboardCheck', 'Bell'],
    color: '#7C3AED',
    trigger: {
      id: 'manager-request-submitted',
      name: 'When manager request is submitted',
      description: 'Headcount change, backfill, or org change request from manager',
      icon: 'UserPlus',
      color: '#7C3AED'
    },
    actions: [
      { id: 'create-care-task-hr-onboarding', name: 'Create HRBP task', icon: 'ClipboardCheck', color: '#7C3AED' },
      { id: 'send-teams', name: 'Send Teams message', icon: 'MessageCircle', color: '#5558af' },
      { id: 'in-app-notification', name: 'Push in-app notification', icon: 'Bell', color: '#1B2B5E' }
    ]
  }
];

const hrModules = [
  { name: 'HRBP & Employee Lifecycle', icon: 'Users', color: '#7C3AED' },
  { name: 'Talent Acquisition', icon: 'Briefcase', color: '#059669' },
  { name: 'People Ops & Systems', icon: 'Settings', color: '#D97706' }
];

const hrAiSuggestions = [
  { query: 'jd', suggestion: 'JD generator', template: 'hr-flow-jd-generator' },
  { query: 'job description', suggestion: 'JD generator', template: 'hr-flow-jd-generator' },
  { query: 'requisition', suggestion: 'JD generator', template: 'hr-flow-jd-generator' },
  { query: 'interview', suggestion: 'Interview debrief', template: 'hr-flow-interview-debrief' },
  { query: 'debrief', suggestion: 'Interview debrief', template: 'hr-flow-interview-debrief' },
  { query: 'scorecard', suggestion: 'Interview debrief', template: 'hr-flow-interview-debrief' },
  { query: '30-60-90', suggestion: 'Onboarding plan', template: 'hr-flow-onboarding-plan' },
  { query: 'onboarding plan', suggestion: 'Onboarding plan', template: 'hr-flow-onboarding-plan' },
  { query: 'resource kit', suggestion: 'Onboarding plan', template: 'hr-flow-onboarding-plan' },
  { query: 'policy', suggestion: 'Policy QA bot', template: 'hr-flow-policy-qa' },
  { query: 'employee question', suggestion: 'Policy QA bot', template: 'hr-flow-policy-qa' },
  { query: 'pto', suggestion: 'Policy QA bot', template: 'hr-flow-policy-qa' },
  { query: 'onboard', suggestion: 'New hire onboarding runbook', template: 'hr-onboarding-runbook' },
  { query: 'onboarding', suggestion: 'New hire onboarding runbook', template: 'hr-onboarding-runbook' },
  { query: 'offer', suggestion: 'Offer accepted — onboarding handoff', template: 'hr-offer-handoff' },
  { query: 'handoff', suggestion: 'Offer accepted — onboarding handoff', template: 'hr-offer-handoff' },
  { query: 'manager', suggestion: 'Manager request triage', template: 'hr-manager-triage' },
  { query: 'triage', suggestion: 'Manager request triage', template: 'hr-manager-triage' },
  { query: 'hrbp', suggestion: 'Manager request triage', template: 'hr-manager-triage' }
];

const itSaasQuickTemplates = [
  {
    id: 'it-calendly-sync',
    category: 'Integration Builder',
    title: 'Calendly → user sync',
    description: 'AI reads the Calendly API docs and generates a connector to pull users, events, and usage data into the platform',
    icons: ['Link', 'Code', 'Rocket'],
    color: '#7C3AED',
    trigger: {
      id: 'it-api-doc-submitted',
      name: 'When API doc URL is submitted',
      description: 'User pastes Calendly API documentation URL',
      icon: 'Link',
      color: '#7C3AED'
    },
    actions: [
      { id: 'ai-generate-connector', name: 'AI: Generate connector code', icon: 'Code', color: '#7C3AED' },
      { id: 'run-sandbox-test', name: 'Run sandbox test', icon: 'FlaskConical', color: '#0284C7' },
      { id: 'promote-to-production', name: 'Promote to production', icon: 'Rocket', color: '#059669' }
    ]
  },
  {
    id: 'it-slack-offboard',
    category: 'Access & Compliance',
    title: 'Slack + Notion + GitHub offboarding',
    description: 'When an employee is terminated, automatically revoke access across all connected SaaS apps in one workflow',
    icons: ['LogOut', 'UserX', 'MessageSquare'],
    color: '#DC2626',
    trigger: {
      id: 'it-employee-offboarded',
      name: 'When employee is offboarded',
      description: 'HR system signals employee termination',
      icon: 'LogOut',
      color: '#DC2626'
    },
    actions: [
      { id: 'deprovision-user', name: 'Deprovision user across apps', icon: 'UserX', color: '#DC2626' },
      { id: 'update-okta-group', name: 'Update Okta group', icon: 'Lock', color: '#007DC1' },
      { id: 'send-slack-it', name: 'Notify IT on Slack', icon: 'MessageSquare', color: '#4a154b' }
    ]
  },
  {
    id: 'it-jira-spend-alert',
    category: 'Cost Governance',
    title: 'Jira spend threshold alert',
    description: 'When Jira license spend exceeds budget, notify IT and Finance on Slack with a spend breakdown',
    icons: ['DollarSign', 'AlertTriangle', 'MessageSquare'],
    color: '#059669',
    trigger: {
      id: 'it-spend-threshold',
      name: 'When spend threshold is exceeded',
      description: 'Monthly Jira license cost exceeds budget',
      icon: 'DollarSign',
      color: '#DC2626'
    },
    actions: [
      { id: 'export-to-sheets', name: 'Export spend report to Sheets', icon: 'Table', color: '#0F9D58' },
      { id: 'send-slack-it', name: 'Alert Finance on Slack', icon: 'MessageSquare', color: '#4a154b' }
    ]
  },
  {
    id: 'it-license-report',
    category: 'Cost Governance',
    title: 'Weekly license usage report',
    description: 'Every Monday, export unused license data across all connected apps to a Google Sheet for IT review',
    icons: ['Clock', 'Table', 'Mail'],
    color: '#0F9D58',
    trigger: {
      id: 'it-on-schedule',
      name: 'On a schedule',
      description: 'Run weekly on Monday at 08:00',
      icon: 'Clock',
      color: '#0284C7'
    },
    actions: [
      { id: 'export-to-sheets', name: 'Export to Google Sheets', icon: 'Table', color: '#0F9D58' },
      { id: 'send-email-it', name: 'Email IT admin', icon: 'Mail', color: '#DC2626' }
    ]
  },
  {
    id: 'it-hubspot-sync',
    category: 'Integration Builder',
    title: 'HubSpot contact import',
    description: 'AI generates a HubSpot API connector — maps contacts to SaaS users and syncs weekly',
    icons: ['Link', 'GitMerge', 'MessageSquare'],
    color: '#FF7A59',
    trigger: {
      id: 'it-on-schedule',
      name: 'On a schedule',
      description: 'Run weekly on Monday',
      icon: 'Clock',
      color: '#D97706'
    },
    actions: [
      { id: 'ai-generate-connector', name: 'AI: Generate HubSpot connector', icon: 'Code', color: '#7C3AED' },
      { id: 'map-api-fields', name: 'Map API fields to schema', icon: 'GitMerge', color: '#7C3AED' },
      { id: 'send-slack-it', name: 'Notify on Slack', icon: 'MessageSquare', color: '#4a154b' }
    ]
  },
  {
    id: 'it-github-access-review',
    category: 'Access & Compliance',
    title: 'GitHub quarterly access review',
    description: 'Audit all GitHub org members quarterly — export last-active dates to Sheets and create review tasks in Jira',
    icons: ['CalendarCheck', 'Table', 'Ticket'],
    color: '#24292E',
    trigger: {
      id: 'it-quarterly-review',
      name: 'Quarterly access review',
      description: 'Scheduled quarterly trigger',
      icon: 'CalendarCheck',
      color: '#0284C7'
    },
    actions: [
      { id: 'export-to-sheets', name: 'Export member list to Sheets', icon: 'Table', color: '#0F9D58' },
      { id: 'create-jira-ticket', name: 'Create Jira review task', icon: 'Ticket', color: '#0052CC' }
    ]
  }
];

const itSaasModules = [
  { name: 'Integration Builder', icon: 'Zap', color: '#7C3AED' },
  { name: 'Access & Compliance', icon: 'Shield', color: '#0284C7' },
  { name: 'ITSM Automation', icon: 'Wrench', color: '#D97706' },
  { name: 'Cost Governance', icon: 'DollarSign', color: '#059669' }
];

const itSaasAiSuggestions = [
  { query: 'calendly', suggestion: 'Calendly → user sync', template: 'it-calendly-sync' },
  { query: 'api', suggestion: 'Calendly → user sync', template: 'it-calendly-sync' },
  { query: 'connector', suggestion: 'Calendly → user sync', template: 'it-calendly-sync' },
  { query: 'offboard', suggestion: 'Slack + Notion + GitHub offboarding', template: 'it-slack-offboard' },
  { query: 'offboarding', suggestion: 'Slack + Notion + GitHub offboarding', template: 'it-slack-offboard' },
  { query: 'deprovision', suggestion: 'Slack + Notion + GitHub offboarding', template: 'it-slack-offboard' },
  { query: 'spend', suggestion: 'Jira spend threshold alert', template: 'it-jira-spend-alert' },
  { query: 'budget', suggestion: 'Jira spend threshold alert', template: 'it-jira-spend-alert' },
  { query: 'license', suggestion: 'Weekly license usage report', template: 'it-license-report' },
  { query: 'unused', suggestion: 'Weekly license usage report', template: 'it-license-report' },
  { query: 'hubspot', suggestion: 'HubSpot contact import', template: 'it-hubspot-sync' },
  { query: 'github', suggestion: 'GitHub quarterly access review', template: 'it-github-access-review' },
  { query: 'access review', suggestion: 'GitHub quarterly access review', template: 'it-github-access-review' }
];

const knowledgeBases = [
  { id: 'local', label: 'Local', icon: Briefcase },
  { id: 'organization', label: 'Organization', icon: ArrowRight },
  { id: 'global', label: 'Global', icon: Globe },
];

const AILandingPage = ({ vertical = 'healthcare', onSelectTemplate, onSelectProduct, onCreateFlow }) => {
  const isHr = vertical === 'hr';
  const isMarketing = vertical === 'marketing';
  const isItSaas = vertical === 'it-saas';
  const activeQuickTemplates = isHr ? hrQuickTemplates : isMarketing ? MARKETING_FLOW_TEMPLATES : isItSaas ? itSaasQuickTemplates : quickTemplates;
  const activeModules = isHr ? hrModules : isMarketing ? MARKETING_MODULES : isItSaas ? itSaasModules : modules;
  const activeAiSuggestions = isHr ? hrAiSuggestions : isMarketing ? MARKETING_AI_SUGGESTIONS : isItSaas ? itSaasAiSuggestions : aiSuggestions;

  const [inputValue, setInputValue] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [matchedSuggestion, setMatchedSuggestion] = useState(null);
  const [knowledgeBase, setKnowledgeBase] = useState('organization');
  const [knowledgeBaseOpen, setKnowledgeBaseOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const selectTriggerRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!knowledgeBaseOpen || !selectTriggerRef.current) return;
    const rect = selectTriggerRef.current.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + 6,
      left: rect.left + rect.width / 2,
    });
  }, [knowledgeBaseOpen]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 2) {
      const match = activeAiSuggestions.find(s =>
        value.toLowerCase().includes(s.query.toLowerCase())
      );
      if (match) {
        setMatchedSuggestion(match);
        setShowSuggestion(true);
      } else {
        setShowSuggestion(false);
        setMatchedSuggestion(null);
      }
    } else {
      setShowSuggestion(false);
    }
  };

  const handleCreate = () => {
    if (matchedSuggestion) {
      const template = activeQuickTemplates.find(t => t.id === matchedSuggestion.template);
      if (template) {
        onCreateFlow({
          name: inputValue || template.title,
          trigger: template.trigger,
          actions: template.actions
        });
      }
    } else if (inputValue.trim()) {
      onCreateFlow({
        name: inputValue,
        trigger: null,
        actions: []
      });
    }
  };

  const handleQuickTurnOn = (template) => {
    onCreateFlow({
      name: template.title,
      trigger: template.trigger,
      actions: template.actions
    });
  };

  return (
    <div className="ai-landing-page">
      {/* Hero Section */}
      <div className="ai-hero">
        <div className="hero-decoration"></div>
        <h1>
          {isHr ? (
            <>
              HR onboarding, talent, and people ops—in <span className="gradient-text">Workflow Studio</span>
            </>
          ) : isMarketing ? (
            <>
              Campaigns, content, and GTM automation—in <span className="gradient-text">Workflow Studio</span>
            </>
          ) : isItSaas ? (
            <>
              Build integrations to any SaaS app—<span className="gradient-text">no engineers needed</span>
            </>
          ) : (
            <>
              Clinical and operational automation—in <span className="gradient-text">Workflow Studio</span>
            </>
          )}
        </h1>
        <p className="hero-subtitle">
          {isHr
            ? 'Onboarding, talent, and people ops—tasks, approvals, and notifications across HRBP, TA, and systems teams'
            : isMarketing
              ? 'Debriefs, repurposing, intel briefs, and experiment readouts—aligned with how modern marketing teams ship'
              : isItSaas
                ? 'Point AI at any API documentation and generate a production-ready connector — auth, pagination, error handling, and logging included'
                : 'Design, deploy, and automate clinical and operational workflows across your health system'}
        </p>

        {/* AI Input - search bar with knowledge base */}
        <div className="ai-input-container">
          <div className="ai-input-wrapper ai-search-bar">
            <div className="ai-search-bar-icons">
              <Search size={20} className="ai-search-icon" />
            </div>
            <input
              type="text"
              placeholder={
                isHr
                  ? 'Search onboarding, requisitions, HRIS, or policies…'
                  : isMarketing
                    ? 'Search campaigns, content, briefs, or experiments…'
                    : isItSaas
                      ? 'Search integrations, connectors, access reviews, or spend…'
                      : 'Search workflows, patients, or policies…'
              }
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
            <button
              className="ai-create-btn"
              onClick={handleCreate}
              disabled={!inputValue.trim()}
            >
              <Sparkles size={18} />
              <span>Build</span>
            </button>
          </div>

          {/* Knowledge base selector: Local, Organization, Global */}
          <div className="knowledge-base-select-wrap">
            <button
              ref={selectTriggerRef}
              type="button"
              className="knowledge-base-select"
              onClick={() => setKnowledgeBaseOpen((o) => !o)}
              aria-expanded={knowledgeBaseOpen}
              aria-haspopup="listbox"
            >
              <span>{knowledgeBases.find((kb) => kb.id === knowledgeBase)?.label ?? 'Select'}</span>
              <span className={`knowledge-base-chevron ${knowledgeBaseOpen ? 'open' : ''}`}>▲</span>
            </button>
            {knowledgeBaseOpen && (
              <>
                <div className="knowledge-base-backdrop" onClick={() => setKnowledgeBaseOpen(false)} aria-hidden="true" />
                <div
                  ref={dropdownRef}
                  className="knowledge-base-dropdown knowledge-base-dropdown-fixed"
                  role="listbox"
                  style={{
                    top: dropdownPosition.top,
                    left: dropdownPosition.left,
                    transform: 'translateX(-50%)',
                  }}
                >
                  <div className="knowledge-base-dropdown-header">All knowledge bases</div>
                  {knowledgeBases.map((kb) => {
                    const Icon = kb.icon;
                    return (
                      <button
                        key={kb.id}
                        type="button"
                        className="knowledge-base-option"
                        role="option"
                        aria-selected={knowledgeBase === kb.id}
                        onClick={() => {
                          setKnowledgeBase(kb.id);
                          setKnowledgeBaseOpen(false);
                        }}
                      >
                        <Icon size={18} />
                        <span>{kb.label}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* AI Suggestion */}
          {showSuggestion && matchedSuggestion && (
            <div className="ai-suggestion">
              <Zap size={16} />
              <span>Suggested: <strong>{matchedSuggestion.suggestion}</strong></span>
              <button onClick={handleCreate}>
                Use this <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Compliance Strip */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 20, fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>
          {isMarketing ? (
            <>
              <span>Brand guidelines</span>
              <span>·</span>
              <span>Marketing consent</span>
              <span>·</span>
              <span>SOC 2 Type II</span>
              <span>·</span>
              <span>CRM &amp; MAP connectors</span>
            </>
          ) : isItSaas ? (
            <>
              <span>SOC 2 Type II</span>
              <span>·</span>
              <span>ISO 27001</span>
              <span>·</span>
              <span>GDPR</span>
              <span>·</span>
              <span>Sandbox-first execution</span>
            </>
          ) : (
            <>
              <span>HIPAA</span>
              <span>·</span>
              <span>HITRUST</span>
              <span>·</span>
              <span>SOC 2 Type II</span>
              <span>·</span>
              <span>FHIR R4</span>
            </>
          )}
        </div>
      </div>

      {/* Quick Templates */}
      <div className="quick-templates-section">
        {isMarketing ? (
          <div className="marketing-recipes-view marketing-recipes-view--embedded">
            <div className="marketing-recipes-view__grid" role="list">
              {MARKETING_FLOW_TEMPLATES.map((template) => (
                <article key={template.id} className="marketing-recipe-card" role="listitem">
                  <span className="marketing-recipe-card__category" style={{ color: template.color }}>
                    {template.category}
                  </span>
                  <h2 className="marketing-recipe-card__title">{template.title}</h2>
                  <div className="marketing-recipe-card__body">
                    <p>
                      <span className="marketing-recipe-card__label">Trigger:</span>{' '}
                      {template.trigger.name}
                    </p>
                    <p>
                      <span className="marketing-recipe-card__label">Output:</span>{' '}
                      {template.outputSummary}
                    </p>
                  </div>
                  <div className="marketing-recipe-card__pill" aria-label="Tools">
                    {template.stack}
                  </div>
                  <div className="marketing-recipe-card__actions">
                    <button type="button" className="turn-on-btn" onClick={() => handleQuickTurnOn(template)}>
                      Deploy
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : (
          <div className="quick-templates-grid">
            {activeQuickTemplates.map((template) => (
              <div key={template.id} className="quick-template-card">
                <span className="template-category" style={{ color: template.color }}>
                  {template.category}
                </span>
                <h3>{template.title}</h3>
                <p>{template.description}</p>
                <div className="template-footer">
                  <div className="template-icons">
                    {template.icons.map((iconName, idx) => {
                      const IconComponent = LucideIcons[iconName] || LucideIcons.Circle;
                      return (
                        <div
                          key={idx}
                          className="template-icon"
                          style={{ backgroundColor: template.color + '15', color: template.color }}
                        >
                          <IconComponent size={16} />
                        </div>
                      );
                    })}
                  </div>
                  <button type="button" className="turn-on-btn" onClick={() => handleQuickTurnOn(template)}>
                    Deploy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Browse by Module */}
      <div className="browse-products-section">
        <h2>{isHr ? 'Browse by HR pillar' : isMarketing ? 'Browse by marketing pillar' : isItSaas ? 'Browse by IT pillar' : 'Browse by Domain'}</h2>
        <div className="product-pills">
          {activeModules.map(module => {
            const IconComponent = LucideIcons[module.icon];
            return (
              <button
                key={module.name}
                className="product-pill"
                onClick={() => onSelectProduct(module.name)}
              >
                <div
                  className="pill-icon"
                  style={{ backgroundColor: module.color + '15', color: module.color }}
                >
                  <IconComponent size={18} />
                </div>
                <span>{module.name}</span>
                <ArrowRight size={16} className="pill-arrow" />
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default AILandingPage;
