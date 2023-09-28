import DOMReady from '@js/theme/utils/DOMReady';
import listingController from './listingController';

const { init } = listingController();

DOMReady(() => {
  init();
});
