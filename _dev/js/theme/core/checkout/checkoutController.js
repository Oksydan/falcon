/**
 * Checkout controller.
 *
 * @returns {object} The checkout controller object.
 * @property {function} init - Initializes the checkout controller.
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

  /**
   * Initializes the checkout controller by attaching event handlers.
   *
   * @function
   * @returns {void}
   */
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
