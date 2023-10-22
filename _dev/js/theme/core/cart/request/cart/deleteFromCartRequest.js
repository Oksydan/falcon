import prestashop from 'prestashop';
import useDefaultHttpRequest from '../../../../components/http/useDefaultHttpRequest';
import useHttpPayloadDefinition from '../../../../components/http/useHttpPayloadDefinition';

/**
 * @typedef {object} ServerResponse
 * @property {(string|string[])} errors - The errors returned by the server.
 * @property {number} id_product - The product id.
 * @property {number} id_product_attribute - The product attribute id.
 * @property {number} id_customization - The product customization id.
 * @property {number} quantity - The product quantity.
 * @property {boolean} success - The success flag.
 * @property {object} cart - The cart front object.
 */

/**
 * Creates a request object for deleting a product from the cart.
 * @param {object} payload - The payload object to send.
 * @param {number} payload.id_product - The product id (Required).
 * @param {number} [payload.id_product_attribute] - The product id attribute (Optional, pass 0 if not set).
 * @param {number} [payload.id_customization] - The customization id (Optional, pass 0 if not set).
 * @param {number} payload.delete - Optional.
 * @param {string} payload.action - Optional.
 * @param {string} payload.token - Optional.
 * @param {number} payload.ajax - Optional.
 * @example
 * const payload = {
 *   id_product: 1, // Required
 *   id_product_attribute: 2, // Optional
 *   id_customization: 3, // Optional
 * };
 *
 * const { getRequest } = deleteFromCartRequest(payload);
 *
 * try {
 *   const resp = await getRequest();
 * } catch (error) {
 *   console.error(error);
 * }
 * @throws {Error} Throws an error if there are validation errors in the payload.
 * @returns {{getRequest: (function(): Promise<ServerResponse>)}}
 */
const deleteFromCartRequest = (payload) => {
  const payloadToSend = {
    delete: 1,
    action: 'update',
    ajax: 1,
    token: prestashop.static_token,
    ...payload,
  };

  const payloadDefinition = {
    id_product: {
      type: 'int',
      required: true,
    },
    id_product_attribute: {
      type: 'int',
      required: false,
    },
    id_customization: {
      type: 'int',
      required: false,
    },
    delete: {
      type: 'int',
      required: true,
    },
    action: {
      type: 'string',
      required: true,
    },
    ajax: {
      type: 'int',
      required: true,
    },
    token: {
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

export default deleteFromCartRequest;
