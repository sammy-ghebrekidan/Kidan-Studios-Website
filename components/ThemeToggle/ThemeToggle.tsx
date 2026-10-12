'use client'

/**
 * Internal-only theme toggle.
 * Press Shift+L (when not typing in an input) to switch between dark and light.
 * Preference is stored in localStorage so it persists across sessions.
 */

import { useEffect } from 'react'

const STORAGE_KEY = 'kidan-theme'

export const ThemeToggle = () => {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable) return
      if (e.shiftKey && e.key === 'L') {
        const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light'
        document.documentElement.setAttribute('data-theme', next)
        try { localStorage.setItem(STORAGE_KEY, next) } catch {}
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return null
}
