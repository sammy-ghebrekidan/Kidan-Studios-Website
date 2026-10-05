import type { Metadata } from 'next'
import Link from 'next/link'
import { Prompt } from '@/components'
import { client } from '@/lib/sanity'
import { servicesContentQuery } from '@/lib/sanity/queries'
import type { ServicesContent } from '@/lib/sanity/types'

export async function generateMetadata(): Promise<Metadata> {
  const data: ServicesContent | null = await client.fetch(servicesContentQuery)
  return {
    title: data?.metaTitle ?? 'Services & Pricing',
    description: data?.metaDescription ?? 'Clear scope, fixed quotes, no hourly billing. Custom Shopify themes from £3,500.',
  }
}

export default async function ServicesPage() {
  const data: ServicesContent | null = await client.fetch(servicesContentQuery)

  const eyebrow = data?.eyebrow ?? 'services & pricing'
  const heading = data?.heading ?? 'what it costs'
  const lede = data?.lede ?? 'clear scope, fixed quotes, no hourly billing. pick the starting point that matches where your store is now.'

  const trustBar = data?.trustBar ?? [
    { label: 'quotes are', value: 'fixed, not hourly' },
    { label: 'you get', value: 'full code ownership' },
    { label: 'handover includes', value: 'docs & a walkthrough' },
    { label: 'after launch', value: '30 days of fixes free' },
  ]

  const tiers = data?.tiers ?? [
    {
      badge: 'audit',
      name: 'store audit',
      description: "a full read on what's slowing your store down and what's costing you conversions.",
      price: 'from £750',
      duration: '5 working days',
      features: [
        'core web vitals & speed report',
        'cro review of pdp, cart and checkout',
        'technical seo & theme code review',
        'prioritised fix list with effort estimates',
        '60-minute walkthrough call',
      ],
      ctaLabel: 'book an audit',
      ctaHref: '/contact',
      featured: false,
    },
    {
      badge: 'most projects start here',
      name: 'theme build',
      description: 'a custom storefront built on dawn architecture — designed, built and launched.',
      price: 'from £3,500',
      duration: '3–6 weeks',
      features: [
        'custom theme or dawn customisation',
        'bespoke sections in liquid',
        'mobile-first, built for conversion',
        'app integrations & subscriptions',
        'analytics, gtm and event tracking',
        '30 days of post-launch fixes',
      ],
      ctaLabel: 'start a project',
      ctaHref: '/contact',
      featured: true,
    },
    {
      badge: 'retainer',
      name: 'ongoing partner',
      description: 'a developer on hand for the roadmap, the experiments and the things that break.',
      price: 'from £900',
      duration: 'per month, cancel anytime',
      features: [
        'agreed hours each month',
        'new sections and features',
        'cro tests and iteration',
        'performance monitoring',
        'priority response on issues',
      ],
      ctaLabel: 'enquire',
      ctaHref: '/contact',
      featured: false,
    },
  ]

  const processHeading = data?.processHeading ?? 'how it works'
  const processLede = data?.processLede ?? 'four steps, no handoffs, no account managers.'
  const processSteps = data?.processSteps ?? [
    { number: '01', title: 'call', blurb: "30 minutes on your store, your numbers and what's actually in the way." },
    { number: '02', title: 'quote', blurb: 'a fixed price and a scope document within two working days.' },
    { number: '03', title: 'build', blurb: 'weekly updates on a staging theme you can click through yourself.' },
  ]

  const faqHeading = data?.faqHeading ?? 'questions'
  const faqLede = data?.faqLede ?? 'the things brands ask before getting in touch.'
  const faqs = data?.faqs ?? [
    { question: 'do you work with shopify plus?', answer: 'Yes. Plus builds usually involve more app integration and checkout extensibility work, so they\'re quoted individually — but the process and the fixed-price approach are the same.' },
    { question: 'can you work with my existing theme?', answer: "Usually. If the theme is well-built, customising it is faster and cheaper than starting over. If it's been through several developers and the code is fighting itself, I'll tell you that honestly — a rebuild sometimes costs less than untangling it." },
    { question: 'who owns the code?', answer: "You do. Everything is built in your Shopify admin on a theme you own, with no proprietary frameworks or licences tied to me. You can hand it to another developer at any point." },
    { question: 'how do payments work?', answer: '50% to book the slot, 50% on launch. Retainers are billed monthly in advance and can be cancelled with 30 days\' notice.' },
    { question: 'what do you need from me to start?', answer: "Store access, your brand assets, and someone who can make decisions. The less time a project spends waiting on approvals, the cheaper it gets for you." },
  ]

  const promptHeading = data?.promptHeading ?? 'not sure which one you need?'
  const promptSubtext = data?.promptSubtext ?? "describe the store and the problem. i'll tell you which route makes sense — including if that's none of them."

  return (
    <main>
      <section className="wrap pagehead-lg">
        <p className="eyebrow" style={{ marginBottom: '26px' }}>{eyebrow}</p>
        <h1 className="h1">{heading}</h1>
        <div className="sechead" style={{ marginTop: '44px', marginBottom: '0' }}>
          <div className="txt">
            <p className="lede-sm">{lede}</p>
          </div>
          <Link className="btn" href="/contact">get a quote</Link>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 'clamp(28px,3vw,44px)' }}>
        <dl className="trust">
          {trustBar.map((item, i) => (
            <div key={i}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap sec" style={{ paddingTop: 'clamp(36px,4vw,60px)' }} aria-labelledby="pricing-title">
        <h2 className="sr" id="pricing-title">Pricing</h2>
        <div className="tiers">
          {tiers.map((tier, i) => (
            <article key={i} className={`tier${tier.featured ? ' feat' : ''}`}>
              <span className="badge">{tier.badge}</span>
              <h3>{tier.name}</h3>
              <p className="desc">{tier.description}</p>
              <p className="price">{tier.price}<small>{tier.duration}</small></p>
              <ul>
                {(tier.features ?? []).map((feature, j) => (
                  <li key={j}>{feature}</li>
                ))}
              </ul>
              <Link className={`btn${tier.featured ? '' : ' ghost'}`} href={tier.ctaHref ?? '/contact'}>
                {tier.ctaLabel}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap sec pt0">
        <div className="sechead">
          <div className="txt">
            <h2 className="h2">{processHeading}</h2>
            <p className="lede-sm">{processLede}</p>
          </div>
        </div>
        <div className="svcgrid">
          {processSteps.map((step, i) => (
            <article key={i} className="svccard">
              <div className="top">
                <span className="num">{step.number}</span>
                <span className="dot" aria-hidden="true"></span>
              </div>
              <h3>{step.title}</h3>
              <p className="blurb">{step.blurb}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap sec pt0" aria-labelledby="faq-title">
        <div className="sechead">
          <div className="txt">
            <h2 className="h2" id="faq-title">{faqHeading}</h2>
            <p className="lede-sm">{faqLede}</p>
          </div>
        </div>
        <div className="faq">
          {faqs.map((faq, i) => (
            <details key={i} open={i === 0}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <Prompt heading={promptHeading} subtext={promptSubtext} />
    </main>
  )
}
