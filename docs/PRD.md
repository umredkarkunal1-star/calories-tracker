# Product Requirements Document

## Product Status

**Product name in request:** Calorie  
**Verified repository/package name:** `nutritrack-ai-calories`  
**Verified branded UI wording:** mixed between `Nourish` and `Calorise`; `public/manifest.webmanifest` says `Nourish`, while some React/loading copy and logos use Calorise.

This document describes implemented behavior from the source code. Items not found in the source are marked planned or unknown.

## 1. Vision

Provide a calm, premium calorie and nutrition dashboard where a signed-in user can:

- Scan or enter food nutrition.
- Review current-day totals and recent history.
- Track calories, macros, water, and weight.
- View daily and weekly trends.
- Ask a general-purpose AI nutrition guide questions grounded in today's saved scans.
- Manage profile, goals, theme, and reminders.

## 2. Target Users

- Individuals who want quick visual estimates of meal nutrition.
- Users who prefer an account-hosted browser journal rather than a local-only app.
- Mobile users who need camera-first meal capture.
- Desktop users who want a dashboard and history workflow.

## 3. Implemented Pages

### 3.1 Authentication

**Purpose:** Sign in through Puter and expose the app only after scan history loads.

**Interactions:**

- "Log in with Puter".
- Puter sign-in/sign-out.
- Retry when Puter cannot load.
- Optional display-name prompt if no usable profile name exists.

**Behind the scenes:** `puter.auth.isSignedIn()`, `getUser()`, `getProfile()`, Puter KV profile lookup, and full `loadRecords()` pagination.

**Mobile presentation:** At widths 320px-767px, the login page uses a compact Nourish header with a text Help action, a large rounded yogurt-bowl image, a cream login card, and a supporting footer. The desktop login layout remains unchanged at 768px and above. Mobile styling does not alter Puter authentication, loading, or error behavior.

### 3.2 Overview

**Purpose:** Summarize today's nutrition and provide scan/navigation entry points.

**Sections:**

- Welcome and date context.
- Today calorie card and ring.
- Protein, carbohydrate, and fat totals.
- Meal and balance quick statistics.
- Calorie/meal/protein/daily-balance stat cards.
- Calorie goal panel.
- Weekly Scan Activity/Calories chart.
- Estimate disclaimer.
- Weekly progress metrics.
- Recent scans.

**Behind the scenes:** Totals are calculated from `records` by local date. The chart uses saved records from the current Monday-Sunday week. Activity bars are zero for dates with no records. It is not a fabricated reference chart.

### 3.3 Scan History

**Purpose:** Search and inspect saved scan records.

**Interactions:** Search by food name, filter by meal, filter by date, clear filters, open details, and delete a scan.

**Behind the scenes:** Client-side filtering over `records`, Puter KV deletion, optional image deletion, and thumbnail hydration.

### 3.4 Daily History

**Purpose:** Review one date and its calorie, macro, tracker, and meal data.

**Interactions:** Previous/next day, date picker, week strip, daily target edit, water add/reset, weight entry, weekly calorie chart, and meal entry edit/delete.

**Behind the scenes:** Local-date filtering, grouped meal categories, tracker KV object, and Puter scan/image updates.

### 3.5 Nutritionist / AI Nutrition Guide

**Purpose:** Offer general nutrition conversation with current-day scan context.

**Interactions:** Suggested questions, custom questions up to 500 characters, new chat, Enter-to-send, and scan-guided context.

**Behind the scenes:** Reloads scan records, builds current-day context, sends Puter AI chat messages with model `gpt-5.4-nano`, normalizes responses, and keeps the latest 12 conversation entries.

**Status:** Implemented as a general information assistant, not as a licensed nutrition professional or diagnostic system.

### 3.6 Account

**Purpose:** Manage profile and preferences.

**Interactions:** Edit username, contact email, display name, upload/remove profile picture, adjust calorie target, toggle dark mode, toggle scan notifications, set macro goals, set meal reminder, test notification, manage Puter account, or sign out.

