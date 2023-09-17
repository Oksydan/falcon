import prestashop from 'prestashop';
import addVoucherToCartRequest from '../../request/addVoucherToCartRequest';
import parseToHtml from '../../../../utils/parseToHtml';
import useAlertToast from '../../../../components/useAlertToast';

const { danger } = useAlertToast();

const submitVoucherHandler = async (event) => {
  event.preventDefault();

  const addVoucherForm = event.currentTarget;
  const btn = addVoucherForm.querySelector('[type="submit"]');
  const input = addVoucherForm.querySelector('[name="discount_name"]');
  const voucherName = input?.value || '';

  const payload = {
    addDiscount: 1,
    discount_name: voucherName,
    action: 'update',
    token: prestashop.static_token,
    ajax: 1,
  };

  const { getRequest } = addVoucherToCartRequest(prestashop.urls.pages.cart, payload);

  btn.disabled = true;

  try {
    const resp = await getRequest();

    if (!resp.hasError) {
      prestashop.emit('updateCart', {
        reason: event.target,
        resp,
      });
    } else {
      const alert = document.querySelector('.js-voucher-error');
      const alertText = alert.querySelector('.js-voucher-error-text');

      if (alert && alertText && resp.errors?.length) {
        const errors = resp.errors.map((error) => `<div>${error}</div>`);

        alert.style.display = 'block';
        alertText.textContent = '';
        alertText.append(parseToHtml(errors.join('')));
      }
    }
  } catch (error) {
    danger(error.message);
    console.error(error);
  }

  btn.disabled = false;
};

export default submitVoucherHandler;
