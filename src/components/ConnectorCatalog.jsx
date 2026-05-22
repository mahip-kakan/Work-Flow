import React, { useState, useEffect, useRef } from 'react';
import {
  Search, CheckCircle, ExternalLink, Plus, X, ArrowRight, ArrowLeft,
  Link, Upload, ChevronDown, ChevronRight, Code, Zap, Shield, AlertTriangle,
  FlaskConical, Rocket, CheckSquare, Square, Copy, Edit2, Play,
  Terminal, Download, Clock, RefreshCw, Lock, Eye, Info, XCircle,
  AlertOctagon, CheckCheck, Bell
} from 'lucide-react';
import { saasConnectors, connectorCategories } from '../data/saasConnectorCatalog';
import ConnectorLogo from './ConnectorLogo';

/* ── Simulated AI analysis result for any URL ── */
const simulateAnalysis = (url) => {
  const name = url.includes('calendly') ? 'Calendly'
    : url.includes('github') ? 'GitHub'
    : url.includes('slack') ? 'Slack'
    : url.includes('notion') ? 'Notion'
    : url.includes('jira') || url.includes('atlassian') ? 'Jira'
    : url.includes('hubspot') ? 'HubSpot'
    : url.includes('airtable') ? 'Airtable'
    : 'Custom API';

  return {
    name,
    baseUrl: `https://api.${name.toLowerCase().replace(' ', '')}.com`,
    auth: name === 'GitHub' ? 'Personal Access Token (PAT)' : name === 'Airtable' ? 'API Key (Header)' : 'OAuth 2.0 (Bearer Token)',
    pagination: name === 'Calendly' ? 'Cursor-based (next_page_token)' : name === 'GitHub' ? 'Link header (RFC 5988)' : 'Offset-based (page, per_page)',
    rateLimit: name === 'GitHub' ? '5,000 requests / hour per token' : name === 'HubSpot' ? '100 requests / 10 seconds' : '100 requests / 60 seconds',
    format: 'REST / JSON',
    oauthScopes: name === 'GitHub' ? ['read:user', 'read:org', 'repo:read'] : name === 'Slack' ? ['users:read', 'channels:read', 'users.profile:read'] : ['read:users', 'read:organization_memberships'],
    hasWriteOps: name === 'Slack' || name === 'GitHub' || name === 'HubSpot',
    hasPii: name === 'Calendly' || name === 'HubSpot' || url.includes('hr') || url.includes('payroll') || url.includes('health'),
    endpoints: [
      { method: 'GET',    path: '/users',                    purpose: 'List all users',       confidence: 96 },
      { method: 'GET',    path: '/users/{id}',               purpose: 'Get single user',      confidence: 91 },
      { method: 'GET',    path: '/organization_memberships', purpose: 'Org member list',      confidence: 84 },
      { method: 'GET',    path: '/event_types',              purpose: 'App usage proxy',      confidence: 71 },
    ],
    components: [
      { id: 'client',     label: 'API Client Class',         desc: 'HTTP session, base URL, default headers',                        checked: true },
      { id: 'auth',       label: 'Authentication Setup',     desc: 'OAuth 2.0 flow, token refresh, credential store',               checked: true },
      { id: 'users',      label: 'User Sync (get_users)',    desc: 'Paginated fetch, field mapping to platform schema',              checked: true },
      { id: 'usage',      label: 'Usage Data (get_usage)',   desc: 'Activity mapped as app usage score',                             checked: true },
      { id: 'errors',     label: 'Error Handling',           desc: '4xx/5xx classification, retry logic, alerting',                  checked: true },
      { id: 'pagination', label: 'Pagination Handler',       desc: 'Cursor loop, max-page guard, progress logging',                  checked: true },
      { id: 'logging',    label: 'Structured Logging',       desc: 'JSON logs, request IDs, latency tracking',                       checked: true },
      { id: 'webhook',    label: 'Webhook Listener',         desc: '(No webhook docs found — add manually later)',                   checked: false },
    ],
  };
};

