
/**
 * Check if element is visible
 * @param el
 * @returns {boolean}
 */
export const isElementVisible = (el) => !!(
    el.offsetWidth ||
    el.offsetHeight ||
    el.getClientRects().length
);
