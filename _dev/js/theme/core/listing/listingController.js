import prestashop from 'prestashop';
import updateFacetsHandler from './handler/updateFacetsHandler';

const listingController = () => {
  const init = () => {
    prestashop.on('updateFacets', updateFacetsHandler);
  };

  return {
    init,
  };
};

export default listingController;
