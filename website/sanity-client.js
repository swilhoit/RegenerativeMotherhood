// Sanity Client Configuration
const SANITY_PROJECT_ID = '1q2kqdh2';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';

// Create the Sanity client URL
const SANITY_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`;

// Function to fetch data from Sanity
async function fetchFromSanity(query) {
    try {
        const encodedQuery = encodeURIComponent(query);
        const url = `${SANITY_URL}?query=${encodedQuery}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('Error fetching from Sanity:', error);
        return null;
    }
}

// Function to update homepage content
async function updateHomepageContent() {
    // Fetch homepage data
    const query = `*[_type == "homepage"][0]{
        heroTitle,
        heroSubtitle,
        welcomeTitle,
        welcomeContent,
        principles[]->{
            title,
            description
        },
        aboutTitle,
        aboutContent,
        servicesTitle,
        servicesDescription,
        servicePackages[]->{
            title,
            description,
            price
        }
    }`;
    
    const data = await fetchFromSanity(query);
    
    if (data) {
        // Update hero section
        const heroTitle = document.querySelector('.hero__title');
        if (heroTitle && data.heroTitle) {
            heroTitle.innerHTML = data.heroTitle.split('\n').map(line => 
                `<div class="hero__title-line">${line}</div>`
            ).join('');
        }
        
        const heroSubtitle = document.querySelector('.hero__subtitle');
        if (heroSubtitle && data.heroSubtitle) {
            heroSubtitle.textContent = data.heroSubtitle;
        }
        
        // Update welcome section
        const welcomeTitle = document.querySelector('#welcome .text-content__title');
        if (welcomeTitle && data.welcomeTitle) {
            welcomeTitle.textContent = data.welcomeTitle;
        }
        
        const welcomeContent = document.querySelector('#welcome .text-content__body');
        if (welcomeContent && data.welcomeContent) {
            welcomeContent.innerHTML = data.welcomeContent
                .split('\n')
                .filter(p => p.trim())
                .map(p => `<p>${p}</p>`)
                .join('');
        }
        
        // Update principles if they exist
        if (data.principles && data.principles.length > 0) {
            const principlesGrid = document.querySelector('.principles__grid');
            if (principlesGrid) {
                principlesGrid.innerHTML = data.principles.map(principle => `
                    <div class="principle">
                        <h3 class="principle__title">${principle.title}</h3>
                        <p class="principle__description">${principle.description}</p>
                    </div>
                `).join('');
            }
        }
        
        // Update about section
        const aboutTitle = document.querySelector('#about .about__title');
        if (aboutTitle && data.aboutTitle) {
            aboutTitle.textContent = data.aboutTitle;
        }
        
        const aboutContent = document.querySelector('#about .about__content');
        if (aboutContent && data.aboutContent) {
            aboutContent.innerHTML = data.aboutContent
                .split('\n')
                .filter(p => p.trim())
                .map(p => `<p>${p}</p>`)
                .join('');
        }
        
        // Update services if they exist
        if (data.servicePackages && data.servicePackages.length > 0) {
            const servicesContainer = document.querySelector('.services__packages');
            if (servicesContainer) {
                servicesContainer.innerHTML = data.servicePackages.map(service => `
                    <div class="service-package">
                        <h3 class="service-package__title">${service.title}</h3>
                        <p class="service-package__description">${service.description}</p>
                        ${service.price ? `<p class="service-package__price">${service.price}</p>` : ''}
                    </div>
                `).join('');
            }
        }
        
        console.log('Content updated from Sanity!');
    }
}

// Function to update page content (for other pages)
async function updatePageContent(pageName) {
    const query = `*[_type == "page" && slug.current == "${pageName}"][0]{
        title,
        content,
        sections[]{
            title,
            content
        }
    }`;
    
    const data = await fetchFromSanity(query);
    
    if (data) {
        // Update page title
        const pageTitle = document.querySelector('.page__title, h1');
        if (pageTitle && data.title) {
            pageTitle.textContent = data.title;
        }
        
        // Update page content
        const pageContent = document.querySelector('.page__content, main');
        if (pageContent && data.content) {
            // If there are sections, render them
            if (data.sections && data.sections.length > 0) {
                pageContent.innerHTML = data.sections.map(section => `
                    <section class="content-section">
                        ${section.title ? `<h2>${section.title}</h2>` : ''}
                        <div>${section.content}</div>
                    </section>
                `).join('');
            } else {
                // Otherwise just render the content
                pageContent.innerHTML = data.content
                    .split('\n')
                    .filter(p => p.trim())
                    .map(p => `<p>${p}</p>`)
                    .join('');
            }
        }
        
        console.log(`${pageName} content updated from Sanity!`);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Determine which page we're on
    const path = window.location.pathname;
    
    if (path === '/' || path === '/index.html' || path === '/website/index.html') {
        // Homepage
        updateHomepageContent();
    } else if (path.includes('sleep-guidance')) {
        // Sleep guidance page
        updatePageContent('sleep-guidance');
    } else if (path.includes('work-with-me')) {
        // Work with me page
        updatePageContent('work-with-me');
    } else if (path.includes('comprehensive-sleep-support')) {
        // Comprehensive sleep support page
        updatePageContent('comprehensive-sleep-support');
    } else if (path.includes('3-call-sleep-support')) {
        // 3-call sleep support page
        updatePageContent('3-call-sleep-support');
    }
});

// Export functions for manual use
window.sanityClient = {
    fetchFromSanity,
    updateHomepageContent,
    updatePageContent
};