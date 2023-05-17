import useHttpRequest from "@js/theme/components/http/useHttpRequest";

const updateCartQuantityAction = async (operation, idProduct, idProductAttribute, quantity, idCustomization = 0) => new Promise((resolve, reject) => {
    const { request } = useHttpRequest(prestashop.urls.pages.cart);

    const allowedOperations = ['up', 'down'];

    if (!allowedOperations.includes(operation)) {
        reject(Error('Invalid operation'));
    }

    const payload = {
        update: 1,
        id_product: parseInt(idProduct, 10),
        id_product_attribute: parseInt(idProductAttribute, 10),
        op: operation,
        action: 'update',
        token: prestashop.static_token,
        qty: parseInt(quantity, 10),
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

export default updateCartQuantityAction;
