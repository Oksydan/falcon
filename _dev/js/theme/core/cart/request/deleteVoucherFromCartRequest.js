import prestashop from 'prestashop';
import useHttpRequest from '../../../components/http/useHttpRequest';

/**
 * @typedef ServerResponse
 * @type {object}
 * @property {string|string[]} errors The errors returned by the server
 * @property {number} id_customization Always 0
 * @property {number} id_product Always 0
 * @property {number} id_product_attribute Always 0
 * @property {number} quantity Always 0
 * @property {boolean} success Always 0
 * @property {object} cart cart front object
 */

/**
 * Add voucher to cart request
 * @param payload {Object} - payload object to send
 * @param payload.deleteDiscount {number} - discount code id - Required
 * @param payload.action {string} - optional
 * @param payload.token {string} - optional
 * @param payload.ajax {number} - optional
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
  const { request } = useHttpRequest(prestashop.urls.pages.cart);

  const payloadToSend = {
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

export default deleteVoucherFromCartRequest;
