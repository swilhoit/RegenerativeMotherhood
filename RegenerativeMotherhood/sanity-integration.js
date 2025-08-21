import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Initialize Sanity client
const client = createClient({
  projectId: '1q2kqdh2',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Fetch functions
export async function getPageContent(slug) {
  const query = `*[_type == "page" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    heroImage,
    content,
    seoTitle,
    seoDescription
  }`;
  
  return client.fetch(query, { slug });
}

export async function getTextBlock(key) {
  const query = `*[_type == "textBlock" && key == $key][0] {
    key,
    title,
    content
  }`;
  
  return client.fetch(query, { key });
}

export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0] {
    title,
    description,
    logo,
    favicon,
    socialMedia
  }`;
  
  return client.fetch(query);
}

export async function getImageGallery(slug) {
  const query = `*[_type == "imageGallery" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    images[] {
      image,
      alt,
      caption
    }
  }`;
  
  return client.fetch(query, { slug });
}

// Portable Text to HTML converter
export function portableTextToHtml(blocks) {
  if (!blocks) return '';
  
  return blocks.map(block => {
    if (block._type === 'block') {
      const style = block.style || 'normal';
      const children = block.children.map(child => {
        let text = child.text || '';
        
        // Apply marks (bold, italic, etc.)
        if (child.marks && child.marks.length > 0) {
          child.marks.forEach(mark => {
            switch(mark) {
              case 'strong':
                text = `<strong>${text}</strong>`;
                break;
              case 'em':
                text = `<em>${text}</em>`;
                break;
              case 'underline':
                text = `<span style="text-decoration: underline">${text}</span>`;
                break;
              case 'strike-through':
                text = `<span style="text-decoration: line-through">${text}</span>`;
                break;
            }
          });
        }
        
        // Handle links
        if (child.marks && child.marks.some(m => typeof m === 'object' && m._type === 'link')) {
          const linkMark = child.marks.find(m => typeof m === 'object' && m._type === 'link');
          text = `<a href="${linkMark.href}">${text}</a>`;
        }
        
        return text;
      }).join('');
      
      // Apply block styles
      switch(style) {
        case 'h1':
          return `<h1>${children}</h1>`;
        case 'h2':
          return `<h2>${children}</h2>`;
        case 'h3':
          return `<h3>${children}</h3>`;
        case 'h4':
          return `<h4>${children}</h4>`;
        case 'blockquote':
          return `<blockquote>${children}</blockquote>`;
        default:
          return `<p>${children}</p>`;
      }
    } else if (block._type === 'image') {
      const imageUrl = urlFor(block).url();
      return `<img src="${imageUrl}" alt="${block.alt || ''}" />`;
    }
    
    return '';
  }).join('\n');
}

// Dynamic content loader for HTML pages
export async function loadDynamicContent() {
  try {
    // Get site settings
    const settings = await getSiteSettings();
    
    // Update site title if element exists
    const titleElement = document.querySelector('title');
    if (titleElement && settings?.title) {
      titleElement.textContent = settings.title;
    }
    
    // Update logo if element exists
    const logoElement = document.querySelector('.logo img');
    if (logoElement && settings?.logo) {
      logoElement.src = urlFor(settings.logo).url();
    }
    
    // Load text blocks by data attributes
    const textBlockElements = document.querySelectorAll('[data-sanity-text]');
    for (const element of textBlockElements) {
      const key = element.getAttribute('data-sanity-text');
      const textBlock = await getTextBlock(key);
      if (textBlock) {
        element.innerHTML = portableTextToHtml(textBlock.content);
      }
    }
    
    // Load page content if specified
    const pageContentElement = document.querySelector('[data-sanity-page]');
    if (pageContentElement) {
      const slug = pageContentElement.getAttribute('data-sanity-page');
      const page = await getPageContent(slug);
      if (page) {
        // Update hero image if element exists
        const heroElement = pageContentElement.querySelector('.hero-image');
        if (heroElement && page.heroImage) {
          heroElement.style.backgroundImage = `url(${urlFor(page.heroImage).url()})`;
        }
        
        // Update content
        const contentElement = pageContentElement.querySelector('.content');
        if (contentElement && page.content) {
          contentElement.innerHTML = portableTextToHtml(page.content);
        }
        
        // Update SEO
        if (page.seoTitle) {
          document.title = page.seoTitle;
        }
        if (page.seoDescription) {
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.content = page.seoDescription;
          }
        }
      }
    }
    
    // Load gallery if specified
    const galleryElement = document.querySelector('[data-sanity-gallery]');
    if (galleryElement) {
      const slug = galleryElement.getAttribute('data-sanity-gallery');
      const gallery = await getImageGallery(slug);
      if (gallery && gallery.images) {
        const galleryHtml = gallery.images.map(item => `
          <div class="gallery-item">
            <img src="${urlFor(item.image).url()}" alt="${item.alt || ''}" />
            ${item.caption ? `<p class="caption">${item.caption}</p>` : ''}
          </div>
        `).join('');
        galleryElement.innerHTML = galleryHtml;
      }
    }
    
  } catch (error) {
    console.error('Error loading Sanity content:', error);
  }
}

// Auto-load on DOM ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadDynamicContent);
  } else {
    loadDynamicContent();
  }
}