/**
 * Responsive header behaviour.
 * Handles mobile menu open/close, escape key, outside click,
 * auto-close on resize, and scroll-based "stuck" state.
 */

export function initHeader() {
  const nav = document.querySelector<HTMLElement>('.nav')
  if (!nav) return

  const burger = nav.querySelector<HTMLButtonElement>('.burger')
  if (!burger) return

  function setOpen(open: boolean) {
    nav!.setAttribute('data-open', open ? '1' : '0')
    burger!.setAttribute('aria-expanded', open ? 'true' : 'false')
    burger!.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
    document.body.style.overflow = open ? 'hidden' : ''
  }

  // Toggle on burger click
  burger.addEventListener('click', () => {
    setOpen(nav!.getAttribute('data-open') !== '1')
  })

  // Close when a nav panel link is clicked
  nav.querySelectorAll('.navpanel a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false))
  })

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav!.getAttribute('data-open') === '1') {
      setOpen(false)
      burger!.focus()
    }
  })

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (nav!.getAttribute('data-open') === '1' && !nav!.contains(e.target as Node)) {
      setOpen(false)
    }
  })

  // Auto-close on desktop resize
  addEventListener('resize', () => {
    if (innerWidth > 900) setOpen(false)
  })

  // Scroll-based sticky state
  addEventListener('scroll', () => {
    nav!.setAttribute('data-stuck', scrollY > 24 ? '1' : '0')
  }, { passive: true })
}
