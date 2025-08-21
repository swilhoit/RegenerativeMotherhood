# Regenmother CMS - Sanity Studio

**Production Studio**: https://regenmother.sanity.studio

## Setup Instructions

1. **Create a Sanity Account**
   - Go to [sanity.io](https://www.sanity.io/) and sign up
   - Create a new project in the Sanity dashboard
   - Copy your project ID

2. **Configure Environment**
   - Copy `.env.local.example` to `.env.local`
   - Replace `your-project-id` with your actual Sanity project ID

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Run the Studio**
   ```bash
   npm run dev
   ```
   The studio will be available at http://localhost:3333

## Available Content Types

### Pages
- Create and manage website pages
- Add hero images
- Rich text content with images
- SEO metadata

### Text Blocks
- Reusable text content
- Identified by unique keys
- Rich text formatting

### Image Galleries
- Collections of images
- Alt text and captions
- Hotspot editing

### Site Settings
- Global site configuration
- Logo and favicon
- Social media links

## Deployment

To deploy the studio:
```bash
npm run deploy
```

## Team Access

1. Go to [manage.sanity.io](https://manage.sanity.io)
2. Select your project
3. Navigate to "Members"
4. Invite team members by email

Team members will receive an invitation to access the studio.

## Connecting to Your Website

Use the Sanity client in your website:
```javascript
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})
```

Query content:
```javascript
const pages = await client.fetch('*[_type == "page"]')
```
