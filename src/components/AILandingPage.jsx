import React, { useState } from 'react';
import { Sparkles, ArrowRight, Zap, Clock, TrendingUp, Bell, Package, BarChart3, Layers, Grid3X3, BarChart2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const quickTemplates = [
  {
    id: 'forecast-alerts',
    category: 'Review quickly',
    title: 'Notify me about forecast deviations',
    description: 'Get alerts when forecast vs actual exceeds threshold',
    icons: ['TrendingDown', 'Bell', 'Mail'],
    color: '#ea4335',
    trigger: {
      id: 'forecast-deviation',
      name: 'When forecast deviation detected',
      description: 'IA forecast vs actual sales variance > 15%',
      icon: 'TrendingDown',
      color: '#ea4335'
    },
    actions: [
      { id: 'in-app-notification', name: 'Push in-app notification', icon: 'Bell', color: '#4285f4' },
      { id: 'send-email', name: 'Send email with report', icon: 'Mail', color: '#ea4335' }
    ]
  },
  {
    id: 'daily-sync',
    category: 'Stay organized',
    title: 'Daily sync from PlanSmart',
    description: 'Automatically sync approved plans to ItemSmart',
    icons: ['RefreshCw', 'ArrowRight', 'Layers'],
    color: '#34a853',
    trigger: {
      id: 'plan-approved',
      name: 'When plan is approved',
      description: 'MFP plan approved in PlanSmart',
      icon: 'CheckCircle',
      color: '#34a853'
    },
    actions: [
      { id: 'run-data-refresh', name: 'Run data refresh', icon: 'RefreshCw', color: '#64748b' },
      { id: 'sync-to-itemsmart', name: 'Sync plan to ItemSmart', icon: 'ArrowRight', color: '#16a34a' }
    ]
  },
  {
    id: 'weekly-reports',
    category: 'Stay on top',
    title: 'Weekly business summary',
    description: 'Get insights delivered every Monday morning',
    icons: ['Clock', 'BarChart2', 'MessageSquare'],
    color: '#4285f4',
    trigger: {
      id: 'on-schedule',
      name: 'On a schedule',
      description: 'Every Monday at 8:00 AM',
      icon: 'Clock',
      color: '#4285f4'
    },
    actions: [
      { id: 'generate-summary', name: 'Generate business summary', icon: 'FileText', color: '#f59e0b' },
      { id: 'send-slack', name: 'Send Slack message', icon: 'MessageSquare', color: '#4a154b' }
    ]
  }
];

const products = [
  { name: 'ItemSmart', icon: 'Layers', color: '#0891b2' },
  { name: 'InventorySmart', icon: 'Package', color: '#2563eb' },
  { name: 'PlanSmart', icon: 'BarChart3', color: '#16a34a' },
  { name: 'AssortSmart', icon: 'Grid3X3', color: '#9333ea' },
  { name: 'MondaySmart', icon: 'BarChart2', color: '#f59e0b' },
];

const aiSuggestions = [
  { query: 'low inventory', suggestion: 'Alert on low inventory levels', template: 'low-inventory-alert' },
  { query: 'forecast', suggestion: 'Notify on forecast deviations', template: 'forecast-alerts' },
  { query: 'weekly', suggestion: 'Weekly business summary', template: 'weekly-reports' },
  { query: 'sync', suggestion: 'Daily sync from PlanSmart', template: 'daily-sync' },
  { query: 'report', suggestion: 'Generate and send reports', template: 'weekly-reports' },
  { query: 'alert', suggestion: 'Set up KPI threshold alerts', template: 'forecast-alerts' },
];

const AILandingPage = ({ onSelectTemplate, onSelectProduct, onCreateFlow }) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [matchedSuggestion, setMatchedSuggestion] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 2) {
      const match = aiSuggestions.find(s => 
        value.toLowerCase().includes(s.query.toLowerCase())
      );
      if (match) {
        setMatchedSuggestion(match);
        setShowSuggestion(true);
      } else {
        setShowSuggestion(false);
        setMatchedSuggestion(null);
      }
    } else {
      setShowSuggestion(false);
    }
  };

  const handleCreate = () => {
    if (matchedSuggestion) {
      const template = quickTemplates.find(t => t.id === matchedSuggestion.template);
      if (template) {
        onCreateFlow({
          name: inputValue || template.title,
          trigger: template.trigger,
          actions: template.actions
        });
      }
    } else if (inputValue.trim()) {
      // Create a new flow with just the name
      onCreateFlow({
        name: inputValue,
        trigger: null,
        actions: []
      });
    }
  };

  const handleQuickTurnOn = (template) => {
    onCreateFlow({
      name: template.title,
      trigger: template.trigger,
      actions: template.actions
    });
  };

  return (
    <div className="ai-landing-page">
      {/* Hero Section */}
      <div className="ai-hero">
        <div className="hero-decoration"></div>
        <h1>
          Automate your work with{' '}
          <span className="gradient-text">Impact Flow Studio</span>
        </h1>
        <p className="hero-subtitle">
          Streamline and manage tasks across IA products
        </p>

        {/* AI Input */}
        <div className="ai-input-container">
          <div className="ai-input-wrapper">
            <input
              type="text"
              placeholder="Describe a task to automate..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            />
            <button 
              className="ai-create-btn"
              onClick={handleCreate}
              disabled={!inputValue.trim()}
            >
              <Sparkles size={18} />
              <span>Create</span>
            </button>
          </div>

          {/* AI Suggestion */}
          {showSuggestion && matchedSuggestion && (
            <div className="ai-suggestion">
              <Zap size={16} />
              <span>Suggested: <strong>{matchedSuggestion.suggestion}</strong></span>
              <button onClick={handleCreate}>
                Use this <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Templates */}
      <div className="quick-templates-section">
        <div className="quick-templates-grid">
          {quickTemplates.map(template => (
            <div key={template.id} className="quick-template-card">
              <span className="template-category" style={{ color: template.color }}>
                {template.category}
              </span>
              <h3>{template.title}</h3>
              <p>{template.description}</p>
              <div className="template-footer">
                <div className="template-icons">
                  {template.icons.map((iconName, idx) => {
                    const IconComponent = LucideIcons[iconName] || LucideIcons.Circle;
                    return (
                      <div 
                        key={idx}
                        className="template-icon"
                        style={{ backgroundColor: template.color + '15', color: template.color }}
                      >
                        <IconComponent size={16} />
                      </div>
                    );
                  })}
                </div>
                <button 
                  className="turn-on-btn"
                  onClick={() => handleQuickTurnOn(template)}
                >
                  Turn on
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Browse by Product */}
      <div className="browse-products-section">
        <h2>Browse by Product</h2>
        <div className="product-pills">
          {products.map(product => {
            const IconComponent = LucideIcons[product.icon];
            return (
              <button
                key={product.name}
                className="product-pill"
                onClick={() => onSelectProduct(product.name)}
              >
                <div 
                  className="pill-icon"
                  style={{ backgroundColor: product.color + '15', color: product.color }}
                >
                  <IconComponent size={18} />
                </div>
                <span>{product.name}</span>
                <ArrowRight size={16} className="pill-arrow" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AILandingPage;
