import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProjectCaseStudy from './ProjectCaseStudy'
import type { Project } from '@/lib/data/projects'

const mockProject: Project = {
  slug: 'test-project',
  title: 'Test Project',
  description: 'A test project description.',
  heroImage: '/img-test.jpg',
  year: '2026',
  role: 'Development',
  status: 'Complete',
  brief: ['Brief paragraph one.', 'Brief paragraph two.'],
  approach: ['Approach paragraph.'],
  builtList: [['item one', 'item two'], ['item three']],
  shots: [
    { src: '/img-shot.jpg', alt: 'A shot', width: 800, height: 600, caption: 'Shot caption' },
  ],
  otherProject: {
    slug: 'other',
    title: 'Other Project',
    images: [{ src: '/img-other.jpg', alt: 'Other', width: 800, height: 600 }],
  },
}

describe('ProjectCaseStudy', () => {
  it('renders the project title', () => {
    render(<ProjectCaseStudy project={mockProject} />)
    expect(screen.getByText(/Test/)).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<ProjectCaseStudy project={mockProject} />)
    expect(screen.getByText('A test project description.')).toBeInTheDocument()
  })

  it('renders the factbar with year and role', () => {
    render(<ProjectCaseStudy project={mockProject} />)
    expect(screen.getByText('2026')).toBeInTheDocument()
    expect(screen.getByText('Development')).toBeInTheDocument()
  })

  it('renders brief and approach sections', () => {
    render(<ProjectCaseStudy project={mockProject} />)
    expect(screen.getByText('the brief')).toBeInTheDocument()
    expect(screen.getByText('the approach')).toBeInTheDocument()
    expect(screen.getByText('Brief paragraph one.')).toBeInTheDocument()
  })

  it('renders the other project link', () => {
    render(<ProjectCaseStudy project={mockProject} />)
    expect(screen.getByText('Other Project')).toBeInTheDocument()
  })
})
