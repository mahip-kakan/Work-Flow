import React from 'react';
import * as LucideIcons from 'lucide-react';
import { ArrowLeft } from 'lucide-react';

// ItemSmart specific flow templates with full configurations
const itemSmartFlows = [
  {
    id: 'itemsmart-1',
    name: 'Weekly Forecast Refresh Pipeline',
    description: 'Automatically refresh demand forecast every week and notify planners',
    trigger: {
      id: 'on-schedule',
      name: 'On a schedule',
      description: 'Every Monday at 6:00 AM',
      icon: 'Clock',
      color: '#4285f4'
    },
    actions: [
      {
        id: 'run-simulation',
        name: 'Run simulation pipeline',
        description: 'Execute Vertex AI forecast simulation',
        icon: 'Play',
        color: '#0891b2',
        product: 'ItemSmart'
      },
      {
        id: 'refresh-forecast',
        name: 'Refresh forecast',
        description: 'Update ItemSmart demand forecast',
        icon: 'TrendingUp',
        color: '#0891b2',
        product: 'ItemSmart'
      },
      {
        id: 'run-qc-check',
        name: 'Run data quality check',
        description: 'Validate forecast data completeness',
        icon: 'CheckSquare',
        color: '#64748b',
        product: null
      },
      {
        id: 'send-slack',
        name: 'Send Slack message',
        description: 'Notify #demand-planning channel',
        icon: 'MessageSquare',
        color: '#4a154b',
        product: null
      }
    ],
    isActive: true
  },
  {
    id: 'itemsmart-2',
    name: 'Forecast Deviation Alert',
    description: 'Alert when forecast vs actual sales variance exceeds threshold',
    trigger: {
      id: 'forecast-deviation',
      name: 'When forecast deviation detected',
      description: 'IA forecast vs actual sales variance > 15%',
      icon: 'TrendingDown',
      color: '#ea4335'
    },
    actions: [
      {
        id: 'refresh-insights',
        name: 'Refresh insights',
        description: 'Generate root cause analysis',
        icon: 'Sparkles',
        color: '#f59e0b',
        product: 'MondaySmart'
      },
      {
        id: 'in-app-notification',
        name: 'Push in-app notification',
        description: 'Alert demand planners immediately',
        icon: 'Bell',
        color: '#4285f4',
        product: null
      },
      {
        id: 'send-email',
        name: 'Send email with report',
        description: 'Email deviation report to planning team',
        icon: 'Mail',
        color: '#ea4335',
        product: null
      },
      {
        id: 'create-jira',
        name: 'Create Jira ticket',
        description: 'Track deviation for investigation',
        icon: 'Ticket',
        color: '#0052cc',
        product: null
      }
    ],
    isActive: true
  },
  {
    id: 'itemsmart-3',
    name: 'Plan Sync from PlanSmart',
    description: 'Sync approved MFP targets to ItemSmart for SKU-level planning',
    trigger: {
      id: 'plan-approved',
      name: 'When plan is approved',
      description: 'MFP plan approved in PlanSmart',
      icon: 'CheckCircle',
      color: '#34a853'
    },
    actions: [
      {
        id: 'run-data-refresh',
        name: 'Run data refresh',
        description: 'Pull latest plan data from PlanSmart',
        icon: 'RefreshCw',
        color: '#64748b',
        product: null
      },
      {
        id: 'refresh-forecast',
        name: 'Refresh forecast',
        description: 'Recalculate SKU-level forecasts with new targets',
        icon: 'TrendingUp',
        color: '#0891b2',
        product: 'ItemSmart'
      },
      {
        id: 'generate-item-report',
        name: 'Generate item planning report',
        description: 'Create variance report for review',
        icon: 'FileSpreadsheet',
        color: '#0891b2',
        product: 'ItemSmart'
      },
      {
        id: 'send-teams',
        name: 'Send Teams message',
        description: 'Notify item planners of new targets',
        icon: 'MessageCircle',
        color: '#5558af',
        product: null
      }
    ],
    isActive: false
  },
  {
    id: 'itemsmart-4',
    name: 'New SKU Forecast Setup',
    description: 'Automatically set up forecasting for newly added SKUs',
    trigger: {
      id: 'new-sku-added',
      name: 'When new SKU is added',
      description: 'New product added to Product Master',
      icon: 'Package',
      color: '#f59e0b'
    },
    actions: [
      {
        id: 'run-simulation',
        name: 'Run simulation pipeline',
        description: 'Generate initial forecast for new SKU',
        icon: 'Play',
        color: '#0891b2',
        product: 'ItemSmart'
      },
      {
        id: 'sync-to-itemsmart',
        name: 'Sync plan to ItemSmart',
        description: 'Apply category-level targets to new SKU',
        icon: 'ArrowRight',
        color: '#16a34a',
        product: 'PlanSmart'
      },
      {
        id: 'in-app-notification',
        name: 'Push in-app notification',
        description: 'Notify planner to review new SKU setup',
        icon: 'Bell',
        color: '#4285f4',
        product: null
      }
    ],
    isActive: true
  },
  {
    id: 'itemsmart-5',
    name: 'Daily Ingestion & Actualization',
    description: 'Update ItemSmart with latest actuals after daily data ingestion',
    trigger: {
      id: 'data-ingestion-complete',
      name: 'When data ingestion completes',
      description: 'After daily sourcing pipeline finishes',
      icon: 'Database',
      color: '#34a853'
    },
    actions: [
      {
        id: 'run-qc-check',
        name: 'Run data quality check',
        description: 'Validate ingested data',
        icon: 'CheckSquare',
        color: '#64748b',
        product: null
      },
      {
        id: 'refresh-forecast',
        name: 'Refresh forecast',
        description: 'Update with latest actuals',
        icon: 'TrendingUp',
        color: '#0891b2',
        product: 'ItemSmart'
      },
      {
        id: 'update-bigquery',
        name: 'Update BigQuery table',
        description: 'Sync derived tables',
        icon: 'Database',
        color: '#64748b',
        product: null
      }
    ],
    isActive: true
  },
  {
    id: 'itemsmart-6',
    name: 'Export to Ordering System',
    description: 'Push finalized item plans to InventorySmart OMS',
    trigger: {
      id: 'on-schedule',
      name: 'On a schedule',
      description: 'Every Friday at 5:00 PM',
      icon: 'Clock',
      color: '#4285f4'
    },
    actions: [
      {
        id: 'generate-item-report',
        name: 'Generate item planning report',
        description: 'Export final item plan for the week',
        icon: 'FileSpreadsheet',
        color: '#0891b2',
        product: 'ItemSmart'
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
        id: 'post-sftp',
        name: 'Post to client SFTP',
        description: 'Send planning files to client systems',
        icon: 'Upload',
        color: '#334155',
        product: null
      },
      {
        id: 'send-email',
        name: 'Send email with report',
        description: 'Email weekly summary to stakeholders',
        icon: 'Mail',
        color: '#ea4335',
        product: null
      }
    ],
    isActive: false
  },
  {
    id: 'itemsmart-7',
    name: 'Supersession Handler',
    description: 'Update forecasts when product supersession is created',
    trigger: {
      id: 'supersession-created',
      name: 'When supersession is created',
      description: 'Style replacement mapping added',
      icon: 'RefreshCw',
      color: '#f59e0b'
    },
    actions: [
      {
        id: 'run-simulation',
        name: 'Run simulation pipeline',
        description: 'Transfer demand from old to new SKU',
        icon: 'Play',
        color: '#0891b2',
        product: 'ItemSmart'
      },
      {
        id: 'refresh-forecast',
        name: 'Refresh forecast',
        description: 'Recalculate forecasts for affected SKUs',
        icon: 'TrendingUp',
        color: '#0891b2',
        product: 'ItemSmart'
      },
      {
        id: 'send-slack',
        name: 'Send Slack message',
        description: 'Notify planning team of supersession',
        icon: 'MessageSquare',
        color: '#4a154b',
        product: null
      }
    ],
    isActive: true
  }
];

