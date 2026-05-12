// Product-flow templates for IT/SaaS pillars (same agent shape as hrProductFlows.js)

const integrationBuilderAgents = [
  {
    id: 'it-int-1',
    name: 'AI-generate Calendly connector',
    description: 'Point AI at the Calendly API docs — auto-generate API client, auth, user sync, usage data, pagination, error handling, and logging',
    trigger: {
      id: 'it-api-doc-submitted',
      name: 'When API doc URL is submitted',
      description: 'User pastes Calendly API documentation URL',
      icon: 'Link',
      color: '#7C3AED'
    },
    actions: [
      {
        id: 'ai-generate-connector',
        name: 'AI: Generate connector code',
        description: 'Parse API docs and generate full connector with auth, pagination, error handling',
        icon: 'Code',
        color: '#7C3AED',
        module: 'Integration Builder'
      },
      {
        id: 'run-sandbox-test',
        name: 'Run sandbox test',
        description: 'Execute connector in isolated sandbox and stream pass/fail results',
        icon: 'FlaskConical',
        color: '#0284C7',
        module: 'Integration Builder'
      },
      {
        id: 'promote-to-production',
        name: 'Promote connector to production',
        description: 'Deploy validated connector and schedule daily sync',
        icon: 'Rocket',
        color: '#059669',
        module: 'Integration Builder'
      }
    ],
    isActive: true
  },
  {
    id: 'it-int-2',
    name: 'Auto-map Jira API fields',
    description: 'AI reads Jira REST API docs and suggests field mappings to the platform user/license schema — with confidence scores for each mapping',
    trigger: {
      id: 'it-api-doc-submitted',
      name: 'When API doc URL is submitted',
      description: 'User submits Jira API documentation URL',
      icon: 'Link',
      color: '#0052CC'
    },
    actions: [
      {
        id: 'map-api-fields',
        name: 'Map API fields to schema',
        description: 'AI suggests field mappings with confidence scores',
        icon: 'GitMerge',
        color: '#7C3AED',
        module: 'Integration Builder'
      },
      {
        id: 'run-sandbox-test',
        name: 'Run sandbox test',
        description: 'Validate mapped fields with live Jira API in sandbox',
        icon: 'FlaskConical',
        color: '#0284C7',
        module: 'Integration Builder'
      },
      {
        id: 'send-slack-it',
        name: 'Notify team on Slack',
        description: 'Post connector-ready message to #it-integrations channel',
        icon: 'MessageSquare',
        color: '#4a154b',
        module: null
      }
    ],
    isActive: false
  },
  {
    id: 'it-int-3',
    name: 'Webhook listener from Slack',
    description: 'Generate a Slack Events API listener — auto-create connector for user_change and team_join events to keep the platform user list in sync',
    trigger: {
      id: 'it-new-user-saas',
      name: 'When new user is added to SaaS app',
      description: 'Slack team_join event received via webhook',
      icon: 'UserPlus',
      color: '#4a154b'
    },
    actions: [
      {
        id: 'ai-generate-connector',
        name: 'AI: Generate Slack connector',
        description: 'Generate Slack Events API client with OAuth, webhook verification, and user sync',
        icon: 'Code',
        color: '#7C3AED',
        module: 'Integration Builder'
      },
      {
        id: 'provision-user',
        name: 'Provision user by role template',
        description: 'Grant app access based on Slack team membership',
        icon: 'UserCheck',
        color: '#059669',
        module: 'Access & Compliance'
      }
    ],
    isActive: false
  },
  {
    id: 'it-int-4',
    name: 'GitHub org member sync',
    description: 'Connect to GitHub API and sync all org members, their repos, and last-active dates to the platform for license and access management',
    trigger: {
      id: 'it-on-schedule',
      name: 'On a schedule',
      description: 'Run daily at 02:00 UTC',
      icon: 'Clock',
      color: '#0284C7'
    },
    actions: [
      {
        id: 'ai-generate-connector',
        name: 'AI: Generate GitHub connector',
        description: 'Generate GitHub REST API client with PAT auth, org member pagination, and last-active detection',
        icon: 'Code',
        color: '#7C3AED',
        module: 'Integration Builder'
      },
      {
        id: 'export-to-sheets',
        name: 'Export report to Google Sheets',
        description: 'Write member list with last-active dates to a Google Sheet for IT review',
        icon: 'Table',
        color: '#0F9D58',
        module: 'Cost Governance'
      }
    ],
    isActive: false
  },
  {
    id: 'it-int-5',
    name: 'HubSpot contact import',
    description: 'Pull HubSpot contacts and companies via API — map them as SaaS users and enrich with deal stage and owner data',
    trigger: {
      id: 'it-on-schedule',
      name: 'On a schedule',
      description: 'Run weekly on Monday',
      icon: 'Clock',
      color: '#D97706'
    },
    actions: [
      {
        id: 'ai-generate-connector',
        name: 'AI: Generate HubSpot connector',
        description: 'Generate HubSpot CRM API client with OAuth, contact pagination, and field mapping',
        icon: 'Code',
        color: '#7C3AED',
        module: 'Integration Builder'
      },
      {
        id: 'map-api-fields',
        name: 'Map API fields to schema',
        description: 'AI maps HubSpot contact fields to the platform user schema',
        icon: 'GitMerge',
        color: '#7C3AED',
        module: 'Integration Builder'
      },
      {
        id: 'send-slack-it',
        name: 'Notify on Slack',
        description: 'Post sync summary (contacts imported, errors) to #it-integrations',
        icon: 'MessageSquare',
        color: '#4a154b',
        module: null
      }
    ],
    isActive: false
  }
];

