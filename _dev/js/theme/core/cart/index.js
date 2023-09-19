import updateCart from '@js/theme/core/cart/updateCart';
import cartQuantity from '@js/theme/core/cart/cartQuantity';
import DOMReady from '@js/theme/utils/DOMReady';
import cartController from './cartController';

const { init } = cartController();

DOMReady(() => {
  updateCart();
  cartQuantity();
  init();
});
