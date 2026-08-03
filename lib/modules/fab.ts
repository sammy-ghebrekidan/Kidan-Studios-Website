/**
 * Floating CTA button visibility.
 * Shows after scrolling past 340px, hides on the contact page.
 */

export function initFab() {
  const fab = document.getElementById('fab')
  if (!fab) return

  function sync() {
    const onContact = window.location.pathname === '/contact'
    fab!.setAttribute('data-show', (!onContact && scrollY > 340) ? '1' : '0')
  }

  addEventListener('scroll', sync, { passive: true })
  addEventListener('resize', sync)
  ;(window as any).__syncFab = sync
  sync()
}
