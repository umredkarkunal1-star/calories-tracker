# calorise Login Page Design

## Purpose

A calm, welcoming sign-in screen for a calorie tracker. The page frames food tracking as a supportive daily habit rather than a restrictive task. Puter is the only sign-in provider.

## Visual direction

The interface uses an editorial wellness aesthetic: warm paper tones, leafy greens, soft citrus accents, generous whitespace, and restrained serif headlines paired with clean sans-serif UI text. The brand mark combines overlapping seed/leaf forms to suggest nourishment and growth.

- **Background:** warm off-white (`#f7f6ef`)
- **Primary text and CTA:** deep forest green (`#20392e`)
- **Accent:** muted leaf green (`#526d45`) with a soft lime highlight (`#c0d877`)
- **Typography:** DM Sans for interface text, with a classic serif treatment for the main headline and image caption

## Desktop layout

At wider viewports, the page is a two-part composition. The left panel contains the Nourish wordmark, a short sign-in headline, concise supportive copy, and the single primary action. The right panel carries the food illustration, with a translucent daily-calorie summary card layered over it. A small footer anchors the composition without competing with the login action.

The primary action is a full-width dark-green **“Log in with Puter”** button. A short note beneath explains that Puter handles authentication and that users do not need another password.

## Mobile layout

At mobile widths, the layout becomes one vertical column. The brand header and sign-in copy remain first, followed by the same full-width Puter button and sign-in guidance. The illustration moves below the sign-in area and becomes a shorter, rounded visual panel. The summary card remains legible and overlays the illustration without obscuring the login action. Spacing and type scale down while keeping touch targets large and readable.

## Image used

The right-side visual uses an original generated editorial food illustration: an overhead ceramic bowl of yogurt, strawberries, blueberries, peach, granola, and honey on a warm pale-yellow surface. It is displayed with descriptive alt text and reused at a shorter crop on mobile.

- **Asset URL:** `/manus-storage/async-images/lnRTEqF2pA8lXWCgnfvgKn/image-1.webp`
- **Alt text:** “A colorful bowl of yogurt, berries, peach and granola”
- **Usage:** full-height desktop visual panel; responsive cropped panel beneath the login content on mobile

## Sign-in behavior

There is only one sign-in option: **Log in with Puter**. On a website, clicking the button starts Puter’s sign-in flow. In a Puter-launched app, the page checks for the existing Puter session and displays a signed-in state instead of opening a sign-in popup. Progress, cancellation, popup-blocked, and error states are communicated next to the button.

## Responsive implementation

The interface uses CSS breakpoints to switch from a two-column desktop layout to a single-column mobile layout. The page is designed to work down to narrow phone widths, preserves visible keyboard focus, and honors reduced-motion preferences.
