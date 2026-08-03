'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { initSite } from '@/lib/site-logic'

const GsapProvider = () => {
  const pathname = usePathname()

  useEffect(() => {
    let cancelled = false

    const boot = () => {
      if (cancelled) return
      if (
        typeof window === 'undefined' ||
        !(window as any).gsap ||
        !(window as any).ScrollTrigger
      ) {
        setTimeout(boot, 60)
        return
      }
      initSite()
    }

    boot()
    return () => { cancelled = true }
  }, [pathname])

  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" strategy="afterInteractive" />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" strategy="afterInteractive" />
    </>
  )
}

export default GsapProvider
