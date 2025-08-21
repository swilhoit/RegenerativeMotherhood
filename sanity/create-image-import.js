import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to create deterministic asset ID
function createAssetId(filename) {
  const hash = crypto.createHash('sha256').update(filename).digest('hex').substring(0, 16);
  return `image-${hash}`;
}

// Map of images to their asset IDs
const imageMap = {
  'hero.jpg': createAssetId('hero.jpg'),
  'gradient.jpg': createAssetId('gradient.jpg'),
  'welcome-1.jpg': createAssetId('welcome-1.jpg'),
  'Frame 162781.jpg': createAssetId('Frame 162781.jpg'),
  'Frame 162781-1.jpg': createAssetId('Frame 162781-1.jpg'),
  'Frame 162770.jpg': createAssetId('Frame 162770.jpg'),
  'Frame1627851.jpg': createAssetId('Frame1627851.jpg'),
  'Frame 162783.jpg': createAssetId('Frame 162783.jpg'),
  'Frame 162784.jpg': createAssetId('Frame 162784.jpg'),
  'sleep-guidance.jpg': createAssetId('sleep-guidance.jpg'),
  'Frame 1627810.jpg': createAssetId('Frame 1627810.jpg'),
  'Frame 1162781.jpg': createAssetId('Frame 1162781.jpg'),
  'harmony.svg': createAssetId('harmony.svg'),
  'individuality.svg': createAssetId('individuality.svg'),
  'nourishment.svg': createAssetId('nourishment.svg'),
  'connection.svg': createAssetId('connection.svg'),
  'life.svg': createAssetId('life.svg'),
  'Layer_1.svg': createAssetId('Layer_1.svg'),
  'logo.svg': createAssetId('logo.svg'),
  'Group 32212.svg': createAssetId('Group 32212.svg'),
};

// Create image reference helper
function imageRef(filename) {
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: imageMap[filename]
    }
  };
}

// Create complete homepage with image references
const homepage = {
  _id: 'page_homepage',
  _type: 'pageComplete',
  title: 'Homepage',
  slug: { current: 'homepage' },
  pageType: 'homepage',
  
  sections: [
    // Hero Section with images
    {
      _type: 'heroSection',
      _key: 'hero1',
      backgroundImage: imageRef('hero.jpg'),
      overlayImage: imageRef('gradient.jpg'),
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
    
    // Welcome/Story Section with image
    {
      _type: 'contentSection',
      _key: 'welcome1',
      layout: 'image-left',
      backgroundColor: 'beige',
      image: imageRef('welcome-1.jpg'),
      eyebrow: 'WELCOME',
      title: 'Hi! I\'m Claire Fagin — a mother, doula, birth educator, and pediatric sleep and development mentor.',
    },
    
    // Why Section with image
    {
      _type: 'contentSection',
      _key: 'why1',
      layout: 'text-left',
      backgroundColor: 'beige',
      image: imageRef('Frame 162781.jpg'),
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
    
    // Solution Section with image
    {
      _type: 'contentSection',
      _key: 'solution1',
      layout: 'image-left',
      backgroundColor: 'beige',
      image: imageRef('Frame 162781-1.jpg'),
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
    
    // Principles Section with icons
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
          icon: imageRef('harmony.svg')
        },
        {
          _key: 'p2',
          number: '02',
          title: 'INDIVIDUALITY',
          description: 'Honoring nuance and individuality',
          icon: imageRef('individuality.svg')
        },
        {
          _key: 'p3',
          number: '03',
          title: 'NOURISHMENT',
          description: 'Elevating mutual nourishment for both mom and baby',
          icon: imageRef('nourishment.svg')
        },
        {
          _key: 'p4',
          number: '04',
          title: 'CONNECTION',
          description: 'Putting connection at the forefront of all decisions',
          icon: imageRef('connection.svg')
        },
        {
          _key: 'p5',
          number: '05',
          title: 'LIFE',
          description: 'Recognizing the interconnectedness of all life',
          icon: imageRef('life.svg')
        },
      ],
    },
    
    // Work With Me CTA Section with background
    {
      _type: 'ctaSection',
      _key: 'work1',
      backgroundImage: imageRef('Frame 162770.jpg'),
      eyebrow: 'WORK WITH ME',
      title: '1:1 Sleep Guidance',
      subtitle: 'Not sure where to start?',
      content: 'Sleep can feel big, I know. If you are looking for evidence-based information that respects biological rhythms, fosters secure attachment, and honors your child\'s nuanced needs, look no further.',
      ctaText: 'LEARN MORE',
      ctaLink: '/work-with-me',
    },
    
    // About Section with images
    {
      _type: 'aboutSection',
      _key: 'about1',
      images: [
        imageRef('Frame1627851.jpg'),
        imageRef('Frame 162783.jpg'),
        imageRef('Frame 162784.jpg')
      ],
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
            text: 'My name is Claire Fagin- I\'m a mother to a beautiful one year old, partner to his father, a birth and postpartum doula, a childbirth educator & an infant sleep and development mentor. I am a certified Deep Delta Doula (The Matrona), a certified childbirth educator (ACBE), and a certified Pediatric Sleep and Development Practitioner (PSAD).'
          }]
        },
        {
          _type: 'block',
          _key: 'bio2',
          style: 'normal',
          children: [{
            _type: 'span',
            _key: 'span2',
            text: 'Before becoming a mother, I left behind a career in florals to become a birth and postpartum doula. I birthed my baby at home and quickly found out that my understanding of infants and their needs was rooted in deception. My baby didn\'t need gadgets, swaddles, bottles, or training. He needed me. It is my calling to stand as an advocate for the mutual nourishment, inspiration, fulfillment, and abundance that motherhood can bring. Regenerative motherhood is the way forward.'
          }]
        }
      ],
    },
    
    // Footer with logo
    {
      _type: 'footerSection',
      _key: 'footer1',
      logo: imageRef('Layer_1.svg'),
      tagline: 'Mutual Nourishment Through Gentle Sleep Support',
      email: 'clairefagin@gmail.com',
      instagram: '@regenerativemotherhood',
    },
  ],
  
  seoTitle: 'Regenerative Motherhood - The Path to Generative Infant Sleep',
  seoDescription: 'Because supporting your baby\'s sleep can and should feel mutually nourishing.',
  seoImage: imageRef('hero.jpg'),
};

