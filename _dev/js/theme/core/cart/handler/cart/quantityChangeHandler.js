import prestashop from 'prestashop';
import quantityChangeRequest from '../../request/cart/quantityChangeRequest';
import useAlertToast from '../../../../components/useAlertToast';

const { danger } = useAlertToast();

/**
 * @param {string} operation - increase|decrease
 * @param {int} qtyDifference - quantity difference
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
