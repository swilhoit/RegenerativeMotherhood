# Sanity CMS Integration Guide

## ✅ Integration Status

Your website is now connected to Sanity CMS! The integration script is loaded on all pages.

## How It Works

### 1. Automatic Content Loading
The `sanity-bundle.js` script automatically loads content from Sanity when pages load.

### 2. Using Data Attributes

Add these attributes to HTML elements to load content from Sanity:

#### Load Page Content
```html
<div data-sanity-page="home">
  <div class="hero-image"></div>
  <div class="content"></div>
</div>
```

#### Load Text Blocks
```html
<div data-sanity-text="welcome-message">
  <!-- Content will be replaced -->
</div>
```

#### Load Image Gallery
```html
<div data-sanity-gallery="main-gallery">
  <!-- Gallery will be loaded here -->
</div>
```

## Managing Content

### 1. Access Your Studio
- Local: http://localhost:3333
- Production: https://regenmother.sanity.studio

### 2. Create Content

#### Create a Page:
1. Go to "Pages" in the studio
2. Click "+ Create"
3. Add:
   - Title
   - Slug (e.g., "home", "about")
   - Hero Image
   - Content (rich text)
   - SEO fields

#### Create Text Blocks:
1. Go to "Text Blocks"
2. Click "+ Create"
3. Add:
   - Key (e.g., "welcome-message")
   - Title
   - Content

#### Create Image Galleries:
1. Go to "Image Galleries"
2. Click "+ Create"
3. Add:
   - Title
   - Slug
   - Upload images with alt text

### 3. Reference in HTML

After creating content in Sanity, reference it in your HTML:

```html
<!-- Example: Load the "home" page -->
<div data-sanity-page="home">
  <div class="content"></div>
</div>

<!-- Example: Load the "hero-text" text block -->
<div data-sanity-text="hero-text"></div>
```

## Current Integration

### Files Updated:
- ✅ `website/index.html` - Sanity script added
- ✅ `website/sanity-bundle.js` - Integration bundle
- ✅ `website/sanity-example.html` - Example implementation

### What's Automated:
- Dynamic content loading
- Image optimization
- SEO meta tag updates
- Rich text rendering

## Next Steps

1. **Create Your First Content:**
   - Go to https://regenmother.sanity.studio
   - Create a page with slug "home"
   - Add hero image and content
   - Refresh your website to see changes

2. **Add Data Attributes:**
   - Edit your HTML files
   - Add `data-sanity-page="slug"` where you want page content
   - Add `data-sanity-text="key"` for text blocks

3. **Test the Integration:**
   - Open your website
   - Check browser console for "Sanity CMS integration loaded"
   - Content should appear where you added data attributes

## Troubleshooting

### Content Not Loading?
1. Check browser console for errors
2. Verify content exists in Sanity Studio
3. Ensure slugs/keys match exactly
4. Check CORS settings at manage.sanity.io

### Need Different Styling?
The integration preserves your existing CSS. Content is inserted into your existing HTML structure.

## Support
- Studio: https://regenmother.sanity.studio
- Project ID: 1q2kqdh2
- Dataset: production