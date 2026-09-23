'use client'

import { useState, useRef } from 'react'

interface Shot {
  src: string
  alt: string
  caption?: string
  tall?: boolean
}

interface ShotGalleryProps {
  shots: Shot[]
  url?: string  // e.g. "kidancoffee.com" — shown in the browser chrome bar
}

export default function ShotGallery({ shots, url }: ShotGalleryProps) {
  const [active, setActive] = useState(0)
  const imgRef = useRef<HTMLImageElement>(null)

  if (!shots.length) return null

  const current = shots[active]
  const isTall = current.tall

  function handleMouseEnter() {
    if (!isTall || !imgRef.current) return
    const img = imgRef.current
    const container = img.parentElement as HTMLElement
    const scrollDist = img.naturalHeight - container.offsetHeight
    if (scrollDist <= 0) return
    img.style.transition = `transform ${Math.max(3, scrollDist / 80)}s linear`
    img.style.transform = `translateY(-${scrollDist}px)`
  }

  function handleMouseLeave() {
    if (!isTall || !imgRef.current) return
    const img = imgRef.current
    img.style.transition = 'transform 0.6s ease'
    img.style.transform = 'translateY(0)'
  }

  return (
    <div className="sg">

      {/* Browser chrome frame */}
      <div className="sg-browser">
        <div className="sg-chrome" aria-hidden="true">
          <span className="sg-dots">
            <i /><i /><i />
          </span>
          <span className="sg-urlbar">
            <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1"/>
              <path d="M6 1C6 1 4 3.5 4 6s2 5 2 5M6 1c0 0 2 2.5 2 5s-2 5-2 5M1 6h10" stroke="currentColor" strokeWidth="1"/>
            </svg>
            {url || 'shopify store'}
          </span>
          <span className="sg-chrome-actions">
            <i /><i />
          </span>
        </div>

        {/* Main image viewport */}
        <div
          className={isTall ? 'sg-main sg-main--tall' : 'sg-main'}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            ref={imgRef}
            key={active}
            src={current.src}
            alt={current.alt}
            loading="lazy"
            decoding="async"
          />
          {isTall && (
            <span className="sg-scroll-hint" aria-hidden="true">
              hover to scroll
            </span>
          )}
        </div>
      </div>

      {/* Caption */}
      {current.caption && (
        <p className="sg-caption">{current.caption}</p>
      )}

      {/* Thumbnail strip */}
      {shots.length > 1 && (
        <div className="sg-thumbs" role="tablist" aria-label="Project screenshots">
          {shots.map((shot, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              aria-label={shot.caption || `Screenshot ${i + 1}`}
              className={i === active ? 'sg-thumb on' : 'sg-thumb'}
              onClick={() => setActive(i)}
            >
              <img src={shot.src} alt="" aria-hidden="true" />
              {shot.tall && <span className="sg-thumb-badge" aria-hidden="true">↕</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
