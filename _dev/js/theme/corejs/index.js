import $ from 'jquery';

import './migrate-mute';
import 'jquery-migrate';
import 'jquery.browser';

import './selectors';
import './checkout';

import { psShowHide } from './common';
import initEmailFields from './email-idn';

$(() => {
  psShowHide();
  initEmailFields('input[type="email"]');
});
