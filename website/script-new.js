// REGENERATIVE MOTHERHOOD - REBUILT NAVIGATION SYSTEM
// Complete rebuild of navigation functionality

console.log('🚀 Regenerative Motherhood Navigation System Loading...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('📋 DOM Content Loaded - Initializing navigation...');
    
    // ========================================================================
    // NAVIGATION ANCHOR LINKS - REBUILT FROM SCRATCH
    // ========================================================================
    
    function initializeAnchorNavigation() {
        console.log('🔗 Initializing anchor navigation...');
        
        // Find all anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        console.log(`Found ${anchorLinks.length} anchor links`);
        
        // Verify target elements exist
        const targets = {
            'welcome': document.getElementById('welcome'),
            'five-principles': document.getElementById('five-principles'),
            'about': document.getElementById('about')
        };
        
        console.log('🎯 Target elements check:');
        Object.keys(targets).forEach(key => {
            console.log(`  ${key}: ${targets[key] ? '✅ Found' : '❌ Missing'}`);
        });
        
        // Smooth scroll function
        function smoothScrollToElement(targetElement, offset = 120) {
            if (!targetElement) {
                console.error('❌ Target element not found for scroll');
                return;
            }
            
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;
            
            console.log(`📍 Scrolling to position: ${offsetPosition}`);
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        
        // Add click handlers to all anchor links
        anchorLinks.forEach((link, index) => {
            const href = link.getAttribute('href');
            console.log(`🔗 Setting up link ${index + 1}: ${href}`);
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                console.log(`🎯 Clicked anchor link to: ${targetId}`);
                
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    console.log(`✅ Found target element: ${targetId}`);
                    
                    // Close mobile menu if it's open
                    const mobileMenu = document.querySelector('.mobile-menu');
                    const hamburger = document.querySelector('.hamburger');
                    
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        console.log('📱 Closing mobile menu before scroll...');
                        closeMobileMenu();
                        
                        // Delay scroll to allow menu to close
                        setTimeout(() => {
                            smoothScrollToElement(targetElement);
                        }, 300);
                    } else {
                        smoothScrollToElement(targetElement);
                    }
                } else {
                    console.error(`❌ Target element not found: ${targetId}`);
                }
            });
        });
        
        console.log('✅ Anchor navigation setup complete');
    }
    
    // ========================================================================
    // MOBILE MENU FUNCTIONALITY
    // ========================================================================
    
    function initializeMobileMenu() {
        console.log('📱 Initializing mobile menu...');
        
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const body = document.body;
        
        if (!hamburger || !mobileMenu) {
            console.warn('⚠️ Mobile menu elements not found');
            return;
        }
        
        // Mobile menu toggle function
        window.closeMobileMenu = function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
            body.style.overflow = '';
            console.log('📱 Mobile menu closed');
        };
        
        window.openMobileMenu = function() {
            hamburger.classList.add('active');
            mobileMenu.classList.add('active');
            hamburger.setAttribute('aria-expanded', 'true');
            mobileMenu.setAttribute('aria-hidden', 'false');
            body.style.overflow = 'hidden';
            console.log('📱 Mobile menu opened');
        };
        
        window.toggleMobileMenu = function() {
            const isActive = hamburger.classList.contains('active');
            if (isActive) {
                window.closeMobileMenu();
            } else {
                window.openMobileMenu();
            }
        };
        
        // Event listeners
        hamburger.addEventListener('click', window.toggleMobileMenu);
        
        // Close on outside click
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                window.closeMobileMenu();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                window.closeMobileMenu();
            }
        });
        
        // Close on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                window.closeMobileMenu();
            }
        });
        
        console.log('✅ Mobile menu setup complete');
    }
    
    // ========================================================================
    // STICKY NAVIGATION
    // ========================================================================
    
    function initializeStickyNavigation() {
        console.log('📌 Initializing sticky navigation...');
        
        const nav = document.querySelector('.hero__nav');
        const navItems = document.querySelectorAll('.nav__item');
        const logo = document.querySelector('.nav__logo');
        const heroSection = document.getElementById('hero');
        
        if (!nav || !logo || !heroSection) {
            console.warn('⚠️ Sticky navigation elements not found');
            return;
        }
        
        let isSticky = false;
        let isHoveringNav = false;
        
        function handleScroll() {
            const heroHeight = heroSection.offsetHeight;
            const scrollY = window.pageYOffset;
            const threshold = heroHeight - 100;
            
            if (scrollY > threshold && !isSticky) {
                // Make navigation sticky
                isSticky = true;
                nav.classList.add('nav--sticky');
                console.log('📌 Navigation is now sticky');
                
                // Hide nav items initially when sticky
                if (!isHoveringNav) {
                    hideNavItems();
                }
                
            } else if (scrollY <= threshold && isSticky) {
                // Remove sticky state
                isSticky = false;
                nav.classList.remove('nav--sticky');
                console.log('📌 Navigation is no longer sticky');
                
                // Show nav items when not sticky
                showNavItems();
            }
        }
        
        function hideNavItems() {
            navItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';
                    item.style.pointerEvents = 'none';
                }, index * 30);
            });
        }
        
        function showNavItems() {
            navItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                    item.style.pointerEvents = 'auto';
                }, index * 50);
            });
        }
        
        function handleNavHover() {
            if (!isSticky) return;
            isHoveringNav = true;
            showNavItems();
        }
        
        function handleNavLeave() {
            if (!isSticky) return;
            isHoveringNav = false;
            
            setTimeout(() => {
                if (!isHoveringNav && isSticky) {
                    hideNavItems();
                }
            }, 200);
        }
        
        // Event listeners
        window.addEventListener('scroll', handleScroll);
        nav.addEventListener('mouseenter', handleNavHover);
        nav.addEventListener('mouseleave', handleNavLeave);
        
        console.log('✅ Sticky navigation setup complete');
    }
    
    // ========================================================================
    // SCROLL ANIMATIONS
    // ========================================================================
    
    function initializeScrollAnimations() {
        console.log('🎬 Initializing scroll animations...');
        
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        if (!animatedElements.length) {
            console.log('ℹ️ No animated elements found');
            return;
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
        
        console.log(`✅ Scroll animations setup complete (${animatedElements.length} elements)`);
    }
    
    // ========================================================================
    // OTHER FUNCTIONALITY
    // ========================================================================
    
    function initializeOtherFeatures() {
        console.log('🔧 Initializing other features...');
        
        // About section read more toggle
        const aboutCopy = document.querySelector('.about__copy');
        const aboutToggle = document.querySelector('.about__toggle');
        
        if (aboutCopy && aboutToggle) {
            // Ensure about copy is visible by default now
            aboutCopy.classList.remove('is-clamped');
            
            aboutToggle.addEventListener('click', function() {
                aboutCopy.classList.toggle('is-expanded');
                const isExpanded = aboutCopy.classList.contains('is-expanded');
                this.textContent = isExpanded ? 'READ LESS' : 'READ MORE';
                this.setAttribute('aria-expanded', isExpanded);
            });
            console.log('✅ About toggle setup complete');
        }
        
        console.log('✅ Other features setup complete');
    }
    
    // ========================================================================
    // INITIALIZE ALL SYSTEMS
    // ========================================================================
    
    try {
        initializeAnchorNavigation();
        initializeMobileMenu();
        initializeStickyNavigation();
        initializeScrollAnimations();
        initializeOtherFeatures();
        
        console.log('🎉 All navigation systems initialized successfully!');
        
        // Final test
        setTimeout(() => {
            console.log('🧪 Running final navigation test...');
            const testTargets = ['welcome', 'five-principles', 'about'];
            testTargets.forEach(id => {
                const element = document.getElementById(id);
                console.log(`  ${id}: ${element ? '✅' : '❌'}`);
            });
        }, 1000);
        
    } catch (error) {
        console.error('❌ Error during initialization:', error);
    }
});

// ========================================================================
// GLOBAL UTILITIES
// ========================================================================

// Test function for debugging
window.testNavigation = function() {
    console.log('🧪 Manual navigation test...');
    ['welcome', 'five-principles', 'about'].forEach(id => {
        const element = document.getElementById(id);
        console.log(`${id}: ${element ? 'Found' : 'NOT FOUND'}`);
        if (element) {
            console.log(`  Position: ${element.getBoundingClientRect().top + window.pageYOffset}`);
        }
    });
};

console.log('📝 Navigation script loaded - Ready for DOM!');
