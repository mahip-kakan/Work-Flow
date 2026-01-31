import React from 'react';
import { Play, Pause, MoreVertical, Clock, CheckCircle, XCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const MyFlowsView = ({ flows, onEditFlow, onNewFlow }) => {
  if (flows.length === 0) {
    return (
      <div className="my-flows-view empty">
        <div className="empty-state">
          <div className="empty-icon">
            <LucideIcons.Workflow size={64} />
          </div>
          <h2>No flows yet</h2>
          <p>Create your first automation flow to get started</p>
          <button className="create-flow-btn" onClick={onNewFlow}>
            <LucideIcons.Plus size={20} />
            Create new flow
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-flows-view">
      <div className="flows-header">
        <h1>My Flows</h1>
        <button className="create-flow-btn" onClick={onNewFlow}>
          <LucideIcons.Plus size={20} />
          New flow
        </button>
      </div>

      <div className="flows-list">
        {flows.map(flow => {
          const TriggerIcon = flow.trigger 
            ? LucideIcons[flow.trigger.icon] 
            : LucideIcons.Circle;
          
          return (
            <div 
              key={flow.id} 
              className="flow-card"
              onClick={() => onEditFlow(flow)}
            >
              <div className="flow-card-left">
                <div 
                  className="flow-trigger-icon"
                  style={{ 
                    backgroundColor: flow.trigger?.color + '15' || '#f1f5f9',
                    color: flow.trigger?.color || '#64748b'
                  }}
                >
                  <TriggerIcon size={24} />
                </div>
                <div className="flow-card-info">
                  <h3>{flow.name}</h3>
                  <p>
                    {flow.trigger?.name || 'No trigger'} 
                    {flow.actions.length > 0 && ` → ${flow.actions.length} action${flow.actions.length > 1 ? 's' : ''}`}
                  </p>
                </div>
              </div>

              <div className="flow-card-right">
                <div className={`flow-status ${flow.isActive ? 'active' : 'inactive'}`}>
                  {flow.isActive ? (
                    <>
                      <CheckCircle size={16} />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <Clock size={16} />
                      <span>Draft</span>
                    </>
                  )}
                </div>
                
                <button 
                  className="flow-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Toggle flow active state
                  }}
                >
                  {flow.isActive ? <Pause size={18} /> : <Play size={18} />}
                </button>
                
                <button 
                  className="flow-more"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyFlowsView;
