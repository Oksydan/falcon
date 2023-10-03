import prestashop from 'prestashop';
import updateListingFacetsRequest from '../request/updateListingFacetsRequest';

/**
 * Build new facets url - add from-xhr param
 * @param {string} url - current url
 * @returns {string} - new url with from-xhr param
 */
const buildNewFacetsUrl = (url) => {
  const urlObject = new URL(url);
  const params = new URLSearchParams(urlObject.search);
  params.set('from-xhr', '1');

  return `${urlObject.origin}${urlObject.pathname}?${params.toString()}`;
};

const updateFacetsHandler = async (url) => {
  const newUrl = buildNewFacetsUrl(url);
  const { getRequest } = updateListingFacetsRequest(newUrl);

  try {
    const data = await getRequest();

    prestashop.emit('updateProductList', data);
    window.history.pushState(data, document.title, data.current_url);
  } catch (error) {
    prestashop.emit('handleError', {
      eventType: 'updateFacets',
      resp: {},
      error,
    });
  }
};

export default updateFacetsHandler;
