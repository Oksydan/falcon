import wretch from 'wretch';
import QueryStringAddon from 'wretch/addons/queryString';
import AbortAddon from 'wretch/addons/abort';

/**
 * Creates an HTTP request object and controller.
 *
 * @function
 * @param {string} url - The request URL.
 * @param {object} [options={}] - The request options.
 * @param {array} [addons=[]] - The request addons from wretch/addons.
 * @returns {{request: wretch, controller: AbortController}} An object containing the HTTP request and controller.
 */
const useHttpRequest = (url, options = {}, addons = []) => {
  // Set default headers if not provided
  if (!options?.headers) {
    options.headers = {};
  }

  // Set default Content-Type header
  if (!(options.headers?.['Content-Type'])) {
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  }

  // Set default X-Requested-With header
  if (!(options.headers?.['X-Requested-With'])) {
    options.headers['X-Requested-With'] = 'XMLHttpRequest';
  }

  // Add default addons and provided addons
  addons = [
    AbortAddon(),
    QueryStringAddon,
    ...addons,
  ];

  // Create an AbortController
  const controller = new AbortController();

  // Create a wretch request with addons
  let request = wretch(url, options);
  addons.forEach((addon) => {
    request = request.addon(addon);
  });

  // Attach the AbortController to the request
  request = request.signal(controller);

  return {
    request,
    controller,
  };
};

export default useHttpRequest;
