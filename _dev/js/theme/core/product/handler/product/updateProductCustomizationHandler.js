import prestashop from 'prestashop';
import productEventContextSelector from "../../utils/productEventContextSelector";

/**
 * Update product customization input value
 * Side effect: update product customization input value
 * @param eventType {string} - event type
 * @param eventData {object} - event data
 * @param eventData.id_customization {number} - customization id
 * @return {void}
 */
const updateProductCustomizationHandler = (eventType, { id_customization: idCustomization }) => {
  const contextElement = document.querySelector(productEventContextSelector());
  const customizationIdInput = contextElement.querySelector(prestashop.selectors.cart.productCustomizationId);

  // refill customizationId input value when updating quantity or combination
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
