const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '1q2kqdh2',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN, // You'll need a write token
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function createHomepage() {
  console.log('Creating homepage document...');
  
  const homepage = {
    _type: 'homepage',
    _id: 'homepage', // Using a fixed ID so there's only one homepage
    heroTitle: 'THE PATH TO\nREGENERATIVE\nINFANT SLEEP',
    heroSubtitle: 'Because supporting your baby\'s sleep can and should feel mutually nourishing.',
    welcomeTitle: 'Welcome',
    welcomeContent: `I'm Sam, and this is your space for exploring a different approach to infant sleep—one that honors your baby's needs while supporting your well-being.

Through Regenerative Motherhood, we'll move beyond quick fixes to create sustainable sleep rhythms that work for your unique family.

Whether you're seeking gentle guidance or comprehensive support, you'll find evidence-based strategies rooted in attachment science and nervous system regulation.`,
    aboutTitle: 'About Regenerative Motherhood',
    aboutContent: `Regenerative Motherhood is a philosophy and practice that views infant sleep challenges as opportunities for mutual growth and healing.

Instead of sleep training or leaving babies to cry, we work with your baby's natural rhythms and developmental needs to create sustainable sleep solutions.

This approach integrates attachment science, nervous system regulation, and holistic wellness to support both baby and parent through the intense early years.`,
    servicesTitle: 'Work With Me',
    servicesDescription: 'Choose the level of support that feels right for your family.'
  };
  
  try {
    // Check if homepage already exists
    const existing = await client.fetch('*[_type == "homepage"][0]');
    
    if (existing) {
      console.log('Homepage already exists, updating...');
      const result = await client
        .patch(existing._id)
        .set(homepage)
        .commit();
      console.log('Homepage updated:', result._id);
    } else {
      console.log('Creating new homepage...');
      const result = await client.create(homepage);
      console.log('Homepage created:', result._id);
    }
    
    console.log('✅ Homepage document is ready!');
    console.log('You can now edit it in Sanity Studio: https://regenmother.sanity.studio');
    
  } catch (error) {
    console.error('Error creating homepage:', error);
    console.log('\n⚠️ Make sure you have a write token in your .env.local file');
    console.log('You can create one at: https://www.sanity.io/manage/personal/project/1q2kqdh2/api#tokens');
  }
}

// Run the script
createHomepage();