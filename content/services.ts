export const servicesHero = {
  eyebrow: 'services & pricing',
  title: 'what it\ncosts',
  lede: "clear scope, fixed quotes, no hourly billing. pick the starting point that matches where your store is now.",
  cta: { label: 'get a quote', href: '/contact' },
}

export const termsBar = [
  { label: 'quotes are', value: 'fixed, not hourly' },
  { label: 'you get', value: 'full code ownership' },
  { label: 'handover includes', value: 'docs & a walkthrough' },
  { label: 'after launch', value: '30 days of fixes free' },
]

export const tiers = [
  {
    badge: 'audit',
    name: 'store audit',
    description: "a full read on what's slowing your store down and what's costing you conversions.",
    price: 'from £750',
    term: '5 working days',
    featured: false,
    items: [
      'core web vitals & speed report',
      'cro review of pdp, cart and checkout',
      'technical seo & theme code review',
      'prioritised fix list with effort estimates',
      '60-minute walkthrough call',
    ],
    cta: { label: 'book an audit', href: '/contact' },
  },
  {
    badge: 'most projects start here',
    name: 'theme build',
    description: 'a custom storefront built on dawn architecture — designed, built and launched.',
    price: 'from £3,500',
    term: '3–6 weeks',
    featured: true,
    items: [
      'custom theme or dawn customisation',
      'bespoke sections in liquid',
      'mobile-first, built for conversion',
      'app integrations & subscriptions',
      'analytics, gtm and event tracking',
      '30 days of post-launch fixes',
    ],
    cta: { label: 'start a project', href: '/contact' },
  },
  {
    badge: 'retainer',
    name: 'ongoing partner',
    description: 'a developer on hand for the roadmap, the experiments and the things that break.',
    price: 'from £900',
    term: 'per month, cancel anytime',
    featured: false,
    items: [
      'agreed hours each month',
      'new sections and features',
      'cro tests and iteration',
      'performance monitoring',
      'priority response on issues',
    ],
    cta: { label: 'enquire', href: '/contact' },
  },
]

export const process = {
  title: 'how it works',
  subtitle: 'four steps, no handoffs, no account managers.',
  steps: [
    { number: '01', name: 'call', description: "30 minutes on your store, your numbers and what's actually in the way." },
    { number: '02', name: 'quote', description: 'a fixed price and a scope document within two working days.' },
    { number: '03', name: 'build', description: 'weekly updates on a staging theme you can click through yourself.' },
  ],
}

export const faq = [
  {
    question: 'do you work with shopify plus?',
    answer: "Yes. Plus builds usually involve more app integration and checkout extensibility work, so they're quoted individually — but the process and the fixed-price approach are the same.",
  },
  {
    question: 'can you work with my existing theme?',
    answer: "Usually. If the theme is well-built, customising it is faster and cheaper than starting over. If it's been through several developers and the code is fighting itself, I'll tell you that honestly — a rebuild sometimes costs less than untangling it.",
  },
  {
    question: 'who owns the code?',
    answer: 'You do. Everything is built in your Shopify admin on a theme you own, with no proprietary frameworks or licences tied to me. You can hand it to another developer at any point.',
  },
  {
    question: 'how do payments work?',
    answer: "50% to book the slot, 50% on launch. Retainers are billed monthly in advance and can be cancelled with 30 days' notice.",
  },
  {
    question: 'what do you need from me to start?',
    answer: 'Store access, your brand assets, and someone who can make decisions. The less time a project spends waiting on approvals, the cheaper it gets for you.',
  },
]

export const closingCta = {
  heading: 'not sure which one you need?',
  subtext: "describe the store and the problem. i'll tell you which route makes sense — including if that's none of them.",
}
