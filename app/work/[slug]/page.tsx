import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { client, projectBySlugQuery, projectsQuery, urlFor, portableTextToPlainText } from '@/lib/sanity'
import type { Project as SanityProject } from '@/lib/sanity'
import { ProjectCaseStudy } from '@/components'
import type { Project } from '@/lib/types'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const projects = await client.fetch<SanityProject[]>(projectsQuery)
  return projects.map((project) => ({ slug: project.slug.current }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await client.fetch<SanityProject>(projectBySlugQuery, { slug })
  if (!project) return {}
  return { title: project.title, description: project.description }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const sanityProject = await client.fetch<SanityProject>(projectBySlugQuery, { slug })
  if (!sanityProject) notFound()

  // Transform Sanity project to component format
  const project: Project = {
    slug: sanityProject.slug.current,
    title: sanityProject.title,
    description: sanityProject.description,
    heroImage: urlFor(sanityProject.heroImage).width(1900).height(1165).url(),
    year: sanityProject.year,
    role: sanityProject.role,
    status: sanityProject.status,
    brief: portableTextToPlainText(sanityProject.brief || []),
    approach: portableTextToPlainText(sanityProject.approach || []),
    builtList: sanityProject.builtList?.map(item => item.items) || [],
    shots: sanityProject.shots?.map(shot => ({
      src: urlFor(shot.image).width(2000).url(),
      alt: shot.alt,
      width: 2000,
      height: Math.round(2000 * 0.75),
      caption: shot.caption || '',
      tall: shot.tall || false,
    })) || [],
    otherProject: {
      slug: sanityProject.otherProject?.project?.slug.current || '',
      title: sanityProject.otherProject?.project?.title || '',
      images: sanityProject.otherProject?.images?.map((img, idx) => ({
        src: urlFor(img).width(1900).url(),
        alt: img.alt || '',
        width: 1900,
        height: idx === 0 ? 1100 : 1400, // approximate
      })) || [],
    },
  }

  return <ProjectCaseStudy project={project} />
}
