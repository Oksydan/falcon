import wretch from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import AbortAddon from 'wretch/addons/abort';

const useHttpRequest = (url, options = {}, addons = []) => {
  if (!options?.headers) {
    options.headers = {};
  }

  if (!(options.headers?.['Content-Type'])) {
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  }

  if (!(options.headers?.['X-Requested-With'])) {
    options.headers['X-Requested-With'] = 'XMLHttpRequest';
  }

  addons = [
    AbortAddon(),
    QueryStringAddon,
    ...addons,
  ];

  const controller = new AbortController();
  let request = wretch(url, options);

  addons.forEach((addon) => {
    request = request.addon(addon);
  });

  request = request.signal(controller);

  return {
    request,
    controller,
  };
};

export default useHttpRequest;
