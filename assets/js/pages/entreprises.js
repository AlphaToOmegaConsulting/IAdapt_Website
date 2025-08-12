/**
 * Entreprises page filtering functionality
 * Handles client-side filtering for entreprises grid (formerly posts)
 */

import { safeGetElementById, safeQuerySelectorAll } from '../utils/dom.js';

/**
 * Handle filter chip click event
 * @param {HTMLElement} activeChip - The clicked filter chip
 * @param {NodeList} allChips - All filter chips
 * @param {HTMLElement} grid - The entreprises grid element
 */
const handleFilterClick = (activeChip, allChips, grid) => {
  // Remove active class from all chips
  allChips.forEach(chip => chip.classList.remove('active'));
  
  // Add active class to clicked chip
  activeChip.classList.add('active');
  
  // Get filter category
  const category = activeChip.getAttribute('data-filter');
  
  // Filter grid items
  const cards = grid.querySelectorAll('.card');
  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-cat') || 'all';
    const shouldShow = category === 'all' || cardCategory === category;
    card.style.display = shouldShow ? '' : 'none';
  });
  
  console.log(`Filtered entreprises by category: ${category}`);
};

/**
 * Initialize entreprises filtering functionality
 * @returns {boolean} - Success status
 */
export const initEntreprisesFilters = () => {
  const filterChips = safeQuerySelectorAll('.filters .chip');
  const grid = safeGetElementById('entreprises-grid', true) || 
               safeGetElementById('post-grid', true); // Backward compatibility
  
  if (filterChips.length === 0 || !grid) {
    console.warn('Entreprises filter elements not found - skipping initialization');
    return false;
  }

  // Add click listeners to filter chips
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      handleFilterClick(chip, filterChips, grid);
    });
  });

  console.log(`Initialized entreprises filters with ${filterChips.length} categories`);
  return true;
};

/**
 * Reset filters to show all items
 * @returns {boolean} - Success status
 */
export const resetEntreprisesFilters = () => {
  const allChip = document.querySelector('.filters .chip[data-filter="all"]');
  if (allChip) {
    allChip.click();
    return true;
  }
  return false;
};