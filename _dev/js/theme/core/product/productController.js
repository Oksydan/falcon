import prestashop from 'prestashop';
import useEvent from '../../components/event/useEvent';
import quickViewClickHandler from './handler/quickView/quickViewClickHandler';
import quickViewHandler from './handler/quickView/quickViewHandler';
import productUpdateErrorHandler from './handler/product/productUpdateErrorHandler';
import productFormDataPersister from './persister/productFormDataPersister';
import productPopStateHandler from './handler/product/productPopStateHandler';
import updatedProductHandler from './handler/product/updatedProductHandler';
import productFormChangeHandler from './handler/product/productFormChangeHandler';

const { on } = useEvent();
const { persist } = productFormDataPersister();

/**
 * Persists form data on init
 * Side effect: set formData in productFormDataPersister
 * @return {void}
 */
const persistFormDataOnInit = () => {
  const form = document.querySelector(`${prestashop.selectors.product.actions} form`);

  if (form) {
    persist(form);
  }
};

const productController = () => {
  const init = () => {
    persistFormDataOnInit();
    on(document, 'click', prestashop.selectors.listing.quickview, quickViewClickHandler);
    on(document, 'change', `${prestashop.selectors.product.variants} *[name]`, productFormChangeHandler);

    window.addEventListener('popstate', productPopStateHandler);
    prestashop.on('updatedProduct', updatedProductHandler);
    prestashop.on('showErrorNextToAddtoCartButton', productUpdateErrorHandler);
    prestashop.on('clickQuickView', ({ idProduct, idProductAttribute }) => quickViewHandler(idProduct, idProductAttribute));
  };

  return {
    init,
  };
};

export default productController;
