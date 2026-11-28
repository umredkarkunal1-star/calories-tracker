# Changelog

This changelog is based on verified Git history and source changes currently present. Pre-change UI rationale and uncommitted work are not invented.

## 2026-11-22 - Calorise Wellness Redesign

Commit: `9782879`

Verified changes:

- Reworked the application as a Calorise wellness dashboard.
- Added the Calorise login-page design.
- Updated README branding.
- Expanded `app.js` scan-history and dashboard behavior.
- Added `public/manifest.webmanifest`.
- Added a minimal service worker.
- Added decorative food assets.
- Added the large `src/nourish.css` theme.
- Expanded `styles.css`.
- Added PWA and notification support.

## 2026-11-22 - Initial Project Publication

Commit: `912b635`

Verified changes:

- Added the initial Vite/React shell.
- Added package manifests.
- Added the legacy HTML application markup.
- Added the base controller in `app.js`.
- Added base CSS.
- Added initial calorie icon assets.

## 2026-11-28 - Calorise Brand Standardization

- Standardized user-facing names in the app, metadata, notifications, and reports to Calorise.
- Renamed the private npm package to `calorise`.
- Updated project documentation to use Calorise as the product name.
- Preserved legacy `nutritrack` and `nourish` storage prefixes for user-data compatibility.

## Additional Implemented Changes

The repository also includes the following previously implemented work:

- Logo and branding asset changes, including Calorise logo variants.
- Sidebar hover/minimized behavior and mobile header adjustments.
- Global touchpad/mobile pinch-zoom restrictions.
- Removal of an earlier sidebar subtitle.
- Replacement and refinement of sidebar outline icons.
- Complete redesign of the Scan Activity calorie card.
- Replacement of hardcoded chart data with actual Puter scan-history aggregation.
- Current-week and local-date chart behavior.
- Responsive activity-chart labels and food decoration.
- User-facing branding is now consistently Calorise; storage identifiers remain unchanged.

## Historical Information Unavailable

- No earlier commit history before `912b635` was found locally.
- No changelog convention or versioned release process was found.
- No source-controlled release notes describe every UI iteration.
