/**
 * Hero ambient parallax effect.
 * Blobs drift in response to pointer movement.
 * Enhancement only — no effect on touch devices or reduced-motion.
 */

import { prefersReducedMotion, hasHover } from '@/lib/utils'

export function initAmbientParallax() {
  const stage = document.querySelector<HTMLElement>('.herostage')
  if (!stage || !(window as any).gsap) return
  if (prefersReducedMotion() || !hasHover()) return

  const { gsap } = window as any
  const blobs = Array.from(stage.querySelectorAll<HTMLElement>('.blob'))

  const movers = blobs.map((blob, i) => ({
    x: gsap.quickTo(blob, 'xPercent', { duration: 1.1, ease: 'power3' }),
    y: gsap.quickTo(blob, 'yPercent', { duration: 1.1, ease: 'power3' }),
    depth: (i + 1) * 3,
  }))

  stage.addEventListener('pointermove', (e) => {
    const rect = stage.getBoundingClientRect()
    const normalX = (e.clientX - rect.left) / rect.width - 0.5
    const normalY = (e.clientY - rect.top) / rect.height - 0.5

    movers.forEach((m) => {
      m.x(normalX * m.depth)
      m.y(normalY * m.depth)
    })
  })

  stage.addEventListener('pointerleave', () => {
    movers.forEach((m) => { m.x(0); m.y(0) })
  })
}
