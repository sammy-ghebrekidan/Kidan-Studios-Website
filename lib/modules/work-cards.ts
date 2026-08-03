/**
 * Work card image cycling.
 * Crossfades through project screenshots on hover,
 * resets to first frame on leave.
 */

import { prefersReducedMotion } from '@/lib/utils'

export function initWorkCards() {
  const reduce = prefersReducedMotion()

  document.querySelectorAll<HTMLElement>('.wrow').forEach((row) => {
    const stack = row.querySelector('.wstack')
    if (!stack) return

    const images = Array.from(stack.querySelectorAll<HTMLImageElement>('img'))
    const dots = Array.from(row.querySelectorAll<HTMLElement>('.wdots i'))
    if (images.length < 2) return

    let current = 0
    let timer: ReturnType<typeof setInterval> | null = null

    function show(index: number) {
      current = (index + images.length) % images.length
      images.forEach((img, k) => img.classList.toggle('on', k === current))
      dots.forEach((dot, k) => dot.classList.toggle('on', k === current))
    }

    function start() {
      if (reduce || timer) return
      timer = setInterval(() => show(current + 1), 1500)
    }

    function stop() {
      if (timer) clearInterval(timer)
      timer = null
      show(0)
    }

    row.addEventListener('pointerenter', start)
    row.addEventListener('pointerleave', stop)
    row.addEventListener('focusin', start)
    row.addEventListener('focusout', stop)
  })
}
