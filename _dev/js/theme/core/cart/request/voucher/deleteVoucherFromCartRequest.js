import prestashop from 'prestashop';
import useDefaultHttpRequest from '../../../../components/http/useDefaultHttpRequest';
import useHttpPayloadDefinition from '../../../../components/http/useHttpPayloadDefinition';

/**
 * @typedef ServerResponse
 * @type {object}
 * @property {string|string[]} errors - the errors returned by the server
 * @property {int} id_customization - always 0
 * @property {int} id_product - always 0
 * @property {int} id_product_attribute - always 0
 * @property {int} quantity - always 0
 * @property {boolean} success - success flag
 * @property {object} cart - cart front object
 */

/**
 * Add voucher to cart request
 * @param payload {Object} - payload object to send
 * @param payload.deleteDiscount {int} - discount code id - Required
 * @param payload.action {string} - optional
 * @param payload.token {string} - optional
 * @param payload.ajax {int} - optional
 * @example
 *  const payload = {
 *    deleteDiscount: 2, // required
 *  };
 *
 *  const { getRequest } = deleteVoucherFromCartRequest(payload);
 *
 *  try {
 *    const resp = await getRequest();
 *  } catch (error) {
 *    console.error(error);
 *  }
 * @returns {{getRequest: (function(): Promise<ServerResponse>)}}
 */
const deleteVoucherFromCartRequest = (payload) => {
  const payloadToSend = {
    action: 'update',
    token: prestashop.static_token,
    ajax: 1,
    ...payload,
  };

  const payloadDefinition = {
    deleteDiscount: {
      type: 'int',
      required: true,
    },
    action: {
      type: 'string',
      required: true,
    },
    token: {
      type: 'string',
      required: true,
    },
    ajax: {
      type: 'int',
      required: true,
    },
  };

  const { validatePayload } = useHttpPayloadDefinition(payloadToSend, payloadDefinition);

  const validationErrors = validatePayload();

  if (validationErrors.length) {
    throw Error(validationErrors.join(',\n'));
  }

  const getRequest = () => useDefaultHttpRequest(prestashop.urls.pages.cart, payloadToSend);

  return {
    getRequest,
  };
};

export default deleteVoucherFromCartRequest;
