// IT/SaaS glossary data — used by ItSaasGlossary.jsx and AIChatPanel.jsx
export const itSaasGlossaryData = {
  'Integration Builder': [
    {
      term: 'API Client',
      definition: 'A reusable HTTP session class that wraps authentication, headers, and base URL for all requests to a specific SaaS API. Generated automatically from API documentation.'
    },
    {
      term: 'API Documentation',
      definition: 'The reference material published by a SaaS vendor describing their API endpoints, authentication model, request/response formats, rate limits, and pagination. The AI reads this to generate connectors.'
    },
    {
      term: 'Connector',
      definition: 'A piece of code that allows CloudEagle to communicate with an external SaaS app — handling auth, data retrieval, pagination, error handling, and logging in a standardised way.'
    },
    {
      term: 'OpenAPI / Swagger',
      definition: 'A standard machine-readable specification format for REST APIs (JSON or YAML). When a vendor provides an OpenAPI spec, the AI can parse it directly instead of scraping documentation pages.'
    },
    {
      term: 'OAuth 2.0',
      definition: 'The most common authorisation framework for SaaS APIs. The app (CloudEagle) obtains an access token on behalf of the user without ever seeing their password. Tokens expire and must be refreshed automatically.'
    },
    {
      term: 'Bearer Token',
      definition: 'A type of access token used in OAuth 2.0. Sent in the HTTP Authorization header as "Bearer <token>" with every API request.'
    },
    {
      term: 'Rate Limit',
      definition: 'The maximum number of API requests allowed in a given time window (e.g. 100 requests per 60 seconds). Exceeding this returns a 429 error. Well-built connectors handle this with exponential back-off and retry logic.'
    },
    {
      term: 'Pagination',
      definition: 'The mechanism APIs use to return large datasets in chunks (pages). Common styles: cursor-based (next_page_token), offset-based (page=2), and link-header. Generated connectors handle all pages automatically.'
    },
    {
      term: 'Sandbox Test',
      definition: 'A controlled test run of generated connector code against the real API with real credentials — but limited to read-only operations on a small data sample. Must pass before promoting to production.'
    },
    {
      term: 'Confidence Score',
      definition: 'A percentage shown next to each AI-detected API endpoint indicating how confident the AI is that this endpoint maps to the requested data (e.g. users, usage). Endpoints below 80% are flagged for manual review.'
    }
  ],
  'Access & Compliance': [
    {
      term: 'SCIM',
      definition: 'System for Cross-domain Identity Management. A protocol that allows identity providers (like Okta or Azure AD) to automatically provision and deprovision users in SaaS apps when they join or leave an organisation.'
    },
    {
      term: 'Provisioning',
      definition: 'The process of creating a user account and granting the correct app access when a new employee joins or changes role. Done via SCIM, API, or manual IT action.'
    },
    {
      term: 'Deprovisioning',
      definition: 'The process of revoking a user\'s access to all SaaS apps when they are offboarded. Incomplete deprovisioning is a major security risk — automated workflows ensure nothing is missed.'
    },
    {
      term: 'Least Privilege',
      definition: 'A security principle: grant users only the minimum access required to do their job. Applied to SaaS by matching app access to the employee\'s role template rather than granting broad access.'
    },
    {
      term: 'Access Review',
      definition: 'A periodic (usually quarterly) process where app owners certify that each user still needs their current level of access. Required by SOC 2, ISO 27001, and many compliance frameworks.'
    },
    {
      term: 'Role Template',
      definition: 'A predefined set of SaaS app entitlements mapped to a job function (e.g. "Software Engineer" gets GitHub, Jira, Slack, Notion). New hires are provisioned based on their role template.'
    },
    {
      term: 'SOC 2',
      definition: 'Service Organisation Control 2. A widely used security and compliance framework that requires controls around access management, data protection, and audit logging — all areas where SaaS governance helps.'
    },
    {
      term: 'ISO 27001',
      definition: 'An international standard for information security management. Requires documented processes for user access control and vendor management — including SaaS application inventory and access reviews.'
    }
  ],
  'ITSM Automation': [
    {
      term: 'ITSM',
      definition: 'IT Service Management. The practice of designing, delivering, managing, and improving IT services. Popular ITSM tools include Jira Service Management, ServiceNow, and Freshservice.'
    },
    {
      term: 'Incident',
      definition: 'An unplanned interruption or degradation of an IT service. Classified by severity (P1–P4) where P1 is the most critical. Incidents require immediate response, tracking, and post-incident review.'
    },
    {
      term: 'MTTR',
      definition: 'Mean Time To Resolve. The average time from when an incident is detected to when it is fully resolved. A key engineering and IT operations metric — lower is better.'
    },
    {
      term: 'SLA',
      definition: 'Service Level Agreement. A commitment to respond to and resolve tickets within defined time windows based on priority (e.g. P1: respond in 15 minutes, resolve in 4 hours).'
    },
    {
      term: 'CAB',
      definition: 'Change Advisory Board. A governance group that reviews and approves significant IT changes before they are implemented, to reduce the risk of incidents caused by changes.'
    },
    {
      term: 'Change Request',
      definition: 'A formal proposal to make a change to an IT system, application, or infrastructure. Requires approval from the CAB or relevant stakeholders before implementation.'
    },
    {
      term: 'On-call',
      definition: 'An engineer or IT team member who is designated to respond to incidents outside normal working hours. On-call rotation is typically managed via PagerDuty, OpsGenie, or similar tools.'
    },
    {
      term: 'RCA',
      definition: 'Root Cause Analysis. A post-incident investigation to determine the underlying cause of a failure, not just the immediate symptoms. Documented in a post-incident review (PIR).'
    }
  ],
  'Cost Governance': [
    {
      term: 'SaaS Spend',
      definition: 'The total money an organisation pays for software-as-a-service subscriptions. Typically the 2nd or 3rd largest IT cost, often growing 20–30% per year without active management.'
    },
    {
      term: 'License Utilisation',
      definition: 'The percentage of purchased SaaS licenses that are actively being used. Industry average is ~50-60% — meaning roughly half of all paid seats are wasted. Tracking this is the core of SaaS cost optimisation.'
    },
    {
      term: 'License Reclamation',
      definition: 'The process of identifying unused or underutilised SaaS licenses and removing or downgrading them to reduce costs. Typically triggered when a user is inactive for 30+ days.'
    },
    {
      term: 'Shadow IT',
      definition: 'SaaS apps purchased or used by employees without IT\'s knowledge or approval. Creates security risks and uncontrolled spending. Discovering and cataloguing shadow IT is a key SaaS governance activity.'
    },
    {
      term: 'SaaS Renewal',
      definition: 'The annual (or multi-year) date on which a SaaS contract auto-renews. Missing the negotiation window (typically 30–90 days before renewal) often results in paying list price instead of negotiated rates.'
    },
    {
      term: 'Cost Per Seat',
      definition: 'The annual contract value of a SaaS app divided by the number of licensed users. A key metric for comparing pricing across vendors and evaluating whether a tool is cost-effective.'
    },
    {
      term: 'App Rationalisation',
      definition: 'The process of evaluating the SaaS portfolio to eliminate duplicate tools, consolidate overlapping functionality, and standardise on a smaller set of approved applications.'
    },
    {
      term: 'Benchmark',
      definition: 'A comparison of what your organisation pays for a SaaS app versus what similar companies pay. Used in renewal negotiations to push vendors toward market-rate pricing.'
    }
  ]
};
