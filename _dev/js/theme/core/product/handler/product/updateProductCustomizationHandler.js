import prestashop from 'prestashop';

const updateProductCustomizationHandler = (eventType, { id_customization: idCustomization }) => {
  const customizationIdInput = document.querySelector(prestashop.selectors.cart.productCustomizationId);

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
