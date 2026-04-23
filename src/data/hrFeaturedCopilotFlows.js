/**
 * Four featured HR + Claude copilot flows (JD, debrief, onboarding plan, policy QA).
 * Used for My Flows seeds, home quick templates, Discover, and product pillar agents.
 */

const spark = '#7C3AED';

export const HR_FEATURED_FLOWS = [
  {
    id: 'hr-flow-jd-generator',
    name: 'JD generator',
    summary: 'Structured JD ready to post from hiring intake',
    category: 'Talent acquisition',
    module: 'Talent Acquisition',
    icons: ['FileText', 'Sparkles', 'Briefcase'],
    color: '#059669',
    vertical: 'hr',
    trigger: {
      id: 'hiring-request-raised',
      name: 'When hiring request is raised',
      description: 'New headcount or backfill request approved; ready to draft the role profile',
      icon: 'UserPlus',
      color: '#059669'
    },
    actions: [
      {
        id: 'invoke-hr-jd-generator',
        name: 'Run Claude — JD draft',
        description: 'Structured JD from requisition notes; cites level, location, and comp band context',
        icon: 'Sparkles',
        color: spark,
        module: 'Talent Acquisition'
      },
      {
        id: 'create-care-task-hr-onboarding',
        name: 'Create TA review task',
        description: 'Recruiter validates tone, DEI language, and approves for Jira/HCM posting',
        icon: 'ClipboardCheck',
        color: '#059669',
        module: 'Talent Acquisition'
      },
      {
        id: 'send-slack',
        name: 'Post draft to Slack',
        description: 'Notify #recruiting with JD link and Jira ticket for approvals',
        icon: 'MessageSquare',
        color: '#4a154b',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'hr-flow-interview-debrief',
    name: 'Interview debrief',
    summary: 'Structured scorecard from panel notes and calendar context',
    category: 'Talent acquisition',
    module: 'Talent Acquisition',
    icons: ['Calendar', 'Sparkles', 'ClipboardList'],
    color: '#059669',
    vertical: 'hr',
    trigger: {
      id: 'interview-session-completed',
      name: 'When interview is completed',
      description: 'Calendar event ended; panel notes and recording transcript available',
      icon: 'Calendar',
      color: '#059669'
    },
    actions: [
      {
        id: 'invoke-hr-interview-debrief',
        name: 'Run Claude — scorecard draft',
        description: 'Merge calendar attendees, rubric, and notes into a structured scorecard',
        icon: 'Sparkles',
        color: spark,
        module: 'Talent Acquisition'
      },
      {
        id: 'create-care-task-hr-onboarding',
        name: 'Create hiring manager review task',
        description: 'Manager confirms ratings and adds final recommendation',
        icon: 'ClipboardCheck',
        color: '#059669',
        module: 'Talent Acquisition'
      },
      {
        id: 'send-teams',
        name: 'Send Teams update',
        description: 'Post scorecard summary link to hiring thread (Notion / ATS page)',
        icon: 'MessageCircle',
        color: '#5558af',
        module: null
      }
    ],
    isActive: false
  },
  {
    id: 'hr-flow-onboarding-plan',
    name: 'Onboarding plan',
    summary: '30-60-90 plan plus resource kit after offer acceptance',
    category: 'People ops',
    module: 'People Ops & Systems',
    icons: ['UserCheck', 'Sparkles', 'MessageSquare'],
    color: '#D97706',
    vertical: 'hr',
    trigger: {
      id: 'offer-accepted',
      name: 'When offer is accepted',
      description: 'Candidate signed offer; kick off manager prep and new hire resource kit',
      icon: 'UserCheck',
      color: '#059669'
    },
    actions: [
      {
        id: 'invoke-hr-onboarding-plan',
        name: 'Run Claude — 30-60-90 + kit',
        description: 'Role-specific plan, links to handbook, benefits, and IT setup checklist',
        icon: 'Sparkles',
        color: spark,
        module: 'People Ops'
      },
      {
        id: 'create-care-task-hr-onboarding',
        name: 'Assign manager onboarding tasks',
        description: 'Week-one goals, buddy intro, and compliance attestations',
        icon: 'ClipboardCheck',
        color: '#D97706',
        module: 'People Ops'
      },
      {
        id: 'send-slack',
        name: 'Notify Slack + Drive kit',
        description: 'Post welcome kit folder link to #onboarding and DM hiring manager',
        icon: 'MessageSquare',
        color: '#4a154b',
        module: null
      }
    ],
    isActive: false
  },
  {
    id: 'hr-flow-policy-qa',
    name: 'Policy QA bot',
    summary: 'Instant policy answer with source for employee questions',
    category: 'HRBP',
    module: 'HRBP & Employee Lifecycle',
    icons: ['MessageCircle', 'Sparkles', 'BookOpen'],
    color: '#7C3AED',
    vertical: 'hr',
    trigger: {
      id: 'employee-policy-question',
      name: 'When employee asks a policy question',
      description: 'Question submitted in HR portal, Teams, or email to HR inbox',
      icon: 'HelpCircle',
      color: '#7C3AED'
    },
    actions: [
      {
        id: 'invoke-hr-policy-qa',
        name: 'Run Claude — HR docs RAG',
        description: 'Retrieve policy snippets with citations; no legal advice—escalate edge cases',
        icon: 'Sparkles',
        color: spark,
        module: 'HRBP'
      },
      {
        id: 'send-email',
        name: 'Send answer email',
        description: 'Employee receives answer, source doc links, and effective dates',
        icon: 'Mail',
        color: '#7C3AED',
        module: null
      },
      {
        id: 'in-app-notification',
        name: 'Log interaction in HR portal',
        description: 'Audit trail for compliance; offer “still need help?” handoff to HRBP',
        icon: 'Bell',
        color: '#1B2B5E',
        module: null
      }
    ],
    isActive: false
  }
];

export function hrFeaturedToQuickTemplate(flow) {
  return {
    id: flow.id,
    category: flow.category,
    title: flow.name,
    description: flow.summary,
    icons: flow.icons,
    color: flow.color,
    trigger: flow.trigger,
    actions: flow.actions
  };
}

export function hrFeaturedToDiscoverTemplate(flow) {
  return {
    id: flow.id,
    category: flow.category,
    title: flow.name,
    description: `${flow.summary}. Tools: ${flowToolsLine(flow.id)}`,
    icons: flow.icons,
    color: flow.color,
    module: flow.module,
    trigger: flow.trigger,
    actions: flow.actions
  };
}

function flowToolsLine(id) {
  switch (id) {
    case 'hr-flow-jd-generator':
      return 'Claude + Jira/HCM';
    case 'hr-flow-interview-debrief':
      return 'Calendar + Claude + Notion';
    case 'hr-flow-onboarding-plan':
      return 'Claude + Drive + Slack';
    case 'hr-flow-policy-qa':
      return 'Claude + HR docs RAG';
    default:
      return 'Claude + integrations';
  }
}

export function hrFeaturedToProductAgent(flow) {
  return {
    id: flow.id,
    name: flow.name,
    description: `${flow.summary} Integrations: ${flowToolsLine(flow.id)}.`,
    trigger: flow.trigger,
    actions: flow.actions,
    isActive: flow.isActive
  };
}
