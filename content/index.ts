/**
 * Content layer — single source of truth for all site copy.
 *
 * Future: replace these static imports with CMS API calls
 * (e.g. Sanity, Contentful, or Shopify Metaobjects).
 */

export * as home from './home'
export * as services from './services'
export * as about from './about'
export * as contact from './contact'
export * as ticker from './ticker'

// Projects and blog posts live in lib/data/ (more structured)
// Re-export here for convenience
export { projects } from '@/lib/data/projects'
export { posts } from '@/lib/data/posts'
