// Action configurations for Impact Flow Studio
export const actionCategories = [
  {
    id: 'notifications',
    name: 'Notifications',
    icon: 'Bell',
    actions: [
      {
        id: 'send-slack',
        name: 'Send Slack message',
        description: 'Alert team channels via Slack',
        icon: 'MessageSquare',
        color: '#4a154b',
        product: null
      },
      {
        id: 'send-teams',
        name: 'Send Teams message',
        description: 'Notify via Microsoft Teams',
        icon: 'MessageCircle',
        color: '#5558af',
        product: null
      },
      {
        id: 'send-email',
        name: 'Send email with report',
        description: 'Email PDF/Excel reports to users',
        icon: 'Mail',
        color: '#ea4335',
        product: null
      },
      {
        id: 'send-gchat',
        name: 'Send Google Chat notification',
        description: 'Notify in Google Workspace',
        icon: 'MessageSquare',
        color: '#34a853',
        product: null
      },
      {
        id: 'in-app-notification',
        name: 'Push in-app notification',
        description: 'Bell icon notification in Impact Suite',
        icon: 'Bell',
        color: '#4285f4',
        product: null
      }
    ]
  },
  {
    id: 'inventory-smart',
    name: 'InventorySmart',
    icon: 'Package',
    actions: [
      {
        id: 'run-allocation',
        name: 'Run allocation',
        description: 'Execute InventorySmart allocation',
        icon: 'GitBranch',
        color: '#2563eb',
        product: 'InventorySmart'
      },
      {
        id: 'generate-order',
        name: 'Generate order recommendation',
        description: 'Create OMS ordering suggestions',
        icon: 'ShoppingCart',
        color: '#2563eb',
        product: 'InventorySmart'
      },
      {
        id: 'dc-transfer',
        name: 'Create DC transfer recommendation',
        description: 'Suggest DC-to-DC transfers',
        icon: 'Truck',
        color: '#2563eb',
        product: 'InventorySmart'
      },
      {
        id: 'update-safety-stock',
        name: 'Update safety stock levels',
        description: 'Recalculate and update safety stock',
        icon: 'Shield',
        color: '#2563eb',
        product: 'InventorySmart'
      }
    ]
  },
  {
    id: 'plan-smart',
    name: 'PlanSmart',
    icon: 'BarChart3',
    actions: [
      {
        id: 'refresh-plan',
        name: 'Refresh plan data',
        description: 'Update PlanSmart with latest actuals',
        icon: 'RefreshCw',
        color: '#16a34a',
        product: 'PlanSmart'
      },
      {
        id: 'create-plan-version',
        name: 'Create plan version',
        description: 'Snapshot current plan as new version',
        icon: 'Copy',
        color: '#16a34a',
        product: 'PlanSmart'
      },
      {
        id: 'sync-to-itemsmart',
        name: 'Sync plan to ItemSmart',
        description: 'Push approved plan downstream',
        icon: 'ArrowRight',
        color: '#16a34a',
        product: 'PlanSmart'
      },
      {
        id: 'generate-variance-report',
        name: 'Generate variance report',
        description: 'Create plan vs actual comparison',
        icon: 'FileSpreadsheet',
        color: '#16a34a',
        product: 'PlanSmart'
      }
    ]
  },
  {
    id: 'assort-smart',
    name: 'AssortSmart',
    icon: 'Grid3X3',
    actions: [
      {
        id: 'refresh-strategy',
        name: 'Refresh strategy plan',
        description: 'Update AssortSmart strategy data',
        icon: 'RefreshCw',
        color: '#9333ea',
        product: 'AssortSmart'
      },
      {
        id: 'sync-mfp',
        name: 'Sync from MFP',
        description: 'Pull targets from PlanSmart',
        icon: 'Download',
        color: '#9333ea',
        product: 'AssortSmart'
      },
      {
        id: 'run-size-optimization',
        name: 'Run size optimization',
        description: 'Execute size curve optimization',
        icon: 'Maximize',
        color: '#9333ea',
        product: 'AssortSmart'
      },
      {
        id: 'generate-line-plan',
        name: 'Generate line plan report',
        description: 'Export line plan summary',
        icon: 'FileText',
        color: '#9333ea',
        product: 'AssortSmart'
      }
    ]
  },
  {
    id: 'monday-smart',
    name: 'MondaySmart',
    icon: 'BarChart2',
    actions: [
      {
        id: 'refresh-insights',
        name: 'Refresh insights',
        description: 'Update AI-generated insights',
        icon: 'Sparkles',
        color: '#f59e0b',
        product: 'MondaySmart'
      },
      {
        id: 'generate-summary',
        name: 'Generate business summary',
        description: 'Create daily business overview',
        icon: 'FileText',
        color: '#f59e0b',
        product: 'MondaySmart'
      },
      {
        id: 'run-anomaly-detection',
        name: 'Run anomaly detection',
        description: 'Identify unusual patterns in data',
        icon: 'Search',
        color: '#f59e0b',
        product: 'MondaySmart'
      }
    ]
  },
  {
    id: 'item-smart',
    name: 'ItemSmart',
    icon: 'Layers',
    actions: [
      {
        id: 'refresh-forecast',
        name: 'Refresh forecast',
        description: 'Update ItemSmart demand forecast',
        icon: 'TrendingUp',
        color: '#0891b2',
        product: 'ItemSmart'
      },
      {
        id: 'run-simulation',
        name: 'Run simulation pipeline',
        description: 'Execute Vertex AI forecast simulation',
        icon: 'Play',
        color: '#0891b2',
        product: 'ItemSmart'
      },
      {
        id: 'generate-item-report',
        name: 'Generate item planning report',
        description: 'Export SKU-level planning data',
        icon: 'FileSpreadsheet',
        color: '#0891b2',
        product: 'ItemSmart'
      }
    ]
  },
  {
    id: 'data-operations',
    name: 'Data Operations',
    icon: 'Database',
    actions: [
      {
        id: 'run-data-refresh',
        name: 'Run data refresh',
        description: 'Trigger specific table/module refresh',
        icon: 'RefreshCw',
        color: '#64748b',
        product: null
      },
      {
        id: 'export-excel',
        name: 'Export to Excel/CSV',
        description: 'Generate downloadable report',
        icon: 'Download',
        color: '#64748b',
        product: null
      },
      {
        id: 'run-qc-check',
        name: 'Run data quality check',
        description: 'Validate data completeness',
        icon: 'CheckSquare',
        color: '#64748b',
        product: null
      },
      {
        id: 'update-bigquery',
        name: 'Update BigQuery table',
        description: 'Write computed values to warehouse',
        icon: 'Database',
        color: '#64748b',
        product: null
      }
    ]
  },
  {
    id: 'integrations',
    name: 'Integrations',
    icon: 'Link',
    actions: [
      {
        id: 'post-sftp',
        name: 'Post to client SFTP',
        description: 'Send files to retailer systems',
        icon: 'Upload',
        color: '#334155',
        product: null
      },
      {
        id: 'create-jira',
        name: 'Create Jira ticket',
        description: 'Auto-create issue in Jira',
        icon: 'Ticket',
        color: '#0052cc',
        product: null
      },
      {
        id: 'update-confluence',
        name: 'Update Confluence page',
        description: 'Auto-update documentation',
        icon: 'FileText',
        color: '#0052cc',
        product: null
      },
      {
        id: 'sync-erp',
        name: 'Sync with ERP',
        description: 'Push data to SAP/Oracle',
        icon: 'RefreshCw',
        color: '#334155',
        product: null
      }
    ]
  }
];

export const getAllActions = () => {
  return actionCategories.flatMap(category => category.actions);
};
