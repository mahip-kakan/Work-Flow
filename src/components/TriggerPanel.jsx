import React from 'react';
import { getTriggerCategories } from '../data/triggers';
import * as LucideIcons from 'lucide-react';

const TriggerPanel = ({ onSelectTrigger, onClose, vertical = 'healthcare' }) => {
  const triggerCategories = getTriggerCategories(vertical);
  return (
    <div className="selection-panel">
      <div className="panel-header">
        <div className="panel-icon">
          <LucideIcons.List size={24} />
        </div>
        <h2>Choose a starter</h2>
      </div>

      <div className="panel-subtitle">
        <p>Choose how to start your flow</p>
        <span>This event or schedule will launch your flow</span>
      </div>

      <div className="panel-content">
        {triggerCategories.map(category => (
          <div key={category.id} className="trigger-category">
            {category.triggers.map(trigger => {
              const IconComponent = LucideIcons[trigger.icon] || LucideIcons.Circle;
              
              return (
                <button
                  key={trigger.id}
                  className="trigger-item"
                  onClick={() => onSelectTrigger(trigger)}
                >
                  <div 
                    className="trigger-icon"
                    style={{ backgroundColor: trigger.color + '15', color: trigger.color }}
                  >
                    <IconComponent size={20} />
                  </div>
                  <div className="trigger-info">
                    <span className="trigger-name">{trigger.name}</span>
                    <span className="trigger-description">{trigger.description}</span>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TriggerPanel;
