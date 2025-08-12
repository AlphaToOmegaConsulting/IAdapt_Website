/**
 * Page Router module
 * Handles conditional loading of page-specific JavaScript modules
 * Based on body class detection
 */

/**
 * Map of page classes to their corresponding modules
 * Add new page mappings here as the application grows
 */
const pageModules = {
  'page-entreprises': () => import('../pages/entreprises.js'),
  'page-home': () => import('../pages/shared.js'),
  'page-applications': () => import('../pages/shared.js'),
  'page-contact': () => import('../pages/shared.js')
};

/**
 * Get current page identifier from body classes
 * @returns {string|null} - Page identifier or null if not found
 */
const getCurrentPageId = () => {
  const body = document.body;
  const pageClasses = Object.keys(pageModules);
  
  for (const pageClass of pageClasses) {
    if (body.classList.contains(pageClass)) {
      return pageClass;
    }
  }
  
  return null;
};

/**
 * Load and initialize page-specific module
 * @param {string} pageId - Page identifier
 * @returns {Promise<boolean>} - Success status
 */
const loadPageModule = async (pageId) => {
  try {
    const moduleLoader = pageModules[pageId];
    if (!moduleLoader) {
      console.warn(`No module found for page: ${pageId}`);
      return false;
    }

    const module = await moduleLoader();
    
    // Initialize page-specific functionality
    switch (pageId) {
      case 'page-entreprises':
        if (module.initEntreprisesFilters) {
          module.initEntreprisesFilters();
        }
        break;
      
      case 'page-home':
      case 'page-applications':
      case 'page-contact':
        if (module.initSharedFeatures) {
          module.initSharedFeatures();
        }
        break;
      
      default:
        console.log(`Page module loaded for: ${pageId}`);
    }
    
    return true;
  } catch (error) {
    console.error(`Failed to load module for page ${pageId}:`, error);
    return false;
  }
};

/**
 * Initialize the page router
 * Detects current page and loads appropriate modules
 * @returns {Promise<void>}
 */
export const initPageRouter = async () => {
  const pageId = getCurrentPageId();
  
  if (!pageId) {
    console.log('No specific page detected - using default behavior');
    return;
  }
  
  console.log(`Loading modules for page: ${pageId}`);
  const success = await loadPageModule(pageId);
  
  if (success) {
    console.log(`✅ Page modules loaded successfully for: ${pageId}`);
  } else {
    console.warn(`❌ Failed to load modules for: ${pageId}`);
  }
};

/**
 * Add new page module mapping
 * @param {string} pageClass - CSS class that identifies the page
 * @param {Function} moduleLoader - Dynamic import function for the module
 */
export const addPageModule = (pageClass, moduleLoader) => {
  pageModules[pageClass] = moduleLoader;
  console.log(`Added page module mapping: ${pageClass}`);
};