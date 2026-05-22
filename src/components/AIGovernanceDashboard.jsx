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

// Chart dimensions with proper margins
const CW = 620, CH = 200;
const ML = 52, MR = 24, MT = 16, MB = 32;
const PW = CW - ML - MR;
const PH = CH - MT - MB;

// Data: monthly spend values ($ thousands) for each series
const MONTHS = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
const SEAT_DATA    = [31.2, 31.8, 32.1, 32.5, 32.8, 33.2];
const CONSUME_DATA = [12.4, 16.1, 21.8, 29.5, 38.1, 47.3];
const EMBEDDED_DATA= [8.2,  9.6,  11.8, 14.5, 18.2, 23.1];

const Y_MAX = 55, Y_MIN = 0;
const Y_TICKS = [0, 10, 20, 30, 40, 50];

function xPos(i) { return ML + (i / (MONTHS.length - 1)) * PW; }
function yPos(v) { return MT + PH - ((v - Y_MIN) / (Y_MAX - Y_MIN)) * PH; }

function toPath(data) {
  return data.map((v, i) => `${i === 0 ? 'M' : 'L'}${xPos(i).toFixed(1)},${yPos(v).toFixed(1)}`).join(' ');
}

function toArea(data) {
  const line = data.map((v, i) => `${xPos(i).toFixed(1)},${yPos(v).toFixed(1)}`).join(' ');
  const base = `${xPos(data.length - 1).toFixed(1)},${yPos(0).toFixed(1)} ${xPos(0).toFixed(1)},${yPos(0).toFixed(1)}`;
  return `M ${line} L ${base} Z`;
}

function SparklineChart() {
  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} width="100%" height={CH} aria-hidden="true"
      style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="grad-consume" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2552A" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#E2552A" stopOpacity="0.01"/>
        </linearGradient>
        <linearGradient id="grad-seat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1F3A57" stopOpacity="0.07"/>
          <stop offset="100%" stopColor="#1F3A57" stopOpacity="0.01"/>
        </linearGradient>
      </defs>

      {/* Y-axis gridlines + labels */}
      {Y_TICKS.map(t => (
        <g key={t}>
          <line x1={ML} y1={yPos(t)} x2={ML + PW} y2={yPos(t)}
            stroke={t === 0 ? '#D1CCBF' : '#EEEAD8'} strokeWidth={t === 0 ? 1 : 1} />
          <text x={ML - 8} y={yPos(t) + 4} textAnchor="end"
            fontSize="10" fill="#9B9580" fontFamily="ui-sans-serif, system-ui, sans-serif">
            ${t}k
          </text>
        </g>
      ))}

      {/* X-axis month labels */}
      {MONTHS.map((m, i) => (
        <text key={m} x={xPos(i)} y={CH - 6} textAnchor="middle"
          fontSize="11" fill="#9B9580" fontFamily="ui-sans-serif, system-ui, sans-serif">
          {m}
        </text>
      ))}

      {/* Area fills */}
      <path d={toArea(SEAT_DATA)} fill="url(#grad-seat)" />
      <path d={toArea(CONSUME_DATA)} fill="url(#grad-consume)" />

      {/* Lines */}
      <path d={toPath(SEAT_DATA)} fill="none" stroke="#1F3A57" strokeWidth="2"
        strokeLinejoin="round" strokeLinecap="round" />
      <path d={toPath(EMBEDDED_DATA)} fill="none" stroke="#B98A20" strokeWidth="1.8"
        strokeDasharray="5 3" strokeLinejoin="round" strokeLinecap="round" />
      <path d={toPath(CONSUME_DATA)} fill="none" stroke="#E2552A" strokeWidth="2.2"
        strokeLinejoin="round" strokeLinecap="round" />

      {/* End dot + callout on consumption line */}
      <circle cx={xPos(5)} cy={yPos(CONSUME_DATA[5])} r="4.5" fill="#E2552A" />
      <rect x={xPos(5) - 52} y={yPos(CONSUME_DATA[5]) - 22} width={50} height={18}
        rx="4" fill="#E2552A" />
      <text x={xPos(5) - 27} y={yPos(CONSUME_DATA[5]) - 10} textAnchor="middle"
        fontSize="10" fill="#fff" fontWeight="600"
        fontFamily="ui-sans-serif, system-ui, sans-serif">
        +38% MoM
      </text>
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