const productConfigs = {
  'ItemSmart': {
    icon: 'Layers',
    color: '#0891b2',
    description: 'SKU-level demand planning and forecasting',
    flows: itemSmartFlows
  },
  'InventorySmart': {
    icon: 'Package',
    color: '#2563eb',
    description: 'Inventory allocation and order management',
    flows: []
  },
  'PlanSmart': {
    icon: 'BarChart3',
    color: '#16a34a',
    description: 'Merchandise financial planning',
    flows: []
  },
  'AssortSmart': {
    icon: 'Grid3X3',
    color: '#9333ea',
    description: 'Assortment and line planning',
    flows: []
  },
  'MondaySmart': {
    icon: 'BarChart2',
    color: '#f59e0b',
    description: 'Daily analytics and AI insights',
    flows: []
  }
};

const ProductFlowsView = ({ productName, onBack, onSelectFlow, onCreateFromTemplate }) => {
  const config = productConfigs[productName] || productConfigs['ItemSmart'];
  const IconComponent = LucideIcons[config.icon];

  return (
    <div className="product-flows-view">
      <button className="back-link" onClick={onBack}>
        <ArrowLeft size={20} />
        <span>Back to Discover</span>
      </button>

      <div className="product-header">
        <div 
          className="product-header-icon"
          style={{ backgroundColor: config.color + '15', color: config.color }}
        >
          <IconComponent size={32} />
        </div>
        <div className="product-header-info">
          <h1>{productName}</h1>
          <p>{config.description}</p>
        </div>
      </div>

      <div className="product-flows-section">
        <div className="section-header">
          <h2>Flow Templates</h2>
          <span className="flow-count">{config.flows.length} templates</span>
        </div>

        {config.flows.length === 0 ? (
          <div className="empty-product-flows">
            <p>No templates available for this product yet.</p>
            <p>Click "New flow" to create your own automation.</p>
          </div>
        ) : (
          <div className="product-flow-list">
            {config.flows.map(flow => {
              const TriggerIcon = LucideIcons[flow.trigger.icon];
              
              return (
                <div key={flow.id} className="product-flow-card">
                  <div className="flow-card-header">
                    <div 
                      className="flow-trigger-badge"
                      style={{ backgroundColor: flow.trigger.color + '15', color: flow.trigger.color }}
                    >
                      <TriggerIcon size={16} />
                      <span>{flow.trigger.name}</span>
                    </div>
                    {flow.isActive && (
                      <span className="recommended-badge">Recommended</span>
                    )}
                  </div>
                  
                  <h3>{flow.name}</h3>
                  <p className="flow-description">{flow.description}</p>
                  
                  <div className="flow-actions-preview">
                    <span className="actions-label">Actions:</span>
                    <div className="action-icons">
                      {flow.actions.map((action, idx) => {
                        const ActionIcon = LucideIcons[action.icon];
                        return (
                          <div 
                            key={idx}
                            className="action-icon-small"
                            style={{ backgroundColor: action.color + '15', color: action.color }}
                            title={action.name}
                          >
                            <ActionIcon size={14} />
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flow-card-actions">
                    <button 
                      className="use-template-btn"
                      onClick={() => onCreateFromTemplate(flow)}
                    >
                      Use this template
                    </button>
                    <button 
                      className="preview-btn"
                      onClick={() => onSelectFlow(flow)}
                    >
                      Preview
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFlowsView;
