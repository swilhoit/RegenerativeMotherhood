// REGENERATIVE MOTHERHOOD - MAIN SITE FUNCTIONALITY
console.log('🌱 Regenerative Motherhood site loading...');

(function initWhenReady() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWhenReady);
        return;
    }
    console.log('✅ DOM loaded - initializing functionality...');
    // Mark whether this page has a hero section so CSS can offset content on non-hero pages
    try {
        const hasHero = !!document.getElementById('hero');
        document.body.classList.toggle('has-hero', hasHero);
        document.body.classList.toggle('no-hero', !hasHero);
    } catch {}
    
    // ========================================================================
    // ANCHOR NAVIGATION - SIMPLE AND BULLETPROOF
    // ========================================================================
    
    function initializeAnchorNavigation() {
        console.log('🔗 Setting up anchor navigation...');
        
        // Only handle non-mobile-menu anchors here to avoid conflicts
        const anchorLinks = document.querySelectorAll('a[href^="#"]:not(.mobile-menu__item)');
        console.log(`Found ${anchorLinks.length} non-mobile anchor links`);
        
        anchorLinks.forEach(function(link, index) {
            const href = link.getAttribute('href');
            console.log(`Setting up link ${index + 1}: ${href}`);
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = (this.getAttribute('data-target') || href.substring(1)).replace(/^#/, '');
                const targetElement = document.getElementById(targetId);
                
                console.log(`🎯 Clicked anchor: ${targetId}`);
                console.log(`Target element found: ${!!targetElement}`);
                
                if (targetElement) {
                    // Close mobile menu if open
                    const mobileMenu = document.querySelector('.mobile-menu');
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        console.log('📱 Closing mobile menu...');
                        if (window.closeMobileMenu) {
                            window.closeMobileMenu();
                        }
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
            // Use a smaller offset on mobile to account for the shorter nav bar
            const isMobile = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
            const offset = isMobile ? 80 : 120;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            console.log(`✅ Scrolled to element at position: ${offsetPosition}`);
        }
        // Expose smooth scroll helpers for other modules (e.g., mobile menu)
        window.scrollToElementWithOffset = scrollToElement;
        window.scrollToTargetId = function(targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                scrollToElement(targetElement);
            } else {
                console.error(`❌ Target element not found: ${targetId}`);
            }
        };
        
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
        
        let hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const body = document.body;
        
        if (!mobileMenu) {
            console.log('ℹ️ Mobile menu overlay not found');
            return;
        }

        const headerToggles = Array.from(document.querySelectorAll('.mobile-header__toggle'));
        let toggles = [hamburger, ...headerToggles].filter(Boolean);

        // Ensure mobile logo and hamburger are visible on load
        const logoImg = document.querySelector('.mobile-nav__logo img');
        if (logoImg) {
            logoImg.style.opacity = '1';
            logoImg.style.visibility = 'visible';
        }
        if (hamburger) {
            hamburger.style.opacity = '1';
            hamburger.style.visibility = 'visible';
        }
        
        // Make functions globally accessible
        function defocusActiveElement() {
            try {
                if (document.activeElement && typeof document.activeElement.blur === 'function') {
                    document.activeElement.blur();
                }
            } catch {}
        }

        window.closeMobileMenu = function() {
            if (hamburger) hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            toggles.forEach(t => t && t.setAttribute('aria-expanded', 'false'));
            // Prevent focus trap errors: defocus first, then mark inert
            defocusActiveElement();
            mobileMenu.setAttribute('inert', '');
            // Defer aria-hidden until after defocus to avoid a11y error
            requestAnimationFrame(() => mobileMenu.setAttribute('aria-hidden', 'true'));
            body.style.overflow = '';
            console.log('📱 Mobile menu closed');
            // Allow clicks through as we fade out
            mobileMenu.style.pointerEvents = 'none';
        };
        
        window.openMobileMenu = function() {
            if (hamburger) hamburger.classList.add('active');
            mobileMenu.classList.add('active');
            toggles.forEach(t => t && t.setAttribute('aria-expanded', 'true'));
            mobileMenu.removeAttribute('inert');
            mobileMenu.setAttribute('aria-hidden', 'false');
            body.style.overflow = 'hidden';
            console.log('📱 Mobile menu opened');
            // Ensure element is clickable and visible
            mobileMenu.style.display = 'block';
            mobileMenu.style.pointerEvents = 'auto';
        };
        
        window.toggleMobileMenu = function() {
            // In case header was injected after init, refresh references lazily
            if (!hamburger || !document.body.contains(hamburger)) {
                hamburger = document.querySelector('.hamburger');
                toggles = [hamburger, ...Array.from(document.querySelectorAll('.mobile-header__toggle'))].filter(Boolean);
            }
            if (hamburger.classList.contains('active')) {
                window.closeMobileMenu();
            } else {
                window.openMobileMenu();
            }
        };
        
        // Event listeners for all toggles (hamburger + reusable header toggle)
        toggles.forEach(t => t && t.addEventListener('click', window.toggleMobileMenu));
        // Robust delegation in case header is injected after init or DOM order changes
        document.addEventListener('click', function(e) {
            const btn = e.target && e.target.closest ? e.target.closest('.hamburger') : null;
            if (!btn) return;
            e.preventDefault();
            window.toggleMobileMenu();
        });
        
        // Close button inside mobile menu
        const closeButton = document.querySelector('.mobile-menu__close');
        if (closeButton) {
            closeButton.addEventListener('click', window.closeMobileMenu);
        }
        
        // Close on outside click
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                window.closeMobileMenu();
            }
        });
        
        // Track if we're already handling a click to prevent duplicates
        let isHandlingMenuClick = false;
        
        // Simpler approach - use event delegation for ALL mobile menu items
        document.addEventListener('click', function(e) {
            // Check if clicked element is a mobile menu item or child of one
            const menuItem = e.target.closest('.mobile-menu__item');
            if (!menuItem) return;
            
            // Prevent duplicate handling
            if (isHandlingMenuClick) {
                console.log('Already handling menu click, skipping duplicate');
                return;
            }
            
            isHandlingMenuClick = true;
            
            const href = menuItem.getAttribute('href');
            console.log('Mobile menu item clicked:', href);
            
            if (href && href.startsWith('#')) {
                // Handle anchor links
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation(); // Stop any other handlers
                
                const targetId = (menuItem.getAttribute('data-target') || href).replace('#','');
                console.log('Looking for element with ID:', targetId);
                
                // Close menu first
                window.closeMobileMenu();
                
                // Ensure body overflow is restored (in case it was hidden for menu)
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                
                // Then scroll after a longer delay to ensure menu animation completes
                setTimeout(() => {
                    const elTarget = document.getElementById(targetId);
                    if (elTarget) {
                        console.log('Found target element:', elTarget);
                        const isMobile = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
                        const offset = isMobile ? 80 : 120;
                        const y = elTarget.getBoundingClientRect().top + window.pageYOffset - offset;
                        console.log('Scrolling to position:', y);
                        
                        // More robust scrolling approach for mobile
                        // Force a reflow to ensure the DOM is ready
                        void elTarget.offsetHeight;
                        
                        // Use requestAnimationFrame to ensure we're scrolling after render
                        requestAnimationFrame(() => {
                            console.log('Attempting scroll to:', y);
                            
                            // Try multiple scroll methods
                            // Method 1: Standard smooth scroll
                            window.scrollTo({
                                top: y,
                                left: 0,
                                behavior: 'smooth'
                            });
                            
                            // Method 2: Also set on documentElement and body for compatibility
                            document.documentElement.scrollTo({
                                top: y,
                                left: 0,
                                behavior: 'smooth'
                            });
                            
                            // Method 3: Fallback for older browsers
                            if (document.documentElement.scrollTop === 0 && document.body.scrollTop === 0) {
                                console.log('Using fallback scroll');
                                document.documentElement.scrollTop = y;
                                document.body.scrollTop = y;
                            }
                            
                            // Verify scroll happened
                            setTimeout(() => {
                                const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                                console.log('Scroll complete. Current position:', currentScroll, 'Target was:', y);
                            }, 500);
                        });
                        
                        try { history.replaceState(null, '', '#' + targetId); } catch {}
                    } else {
                        console.error('Target element not found:', targetId);
                        // Try alternative IDs
                        const altIds = [
                            targetId.replace('-', ''),  // Remove dash
                            targetId.replace('five-principles', 'fiveprinciples'),  // Alternative spelling
                            targetId === 'welcome' ? 'story-intro' : null  // Alternative section name
                        ];
                        
                        for (const altId of altIds) {
                            if (altId) {
                                const altTarget = document.getElementById(altId);
                                if (altTarget) {
                                    console.log('Found with alternate ID:', altId);
                                    const isMobile = window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
                                    const offset = isMobile ? 80 : 120;
                                    const y = altTarget.getBoundingClientRect().top + window.pageYOffset - offset;
                                    window.scrollTo({ top: y, behavior: 'smooth' });
                                    break;
                                }
                            }
                        }
                    }
                    
                    // Reset the flag after scrolling
                    isHandlingMenuClick = false;
                }, 600); // Increased delay to ensure menu closes completely
            } else if (href && href.startsWith('mailto:')) {
                // Handle mailto links - just close menu
                window.closeMobileMenu();
                setTimeout(() => { isHandlingMenuClick = false; }, 100);
            } else if (href) {
                // Handle external links - close menu and let navigation happen
                window.closeMobileMenu();
                setTimeout(() => { isHandlingMenuClick = false; }, 100);
            }
        }, true);  // Use capture phase

        // Removed duplicate handler - now using the single delegated handler above
        
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
        // Initialize mobile menu FIRST so window.closeMobileMenu is available
        initializeMobileMenu();
        // Then initialize anchor navigation which may use closeMobileMenu
        initializeAnchorNavigation();
        initializeAboutToggle();
        initializeStickyNavigation();
        initializeScrollAnimations();
        // Mount reusable mobile header if slot present; don't duplicate if page already includes one
        (function mountMobileHeader() {
            const slot = document.getElementById('mobile-header-slot');
            const existingInNav = document.querySelector('.hero__nav .mobile-nav');
            if (existingInNav) {
                // Use the page-provided mobile nav; ensure CSS and JS are activated
                document.body.classList.add('has-mobile-header');
                try { initializeMobileMenu(); } catch {}
                if (slot) slot.remove();
                return;
            }
            if (!slot) return;
            fetch('components/mobile-header.html')
                .then(r => r.text())
                .then(html => {
                    // Inject component and apply theme to logo color if needed
                    const theme = slot.dataset.theme || 'auto';
                    const injected = html.replace('data-theme="auto"', `data-theme="${theme}"`);
                    slot.outerHTML = injected;
                    // If olive theme is requested, swap to olive logo if available
                    if (theme === 'olive') {
                        const logo = document.querySelector('.mobile-nav__logo img');
                        if (logo) {
                            try {
                                logo.src = 'logo-olive.svg';
                                logo.style.filter = 'none';
                            } catch {}
                        }
                    }
                    // Ensure CSS treats this as the active mobile header
                    document.body.classList.add('has-mobile-header');
                    // Ensure CSS/JS are active for injected header
                    document.body.classList.add('has-mobile-header');
                    // Ensure the newly injected hamburger has working toggle handlers
                    try { initializeMobileMenu(); } catch {}
                })
                .catch(() => console.warn('Mobile header include failed'));
        })();
        
        console.log('🎉 All functionality initialized successfully!');
        
    } catch (error) {
        console.error('❌ Error during initialization:', error);
    }
})();

// Debug function
window.testAnchors = function() {
    console.log('🧪 Testing anchors manually...');
    ['welcome', 'five-principles', 'about'].forEach(id => {
        const element = document.getElementById(id);
        console.log(`${id}: ${element ? '✅ Found' : '❌ Missing'}`);
    });
};



