/**
 * Check if quick view is open
 * @returns {boolean}
 */
const isQuickViewOpen = () => !!document.querySelector('.modal.quickview.in');

export default isQuickViewOpen;
