const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '1q2kqdh2',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const pages = [
  {
    _type: 'pageComplete',
    title: 'Homepage',
    slug: {
      _type: 'slug',
      current: 'homepage'
    },
    pageType: 'homepage',
    sections: [
      {
        _type: 'heroSection',
        _key: 'hero1',
        title: ['THE PATH TO', 'REGENERATIVE', 'INFANT SLEEP'],
        subtitle: 'Because supporting your baby\'s sleep can and should feel mutually nourishing.',
        ctaText: 'WORK WITH ME',
        ctaLink: '/work-with-me'
      },
      {
        _type: 'contentSection',
        _key: 'welcome1',
        layout: 'image-left',
        backgroundColor: 'beige',
        eyebrow: 'WELCOME',
        title: 'Hi! I\'m Claire Fagin',
        content: [
          {
            _type: 'block',
            _key: 'block1',
            children: [
              {
                _type: 'span',
                text: 'A mother, doula, birth educator, and pediatric sleep and development mentor. Through Regenerative Motherhood, we\'ll move beyond quick fixes to create sustainable sleep rhythms that work for your unique family.',
                _key: 'span1'
              }
            ],
            markDefs: [],
            style: 'normal'
          }
        ]
      }
    ],
    seoTitle: 'Regenerative Motherhood - The Path to Generative Infant Sleep',
    seoDescription: 'Because supporting your baby\'s sleep can and should feel mutually nourishing. Evidence-based strategies rooted in attachment science and nervous system regulation.'
  },
  {
    _type: 'pageComplete',
    title: 'Work With Me',
    slug: {
      _type: 'slug',
      current: 'work-with-me'
    },
    pageType: 'work-with-me',
    sections: [
      {
        _type: 'heroSection',
        _key: 'hero2',
        title: ['Work With Me'],
        subtitle: 'Choose the level of support that feels right for your family'
      },
      {
        _type: 'servicesSection',
        _key: 'services1',
        eyebrow: 'SERVICES',
        title: '1:1 Sleep Guidance',
        services: [] // This will reference the services from the Services collection
      }
    ],
    seoTitle: 'Work With Me - Regenerative Motherhood',
    seoDescription: 'Personalized infant and toddler sleep support. Choose from single consultations, 3-call packages, or comprehensive support with ongoing guidance.'
  }
];

async function createPages() {
  console.log('Creating static pages...');
  
  try {
    for (const page of pages) {
      // Check if page already exists
      const existing = await client.fetch(
        `*[_type == "pageComplete" && slug.current == $slug][0]`,
        { slug: page.slug.current }
      );
      
      if (existing) {
        console.log(`Page "${page.title}" already exists, updating...`);
        const result = await client
          .patch(existing._id)
          .set(page)
          .commit();
        console.log(`Updated: ${page.title}`);
      } else {
        console.log(`Creating new page: ${page.title}`);
        const result = await client.create(page);
        console.log(`Created: ${page.title}`);
      }
    }
    
    console.log('✅ Static pages are ready!');
    console.log('You can now manage them in Sanity Studio: https://regenmother.sanity.studio');
    
  } catch (error) {
    console.error('Error creating pages:', error);
  }
}

// Run the script
createPages();