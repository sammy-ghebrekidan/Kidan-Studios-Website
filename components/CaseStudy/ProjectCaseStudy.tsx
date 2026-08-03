import Link from 'next/link'
import { Prompt } from '@/components'
import type { Project } from '@/lib/types'

const ProjectCaseStudy = ({ project }: { project: Project }) => {
  return (
    <main>
      <section className="wrap" style={{ paddingBlock: 'clamp(56px,7vw,88px) 0' }}>
        <nav className="crumb" aria-label="Breadcrumb">
          <Link href="/">home</Link><span aria-hidden="true">/</span>
          <Link href="/work">work</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{project.title.toLowerCase()}</span>
        </nav>
      </section>

      <section className="wrap" style={{ paddingBlock: 'clamp(26px,3vw,42px) clamp(28px,3vw,44px)' }}>
        <h1 className="h1">{project.title.split(' ').map((w, i) => <span key={i}>{w}{i === 0 && <br />}</span>)}</h1>
        <p className="lede-sm" style={{ marginTop: 'clamp(22px,2.4vw,34px)', maxWidth: '52ch' }}>{project.description}</p>
      </section>

      <section className="wrap" style={{ paddingBottom: 'clamp(34px,4vw,56px)' }}>
        <img width="1900" height="1165" decoding="async" style={{ borderRadius: '18px', border: '1px solid var(--line)', aspectRatio: '16/9', objectFit: 'cover' }} src={project.heroImage} alt={`${project.title} storefront`} />
      </section>

      <section className="wrap">
        <dl className="factbar">
          <div><dt>discipline</dt><dd>Shopify / E-commerce</dd></div>
          <div><dt>year</dt><dd>{project.year}</dd></div>
          <div><dt>my role</dt><dd>{project.role}</dd></div>
          <div><dt>status</dt><dd>{project.status}</dd></div>
        </dl>
      </section>

      <section className="wrap sec">
        <div className="csintro">
          <h2>the brief</h2>
          <div className="csbody">{project.brief.map((p, i) => <p key={i}>{p}</p>)}</div>
        </div>
      </section>

      <section className="wrap sec pt0">
        <div className="csintro">
          <h2>the approach</h2>
          <div className="csbody">{project.approach.map((p, i) => <p key={i}>{p}</p>)}</div>
        </div>
      </section>

      <section className="wrap sec pt0">
        <div className="csintro">
          <h2>what i built</h2>
          <div className="spec2">
            {project.builtList.map((col, i) => (
              <ul key={i}>{col.map((item, j) => <li key={j}>{item}</li>)}</ul>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 'clamp(56px,7vw,90px)' }}>
        <div className="shotstack">
          {project.shots.map((shot, i) => (
            <figure className="shot" key={i}>
              <img width={shot.width} height={shot.height} decoding="async" loading="lazy" src={shot.src} alt={shot.alt} />
              <figcaption>{shot.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Prompt heading="building something similar?" subtext="fixed quote within two working days, and an honest answer on whether it's worth doing at all." />

      <section className="wrap sec" style={{ paddingTop: '0', borderTop: '1px solid var(--line)' }}>
        <div className="sechead">
          <div className="txt"><h2 className="h2">other projects</h2></div>
          <Link className="btn ghost" href="/work">all work</Link>
        </div>
        <article className="wrow">
          <div className="wshot" aria-hidden="true">
            <span className="wstack">
              {project.otherProject.images.map((img, i) => (
                <img key={i} className={i === 0 ? 'on' : undefined} decoding="async" loading="lazy" width={img.width} height={img.height} src={img.src} alt={img.alt} />
              ))}
            </span>
            <span className="wdots">{project.otherProject.images.map((_, i) => <i key={i} className={i === 0 ? 'on' : undefined} />)}</span>
          </div>
          <div className="wtext">
            <span className="wnum">shopify / e-commerce</span>
            <h3>{project.otherProject.title}</h3>
            <Link className="wlink" href={`/work/${project.otherProject.slug}`}>view case study <em aria-hidden="true">→</em></Link>
          </div>
        </article>
      </section>
    </main>
  )
}

export default ProjectCaseStudy
