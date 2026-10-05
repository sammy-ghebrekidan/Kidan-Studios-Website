import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'servicesContent',
  title: 'Services Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'lede',
      title: 'Lede',
      type: 'text',
    }),
    defineField({
      name: 'trustBar',
      title: 'Trust Bar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'tiers',
      title: 'Pricing Tiers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'badge', title: 'Badge', type: 'string' },
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'price', title: 'Price', type: 'string' },
            { name: 'duration', title: 'Duration', type: 'string' },
            {
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{ type: 'string' }],
            },
            { name: 'ctaLabel', title: 'CTA Label', type: 'string' },
            { name: 'ctaHref', title: 'CTA Link', type: 'string' },
            { name: 'featured', title: 'Featured', type: 'boolean' },
          ],
        },
      ],
    }),
    defineField({
      name: 'processHeading',
      title: 'Process Heading',
      type: 'string',
    }),
    defineField({
      name: 'processLede',
      title: 'Process Lede',
      type: 'text',
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', title: 'Number', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'blurb', title: 'Blurb', type: 'text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'faqHeading',
      title: 'FAQ Heading',
      type: 'string',
    }),
    defineField({
      name: 'faqLede',
      title: 'FAQ Lede',
      type: 'text',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'promptHeading',
      title: 'Prompt Heading',
      type: 'text',
    }),
    defineField({
      name: 'promptSubtext',
      title: 'Prompt Subtext',
      type: 'text',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
    }),
  ],
})
