import $ from 'jquery';
import prestashop from 'prestashop';
import setUpAddress from './checkout-address';
import setUpDelivery from './checkout-delivery';
import setUpPayment from './checkout-payment';

function setUpCheckout() {
  setUpAddress();
  setUpDelivery();
  setUpPayment();
}

$(() => {
  if ($('#checkout').length === 1) {
    setUpCheckout();
  }
});
