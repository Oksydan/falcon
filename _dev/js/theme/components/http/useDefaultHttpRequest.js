import useHttpRequest from './useHttpRequest';
import GenericHttpRequestError from './error/GenericHttpRequestError';

/**
 * Sends a default HTTP request with payload as an object and returns a promise with the response.
 *
 * @module useDefaultHttpRequest
 * @param {string} url - The URL to send the request.
 * @param {object} payload - The payload to send.
 * @param {object} options - Request options, such as different headers.
 * @returns {Promise<unknown>} - A promise with the response.
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
        reject(new GenericHttpRequestError('Error while sending request'));
      });
  });
};

export default useDefaultHttpRequest;

