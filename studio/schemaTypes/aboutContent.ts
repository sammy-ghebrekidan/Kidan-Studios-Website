import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutContent',
  title: 'About Page Content',
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
      name: 'image',
      title: 'Band Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageCaption',
      title: 'Image Caption',
      type: 'string',
    }),
    defineField({
      name: 'servicesHeading',
      title: 'Services Heading',
      type: 'string',
    }),
    defineField({
      name: 'servicesParagraphs',
      title: 'Services Paragraphs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Text', type: 'text' },
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
      name: 'processParagraphs',
      title: 'Process Paragraphs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'text', title: 'Text', type: 'text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
    }),
    defineField({
      name: 'ctaSubtext',
      title: 'CTA Subtext',
      type: 'text',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA Link',
      type: 'string',
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
