import { HR_FEATURED_FLOWS, hrFeaturedToProductAgent } from './hrFeaturedCopilotFlows.js';

// Product-flow templates for HR pillars (same agent shape as healthcare ProductFlowsView)

function featuredAgent(flowId) {
  const f = HR_FEATURED_FLOWS.find((x) => x.id === flowId);
  return f ? hrFeaturedToProductAgent(f) : null;
}

const hrbpAgents = [
  featuredAgent('hr-flow-policy-qa'),
  {
    id: 'hrbp-1',
    name: 'Manager policy question triage',
    description: 'Route manager questions to the right HR queue with context and SLA reminders',
    trigger: {
      id: 'manager-request-submitted',
      name: 'When manager request is submitted',
      description: 'Headcount change, backfill, or org change request from manager',
      icon: 'UserPlus',
      color: '#7C3AED'
    },
    actions: [
      {
        id: 'create-care-task-hr-onboarding',
        name: 'Create HRBP follow-up task',
        description: 'Assign triage task to HRBP with manager context',
        icon: 'ClipboardCheck',
        color: '#7C3AED',
        module: 'HRBP'
      },
      {
        id: 'send-teams',
        name: 'Send Teams message',
        description: 'Notify HRBP channel with request summary',
        icon: 'MessageCircle',
        color: '#5558af',
        module: null
      },
      {
        id: 'in-app-notification',
        name: 'Push in-app notification',
        description: 'Alert assigned HRBP in HR portal',
        icon: 'Bell',
        color: '#1B2B5E',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'hrbp-2',
    name: 'Lifecycle change — manager briefing',
    description: 'When HRIS records a transfer or promotion, notify manager and create briefing tasks',
    trigger: {
      id: 'lifecycle-change-hris',
      name: 'When lifecycle change in HRIS',
      description: 'Transfer, promotion, leave start/end, or location change recorded',
      icon: 'GitBranch',
      color: '#7C3AED'
    },
    actions: [
      {
        id: 'send-email',
        name: 'Send email to manager',
        description: 'Send summary of change and next steps',
        icon: 'Mail',
        color: '#7C3AED',
        module: 'HRBP'
      },
      {
        id: 'create-care-task-hr-onboarding',
        name: 'Create checklist tasks',
        description: 'Tasks for comp letter, access review, and comms',
        icon: 'ClipboardCheck',
        color: '#7C3AED',
        module: 'HRBP'
      }
    ],
    isActive: true
  }
];

const talentAgents = [
  featuredAgent('hr-flow-jd-generator'),
  featuredAgent('hr-flow-interview-debrief'),
  {
    id: 'ta-1',
    name: 'Req opened to kickoff recruiting',
    description: 'When requisition is approved, notify recruiting and hiring manager with intake checklist',
    trigger: {
      id: 'requisition-approved',
      name: 'When requisition is approved',
      description: 'Open headcount approved; recruiting can begin',
      icon: 'CheckCircle',
      color: '#059669'
    },
    actions: [
      {
        id: 'send-slack',
        name: 'Send Slack message',
        description: 'Post to #recruiting with role link',
        icon: 'MessageSquare',
        color: '#059669',
        module: 'Talent Acquisition'
      },
      {
        id: 'create-care-task-hr-onboarding',
        name: 'Create recruiter intake task',
        description: 'Kickoff sourcing and intake call scheduling',
        icon: 'ClipboardCheck',
        color: '#059669',
        module: 'Talent Acquisition'
      },
      {
        id: 'send-email',
        name: 'Email hiring manager',
        description: 'Send intake form and timeline expectations',
        icon: 'Mail',
        color: '#059669',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'ta-2',
    name: 'Interview feedback SLA nudge',
    description: 'When interview round completes, remind panelists until scorecards are in',
    trigger: {
      id: 'interview-completed',
      name: 'When interview round is completed',
      description: 'All scorecards submitted for a stage',
      icon: 'ClipboardCheck',
      color: '#059669'
    },
    actions: [
      {
        id: 'send-appointment-reminder',
        name: 'Send reminder',
        description: 'Nudge panelists pending feedback',
        icon: 'Bell',
        color: '#059669',
        module: 'Talent Acquisition'
      },
      {
        id: 'send-teams',
        name: 'Send Teams message',
        description: 'Ping hiring manager on missing feedback',
        icon: 'MessageCircle',
        color: '#5558af',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'ta-3',
    name: 'Offer accepted — handoff to People ops',
    description: 'Start onboarding checklist and notify IT and payroll when offer is accepted',
    trigger: {
      id: 'offer-accepted',
      name: 'When offer is accepted',
      description: 'Candidate signed offer; handoff to People ops for onboarding',
      icon: 'UserCheck',
      color: '#059669'
    },
    actions: [
      {
        id: 'send-hr-offer-email',
        name: 'Send welcome email',
        description: 'First-day logistics and paperwork links',
        icon: 'Mail',
        color: '#059669',
        module: 'Talent Acquisition'
      },
      {
        id: 'create-care-task-hr-onboarding',
        name: 'Create People ops onboarding task',
        description: 'Master onboarding checklist for new hire',
        icon: 'ClipboardCheck',
        color: '#D97706',
        module: 'People Ops'
      },
      {
        id: 'send-teams',
        name: 'Notify IT provisioning',
        description: 'Alert IT channel with start date and role',
        icon: 'MessageCircle',
        color: '#5558af',
        module: null
      }
    ],
    isActive: true
  }
];

const peopleOpsAgents = [
  featuredAgent('hr-flow-onboarding-plan'),
  {
    id: 'po-1',
    name: 'T-minus onboarding runbook',
    description: 'Scheduled offsets before start date trigger equipment, access, and payroll tasks',
    trigger: {
      id: 't-minus-start-date',
      name: 'T-minus before start date',
      description: 'Trigger at fixed offsets before employee start date (e.g. T-14, T-7, T-1)',
      icon: 'Calendar',
      color: '#0284C7'
    },
    actions: [
      {
        id: 'create-care-task-hr-onboarding',
        name: 'Create onboarding sub-tasks',
        description: 'Laptop, badge, accounts by due date',
        icon: 'ClipboardCheck',
        color: '#D97706',
        module: 'People Ops'
      },
      {
        id: 'send-teams',
        name: 'Send Teams message',
        description: 'Notify facilities and IT with checklist status',
        icon: 'MessageCircle',
        color: '#5558af',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'po-2',
    name: 'HRIS duplicate record remediation',
    description: 'When data exception detected, open case and export affected rows for fix',
    trigger: {
      id: 'hris-data-exception',
      name: 'When HRIS data exception is detected',
      description: 'Duplicate profile, missing manager, or invalid job code in integration',
      icon: 'AlertTriangle',
      color: '#D97706'
    },
    actions: [
      {
        id: 'run-data-quality-check',
        name: 'Run HRIS data quality check',
        description: 'Re-run rules on impacted employee set',
        icon: 'CheckSquare',
        color: '#64748b',
        module: 'People Ops'
      },
      {
        id: 'export-csv',
        name: 'Export exception list',
        description: 'CSV for analysts to merge or correct source',
        icon: 'Download',
        color: '#64748b',
        module: null
      },
      {
        id: 'create-care-task-hr-onboarding',
        name: 'Assign remediation owner',
        description: 'People ops analyst owns resolution SLA',
        icon: 'ClipboardCheck',
        color: '#D97706',
        module: 'People Ops'
      }
    ],
    isActive: true
  }
];

export const hrModuleConfigs = {
  'HRBP & Employee Lifecycle': {
    icon: 'Users',
    color: '#7C3AED',
    description: 'Employee lifecycle, policy questions, and manager support—triage, comms, and tasks in one place',
    agents: hrbpAgents
  },
  'Talent Acquisition': {
    icon: 'Briefcase',
    color: '#059669',
    description: 'Requisitions, interviews, and offers—automate nudges, handoffs, and recruiter/manager alignment',
    agents: talentAgents
  },
  'People Ops & Systems': {
    icon: 'Settings',
    color: '#D97706',
    description: 'Onboarding tasks, access, and HRIS data quality—runbooks, exports, and exception routing',
    agents: peopleOpsAgents
  }
};

export const HR_PILLAR_DEFAULT = 'HRBP & Employee Lifecycle';
