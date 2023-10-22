import prestashop from 'prestashop';
import deleteVoucherFromCartRequest from '../../request/voucher/deleteVoucherFromCartRequest';

/**
 * Handles the deletion of a voucher from the cart.
 * @param {Event} event - The click event that triggered the deletion.
 * @param {HTMLElement} event.delegateTarget - The target element that was clicked.
 * @throws {Error} Will throw an error if required data is missing or if an error occurs during the deletion process.
 * @returns {Promise<void>} - A Promise that resolves once the deletion process is complete.
 */
const deleteVoucherHandler = async (event) => {
  event.preventDefault();

  const btn = event.delegateTarget;
  const { dataset } = btn;
  const { idDiscount } = dataset;
  const payload = {
    deleteDiscount: Number.parseInt(idDiscount, 10),
  };

  const { getRequest } = deleteVoucherFromCartRequest(payload);

  try {
    const resp = await getRequest();

    if (!resp.hasError) {
      prestashop.emit('updateCart', {
        reason: dataset || resp,
        resp,
      });
    } else {
      prestashop.emit('handleError', {
        eventType: 'deleteVoucherFromCart',
        resp,
      });
    }
  } catch (error) {
    prestashop.emit('handleError', {
      eventType: 'deleteVoucherFromCart',
      resp: {},
      error,
    });
  }
};

export default deleteVoucherHandler;
