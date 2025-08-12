/**
 * Main JavaScript entry point
 * Blog IA - Modular ES6 Architecture
 * 
 * Coordinates initialization of all application modules
 * Replaces the previous monolithic app.js file
 */

import { loadPartials } from './modules/partials.js';
import { initNavigation } from './modules/navigation.js';
import { initAnimations } from './modules/animations.js';
import { initPageRouter } from './utils/page-router.js';

/**
 * Initialize core application functionality
 * @returns {Promise<void>}
 */
const initializeApp = async () => {
  console.log('🚀 Initializing Blog IA application...');
  
  try {
    // Load partials first (header/footer)
    console.log('📄 Loading partials...');
    await loadPartials();
    
    // Initialize navigation after partials are loaded
    console.log('🧭 Initializing navigation...');
    initNavigation();
    
    // Initialize animations
    console.log('✨ Initializing animations...');
    initAnimations();
    
    // Initialize page-specific modules
    console.log('📱 Loading page-specific modules...');
    await initPageRouter();
    
    console.log('✅ Application initialized successfully!');
    
  } catch (error) {
    console.error('❌ Application initialization failed:', error);
  }
};

/**
 * Application startup
 * Wait for DOM to be ready before initializing
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('📋 DOM Content Loaded - Starting application...');
  initializeApp();
});

/**
 * Handle page visibility changes for potential optimizations
 */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('👁️ Page hidden - potential cleanup opportunity');
  } else {
    console.log('👁️ Page visible - resuming normal operations');
  }
});

/**
 * Global error handler for uncaught errors
 */
window.addEventListener('error', (event) => {
  console.error('🚨 Global error caught:', event.error);
});

/**
 * Global error handler for unhandled promise rejections
 */
window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Unhandled promise rejection:', event.reason);
  event.preventDefault(); // Prevent default browser error handling
});

console.log('📦 Main module loaded - waiting for DOM ready...');