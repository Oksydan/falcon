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

{if Tools::getValue('quickview') || Tools::getValue('action') == 'quickview'}
  <div class="js-product-images">
    <div class="card">
      <div class="card-body">
        {images_block webpEnabled=$webpEnabled}
          {if $product.default_image}
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
              {/if}
              >
          {else}
            <img src="{$urls.no_picture_image.bySize.large_default.url}" class="rounded img-fluid">
          {/if}
        {/images_block}
      </div>
    </div>
  </div>
{else}
  <div class="js-product-images">
    {block name='product_cover'}
      {if $product.default_image}

        <div class="product-main-images">
          {if $product.images|count > 1}
            {$index = 0}
            {images_block webpEnabled=$webpEnabled}

              <div class="js-product-main-images swiper swiper-custom" data-index="{$index}">
                <div class="product-main-images__list swiper-wrapper">
                  <div class="swiper-slide">
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
                      {/if}
                      >
                  </div>
                  {if $product.images|count > 1}
                    {foreach from=$product.images item=image}
                      {if $image.id_image === $product.default_image.id_image}
                        {continue}
                      {/if}
                      {$index = $index + 1}

                      <div class="swiper-slide" data-index="{$index}">
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

                <div class="swiper-button-prev swiper-button-custom">
                  <span class="visually-hidden">{l s='Previous' d='Shop.Theme.Actions'}</span>
                  <span class="material-icons">keyboard_arrow_left</span>
                </div>
                <div class="swiper-button-next swiper-button-custom">
                  <span class="visually-hidden">{l s='Next' d='Shop.Theme.Actions'}</span>
                  <span class="material-icons">keyboard_arrow_right</span>
                </div>
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

          <a class="product-main-images__modal-trigger-layer btn btn-light shadow rounded-circle d-none d-md-block" data-bs-toggle="modal" data-target="#product-modal">
            <span class="material-icons font-reset line-height-reset">zoom_in</span>
          </a>

        </div>
      {else}
        <img src="{$urls.no_picture_image.bySize.large_default.url}" class="rounded img-fluid">
      {/if}
    {/block}

    {block name='product_images'}
      {if $product.images|count > 1}
        <div class="js-product-thumbs product-thumbs swiper mt-2 swiper-custom">
          {images_block webpEnabled=$webpEnabled}
            <div class="product-thumbs__list swiper-wrapper">
              <div class="product-thumbs__elem swiper-slide">
                <img
                  class="rounded img-fluid lazyload"
                  {generateImagesSources image=$product.default_image size='home_default' lazyload=true}
                  width="{$product.default_image.bySize.home_default.width}"
                  height="{$product.default_image.bySize.home_default.height}"
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
                  <div class="product-thumbs__elem swiper-slide">
                    <img
                      class="rounded img-fluid lazyload"
                      {generateImagesSources image=$image size='home_default' lazyload=true}
                      width="{$image.bySize.home_default.width}"
                      height="{$image.bySize.home_default.height}"
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
        </div>
      {/if}
    {/block}
  </div>
  {hook h='displayAfterProductThumbs' product=$product}
{/if}
