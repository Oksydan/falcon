import prestashop from 'prestashop';
import useEvent from '../../components/event/useEvent';
import editAddressHandler from './handler/address/editAddressHandler';
import changeAddressHandler from './handler/address/changeAddressHandler';
import changeDeliveryMethodHandler from './handler/delivery/changeDeliveryMethodHandler';
import editDeliveryStepHandler from './handler/delivery/editDeliveryStepHandler';
import showAddressErrorMessageHandler from './handler/address/showAddressErrorMessageHandler';
import orderConfirmationErrorsHandler from './handler/payment/orderConfirmationErrorsHandler';
import toggleOrderButtonStateHandler from './handler/payment/toggleOrderButtonStateHandler';
import togglePaymentOptionsHandler from './handler/payment/togglePaymentOptionsHandler';
import confirmOrderHandler from './handler/payment/confirmOrderHandler';
import checkoutFormSubmitHandler from './handler/process/checkoutFormSubmitHandler';
import checkoutStepChangeHandler from './handler/process/checkoutStepChangeHandler';

const { on } = useEvent();

/**
 * Checkout controller
 * @returns {object} return
 * @returns {function} return.init initialize checkout controller
 */
const checkoutController = () => {
  const {
    editAddresses,
    deliveryAddressRadios,
    deliveryFormSelector,
    editDeliveryButtonSelector,
    conditionsSelector,
    confirmationSelector,
  } = prestashop.selectors.checkout;

  const init = () => {
    on(document, 'click', editAddresses, editAddressHandler);
    on(document, 'click', deliveryAddressRadios, changeAddressHandler);
    on(document, 'change', `${deliveryFormSelector} input[type="radio"]`, changeDeliveryMethodHandler);
    on(document, 'click', editDeliveryButtonSelector, editDeliveryStepHandler);
    on(document, 'change', `${conditionsSelector} input[type="checkbox"]`, toggleOrderButtonStateHandler);
    on(document, 'change', 'input[name="payment-option"]', togglePaymentOptionsHandler);
    on(document, 'click', `${confirmationSelector} button`, confirmOrderHandler);
    on(document, 'submit', prestashop.selectors.checkout.form, checkoutFormSubmitHandler);
    on(document, 'click', prestashop.selectors.checkout.stepEdit, checkoutStepChangeHandler);

    prestashop.on('orderConfirmationErrors', orderConfirmationErrorsHandler);

    showAddressErrorMessageHandler();
    toggleOrderButtonStateHandler();
  };

  return {
    init,
  };
};

export default checkoutController;
