import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/blog', '/blog/'],
    },
    sitemap: 'https://kidanstudios.co.uk/sitemap.xml',
  }
}
