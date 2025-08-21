import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Initialize Sanity client
const client = createClient({
  projectId: '1q2kqdh2',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Fetch homepage sections
export async function getHomeSections() {
  const query = `*[_type == "homeSections"][0]`;
  return client.fetch(query);
}

// Fetch all principles
export async function getPrinciples() {
  const query = `*[_type == "principle"] | order(order asc)`;
  return client.fetch(query);
}

// Fetch all service packages
export async function getServicePackages() {
  const query = `*[_type == "servicePackage"] | order(order asc) {
    ...,
    "imageUrl": image.asset->url
  }`;
  return client.fetch(query);
}

// Fetch single service package by slug
export async function getServicePackage(slug) {
  const query = `*[_type == "servicePackage" && slug.current == $slug][0] {
    ...,
    "imageUrl": image.asset->url,
    "detailImageUrl": detailContent.heroImage.asset->url
  }`;
  return client.fetch(query, { slug });
}

// Load homepage content
export async function loadHomepageContent() {
  try {
    const sections = await getHomeSections();
    
    if (sections) {
      // Hero Title
      const heroTitle = document.querySelector('.hero__title');
      if (heroTitle && sections.heroTitle) {
        heroTitle.innerHTML = sections.heroTitle.map(line => line).join('<br>');
      }
      
      // Hero Subtitle
      const heroSubtitle = document.querySelector('.hero__subtitle');
      if (heroSubtitle && sections.heroSubtitle) {
        heroSubtitle.textContent = sections.heroSubtitle;
      }
      
      // Hero CTA
      const heroCta = document.querySelector('.hero__cta .cta-button__text');
      if (heroCta && sections.heroCta) {
        heroCta.textContent = sections.heroCta;
      }
      
      // Marquee Text
      const marqueeTexts = document.querySelectorAll('.marquee__text');
      if (marqueeTexts.length > 0 && sections.marqueeText) {
        const marqueeContent = sections.marqueeText.join(' <span class="marquee-symbol">꩜</span>&nbsp;') + ' <span class="marquee-symbol">꩜</span>&nbsp;';
        marqueeTexts.forEach(el => {
          el.innerHTML = marqueeContent;
        });
      }
      
      // Welcome Section
      const welcomeEyebrow = document.querySelector('#story-eyebrow');
      if (welcomeEyebrow && sections.welcomeEyebrow) {
        welcomeEyebrow.textContent = sections.welcomeEyebrow;
      }
      
      const welcomeTitle = document.querySelector('.story-intro__content .display-title');
      if (welcomeTitle && sections.welcomeTitle) {
        welcomeTitle.textContent = sections.welcomeTitle;
      }
      
      // Why Section
      const whyEyebrow = document.querySelector('#why-eyebrow');
      if (whyEyebrow && sections.whyEyebrow) {
        whyEyebrow.textContent = sections.whyEyebrow;
      }
      
      const whyContent = document.querySelector('.why__content .body-text');
      if (whyContent && sections.whyContent) {
        whyContent.textContent = sections.whyContent;
      }
      
      // Solution Section
      const solutionEyebrow = document.querySelector('#solution-eyebrow');
      if (solutionEyebrow && sections.solutionEyebrow) {
        solutionEyebrow.textContent = sections.solutionEyebrow;
      }
      
      const solutionContent = document.querySelector('.solution__content .body-text');
      if (solutionContent && sections.solutionContent) {
        solutionContent.textContent = sections.solutionContent;
      }
      
      // Work With Me Section
      const workEyebrow = document.querySelector('.work__eyebrow');
      if (workEyebrow && sections.workWithMeEyebrow) {
        workEyebrow.textContent = sections.workWithMeEyebrow;
      }
      
      const workTitle = document.querySelector('.work__title');
      if (workTitle && sections.workWithMeTitle) {
        workTitle.textContent = sections.workWithMeTitle;
      }
      
      const workCtaTitle = document.querySelector('.work__cta-title');
      if (workCtaTitle && sections.workWithMeCtaTitle) {
        workCtaTitle.textContent = sections.workWithMeCtaTitle;
      }
      
      const workCtaText = document.querySelector('.work__cta-text');
      if (workCtaText && sections.workWithMeCtaText) {
        workCtaText.textContent = sections.workWithMeCtaText;
      }
      
      // About Section
      const aboutEyebrow = document.querySelector('#about-eyebrow');
      if (aboutEyebrow && sections.aboutEyebrow) {
        aboutEyebrow.textContent = sections.aboutEyebrow;
      }
      
      const aboutTitle = document.querySelector('.about__title');
      if (aboutTitle && sections.aboutTitle) {
        aboutTitle.textContent = sections.aboutTitle;
      }
      
      const aboutSubtitle = document.querySelector('.about__subtitle');
      if (aboutSubtitle && sections.aboutSubtitle) {
        aboutSubtitle.textContent = sections.aboutSubtitle;
      }
      
      const aboutContent = document.querySelector('.about__copy-text');
      if (aboutContent && sections.aboutContent) {
        // Convert portable text to HTML
        const htmlContent = sections.aboutContent.map(block => {
          if (block._type === 'block') {
            return block.children.map(child => child.text).join('');
          }
          return '';
        }).join('<br><br>');
        aboutContent.innerHTML = htmlContent;
      }
    }
    
    // Load Principles
    const principles = await getPrinciples();
    if (principles && principles.length > 0) {
      const principlesList = document.querySelector('.principles__list');
      if (principlesList) {
        principlesList.innerHTML = principles.map(principle => `
          <div class="principles__row animate-on-scroll">
            ${principle.icon ? `<img src="${urlFor(principle.icon).url()}" alt="${principle.title}" class="principle__icon" />` : 
              `<img src="icons/${principle.title.toLowerCase()}.svg" alt="${principle.title}" class="principle__icon" />`}
            <div class="principle__content">
              <div class="principle__eyebrow">
                <span class="mono">0${principle.order}</span>
                <span class="concrete">${principle.title}</span>
              </div>
              <p class="principle__text">${principle.description}</p>
            </div>
          </div>
        `).join('');
      }
    }
    
  } catch (error) {
    console.error('Error loading homepage content:', error);
  }
}

// Load Work With Me page content
export async function loadWorkWithMeContent() {
  try {
    const packages = await getServicePackages();
    
    if (packages && packages.length > 0) {
      const packagesContainer = document.querySelector('.service-packages');
      if (packagesContainer) {
        packagesContainer.innerHTML = packages.map(pkg => `
          <section class="service-package">
            <div class="service-package__container">
              <div class="service-package__image service-package__image--${pkg.order} animate-on-scroll"
                   style="background-image: url('${pkg.imageUrl}')">
              </div>
              <div class="service-package__content animate-on-scroll">
                <h2 class="service-package__title">${pkg.title}</h2>
                <div class="service-package__details">
                  <p class="service-package__subtitle">${pkg.subtitle}</p>
                  <p class="service-package__price">${pkg.price}</p>
                  <p class="service-package__description">${pkg.description}</p>
                  <a href="${pkg.slug.current}" class="service-package__cta">${pkg.ctaText}</a>
                </div>
              </div>
            </div>
          </section>
        `).join('');
      }
    }
  } catch (error) {
    console.error('Error loading service packages:', error);
  }
}

// Load service detail page content
export async function loadServiceDetailContent(slug) {
  try {
    const service = await getServicePackage(slug);
    
    if (service) {
      // Update page title
      document.title = `${service.title} - Regenerative Motherhood`;
      
      // Update hero section
      const heroTitle = document.querySelector('.service-detail__title');
      if (heroTitle) {
        heroTitle.textContent = service.title;
      }
      
      const heroSubtitle = document.querySelector('.service-detail__subtitle');
      if (heroSubtitle) {
        heroSubtitle.textContent = service.subtitle;
      }
      
      const heroPrice = document.querySelector('.service-detail__price');
      if (heroPrice) {
        heroPrice.textContent = service.price;
      }
      
      // Update hero image
      const heroImage = document.querySelector('.service-detail__hero-image');
      if (heroImage && service.detailImageUrl) {
        heroImage.style.backgroundImage = `url('${service.detailImageUrl}')`;
      }
      
      // Update description
      const description = document.querySelector('.service-detail__description');
      if (description && service.detailContent?.fullDescription) {
        const htmlContent = service.detailContent.fullDescription.map(block => {
          if (block._type === 'block') {
            return `<p>${block.children.map(child => child.text).join('')}</p>`;
          }
          return '';
        }).join('');
        description.innerHTML = htmlContent;
      }
      
      // Update what's included
      const includedList = document.querySelector('.service-detail__included-list');
      if (includedList && service.detailContent?.whatsIncluded) {
        includedList.innerHTML = service.detailContent.whatsIncluded.map(item => 
          `<li>${item}</li>`
        ).join('');
      }
      
      // Update booking info
      const bookingInfo = document.querySelector('.service-detail__booking-info');
      if (bookingInfo && service.detailContent?.bookingInfo) {
        bookingInfo.textContent = service.detailContent.bookingInfo;
      }
      
      // Update booking link
      const bookingLink = document.querySelector('.service-detail__booking-link');
      if (bookingLink && service.detailContent?.bookingLink) {
        bookingLink.href = service.detailContent.bookingLink;
      }
    }
  } catch (error) {
    console.error('Error loading service detail:', error);
  }
}

// Auto-detect and load appropriate content
export function initSanityContent() {
  const path = window.location.pathname;
  
  if (path === '/' || path.includes('index.html')) {
    loadHomepageContent();
  } else if (path.includes('work-with-me')) {
    loadWorkWithMeContent();
  } else if (path.includes('sleep-guidance-call')) {
    loadServiceDetailContent('sleep-guidance-call');
  } else if (path.includes('3-call-sleep-support')) {
    loadServiceDetailContent('3-call-sleep-support');
  } else if (path.includes('comprehensive-sleep-support')) {
    loadServiceDetailContent('comprehensive-sleep-support');
  }
}

// Initialize on DOM ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSanityContent);
  } else {
    initSanityContent();
  }
}