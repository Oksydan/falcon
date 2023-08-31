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
<div class="modal fade js-product-images-modal" id="product-modal">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <div class="js-modal-gallery modal-gallery swiper swiper-custom">
        {if $product.default_image}
          {images_block webpEnabled=$webpEnabled}
            <div class="modal-gallery__list swiper-wrapper">
              <div class="swiper-slide modal-gallery__elem">
                <img
                  class="rounded img-fluid lazyload"
                  {generateImagesSources image=$product.default_image size='large_default' lazyload=false}
                  width="{$product.default_image.bySize.large_default.width}"
                  height="{$product.default_image.bySize.large_default.height}"
                  {if !empty($product.default_image.legend)}
                    alt="{$product.default_image.legend}"
                    title="{$product.default_image.legend}"
                  {else}
                    alt="{$product.name}"
                  {/if}
                >
              </div>

              {if $product.images|count > 1}
                {foreach from=$product.images item=image}
                  {if $image.id_image === $product.default_image.id_image}
                    {continue}
                  {/if}

                  <div class="swiper-slide modal-gallery__elem">
                    <img
                      class="rounded img-fluid lazyload"
                      {generateImagesSources image=$image size='large_default' lazyload=true}
                      width="{$image.bySize.large_default.width}"
                      height="{$image.bySize.large_default.height}"
                      {if !empty($product.default_image.legend)}
                        alt="{$image.legend}" title="{$image.legend}"
                      {else}
                        alt="{$product.name}"
                      {/if}
                      >
                  </div>
                {/foreach}

              {/if}

              </div>
            {/images_block}
          {else}
            {images_block webpEnabled=$webpEnabled}
              <img
                class="rounded img-fluid"
                {generateImagesSources image=$product.default_image size='large_default' lazyload=false}
                width="{$product.default_image.bySize.large_default.width}"
                height="{$product.default_image.bySize.large_default.height}"
                {if !empty($product.default_image.legend)}
                  alt="{$product.default_image.legend}"
                  title="{$product.default_image.legend}"
                {else}
                  alt="{$product.name}"
                {/if}>
            {/images_block}
          {/if}


          {if $product.images|count > 1}
            <div class="swiper-button-prev swiper-button-custom">
              <span class="sr-only">{l s='Previous' d='Shop.Theme.Actions'}</span>
              <span class="material-icons">keyboard_arrow_left</span>
            </div>
            <div class="swiper-button-next swiper-button-custom">
              <span class="sr-only">{l s='Next' d='Shop.Theme.Actions'}</span>
              <span class="material-icons">keyboard_arrow_right</span>
            </div>
          {/if}
        </div>

      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
