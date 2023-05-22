import updateCart from '@js/theme/core/cart/updateCart';
import cartAddProduct from '@js/theme/core/cart/cartAddProduct';
import cartVouchers from '@js/theme/core/cart/cartVouchers';
import cartQuantity from '@js/theme/core/cart/cartQuantity';
import cartDelete from '@js/theme/core/cart/cartDelete';
import DOMReady from '@js/theme/utils/DOMReady';

DOMReady(() => {
  updateCart();
  cartQuantity();
  cartDelete();
});

$(() => {
  cartAddProduct();
  cartVouchers();
});
