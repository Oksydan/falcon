import prestashop from 'prestashop';
import useHttpRequest from './useHttpRequest';

/**
 * Default http request accepting payload as object and returning promise with response
 * @param {string} url - url to send request
 * @param {object} payload - payload to send
 * @param {object} options - request options for example different headers
 * @returns {Promise<unknown>}
 */
const useDefaultHttpRequest = (url, payload, options = {}) => {
  const { request } = useHttpRequest(url, options);

  return new Promise((resolve, reject) => {
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
};

export default useDefaultHttpRequest;
