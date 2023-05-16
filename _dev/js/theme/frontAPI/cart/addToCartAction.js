import useHttpRequest from "@js/theme/components/http/useHttpRequest";

const addToCartAction = async (idProduct, quantity, idProductAttribute = 0, idCustomization = 0) => new Promise((resolve, reject) => {
    const { request } = useHttpRequest(prestashop.urls.pages.cart);

    const payload = {
        add: 1,
        id_product: parseInt(idProduct, 10),
        action: 'update',
        token: prestashop.static_token,
        qty: parseInt(quantity, 10),
        ajax: 1,
    };

    if (idProductAttribute > 0) {
        payload.id_product_attribute = parseInt(idProductAttribute, 10);
    }

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

export default addToCartAction;
