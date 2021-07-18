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
    {if $listingType === 'listing'}
      class="products-list__block products-list__block--grid"
    {elseif $listingType === 'slider'}
      class="swiper-slide product-slider__item col-6 col-md-4 col-lg-3"
    {/if}
    >
    <article
      class="product-miniature card js-product-miniature p-2 h-100 {block name='product_miniature_item_class'}{/block}"
      data-id-product="{$product.id_product}" data-id-product-attribute="{$product.id_product_attribute}"
      >
      {include file='catalog/_partials/miniatures/_partials/product-thumb.tpl' thumbExtraClass='mb-2'}

      {include file='catalog/_partials/miniatures/_partials/product-title.tpl'}

      {include file='catalog/_partials/miniatures/_partials/product-prices.tpl'}

      {block name='product_form'}
        {include file='catalog/_partials/miniatures/_partials/product-form.tpl'}
      {/block}

    </article>
  </div>
{/block}
