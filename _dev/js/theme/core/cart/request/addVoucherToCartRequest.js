import prestashop from 'prestashop';
import useHttpRequest from '../../../components/http/useHttpRequest';

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
  const { request } = useHttpRequest(prestashop.urls.pages.cart);

  const payloadToSend = {
    addDiscount: 1,
    action: 'update',
    token: prestashop.static_token,
    ajax: 1,
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

export default addVoucherToCartRequest;
