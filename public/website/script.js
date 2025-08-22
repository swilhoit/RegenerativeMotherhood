// Mobile Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    
    if (!hamburger || !mobileMenu) {
        console.warn('Hamburger menu elements not found');
    }
    
    // Toggle mobile menu - make it globally accessible
    window.toggleMobileMenu = function() {
        const isActive = hamburger.classList.contains('active');
        
        if (isActive) {
            // Close menu
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
            body.style.overflow = '';
        } else {
            // Open menu
            hamburger.classList.add('active');
            mobileMenu.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
            mobileMenu.setAttribute('aria-hidden', 'false');
            body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }
    
    // Add click event to hamburger button
    if (hamburger) {
        hamburger.addEventListener('click', window.toggleMobileMenu);
    }
    
    // Close menu when clicking outside
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                window.toggleMobileMenu();
            }
        });
    }
    
    // Close menu when clicking on menu items
    const mobileMenuItems = document.querySelectorAll('.mobile-menu__item');
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', window.toggleMobileMenu);
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            window.toggleMobileMenu();
        }
    });
    
    // Handle window resize - close menu if window becomes too wide
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('active')) {
            window.toggleMobileMenu();
        }
    });

    // About read more toggle
    const aboutCopy = document.querySelector('.about__copy');
    const aboutToggle = document.querySelector('.about__toggle');
    if (aboutCopy && aboutToggle) {
        aboutToggle.addEventListener('click', () => {
            const isExpanded = aboutToggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                aboutCopy.classList.add('is-clamped');
                aboutToggle.textContent = 'READ MORE';
            } else {
                aboutCopy.classList.remove('is-clamped');
                aboutToggle.textContent = 'READ LESS';
            }
            aboutToggle.setAttribute('aria-expanded', String(!isExpanded));
        });
    }
    
    // Robust smooth scroll with fallback
    function smoothScrollTo(element) {
        const headerOffset = 100;
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        // Try modern smooth scroll first
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        } else {
            // Fallback for older browsers
            const startPosition = window.pageYOffset;
            const distance = offsetPosition - startPosition;
            const duration = 1200;
            let start = null;

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const ease = easeInOutQuad(progress, startPosition, distance, duration);
                window.scrollTo(0, ease);
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }

            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            window.requestAnimationFrame(step);
        }
    }
    
    // Handle anchor link clicks
    function setupSmoothScrolling() {
        console.log('Setting up smooth scrolling...');
        const navLinks = document.querySelectorAll('a[href^="#"]');
        console.log('Found anchor links:', navLinks.length);
        
        navLinks.forEach((link, index) => {
            console.log(`Link ${index}:`, link.href);
            link.addEventListener('click', function(e) {
                console.log('Anchor link clicked:', this.href);
                e.preventDefault();
                
                const href = this.getAttribute('href');
                console.log('Processing href:', href);
                
                if (href && href !== '#') {
                    const targetId = href.substring(1);
                    console.log('Target ID:', targetId);
                    const targetElement = document.getElementById(targetId);
                    console.log('Target element found:', !!targetElement);
                    
                    if (targetElement) {
                        // Close mobile menu if open
                        const currentMobileMenu = document.querySelector('.mobile-menu');
                        if (currentMobileMenu && currentMobileMenu.classList.contains('active')) {
                            console.log('Closing mobile menu first...');
                            window.toggleMobileMenu();
                            setTimeout(() => {
                                console.log('Scrolling to element...');
                                smoothScrollTo(targetElement);
                            }, 300);
                        } else {
                            console.log('Scrolling to element immediately...');
                            smoothScrollTo(targetElement);
                        }
                    } else {
                        console.error('Target element not found for ID:', targetId);
                    }
                }
            });
        });
    }
    
    setupSmoothScrolling();
    
    // Test anchor functionality
    console.log('Testing anchor elements:');
    console.log('welcome element:', document.getElementById('welcome'));
    console.log('five-principles element:', document.getElementById('five-principles'));
    console.log('about element:', document.getElementById('about'));
});
