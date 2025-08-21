import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Homepage - all sections in one document
const homepage = {
  _id: 'page_homepage',
  _type: 'pageComplete',
  title: 'Homepage',
  slug: { current: 'homepage' },
  pageType: 'homepage',
  
  sections: [
    // Hero Section
    {
      _type: 'heroSection',
      _key: 'hero1',
      title: ['The Path To', 'Generative', 'Infant Sleep'],
      subtitle: 'BECAUSE SUPPORTING YOUR BABY\'S SLEEP CAN AND SHOULD FEEL MUTUALLY NOURISHING',
      ctaText: 'WORK WITH ME',
      ctaLink: '/work-with-me',
    },
    
    // Marquee
    {
      _type: 'marqueeSection',
      _key: 'marquee1',
      texts: ['NOURISH YOUR BABY', 'NOURISH YOURSELF', 'REST IS RECIPROCAL'],
    },
    
    // Welcome/Story Section
    {
      _type: 'contentSection',
      _key: 'welcome1',
      layout: 'image-left',
      backgroundColor: 'beige',
      eyebrow: 'WELCOME',
      title: 'Hi! I\'m Claire Fagin — a mother, doula, birth educator, and pediatric sleep and development mentor.',
    },
    
    // Why Section
    {
      _type: 'contentSection',
      _key: 'why1',
      layout: 'text-left',
      backgroundColor: 'beige',
      eyebrow: 'Why?',
      content: [{
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [{
          _type: 'span',
          _key: 'span1',
          text: 'We live in a time where there\'s a profound disconnect between the evolutionary needs of babies and the ways we, as parents, are told to meet those needs. This modern approach often leaves us fragmented and disconnected — both within ourselves and as a collective.'
        }]
      }],
    },
    
    // Solution Section
    {
      _type: 'contentSection',
      _key: 'solution1',
      layout: 'image-left',
      backgroundColor: 'beige',
      eyebrow: 'Solution',
      content: [{
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [{
          _type: 'span',
          _key: 'span1',
          text: 'An approach that fosters co-regulation, thriving, and wholeness. The time has come for a shift in how we understand infant sleep, and for a return to supporting our babies in ways that are attuned, holistic, and deeply responsive.'
        }]
      }],
    },
    
    // Principles Section
    {
      _type: 'principlesSection',
      _key: 'principles1',
      eyebrow: 'PRINCIPLES',
      title: 'The 5 Principles Of Regenerative Motherhood',
      principles: [
        {
          _key: 'p1',
          number: '01',
          title: 'HARMONY',
          description: 'Working in harmony with nature rather than against it',
        },
        {
          _key: 'p2',
          number: '02',
          title: 'INDIVIDUALITY',
          description: 'Honoring nuance and individuality',
        },
        {
          _key: 'p3',
          number: '03',
          title: 'NOURISHMENT',
          description: 'Elevating mutual nourishment for both mom and baby',
        },
        {
          _key: 'p4',
          number: '04',
          title: 'CONNECTION',
          description: 'Putting connection at the forefront of all decisions',
        },
        {
          _key: 'p5',
          number: '05',
          title: 'LIFE',
          description: 'Recognizing the interconnectedness of all life',
        },
      ],
    },
    
    // Work With Me CTA Section
    {
      _type: 'ctaSection',
      _key: 'work1',
      eyebrow: 'WORK WITH ME',
      title: '1:1 Sleep Guidance',
      subtitle: 'Not sure where to start?',
      content: 'Sleep can feel big, I know. If you are looking for evidence-based information that respects biological rhythms, fosters secure attachment, and honors your child\'s nuanced needs, look no further.',
      ctaText: 'LEARN MORE',
      ctaLink: '/work-with-me',
    },
    
    // About Section
    {
      _type: 'aboutSection',
      _key: 'about1',
      eyebrow: 'ABOUT ME',
      title: 'Claire Fagin',
      subtitle: 'Pediatric Sleep & Development Mentor & Doula',
      content: [
        {
          _type: 'block',
          _key: 'bio1',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span1',
            text: 'My name is Claire Fagin- I\'m a mother to a beautiful one year old, partner to his father, a birth and postpartum doula, a childbirth educator & an infant sleep and development mentor. I am a certified Deep Delta Doula (The Matrona), a certified childbirth educator (ACBE), and a certified Pediatric Sleep and Development Practitioner (PSAD). Motherhood has expanded me in ways I could never have imagined- it has stretched me, shattered me, and asked me to pick back up the pieces and rebuild. My son, Bixby, has been my clearest mirror and greatest teacher, asking me time and time again to call into question who I am, what I believe, and how I relate to this big, wild world and the realms beyond.'
          }]
        },
        {
          _type: 'block',
          _key: 'bio2',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span2',
            text: 'Before becoming a mother, I left behind a career in florals to become a birth and postpartum doula. I thought I understood birth because I had witnessed it many times and I thought I understood babies because I had been around them my entire life. When I fell pregnant, however, I heard a soft but palpable whisper that there was more- so much more- than the programming that I had been exposed to, and this started me on my journey of uncovering my own authenticity as a woman, as a mother, and as an educator. I birthed my baby at home and quickly found out that my understanding of infants and their needs was rooted in deception. My baby didn\'t need gadgets, swaddles, bottles, or training. He needed me. My skin, my smell, my voice, my heartbeat, my attuned presence. The rest was just noise- a fear based narrative that was created to lead us mothers and our babies to a place of scarcity, lack, sickness and fragmentation. It is my calling to stand as an advocate for the mutual nourishment, inspiration, fulfillment, and abundance that motherhood can bring. The time has come to leave the drained, exhausted, victimized mother archetype in the past- we don\'t need it any longer. Regenerative motherhood is the way forward.'
          }]
        }
      ],
    },
    
    // Footer
    {
      _type: 'footerSection',
      _key: 'footer1',
      tagline: 'Mutual Nourishment Through Gentle Sleep Support',
      email: 'clairefagin@gmail.com',
      instagram: '@regenerativemotherhood',
    },
  ],
  
  seoTitle: 'Regenerative Motherhood - The Path to Generative Infant Sleep',
  seoDescription: 'Because supporting your baby\'s sleep can and should feel mutually nourishing.',
};

