{extends file='components/modal.tpl'}

{block name='modal_extra_attribues'}id="blockcart-modal"{/block}
{block name='modal_title'}{l s='Product added to cart' d='Shop.Istheme'}{/block}


{block name='modal_body'}

  <div class="cart-products p-0 mb-4">
    <div class="cart-products__thumb">
      <img
        class="img-fluid rounded"
        {generateImagesSources image=$product.default_image size='cart_default' lazyload=false}
        alt="{$product.cover.legend}"
        title="{$product.cover.legend}">
    </div>
    <div class="cart-products__desc">
        <p class="h6 mb-2 font-sm">
          {$product.name}
        </p>
        <div class="price price--sm">{$product.price}</div>
        {hook h='displayProductPriceBlock' product=$product type="unit_price"}
    </div>
  </div>

  <hr>

  <div class="cart-summary-line mb-2">
    <span class="label">{l s='Subtotal:' d='Shop.Theme.Checkout'}</span>
    <span class="value">{$cart.subtotals.products.value}</span>
  </div>

  <div class="cart-summary-line mb-2">
    <span class="label">{l s='Shipping:' d='Shop.Theme.Checkout'}</span>
    <span class="value">{$cart.subtotals.shipping.value} {hook h='displayCheckoutSubtotalDetails' subtotal=$cart.subtotals.shipping}</span>
  </div>

  {if !$configuration.display_prices_tax_incl && $configuration.taxes_enabled}
    <div class="cart-summary-line cart-total mb-2">
      <span class="label">{$cart.totals.total.label}&nbsp;{$cart.labels.tax_short}</span>
      <span class="value">{$cart.totals.total.value}</span>
    </div>
    <div class="cart-summary-line cart-total mb-0">
      <span class="label">{$cart.totals.total_including_tax.label}</span>
      <span class="value">{$cart.totals.total_including_tax.value}</span>
    </div>
  {else}
    <div class="cart-summary-line cart-total mb-0">
      <span class="label">{$cart.totals.total.label}&nbsp;{if $configuration.taxes_enabled}{$cart.labels.tax_short}{/if}</span>
      <span class="value">{$cart.totals.total.value}</span>
    </div>
  {/if}
{/block}

{block name='modal_footer'}
  <a href="{$cart_url}" class="btn btn-primary btn-block">{l s='Proceed to checkout' d='Shop.Theme.Actions'}</a>
  <button type="button" class="btn btn-text btn-block" data-dismiss="modal">{l s='Continue shopping' d='Shop.Theme.Actions'}</button>
{/block}
