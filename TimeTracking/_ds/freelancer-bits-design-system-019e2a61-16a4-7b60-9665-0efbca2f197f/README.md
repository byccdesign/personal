# Freelancer Bits — Design System

> **Bits** is Freelancer.com's official design system. It's a live showcase at <https://bits.freelancer.com/> for building "functional, beautiful interfaces that match the brand, principles, and language of Freelancer's design system."

This project is a **portable copy** of Bits as a design system folder — tokens, fonts, assets, content rules, and high-fidelity UI kits — so design agents and prototypes can produce work that looks genuinely on-brand.

---

## Sources used to assemble this system

| Source | Use |
|---|---|
| `uploads/freelancer-bits-tokens.json` | Authoritative token file. Colors, spacing, radii, type. Every token in `colors_and_type.css` traces back here. |
| <https://bits.freelancer.com/> | Live showcase. Used for nav structure, illustrations, brand voice, layout principles. |
| <https://bits.freelancer.com/info/general-rules> | "No native HTML elements", layout rules, single-direction margin. |
| <https://bits.freelancer.com/foundations> | Foundations: Accessibility, Colors, Copywriting, Grid, Illustrations, Layouts, Spacing, Typography, Forms. |
| `www.f-cdn.com/assets/bits/en/assets/...` | CDN that serves logos, illustrations, OG images. |
| <https://www.freelancer.com/> | The flagship product Bits is built for. Used to inform UI kit. |

No codebase or Figma file was provided. Components are reconstructed from the token file and the public showcase. If you have the internal Angular component repo or Figma library, share it and we can tighten the UI kit to exact pixel parity.

---

## What Freelancer.com is

Freelancer.com is the world's largest freelancing marketplace — clients post projects, freelancers bid, milestone-based payment escrow protects both sides. The product surface includes a marketing site, a project browsing/bidding app, a chat/collaboration layer, an enterprise portal, contests, and a mobile app. Bits powers all of it through Angular components (`fl-link`, `fl-picture`, `fl-grid`, `fl-col`, etc.) layered with Tailwind text utilities.

---

## Index

Files in the root of this project:

```
README.md              ← you are here
SKILL.md               ← invocation guide for Claude Code
colors_and_type.css    ← single source of truth for CSS vars
fonts/                 ← Roboto via Google Fonts (see fonts/README.md)
assets/                ← logos, illustrations, favicon
preview/               ← design-system cards (rendered in the DS tab)
ui_kits/
  freelancer/          ← high-fi UI kit recreating the flagship product
    index.html         ← interactive click-through prototype
    *.jsx              ← modular components
    README.md          ← what's covered, what's not
```

---

## Content fundamentals

Voice on bits.freelancer.com and freelancer.com is **plain, confident, second-person, and outcome-focused.** It assumes the reader is a maker — a freelancer, a client, a developer — and respects their time.

**Tone**
- Direct, declarative, professional but warm. Not corporate, not playful.
- Active voice. Verbs do work: *"Build,"* *"Hire,"* *"Get,"* *"Stay,"* *"Make."*
- Confident, not hype-y. No exclamation marks except in CTAs occasionally ("It's free and easy!").

**Person**
- **"You"** for the user. ("Start making your dreams reality.")
- **"We"** for Freelancer.com. ("We've got freelancers for jobs of any size.")
- Almost never "I."

**Casing**
- **Sentence case** everywhere: page titles, section headers, buttons, nav items. ("Get started," not "Get Started.")
- Component and token names in **kebab-case** (`fl-link`, `text-secondary`, `border-radius-md`).
- Brand names keep their cap: "Freelancer," "Bits."

**Specific examples** (verbatim from bits.freelancer.com / freelancer.com)
- *"Easily build functional, beautiful interfaces that match the brand, principles, and language of Freelancer's design system."*
- *"A live showcase of Freelancer.com's official design system, Bits"*
- *"Start making your dreams reality. No job is too big or complex."*
- *"80% of jobs receive bids within 60 seconds."*
- *"Only pay for work when you are 100% satisfied with the outcome."*
- CTAs: "Get started," "Hire a Freelancer," "Post a Project," "Sign up."

**Don'ts**
- No emoji in product UI. (Freelancer.com is emoji-free; emoji surface only in user-generated chat content.)
- No em-dash-heavy editorial style; copy is short, declarative sentences.
- No "click here" links — link the noun.
- No ALL CAPS except small labels (badges, tag chips at 12px caption size).

---

## Visual foundations

