/**
 * 2007-2020 PrestaShop.
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
 * @copyright 2007-2020 PrestaShop SA
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 */

$(document).ready(function() {

  $('#email-alert-modal').on('hidden.bs.modal', function() {
    resetForm();
    clearAlert();
  })

  $(document).on('click', '.js-mailalert-submit', function(e) {
    e.preventDefault();
    addNotification(e);
  });

  $('.js-remove-email-alert').on('click', function(e){
    e.preventDefault();

    var $self = $(this);
    var ids = $self.attr('rel').replace('js-id-emailalerts-', '');
    ids = ids.split('-');
    var id_product_mail_alert = ids[0];
    var id_product_attribute_mail_alert = ids[1];
    var $parent = $self.closest('.js-mailalert-product-miniature');

    $.ajax({
      url: $self.data('url'),
      type: "POST",
      data: {
        'id_product': id_product_mail_alert,
        'id_product_attribute': id_product_attribute_mail_alert
      },
      success: function(result)
      {
        if (result == '0')
        {
          $parent.fadeOut("normal", function()
          {
            $parent.remove();
          });
        }
      }
    });
  });

  function resetForm() {
    $('.js-mailalert-email').val('');
    $('.js-mailalert [name=psgdpr_consent_checkbox]').prop('checked', false);
  }

  function  addNotification(e) {
    var $idInputs = $('.js-mailalert-id-input');
    var $emailInput = $('.js-mailalert-email');
    var $btn = $(e.currentTarget);
    var $modal = $('#email-alert-modal');

    $btn.attr('disabled', true);

    clearAlert();

    $.ajax({
      type: 'POST',
      url: $('.js-mailalert').data('url'),
      data: 'id_product=' + $idInputs[0].value + '&id_product_attribute=' + $idInputs[1].value + '&customer_email=' + $emailInput.val(),
      success: function (resp) {
        resp = JSON.parse(resp);
        var alertType = resp.error ? 'danger' : 'success';

        setAlert(resp.message, alertType);


        if (resp.error) {
          $btn.removeAttr('disabled');
        } else {
          setTimeout(function() {
            $modal.modal('hide');
            $('.js-mailalert-modal-btn').hide();
          }, 2500);
        }
      }
    });
  }

  function setAlert(message, type) {
    var $alertBox = $('.js-mailalert-alert-box');
    var $alert = $('<div>').addClass('alert');

    if (type == 'success') {
      $alert.addClass('alert-success');
    } else if (type == 'danger') {
      $alert.addClass('alert-danger');
    }

    $alert.text(message);

    $alertBox.html($alert)
  }

  function clearAlert() {
    $('.js-mailalert-alert-box').html('');
  }
});
