import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, Zap, Users, TrendingUp, Heart, UserCheck, Smile, DollarSign, MessageCircle, Search, Briefcase, Globe } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import AIChatPanel from './AIChatPanel';

const quickTemplates = [
  {
    id: 'post-discharge-followup',
    category: 'Prevent readmissions',
    title: 'Post-discharge follow-up',
    description: 'Automatically create care team tasks and notify care managers after patient discharge',
    icons: ['LogOut', 'ClipboardCheck', 'MessageCircle'],
    color: '#DC2626',
    trigger: {
      id: 'patient-discharge',
      name: 'When patient is discharged',
      description: 'Discharge ADT event received from EHR',
      icon: 'LogOut',
      color: '#DC2626'
    },
    actions: [
      { id: 'create-care-plan', name: 'Create care plan', icon: 'FileText', color: '#DC2626' },
      { id: 'create-care-task', name: 'Create care team task', icon: 'ClipboardCheck', color: '#DC2626' },
      { id: 'send-teams', name: 'Send Teams message', icon: 'MessageCircle', color: '#5558af' }
    ]
  },
  {
    id: 'readmission-risk-alert',
    category: 'Prevent adverse events',
    title: 'Readmission risk alert',
    description: 'Flag high-risk patients at discharge and trigger immediate care team follow-up',
    icons: ['AlertTriangle', 'Activity', 'Bell'],
    color: '#DC2626',
    trigger: {
      id: 'readmission-risk-flagged',
      name: 'When readmission risk is flagged',
      description: '30-day readmission probability > 40%',
      icon: 'AlertTriangle',
      color: '#DC2626'
    },
    actions: [
      { id: 'run-readmission-model', name: 'Run Readmission Risk Model', icon: 'Activity', color: '#7C3AED' },
      { id: 'create-care-plan', name: 'Create enhanced care plan', icon: 'FileText', color: '#DC2626' },
      { id: 'in-app-notification', name: 'Push in-app notification', icon: 'Bell', color: '#1B2B5E' }
    ]
  },
  {
    id: 'appointment-reminder',
    category: 'Improve patient access',
    title: 'Appointment reminder automation',
    description: 'Send personalized appointment reminders via patient preferred channel',
    icons: ['Calendar', 'Bell', 'MessageCircle'],
    color: '#D97706',
    trigger: {
      id: 'appointment-scheduled',
      name: 'When appointment is scheduled',
      description: 'New appointment created in scheduling system',
      icon: 'Calendar',
      color: '#D97706'
    },
    actions: [
      { id: 'send-appointment-reminder', name: 'Send appointment reminder', icon: 'Bell', color: '#D97706' },
      { id: 'send-pre-visit-instructions', name: 'Send pre-visit instructions', icon: 'FileText', color: '#D97706' }
    ]
  }
];

const modules = [
  { name: 'Population Health', icon: 'Users', color: '#7C3AED' },
  { name: 'Value-Based Care', icon: 'TrendingUp', color: '#059669' },
  { name: 'RCM', icon: 'DollarSign', color: '#0284C7' },
  { name: 'Clinical Care', icon: 'Heart', color: '#DC2626' },
  { name: 'Provider Engagement', icon: 'UserCheck', color: '#0891b2' },
  { name: 'Patient Experience', icon: 'Smile', color: '#D97706' },
];

const aiSuggestions = [
  { query: 'discharge', suggestion: 'Post-discharge follow-up', template: 'post-discharge-followup' },
  { query: 'readmission', suggestion: 'Readmission risk alert', template: 'readmission-risk-alert' },
  { query: 'appointment', suggestion: 'Appointment reminder automation', template: 'appointment-reminder' },
  { query: 'reminder', suggestion: 'Appointment reminder automation', template: 'appointment-reminder' },
  { query: 'follow-up', suggestion: 'Post-discharge follow-up', template: 'post-discharge-followup' },
  { query: 'risk', suggestion: 'Readmission risk alert', template: 'readmission-risk-alert' },
  { query: 'patient', suggestion: 'Appointment reminder automation', template: 'appointment-reminder' },
  { query: 'alert', suggestion: 'Readmission risk alert', template: 'readmission-risk-alert' },
];

