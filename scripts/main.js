/**
 * IAdapt Blog IA - Main JavaScript
 * Initialisation de l'application
 */

(function() {
    'use strict';

    // Configuration de l'application
    const CONFIG = {
        // Sélecteurs DOM
        selectors: {
            navbar: '.navbar',
            burger: '.burger',
            navLinks: '.nav-links',
            navLinksAll: '.nav-links a',
            skipLink: '.skip-link'
        },
        
        // Classes CSS
        classes: {
            navOpen: 'nav-open',
            navLinkActive: 'active'
        },
        
        // Options
        options: {
            scrollThreshold: 50,
            debounceDelay: 16
        }
    };

    // État de l'application
    const STATE = {
        isNavOpen: false,
        currentPage: '',
        scrolled: false
    };

    // Éléments DOM
    const ELEMENTS = {};

    /**
     * Initialisation des éléments DOM
     */
    function initElements() {
        const { selectors } = CONFIG;
        
        ELEMENTS.navbar = window.IAdaptUtils.safeGetElement(selectors.navbar);
        ELEMENTS.burger = window.IAdaptUtils.safeGetElement(selectors.burger);
        ELEMENTS.navLinks = window.IAdaptUtils.safeGetElement(selectors.navLinks);
        ELEMENTS.navLinksAll = window.IAdaptUtils.safeGetElements(selectors.navLinksAll);
        ELEMENTS.skipLink = window.IAdaptUtils.safeGetElement(selectors.skipLink);

        console.log('📱 DOM elements initialized');
    }

    /**
     * Gestionnaire de navigation mobile
     */
    function initMobileNav() {
        if (!ELEMENTS.burger || !ELEMENTS.navbar) return;

        ELEMENTS.burger.addEventListener('click', toggleMobileNav);
        
        // Fermer le menu en cliquant sur un lien
        ELEMENTS.navLinksAll.forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });

        // Fermer le menu avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && STATE.isNavOpen) {
                closeMobileNav();
            }
        });

        console.log('📱 Mobile navigation initialized');
    }

    /**
     * Toggle du menu mobile
     */
    function toggleMobileNav() {
        STATE.isNavOpen = !STATE.isNavOpen;
        ELEMENTS.navbar.classList.toggle(CONFIG.classes.navOpen, STATE.isNavOpen);
        
        // Gestion de l'accessibilité
        ELEMENTS.burger.setAttribute('aria-expanded', STATE.isNavOpen);
        
        // Focus management
        if (STATE.isNavOpen && ELEMENTS.navLinksAll.length > 0) {
            ELEMENTS.navLinksAll[0].focus();
        }
    }

    /**
     * Fermer le menu mobile
     */
    function closeMobileNav() {
        if (STATE.isNavOpen) {
            STATE.isNavOpen = false;
            ELEMENTS.navbar.classList.remove(CONFIG.classes.navOpen);
            ELEMENTS.burger.setAttribute('aria-expanded', 'false');
        }
    }

    /**
     * Gestion du scroll
     */
    function initScrollHandling() {
        const handleScroll = window.IAdaptUtils.throttle(() => {
            const scrolled = window.scrollY > CONFIG.options.scrollThreshold;
            
            if (scrolled !== STATE.scrolled) {
                STATE.scrolled = scrolled;
                if (ELEMENTS.navbar) {
                    ELEMENTS.navbar.classList.toggle('scrolled', scrolled);
                }
            }
        }, CONFIG.options.debounceDelay);

        window.addEventListener('scroll', handleScroll);
        console.log('📜 Scroll handling initialized');
    }

    /**
     * Smooth scroll pour les liens d'ancrage
     */
    function initSmoothScroll() {
        const anchorLinks = window.IAdaptUtils.safeGetElements('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    e.preventDefault();
                    window.IAdaptUtils.smoothScrollTo(href, 80);
                    closeMobileNav();
                }
            });
        });

        console.log('🎯 Smooth scroll initialized');
    }

    /**
     * Détection de la page actuelle
     */
    function detectCurrentPage() {
        const body = document.body;
        const classList = Array.from(body.classList);
        const pageClass = classList.find(cls => cls.startsWith('page-'));
        
        if (pageClass) {
            STATE.currentPage = pageClass.replace('page-', '');
            console.log(`📍 Current page detected: ${STATE.currentPage}`);
        }
    }

    /**
     * Initialisation des animations
     */
    function initAnimations() {
        if (window.IAdaptUtils.AnimationManager) {
            window.IAdaptUtils.AnimationManager.init();
            console.log('✨ Animations initialized');
        }
    }

    /**
     * Initialisation de l'accessibilité
     */
    function initAccessibility() {
        // Skip link focus
        if (ELEMENTS.skipLink) {
            ELEMENTS.skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = ELEMENTS.skipLink.getAttribute('href');
                const element = window.IAdaptUtils.safeGetElement(target);
                if (element) {
                    element.focus();
                    element.scrollIntoView();
                }
            });
        }

        console.log('♿ Accessibility features initialized');
    }

    /**
     * Initialisation principale
     */
    function init() {
        console.log('🚀 Initializing IAdapt Blog IA application...');
        
        detectCurrentPage();
        initElements();
        initMobileNav();
        initScrollHandling();
        initSmoothScroll();
        initAnimations();
        initAccessibility();
        
        console.log('✅ IAdapt application initialized successfully!');
    }

    // Export vers l'objet global
    window.IAdaptApp = {
        config: CONFIG,
        state: STATE,
        elements: ELEMENTS,
        init,
        toggleMobileNav,
        closeMobileNav
    };

    // Auto-initialisation
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();