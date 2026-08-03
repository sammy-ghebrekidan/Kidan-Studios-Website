import type { Project } from '@/lib/types'

export type { Project }

export const projects: Record<string, Project> = {
  'kidan-coffee': {
    slug: 'kidan-coffee',
    title: 'Kidan Coffee',
    description: 'A shopify storefront for a speciality coffee roaster — custom dawn theme, origin-led product pages and a frontend built to convert.',
    heroImage: '/img-cafe-wide.jpg',
    year: '2026',
    role: 'Design & Development',
    status: 'Self-initiated build',
    brief: [
      'Speciality coffee buyers behave differently from most e-commerce customers. They research. They read tasting notes. They want to know the farm, the process, the altitude — and they will happily spend ten minutes on a product page before deciding.',
      'Most roaster storefronts fight that behaviour with a standard e-commerce template: a photo, a price, a buy button. The brief here was to build the opposite — a store that rewards a customer who wants to read.',
    ],
    approach: [
      "Built on Dawn\u2019s architecture rather than a page builder, so the theme stays fast and stays maintainable. Every piece of storytelling is a section the client can reorder without touching code.",
      'The product page was the priority. Origin, process and roast date sit above the fold alongside the variant selector, so the information that builds confidence arrives before the ask.',
    ],
    builtList: [
      ['custom dawn theme', 'origin & process content sections', 'roast date and freshness display', 'brew guide accordion', 'subscribe-first variant selector'],
      ['collection filtering by roast profile', 'cart drawer with free-shipping threshold', 'structured data for products', 'image optimisation pipeline', 'gtm and event tracking'],
    ],
    shots: [
      { src: '/img-cafe-entrance.jpg', alt: 'origin storytelling sits alongside the variant selector, not below the fold', width: 1536, height: 2049, caption: 'origin storytelling sits alongside the variant selector, not below the fold' },
      { src: '/img-cafe-team.jpg', alt: 'collection filtering by roast profile rather than generic tags', width: 1476, height: 1437, caption: 'collection filtering by roast profile rather than generic tags' },
      { src: '/img-cafe-pastries.jpg', alt: 'brew guides reduce the will I get this right? objection before checkout', width: 1476, height: 1107, caption: 'brew guides reduce the \u201cwill I get this right?\u201d objection before checkout' },
      { src: '/img-cafe-room.jpg', alt: 'cart drawer surfaces the free-shipping threshold to lift average order value', width: 1900, height: 1520, caption: 'cart drawer surfaces the free-shipping threshold to lift average order value' },
      { src: '/img-cafe-counter.jpg', alt: 'subscribe option presented as the default, not the alternative', width: 1845, height: 1887, caption: 'subscribe option presented as the default, not the alternative' },
    ],
    otherProject: {
      slug: 'eco-cycles',
      title: 'Eco Cycles',
      images: [
        { src: '/img-eco-wide.jpg', alt: 'Eco Cycles Shopify storefront', width: 2200, height: 1100 },
        { src: '/img-eco-bike.jpg', alt: '', width: 1510, height: 1359 },
        { src: '/img-eco-cta.jpg', alt: '', width: 1510, height: 574 },
        { src: '/img-eco-rider.jpg', alt: '', width: 1268, height: 1359 },
      ],
    },
  },
  'eco-cycles': {
    slug: 'eco-cycles',
    title: 'Eco Cycles',
    description: 'A storefront for a uk urban cycling brand — custom sections, featured collections and customer reviews, built fast and stable.',
    heroImage: '/img-eco-hero.jpg',
    year: '2024',
    role: 'Shopify Development',
    status: 'Self-initiated build',
    brief: [
      "Bikes are a considered purchase with a long decision window. Customers compare specs, read reviews, come back three times, then buy. A storefront that only shows a hero image and a grid of products loses them on the second visit.",
      "The brief was a store that holds up to repeat browsing — clear specifications, visible social proof, and collections that make sense to someone who doesn\u2019t yet know which bike they want.",
    ],
    approach: [
      'Collections do the qualifying. Rather than one flat product grid, the storefront routes people by use case — commuter, weekend, cargo — so a visitor narrows down before they ever open a product page.',
      'Reviews sit on the collection and product templates rather than being buried in a tab, because for a purchase at this price point social proof is the conversion lever.',
    ],
    builtList: [
      ['custom homepage sections', 'featured collection blocks', 'customer review integration', 'specification comparison table', 'sticky add-to-cart on mobile'],
      ['use-case collection routing', 'image lazy-loading and sizing', 'accessibility pass on forms and nav', 'core web vitals optimisation', 'analytics and event tracking'],
    ],
    shots: [
      { src: '/img-eco-rider.jpg', alt: 'collections route by use case', width: 1268, height: 1359, caption: 'collections route by use case, so browsing narrows before the product page' },
      { src: '/img-eco-bike.jpg', alt: 'reviews surface on collection cards', width: 1510, height: 1359, caption: 'reviews surface on collection cards, not buried behind a tab' },
      { src: '/img-eco-cta.jpg', alt: 'specification tables', width: 1510, height: 574, caption: 'specification tables make cross-model comparison possible without leaving the page' },
      { src: '/img-eco-nav.jpg', alt: 'sticky add-to-cart', width: 2200, height: 374, caption: 'sticky add-to-cart keeps the action reachable through a long spec scroll' },
    ],
    otherProject: {
      slug: 'kidan-coffee',
      title: 'Kidan Coffee',
      images: [
        { src: '/img-cafe-counter.jpg', alt: 'Kidan Coffee Shopify storefront', width: 1845, height: 1887 },
        { src: '/img-cafe-room.jpg', alt: '', width: 1900, height: 1520 },
        { src: '/img-cafe-team.jpg', alt: '', width: 1476, height: 1437 },
        { src: '/img-cafe-entrance.jpg', alt: '', width: 1536, height: 2049 },
      ],
    },
  },
}
