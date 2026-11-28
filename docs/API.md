# API and Integration Documentation

## 1. Overview

The application has no app-owned HTTP backend. Verified integrations are browser SDK calls, one direct HTTP API, browser APIs, and static assets.

No API keys or secrets are stored in the repository or configured through environment variables.

## 2. Puter.js SDK

**Loaded by:**

- `index.html`
- `public/legacy.html`

**URL:** `https://js.puter.com/v2/`

### Authentication

No manual endpoint.

| Method | Purpose |
|---|---|
| `puter.auth.isSignedIn()` | Check signed-in state |
| `puter.auth.signIn()` | Start sign-in |
| `puter.auth.signOut()` | Sign out |
| `puter.auth.getUser()` | Get current user identity |
| `puter.auth.getProfile()` | Get Puter profile |

Authentication errors are normalized with `errorMessage()`.

### KV API

| Operation | Usage |
|---|---|
| `puter.kv.get(key)` | Read a profile, target, goals, trackers, favorites, or reminder |
| `puter.kv.set(key, value)` | Create/update a JSON object or primitive |
| `puter.kv.del(key)` | Delete scan metadata |
| `puter.kv.list(options)` | Paginate scan records |

Scan list example:

```js
puter.kv.list({
  pattern: "nutritrack:scan:",
  returnValues: true,
  reverse: true,
  limit: 1000,
  cursor,
});
```

There is no documented app-owned endpoint or HTTP status contract for Puter calls.

### Filesystem API

| Method | Purpose |
|---|---|
| `puter.fs.write(path, file, options)` | Upload meal images |
| `puter.fs.upload(files, directory, options)` | Upload profile images |
| `puter.fs.read(path)` | Read a stored image as a Blob |
| `puter.fs.delete(path)` | Delete unneeded image |

Puter FS response shape is consumed only through `path` and success/error behavior. Exact service response documentation is Not Verified.

## 3. Puter AI API

### Meal image analysis

**Call:** `puter.ai.chat(prompt, selectedFile, false, { temperature: 0.2 })`

**Input:**

- Text prompt
- Selected image File
- Third argument: `false` (not used by app as an explicit documented option)
- Temperature `0.2`

**Expected response shape:** string or a response object containing:

- `text`
- `content`
- `message.content`
- `choices[0].message.content`
- `choices[0].text`

**Parsed fields:**

```json
{
  "foodName": "string",
  "servingSize": "string",
  "calories": 0,
  "protein": 0,
  "carbs": 0,
  "fat": 0,
  "description": "string"
}
```

All numeric fields must be finite and non-negative. Calories are rounded to an integer; macros are rounded to one decimal.

### Nutritionist chat

**Call:** `puter.ai.chat(messages, false, options)`

**Options used:**

- model: `gpt-5.4-nano`
- temperature: `0.35`
- max_tokens: `700`
- normalize: `true`

Fallback call:

- temperature: `0.2`
- max_tokens: `500`
- normalize: `true`

**Message format:** OpenAI-style `{ role, content }` objects:

- `system`
- optional retained conversation entries
- current user question

The system prompt includes current-day totals and saved scan metadata.

## 4. Open Food Facts

**Endpoint:**

```text
GET https://world.openfoodfacts.org/api/v2/product/{barcode}.json
```

**Barcode:** URL-encoded by `encodeURIComponent()`.

**Response condition:** HTTP 2xx and a `product` property.

**Used fields:**

- `product.product_name`
- `product.generic_name`
- `product.serving_size`
- `product.nutriments["energy-kcal_100g"]` or `["energy-kcal"]`
- `product.nutriments.proteins_100g` or `proteins`
- `product.nutriments.carbohydrates_100g` or `carbohydrates`
- `product.nutriments.fat_100g` or `fat`

**Error behavior:** No product or non-2xx response produces an inline barcode lookup error.

## 5. Browser Notification API

No HTTP endpoint.

- Notification permission is requested through `Notification.requestPermission()`.
- Delivery uses `ServiceWorkerRegistration.showNotification()` when available.
- Fallback uses `new Notification(title, options)`.
- Service worker registration: `/service-worker.js`.

Notification options include body and `/calorise-logo-192.png`.

## 6. Browser Storage APIs

No external API.

| Key/API | Purpose |
|---|---|
| `nourish:theme` | Light/dark theme |
| `sessionStorage nutri...name-prompt-skipped` | Skip display-name prompt for current session/account |
| `localStorage calories:last-reminder:<account>:<date>` | One reminder per account/date |

## 7. Google Fonts

Two pages load Google Fonts through CSS URLs:

- DM Sans
- Cormorant Garamond
- Lora
- Outfit
- JetBrains Mono

This requires external network access. No credentials are required.

## 8. Environment Variables

No `process.env` or `import.meta.env` references are used by the application.
The comment-only `.env.example` documents that no runtime environment variables
are required.

There are no environment variable names to configure in the current implementation.

Puter.js loads through a CDN script and is used directly as `window.puter`.

## 9. Error Contract

The project does not define a server response contract. Browser-side errors are normalized by:

- Puter `error.msg`
- Standard `error.message`
- String errors
- Project fallback text

The UI uses inline errors or toasts for storage/network failures.

## 10. Security Notes

- Do not add API keys to the frontend.
- Do not use Vite `VITE_*` variables for private values; they are embedded in client assets.
- Puter session authorization is provider-managed.
- Open Food Facts data is not authenticated by a project key.
- AI output is untrusted and must be parsed/validated before saving.
- Dynamic AI text must not be interpreted as HTML or instructions.