**Color vibe.** Cool, crisp, optimistic. The system is dominated by **bright primary blue (#1772eb)** for action, with **freelancer-blue (#29b2fe)** as the brand mark and **orange (#f57207 / #ff6700)** as the secondary accent (Preferred Freelancer badge, ratings emphasis, illustration highlights). Neutrals are cool blue-greys — pure white canvas, mid-greys for body text, near-black `#12151b` for max-contrast. Greens and reds are saturated and confident. Never sepia, never warm-toned.

**Backgrounds.** Predominantly **flat white (`#ffffff`) or off-white (`#fcfcfd`)**. Light grey (`#eef0f4`) for input fills and divider zones. Marketing hero areas use full-bleed photography (people working, laptops, real human moments) with a subtle dark overlay for text contrast, or large flat illustrations. **No gradients in product UI.** No noise textures, no patterns. Bits's own illustrations are flat, geometric SVGs with bold orange + freelancer-blue color blocks.

**Typography.** Single family — **Roboto** — at four weights (300/400/500/700). Headings are tight (`line-height: 1.2`), body is comfortable (`1.5`), long-form reading goes `1.7`. Headings are bold; H2/H3/H4 step down to medium 500 (per the token spec) for a calmer typographic hierarchy. Marketing display sizes scale from 50px up to 90px hero. Negative letter-spacing only on the largest sizes.

**Spacing.** Bits enforces a **single-direction margin convention** — components push their neighbours via `margin-right` and `margin-bottom` only — so re-ordering or removing them never leaves dangling whitespace. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 72, 96 px. The system is **mobile-first** with a 12-column flex grid (`fl-grid` / `fl-col`).

**Borders.** 1px solid `#bcc5d3` (neutral-300) is the default rule. Stronger separators step to `#5c6f8c`. Focus rings are 2–3px blue `#1772eb` (the `--shadow-focus` token). Borders carry the weight that shadows would in most systems.

**Shadows.** **Used sparingly.** Bits prefers borders for separation. When shadows do appear (popovers, dropdowns, modals over scrim, sticky headers on scroll), they're soft and cool-toned, never warm: low-opacity neutral-600. No "elevation 24"-style dramatic drops. Modal scrim is `rgba(18, 21, 27, 0.6)`.

**Corner radii.** Generous but not extreme. Buttons/inputs/badges sit at **6px**; cards/modals at **8px**; tooltips/popovers at **12px**; chips at **4px**; pills/avatars at fully round. Square corners are rare.

**Cards.** White background, **1px `#bcc5d3` border**, **8px radius**, **24px padding**. Shadows are optional and very subtle — most cards in the product use border-only separation. On hover, the border darkens to `#5c6f8c` (neutral-400) or — for cards that act as primary CTAs — the border goes blue.

**Buttons.**
- *Primary:* solid `#1772eb` fill, white text, medium 500 weight, 6px radius, 8/24 padding. Hover → `#115cc0`.
- *Secondary:* white fill, `#bcc5d3` border, blue `#1772eb` text. Hover → border darkens, very subtle bg tint.
- *Danger:* solid `#f84438` fill, white text.
- *Tertiary / Link:* blue text only, underlines on hover.

**Hover states.** Solid fills *darken* (blue-600 → blue-700). Outlined elements *strengthen border* + slight tint. Text links underline. There's no opacity-based hover.

**Press states.** A tick deeper than hover (`blue-900` for primary press in some surfaces) and an inset feel from the focus ring. No "scale-down" press animation.

**Focus rings.** 3px blue glow (`--shadow-focus`) outside the element. Always visible on keyboard focus.

**Animation.** Restrained. The default motion vocabulary is short fades (150–200ms), subtle slides, and ease-out timing. Bits has a dedicated [Motion](https://bits.freelancer.com/motion) page suggesting motion is part of the system but kept utilitarian. No bounces, no playful springs in product UI.

**Transparency & blur.** Rarely used. Modal scrims are the main place transparency appears. There's no glassmorphism, no frosted nav bars, no parallax. Bits is built for clarity and performance over visual flair.

**Layout rules.** 12-column flex grid, mobile-first, content max-width capped around the `wide` breakpoint (1280px) for marketing pages and ~960px for app shells. Sticky headers are common; sidebars in the product UI; the marketing site uses a fixed top nav with the freelancer-blue logo, primary links right-aligned, "Sign Up" as a primary CTA.

**Imagery.** Marketing photography is **warm, human, candid** — real freelancers in real workspaces, often shot wide with natural light. Editorial photography sometimes gets a subtle desaturation/dark overlay. Product illustration is the opposite: **flat, geometric, brightly colored** — heavy use of freelancer-blue + orange — small inline spots for empty states and onboarding moments.

---

## Iconography

Freelancer.com ships its own icon font — `flicon` — referenced in markup like `<i class="flicon-search"></i>`. This system uses **SVGs lifted from the Bits CDN** for the logo + section illustrations (see `assets/`); for everything else we substitute **Lucide** (`https://unpkg.com/lucide@latest`) via CDN.

Lucide is chosen because it has the closest stroke weight and visual personality to Freelancer's own inline UI icons (1.5–2px stroke, rounded line-caps, geometric construction). **This is a substitution and is flagged.** If you have access to the `flicon` font, drop the WOFF/WOFF2 into `fonts/` and replace the Lucide CDN reference in the UI kit.

**Approach**
- **Inline UI icons** (search, chevron, close, etc.) → 16/20/24px Lucide SVGs, stroke 1.75, currentColor.
- **Section spot illustrations** → flat multi-color SVGs (see `assets/introduction.svg`, `assets/components.svg`, `assets/patterns.svg`). Heavy orange + freelancer-blue palette.
- **Logos** → `assets/freelancer-logo.svg` (full-color brand mark) and `assets/bits-logo-light.svg` / `bits-logo-dark.svg`.
- **Emoji** → not used in product UI.
- **Unicode dingbats** → not used.

---

## Quick start for designers / agents

1. Link `colors_and_type.css` once at the top of any HTML you write.
2. Use the CSS variables (`var(--blue-600)`, `var(--space-mid)`, etc.) rather than hex codes — that's how you stay aligned with Bits.
3. For typography, prefer the semantic classes (`.t-h1`, `.t-body`, `.t-caption`) over inline font-size.
4. Lift components from `ui_kits/freelancer/` rather than hand-rolling — they already encode the right paddings, borders, and hover behaviour.
5. Single-direction margins: when laying out, push elements with `margin-right` and `margin-bottom` only.
6. Sentence case all UI copy.

---

## Caveats & open questions

- **No internal codebase or Figma was provided.** The UI kit is reconstructed from the public Bits showcase + token file. It will be close, but components like `fl-grid`, `fl-picture` etc. are mocked, not lifted from source.
- **Icon font substitution.** Lucide stands in for the `flicon` font. Visual personality is close; specific icons may differ.
- **Photography in the UI kit** uses Unsplash CDN URLs for placeholder hero/category images. Swap to real Freelancer marketing imagery when available.
