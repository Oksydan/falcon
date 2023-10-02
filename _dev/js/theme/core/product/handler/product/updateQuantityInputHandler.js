import prestashop from 'prestashop';

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
