# Sanity CMS Setup Guide for Regenmother

## ✅ Your Sanity Studio is Ready!

The studio is currently running at: **http://localhost:3333**

## Complete the Setup

### 1. Create Your Sanity Project (Required)

**Option A: Web Interface (Easiest)**
1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Click "Create new project"
3. Name it "Regenmother CMS"
4. Select "Free" plan
5. Copy the project ID shown

**Option B: Use the Helper Script**
Once you have your project ID from the web:
```bash
node create-sanity-project.js YOUR-PROJECT-ID
```

### 2. Access Your Studio

Your local studio is already running at: **http://localhost:3333**

Once you add your project ID, you can start creating content immediately!

Your Sanity Studio will be available at: http://localhost:3333

## What's Been Set Up

### Content Schemas Created:

1. **Pages** (`/schemas/page.ts`)
   - Title, slug, hero image
   - Rich text content with embedded images
   - SEO metadata

2. **Text Blocks** (`/schemas/textBlock.ts`)
   - Reusable text content
   - Identified by unique keys
   - Full rich text editing capabilities

3. **Image Galleries** (`/schemas/imageGallery.ts`)
   - Multiple images with alt text and captions
   - Hotspot editing for responsive cropping

4. **Site Settings** (`/schemas/siteSettings.ts`)
   - Global site configuration
   - Logo, favicon
   - Social media links

## Team Access Setup

### Adding Team Members:

1. Go to [manage.sanity.io](https://manage.sanity.io)
2. Select your project
3. Click on "Members" in the sidebar
4. Click "Invite members"
5. Enter email addresses
6. Set role (Editor, Developer, or Administrator)

### Role Permissions:
- **Viewer**: Read-only access
- **Editor**: Create and edit content
- **Developer**: Editor + deploy studio
- **Administrator**: Full project control

## Deploying the Studio

To make the studio accessible to your team online:

```bash
cd sanity
npm run deploy
```

You'll get a URL like: `https://your-project.sanity.studio`

## Connecting to Your Website

### Install Sanity Client:
```bash
npm install @sanity/client @sanity/image-url
```

### Use the provided client configuration:
The file `sanity-client-config.js` contains ready-to-use functions for:
- Fetching pages
- Getting text blocks
- Loading galleries
- Retrieving site settings

### Environment Variables for Your Website:
Add to your website's `.env`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-token (optional, for draft content)
```

## CORS Configuration

To allow your website to fetch content:

1. Go to [manage.sanity.io](https://manage.sanity.io)
2. Select your project
3. Go to Settings → API
4. Add your website URL to CORS origins
5. Check "Allow credentials" if using authentication

## Next Steps

1. Create your Sanity project following step 1
2. Update the project ID in `.env.local`
3. Run the studio locally
4. Create some test content
5. Deploy the studio for team access
6. Integrate with your website using the client configuration

## Support

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Community](https://slack.sanity.io/)
- [Video Tutorials](https://www.youtube.com/c/SanityCMS)