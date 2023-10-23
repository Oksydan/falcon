import addressController from './addressController';
import { DOMReady } from '../../../utils/DOM/DOMHelpers';

const { init } = addressController();

DOMReady(() => {
  init();
});
