import React from 'react';
import { GitBranch, Brain, Zap, Eye, Settings, ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'orchestration',
    title: 'Test Orchestration',
    description: 'Workflow definition, parallel execution, conditional logic. Define what runs when.',
    icon: GitBranch,
    color: 'var(--gravity-purple)',
  },
  {
    id: 'ai-model',
    title: 'AI Model Testing',
    description: 'Evals, prompt tests, regression. Create and run evaluation suites for the AI assistant.',
    icon: Brain,
    color: 'var(--gravity-purple)',
  },
  {
    id: 'load',
    title: 'Load & Performance',
    description: 'Load tests, latency, cost at scale. Add scenarios and set thresholds.',
    icon: Zap,
    color: 'var(--amber)',
  },
  {
    id: 'observability',
    title: 'Observability',
    description: 'Real-time metrics, cost by feature, model drift. Configure checks and alerts.',
    icon: Eye,
    color: 'var(--data-blue)',
  },
];

const adminCategory = {
  id: 'settings',
  title: 'Settings',
  description: 'Configure eval thresholds, CI/CD integrations, and team access. Admin only.',
  icon: Settings,
  color: 'var(--health-green)',
};

export default function DashboardScreen({ onSelectCategory, isAdmin }) {
  const visibleCategories = isAdmin ? [...categories, adminCategory] : categories;

  return (
    <div className="dashboard-screen">
      <h2 className="dashboard-title">Testing Dashboard</h2>
      <p className="dashboard-subtitle">Choose a category to manage tests, evals, and monitoring.</p>
      <div className="category-grid">
        {visibleCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              type="button"
              className="category-card"
              onClick={() => onSelectCategory(cat.id)}
            >
              <div className="category-card-icon" style={{ backgroundColor: cat.color + '20', color: cat.color }}>
                <Icon size={28} />
              </div>
              <h3 className="category-card-title">{cat.title}</h3>
              <p className="category-card-desc">{cat.description}</p>
              <span className="category-card-cta">
                Open <ArrowRight size={14} />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
