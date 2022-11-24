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

<div class="product-comment-list-item pb-4 mb-4 border-bottom" data-product-comment-id="@COMMENT_ID@" data-product-id="@PRODUCT_ID@">
  <div class="d-flex mb-2 align-items-center">
    <div class="font-weight-bold">
      @CUSTOMER_NAME@
    </div>
    {* <div class="text-muted font-sm ml-2">
      @COMMENT_DATE@
    </div> *}
    <div class="grade-stars flex-shrink-0 flex-grow-0 ml-auto"></div>
  </div>

  <div class="comment-content">
    <p class="h5 mb-3">@COMMENT_TITLE@</p>
    <p class="font-sm">@COMMENT_COMMENT@</p>
    <div class="d-flex">
      {if $usefulness_enabled}
        <div class="mr-2">
          <a href="#" role="button" class="btn btn-text btn-sm d-inline-flex align-items-center font-lg js-useful-review">
            <i class="material-icons text-reset font-reset thumb_up"></i>
            <span class="js-useful-review-value font-sm ml-1">@COMMENT_USEFUL_ADVICES@</span>
          </a>
          <a href="#" role="button" class="btn btn-text btn-sm d-inline-flex align-items-center font-lg js-not-useful-review">
            <i class="material-icons text-reset font-reset thumb_down"></i>
            <span class="js-not-useful-review-value font-sm ml-1">@COMMENT_NOT_USEFUL_ADVICES@</span>
          </a>
        </div>
      {/if}

      <div class="ml-auto">
        <a href="#" role="button" class="btn btn-text btn-sm d-inline-flex align-items-center font-lg js-report-abuse" title="{l s='Report abuse' d='Modules.Productcomments.Shop'}">
          <i class="material-icons text-reset font-reset outlined_flag"></i>
        </a>
      </div>
    </div>
  </div>
</div>
