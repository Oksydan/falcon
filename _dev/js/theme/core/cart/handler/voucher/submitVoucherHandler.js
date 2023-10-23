import prestashop from 'prestashop';
import addVoucherToCartRequest from '../../request/voucher/addVoucherToCartRequest';
import { parseToHtml } from '../../../../../utils/DOM/DOMHelpers';

/**
 * Handles the submission of a voucher form and updates the cart accordingly.
 * @param {Event} event - The submit event that triggered the voucher submission.
 * @param {HTMLElement} event.delegateTarget - The form element that was submitted.
 * @throws {Error} Will throw an error if required data is missing or if an error occurs during the submission process.
 * @returns {Promise<void>} - A Promise that resolves once the submission process is complete.
 */
const submitVoucherHandler = async (event) => {
  event.preventDefault();

  const addVoucherForm = event.delegateTarget;
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
    prestashop.emit('handleError', {
      eventType: 'submitVoucher',
      resp: {},
      error,
    });
  }

  btn.disabled = false;
};

export default submitVoucherHandler;
