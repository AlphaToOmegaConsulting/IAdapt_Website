/**
 * DOM utilities for safe element manipulation
 * Provides secure helpers to avoid null reference errors
 */

/**
 * Safely get element by ID with optional error logging
 * @param {string} id - Element ID to find
 * @param {boolean} silent - Skip console warning if element not found
 * @returns {HTMLElement|null} - Element or null if not found
 */
export const safeGetElementById = (id, silent = false) => {
  const element = document.getElementById(id);
  if (!element && !silent) {
    console.warn(`Element with ID '${id}' not found`);
  }
  return element;
};

/**
 * Safely query selector with optional error logging
 * @param {string} selector - CSS selector
 * @param {boolean} silent - Skip console warning if element not found
 * @returns {HTMLElement|null} - Element or null if not found
 */
export const safeQuerySelector = (selector, silent = false) => {
  const element = document.querySelector(selector);
  if (!element && !silent) {
    console.warn(`Element with selector '${selector}' not found`);
  }
  return element;
};

/**
 * Safely query all elements with selector
 * @param {string} selector - CSS selector
 * @returns {NodeList} - NodeList (empty if none found)
 */
export const safeQuerySelectorAll = (selector) => {
  return document.querySelectorAll(selector);
};

/**
 * Add event listener with element existence check
 * @param {string|HTMLElement} target - Element ID or element itself
 * @param {string} event - Event type
 * @param {Function} handler - Event handler
 * @param {Object} options - Event listener options
 * @returns {boolean} - Success status
 */
export const safeAddEventListener = (target, event, handler, options = {}) => {
  const element = typeof target === 'string' ? safeGetElementById(target, true) : target;
  if (!element) {
    console.warn(`Cannot add ${event} listener: target not found`);
    return false;
  }
  element.addEventListener(event, handler, options);
  return true;
};

/**
 * Toggle class on element with existence check
 * @param {string|HTMLElement} target - Element ID or element itself
 * @param {string} className - Class to toggle
 * @returns {boolean} - Success status
 */
export const safeToggleClass = (target, className) => {
  const element = typeof target === 'string' ? safeGetElementById(target, true) : target;
  if (!element) {
    console.warn(`Cannot toggle class '${className}': target not found`);
    return false;
  }
  element.classList.toggle(className);
  return true;
};