import useHttpRequest from '@js/theme/components/http/useHttpRequest';
import useHttpController from '@js/theme/components/http/useHttpController';

const { dispatch, abortAll } = useHttpController();

const updateListingFacetsAction = (url) => new Promise((resolve, reject) => {
  abortAll();

  const { request, controller } = useHttpRequest(url, {
    headers: {
      accept: 'application/json, text/javascript, */*',
    },
  });

  dispatch(request, controller)(() => request
    .get()
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

export default updateListingFacetsAction;
