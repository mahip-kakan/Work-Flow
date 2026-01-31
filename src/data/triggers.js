// Trigger configurations for Impact Flow Studio
export const triggerCategories = [
  {
    id: 'schedule',
    name: 'Schedule',
    icon: 'Clock',
    triggers: [
      {
        id: 'on-schedule',
        name: 'On a schedule',
        description: 'Run at specific times (daily, weekly, monthly)',
        icon: 'Clock',
        color: '#4285f4'
      },
      {
        id: 'fiscal-calendar',
        name: 'Fiscal calendar event',
        description: 'Trigger on planning season start/end',
        icon: 'Calendar',
        color: '#4285f4'
      }
    ]
  },
  {
    id: 'data-events',
    name: 'Data Events',
    icon: 'Database',
    triggers: [
      {
        id: 'data-ingestion-complete',
        name: 'When data ingestion completes',
        description: 'After daily sourcing pipeline finishes',
        icon: 'Database',
        color: '#34a853'
      },
      {
        id: 'forecast-refresh',
        name: 'When forecast refresh completes',
        description: 'After Vertex AI simulation pipeline runs',
        icon: 'TrendingUp',
        color: '#34a853'
      },
      {
        id: 'plan-approved',
        name: 'When plan is approved',
        description: 'After MFP plan approval in PlanSmart',
        icon: 'CheckCircle',
        color: '#34a853'
      },
      {
        id: 'allocation-executed',
        name: 'When allocation is executed',
        description: 'After InventorySmart allocation run',
        icon: 'GitBranch',
        color: '#34a853'
      }
    ]
  },
  {
    id: 'alerts',
    name: 'Alerts',
    icon: 'Bell',
    triggers: [
      {
        id: 'kpi-threshold',
        name: 'When KPI threshold breached',
        description: 'Inventory below safety stock, WOH < X weeks',
        icon: 'AlertTriangle',
        color: '#ea4335'
      },
      {
        id: 'forecast-deviation',
        name: 'When forecast deviation detected',
        description: 'IA forecast vs actual sales variance',
        icon: 'TrendingDown',
        color: '#ea4335'
      },
      {
        id: 'order-overdue',
        name: 'When order is overdue',
        description: 'PO not fulfilled within lead time',
        icon: 'AlertCircle',
        color: '#ea4335'
      }
    ]
  },
  {
    id: 'user-actions',
    name: 'User Actions',
    icon: 'User',
    triggers: [
      {
        id: 'file-uploaded',
        name: 'When file is uploaded',
        description: 'Excel/CSV upload to any module',
        icon: 'Upload',
        color: '#9334ea'
      },
      {
        id: 'order-approved',
        name: 'When order is approved',
        description: 'Manual approval in OMS',
        icon: 'ClipboardCheck',
        color: '#9334ea'
      },
      {
        id: 'assortment-finalized',
        name: 'When assortment is finalized',
        description: 'Line plan locked in AssortSmart',
        icon: 'Lock',
        color: '#9334ea'
      }
    ]
  },
  {
    id: 'product-events',
    name: 'Product Events',
    icon: 'Package',
    triggers: [
      {
        id: 'new-store-added',
        name: 'When new store is added',
        description: 'New store created in Store Master',
        icon: 'Store',
        color: '#f59e0b'
      },
      {
        id: 'new-sku-added',
        name: 'When new SKU is added',
        description: 'New product added to Product Master',
        icon: 'Package',
        color: '#f59e0b'
      },
      {
        id: 'supersession-created',
        name: 'When supersession is created',
        description: 'Style replacement mapping added',
        icon: 'RefreshCw',
        color: '#f59e0b'
      }
    ]
  }
];

export const getAllTriggers = () => {
  return triggerCategories.flatMap(category => category.triggers);
};
