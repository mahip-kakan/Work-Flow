import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Eye, Info, MessageSquare, X } from 'lucide-react';

// ─── Data per timeframe ───────────────────────────────────────────────────────
const TIMEFRAME_DATA = {
  month: {
    label: 'This month',
    spend: '$47,329', spendDelta: '+38%', spendDeltaDir: 'bad',
    surfaces: 38, sanctioned: 12, shadow: 26,
    dlp: 12, dlpHigh: 3, dlpMed: 9,
    variance: '±9%', variancePrev: '±54%',
    chartMonths: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
    seat:     [31.2, 31.8, 32.1, 32.5, 32.8, 33.2],
    consume:  [12.4, 16.1, 21.8, 29.5, 38.1, 47.3],
    embedded: [8.2,   9.6, 11.8, 14.5, 18.2, 23.1],
    yMax: 55, yTicks: [0, 10, 20, 30, 40, 50],
    momLabel: '+38% MoM',
  },
  '90d': {
    label: 'Last 90 days',
    spend: '$112,840', spendDelta: '+61%', spendDeltaDir: 'bad',
    surfaces: 44, sanctioned: 14, shadow: 30,
    dlp: 31, dlpHigh: 8, dlpMed: 23,
    variance: '±14%', variancePrev: '±62%',
    chartMonths: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    seat:     [32.5, 32.8, 33.2, 33.6, 34.0, 34.5],
    consume:  [29.5, 38.1, 47.3, 58.0, 70.2, 84.1],
    embedded: [14.5, 18.2, 23.1, 28.4, 34.0, 40.5],
    yMax: 100, yTicks: [0, 20, 40, 60, 80],
    momLabel: '+61% QoQ',
  },
  ytd: {
    label: 'YTD',
    spend: '$284,100', spendDelta: '+112%', spendDeltaDir: 'bad',
    surfaces: 51, sanctioned: 18, shadow: 33,
    dlp: 74, dlpHigh: 19, dlpMed: 55,
    variance: '±11%', variancePrev: '±70%',
    chartMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    seat:     [31.8, 32.1, 32.5, 32.8, 33.2, 33.6],
    consume:  [14.2, 19.8, 28.6, 40.1, 56.4, 72.8],
    embedded: [9.0, 11.5, 14.2, 18.0, 22.6, 27.4],
    yMax: 90, yTicks: [0, 20, 40, 60, 80],
    momLabel: '+112% YoY',
  },
};

// ─── Badge component ──────────────────────────────────────────────────────────
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
    <span style={{ display:'inline-block', fontSize:11, padding:'2px 8px', borderRadius:4,
      border:`1px solid ${c.border}`, background:c.bg, color:c.text, fontWeight:500, whiteSpace:'nowrap' }}>
      {label}
    </span>
  );
}

// ─── Surfaces table data ──────────────────────────────────────────────────────
const SURFACES = [
  { id:'openai-gpt4',      name:'OpenAI · GPT-4 Turbo',   type:'Direct API · 4 users',        category:'LLM API',      spend:18420, spendFmt:'$18,420', risk:'spike',   riskLabel:'Spend spike', status:'sanctioned', color:'#10A37F', letter:'O' },
  { id:'anthropic-claude', name:'Anthropic · Claude',      type:'Workspace + API',              category:'LLM API',      spend:12880, spendFmt:'$12,880', risk:'healthy', riskLabel:'Healthy',     status:'sanctioned', color:'#C96442', letter:'A' },
  { id:'cursor',           name:'Cursor · Team plan',      type:'22 active seats',              category:'AI Copilot',   spend:880,   spendFmt:'$880',    risk:'healthy', riskLabel:'Healthy',     status:'sanctioned', color:'#0B5CFF', letter:'C' },
  { id:'perplexity',       name:'Perplexity Pro',          type:'7 users · personal cards',     category:'AI Search',    spend:140,   spendFmt:'$140',    risk:'pii',     riskLabel:'PII pasted',  status:'shadow',     color:'#111',    letter:'P' },
  { id:'notion-ai',        name:'Notion AI add-on',        type:'Embedded · 312 seats',         category:'Embedded AI',  spend:3120,  spendFmt:'$3,120',  risk:'warn',    riskLabel:'Low usage',   status:'sanctioned', color:'#6A4FB6', letter:'N' },
  { id:'github-copilot',   name:'GitHub Copilot',          type:'Enterprise · 38 seats',        category:'AI Copilot',   spend:760,   spendFmt:'$760',    risk:'healthy', riskLabel:'Healthy',     status:'sanctioned', color:'#24292E', letter:'G' },
  { id:'midjourney',       name:'Midjourney',              type:'3 users · personal cards',     category:'AI Creative',  spend:90,    spendFmt:'$90',     risk:'warn',    riskLabel:'Unreviewed',  status:'shadow',     color:'#7E5BEF', letter:'M' },
];

