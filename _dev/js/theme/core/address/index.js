import addressController from './addressController';
import DOMReady from '../../utils/DOMReady';

const { init } = addressController();

DOMReady(() => {
  init();
});
