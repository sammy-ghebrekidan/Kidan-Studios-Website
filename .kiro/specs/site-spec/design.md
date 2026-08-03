# Kidan Studios — Design System

## Colour Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | #141414 | Page background |
| `--bg-2` | #1a1a19 | Cards, panels |
| `--bg-3` | #222221 | Raised/featured cards |
| `--line` | #2c2c2a | Hairline borders |
| `--line-hi` | #46443f | Emphasised borders |
| `--fg` | #ece8df | Primary text (warm off-white) |
| `--fg-hi` | #f6f4f0 | Headings |
| `--fg-2` | #b7b3aa | Secondary text |
| `--fg-3` | #83807a | Muted/meta text |
| `--on-fg` | #111 | Text on light buttons |
| `--brand` | #008060 | Shopify green |
| `--brand-soft` | #5fcf9e | Accent, status dot, tags |
| `--brand-dim` | rgba(95,207,158,.13) | Glow ring |

**Dark mode only.** Light theme was removed intentionally.

## Typography

| Token | Size |
|-------|------|
| `--t-display` | clamp(42px, 7.6vw, 120px) |
| `--t-h2` | clamp(28px, 3.9vw, 56px) |
| `--t-h3` | clamp(20px, 1.9vw, 29px) |
| `--t-lg` | clamp(17px, 1.35vw, 20px) |
| `--t-base` | 15px |
| `--t-sm` | 14px |

**Tracking:** -0.035em display, -0.018em headings, -0.004em UI, +0.05em labels

**Faces:** Funnel Sans (primary), Inter Tight (secondary/UI)

## Layout

- Max width: 1340px
- Page padding: clamp(20px, 3.2vw, 48px)
- Section rhythm: clamp(46px, 5.2vw, 80px)
- Breakpoints: mobile < 640px, tablet 640–900px, desktop > 900px

## Material Language

- **Buttons:** Brushed-chrome gradient (#f4f4f2 → #d8d8d4 → #f0f0ee), inner white highlight, -1px lift on hover. Ghost: transparent + line border
- **Nav:** Frosted glass — blur(16px) saturate(140%) over rgba veil, 1px inset highlight
- **Status dot:** Soft ambient glow (#5fcf9e)
- **Grain:** SVG fractal-noise at ~7% opacity
- **Hero image:** Deep drop shadow, rounded corners, border

## Component Patterns

### Section Header (.sechead)
Two-column grid: heading + lede left, CTA button right. Collapses to single column on mobile.

### Trust Bar (.trust)
4-column grid with 1px gap borders. Each cell: icon + label (muted) + value (bright).

### Work Row (.wrow)
Two-column: image stack with hover cycling left, text + tags + CTA right.

### Prompt (.prompt)
Card surface with heading + subtext left, button right.

### Pricing Tier (.tier)
Flex column card with badge, name, description, price, feature list, CTA at bottom.
