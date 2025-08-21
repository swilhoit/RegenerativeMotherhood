const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || '1q2kqdh2',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const footerData = {
  _type: 'footer',
  title: 'Site Footer',
  tagline: 'the paradigm of generative infant sleep',
  links: [
    {
      _key: 'link1',
      text: 'WORK WITH ME',
      url: '/work-with-me',
      openInNewTab: false
    },
    {
      _key: 'link2',
      text: 'INSTAGRAM',
      url: 'https://www.instagram.com/clairefagin/?hl=en',
      openInNewTab: true
    },
    {
      _key: 'link3',
      text: 'CONTACT',
      url: 'mailto:clairefagin@gmail.com',
      openInNewTab: false
    }
  ],
  email: 'clairefagin@gmail.com',
  instagram: 'https://www.instagram.com/clairefagin/?hl=en',
  copyright: 'Regenerative Motherhood'
};

async function createFooter() {
  console.log('Setting up footer...');
  
  try {
    // Check if footer already exists
    const existing = await client.fetch(
      `*[_type == "footer"][0]`
    );
    
    if (existing) {
      console.log('Footer already exists, updating...');
      const result = await client
        .patch(existing._id)
        .set(footerData)
        .commit();
      console.log('Updated footer');
    } else {
      console.log('Creating new footer...');
      const result = await client.create(footerData);
      console.log('Created footer');
    }
    
    console.log('✅ Footer is ready!');
    console.log('You can now manage it in Sanity Studio: https://regenmother.sanity.studio');
    
  } catch (error) {
    console.error('Error creating footer:', error);
  }
}

// Run the script
createFooter();