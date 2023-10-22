import prestashop from 'prestashop';
import updateListingFacetsRequest from '../request/updateListingFacetsRequest';

/**
 * Builds a new facets URL by adding the 'from-xhr' parameter.
 * @param {string} url - The current URL.
 * @returns {string} - The new URL with the 'from-xhr' parameter.
 */
const buildNewFacetsUrl = (url) => {
  const urlObject = new URL(url);
  const params = new URLSearchParams(urlObject.search);
  params.set('from-xhr', '1');

  return `${urlObject.origin}${urlObject.pathname}?${params.toString()}`;
};

/**
 * Handles the update of facets by making a request to the updated URL.
 * @param {string} url - The current URL.
 * @returns {Promise<void>} - A promise resolving to void.
 */
const updateFacetsHandler = async (url) => {
  // Build a new URL with the 'from-xhr' parameter
  const newUrl = buildNewFacetsUrl(url);

  // Get the request function for updating facets
  const { getRequest } = updateListingFacetsRequest(newUrl);

  try {
    // Make the request and get the data
    const data = await getRequest();

    // Emit an event to update the product list
    prestashop.emit('updateProductList', data);

    // Update the browser history with the new URL
    window.history.pushState(data, document.title, data.current_url);
  } catch (error) {
    // Handle errors by emitting an error event
    prestashop.emit('handleError', {
      eventType: 'updateFacets',
      resp: {},
      error,
    });
  }
};

export default updateFacetsHandler;
