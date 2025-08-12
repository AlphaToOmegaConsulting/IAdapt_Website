/**
 * Partials management module
 * Handles dynamic loading of header and footer HTML partials
 */

import { safeGetElementById } from '../utils/dom.js';

/**
 * Load a partial HTML file into a container
 * @param {string} url - Path to the partial file
 * @param {string} containerId - ID of the container element
 * @returns {Promise<boolean>} - Success status
 */
export const loadPartial = async (url, containerId) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load ${url}: ${response.status}`);
    }
    
    const html = await response.text();
    const container = safeGetElementById(containerId, true);
    
    if (container) {
      container.innerHTML = html;
      return true;
    } else {
      console.warn(`Container '${containerId}' not found for partial '${url}'`);
      return false;
    }
  } catch (error) {
    console.error('Error loading partial:', error);
    return false;
  }
};

/**
 * Load all standard partials (header and footer)
 * @returns {Promise<void>}
 */
export const loadPartials = async () => {
  const partials = [
    { url: 'partials/header.html', containerId: 'header-container' },
    { url: 'partials/footer.html', containerId: 'footer-container' }
  ];

  const promises = partials.map(({ url, containerId }) => 
    loadPartial(url, containerId)
  );

  try {
    await Promise.all(promises);
    console.log('All partials loaded successfully');
  } catch (error) {
    console.error('Some partials failed to load:', error);
  }
};