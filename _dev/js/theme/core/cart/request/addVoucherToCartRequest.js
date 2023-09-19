import prestashop from 'prestashop';
import useDefaultHttpRequest from '../../../components/http/useDefaultHttpRequest';
import useHttpPayloadDefinition from '../../../components/http/useHttpPayloadDefinition';

/**
 * @typedef ServerResponse
 * @type {object}
 * @property {string|string[]} errors - the errors returned by the server
 * @property {number} id_customization - always 0
 * @property {number} id_product - always 0
 * @property {number} id_product_attribute - always 0
 * @property {number} quantity - always 0
 * @property {boolean} success - success flag
 * @property {object} cart - cart front object
 */

/**
 * Add voucher to cart request
 * @param payload {Object} - payload object to send
 * @param payload.discount_name {string} - discount code - Required
 * @param payload.addDiscount {number} - optional
 * @param payload.action {string} - optional
 * @param payload.token {string} - optional
 * @param payload.ajax {number} - optional
 * @example
 *  const payload = {
 *    discount_name: 'voucherName', // Required
 *  };
 *
 *  const { getRequest } = addVoucherToCartRequest(payload);
 *
 *  try {
 *    const resp = await getRequest();
 *  } catch (error) {
 *    console.error(error);
 *  }
 * @returns {{getRequest: (function(): Promise<ServerResponse>)}}
 */
const addVoucherToCartRequest = (payload) => {
  const payloadToSend = {
    addDiscount: 1,
    action: 'update',
    token: prestashop.static_token,
    ajax: 1,
    ...payload,
  };

  const payloadDefinition = {
    addDiscount: {
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
    discount_name: {
      type: 'string',
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

export default addVoucherToCartRequest;
