// IT/SaaS-oriented trigger catalog
export const itSaasTriggerCategories = [
  {
    id: 'schedule',
    name: 'Schedule',
    icon: 'Clock',
    triggers: [
      {
        id: 'it-on-schedule',
        name: 'On a schedule',
        description: 'Run daily, weekly, or monthly (e.g. license audits, access reviews)',
        icon: 'Clock',
        color: '#0284C7'
      },
      {
        id: 'it-quarterly-review',
        name: 'Quarterly access review',
        description: 'Trigger a periodic review of roles and SaaS app access across all connected apps',
        icon: 'CalendarCheck',
        color: '#0284C7'
      },
      {
        id: 'it-renewal-approaching',
        name: 'When renewal date approaches',
        description: 'Fire at T-90, T-30, T-7 days before a SaaS contract renewal date',
        icon: 'Calendar',
        color: '#0284C7'
      }
    ]
  },
  {
    id: 'api-events',
    name: 'API & Integration Events',
    icon: 'Zap',
    triggers: [
      {
        id: 'it-api-doc-submitted',
        name: 'When API doc URL is submitted',
        description: 'User pastes an API documentation URL — AI parses and generates connector code',
        icon: 'Link',
        color: '#7C3AED'
      },
      {
        id: 'it-connector-generated',
        name: 'When connector code is generated',
        description: 'AI finishes generating integration code — trigger review and sandbox test workflow',
        icon: 'Code',
        color: '#7C3AED'
      },
      {
        id: 'it-sandbox-passed',
        name: 'When sandbox test passes',
        description: 'All sandbox validation steps pass — trigger promotion-to-production approval flow',
        icon: 'CheckCircle',
        color: '#059669'
      },
      {
        id: 'it-api-rate-limit-hit',
        name: 'When API rate limit is hit',
        description: 'A connected SaaS app returns 429 Too Many Requests — trigger backoff and alert',
        icon: 'AlertTriangle',
        color: '#D97706'
      }
    ]
  },
  {
    id: 'saas-events',
    name: 'SaaS App Events',
    icon: 'Layers',
    triggers: [
      {
        id: 'it-new-user-saas',
        name: 'When new user is added to SaaS app',
        description: 'A new seat is provisioned in Slack, GitHub, Jira, or any connected app',
        icon: 'UserPlus',
        color: '#0284C7'
      },
      {
        id: 'it-user-inactive',
        name: 'When user is inactive for 30+ days',
        description: 'User has not logged in to a connected app for 30 days — flag for license reclamation',
        icon: 'UserX',
        color: '#D97706'
      },
      {
        id: 'it-spend-threshold',
        name: 'When spend threshold is exceeded',
        description: 'Monthly SaaS spend exceeds a configured budget threshold',
        icon: 'DollarSign',
        color: '#DC2626'
      },
      {
        id: 'it-duplicate-app-detected',
        name: 'When duplicate app is detected',
        description: 'Two or more apps with overlapping functionality are active in the org',
        icon: 'Copy',
        color: '#7C3AED'
      }
    ]
  },
  {
    id: 'itsm-events',
    name: 'ITSM & Incident Events',
    icon: 'Wrench',
    triggers: [
      {
        id: 'it-p1-alert',
        name: 'When P1 alert fires',
        description: 'Critical incident detected in monitoring — auto-create ticket and page on-call',
        icon: 'Siren',
        color: '#DC2626'
      },
      {
        id: 'it-change-request',
        name: 'When change request is submitted',
        description: 'CAB change request created — trigger approval routing and stakeholder notification',
        icon: 'GitPullRequest',
        color: '#D97706'
      },
      {
        id: 'it-ticket-opened',
        name: 'When IT ticket is opened',
        description: 'New ticket created in Jira Service Management or ServiceNow — triage and route',
        icon: 'Ticket',
        color: '#0284C7'
      }
    ]
  },
  {
    id: 'identity-events',
    name: 'Identity & Access Events',
    icon: 'Shield',
    triggers: [
      {
        id: 'it-employee-offboarded',
        name: 'When employee is offboarded',
        description: 'HR system signals termination — trigger cross-app deprovisioning workflow',
        icon: 'LogOut',
        color: '#DC2626'
      },
      {
        id: 'it-employee-onboarded',
        name: 'When employee is onboarded',
        description: 'New hire confirmed in HRIS — provision SaaS apps based on role template',
        icon: 'UserCheck',
        color: '#059669'
      },
      {
        id: 'it-role-change',
        name: 'When employee role changes',
        description: 'Promotion or transfer recorded — update SaaS access to match new role',
        icon: 'Shuffle',
        color: '#7C3AED'
      }
    ]
  }
];