// Work With Me page with images
const workWithMe = {
  _id: 'page_work_with_me',
  _type: 'pageComplete',
  title: 'Work With Me',
  slug: { current: 'work-with-me' },
  pageType: 'service-overview',
  
  sections: [
    {
      _type: 'servicesSection',
      _key: 'services1',
      eyebrow: 'PACKAGES',
      title: 'Choose Your Support Level',
      services: [
        {
          _key: 'service1',
          image: imageRef('sleep-guidance.jpg'),
          title: '1:1 Sleep Infant & Toddler Sleep Guidance Call',
          subtitle: 'Need a little support as you support your child\'s sleep?',
          price: '50 Minutes | $145',
          description: 'Whether you are looking for tailored education to help you better understand your baby\'s sleep, or just need to double check that what you and your child are experiencing is normal, this support option is for you.',
          ctaText: 'LEARN MORE',
          ctaLink: '/sleep-guidance-call',
        },
        {
          _key: 'service2',
          image: imageRef('Frame 1627810.jpg'),
          title: '1:1 Sleep Infant and Toddler 3 Call Sleep Support Package',
          subtitle: 'Looking for ongoing support on your child\'s sleep journey?',
          price: '3 x 50 Minute Sessions | $345',
          description: 'I\'m here to offer ONGOING guidance that honors, elevates, and supports you and your child as you both find mutually nourishing rest.',
          ctaText: 'LEARN MORE',
          ctaLink: '/3-call-sleep-support',
        },
        {
          _key: 'service3',
          image: imageRef('Frame 1162781.jpg'),
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
  seoDescription: '1:1 Sleep Guidance Packages for mutually nourishing rest.',
};

// Site settings
const siteSettings = {
  _id: 'settings_main',
  _type: 'siteSettings',
  title: 'Regenerative Motherhood',
  description: 'The Path to Generative Infant Sleep',
  logo: imageRef('logo.svg'),
  favicon: imageRef('Layer_1.svg'),
  socialMedia: {
    instagram: 'https://instagram.com/regenerativemotherhood',
    email: 'clairefagin@gmail.com'
  }
};

// Export all documents as NDJSON
const documents = [homepage, workWithMe, siteSettings];
const ndjson = documents.map(doc => JSON.stringify(doc)).join('\n');

fs.writeFileSync(path.join(__dirname, 'final-with-images.ndjson'), ndjson);

console.log('✅ Created final-with-images.ndjson with image references');
console.log('\n📸 Image References Created:');
console.log('  • Hero section: background & gradient');
console.log('  • Content sections: all images mapped');
console.log('  • Principles: all 5 icons');
console.log('  • About: 3 images');
console.log('  • Services: 3 package images');
console.log('  • Footer & site: logos');

console.log('\n🚀 Next Steps:');
console.log('1. Upload actual image files to Sanity Studio Media Library');
console.log('2. Import this file: npx sanity dataset import final-with-images.ndjson production --replace');

// Also create a list of required image uploads
const uploadList = Object.keys(imageMap).map(filename => {
  const location = filename.includes('.svg') && filename.includes('harmony') ? 'icons/' + filename : filename;
  return `  • ${filename} → /RegenerativeMotherhood/website/${location}`;
}).join('\n');

fs.writeFileSync(path.join(__dirname, 'IMAGES_TO_UPLOAD.txt'), `
IMAGES TO UPLOAD TO SANITY STUDIO
==================================

Go to: https://regenmother.sanity.studio
Click "Media" in top menu
Upload these files:

${uploadList}

After uploading, run:
npx sanity dataset import final-with-images.ndjson production --replace
`);

console.log('\n📄 Created IMAGES_TO_UPLOAD.txt with full upload list');