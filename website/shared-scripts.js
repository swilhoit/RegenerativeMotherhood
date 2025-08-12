// REGENERATIVE MOTHERHOOD - MAIN SITE FUNCTIONALITY
console.log('🌱 Regenerative Motherhood site loading...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM loaded - initializing functionality...');
    
    // ========================================================================
    // ANCHOR NAVIGATION - SIMPLE AND BULLETPROOF
    // ========================================================================
    
    function initializeAnchorNavigation() {
        console.log('🔗 Setting up anchor navigation...');
        
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        console.log(`Found ${anchorLinks.length} anchor links`);
        
        anchorLinks.forEach(function(link, index) {
            const href = link.getAttribute('href');
            console.log(`Setting up link ${index + 1}: ${href}`);
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                console.log(`🎯 Clicked anchor: ${targetId}`);
                console.log(`Target element found: ${!!targetElement}`);
                
                if (targetElement) {
                    // Close mobile menu if open
                    const mobileMenu = document.querySelector('.mobile-menu');
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        console.log('📱 Closing mobile menu...');
                        closeMobileMenu();
                        setTimeout(() => {
                            scrollToElement(targetElement);
                        }, 300);
                    } else {
                        scrollToElement(targetElement);
                    }
                } else {
                    console.error(`❌ Target element not found: ${targetId}`);
                }
            });
        });
        
        function scrollToElement(element) {
            const offset = 120; // Account for sticky nav
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            console.log(`✅ Scrolled to element at position: ${offsetPosition}`);
        }
        
        console.log('✅ Anchor navigation setup complete');
    }
    
    // ========================================================================
    // ABOUT SECTION READ MORE TOGGLE
    // ========================================================================
    
    function initializeAboutToggle() {
        console.log('📖 Setting up about section toggle...');
        
        const aboutCopy = document.querySelector('.about__copy');
        const aboutToggle = document.querySelector('.about__toggle');
        
        if (aboutCopy && aboutToggle) {
            console.log('Found about section elements');
            
            aboutToggle.addEventListener('click', function() {
                const isExpanded = aboutCopy.classList.contains('is-expanded');
                
                if (isExpanded) {
                    // Collapse the text
                    aboutCopy.classList.remove('is-expanded');
                    aboutCopy.classList.add('is-clamped');
                    this.textContent = 'READ MORE';
                    this.setAttribute('aria-expanded', 'false');
                    console.log('📖 Collapsed about text');
                } else {
                    // Expand the text
                    aboutCopy.classList.remove('is-clamped');
                    aboutCopy.classList.add('is-expanded');
                    this.textContent = 'READ LESS';
                    this.setAttribute('aria-expanded', 'true');
                    console.log('📖 Expanded about text');
                }
            });
            
            console.log('✅ About toggle setup complete');
        } else {
            console.log('ℹ️ About section elements not found (normal for other pages)');
        }
    }
    
    // ========================================================================
    // MOBILE MENU FUNCTIONALITY
    // ========================================================================
    
    function initializeMobileMenu() {
        console.log('📱 Setting up mobile menu...');
        
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const body = document.body;
        
        if (!hamburger || !mobileMenu) {
            console.log('ℹ️ Mobile menu elements not found');
            return;
        }

        // Ensure mobile logo and hamburger are visible on load
        const logoImg = document.querySelector('.mobile-nav__logo img');
        if (logoImg) {
            logoImg.style.opacity = '1';
            logoImg.style.visibility = 'visible';
        }
        hamburger.style.opacity = '1';
        hamburger.style.visibility = 'visible';
        
        // Make functions globally accessible
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
            if (hamburger.classList.contains('active')) {
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
        
        // Close menu items when clicked
        const mobileMenuItems = document.querySelectorAll('.mobile-menu__item');
        mobileMenuItems.forEach(item => {
            item.addEventListener('click', window.closeMobileMenu);
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
    // STICKY NAVIGATION (from original script)
    // ========================================================================
    
    function initializeStickyNavigation() {
        console.log('📌 Setting up sticky navigation...');
        
        const nav = document.querySelector('.hero__nav');
        const navItems = document.querySelectorAll('.nav__item');
        const logo = document.querySelector('.nav__logo');
        const heroSection = document.getElementById('hero');
        
        if (!nav || !logo || !heroSection) {
            console.log('ℹ️ Sticky navigation elements not found');
            return;
        }
        
        let isSticky = false;
        let isHoveringNav = false;
        
        function handleScroll() {
            const heroHeight = heroSection.offsetHeight;
            const scrollY = window.pageYOffset;
            const threshold = heroHeight - 100;
            
            if (scrollY > threshold && !isSticky) {
                isSticky = true;
                nav.classList.add('nav--sticky');
                if (!isHoveringNav) hideNavItems();
            } else if (scrollY <= threshold && isSticky) {
                isSticky = false;
                nav.classList.remove('nav--sticky');
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
                if (!isHoveringNav && isSticky) hideNavItems();
            }, 200);
        }
        
        window.addEventListener('scroll', handleScroll);
        nav.addEventListener('mouseenter', handleNavHover);
        nav.addEventListener('mouseleave', handleNavLeave);
        
        console.log('✅ Sticky navigation setup complete');
    }
    
    // ========================================================================
    // SCROLL ANIMATIONS
    // ========================================================================
    
    function initializeScrollAnimations() {
        console.log('🎬 Setting up scroll animations...');
        
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
    // INITIALIZE ALL FUNCTIONALITY
    // ========================================================================
    
    try {
        initializeAnchorNavigation();
        initializeAboutToggle();
        initializeMobileMenu();
        initializeStickyNavigation();
        initializeScrollAnimations();
        
        console.log('🎉 All functionality initialized successfully!');
        
    } catch (error) {
        console.error('❌ Error during initialization:', error);
    }
});

// Debug function
window.testAnchors = function() {
    console.log('🧪 Testing anchors manually...');
    ['welcome', 'five-principles', 'about'].forEach(id => {
        const element = document.getElementById(id);
        console.log(`${id}: ${element ? '✅ Found' : '❌ Missing'}`);
    });
};



