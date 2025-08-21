// Service schema for managing individual services
export default {
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'e.g., "Sleep Guidance Call"',
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Used for the service page URL',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
      description: 'Order in which this service appears (lower numbers appear first)',
    },
    {
      name: 'featured',
      title: 'Featured Service',
      type: 'boolean',
      description: 'Show this service prominently on the homepage',
      initialValue: false,
    },
    {
      name: 'subtitle',
      title: 'Service Subtitle/Question',
      type: 'string',
      description: 'e.g., "Need a little support as you support your child\'s sleep?"',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      description: 'e.g., "50 Minutes | $145"',
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Brief description for service cards',
    },
    {
      name: 'fullDescription',
      title: 'Full Description',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Detailed description for the service page',
    },
    {
      name: 'whatYouGet',
      title: 'What You Get',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'item',
            title: 'Item',
            type: 'string',
          },
          {
            name: 'description',
            title: 'Description (optional)',
            type: 'text',
            rows: 2,
          },
        ],
      }],
      description: 'List of what\'s included in this service',
    },
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'quote',
            title: 'Quote',
            type: 'text',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'author',
            title: 'Author Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'context',
            title: 'Context (optional)',
            type: 'string',
            description: 'e.g., "Mother of 2"',
          },
        ],
      }],
    },
    {
      name: 'ctaButton',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          initialValue: 'BOOK NOW',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          description: 'e.g., https://calendly.com/clairefagin/infantsleepguidance',
        },
        {
          name: 'openInNewTab',
          title: 'Open in New Tab',
          type: 'boolean',
          initialValue: true,
        },
      ],
    },
    {
      name: 'bookingInfo',
      title: 'Booking Information',
      type: 'text',
      rows: 3,
      description: 'Additional booking instructions (e.g., "After booking on my calendar, Venmo @claire-fagin...")',
    },
    {
      name: 'image',
      title: 'Service Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'packageDetails',
      title: 'Package Details',
      type: 'object',
      fields: [
        {
          name: 'sessions',
          title: 'Number of Sessions',
          type: 'string',
          description: 'e.g., "3 x 50 Minute Sessions"',
        },
        {
          name: 'duration',
          title: 'Total Duration',
          type: 'string',
          description: 'e.g., "3 weeks"',
        },
        {
          name: 'support',
          title: 'Support Included',
          type: 'string',
          description: 'e.g., "Ongoing Support via Text"',
        },
        {
          name: 'followUp',
          title: 'Follow-up Included',
          type: 'boolean',
          initialValue: false,
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'SEO title for this service page',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
          description: 'SEO description for this service page',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'price',
      media: 'image',
      order: 'order',
    },
    prepare(selection: any) {
      const {title, subtitle, media, order} = selection;
      return {
        title: `${order}. ${title}`,
        subtitle,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ],
}