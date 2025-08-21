// Schema for homepage sections
export default {
  name: 'homeSections',
  title: 'Homepage Sections',
  type: 'document',
  fields: [
    // Hero Section
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'array',
      description: 'Main hero title - use line breaks for layout',
      of: [{type: 'string'}],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      description: 'Subtitle text below hero title',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroCta',
      title: 'Hero CTA Button Text',
      type: 'string',
      default: 'WORK WITH ME',
    },
    {
      name: 'marqueeText',
      title: 'Marquee Text',
      type: 'array',
      description: 'Text segments for the scrolling marquee',
      of: [{type: 'string'}],
    },
    
    // Welcome Section
    {
      name: 'welcomeEyebrow',
      title: 'Welcome Eyebrow Text',
      type: 'string',
      default: 'WELCOME',
    },
    {
      name: 'welcomeTitle',
      title: 'Welcome Title',
      type: 'text',
      description: 'Main welcome message',
    },
    
    // Why Section
    {
      name: 'whyEyebrow',
      title: 'Why Eyebrow Text',
      type: 'string',
      default: 'Why?',
    },
    {
      name: 'whyContent',
      title: 'Why Content',
      type: 'text',
    },
    
    // Solution Section
    {
      name: 'solutionEyebrow',
      title: 'Solution Eyebrow Text',
      type: 'string',
      default: 'Solution',
    },
    {
      name: 'solutionContent',
      title: 'Solution Content',
      type: 'text',
    },
    
    // Work With Me Section
    {
      name: 'workWithMeEyebrow',
      title: 'Work With Me Eyebrow',
      type: 'string',
      default: 'WORK WITH ME',
    },
    {
      name: 'workWithMeTitle',
      title: 'Work With Me Title',
      type: 'string',
      default: '1:1 Sleep Guidance',
    },
    {
      name: 'workWithMeCtaTitle',
      title: 'Work With Me CTA Title',
      type: 'string',
      default: 'Not sure where to start?',
    },
    {
      name: 'workWithMeCtaText',
      title: 'Work With Me CTA Text',
      type: 'text',
    },
    
    // About Section
    {
      name: 'aboutEyebrow',
      title: 'About Eyebrow',
      type: 'string',
      default: 'ABOUT ME',
    },
    {
      name: 'aboutTitle',
      title: 'About Title',
      type: 'string',
      default: 'Claire Fagin',
    },
    {
      name: 'aboutSubtitle',
      title: 'About Subtitle',
      type: 'string',
      default: 'Pediatric Sleep & Development Mentor & Doula',
    },
    {
      name: 'aboutContent',
      title: 'About Content',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
    prepare() {
      return {
        title: 'Homepage Sections',
      };
    },
  },
}