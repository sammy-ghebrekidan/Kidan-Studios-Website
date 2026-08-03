import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Header from './Header'

describe('Header', () => {
  it('renders the brand name', () => {
    render(<Header />)
    expect(screen.getByText('Kidan Studios')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Header />)
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument()
    expect(screen.getAllByText('work').length).toBeGreaterThan(0)
    expect(screen.getAllByText('services').length).toBeGreaterThan(0)
    expect(screen.getAllByText('blog').length).toBeGreaterThan(0)
    expect(screen.getAllByText('about').length).toBeGreaterThan(0)
  })

  it('renders the burger menu button', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: 'Open menu' })).toBeInTheDocument()
  })

  it('renders the CTA link', () => {
    render(<Header />)
    expect(screen.getAllByText('start a project').length).toBeGreaterThan(0)
  })
})
