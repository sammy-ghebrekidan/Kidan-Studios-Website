import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import ContactForm from './ContactForm'

describe('ContactForm', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the first question', () => {
    render(<ContactForm />)
    expect(screen.getByText('what do you need?')).toBeInTheDocument()
  })

  it('renders radio options for the need step', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText('a new store build')).toBeInTheDocument()
    expect(screen.getByLabelText('a bug fix or small tweak')).toBeInTheDocument()
  })

  it('shows progress indicator', () => {
    render(<ContactForm />)
    expect(screen.getByText(/questions/)).toBeInTheDocument()
  })

  it('renders the email fallback', () => {
    render(<ContactForm />)
    expect(screen.getByText('would rather just email?')).toBeInTheDocument()
  })

  it('advances to next step on radio selection', async () => {
    vi.useRealTimers()
    render(<ContactForm />)
    fireEvent.click(screen.getByLabelText('a new store build'))

    await waitFor(() => {
      expect(screen.getByPlaceholderText('yourbrand.com')).toBeInTheDocument()
    })
  })

  it('shows done state after completing all steps', async () => {
    vi.useRealTimers()
    render(<ContactForm />)

    // Step 1: select "fix" (skips budget + when)
    fireEvent.click(screen.getByLabelText('a bug fix or small tweak'))
    await waitFor(() => expect(screen.getByPlaceholderText('yourbrand.com')).toBeInTheDocument())

    // Step 2: store (optional)
    fireEvent.click(screen.getByRole('button', { name: 'next' }))

    // Step 3: problem
    fireEvent.change(
      screen.getByPlaceholderText("tell me what's bugging you about the current setup"),
      { target: { value: 'Something is broken' } },
    )
    fireEvent.click(screen.getByRole('button', { name: /next|send/ }))

    // Step 4: contact info
    fireEvent.change(screen.getByPlaceholderText('jane roberts'), { target: { value: 'Jane' } })
    fireEvent.change(screen.getByPlaceholderText('jane@yourbrand.com'), { target: { value: 'jane@test.com' } })
    fireEvent.click(screen.getByRole('button', { name: 'send it over' }))

    expect(screen.getByText("that's everything — thanks")).toBeInTheDocument()
  })
})
