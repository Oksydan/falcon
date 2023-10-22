import prestashop from 'prestashop';
import productEventContextSelector from '../../utils/productEventContextSelector';

/**
 * Updates the quantity input value based on the event data.
 *
 * @param {string} eventType - The type of the event.
 * @param {object} event - The event data.
 * @param {number} event.product_minimal_quantity - The product minimal quantity.
 */
const updateQuantityInputHandler = (eventType, { product_minimal_quantity: productMinimalQuantity }) => {
  const minimalProductQuantity = parseInt(productMinimalQuantity, 10);
  const contextElement = document.querySelector(productEventContextSelector());

  if (!Number.isNaN(minimalProductQuantity) && eventType !== 'updatedProductQuantity') {
    const newQtyInput = contextElement.querySelector(`${prestashop.selectors.product.actions} ${prestashop.selectors.quantityWanted}`);
    newQtyInput.value = minimalProductQuantity;
  }
};

export default updateQuantityInputHandler;
