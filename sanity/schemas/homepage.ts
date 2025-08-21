// Complete homepage schema with all sections and images
export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero Section'},
    {name: 'story', title: 'Story Section'},
    {name: 'why', title: 'Why Section'},
    {name: 'solution', title: 'Solution Section'},
    {name: 'principles', title: 'Principles Section'},
    {name: 'work', title: 'Work With Me Section'},
    {name: 'about', title: 'About Section'},
    {name: 'footer', title: 'Footer'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // HERO SECTION
    {
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      group: 'hero',
      options: {
        hotspot: true,
      },
      description: 'Background image for hero section (hero.jpg)',
    },
    {
      name: 'heroGradientImage',
      title: 'Hero Gradient Overlay',
      type: 'image',
      group: 'hero',
      options: {
        hotspot: true,
      },
      description: 'Gradient overlay image (gradient.jpg)',
    },
    {
      name: 'heroTitle',
      title: 'Hero Title Lines',
      type: 'array',
      group: 'hero',
      of: [{type: 'string'}],
      description: 'Each line of the hero title',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      group: 'hero',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroCta',
      title: 'Hero CTA Text',
      type: 'string',
      group: 'hero',
      default: 'WORK WITH ME',
    },
    {
      name: 'marqueeText',
      title: 'Marquee Text Segments',
      type: 'array',
      group: 'hero',
      of: [{type: 'string'}],
      description: 'Text segments for scrolling marquee',
    },
    
    // STORY/WELCOME SECTION
    {
      name: 'storyImage',
      title: 'Story Section Image',
      type: 'image',
      group: 'story',
      options: {
        hotspot: true,
      },
      description: 'Welcome section image (welcome-1.jpg)',
    },
    {
      name: 'storyEyebrow',
      title: 'Story Eyebrow Text',
      type: 'string',
      group: 'story',
      default: 'WELCOME',
    },
    {
      name: 'storyTitle',
      title: 'Story Title',
      type: 'text',
      group: 'story',
      description: 'Main welcome message',
    },
    
    // WHY SECTION
    {
      name: 'whyImage',
      title: 'Why Section Image',
      type: 'image',
      group: 'why',
      options: {
        hotspot: true,
      },
      description: 'Why section image (Frame 162781.jpg)',
    },
    {
      name: 'whyEyebrow',
      title: 'Why Eyebrow Text',
      type: 'string',
      group: 'why',
      default: 'Why?',
    },
    {
      name: 'whyContent',
      title: 'Why Content',
      type: 'text',
      group: 'why',
    },
    
    // SOLUTION SECTION
    {
      name: 'solutionImage',
      title: 'Solution Section Image',
      type: 'image',
      group: 'solution',
      options: {
        hotspot: true,
      },
      description: 'Solution section image (Frame 162781-1.jpg)',
    },
    {
      name: 'solutionEyebrow',
      title: 'Solution Eyebrow Text',
      type: 'string',
      group: 'solution',
      default: 'Solution',
    },
    {
      name: 'solutionContent',
      title: 'Solution Content',
      type: 'text',
      group: 'solution',
    },
    
    // PRINCIPLES SECTION
    {
      name: 'principlesEyebrow',
      title: 'Principles Eyebrow',
      type: 'string',
      group: 'principles',
      default: 'PRINCIPLES',
    },
    {
      name: 'principlesTitle',
      title: 'Principles Title',
      type: 'text',
      group: 'principles',
      default: 'The 5 Principles Of Regenerative Motherhood',
    },
    {
      name: 'principlesList',
      title: 'Principles List',
      type: 'array',
      group: 'principles',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'number',
            title: 'Number',
            type: 'string',
          },
          {
            name: 'title',
            title: 'Title',
            type: 'string',
          },
          {
            name: 'description',
            title: 'Description',
            type: 'string',
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
      }],
    },
    
    // WORK WITH ME SECTION
    {
      name: 'workBackgroundImage',
      title: 'Work Section Background Image',
      type: 'image',
      group: 'work',
      options: {
        hotspot: true,
      },
      description: 'Work with me background (Frame 162770.jpg)',
    },
    {
      name: 'workEyebrow',
      title: 'Work Eyebrow',
      type: 'string',
      group: 'work',
      default: 'WORK WITH ME',
    },
    {
      name: 'workTitle',
      title: 'Work Title',
      type: 'string',
      group: 'work',
      default: '1:1 Sleep Guidance',
    },
    {
      name: 'workCtaTitle',
      title: 'Work CTA Title',
      type: 'string',
      group: 'work',
      default: 'Not sure where to start?',
    },
    {
      name: 'workCtaText',
      title: 'Work CTA Text',
      type: 'text',
      group: 'work',
    },
    {
      name: 'workCtaButton',
      title: 'Work CTA Button Text',
      type: 'string',
      group: 'work',
      default: 'LEARN MORE',
    },
    
    // ABOUT SECTION
    {
      name: 'aboutImages',
      title: 'About Section Images',
      type: 'array',
      group: 'about',
      of: [{
        type: 'image',
        options: {
          hotspot: true,
        },
      }],
      description: 'About section images (3 images)',
    },
    {
      name: 'aboutEyebrow',
      title: 'About Eyebrow',
      type: 'string',
      group: 'about',
      default: 'ABOUT ME',
    },
    {
      name: 'aboutTitle',
      title: 'About Title',
      type: 'string',
      group: 'about',
      default: 'Claire Fagin',
    },
    {
      name: 'aboutSubtitle',
      title: 'About Subtitle',
      type: 'string',
      group: 'about',
      default: 'Pediatric Sleep & Development Mentor & Doula',
    },
    {
      name: 'aboutContent',
      title: 'About Content',
      type: 'array',
      group: 'about',
      of: [{type: 'block'}],
    },
    
    // FOOTER
    {
      name: 'footerLogo',
      title: 'Footer Logo',
      type: 'image',
      group: 'footer',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
      group: 'footer',
      default: 'Mutual Nourishment Through Gentle Sleep Support',
    },
    {
      name: 'footerContact',
      title: 'Footer Contact',
      type: 'object',
      group: 'footer',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'instagram',
          title: 'Instagram Handle',
          type: 'string',
        },
      ],
    },
    
    // SEO
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'seoImage',
      title: 'SEO Share Image',
      type: 'image',
      group: 'seo',
      options: {
        hotspot: true,
      },
      description: 'Image for social media sharing',
    },
  ],
  preview: {
    select: {
      title: 'seoTitle',
      media: 'heroBackgroundImage',
    },
  },
}