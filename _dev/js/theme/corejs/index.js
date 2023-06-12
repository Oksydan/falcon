import $ from 'jquery';

import './selectors';

import './migrate-mute';
import 'jquery-migrate';
import 'jquery.browser';

import './checkout';

import { psShowHide } from './common';
import initEmailFields from './email-idn';

$(() => {
  psShowHide();
  initEmailFields('input[type="email"]');
});
