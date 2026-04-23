import React from 'react';
import * as LucideIcons from 'lucide-react';
import { HR_FEATURED_FLOWS, hrFeaturedToDiscoverTemplate } from '../data/hrFeaturedCopilotFlows';
import { MARKETING_FLOW_TEMPLATES } from '../data/marketingTemplates';

const templates = [
  {
    id: 'daily-pop-health-briefing',
    category: 'Stay on top of your population',
    title: 'Daily population health briefing',
    description: 'Run risk stratification each morning and send a population summary to clinical leads',
    icons: ['Clock', 'Activity', 'MessageSquare'],
    color: '#7C3AED',
    module: 'Population Health'
  },
  {
    id: 'care-gap-alert',
    category: 'Close care gaps faster',
    title: 'Alert on care gaps',
    description: 'Detect HEDIS measure gaps and generate prioritized outreach lists automatically',
    icons: ['ClipboardList', 'Users', 'Mail'],
    color: '#7C3AED',
    module: 'Population Health'
  },
  {
    id: 'post-discharge-followup',
    category: 'Close care loops',
    title: 'Post-discharge follow-up',
    description: 'Create care tasks and notify care managers within minutes of patient discharge',
    icons: ['LogOut', 'ClipboardCheck', 'Bell'],
    color: '#DC2626',
    module: 'Clinical Care'
  },
  {
    id: 'readmission-risk-alert',
    category: 'Prevent adverse events',
    title: 'Readmission risk alert',
    description: 'Flag high-risk patients at discharge and trigger immediate care team follow-up',
    icons: ['AlertTriangle', 'LogOut', 'ClipboardCheck'],
    color: '#DC2626',
    module: 'Clinical Care'
  },
  {
    id: 'appointment-reminder',
    category: 'Improve patient access',
    title: 'Appointment reminder automation',
    description: 'Send personalized appointment reminders via patient preferred channel',
    icons: ['Calendar', 'Bell', 'MessageCircle'],
    color: '#D97706',
    module: 'Patient Experience'
  },
  {
    id: 'satisfaction-survey',
    category: 'Measure patient satisfaction',
    title: 'Post-visit satisfaction survey',
    description: 'Automatically send satisfaction survey after appointment completion',
    icons: ['CheckCircle', 'MessageSquare', 'TrendingUp'],
    color: '#D97706',
    module: 'Patient Experience'
  }
];

const domains = [
  { name: 'Population Health', icon: 'Users', color: '#7C3AED', count: 6 },
  { name: 'Value-Based Care', icon: 'TrendingUp', color: '#059669', count: 9 },
  { name: 'RCM', icon: 'DollarSign', color: '#0284C7', count: 7 },
  { name: 'Clinical Care', icon: 'Heart', color: '#DC2626', count: 6 },
  { name: 'Provider Engagement', icon: 'UserCheck', color: '#0891b2', count: 6 },
  { name: 'Patient Experience', icon: 'Smile', color: '#D97706', count: 6 },
];

const hrTemplates = [
  ...HR_FEATURED_FLOWS.map(hrFeaturedToDiscoverTemplate),
  {
    id: 'hr-discover-onboarding',
    category: 'People ops',
    title: 'New hire onboarding runbook',
    description: 'T-minus checklist: equipment, access, payroll, and manager welcome tasks',
    icons: ['CalendarCheck', 'ClipboardCheck', 'MessageCircle'],
    color: '#D97706',
    module: 'People Ops & Systems'
  },
  {
    id: 'hr-discover-offboarding',
    category: 'HRBP',
    title: 'Offboarding checklist',
    description: 'Access removal, exit interview, final pay, and asset return coordinated across teams',
    icons: ['LogOut', 'Key', 'Mail'],
    color: '#7C3AED',
    module: 'HRBP & Employee Lifecycle'
  },
  {
    id: 'hr-discover-transfer',
    category: 'HRBP',
    title: 'Internal transfer / promotion',
    description: 'Title, compensation, and permissions updates with manager briefing and IT sync',
    icons: ['GitBranch', 'Users', 'Bell'],
    color: '#7C3AED',
    module: 'HRBP & Employee Lifecycle'
  },
  {
    id: 'hr-discover-interview-nudge',
    category: 'Talent acquisition',
    title: 'Interview feedback SLA',
    description: 'Remind panelists until scorecards are submitted after each interview round',
    icons: ['ClipboardCheck', 'Bell', 'MessageCircle'],
    color: '#059669',
    module: 'Talent Acquisition'
  },
  {
    id: 'hr-discover-access-review',
    category: 'People ops',
    title: 'Quarterly access review',
    description: 'Schedule-driven campaign to validate roles and application access against HRIS',
    icons: ['Shield', 'CheckSquare', 'Send'],
    color: '#0284C7',
    module: 'People Ops & Systems'
  }
];

const hrDomains = [
  { name: 'HRBP & Employee Lifecycle', icon: 'Users', color: '#7C3AED', count: 4 },
  { name: 'Talent Acquisition', icon: 'Briefcase', color: '#059669', count: 7 },
  { name: 'People Ops & Systems', icon: 'Settings', color: '#D97706', count: 4 }
];

const marketingDomains = [
  { name: 'Campaign & lifecycle', icon: 'Megaphone', color: '#7C3AED', count: 3 },
  { name: 'Content & distribution', icon: 'Layers', color: '#059669', count: 1 },
  { name: 'Brand & insights', icon: 'Lightbulb', color: '#D97706', count: 2 }
];

const DiscoverView = ({ vertical = 'healthcare', onSelectTemplate, onSelectProduct }) => {
  const isHr = vertical === 'hr';
  const isMarketing = vertical === 'marketing';
  const activeTemplates = isHr ? hrTemplates : isMarketing ? MARKETING_FLOW_TEMPLATES : templates;
  const activeDomains = isHr ? hrDomains : isMarketing ? marketingDomains : domains;

  return (
    <div className="discover-view">
      <h1 className="discover-title">Discover Agent Templates</h1>
      <p className="discover-subtitle">
        {isHr
          ? 'Pre-built HR automations across HRBP, talent acquisition, and people ops—onboarding through data quality'
          : isMarketing
            ? 'Pre-built marketing automations across campaigns, content, brand, and lifecycle touchpoints'
            : 'Pre-built automation workflows across common healthcare domains—clinical, population health, access, and experience'}
      </p>

      <div className="template-grid">
        {activeTemplates.map(template => (
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
        <h2>{isHr ? 'By HR pillar' : isMarketing ? 'By marketing pillar' : 'By Domain'}</h2>
        <div className="product-cards">
          {activeDomains.map(domain => {
            const IconComponent = LucideIcons[domain.icon];
            return (
              <button
                key={domain.name}
                className="product-card"
                onClick={() => onSelectProduct(domain.name)}
              >
                <div
                  className="product-icon"
                  style={{ backgroundColor: domain.color + '15', color: domain.color }}
                >
                  <IconComponent size={24} />
                </div>
                <span className="product-name">{domain.name}</span>
                <span className="product-count">{domain.count} agents</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DiscoverView;
