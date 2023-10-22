import prestashop from 'prestashop';
import useDefaultHttpRequest from '../../../../components/http/useDefaultHttpRequest';
import useHttpPayloadDefinition from '../../../../components/http/useHttpPayloadDefinition';

/**
 * @typedef {object} ServerResponse
 * @property {string|string[]} errors - The errors returned by the server.
 * @property {number} id_customization - Always 0.
 * @property {number} id_product - Always 0.
 * @property {number} id_product_attribute - Always 0.
 * @property {number} quantity - Always 0.
 * @property {boolean} success - Success flag.
 * @property {object} cart - Cart front object.
 */

/**
 * Add voucher to cart request.
 * @param {Object} payload - Payload object to send.
 * @param {string} payload.discount_name - Discount code. Required.
 * @param {number} [payload.addDiscount] - Optional.
 * @param {string} [payload.action] - Optional.
 * @param {string} [payload.token] - Optional.
 * @param {number} [payload.ajax] - Optional.
 * @example
 * const payload = {
 *   discount_name: 'voucherName', // Required
 * };
 *
 * const { getRequest } = addVoucherToCartRequest(payload);
 *
 * try {
 *   const resp = await getRequest();
 * } catch (error) {
 *   console.error(error);
 * }
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
  
  /**
   * Validates the payload against the payload definition.
   * @throws {Error} Throws an error if the payload is invalid.
   * @returns {Array} An array of validation errors, empty if valid.
   */
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
