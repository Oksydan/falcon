import prestashop from 'prestashop';
import DOMReady from '../../utils/DOMReady';
import cartController from './cartController';

prestashop.cart = prestashop.cart || {};

const { init } = cartController();

DOMReady(() => {
  init();
});