const knowledgeBases = [
  { id: 'local', label: 'Local', icon: Briefcase },
  { id: 'gravity', label: 'Gravity', icon: ArrowRight },
  { id: 'global', label: 'Global', icon: Globe },
];

const AILandingPage = ({ onSelectTemplate, onSelectProduct, onCreateFlow }) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [matchedSuggestion, setMatchedSuggestion] = useState(null);
  const [knowledgeBase, setKnowledgeBase] = useState('gravity');
  const [knowledgeBaseOpen, setKnowledgeBaseOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const selectTriggerRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!knowledgeBaseOpen || !selectTriggerRef.current) return;
    const rect = selectTriggerRef.current.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + 6,
      left: rect.left + rect.width / 2,
    });
  }, [knowledgeBaseOpen]);

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
          Build healthcare AI with{' '}
          <span className="gradient-text">Gravity AI Studio</span>
        </h1>
        <p className="hero-subtitle">
          Design, deploy, and automate clinical and operational workflows across your health system
        </p>

        {/* AI Input - search bar with knowledge base */}
        <div className="ai-input-container">
          <div className="ai-input-wrapper ai-search-bar">
            <div className="ai-search-bar-icons">
              <Search size={20} className="ai-search-icon" />
            </div>
            <input
              type="text"
              placeholder="Powered by Gravity Search"
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
              <span>Build</span>
            </button>
          </div>

          {/* Knowledge base selector — three values: Local, Gravity, Global */}
          <div className="knowledge-base-select-wrap">
            <button
              ref={selectTriggerRef}
              type="button"
              className="knowledge-base-select"
              onClick={() => setKnowledgeBaseOpen((o) => !o)}
              aria-expanded={knowledgeBaseOpen}
              aria-haspopup="listbox"
            >
              <span>{knowledgeBases.find((kb) => kb.id === knowledgeBase)?.label ?? 'Select'}</span>
              <span className={`knowledge-base-chevron ${knowledgeBaseOpen ? 'open' : ''}`}>▲</span>
            </button>
            {knowledgeBaseOpen && (
              <>
                <div className="knowledge-base-backdrop" onClick={() => setKnowledgeBaseOpen(false)} aria-hidden="true" />
                <div
                  ref={dropdownRef}
                  className="knowledge-base-dropdown knowledge-base-dropdown-fixed"
                  role="listbox"
                  style={{
                    top: dropdownPosition.top,
                    left: dropdownPosition.left,
                    transform: 'translateX(-50%)',
                  }}
                >
                  <div className="knowledge-base-dropdown-header">All knowledge bases</div>
                  {knowledgeBases.map((kb) => {
                    const Icon = kb.icon;
                    return (
                      <button
                        key={kb.id}
                        type="button"
                        className="knowledge-base-option"
                        role="option"
                        aria-selected={knowledgeBase === kb.id}
                        onClick={() => {
                          setKnowledgeBase(kb.id);
                          setKnowledgeBaseOpen(false);
                        }}
                      >
                        <Icon size={18} />
                        <span>{kb.label}</span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
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

        {/* Compliance Strip */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 20, fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>
          <span>HIPAA</span>
          <span>·</span>
          <span>HITRUST</span>
          <span>·</span>
          <span>SOC 2 Type II</span>
          <span>·</span>
          <span>FHIR R4</span>
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
                  Deploy
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Browse by Module */}
      <div className="browse-products-section">
        <h2>Browse by Domain</h2>
        <div className="product-pills">
          {modules.map(module => {
            const IconComponent = LucideIcons[module.icon];
            return (
              <button
                key={module.name}
                className="product-pill"
                onClick={() => onSelectProduct(module.name)}
              >
                <div
                  className="pill-icon"
                  style={{ backgroundColor: module.color + '15', color: module.color }}
                >
                  <IconComponent size={18} />
                </div>
                <span>{module.name}</span>
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
