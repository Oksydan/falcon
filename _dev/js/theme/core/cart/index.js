import updateCart from "@js/theme/core/cart/updateCart";
import cartAddProduct from "@js/theme/core/cart/cartAddProduct";
import cartVouchers from "@js/theme/core/cart/cartVouchers";
import cartQuantity from "@js/theme/core/cart/cartQuantity";
import DOMReady from "@js/theme/utils/DOMReady";


DOMReady(() => {
    updateCart();
    cartQuantity();
})

$(() => {
    cartAddProduct();
    cartVouchers();
})
