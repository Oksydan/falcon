import prestashop from 'prestashop';
import selectDeliveryMethodRequest from '@js/theme/core/checkout/request/selectDeliveryMethodRequest';
import useAlertToast from '@js/theme/components/useAlertToast';
import parseToHtml from '@js/theme/utils/parseToHtml';
import useEvent from '@js/theme/components/event/useEvent';
import { fromSerializeObject, formSerializeArray } from '../../utils/formSerialize';

const { on } = useEvent();
const { danger } = useAlertToast();

const refreshCheckoutPage = () => {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has('updatedTransaction')) {
    window.location.reload();

    return;
  }

  urlParams.append('updatedTransaction', 1);
  window.location.href = `${window.location.pathname}?${urlParams.toString()}`;
};

const updateDeliveryForm = async (event) => {
  const {
    deliveryFormSelector, summarySelector, deliveryOption, cartPaymentStepRefresh,
  } = prestashop.selectors.checkout;

  const deliveryMethodForm = document.querySelector(deliveryFormSelector);

  if (deliveryMethodForm === null) {
    return;
  }

  const requestData = fromSerializeObject(deliveryMethodForm);
  const checkedInput = event.target;
  const newDeliveryOption = checkedInput.closest(deliveryOption);
  const url = newDeliveryOption.dataset.urlUpdate;
  const { getRequest } = selectDeliveryMethodRequest(url, requestData);

  try {
    const resp = await getRequest();

    document.querySelectorAll(summarySelector).forEach((element) => {
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
    danger(error.message);
    prestashop.emit('handleError', {
      eventType: 'updateDeliveryOptions',
      resp: {},
    });
  }
};

const addEvents = () => {
  const {
    deliveryFormSelector, deliveryStepSelector, editDeliveryButtonSelector, stepEdit,
  } = prestashop.selectors.checkout;

  on(document, 'change', `${deliveryFormSelector} input`, updateDeliveryForm);
  on(document, 'click', editDeliveryButtonSelector, (event) => {
    event.stopPropagation();
    document.querySelector(`${deliveryStepSelector} ${stepEdit}`)?.click();
    prestashop.emit('editDelivery');
  });
};

const checkoutDelivery = () => {
  addEvents();
};

export default checkoutDelivery;
