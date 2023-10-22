import prestashop from 'prestashop';
import { formSerializeArray, fromSerializeObject } from '../../../../utils/formSerialize';
import selectDeliveryMethodRequest from '../../request/selectDeliveryMethodRequest';
import parseToHtml from '../../../../utils/parseToHtml';
import refreshCheckoutPage from '../../utils/refreshCheckoutPage';
import { each } from '../../../../utils/DOMHelpers';

/**
 * Handles the change of delivery method in the Prestashop checkout process.
 *
 * @function
 * @param {object} event - The change event.
 * @returns {Promise<void>}
 */
const changeDeliveryMethodHandler = async (event) => {
  const {
    deliveryFormSelector, summarySelector, deliveryOption, cartPaymentStepRefresh,
  } = prestashop.selectors.checkout;

  const deliveryMethodForm = document.querySelector(deliveryFormSelector);

  if (deliveryMethodForm === null) {
    return;
  }

  const payload = fromSerializeObject(deliveryMethodForm);
  const checkedInput = event.target;
  const newDeliveryOption = checkedInput.closest(deliveryOption);
  const url = newDeliveryOption.dataset.urlUpdate;

  const { getRequest } = selectDeliveryMethodRequest(url, payload);

  prestashop.emit('updateDeliveryForm', {
    dataForm: formSerializeArray(deliveryMethodForm),
    deliveryOption: newDeliveryOption,
  });

  try {
    const resp = await getRequest();

    each(summarySelector, (element) => {
      element.replaceWith(parseToHtml(resp.preview));
    });

    if (document.querySelector(cartPaymentStepRefresh) !== null) {
      // we get the refresh flag : on payment step we need to refresh page to be sure
      // amount is correctly updated on payment modules
      refreshCheckoutPage();
    }

    prestashop.emit('updatedDeliveryForm', {
      dataForm: formSerializeArray(deliveryMethodForm),
      deliveryOption: newDeliveryOption,
      resp,
    });
  } catch (error) {
    prestashop.emit('handleError', {
      eventType: 'updateDeliveryOptions',
      resp: {},
      error,
    });
  }
};

export default changeDeliveryMethodHandler;
