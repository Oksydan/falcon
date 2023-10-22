import prestashop from 'prestashop';
import deleteVoucherFromCartRequest from '../../request/voucher/deleteVoucherFromCartRequest';

/**
 * Delete voucher handler
 * @param event {object} - click event
 * @returns {Promise<void>}
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
