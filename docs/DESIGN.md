# Design System

## 1. Brand Direction

The design is warm, calm, health-oriented, and premium. The implemented system uses cream surfaces, deep botanical greens, muted sage, serif display headings, and restrained DM Sans interface text. The brand logo is a black/flame-style transparent PNG asset.

Calorise is the sole user-facing product name across the interface, metadata,
notifications, and reports. Legacy `nutritrack`/`nourish` storage prefixes are
internal compatibility identifiers and are not branding.

## 2. Base Theme Colors

Actual values from `styles.css`:

| Token | Light value |
|---|---|
| `--page` | `#f6f5ef` |
| `--surface` | `#fffefa` |
| `--surface-soft` | `#f0f1e9` |
| `--surface-hover` | `#e9eee7` |
| `--ink` | `#26322a` |
| `--muted` | `#58665d` |
| `--subtle` | `#68756c` |
| `--border` | `#e2e4da` |
| `--green` | `#2f6248` |
| `--green-hover` | `#254f39` |
| `--green-soft` | `#e7eee5` |
| `--goal` | `#2d503d` |
| `--goal-text` | `#fffefa` |
| `--goal-muted` | `#dce7dc` |
| `--goal-track` | `#536e59` |
| `--goal-fill` | `#f0d7a9` |
| `--accent` | `#a3542f` |
| `--danger` | `#a34f45` |
| `--protein` | `#315e86` |
| `--carbs` | `#a3542f` |
| `--fat` | `#85652f` |

## 3. Calorise Theme Colors

Actual values from `src/nourish.css`:

| Token | Value |
|---|---|
| `--color-ink` | `#183b2d` |
| `--color-ink-soft` | `#42564a` |
| `--color-ink-muted` | `#69756c` |
| `--color-cream` | `#f7f5ed` |
| `--color-card` | `#fffdf7` |
| `--color-card-muted` | `#f1f0e7` |
| `--color-sage` | `#a8b493` |
| `--color-sage-dark` | `#6e8753` |
| `--color-sage-pale` | `#e4e9d8` |
| `--color-butter` | `#f4dc8b` |
| `--color-butter-pale` | `#faedbd` |
| `--color-peach` | `#efb58b` |
| `--color-line` | `#dedfd5` |
| `--color-danger` | `#a65d52` |

## 4. Dark Theme

`src/nourish.css` defines:

- Canvas: `#101b17`
- Sidebar: `#0c1512`
- Card: `#182820`
- Raised card: `#1e3026`
- Card muted: `#22362b`
- Dark ink: `#f5f1e5`
- Dark ink soft: `#d5d8c9`
- Dark ink muted: `#9ca89a`
- Dark sage: `#a9bc82`
- Bright sage: `#c4d99a`
- Dark sage track: `#344a39`
- Butter: `#f2d77f`
- Peach: `#d99470`
- Line: `#304439`
- Line soft: `#26392f`
- Danger: `#e18b7d`

Light mode is the default. The dark theme is selected by `html[data-theme="dark"]`
and saved as `nourish:theme`.

## 5. Typography

External fonts loaded through Google Fonts:

- `DM Sans`: interface text and controls.
- `Cormorant Garamond`: primary display serif in the later theme.
- `Lora`: alternative heading serif in legacy CSS.
- `Outfit`: some legacy controls and auth UI.
- `JetBrains Mono`: available utility face.

Do not introduce a new font family without a design reason. Keep Cormorant Garamond headings and DM Sans UI text in the current dashboard design.

Examples of actual hierarchy:

- Auth heading: approximately clamp(38px, 4.5vw, 62px), Cormorant Garamond.
- Main welcome heading: approximately clamp(30px, 3vw, 42px).
- Card headings: 28px in the later theme.
- Activity Calories heading: 25px.
- Navigation: 13px/500.
- Eyebrow: 10-11px/600.
- Chart values: 10px desktop, 9px mobile.

## 6. Spacing and Sizing

The repository does not define a formal 4px/8px token scale. Implementations consistently use 2, 4, 6, 7, 8, 9, 10, 12, 13, 14, 16, 18, 20, 22, 24, 28, 34, 38, 44, 48, and 56px increments.

Preserve existing component dimensions:

- Desktop nav item height: 48px.
- Sidebar 80px collapsed; 248px expanded.
- Tablet rail: 76px.
- Brand logo: 40px desktop; 24px mobile header.
- Profile avatar: 38px.
- Main topbar: 70px base, 46px mobile.
- Standard button min-height: 46px base, 38-48px component overrides.

## 7. Buttons

- Base border radius: 7px/10px/14px depending stylesheet layer.
- Later app buttons use 14px radius and 48px minimum height.
- Primary later-theme button uses cream text on `#183b2d`.
- Secondary buttons use card surfaces and `--color-line`.
- Text buttons are compact and underline on hover only where explicitly styled.
- The Add a Meal hover uses green `#4c775a` with cream text and 5px/14px shadow.
- Disable state uses reduced opacity.

