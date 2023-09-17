import prestashop from 'prestashop';
import useAlertToast from '../../../../components/useAlertToast';
import deleteVoucherFromCartRequest from '../../request/deleteVoucherFromCartRequest';

const { danger } = useAlertToast();

const deleteVoucherHandler = async (event) => {
  event.preventDefault();

  const btn = event.currentTarget;
  const { dataset } = btn;
  const { idDiscount } = dataset;
  const url = prestashop.urls.pages.cart;
  const payload = {
    deleteDiscount: idDiscount,
    action: 'update',
    token: prestashop.static_token,
    ajax: 1,
  };

  const { getRequest } = deleteVoucherFromCartRequest(url, payload);

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
    danger(error.message);
  }
};

export default deleteVoucherHandler;
