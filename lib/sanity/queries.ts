import { groq } from 'next-sanity'

// Project queries
export const projectsQuery = groq`
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    heroImage,
    year,
    role,
    status
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    heroImage,
    year,
    role,
    status,
    url,
    brief,
    approach,
    builtList,
    shots[] {
      image,
      alt,
      caption,
      tall
    },
    otherProject {
      project->{
        _id,
        title,
        slug
      },
      images
    }
  }
`

// Blog post queries
export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    standfirst,
    category,
    publishedAt,
    readTime,
    image
  }
`

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    standfirst,
    category,
    publishedAt,
    readTime,
    image,
    body,
    relatedPost->{
      _id,
      title,
      slug,
      standfirst,
      category,
      image
    }
  }
`

// Home content query
export const homeContentQuery = groq`
  *[_type == "homeContent"][0] {
    hero,
    trustBar,
    workSection,
    servicesSection,
    blogSection,
    closingCta
  }
`

// Site settings query
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    siteUrl,
    ticker,
    navigation,
    socialLinks
  }
`

// About page content query
export const aboutContentQuery = groq`*[_type == "aboutContent"][0] { eyebrow, heading, lede, image, imageCaption, servicesHeading, servicesParagraphs, processHeading, processParagraphs, skills, ctaHeading, ctaSubtext, ctaLabel, ctaHref, metaTitle, metaDescription }`

// Services page content query
export const servicesContentQuery = groq`*[_type == "servicesContent"][0] { eyebrow, heading, lede, trustBar, tiers, processHeading, processLede, processSteps, faqHeading, faqLede, faqs, promptHeading, promptSubtext, metaTitle, metaDescription }`

// Contact page content query
export const contactContentQuery = groq`*[_type == "contactContent"][0] { heading, lede, metaTitle, metaDescription }`