## 8. Cards and Surfaces

- Cards generally use `#fffdf7` or `#fffefa`, 14-21px radius in later UI, and subtle 1px borders.
- Dashboard panels may use 18-21px radii.
- Existing card shadows are light: for example `0 10px 24px rgba(24, 59, 45, .045)`.
- Dark cards switch through dark semantic tokens.
- Avoid heavy elevation.

## 9. Sidebar

- Desktop >960px: icon rail starts at 80px and expands to 248px on hover.
- Transition: approximately 300ms width/padding, ease-in-out.
- Labels fade and translate progressively.
- Profile copy and sign-out button expand with the rail.
- No persistent collapse button.
- At <=960px: compact left rail or bottom navigation.
- At <=700px: fixed bottom navigation with five equal columns and icon plus short mobile label.
- Mobile header brand is fixed top-left with a 24px transparent logo and 14px wordmark.

## 10. Header and Mobile Navigation

- Desktop topbar is 70px base and contains the breadcrumb and date context.
- Mobile topbar is 46px and fixed branding occupies the upper left.
- At <=700px the sidebar becomes bottom navigation.
- Mobile content reserves at least 92px bottom clearance plus safe-area inset.

## 11. Icons

The sidebar uses consistent inline SVG icons:

- Overview: house
- Scan history: clock/history
- Daily history: calendar
- Nutritionist: chat bubble
- Account: profile

Rules:

- 20px at desktop, 19px in mobile navigation.
- 1.75px stroke in the later sidebar override.
- Same line style and round line caps/joins.
- Active and hover icons use sage/ink colors.

## 12. Scan Activity Chart

The chart redesign in `public/legacy.html`, `app.js`, and `src/nourish.css` uses:

- Warm `--color-card` background.
- 1px `--color-line` border.
- 20px card radius.
- 254px chart height desktop, 232px mobile.
- Seven equal columns.
- 28px desktop bar width.
- Sage-green bar `#8fa27b`; hover `#778c64`.
- 5px top corners and 2px bottom corners.
- 7 horizontal grid lines.
- Grid line color `rgba(66, 86, 74, .13)`.
- Y-axis: 3,000, 2,000, 1,000, 0.
- Dashed 2,100 kcal guide line.
- 10px desktop values, 9px mobile values.
- 11px desktop day labels, 10px mobile.
- Decorative ramen/bowl art in the upper-right.

The chart scale is 3,000 kcal; actual dynamic totals determine bar height.

## 13. Images

- Logos use transparent PNG assets with `object-fit: contain`.
- Decorative food image in the chart uses a 96px x 66px desktop frame and 76px x 54px mobile frame.
- Chart art uses 16% opacity, multiply blend, and no pointer interaction.
- Static dashboard art uses the existing `public/food/*.png` assets.
- Profile and meal thumbnails use cover/crop behavior where appropriate.
- No asset may be stretched beyond its source ratio.

## 14. Animation and Interaction

- View transitions: approximately 220ms ease.
- Sidebar: 300ms ease-in-out.
- Labels: 160-220ms.
- Button colors: 180ms.
- Chart bar hover color: 160ms.
- Reduced-motion sets animation/transition durations to 0.01ms or disables sidebar transitions.
- Normal touchpad/mouse scrolling remains enabled.
- Pinch zoom is intentionally blocked at document/touch-action level.

## 15. Loading, Empty, and Error States

- Initial React load uses a centered status: "Loading Calorise…".
- Initial scan load failures keep app views hidden and display a retryable auth message.
- Scans use inline `#scan-error`, result-empty, and busy button labels.
- Scan history/recent scans use `emptyState(...)`.
- Daily history shows `No meals logged for this day`.
- Nutritionist has separate status, error, empty, and loading states.
- Account forms have field and status regions.
- Toast feedback appears for 4.2 seconds.

## 16. Focus and Accessibility

- Focus-visible controls have a 3px `#6c997c` outline and 3px offset.
- Dialogs use native HTML dialog elements.
- Navigation uses buttons with explicit `aria-label`.
- Chart bars use accessible names and current/selected state.
- Status and error regions use `role="status"` or `role="alert"` where present.
- Decorative SVG and art are hidden or given empty alt text.

## 17. Responsive Breakpoints

| Breakpoint | Verified behavior |
|---|---|
| >1200px | Full desktop layout |
| <=1200px | Sidebar padding/content width adjustments |
| <=960px | 76px compact sidebar |
| 701-900px | Two-column/one-column history controls |
| <=700px | Fixed bottom navigation and mobile header |
| <=390px | Compact calendar/buttons/ring spacing |
| <=360px | Narrow topbar padding and date width |

No formal desktop/tablet breakpoint framework is installed. CSS media queries are the source of truth.
