import { createClient } from '@sanity/client';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sanity client configuration
const client = createClient({
  projectId: '1q2kqdh2',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN // We'll need to create this
});

// Extract text content from HTML
function extractTextFromHTML(html, selector) {
  const dom = new JSDOM(html);
  const element = dom.window.document.querySelector(selector);
  return element ? element.textContent.trim() : '';
}

// Convert HTML to Portable Text blocks
function htmlToPortableText(html) {
  const dom = new JSDOM(html);
  const body = dom.window.document.body;
  const blocks = [];
  
  function processNode(node) {
    if (node.nodeType === 3) { // Text node
      return node.textContent;
    }
    
    if (node.nodeType === 1) { // Element node
      const tag = node.tagName.toLowerCase();
      const children = Array.from(node.childNodes).map(processNode).filter(Boolean);
      
      switch(tag) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
          if (children.length > 0) {
            blocks.push({
              _type: 'block',
              style: tag,
              children: [{
                _type: 'span',
                text: children.join('')
              }]
            });
          }
          break;
        case 'p':
        case 'div':
          if (children.length > 0 && children.join('').trim()) {
            blocks.push({
              _type: 'block',
              style: 'normal',
              children: [{
                _type: 'span',
                text: children.join('').trim()
              }]
            });
          }
          break;
        case 'strong':
        case 'b':
          return children.join('');
        case 'em':
        case 'i':
          return children.join('');
        default:
          children.forEach(child => {
            if (typeof child === 'string' && child.trim()) {
              blocks.push({
                _type: 'block',
                style: 'normal',
                children: [{
                  _type: 'span',
                  text: child.trim()
                }]
              });
            }
          });
      }
    }
  }
  
  Array.from(body.childNodes).forEach(processNode);
  return blocks.filter(block => block.children && block.children[0].text);
}

// Read and parse HTML files
async function parseHTMLFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf-8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  
  // Extract metadata
  const title = doc.querySelector('title')?.textContent || '';
  const metaDescription = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  
  // Extract main content
  const heroTitle = doc.querySelector('.hero__title')?.textContent?.trim() || 
                   doc.querySelector('h1')?.textContent?.trim() || '';
  const heroSubtitle = doc.querySelector('.hero__subtitle')?.textContent?.trim() || 
                      doc.querySelector('.subtitle')?.textContent?.trim() || '';
  
  // Extract body content
  const mainContent = doc.querySelector('main') || doc.querySelector('.content') || doc.body;
  const contentHTML = mainContent ? mainContent.innerHTML : '';
  
  return {
    title,
    metaDescription,
    heroTitle,
    heroSubtitle,
    contentHTML
  };
}

// Create pages in Sanity
async function createPages() {
  const pages = [
    {
      file: 'website/index.html',
      slug: 'home',
      title: 'Home'
    },
    {
      file: 'website/work-with-me.html',
      slug: 'work-with-me',
      title: 'Work With Me'
    },
    {
      file: 'website/sleep-guidance-call.html',
      slug: 'sleep-guidance-call',
      title: 'Sleep Guidance Call'
    },
    {
      file: 'website/3-call-sleep-support.html',
      slug: '3-call-sleep-support',
      title: '3-Call Sleep Support'
    },
    {
      file: 'website/comprehensive-sleep-support.html',
      slug: 'comprehensive-sleep-support',
      title: 'Comprehensive Sleep Support'
    }
  ];
  
  for (const pageInfo of pages) {
    const filePath = path.join(__dirname, 'RegenerativeMotherhood', pageInfo.file);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️ File not found: ${filePath}`);
      continue;
    }
    
    console.log(`📄 Processing ${pageInfo.file}...`);
    const content = await parseHTMLFile(filePath);
    
    const doc = {
      _type: 'page',
      title: pageInfo.title,
      slug: {
        current: pageInfo.slug
      },
      content: htmlToPortableText(content.contentHTML),
      seoTitle: content.title || pageInfo.title,
      seoDescription: content.metaDescription
    };
    
    try {
      const result = await client.create(doc);
      console.log(`✅ Created page: ${pageInfo.title} (${result._id})`);
    } catch (error) {
      console.error(`❌ Error creating page ${pageInfo.title}:`, error.message);
    }
  }
}

// Create text blocks
async function createTextBlocks() {
  // Extract common text blocks from homepage
  const homePath = path.join(__dirname, 'RegenerativeMotherhood', 'website', 'index.html');
  const homeContent = await parseHTMLFile(homePath);
  
  const textBlocks = [
    {
      key: 'hero-heading',
      title: 'Hero Heading',
      content: [{
        _type: 'block',
        style: 'h1',
        children: [{
          _type: 'span',
          text: homeContent.heroTitle || 'The Path to Generative Infant Sleep'
        }]
      }]
    },
    {
      key: 'hero-subtitle',
      title: 'Hero Subtitle',
      content: [{
        _type: 'block',
        style: 'normal',
        children: [{
          _type: 'span',
          text: homeContent.heroSubtitle || 'Because supporting your baby\'s sleep can and should feel mutually nourishing.'
        }]
      }]
    },
    {
      key: 'welcome-message',
      title: 'Welcome Message',
      content: [{
        _type: 'block',
        style: 'normal',
        children: [{
          _type: 'span',
          text: 'Welcome to Regenerative Motherhood, where we believe that supporting your baby\'s sleep should be a nurturing experience for both you and your child.'
        }]
      }]
    },
    {
      key: 'about-section',
      title: 'About Section',
      content: [{
        _type: 'block',
        style: 'normal',
        children: [{
          _type: 'span',
          text: 'Our approach to infant sleep is rooted in understanding, compassion, and evidence-based practices that honor both your needs and your baby\'s development.'
        }]
      }]
    }
  ];
  
  for (const block of textBlocks) {
    try {
      const result = await client.create({
        _type: 'textBlock',
        ...block
      });
      console.log(`✅ Created text block: ${block.title} (${result._id})`);
    } catch (error) {
      console.error(`❌ Error creating text block ${block.title}:`, error.message);
    }
  }
}

// Create site settings
async function createSiteSettings() {
  const settings = {
    _type: 'siteSettings',
    title: 'Regenerative Motherhood',
    description: 'The Path to Generative Infant Sleep - Because supporting your baby\'s sleep can and should feel mutually nourishing.',
    socialMedia: {
      instagram: 'https://instagram.com/regenerativemotherhood'
    }
  };
  
  try {
    const result = await client.create(settings);
    console.log(`✅ Created site settings (${result._id})`);
  } catch (error) {
    console.error(`❌ Error creating site settings:`, error.message);
  }
}

// Main import function
async function importContent() {
  console.log('🚀 Starting content import to Sanity...\n');
  
  console.log('📄 Creating pages...');
  await createPages();
  
  console.log('\n📝 Creating text blocks...');
  await createTextBlocks();
  
  console.log('\n⚙️ Creating site settings...');
  await createSiteSettings();
  
  console.log('\n✨ Content import complete!');
  console.log('Visit https://regenmother.sanity.studio to see your content');
}

// Run the import
importContent().catch(console.error);