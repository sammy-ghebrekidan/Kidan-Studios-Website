import Link from 'next/link'
import { Ticker, Marquee, Prompt, WorkRow } from '@/components'
import { hero, trustBar, workSection, servicesSection, blogSection, closingCta } from '@/content/home'
import { projects } from '@/lib/data/projects'
import { posts } from '@/lib/data/posts'

const coffeeProject = projects['kidan-coffee']
const cyclesProject = projects['eco-cycles']

export default function HomePage() {
  return (
    <main>
      <div className="herostage">
        <div className="ambient" aria-hidden="true">
          <span className="blob b1"></span><span className="blob b2"></span>
          <span className="blob b3"></span><span className="blob b4"></span>
          <span className="grain"></span>
        </div>
        <section className="hero wrap">
          <p className="eyebrow hero-eyebrow">{hero.eyebrow}</p>
          <h1 className="h1">{hero.title.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}</h1>
          <div className="hero-meta">
            <p className="lede">{hero.lede}</p>
            <div className="hero-side">
              <span className="status">
                <i></i>{hero.status}{' '}
                <svg className="ic solid" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-star4"/></svg>
              </span>
              <div className="hero-ctas">
                <Link className="btn" href={hero.cta.href}>{hero.cta.label}</Link>
                <Link className="btn ghost" href={hero.ctaSecondary.href}>{hero.ctaSecondary.label}</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="wrap" style={{ paddingBottom: 'clamp(28px,3vw,44px)' }} aria-label="At a glance">
          <dl className="trust">
            {trustBar.map((item) => (
              <div key={item.label}>
                <dt><svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><use href={`#${item.icon}`}/></svg>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <Ticker />

      <section className="wrap sec" style={{ paddingTop: 'clamp(44px,5vw,72px)' }} aria-labelledby="work-title">
        <div className="sechead">
          <div className="txt">
            <h2 className="h2" id="work-title">{workSection.title}</h2>
            <p className="lede-sm">{workSection.subtitle}</p>
          </div>
          <Link className="btn ghost" href={workSection.cta.href}>{workSection.cta.label}</Link>
        </div>
        <div className="tabs" role="group" aria-label="Filter projects" data-tabs="work">
          <button type="button" data-filter="all" aria-pressed="true">all work</button>
          <button type="button" data-filter="coffee" aria-pressed="false">kidan coffee</button>
          <button type="button" data-filter="cycles" aria-pressed="false">eco cycles</button>
        </div>
        <div className="workrows compact" style={{ marginTop: 'clamp(34px,4vw,54px)' }}>
          <WorkRow
            project="coffee"
            index="01"
            title={coffeeProject.title.toLowerCase()}
            description={coffeeProject.description.toLowerCase()}
            tags={['shopify', 'custom theme', 'liquid', 'cro', 'seo']}
            images={coffeeProject.otherProject.images.length ? coffeeProject.shots.slice(0, 4).map(s => ({ src: s.src, alt: s.alt, width: s.width, height: s.height })) : []}
            linkGo="proj-coffee"
          />
          <WorkRow
            project="cycles"
            index="02"
            title={cyclesProject.title.toLowerCase()}
            description={cyclesProject.description.toLowerCase()}
            tags={['shopify', 'custom sections', 'collections', 'reviews', 'performance']}
            images={cyclesProject.shots.slice(0, 4).map(s => ({ src: s.src, alt: s.alt, width: s.width, height: s.height }))}
            linkGo="proj-cycles"
          />
        </div>
      </section>

      <section className="wrap sec" id="services" aria-labelledby="services-title">
        <div className="sechead">
          <div className="txt">
            <h2 className="h2" id="services-title">{servicesSection.title}</h2>
            <p className="lede-sm">{servicesSection.subtitle}</p>
          </div>
          <Link className="btn ghost" href={servicesSection.cta.href}>{servicesSection.cta.label}</Link>
        </div>
        <div className="svcgrid">
          {[
            { num: '01', icon: 'i-store', name: 'development', blurb: 'custom themes built on clean liquid — no bloat, no page builders.', items: ['custom shopify themes', 'dawn theme customisation', 'shopify sections & liquid', 'app integrations'] },
            { num: '02', icon: 'i-globe', name: 'consulting', blurb: "a straight answer on what's worth fixing and what isn't.", items: ['technical consulting', 'platform migrations', 'store audits', 'ongoing support'] },
            { num: '03', icon: 'i-bolt', name: 'performance', blurb: 'faster stores that rank better and convert more of the traffic you already have.', items: ['speed optimisation', 'cro optimisation', 'seo best practices', 'core web vitals'] },
          ].map((svc) => (
            <article key={svc.num} className="svccard" itemScope itemType="https://schema.org/Service">
              <span className="sweep" aria-hidden="true"></span>
              <div className="top"><span className="num">{svc.num}</span><span className="svcic"><svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><use href={`#${svc.icon}`}/></svg></span></div>
              <h3 itemProp="name">{svc.name}</h3>
              <p className="blurb" itemProp="description">{svc.blurb}</p>
              <ul>{svc.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap sec">
        <div className="sechead" style={{ marginBottom: 'clamp(24px,2.8vw,38px)' }}>
          <div className="txt">
            <h2 className="h2">{blogSection.title}</h2>
            <p className="lede-sm">{blogSection.subtitle}</p>
          </div>
          <Link className="btn ghost" href={blogSection.cta.href}>{blogSection.cta.label}</Link>
        </div>
        <div className="postlist">
          {Object.values(posts).map((post, i) => (
            <Link key={post.slug} className="prow" href={`/blog/${post.slug}`}>
              <span className="pnum">{String(i + 1).padStart(2, '0')}</span>
              <div className="ptxt">
                <span className="pcat">{post.category.toLowerCase()} <em aria-hidden="true">·</em> {post.readTime} <em aria-hidden="true">·</em> {post.dateFormatted.toLowerCase()}</span>
                <h3 className="ptitle">{post.title}</h3>
              </div>
              <span className="psmall"><img width={post.image.width} height={post.image.height} decoding="async" loading="lazy" src={post.image.src} alt="" /></span>
              <span className="parrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <Prompt
        heading={closingCta.heading}
        subtext={closingCta.subtext}
        actions={
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link className="btn" href="/contact">start a project</Link>
            <a className="btn ghost" href="mailto:hello@kidanstudios.co.uk">email direct</a>
          </div>
        }
      />

      <Marquee />
    </main>
  )
}
