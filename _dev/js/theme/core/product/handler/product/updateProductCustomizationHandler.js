import prestashop from 'prestashop';
import productEventContextSelector from '../../utils/productEventContextSelector';

/**
 * Handles the update of the product customization input value based on the provided event type and data.
 *
 * @param {string} eventType - Type of the event.
 * @param {object} eventData - Data associated with the event.
 * @param {number} eventData.id_customization - Customization ID.
 * @returns {void}
 * @sideEffect Updates the product customization input value.
 */
const updateProductCustomizationHandler = (eventType, { id_customization: idCustomization }) => {
  const contextElement = document.querySelector(productEventContextSelector());
  const customizationIdInput = contextElement.querySelector(prestashop.selectors.cart.productCustomizationId);

  // Refill customizationId input value when updating quantity or combination
  if (
    (eventType === 'updatedProductQuantity' || eventType === 'updatedProductCombination')
    && idCustomization
  ) {
    if (customizationIdInput) {
      customizationIdInput.value = idCustomization;
    }
  } else if (customizationIdInput) {
    customizationIdInput.value = 0;
  }
};

export default updateProductCustomizationHandler;
