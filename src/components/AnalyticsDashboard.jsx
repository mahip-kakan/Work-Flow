import React from 'react';
import { 
  Workflow, Play, Clock, CheckCircle, XCircle, 
  TrendingUp, BarChart3, AlertTriangle, RefreshCw
} from 'lucide-react';

const metrics = [
  { label: 'Active Flows', value: '47', icon: Workflow, color: '#4285f4', change: '+5 this week' },
  { label: 'Executions', value: '1,247', icon: Play, color: '#34a853', change: 'This month' },
  { label: 'Time Saved', value: '182 hrs', icon: Clock, color: '#f59e0b', change: 'This month' },
  { label: 'Success Rate', value: '98.2%', icon: CheckCircle, color: '#16a34a', change: '+0.3%' },
];

const recentExecutions = [
  { 
    id: 1, 
    name: 'Weekly Forecast Refresh', 
    status: 'success', 
    time: 'Today 6:00 AM', 
    duration: '2.3s',
    product: 'ItemSmart'
  },
  { 
    id: 2, 
    name: 'Daily Ingestion Pipeline', 
    status: 'success', 
    time: 'Today 5:45 AM', 
    duration: '45.2s',
    product: 'ItemSmart'
  },
  { 
    id: 3, 
    name: 'Low Inventory Alert', 
    status: 'failed', 
    time: 'Yesterday 4:30 PM', 
    duration: '-',
    product: 'InventorySmart',
    error: 'Connection timeout'
  },
  { 
    id: 4, 
    name: 'Plan Sync from PlanSmart', 
    status: 'success', 
    time: 'Yesterday 2:00 PM', 
    duration: '1.8s',
    product: 'PlanSmart'
  },
  { 
    id: 5, 
    name: 'Forecast Deviation Alert', 
    status: 'success', 
    time: 'Yesterday 9:00 AM', 
    duration: '0.9s',
    product: 'ItemSmart'
  },
  { 
    id: 6, 
    name: 'Weekly Business Summary', 
    status: 'success', 
    time: 'Monday 8:00 AM', 
    duration: '3.1s',
    product: 'MondaySmart'
  },
];

const flowsByProduct = [
  { product: 'ItemSmart', count: 15, color: '#0891b2' },
  { product: 'InventorySmart', count: 12, color: '#2563eb' },
  { product: 'MondaySmart', count: 10, color: '#f59e0b' },
  { product: 'PlanSmart', count: 6, color: '#16a34a' },
  { product: 'AssortSmart', count: 4, color: '#9333ea' },
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
  const maxFlows = Math.max(...flowsByProduct.map(p => p.count));
  const maxAdoption = Math.max(...adoptionData.map(d => d.flows));

  return (
    <div className="analytics-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Analytics</h1>
          <p>Monitor your automation performance and impact</p>
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
                    <stop offset="0%" stopColor="#4285f4" />
                    <stop offset="100%" stopColor="#34a853" />
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4285f4" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#4285f4" stopOpacity="0" />
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
                    fill="#4285f4"
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

        {/* Product Distribution Chart */}
        <div className="chart-card">
          <h3>Flows by Product</h3>
          <div className="bar-chart">
            {flowsByProduct.map((item, index) => (
              <div key={index} className="bar-item">
                <span className="bar-label">{item.product}</span>
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
                <span className="execution-product">{execution.product}</span>
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