const accessComplianceAgents = [
  {
    id: 'it-acc-1',
    name: 'Cross-app offboarding — Slack, Notion, GitHub',
    description: 'When an employee is terminated in HRIS, automatically revoke access across Slack, Notion, GitHub, and Google Workspace in a single workflow',
    trigger: {
      id: 'it-employee-offboarded',
      name: 'When employee is offboarded',
      description: 'HR system signals employee termination',
      icon: 'LogOut',
      color: '#DC2626'
    },
    actions: [
      {
        id: 'deprovision-user',
        name: 'Deprovision user across apps',
        description: 'Remove from Slack, GitHub, Notion, Google Workspace',
        icon: 'UserX',
        color: '#DC2626',
        module: 'Access & Compliance'
      },
      {
        id: 'update-okta-group',
        name: 'Update Okta group membership',
        description: 'Remove from all Okta groups to propagate downstream SCIM deprovisioning',
        icon: 'Lock',
        color: '#007DC1',
        module: 'Access & Compliance'
      },
      {
        id: 'send-slack-it',
        name: 'Notify IT team on Slack',
        description: 'Confirm offboarding completion in #it-ops channel',
        icon: 'MessageSquare',
        color: '#4a154b',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'it-acc-2',
    name: 'Quarterly access review — all SaaS apps',
    description: 'Every quarter, enumerate all active users across connected SaaS apps, flag anomalies, and route each app owner a review task',
    trigger: {
      id: 'it-quarterly-review',
      name: 'Quarterly access review',
      description: 'Scheduled quarterly trigger',
      icon: 'CalendarCheck',
      color: '#0284C7'
    },
    actions: [
      {
        id: 'export-to-sheets',
        name: 'Export access list to Google Sheets',
        description: 'Write all active users per SaaS app with last-active date',
        icon: 'Table',
        color: '#0F9D58',
        module: 'Cost Governance'
      },
      {
        id: 'create-jira-ticket',
        name: 'Create Jira review task per app',
        description: 'Open one Jira ticket per app owner for access certification',
        icon: 'Ticket',
        color: '#0052CC',
        module: 'ITSM Automation'
      },
      {
        id: 'send-email-it',
        name: 'Email app owners',
        description: 'Send each app owner a review link and deadline',
        icon: 'Mail',
        color: '#DC2626',
        module: null
      }
    ],
    isActive: false
  },
  {
    id: 'it-acc-3',
    name: 'SCIM sync to Okta',
    description: 'Keep Okta user directory in sync with HRIS — push lifecycle changes (new hire, transfer, termination) via SCIM protocol in real time',
    trigger: {
      id: 'it-role-change',
      name: 'When employee role changes',
      description: 'Promotion or transfer recorded in HRIS',
      icon: 'Shuffle',
      color: '#7C3AED'
    },
    actions: [
      {
        id: 'update-okta-group',
        name: 'Update Okta group membership',
        description: 'Add to new role group, remove from old role group via SCIM PATCH',
        icon: 'Lock',
        color: '#007DC1',
        module: 'Access & Compliance'
      },
      {
        id: 'provision-user',
        name: 'Provision new app access',
        description: 'Grant apps required for new role based on role template',
        icon: 'UserCheck',
        color: '#059669',
        module: 'Access & Compliance'
      }
    ],
    isActive: false
  },
  {
    id: 'it-acc-4',
    name: 'Google Workspace license audit',
    description: 'Weekly scan of Google Workspace users — flag accounts with no login in 60+ days and route to IT for license reclamation',
    trigger: {
      id: 'it-on-schedule',
      name: 'On a schedule',
      description: 'Run weekly on Sunday at 01:00 UTC',
      icon: 'Clock',
      color: '#0284C7'
    },
    actions: [
      {
        id: 'export-to-sheets',
        name: 'Export inactive users to Google Sheets',
        description: 'Write users with >60 day inactivity to audit sheet',
        icon: 'Table',
        color: '#0F9D58',
        module: 'Cost Governance'
      },
      {
        id: 'send-email-it',
        name: 'Email IT admin',
        description: 'Send weekly summary with count of inactive accounts and reclamation candidates',
        icon: 'Mail',
        color: '#DC2626',
        module: null
      }
    ],
    isActive: false
  }
];

const itsmAutomationAgents = [
  {
    id: 'it-itsm-1',
    name: 'P1 alert → Jira ticket + Slack page',
    description: 'When a P1 monitoring alert fires, auto-create a Jira incident ticket, post to the on-call Slack channel, and start an MTTR timer',
    trigger: {
      id: 'it-p1-alert',
      name: 'When P1 alert fires',
      description: 'Critical incident detected in monitoring system',
      icon: 'AlertTriangle',
      color: '#DC2626'
    },
    actions: [
      {
        id: 'create-jira-ticket',
        name: 'Create Jira incident ticket',
        description: 'Open P1 issue with auto-filled summary, severity, and on-call assignee',
        icon: 'Ticket',
        color: '#0052CC',
        module: 'ITSM Automation'
      },
      {
        id: 'send-slack-it',
        name: 'Page on-call team on Slack',
        description: 'Post @oncall alert to #incidents with Jira link and severity',
        icon: 'MessageSquare',
        color: '#4a154b',
        module: null
      },
      {
        id: 'send-teams-it',
        name: 'Notify IT leadership on Teams',
        description: 'Escalate to IT leadership channel with incident summary',
        icon: 'MessageCircle',
        color: '#5558af',
        module: null
      }
    ],
    isActive: true
  },
  {
    id: 'it-itsm-2',
    name: 'Change request approval routing',
    description: 'When a CAB change request is submitted, route to the correct approver based on risk level, collect approval, and schedule the change window',
    trigger: {
      id: 'it-change-request',
      name: 'When change request is submitted',
      description: 'Change Advisory Board request created',
      icon: 'GitPullRequest',
      color: '#D97706'
    },
    actions: [
      {
        id: 'create-jira-ticket',
        name: 'Create Jira change ticket',
        description: 'Open change request with risk classification and approver routing',
        icon: 'Ticket',
        color: '#0052CC',
        module: 'ITSM Automation'
      },
      {
        id: 'send-email-it',
        name: 'Email approver',
        description: 'Send approval request with change summary and one-click approve/reject link',
        icon: 'Mail',
        color: '#DC2626',
        module: null
      }
    ],
    isActive: false
  },
  {
    id: 'it-itsm-3',
    name: 'IT ticket triage and routing',
    description: 'Incoming IT helpdesk tickets are auto-classified by AI (hardware, software, access, billing) and routed to the right queue with SLA tags',
    trigger: {
      id: 'it-ticket-opened',
      name: 'When IT ticket is opened',
      description: 'New ticket created in Jira Service Management',
      icon: 'Ticket',
      color: '#0284C7'
    },
    actions: [
      {
        id: 'update-jira-ticket',
        name: 'Update ticket with AI classification',
        description: 'Set ticket type, priority, SLA tier, and assignee based on AI triage',
        icon: 'RefreshCw',
        color: '#0052CC',
        module: 'ITSM Automation'
      },
      {
        id: 'send-slack-it',
        name: 'Notify assigned queue',
        description: 'Post to the relevant IT sub-team Slack channel with ticket context',
        icon: 'MessageSquare',
        color: '#4a154b',
        module: null
      }
    ],
    isActive: false
  },
  {
    id: 'it-itsm-4',
    name: 'Airtable incident runbook trigger',
    description: 'When an incident is resolved, log RCA details to an Airtable base and trigger the post-incident review task for the on-call engineer',
    trigger: {
      id: 'it-sandbox-passed',
      name: 'When incident is resolved',
      description: 'Jira incident ticket moved to Resolved status',
      icon: 'CheckCircle',
      color: '#059669'
    },
    actions: [
      {
        id: 'create-airtable-record',
        name: 'Log RCA to Airtable',
        description: 'Create post-incident record with timeline, root cause, and action items',
        icon: 'Table',
        color: '#F82B60',
        module: 'ITSM Automation'
      },
      {
        id: 'send-email-it',
        name: 'Email PIR summary',
        description: 'Send post-incident review summary to stakeholders and leadership',
        icon: 'Mail',
        color: '#DC2626',
        module: null
      }
    ],
    isActive: false
  }
];

const costGovernanceAgents = [
  {
    id: 'it-cost-1',
    name: 'Unused license reclamation',
    description: 'Identify users inactive for 30+ days across all connected SaaS apps and automatically downgrade or remove their licenses to cut spend',
    trigger: {
      id: 'it-user-inactive',
      name: 'When user is inactive for 30+ days',
      description: 'User has not logged into a connected app for 30+ days',
      icon: 'UserX',
      color: '#D97706'
    },
    actions: [
      {
        id: 'revoke-license',
        name: 'Reclaim unused license',
        description: 'Downgrade seat to free tier or remove license and log the savings',
        icon: 'MinusCircle',
        color: '#D97706',
        module: 'Cost Governance'
      },
      {
        id: 'send-email-it',
        name: 'Notify user before reclamation',
        description: 'Send 7-day warning email before license is removed',
        icon: 'Mail',
        color: '#DC2626',
        module: null
      },
      {
        id: 'export-to-sheets',
        name: 'Log savings to Google Sheets',
        description: 'Record each reclaimed license with app, user, and estimated annual saving',
        icon: 'Table',
        color: '#0F9D58',
        module: 'Cost Governance'
      }
    ],
    isActive: true
  },
  {
    id: 'it-cost-2',
    name: 'SaaS spend threshold alert',
    description: 'When monthly SaaS spend exceeds a configured budget threshold, alert IT and Finance with a breakdown by app and department',
    trigger: {
      id: 'it-spend-threshold',
      name: 'When spend threshold is exceeded',
      description: 'Monthly SaaS spend exceeds budget',
      icon: 'DollarSign',
      color: '#DC2626'
    },
    actions: [
      {
        id: 'export-to-sheets',
        name: 'Export spend breakdown to Sheets',
        description: 'Write spend by app and department to a Google Sheet for Finance review',
        icon: 'Table',
        color: '#0F9D58',
        module: 'Cost Governance'
      },
      {
        id: 'send-slack-it',
        name: 'Alert Finance and IT on Slack',
        description: 'Post overage alert to #it-finance with top 5 overspending apps',
        icon: 'MessageSquare',
        color: '#4a154b',
        module: null
      }
    ],
    isActive: false
  },
  {
    id: 'it-cost-3',
    name: 'Renewal calendar trigger',
    description: 'At T-90, T-30, and T-7 days before each SaaS contract renewal, notify IT and the business owner with usage data to inform renewal decisions',
    trigger: {
      id: 'it-renewal-approaching',
      name: 'When renewal date approaches',
      description: 'T-90, T-30, T-7 before contract renewal',
      icon: 'Calendar',
      color: '#0284C7'
    },
    actions: [
      {
        id: 'create-jira-ticket',
        name: 'Create renewal review ticket',
        description: 'Open Jira task assigned to IT procurement with contract details and usage summary',
        icon: 'Ticket',
        color: '#0052CC',
        module: 'ITSM Automation'
      },
      {
        id: 'send-email-it',
        name: 'Email business owner',
        description: 'Send renewal briefing with license utilization, cost per seat, and alternatives',
        icon: 'Mail',
        color: '#DC2626',
        module: null
      }
    ],
    isActive: false
  },
  {
    id: 'it-cost-4',
    name: 'Duplicate SaaS app detection',
    description: 'AI scans connected apps for functional overlap (e.g. two project management tools, two video conferencing apps) and flags redundancies for consolidation',
    trigger: {
      id: 'it-duplicate-app-detected',
      name: 'When duplicate app is detected',
      description: 'Two apps with overlapping functionality found in the org',
      icon: 'Copy',
      color: '#7C3AED'
    },
    actions: [
      {
        id: 'update-notion-doc',
        name: 'Update SaaS rationalization doc in Notion',
        description: 'Add duplicate pair to the SaaS consolidation Notion page with usage and cost data',
        icon: 'FileText',
        color: '#000000',
        module: null
      },
      {
        id: 'send-slack-it',
        name: 'Notify IT procurement on Slack',
        description: 'Alert #it-procurement with duplicate pair, overlap summary, and potential savings',
        icon: 'MessageSquare',
        color: '#4a154b',
        module: null
      }
    ],
    isActive: false
  }
];

export const itSaasModuleConfigs = {
  'Integration Builder': {
    icon: 'Zap',
    color: '#7C3AED',
    description: 'Use AI to generate production-ready connectors for any SaaS app from its API documentation — no engineers required',
    agents: integrationBuilderAgents
  },
  'Access & Compliance': {
    icon: 'Shield',
    color: '#0284C7',
    description: 'Automate user provisioning, deprovisioning, and access reviews across all connected SaaS apps',
    agents: accessComplianceAgents
  },
  'ITSM Automation': {
    icon: 'Wrench',
    color: '#D97706',
    description: 'Automate incident response, change management, ticket routing, and post-incident reviews',
    agents: itsmAutomationAgents
  },
  'Cost Governance': {
    icon: 'DollarSign',
    color: '#059669',
    description: 'Reclaim unused licenses, track spend against budget, manage renewals, and eliminate duplicate SaaS tools',
    agents: costGovernanceAgents
  }
};

export const IT_SAAS_PILLAR_DEFAULT = 'Integration Builder';
