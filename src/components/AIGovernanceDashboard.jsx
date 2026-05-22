import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Eye, ChevronDown, ChevronUp, Zap, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const SURFACES = [
  {
    id: 'openai-gpt4',
    name: 'OpenAI · GPT-4 Turbo',
    type: 'Direct API · 4 users',
    category: 'LLM API',
    spend: '$18,420',
    risk: 'spike',
    riskLabel: 'Spend spike',
    status: 'sanctioned',
    color: '#10A37F',
    letter: 'O',
  },
  {
    id: 'anthropic-claude',
    name: 'Anthropic · Claude',
    type: 'Workspace + API',
    category: 'LLM API',
    spend: '$12,880',
    risk: 'healthy',
    riskLabel: 'Healthy',
    status: 'sanctioned',
    color: '#C96442',
    letter: 'A',
  },
  {
    id: 'cursor',
    name: 'Cursor · Team plan',
    type: '22 active seats',
    category: 'AI Copilot',
    spend: '$880',
    risk: 'healthy',
    riskLabel: 'Healthy',
    status: 'sanctioned',
    color: '#0B5CFF',
    letter: 'C',
  },
  {
    id: 'perplexity',
    name: 'Perplexity Pro',
    type: '7 users · personal cards',
    category: 'AI Search',
    spend: '$140',
    risk: 'pii',
    riskLabel: 'PII pasted',
    status: 'shadow',
    color: '#111',
    letter: 'P',
  },
  {
    id: 'notion-ai',
    name: 'Notion AI add-on',
    type: 'Embedded · 312 seats',
    category: 'Embedded AI',
    spend: '$3,120',
    risk: 'warn',
    riskLabel: 'Low usage',
    status: 'sanctioned',
    color: '#6A4FB6',
    letter: 'N',
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    type: 'Enterprise · 38 seats',
    category: 'AI Copilot',
    spend: '$760',
    risk: 'healthy',
    riskLabel: 'Healthy',
    status: 'sanctioned',
    color: '#24292E',
    letter: 'G',
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    type: '3 users · personal cards',
    category: 'AI Creative',
    spend: '$90',
    risk: 'warn',
    riskLabel: 'Unreviewed',
    status: 'shadow',
    color: '#7E5BEF',
    letter: 'M',
  },
];

const RISK_COLORS = {
  healthy: { bg: '#E3F1E8', text: '#2E7A4D', border: '#2E7A4D' },
  spike:   { bg: '#FFF3E0', text: '#B45309', border: '#B45309' },
  pii:     { bg: '#FBE5E2', text: '#B33A2C', border: '#B33A2C' },
  warn:    { bg: '#FEF3C7', text: '#92400E', border: '#92400E' },
};

const STATUS_COLORS = {
  sanctioned: { bg: '#E3F1E8', text: '#2E7A4D', border: '#2E7A4D' },
  shadow:     { bg: '#FDE8E0', text: '#C2410C', border: '#C2410C' },
};

function Badge({ type, label, colorMap }) {
  const c = colorMap[type] || colorMap['healthy'];
  return (
    <span style={{
      display: 'inline-block',
      fontSize: 11,
      padding: '2px 8px',
      borderRadius: 4,
      border: `1px solid ${c.border}`,
      background: c.bg,
      color: c.text,
      fontWeight: 500,
      whiteSpace: 'nowrap',
    }}>{label}</span>
  );
}

function SparklineChart() {
  // Simple SVG inline chart mirroring the HTML version
  return (
    <svg viewBox="0 0 600 130" preserveAspectRatio="none" aria-hidden="true"
      style={{ width: '100%', height: 130, display: 'block' }}>
      <g stroke="#EFE9DA" strokeWidth="1">
        <line x1="0" y1="20" x2="600" y2="20"/>
        <line x1="0" y1="55" x2="600" y2="55"/>
        <line x1="0" y1="90" x2="600" y2="90"/>
        <line x1="0" y1="125" x2="600" y2="125"/>
      </g>
      {/* seat-based (flat) */}
      <polyline fill="none" stroke="#1F3A57" strokeWidth="2.2"
        points="10,55 110,52 210,50 310,48 410,46 510,44 590,42"/>
      {/* consumption-based (rising) */}
      <polyline fill="none" stroke="#E2552A" strokeWidth="2.4"
        points="10,112 110,106 210,94 310,78 410,56 510,34 590,14"/>
      {/* embedded add-ons (dashed) */}
      <polyline fill="none" stroke="#B98A20" strokeWidth="2" strokeDasharray="4 3"
        points="10,122 110,118 210,112 310,102 410,89 510,74 590,62"/>
      <g fill="#9B9580" fontSize="9" fontFamily="monospace">
        <text x="10" y="128">Dec</text><text x="110" y="128">Jan</text>
        <text x="210" y="128">Feb</text><text x="310" y="128">Mar</text>
        <text x="410" y="128">Apr</text><text x="510" y="128">May</text>
      </g>
      <circle cx="590" cy="14" r="4" fill="#E2552A"/>
      <text x="500" y="11" fill="#E2552A" fontSize="9" fontFamily="monospace">+38% MoM</text>
    </svg>
  );
}

