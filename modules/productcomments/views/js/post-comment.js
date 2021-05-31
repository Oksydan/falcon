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

jQuery(document).ready(function () {
  const $ = jQuery;
  $('body').on('click', '.post-product-comment', function (event) {
    event.preventDefault();
    showPostCommentModal();
  });

  const postCommentModal = $('#post-product-comment-modal');
  postCommentModal.on('hidden.bs.modal', function () {
    postCommentModal.modal('hide');
    clearPostCommentForm();
  });

  const commentPostedModal = $('#product-comment-posted-modal');
  const commentPostErrorModal = $('#product-comment-post-error');

  function showPostCommentModal() {
    commentPostedModal.modal('hide');
    commentPostErrorModal.modal('hide');
    postCommentModal.modal('show');
  }

  function showCommentPostedModal() {
    postCommentModal.modal('hide');
    commentPostErrorModal.modal('hide');
    clearPostCommentForm();
    commentPostedModal.modal('show');
  }

  function showPostErrorModal(errorMessage) {
    postCommentModal.modal('hide');
    commentPostedModal.modal('hide');
    clearPostCommentForm();
    $('#product-comment-post-error-message').html(errorMessage);
    commentPostErrorModal.modal('show');
  }

  function clearPostCommentForm() {
    $('#post-product-comment-form input[type="text"]').val('');
    $('#post-product-comment-form input[type="text"]').removeClass('valid error');
    $('#post-product-comment-form textarea').val('');
    $('#post-product-comment-form textarea').removeClass('valid error');
    $('#post-product-comment-form .criterion-rating input').val(3).change();
  }

  function initCommentModal() {
    $('#post-product-comment-modal .grade-stars').rating();
    $('body').on('click', '.post-product-comment', function (event) {
      event.preventDefault();
      showPostCommentModal();
    });

    $('#post-product-comment-form').submit(submitCommentForm);
  }

  function submitCommentForm(event) {
    event.preventDefault();
    var formData = $(this).serializeArray();
    if (!validateFormData(formData)) {
      return;
    }
    $.post($(this).attr('action'), $(this).serialize(), function(jsonData) {
      if (jsonData) {
        if (jsonData.success) {
          clearPostCommentForm();
          showCommentPostedModal();
        } else {
          if (jsonData.errors) {
            var errorList = '<ul>';
            for (var i = 0; i < jsonData.errors.length; ++i) {
              errorList += '<li>' + jsonData.errors[i] + '</li>';
            }
            errorList += '</ul>';
            showPostErrorModal(errorList);
          } else {
            const decodedErrorMessage = $("<div/>").html(jsonData.error).text();
            showPostErrorModal(decodedErrorMessage);
          }
        }
      } else {
        showPostErrorModal(productCommentPostErrorMessage);
      }
    }).fail(function() {
      showPostErrorModal(productCommentPostErrorMessage);
    });
  }

  function validateFormData(formData) {
    var isValid = true;
    formData.forEach(function(formField) {
      const fieldSelector = '#post-product-comment-form [name="'+formField.name+'"]';
      if (!formField.value) {
        $(fieldSelector).addClass('error');
        $(fieldSelector).removeClass('valid');
        isValid = false;
      } else {
        $(fieldSelector).removeClass('error');
        $(fieldSelector).addClass('valid');
      }
    });

    return isValid;
  }

  initCommentModal();
});
