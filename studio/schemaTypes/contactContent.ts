import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactContent',
  title: 'Contact Page Content',
  type: 'document',
  fields: [
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
