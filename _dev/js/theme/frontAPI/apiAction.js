import addToCartAction from '@js/theme/frontAPI/addToCartAction';

prestashop.frontAPI = {};

prestashop.addAction = function (actionName, actionFunction) {
    if (typeof prestashop.frontAPI[actionName] !== 'undefined') {
        console.warn(`Action ${actionName} already exists`);
        return;
    }

    prestashop.frontAPI[actionName] = actionFunction;
}

prestashop.addAction('addToCart', addToCartAction);
