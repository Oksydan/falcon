import useHttpRequest from '../../../../utils/http/useHttpRequest';
import useHttpController from '../../../../utils/http/useHttpController';
import GenericHttpRequestError from '../../../../utils/http/error/GenericHttpRequestError';

const { dispatch, abortAll } = useHttpController();

/**
 * @typedef {Object} ServerResponse
 * @property {string} current_url - The new URL.
 * @property {boolean} js_enabled - Indicates whether JavaScript is enabled.
 * @property {string} label - The listing label.
 * @property {Object} pagination - Pagination information.
 * @property {number} pagination.current_page - The current page in pagination.
 * @property {number} pagination.items_shown_from - The number of items shown from.
 * @property {number} pagination.items_shown_to - The number of items shown to.
 * @property {number[]} pagination.pages - Array of pagination pages.
 * @property {Object[]} products - Array of front representations of products.
 * @property {string} rendered_active_filters - HTML content for active filters.
 * @property {string} rendered_facets - HTML content for facets.
 * @property {string} rendered_products - HTML content for listing products.
 * @property {string} rendered_products_bottom - HTML content for listing products bottom.
 * @property {string} rendered_products_header - HTML content for listing products header.
 * @property {string} rendered_products_top - HTML content for listing products top.
 * @property {Object} result - Empty result object.
 * @property {Object[]} sort_orders - Available sort orders.
 * @property {string} sort_selected - The selected sort order.
 */

/**
 * Generates an update listing facets request.
 * @param {string} url - The new URL with the 'from-xhr' parameter.
 * @example
 * const { getRequest } = updateListingFacetsRequest(url);
 *
 * try {
 *   const resp = await getRequest();
 * } catch (error) {
 *   console.error(error);
 * }
 * @returns {{getRequest: (function(): Promise<ServerResponse>)}}
 */
const updateListingFacetsRequest = (url) => {
  // Create an HTTP request with the specified URL and headers
  const { request, controller } = useHttpRequest(url, {
    headers: {
      accept: 'application/json',
    },
  });

  /**
   * Sends an asynchronous GET request to update listing facets.
   * @returns {Promise<ServerResponse>} - A promise resolving to the server response.
   */
  const getRequest = () => new Promise((resolve, reject) => {
    // Abort all previous requests
    abortAll();

    // Dispatch the request and use the controller
    dispatch(request, controller)(() => request
      .get()
      .json((resp) => {
        resolve(resp);
      })
      .catch((e) => {
        // Handle abort (DOMException)
        if (e instanceof DOMException) {
          return;
        }

        // Reject with a generic HTTP request error
        reject(new GenericHttpRequestError('Error while sending request'));
      }));
  });

  return {
    getRequest,
  };
};

export default updateListingFacetsRequest;
