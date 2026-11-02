# EastWest Ageas lead flow style guide

The prototype in `create-lead.html` implements these tokens and component patterns. The values are based on the supplied Figma create lead flow (1440 × 1024 screens). The full CSS style guide and component styling live in `create-lead.css`, linked by the HTML page.

## Foundations

| Token | Value | Use |
| --- | --- | --- |
| Ink | `#263234` | Headings and primary copy |
| Muted ink | `#5C6668` | Supporting copy |
| Primary | `#AF1F72` | Progress, focus, selected state, primary action |
| Primary soft | `#D28CB6` | Disabled primary action |
| Info surface | `#E8F9FB` | Privacy and guidance notices |
| Info accent | `#00A7BD` | Notice icon |
| Error | `#C43C4B` | Invalid control border and inline error |
| Surface / canvas | `#FFFFFF` | Cards, fields, page |
| Field border | `#D5D9DA` | Default input border |
| Font | Lato, 400 / 700 / 800 / 900 | Body, labels, card titles, page titles |
| Radius | 6px / 8px / pill | Fields / cards / buttons |
| Content width | 426px | Centered form column |
| Spacing | 4px base; common 8, 12, 16, 24, 32, 40px | Component gaps and padding |

## Type hierarchy

- Page title: 22px, Lato 900, 1.3 line height, slight negative tracking. The completion heading is 28px.
- Choice title: 20px, Lato 700, tight line height.
- Body and choice description: 14px, Lato 400.
- Field labels and inline feedback: 12px, Lato 400; feedback uses error color.

## Reusable components

- **Progress rule:** 5px top edge with a magenta-to-orange gradient; width follows the current step.
- **Step header:** 48px circular badge with a 144.38° amber-to-magenta gradient and a centered white Material Symbol; title centered below.
- **Notice:** cyan-tinted rounded panel, info icon, concise accessible guidance.
- **Text field:** label above a 40px control; clear focus ring; inline error below the control.
- **Choice card:** 96px minimum height, 60px icon disk, title and description, selected border and check.
- **Date picker:** one text field with a Material calendar toggle and Angular Material inspired popup. It supports month navigation, month/year selection, keyboard date navigation, and automatically formatted MM/DD/YYYY entry.
- **Phone field:** country calling code prefix and telephone input in a shared bordered control.
- **Buttons:** pill-shaped secondary Back and 16px primary Continue/Create account actions.
- **Success state:** green gradient confirmation mark, 28px centered title, two-line completion message, magenta “Back to Sales Portal” action, and a one-shot decorative Lottie confetti animation.
- **Brand:** the linked vector parts from the supplied EastWest Ageas logo frame, stored locally in `assets/`.

## Interaction and validation

- Account type, gender, and required controls must be selected or completed before Continue advances.
- First and last names are required; letters, spaces, apostrophes, periods, and hyphens are accepted. Middle name is optional and can be explicitly skipped.
- Date of birth must be a real date, not in the future, and indicate age 18 or older.
- Mobile number expects a 10-digit Philippine number beginning with 9; `+63` is displayed as the dialing prefix.
- Email is required and checked for a basic valid address shape.
- Errors appear beside the relevant control and are associated through `aria-describedby`; keyboard focus is moved to the first invalid control.
- Reduced motion preference is respected; the layout adapts to narrow screens.

The confetti `.lottie` file is stored locally in `assets/confetti.lottie`. It is credited to Sportbank Design and distributed under the Lottie Simple License. The LottieFiles dotLottie web component is loaded from its pinned CDN package to play it.

## Implementation notes

Tokens and component styles are in `create-lead.css`. The wizard uses small rendering functions for each step, shared choice and field helpers, and a single state object. No framework or build step is required. Lato and Material Symbols are served by Google Fonts when network access is available, with Arial as the text fallback.
