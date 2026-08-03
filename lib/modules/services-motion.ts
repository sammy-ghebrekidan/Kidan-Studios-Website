/**
 * Services section scroll-triggered animation.
 * Progressive enhancement — content is fully visible without JS.
 * GSAP sets the "from" state at runtime so crawlers see everything.
 */

import { prefersReducedMotion, hasGsap } from '../utils'

export function initServicesMotion() {
  if (!hasGsap() || prefersReducedMotion()) return

  const { gsap, ScrollTrigger } = window as any
  gsap.registerPlugin(ScrollTrigger)

  const section = document.getElementById('services')
  if (!section) return

  const heading = section.querySelector<HTMLElement>('#services-title')
  const lede = section.querySelector<HTMLElement>('.lede-sm')
  const cards: HTMLElement[] = gsap.utils.toArray('.svccard', section)

  if (!heading || !lede) return

  // Split heading into per-word masks for reveal animation
  const words = heading.textContent!.trim().split(/\s+/)
  heading.textContent = ''

  const wordEls = words.map((word, i) => {
    const mask = document.createElement('span')
    mask.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom'

    const inner = document.createElement('span')
    inner.style.cssText = 'display:inline-block;will-change:transform'
    inner.textContent = word

    mask.appendChild(inner)
    heading.appendChild(mask)
    if (i < words.length - 1) heading.appendChild(document.createTextNode(' '))

    return inner
  })

  // Build the timeline
  const tl = gsap.timeline({
    scrollTrigger: { trigger: section, start: 'top 72%', once: true },
  })

  tl.from(wordEls, { yPercent: 115, duration: 0.95, ease: 'power4.out', stagger: 0.07 })
    .from(lede, { y: 18, autoAlpha: 0, duration: 0.7, ease: 'power3.out' }, '-=.55')
    .from(cards, { y: 46, autoAlpha: 0, duration: 0.85, ease: 'power3.out', stagger: 0.12 }, '-=.45')

  // Animate card internals
  cards.forEach((card, i) => {
    const sweep = card.querySelector('.sweep')
    const num = card.querySelector('.num')
    const dot = card.querySelector('.dot')
    const items = card.querySelectorAll('li')

    tl.to(sweep, { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, 0.55 + i * 0.12)
      .from(num, { autoAlpha: 0, x: -8, duration: 0.45 }, 0.62 + i * 0.12)
      .from(dot, { scale: 0, duration: 0.45, ease: 'back.out(2)' }, 0.66 + i * 0.12)
      .from(items, { x: -12, autoAlpha: 0, duration: 0.5, ease: 'power2.out', stagger: 0.05 }, 0.72 + i * 0.12)
  })

  // Failsafe: if page toggling left content in the "from" state, force play
  setTimeout(() => {
    if (tl.progress() === 0 && !tl.isActive()) {
      const rect = section.getBoundingClientRect()
      if (rect.top < innerHeight && rect.bottom > 0) tl.play()
    }
  }, 2500)

  ;(window as any).__refreshMotion = () => ScrollTrigger.refresh()
}
