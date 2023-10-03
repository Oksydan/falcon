import prestashop from 'prestashop';
import isQuickViewOpen from './isQuickViewOpen';

const productEventContextSelector = () => {
  const {
    quickViewModal,
    container,
  } = prestashop.selectors.product;

  return isQuickViewOpen() ? quickViewModal : container;
};

export default productEventContextSelector;
