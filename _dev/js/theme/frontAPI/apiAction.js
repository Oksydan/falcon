import addToCartAction from '@js/theme/frontAPI/cart/addToCartAction';
import addVoucherToCartAction from '@js/theme/frontAPI/cart/addVoucherToCartAction';

prestashop.frontAPI = {};

prestashop.addAction = (actionName, actionFunction) => {
    if (typeof prestashop.frontAPI[actionName] !== 'undefined') {
        throw new Error(`Action ${actionName} already exists`);
    }

    prestashop.frontAPI[actionName] = actionFunction;
}

prestashop.addAction('addToCart', addToCartAction);
prestashop.addAction('addVoucherToCart', addVoucherToCartAction);
