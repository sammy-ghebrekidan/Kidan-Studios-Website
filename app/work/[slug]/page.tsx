import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects } from '@/lib/data/projects'
import { ProjectCaseStudy } from '@/components'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects[slug]
  if (!project) return {}
  return { title: project.title, description: project.description }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects[slug]
  if (!project) notFound()

  return <ProjectCaseStudy project={project} />
}
