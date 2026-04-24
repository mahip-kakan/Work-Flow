# Workflow Studio

**Workflow Studio** is a public, browser-based demo of a low-code environment for designing and “deploying” multi-step automations. It is meant for **product, design, and engineering** audiences who want a tangible surface to discuss triggers, actions, guardrails, and role-based experiences—without standing up a backend.

---

## At a glance

| | |
|---|---|
| **What it is** | A React + Vite single-page app: home and discovery flows, a visual flow editor, workspace modes (Healthcare, HR, Marketing), AI assistant panel, glossaries, and a **Testing** experience for PM/Admin personas. |
| **Who it’s for** | Product managers, solution designers, and engineers reviewing UX patterns, copy, and information architecture—not production PHI or real integrations. |
| **Live demo** | **[https://mahip-kakan.github.io/Work-Flow/](https://mahip-kakan.github.io/Work-Flow/)** *(path matches the GitHub repository name [`Work-Flow`](https://github.com/mahip-kakan/Work-Flow))* |

---

## Try the live app

1. Open **[the hosted demo](https://mahip-kakan.github.io/Work-Flow/)** (no install required).
2. Use the **header** to switch **Healthcare**, **HR**, or **Marketing**—each mode changes templates, discover content, analytics copy, and glossary focus.
3. Open the **user menu** (top right) → **View as** → **Product Manager** or **Admin** to unlock the **Testing** (beaker) area in the sidebar—evals, prompt tests, load and observability screens are there for narrative and layout review.

If the page looks empty after an update, do a **hard refresh** (e.g. **Cmd+Shift+R** on Mac, **Ctrl+Shift+R** on Windows) or try a private window—GitHub Pages can cache the HTML shell briefly.

---

## What you can explore

- **Flow editor** — Pick a trigger, chain actions, open per-step configuration panels (notifications, tasks, integrations, AI-style steps, etc.). Data is illustrative.
- **Discover & product flows** — Pre-built “agent” ideas grouped by domain or pillar for the active workspace.
- **AI assistant** — In-panel prompts and suggestions; content shifts with Healthcare vs HR vs Marketing.
- **Glossaries** — Workspace-specific reference copy (e.g. US healthcare terms, HR concepts, marketing glossary).
- **Testing dashboard** — PM/Admin-only area: evaluation summaries, prompt test tables, load scenarios, and observability-style layouts under [`src/testing-dashboard/`](src/testing-dashboard/).

For a **standalone** run of only the testing UI on port **2303**, see [`testing/README.md`](testing/README.md).

---

## For product and engineering

- **Repository:** [github.com/mahip-kakan/Work-Flow](https://github.com/mahip-kakan/Work-Flow)  
- **Architecture sketch:** [`docs/architecture/healthcare-automation-architecture.excalidraw`](docs/architecture/healthcare-automation-architecture.excalidraw) — open in [Excalidraw](https://excalidraw.com) or a compatible editor.
- **Stack:** React 18, Vite 5, Lucide React. Production builds use a **relative asset base** so the same artifact can be served under any GitHub Pages project path if the repository name changes.

---

## Run locally

```bash
npm install
npm run dev
```

Then open **[http://localhost:2302/](http://localhost:2302/)**.  
`npm run build` writes to `dist/`; `npm run preview` serves the production build locally.

---

## Deploying to GitHub Pages

Deployments are automated from **`main`** via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): build with Vite, copy `index.html` to `404.html` for SPA-friendly refreshes, then publish **`dist/`** to the **`gh-pages`** branch.

**One-time repository configuration**

1. In GitHub: **Settings → Pages → Build and deployment**
2. Set **Source** to **Deploy from a branch**
3. Choose branch **`gh-pages`**, folder **`/ (root)`**

Do **not** point Pages at **`main`** with **`/(root)`** for the site root—that serves the raw repo entry file, not the Vite build, and typically yields a **blank** or broken experience.

**If you see “Site not found”**

- Confirm Pages is enabled and the source is **`gh-pages`** / root (above).
- Confirm the URL path matches the **exact** repository name (including casing), e.g. `…/Work-Flow/`.

**Optional repository rename**

If you use the [Rename repository to workflow-Studio](.github/workflows/rename-repo-to-workflow-studio.yml) workflow (or rename under **Settings → General**), update your git remote and redeploy; you do **not** need to change Vite’s production `base` for asset paths.

---

## Troubleshooting (quick)

| Symptom | What to check |
|--------|----------------|
| Blank page | Pages source should be **`gh-pages`**, not **`main`**. Confirm **Actions → Deploy to GitHub Pages** succeeded on the latest push. |
| Old UI after deploy | Hard refresh or clear site data for `github.io`. |
| Wrong URL | Use `https://<user>.github.io/<repo-name>/` where `<repo-name>` matches this repository exactly. |

---

*This README is the public front door to the repo: it orients PMs and collaborators before they clone or open issues. For deeper implementation detail, start from [`src/App.jsx`](src/App.jsx) and the workspace-specific data under [`src/data/`](src/data/).*
