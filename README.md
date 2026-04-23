# Workflow Studio

A low-code studio to build, deploy, and automate workflows across **Healthcare**, **HR**, and **Marketing** workspaces. The public demo is hosted at **[mahip-kakan.github.io/workflow-Studio](https://mahip-kakan.github.io/workflow-Studio/)** once the GitHub repository is named **`workflow-Studio`** (see below). The product name in the UI is **Workflow Studio**.

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
Local dev uses Vite with `base: '/'`. Production builds use `base: '/workflow-Studio/'` for GitHub Pages (see [`vite.config.js`](vite.config.js)).

### Repository name and Pages URL

GitHub Pages project sites use **`https://<user>.github.io/<repository-name>/`**. This project’s asset `base` is set to **`/workflow-Studio/`**, so the repository on GitHub must be named **`workflow-Studio`** for the live URL to work.

1. On GitHub: **Settings → General → Repository name** → rename **`Health-Flow`** → **`workflow-Studio`** (exact casing if you want this URL path).
2. Update your local remote, for example:  
   `git remote set-url origin https://github.com/mahip-kakan/workflow-Studio.git`
3. Push `main` and let **Deploy to GitHub Pages** run; in **Settings → Pages**, keep source branch **`gh-pages`** / **`/(root)`**.

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

After renaming, the repo will be **[github.com/mahip-kakan/workflow-Studio](https://github.com/mahip-kakan/workflow-Studio)** (update the link if your username or name differs).

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
- **Path casing** — The `base` in `vite.config.js` must match the repository name in the URL exactly (e.g. `'/workflow-Studio/'`). Rename the repo or change `base` and CI `GITHUB_PAGES_BASE` together.

## Tech

- React 18  
- Vite 5  
- Lucide React  
