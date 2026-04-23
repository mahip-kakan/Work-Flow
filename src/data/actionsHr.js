// HR-oriented action catalog — reuses action ids where ActionConfigPanel already supports them
export const hrActionCategories = [
  {
    id: 'notifications',
    name: 'Notifications',
    icon: 'Bell',
    actions: [
      {
        id: 'send-slack',
        name: 'Send Slack message',
        description: 'Notify HR shared channel or hiring manager thread',
        icon: 'MessageSquare',
        color: '#4a154b',
        module: null
      },
      {
        id: 'send-teams',
        name: 'Send Teams message',
        description: 'Post to HR or onboarding Teams channel',
        icon: 'MessageCircle',
        color: '#5558af',
        module: null
      },
      {
        id: 'send-email',
        name: 'Send email',
        description: 'Send candidate or employee communication from HR template',
        icon: 'Mail',
        color: '#DC2626',
        module: null
      },
      {
        id: 'in-app-notification',
        name: 'Push in-app notification',
        description: 'Notify HR or manager in HR portal / work queue',
        icon: 'Bell',
        color: '#1B2B5E',
        module: null
      }
    ]
  },
  {
    id: 'hr-workflows',
    name: 'Tasks & workflows',
    icon: 'ListChecks',
    actions: [
      {
        id: 'create-care-task-hr-onboarding',
        name: 'Create onboarding task',
        description: 'Assign checklist item to recruiter, IT, or hiring manager',
        icon: 'ClipboardCheck',
        color: '#7C3AED',
        module: 'People Ops'
      },
      {
        id: 'export-csv',
        name: 'Export roster or report',
        description: 'Generate CSV for audit, onboarding batch, or integration fix list',
        icon: 'Download',
        color: '#64748b',
        module: null
      },
      {
        id: 'run-data-quality-check',
        name: 'Run HRIS data quality check',
        description: 'Validate employee records against rules (manager, cost center, dates)',
        icon: 'CheckSquare',
        color: '#64748b',
        module: 'People Ops'
      }
    ]
  },
  {
    id: 'talent-automation',
    name: 'Talent automation',
    icon: 'Zap',
    actions: [
      {
        id: 'send-appointment-reminder',
        name: 'Send interview reminder',
        description: 'Reminder to candidate or panel before interview window',
        icon: 'Bell',
        color: '#059669',
        module: 'Talent Acquisition'
      },
      {
        id: 'send-hr-offer-email',
        name: 'Send offer packet email',
        description: 'Trigger offer letter and benefits summary (demo placeholder)',
        icon: 'Mail',
        color: '#059669',
        module: 'Talent Acquisition'
      }
    ]
  },
  {
    id: 'ai-assisted-hr',
    name: 'AI-assisted HR (Claude)',
    icon: 'Sparkles',
    actions: [
      {
        id: 'invoke-hr-jd-generator',
        name: 'Run Claude — JD draft',
        description: 'Structured job description from hiring intake; ready for Jira/HCM review',
        icon: 'Sparkles',
        color: '#7C3AED',
        module: 'Talent Acquisition'
      },
      {
        id: 'invoke-hr-interview-debrief',
        name: 'Run Claude — interview scorecard',
        description: 'Structured scorecard from calendar context, rubric, and panel notes',
        icon: 'Sparkles',
        color: '#7C3AED',
        module: 'Talent Acquisition'
      },
      {
        id: 'invoke-hr-onboarding-plan',
        name: 'Run Claude — 30-60-90 plan',
        description: 'Role-specific onboarding plan and resource kit (Drive-ready structure)',
        icon: 'Sparkles',
        color: '#7C3AED',
        module: 'People Ops'
      },
      {
        id: 'invoke-hr-policy-qa',
        name: 'Run Claude — policy Q&A (RAG)',
        description: 'Grounded answers from HR policy library with citations; escalates edge cases',
        icon: 'Sparkles',
        color: '#7C3AED',
        module: 'HRBP'
      }
    ]
  }
];
