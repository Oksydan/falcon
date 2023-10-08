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
<div class="product-add-to-cart js-product-add-to-cart">
  {if !$configuration.is_catalog}

    {block name='product_quantity'}
      <div class="product-quantity row g-2 align-items-center">
        <div class="qty col-12 col-lg-2 col-md-3 mx-auto px-1">
          <div class="js-product-qty-spinner">
            <div class="input-group flex-nowrap">
              <a href="#" class="btn btn-outline-dark px-1 js-custom-qty-btn-down">
                <span class="material-icons d-block">remove</span>
              </a>
              <input
                class="js-custom-qty-spinner-input px-1 text-center border-black form-control"
                type="number"
                inputmode="numeric"
                pattern="[0-9]*"
                name="qty"
                id="quantity_wanted"
                inputmode="numeric"
                pattern="[0-9]*"
                      {if $product.quantity_wanted}
                        value="{$product.quantity_wanted}"
                        min="{$product.minimal_quantity}"
                      {else}
                        value="1"
                        min="1"
                      {/if}
                aria-label="{l s='Quantity' d='Shop.Theme.Actions'}"
              >
              <a href="#" class="btn btn-outline-dark px-1 js-custom-qty-btn-up">
                <span class="material-icons d-block">add</span>
              </a>
            </div>
          </div>
        </div>



        <div class="add col js-add-to-cart-btn-wrapper">
          <button
            class="btn btn-primary add-to-cart d-block text-center w-100"
            data-button-action="add-to-cart"
            type="submit"
            {if !$product.add_to_cart_url}
              disabled
            {/if}
          >
            {l s='Add to cart' d='Shop.Theme.Actions'}
          </button>
        </div>

        <div class="col-auto">
          <div class="js-product-actions-buttons">
            <div class="row g-2 align-items-center">
              {hook h='displayProductActions' product=$product}
            </div>
          </div>
        </div>
      </div>

    {/block}

    {block name='product_availability'}
      <span id="product-availability" class="js-product-availability">
        {if $product.show_availability && $product.availability_message}
          <span
            {if $product.availability == 'available'}
              class="badge badge-success py-1 mb-1"
            {elseif $product.availability == 'last_remaining_items'}
              class="badge badge-warning py-1 mb-1"
            {else}
                class="badge badge-danger py-1 mb-1"
            {/if}
          >
          {if $product.availability == 'available'}
            <i class="material-icons rtl-no-flip font-reset align-bottom">&#xE5CA;</i>
          {elseif $product.availability == 'last_remaining_items'}
            <i class="material-icons font-reset align-bottom">&#xE002;</i>
          {else}
            <i class="material-icons font-reset align-bottom">&#xE14B;</i>
          {/if}
          {$product.availability_message}
          </span>
        {/if}
      </span>
    {/block}

    {block name='product_minimal_quantity'}
      <div class="product-minimal-quantity js-product-minimal-quantity">
      {if $product.minimal_quantity > 1}
        <small>
          {l
            s='The minimum purchase order quantity for the product is %quantity%.'
            d='Shop.Theme.Checkout'
            sprintf=['%quantity%' => $product.minimal_quantity]
          }
        </small>
      {/if}
      </div>
    {/block}
  {/if}
</div>
