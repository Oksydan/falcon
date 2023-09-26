import updateProductAction from '@js/theme/frontAPI/product/updateProductAction';
import updateAddressAction from '@js/theme/frontAPI/address/updateAddressAction';

prestashop.frontAPI = {};

prestashop.addAction = (actionName, actionFunction) => {
  if (typeof prestashop.frontAPI[actionName] !== 'undefined') {
    throw new Error(`Action ${actionName} already exists`);
  }

  prestashop.frontAPI[actionName] = actionFunction;
};

prestashop.addAction('updateProduct', updateProductAction);
prestashop.addAction('updateAddress', updateAddressAction);
