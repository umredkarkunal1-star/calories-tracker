# Complete Feature Inventory

## 1. Authentication

### Puter sign-in

- **Purpose:** Authenticate and isolate Puter KV/filesystem data.
- **Location:** Auth screen.
- **Files:** `public/legacy.html`, `app.js`.
- **Interaction:** Click "Log in with Puter".
- **Function:** `signIn()`, `enterApp()`.
- **Dependencies:** Puter Auth.
- **Output:** App shell or retryable auth error.
- **Status:** Implemented.

### Puter sign-out

- **Purpose:** End the session and clear in-memory data.
- **Locations:** Sidebar, account page.
- **Function:** `signOut()`.
- **Status:** Implemented.

### Display-name prompt

- **Purpose:** Personalize the app if no profile name is available.
- **Interaction:** Native name dialog or skip.
- **Dependencies:** Puter profile/KV and session storage.
- **Status:** Implemented.
- **Limitation:** Skip state is browser-session-only.

## 2. Overview Dashboard

### Today calorie summary

- **Purpose:** Show calorie and macro totals for the local current date.
- **Files:** `public/legacy.html`, `app.js`, `src/nourish.css`.
- **Internal:** Filters `records` by `getLocalDateKey()`, sums calories/protein/carbs/fat.
- **Status:** Implemented.

### Calorie goal progress

- **Purpose:** Show remaining/over calorie target.
- **Interaction:** Adjust goal.
- **Storage:** Account-scoped Puter KV.
- **Status:** Implemented.

### Daily nutrition balance

- **Purpose:** Calculate a heuristic life/balance score from calorie target and protein goal.
- **Internal:** No health diagnosis; score is a dashboard heuristic.
- **Status:** Implemented.
- **Limitation:** Not validated clinical guidance.

### Quick stats

- **Purpose:** Show meals, protein, and balance.
- **Status:** Implemented.

### Scan Activity/Calories chart

- **Purpose:** Show real calorie totals for Monday-Sunday.
- **Internal:** Local-date grouping of in-memory `records`, no predefined values.
- **Interactions:** Click bars to open Daily History.
- **Status:** Implemented.
- **Data:** 0 for dates without records.
- **Limitation:** Fixed 3,000 scale may compress very high totals visually.

### Weekly insights

- **Purpose:** Show logging streak, active-day average, protein average, and highest day.
- **Internal:** `getLastSevenDays()` and `calculateLogStreak()`.
- **Actions:** Export CSV and print report.
- **Status:** Implemented.

### Recent scans

- **Purpose:** Show latest four scans.
- **Interactions:** Open details or View All.
- **Status:** Implemented.

## 3. Meal Scanning

### Image upload/drop

- **Purpose:** Select a meal photo.
- **Input:** JPEG/PNG/GIF/WEBP up to 12MB.
- **Interactions:** Browse, drag/drop, replace, remove.
- **Status:** Implemented.

### Mobile camera

- **Purpose:** Open rear-facing capture on mobile devices.
- **Dependencies:** Browser capture API.
- **Status:** Implemented.
- **Limitation:** Browser/device support varies.

### AI image analysis

- **Purpose:** Estimate meal name, serving, calories, and macros.
- **API:** Puter AI, image plus text prompt.
- **Validation:** Rejects invalid JSON fields and no-food responses.
- **Status:** Implemented.
- **Limitation:** Estimates may be imperfect.

### Manual entry

- **Purpose:** Add nutrition values without AI.
- **Fields:** Name, quantity, meal, calories, protein, carbs, fat.
- **Status:** Implemented.

### Barcode lookup

- **Purpose:** Retrieve product nutrition.
- **API:** Open Food Facts product API.
- **Status:** Implemented.
- **Limitation:** Uses 100g nutriment fields if serving-specific values are not present.

### Save scan

- **Purpose:** Persist image and scan metadata.
- **Image:** `nutritrack/scans/<id><ext>`
- **Record:** `nutritrack:scan:<createdAt>:<id>`
- **Status:** Implemented.
- **Partial failure handling:** Distinguishes saved history from UI update failure.

### Optional scan notification

- **Purpose:** Notify after save.
- **Dependencies:** Browser Notification API and service worker.
- **Status:** Implemented.

## 4. Scan History

### Search

- **Purpose:** Filter by food-name substring.
- **Status:** Implemented client-side.

### Meal filter

- **Purpose:** Filter breakfast/lunch/dinner/snacks/all.
- **Status:** Implemented.

### Date filter

- **Purpose:** Filter exact local date.
- **Status:** Implemented.

### Clear filters

- **Purpose:** Reset search, meal, and date.
- **Status:** Implemented.

### Scan details

- **Purpose:** Show meal name, date, serving, calories, macros, description, image, favorite, and repeat.
- **Status:** Implemented.

### Favorites

- **Purpose:** Store record IDs for later repeat actions.
- **Storage:** Account-scoped Puter KV key.
- **Status:** Implemented.
- **Limitation:** No separate favorites view; details can toggle favorite and repeat.