// ─── Animated chart ───────────────────────────────────────────────────────────
const CW = 600, CH = 190, ML = 48, MR = 20, MT = 12, MB = 28;
const PW = CW - ML - MR, PH = CH - MT - MB;

function calcPaths(data, yMin, yMax) {
  const xP = (i) => ML + (i / (data.seat.length - 1)) * PW;
  const yP = (v) => MT + PH - ((v - yMin) / (yMax - yMin)) * PH;
  const toD = (d) => d.map((v,i) => `${i===0?'M':'L'}${xP(i).toFixed(1)},${yP(v).toFixed(1)}`).join(' ');
  const toArea = (d) => {
    const pts = d.map((v,i) => `${xP(i).toFixed(1)},${yP(v).toFixed(1)}`).join(' ');
    return `M ${pts} L ${xP(d.length-1).toFixed(1)},${yP(yMin).toFixed(1)} ${xP(0).toFixed(1)},${yP(yMin).toFixed(1)} Z`;
  };
  return {
    xP, yP,
    seatD:     toD(data.seat),
    consumeD:  toD(data.consume),
    embeddedD: toD(data.embedded),
    seatArea:  toArea(data.seat),
    consumeArea: toArea(data.consume),
  };
}

function SpendChart({ data, animKey }) {
  const { xP, yP, seatD, consumeD, embeddedD, seatArea, consumeArea } = calcPaths(data, 0, data.yMax);
  const lastX = xP(data.seat.length - 1);
  const lastY = yP(data.consume[data.consume.length - 1]);

  // Animate lines via stroke-dasharray trick using CSS animation class driven by animKey
  const seatRef   = useRef(null);
  const consumeRef = useRef(null);
  const embeddedRef = useRef(null);

  useEffect(() => {
    [seatRef, consumeRef, embeddedRef].forEach(ref => {
      if (!ref.current) return;
      const len = ref.current.getTotalLength?.() ?? 600;
      ref.current.style.strokeDasharray  = len;
      ref.current.style.strokeDashoffset = len;
      ref.current.style.transition = 'none';
      // force reflow
      void ref.current.getBoundingClientRect();
      ref.current.style.transition = 'stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1)';
      ref.current.style.strokeDashoffset = 0;
    });
  }, [animKey]);

  return (
    <svg viewBox={`0 0 ${CW} ${CH}`} width="100%" height={CH}
      style={{ display:'block', overflow:'visible' }}>
      <defs>
        <linearGradient id="gc-consume" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2552A" stopOpacity="0.13"/>
          <stop offset="100%" stopColor="#E2552A" stopOpacity="0.01"/>
        </linearGradient>
        <linearGradient id="gc-seat" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1F3A57" stopOpacity="0.06"/>
          <stop offset="100%" stopColor="#1F3A57" stopOpacity="0.01"/>
        </linearGradient>
      </defs>

      {/* gridlines + Y labels */}
      {data.yTicks.map(t => (
        <g key={t}>
          <line x1={ML} y1={yP(t)} x2={ML+PW} y2={yP(t)}
            stroke={t===0?'#D0CBBE':'#EDE9D8'} strokeWidth="1"/>
          <text x={ML-8} y={yP(t)+4} textAnchor="end" fontSize="10"
            fill="#A09A8A" fontFamily="ui-sans-serif,system-ui,sans-serif">${t}k</text>
        </g>
      ))}

      {/* X labels */}
      {data.chartMonths.map((m,i) => (
        <text key={m+i} x={xP(i)} y={CH-4} textAnchor="middle" fontSize="11"
          fill="#A09A8A" fontFamily="ui-sans-serif,system-ui,sans-serif">{m}</text>
      ))}

      {/* Area fills */}
      <path key={`sa-${animKey}`} d={seatArea}    fill="url(#gc-seat)" />
      <path key={`ca-${animKey}`} d={consumeArea} fill="url(#gc-consume)" />

      {/* Lines — animated */}
      <path key={`sl-${animKey}`} ref={seatRef}     d={seatD}     fill="none" stroke="#1F3A57" strokeWidth="2"   strokeLinejoin="round" strokeLinecap="round"/>
      <path key={`el-${animKey}`} ref={embeddedRef} d={embeddedD} fill="none" stroke="#B98A20" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="5 3"/>
      <path key={`cl-${animKey}`} ref={consumeRef}  d={consumeD}  fill="none" stroke="#E2552A" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"/>

      {/* End dot */}
      <circle cx={lastX} cy={lastY} r="5" fill="#E2552A"/>
      {/* Callout pill */}
      <rect x={lastX-58} y={lastY-24} width={56} height={18} rx="5" fill="#E2552A"/>
      <text x={lastX-30} y={lastY-12} textAnchor="middle" fontSize="10" fontWeight="700"
        fill="#fff" fontFamily="ui-sans-serif,system-ui,sans-serif">{data.momLabel}</text>
    </svg>
  );
}

