import prestashop from 'prestashop';

/**
 * Click handler for the quick view button.
 * Side effect: Emits 'clickQuickView' event on the prestashop object.
 *
 * @param {Event} event - The click event.
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
