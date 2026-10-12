import type { Metadata } from 'next'
import { Prompt } from '@/components'
import { client, aboutContentQuery } from '@/lib/sanity'
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

  const skills = data?.skills ?? [
    'Shopify Liquid',
    'Dawn Theme',
    'React / Next.js',
    'TypeScript',
    'Headless Shopify',
    'Custom Themes',
    'Performance Optimisation',
    'Core Web Vitals',
  ]

  const whatIDo = [
    {
      title: 'custom themes',
      body: 'i build shopify themes from scratch — clean liquid, proper sections, no page builder shortcuts. the code is yours when we\'re done.',
    },
    {
      title: 'performance',
      body: 'faster stores convert better. i optimise for core web vitals from day one, not as an afterthought once the client is unhappy.',
    },
    {
      title: 'direct collaboration',
      body: 'no account managers, no handoffs. you work with me directly — which means honest answers and fewer surprises.',
    },
  ]

  const howIWork = [
    {
      num: '01',
      title: 'scoping',
      body: 'you tell me what you\'re building and why. i ask the questions that matter and give you a scope you can hold me to.',
    },
    {
      num: '02',
      title: 'build',
      body: 'i build fast and show you real progress early. no 30-page figma decks — you see it working in the browser.',
    },
    {
      num: '03',
      title: 'code handover',
      body: 'clean liquid, no mystery dependencies. you own everything and can hand it to any developer after launch.',
    },
    {
      num: '04',
      title: 'post-launch',
      body: '30 days of fixes included. if something slips through, i catch it. most things do not slip through.',
    },
  ]

  return (
    <main>
      <section className="wrap pagehead-lg">
        <p className="eyebrow" style={{ marginBottom: '26px' }}>{data?.eyebrow ?? 'shopify studio · london'}</p>
        <h1 className="h1">{data?.heading ?? 'about'}</h1>
        <p className="lede-sm" style={{ marginTop: 'clamp(22px,2.4vw,34px)', maxWidth: '52ch' }}>
          {data?.lede ?? 'kidan studios is a shopify studio based in london. i build stores that are fast, clean and actually work.'}
        </p>
      </section>

      <section className="wrap sec" style={{ paddingTop: 'clamp(36px,4vw,60px)' }} aria-labelledby="what-i-do-title">
        <div className="sechead" style={{ marginBottom: 'clamp(28px,3vw,44px)' }}>
          <div className="txt">
            <h2 className="h2" id="what-i-do-title">what i do</h2>
          </div>
        </div>
        <div className="svcgrid">
          {whatIDo.map((item, i) => (
            <article key={i} className="svccard">
              <h3>{item.title}</h3>
              <p className="blurb">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap sec pt0" aria-labelledby="how-i-work-title">
        <div className="sechead">
          <div className="txt">
            <h2 className="h2" id="how-i-work-title">how i work</h2>
          </div>
        </div>
        <div className="svcgrid">
          {howIWork.map((step) => (
            <article key={step.num} className="svccard">
              <div className="top">
                <span className="num">{step.num}</span>
                <span className="dot" aria-hidden="true"></span>
              </div>
              <h3>{step.title}</h3>
              <p className="blurb">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap sec pt0" style={{ paddingBottom: 'clamp(46px,5.2vw,80px)' }}>
        <h3 className="eyebrow" style={{ marginBottom: 'clamp(20px,2vw,28px)' }}>stack</h3>
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', listStyle: 'none', padding: 0 }}>
          {skills.map((skill) => (
            <li key={skill} style={{ border: '1px solid var(--line-hi)', color: 'var(--fg-2)', padding: '6px 14px', borderRadius: '999px', fontSize: '13px', letterSpacing: '.01em' }}>{skill}</li>
          ))}
        </ul>
      </section>

      <Prompt
        heading={data?.ctaHeading ?? 'got a project?'}
        subtext={data?.ctaSubtext ?? "send a message and you'll hear back within 24 hours."}
      />
    </main>
  )
}
