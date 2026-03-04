import React from 'react';
import FlowNode from './FlowNode';
import { List } from 'lucide-react';

const FlowCanvas = ({ 
  trigger, 
  actions, 
  onSelectTrigger, 
  onSelectAction, 
  onRemoveTrigger,
  onRemoveAction,
  onReorderAction,
  onTriggerClick,
  onActionClick,
  selectedStep,
  onTestRun,
  onActivate,
  isActive,
  isRunning
}) => {
  const isTriggerSelected = selectedStep?.type === 'trigger';
  
  return (
    <div className="flow-canvas">
      <div className="flow-content">
        {/* Starter Section */}
        <div className="flow-section">
          <h3 className="section-title">Starter</h3>
          
          {trigger ? (
            <FlowNode 
              type="trigger"
              data={trigger}
              onRemove={onRemoveTrigger}
              stepNumber={1}
              onClick={onTriggerClick}
              isSelected={isTriggerSelected}
            />
          ) : (
            <button className="choose-step-btn" onClick={onSelectTrigger}>
              <List size={20} />
              <span>Choose a starter</span>
            </button>
          )}
        </div>

        {/* Connection Line */}
        {trigger && (
          <div className="connection-line">
            <div className="line"></div>
            <div className="arrow"></div>
          </div>
        )}

        {/* Actions Section */}
        <div className="flow-section">
          <h3 className="section-title">Actions</h3>
          
          {actions.map((action, index) => {
            const isActionSelected = selectedStep?.type === 'action' && selectedStep?.index === index;
            
            return (
              <React.Fragment key={action.id + '-' + index}>
                <FlowNode 
                  type="action"
                  data={action}
                  onRemove={() => onRemoveAction(index)}
                  stepNumber={index + 2}
                  canMoveUp={index > 0}
                  canMoveDown={index < actions.length - 1}
                  onMoveUp={() => onReorderAction(index, index - 1)}
                  onMoveDown={() => onReorderAction(index, index + 1)}
                  onClick={() => onActionClick && onActionClick(index)}
                  isSelected={isActionSelected}
                />
                {index < actions.length - 1 && (
                  <div className="connection-line small">
                    <div className="line"></div>
                    <div className="arrow"></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
          
          <button className="choose-step-btn" onClick={onSelectAction}>
            <List size={20} />
            <span>Choose a step</span>
          </button>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flow-footer">
        <button 
          className="footer-btn" 
          disabled={!trigger || isRunning}
          onClick={onTestRun}
        >
          <span className="play-icon">▶</span>
          {isRunning ? 'Running...' : 'Test run'}
        </button>
        <button 
          className={`footer-btn primary ${isActive ? 'active' : ''}`}
          disabled={!trigger || actions.length === 0}
          onClick={onActivate}
        >
          <span className="power-icon">{isActive ? '⏸' : '⏻'}</span>
          {isActive ? 'Turn off' : 'Turn on'}
        </button>
      </div>
    </div>
  );
};

export default FlowCanvas;
