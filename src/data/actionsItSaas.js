// IT/SaaS-oriented action catalog
export const itSaasActionCategories = [
  {
    id: 'integration-builder',
    name: 'Integration Builder',
    icon: 'Zap',
    actions: [
      {
        id: 'ai-generate-connector',
        name: 'AI: Generate connector code',
        description: 'Parse API documentation URL and generate API client, auth, pagination, error handling, and logging code',
        icon: 'Code',
        color: '#7C3AED',
        module: 'Integration Builder'
      },
      {
        id: 'run-sandbox-test',
        name: 'Run sandbox test',
        description: 'Execute generated connector code in isolated sandbox and stream test results',
        icon: 'FlaskConical',
        color: '#0284C7',
        module: 'Integration Builder'
      },
      {
        id: 'promote-to-production',
        name: 'Promote connector to production',
        description: 'Deploy validated connector to production and schedule sync frequency',
        icon: 'Rocket',
        color: '#059669',
        module: 'Integration Builder'
      },
      {
        id: 'map-api-fields',
        name: 'Map API fields to schema',
        description: 'AI suggests field mappings between source API response and CloudEagle user/usage schema',
        icon: 'GitMerge',
        color: '#7C3AED',
        module: 'Integration Builder'
      }
    ]
  },
  {
    id: 'notifications',
    name: 'Notifications',
    icon: 'Bell',
    actions: [
      {
        id: 'send-slack-it',
        name: 'Send Slack message',
        description: 'Post alert or report to a Slack channel or DM',
        icon: 'MessageSquare',
        color: '#4a154b',
        module: null
      },
      {
        id: 'send-email-it',
        name: 'Send email',
        description: 'Send automated email via Gmail or Outlook to IT admin, manager, or end user',
        icon: 'Mail',
        color: '#DC2626',
        module: null
      },
      {
        id: 'send-teams-it',
        name: 'Send Teams message',
        description: 'Notify IT channel or on-call team in Microsoft Teams',
        icon: 'MessageCircle',
        color: '#5558af',
        module: null
      },
      {
        id: 'in-app-notification-it',
        name: 'Push in-app notification',
        description: 'Alert IT admin inside the platform dashboard',
        icon: 'Bell',
        color: '#1B2B5E',
        module: null
      }
    ]
  },
  {
    id: 'ticketing',
    name: 'Ticketing & ITSM',
    icon: 'Ticket',
    actions: [
      {
        id: 'create-jira-ticket',
        name: 'Create Jira ticket',
        description: 'Open a new Jira issue with pre-filled summary, description, priority, and assignee',
        icon: 'Ticket',
        color: '#0052CC',
        module: 'ITSM Automation'
      },
      {
        id: 'update-jira-ticket',
        name: 'Update Jira ticket status',
        description: 'Transition a Jira issue to In Progress, Resolved, or Closed',
        icon: 'RefreshCw',
        color: '#0052CC',
        module: 'ITSM Automation'
      },
      {
        id: 'create-airtable-record',
        name: 'Create Airtable record',
        description: 'Log incident, change request, or audit entry to an Airtable base',
        icon: 'Table',
        color: '#F82B60',
        module: 'ITSM Automation'
      },
      {
        id: 'create-linear-issue',
        name: 'Create Linear issue',
        description: 'Open a Linear issue for engineering escalation with full context',
        icon: 'Circle',
        color: '#5E6AD2',
        module: 'ITSM Automation'
      }
    ]
  },
  {
    id: 'access-management',
    name: 'Access & Provisioning',
    icon: 'Shield',
    actions: [
      {
        id: 'deprovision-user',
        name: 'Deprovision user across apps',
        description: 'Remove user from Slack, GitHub, Notion, Google Workspace, and other connected apps',
        icon: 'UserX',
        color: '#DC2626',
        module: 'Access & Compliance'
      },
      {
        id: 'provision-user',
        name: 'Provision user by role template',
        description: 'Grant SaaS app access based on department/role template (e.g. Engineering, Marketing)',
        icon: 'UserCheck',
        color: '#059669',
        module: 'Access & Compliance'
      },
      {
        id: 'revoke-license',
        name: 'Reclaim unused license',
        description: 'Downgrade or remove license for inactive user and log the reclamation',
        icon: 'MinusCircle',
        color: '#D97706',
        module: 'Cost Governance'
      },
      {
        id: 'update-okta-group',
        name: 'Update Okta group membership',
        description: 'Add or remove user from Okta group to propagate SCIM-based access changes',
        icon: 'Lock',
        color: '#007DC1',
        module: 'Access & Compliance'
      }
    ]
  },
  {
    id: 'data-reporting',
    name: 'Data & Reporting',
    icon: 'BarChart2',
    actions: [
      {
        id: 'export-to-sheets',
        name: 'Export report to Google Sheets',
        description: 'Write license usage, spend, or audit data to a Google Sheet for stakeholder review',
        icon: 'Table',
        color: '#0F9D58',
        module: 'Cost Governance'
      },
      {
        id: 'update-notion-doc',
        name: 'Update Notion document',
        description: 'Append runbook entry, audit log, or incident summary to a Notion page',
        icon: 'FileText',
        color: '#000000',
        module: null
      },
      {
        id: 'log-to-supabase',
        name: 'Log event to Supabase',
        description: 'Write structured event data to a Supabase table for analytics and audit trail',
        icon: 'Database',
        color: '#3ECF8E',
        module: null
      },
      {
        id: 'create-github-issue',
        name: 'Create GitHub issue',
        description: 'Open a GitHub issue for engineering follow-up on integration failures or access anomalies',
        icon: 'GitPullRequest',
        color: '#24292E',
        module: null
      }
    ]
  }
];
