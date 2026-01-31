import React from 'react';
import * as LucideIcons from 'lucide-react';

const templates = [
  {
    id: 'morning-briefing',
    category: 'Stay on top of business',
    title: 'Get a daily business summary',
    description: 'Receive MondaySmart insights every morning',
    icons: ['Clock', 'BarChart2', 'MessageSquare'],
    color: '#4285f4',
    product: 'MondaySmart'
  },
  {
    id: 'low-inventory-alert',
    category: 'Respond quickly',
    title: 'Alert on low inventory',
    description: 'Notify when WOH falls below threshold',
    icons: ['AlertTriangle', 'Package', 'Mail'],
    color: '#ea4335',
    product: 'InventorySmart'
  },
  {
    id: 'plan-sync',
    category: 'Stay organized',
    title: 'Auto-sync approved plans',
    description: 'Push PlanSmart data to ItemSmart on approval',
    icons: ['CheckCircle', 'ArrowRight', 'Layers'],
    color: '#34a853',
    product: 'PlanSmart'
  },
  {
    id: 'forecast-deviation',
    category: 'Track anomalies',
    title: 'Detect forecast deviations',
    description: 'Alert when forecast vs actual exceeds 15%',
    icons: ['TrendingDown', 'Search', 'Bell'],
    color: '#f59e0b',
    product: 'ItemSmart'
  },
  {
    id: 'order-notification',
    category: 'Review quickly',
    title: 'Notify on pending orders',
    description: 'Send reminders for orders awaiting approval',
    icons: ['ShoppingCart', 'Clock', 'MessageCircle'],
    color: '#9333ea',
    product: 'InventorySmart'
  },
  {
    id: 'data-quality',
    category: 'Maintain data health',
    title: 'Daily data quality check',
    description: 'Run QC and alert on data issues',
    icons: ['Database', 'CheckSquare', 'AlertCircle'],
    color: '#0891b2',
    product: 'ItemSmart'
  }
];

const products = [
  { name: 'InventorySmart', icon: 'Package', color: '#2563eb', count: 12 },
  { name: 'PlanSmart', icon: 'BarChart3', color: '#16a34a', count: 8 },
  { name: 'AssortSmart', icon: 'Grid3X3', color: '#9333ea', count: 6 },
  { name: 'MondaySmart', icon: 'BarChart2', color: '#f59e0b', count: 10 },
  { name: 'ItemSmart', icon: 'Layers', color: '#0891b2', count: 7 },
];

const DiscoverView = ({ onSelectTemplate, onSelectProduct }) => {
  return (
    <div className="discover-view">
      <h1 className="discover-title">Discover Flows</h1>
      <p className="discover-subtitle">
        Pre-built automation templates for Impact Analytics products
      </p>

      <div className="template-grid">
        {templates.map(template => (
          <button
            key={template.id}
            className="template-card"
            onClick={() => onSelectTemplate(template)}
          >
            <span 
              className="template-category"
              style={{ color: template.color }}
            >
              {template.category}
            </span>
            <h3 className="template-title">{template.title}</h3>
            <p className="template-description">{template.description}</p>
            <div className="template-icons">
              {template.icons.map((iconName, index) => {
                const IconComponent = LucideIcons[iconName] || LucideIcons.Circle;
                return (
                  <div 
                    key={index} 
                    className="template-icon"
                    style={{ backgroundColor: template.color + '15', color: template.color }}
                  >
                    <IconComponent size={18} />
                  </div>
                );
              })}
            </div>
          </button>
        ))}
      </div>

      <div className="product-sections">
        <h2>By Product</h2>
        <div className="product-cards">
          {products.map(product => {
            const IconComponent = LucideIcons[product.icon];
            return (
              <button 
                key={product.name} 
                className="product-card"
                onClick={() => onSelectProduct(product.name)}
              >
                <div 
                  className="product-icon"
                  style={{ backgroundColor: product.color + '15', color: product.color }}
                >
                  <IconComponent size={24} />
                </div>
                <span className="product-name">{product.name}</span>
                <span className="product-count">{product.count} flows</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DiscoverView;
