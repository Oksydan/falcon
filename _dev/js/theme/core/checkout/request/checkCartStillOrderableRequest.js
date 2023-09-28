import prestashop from 'prestashop';
import useDefaultHttpRequest from '../../../components/http/useDefaultHttpRequest';

/**
 * @typedef ServerResponse
 * @type {object}
 * @property {string} cartUrl - cart page url
 * @property {boolean} errors - errors flag (true if errors)
 */

/**
 * Check cart still orderable request
 * @returns {{getRequest: (function(): Promise<ServerResponse>)}}
 */
const checkCartStillOrderableRequest = () => {
  // payload not typed because it isn't needed
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
