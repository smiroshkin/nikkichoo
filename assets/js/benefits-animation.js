/**
 * Benefits Section Animation Controller
 * Handles advanced animations, interactions and performance optimization
 * Compatible with modern browsers and provides fallbacks
 * 
 * @author NikkiChoo Development Team
 * @version 1.0.0
 * @requires ScrollReveal (optional)
 */

class BenefitsAnimationController {
    constructor() {
        this.benefitsSection = null;
        this.benefitsCards = [];
        this.observer = null;
        this.isAnimated = false;
        this.animationDelay = 100;
        
        this.init();
    }
    
    /**
     * Initialize the benefits animation controller
     */
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    /**
     * Setup all components and event listeners
     */
    setup() {
        try {
            this.benefitsSection = document.getElementById('benefits');
            
            if (!this.benefitsSection) {
                console.warn('Benefits section not found');
                return;
            }
            
            this.benefitsCards = Array.from(this.benefitsSection.querySelectorAll('.benefits-card'));
            
            if (this.benefitsCards.length === 0) {
                console.warn('No benefits cards found');
                return;
            }
            
            this.setupIntersectionObserver();
            this.bindEvents();
            this.setupAccessibility();
            this.initScrollRevealIfAvailable();
            
            console.log('Benefits animation controller initialized successfully');
            
        } catch (error) {
            console.error('Error initializing benefits animation:', error);
        }
    }
    
    /**
     * Setup Intersection Observer for performance-optimized animations
     */
    setupIntersectionObserver() {
        // Check if Intersection Observer is supported
        if (!('IntersectionObserver' in window)) {
            // Fallback: animate immediately
            this.animateCards();
            return;
        }
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '50px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isAnimated) {
                    this.animateCards();
                    this.isAnimated = true;
                    // Disconnect observer after first animation
                    this.observer.disconnect();
                }
            });
        }, observerOptions);
        
        this.observer.observe(this.benefitsSection);
    }
    
    /**
     * Animate benefits cards with staggered timing
     */
    animateCards() {
        this.benefitsCards.forEach((card, index) => {
            // Add loading class for initial state
            card.classList.add('loading');
            
            // Staggered animation
            setTimeout(() => {
                card.classList.remove('loading');
                card.classList.add('aos-animate');
                
                // Add focus capability
                card.setAttribute('tabindex', '0');
                
                // Trigger custom event
                this.triggerCustomEvent('cardAnimated', { card, index });
                
            }, this.animationDelay * (index + 1));
        });
        
        // Trigger section animated event
        setTimeout(() => {
            this.triggerCustomEvent('sectionAnimated', { section: this.benefitsSection });
        }, this.animationDelay * this.benefitsCards.length + 200);
    }
    
    /**
     * Bind interactive event listeners
     */
    bindEvents() {
        this.benefitsCards.forEach((card, index) => {
            // Mouse events
            card.addEventListener('mouseenter', (e) => this.handleCardHover(e, true));
            card.addEventListener('mouseleave', (e) => this.handleCardHover(e, false));
            
            // Click events
            card.addEventListener('click', (e) => this.handleCardClick(e, index));
            
            // Keyboard events
            card.addEventListener('keydown', (e) => this.handleCardKeydown(e, index));
            
            // Focus events
            card.addEventListener('focus', (e) => this.handleCardFocus(e, true));
            card.addEventListener('blur', (e) => this.handleCardFocus(e, false));
        });
        
        // Resize handler with throttling
        window.addEventListener('resize', this.throttle(() => {
            this.handleResize();
        }, 250));
    }
    
    /**
     * Handle card hover interactions
     */
    handleCardHover(event, isEntering) {
        const card = event.currentTarget;
        const icon = card.querySelector('.benefits-card__icon');
        
        if (isEntering) {
            // Add hover class for additional styling if needed
            card.classList.add('hovered');
            
            // Animate icon with slight delay
            setTimeout(() => {
                if (icon && card.classList.contains('hovered')) {
                    icon.style.transform = 'scale(1.1)';
                }
            }, 50);
            
        } else {
            card.classList.remove('hovered');
            
            if (icon) {
                icon.style.transform = '';
            }
        }
    }
    
    /**
     * Handle card click interactions
     */
    handleCardClick(event, index) {
        const card = event.currentTarget;
        
        // Add click animation
        card.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // Trigger custom event
        this.triggerCustomEvent('cardClicked', { 
            card, 
            index, 
            title: card.querySelector('.benefits-card__title')?.textContent 
        });
        
        // Optional: Add analytics tracking here
        this.trackInteraction('card_click', index);
    }
    
    /**
     * Handle keyboard navigation
     */
    handleCardKeydown(event, index) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.handleCardClick(event, index);
        }
    }
    
    /**
     * Handle focus states
     */
    handleCardFocus(event, isFocused) {
        const card = event.currentTarget;
        
        if (isFocused) {
            card.classList.add('focused');
        } else {
            card.classList.remove('focused');
        }
    }
    
    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        this.benefitsCards.forEach((card, index) => {
            // Add ARIA attributes
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', 
                `Преимущество ${index + 1}: ${card.querySelector('.benefits-card__title')?.textContent}`
            );
            
            // Add description for screen readers
            const description = card.querySelector('.benefits-card__description')?.textContent;
            if (description) {
                card.setAttribute('aria-description', description);
            }
        });
    }
    
    /**
     * Initialize ScrollReveal if available
     */
    initScrollRevealIfAvailable() {
        if (typeof ScrollReveal !== 'undefined') {
            const sr = ScrollReveal({
                origin: 'bottom',
                distance: '30px',
                duration: 800,
                delay: 100,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                reset: false
            });
            
            // Apply ScrollReveal to cards with staggered delays
            this.benefitsCards.forEach((card, index) => {
                sr.reveal(card, { delay: 100 + (index * 100) });
            });
        }
    }
    
    /**
     * Handle window resize
     */
    handleResize() {
        // Recalculate card positions if needed
        this.benefitsCards.forEach(card => {
            // Reset any inline styles that might be affected by resize
            if (card.style.transform && !card.classList.contains('hovered')) {
                card.style.transform = '';
            }
        });
    }
    
    /**
     * Trigger custom events for external integrations
     */
    triggerCustomEvent(eventName, detail) {
        const event = new CustomEvent(`benefits:${eventName}`, {
            detail,
            bubbles: true,
            cancelable: true
        });
        
        this.benefitsSection.dispatchEvent(event);
    }
    
    /**
     * Track user interactions (placeholder for analytics)
     */
    trackInteraction(action, cardIndex) {
        // Placeholder for analytics integration
        console.log(`Benefits interaction: ${action} on card ${cardIndex}`);
        
        // Example integration with Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: 'benefits_section',
                event_label: `card_${cardIndex}`,
                value: cardIndex
            });
        }
    }
    
    /**
     * Utility function for throttling
     */
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    /**
     * Public API methods
     */
    
    /**
     * Manually trigger animation
     */
    animate() {
        if (!this.isAnimated) {
            this.animateCards();
        }
    }
    
    /**
     * Reset animations
     */
    reset() {
        this.isAnimated = false;
        this.benefitsCards.forEach(card => {
            card.classList.remove('aos-animate', 'loading', 'hovered', 'focused');
            card.style.transform = '';
        });
    }
    
    /**
     * Destroy the controller and clean up
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        
        // Remove event listeners
        this.benefitsCards.forEach(card => {
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
        });
        
        window.removeEventListener('resize', this.handleResize);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Create global instance
    window.benefitsController = new BenefitsAnimationController();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BenefitsAnimationController;
}
