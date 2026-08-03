import Link from 'next/link'

interface MarqueeProps {
  href?: string
  label?: string
  repeatCount?: number
}

const Marquee = ({
  href = '/contact',
  label = 'Get in touch',
  repeatCount = 8,
}: MarqueeProps) => {
  return (
    <Link className="marquee" href={href} style={{ display: 'block' }} aria-label={label}>
      <div className="track" aria-hidden="true">
        {Array.from({ length: repeatCount }, (_, i) => (
          <span key={i} className={i % 2 === 1 ? 'o' : undefined}>
            get in touch
          </span>
        ))}
      </div>
    </Link>
  )
}

export default Marquee
