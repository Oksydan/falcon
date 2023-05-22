import useHttpRequest from "@js/theme/components/http/useHttpRequest";
import prestashop from "prestashop";
import useHttpController from "@js/theme/components/http/useHttpController";

const { dispatch, abortAll } = useHttpController();

const updateProductAction = (productFormData, quantityWanted, quickview = false, isPreview = false) => new Promise((resolve, reject) => {
    abortAll();

    const { request, controller } = useHttpRequest(prestashop.urls.pages.product);

    const payload = {
        ajax: 1,
        action: 'refresh',
        quantity_wanted: quantityWanted,
        preview: isPreview ? 1 : 0,
        quickview: quickview ? 1 : 0,
        ...productFormData,
    };

    dispatch(request, controller)(({ request, controller, flush }) => {
        request
            .query(payload)
            .post()
            .json((resp) => {
                resolve(resp);

                flush();
            })
            .catch((e) => {
                flush();

                // IF ABORTED
                if (e instanceof DOMException) {
                    return;
                }

                reject();
            });
    });
});

export default updateProductAction;



