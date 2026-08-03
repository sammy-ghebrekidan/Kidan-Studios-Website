import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Prompt from './Prompt'

describe('Prompt', () => {
  it('renders heading and subtext', () => {
    render(<Prompt heading="Got a question?" subtext="We reply fast." />)
    expect(screen.getByText('Got a question?')).toBeInTheDocument()
    expect(screen.getByText('We reply fast.')).toBeInTheDocument()
  })

  it('renders default CTA when no actions provided', () => {
    render(<Prompt heading="Test" subtext="Sub" />)
    expect(screen.getByText('start a project')).toBeInTheDocument()
  })

  it('renders custom actions when provided', () => {
    render(<Prompt heading="Test" subtext="Sub" actions={<button>Custom</button>} />)
    expect(screen.getByText('Custom')).toBeInTheDocument()
    expect(screen.queryByText('start a project')).not.toBeInTheDocument()
  })
})
