/**
 * Segmented tab indicator positioning + work project filtering.
 * The indicator is positioned from the active button's own box,
 * so it stays correct through resize, font swap and filtering.
 */

export function initTabs() {
  function placeIndicator(bar: HTMLElement) {
    const active = bar.querySelector<HTMLButtonElement>('button[aria-pressed="true"]')
      || bar.querySelector<HTMLButtonElement>('button')
    if (!active) return

    bar.style.setProperty('--tw', `${active.offsetWidth}px`)
    bar.style.setProperty('--tx', `${active.offsetLeft - bar.scrollLeft}px`)
    bar.classList.add('init')
  }

  const bars = Array.from(document.querySelectorAll<HTMLElement>('.tabs'))

  bars.forEach((bar) => {
    bar.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button')
      if (!btn) return
      bar.querySelectorAll('button').forEach((b) => {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false')
      })
      placeIndicator(bar)
    })

    bar.addEventListener('scroll', () => placeIndicator(bar), { passive: true })
    placeIndicator(bar)
  })

  addEventListener('resize', () => bars.forEach(placeIndicator))

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => bars.forEach(placeIndicator))
  }

  ;(window as any).__placeTabs = () => bars.forEach(placeIndicator)

  // Work project filtering
  document.querySelectorAll<HTMLElement>('[data-tabs="work"]').forEach((bar) => {
    const wrap = bar.parentElement?.querySelector<HTMLElement>('.workrows')
    if (!wrap) return

    bar.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('button')
      if (!btn) return

      const filter = btn.dataset.filter
      wrap.querySelectorAll<HTMLElement>('.wrow').forEach((row) => {
        row.hidden = !(filter === 'all' || row.dataset.project === filter)
      })

      if ((window as any).ScrollTrigger) (window as any).ScrollTrigger.refresh()
    })
  })
}
