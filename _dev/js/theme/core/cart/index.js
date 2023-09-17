import updateCart from '@js/theme/core/cart/updateCart';
import cartAddProduct from '@js/theme/core/cart/cartAddProduct';
import cartQuantity from '@js/theme/core/cart/cartQuantity';
import cartDelete from '@js/theme/core/cart/cartDelete';
import DOMReady from '@js/theme/utils/DOMReady';
import cartController from './cartController';

const { init } = cartController();

DOMReady(() => {
  updateCart();
  cartQuantity();
  cartDelete();
  init();
});

$(() => {
  cartAddProduct();
});
