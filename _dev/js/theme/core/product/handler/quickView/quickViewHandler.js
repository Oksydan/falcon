import prestashop from 'prestashop';
import quickViewRequest from '../../request/quickView/quickViewRequest';

/**
 * Quick view handler
 * SideEffect: emit event on prestashop object clickViewOpen
 * @param idProduct
 * @param idProductAttribute
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
  } catch (e) {
    prestashop.emit('handleError', {
      eventType: 'clickQuickView',
      resp: {},
    });
  }
};

export default quickViewHandler;
