import DOMReady from '@js/theme/utils/DOMReady';
import prestashop from 'prestashop';
import cartController from './cartController';

prestashop.cart = prestashop.cart || {};

const { init } = cartController();

DOMReady(() => {
  init();
});
