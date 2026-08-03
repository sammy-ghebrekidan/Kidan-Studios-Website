import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Fab from './Fab'

describe('Fab', () => {
  it('renders as a link to contact', () => {
    render(<Fab />)
    const link = screen.getByRole('link', { name: 'Start a project' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/contact')
  })

  it('contains the rotating text SVG', () => {
    render(<Fab />)
    expect(screen.getByText(/start a project/)).toBeInTheDocument()
  })
})
