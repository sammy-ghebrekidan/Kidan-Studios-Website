'use client'

import { useEffect, useRef } from 'react'

interface Shot {
  src: string
  alt: string
  caption?: string
}

interface ShotGalleryProps {
  shots: Shot[]
}

export default function ShotGallery({ shots }: ShotGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP scroll reveal — each shot fades + slides up as it enters viewport
    if (typeof window === 'undefined') return
    const gsap = (window as any).gsap
    const ScrollTrigger = (window as any).ScrollTrigger
    if (!gsap || !ScrollTrigger) return

    const items = galleryRef.current?.querySelectorAll('.sg-item')
    if (!items) return

    items.forEach((item) => {
      const img = item.querySelector('.sg-img')
      const caption = item.querySelector('.sg-caption')

      gsap.fromTo(img,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 82%',
            toggleActions: 'play none none none',
          }
        }
      )

      if (caption) {
        gsap.fromTo(caption,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 82%',
              toggleActions: 'play none none none',
            }
          }
        )
      }
    })
  }, [shots])

  return (
    <div className="sg-gallery" ref={galleryRef}>
      {shots.map((shot, i) => (
        <div className="sg-item" key={i} data-index={i}>
          <div className="sg-img-wrap">
            <img
              className="sg-img"
              src={shot.src}
              alt={shot.alt}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="sg-caption">
            <span className="sg-num">0{i + 1}</span>
            {shot.caption && <p>{shot.caption}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
