import $ from 'jquery';

import './selectors';

import { psShowHide } from './common';
import initEmailFields from './email-idn';

$(() => {
  psShowHide();
  initEmailFields('input[type="email"]');
});
