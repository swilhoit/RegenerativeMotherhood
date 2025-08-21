// Schema for the 5 Principles
export default {
  name: 'principle',
  title: 'Principle',
  type: 'document',
  fields: [
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1).max(5),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
      media: 'icon',
    },
    prepare(selection: any) {
      const {title, order} = selection;
      return {
        title: `${order}. ${title}`,
        media: selection.media,
      };
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ],
}