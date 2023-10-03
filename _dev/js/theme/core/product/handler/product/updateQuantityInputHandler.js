import prestashop from 'prestashop';
import productEventContextSelector from '../../utils/productEventContextSelector';

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
  const contextElement = document.querySelector(productEventContextSelector());

  if (!Number.isNaN(minimalProductQuantity) && eventType !== 'updatedProductQuantity') {
    const newQtyInput = contextElement.querySelector(`${prestashop.selectors.product.actions} ${prestashop.selectors.quantityWanted}`);
    newQtyInput.value = minimalProductQuantity;
  }
};

export default updateQuantityInputHandler;
