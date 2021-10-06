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
{block name='cart_summary_product_line'}
  <div class="cart-products">
    <div class="cart-products__thumb">
      <img
        {if $product.default_image}
          {generateImagesSources image=$product.default_image size='cart_default' lazyload=false}
        {else}
          src="{$urls.no_picture_image.bySize.cart_default.url}"
        {/if}
        alt="{$product.name|escape:'quotes'}"
        class="img-fluid rounded"
        width="{$product.default_image.bySize.cart_default.width}"
        height="{$product.default_image.bySize.cart_default.height}">
    </div>
    <div class="cart-products__desc">
      <p class="h6 mb-2 font-sm">
        <span class="text-muted">{$product.quantity}x</span> {$product.name}
      </p>

      <ul class="mb-2">
        <li class="text-muted small">
          <span>{l s='Quantity' d='Shop.Theme.Catalog'}:</span>
          <span class="font-weight-bold">{$product.quantity}</span>
        </li>
        {foreach from=$product.attributes key="attribute" item="value"}
          <li class="text-muted small">
            <span>{$attribute}:</span>
            <span class="font-weight-bold">{$value}</span>
          </li>
        {/foreach}
      </ul>

      <span class="price price--sm">
        {$product.price}
      </span>
    </div>
  </div>
{/block}
