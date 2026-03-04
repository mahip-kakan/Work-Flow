import React from 'react';
import { Plus, Home, BarChart3, Compass, Brain, Settings, HelpCircle, BookOpen } from 'lucide-react';

const Sidebar = ({ onNewFlow, activeView, setActiveView }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <Brain size={24} />
        </div>
      </div>

      <button
        className="new-flow-btn"
        onClick={onNewFlow}
        title="New Agent"
      >
        <Plus size={24} />
      </button>
      <span className="sidebar-label">New agent</span>

      <nav className="sidebar-nav">
        <button
          className={`nav-item ${activeView === 'home' ? 'active' : ''}`}
          onClick={() => setActiveView('home')}
          title="Home"
        >
          <Home size={22} />
        </button>
        <span className="sidebar-label">Home</span>

        <button
          className={`nav-item ${activeView === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveView('analytics')}
          title="Analytics"
        >
          <BarChart3 size={22} />
        </button>
        <span className="sidebar-label">Analytics</span>

        <button
          className={`nav-item ${activeView === 'discover' ? 'active' : ''}`}
          onClick={() => setActiveView('discover')}
          title="Discover"
        >
          <Compass size={22} />
        </button>
        <span className="sidebar-label">Discover</span>

        <button
          className={`nav-item ${activeView === 'my-flows' ? 'active' : ''}`}
          onClick={() => setActiveView('my-flows')}
          title="My Agents"
        >
          <Brain size={22} />
        </button>
        <span className="sidebar-label">My agents</span>

        <button
          className={`nav-item ${activeView === 'glossary' ? 'active' : ''}`}
          onClick={() => setActiveView('glossary')}
          title="Healthcare Glossary"
        >
          <BookOpen size={22} />
        </button>
        <span className="sidebar-label">Glossary</span>
      </nav>

      <div className="sidebar-bottom">
        <button className="nav-item" title="Settings">
          <Settings size={22} />
        </button>
        <button className="nav-item" title="Help">
          <HelpCircle size={22} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
