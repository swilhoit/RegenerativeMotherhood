# Regenerative Motherhood Website

A modern, responsive website built based on the Figma design for Regenerative Motherhood, focusing on supporting biological infant sleep and maternal wellness.

## 🎨 Design Analysis

This website was built based on the Figma design: `https://www.figma.com/design/CZNkaVIIdgoV3MI0ebQ8de/Regenerative-Motherhood?node-id=327-1193&m=dev`

### Key Design Elements Implemented:
- **Hero Section**: Full-screen hero with background image and centered content
- **Typography**: Uses Playfair Display for headings and Inter for body text
- **Color Scheme**: Cream (#fcf9f1), warm beige (#eceadd), and dark overlays
- **Navigation**: Clean navigation with smooth scrolling and hover effects
- **5 Principles**: Grid layout showcasing the core principles of regenerative motherhood
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop

## 🚀 Project Structure

```
website/
├── index.html          # Main HTML file
├── styles.css          # Complete CSS with responsive design
├── script.js           # Interactive JavaScript functionality
└── README.md           # This file
```

## 📋 Features Implemented

### ✅ Core Features
- [x] **Hero Section** - Full-screen hero with background image
- [x] **Responsive Navigation** - Mobile-friendly navigation with hamburger menu
- [x] **Smooth Scrolling** - Smooth scroll between sections
- [x] **Scroll Spy** - Active navigation highlighting
- [x] **5 Principles Section** - Grid layout with hover effects
- [x] **About Section** - Introduction to Claire Fagin
- [x] **Work with Me CTA** - Call-to-action buttons and sections
- [x] **Mobile Responsive** - Fully responsive design
- [x] **Accessibility** - ARIA labels, keyboard navigation, focus management
- [x] **Performance** - Optimized CSS, lazy loading, throttled scroll events

### ⚡ Advanced Features
- [x] **Intersection Observer** - For scroll animations and visibility detection
- [x] **CSS Custom Properties** - For consistent theming
- [x] **Modern JavaScript** - ES6+ classes and modules
- [x] **Accessibility Enhancements** - Reduced motion support, keyboard navigation
- [x] **Performance Optimizations** - Debounced scroll handlers, efficient animations
- [x] **SEO Ready** - Semantic HTML, meta tags, structured content

## 🛠 Setup Instructions

### 1. Clone or Download
```bash
# If using git
git clone [repository-url]
cd RM Website

# Or download and extract the files
```

### 2. Local Development
You can run this website locally using any of these methods:

#### Option A: Simple HTTP Server (Python)
```bash
cd website
python -m http.server 8000
# Open http://localhost:8000 in your browser
```

#### Option B: Live Server (VS Code Extension)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` and select "Open with Live Server"

#### Option C: Node.js HTTP Server
```bash
npx http-server website -p 8000
# Open http://localhost:8000 in your browser
```

### 3. Customization

#### Adding the Background Image
1. Export the hero background image from Figma
2. Save it as `hero-background.jpg` in the `website` folder
3. Update the CSS in `styles.css`:

```css
.hero__background {
  background-image: url('hero-background.jpg');
  background-size: cover;
  background-position: center;
}
```

#### Updating Content
- Edit `index.html` to update text content
- Modify `styles.css` to change colors, fonts, or layout
- Update `script.js` for additional interactive features

## 🎯 Content Mapping from Figma

Based on the Figma design analysis, here's what was implemented:

### Hero Section (327:1193)
- **Title**: "The Path to Generative Infant Sleep"
- **Subtitle**: "Because supporting your baby's sleep can and should feel mutually nourishing"
- **CTA Button**: "Work with Me"
- **Background**: Dark overlay with warm earth tones
- **Size**: 1512 x 950px (responsive)

### Navigation Elements
- Story
- Principles  
- About
- Work with Me

### 5 Principles of Regenerative Motherhood
1. **Harmony** - Working in harmony with nature rather than against it
2. **Individuality** - Honoring nuance and individuality
3. **Nourishment** - Elevating mutual nourishment for both mom and baby
4. **Connection** - Putting connection at the forefront of all decisions
5. **Life** - Recognizing the interconnectedness of all life

### About Section
Introduction featuring Claire Fagin as a mother, doula, birth educator, and pediatric sleep and development mentor.

## 🎨 Design System

### Colors
```css
--color-cream: #fcf9f1;        /* Primary background */
--color-warm-beige: #eceadd;   /* Section backgrounds */
--color-dark: #000000;         /* Text and overlays */
--color-accent: #d4af37;       /* Gold accent for highlights */
```

### Typography
- **Headings**: Playfair Display (serif)
- **Body Text**: Inter (sans-serif)
- **Font Sizes**: Fluid typography using clamp() for responsive scaling

### Spacing
- Consistent spacing scale from 0.25rem to 6rem
- Container max-width: 1200px
- Responsive padding and margins

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## ♿ Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects user preferences for reduced motion
- **High Contrast**: Support for high contrast mode
- **Semantic HTML**: Proper heading hierarchy and landmarks

## 🚀 Performance Features

- **Intersection Observer**: Efficient scroll-based animations
- **Throttled Events**: Optimized scroll and resize handlers
- **Lazy Loading**: Images load only when needed
- **CSS Optimization**: Efficient selectors and minimal repaints
- **JavaScript Modules**: Clean, maintainable code structure

## 📈 Next Steps / Recommendations

### Immediate Improvements
1. **Add Background Image**: Export and add the hero background from Figma
2. **Logo Integration**: Create and add the proper logo SVG
3. **Image Assets**: Add all images referenced in the design
4. **Content Expansion**: Add full content for all sections

### Enhanced Features
1. **Contact Form**: Add a functional contact/booking form
2. **Blog Section**: Add a blog/resources section
3. **Testimonials**: Add client testimonials
4. **Social Media**: Integrate social media links
5. **Analytics**: Add Google Analytics or similar tracking

### Technical Enhancements
1. **Service Worker**: Add offline capability
2. **SEO Optimization**: Add structured data markup
3. **Performance**: Implement advanced caching strategies
4. **Testing**: Add automated testing for functionality

## 🔧 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **CSS Features**: CSS Grid, Flexbox, Custom Properties, clamp()
- **JavaScript Features**: ES6+ Classes, Intersection Observer, Async/Await
- **Progressive Enhancement**: Graceful degradation for older browsers

## 📞 Support

For questions about the implementation or to request modifications, please refer to the original Figma design and this documentation.

---

**Built with ❤️ based on the Regenerative Motherhood Figma design**