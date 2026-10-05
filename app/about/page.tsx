import type { Metadata } from 'next'
import Link from 'next/link'
import { client, urlFor, aboutContentQuery } from '@/lib/sanity'
import type { AboutContent } from '@/lib/sanity'

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch<AboutContent>(aboutContentQuery)
  return {
    title: data?.metaTitle ?? 'About',
    description: data?.metaDescription ?? 'Kidan Studios is a Shopify studio based in London. I build stores that are fast, clean and actually work.',
  }
}

export default async function AboutPage() {
  const data = await client.fetch<AboutContent>(aboutContentQuery)

  const heroImageSrc = data?.image
    ? urlFor(data.image).width(1900).height(1520).url()
    : '/img-cafe-room.jpg'

  const servicesParagraphs = data?.servicesParagraphs ?? [
    { text: "i work with brands directly to build and improve their shopify stores — from custom themes to performance fixes to full builds from scratch." },
    { text: "every build gets the same care — clean liquid code, fast load times, stores that are easy to maintain and don't break when you update them." },
    { text: "and when a project needs more than shopify's editor, i go fullstack — javascript, react and node — so nothing is off the table." },
  ]

  const processParagraphs = data?.processParagraphs ?? [
    { text: "straightforward by design — no fluff, no handoffs, just good work delivered on time." },
    { text: "every project starts with understanding what you actually need — not just what you asked for. then it's built cleanly, tested properly, and handed over so you can run it yourself." },
    { text: "the stack: shopify's liquid system, dawn theme architecture and custom sections — with javascript or react where a project calls for it." },
  ]

  const skills = data?.skills ?? [
    'Shopify Liquid',
    'Dawn Theme',
    'React / Next.js',
    'Node.js',
    'TypeScript',
    'Performance Optimisation',
  ]

  return (
    <main>
      <section className="wrap pagehead-lg">
        <p className="eyebrow hero-eyebrow">{data?.eyebrow ?? 'shopify studio · london'}</p>
        <h1 className="h1">{data?.heading ?? 'about'}</h1>
        <p className="lede" style={{ marginTop: '44px', fontSize: 'clamp(21px,2.3vw,28px)', fontWeight: 500, color: 'var(--fg)' }}>
          {data?.lede ?? 'kidan studios is a shopify studio based in london. i build stores that are fast, clean and actually work.'}
        </p>
      </section>
      <section className="wrap" style={{ paddingBottom: 'clamp(14px,1.6vw,22px)' }}>
        <div className="band">
          <img
            width="1900"
            height="1520"
            decoding="async"
            loading="lazy"
            src={heroImageSrc}
            alt="Independent cafe counter"
          />
          <span className="cap">{data?.imageCaption ?? 'london, uk'}</span>
        </div>
      </section>
      <section className="wrap sec">
        <div className="svc">
          <h4>{data?.servicesHeading ?? 'services'}</h4>
          <div style={{ maxWidth: '70ch' }}>
            {servicesParagraphs.map((p, i) => (
              <p
                key={i}
                className="body"
                style={i < servicesParagraphs.length - 1 ? { marginBottom: '18px' } : undefined}
              >
                {p.text}
              </p>
            ))}
          </div>
        </div>
        <div className="svc svc-last">
          <h4>{data?.processHeading ?? 'process'}</h4>
          <div style={{ maxWidth: '70ch' }}>
            {processParagraphs.map((p, i) => (
              <p
                key={i}
                className="body"
                style={i < processParagraphs.length - 1 ? { marginBottom: '18px' } : undefined}
              >
                {p.text}
              </p>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap sec">
        <div className="svc svc-last">
          <h4>stack &amp; skills</h4>
          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 16px', listStyle: 'none', padding: 0, marginTop: '8px' }}>
            {skills.map((skill) => (
              <li key={skill} className="body" style={{ background: 'var(--fg)', color: 'var(--bg)', padding: '4px 12px', borderRadius: '999px', fontSize: '13px' }}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="wrap sec" style={{ paddingBottom: 'clamp(56px,6vw,88px)' }}>
        <h2 className="h2" style={{ marginBottom: '16px' }}>{data?.ctaHeading ?? 'got a project?'}</h2>
        <p className="lede-sm" style={{ marginBottom: '34px' }}>{data?.ctaSubtext ?? 'send a message and you\'ll hear back within 24 hours.'}</p>
        <Link className="btn" href={data?.ctaHref ?? '/contact'}>{data?.ctaLabel ?? 'start a project →'}</Link>
      </section>
    </main>
  )
}
