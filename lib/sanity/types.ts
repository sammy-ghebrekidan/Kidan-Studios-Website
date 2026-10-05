import type { PortableTextBlock } from '@portabletext/types'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

export interface Project {
  _id: string
  title: string
  slug: {
    current: string
  }
  description: string
  heroImage: SanityImage
  year: string
  role: string
  status: string
  url?: string
  brief?: PortableTextBlock[]
  approach?: PortableTextBlock[]
  builtList?: Array<{
    items: string[]
  }>
  shots?: Array<{
    image: SanityImage
    alt: string
    caption?: string
    tall?: boolean
  }>
  otherProject?: {
    project: {
      _id: string
      title: string
      slug: {
        current: string
      }
    }
    images: SanityImage[]
  }
}

export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  standfirst: string
  category: string
  publishedAt: string
  readTime: string
  image: SanityImage
  body?: PortableTextBlock[]
  relatedPost?: {
    _id: string
    title: string
    slug: {
      current: string
    }
    standfirst: string
    category: string
    image: SanityImage
  }
}

export interface HomeContent {
  hero: {
    eyebrow: string
    title: string
    lede: string
    status: string
    cta: {
      label: string
      href: string
    }
    ctaSecondary: {
      label: string
      href: string
    }
  }
  trustBar: Array<{
    icon: string
    label: string
    value: string
  }>
  workSection: {
    title: string
    subtitle: string
    cta: {
      label: string
      href: string
    }
  }
  servicesSection: {
    title: string
    subtitle: string
    cta: {
      label: string
      href: string
    }
  }
  blogSection: {
    title: string
    subtitle: string
    cta: {
      label: string
      href: string
    }
  }
  closingCta: {
    heading: string
    subtext: string
  }
}

export type AboutContent = {
  eyebrow?: string
  heading?: string
  lede?: string
  image?: { asset: { _ref: string }; hotspot?: object }
  imageCaption?: string
  servicesHeading?: string
  servicesParagraphs?: Array<{ text: string }>
  processHeading?: string
  processParagraphs?: Array<{ text: string }>
  skills?: string[]
  ctaHeading?: string
  ctaSubtext?: string
  ctaLabel?: string
  ctaHref?: string
  metaTitle?: string
  metaDescription?: string
}

export interface SiteSettings {
  title: string
  description: string
  siteUrl: string
  ticker: string[]
  navigation: Array<{
    label: string
    href: string
  }>
  socialLinks: {
    twitter?: string
    linkedin?: string
    github?: string
    instagram?: string
  }
}
