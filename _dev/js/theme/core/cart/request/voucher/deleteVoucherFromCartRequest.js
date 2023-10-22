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
 * Delete voucher from cart request.
 * @param {Object} payload - Payload object to send.
 * @param {number} payload.deleteDiscount - Discount code id. Required.
 * @param {string} [payload.action] - Optional.
 * @param {string} [payload.token] - Optional.
 * @param {number} [payload.ajax] - Optional.
 * @example
 * const payload = {
 *   deleteDiscount: 2, // Required
 * };
 *
 * const { getRequest } = deleteVoucherFromCartRequest(payload);
 *
 * try {
 *   const resp = await getRequest();
 * } catch (error) {
 *   console.error(error);
 * }
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

export default deleteVoucherFromCartRequest;
