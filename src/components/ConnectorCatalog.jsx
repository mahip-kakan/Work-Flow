import React, { useState } from 'react';
import { Search, CheckCircle, ExternalLink, Plus } from 'lucide-react';
import { saasConnectors, connectorCategories } from '../data/saasConnectorCatalog';

const ConnectorCatalog = () => {
  const [connectors, setConnectors] = useState(saasConnectors);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');

  const handleConnect = (id) => {
    setConnectors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'connected' } : c))
    );
  };

  const filtered = connectors.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || c.status === 'connected';
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    return matchesSearch && matchesTab && matchesCategory;
  });

  const connectedCount = connectors.filter((c) => c.status === 'connected').length;

  return (
    <div className="connector-catalog">
      {/* Page header */}
      <div className="connector-catalog-header">
        <div className="connector-catalog-title">
          <h1>Connect Apps</h1>
          <p>Connect your SaaS apps to CloudEagle — AI will generate connectors from their API documentation</p>
        </div>
        <div className="connector-catalog-actions">
          <button type="button" className="connector-action-btn">
            <ExternalLink size={15} />
            Request App
          </button>
          <button type="button" className="connector-action-btn">
            <ExternalLink size={15} />
            Submit Your App
          </button>
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="connector-catalog-toolbar">
        <div className="connector-tabs">
          <button
            type="button"
            className={`connector-tab ${activeTab === 'All' ? 'active' : ''}`}
            onClick={() => setActiveTab('All')}
          >
            All
          </button>
          <button
            type="button"
            className={`connector-tab ${activeTab === 'Connected' ? 'active' : ''}`}
            onClick={() => setActiveTab('Connected')}
          >
            Connected
            {connectedCount > 0 && (
              <span className="connector-tab-badge">{connectedCount}</span>
            )}
          </button>
        </div>

        <div className="connector-search-wrap">
          <Search size={16} className="connector-search-icon" />
          <input
            type="text"
            className="connector-search"
            placeholder="Search apps..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Category filter pills */}
      <div className="connector-category-pills">
        {connectorCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`connector-category-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="connector-empty">
          <p>No apps found{searchTerm ? ` for "${searchTerm}"` : ''}.</p>
          <button type="button" className="connector-action-btn" onClick={() => { setSearchTerm(''); setActiveTab('All'); setActiveCategory('All'); }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="connector-grid">
          {filtered.map((connector) => (
            <ConnectorCard
              key={connector.id}
              connector={connector}
              onConnect={handleConnect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ConnectorCard = ({ connector, onConnect }) => {
  const isConnected = connector.status === 'connected';

  return (
    <div className={`connector-card ${isConnected ? 'connector-card--connected' : ''}`}>
      <div className="connector-card-logo">
        <div
          className="connector-logo-badge"
          style={{
            backgroundColor: connector.logoColor + '18',
            color: connector.logoColor,
            border: `1.5px solid ${connector.logoColor}30`
          }}
        >
          <span className="connector-logo-letter">{connector.logoLetter}</span>
        </div>
      </div>

      <div className="connector-card-info">
        <span className="connector-card-name">{connector.name}</span>
        <span className="connector-card-category">{connector.category}</span>
      </div>

      <div className="connector-card-action">
        {isConnected ? (
          <span className="connector-active-badge">
            <CheckCircle size={13} />
            Active
          </span>
        ) : (
          <button
            type="button"
            className="connector-connect-btn"
            onClick={() => onConnect(connector.id)}
          >
            <Plus size={13} />
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectorCatalog;