// Work With Me page
const workWithMePage = {
  _id: 'page_work_with_me',
  _type: 'pageComplete',
  title: 'Work With Me',
  slug: { current: 'work-with-me' },
  pageType: 'service-overview',
  
  sections: [
    // Hero
    {
      _type: 'heroSection',
      _key: 'hero2',
      title: ['1:1 Sleep Guidance'],
      subtitle: 'Personalized support for your family\'s unique sleep journey',
    },
    
    // Services Section
    {
      _type: 'servicesSection',
      _key: 'services1',
      eyebrow: 'PACKAGES',
      title: 'Choose Your Support Level',
      services: [
        {
          _key: 'service1',
          title: '1:1 Sleep Infant & Toddler Sleep Guidance Call',
          subtitle: 'Need a little support as you support your child\'s sleep?',
          price: '50 Minutes | $145',
          description: 'Whether you are looking for tailored education to help you better understand your baby\'s sleep, or just need to double check that what you and your child are experiencing is normal, this support option is for you.',
          ctaText: 'LEARN MORE',
          ctaLink: '/sleep-guidance-call',
        },
        {
          _key: 'service2',
          title: '1:1 Sleep Infant and Toddler 3 Call Sleep Support Package',
          subtitle: 'Looking for ongoing support on your child\'s sleep journey?',
          price: '3 x 50 Minute Sessions | $345',
          description: 'I\'m here to offer ONGOING guidance that honors, elevates, and supports you and your child as you both find mutually nourishing rest.',
          ctaText: 'LEARN MORE',
          ctaLink: '/3-call-sleep-support',
        },
        {
          _key: 'service3',
          title: '1:1 Sleep Infant & Toddler Comprehensive Sleep Support',
          subtitle: 'Need compassionate guidance, every step of the way?',
          price: '3 x 50 Minute Sessions & Ongoing Support via Text | $545',
          description: 'I\'m here to offer COMPREHENSIVE guidance and quick, responsive support that honors, elevates, and supports you and your child as you both find mutually nourishing rest.',
          ctaText: 'LEARN MORE',
          ctaLink: '/comprehensive-sleep-support',
        },
      ],
    },
  ],
  
  seoTitle: 'Work With Me - Regenerative Motherhood',
  seoDescription: '1:1 Sleep Guidance Packages for mutually nourishing rest. Support for your baby\'s sleep journey.',
};

// Service detail pages
const sleepGuidanceCall = {
  _id: 'page_sleep_guidance',
  _type: 'pageComplete',
  title: 'Sleep Guidance Call',
  slug: { current: 'sleep-guidance-call' },
  pageType: 'service-detail',
  
  sections: [
    {
      _type: 'heroSection',
      _key: 'hero3',
      title: ['Sleep Guidance Call'],
      subtitle: 'Single session support for immediate sleep concerns',
    },
    {
      _type: 'contentSection',
      _key: 'details1',
      layout: 'full-text',
      backgroundColor: 'beige',
      eyebrow: 'WHAT\'S INCLUDED',
      content: [{
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [{
          _type: 'span',
          _key: 'span1',
          text: '• 50-minute video consultation\n• Personalized sleep assessment\n• Tailored recommendations for your baby\'s age and temperament\n• Follow-up email with session summary and resources'
        }]
      }],
    },
  ],
  
  seoTitle: 'Sleep Guidance Call - Regenerative Motherhood',
  seoDescription: 'Get clarity and confidence with a single 50-minute consultation.',
};

// Site settings remain separate
const siteSettings = {
  _id: 'settings_main',
  _type: 'siteSettings',
  title: 'Regenerative Motherhood',
  description: 'The Path to Generative Infant Sleep',
  socialMedia: {
    instagram: 'https://instagram.com/regenerativemotherhood',
    email: 'clairefagin@gmail.com'
  }
};

// Combine all documents
const allDocuments = [
  homepage,
  workWithMePage,
  sleepGuidanceCall,
  siteSettings
];

// Write NDJSON
const ndjson = allDocuments.map(doc => JSON.stringify(doc)).join('\n');
fs.writeFileSync(path.join(__dirname, 'consolidated-pages.ndjson'), ndjson);

console.log('✅ Created consolidated-pages.ndjson');
console.log('\n📄 Pages organized:');
console.log('  • Homepage - All sections in one document');
console.log('  • Work With Me - Service overview page');
console.log('  • Sleep Guidance Call - Service detail page');
console.log('  • Site Settings - Global settings');
console.log('\n🚀 To import:');
console.log('npx sanity dataset import consolidated-pages.ndjson production --replace');
console.log('\n✨ All content is now properly grouped by page!');