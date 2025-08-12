/**
 * Navigation management module
 * Handles mobile burger menu and smooth scrolling for internal anchors
 */

import { safeGetElementById, safeQuerySelectorAll, safeAddEventListener } from '../utils/dom.js';

/**
 * Initialize mobile burger menu functionality
 * @returns {boolean} - Success status
 */
export const initBurgerMenu = () => {
  const burger = safeGetElementById('burger', true);
  const navbar = safeGetElementById('navbar', true);
  
  if (!burger || !navbar) {
    console.warn('Burger menu elements not found - skipping initialization');
    return false;
  }

  safeAddEventListener(burger, 'click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!expanded));
    navbar.classList.toggle('nav-open');
  });

  return true;
};

/**
 * Close mobile navigation menu
 * @returns {boolean} - Success status
 */
const closeMobileNav = () => {
  const navbar = safeGetElementById('navbar', true);
  const burger = safeGetElementById('burger', true);
  
  if (navbar && navbar.classList.contains('nav-open')) {
    navbar.classList.remove('nav-open');
    burger?.setAttribute('aria-expanded', 'false');
    return true;
  }
  return false;
};

/**
 * Set active state for navigation link
 * @param {HTMLElement} activeLink - Link to set as active
 */
const setActiveNavLink = (activeLink) => {
  // Remove active class from all nav links
  const navLinks = safeQuerySelectorAll('.nav-links a');
  navLinks.forEach(link => link.classList.remove('active'));
  
  // Add active class to current link
  activeLink.classList.add('active');
};

/**
 * Initialize smooth scrolling for internal anchor links
 * @returns {boolean} - Success status
 */
export const initSmoothScroll = () => {
  const anchorLinks = safeQuerySelectorAll('a[href^="#"]');
  
  if (anchorLinks.length === 0) {
    console.warn('No internal anchor links found - skipping smooth scroll initialization');
    return false;
  }

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = safeGetElementById(targetId, true);
      
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
        
        // Close mobile nav after click
        closeMobileNav();
        
        // Set active state
        setActiveNavLink(link);
      }
    });
  });

  return true;
};

/**
 * Initialize all navigation functionality
 * @returns {void}
 */
export const initNavigation = () => {
  const burgerSuccess = initBurgerMenu();
  const scrollSuccess = initSmoothScroll();
  
  console.log('Navigation initialized:', {
    burger: burgerSuccess,
    smoothScroll: scrollSuccess
  });
};