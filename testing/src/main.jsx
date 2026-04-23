import React from 'react';
import ReactDOM from 'react-dom/client';
import TestingDashboardApp from '../../src/testing-dashboard/TestingDashboardApp.jsx';
import '../../src/testing-dashboard/testing-dashboard.css';

const params = new URLSearchParams(window.location.search);
const vertical = params.get('vertical') === 'hr' ? 'hr' : 'healthcare';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TestingDashboardApp vertical={vertical} />
  </React.StrictMode>
);
