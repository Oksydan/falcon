import addToCartAction from '@js/theme/frontAPI/cart/addToCartAction';
import addVoucherToCartAction from '@js/theme/frontAPI/cart/addVoucherToCartAction';
import refreshCartPageAction from '@js/theme/frontAPI/cart/refreshCartPageAction';

prestashop.frontAPI = {};

prestashop.addAction = (actionName, actionFunction) => {
    if (typeof prestashop.frontAPI[actionName] !== 'undefined') {
        throw new Error(`Action ${actionName} already exists`);
    }

    prestashop.frontAPI[actionName] = actionFunction;
}

prestashop.addAction('addToCart', addToCartAction);
prestashop.addAction('addVoucherToCart', addVoucherToCartAction);
prestashop.addAction('refreshCartPage', refreshCartPageAction);
