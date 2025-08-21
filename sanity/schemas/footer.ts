// Footer schema - site-wide footer configuration
export default {
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Footer Title',
      type: 'string',
      initialValue: 'Site Footer',
      hidden: true,
    },
    {
      name: 'logo',
      title: 'Footer Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Logo displayed in the footer',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short tagline displayed under the logo',
    },
    {
      name: 'links',
      title: 'Footer Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Link Text',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'url',
              title: 'Link URL',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
              description: 'Internal links: /work-with-me, External: https://...',
            },
            {
              name: 'openInNewTab',
              title: 'Open in New Tab',
              type: 'boolean',
              initialValue: false,
              description: 'Check for external links',
            },
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'url',
            },
          },
        },
      ],
    },
    {
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule: any) => Rule.email(),
    },
    {
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      description: 'Full Instagram profile URL',
    },
    {
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      description: 'Copyright notice (year will be added automatically)',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tagline',
      media: 'logo',
    },
  },
}