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
        sectionTitle: 'Main Hero',
        title: ['THE PATH TO', 'GENERATIVE', 'INFANT SLEEP'],
        subtitle: 'Because supporting your baby\'s sleep can and should feel mutually nourishing.',
        ctaText: 'WORK WITH ME',
        ctaLink: '/work-with-me'
      },
      {
        _type: 'marqueeSection',
        _key: 'marquee1',
        sectionTitle: 'Marquee Banner',
        texts: ['NOURISH YOUR BABY', 'NOURISH YOURSELF', 'REST IS RECIPROCAL']
      },
      {
        _type: 'contentSection',
        _key: 'welcome1',
        sectionTitle: 'Welcome Section',
        layout: 'image-left',
        backgroundColor: 'beige',
        eyebrow: 'WELCOME',
        title: 'Hi! I\'m Claire Fagin — a mother, doula, birth educator, and pediatric sleep and development mentor.',
        content: [
          {
            _type: 'block',
            _key: 'block1',
            children: [
              {
                _type: 'span',
                text: 'Through Regenerative Motherhood, we\'ll move beyond quick fixes to create sustainable sleep rhythms that work for your unique family.',
                _key: 'span1'
              }
            ],
            markDefs: [],
            style: 'normal'
          }
        ]
      },
      {
        _type: 'contentSection',
        _key: 'why1',
        sectionTitle: 'Why Section',
        layout: 'text-left',
        backgroundColor: 'beige',
        eyebrow: 'Why?',
        content: [
          {
            _type: 'block',
            _key: 'block2',
            children: [
              {
                _type: 'span',
                text: 'We live in a time where there\'s a profound disconnect between the evolutionary needs of babies and the ways we, as parents, are told to meet those needs. This modern approach often leaves us fragmented and disconnected — both within ourselves and as a collective.',
                _key: 'span2'
              }
            ],
            markDefs: [],
            style: 'normal'
          }
        ]
      },
      {
        _type: 'contentSection',
        _key: 'solution1',
        sectionTitle: 'Solution Section',
        layout: 'image-left',
        backgroundColor: 'beige',
        eyebrow: 'Solution',
        content: [
          {
            _type: 'block',
            _key: 'block3',
            children: [
              {
                _type: 'span',
                text: 'An approach that fosters co-regulation, thriving, and wholeness. The time has come for a shift in how we understand infant sleep, and for a return to supporting our babies in ways that are attuned, holistic, and deeply responsive.',
                _key: 'span3'
              }
            ],
            markDefs: [],
            style: 'normal'
          }
        ]
      },
      {
        _type: 'principlesSection',
        _key: 'principles1',
        sectionTitle: '5 Principles',
        eyebrow: 'PRINCIPLES',
        title: 'The 5 Principles Of Regenerative Motherhood',
        principles: [
          {
            _key: 'p1',
            number: '01',
            title: 'HARMONY',
            description: 'Working in harmony with nature rather than against it'
          },
          {
            _key: 'p2',
            number: '02',
            title: 'INDIVIDUALITY',
            description: 'Honoring nuance and individuality'
          },
          {
            _key: 'p3',
            number: '03',
            title: 'NOURISHMENT',
            description: 'Elevating mutual nourishment for both mom and baby'
          },
          {
            _key: 'p4',
            number: '04',
            title: 'CONNECTION',
            description: 'Putting connection at the forefront of all decisions'
          },
          {
            _key: 'p5',
            number: '05',
            title: 'LIFE',
            description: 'Recognizing the interconnectedness of all life'
          }
        ]
      },
      {
        _type: 'ctaSection',
        _key: 'cta1',
        sectionTitle: 'Work With Me CTA',
        backgroundColor: 'tan',
        eyebrow: 'WORK WITH ME',
        title: '1:1 Sleep Guidance',
        subtitle: 'Not sure where to start?',
        content: 'Sleep can feel big, I know. If you are looking for evidence-based information that respects biological rhythms, fosters secure attachment, and honors your child\'s nuanced needs, look no further.',
        ctaText: 'LEARN MORE',
        ctaLink: '/work-with-me'
      },
      {
        _type: 'aboutSection',
        _key: 'about1',
        sectionTitle: 'About Claire',
        eyebrow: 'ABOUT ME',
        title: 'Claire Fagin',
        subtitle: 'Pediatric Sleep & Development Mentor & Doula',
        content: [
          {
            _type: 'block',
            _key: 'block4',
            children: [
              {
                _type: 'span',
                text: 'My name is Claire Fagin- I\'m a mother to a beautiful one year old, partner to his father, a birth and postpartum doula, a childbirth educator & an infant sleep and development mentor. I am a certified Deep Delta Doula (The Matrona), a certified childbirth educator (ACBE), and a certified Pediatric Sleep and Development Practitioner (PSAD). Motherhood has expanded me in ways I could never have imagined- it has stretched me, shattered me, and asked me to pick back up the pieces and rebuild. My son, Bixby, has been my clearest mirror and greatest teacher, asking me time and time again to call into question who I am, what I believe, and how I relate to this big, wild world and the realms beyond.',
                _key: 'span4'
              }
            ],
            markDefs: [],
            style: 'normal'
          },
          {
            _type: 'block',
            _key: 'block5',
            children: [
              {
                _type: 'span',
                text: 'Before becoming a mother, I left behind a career in florals to become a birth and postpartum doula. I thought I understood birth because I had witnessed it many times and I thought I understood babies because I had been around them my entire life. When I fell pregnant, however, I heard a soft but palpable whisper that there was more- so much more- than the programming that I had been exposed to, and this started me on my journey of uncovering my own authenticity as a woman, as a mother, and as an educator. I birthed my baby at home and quickly found out that my understanding of infants and their needs was rooted in deception. My baby didn\'t need gadgets, swaddles, bottles, or training. He needed me. My skin, my smell, my voice, my heartbeat, my attuned presence. The rest was just noise- a fear based narrative that was created to lead us mothers and our babies to a place of scarcity, lack, sickness and fragmentation. It is my calling to stand as an advocate for the mutual nourishment, inspiration, fulfillment, and abundance that motherhood can bring. The time has come to leave the drained, exhausted, victimized mother archetype in the past- we don\'t need it any longer. Regenerative motherhood is the way forward.',
                _key: 'span5'
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
        sectionTitle: 'Services Hero',
        title: ['Work With Me'],
        subtitle: 'Choose the level of support that feels right for your family'
      },
      {
        _type: 'servicesSection',
        _key: 'services1',
        sectionTitle: 'Services List',
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