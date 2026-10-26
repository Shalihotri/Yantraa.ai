# Yantraa website

The main page introduces Yantraa's vision for industry-specific agentic workflows. It includes an animated reference workflow, selectable investment-banking and payment-infrastructure examples, clickable architecture components, and a five-layer reference architecture. Decision-model integration is explicitly described as in development; industry workflows are illustrative, not connected production services.

The existing Yantraa Evidence showcase is preserved at **`/evidence.html`**. Its data and experiments are described below.

## Deploy to Vercel

1. Import the `Shalihotri/Yantraa` Git repository into Vercel.
2. Leave **Root Directory** at the repository root. The root `vercel.json` supplies the install command (`npm ci --prefix showcase`), build command (`npm run build --prefix showcase`), and output directory (`showcase/dist`). Framework is set to Other so the Python package is not detected as a backend.
3. Deploy. This static website requires no API keys or environment variables.

Alternatively, set Root Directory to `showcase`, select **Vite**, and use `npm run build` with output directory `dist`. The `showcase/vercel.json` supports that setup too.

CLI deployment, after installing the Vercel CLI and signing in:

```powershell
# Run from the repository root.
npx vercel
# Publish after reviewing the preview deployment.
npx vercel --prod
```

After assigning a production domain, set `og:image` in `index.html` to the absolute public URL of `/yantraa-social.png` for consistent social previews. The Evidence page retains its existing GitHub Pages metadata.

The build emits both `index.html` and `evidence.html`. Relative asset paths also preserve GitHub Pages support under `/Yantraa/`. The existing GitHub Pages workflow will publish the new landing page and Evidence lab when these changes are pushed.

## Local preview

```powershell
cd showcase
npm.cmd ci
npm.cmd run dev -- --host 127.0.0.1
# Open http://127.0.0.1:5173/
```

For a production preview, run `npm.cmd run build`, then `npm.cmd run preview -- --host 127.0.0.1`.

## Website files

- `src/Landing.tsx`: page content, industry examples, and interactive diagrams.
- `src/landing.css`: responsive white, grey, and soft black landing-page design, including reduced-motion support.
- `src/App.tsx`, `src/evidence.tsx`, `src/styles.css`: preserved Evidence lab.
- `src/BrandMark.tsx`, `src/brand.css`: shared logo used by both pages.
- `public/brand/yantraa-mark.webp`, `public/favicon.png`, `public/apple-touch-icon.png`: optimized versions of `logo/yantraa-transparent.png`, retaining transparency.
- `public/yantraa-social.png`, `public/og.png`: branded social-preview images.

The GitHub and discussion links open the repository and a prefilled GitHub issue. There is no contact form or implied submission backend.

## Evidence lab

An interactive, editorial-style page that shows what the `yantraa-evidence` package does, built around a real
model run. It is **not part of the Python package**: `pip install yantraa-evidence` stays UI-free.

Live: https://shalihotri.github.io/Yantraa/

| Section                      | What it shows                                                                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Hero                         | A real `gpt-6-luna` decision, replayed: every record checked, every condition met, and it still said reject                                            |
| 01 The question              | Total cost = checks + model calls + mistakes                                                                                                           |
| 02 Watch a real model decide | 10 requests × 5 strategies: the evidence graph building up, the model's probabilities after each check, what it considered checking next, and the cost |
| 03 What we found             | Three findings from the live run, each with its figure and caveats                                                                                     |
| 04 How it works              | The loop, the information boundary, fail-safe limits, honest statistics                                                                                |
| 05 At scale                  | Offline practice comparison on 120 requests, retail returns and insurance claims, plus `yantraa evaluate` output                                       |
| 06 Your use case             | Nine industries and who it helps                                                                                                                       |
| 07 Get started               | Install, the three commands, a domain in one class                                                                                                     |

## Data

Both files are committed and contain only synthetic cases, model probabilities, costs and traces.

- `src/data/live.json`: the live experiment (OpenAI Decisions API, `gpt-6-luna`, 10 dev requests, 5 strategies,
  2026-10-15). Exported once from a local results database with `export_live.py`; the database itself is not
  committed.
- `src/data/demo.json`: practice-mode comparisons, regenerated from the package at any time:

```bash
uv run python showcase/export_data.py      # from the repo root
```

## Develop and build

```bash
cd showcase
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in showcase/dist
```

`public/og.png` is the 1200×630 link-preview image used by LinkedIn and others. Pushing changes under `showcase/`
to `main` deploys to GitHub Pages ([workflow](../.github/workflows/showcase.yml)).
