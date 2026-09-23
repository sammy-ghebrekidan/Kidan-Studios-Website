'use client'

import { useState, useRef } from 'react'

interface Shot {
  src: string
  alt: string
  caption?: string
  tall?: boolean // true for full-page screenshots
}

interface ShotGalleryProps {
  shots: Shot[]
}

export default function ShotGallery({ shots }: ShotGalleryProps) {
  const [active, setActive] = useState(0)
  const imgRef = useRef<HTMLImageElement>(null)

  if (!shots.length) return null

  const current = shots[active]
  const isTall = current.tall

  function handleMouseEnter() {
    if (!isTall || !imgRef.current) return
    const img = imgRef.current
    const container = img.parentElement as HTMLElement
    // how far we need to scroll: image height minus the visible container height
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
      {/* Main image */}
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
