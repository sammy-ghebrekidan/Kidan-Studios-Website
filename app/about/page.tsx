import type { Metadata } from 'next'
import Link from 'next/link'
import { client, aboutContentQuery } from '@/lib/sanity'
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
        <p className="lede" style={{ marginTop: '44px', fontSize: 'clamp(21px,2.3vw,28px)', fontWeight: 500, color: 'var(--fg)', maxWidth: '22ch' }}>
          {data?.lede ?? 'kidan studios is a shopify studio based in london. i build stores that are fast, clean and actually work.'}
        </p>
      </section>

      <section className="wrap sec pt0" style={{ paddingBottom: 'clamp(56px,6vw,88px)' }}>
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', listStyle: 'none', padding: 0, marginBottom: 'clamp(40px,5vw,72px)' }}>
          {skills.map((skill) => (
            <li key={skill} style={{ border: '1px solid var(--line-hi)', color: 'var(--fg-2)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', letterSpacing: '.01em' }}>{skill}</li>
          ))}
        </ul>
        <h2 className="h2" style={{ marginBottom: '16px' }}>{data?.ctaHeading ?? 'got a project?'}</h2>
        <p className="lede-sm" style={{ marginBottom: '34px' }}>{data?.ctaSubtext ?? "send a message and you'll hear back within 24 hours."}</p>
        <Link className="btn" href={data?.ctaHref ?? '/contact'}>{data?.ctaLabel ?? 'start a project →'}</Link>
      </section>
    </main>
  )
}
