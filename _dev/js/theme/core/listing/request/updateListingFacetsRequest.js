import useHttpRequest from '../../../components/http/useHttpRequest';
import useHttpController from '../../../components/http/useHttpController';

const { dispatch, abortAll } = useHttpController();

/**
 * @typedef ServerResponse
 * @type {object}
 * @property {string} current_url - new url
 * @property {boolean} js_enabled - is js enabled
 * @property {string} label - listing label
 * @property {object} pagination - pagination object
 * @property {number} pagination.current_page - pagination current page
 * @property {number} pagination.items_shown_from - pagination items shown from
 * @property {number} pagination.items_shown_to - pagination items shown to
 * @property {array} pagination.pages - pagination pages array
 * @property {object[]} products - array of front representations of products
 * @property {string} rendered_active_filters - active filters html content
 * @property {string} rendered_facets - facets html content
 * @property {string} rendered_products - listing products html content
 * @property {string} rendered_products_bottom - listing products bottom html content
 * @property {string} rendered_products_header - listing products header html content
 * @property {string} rendered_products_top - listing products top html content
 * @property {object} result - result empty object
 * @property {object[]} sort_orders - available sort orders
 * @property {string} sort_selected - selected sort order
 */

/**
 * Update listing facets request
 * @param url {string} - new url with from-xhr param
 * @example
 *  const { getRequest } = updateListingFacetsRequest(url);
 *
 *  try {
 *    const resp = await getRequest();
 *  } catch (error) {
 *    console.error(error);
 *  }
 * @returns {{getRequest: (function(): Promise<ServerResponse>)}}
 */
const updateListingFacetsRequest = (url) => {
  const { request, controller } = useHttpRequest(url, {
    headers: {
      accept: 'application/json',
    },
  });

  const getRequest = () => new Promise((resolve, reject) => {
    abortAll();

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

        reject(e);
      }));
  });

  return {
    getRequest,
  };
};

export default updateListingFacetsRequest;
