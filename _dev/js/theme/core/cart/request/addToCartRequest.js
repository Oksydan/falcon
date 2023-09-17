import prestashop from 'prestashop';
import useHttpRequest from '../../../components/http/useHttpRequest';

/**
 * @typedef ServerResponse
 * @type {object}
 * @property {string|string[]} errors - the errors returned by the server
 * @property {number} id_product - product id
 * @property {number} id_product_attribute - product attribute id
 * @property {number} id_customization - product customization id
 * @property {number} quantity - product quantity
 * @property {boolean} success - success flag
 * @property {object} cart - cart front object
 */

/**
 * Add voucher to cart request
 * @param payload {Object} - payload object to send
 * @param payload.id_product {number} - product id - Required
 * @param payload.qty {number} - product quantity - Required
 * @param payload.id_product_attribute {number} - product id attribute - optional pass 0 if not set
 * @param payload.id_customization {number} - customization id - optional pass 0 if not set
 * @param payload.add {number} - optional
 * @param payload.action {string} - optional
 * @param payload.token {string} - optional
 * @param payload.ajax {number} - optional
 * @example
 *  const payload = {
 *    id_product: 1, // Required
 *    qty: 1, // Required
 *    id_product_attribute: 2, // optional
 *    id_customization: 3, // optional
 *  };
 *
 *  const { getRequest } = addToCartRequest(payload);
 *
 *  try {
 *    const resp = await getRequest();
 *  } catch (error) {
 *    console.error(error);
 *  }
 * @returns {{getRequest: (function(): Promise<ServerResponse>)}}
 */
const addToCartRequest = (payload) => {
  const { request } = useHttpRequest(prestashop.urls.pages.cart);

  const payloadToSend = {
    add: 1,
    action: 'update',
    ajax: 1,
    token: prestashop.static_token,
    ...payload,
  };

  const getRequest = () => new Promise((resolve, reject) => {
    request
      .query(payloadToSend)
      .post()
      .json((resp) => {
        resolve(resp);
      })
      .catch(() => {
        reject(Error(prestashop.t.alert.genericHttpError));
      });
  });

  return {
    getRequest,
  };
};

export default addToCartRequest;
