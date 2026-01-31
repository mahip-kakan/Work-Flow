import React, { useState } from 'react';
import { ChevronDown, User, Bell } from 'lucide-react';

const clients = [
  { id: 'all', name: 'All Clients' },
  { id: 'carters', name: "Carter's" },
  { id: 'tommy-bahama', name: 'Tommy Bahama' },
  { id: 'spanx', name: 'Spanx' },
  { id: 'briscoes', name: 'Briscoes' },
  { id: 'pacsun', name: 'Pacsun' },
  { id: 'arhaus', name: 'Arhaus' },
];

const Header = ({ selectedClient, onClientChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentClient = clients.find(c => c.id === selectedClient) || clients[1];

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="header-logo">
          <div className="logo-mark">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4285f4"/>
              <path d="M2 17L12 22L22 17" stroke="#4285f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#4285f4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logo-text">Impact Flow Studio</span>
        </div>
      </div>

      <div className="header-right">
        <div className="client-selector">
          <span className="client-label">Client:</span>
          <button 
            className="client-dropdown-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{currentClient.name}</span>
            <ChevronDown size={16} className={isDropdownOpen ? 'rotated' : ''} />
          </button>

          {isDropdownOpen && (
            <>
              <div className="dropdown-backdrop" onClick={() => setIsDropdownOpen(false)} />
              <div className="client-dropdown">
                {clients.map(client => (
                  <button
                    key={client.id}
                    className={`client-option ${client.id === selectedClient ? 'active' : ''}`}
                    onClick={() => {
                      onClientChange(client.id);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <span className="radio-dot" />
                    <span>{client.name}</span>
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
