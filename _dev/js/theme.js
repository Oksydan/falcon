/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 */

import $ from 'jquery';
import './boostrap/boostrap-imports';
import 'bootstrap-touchspin';
import 'jquery-hoverintent';
import './components/dynamic-bootstrap-components';

import './components/selectors';
import './components/sliders';
import './components/responsive';
import './components/customer';
import './components/quickview';
import './components/product';
import './components/cart/cart';
import './components/cart/block-cart';

import prestashop from 'prestashop';
import EventEmitter from 'events';
import Form from './components/form';
import TopMenu from './components/TopMenu';
import CustomSelect from './components/CustomSelect';

import PageLazyLoad from './components/Lazyload';
import PageLoader from './components/PageLoader';

/* eslint-disable */
// "inherit" EventEmitter
for (const i in EventEmitter.prototype) {
  prestashop[i] = EventEmitter.prototype[i];
}
/* eslint-enable */

prestashop.customSelect = new CustomSelect({
  selector: 'select',
  excludeSelector: '.normal-select',
});

prestashop.pageLazyLoad = new PageLazyLoad({
  selector: '.lazyload',
});

prestashop.pageLoader = new PageLoader();

$(document).ready(() => {
  prestashop.customSelect.init();
  accLinksTriggerActive();
  Form.init();
  const topMenu = new TopMenu('#_desktop_top_menu .js-main-menu');

  prestashop.on('updatedAddressForm', () => {
    prestashop.customSelect.init();
  });

  topMenu.init();

  $('.js-select-link').on('change', ({target}) => {
    window.location.href = $(target).val();
  });
});

function accLinksTriggerActive() {
  const url = window.location.pathname;
  $('.js-customer-links a').each((i, el) => {
    const $el = $(el);

    if ($el.attr('href').indexOf(url) !== -1) {
      $el.addClass('active');
    }
  });
}
