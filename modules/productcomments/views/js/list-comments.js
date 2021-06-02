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
  const commentsList = $('#product-comments-list');
  const emptyProductComment = $('#empty-product-comment');
  const commentsListUrl = commentsList.data('list-comments-url');
  const updateCommentUsefulnessUrl = commentsList.data('update-comment-usefulness-url');
  const reportCommentUrl = commentsList.data('report-comment-url');
  const commentPrototype = commentsList.data('comment-item-prototype');

  emptyProductComment.hide();
  $('.grade-stars').rating();

  prestashop.on('updatedProduct', function() {
    $('.product-comments-additional-info .grade-stars').rating();
  })

  document.addEventListener('updateRating', function() {
    $('.grade-stars').rating();
  });

  const updateCommentPostErrorModal = $('#update-comment-usefulness-post-error');

  const confirmAbuseModal = $('#report-comment-confirmation');
  const reportCommentPostErrorModal = $('#report-comment-post-error');
  const reportCommentPostedModal = $('#report-comment-posted');

  function showUpdatePostCommentErrorModal(errorMessage) {
    $('#update-comment-usefulness-post-error-message').html(errorMessage);
    updateCommentPostErrorModal.modal('show');
  }

  function showReportCommentErrorModal(errorMessage) {
    $('#report-comment-post-error-message').html(errorMessage);
    reportCommentPostErrorModal.modal('show');
  }

  function paginateComments(page) {
    $.get(commentsListUrl, {page: page}, function(jsonResponse) {
      if (jsonResponse.comments && jsonResponse.comments.length > 0) {
        populateComments(jsonResponse.comments);
        if (jsonResponse.comments_nb > jsonResponse.comments_per_page) {
          $('#product-comments-list-pagination').pagination({
            currentPage: page,
            items: jsonResponse.comments_nb,
            itemsOnPage: jsonResponse.comments_per_page,
            cssStyle: '',
            prevText: '<i class="material-icons font-reset align-middle">chevron_left</i>',
            nextText: '<i class="material-icons font-reset align-middle">chevron_right</i>',
            useAnchors: false,
            displayedPages: 2,
            onPageClick: paginateComments
          });
        } else {
          $('#product-comments-list-pagination').hide();
        }
      } else {
        commentsList.html('');
        emptyProductComment.show();
        commentsList.append(emptyProductComment);
      }
    });
  }

  function populateComments(comments) {
    commentsList.html('');
    comments.forEach(addComment);
  }

  function addComment(comment) {
    var commentTemplate = commentPrototype;
    var customerName = comment.customer_name;
    if (!customerName) {
      customerName = comment.firstname+' '+comment.lastname;
    }
    commentTemplate = commentTemplate.replace(/@COMMENT_ID@/, comment.id_product_comment);
    commentTemplate = commentTemplate.replace(/@PRODUCT_ID@/, comment.id_product);
    commentTemplate = commentTemplate.replace(/@CUSTOMER_NAME@/, customerName);
    commentTemplate = commentTemplate.replace(/@COMMENT_DATE@/, comment.date_add);
    commentTemplate = commentTemplate.replace(/@COMMENT_TITLE@/, comment.title);
    commentTemplate = commentTemplate.replace(/@COMMENT_COMMENT@/, comment.content);
    commentTemplate = commentTemplate.replace(/@COMMENT_USEFUL_ADVICES@/, comment.usefulness);
    commentTemplate = commentTemplate.replace(/@COMMENT_NOT_USEFUL_ADVICES@/, (comment.total_usefulness - comment.usefulness));
    commentTemplate = commentTemplate.replace(/@COMMENT_TOTAL_ADVICES@/, comment.total_usefulness);

    const $comment = $(commentTemplate);
    $('.grade-stars', $comment).rating({
      grade: comment.grade
    });
    $('.js-useful-review', $comment).click(function(e) {
      e.preventDefault();
      updateCommentUsefulness($comment, comment.id_product_comment, 1);
    });
    $('.js-not-useful-review', $comment).click(function(e) {
      e.preventDefault();
      updateCommentUsefulness($comment, comment.id_product_comment, 0);
    });
    $('.js-report-abuse', $comment).click(function(e) {
      e.preventDefault();
      confirmCommentAbuse(comment.id_product_comment);
    });

    commentsList.append($comment);
  }

  function updateCommentUsefulness($comment, commentId, usefulness) {
    $.post(updateCommentUsefulnessUrl, {id_product_comment: commentId, usefulness: usefulness}, function(jsonData){
      if (jsonData) {
        if (jsonData.success) {
          $('.js-useful-review-value', $comment).html(jsonData.usefulness);
          $('.js-not-useful-review-value', $comment).html(jsonData.total_usefulness - jsonData.usefulness);
        } else {
          const decodedErrorMessage = $("<div/>").html(jsonData.error).text();
          showUpdatePostCommentErrorModal(decodedErrorMessage);
        }
      } else {
        showUpdatePostCommentErrorModal(productCommentUpdatePostErrorMessage);
      }
    }).fail(function() {
      showUpdatePostCommentErrorModal(productCommentUpdatePostErrorMessage);
    });
  }

  function confirmCommentAbuse(commentId) {
    confirmAbuseModal.modal('show');
    confirmAbuseModal.one('modal:confirm', function(event, confirm) {
      if (!confirm) {
        return;
      }
      $.post(reportCommentUrl, {id_product_comment: commentId}, function(jsonData){
        if (jsonData) {
          if (jsonData.success) {
            reportCommentPostedModal.modal('show');
          } else {
            showReportCommentErrorModal(jsonData.error);
          }
        } else {
          showReportCommentErrorModal(productCommentAbuseReportErrorMessage);
        }
      }).fail(function() {
        showReportCommentErrorModal(productCommentAbuseReportErrorMessage);
      });
    })
  }

  paginateComments(1);
});
