import React, { useState } from 'react';
import { MoreVertical, ChevronUp, ChevronDown, X, HelpCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const FlowNode = ({ 
  type, 
  data, 
  onRemove, 
  stepNumber,
  canMoveUp,
  canMoveDown,
  onMoveUp,
  onMoveDown,
  onClick,
  isSelected,
  onShowHelp
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Dynamically get the icon component
  const IconComponent = LucideIcons[data.icon] || LucideIcons.Circle;
  
  const handleClick = (e) => {
    // Don't trigger onClick if clicking on action buttons
    if (e.target.closest('.node-actions')) return;
    if (onClick) onClick();
  };

  const handleHelpClick = (e) => {
    e.stopPropagation();
    if (onShowHelp) {
      onShowHelp(data);
    } else {
      setShowTooltip(!showTooltip);
    }
  };
  
  return (
    <div 
      className={`flow-node ${type} ${isSelected ? 'selected' : ''} ${onClick ? 'clickable' : ''}`}
      onClick={handleClick}
    >
      <div className="node-step">
        <span className="step-label">Step {stepNumber}:</span>
        <span className="step-name">{data.name}</span>
      </div>
      
      <div className="node-content">
        <div 
          className="node-icon" 
          style={{ backgroundColor: data.color + '20', color: data.color }}
        >
          <IconComponent size={24} />
        </div>
        
        <div className="node-info">
          <h4 className="node-title">{data.name}</h4>
          <p className="node-description">{data.description}</p>
          {data.product && (
            <span className="node-product">{data.product}</span>
          )}
        </div>

        <div className="node-actions">
          <button 
            className="node-action-btn" 
            onClick={handleHelpClick}
            title="View step details"
            onMouseEnter={() => !onShowHelp && setShowTooltip(true)}
            onMouseLeave={() => !onShowHelp && setShowTooltip(false)}
          >
            <HelpCircle size={16} />
          </button>
          {showTooltip && !onShowHelp && (
            <div className="node-help-tooltip">
              <strong>{data.name}</strong>
              <p>{data.description}</p>
              {data.module && <span className="tooltip-module">{data.module}</span>}
            </div>
          )}
          {type === 'action' && (
            <>
              {canMoveUp && (
                <button className="node-action-btn" onClick={onMoveUp} title="Move up">
                  <ChevronUp size={16} />
                </button>
              )}
              {canMoveDown && (
                <button className="node-action-btn" onClick={onMoveDown} title="Move down">
                  <ChevronDown size={16} />
                </button>
              )}
            </>
          )}
          <button className="node-action-btn" onClick={onRemove} title="Remove">
            <X size={16} />
          </button>
          <button className="node-action-btn" title="More options">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlowNode;
