import React from 'react';
import {
  Brain, Play, Clock, CheckCircle, XCircle,
  TrendingUp, BarChart3, AlertTriangle, RefreshCw
} from 'lucide-react';

const metrics = [
  { label: 'Active Workflows', value: '47', icon: Brain, color: '#7C3AED', change: '+5 this week' },
  { label: 'Agent Executions', value: '1,247', icon: Play, color: '#059669', change: 'This month' },
  { label: 'Clinical Hours Saved', value: '182 hrs', icon: Clock, color: '#D97706', change: 'This month' },
  { label: 'Success Rate', value: '98.2%', icon: CheckCircle, color: '#059669', change: '+0.3%' },
];

const recentExecutions = [
  {
    id: 1,
    name: 'Post-Discharge Follow-Up Workflow',
    status: 'success',
    time: 'Today 6:00 AM',
    duration: '2.3s',
    module: 'Clinical Care'
  },
  {
    id: 2,
    name: 'Daily EHR FHIR Data Ingestion',
    status: 'success',
    time: 'Today 5:45 AM',
    duration: '45.2s',
    module: 'Data Operations'
  },
  {
    id: 3,
    name: 'Appointment Reminder Batch',
    status: 'failed',
    time: 'Yesterday 4:30 PM',
    duration: '-',
    module: 'Patient Experience',
    error: 'SMS gateway timeout'
  },
  {
    id: 4,
    name: 'Readmission Risk Alert',
    status: 'success',
    time: 'Yesterday 2:00 PM',
    duration: '1.8s',
    module: 'Clinical Care'
  },
  {
    id: 5,
    name: 'Payer Claims Sync — Geisinger',
    status: 'success',
    time: 'Yesterday 9:00 AM',
    duration: '0.9s',
    module: 'RCM'
  },
  {
    id: 6,
    name: 'Patient Satisfaction Survey Delivery',
    status: 'success',
    time: 'Monday 8:00 AM',
    duration: '3.1s',
    module: 'Patient Experience'
  },
];

const workflowsByDomain = [
  { domain: 'Population Health', count: 15, color: '#7C3AED' },
  { domain: 'Clinical Care', count: 12, color: '#DC2626' },
  { domain: 'Patient Experience', count: 10, color: '#D97706' },
  { domain: 'Value-Based Care', count: 7, color: '#059669' },
  { domain: 'RCM', count: 3, color: '#0284C7' },
];

const adoptionData = [
  { month: 'Aug', flows: 12 },
  { month: 'Sep', flows: 18 },
  { month: 'Oct', flows: 25 },
  { month: 'Nov', flows: 32 },
  { month: 'Dec', flows: 41 },
  { month: 'Jan', flows: 47 },
];

const AnalyticsDashboard = ({ selectedClient }) => {
  const maxFlows = Math.max(...workflowsByDomain.map(p => p.count));
  const maxAdoption = Math.max(...adoptionData.map(d => d.flows));

  return (
    <div className="analytics-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Analytics</h1>
          <p>Monitor your healthcare automation performance and clinical impact</p>
        </div>
        <button className="refresh-btn">
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="metrics-grid">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div key={index} className="metric-card">
              <div className="metric-header">
                <div
                  className="metric-icon"
                  style={{ backgroundColor: metric.color + '15', color: metric.color }}
                >
                  <IconComponent size={20} />
                </div>
                <span className="metric-change">{metric.change}</span>
              </div>
              <div className="metric-value">{metric.value}</div>
              <div className="metric-label">{metric.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        {/* Adoption Chart */}
        <div className="chart-card">
          <h3>Automation Adoption</h3>
          <div className="line-chart">
            <div className="chart-y-axis">
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>
            <div className="chart-content">
              <svg viewBox="0 0 300 100" className="adoption-chart">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1B2B5E" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={`M 0 ${100 - (adoptionData[0].flows / maxAdoption) * 80}
                      ${adoptionData.map((d, i) =>
                        `L ${(i / (adoptionData.length - 1)) * 300} ${100 - (d.flows / maxAdoption) * 80}`
                      ).join(' ')}
                      L 300 100 L 0 100 Z`}
                  fill="url(#areaGradient)"
                />
                <path
                  d={`M 0 ${100 - (adoptionData[0].flows / maxAdoption) * 80}
                      ${adoptionData.map((d, i) =>
                        `L ${(i / (adoptionData.length - 1)) * 300} ${100 - (d.flows / maxAdoption) * 80}`
                      ).join(' ')}`}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {adoptionData.map((d, i) => (
                  <circle
                    key={i}
                    cx={(i / (adoptionData.length - 1)) * 300}
                    cy={100 - (d.flows / maxAdoption) * 80}
                    r="4"
                    fill="#7C3AED"
                    stroke="white"
                    strokeWidth="2"
                  />
                ))}
              </svg>
              <div className="chart-x-axis">
                {adoptionData.map((d, i) => (
                  <span key={i}>{d.month}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Domain Distribution Chart */}
        <div className="chart-card">
          <h3>Workflows by Domain</h3>
          <div className="bar-chart">
            {workflowsByDomain.map((item, index) => (
              <div key={index} className="bar-item">
                <span className="bar-label">{item.domain}</span>
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(item.count / maxFlows) * 100}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
                <span className="bar-value">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Executions */}
      <div className="executions-card">
        <div className="executions-header">
          <h3>Recent Executions</h3>
          <button className="view-all-btn">View all</button>
        </div>
        <div className="executions-list">
          {recentExecutions.map((execution) => (
            <div key={execution.id} className="execution-item">
              <div className="execution-status">
                {execution.status === 'success' ? (
                  <CheckCircle size={18} className="status-success" />
                ) : (
                  <XCircle size={18} className="status-failed" />
                )}
              </div>
              <div className="execution-info">
                <span className="execution-name">{execution.name}</span>
                <span className="execution-product">{execution.module}</span>
              </div>
              <div className="execution-time">{execution.time}</div>
              <div className="execution-duration">
                {execution.status === 'success' ? (
                  execution.duration
                ) : (
                  <span className="error-text">{execution.error}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
