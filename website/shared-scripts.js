/* =========================================
   SHARED SCRIPTS FOR GLOBAL NAVIGATION
   ========================================= */

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav__toggle');
    const mobileMenu = document.querySelector('.nav__mobile-menu');
    const body = document.body;
    
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function() {
            const isOpen = mobileMenu.classList.contains('is-open');
            
            if (isOpen) {
                // Close menu
                mobileMenu.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                body.style.overflow = '';
            } else {
                // Open menu
                mobileMenu.classList.add('is-open');
                navToggle.setAttribute('aria-expanded', 'true');
                mobileMenu.setAttribute('aria-hidden', 'false');
                body.style.overflow = 'hidden';
            }
        });
        
        // Close menu when clicking on links
        const mobileLinks = document.querySelectorAll('.nav__mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                body.style.overflow = '';
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
                mobileMenu.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('is-open') && 
                !mobileMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                mobileMenu.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
                body.style.overflow = '';
            }
        });
    }
});