const generateCode = (appName) => `# ── AUTH SETUP ──────────────────────────────────────────
# ${appName} uses OAuth 2.0 Bearer tokens. Tokens expire in 2 hours.
import os, time, requests, logging
from dataclasses import dataclass, field
from typing import Optional, List, Dict

TOKEN_URL = "https://auth.${appName.toLowerCase()}.com/oauth/token"

@dataclass
class ${appName.replace(' ', '')}Auth:
    client_id: str = field(
        default_factory=lambda: os.environ["${appName.toUpperCase().replace(' ', '_')}_CLIENT_ID"])
    client_secret: str = field(
        default_factory=lambda: os.environ["${appName.toUpperCase().replace(' ', '_')}_CLIENT_SECRET"])
    _token: Optional[str] = None
    _expires_at: float = 0.0

    def get_token(self) -> str:
        if time.time() >= self._expires_at - 60:
            self._refresh()
        return self._token

    def _refresh(self):
        resp = requests.post(TOKEN_URL, data={
            "grant_type": "client_credentials",
            "client_id": self.client_id,
            "client_secret": self.client_secret,
        })
        resp.raise_for_status()
        data = resp.json()
        self._token = data["access_token"]
        self._expires_at = time.time() + data["expires_in"]

# ── API CLIENT ────────────────────────────────────────────
BASE_URL = "https://api.${appName.toLowerCase().replace(' ', '')}.com"

class ${appName.replace(' ', '')}Client:
    def __init__(self, auth: ${appName.replace(' ', '')}Auth):
        self.auth = auth
        self.session = requests.Session()
        self.session.timeout = 10

    def _headers(self) -> Dict:
        return {
            "Authorization": f"Bearer {self.auth.get_token()}",
            "Content-Type": "application/json"
        }

    # ── GET USERS ────────────────────────────────────────
    def get_users(self) -> List[Dict]:
        users, cursor = [], None
        while True:
            params = {"count": 100}
            if cursor:
                params["page_token"] = cursor
            resp = self.session.get(
                f"{BASE_URL}/users", headers=self._headers(), params=params)
            resp.raise_for_status()
            data = resp.json()
            users.extend(data.get("collection", []))
            cursor = data.get("pagination", {}).get("next_page")
            if not cursor:
                break
        return users

    # ── GET USAGE ─────────────────────────────────────────
    def get_usage(self) -> List[Dict]:
        resp = self.session.get(
            f"{BASE_URL}/event_types", headers=self._headers())
        resp.raise_for_status()
        return resp.json().get("collection", [])

    # ── ERROR HANDLER ─────────────────────────────────────
    def _handle_error(self, resp):
        if resp.status_code == 429:
            retry_after = int(resp.headers.get("Retry-After", 60))
            logging.warning(f"Rate limited. Retrying in {retry_after}s")
            time.sleep(retry_after)
        resp.raise_for_status()`;

const SANDBOX_STEPS = [
  { id: 'creds',      label: 'Credential Check',  detail: 'Env vars present and readable',        failDetail: 'CALENDLY_CLIENT_SECRET not found in env' },
  { id: 'auth',       label: 'Authentication',     detail: 'OAuth token acquired in 0.91s',        failDetail: 'Token request returned 401 Unauthorized' },
  { id: 'connect',    label: 'API Connectivity',   detail: 'GET /users → 200 OK (340ms)',           failDetail: 'Connection timed out after 10s' },
  { id: 'pagination', label: 'Pagination',         detail: '3 pages fetched — 52 total users',     failDetail: "Unexpected schema — field 'next_cursor' missing" },
  { id: 'mapping',    label: 'Schema Mapping',     detail: 'All required fields present',           failDetail: 'Required field "email" absent in 14% of records' },
];

const SAMPLE_USERS = [
  { name: 'Alice Hoffman',  email: 'alice.h@acme.com',    status: 'active',   created: '2023-06-12' },
  { name: 'Bob Chen',       email: 'b.chen@acme.com',     status: 'active',   created: '2023-08-01' },
  { name: 'Carol Davies',   email: 'cdavies@acme.com',    status: 'active',   created: '2024-01-15' },
  { name: 'Dan Osei',       email: 'dan.osei@acme.com',   status: 'inactive', created: '2022-11-30' },
  { name: 'Eva Müller',     email: 'e.muller@acme.com',   status: 'active',   created: '2024-03-28' },
];

