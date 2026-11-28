# Calorise

This repository contains a browser-based calorie and nutrition tracker built with React, Vite, vanilla JavaScript, and Puter.js.

Calorise is the product's user-facing name. Existing `nutritrack` and `nourish`
storage prefixes are retained as internal compatibility identifiers so saved
user data continues to load.

## Key Features

- Puter account sign-in.
- Meal photo upload, drag/drop, mobile camera, and AI nutrition estimation.
- Manual nutrition entry and Open Food Facts barcode lookup.
- Saved scan history with search and filters.
- Dynamic Monday-Sunday calorie chart based on actual scan records.
- Daily history, calorie target, macros, water, and weight.
- AI nutrition chat grounded in today's saved scans.
- Profile, goals, theme, notification, and reminder settings.
- CSV export and printable weekly report.
- Desktop hover sidebar and mobile bottom navigation.
- Light theme by default, optional saved dark theme, and reduced-motion support.

## Technology

- React 19
- Vite 7
- Plain JavaScript controller
- Plain HTML and CSS
- Puter.js Auth/KV/FS/AI
- Open Food Facts API
- Browser Notification API
- PWA manifest and minimal service worker

No backend server, SQL schema, chart package, UI package, or state-management package is present.

## Prerequisites

- Node.js and npm.
- A modern browser.
- Internet access for Puter.js and external services.
- A Puter account for app data and AI features.
- HTTPS or `localhost` for notifications and some browser APIs.

## Installation

```sh
npm install
```

## Development

```sh
npm run dev
```

Open `http://localhost:5173`.

Vite is configured for strict port `5173` and host `localhost`.

Puter storage is origin-scoped. Different origins, ports, and domains can have separate data contexts.

## Production Build

```sh
npm run build
npm run preview
```

`dist/` contains generated build output. Do not edit it directly.

On Netlify, `public/_redirects` is copied into `dist/` by Vite. It rewrites direct
visits and reloads on app routes to `index.html` without changing the URL. Add a
matching rewrite when adding a new client-side route.

## Environment Variables

No environment variables are currently required or read by the application. The
comment-only [`.env.example`](.env.example) records that setup explicitly; you do
not need to create a local `.env` file to run the project.

Puter.js is loaded from `https://js.puter.com/v2/`.
Authentication, storage, and AI use the signed-in user's Puter session. The app
does not require an app-owned AI or Open Food Facts key. Do not add private
credentials to `VITE_*` variables: Vite embeds those values in browser assets.
If a future integration needs a private credential, it must be handled by a
trusted server-side component, not this client-only application.

## Project Structure

```text
.
├── AGENTS.md
├── README.md
├── CHANGELOG.md
├── app.js
├── index.html
├── package.json
├── package-lock.json
├── styles.css
├── vite.config.js
├── public/
│   ├── legacy.html
│   ├── manifest.webmanifest
│   ├── service-worker.js
│   ├── food-bowl.webp
│   ├── calorise-logo*.png
│   └── food/
└── src/
    ├── main.jsx
    ├── App.jsx
    └── nourish.css
```

The React shell fetches `public/legacy.html`, then dynamically imports `app.js`.

## Storage Overview

- Scan records: Puter KV under `nutritrack:scan:`.
- Profiles/preferences: account-scoped Puter KV keys.
- Meal images: `nutritrack/scans/`.
- Profile pictures: `nutritrack/profile-pictures/`.
- Theme: browser `localStorage`.
- Theme defaults to light; a user's dark-mode choice is saved in browser `localStorage`.
- Reminder delivery: browser `localStorage`.
- Name prompt skip: browser `sessionStorage`.

There is no verified SQL database or Supabase project.

## Verification

No automated test script is configured.

At minimum, run:

```sh
npm run build
git diff --check
```

Also manually verify:

- Sign-in and sign-out.
- Scan add/edit/repeat/delete.
- Zero-activity and populated charts.
- Daily and history routes.
- Desktop/mobile sidebar behavior.
- Light/dark theme.
- Notification permission.
- 320px-1440px layouts.

## Documentation

- [Agent Instructions](AGENTS.md)
- [Product Requirements](docs/PRD.md)
- [Design System](docs/DESIGN.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Features](docs/FEATURES.md)
- [API and Integrations](docs/API.md)
- [Database and Storage](docs/DATABASE.md)
- [Change History](CHANGELOG.md)
