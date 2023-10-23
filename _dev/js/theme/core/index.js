import './selectors';

import './cart/index';
import './product/index';
import './listing/index';
import './address/index';

import psShowHide from './display/psShowHide';
import emailIdn from './email/emailIdn';
import { DOMReady } from '../../utils/DOM/DOMHelpers';

DOMReady(() => {
  psShowHide();
  emailIdn('input[type="email"]');
});
