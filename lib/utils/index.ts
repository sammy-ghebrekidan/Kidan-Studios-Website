/**
 * Shared utility functions for site modules.
 */

/** Check if user prefers reduced motion */
export function prefersReducedMotion(): boolean {
  return !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)
}

/** Check if GSAP and ScrollTrigger are loaded */
export function hasGsap(): boolean {
  return !!(window as any).gsap && !!(window as any).ScrollTrigger
}

/** Check if device supports hover (not touch-only) */
export function hasHover(): boolean {
  return !matchMedia('(hover: none)').matches
}

/** Convert a NodeList/HTMLCollection to an array */
export function toArray<T extends Element>(list: NodeListOf<T> | HTMLCollectionOf<T>): T[] {
  return Array.from(list)
}
