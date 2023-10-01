import prestashop from 'prestashop';
import useEvent from '../../components/event/useEvent';
import quickViewClickHandler from './handler/quickViewClickHandler';
import quickViewHandler from './handler/quickViewHandler';

const { on } = useEvent();

const productController = () => {
  const init = () => {
    on(document, 'click', prestashop.selectors.listing.quickview, quickViewClickHandler);

    prestashop.on('clickQuickView', ({ idProduct, idProductAttribute }) => quickViewHandler(idProduct, idProductAttribute));
  };

  return {
    init,
  };
};

export default productController;
