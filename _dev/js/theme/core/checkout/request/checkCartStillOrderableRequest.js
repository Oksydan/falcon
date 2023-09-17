import prestashop from 'prestashop';
import useHttpRequest from '../../../components/http/useHttpRequest';

/**
 * @typedef ServerResponse
 * @type {object}
 * @property {string} cartUrl cart page url
 * @property {boolean} errors errors flag (true if errors)
 */

/**
 * Check cart still orderable request
 * @returns {{getRequest: (function(): Promise<ServerResponse>)}}
 */
const checkCartStillOrderableRequest = () => {
  const payload = {
    ajax: 1,
    action: 'checkCartStillOrderable',
  };

  const { request } = useHttpRequest(prestashop.urls.pages.order);
  const getRequest = () => new Promise((resolve, reject) => {
    request
      .query(payload)
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

export default checkCartStillOrderableRequest;
