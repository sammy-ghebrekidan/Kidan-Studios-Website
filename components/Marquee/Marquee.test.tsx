import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Marquee from './Marquee'

describe('Marquee', () => {
  it('renders as a link to contact by default', () => {
    render(<Marquee />)
    const link = screen.getByRole('link', { name: 'Get in touch' })
    expect(link).toHaveAttribute('href', '/contact')
  })

  it('renders the repeating text', () => {
    render(<Marquee />)
    expect(screen.getAllByText('get in touch').length).toBeGreaterThan(0)
  })

  it('accepts a custom href', () => {
    render(<Marquee href="/work" label="See work" />)
    const link = screen.getByRole('link', { name: 'See work' })
    expect(link).toHaveAttribute('href', '/work')
  })
})