export default function AIGovernanceDashboard() {
  const [timeframe, setTimeframe] = useState('month');
  const [recDismissed, setRecDismissed] = useState(false);
  const [recApproved, setRecApproved] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('spend');

  const filtered = SURFACES
    .filter(s => filterStatus === 'all' || s.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'spend') return parseFloat(b.spend.replace(/[$,]/g, '')) - parseFloat(a.spend.replace(/[$,]/g, ''));
      if (sortBy === 'risk') {
        const order = { pii: 0, spike: 1, warn: 2, healthy: 3 };
        return (order[a.risk] ?? 9) - (order[b.risk] ?? 9);
      }
      return 0;
    });

  return (
    <div className="ai-gov-root">
      {/* Page header */}
      <div className="ai-gov-header">
        <div>
          <div className="ai-gov-breadcrumb">EagleEye / <span>AI Surfaces</span></div>
          <h1 className="ai-gov-title">AI Spend &amp; Risk</h1>
        </div>
        <div className="ai-gov-timeframe">
          {['month', '90d', 'ytd'].map(t => (
            <button key={t} className={`ag-tf-btn${timeframe === t ? ' active' : ''}`} onClick={() => setTimeframe(t)}>
              {t === 'month' ? 'This month' : t === '90d' ? 'Last 90 days' : 'YTD'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI tiles */}
      <div className="ai-gov-tiles">
        <div className="ag-tile">
          <div className="ag-tile-label">AI Spend (MTD)</div>
          <div className="ag-tile-value">$47,329</div>
          <div className="ag-tile-delta ag-delta-bad">
            <TrendingUp size={12} style={{marginRight:3}}/> +38% vs last month
          </div>
        </div>
        <div className="ag-tile">
          <div className="ag-tile-label">AI Surfaces Discovered</div>
          <div className="ag-tile-value">38</div>
          <div className="ag-tile-delta ag-delta-neutral">12 sanctioned · 26 shadow</div>
        </div>
        <div className="ag-tile">
          <div className="ag-tile-label">DLP Risk Events (7d)</div>
          <div className="ag-tile-value">12</div>
          <div className="ag-tile-delta ag-delta-bad">
            <AlertTriangle size={12} style={{marginRight:3}}/> 3 high · 9 medium
          </div>
        </div>
        <div className="ag-tile">
          <div className="ag-tile-label">Forecast Variance</div>
          <div className="ag-tile-value">±9%</div>
          <div className="ag-tile-delta ag-delta-good">
            <TrendingDown size={12} style={{marginRight:3}}/> ↓ from ±54% pre-EagleEye
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="ag-panel">
        <div className="ag-panel-head">
          <span className="ag-panel-title">Spend composition</span>
          <span className="ag-panel-sub">Seat-based vs consumption-based · last 6 months</span>
        </div>
        <div className="ag-legend">
          <span><span className="ag-sw" style={{background:'#1F3A57'}}/> Seat-based SaaS</span>
          <span><span className="ag-sw" style={{background:'#E2552A'}}/> Consumption-based AI</span>
          <span><span className="ag-sw ag-sw-dashed" style={{background:'#B98A20'}}/> Embedded AI add-ons</span>
        </div>
        <SparklineChart />
      </div>

      {/* EagleEye recommendation */}
      {!recDismissed && !recApproved && (
        <div className="ag-rec">
          <div className="ag-rec-eye">
            <Eye size={18} color="#fff" />
          </div>
          <div className="ag-rec-body">
            <div className="ag-rec-title">EagleEye recommendation · save ~$8,400 / month</div>
            <div className="ag-rec-sub">
              12 users on <strong>GPT-4 Turbo</strong> show prompts matching summarisation &amp; extraction tasks.
              Routing this workload to <strong>Claude Haiku</strong> retains quality and reduces consumption cost
              by an estimated 72%. Roll out as a 2-week canary.
            </div>
          </div>
          <div className="ag-rec-actions">
            <button className="ag-btn" onClick={() => setRecDismissed(true)}>Dismiss</button>
            <button className="ag-btn ag-btn-primary" onClick={() => setRecApproved(true)}>
              Approve → Slack
            </button>
          </div>
        </div>
      )}
      {recApproved && (
        <div className="ag-rec ag-rec-approved">
          <CheckCircle size={20} color="#2E7A4D" />
          <span style={{marginLeft:10, fontSize:14, color:'#2E7A4D', fontWeight:500}}>
            Canary rollout approved — workflow sent to #it-integrations on Slack.
          </span>
        </div>
      )}

      {/* Table toolbar */}
      <div className="ag-table-toolbar">
        <span className="ag-table-heading">AI Surfaces</span>
        <div className="ag-table-controls">
          <div className="ag-filter-group">
            {['all', 'sanctioned', 'shadow'].map(f => (
              <button key={f} className={`ag-filter-btn${filterStatus === f ? ' active' : ''}`}
                onClick={() => setFilterStatus(f)}>
                {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <select className="ag-sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="spend">Sort: Spend</option>
            <option value="risk">Sort: Risk</option>
          </select>
        </div>
      </div>

      {/* Surfaces table */}
      <div className="ag-table">
        <div className="ag-table-head ag-table-row">
          <div>AI Surface</div>
          <div>Category</div>
          <div>Spend (MTD)</div>
          <div>Risk</div>
          <div>Status</div>
        </div>
        {filtered.map(s => (
          <div className="ag-table-row ag-table-data-row" key={s.id}>
            <div className="ag-app">
              <div className="ag-app-ico" style={{ background: s.color }}>{s.letter}</div>
              <div className="ag-app-meta">
                <span className="ag-app-name">{s.name}</span>
                <span className="ag-app-type">{s.type}</span>
              </div>
            </div>
            <div className="ag-cell-muted">{s.category}</div>
            <div className="ag-cell-mono">{s.spend}</div>
            <div><Badge type={s.risk} label={s.riskLabel} colorMap={RISK_COLORS} /></div>
            <div><Badge type={s.status} label={s.status === 'sanctioned' ? 'Sanctioned' : 'Shadow'} colorMap={STATUS_COLORS} /></div>
          </div>
        ))}
      </div>

      {/* DLP risk events */}
      <div className="ag-panel ag-risk-panel">
        <div className="ag-panel-head">
          <span className="ag-panel-title">DLP Risk Events</span>
          <span className="ag-risk-count">3 high · 9 medium</span>
        </div>
        <div className="ag-risk-list">
          {[
            { sev: 'high',   tool: 'Perplexity Pro', user: 'ananya.s@acme.com',   event: 'Customer PII pasted into public LLM prompt', time: '2h ago' },
            { sev: 'high',   tool: 'ChatGPT (shadow)', user: 'raj.k@acme.com',    event: 'Internal HR data submitted to public model', time: '5h ago' },
            { sev: 'high',   tool: 'Midjourney',     user: 'priya.m@acme.com',    event: 'Unreviewed shadow tool handling design assets', time: '1d ago' },
            { sev: 'medium', tool: 'OpenAI API',     user: 'dev-team@acme.com',   event: 'Spend spike: +3.8× above 30-day baseline', time: '6h ago' },
            { sev: 'medium', tool: 'Notion AI',      user: 'org-wide',            event: 'Low-usage signal: 218/312 seats inactive 30d', time: '1d ago' },
          ].map((ev, i) => (
            <div className="ag-risk-row" key={i}>
              <div className={`ag-sev-dot ag-sev-${ev.sev}`} />
              <div className="ag-risk-tool">{ev.tool}</div>
              <div className="ag-risk-event">{ev.event}</div>
              <div className="ag-risk-user">{ev.user}</div>
              <div className="ag-risk-time">{ev.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
