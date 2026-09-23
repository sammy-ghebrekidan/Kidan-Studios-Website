import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homeContent',
  title: 'Home Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Home Page',
      readOnly: true,
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'lede', title: 'Lede', type: 'text' },
        { name: 'status', title: 'Status', type: 'string' },
        {
          name: 'cta',
          title: 'Primary CTA',
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'href', type: 'string', title: 'Link' },
          ]
        },
        {
          name: 'ctaSecondary',
          title: 'Secondary CTA',
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'href', type: 'string', title: 'Link' },
          ]
        },
      ]
    }),
    defineField({
      name: 'trustBar',
      title: 'Trust Bar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icon', type: 'string', description: 'Icon identifier (e.g. i-globe)' },
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ]
        }
      ]
    }),
    defineField({
      name: 'workSection',
      title: 'Work Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        {
          name: 'cta',
          title: 'CTA',
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'href', type: 'string', title: 'Link' },
          ]
        },
      ]
    }),
    defineField({
      name: 'servicesSection',
      title: 'Services Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        {
          name: 'cta',
          title: 'CTA',
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'href', type: 'string', title: 'Link' },
          ]
        },
      ]
    }),
    defineField({
      name: 'blogSection',
      title: 'Blog Section',
      type: 'object',
      fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        {
          name: 'cta',
          title: 'CTA',
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'href', type: 'string', title: 'Link' },
          ]
        },
      ]
    }),
    defineField({
      name: 'closingCta',
      title: 'Closing CTA',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'text' },
        { name: 'subtext', title: 'Subtext', type: 'text' },
      ]
    }),
  ],
})
