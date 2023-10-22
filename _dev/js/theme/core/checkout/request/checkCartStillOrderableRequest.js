import prestashop from 'prestashop';
import useDefaultHttpRequest from '../../../components/http/useDefaultHttpRequest';

/**
 * Represents the server response from a check cart still orderable request.
 * @typedef {object} ServerResponse
 * @property {string} cartUrl - The URL of the cart page.
 * @property {boolean} errors - A flag indicating whether there are errors (true if there are errors).
 */

/**
 * Provides a check cart still orderable request with a method to get the request promise.
 *
 * @function
 * @returns {{getRequest: (function(): Promise<ServerResponse>)}}
 */
const checkCartStillOrderableRequest = () => {
  /**
   * Payload not typed because it isn't needed.
   * @type {object}
   */
  const payloadToSend = {
    ajax: 1,
    action: 'checkCartStillOrderable',
  };

  const getRequest = () => useDefaultHttpRequest(prestashop.urls.pages.order, payloadToSend);

  return {
    getRequest,
  };
};

export default checkCartStillOrderableRequest;
