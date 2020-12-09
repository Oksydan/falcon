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
  <div itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
    {if isset($position)}<meta itemprop="position" content="{$position}" />{/if}
    <article class="product-miniature js-product-miniature" data-id-product="{$product.id_product}" data-id-product-attribute="{$product.id_product_attribute}" itemprop="item" itemscope itemtype="http://schema.org/Product">
      <div class="product-miniature__container">

        {include file='catalog/_partials/miniatures/_partials/product-microdata.tpl'}

        {include file='catalog/_partials/miniatures/_partials/product-thumb.tpl'}

        {include file='catalog/_partials/miniatures/_partials/product-title.tpl'}

        {include file='catalog/_partials/miniatures/_partials/product-prices.tpl'}

        {block name='product_reviews'}
          {hook h='displayProductListReviews' product=$product}
        {/block}

        {include file='catalog/_partials/miniatures/_partials/product-information.tpl'}

      </div>
    </article>
  </div>
{/block}
