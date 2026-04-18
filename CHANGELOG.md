# Changelog

## 0.1.0 - 2026-04-17

- Updated the client to follow the current Tools RSS API contract instead of assuming numeric source IDs everywhere.
- Source selection now prefers the API-provided opaque `publicSelector` when available.
- Added normalization for additive overview metadata such as `feedUrl`, `categoryFeedUrl`, `hidden`, and category `name` fallbacks.
- Added environment-driven API base handling through `VITE_TOOLS_API_BASE_URL` or `VITE_TOOLS_BASE_URL`.
- Updated the project README to document the current selector model and configuration.

