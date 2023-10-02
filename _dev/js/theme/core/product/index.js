import productController from './productController';
import DOMReady from '../../utils/DOMReady';

const { init } = productController();

DOMReady(() => {
  init();
});
