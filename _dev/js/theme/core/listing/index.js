import { DOMReady } from '../../../utils/DOM/DOMHelpers';
import listingController from './listingController';

const { init } = listingController();

DOMReady(() => {
  init();
});
