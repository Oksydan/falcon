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
{block name='pack_miniature_item'}
  <div class="card overflow-hidden">
    <div class="row no-gutters flex-nowrap">
      <div class="col-4 col-md-3 col-xl-2">
        <a href="{$product.url}" title="{$product.name}">
          <img
            class="img-fluid lazyload"
            width="{$product.default_image.medium.width}"
            height="{$product.default_image.medium.height}"
            data-src="{$product.default_image.medium.url}"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='{$product.default_image.medium.width}' height='{$product.default_image.medium.height}' viewBox='0 0 1 1'%3E%3C/svg%3E"
            {if !empty($product.default_image.legend)}
              alt="{$product.default_image.legend}"
              title="{$product.default_image.legend}"
            {else}
              alt="{$product.name}"
            {/if}
            loading="lazy"
            data-full-size-image-url="{$product.default_image.large.url}"
          >
        </a>
      </div>
      <div class="card-body align-self-center">
        <p class="pack-product-name h6 mb-2">
          <a href="{$product.url}" class="text-reset" title="{$product.name}">
            <span class="text-muted">{$product.pack_quantity}x</span> {$product.name}
          </a>
        </p>

        {if $showPackProductsPrice}
          <div class="price">
            {$product.price}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/block}
