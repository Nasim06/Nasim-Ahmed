# Nasim Ahmed — Portfolio

Astro + TypeScript + Tailwind v4. Static output, deployed to Vercel.

## Commands

| Command                | What it does                                       |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Dev server at `localhost:4321`                     |
| `npm run build`        | Type-check (`astro check`) then build to `dist/`   |
| `npm run preview`      | Serve the production build                         |
| `npm run lint`         | ESLint (TypeScript, Astro, jsx-a11y strict)        |
| `npm run format`       | Prettier (with Astro + Tailwind class sorting)     |
| `npm run test:a11y`    | Playwright + axe (WCAG 2.2 AA), desktop and mobile |
| `npm run test:install` | One-off: install Playwright's Chromium             |

## Structure

```
src/
├─ content.config.ts      typed schemas for the collections
├─ content/projects/      one Markdown file per case study
├─ content/experience/    roles and education
├─ data/site.ts           name, pitch, links, availability
├─ lib/content.ts         shared getters/formatters (reuse these for any new homepage)
├─ styles/global.css      design tokens, focus styles, reduced-motion rules
├─ layouts/               BaseLayout, CaseStudyLayout
├─ components/            Hero, ProjectCard, ExperienceList, header/footer…
└─ pages/                 index, work/[slug], 404
e2e/a11y.spec.ts          axe + keyboard + overflow + reduced-motion tests
```

## Writing content

Search the repo for `[PLACEHOLDER]` to find everything still to write.

- **Case studies** (`src/content/projects/*.md`) must use exactly four `##` sections, in order:
  `Problem`, `Approach`, `Trade-offs`, `Result`. The build fails if one drifts.
- `order` controls homepage position; `featured: false` hides from the homepage; `draft: true`
  hides from production builds.
- Dates are `'YYYY'` or `'YYYY-MM'` (quoted).
- Put your CV at `public/cv.pdf`.
- Set the real domain in `astro.config.mjs` (`site`) and `public/robots.txt`.

## Planned

- ⌘K command palette
- Hidden terminal mode
- Lighthouse CI in GitHub Actions
- "Nasim OS '99" retro-desktop homepage — reads the same collections via `src/lib/content.ts`;
  projects already carry an optional `desktop.icon` field.
