// Schema for service packages
export default {
  name: 'servicePackage',
  title: 'Service Package',
  type: 'document',
  fields: [
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Package Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle Question',
      type: 'string',
      description: 'The question that appears below the title',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price/Duration',
      type: 'string',
      description: 'e.g., "50 Minutes | $145"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Package Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      default: 'LEARN MORE',
    },
    {
      name: 'slug',
      title: 'Detail Page Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    // Detailed page content
    {
      name: 'detailContent',
      title: 'Detail Page Content',
      type: 'object',
      fields: [
        {
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'fullDescription',
          title: 'Full Description',
          type: 'array',
          of: [{type: 'block'}],
        },
        {
          name: 'whatsIncluded',
          title: 'What\'s Included',
          type: 'array',
          of: [{type: 'string'}],
        },
        {
          name: 'bookingInfo',
          title: 'Booking Information',
          type: 'text',
        },
        {
          name: 'bookingLink',
          title: 'Booking Link',
          type: 'url',
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
      const {title, subtitle, order} = selection;
      return {
        title: `${order}. ${title}`,
        subtitle,
        media: selection.media,
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