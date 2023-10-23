import useDefaultHttpRequest from '../../../../utils/http/useDefaultHttpRequest';

/**
 * Represents the server response from a select delivery method request.
 * @typedef {object} ServerResponse
 * @property {string} preview - The HTML content of the checkout summary.
 */

/**
 * Provides a select delivery method request with a method to get the request promise.
 *
 * @function
 * @param {string} url - The checkout URL to send the request.
 * @param {object} payload - The request payload.
 * @param {object} payload.delivery_option[id] - The delivery option ID with id_address_delivery.
 * @param {number} payload.ajax - An optional parameter.
 * @param {string} payload.action - An optional parameter.
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
  /**
   * Payload not typed because the delivery option parameter is dynamic.
   * @type {object}
   */
  const payloadToSend = {
    ajax: 1,
    action: 'selectDeliveryOption',
    ...payload,
  };

  const getRequest = () => useDefaultHttpRequest(url, payloadToSend);

  return {
    getRequest,
  };
};

export default selectDeliveryMethodRequest;
