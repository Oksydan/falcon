import useHttpRequest from '../../../components/http/useHttpRequest';

/**
 * Select delivery method request
 * @param url {string} - checkout url to send request
 * @param payload {object} - request payload
 * @returns {{getRequest: (function(): Promise<unknown>)}}
 */
const selectDeliveryMethodRequest = (url, payload) => {
  const { request } = useHttpRequest(url);

  payload.ajax = 1;
  payload.action = 'selectDeliveryOption';

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

export default selectDeliveryMethodRequest;
