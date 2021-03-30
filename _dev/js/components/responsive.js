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
import prestashop from 'prestashop';

const isMobile = () => prestashop.responsive.current_width < prestashop.responsive.min_width;

prestashop.responsive = prestashop.responsive || {};

prestashop.responsive.current_width = window.innerWidth;
prestashop.responsive.min_width = 768;
prestashop.responsive.mobile = isMobile();

function swapChildren(obj1, obj2) {
  const temp = obj2.children().detach();
  obj2.empty().append(obj1.children().detach());
  obj1.append(temp);
}

function toggleMobileStyles() {
  if (prestashop.responsive.mobile) {
    $("*[id^='_desktop_']").each((idx, el) => {
      const target = $(`#${el.id.replace('_desktop_', '_mobile_')}`);

      if (target.length) {
        swapChildren($(el), target);
      }
    });

    $('[data-collapse-hide-mobile]').collapse('hide');
  } else {
    $("*[id^='_mobile_']").each((idx, el) => {
      const target = $(`#${el.id.replace('_mobile_', '_desktop_')}`);

      if (target.length) {
        swapChildren($(el), target);
      }
    });

    $('[data-collapse-hide-mobile]').not('.show').collapse('show');
    $('[data-modal-hide-mobile].show').modal('hide');
  }
  prestashop.emit('responsive update', {
    mobile: prestashop.responsive.mobile,
  });
}

$(window).on('resize', () => {
  const {responsive} = prestashop;
  const cw = responsive.current_width;
  const mw = responsive.min_width;
  const w = window.innerWidth;
  const toggle = (cw >= mw && w < mw) || (cw < mw && w >= mw);
  responsive.current_width = w;
  responsive.mobile = responsive.current_width < responsive.min_width;
  if (toggle) {
    toggleMobileStyles();
  }
});

$(() => {
  if (prestashop.responsive.mobile) {
    toggleMobileStyles();
  }
});
