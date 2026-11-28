# AGENTS.md - Calorie Project Agent Instructions

## 1. Purpose

This repository is a browser-first calorie and nutrition tracker. It is not a conventional React application with a local component library and server API. The React app in `src/` fetches a prebuilt HTML document (`public/legacy.html`) and then loads the imperative application controller in `app.js`.

Use this file before making changes. It is the primary source of repository-specific instructions. The detailed specifications are in `docs/`.

## 2. Verified Technology Stack

- React 19.1.1, mounted through `src/main.jsx`.
- Vite 7.1.7 with `@vitejs/plugin-react`.
- Plain JavaScript DOM/controller code in `app.js`.
- Plain HTML markup in `public/legacy.html`.
- Plain CSS in `styles.css` and `src/nourish.css`.
- Puter.js SDK loaded from `https://js.puter.com/v2/`.
- Puter KV for user-scoped key/value records.
- Puter filesystem storage for meal and profile images.
- Puter AI chat for image nutrition analysis and nutrition guidance.
- Open Food Facts product API for barcode lookup.
- Browser Notifications and a minimal service worker.
- No installed chart library, state-management package, router package, UI framework, or backend framework.

## 3. Project Structure

- `index.html`: React entry document; loads Puter and `src/main.jsx`.
- `src/main.jsx`: creates the React root and imports both stylesheet layers.
- `src/App.jsx`: fetches `/legacy.html`, inserts it into React, imports and initializes `app.js`.
- `public/legacy.html`: canonical visible markup for authentication and application views.
- `app.js`: application state, DOM bindings, Puter calls, routing, AI, history, account, trackers, and notifications.
- `styles.css`: large base/legacy style system loaded by both entry paths.
- `src/nourish.css`: later theme and component rules; its selectors often override `styles.css`.
- `public/service-worker.js`: notification service-worker lifecycle only.
- `public/calorise-logo.png` and generated 192/512 variants: application branding assets.
- `public/food-bowl.webp` and `public/food/*.png`: static decorative food assets.
- `public/manifest.webmanifest`: PWA metadata.
- `dist/`: generated build output; do not edit or commit as source.
- `docs/`: detailed project documentation.

## 4. Naming and Source Truth

The repository has inconsistent historical branding:

- User-facing markup varies between `Nourish` and `Calorise`.
- `package.json` and package-lock retain `nutritrack-ai-calories`.
- `app.js` constants, storage prefixes, notification keys, and filenames use `nutritrack` or `nourish`.
- No single branding rename has been applied consistently.

Do not assume a name is canonical. Inspect visible markup and metadata before renaming. Preserve existing user storage keys unless a migration is explicitly approved. Never silently alter Puter keys or app-origin data.

## 5. Existing Architecture Rules

- Preserve the React shell/legacy markup/controller architecture unless the task explicitly authorizes a migration.
- Do not create duplicate sidebar, header, scan, dashboard, account, or route components.
- Modify `public/legacy.html` for markup and `app.js` for behavior. Modify React only for shell-level concerns.
- `src/nourish.css` loads after `styles.css`, and may override it. Test computed styles and both stylesheet layers.
- Event handlers are centralized in `bindEvents()` in `app.js`.
- `dom` at the top of `app.js` is the application element lookup registry.
- State is module-level; no React context or global store is used.
- The app uses in-memory `records`, `accountProfile`, `trackers`, `favorites`, and `nutritionistConversation`.
- Use the existing `navigate(view, updateUrl)` function for route transitions. Do not add a parallel router.
- Route paths are `/overview`, `/scan-history`, `/daily-history`, `/nutritionist`, and `/account`.

## 6. Coding Standards

- Match the existing plain-JavaScript style: `"use strict"`, 2-space indentation, named functions, template literals for dynamic markup.
- Keep existing variable and key naming conventions.
- Escape dynamic HTML through `escapeHtml()`. Escape DOM selectors through `cssEscape()` where appropriate.
- Use `getLocalDateKey()` for local calendar-date grouping. Do not aggregate ISO timestamps by UTC date unless the requirement explicitly calls for UTC.
- Normalize numeric values with `formatNumber()`, `roundToOne()`, and `sum()`.
- Prefer updating the existing `records` array and rerendering relevant views over introducing a second source of truth.
- Guard browser APIs and Puter APIs with explicit checks and readable errors.
- Do not log API keys, tokens, full identities, scan contents, or private profile values.
- Console diagnostics may include account UUID suffixes and scan storage context, but secrets and full images must never be logged.
- Do not add dependencies for functionality that plain JavaScript/CSS already provides.

## 7. Markup and Component Rules

- Preserve existing IDs used by `dom` and event binding.
- When renaming an ID or route, update `dom`, markup, CSS, browser-history logic, and tests together.
- Use semantic `<section>`, `<aside>`, `<nav>`, `<dialog>`, `<button>`, `<form>`, and `<table>`/list markup appropriately.
- Decorative icons should use `aria-hidden="true"`; meaningful controls need accessible names.
- Keep icon geometry visually consistent, 20px in desktop sidebar navigation and 19px on mobile.
- Do not introduce a second sidebar, mobile header, or toast system.
- Keep dynamic dialogs native and closeable.

## 8. Design Consistency

