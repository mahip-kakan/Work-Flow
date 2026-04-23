// HR-oriented trigger catalog (parallel to healthcare triggers)
export const hrTriggerCategories = [
  {
    id: 'schedule',
    name: 'Schedule',
    icon: 'Clock',
    triggers: [
      {
        id: 'hr-on-schedule',
        name: 'On a schedule',
        description: 'Run daily or weekly (e.g. onboarding reminders, access reviews)',
        icon: 'Clock',
        color: '#0284C7'
      },
      {
        id: 't-minus-start-date',
        name: 'T-minus before start date',
        description: 'Trigger at fixed offsets before employee start date (e.g. T-14, T-7, T-1)',
        icon: 'Calendar',
        color: '#0284C7'
      },
      {
        id: 'quarterly-access-review',
        name: 'Quarterly access review',
        description: 'Scheduled periodic review of roles and application access',
        icon: 'Shield',
        color: '#0284C7'
      }
    ]
  },
  {
    id: 'employee-lifecycle',
    name: 'Employee lifecycle',
    icon: 'Users',
    triggers: [
      {
        id: 'hr-case-opened',
        name: 'When HR case is opened',
        description: 'Employee or manager submitted a case in HRIS or ticketing',
        icon: 'FolderOpen',
        color: '#7C3AED'
      },
      {
        id: 'lifecycle-change-hris',
        name: 'When lifecycle change in HRIS',
        description: 'Transfer, promotion, leave start/end, or location change recorded',
        icon: 'GitBranch',
        color: '#7C3AED'
      },
      {
        id: 'manager-request-submitted',
        name: 'When manager request is submitted',
        description: 'Headcount change, backfill, or org change request from manager',
        icon: 'UserPlus',
        color: '#7C3AED'
      },
      {
        id: 'employee-policy-question',
        name: 'When employee asks a policy question',
        description: 'Question in HR portal, Teams, or email—ready for grounded policy search',
        icon: 'HelpCircle',
        color: '#7C3AED'
      }
    ]
  },
  {
    id: 'talent',
    name: 'Talent acquisition',
    icon: 'Briefcase',
    triggers: [
      {
        id: 'hiring-request-raised',
        name: 'When hiring request is raised',
        description: 'Intake approved to draft or refresh a job description (often tied to Jira/HCM)',
        icon: 'FileText',
        color: '#059669'
      },
      {
        id: 'requisition-approved',
        name: 'When requisition is approved',
        description: 'Open headcount approved; recruiting can begin',
        icon: 'CheckCircle',
        color: '#059669'
      },
      {
        id: 'interview-session-completed',
        name: 'When interview is completed',
        description: 'Interview session ended; calendar and notes available for debrief automation',
        icon: 'Calendar',
        color: '#059669'
      },
      {
        id: 'interview-completed',
        name: 'When interview round is completed',
        description: 'All scorecards submitted for a stage',
        icon: 'ClipboardCheck',
        color: '#059669'
      },
      {
        id: 'offer-accepted',
        name: 'When offer is accepted',
        description: 'Candidate signed offer; handoff to People ops for onboarding',
        icon: 'UserCheck',
        color: '#059669'
      }
    ]
  },
  {
    id: 'people-ops',
    name: 'People ops & systems',
    icon: 'Settings',
    triggers: [
      {
        id: 'start-date-set',
        name: 'When start date is set',
        description: 'Confirmed start date in HRIS; kick off provisioning checklist',
        icon: 'CalendarCheck',
        color: '#D97706'
      },
      {
        id: 'access-request-created',
        name: 'When access request is created',
        description: 'IT or manager requested application or group access',
        icon: 'Key',
        color: '#D97706'
      },
      {
        id: 'hris-data-exception',
        name: 'When HRIS data exception is detected',
        description: 'Duplicate profile, missing manager, or invalid job code in integration',
        icon: 'AlertTriangle',
        color: '#D97706'
      }
    ]
  }
];
