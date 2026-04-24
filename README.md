# Workflow Studio

A low-code studio to build, deploy, and automate workflows across **Healthcare**, **HR**, and **Marketing** workspaces. Production builds use a **relative asset base** (`./`) so the same build works whether the GitHub repo is **`Health-Flow`** or **`workflow-Studio`**. The product name in the app is **Workflow Studio**.

**Live URLs** (use the one that matches your repository name):

- **[mahip-kakan.github.io/Health-Flow](https://mahip-kakan.github.io/Health-Flow/)** if the repo is **`Health-Flow`**
- **[mahip-kakan.github.io/workflow-Studio](https://mahip-kakan.github.io/workflow-Studio/)** if you renamed the repo to **`workflow-Studio`**

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
Local dev uses `base: '/'`. Production builds use **`base: './'`** (see [`vite.config.js`](vite.config.js)) so JS/CSS load correctly under any project Pages path.

### Optional: rename the repository to `workflow-Studio`

Use **Actions → “Rename repository to workflow-Studio”** (or **Settings → General → Repository name**). Then update your remote, e.g. `git remote set-url origin https://github.com/mahip-kakan/workflow-Studio.git`. You do **not** need to change Vite `base` after a rename.

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

Repo: **[github.com/mahip-kakan/Health-Flow](https://github.com/mahip-kakan/Health-Flow)** (or **`workflow-Studio`** if you renamed it).

1. **Push to `main`** — the **Deploy to GitHub Pages** workflow ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) runs `npm run build` and pushes **`dist/`** to the **`gh-pages`** branch.
2. **Repo settings (required)** — **Settings** → **Pages** → **Build and deployment** → **Source**: **Deploy from a branch** → branch **`gh-pages`**, folder **`/ (root)`**.  
   **Do not** use **`main`** / **`/(root)`** for the site root — you will get a **blank page** or broken app (raw `index.html` without the Vite-built assets).
3. **“Site not found” on `*.github.io/...`** — Pages is not enabled or the wrong source is selected. Fix step 2, wait one minute, try again.
4. Open your live URL: **`https://mahip-kakan.github.io/<repository-name>/`** (trailing slash is fine).

**Still seeing an old version after a deploy**

- **Hard refresh** the tab: macOS **Cmd+Shift+R**, Windows **Ctrl+Shift+R**, or open the site in a **private/incognito** window.
- **Clear site data** for `github.io`: DevTools → Application → Storage → “Clear site data” (or remove only `mahip-kakan.github.io`).
- GitHub’s CDN may cache the HTML shell for a few minutes; the workflow now **stamps each deploy** into `index.html` / `404.html` so new builds get a new fingerprint.

**Site not loading / blank page**

- **Wrong Pages source** — Most common: Pages is on **`main`** instead of **`gh-pages`**. Switch to **`gh-pages`** as above, wait a minute, hard-refresh.
- **Actions** — In the **Actions** tab, open **Deploy to GitHub Pages** and confirm the latest run on `main` is green.
- **First deploy** — Until the workflow runs once, the `gh-pages` branch may not exist; run the workflow (push to `main` or **Run workflow**), then select `gh-pages` in Pages settings.
- **Wrong `*.github.io` path** — The path after `github.io` must be your **exact** repository name (`Health-Flow` vs `workflow-Studio`).

## Tech

- React 18  
- Vite 5  
- Lucide React  
