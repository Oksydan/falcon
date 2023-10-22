import prestashop from 'prestashop';
import isQuickViewOpen from './isQuickViewOpen';

/**
 * Returns the appropriate product event context selector based on whether the quick view is open or not.
 *
 * @function
 * @returns {string} - The product event context selector.
 */
const productEventContextSelector = () => {
  const {
    quickViewModal,
    container,
  } = prestashop.selectors.product;

  return isQuickViewOpen() ? quickViewModal : container;
};

export default productEventContextSelector;
