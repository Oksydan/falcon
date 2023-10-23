import prestashop from 'prestashop';
import { on } from '../../../utils/event/eventHandler';
import quickViewClickHandler from './handler/quickView/quickViewClickHandler';
import quickViewHandler from './handler/quickView/quickViewHandler';
import productUpdateErrorHandler from './handler/product/productUpdateErrorHandler';
import productFormDataPersister from './persister/productFormDataPersister';
import productPopStateHandler from './handler/product/productPopStateHandler';
import updatedProductHandler from './handler/product/updatedProductHandler';
import updateProductHandler from './handler/product/updateProductHandler';
import productFormChangeHandler from './handler/product/productFormChangeHandler';

const { persist } = productFormDataPersister();

/**
 * Persists form data on init
 *
 * @function
 * @name persistFormDataOnInit
 * @memberof module:productController
 * @returns {void}
 */
const persistFormDataOnInit = () => {
  const form = document.querySelector(`${prestashop.selectors.product.actions} .js-product-form`);

  if (form) {
    persist(form);
  }
};

/**
 * Product controller module.
 *
 * @module productController
 * @returns {{init: Function}}
 */
const productController = () => {
  /**
   * Initializes the product controller.
   *
   * @function
   * @name init
   * @memberof module:productController
   * @returns {void}
   */
  const init = () => {
    persistFormDataOnInit();
    on(document, 'click', prestashop.selectors.listing.quickview, quickViewClickHandler);
    on(document, 'change', `${prestashop.selectors.product.variants} *[name]`, productFormChangeHandler);

    window.addEventListener('popstate', productPopStateHandler);
    prestashop.on('updateProduct', updateProductHandler);
    prestashop.on('updatedProduct', updatedProductHandler);
    prestashop.on('showErrorNextToAddtoCartButton', productUpdateErrorHandler);
    prestashop.on('clickQuickView', ({ idProduct, idProductAttribute }) => quickViewHandler(idProduct, idProductAttribute));
  };

  return {
    init,
  };
};

export default productController;
