// Complete Sanity Client for Homepage with All Editable Fields
const SANITY_PROJECT_ID = '1q2kqdh2';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';
const SANITY_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`;

// Helper function to fetch from Sanity
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

// Function to update navigation menu
async function updateNavigation(data) {
    if (!data.navigationItems || !data.navigationItems.length) return;
    
    // Update desktop navigation
    const desktopNav = document.querySelector('.hero__nav .nav__container');
    if (desktopNav) {
        desktopNav.innerHTML = data.navigationItems
            .filter(item => item.isActive)
            .map(item => `
                <button class="nav__item" onclick="document.querySelector('${item.link}').scrollIntoView({behavior: 'smooth'}); return false;">
                    <span class="nav__text">${item.label}</span>
                </button>
            `).join('');
    }
    
    // Update mobile navigation
    const mobileNav = document.querySelector('.mobile-menu__nav');
    if (mobileNav) {
        mobileNav.innerHTML = data.navigationItems
            .filter(item => item.isActive)
            .map(item => `
                <a href="${item.link}" class="mobile-menu__link">${item.label}</a>
            `).join('');
    }
}

// Function to update all homepage content
async function updateHomepageContent() {
    // Comprehensive query for all homepage data
    const query = `*[_type == "homepage"][0]{
        // Navigation
        navigationItems[]{
            label,
            link,
            isActive
        },
        
        // Hero Section
        heroTitle,
        heroSubtitle,
        heroCta,
        marqueeText,
        
        // Story/Welcome Section
        storyEyebrow,
        storyTitle,
        
        // Why Section
        whyEyebrow,
        whyContent,
        
        // Solution Section
        solutionEyebrow,
        solutionContent,
        
        // Principles Section
        principlesEyebrow,
        principlesTitle,
        principlesList[]{
            number,
            title,
            description
        },
        
        // Work With Me Section
        workEyebrow,
        workTitle,
        workCtaTitle,
        workCtaText,
        workCtaButton,
        
        // About Section
        aboutEyebrow,
        aboutTitle,
        aboutSubtitle,
        aboutContent,
        
        // Footer
        footerTagline,
        footerContact
    }`;
    
    const data = await fetchFromSanity(query);
    
    if (!data) {
        console.log('No homepage data found');
        return;
    }
    
    // Update Navigation
    updateNavigation(data);
    
    // Update Hero Section
    const heroTitle = document.querySelector('.hero__title');
    if (heroTitle && data.heroTitle) {
        if (Array.isArray(data.heroTitle)) {
            heroTitle.innerHTML = data.heroTitle.map(line => 
                `<div class="hero__title-line">${line}</div>`
            ).join('');
        } else {
            heroTitle.innerHTML = data.heroTitle.split('\n').map(line => 
                `<div class="hero__title-line">${line}</div>`
            ).join('');
        }
    }
    
    const heroSubtitle = document.querySelector('.hero__subtitle');
    if (heroSubtitle && data.heroSubtitle) {
        heroSubtitle.textContent = data.heroSubtitle;
    }
    
    const heroCta = document.querySelector('.hero__cta-text');
    if (heroCta && data.heroCta) {
        heroCta.textContent = data.heroCta;
    }
    
    // Update Marquee
    const marqueeContent = document.querySelector('.marquee__content');
    if (marqueeContent && data.marqueeText && data.marqueeText.length > 0) {
        const marqueeHTML = data.marqueeText.map(text => 
            `<span class="marquee__item">${text}</span>`
        ).join('');
        marqueeContent.innerHTML = marqueeHTML + marqueeHTML; // Duplicate for seamless scroll
    }
    
    // Update Story/Welcome Section
    const storyEyebrow = document.querySelector('#welcome .section__eyebrow');
    if (storyEyebrow && data.storyEyebrow) {
        storyEyebrow.textContent = data.storyEyebrow;
    }
    
    const storyTitle = document.querySelector('#welcome .section__title');
    if (storyTitle && data.storyTitle) {
        storyTitle.textContent = data.storyTitle;
    }
    
    // Update Why Section
    const whyEyebrow = document.querySelector('#why .section__eyebrow');
    if (whyEyebrow && data.whyEyebrow) {
        whyEyebrow.textContent = data.whyEyebrow;
    }
    
    const whyContent = document.querySelector('#why .section__content');
    if (whyContent && data.whyContent) {
        whyContent.innerHTML = data.whyContent
            .split('\n')
            .filter(p => p.trim())
            .map(p => `<p>${p}</p>`)
            .join('');
    }
    
    // Update Solution Section
    const solutionEyebrow = document.querySelector('#solution .section__eyebrow');
    if (solutionEyebrow && data.solutionEyebrow) {
        solutionEyebrow.textContent = data.solutionEyebrow;
    }
    
    const solutionContent = document.querySelector('#solution .section__content');
    if (solutionContent && data.solutionContent) {
        solutionContent.innerHTML = data.solutionContent
            .split('\n')
            .filter(p => p.trim())
            .map(p => `<p>${p}</p>`)
            .join('');
    }
    
    // Update Principles Section
    const principlesEyebrow = document.querySelector('#principles .section__eyebrow');
    if (principlesEyebrow && data.principlesEyebrow) {
        principlesEyebrow.textContent = data.principlesEyebrow;
    }
    
    const principlesTitle = document.querySelector('#principles .principles__title');
    if (principlesTitle && data.principlesTitle) {
        principlesTitle.textContent = data.principlesTitle;
    }
    
    const principlesGrid = document.querySelector('.principles__grid');
    if (principlesGrid && data.principlesList && data.principlesList.length > 0) {
        principlesGrid.innerHTML = data.principlesList.map(principle => `
            <div class="principle">
                <div class="principle__number">${principle.number}</div>
                <h3 class="principle__title">${principle.title}</h3>
                <p class="principle__description">${principle.description}</p>
            </div>
        `).join('');
    }
    
    // Update Work Section
    const workEyebrow = document.querySelector('#work .section__eyebrow');
    if (workEyebrow && data.workEyebrow) {
        workEyebrow.textContent = data.workEyebrow;
    }
    
    const workTitle = document.querySelector('#work .work__title');
    if (workTitle && data.workTitle) {
        workTitle.textContent = data.workTitle;
    }
    
    const workCtaTitle = document.querySelector('#work .work__cta-title');
    if (workCtaTitle && data.workCtaTitle) {
        workCtaTitle.textContent = data.workCtaTitle;
    }
    
    const workCtaText = document.querySelector('#work .work__cta-text');
    if (workCtaText && data.workCtaText) {
        workCtaText.textContent = data.workCtaText;
    }
    
    const workCtaButton = document.querySelector('#work .work__cta-button');
    if (workCtaButton && data.workCtaButton) {
        workCtaButton.textContent = data.workCtaButton;
    }
    
    // Update About Section
    const aboutEyebrow = document.querySelector('#about .section__eyebrow');
    if (aboutEyebrow && data.aboutEyebrow) {
        aboutEyebrow.textContent = data.aboutEyebrow;
    }
    
    const aboutTitle = document.querySelector('#about .about__name');
    if (aboutTitle && data.aboutTitle) {
        aboutTitle.textContent = data.aboutTitle;
    }
    
    const aboutSubtitle = document.querySelector('#about .about__role');
    if (aboutSubtitle && data.aboutSubtitle) {
        aboutSubtitle.textContent = data.aboutSubtitle;
    }
    
    // Update Footer
    const footerTagline = document.querySelector('.footer__tagline');
    if (footerTagline && data.footerTagline) {
        footerTagline.textContent = data.footerTagline;
    }
    
    if (data.footerContact) {
        const footerEmail = document.querySelector('.footer__email');
        if (footerEmail && data.footerContact.email) {
            footerEmail.href = `mailto:${data.footerContact.email}`;
            footerEmail.textContent = data.footerContact.email;
        }
        
        const footerInstagram = document.querySelector('.footer__instagram');
        if (footerInstagram && data.footerContact.instagram) {
            footerInstagram.href = `https://instagram.com/${data.footerContact.instagram.replace('@', '')}`;
            footerInstagram.textContent = data.footerContact.instagram;
        }
    }
    
    console.log('✅ Homepage fully updated from Sanity!');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    // Check if we're on the homepage
    if (path === '/' || path === '/index.html' || path.includes('/website/') || path.endsWith('/')) {
        updateHomepageContent();
    }
});

// Export for manual use
window.sanityClient = {
    fetchFromSanity,
    updateHomepageContent
};