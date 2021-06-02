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
  var productCommentPostErrorMessage = '{l s='Sorry, your review cannot be posted.' d='Modules.Productcomments.Shop' js=1}';
</script>

<div id="post-product-comment-modal" class="modal fade product-comment-modal" role="dialog" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title h5">{l s='Write your review' d='Modules.Productcomments.Shop'}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form id="post-product-comment-form" action="{$post_comment_url nofilter}" method="POST">
        <div class="modal-body">
          {if $criterions|@count > 0}
            <ul id="criterions_list">
              {foreach from=$criterions item='criterion'}
                <li>
                  <div class="criterion-rating d-flex">
                    <label class="mb-0 mr-1">{$criterion.name|escape:'html':'UTF-8'}:</label>
                    <div
                      class="grade-stars"
                      data-grade="3"
                      data-input="criterion[{$criterion.id_product_comment_criterion}]">
                    </div>
                  </div>
                </li>
              {/foreach}
            </ul>
          {/if}

          <div class="form-group">
            <label for="comment_title" class="form-label required">{l s='Title' d='Modules.Productcomments.Shop'}</label>
            <input class="form-control" name="comment_title" type="text" value=""/>
          </div>

          {if !$logged}
            <div class="form-group">
              <label class="form-label required" for="customer_name">{l s='Your name' d='Modules.Productcomments.Shop'}</label>
              <input class="form-control" name="customer_name" type="text" value=""/>
            </div>
          {/if}

          <div class="form-group">
            <label class="form-label required" for="comment_content">{l s='Review' d='Modules.Productcomments.Shop'}</label>
            <textarea class="form-control" rows="4" name="comment_content"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary btn-block">
            {l s='Send' d='Modules.Productcomments.Shop'}
          </button>
          <button type="button" class="btn btn-text btn-block" data-dismiss="modal" aria-label="{l s='Cancel' d='Modules.Productcomments.Shop'}">
            {l s='Cancel' d='Modules.Productcomments.Shop'}
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

{* Comment posted modal *}
{if $moderation_active}
  {assign var='comment_posted_message' value={l s='Your comment has been submitted and will be available once approved by a moderator.' d='Modules.Productcomments.Shop'}}
{else}
  {assign var='comment_posted_message' value={l s='Your comment has been added!' d='Modules.Productcomments.Shop'}}
{/if}
{include file='module:productcomments/views/templates/hook/alert-modal.tpl'
  modal_id='product-comment-posted-modal'
  modal_title={l s='Review sent' d='Modules.Productcomments.Shop'}
  modal_message=$comment_posted_message
}

{* Comment post error modal *}
{include file='module:productcomments/views/templates/hook/alert-modal.tpl'
  modal_id='product-comment-post-error'
  modal_title={l s='Your review cannot be sent' d='Modules.Productcomments.Shop'}
  icon='error'
}