**Behind the scenes:** Puter profile/KV/file APIs and browser storage.

### 3.7 Meal Scan

**Purpose:** Analyze a selected image or enter nutrition without AI.

**Flow:**

1. Select/drop a JPG, PNG, GIF, or WEBP image up to 12 MB.
2. Mobile camera can open with `capture="environment"`.
3. Analyze with Puter AI.
4. Review food name, serving, calories, protein, carbs, fat, and description.
5. Choose a meal category.
6. Save image and metadata to Puter.

Alternate flows:

- Manual nutrition entry.
- Barcode lookup through Open Food Facts.

## 4. Scan Data Requirements

- Scans belong to a single authenticated Puter session.
- `createdAt` is captured as an ISO timestamp in local action time.
- Local date is derived with `getLocalDateKey()` and `new Date(record.createdAt)`.
- Calories and macros are estimate values.
- Saving writes the image first, then metadata. Partial failures are reported.
- Editing updates the existing KV record.
- Deleting removes the KV record and an unreferenced image.
- Repeat/log-again creates a new record with a new ID and current timestamp.

## 5. Dashboard and Chart Requirements

- Seven bars represent Monday through Sunday of the current week.
- Each bar aggregates calorie values for all records on that local date.
- A date with no records displays 0.
- Duplicate record IDs must be counted once.
- Bar values are dynamic, while the fixed 3,000-kcal chart scale and 2,100-kcal guide remain visual design elements.
- Future bars are disabled.
- Chart bar clicks open the corresponding daily-history view.

## 6. Authentication and Session Requirements

- Puter sign-in is required for application views.
- Browser storage is local and cannot replace Puter session storage.
- Signing out clears in-memory records and hides the app shell.
- Different app origins use separate Puter storage contexts.

## 7. Notifications

- Scan notifications are optional and device-local.
- Notification permission is requested only for supported secure contexts.
- Meal reminders are saved in Puter KV and run every 15 seconds while the app is open.
- A browser-local key prevents duplicate reminders for the same account/date.
- iPhone/iPad users are instructed to add the app to the Home Screen.

## 8. Mobile Requirements

- Desktop/tablet sidebar adapts to bottom navigation at <=700px.
- Mobile dashboard branding is compact and fixed top-left.
- Mobile scanning may open the rear camera.
- Page and touchpad pinch zoom is restricted while normal scrolling remains.
- Bottom navigation reserves content clearance.

## 9. Functional Requirements

| Requirement | Status |
|---|---|
| Puter sign-in | Implemented |
| Image meal analysis | Implemented, estimate quality depends on AI |
| Manual entry | Implemented |
| Barcode lookup | Implemented |
| Saved scan history | Implemented |
| Edit/delete/repeat scan | Implemented |
| Daily totals | Implemented |
| Weekly chart and metrics | Implemented |
| Dynamic Scan Activity | Implemented |
| Water tracker | Implemented |
| Weight tracker | Implemented |
| AI nutrition guide | Implemented, general guidance only |
| Profile picture | Implemented |
| Dark/light theme | Implemented |
| Meal reminders | Implemented while app is open |
| Scan notifications | Implemented with browser permission |
| CSV export | Implemented |
| Print weekly report | Implemented |

## 10. Planned or Unknown

- No source-controlled backlog or TODO explicitly identifies planned features.
- No verified server-side relational database.
- No verified push-notification service for closed-app reminders.
- No verified automated tests.
- No verified production hosting/deployment configuration.
- No verified import or sharing of scan history.
- No verified multi-device real-time synchronization API beyond Puter KV reads.
- Branding migration is partially implemented and not complete.

## 11. Non-Functional Requirements

- Responsive width support from 320px upward.
- Readable 4.5:1 text contrast goal for normal text.
- Keyboard-operable navigation and dialogs.
- Reduced-motion support.
- No fabricated chart data.
- No secrets in frontend source or documentation.
- Build must complete with Vite.
- Puter origin storage must be disclosed to users.
