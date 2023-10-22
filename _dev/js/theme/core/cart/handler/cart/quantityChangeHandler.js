import prestashop from 'prestashop';
import quantityChangeRequest from '../../request/cart/quantityChangeRequest';
import cartStateStore from '../../store/cartStateStore';

const { setIsUpdateOperation, setHasError, setErrorMsg } = cartStateStore();

/**
 * Handles the change in quantity for a product in the cart.
 * @param {string} operation - The type of quantity change ('increase' or 'decrease').
 * @param {number} qtyDifference - The quantity difference.
 * @param {HTMLElement} input - The input element triggering the quantity change.
 * @throws {Error} Will throw an error if required data is missing or if an error occurs during the quantity change process.
 * @returns {Promise<void>} - A Promise that resolves once the quantity change process is complete.
 */
const quantityChangeHandler = async (operation, qtyDifference, input) => {
  const { dataset } = input;
  const { productAttributeId, productId, customizationId } = dataset;

  const simpleOperation = operation === 'decrease' ? 'down' : 'up';

  document.querySelector('body').classList.add('cart-loading');

  const payload = {
    qty: qtyDifference,
    id_product: Number.parseInt(productId, 10),
    id_product_attribute: Number.parseInt(productAttributeId, 10),
    id_customization: Number.parseInt(customizationId, 10),
    op: simpleOperation,
  };

  const { getRequest } = quantityChangeRequest(payload);

  try {
    const resp = await getRequest();

    const {
      errors = '',
      hasError = false,
    } = resp;

    setIsUpdateOperation(true);
    setHasError(hasError);
    setErrorMsg(errors);

    if (!resp.hasError) {
      prestashop.emit('updateCart', {
        reason: dataset || resp,
        resp,
      });
    } else {
      prestashop.emit('handleError', {
        eventType: 'updateProductQuantityInCart',
        resp,
      });
    }
  } catch (error) {
    prestashop.emit('handleError', {
      eventType: 'updateProductQuantityInCart',
      resp: {},
      error,
    });
  }

  document.querySelector('body').classList.remove('cart-loading');
};

export default quantityChangeHandler;
