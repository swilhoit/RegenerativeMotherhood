# Page Template Structure

## Overview
This template provides the consistent structure for all pages on the Regenerative Motherhood website.

## Required Files
- `shared-styles.css` - Contains all navigation and footer styles
- `shared-scripts.js` - Contains navigation functionality
- `components/navigation.html` - Reusable navigation component
- `components/footer.html` - Reusable footer component

## Basic Page Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - Regenerative Motherhood</title>
    
    <!-- Shared styles for navigation and footer -->
    <link rel="stylesheet" href="shared-styles.css">
    
    <!-- Page-specific styles -->
    <link rel="stylesheet" href="page-styles.css">
    
    <!-- Font imports -->
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet">
    <style>
        @font-face {
            font-family: 'Concrette TRIAL';
            src: url('fonts/ConcretteMTRIAL-Light.woff2') format('woff2');
            font-weight: 200;
            font-display: swap;
        }
        @font-face {
            font-family: 'ABC Diatype';
            src: url('fonts/ABCDiatype-Regular.ttf') format('truetype');
            font-weight: 400;
            font-display: swap;
        }
    </style>
</head>
<body>
    <!-- Include global navigation -->
    <!-- Copy content from components/navigation.html -->
    
    <!-- Page-specific content goes here -->
    <main>
        <!-- Your page content -->
    </main>
    
    <!-- Include global footer -->
    <!-- Copy content from components/footer.html -->
    
    <!-- Shared scripts -->
    <script src="shared-scripts.js"></script>
    
    <!-- Page-specific scripts -->
    <script src="page-scripts.js"></script>
</body>
</html>
```

## Navigation
- Uses `.global-nav` class
- Responsive hamburger menu at 1100px breakpoint
- Logo links to home page
- Consistent styling across all pages

## Footer
- Uses `.site-footer` class
- Consistent logo, tagline, and links
- Full-width line with proper edge alignment
- Responsive design for mobile

## Assets Required
- `logo.svg` - Navigation logo
- `Layer_1.svg` - Footer logo
- Font files in `fonts/` directory

## Creating New Pages
1. Copy this template structure
2. Update page title and meta tags
3. Add page-specific content in `<main>`
4. Include any page-specific CSS/JS files
5. Update navigation links if needed

## Best Practices
- Keep navigation and footer consistent across all pages
- Use semantic HTML structure
- Maintain accessibility attributes
- Test responsive breakpoints
- Ensure all links work correctly