// ─── DLP tooltip ──────────────────────────────────────────────────────────────
function DlpTooltip() {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position:'relative', display:'inline-flex', alignItems:'center', marginLeft:6 }}>
      <button onClick={() => setOpen(o => !o)} style={{ background:'none', border:'none', cursor:'pointer',
        padding:0, display:'flex', alignItems:'center', color:'#94a3b8' }}>
        <Info size={14}/>
      </button>
      {open && (
        <div style={{ position:'absolute', bottom:'calc(100% + 6px)', left:'50%', transform:'translateX(-50%)',
          width:260, background:'#1e293b', color:'#e2e8f0', fontSize:12, lineHeight:1.5,
          padding:'10px 12px', borderRadius:8, zIndex:20, boxShadow:'0 4px 20px rgba(0,0,0,0.25)' }}>
          <strong style={{color:'#f8fafc', display:'block', marginBottom:4}}>What is DLP?</strong>
          Data Loss Prevention — detects when sensitive information (PII, customer data, credentials) may be
          leaving your organisation via AI tools, public models, or unsanctioned apps.
          <br/><br/>
          <strong style={{color:'#f8fafc'}}>Risk levels:</strong><br/>
          🔴 High — confirmed data exposure or policy violation<br/>
          🟡 Medium — anomaly or unreviewed tool behaviour
          <button onClick={() => setOpen(false)} style={{ position:'absolute', top:6, right:8,
            background:'none', border:'none', cursor:'pointer', color:'#94a3b8', padding:0 }}>
            <X size={12}/>
          </button>
        </div>
      )}
    </span>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AIGovernanceDashboard({ onOpenChat }) {
  const [timeframe, setTimeframe]       = useState('month');
  const [animKey, setAnimKey]           = useState(0);
  const [recDismissed, setRecDismissed] = useState(false);
  const [recApproved, setRecApproved]   = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy]             = useState('spend');

  const d = TIMEFRAME_DATA[timeframe];

  function switchTimeframe(t) {
    setTimeframe(t);
    setAnimKey(k => k + 1);
  }

  const filtered = SURFACES
    .filter(s => filterStatus === 'all' || s.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'spend') return b.spend - a.spend;
      if (sortBy === 'risk') {
        const order = { pii:0, spike:1, warn:2, healthy:3 };
        return (order[a.risk]??9) - (order[b.risk]??9);
      }
      return 0;
    });

  return (
    <div className="ai-gov-root">

      {/* Header */}
      <div className="ai-gov-header">
        <div>
          <div className="ai-gov-breadcrumb">EagleEye / <span>AI Surfaces</span></div>
          <h1 className="ai-gov-title">AI Spend &amp; Risk</h1>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          {onOpenChat && (
            <button className="ag-chat-trigger-btn" onClick={() => onOpenChat('Show me AI spend anomalies and suggest what to do')}>
              <MessageSquare size={14} style={{marginRight:6}}/> Ask AI assistant
            </button>
          )}
          <div className="ai-gov-timeframe">
            {['month','90d','ytd'].map(t => (
              <button key={t} className={`ag-tf-btn${timeframe===t?' active':''}`} onClick={() => switchTimeframe(t)}>
                {t==='month'?'This month':t==='90d'?'Last 90 days':'YTD'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI tiles */}
      <div className="ai-gov-tiles">
        <div className="ag-tile">
          <div className="ag-tile-label">AI Spend ({d.label})</div>
          <div className="ag-tile-value">{d.spend}</div>
          <div className={`ag-tile-delta ag-delta-${d.spendDeltaDir}`}>
            <TrendingUp size={12} style={{marginRight:3}}/>{d.spendDelta} vs prior period
          </div>
        </div>
        <div className="ag-tile">
          <div className="ag-tile-label">AI Surfaces Discovered</div>
          <div className="ag-tile-value">{d.surfaces}</div>
          <div className="ag-tile-delta ag-delta-neutral">{d.sanctioned} sanctioned · {d.shadow} shadow</div>
        </div>
        <div className="ag-tile">
          <div className="ag-tile-label" style={{display:'flex',alignItems:'center'}}>
            DLP Risk Events
            <DlpTooltip/>
          </div>
          <div className="ag-tile-value">{d.dlp}</div>
          <div className="ag-tile-delta ag-delta-bad">
            <AlertTriangle size={12} style={{marginRight:3}}/>{d.dlpHigh} high · {d.dlpMed} medium
          </div>
        </div>
        <div className="ag-tile">
          <div className="ag-tile-label">Forecast Variance</div>
          <div className="ag-tile-value">{d.variance}</div>
          <div className="ag-tile-delta ag-delta-good">
            <TrendingDown size={12} style={{marginRight:3}}/> ↓ from {d.variancePrev} pre-EagleEye
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="ag-panel">
        <div className="ag-panel-head">
          <span className="ag-panel-title">Spend composition</span>
          <span className="ag-panel-sub">Seat-based vs consumption-based · {d.label}</span>
        </div>
        <div className="ag-legend">
          <span><span className="ag-sw" style={{background:'#1F3A57'}}/> Seat-based SaaS</span>
          <span><span className="ag-sw" style={{background:'#E2552A'}}/> Consumption-based AI</span>
          <span><span className="ag-sw" style={{background:'#B98A20', opacity:0.7}}/> Embedded AI add-ons</span>
        </div>
        <SpendChart data={d} animKey={animKey}/>
      </div>

      {/* EagleEye recommendation */}
      {!recDismissed && !recApproved && (
        <div className="ag-rec">
          <div className="ag-rec-eye"><Eye size={18} color="#fff"/></div>
          <div className="ag-rec-body">
            <div className="ag-rec-title">EagleEye recommendation · save ~$8,400 / month</div>
            <div className="ag-rec-sub">
              12 users on <strong>GPT-4 Turbo</strong> show prompts matching summarisation &amp; extraction tasks.
              Routing to <strong>Claude Haiku</strong> retains quality and reduces cost by ~72%. Roll out as a 2-week canary.
            </div>
          </div>
          <div className="ag-rec-actions">
            <button className="ag-btn" onClick={() => setRecDismissed(true)}>Dismiss</button>
            <button className="ag-btn ag-btn-primary" onClick={() => setRecApproved(true)}>Approve → Slack</button>
          </div>
        </div>
      )}
      {recApproved && (
        <div className="ag-rec ag-rec-approved">
          <CheckCircle size={20} color="#2E7A4D"/>
          <span style={{marginLeft:10, fontSize:14, color:'#2E7A4D', fontWeight:500}}>
            Canary rollout approved — workflow sent to #it-integrations on Slack.
          </span>
        </div>
      )}

      {/* AI agent quick-actions */}
      <div className="ag-agent-strip">
        <span className="ag-agent-label"><Eye size={13} style={{marginRight:5}}/>Ask EagleEye to act:</span>
        {[
          { label:'Revoke idle API keys', msg:'Identify and revoke API keys that have been idle for 30+ days' },
          { label:'Swap GPT-4 → Haiku canary', msg:'Set up a 2-week canary to route summarisation workloads from GPT-4 Turbo to Claude Haiku' },
          { label:'Review shadow tools', msg:'List all shadow AI tools discovered this month and recommend which to sanction or block' },
          { label:'File access review', msg:'File an access review for all high-risk AI surfaces with PII exposure events' },
        ].map(a => (
          <button key={a.label} className="ag-agent-chip"
            onClick={() => onOpenChat && onOpenChat(a.msg)}>
            {a.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="ag-table-toolbar">
        <span className="ag-table-heading">AI Surfaces</span>
        <div className="ag-table-controls">
          <div className="ag-filter-group">
            {['all','sanctioned','shadow'].map(f => (
              <button key={f} className={`ag-filter-btn${filterStatus===f?' active':''}`}
                onClick={() => setFilterStatus(f)}>
                {f==='all'?'All':f.charAt(0).toUpperCase()+f.slice(1)}
              </button>
            ))}
          </div>
          <select className="ag-sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="spend">Sort: Spend</option>
            <option value="risk">Sort: Risk</option>
          </select>
        </div>
      </div>

      <div className="ag-table">
        <div className="ag-table-head ag-table-row">
          <div>AI Surface</div><div>Category</div><div>Spend</div><div>Risk</div><div>Status</div>
        </div>
        {filtered.map(s => (
          <div className="ag-table-row ag-table-data-row" key={s.id}>
            <div className="ag-app">
              <div className="ag-app-ico" style={{background:s.color}}>{s.letter}</div>
              <div className="ag-app-meta">
                <span className="ag-app-name">{s.name}</span>
                <span className="ag-app-type">{s.type}</span>
              </div>
            </div>
            <div className="ag-cell-muted">{s.category}</div>
            <div className="ag-cell-mono">{s.spendFmt}</div>
            <div><Badge type={s.risk} label={s.riskLabel} colorMap={RISK_COLORS}/></div>
            <div><Badge type={s.status} label={s.status==='sanctioned'?'Sanctioned':'Shadow'} colorMap={STATUS_COLORS}/></div>
          </div>
        ))}
      </div>

      {/* DLP risk events */}
      <div className="ag-panel ag-risk-panel" style={{marginTop:14}}>
        <div className="ag-panel-head">
          <span className="ag-panel-title" style={{display:'flex',alignItems:'center'}}>
            DLP Risk Events <DlpTooltip/>
          </span>
          <span className="ag-risk-count">{d.dlpHigh} high · {d.dlpMed} medium</span>
        </div>
        <div className="ag-risk-list">
          {[
            { sev:'high',   tool:'Perplexity Pro',    user:'ananya.s@acme.com', event:'Customer PII pasted into public LLM prompt', time:'2h ago' },
            { sev:'high',   tool:'ChatGPT (shadow)',   user:'raj.k@acme.com',    event:'Internal HR data submitted to public model', time:'5h ago' },
            { sev:'high',   tool:'Midjourney',         user:'priya.m@acme.com',  event:'Unreviewed shadow tool handling design assets', time:'1d ago' },
            { sev:'medium', tool:'OpenAI API',         user:'dev-team@acme.com', event:'Spend spike: +3.8× above 30-day baseline', time:'6h ago' },
            { sev:'medium', tool:'Notion AI',          user:'org-wide',          event:'Low-usage: 218/312 seats inactive 30d', time:'1d ago' },
          ].map((ev,i) => (
            <div className="ag-risk-row" key={i}>
              <div className={`ag-sev-dot ag-sev-${ev.sev}`}/>
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
