/**
 * Checks if the quick view is open.
 *
 * @function
 * @returns {boolean} - True if the quick view is open, otherwise false.
 */
const isQuickViewOpen = () => !!document.querySelector('.modal.quickview.in');

export default isQuickViewOpen;
