import prestashop from 'prestashop';
import useEvent from '../../components/event/useEvent';
import quickViewClickHandler from './handler/quickView/quickViewClickHandler';
import quickViewHandler from './handler/quickView/quickViewHandler';
import productUpdateErrorHandler from './handler/product/productUpdateErrorHandler';
import productFormDataPersister from './persister/productFormDataPersister';
import productPopStateHandler from './handler/product/productPopStateHandler';
import updatedProductHandler from './handler/product/updatedProductHandler';

const { on } = useEvent();
const { persist } = productFormDataPersister();

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
