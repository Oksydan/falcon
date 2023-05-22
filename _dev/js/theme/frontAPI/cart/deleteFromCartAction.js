import useHttpRequest from '@js/theme/components/http/useHttpRequest';

const deleteFromCartAction = async (idProduct, idProductAttribute, idCustomization = 0) => new Promise((resolve, reject) => {
  const { request } = useHttpRequest(prestashop.urls.pages.cart);

  const payload = {
    delete: 1,
    id_product: parseInt(idProduct, 10),
    id_product_attribute: parseInt(idProductAttribute, 10),
    action: 'update',
    token: prestashop.static_token,
    ajax: 1,
  };

  if (idCustomization > 0) {
    payload.id_customization = parseInt(idCustomization, 10);
  }

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

export default deleteFromCartAction;
