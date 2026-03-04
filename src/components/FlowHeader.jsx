import React, { useState } from 'react';
import { ArrowLeft, Pencil, TrendingUp, Share2, MoreVertical, HelpCircle } from 'lucide-react';

const FlowHeader = ({ flowName, onBack, onNameChange, onShowHelp }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(flowName);

  const handleSubmit = () => {
    onNameChange(name);
    setIsEditing(false);
  };

  return (
    <div className="flow-header">
      <div className="flow-header-left">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleSubmit}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="flow-name-input"
            autoFocus
          />
        ) : (
          <div className="flow-name" onClick={() => setIsEditing(true)}>
            <span>{flowName}</span>
            <Pencil size={16} className="edit-icon" />
          </div>
        )}
      </div>

      <div className="flow-header-right">
        {onShowHelp && (
          <button className="header-icon-btn" title="Help & Documentation" onClick={onShowHelp}>
            <HelpCircle size={20} />
          </button>
        )}
        <button className="header-icon-btn" title="Analytics">
          <TrendingUp size={20} />
        </button>
        <button className="header-icon-btn" title="Share">
          <Share2 size={20} />
        </button>
        <button className="header-icon-btn" title="More options">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};

export default FlowHeader;
