import { createClient } from '@sanity/client';
import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure client with write permissions
const client = createClient({
  projectId: '1q2kqdh2',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN // You'll need to set this
});

// Image files to upload
const images = [
  { name: 'hero.jpg', path: '../RegenerativeMotherhood/website/hero.jpg', field: 'heroBackgroundImage' },
  { name: 'gradient.jpg', path: '../RegenerativeMotherhood/website/gradient.jpg', field: 'heroGradientImage' },
  { name: 'welcome-1.jpg', path: '../RegenerativeMotherhood/website/welcome-1.jpg', field: 'storyImage' },
  { name: 'Frame 162781.jpg', path: '../RegenerativeMotherhood/website/Frame 162781.jpg', field: 'whyImage' },
  { name: 'Frame 162781-1.jpg', path: '../RegenerativeMotherhood/website/Frame 162781-1.jpg', field: 'solutionImage' },
  { name: 'Frame 162770.jpg', path: '../RegenerativeMotherhood/website/Frame 162770.jpg', field: 'workBackgroundImage' },
  { name: 'Frame1627851.jpg', path: '../RegenerativeMotherhood/website/Frame1627851.jpg', field: 'aboutImage1' },
  { name: 'Frame 162783.jpg', path: '../RegenerativeMotherhood/website/Frame 162783.jpg', field: 'aboutImage2' },
  { name: 'Frame 162784.jpg', path: '../RegenerativeMotherhood/website/Frame 162784.jpg', field: 'aboutImage3' },
  { name: 'harmony.svg', path: '../RegenerativeMotherhood/website/icons/harmony.svg', field: 'harmonyIcon' },
  { name: 'individuality.svg', path: '../RegenerativeMotherhood/website/icons/individuality.svg', field: 'individualityIcon' },
  { name: 'nourishment.svg', path: '../RegenerativeMotherhood/website/icons/nourishment.svg', field: 'nourishmentIcon' },
  { name: 'connection.svg', path: '../RegenerativeMotherhood/website/icons/connection.svg', field: 'connectionIcon' },
  { name: 'life.svg', path: '../RegenerativeMotherhood/website/icons/life.svg', field: 'lifeIcon' },
  { name: 'Layer_1.svg', path: '../RegenerativeMotherhood/website/Layer_1.svg', field: 'footerLogo' },
];

