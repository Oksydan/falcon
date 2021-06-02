{**
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
 *}
<script type="text/javascript">
  var productCommentUpdatePostErrorMessage = '{l|escape:'javascript' s='Sorry, your review appreciation cannot be sent.' d='Modules.Productcomments.Shop'}';
  var productCommentAbuseReportErrorMessage = '{l|escape:'javascript' s='Sorry, your abuse report cannot be sent.' d='Modules.Productcomments.Shop'}';
</script>

<div class="mb-4">
  <div class="d-flex my-4" id="product-comments-list-header">
    <div class="comments-nb h3 d-flex align-items-center mr-3 mb-0">
      <i class="material-icons mr-2">chat</i>
      {l s='Comments' d='Modules.Productcomments.Shop'} ({$nb_comments})
    </div>
    <div class="ml-auto">
      {include file='module:productcomments/views/templates/hook/average-grade-stars.tpl' grade=$average_grade}
    </div>
  </div>

  {include file='module:productcomments/views/templates/hook/product-comment-item-prototype.tpl' assign="comment_prototype"}
  {include file='module:productcomments/views/templates/hook/empty-product-comment.tpl'}
  <div class="row">
    <div class="col-md-12 col-sm-12"
        id="product-comments-list"
        data-list-comments-url="{$list_comments_url nofilter}"
        data-update-comment-usefulness-url="{$update_comment_usefulness_url nofilter}"
        data-report-comment-url="{$report_comment_url nofilter}"
        data-comment-item-prototype="{$comment_prototype|escape:'html_attr'}">
    </div>
  </div>

  <div class="flex-column flex-sm-row d-flex align-items-center" id="product-comments-list-footer">
    <div id="product-comments-list-pagination" class="comments-pagination ml-sm-auto order-sm-1"></div>
    {if $post_allowed && $nb_comments != 0}
      <div class="my-sm-2 mt-3">
        <button class="btn btn-primary js-post-product-comment">
          <i class="material-icons btn-icon mr-1">edit</i>
          {l s='Write your review' d='Modules.Productcomments.Shop'}
        </button>
      </div>
    {/if}
  </div>

  {* Appreciation post error modal *}
  {include file='module:productcomments/views/templates/hook/alert-modal.tpl'
    modal_id='update-comment-usefulness-post-error'
    modal_title={l s='Your review appreciation cannot be sent' d='Modules.Productcomments.Shop'}
  }

  {* Confirm report modal *}
  {include file='module:productcomments/views/templates/hook/confirm-modal.tpl'
    modal_id='report-comment-confirmation'
    modal_title={l s='Report comment' d='Modules.Productcomments.Shop'}
    modal_message={l s='Are you sure that you want to report this comment?' d='Modules.Productcomments.Shop'}
  }

  {* Report comment posted modal *}
  {include file='module:productcomments/views/templates/hook/alert-modal.tpl'
    modal_id='report-comment-posted'
    modal_title={l s='Report sent' d='Modules.Productcomments.Shop'}
    modal_message={l s='Your report has been submitted and will be considered by a moderator.' d='Modules.Productcomments.Shop'}
  }

  {* Report abuse error modal *}
  {include file='module:productcomments/views/templates/hook/alert-modal.tpl'
    modal_id='report-comment-post-error'
    modal_title={l s='Your report cannot be sent' d='Modules.Productcomments.Shop'}
  }
</div>

