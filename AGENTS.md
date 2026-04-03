# AGENTS.md — Contributor & Agent Rules

This file defines the rules and conventions every contributor (human or AI agent) must follow when working on **tools-rss-feed**.

---

## Documentation

- Official docs live at **<https://tools.tornevall.net/docs/rsswatch>**.  
  Always check there first for API contracts and feature intentions before making assumptions.
- Archived reference pages (may be outdated):
  - <https://tornevall.atlassian.net/wiki/spaces/TORNEVALL/pages/329305/RSS+Feeds>
  - <https://tornevall.atlassian.net/wiki/spaces/TORNEVALL/pages/329378/rss>
  - <https://tornevall.atlassian.net/wiki/spaces/TORNEVALL/pages/329382/Actively+Supported+RSS+Feeds>

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript (strict) |
| Build tool | Vite 8 |
| Linter | ESLint 9 + typescript-eslint + react-hooks v7 |
| Package manager | npm |

---

## Required commands

Always use these exact commands — do not invent alternatives.

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build (runs tsc -b && vite build)
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

---

## Build rules

1. **The build must pass** (`npm run build`) before any change is considered done.  
   `tsc -b` runs first; fix all TypeScript errors before fixing lint.
2. **Lint must pass** (`npm run lint`) with zero errors before merging.
3. Do not add or upgrade dependencies unless strictly necessary.  
   If you must add one, check the GitHub Advisory Database for known vulnerabilities first.
4. Output goes to `dist/`. Do not commit the `dist/` directory.

---

## TypeScript rules

- All new files must be `.ts` / `.tsx`; plain `.js` files are not allowed in `src/`.
- `strict` mode is enabled — no implicit `any`, no loose nulls.
- Prefer explicit return-type annotations on exported functions.
- Use `unknown` instead of `any` when the shape is not yet known; narrow with type guards.

---

## React / hooks rules

- `eslint-plugin-react-hooks` v7 is enforced; follow its rules without disabling them.
- The `set-state-in-effect` rule is active: do **not** call `setState` synchronously at the top level of a `useEffect` body. Instead initialise state to a loading value (e.g. `loading: true`) and update only inside `.then` / `.catch` callbacks or after an `await`.
- Keep side effects in custom hooks under `src/hooks/`; components should be mostly presentational.
- Do not use class components.

---

## Code style

- Single quotes for strings in TypeScript/TSX.
- No trailing commas in function parameters; trailing commas are acceptable in array/object literals.
- Keep components small and focused. Extract sub-components when a component exceeds ~80 lines.
- Comments should explain *why*, not *what*. Remove commented-out code before merging.

---

## File structure

```
src/
  api/          # Fetch helpers and data-normalisation logic
  components/   # React UI components (presentational)
  hooks/        # Custom React hooks
  types/        # TypeScript interfaces and type aliases
  utils/        # Pure helper functions with no React dependency
```

Add new files inside the appropriate directory. Do not create ad-hoc helper scripts or temporary files inside `src/`.

---

## API conventions

- The backend base URL is `https://tools.tornevall.net/api`.
- All fetch logic belongs in `src/api/rssApi.ts` or a new file inside `src/api/`.
- Always normalise raw API responses through explicit normalisation functions before use. Never cast the raw JSON directly to a typed interface.
- Handle network errors gracefully; surface them through the existing `error` state pattern rather than throwing uncaught exceptions.
