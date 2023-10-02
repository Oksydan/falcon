import prestashop from 'prestashop';

const handleUpdateCart = (event) => {
  if (!event || !event.reason || event.reason.linkAction !== 'add-to-cart') {
    return;
  }

  const quantityInput = document.querySelector('#quantity_wanted');
  // Force value to 1, it will automatically trigger updateProduct and reset the appropriate min value if needed

  if (quantityInput) {
    quantityInput.value = 1;
  }
};

const attachEventListeners = () => {
  prestashop.on('updateCart', handleUpdateCart);
  // Refresh all the product content
};

const updateProduct = () => {
  attachEventListeners();
};

export default updateProduct;
