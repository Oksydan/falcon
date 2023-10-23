import prestashop from 'prestashop';
import { DOMReady } from '../../../utils/DOM/DOMHelpers';
import cartController from './cartController';

prestashop.cart = prestashop.cart || {};

const { init } = cartController();

DOMReady(() => {
  init();
});
