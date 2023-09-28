import updateProductAction from '@js/theme/frontAPI/product/updateProductAction';

prestashop.frontAPI = {};

prestashop.addAction = (actionName, actionFunction) => {
  if (typeof prestashop.frontAPI[actionName] !== 'undefined') {
    throw new Error(`Action ${actionName} already exists`);
  }

  prestashop.frontAPI[actionName] = actionFunction;
};

prestashop.addAction('updateProduct', updateProductAction);
