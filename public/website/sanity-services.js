// Sanity Client for Services Management
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

// Function to render a service card
function renderServiceCard(service) {
    return `
        <div class="service-card" data-service-id="${service._id}">
            <div class="service-card__content">
                <h3 class="service-card__title">${service.title}</h3>
                <p class="service-card__price">${service.price}</p>
                <p class="service-card__description">${service.shortDescription}</p>
                ${service.ctaButton ? `
                    <a href="${service.ctaButton.link}" 
                       class="service-card__cta" 
                       ${service.ctaButton.openInNewTab ? 'target="_blank"' : ''}>
                        ${service.ctaButton.text}
                    </a>
                ` : ''}
            </div>
        </div>
    `;
}

// Function to update the work-with-me page
async function updateServicesPage() {
    // Fetch all services ordered by display order
    const query = `*[_type == "service"] | order(order asc) {
        _id,
        title,
        slug,
        order,
        featured,
        subtitle,
        price,
        shortDescription,
        fullDescription,
        whatYouGet,
        ctaButton,
        bookingInfo,
        packageDetails,
        testimonials
    }`;
    
    const services = await fetchFromSanity(query);
    
    if (!services || services.length === 0) {
        console.log('No services found in Sanity');
        return;
    }
    
    console.log(`Found ${services.length} services`);
    
    // Update services grid on work-with-me page
    const servicesGrid = document.querySelector('.services-grid, .service-packages');
    if (servicesGrid) {
        servicesGrid.innerHTML = services.map(service => renderServiceCard(service)).join('');
    }
    
    // Update individual service pages if we're on one
    const path = window.location.pathname;
    const currentService = services.find(s => 
        path.includes(s.slug.current) || 
        path.includes(s.title.toLowerCase().replace(/\s+/g, '-'))
    );
    
    if (currentService) {
        updateServicePage(currentService);
    }
}

// Function to update a single service page
function updateServicePage(service) {
    // Update title
    const titleElement = document.querySelector('.service-main__title, .service__title, h1');
    if (titleElement) {
        titleElement.textContent = service.title;
    }
    
    // Update subtitle
    const subtitleElement = document.querySelector('.service-main__subtitle');
    if (subtitleElement) {
        subtitleElement.textContent = service.subtitle;
    }
    
    // Update price
    const priceElement = document.querySelector('.service-main__price');
    if (priceElement) {
        priceElement.textContent = service.price;
    }
    
    // Update description
    const descriptionElement = document.querySelector('.service-main__description');
    if (descriptionElement) {
        descriptionElement.textContent = service.shortDescription;
    }
    
    // Update CTA button
    const ctaElement = document.querySelector('.service-main__cta');
    if (ctaElement && service.ctaButton) {
        if (ctaElement.tagName === 'A') {
            ctaElement.href = service.ctaButton.link;
            ctaElement.textContent = service.ctaButton.text;
            if (service.ctaButton.openInNewTab) {
                ctaElement.target = '_blank';
            }
        } else {
            // Replace button with link
            const newCta = document.createElement('a');
            newCta.href = service.ctaButton.link;
            newCta.className = 'service-main__cta';
            newCta.textContent = service.ctaButton.text;
            newCta.style.display = 'inline-block';
            newCta.style.textDecoration = 'none';
            if (service.ctaButton.openInNewTab) {
                newCta.target = '_blank';
            }
            ctaElement.parentNode.replaceChild(newCta, ctaElement);
        }
    }
    
    // Update booking info
    const bookingInfoElement = document.querySelector('.service-main__booking-info');
    if (bookingInfoElement && service.bookingInfo) {
        bookingInfoElement.textContent = service.bookingInfo;
    }
    
    // Update what you get section if it exists
    const whatYouGetContainer = document.querySelector('.service__what-you-get, .what-you-get');
    if (whatYouGetContainer && service.whatYouGet && service.whatYouGet.length > 0) {
        const listHTML = service.whatYouGet.map(item => `
            <li class="what-you-get__item">
                <strong>${item.item}</strong>
                ${item.description ? `<br><span>${item.description}</span>` : ''}
            </li>
        `).join('');
        
        whatYouGetContainer.innerHTML = `
            <h3>What You Get:</h3>
            <ul class="what-you-get__list">${listHTML}</ul>
        `;
    }
    
    // Update testimonials if they exist
    const testimonialsContainer = document.querySelector('.service__testimonials, .testimonials');
    if (testimonialsContainer && service.testimonials && service.testimonials.length > 0) {
        const testimonialsHTML = service.testimonials.map(testimonial => `
            <blockquote class="testimonial">
                <p class="testimonial__quote">"${testimonial.quote}"</p>
                <cite class="testimonial__author">
                    — ${testimonial.author}
                    ${testimonial.context ? `, ${testimonial.context}` : ''}
                </cite>
            </blockquote>
        `).join('');
        
        testimonialsContainer.innerHTML = `
            <h3>What Parents Say:</h3>
            ${testimonialsHTML}
        `;
    }
    
    // Update page meta tags for SEO
    if (service.seo) {
        if (service.seo.metaTitle) {
            document.title = service.seo.metaTitle;
        }
        if (service.seo.metaDescription) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.content = service.seo.metaDescription;
            }
        }
    }
    
    console.log(`✅ Service page updated: ${service.title}`);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    // Check if we're on a service-related page
    if (path.includes('work-with-me') || 
        path.includes('sleep-guidance') || 
        path.includes('3-call') || 
        path.includes('comprehensive')) {
        updateServicesPage();
    }
});

// Export for manual use
window.sanityServices = {
    fetchFromSanity,
    updateServicesPage,
    updateServicePage
};