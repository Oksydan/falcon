import updateCart from '@js/theme/core/cart/updateCart';
import cartQuantity from '@js/theme/core/cart/cartQuantity';
import DOMReady from '@js/theme/utils/DOMReady';
import prestashop from 'prestashop';
import cartController from './cartController';

prestashop.cart = prestashop.cart || {};

const { init } = cartController();

DOMReady(() => {
  updateCart();
  cartQuantity();
  init();
});
