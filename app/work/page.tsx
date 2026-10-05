import type { Metadata } from 'next'
import Link from 'next/link'
import { Marquee, WorkRow } from '@/components'
import { client, projectsQuery, urlFor } from '@/lib/sanity'
import type { Project as SanityProject } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Shopify builds for brands that sell something they care about.',
}

// Map project slugs to their display names for the WorkRow component
const projectDisplayMap: Record<string, 'coffee' | 'cycles'> = {
  'kidan-coffee': 'coffee',
  'eco-cycles': 'cycles',
}

export default async function WorkPage() {
  const projects = await client.fetch<SanityProject[]>(projectsQuery)

  return (
    <main>
      <section className="wrap pagehead-lg">
        <h1 className="h1">selected<br />work</h1>
        <div className="sechead" style={{ marginTop: '44px', marginBottom: '0' }}>
          <div className="txt">
            <p className="lede-sm">two shopify builds — one live brand, one concept store. both built on clean liquid, both built to convert.</p>
          </div>
          <Link className="btn ghost" href="/services">see pricing</Link>
        </div>
      </section>
      <section className="wrap sec pt0">
        <div className="workrows" style={{ marginTop: 'clamp(34px,4vw,54px)' }}>
          {projects.map((project, idx) => {
            const projectType = projectDisplayMap[project.slug.current] || 'coffee'
            const heroImageUrl = urlFor(project.heroImage).width(1900).url()
            
            return (
              <WorkRow
                key={project._id}
                project={projectType}
                index={String(idx + 1).padStart(2, '0')}
                title={project.title.toLowerCase()}
                description={project.description}
                tags={['shopify', 'custom theme', 'liquid', 'cro', 'seo']}
                images={[
                  { 
                    src: heroImageUrl, 
                    alt: `${project.title} Shopify storefront`, 
                    width: 1900, 
                    height: 1165 
                  }
                ]}
                linkGo={project.slug.current}
                headingLevel="h2"
              />
            )
          })}
        </div>
      </section>
      <Marquee />
    </main>
  )
}
