import React from 'react';
import ReactDOM from 'react-dom/client';
import TestingDashboardApp from '../../src/testing-dashboard/TestingDashboardApp.jsx';
import '../../src/testing-dashboard/testing-dashboard.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TestingDashboardApp />
  </React.StrictMode>
);
