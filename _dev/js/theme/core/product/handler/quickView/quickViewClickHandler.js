import prestashop from 'prestashop';

/**
 * Quick view btn click handler
 * SideEffect: emit event on prestashop object clickViewOpen
 * @param event {Event} - click event
 */
const quickViewClickHandler = async (event) => {
  event.preventDefault();
  const miniature = event.target.closest(prestashop.selectors.product.miniature);
  const dataset = miniature?.dataset || {};
  const idProduct = dataset?.idProduct || 0;
  const idProductAttribute = dataset?.idProductAttribute || 0;

  prestashop.emit('clickQuickView', {
    dataset,
    idProduct,
    idProductAttribute,
  });
};

export default quickViewClickHandler;
