import React, { useState } from 'react';
import { actionCategories } from '../data/actions';
import * as LucideIcons from 'lucide-react';
import { Search } from 'lucide-react';

const ActionPanel = ({ onSelectAction, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredCategories = actionCategories.map(category => ({
    ...category,
    actions: category.actions.filter(action => 
      action.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.actions.length > 0);

  const displayCategories = selectedCategory 
    ? filteredCategories.filter(c => c.id === selectedCategory)
    : filteredCategories;

  return (
    <div className="selection-panel action-panel">
      <div className="panel-header">
        <div className="panel-icon">
          <LucideIcons.Zap size={24} />
        </div>
        <h2>Choose an action</h2>
      </div>

      <div className="panel-search">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search actions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Pills */}
      <div className="category-pills">
        <button 
          className={`category-pill ${!selectedCategory ? 'active' : ''}`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {actionCategories.map(category => {
          const IconComponent = LucideIcons[category.icon] || LucideIcons.Circle;
          return (
            <button
              key={category.id}
              className={`category-pill ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <IconComponent size={14} />
              {category.name}
            </button>
          );
        })}
      </div>

      <div className="panel-content">
        {displayCategories.map(category => (
          <div key={category.id} className="action-category">
            <h3 className="category-title">{category.name}</h3>
            <div className="action-grid">
              {category.actions.map(action => {
                const IconComponent = LucideIcons[action.icon] || LucideIcons.Circle;
                
                return (
                  <button
                    key={action.id}
                    className="action-item"
                    onClick={() => onSelectAction(action)}
                  >
                    <div 
                      className="action-icon"
                      style={{ backgroundColor: action.color + '15', color: action.color }}
                    >
                      <IconComponent size={20} />
                    </div>
                    <span className="action-name">{action.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionPanel;
