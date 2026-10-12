'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'

export const SimpleContactForm = () => {
  const [done, setDone] = useState(false)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    // simulate send — wire up to your email handler when ready
    await new Promise((r) => setTimeout(r, 800))
    setSending(false)
    setDone(true)
  }

  if (done) {
    return (
      <div style={{ maxWidth: '480px' }}>
        <p style={{ fontSize: 'var(--t-lg)', fontWeight: 500, color: 'var(--fg)', marginBottom: '12px' }}>message sent.</p>
        <p style={{ color: 'var(--fg-3)' }}>you'll hear back within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <label className="field">
        <span>name</span>
        <input type="text" name="name" required placeholder="enter name" />
      </label>
      <label className="field">
        <span>email</span>
        <input type="email" name="email" required placeholder="enter email" />
      </label>
      <label className="field">
        <span>message</span>
        <textarea name="message" required rows={4} placeholder="enter message" />
      </label>
      <button type="submit" className="btn" style={{ alignSelf: 'flex-start' }} disabled={sending}>
        {sending ? 'sending…' : 'send'}
      </button>
    </form>
  )
}
