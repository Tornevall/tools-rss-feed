# tools-rss-feed — RSS Watch

A React single-page application that aggregates and displays RSS/Atom feeds managed by the **Tornevall Networks RSS Watch** backend service.

---

## What is this?

**RSS Watch** is a feed-reader front-end for Tornevall Networks' curated collection of RSS/Atom sources.
It talks to the `https://tools.tornevall.net/api/rss` backend, retrieves an overview of all registered feed sources and categories, and then fetches and renders individual feeds on demand.

Key features:

- Browse feeds grouped by **category** or as individual sources.
- **Search / filter** sources by title, URL, or category in real time.
- Parsed XML feed items displayed as cards with title, summary, source, and publish date.
- Analytics aggregation views (daily, weekly, monthly, yearly, bulk).

Full documentation: <https://tools.tornevall.net/docs/rsswatch>

---

## How it works

1. On startup the app calls `GET https://tools.tornevall.net/api/rss` to retrieve the feed overview (list of sources and categories).
2. When the user selects a category slug or a specific source ID, it calls `GET https://tools.tornevall.net/api/rss/feed/{selector}`.
3. The response XML is parsed in-browser by the custom `xmlParser` utility and rendered as a list of feed item cards.

The front-end has no server-side rendering and no build-time configuration beyond the Vite defaults.

---

## Requirements

- **Node.js** ≥ 18  
- **npm** ≥ 9

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/Tornevall/tools-rss-feed.git
cd tools-rss-feed

# 2. Install dependencies
npm install
```

---

## Running locally

```bash
# Start the Vite development server (hot-reload)
npm run dev
```

The app is served at `http://localhost:5173` by default.

---

## Building for production

```bash
npm run build
```

The compiled output is written to `dist/`.  
To preview the production build locally:

```bash
npm run preview
```

---

## Linting

```bash
npm run lint
```

ESLint is configured with `typescript-eslint`, `eslint-plugin-react-hooks` (v7), and `eslint-plugin-react-refresh`.

---

## Project layout

```
src/
  api/          # REST + XML fetch helpers
  components/   # React UI components
  hooks/        # Custom React hooks (useOverview, useFeed)
  types/        # TypeScript interfaces for RSS data
  utils/        # Misc utilities
```

---

## Further reading

- Documentation: <https://tools.tornevall.net/docs/rsswatch>
- RSS Feeds overview (archived): <https://tornevall.atlassian.net/wiki/spaces/TORNEVALL/pages/329305/RSS+Feeds>
- Active feeds reference (archived): <https://tornevall.atlassian.net/wiki/spaces/TORNEVALL/pages/329382/Actively+Supported+RSS+Feeds>
