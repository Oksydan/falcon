import prestashop from 'prestashop';
import updateFacetsHandler from './handler/updateFacetsHandler';

/**
 * Listing controller for handling facet updates.
 * @returns {Object} An object with an initialization function.
 * @returns {Function} init - Initializes the listing controller.
 */
const listingController = () => {
  /**
   * Initializes the listing controller by subscribing to the 'updateFacets' event.
   */
  const init = () => {
    prestashop.on('updateFacets', updateFacetsHandler);
  };

  return {
    init,
  };
};

export default listingController;
