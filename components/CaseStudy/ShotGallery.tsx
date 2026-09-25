'use client'

import { useState, useEffect, useCallback } from 'react'

interface Shot {
  src: string
  alt: string
  caption?: string
  tall?: boolean
}

interface ShotGalleryProps {
  shots: Shot[]
}

export default function ShotGallery({ shots }: ShotGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isOpen = openIndex !== null
  const count = shots.length

  const close = useCallback(() => setOpenIndex(null), [])
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % count)),
    [count]
  )
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + count) % count)),
    [count]
  )

  // Keyboard controls + lock body scroll while the lightbox is open
  useEffect(() => {
    if (!isOpen) return

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }

    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, close, next, prev])

  if (!count) return null

  const active = openIndex !== null ? shots[openIndex] : null

  return (
    <>
      <div className="sgrid">
        {shots.map((shot, i) => (
          <figure
            key={i}
            className={shot.tall ? 'sgrid-item sgrid-item--tall' : 'sgrid-item'}
          >
            <button
              type="button"
              className="sg-main"
              onClick={() => setOpenIndex(i)}
              aria-label={`View ${shot.caption || shot.alt || `screenshot ${i + 1}`} full size`}
            >
              <img
                src={shot.src}
                alt={shot.alt}
                loading="lazy"
                decoding="async"
              />
              <span className="sg-zoom" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 16l4.5 4.5M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </button>

            {shot.caption && (
              <figcaption className="sg-caption">{shot.caption}</figcaption>
            )}
          </figure>
        ))}
      </div>

      {isOpen && active && (
        <div
          className="sg-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption || active.alt || 'Screenshot'}
          onClick={close}
        >
          <button
            type="button"
            className="sg-lb-close"
            onClick={close}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>

          {count > 1 && (
            <button
              type="button"
              className="sg-lb-nav sg-lb-nav--prev"
              onClick={(e) => { e.stopPropagation(); prev() }}
              aria-label="Previous screenshot"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}

          <figure className="sg-lb-figure" onClick={(e) => e.stopPropagation()}>
            <img src={active.src} alt={active.alt} decoding="async" />
            {active.caption && <figcaption>{active.caption}</figcaption>}
          </figure>

          {count > 1 && (
            <button
              type="button"
              className="sg-lb-nav sg-lb-nav--next"
              onClick={(e) => { e.stopPropagation(); next() }}
              aria-label="Next screenshot"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          )}

          {count > 1 && (
            <span className="sg-lb-counter" aria-hidden="true">{(openIndex ?? 0) + 1} / {count}</span>
          )}
        </div>
      )}
    </>
  )
}
