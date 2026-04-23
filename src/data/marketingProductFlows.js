import { MARKETING_FLOW_TEMPLATES } from './marketingTemplates.js';

function agentsForModule(moduleName) {
  return MARKETING_FLOW_TEMPLATES.filter((t) => t.module === moduleName).map((t) => ({
    id: t.id,
    name: t.title,
    description: t.description,
    trigger: t.trigger,
    actions: t.actions,
    isActive: true,
  }));
}

export const MARKETING_PILLAR_DEFAULT = 'Campaign & lifecycle';

export const marketingModuleConfigs = {
  'Campaign & lifecycle': {
    icon: 'Megaphone',
    color: '#7C3AED',
    description: 'Wrap campaigns, experiments, and post-mortems with consistent reporting and handoffs',
    agents: agentsForModule('Campaign & lifecycle'),
  },
  'Content & distribution': {
    icon: 'Layers',
    color: '#059669',
    description: 'Repurpose and ship content across channels with clear ownership',
    agents: agentsForModule('Content & distribution'),
  },
  'Brand & insights': {
    icon: 'Lightbulb',
    color: '#D97706',
    description: 'Briefs, brand review, and competitive intelligence in one motion',
    agents: agentsForModule('Brand & insights'),
  },
};
