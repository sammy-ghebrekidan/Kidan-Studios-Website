---
inclusion: auto
---

# Kidan Studios — Project Rules

## Voice & Tone
- First person singular: "I build", never "we build" or "the studio builds"
- Lowercase headings and UI labels; sentence case in body copy and articles
- No inflated metrics, no invented client names, no agency language
- Direct and specific — "no pitch deck, no retainer talk" is the register

## Design System — Do Not Change
- Dark mode only. A light theme was built and deliberately removed — do not reintroduce
- Colours use CSS custom properties defined in `globals.css` (:root block)
- Two typefaces: Funnel Sans (primary) and Inter Tight (secondary/UI)
- Buttons use a brushed-chrome gradient — do not flatten to solid colours
- Service cards are static — no hover spotlight, no lift, no icon rotation. These were built and deliberately removed

## Architecture Rules
- Next.js 15 App Router with file-based routing
- All pages are server components unless they need client interactivity
- Components use global CSS class names from `globals.css` — do not introduce CSS Modules or Tailwind without explicit approval
- GSAP loads via CDN Script tags in GsapProvider — do not npm install gsap
- The `lib/modules/` folder contains imperative DOM code for GSAP — these run via `initSite()` on route change
- ContactForm manages its own state with React hooks — do not use the old `lib/modules/quiz.ts`

## File Conventions
- Component folders: PascalCase (`ContactForm/ContactForm.tsx`)
- Lib files: kebab-case (`site-logic.ts`, `work-cards.ts`)
- Arrow function components with `export default` at bottom
- Types live in `lib/types/`, constants in `lib/constants/`, data in `lib/data/`
- Single barrel export at `components/index.ts`

## Content Rules
- Pricing is placeholder (£750 / £3,500 / £900) — do not present as confirmed
- Photography is stock — do not describe images as "client work"
- Both projects are self-initiated builds — do not claim they are client projects
- Liquid code snippets are illustrative — do not claim they are production code

## What Not To Do
- Do not add new npm dependencies without asking
- Do not remove GSAP animations or replace with CSS-only
- Do not change the colour palette or type scale
- Do not split globals.css into per-component files (attempted and reverted)
- Do not add Tailwind CSS (attempted and reverted — conflicts with existing styles)
- Do not invent testimonials, client logos, or revenue figures
