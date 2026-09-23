'use client'

import { PortableText as PortableTextReact } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { urlFor } from '@/lib/sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

interface PortableTextProps {
  value: PortableTextBlock[]
}

const components = {
  block: {
    h2: ({ children }: any) => <h2 id={children?.[0]?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}>{children}</h2>,
    h3: ({ children }: any) => <h3>{children}</h3>,
    normal: ({ children }: any) => <p>{children}</p>,
    blockquote: ({ children }: any) => <blockquote>{children}</blockquote>,
  },
  marks: {
    strong: ({ children }: any) => <strong>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    code: ({ children }: any) => <code>{children}</code>,
    link: ({ children, value }: any) => {
      const href = value?.href || ''
      return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
    },
  },
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset) return null
      return (
        <figure className="article-image">
          <img
            src={urlFor(value).width(1200).url()}
            alt={value.alt || ''}
            loading="lazy"
          />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      )
    },
  },
}

export default function PortableText({ value }: PortableTextProps) {
  return <PortableTextReact value={value} components={components} />
}
