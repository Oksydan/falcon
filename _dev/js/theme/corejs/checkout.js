import $ from 'jquery';
import setUpAddress from './checkout-address';

function setUpCheckout() {
  setUpAddress();
}

$(() => {
  if ($('#checkout').length === 1) {
    setUpCheckout();
  }
});
