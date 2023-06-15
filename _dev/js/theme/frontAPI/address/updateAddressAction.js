import useHttpRequest from '@js/theme/components/http/useHttpRequest';
import useHttpController from '@js/theme/components/http/useHttpController';

const { dispatch, abortAll } = useHttpController();

const updateAddressAction = (url, idAddress, idCountry) => new Promise((resolve, reject) => {
  abortAll();

  const { request, controller } = useHttpRequest(url, {});

  const payload = {
    id_address: idAddress,
    id_country: idCountry,
  };

  dispatch(request, controller)(() => request
    .query(payload)
    .post()
    .json((resp) => {
      resolve(resp);
    })
    .catch((e) => {
      // IF ABORTED
      if (e instanceof DOMException) {
        return;
      }

      reject();
    }));
});

export default updateAddressAction;
