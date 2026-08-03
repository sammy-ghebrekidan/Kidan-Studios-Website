export interface BlogImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface BlogPost {
  slug: string
  title: string
  standfirst: string
  category: string
  date: string
  dateFormatted: string
  readTime: string
  image: BlogImage
  bodyHtml: string
  relatedSlug?: string
}
