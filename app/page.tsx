import Link from 'next/link'
import { Ticker, Marquee, Prompt, WorkRow } from '@/components'
import { client, homeContentQuery, projectsQuery, blogPostsQuery, urlFor } from '@/lib/sanity'
import type { HomeContent, Project, BlogPost } from '@/lib/sanity'

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toLowerCase()
}

export default async function HomePage() {
  const [homeContent, projects, posts] = await Promise.all([
    client.fetch<HomeContent>(homeContentQuery),
    client.fetch<Project[]>(projectsQuery),
    client.fetch<BlogPost[]>(blogPostsQuery),
  ])

  // Use fallback content if Sanity data isn't available yet
  const hero = homeContent?.hero || {
    eyebrow: 'shopify studio · london',
    title: 'Kidan\nStudios',
    lede: 'London-based Shopify development studio specialising in custom Shopify themes and performance optimisation.',
    status: 'available for new projects — august 2026',
    cta: { label: 'start a project', href: '/contact' },
    ctaSecondary: { label: 'see the work', href: '/work' },
  }

  const trustBar = homeContent?.trustBar || [
    { icon: 'i-globe', label: 'based in', value: 'london, uk' },
    { icon: 'i-store', label: 'works with', value: 'shopify & shopify plus' },
    { icon: 'i-bolt', label: 'replies within', value: '24 hours' },
    { icon: 'i-box', label: 'typical build', value: '3–6 weeks' },
  ]

  const workSection = homeContent?.workSection || {
    title: 'selected work',
    subtitle: 'shopify builds for brands that sell something they care about.',
    cta: { label: 'all projects', href: '/work' },
  }

  const servicesSection = homeContent?.servicesSection || {
    title: 'services',
    subtitle: 'three things, done properly — and priced before you commit.',
    cta: { label: 'see pricing', href: '/services' },
  }

  const blogSection = homeContent?.blogSection || {
    title: 'blog',
    subtitle: 'ideas for better shopify stores',
    cta: { label: 'all articles', href: '/blog' },
  }

  const closingCta = homeContent?.closingCta || {
    heading: 'thinking about a rebuild, a migration, or just a store that loads faster?',
    subtext: "tell me what's not working. you'll get an honest read on whether it's worth fixing — no pitch deck, no retainer talk.",
  }

  // Map project slugs to display names
  const projectDisplayMap: Record<string, 'coffee' | 'cycles'> = {
    'kidan-coffee': 'coffee',
    'eco-cycles': 'cycles',
  }

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
          {projects.map((project) => (
            <button key={project._id} type="button" data-filter={projectDisplayMap[project.slug.current] || 'coffee'} aria-pressed="false">
              {project.title.toLowerCase()}
            </button>
          ))}
        </div>
        <div className="workrows compact" style={{ marginTop: 'clamp(34px,4vw,54px)' }}>
          {projects.map((project, idx) => {
            const projectType = projectDisplayMap[project.slug.current] || 'coffee'
            const heroImageUrl = urlFor(project.heroImage).width(1900).url()
            
            return (
              <WorkRow
                key={project._id}
                project={projectType}
                index={String(idx + 1).padStart(2, '0')}
                title={project.title.toLowerCase()}
                description={project.description.toLowerCase()}
                tags={['shopify', 'custom theme', 'liquid', 'cro', 'seo']}
                images={[{ 
                  src: heroImageUrl, 
                  alt: project.title, 
                  width: 1900, 
                  height: 1165 
                }]}
                linkGo={project.slug.current}
              />
            )
          })}
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
          {posts.map((post, i) => (
            <Link key={post._id} className="prow" href={`/blog/${post.slug.current}`}>
              <span className="pnum">{String(i + 1).padStart(2, '0')}</span>
              <div className="ptxt">
                <span className="pcat">{post.category.toLowerCase()} <em aria-hidden="true">·</em> {post.readTime} <em aria-hidden="true">·</em> {formatDate(post.publishedAt)}</span>
                <h3 className="ptitle">{post.title}</h3>
              </div>
              <span className="psmall">
                <img 
                  width="400" 
                  height="380" 
                  decoding="async" 
                  loading="lazy" 
                  src={urlFor(post.image).width(400).height(380).url()} 
                  alt="" 
                />
              </span>
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
            <Link className="btn" href="/contact">get in touch</Link>
            <a className="btn ghost" href="mailto:hello@kidanstudios.co.uk">email direct</a>
          </div>
        }
      />

      <Marquee />
    </main>
  )
}
