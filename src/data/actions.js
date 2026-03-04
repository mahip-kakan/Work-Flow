// Action configurations for Gravity AI Studio — Healthcare workflows
export const actionCategories = [
  {
    id: 'notifications',
    name: 'Notifications',
    icon: 'Bell',
    actions: [
      {
        id: 'send-slack',
        name: 'Send Slack message',
        description: 'Alert care team channels via Slack',
        icon: 'MessageSquare',
        color: '#4a154b',
        module: null
      },
      {
        id: 'send-teams',
        name: 'Send Teams message',
        description: 'Notify via Microsoft Teams',
        icon: 'MessageCircle',
        color: '#5558af',
        module: null
      },
      {
        id: 'send-email',
        name: 'Send email with report',
        description: 'Email clinical or operational report to users',
        icon: 'Mail',
        color: '#DC2626',
        module: null
      },
      {
        id: 'in-app-notification',
        name: 'Push in-app notification',
        description: 'Bell notification inside Gravity platform',
        icon: 'Bell',
        color: '#1B2B5E',
        module: null
      },
      {
        id: 'send-sms',
        name: 'Send SMS to care team',
        description: 'Text alert to care coordinator or provider',
        icon: 'Smartphone',
        color: '#059669',
        module: null
      }
    ]
  },
  {
    id: 'clinical-workflow',
    name: 'Clinical Workflow',
    icon: 'Heart',
    actions: [
      {
        id: 'create-care-task',
        name: 'Create care team task',
        description: 'Assign follow-up task to care coordinator or provider',
        icon: 'ClipboardCheck',
        color: '#DC2626',
        module: 'Clinical Care'
      },
      {
        id: 'update-care-plan',
        name: 'Update care plan',
        description: 'Modify patient care plan with new goals or interventions',
        icon: 'FileEdit',
        color: '#DC2626',
        module: 'Clinical Care'
      },
      {
        id: 'schedule-appointment',
        name: 'Schedule appointment',
        description: 'Book follow-up or preventive care visit via FHIR',
        icon: 'CalendarPlus',
        color: '#DC2626',
        module: 'Clinical Care'
      },
      {
        id: 'generate-clinical-summary',
        name: 'Generate clinical summary',
        description: 'Create AI-powered patient summary for care team',
        icon: 'FileText',
        color: '#DC2626',
        module: 'Clinical Care'
      }
    ]
  },
  {
    id: 'population-health',
    name: 'Population Health',
    icon: 'Users',
    actions: [
      {
        id: 'run-hedis-measure',
        name: 'Run HEDIS measure',
        description: 'Execute quality measure calculation for patient cohort',
        icon: 'BarChart2',
        color: '#7C3AED',
        module: 'Population Health'
      },
      {
        id: 'identify-care-gaps',
        name: 'Identify care gaps',
        description: 'Surface patients with open preventive care gaps',
        icon: 'ClipboardList',
        color: '#7C3AED',
        module: 'Population Health'
      },
      {
        id: 'generate-outreach-list',
        name: 'Generate outreach list',
        description: 'Build prioritized patient list for outreach campaign',
        icon: 'Users',
        color: '#7C3AED',
        module: 'Population Health'
      },
      {
        id: 'update-patient-risk-score',
        name: 'Update patient risk score',
        description: 'Recalculate risk scores using latest clinical data',
        icon: 'Activity',
        color: '#7C3AED',
        module: 'Population Health'
      }
    ]
  },
  {
    id: 'vbc-quality',
    name: 'VBC / Quality',
    icon: 'TrendingUp',
    actions: [
      {
        id: 'submit-quality-measure',
        name: 'Submit quality measure',
        description: 'Submit HEDIS or Star Rating measure to payer or registry',
        icon: 'Send',
        color: '#059669',
        module: 'Value-Based Care'
      },
      {
        id: 'calculate-aco-performance',
        name: 'Calculate ACO performance',
        description: 'Compute shared savings and quality scores for ACO',
        icon: 'TrendingUp',
        color: '#059669',
        module: 'Value-Based Care'
      },
      {
        id: 'generate-contract-report',
        name: 'Generate contract report',
        description: 'Export VBC contract performance summary',
        icon: 'FileSpreadsheet',
        color: '#059669',
        module: 'Value-Based Care'
      },
      {
        id: 'flag-hcc-coding-gap',
        name: 'Flag HCC coding gap',
        description: 'Identify undocumented hierarchical condition categories',
        icon: 'AlertCircle',
        color: '#059669',
        module: 'Value-Based Care'
      }
    ]
  },
  {
    id: 'rcm',
    name: 'RCM',
    icon: 'DollarSign',
    actions: [
      {
        id: 'flag-claim-review',
        name: 'Flag claim for review',
        description: 'Route claim to denial management queue',
        icon: 'Flag',
        color: '#0284C7',
        module: 'RCM'
      },
      {
        id: 'run-prior-auth-check',
        name: 'Run prior auth check',
        description: 'Verify prior authorization status via payer API',
        icon: 'ShieldCheck',
        color: '#0284C7',
        module: 'RCM'
      },
      {
        id: 'generate-denial-report',
        name: 'Generate denial report',
        description: 'Summarize claim denials by reason and payer',
        icon: 'FileX',
        color: '#0284C7',
        module: 'RCM'
      }
    ]
  },
  {
    id: 'data-operations',
    name: 'Data Operations',
    icon: 'Database',
    actions: [
      {
        id: 'refresh-fhir-data',
        name: 'Refresh FHIR data',
        description: 'Trigger FHIR data pull from connected EHR systems',
        icon: 'RefreshCw',
        color: '#64748b',
        module: null
      },
      {
        id: 'run-data-quality-check',
        name: 'Run data quality check',
        description: 'Validate completeness against 6000+ quality rules',
        icon: 'CheckSquare',
        color: '#64748b',
        module: null
      },
      {
        id: 'export-csv',
        name: 'Export to CSV / Excel',
        description: 'Generate downloadable clinical or operational report',
        icon: 'Download',
        color: '#64748b',
        module: null
      },
      {
        id: 'sync-ehr-data',
        name: 'Sync EHR data',
        description: 'Push computed values back to EHR via FHIR write',
        icon: 'Database',
        color: '#64748b',
        module: null
      }
    ]
  },
  {
    id: 'ai-agents',
    name: 'AI Agents',
    icon: 'Brain',
    actions: [
      {
        id: 'invoke-provider-copilot',
        name: 'Invoke Provider Copilot',
        description: 'Run Gravity Provider Copilot for clinical note assistance',
        icon: 'Stethoscope',
        color: '#7C3AED',
        module: 'AI Studio'
      },
      {
        id: 'invoke-care-gap-agent',
        name: 'Invoke Care Gap Agent',
        description: 'Run HMCP Care Gap Agent across patient cohort',
        icon: 'ClipboardList',
        color: '#7C3AED',
        module: 'AI Studio'
      },
      {
        id: 'run-risk-model',
        name: 'Run Risk Stratification Agent',
        description: 'Execute predictive risk model on patient population',
        icon: 'Activity',
        color: '#7C3AED',
        module: 'AI Studio'
      },
      {
        id: 'invoke-patient-outreach-agent',
        name: 'Invoke Patient Outreach Agent',
        description: 'Run HMCP Outreach Agent to personalize patient communications',
        icon: 'PhoneCall',
        color: '#7C3AED',
        module: 'AI Studio'
      },
      {
        id: 'invoke-scheduling-agent',
        name: 'Invoke Scheduling Agent',
        description: 'Run Gravity Scheduling Agent to optimize appointment booking',
        icon: 'CalendarCheck',
        color: '#7C3AED',
        module: 'AI Studio'
      }
    ]
  }
];

export const getAllActions = () => {
  return actionCategories.flatMap(category => category.actions);
};
