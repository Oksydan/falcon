{**
 * 2007-2017 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
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
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2017 PrestaShop SA
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}
<div class="product-line-grid">
  <div class="product-line-grid__row">
    <div class="product-line-grid__block product-line-grid__block--image">
      <img
        {generateImagesSources image=$product.default_image size='cart_default' lazyload=false}
        alt="{$product.name|escape:'quotes'}"
        class="img-fluid rounded"
        width="{$product.default_image.bySize.cart_default.width}"
        height="{$product.default_image.bySize.cart_default.height}">
    </div>
    <div class="product-line-grid__block product-line-grid__block--prod">
      <p class="h6 product-line-grid__title mb-2">
        <a class="text-reset" href="{$product.url}" data-id_customization="{$product.id_customization|intval}">
          {$product.name}
        </a>
      </p>

      {if $product.attributes}
        <ul class="mb-2">
          {foreach from=$product.attributes key="attribute" item="value"}
            <li class="text-muted small">
              <span>{$attribute}:</span>
              <span class="font-weight-bold">{$value}</span>
            </li>
          {/foreach}
        </ul>
      {/if}

      <div class="product-line-info product-price{if $product.has_discount} has-discount{/if}">
        <div class="current-price">
          {if $product.has_discount}
            <span class="price price--regular mr-1">{$product.regular_price}</span>
          {/if}
          <span
            class="current-price-display price{if $product.has_discount} current-price-discount{/if}">{$product.price}</span>
          {if $product.unit_price_full}
            <div class="unit-price-cart">{$product.unit_price_full}</div>
          {/if}
        </div>

        {hook h='displayProductPriceBlock' product=$product type="unit_price"}
      </div>
      {* end product-price *}
      {if is_array($product.customizations) && $product.customizations|count}
        {block name='cart_detailed_product_line_customization'}
          <div class="mt-3">
            {foreach from=$product.customizations item="customization"}
              <a href="#" data-toggle="modal"
                data-target="#product-customizations-modal-{$customization.id_customization}">{l s='Product customization' d='Shop.Theme.Catalog'}</a>
              <div class="modal fade customization-modal" id="product-customizations-modal-{$customization.id_customization}"
                tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title">{l s='Product customization' d='Shop.Theme.Catalog'}</h4>
                      <button type="button" class="close" data-dismiss="modal"
                        aria-label="{l s='Close' d='Shop.Theme.Global'}">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      {foreach from=$customization.fields item="field"}
                        <div class="product-customization-line row">
                          <div class="col-sm-3 col-4 label">
                            {$field.label}
                          </div>
                          <div class="col-sm-9 col-8 value">
                            {if $field.type == 'text'}
                              {if (int)$field.id_module}
                                {$field.text nofilter}
                              {else}
                                {$field.text}
                              {/if}
                            {elseif $field.type == 'image'}
                              <img src="{$field.image.small.url}">
                            {/if}
                          </div>
                        </div>
                      {/foreach}
                    </div>
                  </div>
                </div>
              </div>
            {/foreach}
          </div>
        {/block}
      {/if}
    </div>

    <div class="product-line-grid__block product-line-grid__block--qty">
      {if !empty($product.is_gift)}
        <span class="gift-quantity">{$product.quantity}</span>
      {else}
        <div>
          <input
            class="js-cart-line-product-quantity input-touchspin"
            data-down-url="{$product.down_quantity_url}"
            data-up-url="{$product.up_quantity_url}"
            data-update-url="{$product.update_quantity_url}"
            data-product-id="{$product.id_product}"
            type="number"
            inputmode="numeric"
            pattern="[0-9]*"
            value="{$product.quantity}"
            name="product-quantity-spin"
            min="{$product.minimal_quantity}"
            aria-label="{l s='%productName% product quantity field' sprintf=['%productName%' => $product.name] d='Shop.Theme.Checkout'}"
            />
        </div>
      {/if}
    </div>

    <div class="product-line-grid__block product-line-grid__block--total">
      <span class="product-price">
        {if !empty($product.is_gift)}
          <span class="gift">{l s='Gift' d='Shop.Theme.Checkout'}</span>
        {else}
          <span class="price">
            {$product.total}
          </span>
        {/if}
      </span>
    </div>

    <div class="product-line-grid__block product-line-grid__block--delete">
      {if empty($product.is_gift)}
        <a class="remove-from-cart text-danger" rel="nofollow" href="{$product.remove_from_cart_url}"
          data-link-action="delete-from-cart" data-id-product="{$product.id_product|escape:'javascript'}"
          data-id-product-attribute="{$product.id_product_attribute|escape:'javascript'}"
          data-id-customization="{$product.id_customization|escape:'javascript'}">
          <span class="material-icons font-reset">delete</span>
        </a>
      {/if}

      {block name='hook_cart_extra_product_actions'}
        {hook h='displayCartExtraProductActions' product=$product}
      {/block}
    </div>
  </div>

</div>
