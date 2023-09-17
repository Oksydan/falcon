import prestashop from 'prestashop';
import useHttpRequest from '../../../components/http/useHttpRequest';

/**
 * @typedef ServerResponse
 * @type {object}
 * @property {string} preview - checkout summary html content
 */

/**
 * Select delivery method request
 * @param url {string} - checkout url to send request
 * @param payload {object} - request payload
 * @param payload.delivery_option[id] {string} - delivery option id with id_address_delivery
 * @param payload.ajax {number} - optional
 * @param payload.action {string} - optional
 * @example
 * const payload = {
 *   'delivery_option[1]': '2,',
 * };
 *
 * const { getRequest } = selectDeliveryMethodRequest(url, payload);
 *
 * try {
 *   const resp = await getRequest();
 * } catch (error) {
 *   console.log(error);
 * }
 *
 * @returns {{getRequest: (function(): Promise<ServerResponse>)}}
 */
const selectDeliveryMethodRequest = (url, payload) => {
  const { request } = useHttpRequest(url);

  const payloadToSend = {
    ajax: 1,
    action: 'selectDeliveryOption',
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

export default selectDeliveryMethodRequest;
