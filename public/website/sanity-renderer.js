// Sanity configuration
const SANITY_PROJECT_ID = '1q2kqdh2';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';
const SANITY_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`;

// Helper function to build image URLs
function buildImageUrl(imageRef) {
    if (!imageRef) return '';
    const ref = imageRef._ref || imageRef;
    const [, id, dimensions, format] = ref.split('-');
    return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}.${format}`;
}

// Fetch page data from Sanity
async function fetchPageData(slug) {
    const query = `*[_type == "pageComplete" && slug.current == "${slug}"][0]{
        _id,
        title,
        slug,
        pageType,
        sections,
        seoTitle,
        seoDescription,
        seoImage
    }`;
    
    try {
        const encodedQuery = encodeURIComponent(query);
        const url = `${SANITY_URL}?query=${encodedQuery}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error fetching page:', error);
        return null;
    }
}

// Render homepage sections
function renderHomepage(page) {
    if (!page || !page.sections) return;
    
    page.sections.forEach(section => {
        switch (section._type) {
            case 'heroSection':
                // Update hero title
                const heroTitle = document.querySelector('.hero__title');
                if (heroTitle && section.title) {
                    heroTitle.innerHTML = section.title.map(line => 
                        line.replace(/\s+/g, '<br>')
                    ).join('<br>');
                }
                
                // Update hero subtitle
                const heroSubtitle = document.querySelector('.hero__subtitle');
                if (heroSubtitle && section.subtitle) {
                    heroSubtitle.textContent = section.subtitle;
                }
                
                // Update CTA
                const ctaButton = document.querySelector('.hero__cta .cta-button');
                if (ctaButton) {
                    if (section.ctaText) ctaButton.querySelector('.cta-button__text').textContent = section.ctaText;
                    if (section.ctaLink) ctaButton.href = section.ctaLink;
                }
                break;
                
            case 'contentSection':
                // Map content sections to page elements
                if (section.eyebrow === 'WELCOME') {
                    const welcomeEyebrow = document.querySelector('#story-eyebrow');
                    const welcomeTitle = document.querySelector('.story-intro__content .display-title');
                    
                    if (welcomeEyebrow) welcomeEyebrow.textContent = section.eyebrow;
                    if (welcomeTitle && section.title) welcomeTitle.textContent = section.title;
                    
                    // If there's content, update it
                    if (section.content && section.content[0]) {
                        const contentText = section.content[0].children?.[0]?.text;
                        if (contentText) {
                            // Find or create a content paragraph
                            let contentP = welcomeTitle?.nextElementSibling;
                            if (!contentP || !contentP.classList.contains('body-text')) {
                                contentP = document.createElement('p');
                                contentP.className = 'body-text body-text--16 body-text--diatype';
                                welcomeTitle?.parentElement?.appendChild(contentP);
                            }
                            contentP.textContent = contentText;
                        }
                    }
                }
                break;
                
            case 'marqueeSection':
                // Update marquee texts if provided
                if (section.texts && section.texts.length > 0) {
                    const marqueeTexts = document.querySelectorAll('.marquee__text');
                    const marqueeContent = section.texts.join(' <span class="marquee-symbol">꩜</span> ') + ' <span class="marquee-symbol">꩜</span> ';
                    marqueeTexts.forEach(text => {
                        text.innerHTML = marqueeContent;
                    });
                }
                break;
        }
    });
    
    // Update meta tags
    if (page.seoTitle) {
        document.title = page.seoTitle;
    }
    if (page.seoDescription) {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.content = page.seoDescription;
    }
}

// Render Work With Me page sections
function renderWorkWithMe(page) {
    if (!page || !page.sections) return;
    
    page.sections.forEach(section => {
        switch (section._type) {
            case 'heroSection':
                // Update hero for Work With Me page
                const heroTitle = document.querySelector('.hero__title, .service-packages__title');
                if (heroTitle && section.title) {
                    if (Array.isArray(section.title)) {
                        heroTitle.textContent = section.title.join(' ');
                    } else {
                        heroTitle.textContent = section.title;
                    }
                }
                
                const heroSubtitle = document.querySelector('.hero__subtitle, .service-packages__subtitle');
                if (heroSubtitle && section.subtitle) {
                    heroSubtitle.textContent = section.subtitle;
                }
                break;
                
            case 'servicesSection':
                // This section will pull from the Services collection
                // The services are already being fetched separately
                if (section.eyebrow) {
                    const eyebrow = document.querySelector('.services__eyebrow');
                    if (eyebrow) eyebrow.textContent = section.eyebrow;
                }
                if (section.title) {
                    const title = document.querySelector('.services__title');
                    if (title) title.textContent = section.title;
                }
                break;
        }
    });
    
    // Update meta tags
    if (page.seoTitle) {
        document.title = page.seoTitle;
    }
    if (page.seoDescription) {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.content = page.seoDescription;
    }
}

// Initialize based on current page
async function initializeSanityContent() {
    const path = window.location.pathname;
    
    if (path === '/' || path === '/index.html' || path === '') {
        // Homepage
        const pageData = await fetchPageData('homepage');
        if (pageData) {
            renderHomepage(pageData);
        }
    } else if (path === '/work-with-me' || path === '/work-with-me.html') {
        // Work With Me page
        const pageData = await fetchPageData('work-with-me');
        if (pageData) {
            renderWorkWithMe(pageData);
        }
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSanityContent);
} else {
    initializeSanityContent();
}

// Export for use in other scripts
window.sanityRenderer = {
    fetchPageData,
    renderHomepage,
    renderWorkWithMe,
    buildImageUrl
};