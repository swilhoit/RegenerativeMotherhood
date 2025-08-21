const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '1q2kqdh2',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN, // You'll need a write token
  apiVersion: '2024-01-01',
  useCdn: false,
});

const services = [
  {
    _type: 'service',
    title: 'Sleep Guidance Call',
    slug: {
      _type: 'slug',
      current: 'sleep-guidance-call'
    },
    order: 1,
    featured: true,
    subtitle: 'Need a little support as you support your child\'s sleep?',
    price: '50 Minutes | $145',
    shortDescription: 'I\'m here to offer education and guidance that honors, elevates, and supports you and your child as you both find mutually nourishing rest.',
    fullDescription: [
      {
        _type: 'block',
        _key: 'block1',
        children: [
          {
            _type: 'span',
            text: 'A focused consultation to address your specific sleep concerns and provide personalized guidance for your family.',
            _key: 'span1'
          }
        ],
        markDefs: [],
        style: 'normal'
      }
    ],
    whatYouGet: [
      {
        item: '50-minute video consultation',
        description: 'Personalized guidance for your unique situation'
      },
      {
        item: 'Evidence-based sleep education',
        description: 'Grounded in attachment science and developmental needs'
      },
      {
        item: 'Practical strategies',
        description: 'Gentle approaches that honor your baby\'s needs'
      }
    ],
    ctaButton: {
      text: 'BOOK NOW',
      link: 'https://calendly.com/clairefagin/infantsleepguidance?month=2025-08',
      openInNewTab: true
    },
    bookingInfo: 'After booking on my calendar, Venmo @claire-fagin to reserve your spot! I will send you a follow up email within 24 hours to confirm our session.',
    packageDetails: {
      sessions: '1 Session',
      duration: '50 Minutes',
      support: 'Email follow-up',
      followUp: true
    }
  },
  {
    _type: 'service',
    title: '3-Call Sleep Support',
    slug: {
      _type: 'slug',
      current: '3-call-sleep-support'
    },
    order: 2,
    featured: true,
    subtitle: 'Looking for ongoing support on your child\'s sleep journey?',
    price: '3 x 50 Minute Sessions | $345',
    shortDescription: 'I\'m here to offer ONGOING guidance that honors, elevates, and supports you and your child as you both find mutually nourishing rest.',
    fullDescription: [
      {
        _type: 'block',
        _key: 'block1',
        children: [
          {
            _type: 'span',
            text: 'Three sessions over three weeks to support you through sleep transitions and challenges with consistent guidance.',
            _key: 'span1'
          }
        ],
        markDefs: [],
        style: 'normal'
      }
    ],
    whatYouGet: [
      {
        item: 'Three 50-minute consultations',
        description: 'Scheduled over 3 weeks for continuous support'
      },
      {
        item: 'Progressive guidance',
        description: 'Build on strategies week by week'
      },
      {
        item: 'Adjustment support',
        description: 'Refine approaches based on your baby\'s responses'
      },
      {
        item: 'Email check-ins',
        description: 'Between sessions for questions'
      }
    ],
    ctaButton: {
      text: 'BOOK NOW',
      link: 'https://calendly.com/clairefagin/infantsleepguidance?month=2025-08',
      openInNewTab: true
    },
    packageDetails: {
      sessions: '3 x 50 Minute Sessions',
      duration: '3 Weeks',
      support: 'Email support between sessions',
      followUp: true
    }
  },
  {
    _type: 'service',
    title: 'Comprehensive Sleep Support',
    slug: {
      _type: 'slug',
      current: 'comprehensive-sleep-support'
    },
    order: 3,
    featured: true,
    subtitle: 'Need compassionate guidance, every step of the way?',
    price: '3 x 50 Minute Sessions & Ongoing Support via Text | $545',
    shortDescription: 'I\'m here to offer COMPREHENSIVE guidance and quick, responsive support that honors, elevates, and supports you and your child as you both find mutually nourishing rest.',
    fullDescription: [
      {
        _type: 'block',
        _key: 'block1',
        children: [
          {
            _type: 'span',
            text: 'Our most comprehensive package includes three consultations plus unlimited text support for real-time guidance when you need it most.',
            _key: 'span1'
          }
        ],
        markDefs: [],
        style: 'normal'
      }
    ],
    whatYouGet: [
      {
        item: 'Three 50-minute consultations',
        description: 'Deep-dive sessions for comprehensive support'
      },
      {
        item: 'Unlimited text support',
        description: 'Real-time guidance between sessions'
      },
      {
        item: 'Personalized sleep plan',
        description: 'Tailored to your family\'s unique needs'
      },
      {
        item: 'Progress tracking',
        description: 'Ongoing adjustments as your baby develops'
      },
      {
        item: 'Resource library access',
        description: 'Curated materials and guides'
      }
    ],
    ctaButton: {
      text: 'BOOK NOW',
      link: 'https://calendly.com/clairefagin/infantsleepguidance?month=2025-08',
      openInNewTab: true
    },
    packageDetails: {
      sessions: '3 x 50 Minute Sessions',
      duration: '6 Weeks',
      support: 'Unlimited text support',
      followUp: true
    }
  }
];

async function createServices() {
  console.log('Creating services...');
  
  try {
    // Check if services already exist
    const existing = await client.fetch('*[_type == "service"]');
    
    if (existing && existing.length > 0) {
      console.log(`Found ${existing.length} existing services. Updating...`);
      
      for (const service of services) {
        const existingService = existing.find(s => s.title === service.title);
        if (existingService) {
          const result = await client
            .patch(existingService._id)
            .set(service)
            .commit();
          console.log(`Updated: ${service.title}`);
        } else {
          const result = await client.create(service);
          console.log(`Created: ${service.title}`);
        }
      }
    } else {
      console.log('Creating new services...');
      for (const service of services) {
        const result = await client.create(service);
        console.log(`Created: ${service.title}`);
      }
    }
    
    console.log('✅ Services are ready!');
    console.log('You can now manage them in Sanity Studio: https://regenmother.sanity.studio');
    
  } catch (error) {
    console.error('Error creating services:', error);
    console.log('\n⚠️ Make sure you have a write token in your .env.local file');
    console.log('You can create one at: https://www.sanity.io/manage/personal/project/1q2kqdh2/api#tokens');
  }
}

// Run the script
createServices();