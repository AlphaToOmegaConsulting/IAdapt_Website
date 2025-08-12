/**
 * Shared page functionality
 * Common utilities and functions used across multiple pages
 */

import { safeGetElementById, safeQuerySelectorAll } from '../utils/dom.js';

/**
 * Initialize common page functionality
 * @returns {boolean} - Success status
 */
export const initSharedFeatures = () => {
  console.log('Shared page features initialized');
  return true;
};

/**
 * Show/hide loading state on elements
 * @param {string|HTMLElement} target - Element ID or element itself
 * @param {boolean} isLoading - Loading state
 */
export const setLoadingState = (target, isLoading) => {
  const element = typeof target === 'string' ? safeGetElementById(target, true) : target;
  if (!element) return;
  
  if (isLoading) {
    element.classList.add('loading');
    element.setAttribute('aria-busy', 'true');
  } else {
    element.classList.remove('loading');
    element.setAttribute('aria-busy', 'false');
  }
};

/**
 * Utility to debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Utility to throttle function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Scroll to top utility
 * @param {boolean} smooth - Use smooth scrolling
 */
export const scrollToTop = (smooth = true) => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
};