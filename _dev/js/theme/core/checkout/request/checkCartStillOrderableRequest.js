import useHttpRequest from '@js/theme/components/http/useHttpRequest';

const checkCartStillOrderableRequest = (url) => {
    const payload = {
        ajax: 1,
        action: 'checkCartStillOrderable',
    };

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
    }
}

export default checkCartStillOrderableRequest;
