import productController from './productController';
import { DOMReady } from '../../../utils/DOM/DOMHelpers';

const { init } = productController();

DOMReady(() => {
  init();
});
