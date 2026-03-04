# Gravity Flow Studio

A low-code studio to build, deploy, and automate healthcare workflows — part of the Gravity AI Studio experience.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:2302](http://localhost:2302).

## Build

```bash
npm run build
```

Output is in `dist/`.

## Deploy to GitHub Pages

1. **Push this repo** to your GitHub account (you already have `origin` set to `Impact-Flow`):
   ```bash
   git add .
   git commit -m "Add GitHub Pages deploy"
   git push -u origin main
   ```

2. **Enable GitHub Pages** in the repo:
   - Go to **Settings** → **Pages**
   - Under **Source**, choose **Deploy from a branch**
   - Branch: **gh-pages** (or select it after the first workflow run)
   - Folder: **/ (root)**
   - Save

3. **Trigger the workflow**: On every push to `main`, the **Deploy to GitHub Pages** workflow runs, builds the app, and deploys to the `gh-pages` branch. The first run will create that branch.

4. **Live URL**: After deployment, the app will be at:
   **https://mahipkumar-dotcom.github.io/Impact-Flow/**

If you rename the repo, update `base` in `vite.config.js` to match (e.g. `base: '/your-repo-name/'`).

## Tech

- React 18
- Vite 5
- Lucide React icons
