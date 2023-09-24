import addVoucherToCartRequest from '../../request/voucher/addVoucherToCartRequest';
import parseToHtml from '../../../../utils/parseToHtml';
import useAlertToast from '../../../../components/useAlertToast';

const { danger } = useAlertToast();

/**
 * Submit voucher handler
 * @param event {object} - submit event
 * @returns {Promise<void>}
 */
const submitVoucherHandler = async (event) => {
  event.preventDefault();

  const addVoucherForm = event.currentTarget;
  const btn = addVoucherForm.querySelector('[type="submit"]');
  const input = addVoucherForm.querySelector('[name="discount_name"]');
  const voucherName = input?.value || '';

  const payload = {
    discount_name: voucherName,
  };

  const { getRequest } = addVoucherToCartRequest(payload);

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
  }

  btn.disabled = false;
};

export default submitVoucherHandler;