/* ── Safeguard 3: check for hardcoded secrets in code ── */
const secretsCheck = (code) => {
  const hardcoded = /=\s*["'](sk-|Bearer [A-Za-z0-9+/]{20,}|ghp_|xoxb-|AIza)[^"']*/i.test(code);
  return hardcoded ? 'hardcoded' : 'clean';
};

/* ─────────────────────────────────────────────
   INTEGRATION BUILDER MODAL  (4-step wizard)
───────────────────────────────────────────── */
const IntegrationBuilder = ({ onClose, onConnectorAdded }) => {
  const [step, setStep] = useState(1);
  const [apiUrl, setApiUrl] = useState('');
  const [appName, setAppName] = useState('');
  const [analysing, setAnalysing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [components, setComponents] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [code, setCode] = useState('');
  const [activeSection, setActiveSection] = useState('auth');
  const [sandboxRunning, setSandboxRunning] = useState(false);
  const [sandboxSteps, setSandboxSteps] = useState([]);
  const [sandboxFailed, setSandboxFailed] = useState(false);
  const [logs, setLogs] = useState([]);
  const [sandboxDone, setSandboxDone] = useState(false);
  const [schedule, setSchedule] = useState('daily');
  const [confirmingDeploy, setConfirmingDeploy] = useState(false);
  const [riskExpanded, setRiskExpanded] = useState(false);
  const logsEndRef = useRef(null);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  /* Step 1 → 2 */
  const handleAnalyse = () => {
    if (!apiUrl.trim()) return;
    setAnalysing(true);
    setTimeout(() => {
      const result = simulateAnalysis(apiUrl);
      if (!appName.trim()) setAppName(result.name);
      setAnalysis(result);
      setComponents(result.components);
      setAnalysing(false);
      setStep(2);
    }, 2200);
  };

  /* Step 2 → 3 */
  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setCode(generateCode(appName));
      setGenerating(false);
      setStep(3);
    }, 1800);
  };

  /* Step 3 → 4 — always passes */
  const handleSandbox = () => {
    setStep(4);
    setSandboxRunning(true);
    setSandboxSteps([]);
    setLogs([]);
    setSandboxDone(false);
    setSandboxFailed(false);

    const prefix = appName.toUpperCase().replace(/\s+/g, '_');
    const logLines = [
      'Starting sandbox run…',
      'Checking credentials…',
      `${prefix}_CLIENT_ID  ✓`,
      `${prefix}_CLIENT_SECRET  ✓`,
      'Requesting OAuth token…',
      'Token acquired (expires_in=7200s)',
      'Auth check complete',
      `GET /users  page=1…`,
      '200 OK  latency=340ms  count=20',
      `GET /users  page=2…`,
      '200 OK  latency=290ms  count=20',
      `GET /users  page=3…`,
      '200 OK  latency=310ms  count=12  next_token=null',
      'Pagination complete  total=52  pages=3',
      'Mapping to platform schema…',
      'Schema mapping OK',
      '━━  SANDBOX PASSED  ━━',
    ];

    // logLine index → SANDBOX_STEPS index
    const stepMap = { 2: 0, 6: 1, 7: 2, 13: 3, 15: 4 };

    logLines.forEach((line, i) => {
      setTimeout(() => {
        const ts = new Date().toLocaleTimeString('en-GB', { hour12: false });
        setLogs((prev) => [...prev, { text: `${ts}  ${line}`, type: line.includes('PASSED') ? 'success' : 'default' }]);

        if (stepMap[i] !== undefined) {
          setSandboxSteps((prev) => [...prev, { ...SANDBOX_STEPS[stepMap[i]], status: 'pass' }]);
        }

        if (i === logLines.length - 1) {
          setSandboxRunning(false);
          setSandboxDone(true);
        }
      }, i * 400);
    });
  };

  const handleRerunSandbox = () => {
    setSandboxDone(false);
    setSandboxFailed(false);
    handleSandbox();
  };

  const handlePromote = () => {
    onConnectorAdded(appName);
    onClose();
  };

  const toggleComponent = (id) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c))
    );
  };

  const STEPS = ['New Integration', 'AI Analysis', 'Code Review', 'Test & Deploy'];

  const explanations = {
    auth: {
      title: 'Auth Setup',
      what: 'Handles OAuth 2.0 authentication with the ' + appName + ' API.',
      how: 'Reads your Client ID and Client Secret from environment variables (never hard-coded), exchanges them for a Bearer token, and automatically refreshes it before it expires. All future API calls attach this token in the Authorization header.',
      why: 'Storing credentials in env vars means they never appear in source code or logs — a key security requirement before promoting any connector to production.',
    },
    client: {
      title: 'API Client',
      what: 'A reusable HTTP session that all other functions call.',
      how: 'Wraps Python\'s requests library with a pre-configured base URL, default headers (including the auth token), a 10-second timeout, and automatic retry on 429 / 5xx responses. Every API call in this connector goes through this single client.',
      why: 'Centralising connection logic means auth changes, timeouts, or base URL updates only need to be made in one place — not scattered across every function.',
    },
    users: {
      title: 'get_users()',
      what: 'Fetches the full list of users from ' + appName + ' and maps them to a standard schema.',
      how: 'Calls GET /users in pages (cursor-based), follows next_token until all records are retrieved, then normalises each record — mapping ' + appName + ' field names to standard id, email, name, and last_active fields.',
      why: 'Pagination ensures the sync never misses users in large orgs. Field normalisation means this connector\'s output is consistent with every other connector — no custom logic needed downstream.',
    },
    usage: {
      title: 'get_usage()',
      what: 'Estimates how actively each user is using ' + appName + '.',
      how: 'Calls GET /event_types and counts events per user over the last 30 days. Maps the count to a usage_score (0–100). Note: ' + appName + ' doesn\'t expose a direct "last active" endpoint, so event frequency is used as a proxy.',
      why: 'Usage scores drive licence reclaim decisions — low-scoring users can be flagged for review. The ⚠ low-confidence label is intentional: verify the mapping matches your definition of "active" before enabling auto-reclaim.',
    },
  };

  const secretStatus = code ? secretsCheck(code) : 'clean';
  const passedCount  = sandboxSteps.filter((s) => s.status === 'pass').length;
  const totalSteps   = SANDBOX_STEPS.length;

  return (
    <div className="ib-overlay" onClick={(e) => e.target === e.currentTarget && !confirmingDeploy && onClose()}>
      <div className="ib-modal">
        {/* Header */}
        <div className="ib-modal-header">
          <span className="ib-modal-title">AI Integration Builder</span>
          <button type="button" className="ib-close-btn" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Stepper */}
        <div className="ib-stepper">
          {STEPS.map((label, i) => {
            const n = i + 1;
            const done = step > n;
            const active = step === n;
            return (
              <React.Fragment key={label}>
                <div className={`ib-step ${active ? 'ib-step--active' : ''} ${done ? 'ib-step--done' : ''}`}>
                  <div className="ib-step-dot">
                    {done ? <CheckSquare size={13} /> : n}
                  </div>
                  <span>{label}</span>
                </div>
                {i < STEPS.length - 1 && <div className={`ib-step-line ${done ? 'ib-step-line--done' : ''}`} />}
              </React.Fragment>
            );
          })}
        </div>

        {/* ── STEP 1: INPUT ── */}
        {step === 1 && (
          <div className="ib-body">
            <div className="ib-section-label">New Integration</div>
            <p className="ib-section-sub">Point AI at any API documentation and we'll generate a complete, production-ready connector — no coding required.</p>

            <label className="ib-field-label">Integration Name</label>
            <input
              className="ib-input"
              placeholder="e.g. Calendly — User Sync"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
            />

            <label className="ib-field-label" style={{ marginTop: 18 }}>
              API Documentation URL <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div className="ib-url-row">
              <Link size={15} style={{ color: '#94a3b8', flexShrink: 0 }} />
              <input
                className="ib-input ib-input--url"
                placeholder="https://developer.calendly.com/api-docs/…"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAnalyse()}
              />
            </div>
            <p className="ib-hint">AI will crawl and parse documentation pages automatically</p>

            <div className="ib-divider-or">— or upload an OpenAPI / Swagger spec —</div>

            <div className="ib-dropzone">
              <Upload size={20} style={{ color: '#94a3b8' }} />
              <span>Drag &amp; drop .json or .yaml file here</span>
              <span className="ib-hint">OpenAPI 2.x and 3.x supported · Max 10 MB</span>
            </div>

            <div className="ib-info-banner">
              <Zap size={14} style={{ color: '#7C3AED', flexShrink: 0 }} />
              <span>AI will read your docs, detect auth requirements, map endpoints, and generate code with error handling, rate-limit management, pagination, and logging. <strong>No code runs until you approve it in sandbox.</strong></span>
            </div>

            <div className="ib-footer">
              <button type="button" className="ib-btn-secondary" onClick={onClose}>Cancel</button>
              <button
                type="button"
                className="ib-btn-primary"
                disabled={!apiUrl.trim() || analysing}
                onClick={handleAnalyse}
              >
                {analysing ? (
                  <><RefreshCw size={14} className="ib-spin" /> Analysing docs…</>
                ) : (
                  <>Analyse API Docs <ArrowRight size={14} /></>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: ANALYSIS ── */}
        {step === 2 && analysis && (
          <div className="ib-body">
            <div className="ib-section-label">AI Analysis Results · {analysis.name} API</div>
            <p className="ib-section-sub" style={{ marginBottom: 16 }}>Source: <code style={{ fontSize: 11 }}>{apiUrl}</code></p>

            <div className="ib-discovery-grid">
              <div className="ib-discovery-card">
                <div className="ib-dc-label">Authentication</div>
                <div className="ib-dc-value"><CheckCircle size={12} style={{ color: '#059669' }} /> {analysis.auth}</div>
              </div>
              <div className="ib-discovery-card">
                <div className="ib-dc-label">Pagination</div>
                <div className="ib-dc-value"><CheckCircle size={12} style={{ color: '#059669' }} /> {analysis.pagination}</div>
              </div>
              <div className="ib-discovery-card">
                <div className="ib-dc-label">Rate Limit</div>
                <div className="ib-dc-value"><CheckCircle size={12} style={{ color: '#059669' }} /> {analysis.rateLimit}</div>
              </div>
              <div className="ib-discovery-card">
                <div className="ib-dc-label">Base URL &amp; Format</div>
                <div className="ib-dc-value"><CheckCircle size={12} style={{ color: '#059669' }} /> {analysis.format}</div>
              </div>
            </div>

            <div className="ib-table-label">Relevant Endpoints Found</div>
            <table className="ib-endpoints-table">
              <thead>
                <tr><th>Method</th><th>Endpoint</th><th>Purpose</th><th>Confidence</th></tr>
              </thead>
              <tbody>
                {analysis.endpoints.map((ep) => (
                  <tr key={ep.path}>
                    <td><span className="ib-method-badge">{ep.method}</span></td>
                    <td><code style={{ fontSize: 11 }}>{ep.path}</code></td>
                    <td>{ep.purpose}</td>
                    <td>
                      <div className="ib-confidence-bar">
                        <div className="ib-confidence-fill" style={{ width: `${ep.confidence}%`, background: ep.confidence >= 85 ? '#059669' : ep.confidence >= 75 ? '#D97706' : '#ef4444' }} />
                        <span>{ep.confidence}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="ib-table-label" style={{ marginTop: 20 }}>
              What Will Be Generated
              <button type="button" className="ib-select-all" onClick={() => setComponents((prev) => prev.map((c) => ({ ...c, checked: true })))}>Select all</button>
            </div>
            <div className="ib-checklist">
              {components.map((c) => (
                <button key={c.id} type="button" className="ib-check-row" onClick={() => toggleComponent(c.id)}>
                  {c.checked ? <CheckSquare size={16} style={{ color: '#7C3AED', flexShrink: 0 }} /> : <Square size={16} style={{ color: '#cbd5e1', flexShrink: 0 }} />}
                  <div>
                    <div className="ib-check-label">{c.label}</div>
                    <div className="ib-check-sub">{c.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            {analysis.endpoints.some((e) => e.confidence < 80) && (
              <div className="ib-warn-banner">
                <AlertTriangle size={14} style={{ color: '#D97706', flexShrink: 0 }} />
                <span>1 low-confidence area: /event_types mapped to usage data. Verify after code review.</span>
              </div>
            )}

            {/* ── SAFEGUARD 2: Risk & Permissions panel ── */}
            <div className="ib-risk-panel">
              <button
                type="button"
                className="ib-risk-toggle"
                onClick={() => setRiskExpanded((v) => !v)}
              >
                <div className="ib-risk-toggle-left">
                  <Shield size={14} style={{ color: '#D97706' }} />
                  <span>Risk &amp; Permissions Summary</span>
                  {(analysis.hasWriteOps || analysis.hasPii) && (
                    <span className="ib-risk-attention">Review before continuing</span>
                  )}
                </div>
                {riskExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>

              {riskExpanded && (
                <div className="ib-risk-body">
                  {/* OAuth scopes */}
                  <div className="ib-risk-item ib-risk-item--info">
                    <Lock size={13} style={{ color: '#0284C7', flexShrink: 0 }} />
                    <div>
                      <div className="ib-risk-item-title">OAuth scopes requested</div>
                      <div className="ib-risk-item-detail">
                        {analysis.oauthScopes.map((s) => (
                          <span key={s} className="ib-scope-chip">{s}</span>
                        ))}
                      </div>
                      <div className="ib-risk-item-note">These are read-only scopes — no write access is granted at auth time.</div>
                    </div>
                  </div>

                  {/* Write ops */}
                  {analysis.hasWriteOps && (
                    <div className="ib-risk-item ib-risk-item--warn">
                      <AlertTriangle size={13} style={{ color: '#D97706', flexShrink: 0 }} />
                      <div>
                        <div className="ib-risk-item-title">Write operations detected</div>
                        <div className="ib-risk-item-note">This connector includes POST/PATCH/DELETE endpoints. Test all write operations in sandbox before promoting — unintended writes cannot easily be undone.</div>
                      </div>
                    </div>
                  )}

                  {/* PII */}
                  {analysis.hasPii && (
                    <div className="ib-risk-item ib-risk-item--warn">
                      <Eye size={13} style={{ color: '#D97706', flexShrink: 0 }} />
                      <div>
                        <div className="ib-risk-item-title">PII likely in response data</div>
                        <div className="ib-risk-item-note">This API returns names, emails, and usage data. Ensure your org's data retention and privacy policy covers this integration before deploying to production.</div>
                      </div>
                    </div>
                  )}

                  {/* Rate limit */}
                  <div className="ib-risk-item ib-risk-item--info">
                    <Info size={13} style={{ color: '#0284C7', flexShrink: 0 }} />
                    <div>
                      <div className="ib-risk-item-title">Rate limit advisory</div>
                      <div className="ib-risk-item-note">Detected: <strong>{analysis.rateLimit}</strong>. Sandbox runs against isolated test credentials. Once promoted, production syncs count against your live API quota.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="ib-footer">
              <button type="button" className="ib-btn-secondary" onClick={() => setStep(1)}><ArrowLeft size={14} /> Edit Inputs</button>
              <button type="button" className="ib-btn-primary" disabled={generating} onClick={handleGenerate}>
                {generating ? <><RefreshCw size={14} className="ib-spin" /> Generating code…</> : <>Generate Integration Code <ArrowRight size={14} /></>}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: CODE REVIEW ── */}
        {step === 3 && (
          <div className="ib-body ib-body--code">
            {/* ── SAFEGUARD 3: Secrets banner ── */}
            <div className={`ib-secrets-banner ${secretStatus === 'hardcoded' ? 'ib-secrets-banner--danger' : 'ib-secrets-banner--safe'}`}>
              <Lock size={13} style={{ flexShrink: 0 }} />
              {secretStatus === 'hardcoded' ? (
                <span><strong>Hardcoded secret detected!</strong> Remove it and use an environment variable instead before proceeding.</span>
              ) : (
                <span><strong>Secrets safe.</strong> All credentials use <code>os.environ[…]</code> — never paste real keys directly into code.</span>
              )}
              <span className={`ib-secrets-badge ${secretStatus === 'hardcoded' ? 'ib-secrets-badge--danger' : 'ib-secrets-badge--safe'}`}>
                {secretStatus === 'hardcoded' ? '⚠ Secret found' : '✓ 0 hardcoded secrets'}
              </span>
            </div>

            <div className="ib-warn-banner" style={{ marginBottom: 16 }}>
              <AlertTriangle size={14} style={{ color: '#D97706', flexShrink: 0 }} />
              <span>Review before running — this code will make live API calls to your {appName} account. Use "Test in Sandbox" to validate first.</span>
            </div>

            <div className="ib-code-layout">
              {/* Code panel */}
              <div className="ib-code-panel">
                <div className="ib-code-panel-header">
                  <span>Generated Code · Python 3.11</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button type="button" className="ib-code-action-btn" onClick={() => navigator.clipboard?.writeText(code)}><Copy size={13} /> Copy</button>
                    <button type="button" className="ib-code-action-btn"><Edit2 size={13} /> Edit</button>
                  </div>
                </div>
                <div className="ib-section-tabs">
                  {['auth', 'client', 'users', 'usage'].map((s) => (
                    <button key={s} type="button" className={`ib-section-tab ${activeSection === s ? 'active' : ''}`} onClick={() => setActiveSection(s)}>
                      {s === 'auth' ? 'Auth Setup' : s === 'client' ? 'API Client' : s === 'users' ? 'get_users()' : 'get_usage()'}
                    </button>
                  ))}
                </div>
                <pre className="ib-code-pre"><code>{code}</code></pre>
              </div>

              {/* Explanation panel */}
              <div className="ib-explain-panel">
                <div className="ib-explain-title">Plain English</div>
                {['auth', 'client', 'users', 'usage'].map((s) => {
                  const ex = explanations[s];
                  const isActive = activeSection === s;
                  return (
                    <button key={s} type="button" className={`ib-explain-card ${isActive ? 'ib-explain-card--active' : ''}`} onClick={() => setActiveSection(s)}>
                      <div className="ib-explain-card-title">{ex.title}</div>
                      {isActive && (
                        <div className="ib-explain-card-body">
                          <p style={{ marginBottom: 10 }}>{ex.what}</p>
                          <div className="ib-explain-row">
                            <span className="ib-explain-label">How</span>
                            <span>{ex.how}</span>
                          </div>
                          <div className="ib-explain-row" style={{ marginTop: 8 }}>
                            <span className="ib-explain-label">Why it matters</span>
                            <span>{ex.why}</span>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="ib-footer" style={{ marginTop: 16 }}>
              <button type="button" className="ib-btn-secondary" onClick={() => setStep(2)}><ArrowLeft size={14} /> Back</button>
              <button type="button" className="ib-btn-secondary"><Download size={14} /> Save Draft</button>
              <button
                type="button"
                className="ib-btn-primary"
                disabled={secretStatus === 'hardcoded'}
                onClick={handleSandbox}
                title={secretStatus === 'hardcoded' ? 'Fix hardcoded secrets before running sandbox' : ''}
              >
                <FlaskConical size={14} /> Test in Sandbox
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4: SANDBOX ── */}
        {step === 4 && (
          <div className="ib-body">
            <div className="ib-section-label">Sandbox Run · {appName} Integration</div>

            <div className="ib-sandbox-layout">
              {/* Test steps */}
              <div className="ib-test-steps">
                <div className="ib-panel-label">Test Steps</div>
                {SANDBOX_STEPS.map((s, i) => {
                  const doneStep  = sandboxSteps.find((x) => x.id === s.id);
                  const running   = sandboxRunning && !doneStep && sandboxSteps.length === i;
                  const passed    = doneStep?.status === 'pass';
                  const failed    = doneStep?.status === 'fail';
                  return (
                    <div key={s.id} className={`ib-test-row ${passed ? 'ib-test-row--pass' : ''} ${failed ? 'ib-test-row--fail' : ''} ${running ? 'ib-test-row--running' : ''}`}>
                      <div className="ib-test-dot">
                        {passed  ? <CheckCircle  size={14} style={{ color: '#059669' }} />
                         : failed ? <XCircle      size={14} style={{ color: '#ef4444' }} />
                         : running ? <RefreshCw size={14} className="ib-spin" style={{ color: '#0284C7' }} />
                         : <div className="ib-test-dot-empty" />}
                      </div>
                      <div>
                        <div className="ib-test-label">{s.label}</div>
                        {passed  && <div className="ib-test-detail">{s.detail}</div>}
                        {failed  && <div className="ib-test-detail ib-test-detail--fail">{s.failDetail}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Live log */}
              <div className="ib-log-panel">
                <div className="ib-panel-label"><Terminal size={13} /> Live Log</div>
                <div className="ib-log-scroll">
                  {logs.map((line, i) => (
                    <div key={i} className={`ib-log-line ib-log-line--${line.type}`}>
                      {line.text}
                    </div>
                  ))}
                  <div ref={logsEndRef} />
                </div>
              </div>
            </div>

            {sandboxDone && !sandboxFailed && (
              <>
                {/* Sample data */}
                <div className="ib-panel-label" style={{ marginTop: 20 }}>Sample Data — First 5 Users Retrieved</div>
                <table className="ib-sample-table">
                  <thead><tr><th>Name</th><th>Email</th><th>Status</th><th>Created</th></tr></thead>
                  <tbody>
                    {SAMPLE_USERS.map((u) => (
                      <tr key={u.email}>
                        <td>{u.name}</td>
                        <td style={{ color: '#64748b', fontSize: 12 }}>{u.email}</td>
                        <td><span className={`ib-status-badge ${u.status === 'active' ? 'ib-status-badge--active' : 'ib-status-badge--inactive'}`}>{u.status}</span></td>
                        <td style={{ color: '#64748b', fontSize: 12 }}>{u.created}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Schedule + Promote */}
                <div className="ib-promote-row">
                  <div className="ib-schedule-card">
                    <div className="ib-panel-label"><Clock size={13} /> Schedule Sync</div>
                    {['hourly', 'daily', 'weekly', 'manual'].map((s) => (
                      <label key={s} className="ib-radio-row">
                        <input type="radio" name="schedule" value={s} checked={schedule === s} onChange={() => setSchedule(s)} />
                        <span>{s.charAt(0).toUpperCase() + s.slice(1)}{s === 'daily' ? ' at 02:00 UTC' : s === 'weekly' ? ' on Monday' : ''}</span>
                      </label>
                    ))}
                  </div>
                  <div className="ib-promote-card">
                    <div className="ib-promote-result">5 / 5 steps passed</div>
                    <div className="ib-promote-title">{appName} Integration is ready to go live</div>
                    <p className="ib-promote-sub">Connector validated in sandbox. Schedule set to {schedule}. Click below to deploy to production.</p>
                    {/* ── SAFEGUARD 4: confirmation gate ── */}
                    <button type="button" className="ib-btn-primary ib-btn-promote" onClick={() => setConfirmingDeploy(true)}>
                      <Rocket size={15} /> Promote to Production
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ── SAFEGUARD 1: Sandbox failed — block promotion ── */}
            {sandboxDone && sandboxFailed && (
              <div className="ib-sandbox-failed">
                <div className="ib-sandbox-failed-header">
                  <AlertOctagon size={16} /> {passedCount} / {totalSteps} steps passed — production deploy blocked
                </div>
                <p className="ib-sandbox-failed-msg">
                  <strong>Pagination failed:</strong> the connector could not determine the next page token (<code>next_cursor</code> field missing in API response). Check your pagination handler in the generated code and re-run sandbox.
                </p>
                <div className="ib-sandbox-failed-suggestion">
                  <strong>Suggested fix:</strong> In <code>get_users()</code>, change <code>data.get("pagination", {'{}'}).get("next_page")</code> to <code>data.get("pagination", {'{}'}).get("next_cursor")</code> and re-run.
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                  <button type="button" className="ib-btn-secondary" onClick={() => setStep(3)}><Edit2 size={13} /> Edit Code</button>
                  <button type="button" className="ib-btn-primary" onClick={handleRerunSandbox}><RefreshCw size={13} /> Re-run Sandbox</button>
                </div>
                <p className="ib-sandbox-blocked-note">Production deployment is blocked until all {totalSteps} steps pass.</p>
              </div>
            )}

            {!sandboxDone && (
              <div className="ib-footer" style={{ marginTop: 20 }}>
                <button type="button" className="ib-btn-secondary" onClick={() => setStep(3)}><ArrowLeft size={14} /> Back to Code</button>
              </div>
            )}
          </div>
        )}

        {/* ── SAFEGUARD 4: Deploy confirmation overlay ── */}
        {confirmingDeploy && (
          <div className="ib-confirm-overlay">
            <div className="ib-confirm-card">
              <div className="ib-confirm-title">Deploy to Production?</div>
              <p className="ib-confirm-sub">You're about to make <strong>{appName}</strong> available to all workflows in your workspace.</p>
              <div className="ib-confirm-checklist">
                <div className="ib-confirm-check ib-confirm-check--ok"><CheckCheck size={13} /> Sandbox passed ({passedCount}/{totalSteps} steps)</div>
                <div className="ib-confirm-check ib-confirm-check--ok"><CheckCheck size={13} /> Schedule: {schedule.charAt(0).toUpperCase() + schedule.slice(1)}{schedule === 'daily' ? ' at 02:00 UTC' : schedule === 'weekly' ? ' on Monday' : ''}</div>
                <div className="ib-confirm-check ib-confirm-check--ok"><CheckCheck size={13} /> Credentials stored as environment variables</div>
                {analysis?.hasWriteOps && (
                  <div className="ib-confirm-check ib-confirm-check--warn"><AlertTriangle size={13} /> Write operations included — monitor first sync in Activity Log</div>
                )}
                {analysis?.hasPii && (
                  <div className="ib-confirm-check ib-confirm-check--warn"><AlertTriangle size={13} /> PII in scope — verify your data handling policy applies</div>
                )}
              </div>
              <div className="ib-confirm-actions">
                <button type="button" className="ib-btn-secondary" onClick={() => setConfirmingDeploy(false)}>Cancel</button>
                <button type="button" className="ib-btn-primary ib-btn-promote" onClick={handlePromote}><Rocket size={14} /> Deploy Now</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN CONNECTOR CATALOG
───────────────────────────────────────────── */
const ConnectorCatalog = () => {
  const [connectors, setConnectors] = useState(saasConnectors);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [showBuilder, setShowBuilder] = useState(false);
  const [toast, setToast] = useState(null);

  const handleConnect = (id) => {
    setConnectors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'connected' } : c))
    );
  };

  const handleConnectorAdded = (name) => {
    const newConnector = {
      id: name.toLowerCase().replace(/\s+/g, '-') + '-custom',
      name,
      category: 'Custom',
      logoColor: '#7C3AED',
      logoLetter: name.slice(0, 2).toUpperCase(),
      status: 'connected',
      description: `Custom connector generated via AI Integration Builder`,
    };
    setConnectors((prev) => [newConnector, ...prev]);
    /* ── SAFEGUARD 5: post-promote monitoring nudge ── */
    setToast(`${name} is live. First sync scheduled. Monitor in Activity Log →`);
  };

  /* Auto-dismiss toast after 5 seconds */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(t);
  }, [toast]);

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
    <>
      <div className="connector-catalog">
        {/* Page header */}
        <div className="connector-catalog-header">
          <div className="connector-catalog-title">
            <h1>Connect Apps</h1>
            <p>Connect your SaaS apps — AI will generate connectors from their API documentation</p>
          </div>
          <div className="connector-catalog-actions">
            <button type="button" className="connector-action-btn">
              <ExternalLink size={15} />
              Request App
            </button>
            <button type="button" className="connector-action-btn connector-action-btn--primary" onClick={() => setShowBuilder(true)}>
              <Zap size={15} />
              Submit Your App
            </button>
          </div>
        </div>

        {/* Tabs + Search */}
        <div className="connector-catalog-toolbar">
          <div className="connector-tabs">
            <button type="button" className={`connector-tab ${activeTab === 'All' ? 'active' : ''}`} onClick={() => setActiveTab('All')}>
              All
            </button>
            <button type="button" className={`connector-tab ${activeTab === 'Connected' ? 'active' : ''}`} onClick={() => setActiveTab('Connected')}>
              Connected
              {connectedCount > 0 && <span className="connector-tab-badge">{connectedCount}</span>}
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

        {/* Category pills */}
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
              <ConnectorCard key={connector.id} connector={connector} onConnect={handleConnect} />
            ))}
          </div>
        )}
      </div>

      {showBuilder && (
        <IntegrationBuilder
          onClose={() => setShowBuilder(false)}
          onConnectorAdded={handleConnectorAdded}
        />
      )}

      {/* ── SAFEGUARD 5: Toast notification ── */}
      {toast && (
        <div className="cc-toast">
          <CheckCircle size={15} style={{ color: '#059669', flexShrink: 0 }} />
          <span>{toast}</span>
          <button type="button" className="cc-toast-close" onClick={() => setToast(null)}><X size={13} /></button>
        </div>
      )}
    </>
  );
};

const ConnectorCard = ({ connector, onConnect }) => {
  const isConnected = connector.status === 'connected';
  return (
    <div className={`connector-card ${isConnected ? 'connector-card--connected' : ''}`}>
      <div className="connector-card-logo">
        <ConnectorLogo
          id={connector.id}
          name={connector.name}
          logoColor={connector.logoColor}
          logoLetter={connector.logoLetter}
          size={36}
        />
      </div>
      <div className="connector-card-info">
        <span className="connector-card-name">{connector.name}</span>
        <span className="connector-card-category">{connector.category}</span>
      </div>
      <div className="connector-card-action">
        {isConnected ? (
          <span className="connector-active-badge"><CheckCircle size={13} /> Active</span>
        ) : (
          <button type="button" className="connector-connect-btn" onClick={() => onConnect(connector.id)}>
            <Plus size={13} /> Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectorCatalog;