- Primary light palette: cream `#f7f5ed`, card `#fffdf7`, ink `#183b2d`, muted `#69756c`, sage `#6e8753`, and line `#dedfd5`.
- Base stylesheet palette: page `#f6f5ef`, surface `#fffefa`, ink `#26322a`, muted `#58665d`, border `#e2e4da`, green `#2f6248`.
- Dark mode is controlled by `document.documentElement.dataset.theme` and persisted in `nourish:theme`.
- Preserve current warm, natural, restrained dashboard language. Avoid gradients unless an existing component already uses a conic/radial progress pattern.
- Do not redesign unrelated cards.
- Desktop sidebar: 80px collapsed and 248px expanded. Tablet: compact 76px rail. Mobile: fixed bottom navigation.
- Sidebar width uses 300ms ease-in-out; labels progressively fade.
- Respect `prefers-reduced-motion: reduce`.
- Touch actions must preserve scrolling and block pinch zoom where explicitly required.

## 9. Database and Storage Rules

There is no verified SQL database or Supabase project.

- Scan records are Puter KV values under `nutritrack:scan:<ISO timestamp>:<id>`.
- Scan record fields are `id`, `createdAt`, `imagePath`, `mealType`, `foodName`, `servingSize`, `calories`, `protein`, `carbs`, `fat`, and optional `description`.
- Scans are listed with `puter.kv.list({ pattern: "nutritrack:scan:", returnValues: true, reverse: true, limit: 1000 })`.
- Images are stored under `nutritrack/scans/<recordId><extension>` and profile images under `nutritrack/profile-pictures`.
- Aggregations must filter by local date and sum real records. Never add sample or static chart values.
- Update the in-memory `records` array immediately after successful add/edit/delete operations, then rerender affected views.
- Account-scoped keys use the Puter UUID suffix. Preserve these prefixes and account scoping.
- Theme is browser-local storage, while reminder delivery state is browser-local storage keyed by account and date.
- The name prompt skip flag is browser session storage.

## 10. Authentication and Authorization

- Authentication is entirely Puter.js.
- Verify `window.puter`, `puter.auth.isSignedIn()`, `puter.auth.getUser()`, and sign-in/sign-out state.
- `enterApp()` must successfully load scan history before the app shell is shown.
- UI route functions must remain guarded by `currentUser`.
- Do not implement local passwords or a separate user table.
- All account-scoped key names and scan/list operations depend on Puter session context.
- If loadRecords fails, keep scan-dependent views hidden and show a retryable error.

## 11. AI and External APIs

- Meal image analysis uses `puter.ai.chat(prompt, selectedFile, false, options)` and must return JSON-like nutrition fields.
- Validate `foodName`, calories, protein, carbs, and fat before displaying or saving.
- Nutritionist chat uses model `gpt-5.4-nano`, 700/500-token limits, current-day scan context, and a general-guidance system prompt.
- Barcode lookup calls `https://world.openfoodfacts.org/api/v2/product/<barcode>.json`.
- No app-owned API key is configured by the repository.
- Never document or commit secrets. Environment variable setup is not required by the current code.
- Browser CORS/network failures should return project-readable errors.

## 12. Error Handling

- Use `errorMessage()` for readable Puter or browser errors.
- Use inline alert regions for forms/scans and toast status for non-blocking feedback.
- Do not silently fall back to sample data.
- Network/storage failures must surface through UI and console diagnostics.
- Preserve scan-estimate state after a save failure if possible.
- Image cleanup failures are partial failures and must not claim that the complete operation failed incorrectly.
- Mark known but unverified database or deployment behavior as "Not Verified."

## 13. Responsive and Input Requirements

- Breakpoints include 1200px, 960px, 900px, 700px, 390px, 360px, and 420px in various sheets.
- Desktop >960px uses a sidebar. 961-1200px uses the sidebar transition rules and a 248px expanded width.
- 701-960px uses a compact 76px sidebar rail.
- <=700px uses a fixed bottom navigation and mobile top branding.
- Touch targets should remain usable. Mobile navigation labels use `data-mobile-label`.
- Disable touchpad/mobile pinch zoom while preserving normal scrolling and touch interactions.
- Test 320px, 375px, 390px, 700px, 960px, 1200px, and 1440px widths.

## 14. Testing and Verification

Run at least:

```sh
npm run build
git diff --check
```

For UI changes, also verify:

- Dashboard, history, daily history, nutritionist, account, and scan routes.
- Sign-in/sign-out state.
- Add, edit, repeat, and delete scan flows.
- Empty and populated history states.
- Local-date grouping and calorie totals.
- Desktop hover expansion/collapse and mobile bottom navigation.
- Light and dark themes.
- Reduced-motion behavior.
- Browser console and network failures.
- 320px to 1440px responsive layouts.
- No horizontal page overflow.

There is no current automated test suite or test script in `package.json`.

## 15. Deployment

- Run `npm run dev`; Vite serves at `http://localhost:5173` using strict port mode.
- Run `npm run build` for `dist/`.
- Run `npm run preview` for local preview.
- Puter storage is origin-scoped. `localhost`, `127.0.0.1`, ports, and deployed domains have separate user storage contexts.
- Vite fallback must serve SPA routes; deployment behavior beyond the local Vite config is Not Verified.

## 16. Definition of Done

Implementation is complete only when:

- The task is implemented in the existing source surfaces.
- No unrelated markup, routes, or files are changed.
- Existing navigation and storage behavior remain intact.
- Dynamic user data has no hardcoded fabrication.
- Mobile and desktop layouts are verified.
- Build and diff checks pass.
- Documentation is updated for externally visible or architectural changes.
