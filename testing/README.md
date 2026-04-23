# Health Flow — Testing Dashboard (PM View)

**Primary:** open the **main studio** (`npm run dev` from the repo root), then use the top-right **user menu** → **Product Manager** or **Admin** to open the testing dashboard inside the app.

This folder is an **optional standalone dev server** on **port 2303** (main app uses 2302). It imports the same UI from [`../src/testing-dashboard/`](../src/testing-dashboard/).

## What it covers

| Category | Purpose |
|----------|---------|
| **1. Test Orchestration** | Workflow definition (unit → integration → load → E2E), parallel execution, conditional logic, recent runs. Example tools: Testkube, Argo Workflows, Jenkins X. |
| **2. AI Model Testing** | Evals (glossary accuracy, template routing), prompt tests, model/version tracking. Example tools: Braintrust, Langfuse, PromptLayer, W&B, Arize. |
| **3. Load & Performance** | Load test results, P95 latency, cost projection at scale. Example tools: K6, Locust, Gatling, Artillery. |
| **4. Observability** | Real-time metrics, user analytics, cost per feature, model drift. Example tools: DataDog, New Relic, Grafana, OpenTelemetry. |

## Run locally

```bash
cd testing
npm install
npm run dev
```

Open **http://localhost:2303**.

## Build

```bash
npm run build
npm run preview   # preview production build
```

Data shown is **mock/demo** for PM visibility. Wire to your real orchestration, evals, load, and observability backends when available.