### Repeat/log again

- **Purpose:** Create a new record with current timestamp from a saved meal.
- **Status:** Implemented.

### Delete scan

- **Purpose:** Remove metadata and potentially unreferenced image.
- **Dependencies:** Puter KV and FS.
- **Status:** Implemented.
- **Limitation:** Confirmation is browser `confirm()` and image deletion failure is partial.

## 5. Daily History

### Date navigation

- **Purpose:** Move between dates.
- **Status:** Implemented.

### Week strip

- **Purpose:** Quick select Monday-Sunday.
- **Status:** Implemented.

### Daily calorie target

- **Purpose:** Show consumed, target, and remaining/over.
- **Status:** Implemented.

### Protein/carbs/fat/scan cards

- **Purpose:** Summarize a selected date.
- **Status:** Implemented.

### Water tracker

- **Purpose:** Add 250/500ml or reset water for selected date.
- **Storage:** `TRACKERS_KEY_PREFIX`.
- **Status:** Implemented.

### Weight tracker

- **Purpose:** Save 20-500kg weight for selected date.
- **Status:** Implemented.

### Weekly calories chart

- **Purpose:** Show Monday-Sunday actual calorie totals and target.
- **Status:** Implemented.

### Meal grouping

- **Purpose:** Group entries by breakfast/lunch/dinner/snacks.
- **Status:** Implemented.
- **Limitation:** Older records without explicit mealType infer category from local scan hour.

### Edit/delete entries

- **Purpose:** Update or remove individual scan metadata.
- **Status:** Implemented.

## 6. Nutritionist

### Context summary

- **Purpose:** Show current-day saved totals and food list.
- **Status:** Implemented.

### Suggested questions

- **Purpose:** Send predefined nutrition prompts.
- **Status:** Implemented.

### Custom chat

- **Purpose:** Ask general nutrition questions.
- **Status:** Implemented.
- **Limit:** 500 characters.
- **Backend:** Puter AI.
- **Model:** `gpt-5.4-nano`.

### Chat reset

- **Purpose:** Clear conversation and restore welcome message.
- **Status:** Implemented.

## 7. Account

### Personal information

- **Purpose:** Save username, contact email, and display name.
- **Storage:** Account-scoped Nourish profile KV key.
- **Status:** Implemented.

### Profile picture

- **Purpose:** Upload/remove app profile image.
- **Max size:** 8MB.
- **Storage:** Puter FS and profile KV.
- **Status:** Implemented.

### Daily calorie target

- **Purpose:** Set 1-20,000 kcal reference.
- **Status:** Implemented.

### Dark/light mode

- **Purpose:** Change theme.
- **Storage:** Browser `localStorage`.
- **Status:** Implemented.

### Scan notifications

- **Purpose:** Notify after saving a scan.
- **Storage:** Profile preference and browser notification permission.
- **Status:** Implemented.

### Macro goals

- **Purpose:** Save protein, carbs, and fat goals.
- **Status:** Implemented.

### Meal reminder

- **Purpose:** Send a same-device reminder while app is open.
- **Status:** Implemented.
- **Known limitation:** Not a server or closed-app reminder scheduler.

### Puter account management link

- **Purpose:** Open Puter account management.
- **Status:** Implemented external link.

## 8. Sidebar and Header

### Desktop hover sidebar

- **Purpose:** Collapse to icon rail and expand on hover.
- **Status:** Implemented.
- **Widths:** 80px and 248px.

### Tablet rail

- **Purpose:** Keep icons in a compact 76px rail.
- **Status:** Implemented at <=960px.

### Mobile bottom navigation

- **Purpose:** Provide five persistent navigation items.
- **Status:** Implemented at <=700px.

### Mobile brand header

- **Purpose:** Show compact logo and brand.
- **Status:** Implemented.

## 9. Export and Print

### CSV export

- **Purpose:** Download a quoted CSV with seven days of calories/macros/scans.
- **Status:** Implemented client-side.

### Print report

- **Purpose:** Open a printable report table.
- **Status:** Implemented.
- **Limitation:** Browser pop-up permission is required.

## 10. Global Interactions

### Toasts

- **Purpose:** Report success/error without blocking.
- **Status:** Implemented.

### Pinch zoom

- **Purpose:** Prevent accidental touchpad/mobile zoom.
- **Status:** Implemented through Ctrl+wheel, gesture events, viewport, and touch-action.

### Theme

- **Purpose:** Select light/dark.
- **Status:** Implemented.

## 11. Known Verified Limitations

- Brand text/metadata is not consistent.
- No automated test suite.
- The weekly chart data on Overview uses real records, not static sample values.
- Notifications require HTTPS/localhost and may not work closed-app.
- Barcode lookup depends on external Open Food Facts data.
- Puter storage behavior depends on app origin.
- No source-controlled SQL schema, migrations, RLS, or server routes exist.
