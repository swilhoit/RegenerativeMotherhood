# Sanity Content Setup Guide

## Your Current Pages (Not Yet in Sanity)

Your website has the following pages that need to be created in Sanity:

### Main Pages:
1. **index.html** - Homepage
2. **work-with-me.html** - Services page
3. **sleep-guidance-call.html** - Service detail page
4. **3-call-sleep-support.html** - Service detail page
5. **comprehensive-sleep-support.html** - Service detail page

## How to Add Your Content to Sanity

### Step 1: Access Sanity Studio
Go to: https://regenmother.sanity.studio

### Step 2: Create Pages for Each HTML File

#### For Homepage (index.html):
1. Click "Pages" → "+ Create"
2. Set:
   - **Title:** "Home"
   - **Slug:** "home"
   - **Hero Image:** Upload your hero image
   - **Content:** Copy and paste your homepage text
   - **SEO Title:** "Regenerative Motherhood - The Path to Generative Infant Sleep"
   - **SEO Description:** "Because supporting your baby's sleep can and should feel mutually nourishing."

#### For Work With Me Page:
1. Click "Pages" → "+ Create"
2. Set:
   - **Title:** "Work With Me"
   - **Slug:** "work-with-me"
   - **Content:** Add your services content
   - **SEO fields:** Add appropriate meta descriptions

#### For Service Pages:
Create a page for each service:
- Sleep Guidance Call → slug: "sleep-guidance-call"
- 3-Call Sleep Support → slug: "3-call-sleep-support"
- Comprehensive Sleep Support → slug: "comprehensive-sleep-support"

### Step 3: Create Text Blocks for Reusable Content

Common sections to create as Text Blocks:
1. **Key:** "hero-heading" - Your main headline
2. **Key:** "hero-subtitle" - Your subtitle text
3. **Key:** "about-section" - About content
4. **Key:** "principles" - Your 5 principles content
5. **Key:** "footer-text" - Footer content

### Step 4: Update Your HTML Files

Add data attributes to make sections editable:

#### Example for index.html:
```html
<!-- Make hero text editable -->
<div class="hero-content" data-sanity-text="hero-heading">
    <!-- Current content will be replaced by Sanity -->
</div>

<!-- Make entire page content editable -->
<main data-sanity-page="home">
    <!-- Page content from Sanity -->
</main>
```

#### Example for work-with-me.html:
```html
<main data-sanity-page="work-with-me">
    <!-- Content will load from Sanity -->
</main>
```

## Quick Start Process

### Option 1: Manual Creation (Recommended)
1. Go to https://regenmother.sanity.studio
2. Create 5 pages (one for each HTML file)
3. Copy content from your HTML files into Sanity
4. Add data attributes to your HTML

### Option 2: Keep Static + Add Dynamic Sections
You can keep most content static and only make specific sections editable:
```html
<!-- Only make hero text dynamic -->
<h1 data-sanity-text="hero-title">Current Title</h1>
<p data-sanity-text="hero-subtitle">Current Subtitle</p>
```

## Content Not Yet in Sanity

**Current Status:**
- ❌ Homepage content
- ❌ Service pages content
- ❌ Text blocks
- ❌ Image galleries
- ❌ Site settings

**What IS Ready:**
- ✅ Sanity Studio configured
- ✅ Content schemas defined
- ✅ Integration script installed
- ✅ Team access enabled

## Next Action Required

To get your content into Sanity, you need to:

1. **Go to:** https://regenmother.sanity.studio
2. **Create:** At least one page (start with "home")
3. **Add:** Content from your index.html
4. **Update:** index.html with `data-sanity-page="home"`
5. **Test:** Refresh your website to see Sanity content

## Why Manual Entry?

Your existing HTML contains:
- Complex styling and layout
- Mixed content and presentation
- Custom JavaScript interactions

Manual entry ensures:
- Clean content structure
- Proper rich text formatting
- Maintained design integrity
- Team-friendly editing

## Support

Need help? Check:
- Studio: https://regenmother.sanity.studio
- Local dev: http://localhost:3333
- Project ID: 1q2kqdh2