import useHttpRequest from "../../../components/http/useHttpRequest";

const deleteVoucherFromCartRequest = (url, payload) => {
    const { request } = useHttpRequest(url);

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

}

export default deleteVoucherFromCartRequest;
