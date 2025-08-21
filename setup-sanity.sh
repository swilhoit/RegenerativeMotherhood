#!/bin/bash

# Create Sanity directory
mkdir -p sanity
cd sanity

# Initialize Sanity project
npm init -y
npm install @sanity/cli @sanity/client sanity

# Create sanity.config.ts
cat > sanity.config.ts << 'EOF'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Regenmother CMS',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
EOF

# Create schemas directory and initial schemas
mkdir -p schemas

# Page schema
cat > schemas/page.ts << 'EOF'
export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
    },
  ],
}
EOF

# Text Block schema
cat > schemas/textBlock.ts << 'EOF'
export default {
  name: 'textBlock',
  title: 'Text Block',
  type: 'document',
  fields: [
    {
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'Unique identifier for this text block',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ],
}
EOF

# Image Gallery schema
cat > schemas/imageGallery.ts << 'EOF'
export default {
  name: 'imageGallery',
  title: 'Image Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
EOF

# Site Settings schema
cat > schemas/siteSettings.ts << 'EOF'
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    },
    {
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
        },
        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url',
        },
      ],
    },
  ],
}
EOF

# Index file for schemas
cat > schemas/index.ts << 'EOF'
import page from './page'
import textBlock from './textBlock'
import imageGallery from './imageGallery'
import siteSettings from './siteSettings'

export const schemaTypes = [page, textBlock, imageGallery, siteSettings]
EOF

# Create package.json with scripts
cat > package.json << 'EOF'
{
  "name": "regenmother-cms",
  "private": true,
  "version": "1.0.0",
  "main": "package.json",
  "license": "UNLICENSED",
  "scripts": {
    "dev": "sanity dev",
    "start": "sanity start",
    "build": "sanity build",
    "deploy": "sanity deploy",
    "deploy-graphql": "sanity graphql deploy"
  },
  "keywords": [
    "sanity"
  ],
  "dependencies": {
    "@sanity/vision": "^3.70.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "sanity": "^3.70.0",
    "styled-components": "^6.1.8"
  },
  "devDependencies": {
    "@sanity/eslint-config-studio": "^4.0.0",
    "@types/react": "^18.2.0",
    "eslint": "^8.57.0",
    "typescript": "^5.5.0"
  }
}
EOF

# Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "noUncheckedIndexedAccess": true
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
EOF

# Create .env.local template
cat > .env.local.example << 'EOF'
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
EOF

# Create README for the team
cat > README.md << 'EOF'
# Regenmother CMS - Sanity Studio

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
EOF

echo "Sanity setup complete!"
echo "Next steps:"
echo "1. Install dependencies: npm install"
echo "2. Create a project at sanity.io and get your project ID"
echo "3. Update .env.local with your project ID"
echo "4. Run: npm run dev"