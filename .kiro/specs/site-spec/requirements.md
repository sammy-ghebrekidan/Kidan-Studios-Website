# Requirements Document

## Introduction

This document defines the complete requirements for the Kidan Studios portfolio site — a lead-generation website for a one-person Shopify development studio based in London. The primary goal is to generate qualified enquiries through a multi-step contact form. Secondary goals include demonstrating technical credibility via case studies, publishing SEO content via a blog, and stating pricing openly so unqualified leads self-filter.

**Stack:** Next.js 15 (App Router) · React 18 · TypeScript · GSAP 3 + ScrollTrigger · plain CSS with custom properties.

## Glossary

| Term | Definition |
|------|-----------|
| FAB | Floating Action Button — the circular CTA fixed to the bottom-right |
| CRO | Conversion Rate Optimisation |
| Dawn | Shopify's default open-source theme architecture |
| Liquid | Shopify's templating language |
| Trust bar | A horizontal stats strip showing credibility signals |
| Chrome button | The site's primary button style — brushed metallic gradient |
| Ghost button | Transparent button with a border outline |

## Requirements

### REQ-1: Route Structure
- **ID:** REQ-1
- **Description:** The site must use Next.js App Router file-based routing with the following routes: `/` (home), `/work` (work index), `/work/[slug]` (case studies), `/services` (pricing), `/about`, `/blog` (index), `/blog/[slug]` (articles), `/contact`
- **Acceptance Criteria:** Each route renders its own page, has unique metadata, and is independently shareable via URL

### REQ-2: Global Header
- **ID:** REQ-2
- **Description:** A sticky frosted-glass header with wordmark, navigation links (work, services, blog, about), and a chrome CTA button
- **Acceptance Criteria:** Header is visible on all pages, condenses padding on scroll, collapses to burger menu below 900px, mobile panel opens/closes with animation

### REQ-3: Global Footer
- **ID:** REQ-3
- **Description:** Footer with email link, location, page links, social links, oversized wordmark, and copyright
- **Acceptance Criteria:** Renders on every page, all links navigate correctly

### REQ-4: Floating CTA
- **ID:** REQ-4
- **Description:** A fixed circular button with rotating "start a project" text that appears after scrolling ~340px
- **Acceptance Criteria:** Hidden on contact page, respects reduced-motion, links to /contact

### REQ-5: Home Page
- **ID:** REQ-5
- **Description:** Landing page with hero (eyebrow, h1, lede, status, CTAs), hero image, trust bar, ticker strips, work preview (2 projects), services section (3 cards), blog preview (2 posts), closing CTA, and marquee
- **Acceptance Criteria:** All sections render in correct order, GSAP animations trigger on scroll, links navigate to correct routes

### REQ-6: Work Index Page
- **ID:** REQ-6
- **Description:** Shows both project cards with heading and lede
- **Acceptance Criteria:** Both projects visible, link to their respective case study routes

### REQ-7: Case Study Pages (Dynamic)
- **ID:** REQ-7
- **Description:** Dynamic route `/work/[slug]` rendering project data — breadcrumb, title, description, hero image, fact bar, brief, approach, what I built, gallery, closing CTA, and link to other project
- **Acceptance Criteria:** Generates static params for kidan-coffee and eco-cycles, 404 for unknown slugs

### REQ-8: Services & Pricing Page
- **ID:** REQ-8
- **Description:** Three pricing tiers (audit, theme build, retainer), trust bar, process steps, FAQ accordions, and closing CTA
- **Acceptance Criteria:** Tiers display correctly at all breakpoints, FAQ accordions open/close, pricing values render from data

### REQ-9: About Page
- **ID:** REQ-9
- **Description:** Studio description, services summary, process summary, and CTA
- **Acceptance Criteria:** All copy uses first person singular ("I build"), image renders with caption

### REQ-10: Blog Index
- **ID:** REQ-10
- **Description:** Shows all blog post cards with heading, lede, and topic filter tabs
- **Acceptance Criteria:** Cards link to correct blog post routes, filters show/hide cards by topic

### REQ-11: Blog Post Pages (Dynamic)
- **ID:** REQ-11
- **Description:** Dynamic route `/blog/[slug]` with breadcrumb, category pill, title, standfirst, author block, hero image, table of contents, article body, reading progress bar, related post link
- **Acceptance Criteria:** Generates static params for both posts, TOC links scroll to headings, progress bar tracks scroll position

### REQ-12: Contact Form
- **ID:** REQ-12
- **Description:** Multi-step enquiry form with 6 questions, progress bar, conditional steps (fixes detail for "fix" path, platform for "migration"), validation per step, and completion state
- **Acceptance Criteria:** Form advances on radio selection, blocks advance without valid input, shows error messages, displays done state on completion

### REQ-13: GSAP Animations
- **ID:** REQ-13
- **Description:** Scroll-triggered animations for services cards, line reveals on headings, work row reveals with parallax, ambient hero blob parallax, and work card image cycling
- **Acceptance Criteria:** Animations trigger once on scroll-in, respect prefers-reduced-motion, reinitialise on route change without duplicating ScrollTrigger instances

### REQ-14: SEO & Structured Data
- **ID:** REQ-14
- **Description:** Per-page metadata, JSON-LD (ProfessionalService site-wide, BlogPosting per article), OG tags, semantic HTML
- **Acceptance Criteria:** Each page has unique title/description, structured data validates without errors

### REQ-15: Accessibility
- **ID:** REQ-15
- **Description:** Skip link, visible focus states, ARIA labels on interactive elements, semantic landmarks, alt text on all images
- **Acceptance Criteria:** Keyboard-navigable, screen reader announces page structure correctly, no WCAG AA violations in automated testing
