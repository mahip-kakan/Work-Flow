# Workflow Studio

A low-code studio to build, deploy, and automate workflows across **Healthcare**, **HR**, and **Marketing** workspaces. The public demo is **[mahip-kakan.github.io/workflow-Studio](https://mahip-kakan.github.io/workflow-Studio/)** after the repository is named **`workflow-Studio`** (see **Rename repository** workflow below). The product name in the app is **Workflow Studio**.

## What’s in the app

- **Flow editor** — Triggers, actions, templates (healthcare clinical flows, HR onboarding/TA, marketing recipes).
- **Discover & product flows** — Browse pre-built agents by domain or pillar for each workspace.
- **AI assistant & glossaries** — Healthcare US terms, HR concepts, or marketing help; plus notes on **MCP** (Model Context Protocol), interoperability, and automation patterns where relevant.
- **Action configuration** — Each step opens a contextual settings panel (care plans, Tasks, Microsoft Teams, email, models/agents, reminders, and more).
- **Roles** — Switch between Developer, Product Manager, and Admin (affects sidebar and access to the testing dashboard).

## Run locally

```bash
npm install
npm run dev
```

Open **[http://localhost:2302/](http://localhost:2302/)**.  
Local dev uses Vite with `base: '/'`. Production builds use **`base: '/workflow-Studio/'`** (see [`vite.config.js`](vite.config.js)) — the GitHub repo must be named **`workflow-Studio`** so Pages serves **`https://mahip-kakan.github.io/workflow-Studio/`**.

### One-time: rename the GitHub repository (so the live URL works)

This repo may still be named **`Health-Flow`**. Vite’s `base` is **`/workflow-Studio/`**, so you must rename the repository once:

1. On GitHub open **Actions** → workflow **“Rename repository to workflow-Studio”** → **Run workflow** → confirm.  
   - If GitHub returns **403**, use **Settings → General → Repository name** and type **`workflow-Studio`** instead.
2. Update your local git remote, for example:  
   `git remote set-url origin https://github.com/mahip-kakan/workflow-Studio.git`
3. If the site 404s briefly, open **Actions** → **Deploy to GitHub Pages** → **Re-run all jobs** on the latest `main` run.

## Testing dashboard (PM / Admin)

1. In the studio, open the **user menu** (top right) → **View as** → **Product Manager** or **Admin**.
2. Use the **Testing** (beaker) item in the left sidebar.

The UI lives under [`src/testing-dashboard/`](src/testing-dashboard/). For a **standalone** dev server on port **2303**, see **[testing/README.md](testing/README.md)**.

## Architecture diagram

An Excalidraw diagram of the healthcare automation / data / MCP-style stack is in:

[`docs/architecture/healthcare-automation-architecture.excalidraw`](docs/architecture/healthcare-automation-architecture.excalidraw)

Open it in [Excalidraw](https://excalidraw.com) or with the Excalidraw extension in VS Code / Cursor.

## Build & preview

```bash
npm run build    # output in dist/
npm run preview  # local preview of production build
```

## Deploy to GitHub Pages

GitHub repo (after rename): **[github.com/mahip-kakan/workflow-Studio](https://github.com/mahip-kakan/workflow-Studio)**.

1. **Push to `main`** — the **Deploy to GitHub Pages** workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) runs `npm run build` and pushes the contents of **`dist/`** to the **`gh-pages`** branch.
2. **Repo settings (required)** — **Settings** → **Pages** → **Build and deployment** → **Source**: **Deploy from a branch** → choose branch **`gh-pages`**, folder **`/ (root)`**.  
   **Do not** set the source to **`main`** with **`/ (root)`**. If you do, GitHub serves the raw repo `index.html` (with `/src/main.jsx`), which only works with `vite dev` — the site will look blank or broken in production.
3. **Live site** — **[https://mahip-kakan.github.io/workflow-Studio/](https://mahip-kakan.github.io/workflow-Studio/)**  
   Use this `*.github.io` URL, not the raw `github.com/.../workflow-Studio` code URL.

**Still seeing an old version after a deploy**

- **Hard refresh** the tab: macOS **Cmd+Shift+R**, Windows **Ctrl+Shift+R**, or open the site in a **private/incognito** window.
- **Clear site data** for `github.io`: DevTools → Application → Storage → “Clear site data” (or remove only `mahip-kakan.github.io`).
- GitHub’s CDN may cache the HTML shell for a few minutes; the workflow now **stamps each deploy** into `index.html` / `404.html` so new builds get a new fingerprint.

**Site not loading / blank page**

- **Wrong Pages source** — Most common: Pages is on **`main`** instead of **`gh-pages`**. Switch to **`gh-pages`** as above, wait a minute, hard-refresh.
- **Actions** — In the **Actions** tab, open **Deploy to GitHub Pages** and confirm the latest run on `main` is green.
- **First deploy** — Until the workflow runs once, the `gh-pages` branch may not exist; run the workflow (push to `main` or **Run workflow**), then select `gh-pages` in Pages settings.
- **Path casing / 404** — Vite `base` and `GITHUB_PAGES_BASE` must match the **repository name** in the URL (here **`/workflow-Studio/`**). If the repo is still **`Health-Flow`**, run the rename workflow or rename in Settings, then redeploy.

## Tech

- React 18  
- Vite 5  
- Lucide React  
