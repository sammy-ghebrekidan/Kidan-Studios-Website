import type { Metadata } from 'next'
import Link from 'next/link'
import { Prompt } from '@/components'
import { client, aboutContentQuery, urlFor } from '@/lib/sanity'
import type { AboutContent } from '@/lib/sanity'

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch<AboutContent | null>(aboutContentQuery)
  return {
    title: data?.metaTitle ?? 'Shopify Developer, London',
    description: data?.metaDescription ?? 'Kidan Studios is a Shopify developer based in London. Custom theme builds, clean Liquid, and stores that are fast, accessible and built to convert.',
  }
}

export default async function AboutPage() {
  const data = await client.fetch<AboutContent | null>(aboutContentQuery)

  // Fallback content when no Sanity data exists
  const skills = data?.skills ?? [
    'Shopify Liquid',
    'Dawn Theme',
    'React / Next.js',
    'TypeScript',
    'Headless Shopify',
    'Custom Themes',
    'Performance Optimization',
  ]

  const servicesParagraphs = data?.servicesParagraphs ?? [
    { text: "We partner with brands to build Shopify stores that don't just look good — they convert. Every project starts with understanding your business, your customers, and what makes you different." },
    { text: "From custom theme development to full headless builds, we focus on performance, accessibility, and a shopping experience that feels premium. We don't use templates — every store we build is bespoke." },
    { text: "Our work extends beyond launch. We provide ongoing support, optimization, and feature development to help your store grow. When you work with us, you get a partner who's invested in your success." },
  ]

  const processSteps = data?.processParagraphs ?? [
    { text: "Every project begins with discovery. We dig into your business model, target audience, and competitive landscape to build a strategy that aligns with your goals." },
    { text: "Design comes next — but it's not just about aesthetics. We design for conversion, ensuring every element serves a purpose and guides customers toward purchase." },
    { text: "Development is where precision matters. We build clean, maintainable code that performs fast and scales with your business. You own everything we build." },
    { text: "Launch is just the beginning. We test extensively, optimize performance, and provide training so you can manage your store with confidence." },
  ]

  const values = [
    { title: 'We ship what we promise', desc: 'No scope creep, no hidden costs, no excuses. We deliver on time and on brief.' },
    { title: 'We think long-term', desc: 'The best stores evolve. We build with that in mind — clean code that\'s easy to maintain and ready to grow.' },
    { title: 'We speak human', desc: 'No jargon, no smoke and mirrors. Just clear communication and honest advice about what\'s right for your business.' },
    { title: 'We care about the details', desc: 'From page load times to checkout flows, we obsess over the experience your customers have. That\'s what separates a good store from a great one.' },
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="wrap pagehead-lg">
        <p className="eyebrow" style={{ marginBottom: '26px' }}>{data?.eyebrow ?? 'shopify studio · london'}</p>
        <h1 className="h1">{data?.heading ?? 'about'}</h1>
        <p className="lede-sm" style={{ marginTop: 'clamp(22px,2.4vw,34px)', maxWidth: '52ch' }}>
          {data?.lede ?? 'we build shopify stores that are fast, clean, and built to convert.'}
        </p>
      </section>

      {/* What We Do Section */}
      <section className="wrap sec" style={{ paddingTop: 'clamp(36px,4vw,60px)' }} aria-labelledby="what-we-do-title">
        <div className="sechead" style={{ marginBottom: 'clamp(28px,3vw,44px)' }}>
          <div className="txt">
            <h2 className="h2" id="what-we-do-title">{data?.servicesHeading ?? 'what we do'}</h2>
          </div>
        </div>
        <div className="svcgrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(24px,3vw,40px)' }}>
          {servicesParagraphs.map((paragraph, index) => (
            <article key={index} className="svccard" style={{ padding: 'clamp(24px,2.5vw,36px)', border: '1px solid var(--line)', borderRadius: '4px' }}>
              <p className="body" style={{ lineHeight: 1.6, color: 'var(--fg)' }}>
                {paragraph.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* How We Work Section */}
      <section className="wrap sec pt0" aria-labelledby="how-we-work-title">
        <div className="sechead">
          <div className="txt">
            <h2 className="h2" id="how-we-work-title">{data?.processHeading ?? 'how we work'}</h2>
          </div>
        </div>
        <div className="svcgrid">
          {processSteps.map((step, i) => (
            <article key={i} className="svccard">
              <div className="top">
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="dot" aria-hidden="true"></span>
              </div>
              <p className="blurb" style={{ lineHeight: 1.6 }}>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="wrap sec pt0" aria-labelledby="values-title">
        <div className="sechead">
          <div className="txt">
            <h2 className="h2" id="values-title">our values</h2>
          </div>
        </div>
        <div className="svcgrid">
          {values.map((value, i) => (
            <article key={i} className="svccard">
              <h3 style={{ fontSize: 'var(--t-lg)', marginBottom: '12px', fontWeight: 600 }}>{value.title}</h3>
              <p className="blurb" style={{ lineHeight: 1.6 }}>{value.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Skills / Stack */}
      <section className="wrap sec pt0" style={{ paddingBottom: 'clamp(46px,5.2vw,80px)' }}>
        <div style={{ marginBottom: 'clamp(28px,3vw,44px)' }}>
          <h3 style={{ fontSize: 'var(--t-lg)', marginBottom: '16px', fontWeight: 500, textTransform: 'lowercase' }}>stack</h3>
          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', listStyle: 'none', padding: 0 }}>
            {skills.map((skill) => (
              <li key={skill} style={{ border: '1px solid var(--line-hi)', color: 'var(--fg-2)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', letterSpacing: '.01em' }}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA Component */}
      <Prompt 
        heading={data?.ctaHeading ?? 'got a project?'} 
        subtext={data?.ctaSubtext ?? "send a message and you'll hear back within 24 hours."} 
      />
    </main>
  )
}
