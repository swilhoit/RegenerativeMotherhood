// Sanity Client Configuration with Debug
const SANITY_PROJECT_ID = '1q2kqdh2';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';

// Create the Sanity client URL
const SANITY_URL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`;

// Function to fetch data from Sanity
async function fetchFromSanity(query) {
    try {
        console.log('🔍 Fetching from Sanity with query:', query);
        const encodedQuery = encodeURIComponent(query);
        const url = `${SANITY_URL}?query=${encodedQuery}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ Sanity response:', data);
        return data.result;
    } catch (error) {
        console.error('❌ Error fetching from Sanity:', error);
        return null;
    }
}

// Function to update homepage content
async function updateHomepageContent() {
    console.log('🚀 Starting homepage content update...');
    
    // First, let's check what data we have in Sanity
    const checkQuery = `*[_type == "homepage"]`;
    const checkData = await fetchFromSanity(checkQuery);
    
    if (!checkData || checkData.length === 0) {
        console.log('⚠️ No homepage document found in Sanity. Creating one would help.');
        console.log('💡 You can create a homepage document in Sanity Studio');
        
        // Let's try to get any content
        const anyContent = await fetchFromSanity(`*[]{_type, _id, title}`);
        console.log('📊 Available content types in Sanity:', anyContent);
        return;
    }
    
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
        console.log('📝 Homepage data received:', data);
        
        // Update hero section
        const heroTitle = document.querySelector('.hero__title');
        console.log('🔍 Found hero title element:', heroTitle);
        if (heroTitle && data.heroTitle) {
            console.log('✏️ Updating hero title from:', heroTitle.textContent, 'to:', data.heroTitle);
            // Check if we need to handle line breaks
            if (data.heroTitle.includes('\n')) {
                heroTitle.innerHTML = data.heroTitle.split('\n').map(line => 
                    `<div class="hero__title-line">${line}</div>`
                ).join('');
            } else {
                heroTitle.textContent = data.heroTitle;
            }
        } else {
            console.log('⚠️ Hero title element or data not found');
        }
        
        const heroSubtitle = document.querySelector('.hero__subtitle');
        console.log('🔍 Found hero subtitle element:', heroSubtitle);
        if (heroSubtitle && data.heroSubtitle) {
            console.log('✏️ Updating hero subtitle to:', data.heroSubtitle);
            heroSubtitle.textContent = data.heroSubtitle;
        }
        
        // Update welcome section - let's find the right selectors
        const welcomeSelectors = [
            '#welcome .text-content__title',
            '#welcome h2',
            '#welcome .section__title',
            '.welcome__title'
        ];
        
        let welcomeTitle = null;
        for (const selector of welcomeSelectors) {
            welcomeTitle = document.querySelector(selector);
            if (welcomeTitle) {
                console.log('✅ Found welcome title with selector:', selector);
                break;
            }
        }
        
        if (welcomeTitle && data.welcomeTitle) {
            console.log('✏️ Updating welcome title to:', data.welcomeTitle);
            welcomeTitle.textContent = data.welcomeTitle;
        } else {
            console.log('⚠️ Welcome title element not found or no data');
        }
        
        // Similar for welcome content
        const welcomeContentSelectors = [
            '#welcome .text-content__body',
            '#welcome .section__content',
            '#welcome p',
            '.welcome__content'
        ];
        
        let welcomeContent = null;
        for (const selector of welcomeContentSelectors) {
            welcomeContent = document.querySelector(selector);
            if (welcomeContent) {
                console.log('✅ Found welcome content with selector:', selector);
                break;
            }
        }
        
        if (welcomeContent && data.welcomeContent) {
            console.log('✏️ Updating welcome content');
            welcomeContent.innerHTML = data.welcomeContent
                .split('\n')
                .filter(p => p.trim())
                .map(p => `<p>${p}</p>`)
                .join('');
        }
        
        console.log('✅ Homepage update complete!');
    } else {
        console.log('⚠️ No data returned from homepage query');
    }
}

// Function to check what's in Sanity
async function checkSanityContent() {
    console.log('🔍 Checking all Sanity content...');
    
    const queries = {
        homepage: `*[_type == "homepage"]{_id, _type, heroTitle, heroSubtitle}`,
        pages: `*[_type == "page"]{_id, title, slug}`,
        principles: `*[_type == "principle"]{_id, title}`,
        services: `*[_type == "servicePackage"]{_id, title}`,
        allTypes: `*[]{_type} | {"types": [^._type] | unique}`
    };
    
    for (const [name, query] of Object.entries(queries)) {
        const data = await fetchFromSanity(query);
        console.log(`📊 ${name}:`, data);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 Page loaded, path:', window.location.pathname);
    
    // Add a debug button to the page
    const debugButton = document.createElement('button');
    debugButton.textContent = 'Debug Sanity';
    debugButton.style.cssText = 'position: fixed; top: 10px; right: 10px; z-index: 9999; padding: 10px; background: #007bff; color: white; border: none; border-radius: 4px;';
    debugButton.onclick = checkSanityContent;
    document.body.appendChild(debugButton);
    
    // Determine which page we're on
    const path = window.location.pathname;
    
    if (path === '/' || path === '/index.html' || path.includes('/website/index.html') || path.endsWith('/')) {
        console.log('🏠 Homepage detected, updating content...');
        updateHomepageContent();
    } else {
        console.log('📄 Not homepage, path is:', path);
    }
});

// Export functions for manual use
window.sanityClient = {
    fetchFromSanity,
    updateHomepageContent,
    checkSanityContent
};