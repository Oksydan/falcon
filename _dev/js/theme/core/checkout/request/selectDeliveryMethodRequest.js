import useHttpRequest from '@js/theme/components/http/useHttpRequest';

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
      .catch((er) => {
        reject(Error(prestashop.t.alert.genericHttpError));
      });
  });

  return {
    getRequest,
  };
};

export default selectDeliveryMethodRequest;
