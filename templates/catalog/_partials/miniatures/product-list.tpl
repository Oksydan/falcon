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
 {block name='product_miniature_item'}
  {$listingType = $type|default:'listing'}
  <div
    class="products-list__block products-list__block--list"
    >
    <article class="product-miniature card js-product-miniature p-2 h-100 {block name='product_miniature_item_class'}{/block}" data-id-product="{$product.id_product}" data-id-product-attribute="{$product.id_product_attribute}">

      <div class="row">
        <div class="col-md-4 col-lg-3">
          {include file='catalog/_partials/miniatures/_partials/product-thumb.tpl'}
        </div>
        <div class="col-md-8 col-lg-9">

          <div class="d-flex flex-column h-100">
            {include file='catalog/_partials/miniatures/_partials/product-title.tpl'}

            {block name='product_desc'}
              {if $product.description_short}
                <div class="product-miniature__desc">
                  {$product.description_short nofilter}
                </div>
              {/if}
            {/block}

            <div class="row mt-auto">
              <div class="col">
                {include file='catalog/_partials/miniatures/_partials/product-prices.tpl'}
              </div>
              <div class="col">
                {include file='catalog/_partials/miniatures/_partials/product-form.tpl'}
              </div>
            </div>
          </div>

        </div>
      </div>

    </article>
  </div>
{/block}
