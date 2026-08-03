import Link from 'next/link'

interface ImageData {
  src: string
  alt: string
  width: number
  height: number
}

interface WorkRowProps {
  project: 'coffee' | 'cycles'
  index: string
  title: string
  description: string
  tags: string[]
  images: ImageData[]
  linkGo: string
  headingLevel?: 'h2' | 'h3'
}

const SLUG_MAP: Record<string, string> = {
  'proj-coffee': 'kidan-coffee',
  'proj-cycles': 'eco-cycles',
}

const WorkRow = ({
  project,
  index,
  title,
  description,
  tags,
  images,
  linkGo,
  headingLevel: Heading = 'h3',
}: WorkRowProps) => {
  const slug = SLUG_MAP[linkGo] ?? linkGo

  return (
    <article className="wrow" data-project={project}>
      <div className="wshot" aria-hidden="true">
        <span className="idx">{index}</span>
        <span className="wstack">
          {images.map((img, i) => (
            <img
              key={img.src}
              className={i === 0 ? 'on' : undefined}
              decoding="async"
              loading="lazy"
              width={img.width}
              height={img.height}
              src={img.src}
              alt={img.alt}
            />
          ))}
        </span>
        <span className="wdots">
          {images.map((_, i) => (
            <i key={i} className={i === 0 ? 'on' : undefined} />
          ))}
        </span>
      </div>

      <div className="wtext">
        <span className="wnum">{index} — shopify / e-commerce</span>
        <Heading className={Heading === 'h2' ? 'wh' : undefined}>{title}</Heading>
        <p>{description}</p>
        <div className="wtags">
          {tags.map((tag) => (
            <span key={tag} className={tag === 'shopify' ? 'tag-shopify' : undefined}>
              {tag}
            </span>
          ))}
        </div>
        <Link className="wlink" href={`/work/${slug}`}>
          view case study <em aria-hidden="true">→</em>
        </Link>
      </div>
    </article>
  )
}

export default WorkRow
