import $ from 'jquery';
import prestashop from 'prestashop';
import setUpAddress from './checkout-address';
import setUpDelivery from './checkout-delivery';
import setUpPayment from './checkout-payment';

function setUpCheckout() {
  setUpAddress();
  setUpDelivery();
  setUpPayment();

  handleSubmitButton();
}

function handleSubmitButton() {
  // prevents rage clicking on submit button and related issues
  const formSelector = prestashop.selectors.checkout.form;
  $(formSelector).on('submit', function (e) {
    if ($(this).data('disabled') === true) {
      e.preventDefault();
    }
    $(this).data('disabled', true);
    $('button[type="submit"]', this).addClass('disabled');
  });
}

$(() => {
  if ($('#checkout').length === 1) {
    setUpCheckout();
  }
});
