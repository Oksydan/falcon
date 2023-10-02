import prestashop from 'prestashop';

/**
 * Update quantity input value
 * @param eventType {string} - event type
 * @param event {object} - event data
 * @param event.product_minimal_quantity {number} - product minimal quantity
 */
const updateQuantityInputHandler = (eventType, { product_minimal_quantity: productMinimalQuantity }) => {
  const minimalProductQuantity = parseInt(
    productMinimalQuantity,
    10,
  );

  if (!Number.isNaN(minimalProductQuantity) && eventType !== 'updatedProductQuantity') {
    const newQtyInput = document.querySelector(`${prestashop.selectors.product.actions} ${prestashop.selectors.quantityWanted}`);
    newQtyInput.value = minimalProductQuantity;
  }
};

export default updateQuantityInputHandler;
