/**
 * Site initialisation orchestrator.
 * Boots all interactive modules once GSAP is loaded.
 * Called on every route change via GsapProvider.
 */

import {
  initServicesMotion,
  initFab,
  initTabs,
  initLineReveals,
  initWorkCards,
  initWorkRows,
  initBlog,
  initAmbientParallax,
  initHeader,
} from '@/lib/modules'

export function initSite() {
  if (typeof window === 'undefined' || !(window as any).gsap) return

  // Kill existing ScrollTrigger instances to avoid duplicates on re-init
  const { ScrollTrigger } = window as any
  if (ScrollTrigger) ScrollTrigger.getAll().forEach((t: any) => t.kill())

  // Layout
  initHeader()

  // Animations (progressive enhancement)
  initServicesMotion()
  initLineReveals()
  initWorkRows()
  initAmbientParallax()

  // Interactive components
  initFab()
  initTabs()
  initWorkCards()
  initBlog()
}
