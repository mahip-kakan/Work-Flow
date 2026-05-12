// SaaS connector catalog — mirrors the CloudEagle "Connect Apps" screenshot
export const saasConnectors = [
  // Productivity
  {
    id: 'gmail',
    name: 'Gmail',
    category: 'Productivity',
    logoColor: '#EA4335',
    logoLetter: 'M',
    status: 'available',
    description: 'Read, send, and label emails — sync user accounts and activity data'
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    category: 'Productivity',
    logoColor: '#4285F4',
    logoLetter: '31',
    status: 'available',
    description: 'Access calendar events and user activity for usage analysis'
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    category: 'Productivity',
    logoColor: '#0F9D58',
    logoLetter: '▲',
    status: 'available',
    description: 'List files, permissions, and storage usage per user'
  },
  {
    id: 'google-docs',
    name: 'Google Docs',
    category: 'Productivity',
    logoColor: '#4285F4',
    logoLetter: 'D',
    status: 'available',
    description: 'Read and write documents — export reports and runbooks'
  },
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    category: 'Productivity',
    logoColor: '#0F9D58',
    logoLetter: 'S',
    status: 'available',
    description: 'Export license reports, spend data, and audit logs to spreadsheets'
  },
  {
    id: 'outlook',
    name: 'Outlook',
    category: 'Productivity',
    logoColor: '#0078D4',
    logoLetter: 'O',
    status: 'available',
    description: 'Microsoft 365 email and calendar — user activity and licensing data'
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'Productivity',
    logoColor: '#000000',
    logoLetter: 'N',
    status: 'available',
    description: 'Read and update pages — log incident runbooks and access reviews'
  },

  // Communication
  {
    id: 'slack',
    name: 'Slack',
    category: 'Communication',
    logoColor: '#4A154B',
    logoLetter: 'S',
    status: 'available',
    description: 'Send alerts, sync workspace users, and retrieve activity metrics'
  },
  {
    id: 'slackbot',
    name: 'Slackbot',
    category: 'Communication',
    logoColor: '#36C5F0',
    logoLetter: 'B',
    status: 'available',
    description: 'Build interactive bot workflows for IT approvals and notifications'
  },

  // Dev & Engineering
  {
    id: 'github',
    name: 'GitHub',
    category: 'Dev & Engineering',
    logoColor: '#24292E',
    logoLetter: 'GH',
    status: 'available',
    description: 'Sync org members, repos, and last-active dates for access management'
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'Dev & Engineering',
    logoColor: '#3ECF8E',
    logoLetter: 'SB',
    status: 'available',
    description: 'Log integration events and audit data to a Supabase Postgres database'
  },
  {
    id: 'linear',
    name: 'Linear',
    category: 'Dev & Engineering',
    logoColor: '#5E6AD2',
    logoLetter: 'L',
    status: 'available',
    description: 'Create and update engineering issues from IT automation workflows'
  },
  {
    id: 'jira',
    name: 'Jira',
    category: 'Dev & Engineering',
    logoColor: '#0052CC',
    logoLetter: 'J',
    status: 'available',
    description: 'Create tickets, update statuses, and route incidents and change requests'
  },
  {
    id: 'airtable',
    name: 'Airtable',
    category: 'Dev & Engineering',
    logoColor: '#F82B60',
    logoLetter: 'AT',
    status: 'available',
    description: 'Log structured records for runbooks, PIRs, and access audit trails'
  },

  // AI & Tools
  {
    id: 'composio',
    name: 'Composio',
    category: 'AI & Tools',
    logoColor: '#6366F1',
    logoLetter: 'C',
    status: 'connected',
    description: 'AI tool-use platform — pre-built actions for 200+ SaaS apps'
  },
  {
    id: 'code-interpreter',
    name: 'Code Interpreter',
    category: 'AI & Tools',
    logoColor: '#6366F1',
    logoLetter: '{ }',
    status: 'connected',
    description: 'Run generated connector code in a sandboxed environment and stream results'
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    category: 'AI & Tools',
    logoColor: '#20808D',
    logoLetter: 'P',
    status: 'available',
    description: 'Search and summarize API documentation for connector generation'
  },
  {
    id: 'firecrawl',
    name: 'Firecrawl',
    category: 'AI & Tools',
    logoColor: '#FF6B35',
    logoLetter: 'F',
    status: 'available',
    description: 'Crawl and extract structured content from API documentation pages'
  },
  {
    id: 'tavily',
    name: 'Tavily',
    category: 'AI & Tools',
    logoColor: '#0EA5E9',
    logoLetter: 'T',
    status: 'available',
    description: 'AI-powered search API for discovering and summarizing API documentation'
  },
  {
    id: 'serpapi',
    name: 'SerpApi',
    category: 'AI & Tools',
    logoColor: '#4F46E5',
    logoLetter: 'SA',
    status: 'available',
    description: 'Search engine results API — discover SaaS app API docs and developer resources'
  },

  // CRM & Marketing
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'CRM & Marketing',
    logoColor: '#FF7A59',
    logoLetter: 'HS',
    status: 'available',
    description: 'Import contacts and companies — map CRM data to SaaS user profiles'
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    category: 'CRM & Marketing',
    logoColor: '#000000',
    logoLetter: 'X',
    status: 'available',
    description: 'Monitor mentions and manage social media accounts'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    category: 'CRM & Marketing',
    logoColor: '#FF0000',
    logoLetter: 'YT',
    status: 'available',
    description: 'Access channel data and video analytics'
  },

  // Scheduling
  {
    id: 'calendly',
    name: 'Calendly',
    category: 'Scheduling',
    logoColor: '#006BFF',
    logoLetter: 'CA',
    status: 'available',
    description: 'Pull users, event types, and booking data — the AI connector generation demo app'
  },

  // Canvas
  {
    id: 'canvas',
    name: 'Canvas',
    category: 'Design & Docs',
    logoColor: '#E66000',
    logoLetter: 'CV',
    status: 'available',
    description: 'Learning management system — sync user enrollments and course activity'
  }
];

export const connectorCategories = [
  'All',
  'Productivity',
  'Communication',
  'Dev & Engineering',
  'AI & Tools',
  'CRM & Marketing',
  'Scheduling',
  'Design & Docs'
];
