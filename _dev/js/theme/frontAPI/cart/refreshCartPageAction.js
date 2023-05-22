import useHttpRequest from '@js/theme/components/http/useHttpRequest';

const refreshCartPageAction = async () => new Promise((resolve, reject) => {
  const { request } = useHttpRequest(prestashop.urls.pages.cart);

  const payload = {
    action: 'refresh',
    ajax: 1,
  };

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

export default refreshCartPageAction;
