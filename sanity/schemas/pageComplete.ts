// Page schema for static pages (Homepage, Work With Me, About, etc.)
export default {
  name: 'pageComplete',
  title: 'Pages',
  type: 'document',
  groups: [
    {name: 'main', title: 'Main Content'},
    {name: 'media', title: 'Images & Media'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Page identification
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'main',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'main',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      group: 'main',
      options: {
        list: [
          {title: 'Homepage', value: 'homepage'},
          {title: 'Work With Me', value: 'work-with-me'},
          {title: 'About', value: 'about'},
          {title: 'Contact', value: 'contact'},
          {title: 'Standard Page', value: 'standard'},
        ],
      },
      validation: (Rule: any) => Rule.required(),
      description: 'Note: Services are managed separately and populate the service template dynamically',
    },
    
    // Page sections - flexible content blocks
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      group: 'main',
      of: [
        // Hero Section
        {
          type: 'object',
          name: 'heroSection',
          title: 'Hero Section',
          fields: [
            {name: 'backgroundImage', title: 'Background Image', type: 'image', options: {hotspot: true}},
            {name: 'overlayImage', title: 'Overlay Image', type: 'image', options: {hotspot: true}},
            {name: 'title', title: 'Title Lines', type: 'array', of: [{type: 'string'}]},
            {name: 'subtitle', title: 'Subtitle', type: 'text'},
            {name: 'ctaText', title: 'CTA Button Text', type: 'string'},
            {name: 'ctaLink', title: 'CTA Link', type: 'string'},
          ],
        },
        
        // Marquee Section
        {
          type: 'object',
          name: 'marqueeSection',
          title: 'Marquee Section',
          fields: [
            {name: 'texts', title: 'Marquee Texts', type: 'array', of: [{type: 'string'}]},
          ],
        },
        
        // Content Section (Story, Why, Solution, etc.)
        {
          type: 'object',
          name: 'contentSection',
          title: 'Content Section',
          fields: [
            {name: 'layout', title: 'Layout', type: 'string', options: {
              list: [
                {title: 'Image Left, Text Right', value: 'image-left'},
                {title: 'Text Left, Image Right', value: 'text-left'},
                {title: 'Full Width Text', value: 'full-text'},
                {title: 'Full Width Image', value: 'full-image'},
              ],
            }},
            {name: 'backgroundColor', title: 'Background Color', type: 'string', options: {
              list: [
                {title: 'Beige', value: 'beige'},
                {title: 'Olive', value: 'olive'},
                {title: 'Tan', value: 'tan'},
                {title: 'White', value: 'white'},
              ],
            }},
            {name: 'image', title: 'Section Image', type: 'image', options: {hotspot: true}},
            {name: 'eyebrow', title: 'Eyebrow Text', type: 'string'},
            {name: 'title', title: 'Section Title', type: 'text'},
            {name: 'content', title: 'Content', type: 'array', of: [{type: 'block'}]},
          ],
        },
        
        // Principles Section
        {
          type: 'object',
          name: 'principlesSection',
          title: 'Principles Section',
          fields: [
            {name: 'eyebrow', title: 'Eyebrow', type: 'string'},
            {name: 'title', title: 'Title', type: 'text'},
            {name: 'principles', title: 'Principles', type: 'array', of: [{
              type: 'object',
              fields: [
                {name: 'number', title: 'Number', type: 'string'},
                {name: 'title', title: 'Title', type: 'string'},
                {name: 'description', title: 'Description', type: 'text'},
                {name: 'icon', title: 'Icon', type: 'image', options: {hotspot: true}},
              ],
            }]},
          ],
        },
        
        // Service Packages Section
        {
          type: 'object',
          name: 'servicesSection',
          title: 'Services Section',
          fields: [
            {name: 'eyebrow', title: 'Eyebrow', type: 'string'},
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'services', title: 'Service Packages', type: 'array', of: [{
              type: 'object',
              fields: [
                {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
                {name: 'title', title: 'Title', type: 'string'},
                {name: 'subtitle', title: 'Subtitle', type: 'string'},
                {name: 'price', title: 'Price', type: 'string'},
                {name: 'description', title: 'Description', type: 'text'},
                {name: 'ctaText', title: 'CTA Text', type: 'string'},
                {name: 'ctaLink', title: 'CTA Link', type: 'string'},
              ],
            }]},
          ],
        },
        
        // About Section
        {
          type: 'object',
          name: 'aboutSection',
          title: 'About Section',
          fields: [
            {name: 'images', title: 'Images', type: 'array', of: [{type: 'image', options: {hotspot: true}}]},
            {name: 'eyebrow', title: 'Eyebrow', type: 'string'},
            {name: 'title', title: 'Name', type: 'string'},
            {name: 'subtitle', title: 'Title/Role', type: 'string'},
            {name: 'content', title: 'Bio Content', type: 'array', of: [{type: 'block'}]},
          ],
        },
        
        // CTA Section
        {
          type: 'object',
          name: 'ctaSection',
          title: 'CTA Section',
          fields: [
            {name: 'backgroundImage', title: 'Background Image', type: 'image', options: {hotspot: true}},
            {name: 'eyebrow', title: 'Eyebrow', type: 'string'},
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'subtitle', title: 'Subtitle', type: 'string'},
            {name: 'content', title: 'Content', type: 'text'},
            {name: 'ctaText', title: 'Button Text', type: 'string'},
            {name: 'ctaLink', title: 'Button Link', type: 'string'},
          ],
        },
        
        // Footer Section
        {
          type: 'object',
          name: 'footerSection',
          title: 'Footer Section',
          fields: [
            {name: 'logo', title: 'Logo', type: 'image', options: {hotspot: true}},
            {name: 'tagline', title: 'Tagline', type: 'string'},
            {name: 'email', title: 'Email', type: 'string'},
            {name: 'instagram', title: 'Instagram', type: 'string'},
          ],
        },
      ],
    },
    
    // SEO
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
    },
    {
      name: 'seoImage',
      title: 'SEO Share Image',
      type: 'image',
      group: 'seo',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'pageType',
      media: 'seoImage',
    },
    prepare(selection: any) {
      const {title, subtitle} = selection;
      return {
        title,
        subtitle: subtitle ? subtitle.charAt(0).toUpperCase() + subtitle.slice(1) : '',
        media: selection.media,
      };
    },
  },
}