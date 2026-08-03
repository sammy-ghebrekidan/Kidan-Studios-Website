/**
 * Work row scroll-triggered reveal + image parallax.
 * Nothing hidden in CSS — GSAP sets the from-state at runtime.
 */

import { prefersReducedMotion, hasGsap } from '@/lib/utils'

export function initWorkRows() {
  if (!hasGsap() || prefersReducedMotion()) return

  const { gsap, ScrollTrigger } = window as any
  gsap.registerPlugin(ScrollTrigger)

  const rows = Array.from(document.querySelectorAll<HTMLElement>('.wrow'))
  if (!rows.length) return

  rows.forEach((row) => {
    const shot = row.querySelector('.wshot')
    const img = row.querySelector('.wstack')
    const textElements = row.querySelectorAll('.wtext > *')

    // Reveal animation
    gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 78%', once: true } })
      .from(shot, { y: 52, autoAlpha: 0, duration: 0.95, ease: 'power3.out' })
      .from(textElements, { y: 26, autoAlpha: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 }, '-=.62')

    // Parallax drift on the image stack
    gsap.fromTo(img, { yPercent: -6 }, {
      yPercent: 6,
      ease: 'none',
      scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: true },
    })
  })
}
