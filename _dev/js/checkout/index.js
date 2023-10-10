/**
 * 2007-2017 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
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
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2017 PrestaShop SA
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */
import prestashop from 'prestashop';

function setUpCheckout() {
  $(prestashop.selectors.checkout.termsLink).on('click', (event) => {
    event.preventDefault();
    let url = $(event.target).attr('href');

    if (url) {
      // TODO: Handle request if no pretty URL
      url += '?content_only=1';
      $.get(url, (content) => {
        $(prestashop.selectors.modal)
          .find(prestashop.selectors.modalContent)
          .html($(content).find('.page-cms').contents());
      }).fail((resp) => {
        prestashop.emit('handleError', { eventType: 'clickTerms', resp });
      });
    }

    $(prestashop.selectors.modal).modal('show');
  });

  $(prestashop.selectors.checkout.giftCheckbox).on('click', () => {
    $('#gift').slideToggle();
  });
}

$(document).ready(() => {
  if ($('body#checkout').length === 1) {
    setUpCheckout();
  }

  prestashop.on('updatedDeliveryForm', (params) => {
    if (typeof params.deliveryOption === 'undefined' || params.deliveryOption === null) {
      return;
    }

    // Hide all carrier extra content ...
    document.querySelectorAll(prestashop.selectors.checkout.carrierExtraContent).forEach((element) => {
      element.classList.add('d-none');
    });

    // and show the one related to the selected carrier
    params.deliveryOption.nextElementSibling.classList.remove('d-none');
  });
});

$(document).on('change', '.checkout-option input[type="radio"]', (event) => {
  const $target = $(event.currentTarget);
  const $block = $target.closest('.checkout-option');
  const $relatedBlocks = $block.parent();

  $relatedBlocks.find('.checkout-option').removeClass('selected');
  $block.addClass('selected');
});
