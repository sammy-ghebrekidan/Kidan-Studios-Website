import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from './Footer'

describe('Footer', () => {
  it('renders the email link', () => {
    render(<Footer />)
    expect(screen.getByText('hello@kidanstudios.co.uk')).toBeInTheDocument()
  })

  it('renders page links', () => {
    render(<Footer />)
    expect(screen.getByText('home')).toBeInTheDocument()
    expect(screen.getByText('work')).toBeInTheDocument()
    expect(screen.getByText('contact')).toBeInTheDocument()
  })

  it('renders the wordmark', () => {
    render(<Footer />)
    expect(screen.getByText('KIDAN STUDIOS')).toBeInTheDocument()
  })

  it('renders copyright notice', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2026 Kidan Studios/)).toBeInTheDocument()
  })
})
