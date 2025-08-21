// CUSTOM CURSOR WITH SPARKLE TRAIL EFFECT

class SparkleTrailCursor {
    constructor() {
        this.cursor = null;
        this.sparkles = [];
        this.lastSparkleTime = 0;
        this.sparkleInterval = 150; // milliseconds between sparkles (reduced frequency)
        this.maxSparkles = 10; // reduced max sparkles
        this.mouseX = 0;
        this.mouseY = 0;
        this.isInitialized = false;
        
        this.init();
    }
    
    init() {
        // Create custom cursor element
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);
        
        // Bind events
        this.bindEvents();
        this.isInitialized = true;
        
        // Start animation loop
        this.animate();
    }
    
    bindEvents() {
        // Mouse move with throttling
        let mouseThrottle = false;
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            if (!mouseThrottle) {
                requestAnimationFrame(() => {
                    this.updateCursor();
                    this.createSparkle();
                    mouseThrottle = false;
                });
                mouseThrottle = true;
            }
        });
        
        // Mouse enter/leave for hover effects
        document.addEventListener('mouseover', (e) => {
            if (this.isInteractiveElement(e.target)) {
                this.cursor.classList.add('hover');
                this.createHoverBurst();
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (this.isInteractiveElement(e.target)) {
                this.cursor.classList.remove('hover');
            }
        });
        
        // Update background detection on scroll
        document.addEventListener('scroll', () => {
            this.updateBackgroundContext();
        });
        
        // Initial background detection
        setTimeout(() => this.updateBackgroundContext(), 100);
    }
    
    isInteractiveElement(element) {
        const interactiveElements = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'];
        return interactiveElements.includes(element.tagName) || 
               element.classList.contains('nav__item') ||
               element.classList.contains('cta-button') ||
               element.classList.contains('service-package__cta') ||
               element.classList.contains('hamburger');
    }
    
    updateCursor() {
        if (!this.cursor) return;
        
        this.cursor.style.left = this.mouseX - 16 + 'px';
        this.cursor.style.top = this.mouseY - 16 + 'px';
    }
    
    updateBackgroundContext() {
        if (!this.cursor) return;
        
        // Get element under cursor
        const elementUnderCursor = document.elementFromPoint(this.mouseX, this.mouseY);
        if (!elementUnderCursor) return;
        
        // Check if we're on a dark background
        const isDarkBackground = this.isDarkBackground(elementUnderCursor);
        
        // Update cursor classes
        this.cursor.classList.toggle('on-dark', isDarkBackground);
        this.cursor.classList.toggle('on-light', !isDarkBackground);
    }
    
    isDarkBackground(element) {
        // If hovering over an image, always use light cursor
        if (element.tagName === 'IMG' || element.classList.contains('about__image') || element.classList.contains('work__image') || element.classList.contains('service-package__image')) {
            return false; // Use light cursor (dark sparkle) on images
        }
        
        // Check for specific dark background sections
        const darkSections = [
            '.site-footer',
            '.service-features',
            '.principles',
            '.hero'
        ];
        
        // Walk up the DOM tree to find parent sections
        let currentElement = element;
        while (currentElement && currentElement !== document.body) {
            // If any parent is an image container, use light cursor
            if (currentElement.tagName === 'IMG' || 
                currentElement.classList.contains('about__image') || 
                currentElement.classList.contains('work__image') || 
                currentElement.classList.contains('service-package__image') ||
                currentElement.classList.contains('story__image')) {
                return false;
            }
            
            for (const selector of darkSections) {
                if (currentElement.matches && currentElement.matches(selector)) {
                    return true;
                }
            }
            currentElement = currentElement.parentElement;
        }
        
        // Default to light background
        return false;
    }
    
    createSparkle() {
        const now = Date.now();
        
        // Throttle sparkle creation
        if (now - this.lastSparkleTime < this.sparkleInterval) return;
        if (this.sparkles.length >= this.maxSparkles) return;
        
        this.lastSparkleTime = now;
        
        // Create sparkle element
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-trail';
        
        // Random variant
        const variant = Math.floor(Math.random() * 3) + 1;
        sparkle.classList.add(`variant-${variant}`);
        
        // Apply background context
        const isDark = this.cursor.classList.contains('on-dark');
        sparkle.classList.toggle('on-dark', isDark);
        sparkle.classList.toggle('on-light', !isDark);
        
        // Position with slight randomness
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;
        
        sparkle.style.left = (this.mouseX + offsetX) + 'px';
        sparkle.style.top = (this.mouseY + offsetY) + 'px';
        
        // Add to DOM and track
        document.body.appendChild(sparkle);
        this.sparkles.push({
            element: sparkle,
            createdAt: now
        });
        
        // Remove after animation
        setTimeout(() => {
            this.removeSparkle(sparkle);
        }, 2000);
    }
    
    createHoverBurst() {
        // Create multiple sparkles in a burst pattern
        const burstCount = 6;
        const radius = 30;
        
        for (let i = 0; i < burstCount; i++) {
            const angle = (i * 360) / burstCount;
            const radians = (angle * Math.PI) / 180;
            
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-burst';
            
            // Apply background context for color
            const isDark = this.cursor.classList.contains('on-dark');
            sparkle.classList.toggle('on-dark', isDark);
            sparkle.classList.toggle('on-light', !isDark);
            
            // Position around cursor in a circle
            const offsetX = Math.cos(radians) * radius;
            const offsetY = Math.sin(radians) * radius;
            
            sparkle.style.left = (this.mouseX + offsetX) + 'px';
            sparkle.style.top = (this.mouseY + offsetY) + 'px';
            
            // Add to DOM
            document.body.appendChild(sparkle);
            
            // Remove after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 800);
        }
    }
    
    removeSparkle(sparkleElement) {
        // Remove from DOM
        if (sparkleElement.parentNode) {
            sparkleElement.parentNode.removeChild(sparkleElement);
        }
        
        // Remove from tracking array
        this.sparkles = this.sparkles.filter(s => s.element !== sparkleElement);
    }
    
    animate() {
        // Update background context periodically
        this.updateBackgroundContext();
        
        // Continue animation loop
        requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.cursor) {
            this.cursor.remove();
        }
        
        // Clean up sparkles
        this.sparkles.forEach(sparkle => {
            if (sparkle.element.parentNode) {
                sparkle.element.parentNode.removeChild(sparkle.element);
            }
        });
        
        this.sparkles = [];
        this.isInitialized = false;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on non-touch devices
    if (!('ontouchstart' in window)) {
        window.sparkleTrailCursor = new SparkleTrailCursor();
    }
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (window.sparkleTrailCursor) {
        window.sparkleTrailCursor.destroy();
    }
});
