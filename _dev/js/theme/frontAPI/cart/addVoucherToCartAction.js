import useHttpRequest from '@js/theme/components/http/useHttpRequest';

const addVoucherToCartAction = async (discountName) => new Promise((resolve, reject) => {
  const { request } = useHttpRequest(prestashop.urls.pages.cart);

  const payload = {
    addDiscount: 1,
    discount_name: discountName,
    action: 'update',
    token: prestashop.static_token,
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

export default addVoucherToCartAction;
