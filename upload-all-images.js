#!/usr/bin/env node

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Sanity client
const client = createClient({
  projectId: '1q2kqdh2',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN // We'll need this for uploads
});

// All images to upload
const imageFiles = [
  // Hero and backgrounds
  { file: 'hero.jpg', title: 'Hero Background' },
  { file: 'gradient.jpg', title: 'Hero Gradient Overlay' },
  
  // Section images
  { file: 'welcome-1.jpg', title: 'Welcome Section Image' },
  { file: 'Frame 162781.jpg', title: 'Why Section Image' },
  { file: 'Frame 162781-1.jpg', title: 'Solution Section Image' },
  { file: 'Frame 162770.jpg', title: 'Work Section Background' },
  
  // About section images
  { file: 'Frame1627851.jpg', title: 'About Image 1' },
  { file: 'Frame 162783.jpg', title: 'About Image 2' },
  { file: 'Frame 162784.jpg', title: 'About Image 3' },
  
  // Service package images
  { file: 'sleep-guidance.jpg', title: 'Sleep Guidance Package' },
  { file: 'Frame 1627810.jpg', title: '3-Call Support Package' },
  { file: 'Frame 1162781.jpg', title: 'Comprehensive Support Package' },
  
  // SEO and meta
  { file: 'Link-Preview.png', title: 'SEO Share Image' },
  { file: 'Favicon.png', title: 'Favicon' },
];

// Icon SVGs
const iconFiles = [
  { file: 'icons/harmony.svg', title: 'Harmony Icon' },
  { file: 'icons/individuality.svg', title: 'Individuality Icon' },
  { file: 'icons/nourishment.svg', title: 'Nourishment Icon' },
  { file: 'icons/connection.svg', title: 'Connection Icon' },
  { file: 'icons/life.svg', title: 'Life Icon' },
  { file: 'Layer_1.svg', title: 'Footer Logo' },
  { file: 'logo.svg', title: 'Main Logo' },
  { file: 'Group 32212.svg', title: 'Mobile Logo' },
];

async function uploadImageToSanity(filePath, title) {
  try {
    const fullPath = path.join(__dirname, 'RegenerativeMotherhood/website', filePath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  File not found: ${filePath}`);
      return null;
    }
    
    const imageBuffer = fs.readFileSync(fullPath);
    
    // Upload to Sanity
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(filePath),
      title: title
    });
    
    console.log(`✅ Uploaded: ${title} (${filePath})`);
    return asset._id;
  } catch (error) {
    console.error(`❌ Error uploading ${filePath}:`, error.message);
    return null;
  }
}

async function uploadAllImages() {
  console.log('🚀 Starting image upload to Sanity...\n');
  
  if (!process.env.SANITY_WRITE_TOKEN) {
    console.log('⚠️  SANITY_WRITE_TOKEN not set!');
    console.log('\n📝 Manual Upload Instructions:');
    console.log('====================================\n');
    console.log('Since we need authentication to upload images programmatically,');
    console.log('please upload these images manually through Sanity Studio:\n');
    console.log('1. Go to: https://regenmother.sanity.studio');
    console.log('2. Open the Homepage document');
    console.log('3. Upload these images to their respective fields:\n');
    
    console.log('HERO SECTION:');
    imageFiles.slice(0, 2).forEach(img => {
      console.log(`  • ${img.title} → ${img.file}`);
    });
    
    console.log('\nCONTENT SECTIONS:');
    imageFiles.slice(2, 6).forEach(img => {
      console.log(`  • ${img.title} → ${img.file}`);
    });
    
    console.log('\nABOUT SECTION:');
    imageFiles.slice(6, 9).forEach(img => {
      console.log(`  • ${img.title} → ${img.file}`);
    });
    
    console.log('\nSERVICE PACKAGES:');
    console.log('(Upload these in the Work With Me page)');
    imageFiles.slice(9, 12).forEach(img => {
      console.log(`  • ${img.title} → ${img.file}`);
    });
    
    console.log('\nPRINCIPLES ICONS:');
    console.log('(Upload these in the Homepage Principles section)');
    iconFiles.slice(0, 5).forEach(icon => {
      console.log(`  • ${icon.title} → ${icon.file}`);
    });
    
    console.log('\nLOGOS:');
    iconFiles.slice(5).forEach(icon => {
      console.log(`  • ${icon.title} → ${icon.file}`);
    });
    
    console.log('\n====================================');
    console.log('All images are in: /RegenerativeMotherhood/website/');
    console.log('====================================\n');
    
    // Create a mapping file for reference
    const imageMapping = {
      images: imageFiles,
      icons: iconFiles,
      instructions: 'Upload these images through Sanity Studio Media Library or directly in each page document'
    };
    
    fs.writeFileSync(
      path.join(__dirname, 'sanity/image-upload-list.json'),
      JSON.stringify(imageMapping, null, 2)
    );
    
    console.log('📄 Created image-upload-list.json for reference');
    
    return;
  }
  
  // If we have a token, upload programmatically
  const uploadedImages = {};
  
  console.log('📸 Uploading main images...');
  for (const img of imageFiles) {
    const assetId = await uploadImageToSanity(img.file, img.title);
    if (assetId) {
      uploadedImages[img.file] = assetId;
    }
  }
  
  console.log('\n🎨 Uploading icons...');
  for (const icon of iconFiles) {
    const assetId = await uploadImageToSanity(icon.file, icon.title);
    if (assetId) {
      uploadedImages[icon.file] = assetId;
    }
  }
  
  console.log('\n✨ Upload complete!');
  console.log(`Uploaded ${Object.keys(uploadedImages).length} files`);
  
  // Save the asset IDs for updating documents
  fs.writeFileSync(
    path.join(__dirname, 'sanity/uploaded-assets.json'),
    JSON.stringify(uploadedImages, null, 2)
  );
  
  console.log('📄 Saved asset IDs to uploaded-assets.json');
}

// Run the upload
uploadAllImages().catch(console.error);