import prestashop from 'prestashop';
import quantityChangeRequest from '../../request/cart/quantityChangeRequest';
import useAlertToast from '../../../../components/useAlertToast';
import cartStateStore from '../../store/cartStateStore';

const { danger } = useAlertToast();

const { setIsUpdateOperation, setHasError, setErrorMsg } = cartStateStore();

/**
 * @param {string} operation - increase|decrease
 * @param {number} qtyDifference - quantity difference
 * @param {HTMLElement} input - input element
 * @returns {Promise<void>}
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
    danger(error.message);
  }

  document.querySelector('body').classList.remove('cart-loading');
};

export default quantityChangeHandler;
