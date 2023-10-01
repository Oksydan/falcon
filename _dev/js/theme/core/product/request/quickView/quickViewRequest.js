import prestashop from 'prestashop';
import useDefaultHttpRequest from '../../../../components/http/useDefaultHttpRequest';
import useHttpPayloadDefinition from '../../../../components/http/useHttpPayloadDefinition';

/**
 * @typedef ServerResponse
 * @type {object}
 * @property {string} quickview_html - html content of quick view
 * @property {object} product - product front object
 */

/**
 * Add voucher to cart request
 * @param payload {Object} - payload object to send
 * @param payload.id_product {number} - id_product to show - Required
 * @param payload.id_product_attribute {number} - id_product to show - optional, default 0
 * @param payload.ajax {number} - optional, default 1
 * @param payload.action {string} - optional
 * @example
 *  const payload = {
 *    id_product: 1, // Required
 *    id_product_attribute: 1, // Optional - default 0
 *  };
 *
 *  const { getRequest } = quickViewRequest(payload);
 *
 *  try {
 *    const resp = await getRequest();
 *  } catch (error) {
 *    console.error(error);
 *  }
 * @returns {{getRequest: (function(): Promise<ServerResponse>)}}
 */
const quickViewRequest = (payload) => {
  const payloadToSend = {
    action: 'quickview',
    ajax: 1,
    id_product_attribute: 0,
    ...payload,
  };

  const payloadDefinition = {
    action: {
      type: 'string',
      required: true,
    },
    ajax: {
      type: 'int',
      required: true,
    },
    id_product: {
      type: 'int',
      required: true,
    },
    id_product_attribute: {
      type: 'int',
      required: true,
    },
  };

  const { validatePayload } = useHttpPayloadDefinition(payloadToSend, payloadDefinition);

  const validationErrors = validatePayload();

  if (validationErrors.length) {
    throw Error(validationErrors.join(',\n'));
  }

  const getRequest = () => useDefaultHttpRequest(prestashop.urls.pages.product, payloadToSend);

  return {
    getRequest,
  };
};

export default quickViewRequest;
