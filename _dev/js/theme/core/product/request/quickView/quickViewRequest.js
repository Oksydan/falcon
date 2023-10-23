import prestashop from 'prestashop';
import useDefaultHttpRequest from '../../../../../utils/http/useDefaultHttpRequest';
import useHttpPayloadDefinition from '../../../../../utils/http/useHttpPayloadDefinition';
/**
 * Server response object for the quick view request.
 *
 * @typedef {object} ServerResponse
 * @property {string} quickview_html - HTML content of quick view.
 * @property {object} product - Product front object.
 */

/**
 * Add voucher to cart request.
 *
 * @param {Object} payload - Payload object to send.
 * @param {number} payload.id_product - ID of the product to show (Required).
 * @param {number} [payload.id_product_attribute=0] - ID of the product attribute (optional, default 0).
 * @param {number} [payload.ajax=1] - AJAX flag (optional, default 1).
 * @param {string} [payload.action] - Action (optional).
 * @example
 * const payload = {
 *   id_product: 1, // Required
 *   id_product_attribute: 1, // Optional - default 0
 * };
 *
 * const { getRequest } = quickViewRequest(payload);
 *
 * try {
 *   const resp = await getRequest();
 * } catch (error) {
 *   console.error(error);
 * }
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

  /**
   * Get the request function for the quick view request.
   *
   * @function
   * @returns {Promise<ServerResponse>} - Promise that resolves to the server response.
   */
  const getRequest = () => useDefaultHttpRequest(prestashop.urls.pages.product, payloadToSend);

  return {
    getRequest,
  };
};

export default quickViewRequest;
