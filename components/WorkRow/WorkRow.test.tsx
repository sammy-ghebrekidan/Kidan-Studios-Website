import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import WorkRow from './WorkRow'

const defaultProps = {
  project: 'coffee' as const,
  index: '01',
  title: 'kidan coffee',
  description: 'A test description for the project.',
  tags: ['shopify', 'liquid', 'cro'],
  images: [
    { src: '/img-1.jpg', alt: 'Test image', width: 800, height: 600 },
    { src: '/img-2.jpg', alt: '', width: 800, height: 600 },
  ],
  linkGo: 'proj-coffee',
}

describe('WorkRow', () => {
  it('renders the project title', () => {
    render(<WorkRow {...defaultProps} />)
    expect(screen.getByText('kidan coffee')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<WorkRow {...defaultProps} />)
    expect(screen.getByText('A test description for the project.')).toBeInTheDocument()
  })

  it('renders tags', () => {
    render(<WorkRow {...defaultProps} />)
    expect(screen.getByText('shopify')).toBeInTheDocument()
    expect(screen.getByText('liquid')).toBeInTheDocument()
    expect(screen.getByText('cro')).toBeInTheDocument()
  })

  it('renders images', () => {
    const { container } = render(<WorkRow {...defaultProps} />)
    const img = container.querySelector('img[alt="Test image"]')
    expect(img).toBeInTheDocument()
  })

  it('links to the correct case study', () => {
    render(<WorkRow {...defaultProps} />)
    const link = screen.getByRole('link', { name: /view case study/ })
    expect(link).toHaveAttribute('href', '/work/kidan-coffee')
  })
})
