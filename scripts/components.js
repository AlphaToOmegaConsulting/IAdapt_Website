/**
 * IAdapt Blog IA - Components JavaScript
 * Logique des composants: accordéons et autres composants interactifs
 */

(function() {
    'use strict';

    // Attendre que l'app principale soit chargée
    function waitForApp() {
        if (typeof window.IAdaptApp !== 'undefined' && window.IAdaptApp.elements) {
            initComponents();
        } else {
            setTimeout(waitForApp, 50);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', waitForApp);
    } else {
        waitForApp();
    }

    function initComponents() {
        console.log('🎛️ Initializing components...');
        
        // Initialiser les accordéons
        AccordionComponent.init();
        
        // Initialiser les filtres si présents
        FilterComponent.init();
        
        console.log('✅ All components initialized!');
    }

    /**
     * Composant Accordéon
     */
    const AccordionComponent = {
        init() {
            const accordions = window.IAdaptUtils.safeGetElements('.accordion');
            
            accordions.forEach(accordion => {
                this.setupAccordion(accordion);
            });
            
            if (accordions.length > 0) {
                console.log(`🪗 ${accordions.length} accordion(s) initialized`);
            }
        },

        setupAccordion(accordion) {
            const triggers = accordion.querySelectorAll('.accordion__trigger');
            
            triggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleItem(trigger);
                });
                
                // Support clavier
                trigger.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.toggleItem(trigger);
                    }
                });
            });
        },

        toggleItem(trigger) {
            const item = trigger.closest('.accordion__item');
            const content = item.querySelector('.accordion__content');
            const isOpen = item.classList.contains('accordion__item--open');
            
            // Fermer tous les autres éléments du même accordéon (comportement exclusif)
            const accordion = item.closest('.accordion');
            const allItems = accordion.querySelectorAll('.accordion__item');
            allItems.forEach(otherItem => {
                if (otherItem !== item) {
                    this.closeItem(otherItem);
                }
            });
            
            // Toggle l'élément courant
            if (isOpen) {
                this.closeItem(item);
            } else {
                this.openItem(item);
            }
        },

        openItem(item) {
            const content = item.querySelector('.accordion__content');
            const body = item.querySelector('.accordion__body');
            
            item.classList.add('accordion__item--open');
            
            // Calculer la hauteur pour l'animation
            const height = body.offsetHeight;
            content.style.maxHeight = height + 'px';
            
            // Trigger reflow pour l'animation
            content.offsetHeight;
        },

        closeItem(item) {
            const content = item.querySelector('.accordion__content');
            
            item.classList.remove('accordion__item--open');
            content.style.maxHeight = '0px';
        }
    };

    /**
     * Composant Filtres (pour les pages avec filtres)
     */
    const FilterComponent = {
        init() {
            const filterContainers = window.IAdaptUtils.safeGetElements('.filters');
            
            filterContainers.forEach(container => {
                this.setupFilters(container);
            });
            
            if (filterContainers.length > 0) {
                console.log(`🔍 ${filterContainers.length} filter(s) initialized`);
            }
        },

        setupFilters(container) {
            const chips = container.querySelectorAll('.chip');
            
            chips.forEach(chip => {
                chip.addEventListener('click', () => {
                    this.toggleFilter(chip, chips);
                });
            });
        },

        toggleFilter(activeChip, allChips) {
            // Retirer la classe active de tous les chips
            allChips.forEach(chip => chip.classList.remove('active'));
            
            // Activer le chip cliqué
            activeChip.classList.add('active');
            
            // Ici, vous pouvez ajouter la logique de filtrage
            const filterValue = activeChip.dataset.filter;
            this.applyFilter(filterValue);
        },

        applyFilter(filterValue) {
            // Logique de filtrage (à adapter selon vos besoins)
            console.log(`Filtering by: ${filterValue}`);
            
            // Exemple: filtrer les cartes
            const cards = window.IAdaptUtils.safeGetElements('.card[data-category]');
            cards.forEach(card => {
                const category = card.dataset.category;
                const shouldShow = filterValue === 'all' || category === filterValue;
                
                card.style.display = shouldShow ? 'block' : 'none';
            });
        }
    };

    // Export vers l'objet global
    window.IAdaptComponents = {
        AccordionComponent,
        FilterComponent
    };

})();