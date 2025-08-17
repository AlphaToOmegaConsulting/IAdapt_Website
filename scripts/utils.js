/**
 * IAdapt Blog IA - Utilities JavaScript
 * Utilitaires partagés pour éviter la duplication de code
 */

(function() {
    'use strict';

    /**
     * Utilitaire de debounce
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Utilitaire de throttle
     */
    function throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Sélecteur DOM sécurisé
     */
    function safeGetElement(selector, required = false) {
        const element = document.querySelector(selector);
        if (!element && required) {
            console.warn(`Required element '${selector}' not found`);
        }
        return element;
    }

    /**
     * Sélecteur DOM multiple sécurisé
     */
    function safeGetElements(selector) {
        return document.querySelectorAll(selector);
    }

    /**
     * Factory pour créer des IntersectionObserver configurables
     */
    function createObserver(callback, options = {}) {
        const defaultOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observerOptions = { ...defaultOptions, ...options };
        
        if ('IntersectionObserver' in window) {
            return new IntersectionObserver(callback, observerOptions);
        }
        return null;
    }

    /**
     * Smooth scroll vers un élément
     */
    function smoothScrollTo(target, offset = 0) {
        const element = typeof target === 'string' ? safeGetElement(target) : target;
        if (element) {
            const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    /**
     * Animation manager pour gérer les animations d'entrée
     */
    const AnimationManager = {
        init() {
            this.observer = createObserver(this.handleIntersection.bind(this));
            if (this.observer) {
                this.observeElements();
            }
        },

        handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    this.observer.unobserve(entry.target);
                }
            });
        },

        observeElements() {
            const elements = safeGetElements('[data-animate]');
            elements.forEach(el => this.observer.observe(el));
        }
    };

    // Export vers l'objet global
    window.IAdaptUtils = {
        debounce,
        throttle,
        safeGetElement,
        safeGetElements,
        createObserver,
        smoothScrollTo,
        AnimationManager
    };

    console.log('🔧 IAdapt Utils loaded');

})();