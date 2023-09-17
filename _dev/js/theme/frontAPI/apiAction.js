import addToCartAction from '@js/theme/frontAPI/cart/addToCartAction';
import refreshCartPageAction from '@js/theme/frontAPI/cart/refreshCartPageAction';
import updateCartQuantityAction from '@js/theme/frontAPI/cart/updateCartQuantityAction';
import deleteFromCartAction from '@js/theme/frontAPI/cart/deleteFromCartAction';
import updateProductAction from '@js/theme/frontAPI/product/updateProductAction';
import updateListingFacetsAction from '@js/theme/frontAPI/listing/updateListingFacetsAction';
import updateAddressAction from '@js/theme/frontAPI/address/updateAddressAction';

prestashop.frontAPI = {};

prestashop.addAction = (actionName, actionFunction) => {
  if (typeof prestashop.frontAPI[actionName] !== 'undefined') {
    throw new Error(`Action ${actionName} already exists`);
  }

  prestashop.frontAPI[actionName] = actionFunction;
};

prestashop.addAction('addToCart', addToCartAction);
prestashop.addAction('refreshCartPage', refreshCartPageAction);
prestashop.addAction('updateCartQuantity', updateCartQuantityAction);
prestashop.addAction('deleteFromCart', deleteFromCartAction);
prestashop.addAction('updateProduct', updateProductAction);
prestashop.addAction('updateListingFacets', updateListingFacetsAction);
prestashop.addAction('updateAddress', updateAddressAction);