// Complete homepage content
const homepageContent = {
  _id: 'homepage_main',
  _type: 'homepage',
  
  // Hero Section
  heroTitle: [
    'The Path To',
    'Generative',
    'Infant Sleep'
  ],
  heroSubtitle: 'BECAUSE SUPPORTING YOUR BABY\'S SLEEP CAN AND SHOULD FEEL MUTUALLY NOURISHING',
  heroCta: 'WORK WITH ME',
  marqueeText: [
    'NOURISH YOUR BABY',
    'NOURISH YOURSELF',
    'REST IS RECIPROCAL'
  ],
  
  // Story Section
  storyEyebrow: 'WELCOME',
  storyTitle: 'Hi! I\'m Claire Fagin — a mother, doula, birth educator, and pediatric sleep and development mentor.',
  
  // Why Section
  whyEyebrow: 'Why?',
  whyContent: 'We live in a time where there\'s a profound disconnect between the evolutionary needs of babies and the ways we, as parents, are told to meet those needs. This modern approach often leaves us fragmented and disconnected — both within ourselves and as a collective.',
  
  // Solution Section
  solutionEyebrow: 'Solution',
  solutionContent: 'An approach that fosters co-regulation, thriving, and wholeness. The time has come for a shift in how we understand infant sleep, and for a return to supporting our babies in ways that are attuned, holistic, and deeply responsive.',
  
  // Principles Section
  principlesEyebrow: 'PRINCIPLES',
  principlesTitle: 'The 5 Principles Of Regenerative Motherhood',
  principlesList: [
    {
      _key: 'principle1',
      number: '01',
      title: 'HARMONY',
      description: 'Working in harmony with nature rather than against it'
    },
    {
      _key: 'principle2',
      number: '02',
      title: 'INDIVIDUALITY',
      description: 'Honoring nuance and individuality'
    },
    {
      _key: 'principle3',
      number: '03',
      title: 'NOURISHMENT',
      description: 'Elevating mutual nourishment for both mom and baby'
    },
    {
      _key: 'principle4',
      number: '04',
      title: 'CONNECTION',
      description: 'Putting connection at the forefront of all decisions'
    },
    {
      _key: 'principle5',
      number: '05',
      title: 'LIFE',
      description: 'Recognizing the interconnectedness of all life'
    }
  ],
  
  // Work Section
  workEyebrow: 'WORK WITH ME',
  workTitle: '1:1 Sleep Guidance',
  workCtaTitle: 'Not sure where to start?',
  workCtaText: 'Sleep can feel big, I know. If you are looking for evidence-based information that respects biological rhythms, fosters secure attachment, and honors your child\'s nuanced needs, look no further.',
  workCtaButton: 'LEARN MORE',
  
  // About Section
  aboutEyebrow: 'ABOUT ME',
  aboutTitle: 'Claire Fagin',
  aboutSubtitle: 'Pediatric Sleep & Development Mentor & Doula',
  aboutContent: [
    {
      _type: 'block',
      _key: 'about1',
      style: 'normal',
      children: [{
        _type: 'span',
        _key: 'span1',
        text: 'My name is Claire Fagin- I\'m a mother to a beautiful one year old, partner to his father, a birth and postpartum doula, a childbirth educator & an infant sleep and development mentor. I am a certified Deep Delta Doula (The Matrona), a certified childbirth educator (ACBE), and a certified Pediatric Sleep and Development Practitioner (PSAD). Motherhood has expanded me in ways I could never have imagined- it has stretched me, shattered me, and asked me to pick back up the pieces and rebuild. My son, Bixby, has been my clearest mirror and greatest teacher, asking me time and time again to call into question who I am, what I believe, and how I relate to this big, wild world and the realms beyond.'
      }]
    },
    {
      _type: 'block',
      _key: 'about2',
      style: 'normal',
      children: [{
        _type: 'span',
        _key: 'span2',
        text: 'Before becoming a mother, I left behind a career in florals to become a birth and postpartum doula. I thought I understood birth because I had witnessed it many times and I thought I understood babies because I had been around them my entire life. When I fell pregnant, however, I heard a soft but palpable whisper that there was more- so much more- than the programming that I had been exposed to, and this started me on my journey of uncovering my own authenticity as a woman, as a mother, and as an educator. I birthed my baby at home and quickly found out that my understanding of infants and their needs was rooted in deception. My baby didn\'t need gadgets, swaddles, bottles, or training. He needed me. My skin, my smell, my voice, my heartbeat, my attuned presence. The rest was just noise- a fear based narrative that was created to lead us mothers and our babies to a place of scarcity, lack, sickness and fragmentation. It is my calling to stand as an advocate for the mutual nourishment, inspiration, fulfillment, and abundance that motherhood can bring. The time has come to leave the drained, exhausted, victimized mother archetype in the past- we don\'t need it any longer. Regenerative motherhood is the way forward.'
      }]
    }
  ],
  
  // Footer
  footerTagline: 'Mutual Nourishment Through Gentle Sleep Support',
  footerContact: {
    email: 'clairefagin@gmail.com',
    instagram: '@regenerativemotherhood'
  },
  
  // SEO
  seoTitle: 'Regenerative Motherhood - The Path to Generative Infant Sleep',
  seoDescription: 'Because supporting your baby\'s sleep can and should feel mutually nourishing.'
};

// Export data as NDJSON
import fs from 'fs';

async function createImportFile() {
  console.log('📝 Creating homepage import file...\n');
  
  // Write NDJSON file
  const ndjson = JSON.stringify(homepageContent);
  fs.writeFileSync(path.join(__dirname, 'homepage-complete.ndjson'), ndjson);
  
  console.log('✅ Created homepage-complete.ndjson');
  console.log('\n📋 Image Upload Instructions:');
  console.log('1. Go to https://regenmother.sanity.studio');
  console.log('2. Navigate to Homepage document');
  console.log('3. Upload images for each section:');
  
  images.forEach(img => {
    console.log(`   - ${img.field}: ${img.name}`);
  });
  
  console.log('\n🚀 To import the homepage content:');
  console.log('npx sanity dataset import homepage-complete.ndjson production');
  
  console.log('\n💡 Note: Images need to be uploaded manually through the Studio');
  console.log('   or using the Sanity Assets API with an auth token.');
}

createImportFile().catch(console.error);