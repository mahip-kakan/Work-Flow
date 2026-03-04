import React, { useState } from 'react';
import { ChevronDown, User, Bell } from 'lucide-react';

const orgs = [
  { id: 'all', name: 'All Organizations' },
  { id: 'optimus', name: 'Optimus Healthcare Partners' },
  { id: 'geisinger', name: 'Geisinger Health' },
  { id: 'banner', name: 'Banner Health' },
  { id: 'trinity', name: 'Trinity Health' },
  { id: 'cleveland', name: 'Cleveland Clinic' },
  { id: 'kaiser', name: 'Kaiser Permanente' },
];

const Header = ({ selectedClient, onClientChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentOrg = orgs.find(o => o.id === selectedClient) || orgs[1];

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="header-logo">
          <div className="logo-mark">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#1B2B5E"/>
              <path d="M16 5L6 11V21L16 27L26 21V11L16 5Z" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M16 5L16 27" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M6 11L26 21" stroke="#8B5CF6" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6"/>
              <path d="M26 11L6 21" stroke="#8B5CF6" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.6"/>
              <circle cx="16" cy="16" r="3" fill="#7C3AED"/>
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span className="logo-text" style={{ fontSize: 16, fontWeight: 700, color: '#1B2B5E', letterSpacing: '-0.3px' }}>Gravity</span>
            <span style={{ fontSize: 10, color: '#7C3AED', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase' }}>AI Studio</span>
          </div>
        </div>
      </div>

      <div className="header-right">
        <div className="client-selector">
          <span className="client-label">Org:</span>
          <button
            className="client-dropdown-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{currentOrg.name}</span>
            <ChevronDown size={16} className={isDropdownOpen ? 'rotated' : ''} />
          </button>

          {isDropdownOpen && (
            <>
              <div className="dropdown-backdrop" onClick={() => setIsDropdownOpen(false)} />
              <div className="client-dropdown">
                {orgs.map(org => (
                  <button
                    key={org.id}
                    className={`client-option ${org.id === selectedClient ? 'active' : ''}`}
                    onClick={() => {
                      onClientChange(org.id);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <span className="radio-dot" />
                    <span>{org.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <button className="header-icon-btn notification-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>

        <div className="user-avatar">
          <User size={20} />
        </div>
      </div>
    </header>
  );
};

export default Header;
