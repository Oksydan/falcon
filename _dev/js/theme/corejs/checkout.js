import $ from 'jquery';
import setUpAddress from './checkout-address';
import setUpDelivery from './checkout-delivery';

function setUpCheckout() {
  setUpAddress();
  setUpDelivery();
}

$(() => {
  if ($('#checkout').length === 1) {
    setUpCheckout();
  }
});
