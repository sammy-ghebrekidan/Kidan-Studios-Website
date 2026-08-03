/**
 * Line reveal animations for headings and text.
 * Splits headings into lines, rises them from a mask, then restores
 * the original DOM. Nothing hidden in CSS — crawlers/JS-off unaffected.
 */

import { prefersReducedMotion, hasGsap } from '@/lib/utils'

const REVEAL_SELECTOR = '.h1, .h2:not(#services-title), .lede, .lede-sm, .arthead h1, .csintro h2'

function textToWordSpans(el: HTMLElement): Node[] {
  const output: Node[] = []

  Array.from(el.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent!.split(/(\s+)/).forEach((segment) => {
        if (!segment.trim()) {
          if (segment) output.push(document.createTextNode(segment))
          return
        }
        const span = document.createElement('span')
        span.style.display = 'inline-block'
        span.textContent = segment
        output.push(span)
      })
    } else if (node.nodeName === 'BR') {
      output.push(document.createElement('br'))
    } else {
      output.push(node.cloneNode(true))
    }
  })

  return output
}

function revealElement(el: HTMLElement) {
  if (el.dataset.split) return
  el.dataset.split = '1'

  const { gsap, ScrollTrigger } = window as any
  const originalHTML = el.innerHTML
  const words = textToWordSpans(el)

  el.innerHTML = ''
  words.forEach((node) => el.appendChild(node))

  // Group words into lines based on their rendered top position
  const lines: Node[][] = []
  let currentLine: Node[] | null = null
  let currentTop: number | null = null

  words.forEach((node) => {
    if (node.nodeName === 'BR') { currentLine = null; currentTop = null; return }
    if (node.nodeType === Node.TEXT_NODE) { if (currentLine) currentLine.push(node); return }

    const top = (node as HTMLElement).offsetTop
    if (currentLine === null || Math.abs(top - currentTop!) > 2) {
      currentLine = []
      lines.push(currentLine)
      currentTop = top
    }
    currentLine.push(node)
  })

  if (!lines.length) { el.innerHTML = originalHTML; return }

  // Wrap each line in a mask + inner span
  const fragment = document.createDocumentFragment()
  const inners: HTMLElement[] = []

  lines.forEach((nodes) => {
    const mask = document.createElement('span')
    mask.className = 'ln'
    const inner = document.createElement('span')
    inner.className = 'ln-i'
    nodes.forEach((n) => inner.appendChild(n))
    mask.appendChild(inner)
    fragment.appendChild(mask)
    inners.push(inner)
  })

  el.innerHTML = ''
  el.appendChild(fragment)

  gsap.from(inners, {
    yPercent: 112,
    duration: 0.95,
    ease: 'power4.out',
    stagger: 0.075,
    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    onComplete: () => { el.innerHTML = originalHTML },
  })
}

function initReveals(root?: Element | null) {
  const container = root || document.querySelector('main:not(.hide)')
  if (!container) return

  container.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
    if (el.offsetParent === null) return // skip hidden pages
    if (!el.textContent?.trim()) return
    revealElement(el)
  })
}

export function initLineReveals() {
  if (!hasGsap() || prefersReducedMotion()) return

  const { gsap, ScrollTrigger } = window as any
  gsap.registerPlugin(ScrollTrigger)

  initReveals()
  ;(window as any).__initReveals = () => initReveals()
}
