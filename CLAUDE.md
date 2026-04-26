# CISO Protection Gap — Microsite

**Unprotected: The CISO Liability Gap** — a data-driven microsite for Hitch Partners presenting findings from the 2024–2025 CISO Compensation Survey (n=943, North America).

## Stack

- **Framework**: React 19 + Vite (`npm run dev` / `npm run build`)
- **Routing**: react-router-dom — two routes: `/` (Landing) and `/findings` (Findings)
- **Charts**: Custom inline-styled React components; recharts used minimally
- **Animation**: framer-motion (`FadeInSection` wrapper)
- **Deployment**: Vercel — auto-deploys on push to `main`

## Project Structure

```
src/
  data/findings.js          ← Single source of truth for ALL chart data
  pages/
    Landing.jsx             ← / route — hero, intro, CTA
    Findings.jsx            ← /findings route — 8 sections (s1–s8), sticky side-nav
  components/
    charts/                 ← One component per visualization
      ProtectionStackBar.jsx
      TierStackVisualization.jsx
      CohortLadder.jsx
      TitleGapComparison.jsx   ← Section 03 title gap bar chart
      BoardAccessComparison.jsx
      ReportingLineDotPlot.jsx
      StructureSizeToggle.jsx
      LACTool.jsx              ← Interactive LAC (Liability-Adjusted Comp) calculator
      YoYComparison.jsx
    design-system/index.jsx  ← Shared primitives: SectionHeader, Callout, ChartWrapper, etc.
  index.css                 ← All CSS custom properties (colors, spacing, typography)
```

## Data

All chart data lives in `src/data/findings.js`. Exports: `headline`, `tiers`, `tierColors`, `tierAggregations`, `fourCohorts`, `titleGap`, `industryData`, and more. Edit data here; components consume it directly — no API, no state management.

## Design System

CSS custom properties only — no Tailwind, no CSS modules. All tokens defined in `src/index.css`:

- **Fonts**: `--font-display` Cormorant Garamond · `--font-body` DM Sans · `--font-data` IBM Plex Mono
- **Accent color rule**: `--color-accent` (`#00897B`) is reserved exclusively for unprotected/gap metrics. Use `--color-data-protected` (`#0A1628`) for protected metrics, `--color-data-neutral` for neutral.
- **Spacing scale**: `--space-xs` through `--space-3xl`

## Sections (Findings page)

| ID  | Nav Label    | Chart Component         |
|-----|--------------|-------------------------|
| s1  | 01 Scale     | ProtectionStackBar      |
| s2  | 02 Grade     | TierStackVisualization + CohortLadder |
| s3  | 03 Title Gap | TitleGapComparison      |
| s4  | 04 Governance| BoardAccessComparison + ReportingLineDotPlot |
| s5  | 05 Structure | StructureSizeToggle     |
| s6  | 06 LAC Tool  | LACTool (interactive)   |
| s7  | 07 Trend     | YoYComparison           |
| s8  | 08 Implications | text/callout only    |

## Key Constraints

- All data figures are verified against `DATA_VERIFICATION.md.txt` — do not change numeric values without checking that file.
- The Hitch Partners logo is at `src/assets/hitch_logo.png` and appears in both page headers.
- No backend, no build-time data fetching — everything is static.
