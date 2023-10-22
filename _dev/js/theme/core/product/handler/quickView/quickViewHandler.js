import prestashop from 'prestashop';
import quickViewRequest from '../../request/quickView/quickViewRequest';

/**
 * Quick view handler.
 * Side effect: Emits 'clickViewOpen' event on the prestashop object.
 *
 * @param {string} idProduct - The product ID.
 * @param {string} idProductAttribute - The product attribute ID.
 */
const quickViewHandler = async (idProduct, idProductAttribute) => {
  const payload = {
    id_product: Number.parseInt(idProduct, 10),
    id_product_attribute: Number.parseInt(idProductAttribute, 10),
  };

  const { getRequest } = quickViewRequest(payload);

  try {
    const resp = await getRequest();

    prestashop.emit('clickViewOpen', {
      reason: 'openQuickView',
      resp,
    });
  } catch (error) {
    prestashop.emit('handleError', {
      eventType: 'clickQuickView',
      resp: {},
      error,
    });
  }
};

export default quickViewHandler;
