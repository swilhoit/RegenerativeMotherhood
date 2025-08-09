// Mobile Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    
    if (!hamburger || !mobileMenu) {
        console.warn('Hamburger menu elements not found');
        return;
    }
    
    // Toggle mobile menu
    function toggleMobileMenu() {
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
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            toggleMobileMenu();
        }
    });
    
    // Close menu when clicking on menu items
    const mobileMenuItems = document.querySelectorAll('.mobile-menu__item');
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', toggleMobileMenu);
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Handle window resize - close menu if window becomes too wide
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
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
        const headerOffset = 120; // Increased for sticky nav
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
                        if (mobileMenu && mobileMenu.classList.contains('active')) {
                            console.log('Closing mobile menu first...');
                            toggleMobileMenu();
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
    
    // Sticky navigation with logo animation
    function setupStickyNavigation() {
        const nav = document.querySelector('.hero__nav');
        const navItems = document.querySelectorAll('.nav__item');
        const logo = document.querySelector('.nav__logo');
        const heroSection = document.querySelector('.hero');
        
        if (!nav || !logo || !heroSection) return;
        
        let isSticky = false;
        let isHoveringLogo = false;
        
        function handleScroll() {
            const heroHeight = heroSection.offsetHeight;
            const scrollY = window.pageYOffset;
            
            if (scrollY > heroHeight - 100 && !isSticky) {
                // Make navigation sticky
                isSticky = true;
                nav.classList.add('nav--sticky');
                
                // Hide nav items, show only logo
                navItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';
                    // Don't disable pointer events to keep links working
                });
                
                // Center the logo
                logo.style.transform = 'translateX(0)';
                
            } else if (scrollY <= heroHeight - 100 && isSticky) {
                // Remove sticky state
                isSticky = false;
                nav.classList.remove('nav--sticky');
                
                // Show nav items
                navItems.forEach(item => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                    item.style.pointerEvents = 'auto';
                });
                
                // Reset logo position
                logo.style.transform = '';
            }
        }
        
        function handleLogoHover() {
            if (!isSticky) return;
            
            isHoveringLogo = true;
            
            // Show nav items on hover
            navItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                    item.style.pointerEvents = 'auto';
                }, index * 50); // Staggered animation
            });
        }
        
        function handleLogoLeave() {
            if (!isSticky) return;
            
            isHoveringLogo = false;
            
            // Hide nav items after a short delay
            setTimeout(() => {
                if (!isHoveringLogo && isSticky) {
                    navItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(-10px)';
                            item.style.pointerEvents = 'none';
                        }, index * 30);
                    });
                }
            }, 200);
        }
        
        // Event listeners
        window.addEventListener('scroll', handleScroll);
        logo.addEventListener('mouseenter', handleLogoHover);
        logo.addEventListener('mouseleave', handleLogoLeave);
        
        // Also handle hover on nav container for better UX
        nav.addEventListener('mouseenter', () => {
            if (isSticky) {
                isHoveringLogo = true;
                handleLogoHover();
            }
        });
        
        nav.addEventListener('mouseleave', () => {
            if (isSticky) {
                isHoveringLogo = false;
                handleLogoLeave();
            }
        });
    }
    
    setupStickyNavigation();
    
    // Intersection Observer for scroll animations
    function setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        if (!animatedElements.length) return;
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay for multiple elements in same section
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    setupScrollAnimations();
});
